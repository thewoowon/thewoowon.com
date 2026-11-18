import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { formatDate } from "@/lib/date";
import { getResume } from "@/lib/resume";
import { siteConfig } from "@/lib/site";
import PdfViewer from "./PdfViewer";

interface Props {
  params: Promise<{ slug: string }>;
}

// 매니페스트가 런타임 환경변수라 프리렌더하면 안 되고, 애초에 색인 대상도 아니다.
export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const entry = getResume(slug);

  return {
    title: entry ? `${entry.company} — ${entry.role ?? "이력서"}` : "이력서",
    // 이 경로는 링크를 받은 사람만 본다. 검색·미리보기·아카이브 전부 차단.
    robots: {
      index: false,
      follow: false,
      nocache: true,
      googleBot: { index: false, follow: false, noimageindex: true },
    },
    alternates: { canonical: null },
    openGraph: undefined,
    twitter: undefined,
  };
}

export default async function ResumePage({ params }: Props) {
  const { slug } = await params;
  const entry = getResume(slug);
  if (!entry) notFound();

  const pdfHref = `/r/${entry.slug}/pdf`;

  return (
    <article className="flex flex-col gap-10 pt-8">
      {/* ─── 헤더 ─── */}
      <header className="flex flex-col gap-4 border-b border-border pb-8">
        <div className="flex flex-wrap items-center gap-2 text-xs text-muted">
          <span className="rounded bg-surface px-2 py-0.5 text-accent">
            {entry.company}
          </span>
          <span>·</span>
          <span>{entry.role ?? "이력서"}</span>
          {entry.updated && (
            <>
              <span>·</span>
              <time dateTime={entry.updated}>{formatDate(entry.updated)} 기준</time>
            </>
          )}
        </div>

        <h1 className="text-2xl font-semibold leading-snug tracking-tight text-text-high">
          {entry.headline ?? `${siteConfig.name} 이력서`}
        </h1>

        {entry.note && (
          <p className="text-sm leading-relaxed text-subtle">{entry.note}</p>
        )}

        {entry.points && entry.points.length > 0 && (
          <ul className="flex flex-col gap-2 pt-1">
            {entry.points.map((point) => (
              <li
                key={point}
                className="flex gap-2.5 text-sm leading-relaxed text-text"
              >
                <span aria-hidden className="text-muted">
                  —
                </span>
                <span>{point}</span>
              </li>
            ))}
          </ul>
        )}
      </header>

      {/* ─── 액션 ─── */}
      <div className="flex flex-wrap items-center gap-2">
        <a
          href={`${pdfHref}?dl=1`}
          className="rounded border border-border bg-surface px-3.5 py-2 text-sm text-text-high transition-colors hover:border-accent"
        >
          PDF 다운로드
        </a>
        <a
          href={pdfHref}
          target="_blank"
          rel="noopener noreferrer"
          className="rounded border border-hairline px-3.5 py-2 text-sm text-subtle transition-colors hover:border-border hover:text-text"
        >
          새 탭에서 열기 ↗
        </a>
        {entry.extras?.map((extra, index) => (
          <a
            key={extra.label}
            href={`${pdfHref}?doc=${index + 1}&dl=1`}
            className="rounded border border-hairline px-3.5 py-2 text-sm text-subtle transition-colors hover:border-border hover:text-text"
          >
            {extra.label} 다운로드
          </a>
        ))}
      </div>

      {/* ─── 뷰어 (데스크톱) ─── */}
      <div className="hidden md:block">
        <PdfViewer
          src={`${pdfHref}#view=FitH`}
          title={`${entry.company} 제출 문서 PDF`}
        />
        <p className="pt-2 text-xs text-muted">
          미리보기가 안 뜨면{" "}
          <a
            href={`${pdfHref}?dl=1`}
            className="text-subtle transition-colors hover:text-text"
          >
            PDF를 내려받아
          </a>{" "}
          보세요.
        </p>
      </div>

      {/* ─── 뷰어 대체 (모바일) — iOS Safari는 인라인 PDF를 1페이지만 그린다 ─── */}
      <div className="rounded border border-hairline bg-raised p-5 md:hidden">
        <p className="text-sm leading-relaxed text-subtle">
          모바일에서는 PDF를 새 탭에서 여는 쪽이 잘 보입니다.
        </p>
        <a
          href={pdfHref}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-3 inline-block rounded border border-border bg-surface px-3.5 py-2 text-sm text-text-high"
        >
          PDF 열기 ↗
        </a>
      </div>

      {/* ─── 푸터 ─── */}
      <footer className="border-t border-border pt-6 text-xs leading-relaxed text-muted">
        더 자세한 작업은{" "}
        <Link href="/projects" className="text-text transition-colors hover:text-text-high">
          프로젝트
        </Link>
        {" · "}
        <Link href="/research" className="text-text transition-colors hover:text-text-high">
          연구
        </Link>
        에 정리해 뒀습니다. 문의는{" "}
        <a
          href={`mailto:${siteConfig.email}`}
          className="text-text transition-colors hover:text-text-high"
        >
          {siteConfig.email}
        </a>
        .
      </footer>
    </article>
  );
}
