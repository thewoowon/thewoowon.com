import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import ProjectCard from "@/components/blocks/ProjectCard";
import ResearchCard from "@/components/blocks/ResearchCard";
import SectionHeader from "@/components/blocks/SectionHeader";

// 수치는 이력서·포트폴리오(v4.0.0) 대표 지표와 같게 유지한다.
const METRICS = [
  ["1시간", "페이지 광고 적용 공수 (기존 평균 3일)"],
  ["690만 원", "월 신규 광고 수익 (2026년 5월)"],
  ["54명", "쿠폰 유실 피해 전원 복원"],
  ["5회", "AI 해커톤 전체 1위 (수상 7회 중)"],
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
            우원 · Frontend / Product Engineer
          </span>
          <h1 className="text-4xl font-semibold tracking-tighter text-text-high">
            만들고, 운영해 온
            <br />
            프론트엔드 중심의 풀스택 개발자
          </h1>
        </div>

        <p className="max-w-xl text-sm leading-relaxed text-subtle">
          KB국민은행 혜택광고팀에서 KB스타뱅킹의 광고·혜택·리워드 화면을
          맡았습니다. 지면마다 따로 붙이던 광고 연동을 공통 런타임 하나로 묶어,
          페이지 하나에 평균 3일 걸리던 작업을 1시간 안으로 줄였습니다. 그전에는
          덴티움에서 치과 EMR을 웹으로 옮겼고, 2025년 4월부터는 스탬프 앱
          포인토를 혼자 만들어 운영하고 있습니다.
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
          라우팅·상태·도메인·통합·실패·런타임의 경계부터 정하는 프론트엔드 설계
          규격입니다. React·Next.js·React Native에 함께 쓰고, 규칙은 아키텍처
          검증기로 강제합니다.
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
              포인토를 운영하면서 Boundary-First 설계 규격을 정리하고 있습니다.
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
