"use client";

import { useMemo, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, Line, Html } from "@react-three/drei";
import * as THREE from "three";
import {
  NODES,
  EDGES,
  TOTALS,
  TEMPLATE_KEYS,
  TEMPLATE_META,
  LAYER_LABELS,
  SCENE_HEIGHT,
  dependencyCone,
  nodeById,
  type TemplateKey,
  type PositionedNode,
} from "@/lib/boundary-first/graph";

// ─── Monochrome palette (site is dark-only) ─────────────────────────
// Categorical dimension (kind) is encoded by Y-layer position, not color.
// Color is reserved for the one status signal — an upward edge (violation) —
// and for the selection highlight.
const C_ACTIVE = "#fafafa";
const C_ALARM = "#f0616d"; // upward edge (none today; the code path that screams)
const EDGE_NORMAL = "#4d4d4d";
const EDGE_ACTIVE = "#e5e5e5";

function layerGray(layerIndex: number): THREE.Color {
  const l = 0.4 + (layerIndex / 9) * 0.42;
  return new THREE.Color(l, l, l);
}

type Overlay = { hovered: string | null; selected: string | null };

function NodeMesh({
  node,
  state,
  onOver,
  onOut,
  onClick,
}: {
  node: PositionedNode;
  state: "active" | "normal" | "dim";
  onOver: () => void;
  onOut: () => void;
  onClick: () => void;
}) {
  const color = useMemo(
    () => (state === "active" ? new THREE.Color(C_ACTIVE) : layerGray(node.layerIndex)),
    [state, node.layerIndex],
  );
  const opacity = state === "dim" ? 0.12 : 1;
  const emissive = state === "active" ? 0.4 : 0.04;

  return (
    <mesh
      position={node.pos}
      onPointerOver={(e) => {
        e.stopPropagation();
        onOver();
      }}
      onPointerOut={onOut}
      onClick={(e) => {
        e.stopPropagation();
        onClick();
      }}
    >
      <sphereGeometry args={[node.radius, 28, 28]} />
      <meshStandardMaterial
        color={color}
        emissive={color}
        emissiveIntensity={emissive}
        roughness={0.55}
        metalness={0}
        transparent
        opacity={opacity}
        depthWrite={opacity > 0.5}
      />
    </mesh>
  );
}

function Scene({
  active,
  overlay,
  cone,
  setHovered,
  toggleSelect,
}: {
  active: Set<TemplateKey>;
  overlay: Overlay;
  cone: { nodes: Set<string>; edges: Set<string> } | null;
  setHovered: (id: string | null) => void;
  toggleSelect: (id: string) => void;
}) {
  const hoveredNode = overlay.hovered ? nodeById.get(overlay.hovered) : null;

  return (
    <>
      <ambientLight intensity={0.85} />
      <directionalLight position={[6, 12, 8]} intensity={1.1} />
      <directionalLight position={[-8, 4, -6]} intensity={0.35} />

      {/* Layer reference planes — faint shelves so height reads as layer */}
      {Array.from({ length: 10 }, (_, i) => (
        <mesh
          key={`plane-${i}`}
          position={[0, i * (SCENE_HEIGHT / 9), 0]}
          rotation={[-Math.PI / 2, 0, 0]}
        >
          <planeGeometry args={[17, 13]} />
          <meshBasicMaterial
            color="#ffffff"
            transparent
            opacity={0.015}
            depthWrite={false}
          />
        </mesh>
      ))}

      {/* Layer labels (left gutter) */}
      {Array.from({ length: 10 }, (_, i) => (
        <Html
          key={i}
          position={[-9.2, i * (SCENE_HEIGHT / 9), -6.2]}
          center
          style={{ pointerEvents: "none" }}
        >
          <span className="whitespace-nowrap rounded bg-bg/85 px-1.5 py-0.5 font-mono text-[10px] text-muted">
            {LAYER_LABELS[i]}
          </span>
        </Html>
      ))}

      {/* Template lane captions */}
      {TEMPLATE_KEYS.filter((k) => active.has(k)).map((k) => (
        <Html
          key={k}
          position={[0, SCENE_HEIGHT + 0.9, TEMPLATE_META[k].lane * 5]}
          center
          style={{ pointerEvents: "none" }}
        >
          <span className="whitespace-nowrap font-mono text-[11px] text-subtle">
            {TEMPLATE_META[k].label}
          </span>
        </Html>
      ))}

      {/* Edges */}
      {EDGES.map((edge) => {
        if (!active.has(edge.template)) return null;
        const isUpward = edge.direction === "upward";
        let color = EDGE_NORMAL;
        let opacity = 0.4;
        let width = 1;
        if (isUpward) {
          color = C_ALARM;
          opacity = 0.95;
          width = 2.5;
        } else if (cone) {
          if (cone.edges.has(edge.key)) {
            color = EDGE_ACTIVE;
            opacity = 0.9;
            width = 1.8;
          } else {
            opacity = 0.06;
          }
        }
        return (
          <Line
            key={edge.key}
            points={[edge.from, edge.to]}
            color={color}
            lineWidth={width}
            transparent
            opacity={opacity}
          />
        );
      })}

      {/* Nodes */}
      {NODES.map((node) => {
        if (!active.has(node.template)) return null;
        let state: "active" | "normal" | "dim" = "normal";
        if (cone) {
          state = cone.nodes.has(node.id) ? "active" : "dim";
        } else if (overlay.hovered === node.id) {
          state = "active";
        }
        return (
          <NodeMesh
            key={node.id}
            node={node}
            state={state}
            onOver={() => setHovered(node.id)}
            onOut={() => setHovered(null)}
            onClick={() => toggleSelect(node.id)}
          />
        );
      })}

      {/* Hover chip */}
      {hoveredNode && active.has(hoveredNode.template) && (
        <Html
          position={[
            hoveredNode.pos[0],
            hoveredNode.pos[1] + hoveredNode.radius + 0.3,
            hoveredNode.pos[2],
          ]}
          center
          style={{ pointerEvents: "none" }}
        >
          <span className="whitespace-nowrap rounded bg-surface px-1.5 py-0.5 font-mono text-[10px] text-text-high">
            {hoveredNode.module}
          </span>
        </Html>
      )}

      <OrbitControls
        makeDefault
        enablePan={false}
        target={[0, SCENE_HEIGHT / 2, 0]}
        minDistance={8}
        maxDistance={30}
      />
    </>
  );
}

