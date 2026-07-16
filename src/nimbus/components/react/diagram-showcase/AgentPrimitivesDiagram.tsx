"use client";

import { useCallback, useLayoutEffect, useRef, useState } from "react";
import {
  Diagram,
  useDiagram,
  useMeasure,
  edgePoint,
  type EdgeRect,
  type Point,
} from "nimbus-docs/react";
import { DiagramStage, Tabs } from "@/components/react/diagram";
import { RX, indentedRect, type NodeRect, type NotchConfig } from "@/components/react/diagram/welding";
import { cn } from "@/lib/cn";

/**
 * AgentPrimitivesDiagram — the four parts of a Cloudflare Agent compose
 * into one card.
 *
 * Visually identical to www's PrimitivesDiagram (welded chrome, dashed
 * boundary, orange wires, external stubs, compose toggle). Four parts:
 * Channels in, Harness + SDK Runtime joined in the middle (together they
 * are the agent), Tools out. "Composed" snaps the tiles together, fading
 * the wires and chrome.
 *
 * Geometry leans on `nimbus-docs/react` (`edgePoint`, `EdgeRect`); wires +
 * stubs + connector dots are derived once into a single `segments` list.
 */

// ─── Data ──────────────────────────────────────────────────

const PARTS = [
  { id: "channels", label: "Channels", href: "/agents/communication-channels/" },
  { id: "harness", label: "Harness", href: "/agents/harnesses/" },
  { id: "runtime", label: "SDK Runtime", href: "/agents/runtime/" },
  { id: "tools", label: "Tools", href: "/agents/tools/" },
] as const;

type PartId = (typeof PARTS)[number]["id"];
type Side = "left" | "right" | "top" | "bottom";

type Anchor = readonly [PartId, Side, number];

/** Internal wires: [from] → [to], drawn at 0.3 opacity with dots both ends. */
const WIRES: readonly [Anchor, Anchor][] = [
  // Channels fork to both middle tiles (the agent)
  [["channels", "right", 0.3], ["harness", "left", 0.5]],
  [["channels", "right", 0.7], ["runtime", "left", 0.5]],
  // Harness sits on the runtime (stacked)
  [["harness", "bottom", 0.5], ["runtime", "top", 0.5]],
  // Both middle tiles reach out to the tools
  [["harness", "right", 0.5], ["tools", "left", 0.3]],
  [["runtime", "right", 0.5], ["tools", "left", 0.7]],
];

/** External stubs: a single anchor that runs out to the boundary. */
const STUBS: readonly Anchor[] = [
  ["channels", "left", 0.5], // users/systems reach in
  ["channels", "top", 0.5],
  ["harness", "top", 0.5], // outbound model calls
  ["runtime", "bottom", 0.5], // durable state / scheduling
  ["tools", "right", 0.5], // outbound to MCP / browser / sandbox
  ["tools", "bottom", 0.5],
];

/** Welded notches — one per wire/stub anchor on the card edge it docks to. */
const NODE_NOTCHES: Record<PartId, NotchConfig> = (() => {
  const map = {} as Record<PartId, Record<Side, number[]>>;
  const add = ([id, side, frac]: Anchor) => {
    (map[id] ??= { left: [], right: [], top: [], bottom: [] })[side].push(frac);
  };
  for (const [from, to] of WIRES) { add(from); add(to); }
  for (const s of STUBS) add(s);
  const out = {} as Record<PartId, NotchConfig>;
  for (const [id, sides] of Object.entries(map) as [PartId, Record<Side, number[]>][]) {
    out[id] = Object.fromEntries(
      (Object.entries(sides) as [Side, number[]][]).filter(([, f]) => f.length),
    );
  }
  return out;
})();

const BORDER_PAD = 20;
const BRAND = "#f56500"; // orange accent (matches the Queues diagram)

/** Orthogonal (right-angle) connector; co-linear endpoints collapse to a line. */
function orthPath(a: Point, b: Point, side: Side): string {
  if (side === "left" || side === "right") {
    if (Math.abs(a.y - b.y) < 1) return `M ${a.x},${a.y} L ${b.x},${b.y}`;
    const mx = (a.x + b.x) / 2;
    return `M ${a.x},${a.y} L ${mx},${a.y} L ${mx},${b.y} L ${b.x},${b.y}`;
  }
  if (Math.abs(a.x - b.x) < 1) return `M ${a.x},${a.y} L ${b.x},${b.y}`;
  const my = (a.y + b.y) / 2;
  return `M ${a.x},${a.y} L ${a.x},${my} L ${b.x},${my} L ${b.x},${b.y}`;
}

