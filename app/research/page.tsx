import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import ResearchCard from "@/components/blocks/ResearchCard";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "연구",
  description:
    "금융 AI 에이전트 감독, 리스크 파이프라인 원인 분석, VaR 시뮬레이션, 사회연대경제 금융을 다룬 논문과 연구.",
  alternates: { canonical: `${siteConfig.url}/research` },
  openGraph: {
    title: `연구 — ${siteConfig.name}`,
    description:
      "금융 AI 에이전트 감독, 리스크 파이프라인 원인 분석, VaR 시뮬레이션, 사회연대경제 금융을 다룬 논문과 연구.",
    url: `${siteConfig.url}/research`,
  },
};

export default function ResearchPage() {
  const research = getAllPosts("research");

  return (
    <div className="flex flex-col gap-12 pt-8">
      <div className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-text-high">
          연구
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-subtle">
          금융을 주제로 쓴 논문과 연구입니다. 리스크 수치가 어느 단계에서
          틀어졌는지, AI 에이전트가 무엇을 보고 무엇을 실행했는지처럼{" "}
          <span className="text-text">나중에 되짚을 수 있게 만드는 방법</span>을
          주로 다뤘습니다.
        </p>
      </div>

      <div className="flex flex-col gap-3">
        {research.map((post) => (
          <ResearchCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  );
}
