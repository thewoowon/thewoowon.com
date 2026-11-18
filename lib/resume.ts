/**
 * 회사 맞춤 이력서 배포 (`/r/[slug]`)
 *
 * 이력서 본문(PDF)과 대상 회사 정보는 **레포에 커밋하지 않는다.** 이 레포는 public이라
 * 회사별 이력서가 그대로 노출되기 때문. 대신 전부 `RESUME_MANIFEST` 환경변수(JSON)로
 * 주입하고, PDF는 private Vercel Blob에 올린 뒤 **pathname만** 매니페스트에 적는다.
 *
 * pathname을 쓰는 이유: private blob의 서명 URL(`?vercel-blob-delegation=…`)은 만료된다.
 * 그걸 박아 두면 반나절 뒤 링크가 깨진다. pathname만 두고 요청 시점에 서버가 SDK로
 * 읽으면 만료되는 것이 없고, blob은 외부에서 직접 접근이 불가능한 상태로 남는다.
 *
 * 매니페스트 형식 (JSON 배열):
 *   [{
 *     "slug":     "acme-8f3a2c",          // 추측 불가하게 랜덤 접미사를 붙인다
 *     "company":  "ACME",
 *     "role":     "프론트엔드 엔지니어",    // (선택) 지원 포지션
 *     "headline": "복잡한 걸 운영 가능한 구조로.",
 *     "note":     "이 회사에 맞춘 한 문단.", // (선택)
 *     "points":   ["...", "..."],          // (선택) 핵심 3줄
 *     "pathname": "resume/acme.pdf",       // private blob 경로 (또는 "url": "https://…")
 *     "filename": "우원_이력서.pdf",        // (선택) 받는 사람에게 보일 파일명
 *     "updated":  "2026-08-02",            // (선택)
 *     "extras":   [{ "label": "포트폴리오", "pathname": "…", "filename": "…pdf" }]
 *   }]
 *
 * 회사를 추가/수정할 땐 코드가 아니라 환경변수만 바꾸면 된다(재배포 불필요).
 */

/** 문서의 출처 — private blob의 pathname이거나, 직접 가리키는 URL. */
export type ResumeSource =
  | { kind: "blob"; pathname: string }
  | { kind: "url"; url: string };

export interface ResumeExtra {
  label: string;
  source: ResumeSource;
  filename?: string;
}

export interface ResumeEntry {
  slug: string;
  company: string;
  role?: string;
  headline?: string;
  note?: string;
  points?: string[];
  source: ResumeSource;
  filename?: string;
  updated?: string;
  extras?: ResumeExtra[];
}

const DEFAULT_FILENAME = "우원_이력서.pdf";

/** 원본은 https만 허용한다. 단, 로컬 개발 중에는 localhost도 열어 둔다. */
function isAllowedUrl(value: unknown): value is string {
  if (typeof value !== "string") return false;
  try {
    const url = new URL(value);
    if (url.protocol === "https:") return true;
    return (
      process.env.NODE_ENV !== "production" &&
      url.protocol === "http:" &&
      (url.hostname === "localhost" || url.hostname === "127.0.0.1")
    );
  } catch {
    return false;
  }
}

/** pathname(권장) 또는 url에서 출처를 뽑는다. 둘 다 없으면 항목 자체를 버린다. */
function toSource(raw: Record<string, unknown>): ResumeSource | null {
  if (typeof raw.pathname === "string" && raw.pathname.length > 0) {
    return { kind: "blob", pathname: raw.pathname };
  }
  if (isAllowedUrl(raw.url)) return { kind: "url", url: raw.url };
  // 이전 필드명 호환.
  if (isAllowedUrl(raw.pdf)) return { kind: "url", url: raw.pdf };
  return null;
}

function toStringArray(value: unknown): string[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const items = value.filter((v): v is string => typeof v === "string" && v.length > 0);
  return items.length > 0 ? items : undefined;
}

function normalizeExtras(value: unknown): ResumeExtra[] | undefined {
  if (!Array.isArray(value)) return undefined;
  const extras = value.flatMap((raw): ResumeExtra[] => {
    if (typeof raw !== "object" || raw === null) return [];
    const record = raw as Record<string, unknown>;
    const source = toSource(record);
    if (typeof record.label !== "string" || !source) return [];
    return [
      {
        label: record.label,
        source,
        filename:
          typeof record.filename === "string" ? record.filename : undefined,
      },
    ];
  });
  return extras.length > 0 ? extras : undefined;
}

function normalize(raw: unknown): ResumeEntry | null {
  if (typeof raw !== "object" || raw === null) return null;
  const r = raw as Record<string, unknown>;

  // slug와 출처는 필수. 나머지는 없으면 UI에서 생략된다.
  if (typeof r.slug !== "string" || !/^[a-z0-9-]+$/i.test(r.slug)) return null;
  const source = toSource(r);
  if (!source) return null;

  return {
    slug: r.slug,
    company: typeof r.company === "string" ? r.company : r.slug,
    role: typeof r.role === "string" ? r.role : undefined,
    headline: typeof r.headline === "string" ? r.headline : undefined,
    note: typeof r.note === "string" ? r.note : undefined,
    points: toStringArray(r.points),
    source,
    filename: typeof r.filename === "string" ? r.filename : DEFAULT_FILENAME,
    updated: typeof r.updated === "string" ? r.updated : undefined,
    extras: normalizeExtras(r.extras),
  };
}

function parseManifest(): ResumeEntry[] {
  const raw = process.env.RESUME_MANIFEST;
  if (!raw) return [];

  let parsed: unknown;
  try {
    parsed = JSON.parse(raw);
  } catch {
    console.warn("[resume] RESUME_MANIFEST가 유효한 JSON이 아니라 무시한다.");
    return [];
  }

  if (!Array.isArray(parsed)) {
    console.warn("[resume] RESUME_MANIFEST는 배열이어야 한다.");
    return [];
  }

  return parsed
    .map(normalize)
    .filter((entry): entry is ResumeEntry => entry !== null);
}

/** slug로 이력서 항목을 찾는다. 없으면 null (호출부에서 404). */
export function getResume(slug: string): ResumeEntry | null {
  return (
    parseManifest().find(
      (entry) => entry.slug.toLowerCase() === slug.toLowerCase()
    ) ?? null
  );
}

/**
 * 이력서 안의 문서 하나를 고른다.
 * doc이 없으면 본 이력서, 1-based 숫자면 extras[doc - 1].
 */
export function getResumeDoc(
  entry: ResumeEntry,
  doc: string | null
): { source: ResumeSource; filename: string } | null {
  if (!doc) {
    return {
      source: entry.source,
      filename: entry.filename ?? DEFAULT_FILENAME,
    };
  }

  const index = Number.parseInt(doc, 10);
  const extra = entry.extras?.[index - 1];
  if (!Number.isInteger(index) || !extra) return null;

  return {
    source: extra.source,
    filename: extra.filename ?? `${extra.label}.pdf`,
  };
}
