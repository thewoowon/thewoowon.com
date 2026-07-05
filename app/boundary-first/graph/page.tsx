import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";
import { TOTALS, TEMPLATE_KEYS, TEMPLATE_META } from "@/lib/boundary-first/graph";
import GraphClient from "./GraphClient";

const REPO = siteConfig.repos.boundaryFirst;

export const metadata: Metadata = {
  title: "Architecture Graph — Boundary-First",
  description:
    "세 개 boundary-first 템플릿(React·Next.js·React Native)의 실제 모듈 의존성 그래프를 3D로 렌더. 소스에서 추출한 65개 엣지, 전부 downward — 0 upward, 0 cycles, check:arch로 검증.",
  alternates: { canonical: `${siteConfig.url}/boundary-first/graph` },
  openGraph: {
    title: `Architecture Graph — ${siteConfig.name}`,
    description:
      "세 템플릿의 실제 모듈 의존성 그래프를 3D로. 0 upward · 0 cycles, check:arch로 검증된 반증 가능한 주장.",
    url: `${siteConfig.url}/boundary-first/graph`,
  },
};

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
      {children}
    </h2>
  );
}

export default function ArchitectureGraphPage() {
  return (
    <div className="flex flex-col gap-10 pt-8">
      {/* ─── Header ─── */}
      <section className="flex flex-col gap-4">
        <Link
          href="/boundary-first"
          className="text-xs text-muted transition-colors hover:text-text"
        >
          ← Boundary-First
        </Link>
        <span className="text-xs font-medium uppercase tracking-widest text-muted">
          Architecture Graph
        </span>
        <h1 className="text-3xl font-semibold leading-tight tracking-tighter text-text-high">
          손으로 그린 그림이 아니다.
          <br />
          소스에서 추출한 실제 그래프다.
        </h1>
        <p className="max-w-xl text-sm leading-relaxed text-subtle">
          세 개 템플릿의 모든 모듈과 import를 소스에서 그대로 추출했다. 높이는
          계층(layerIndex) — 중력이 곧 의존성 방향이다. 엣지는 오직 아래로만
          흐르고, 그래프는 눈으로 보기에도 {" "}
          <code className="rounded bg-surface px-1 py-0.5 font-mono text-xs text-text">
            shared
          </code>{" "}
          위에 얹혀 있다. 위로 향하는 엣지 하나면 위반이고, 지금은{" "}
          <span className="text-text">{TOTALS.upward}개</span>다.
        </p>
      </section>

      {/* ─── 3D graph ─── */}
      <GraphClient />

      {/* ─── 읽는 법 ─── */}
      <section className="flex flex-col gap-4">
        <Heading>읽는 법</Heading>
        <ul className="flex flex-col gap-2 text-sm text-subtle">
          <li>
            <span className="text-text">높이(Y)</span> = 계층. 아래가 원시(
            <code className="rounded bg-surface px-1 py-0.5 font-mono text-xs text-text">
              shared/lib
            </code>
            ), 위가 조립 루트(
            <code className="rounded bg-surface px-1 py-0.5 font-mono text-xs text-text">
              app
            </code>
            ).
          </li>
          <li>
            <span className="text-text">깊이(Z)</span> = 세 런타임 레인 —
            같은 원리가 세 판에서 같은 모양으로 반복된다.
          </li>
          <li>
            <span className="text-text">크기</span> = 모듈의 파일 수.
          </li>
          <li>
            <span className="text-text">모듈 클릭</span> = 그 모듈의 의존성 cone(
            무엇을 import하는지, 전이적으로)만 남기고 나머지를 흐린다 — 변경의
            폭발 반경을 눈으로 본다.
          </li>
        </ul>
      </section>

      {/* ─── 불변식 ─── */}
      <section className="flex flex-col gap-4">
        <Heading>Invariants (live from data)</Heading>
        <div className="grid grid-cols-2 gap-px overflow-hidden rounded-lg border border-border bg-border sm:grid-cols-4">
          {[
            [String(TOTALS.nodes), "modules"],
            [String(TOTALS.edges), "imports"],
            [String(TOTALS.upward), "upward edges"],
            [String(TOTALS.cycles), "cycles"],
          ].map(([value, label]) => (
            <div key={label} className="flex flex-col gap-1 bg-bg p-4">
              <span className="text-2xl font-semibold tabular-nums text-text-high">
                {value}
              </span>
              <span className="text-[11px] leading-snug text-muted">
                {label}
              </span>
            </div>
          ))}
        </div>
        <p className="max-w-xl text-xs leading-relaxed text-muted">
          {TEMPLATE_KEYS.map((k) => TEMPLATE_META[k].label).join(" · ")} —
          동일한 코어(shared → entities → features)와 4상태 실패 모델을 공유하고,
          차이는 플랫폼이 강제하는 것뿐이다. 이 표의 숫자는 소스에서 재생성되며,
          위반이 생기면 그 즉시 바뀐다.
        </p>
      </section>

      {/* ─── CTA ─── */}
      <section className="flex flex-col gap-2 border-t border-border pt-8">
        <a
          href={REPO}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm text-text transition-colors hover:text-text-high"
        >
          GitHub — 데이터 생성기와 check:arch 검증기 →
        </a>
        <Link
          href="/boundary-first"
          className="text-sm text-muted transition-colors hover:text-text"
        >
          규격 전문으로 돌아가기 →
        </Link>
      </section>
    </div>
  );
}
