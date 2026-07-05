import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "어바웃",
  description:
    "KB국민은행 스타뱅킹에서 광고·리워드 프론트엔드를 만들고, 금융 리스크와 AI 감독을 연구하는 우원. 실무 성과·연구·경력·수상.",
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: `어바웃 — ${siteConfig.name}`,
    description:
      "KB국민은행에서 광고·리워드 프론트엔드를 만들고, 금융 리스크와 AI 감독을 연구하는 우원.",
    url: `${siteConfig.url}/about`,
  },
};

const METRICS = [
  ["연 14억", "광고 수수료 성과 기여"],
  ["690만/월", "신규 광고 수익 창출"],
  ["2~3일 → 1시간", "광고 적용 공수 단축"],
  ["7회", "AI/LLM 해커톤·공모전 수상"],
];

const CAREER = [
  {
    period: "2024.08 ~ 재직 중",
    org: "KB국민은행",
    role: "스타뱅킹영업부 혜택광고팀 · 프론트엔드 개발자 (대리)",
    note: "광고·혜택·리워드 수익화 시스템 구조화, useAd 공통 모듈, NAM fallback 안정화",
  },
  {
    period: "2023.02 ~ 2024.08",
    org: "덴티움",
    role: "ICT사업부 IT팀 · 프론트엔드 개발자 (주임)",
    note: "의료 도메인 웹 서비스, 인증·상태관리·실시간 동기화 구조화",
  },
  {
    period: "2022.07 ~ 2022.10",
    org: "유비케어",
    role: "전략개발팀 · 프론트엔드 개발자",
    note: "처방전 데이터 수집률 모니터링·어드민 시스템, Slack 알림 자동화",
  },
  {
    period: "2020.10 ~ 2022.07",
    org: "솔바",
    role: "연구개발1팀 · 프론트엔드 개발자",
    note: "LS전선·SK넥실리스 글로벌 품질관리시스템, 검사기준서 등록 시간 80% 단축",
  },
];

const STACK = [
  "TypeScript", "Next.js", "React", "React Native",
  "Storybook", "Web Components", "JSP",
  "PostgreSQL", "MySQL", "Python", "R", "GA · GTM",
];

const RESEARCH = [
  { title: "FINRCA — 계보 그래프 기반 리스크 원인 분석", href: "/research/finrca" },
  { title: "몬테카를로 / 준몬테카를로 VaR 비교 연구", href: "/research/qmc-var" },
  {
    title: "Supervisory Observability for Agentic Finance",
    href: "/research/supervisory-observability-agentic-finance",
  },
  {
    title: "Beyond Adoption: Why Korean Finance Must Prioritize AI Assurance",
    href: "/research/ai-assurance-korean-finance",
  },
];

const AWARDS = [
  { year: "2026", title: "Fast Builderthon 대상 (전체 1위)", org: "패스트캠퍼스 · Anthropic·Nvidia 협찬" },
  { year: "2025", title: "뉴스빅데이터해커톤 대상 (문체부장관상)", org: "한국언론진흥재단 · 문체부" },
  { year: "2025", title: "Us:Code 해커톤 대상 (의성군수상)", org: "Google Developers" },
  { year: "2024", title: "포텐데이 LLM 해커톤 최우수상", org: "네이버클라우드" },
  { year: "2023", title: "포텐데이 LLM 해커톤 최우수상", org: "네이버클라우드" },
];

const CERTS = [
  "정보처리기사", "빅데이터분석기사", "사회조사분석사",
  "ADP", "ADsP", "SQLD", "DAsP", "컴활 1급",
];

const ACTIVITIES = [
  "2026 상반기 E5 KAIST 멤버",
  "SK Telecom DEVOCEAN 테크데이 발표 · 오픈랩 1기",
  "네이버클라우드 퇴근길 밋업 발표",
  "예비창업패키지 2차 심사 통과",
  "아동센터 코딩 교육 봉사 1년 · 한국장학재단 사회적 리더 멘토링",
];

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
      {children}
    </h2>
  );
}

