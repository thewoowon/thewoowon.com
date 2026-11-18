import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

// 모든 사실(기간·직급·수치·수상·자격)은 이력서·포트폴리오·경력기술서(v4.0.0)와 같게 유지한다.

export const metadata: Metadata = {
  title: "어바웃",
  description:
    "금융 앱 광고·리워드, 치과 EMR, 1인 운영 서비스를 만들고 운영해 온 프론트엔드 중심 풀스택 개발자 우원의 경력·학력·연구·수상.",
  alternates: { canonical: `${siteConfig.url}/about` },
  openGraph: {
    title: `어바웃 — ${siteConfig.name}`,
    description:
      "금융 앱 광고·리워드, 치과 EMR, 1인 운영 서비스를 만들고 운영해 온 프론트엔드 중심 풀스택 개발자 우원.",
    url: `${siteConfig.url}/about`,
  },
};

const METRICS = [
  ["1시간", "페이지 광고 적용 공수 (기존 평균 3일)"],
  ["690만 원", "월 신규 광고 수익 (2026년 5월)"],
  ["54명", "쿠폰 유실 피해 전원 복원"],
  ["5회", "AI 해커톤 전체 1위 (수상 7회 중)"],
];

const CAREER = [
  {
    period: "2024.08 – 2026.08",
    org: "KB국민은행",
    role: "스타뱅킹영업부 혜택광고팀 · 프론트엔드/풀스택 개발자 · 대리",
    note: "공통 광고 런타임 useAd 1인 설계·개발, DMP → 하우스배너 → NAM 3단 fallback, 매일포인트 받기 개편(핵심 콘텐츠 CTR +12%)",
  },
  {
    period: "2023.02 – 2024.08",
    org: "덴티움",
    role: "ICT사업부 IT팀 · 프론트엔드/풀스택 개발자 · 주임",
    note: "덴티움 클라우드 EMR 데스크·차트 섹션. 상태 머신(XState) 도입, Access·Refresh·Execute 3계층 토큰 인증, 진료비 산정 전 구간 담당",
  },
  {
    period: "2022.07 – 2022.10",
    org: "GC메디아이 (GC녹십자 계열)",
    role: "제1본부 전략개발팀 · 프론트엔드 개발자 · 주니어 매니저",
    note: "UBIST 처방전 수집률 모니터링 화면과 Slack 이상 알림 단독 개발, QA 포함 개발 기간 2주 단축",
  },
  {
    period: "2020.10 – 2022.07",
    org: "솔바",
    role: "솔루션사업부 연구개발1팀 · 프론트엔드/풀스택 개발자 · 사원",
    note: "LS전선 글로벌 품질관리시스템 검사기준서 등록 시간 80% 단축, 프로젝트 수행평가 우수개발자. SK넥실리스 품질관리시스템 참여",
  },
];

const EDUCATION = [
  {
    period: "2023.09 – 2026.08",
    school: "한양대학교 공학대학원",
    detail: "컴퓨터공학 석사 · 학위논문 FINRCA",
  },
  {
    period: "2013.03 – 2021.02",
    school: "국립부경대학교",
    detail: "융합디스플레이공학 학사",
  },
];

const RESEARCH = [
  {
    title: "Supervisory Observability for Agentic Finance",
    note: "WAIFC 게재 · 단독 저자 · Young Academic Award 2026 2nd Place",
    href: "/research/supervisory-observability-agentic-finance",
  },
  {
    title: "FINRCA: 이상 전파를 고려한 계보 그래프 기반 금융 리스크 파이프라인 자동 원인 분석",
    note: "석사 학위논문 · 단독 저자",
    href: "/research/finrca",
  },
  {
    title: "VaR 추정을 위한 몬테카를로 및 준몬테카를로 방법의 알고리즘적 비교",
    note: "개인 연구",
    href: "/research/qmc-var",
  },
  {
    title: "지방정부 주도 관계금융 기반 사회연대경제 지원 모델 설계",
    note: "2026 사회연대경제 연구 공모전 제출 · 개인 연구",
    href: "/research/social-solidarity-economy",
  },
];

const STACK = [
  "TypeScript", "JavaScript", "React", "Next.js", "React Native",
  "NestJS", "FastAPI", "PostgreSQL", "MySQL",
  "Storybook", "Web Components", "JSP",
  "Python", "R", "Java", "GA",
];

