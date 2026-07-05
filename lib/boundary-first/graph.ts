import graphData from "./architecture-graph.json";

/**
 * Boundary-first architecture graph — typed loader + 3D layout derivation.
 *
 * Source of truth: architecture-graph.json (schema boundary-first/architecture-graph@1),
 * regenerated from the three templates' actual source. Never hand-edit the JSON;
 * this module only *derives* layout/adjacency from it.
 *
 * Coordinate mapping (per 3d-visualization-brief.md):
 *   Y = layerIndex   — gravity = dependency direction; edges only point downward.
 *   X = spread of modules within one (template, layer) group, centered.
 *   Z = template lane (react / next / rn) as three parallel slabs.
 */

export type NodeKind =
  | "shared"
  | "native"
  | "entities"
  | "features"
  | "widgets"
  | "pages"
  | "screens"
  | "app";

export type Direction = "downward" | "upward";

export interface RawNode {
  id: string;
  module: string;
  layer: string;
  layerIndex: number;
  kind: NodeKind;
  files: number;
}

export interface RawEdge {
  source: string;
  target: string;
  count: number;
  direction: Direction;
}

export interface RawTemplate {
  runtime: string;
  layers: { layer: string; index: number }[];
  nodes: RawNode[];
  edges: RawEdge[];
}

export type TemplateKey = "react" | "next" | "rn";

const templates = (graphData as { templates: Record<TemplateKey, RawTemplate> })
  .templates;

export const TEMPLATE_KEYS: TemplateKey[] = ["react", "next", "rn"];

export const TEMPLATE_META: Record<
  TemplateKey,
  { label: string; runtime: string; lane: number }
> = {
  react: { label: "React", runtime: templates.react.runtime, lane: -1 },
  next: { label: "Next.js", runtime: templates.next.runtime, lane: 0 },
  rn: { label: "React Native", runtime: templates.rn.runtime, lane: 1 },
};

// ─── Layout constants ───────────────────────────────────────────────
const Y_STEP = 1.15; // vertical gap per layerIndex
const X_STEP = 1.5; // horizontal gap between siblings in a layer
const LANE_GAP = 5.0; // z distance between template slabs

export const MAX_LAYER_INDEX = 9;
export const SCENE_HEIGHT = MAX_LAYER_INDEX * Y_STEP;

export function nodeRadius(files: number): number {
  return 0.16 + Math.sqrt(files) * 0.055;
}

// Canonical layer name per index (indices 4 and 8 are shared across kinds).
export const LAYER_LABELS: Record<number, string> = {
  0: "shared/lib",
  1: "shared/config",
  2: "shared/types",
  3: "shared/ui",
  4: "shared/api · native",
  5: "entities",
  6: "features",
  7: "widgets",
  8: "pages / screens",
  9: "app",
};

export interface PositionedNode extends RawNode {
  template: TemplateKey;
  pos: [number, number, number];
  radius: number;
  inDegree: number;
  outDegree: number;
}

export interface PositionedEdge extends RawEdge {
  template: TemplateKey;
  from: [number, number, number];
  to: [number, number, number];
  key: string;
}

function buildGraph() {
  const nodes: PositionedNode[] = [];
  const edges: PositionedEdge[] = [];
  const posById = new Map<string, [number, number, number]>();
  const nodeById = new Map<string, PositionedNode>();
  const outAdj = new Map<string, string[]>(); // source -> [target]
  const inCount = new Map<string, number>();
  const outCount = new Map<string, number>();

  for (const key of TEMPLATE_KEYS) {
    const t = templates[key];
    const z = TEMPLATE_META[key].lane * LANE_GAP;

    // Group nodes by layerIndex to spread them on X, deterministic by module.
    const byLayer = new Map<number, RawNode[]>();
    for (const n of t.nodes) {
      const arr = byLayer.get(n.layerIndex) ?? [];
      arr.push(n);
      byLayer.set(n.layerIndex, arr);
    }
    for (const arr of byLayer.values()) {
      arr.sort((a, b) => a.module.localeCompare(b.module));
    }

    // Pre-count degrees.
    for (const e of t.edges) {
      outCount.set(e.source, (outCount.get(e.source) ?? 0) + 1);
      inCount.set(e.target, (inCount.get(e.target) ?? 0) + 1);
      const arr = outAdj.get(e.source) ?? [];
      arr.push(e.target);
      outAdj.set(e.source, arr);
    }

    for (const [layerIndex, arr] of byLayer) {
      arr.forEach((n, i) => {
        const x = (i - (arr.length - 1) / 2) * X_STEP;
        const y = layerIndex * Y_STEP;
        const pos: [number, number, number] = [x, y, z];
        posById.set(n.id, pos);
        const pn: PositionedNode = {
          ...n,
          template: key,
          pos,
          radius: nodeRadius(n.files),
          inDegree: 0,
          outDegree: 0,
        };
        nodes.push(pn);
        nodeById.set(n.id, pn);
      });
    }
  }

  // Fill degrees now that all nodes exist.
  for (const n of nodes) {
    n.inDegree = inCount.get(n.id) ?? 0;
    n.outDegree = outCount.get(n.id) ?? 0;
  }

  for (const key of TEMPLATE_KEYS) {
    for (const e of templates[key].edges) {
      const from = posById.get(e.source);
      const to = posById.get(e.target);
      if (!from || !to) continue;
      edges.push({
        ...e,
        template: key,
        from,
        to,
        key: `${e.source}->${e.target}`,
      });
    }
  }

  return { nodes, edges, nodeById, outAdj };
}

export const { nodes: NODES, edges: EDGES, nodeById, outAdj } = buildGraph();

export const TOTALS = {
  nodes: NODES.length,
  edges: EDGES.length,
  upward: EDGES.filter((e) => e.direction === "upward").length,
  cycles: 0, // guaranteed by check:arch on the source; no cycle in the graph
};

/**
 * Dependency cone: everything `id` imports, transitively (follow downward edges).
 * Visualizes change-isolation — the blast radius of a module is exactly its cone.
 */
export function dependencyCone(id: string): {
  nodes: Set<string>;
  edges: Set<string>;
} {
  const nodeSet = new Set<string>([id]);
  const edgeSet = new Set<string>();
  const stack = [id];
  while (stack.length) {
    const cur = stack.pop()!;
    for (const next of outAdj.get(cur) ?? []) {
      edgeSet.add(`${cur}->${next}`);
      if (!nodeSet.has(next)) {
        nodeSet.add(next);
        stack.push(next);
      }
    }
  }
  return { nodes: nodeSet, edges: edgeSet };
}