export default function AboutPage() {
  return (
    <div className="flex flex-col gap-16 pt-8">
      {/* ─── 인트로 ─── */}
      <section className="flex flex-col gap-4">
        <span className="text-xs font-medium uppercase tracking-widest text-muted">
          우원 · Frontend / Product Engineer · 경력 5년+
        </span>
        <h1 className="text-3xl font-semibold tracking-tighter text-text-high">
          복잡한 프론트엔드를
          <br />
          운영 가능한 구조로 바꾼다.
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-subtle">
          웹부터 모바일 앱까지 제품을 만들어 왔다. KB국민은행 스타뱅킹에서는
          광고·혜택·리워드처럼 매출이 직접 걸리는 프론트엔드를 맡고 있다. 겉으로
          드러난 문제보다 그 아래 구조를 보고, 단발성 수정이 아니라 다시 쓸 수 있는
          시스템으로 바꾸는 편이다. 요즘은 화면이 아니라 경계에서 시작하는 프론트엔드
          구조를 정리하고 있고, 금융과 AI가 겹치는 문제도 오래 파고들어 연구·논문으로
          남겼다.
        </p>
      </section>

      {/* ─── 대표 성과 ─── */}
      <section className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
        {METRICS.map(([value, label]) => (
          <div key={label} className="flex flex-col gap-1 bg-bg p-4">
            <span className="text-xl font-semibold tracking-tight tabular-nums text-text-high">
              {value}
            </span>
            <span className="text-[11px] leading-snug text-muted">{label}</span>
          </div>
        ))}
      </section>

      {/* ─── Thesis ─── */}
      <section className="flex flex-col gap-6">
        <Heading>내가 보는 금융 AI</Heading>
        <div className="flex flex-col gap-5 text-sm leading-relaxed text-subtle">
          <p>
            금융 AI는 단순한 예측 문제가 아니다. 리스크 수치가 어디서 왔는지 추적할
            수 있어야 하고, AI의 판단이 어떤 근거로 내려졌는지 설명할 수 있어야 하며,
            오류가 생겼을 때 원인과 책임을 복원할 수 있어야 한다.
          </p>
          <p>
            그래서 나는 금융 AI를 예측 성능의 문제가 아니라{" "}
            <span className="text-text">
              추적·설명·복원이 가능한 구조를 설계하는 문제
            </span>
            로 본다. 실무에서도 연구에서도, 문제를 기능이 아니라 구조로 정의하는
            이유다.
          </p>
        </div>
      </section>

      {/* ─── 경력 ─── */}
      <section className="flex flex-col gap-6">
        <Heading>경력</Heading>
        <ol className="flex flex-col gap-6">
          {CAREER.map((c) => (
            <li key={c.org} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
              <span className="shrink-0 pt-0.5 text-xs tabular-nums text-muted sm:w-36">
                {c.period}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-text">{c.org}</span>
                <span className="text-xs text-subtle">{c.role}</span>
                <span className="mt-0.5 text-xs leading-relaxed text-muted">
                  {c.note}
                </span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ─── 연구 ─── */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Heading>연구 & 논문</Heading>
          <Link
            href="/research"
            className="text-xs text-muted transition-colors hover:text-text"
          >
            전체 보기 →
          </Link>
        </div>
        <ul className="flex flex-col gap-3">
          {RESEARCH.map((r) => (
            <li key={r.href}>
              <Link
                href={r.href}
                className="text-sm text-text transition-colors hover:text-text-high"
              >
                {r.title} →
              </Link>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── 스택 ─── */}
      <section className="flex flex-col gap-4">
        <Heading>주요 스택</Heading>
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

      {/* ─── 수상 ─── */}
      <section className="flex flex-col gap-4">
        <Heading>수상</Heading>
        <ul className="flex flex-col gap-3">
          {AWARDS.map((a) => (
            <li key={`${a.year}-${a.title}`} className="flex gap-4">
              <span className="shrink-0 text-xs tabular-nums text-muted">
                {a.year}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm text-text">{a.title}</span>
                <span className="text-xs text-subtle">{a.org}</span>
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── 자격 · 활동 ─── */}
      <div className="grid gap-10 sm:grid-cols-2">
        <section className="flex flex-col gap-4">
          <Heading>자격증 · 어학</Heading>
          <div className="flex flex-wrap gap-1.5">
            {CERTS.map((c) => (
              <span
                key={c}
                className="rounded bg-surface px-2 py-1 text-xs text-subtle"
              >
                {c}
              </span>
            ))}
          </div>
          <p className="text-xs text-muted">TOEIC 855 · OPIc IH</p>
        </section>

        <section className="flex flex-col gap-4">
          <Heading>활동</Heading>
          <ul className="flex flex-col gap-2">
            {ACTIVITIES.map((a) => (
              <li key={a} className="text-xs leading-relaxed text-subtle">
                {a}
              </li>
            ))}
          </ul>
        </section>
      </div>

      {/* ─── 연락 ─── */}
      <section className="flex flex-col gap-3 border-t border-border pt-8">
        <Heading>연락</Heading>
        <p className="text-sm text-subtle">
          흥미로운 문제나 협업 제안은 언제든 환영한다.
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
