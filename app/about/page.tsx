import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "어바웃",
  description: "우원이 어떻게 생각하고, 무엇을 만들고, 왜 그 일을 하는지에 대하여.",
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: `어바웃 — ${siteConfig.name}`,
    description: "우원이 어떻게 생각하고, 무엇을 만들고, 왜 그 일을 하는지에 대하여.",
    url: `${siteConfig.url}/about`,
  },
};

const STACK = [
  "Next.js", "React", "React Native", "TypeScript",
  "Python", "FastAPI", "PostgreSQL", "MySQL",
  "Nest.js", "GraphQL", "Docker",
];

const INTERESTS = [
  "AI 추론 최적화 — speculative decoding, 양자화",
  "금융 시장 미시구조 — LOB, OFI, 가격 예측",
  "복잡계와 구조적 사고",
  "제품 엔지니어링 — 실제로 배포되는 것들",
  "강화학습 응용",
];

const AWARDS = [
  { year: "2026", title: "Fast Builderthon 대상 (전체 1위)", org: "패스트캠퍼스 · Anthropic · Nvidia 협찬" },
  { year: "2025", title: "뉴스빅데이터해커톤 대상 (문체부장관상)", org: "한국언론진흥재단 · 문체부" },
  { year: "2025", title: "Us:Code 해커톤 대상 (의성군수상)", org: "Google Developers" },
  { year: "2024", title: "포텐데이 LLM 해커톤 최우수상", org: "비사이드 · 네이버클라우드" },
  { year: "2023", title: "포텐데이 LLM 해커톤 최우수상", org: "비사이드 · 네이버클라우드" },
];

const PAPERS = [
  {
    title: "OFI-LOB: Order Flow Imbalance–Augmented Transformer for Limit Order Book Mid-Price Prediction",
    venue: "arXiv preprint, 2026",
  },
  {
    title: "Algorithmic Comparison of Monte Carlo and Quasi-Monte Carlo Methods for Value at Risk Estimation: Complexity Analysis and Empirical Evidence from Korean Financial Markets",
    venue: "2026",
  },
];

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16 pt-8">

      {/* ─── 인트로 ─── */}
      <section className="flex flex-col gap-4">
        <h1 className="text-2xl font-semibold tracking-tight text-text-high">
          우원 (Woowon)
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-subtle">
          AI·금융·연구·제품·엔지니어링이 교차하는 지점에서 일해요.
          복잡한 시스템을 구조적으로 단순화하는 것을 좋아해요.
        </p>
      </section>

      {/* ─── 세계관 ─── */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
          어떻게 생각하는가
        </h2>
        <div className="flex flex-col gap-5 text-sm leading-relaxed text-subtle">
          <p>
            좋은 엔지니어링은 <span className="text-text">문제를 올바르게 표현하는 것</span>에서 시작해요.
            해법보다 문제의 구조를 먼저 보는 습관이 결국 더 빠른 해결로 이어져요.
          </p>
          <p>
            AI는 도구이기 이전에 <span className="text-text">새로운 인식론</span>이에요.
            모델이 무엇을 학습하고, 어디서 실패하고, 왜 그런지 이해하는 것이
            단순히 API를 호출하는 것보다 훨씬 가치 있어요.
          </p>
          <p>
            금융 시장은 인간 심리와 수학이 만나는 가장 복잡한 시스템 중 하나예요.
            그 구조를 이해하는 것은 <span className="text-text">세계가 작동하는 방식</span>을 이해하는 것과 같아요.
          </p>
        </div>
      </section>

      {/* ─── 작업 방식 ─── */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
          어떻게 만드는가
        </h2>
        <ol className="flex flex-col gap-4">
          {[
            ["문제 정의", "무엇이 진짜 문제인지 명확해질 때까지 시작하지 않아요."],
            ["구조 설계", "코드 전에 데이터 흐름과 경계를 정의해요."],
            ["최소 증명", "증명이 필요한 가정을 가장 작은 실험으로 검증해요."],
            ["반복 정제", "작동하는 것에서 시작해 점진적으로 정밀하게 만들어요."],
          ].map(([step, desc], i) => (
            <li key={step} className="flex gap-4">
              <span className="mt-0.5 shrink-0 text-xs text-border tabular-nums">
                {String(i + 1).padStart(2, "0")}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-text">{step}</span>
                <span className="text-xs text-subtle">{desc}</span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ─── 관심 영역 + 스택 ─── */}
      <div className="grid grid-cols-2 gap-10">
        <section className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
            관심 영역
          </h2>
          <ul className="flex flex-col gap-2">
            {INTERESTS.map((item) => (
              <li key={item} className="text-sm text-subtle">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="flex flex-col gap-4">
          <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
            주요 스택
          </h2>
          <div className="flex flex-wrap gap-2">
            {STACK.map((s) => (
              <span
                key={s}
                className="rounded bg-surface px-2 py-1 text-xs text-subtle"
              >
                {s}
              </span>
            ))}
          </div>
        </section>
      </div>

      {/* ─── 논문 & 연구 ─── */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
          논문 & 연구
        </h2>
        <ul className="flex flex-col gap-4">
          {PAPERS.map((p) => (
            <li key={p.title} className="flex flex-col gap-0.5">
              <span className="text-sm text-text">{p.title}</span>
              <span className="text-xs text-muted">{p.venue}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── 수상 ─── */}
      <section className="flex flex-col gap-4">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
          수상
        </h2>
        <ul className="flex flex-col gap-3">
          {AWARDS.map((a) => (
            <li key={`${a.year}-${a.title}`} className="flex gap-4">
              <span className="shrink-0 text-xs tabular-nums text-muted">{a.year}</span>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-text">{a.title}</span>
                <span className="text-xs text-subtle">{a.org}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── 연락 ─── */}
      <section className="border-t border-border pt-8 flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
          연락
        </h2>
        <p className="text-sm text-subtle">
          흥미로운 문제나 협업 제안은 언제든 환영해요.
        </p>
        <div className="flex flex-col gap-2">
          <a
            href={`mailto:${siteConfig.email}`}
            className="text-sm text-text transition-colors hover:text-text-high"
          >
            {siteConfig.email} →
          </a>
          <a
            href={siteConfig.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text transition-colors hover:text-text-high"
          >
            GitHub →
          </a>
        </div>
      </section>
    </div>
  );
}
