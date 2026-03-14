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
  const posts = getAllPosts("writing");

  return (
    <div className="flex flex-col gap-10 pt-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-text-high">
          글
        </h1>
        <p className="text-sm text-subtle">
          단순 기록이 아니라 생각이 형태를 갖추는 과정.
        </p>
      </div>

      <div className="flex flex-col">
        {posts.map((post) => (
          <WritingCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
