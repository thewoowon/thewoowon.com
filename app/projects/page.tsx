import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import ProjectCard from "@/components/blocks/ProjectCard";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "프로젝트",
  description: "만든 것들. 기능 목록이 아닌 문제·설계·의사결정·결과의 기록.",
  alternates: { canonical: `${siteConfig.url}/projects` },
  openGraph: {
    title: `프로젝트 — ${siteConfig.name}`,
    description: "만든 것들. 기능 목록이 아닌 문제·설계·의사결정·결과의 기록.",
    url: `${siteConfig.url}/projects`,
  },
};

export default function ProjectsPage() {
  const projects = getAllPosts("projects");

  return (
    <div className="flex flex-col gap-10 pt-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-text-high">
          프로젝트
        </h1>
        <p className="text-sm text-subtle">
          무엇을 만들었는지보다 왜, 어떻게 만들었는지를 기록한다.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {projects.map((post) => (
          <ProjectCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
