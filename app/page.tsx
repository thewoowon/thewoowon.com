import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import ProjectCard from "@/components/blocks/ProjectCard";
import ResearchCard from "@/components/blocks/ResearchCard";
import SectionHeader from "@/components/blocks/SectionHeader";

const METRICS = [
  ["연 14억", "광고 수수료 성과 기여"],
  ["690만/월", "신규 광고 수익"],
  ["7회", "AI/LLM 해커톤 수상"],
  ["앱 6개", "App Store · Play Store 배포"],
];

export default function HomePage() {
  const projects = getAllPosts("projects").slice(0, 3);
  const research = getAllPosts("research").slice(0, 3);

  return (
    <div className="flex flex-col gap-20">
      {/* ─── Hero ─── */}
      <section className="flex flex-col gap-6 pt-12">
        <div className="flex flex-col gap-2">
          <span className="text-xs font-medium uppercase tracking-widest text-muted">
            우원 · thewoowon
          </span>
          <h1 className="text-4xl font-semibold tracking-tighter text-text-high">
            복잡한 걸
            <br />
            운영 가능한 구조로.
          </h1>
        </div>

        <p className="max-w-xl text-sm leading-relaxed text-subtle">
          웹부터 모바일 앱까지 제품을 만들어 온 5년차 프론트엔드 엔지니어. 겉으로
          드러난 문제보다 그 아래 구조를 먼저 본다. 금융과 AI가 겹치는 문제에도
          관심이 많다.
        </p>

        <div className="flex items-center gap-4">
          <Link
            href="/projects"
            className="rounded-md bg-surface px-4 py-2 text-xs font-medium text-text transition-colors hover:bg-border hover:text-text-high"
          >
            프로젝트 보기
          </Link>
          <Link
            href="/about"
            className="text-xs text-muted transition-colors hover:text-text"
          >
            어바웃 →
          </Link>
        </div>
      </section>

      {/* ─── 대표 성과 스트립 ─── */}
      <section className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
        {METRICS.map(([value, label]) => (
          <div key={label} className="flex flex-col gap-1 bg-bg p-4">
            <span className="text-2xl font-semibold tracking-tight tabular-nums text-text-high">
              {value}
            </span>
            <span className="text-[11px] leading-snug text-muted">{label}</span>
          </div>
        ))}
      </section>

      {/* ─── Boundary-First (flagship) ─── */}
      <Link
        href="/boundary-first"
        className="group flex flex-col gap-3 rounded-lg border border-hairline bg-raised p-6 transition-colors hover:border-border"
      >
        <span className="text-xs font-medium uppercase tracking-widest text-muted">
          Boundary-First
        </span>
        <p className="font-mono text-sm text-text-high">
          화면에서 시작하지 마라. 경계에서 시작하라.
        </p>
        <p className="max-w-lg text-sm leading-relaxed text-subtle">
          라우팅·상태·도메인·통합·실패·런타임의 경계를 먼저 정의하는 프론트엔드
          설계 규격. React·Next.js·React Native 공통, 아키텍처 검증기로 강제한다.
        </p>
        <span className="text-xs text-muted transition-colors group-hover:text-text">
          규격 보기 →
        </span>
      </Link>

      {/* ─── 대표 프로젝트 ─── */}
      {projects.length > 0 && (
        <section>
          <SectionHeader title="대표 프로젝트" href="/projects" />
          <div className="flex flex-col gap-3">
            {projects.map((post) => (
              <ProjectCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* ─── 연구 ─── */}
      {research.length > 0 && (
        <section>
          <SectionHeader title="연구" href="/research" />
          <div className="flex flex-col gap-3">
            {research.map((post) => (
              <ResearchCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* ─── 현재 집중 (Now 티저) ─── */}
      <section className="border-t border-border pt-10">
        <div className="flex items-start justify-between">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-semibold uppercase tracking-widest text-muted">
              지금 (Now)
            </span>
            <p className="max-w-sm text-sm text-subtle">
              KB스타뱅킹 광고·리워드 시스템 운영. Boundary-First 설계 규격을
              다듬고, 써 둔 금융 리스크 연구를 공개 준비 중.
            </p>
          </div>
          <Link
            href="/now"
            className="text-xs text-muted transition-colors hover:text-text"
          >
            더 보기 →
          </Link>
        </div>
      </section>
    </div>
  );
}