const AWARDS = [
  { year: "2026", title: "WAIFC Young Academic Award · Top 3 Finalist · 2nd Place", org: "World Alliance of International Financial Centers · 연례총회 초청 발표" },
  { year: "2026", title: "Fast Builderthon 대상 (전체 1위) · 트러스트", org: "패스트캠퍼스 주관 · Anthropic·NVIDIA 후원" },
  { year: "2025", title: "뉴스빅데이터 해커톤 대상 (문체부장관상) · 세이프가드AI", org: "한국언론진흥재단 · 문화체육관광부" },
  { year: "2025", title: "Us:Code 해커톤 in 의성 대상 (의성군수상) · 드림팜", org: "Google Developers" },
  { year: "2024", title: "포텐데이 LLM 해커톤 최우수상 (전체 1위) · 스카이브릿지", org: "비사이드 · 네이버클라우드" },
  { year: "2023", title: "포텐데이 LLM 해커톤 최우수상 (전체 1위) · 티키타카", org: "비사이드 · 네이버클라우드" },
  { year: "2023", title: "콘텐츠유니버스 해커톤 식물 부문 2위 · 플랜지", org: "고양시 · 오프너디오씨" },
  { year: "2023", title: "프롬프터데이 서울 해커톤 아이디어상 (전체 5위) · 체키", org: "SK Telecom · OpenAI" },
];

const CERTS = [
  "정보처리기사", "빅데이터분석기사", "사회조사분석사 2급",
  "ADP(필기)", "ADsP", "SQLD", "DAsP", "컴활 1급", "워드 1급",
];

const ACTIVITIES = [
  "2026 상반기 E5 KAIST 멤버",
  "SK Telecom DEVOCEAN 테크데이 발표",
  "SK Telecom DEVOCEAN 오픈랩 1기",
  "네이버클라우드 퇴근길 밋업 발표",
  "아동센터 코딩 교육 봉사 1년 (2024)",
  "한국장학재단 사회적 리더 멘토링",
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
          금융 앱 광고·리워드, 치과 EMR,
          <br />
          1인 운영 서비스를 만들어 왔습니다.
        </h1>
        <div className="flex max-w-xl flex-col gap-3 text-sm leading-relaxed text-subtle">
          <p>
            가장 최근에는 KB국민은행 혜택광고팀에서 KB스타뱅킹 광고 지면을
            맡았습니다. 광고 연동을 공통 런타임 useAd로 묶고, 광고가 비면 DMP에서
            하우스배너, 외부 광고(NAM) 순으로 넘어가는 3단 fallback을
            설계했습니다.
          </p>
          <p>
            덴티움에서는 설치형 치과 EMR을 웹·데스크톱 앱으로 옮기면서 예약부터
            완료까지의 업무 상태를 상태 머신으로 정의했고, 진료비 산정은 화면부터
            DB 적재까지 혼자 맡았습니다.
          </p>
          <p>
            회사 밖에서는 스탬프 앱 포인토를 1인 개발·운영하고 있습니다. 석사
            학위논문(FINRCA)에서는 금융 리스크 파이프라인의 원인 분석을 다뤘고,
            금융 AI 에이전트 감독 논문으로 WAIFC Young Academic Award 2026 2nd
            Place를 받았습니다.
          </p>
        </div>
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

      {/* ─── 학력 ─── */}
      <section className="flex flex-col gap-6">
        <Heading>학력</Heading>
        <ol className="flex flex-col gap-4">
          {EDUCATION.map((e) => (
            <li key={e.school} className="flex flex-col gap-1 sm:flex-row sm:gap-6">
              <span className="shrink-0 pt-0.5 text-xs tabular-nums text-muted sm:w-36">
                {e.period}
              </span>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm font-medium text-text">{e.school}</span>
                <span className="text-xs text-subtle">{e.detail}</span>
              </div>
            </li>
          ))}
        </ol>
      </section>

      {/* ─── 연구 ─── */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <Heading>논문 · 연구</Heading>
          <Link
            href="/research"
            className="text-xs text-muted transition-colors hover:text-text"
          >
            전체 보기 →
          </Link>
        </div>
        <ul className="flex flex-col gap-4">
          {RESEARCH.map((r) => (
            <li key={r.href} className="flex flex-col gap-0.5">
              <Link
                href={r.href}
                className="text-sm text-text transition-colors hover:text-text-high"
              >
                {r.title} →
              </Link>
              <span className="text-xs text-muted">{r.note}</span>
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
          <p className="text-xs text-muted">TOEIC 855 · TOEIC Speaking AL</p>
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
        <p className="text-sm text-subtle">채용이나 협업 제안은 메일로 받습니다.</p>
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
