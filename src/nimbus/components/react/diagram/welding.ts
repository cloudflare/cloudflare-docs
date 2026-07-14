/**
 * welding.ts — SVG path + measurement helpers for "welded" node cards.
 *
 * Cards are HTML for content + SVG for chrome. The SVG path tracks the
 * HTML box and draws a rounded border with small notches where connectors
 * dock or where internal dividers are.
 *
 *   `true`         → single notch at center (frac 0.5)
 *   `[0.33, 0.66]` → two notches at 33% and 66% along the edge
 *
 *   const path = indentedRect(rect, { top: true, left: [0.3, 0.7] });
 *   <path d={path} fill="white" stroke="..." strokeWidth={1} />
 *
 * `measureRect` and `measureDividerFracs` mirror the per-card pattern
 * shared by every flue visualisation: read DOM boxes, hand them to
 * `indentedRect`. Live here so each viz can stay focused on its own logic.
 */

// ── Geometry tokens ─────────────────────────────────────────────────────

/** Card corner radius (px). Matches `rounded-sm` (~6px). */
export const RX = 6;
/** Half-width of the notch indentation. */
export const NOTCH_W = 4;
/** Depth of the notch dip into the card. */
export const NOTCH_D = 2;

// ── Types ───────────────────────────────────────────────────────────────

export interface NodeRect {
  cx: number;
  cy: number;
  l: number;
  r: number;
  t: number;
  b: number;
  w: number;
  h: number;
}

/** Either a boolean (single center notch) or an array of fractional positions. */
export type NotchSide = boolean | number[];

export interface NotchConfig {
  top?: NotchSide;
  bottom?: NotchSide;
  left?: NotchSide;
  right?: NotchSide;
}

// ── Path builder ────────────────────────────────────────────────────────

/**
 * Resolve a NotchSide to a sorted array of fractional positions (0–1),
 * filtered to positions whose notch geometry (`f * edge ± NOTCH_W`) clears
 * both corners by `RX`. Notches that would overlap a corner radius are
 * silently dropped — the alternative is a malformed path, which is a
 * silent visual bug far harder to track down than a missing notch.
 *
 * `edge` is the length of the side the notch sits on. For top/bottom that's
 * the rect width; for left/right it's the height.
 */
function resolveSide(side: NotchSide | undefined, edge: number): number[] {
  if (!side) return [];
  const raw = side === true ? [0.5] : [...side].sort((a, b) => a - b);
  if (edge <= 0) return [];
  // A notch spans [f*edge - NOTCH_W, f*edge + NOTCH_W]. To keep clear of a
  // corner radius we need that span to sit entirely inside [RX, edge - RX].
  const min = (RX + NOTCH_W) / edge;
  const max = 1 - min;
  if (min >= max) return [];
  return raw.filter((f) => f >= min && f <= max);
}

/**
 * Build a rounded-rect SVG path with optional notches on each edge.
 * Each notch is `NOTCH_D` deep and `NOTCH_W * 2` wide. Position is fractional
 * along the edge — 0 = top/left, 1 = bottom/right.
 */
export function indentedRect(rect: NodeRect, notches: NotchConfig): string {
  const { l, t, r: right, b, w, h } = rect;
  const rx = Math.min(RX, w / 2, h / 2);
  const nw = NOTCH_W;
  const nd = NOTCH_D;

  const top = resolveSide(notches.top, w);
  const bottom = resolveSide(notches.bottom, w);
  const leftSide = resolveSide(notches.left, h);
  const rightSide = resolveSide(notches.right, h);

  const parts: string[] = [];

  // Start at top-left corner (after the radius)
  parts.push(`M ${l + rx},${t}`);

  // Top edge — left to right (fracs sorted ascending)
  for (const frac of top) {
    const nx = l + w * frac;
    parts.push(`L ${nx - nw},${t}`);
    parts.push(`C ${nx - nw * 0.5},${t} ${nx - nw * 0.4},${t + nd} ${nx},${t + nd}`);
    parts.push(`C ${nx + nw * 0.4},${t + nd} ${nx + nw * 0.5},${t} ${nx + nw},${t}`);
  }
  parts.push(`L ${right - rx},${t}`);
  parts.push(`Q ${right},${t} ${right},${t + rx}`);

  // Right edge — top to bottom (fracs sorted ascending)
  for (const frac of rightSide) {
    const ny = t + h * frac;
    parts.push(`L ${right},${ny - nw}`);
    parts.push(`C ${right},${ny - nw * 0.5} ${right - nd},${ny - nw * 0.4} ${right - nd},${ny}`);
    parts.push(`C ${right - nd},${ny + nw * 0.4} ${right},${ny + nw * 0.5} ${right},${ny + nw}`);
  }
  parts.push(`L ${right},${b - rx}`);
  parts.push(`Q ${right},${b} ${right - rx},${b}`);

  // Bottom edge — right to left (reverse sort)
  for (const frac of [...bottom].reverse()) {
    const nx = l + w * frac;
    parts.push(`L ${nx + nw},${b}`);
    parts.push(`C ${nx + nw * 0.5},${b} ${nx + nw * 0.4},${b - nd} ${nx},${b - nd}`);
    parts.push(`C ${nx - nw * 0.4},${b - nd} ${nx - nw * 0.5},${b} ${nx - nw},${b}`);
  }
  parts.push(`L ${l + rx},${b}`);
  parts.push(`Q ${l},${b} ${l},${b - rx}`);

  // Left edge — bottom to top (reverse sort)
  for (const frac of [...leftSide].reverse()) {
    const ny = t + h * frac;
    parts.push(`L ${l},${ny + nw}`);
    parts.push(`C ${l},${ny + nw * 0.5} ${l + nd},${ny + nw * 0.4} ${l + nd},${ny}`);
    parts.push(`C ${l + nd},${ny - nw * 0.4} ${l},${ny - nw * 0.5} ${l},${ny - nw}`);
  }
  parts.push(`L ${l},${t + rx}`);
  parts.push(`Q ${l},${t} ${l + rx},${t}`);
  parts.push("Z");

  return parts.join(" ");
}

// ── Measurement helpers ─────────────────────────────────────────────────

/** Measure an element relative to a container, as a NodeRect. */
export function measureRect(el: HTMLElement, container: HTMLElement): NodeRect {
  const c = container.getBoundingClientRect();
  const b = el.getBoundingClientRect();
  return {
    cx: b.left - c.left + b.width / 2,
    cy: b.top - c.top + b.height / 2,
    l: b.left - c.left,
    r: b.right - c.left,
    t: b.top - c.top,
    b: b.bottom - c.top,
    w: b.width,
    h: b.height,
  };
}

/**
 * Y-fractions (0–1) of `[data-notch]` markers that are direct children of
 * the card. Used to align left/right notches with internal divider lines —
 * skips dividers that belong to nested cards.
 */
export function measureDividerFracs(card: HTMLElement): number[] {
  const cb = card.getBoundingClientRect();
  if (cb.height === 0) return [];
  return Array.from(card.querySelectorAll<HTMLElement>("[data-notch]"))
    .filter((d) => d.parentElement === card)
    .map((d) => {
      const dr = d.getBoundingClientRect();
      return (dr.top + dr.height / 2 - cb.top) / cb.height;
    });
}

/** `[fracs] → fracs` if non-empty, else `true` (single center notch). */
export function fracsOrCenter(fracs: number[] | undefined): NotchSide {
  return fracs && fracs.length > 0 ? fracs : true;
}
