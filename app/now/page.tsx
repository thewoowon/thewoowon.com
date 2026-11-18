import type { Metadata } from "next";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "지금",
  description: "지금 하고 있는 일과 최근에 마친 일.",
  alternates: { canonical: `${siteConfig.url}/now` },
  openGraph: {
    title: `지금 — ${siteConfig.name}`,
    description: "지금 하고 있는 일과 최근에 마친 일.",
    url: `${siteConfig.url}/now`,
  },
};

// 여기를 직접 수정해서 현재 상태를 업데이트한다.
// 경력·수상 관련 사실은 이력서·포트폴리오(v4.0.0)와 같게 유지한다.
const NOW = {
  updatedAt: "2026년 11월",
  location: "서울",
  sections: [
    {
      title: "하고 있는 것",
      items: [
        "포인토 1인 운영 (2025년 4월부터). 이미 쓰고 있는 매장의 요청 반영과 운영 안정성에 집중하고 있습니다.",
        "Boundary-First 설계 규격 정리. React·Next.js·React Native 템플릿과 아키텍처 검증기를 다듬고 있습니다.",
      ],
    },
    {
      title: "최근 마친 것",
      items: [
        "2026년 9월 · WAIFC 연례총회 초청 발표 (Young Academic Award 2026 2nd Place)",
        "2026년 8월 · 한양대학교 공학대학원 컴퓨터공학 석사 졸업, 학위논문 FINRCA",
        "2026년 8월 · KB국민은행 혜택광고팀 근무 마침 (2024년 8월부터)",
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
        에서 가져온 형식입니다. 경력 전체는 어바웃 페이지에 있습니다.
      </p>
    </div>
  );
}