function FilterButton({
  label,
  on,
  onClick,
}: {
  label: string;
  on: boolean;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={`rounded px-2 py-1 font-mono text-[11px] transition-colors ${
        on
          ? "bg-surface text-text-high"
          : "bg-transparent text-muted hover:text-text"
      }`}
    >
      {label}
    </button>
  );
}

export default function ArchitectureGraph() {
  const [active, setActive] = useState<Set<TemplateKey>>(
    () => new Set(TEMPLATE_KEYS),
  );
  const [overlay, setOverlay] = useState<Overlay>({
    hovered: null,
    selected: null,
  });

  const cone = useMemo(
    () => (overlay.selected ? dependencyCone(overlay.selected) : null),
    [overlay.selected],
  );

  const detailNode =
    (overlay.selected && nodeById.get(overlay.selected)) ||
    (overlay.hovered && nodeById.get(overlay.hovered)) ||
    null;

  const toggleTemplate = (k: TemplateKey) =>
    setActive((prev) => {
      const next = new Set(prev);
      if (next.has(k)) {
        if (next.size > 1) next.delete(k);
      } else next.add(k);
      return next;
    });

  return (
    <div className="relative h-[68vh] min-h-[440px] w-full overflow-hidden rounded-lg border border-hairline bg-raised">
      <Canvas
        camera={{ position: [16, 7, 22], fov: 38 }}
        dpr={[1, 2]}
        gl={{ antialias: true }}
        onPointerMissed={() =>
          setOverlay((o) => ({ ...o, selected: null }))
        }
      >
        <Scene
          active={active}
          overlay={overlay}
          cone={cone}
          setHovered={(id) => setOverlay((o) => ({ ...o, hovered: id }))}
          toggleSelect={(id) =>
            setOverlay((o) => ({
              ...o,
              selected: o.selected === id ? null : id,
            }))
          }
        />
      </Canvas>

      {/* Invariant readout */}
      <div className="pointer-events-none absolute left-4 top-4 flex flex-col gap-1">
        <span className="font-mono text-[11px] text-muted">
          {TOTALS.edges} edges
        </span>
        <span className="font-mono text-xs text-text-high">
          0 upward · 0 cycles
        </span>
        <span className="font-mono text-[10px] text-muted">
          machine-checked · check:arch
        </span>
      </div>

      {/* Template filters */}
      <div className="absolute right-4 top-4 flex items-center gap-1">
        {TEMPLATE_KEYS.map((k) => (
          <FilterButton
            key={k}
            label={TEMPLATE_META[k].label}
            on={active.has(k)}
            onClick={() => toggleTemplate(k)}
          />
        ))}
      </div>

      {/* Detail panel */}
      <div className="pointer-events-none absolute bottom-4 left-4 max-w-[260px]">
        {detailNode ? (
          <div className="flex flex-col gap-1 rounded-md border border-hairline bg-bg/80 p-3 backdrop-blur-sm">
            <span className="font-mono text-xs text-text-high">
              {detailNode.module}
            </span>
            <span className="font-mono text-[10px] text-muted">
              {TEMPLATE_META[detailNode.template].label} · {detailNode.layer} ·{" "}
              {detailNode.files} files
            </span>
            <span className="font-mono text-[10px] text-subtle">
              imports {detailNode.outDegree} · imported by {detailNode.inDegree}
            </span>
            {cone && overlay.selected === detailNode.id && (
              <span className="mt-0.5 font-mono text-[10px] text-text">
                dependency cone: {cone.nodes.size} modules
              </span>
            )}
          </div>
        ) : (
          <div className="rounded-md border border-hairline bg-bg/60 p-3 backdrop-blur-sm">
            <span className="font-mono text-[10px] leading-relaxed text-muted">
              drag to orbit · hover a module · click to isolate its dependency
              cone
            </span>
          </div>
        )}
      </div>
    </div>
  );
}
