import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import WritingCard from "@/components/blocks/WritingCard";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "글",
  description: "생각을 정리하고 구조화한 기록들. 에세이, 기술 글, 사고 실험.",
  alternates: {
    canonical: `${siteConfig.url}/writing`,
    types: { "application/rss+xml": `${siteConfig.url}/rss.xml` },
  },
  openGraph: {
    title: `글 — ${siteConfig.name}`,
    description: "생각을 정리하고 구조화한 기록들. 에세이, 기술 글, 사고 실험.",
    url: `${siteConfig.url}/writing`,
  },
};

export default function WritingPage() {
  const all = getAllPosts("writing");
  const posts = all.filter((p) => p.frontmatter.note !== true);
  const notes = all.filter((p) => p.frontmatter.note === true);

  return (
    <div className="flex flex-col gap-12 pt-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-text-high">
          글
        </h1>
        <p className="text-sm text-subtle">
          쓰면서 생각이 정리되는 편이다. 그 기록들.
        </p>
      </div>

      <div className="flex flex-col">
        {posts.map((post) => (
          <WritingCard key={post.slug} post={post} />
        ))}
      </div>

      {notes.length > 0 && (
        <details className="group flex flex-col border-t border-border pt-8">
          <summary className="cursor-pointer list-none text-xs font-semibold uppercase tracking-widest text-muted transition-colors hover:text-text">
            학습 노트 ({notes.length})
            <span className="ml-2 font-normal normal-case tracking-normal text-subtle group-open:hidden">
              — 개념 정리·번역 모음, 펼치기 →
            </span>
          </summary>
          <div className="mt-4 flex flex-col">
            {notes.map((post) => (
              <WritingCard key={post.slug} post={post} />
            ))}
          </div>
        </details>
      )}
    </div>
  );
}
