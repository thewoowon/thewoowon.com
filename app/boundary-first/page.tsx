import type { Metadata } from "next";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

const REPO = siteConfig.repos.boundaryFirst;

export const metadata: Metadata = {
  title: "Boundary-First",
  description:
    "화면이 아니라 경계에서 시작하는 프론트엔드 설계 규격. 라우팅·상태·도메인·통합·실패·런타임 경계를 먼저 정의하고, 아키텍처 검증기로 강제한다. React·Next.js·React Native 공통.",
  alternates: { canonical: `${siteConfig.url}/boundary-first` },
  openGraph: {
    title: `Boundary-First — ${siteConfig.name}`,
    description:
      "화면이 아니라 경계에서 시작하는 프론트엔드 설계 규격. React·Next.js·React Native 공통, 아키텍처 검증기로 강제.",
    url: `${siteConfig.url}/boundary-first`,
  },
};

const BOUNDARIES = [
  ["Routing / Navigation", "사용자가 위치 사이를 어떻게 이동하는가."],
  ["State", "각 상태를 누가 소유하고, 어디에 사는가."],
  ["Domain", "UI와 무관한 비즈니스 개념은 무엇인가."],
  ["UI", "도메인에 종속되지 않는 재사용 프리미티브."],
  ["API / SDK Integration", "외부 데이터가 앱으로 들어오는 방식."],
  ["Failure", "비동기 흐름이 성공하지 못했을 때 무엇이 일어나는가."],
  ["Runtime / Platform", "네트워크·생명주기·플랫폼 같은 실행 조건."],
];

const TEMPLATES = [
  ["React", "Browser SPA", "State / Feature / API"],
  ["Next.js", "Server + Browser", "Route / Server-Client / Cache"],
  ["React Native", "iOS / Android", "Navigation / Native / Runtime"],
];

// 낮음 → 높음. import는 항상 높은 계층에서 낮은 계층으로만 흐른다.
const LAYERS = ["shared", "entities", "features", "widgets", "routes", "app"];

const DOCS = [
  ["philosophy", "공리와 모듈 그래프 모델", "philosophy.md"],
  ["dependency-matrix", "누가 무엇을 import할 수 있는가", "dependency-matrix.md"],
  ["state-boundary", "상태 분류와 배치", "state-boundary.md"],
  ["failure-boundary", "비동기 상태와 에러 경계", "failure-boundary.md"],
  ["naming-rules", "결정론적 네이밍", "naming-rules.md"],
  ["architecture-checklist", "리뷰 체크리스트", "architecture-checklist.md"],
];

function Heading({ children }: { children: React.ReactNode }) {
  return (
    <h2 className="text-xs font-semibold uppercase tracking-widest text-muted">
      {children}
    </h2>
  );
}

function Prop({
  n,
  statement,
  children,
}: {
  n: string;
  statement: string;
  children?: React.ReactNode;
}) {
  return (
    <li className="flex flex-col gap-2 sm:flex-row sm:gap-6">
      <span className="shrink-0 pt-0.5 font-mono text-xs tabular-nums text-muted sm:w-10">
        {n}
      </span>
      <div className="flex flex-col gap-3">
        <p className="text-sm font-medium text-text-high">{statement}</p>
        {children}
      </div>
    </li>
  );
}

