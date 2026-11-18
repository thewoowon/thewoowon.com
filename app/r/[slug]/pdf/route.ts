import { get } from "@vercel/blob";
import { getResume, getResumeDoc, type ResumeSource } from "@/lib/resume";

// 매니페스트는 런타임 환경변수라 빌드 타임에 굳으면 안 된다.
export const dynamic = "force-dynamic";

/**
 * RFC 6266 / 5987 — 한글 파일명은 ASCII 폴백 + UTF-8 확장 파라미터를 같이 준다.
 * 파일명이 통째로 한글이면 폴백이 `______.pdf`가 되므로 읽을 수 있는 이름으로 대체한다.
 */
function contentDisposition(filename: string, download: boolean): string {
  const type = download ? "attachment" : "inline";
  const stripped = filename.replace(/[^\x20-\x7E]/g, "").replace(/["\\]/g, "");
  const ascii = /[A-Za-z0-9]/.test(stripped.replace(/\.pdf$/i, ""))
    ? stripped
    : "resume.pdf";
  return `${type}; filename="${ascii}"; filename*=UTF-8''${encodeURIComponent(filename)}`;
}

/**
 * macOS에서 올린 한글 파일명은 자모가 분해된 NFD로 저장되는데, 매니페스트에는 보통
 * NFC로 적게 된다. 눈으로는 같아 보이는데 404가 나므로 두 정규화 형태를 다 시도한다.
 * (애초에 blob pathname은 ASCII로 두는 편이 낫다.)
 */
function pathnameCandidates(pathname: string): string[] {
  return [...new Set([pathname, pathname.normalize("NFC"), pathname.normalize("NFD")])];
}

interface Fetched {
  status: number;
  body: ReadableStream | null;
  etag?: string;
  contentLength?: string;
}

async function readSource(
  source: ResumeSource,
  ifNoneMatch: string | null
): Promise<Fetched | null> {
  if (source.kind === "url") {
    const upstream = await fetch(source.url, {
      headers: ifNoneMatch ? { "if-none-match": ifNoneMatch } : undefined,
      cache: "no-store",
    });
    if (!upstream.ok && upstream.status !== 304) return null;
    return {
      status: upstream.status,
      body: upstream.status === 304 ? null : upstream.body,
      etag: upstream.headers.get("etag") ?? undefined,
      contentLength: upstream.headers.get("content-length") ?? undefined,
    };
  }

  for (const pathname of pathnameCandidates(source.pathname)) {
    try {
      const result = await get(pathname, {
        access: "private",
        ifNoneMatch: ifNoneMatch ?? undefined,
      });
      if (!result) continue;
      if (result.statusCode === 304) {
        return { status: 304, body: null, etag: result.blob.etag };
      }
      if (result.statusCode !== 200) continue;
      return {
        status: 200,
        body: result.stream,
        etag: result.blob.etag,
        contentLength:
          typeof result.blob.size === "number"
            ? String(result.blob.size)
            : undefined,
      };
    } catch {
      // 다음 정규화 형태로 넘어간다.
    }
  }
  return null;
}

export async function GET(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const entry = getResume(slug);
  if (!entry) return new Response("Not found", { status: 404 });

  const search = new URL(request.url).searchParams;
  const doc = getResumeDoc(entry, search.get("doc"));
  if (!doc) return new Response("Not found", { status: 404 });

  const download = search.get("dl") === "1";
  const ifNoneMatch = request.headers.get("if-none-match");

  let fetched: Fetched | null;
  try {
    fetched = await readSource(doc.source, ifNoneMatch);
  } catch (error) {
    console.error(`[resume] 원본 read 실패: ${slug}`, error);
    return new Response("Bad gateway", { status: 502 });
  }

  if (!fetched) {
    console.error(`[resume] 원본을 찾을 수 없음: ${slug}`);
    return new Response("Not found", { status: 404 });
  }

  const headers = new Headers({
    "Content-Type": "application/pdf",
    "Content-Disposition": contentDisposition(doc.filename, download),
    // private 문서다 — 브라우저에만 두고 공용 CDN에는 남기지 않는다.
    // no-cache라서 매 요청 재검증하고, 안 바뀌었으면 304로 끝난다.
    "Cache-Control": "private, no-cache",
    "X-Robots-Tag": "noindex, nofollow, noarchive",
    "X-Content-Type-Options": "nosniff",
  });
  if (fetched.etag) headers.set("ETag", fetched.etag);

  if (fetched.status === 304) {
    return new Response(null, { status: 304, headers });
  }
  if (fetched.contentLength) {
    headers.set("Content-Length", fetched.contentLength);
  }

  return new Response(fetched.body, { status: 200, headers });
}
