"use client";

import { useRef, type ReactNode } from "react";
import {
  Diagram,
  useDiagram,
  usePhase,
  useMeasure,
  useRefSetters,
  resolveEdges,
  type UsePhaseStep,
  type EdgeSpec,
  type EdgeRect,
  type ResolvedEdge,
} from "nimbus-docs/react";
import { cn } from "@/lib/cn";
import { DiagramDefs } from "./DiagramDefs";

/**
 * Scene — the "data + CSS layout + labels" diagram card. Supply phase
 * steps, an active-id lookup table, edge specs, and a layout function that
 * places labelled nodes with plain CSS; measurement, edge routing, the SVG
 * layer, and active-state styling are handled here.
 *
 * Built for pill-and-arrow cards. Bespoke cards should compose `<Diagram>`
 * + hooks directly, or use the `rects`/`edges`/`active`/`ctx` escape hatch
 * the layout receives.
 *
 * `<Scene>` composes inside an existing `<Diagram>`; `createScene` wraps
 * it into a standalone card component.
 */

const PILL_RX = 6;

export interface SceneActive<N extends string, E extends string> {
  node?: N;
  edge?: E;
}

export interface SceneNodeOptions {
  /** `pill` (default) participates in active state; `chip` is a quiet satellite label. */
  variant?: "pill" | "chip";
  /** Render dimmed until active. */
  ghost?: boolean;
  /** Replace the default SVG rect for this node (bespoke outlines). */
  shape?: (rect: EdgeRect, active: boolean) => ReactNode;
  className?: string;
}

export interface SceneLayoutApi<N extends string, E extends string> {
  /** Place a measured, active-aware node label. */
  node: (id: N, label: ReactNode, opts?: SceneNodeOptions) => ReactNode;
  /** Escape hatch: measured rects, routed edges, current active ids. */
  rects: Partial<Record<N, EdgeRect>>;
  edges: ResolvedEdge<E>[];
  active: { node: N | null; edge: E | null };
  ctx: ReturnType<typeof useDiagram>;
}

export interface SceneProps<N extends string, E extends string> {
  /** Phase steps, passed straight to `usePhase`. */
  steps: UsePhaseStep[];
  /** Step id → which node/edge lights up while that step holds. */
  active?: Record<string, SceneActive<N, E>>;
  /** Declarative edges, resolved against measured node rects. */
  edges?: readonly EdgeSpec<N, E>[];
  layout: (api: SceneLayoutApi<N, E>) => ReactNode;
  className?: string;
}

function measure(el: HTMLElement, container: HTMLElement): EdgeRect {
  const c = container.getBoundingClientRect();
  const b = el.getBoundingClientRect();
  return { l: b.left - c.left, t: b.top - c.top, w: b.width, h: b.height };
}