export default function BoundaryFirstPage() {
  return (
    <div className="flex flex-col gap-16 pt-8">
      {/* ─── Hero / Axiom ─── */}
      <section className="flex flex-col gap-5">
        <span className="text-xs font-medium uppercase tracking-widest text-muted">
          Boundary-First · 경계 우선 프론트엔드 설계
        </span>
        <h1 className="text-3xl font-semibold leading-tight tracking-tighter text-text-high">
          화면에서 시작하지 마라.
          <br />
          경계에서 시작하라.
        </h1>
        <p className="font-mono text-xs text-subtle">
          Do not start from screens. Start from boundaries.
        </p>
        <p className="max-w-xl text-sm leading-relaxed text-subtle">
          React·Next.js·React Native에 공통으로 적용하는 프론트엔드 설계 규격.
          화면을 먼저 그리는 대신 라우팅·상태·도메인·통합·실패·런타임의 경계를 먼저
          정의하고, 그 결정에서 화면이 따라 나오게 한다. 원칙은 문서가 아니라
          아키텍처 검증기로 강제된다.
        </p>
      </section>

      {/* ─── Propositions ─── */}
      <section className="flex flex-col gap-8">
        <Heading>Propositions</Heading>
        <ol className="flex flex-col gap-8">
          <Prop n="1" statement="화면은 결과이고, 경계는 원인이다.">
            <p className="text-sm leading-relaxed text-subtle">
              화면은 이미 다른 곳에서 내려진 결정들의 배열일 뿐이다 — 데이터가
              어디서 오는지, 각 상태를 누가 소유하는지, 실패하면 무엇이 일어나는지.
              그 결정을 화면 안에서 즉흥적으로 내리면 모든 화면이 그것을 다시
              발명하고, 코드베이스는 표류한다.
            </p>
          </Prop>

          <Prop n="2" statement="좋은 아키텍처는 세 가지를 보장한다.">
            <ul className="flex flex-col gap-1.5 text-sm text-subtle">
              <li>· 모든 변경에는 예측 가능한 위치가 있다.</li>
              <li>· 모든 의존성에는 허가된 방향이 있다.</li>
              <li>· 모든 런타임 실패에는 사전 정의된 경계가 있다.</li>
            </ul>
          </Prop>

          <Prop n="3" statement="소스는 방향 있는 모듈 그래프다.">
            <pre className="overflow-x-auto rounded-md border border-hairline bg-surface p-4 font-mono text-xs leading-relaxed text-text">
              <code>{`G = (V, E)
  V = 모듈의 집합
  E = 방향 있는 import  (A → B  ≡  A imports B)

불변식 1 — 순환 없음
  ∀ v ∈ V,  경로 v → … → v 는 존재하지 않는다.

불변식 2 — 계층 순서
  L(module) ∈ ℕ
  A는  L(A) ≥ L(B)  일 때만  B를 import한다.`}</code>
            </pre>
            <p className="text-sm leading-relaxed text-subtle">
              순환은 &ldquo;한 곳만 고치면 된다&rdquo;는 성질을 파괴한다. 낮은
              계층은 높은 계층에 의존하지 않는다. 두 불변식 모두{" "}
              <code className="rounded bg-surface px-1 py-0.5 font-mono text-xs text-text">
                check:arch
              </code>
              가 거부한다.
            </p>
          </Prop>

          <Prop n="4" statement="화면 이전에 일곱 개의 경계를 정의한다.">
            <ul className="flex flex-col gap-2">
              {BOUNDARIES.map(([name, desc], i) => (
                <li key={name} className="flex gap-3 text-sm">
                  <span className="shrink-0 font-mono text-xs tabular-nums text-muted">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span className="text-text">{name}</span>
                  <span className="text-subtle">— {desc}</span>
                </li>
              ))}
            </ul>
          </Prop>

          <Prop n="5" statement="하나의 원리, 세 런타임.">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-sm">
                <thead>
                  <tr className="border-b border-border text-left">
                    <th className="py-2 pr-4 font-medium text-muted">Template</th>
                    <th className="py-2 pr-4 font-medium text-muted">Runtime</th>
                    <th className="py-2 font-medium text-muted">Main Boundary</th>
                  </tr>
                </thead>
                <tbody>
                  {TEMPLATES.map(([name, runtime, boundary]) => (
                    <tr key={name} className="border-b border-hairline">
                      <td className="py-2 pr-4 text-text">{name}</td>
                      <td className="py-2 pr-4 text-subtle">{runtime}</td>
                      <td className="py-2 font-mono text-xs text-subtle">
                        {boundary}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Prop>

          <Prop n="6" statement="검증기는 문서가 아니라 게이트다.">
            <pre className="overflow-x-auto rounded-md border border-hairline bg-surface p-4 font-mono text-xs leading-relaxed text-text">
              <code>{`pnpm check:arch   # forbidden imports · circular deps
                  # env access · deep imports`}</code>
            </pre>
            <p className="text-sm leading-relaxed text-subtle">
              규칙은 의존성 매트릭스의 실행 가능한 형태다. 위반하면 빌드가 깨진다.
              이것이 의견과 규격을 가른다.
            </p>
          </Prop>
        </ol>
      </section>

      {/* ─── 계층 방향 다이어그램 ─── */}
      <section className="flex flex-col gap-5">
        <Heading>Import Direction</Heading>
        <div className="flex flex-col gap-4 rounded-lg border border-hairline bg-raised p-5">
          <div className="flex flex-wrap items-center gap-x-1 gap-y-2 font-mono text-xs">
            {LAYERS.slice()
              .reverse()
              .map((layer, i, arr) => (
                <span key={layer} className="flex items-center gap-1">
                  <span
                    className={
                      i === 0
                        ? "rounded bg-surface px-2 py-1 text-text-high"
                        : i === arr.length - 1
                          ? "rounded bg-surface px-2 py-1 text-text-high"
                          : "rounded bg-surface px-2 py-1 text-subtle"
                    }
                  >
                    {layer}
                  </span>
                  {i < arr.length - 1 && (
                    <span className="text-muted">&rarr;</span>
                  )}
                </span>
              ))}
          </div>
          <p className="text-xs leading-relaxed text-muted">
            import는 항상 아래로만 흐른다. 상위(application-specific) 계층은 하위
            계층을 import할 수 있지만, 하위 계층은 상위를 절대 참조하지 않는다.{" "}
            <code className="rounded bg-surface px-1 py-0.5 text-text">shared</code>
            는 도메인 코드를 모른다.
          </p>
        </div>
        <Link
          href="/boundary-first/graph"
          className="text-sm text-text transition-colors hover:text-text-high"
        >
          세 템플릿의 실제 모듈 그래프를 3D로 보기 →
        </Link>
      </section>

      {/* ─── 문서 ─── */}
      <section className="flex flex-col gap-5">
        <Heading>Specification</Heading>
        <ul className="flex flex-col divide-y divide-hairline">
          {DOCS.map(([slug, desc, file]) => (
            <li key={slug}>
              <a
                href={`${REPO}/blob/main/docs/${file}`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline justify-between gap-4 py-3"
              >
                <span className="font-mono text-sm text-text transition-colors group-hover:text-text-high">
                  {slug}
                </span>
                <span className="text-right text-xs text-muted">{desc}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── CTA ─── */}
      <section className="flex flex-col gap-4 border-t border-border pt-8">
        <p className="max-w-xl text-sm leading-relaxed text-subtle">
          세 개의 독립 실행 가능한 스타터 템플릿과 아키텍처 검증기가 레포지토리에
          공개되어 있다. 데모 도메인은 일부러 지루하게 두었다 — 주제는 기능이 아니라
          경계이기 때문이다.
        </p>
        <div className="flex flex-col gap-2">
          <a
            href={REPO}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-text transition-colors hover:text-text-high"
          >
            GitHub — boundary-first-frontend-templates →
          </a>
          <Link
            href="/now"
            className="text-sm text-muted transition-colors hover:text-text"
          >
            지금 무엇을 붙잡고 있는지 →
          </Link>
        </div>
      </section>
    </div>
  );
}
