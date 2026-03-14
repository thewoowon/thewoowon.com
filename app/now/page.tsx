import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "지금",
  description: "지금 이 순간 무엇에 집중하고 있는지. Derek Sivers의 /now 아이디어에서.",
  alternates: { canonical: `${siteConfig.url}/now` },
  openGraph: {
    title: `지금 — ${siteConfig.name}`,
    description: "지금 이 순간 무엇에 집중하고 있는지.",
    url: `${siteConfig.url}/now`,
  },
};

// 여기를 직접 수정해서 현재 상태를 업데이트한다
const NOW = {
  updatedAt: "2026년 3월",
  location: "서울",
  sections: [
    {
      title: "만들고 있는 것",
      items: [
        "AI 추론 비용 최적화 연구 — speculative decoding 기반 접근",
        "개인 포트폴리오/연구소 사이트 구축 (현재 이 사이트)",
      ],
    },
    {
      title: "공부하고 있는 것",
      items: [
        "시장 미시구조론 (Market Microstructure)",
        "LLM 양자화 기법 — GPTQ, AWQ 비교 분석",
        "복잡계 과학 — Santa Fe Institute 강의",
      ],
    },
    {
      title: "읽고 있는 것",
      items: [
        "The Structure of Scientific Revolutions — Thomas Kuhn",
        "Thinking in Systems — Donella Meadows",
      ],
    },
    {
      title: "집중하지 않는 것",
      items: [
        "단기 트렌드 쫓기",
        "완성되지 않은 것 공개하기",
      ],
    },
  ],
};

export default function NowPage() {
  return (
    <div className="flex flex-col gap-12 pt-8">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold tracking-tight text-text-high">
          지금
        </h1>
        <p className="text-sm text-muted">
          {NOW.location} · {NOW.updatedAt} 업데이트
        </p>
      </div>

      <div className="flex flex-col gap-10">
        {NOW.sections.map((section) => (
          <section key={section.title} className="flex flex-col gap-4">
            <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
              {section.title}
            </h2>
            <ul className="flex flex-col gap-2">
              {section.items.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 text-sm text-subtle"
                >
                  <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-border" />
                  {item}
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>

      <p className="text-xs text-muted border-t border-border pt-6">
        이 페이지는{" "}
        <a
          href="https://nownownow.com/about"
          target="_blank"
          rel="noopener noreferrer"
          className="text-subtle transition-colors hover:text-text"
        >
          Derek Sivers의 /now 운동
        </a>
        에서 영감 받았다. 이력서가 아닌, 지금 이 순간의 스냅샷.
      </p>
    </div>
  );
}
