import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import ProjectCard from "@/components/blocks/ProjectCard";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "프로젝트",
  description: "회사 업무와 개인 서비스에서 맡은 일. 문제와 원인, 해결, 결과 순으로 적었습니다.",
  alternates: { canonical: `${siteConfig.url}/projects` },
  openGraph: {
    title: `프로젝트 — ${siteConfig.name}`,
    description: "회사 업무와 개인 서비스에서 맡은 일. 문제와 원인, 해결, 결과 순으로 적었습니다.",
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
          회사 업무와 개인 서비스에서 맡은 일을 문제와 원인, 해결, 결과 순으로
          적었습니다. 수치는 이력서·포트폴리오와 같은 기준입니다.
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
