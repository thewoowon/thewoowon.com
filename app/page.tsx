import Link from "next/link";
import { getAllPosts } from "@/lib/mdx";
import ProjectCard from "@/components/blocks/ProjectCard";
import WritingCard from "@/components/blocks/WritingCard";
import SectionHeader from "@/components/blocks/SectionHeader";

export default function HomePage() {
  const projects = getAllPosts("projects").slice(0, 3);
  const writings = getAllPosts("writing").slice(0, 4);

  return (
    <div className="flex flex-col gap-20">
      {/* ─── Hero ─── */}
      <section className="flex flex-col gap-6 pt-12">
        <div className="flex flex-col gap-1">
          <span className="text-xs font-medium uppercase tracking-widest text-muted">
            우원 · thewoowon
          </span>
          <h1 className="text-3xl font-semibold tracking-tight text-text-high">
            AI·금융·연구·제품·엔지니어링이
            <br />
            교차하는 고밀도 개인 연구소.
          </h1>
        </div>

        <p className="max-w-xl text-sm leading-relaxed text-subtle">
          깊이 생각하고, 실제로 만들고, 구조로 문제를 푼다.
          <br />
          좋은 시스템은 복잡한 세계를 단순하게 다룬다.
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

      {/* ─── 최근 프로젝트 ─── */}
      {projects.length > 0 && (
        <section>
          <SectionHeader title="최근 프로젝트" href="/projects" />
          <div className="flex flex-col gap-3">
            {projects.map((post) => (
              <ProjectCard key={post.slug} post={post} />
            ))}
          </div>
        </section>
      )}

      {/* ─── 최근 글 ─── */}
      {writings.length > 0 && (
        <section>
          <SectionHeader title="최근 글" href="/writing" />
          <div className="flex flex-col">
            {writings.map((post) => (
              <WritingCard key={post.slug} post={post} />
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
              AI 추론 비용 최적화 연구, 새 프로젝트 설계 중.
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
