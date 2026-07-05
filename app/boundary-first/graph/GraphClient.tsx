"use client";

import dynamic from "next/dynamic";

const ArchitectureGraph = dynamic(() => import("./ArchitectureGraph"), {
  ssr: false,
  loading: () => (
    <div className="grid h-[68vh] min-h-[440px] w-full place-items-center rounded-lg border border-hairline bg-raised">
      <span className="font-mono text-xs text-muted">
        모듈 그래프 로딩…
      </span>
    </div>
  ),
});

export default function GraphClient() {
  return <ArchitectureGraph />;
}
