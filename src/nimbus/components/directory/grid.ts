/**
 * Directory grid layout — the pure geometry shared by the build-time render
 * (`Directory.astro`) and the client controller (`directory.client.ts`), so
 * the corner-mark + border bookkeeping has a single source of truth.
 *
 * Layout is modelled on cloudflare.com/products: one bordered grid per
 * category. Cells are flat (defined only by the shared 1px lines) with small
 * rounded "corner marks" sitting on every line intersection. A section uses
 * as many columns as it has products (capped at LG_COLS), so a short category
 * never shows empty trailing columns.
 */
import type { CollectionEntry } from "astro:content";
import type { IconifyIconBuildResult } from "@iconify/utils";

export type ProductData = CollectionEntry<"directory"> & {
  icon?: IconifyIconBuildResult;
  groups: string[];
};

/** Max columns at `lg`. Below `lg` every grid is a single column. */
export const LG_COLS = 3;

/** Bucket for products that declare no group. */
export const UNCATEGORIZED = "Other";

// Static `grid-cols` strings, indexed by resolved column count, so Tailwind's
// scanner sees them as literals.
export const LG_GRID_CLASS: Record<number, string> = {
  1: "grid grid-cols-1 lg:grid-cols-1",
  2: "grid grid-cols-1 lg:grid-cols-2",
  3: "grid grid-cols-1 lg:grid-cols-3",
};

export type Corner = "tl" | "tr" | "bl" | "br";

const CORNER_OFFSET: Record<Corner, string> = {
  tl: "top:-7px;left:-7px",
  tr: "top:-7px;right:-7px",
  bl: "left:-7px;bottom:-7px",
  br: "right:-7px;bottom:-7px",
};

/** Columns a section of `count` products should use (1..LG_COLS). */
export function resolveCols(count: number): number {
  return Math.min(LG_COLS, count) || 1;
}

// One mark per line intersection, deduplicated by ownership so adjacent cells
// don't stack squares on the same point:
//   - top-left cell owns all four of its corners
//   - the rest of the top row owns its top-right + bottom-right
//   - the rest of the first column owns its bottom-left + bottom-right
//   - every other cell owns only its bottom-right
export function cornersFor(index: number, cols: number): Corner[] {
  const row = Math.floor(index / cols);
  const col = index % cols;
  if (row === 0 && col === 0) return ["tl", "tr", "bl", "br"];
  if (row === 0) return ["tr", "br"];
  if (col === 0) return ["bl", "br"];
  return ["br"];
}

// Each cell closes its own right + bottom edge; the grid container draws the
// top + left edges (see Directory.astro). This "self-closing" model means a
// ragged final row needs no filler cells — the populated cells still draw
// clean single-width lines, and there are no empty boxes. Uniform across
// columns, so it takes no index/cols.
export const cellClass =
  "border-border bg-background relative flex h-full flex-col border-r border-b";

/** Inner HTML for a cell's corner-mark container (the small squares). */
export function cornerSpansHTML(corners: Corner[]): string {
  return corners
    .map(
      (c) =>
        `<span class="absolute bg-background" style="width:14px;height:14px;border:1px solid var(--color-border);border-radius:3px;${CORNER_OFFSET[c]}"></span>`,
    )
    .join("");
}
