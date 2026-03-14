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
  "Python", "TypeScript", "Next.js", "PyTorch",
  "FastAPI", "PostgreSQL", "Redis", "Docker",
];

const INTERESTS = [
  "AI 추론 최적화",
  "금융 시스템 설계",
  "강화학습 응용",
  "제품 엔지니어링",
  "복잡계와 구조적 사고",
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
          AI·금융·연구·제품·엔지니어링이 교차하는 지점에서 일한다.
          빠른 프로토타입보다 깊은 이해를 먼저 추구하고,
          복잡한 시스템을 구조적으로 단순화하는 것을 좋아한다.
        </p>
      </section>

      {/* ─── 세계관 ─── */}
      <section className="flex flex-col gap-6">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
          어떻게 생각하는가
        </h2>
        <div className="flex flex-col gap-5 text-sm leading-relaxed text-subtle">
          <p>
            좋은 엔지니어링은 <span className="text-text">문제를 올바르게 표현하는 것</span>에서 시작한다고 믿는다.
            해법보다 문제의 구조를 먼저 보는 습관이 결국 더 빠른 해결로 이어진다.
          </p>
          <p>
            AI는 도구이기 이전에 <span className="text-text">새로운 인식론</span>이다.
            모델이 무엇을 학습하고, 어디서 실패하고, 왜 그런지 이해하는 것이
            단순히 API를 호출하는 것보다 훨씬 가치 있다.
          </p>
          <p>
            금융 시장은 인간 심리와 수학이 만나는 가장 복잡한 시스템 중 하나다.
            그 구조를 이해하는 것은 <span className="text-text">세계가 작동하는 방식</span>을 이해하는 것과 같다.
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
            ["문제 정의", "무엇이 진짜 문제인지 명확해질 때까지 시작하지 않는다."],
            ["구조 설계", "코드 전에 데이터 흐름과 경계를 정의한다."],
            ["최소 증명", "증명이 필요한 가정을 가장 작은 실험으로 검증한다."],
            ["반복 정제", "작동하는 것에서 시작해 점진적으로 정밀하게 만든다."],
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

      {/* ─── 연락 ─── */}
      <section className="border-t border-border pt-8 flex flex-col gap-3">
        <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
          연락
        </h2>
        <p className="text-sm text-subtle">
          흥미로운 문제나 협업 제안은 언제든 환영한다.
        </p>
        <a
          href={siteConfig.github}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-text transition-colors hover:text-text-high"
        >
          GitHub →
        </a>
      </section>
    </div>
  );
}