function toNodeRect(r: EdgeRect): NodeRect {
  return { l: r.l, t: r.t, r: r.l + r.w, b: r.t + r.h, w: r.w, h: r.h, cx: r.l + r.w / 2, cy: r.t + r.h / 2 };
}

// ─── Public component ──────────────────────────────────────

export function AgentPrimitivesDiagram({ label = "Agent parts" }: { label?: string }) {
  return (
    <Diagram label={label}>
      <AgentPrimitivesBody />
    </Diagram>
  );
}

// ─── Body ──────────────────────────────────────────────────

const EMPTY_RECT: EdgeRect = { l: 0, t: 0, w: 0, h: 0 };
type View = "primitives" | "composed";

function AgentPrimitivesBody() {
  const ctx = useDiagram();
  const [view, setView] = useState<View>("primitives");
  const composed = view === "composed";

  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<Partial<Record<PartId, HTMLAnchorElement | null>>>({});
  const labelRef = useRef<SVGTextElement>(null);
  const [labelSize, setLabelSize] = useState({ w: 0, h: 0 });

  const selector = useCallback((c: HTMLDivElement) => {
    const cr = c.getBoundingClientRect();
    const box = (el: Element): EdgeRect => {
      const b = el.getBoundingClientRect();
      return { l: b.left - cr.left, t: b.top - cr.top, w: b.width, h: b.height };
    };
    const rects: Partial<Record<PartId, EdgeRect>> = {};
    for (const p of PARTS) {
      const el = cardRefs.current[p.id];
      if (el) rects[p.id] = box(el);
    }
    return { rects, wrap: wrapperRef.current ? box(wrapperRef.current) : EMPTY_RECT };
  }, []);

  const { selected } = useMeasure(containerRef, selector, { deps: [composed] });
  const rects = selected?.rects ?? {};
  const wrap = selected?.wrap ?? EMPTY_RECT;

  const bx = wrap.l - BORDER_PAD;
  const by = wrap.t - BORDER_PAD;
  const bw = wrap.w + BORDER_PAD * 2;
  const bh = wrap.h + BORDER_PAD * 2;

  const labelText = composed ? "Composed" : "Primitives";
  useLayoutEffect(() => {
    try {
      const b = labelRef.current?.getBBox();
      if (b) setLabelSize({ w: b.width, h: b.height });
    } catch {
      /* not laid out yet */
    }
  }, [labelText, bx, by, bw]);

  const hasRects = Object.keys(rects).length === PARTS.length && wrap.w > 0;

  // Reduced-motion: drop transitions.
  const transitionMs = ctx?.reducedMotion ? 0 : 700;
  const fadeMs = ctx?.reducedMotion ? 0 : 350;
  const fade = { transition: `opacity ${fadeMs}ms ease-out` };

  // Wires + stubs + their connector dots, derived once.
  const pt = ([id, side, frac]: Anchor) => {
    const r = rects[id];
    return r ? edgePoint(r, side, frac) : null;
  };
  const toBoundary = (p: Point, side: Side): Point =>
    side === "left" ? { x: bx, y: p.y }
    : side === "right" ? { x: bx + bw, y: p.y }
    : side === "top" ? { x: p.x, y: by }
    : { x: p.x, y: by + bh };

  const segments: { d: string; dots: Point[]; opacity: number }[] = [];
  if (hasRects) {
    for (const [from, to] of WIRES) {
      const a = pt(from);
      const b = pt(to);
      if (a && b) segments.push({ d: orthPath(a, b, from[1]), dots: [a, b], opacity: 0.3 });
    }
    for (const s of STUBS) {
      const a = pt(s);
      if (a) segments.push({ d: orthPath(a, toBoundary(a, s[1]), s[1]), dots: [a], opacity: 0.2 });
    }
  }

  return (
    <div className="relative w-full mt-8">
      {/* Welded-chrome drop-shadow filter. */}
      <svg aria-hidden width="0" height="0" style={{ position: "absolute", width: 0, height: 0 }}>
        <defs>
          <filter id="welded-shadow" x="-4%" y="-4%" width="108%" height="116%">
            <feDropShadow dx="0" dy="1" stdDeviation="1" floodColor="rgb(0,0,0)" floodOpacity="0.06" />
          </filter>
        </defs>
      </svg>

      <DiagramStage accent={BRAND}>
        {/* View toggle */}
        <div className="flex items-center justify-end gap-2 p-3">
          <Tabs<View>
            options={[
              { id: "primitives", label: "Primitives" },
              { id: "composed", label: "Composed" },
            ]}
            active={view}
            onChange={setView}
            ariaLabel="Diagram view"
          />
        </div>

        {/* Viz body — HTML tiles under the SVG chrome. */}
        <div className="flex items-center justify-center px-3 pt-6 pb-12 md:px-10 md:pt-10 md:pb-20">
          <div ref={containerRef} className="relative">
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none overflow-visible"
              style={{ zIndex: 2 }}
              aria-hidden
            >
              {hasRects && (
                <>
                  {/* Boundary + its label */}
                  <rect
                    x={bx} y={by} width={bw} height={bh} rx={RX}
                    fill="none" stroke="rgba(0,0,0,0.25)" strokeWidth={1}
                    strokeDasharray={composed ? "none" : "6 4"}
                    className="dark:stroke-white/[0.15]"
                  />
                  {labelSize.w > 0 && (
                    <rect
                      x={bx + bw / 2 - labelSize.w / 2 - 8}
                      y={by - labelSize.h / 2 - 1}
                      width={labelSize.w + 16}
                      height={labelSize.h + 2}
                      className="fill-white dark:fill-neutral-950"
                    />
                  )}
                  <text
                    ref={labelRef}
                    x={bx + bw / 2} y={by}
                    textAnchor="middle" dominantBaseline="middle" letterSpacing="0.15em"
                    className="fill-neutral-800 dark:fill-neutral-200 font-mono font-medium text-[10px] uppercase select-none"
                  >
                    {labelText}
                  </text>

                  {/* Wires + stubs */}
                  {segments.map((s, i) => (
                    <path
                      key={`seg-${i}`}
                      d={s.d}
                      fill="none" stroke={BRAND} strokeWidth={1.5}
                      strokeLinecap="round" strokeLinejoin="round"
                      opacity={composed ? 0 : s.opacity}
                      style={fade}
                    />
                  ))}

                  {/* Welded node cards */}
                  {PARTS.map((p) => {
                    const r = rects[p.id];
                    return r ? (
                      <path
                        key={p.id}
                        d={indentedRect(toNodeRect(r), NODE_NOTCHES[p.id] ?? {})}
                        fill="white" stroke="rgba(0,0,0,0.15)" strokeWidth={1}
                        filter="url(#welded-shadow)"
                        className="dark:fill-neutral-900"
                      />
                    ) : null;
                  })}

                  {/* Connector dots */}
                  {segments.flatMap((s, i) =>
                    s.dots.map((d, j) => (
                      <rect
                        key={`dot-${i}-${j}`}
                        x={d.x - 2.5} y={d.y - 2.5} width={5} height={5}
                        fill={BRAND}
                        opacity={composed ? 0 : 1}
                        style={fade}
                      />
                    )),
                  )}
                </>
              )}
            </svg>

            {/* HTML tile layer */}
            <div
              ref={wrapperRef}
              className="relative grid items-center justify-items-center"
              style={{
                gridTemplateAreas: `"channels harness tools" "channels runtime tools"`,
                gridTemplateColumns: "auto auto auto",
                gap: composed ? 0 : 20,
                transition: `gap ${transitionMs}ms ease-out`,
                zIndex: 3,
              }}
            >
              {PARTS.map((p) => (
                <a
                  key={p.id}
                  href={p.href}
                  ref={(el) => {
                    cardRefs.current[p.id] = el;
                  }}
                  style={{ gridArea: p.id }}
                  className="flex items-center justify-center w-[112px] h-[40px] sm:w-[148px] sm:h-[44px] no-underline"
                >
                  <span
                    className={cn(
                      "relative z-10 text-[11px] sm:text-[13px] font-mono font-medium px-2 py-1 sm:px-3 sm:py-1.5 select-none text-center transition-colors duration-500",
                      composed
                        ? "text-neutral-400 dark:text-neutral-600"
                        : "text-neutral-900 dark:text-neutral-100",
                    )}
                  >
                    {p.label}
                  </span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </DiagramStage>
    </div>
  );
}
