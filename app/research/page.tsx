import type { Metadata } from "next";
import { getAllPosts } from "@/lib/mdx";
import ResearchCard from "@/components/blocks/ResearchCard";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "연구",
  description:
    "금융 AI를 예측이 아니라 추적·신뢰·책임의 시스템 문제로 다룬 연구들. 리스크 계보, VaR 시뮬레이션, Agentic 금융 거버넌스, AI Assurance.",
  alternates: { canonical: `${siteConfig.url}/research` },
  openGraph: {
    title: `연구 — ${siteConfig.name}`,
    description:
      "금융 AI를 예측이 아니라 추적·신뢰·책임의 시스템 문제로 다룬 연구들.",
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
          여기 연구들은 대체로 한 가지 질문을 공유한다. 금융에서 AI를 쓸 때 결과가
          맞았는지만 볼 게 아니라, 그 숫자가 어디서 왔고 왜 그렇게 판단했는지, 틀렸을
          때 어떻게 되짚을지를 어떻게 보장하느냐다. 예측 성능보다{" "}
          <span className="text-text">그 추적·설명·복원 가능성</span>에 관심이 있다.
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