export function Scene<N extends string, E extends string>({
  steps,
  active,
  edges: edgeSpecs = [],
  layout,
  className,
}: SceneProps<N, E>) {
  const ctx = useDiagram();
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Partial<Record<N, HTMLDivElement | null>>>({});
  const setNode = useRefSetters(nodeRefs);

  const { selected } = useMeasure(
    containerRef,
    (el: HTMLDivElement) => {
      const rects: Partial<Record<N, EdgeRect>> = {};
      for (const [id, node] of Object.entries(nodeRefs.current) as [
        N,
        HTMLDivElement | null,
      ][]) {
        if (node) rects[id] = measure(node, el);
      }
      return { rects, edges: resolveEdges(edgeSpecs, rects) };
    },
    // edgeSpecs feeds the selector via closure — re-resolve when the spec
    // table itself changes (mode switches that swap edges without resizing).
    { deps: [edgeSpecs] },
  );

  const phase = usePhase<Record<string, never>, SceneActive<N, E>>({
    steps: steps.map((s) => ({ ...s, data: active?.[s.id] })),
    loop: true,
  });
  const activeNode = phase.data?.node ?? null;
  const activeEdge = phase.data?.edge ?? null;

  const rects = selected?.rects ?? {};
  const edges = selected?.edges ?? [];

  const nodeOpts = new Map<N, SceneNodeOptions>();
  const node = (id: N, label: ReactNode, opts?: SceneNodeOptions) => {
    if (opts) nodeOpts.set(id, opts);
    const chip = opts?.variant === "chip";
    return (
      <div
        key={id}
        ref={setNode(id)}
        className={cn(
          "relative z-10 font-mono font-medium uppercase select-none text-center",
          chip
            ? "text-[10px] tracking-wider px-2 py-1 text-neutral-700 dark:text-neutral-300"
            : cn(
                "text-xs sm:text-sm px-2.5 py-1.5 sm:px-4 sm:py-2 transition-colors duration-400",
                activeNode === id
                  ? "text-neutral-900 dark:text-neutral-100"
                  : opts?.ghost
                    ? "text-neutral-400 dark:text-neutral-600"
                    : "text-neutral-500 dark:text-neutral-500",
              ),
          opts?.className,
        )}
      >
        {label}
      </div>
    );
  };

  const content = layout({
    node,
    rects,
    edges,
    active: { node: activeNode, edge: activeEdge },
    ctx,
  });

  return (
    <div ref={containerRef} className={cn("relative w-full p-3 md:p-10", className)}>
      <DiagramDefs />
      <svg
        className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
        aria-hidden="true"
      >
        {(Object.entries(rects) as [N, EdgeRect][]).map(([id, rect]) => {
          const opts = nodeOpts.get(id);
          const isActive = activeNode === id;
          if (opts?.shape) return <g key={`node-${id}`}>{opts.shape(rect, isActive)}</g>;
          if (opts?.variant === "chip") {
            return (
              <rect
                key={`node-${id}`}
                x={rect.l}
                y={rect.t}
                width={rect.w}
                height={rect.h}
                rx={PILL_RX}
                fill="white"
                stroke="rgba(0,0,0,0.1)"
                strokeWidth={0.75}
                filter="url(#diagram-shadow)"
                className="dark:fill-neutral-900"
              />
            );
          }
          const isGhost = opts?.ghost ?? false;
          return (
            <rect
              key={`node-${id}`}
              x={rect.l}
              y={rect.t}
              width={rect.w}
              height={rect.h}
              rx={PILL_RX}
              fill="white"
              stroke={isActive ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0.1)"}
              strokeWidth={isActive ? 1 : 0.75}
              filter="url(#diagram-shadow)"
              opacity={isGhost && !isActive ? 0.4 : 1}
              className="dark:fill-neutral-900"
              style={{ transition: "stroke 400ms ease-out, stroke-width 400ms ease-out" }}
            />
          );
        })}
        {edges.map((e) => {
          const isActive = e.id === activeEdge;
          return (
            <path
              key={`edge-${e.id}`}
              d={e.d}
              fill="none"
              stroke="currentColor"
              strokeWidth={1.5}
              strokeLinecap="round"
              strokeLinejoin="round"
              markerEnd="url(#diagram-arrow)"
              className={
                isActive
                  ? "text-neutral-900 dark:text-neutral-100"
                  : "text-neutral-300 dark:text-neutral-700"
              }
              opacity={e.ghost ? (isActive ? 0.7 : 0.3) : 1}
              style={{ transition: "color 400ms ease-out, opacity 400ms ease-out" }}
            />
          );
        })}
      </svg>
      {content}
    </div>
  );
}

export interface CreateSceneConfig<N extends string, E extends string>
  extends SceneProps<N, E> {
  label: string;
}

/** Wrap a `<Scene>` into a standalone card with its own `<Diagram>`. */
export function createScene<N extends string, E extends string>({
  label: defaultLabel,
  ...sceneProps
}: CreateSceneConfig<N, E>) {
  return function SceneCard({ label = defaultLabel }: { label?: string }) {
    return (
      <Diagram label={label}>
        <Scene {...sceneProps} />
      </Diagram>
    );
  };
}
