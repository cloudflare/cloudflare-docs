"use client";

// A grid of squares that pulse in clockwise spiral order to show a host is
// actively computing. Colour is inherited via `currentColor` — wrap in a
// `<g>` setting `color`. Motion is the `weld-compute-pulse` keyframe (see
// globals.css) with a per-cell negative delay so the spike travels the grid;
// under reduced motion the grid renders static (active = lit, idle = dim).

const COLS = 8;
const ROWS = 3;
const CELL = 6;
const GAP = 2;
const CELLS = COLS * ROWS;

export const COMPUTE_GLYPH_W = COLS * CELL + (COLS - 1) * GAP;
export const COMPUTE_GLYPH_H = ROWS * CELL + (ROWS - 1) * GAP;

const SPIRAL_ORDER = [
	0, 1, 2, 3, 4, 5, 6, 7, 15, 23, 22, 21, 20, 19, 18, 17, 16, 8, 9, 10, 11, 12,
	13, 14,
];

const CYCLE_S = 1.5;

export interface ComputeGlyphProps {
	/** Top-left of the grid in parent SVG coords. */
	x: number;
	y: number;
	/** Cells cascade in spiral order when true; dim-steady when false. */
	active: boolean;
	reduced: boolean;
	/** Pause the spiral (e.g. offscreen). Default true. */
	playing?: boolean;
}

export function ComputeGlyph({
	x,
	y,
	active,
	reduced,
	playing = true,
}: ComputeGlyphProps) {
	return (
		<>
			{Array.from({ length: CELLS }, (_, i) => {
				const row = Math.floor(i / COLS);
				const col = i % COLS;
				const cx = x + col * (CELL + GAP);
				const cy = y + row * (CELL + GAP);
				if (reduced || !active) {
					return (
						<rect
							key={i}
							x={cx}
							y={cy}
							width={CELL}
							height={CELL}
							fill="currentColor"
							style={{
								opacity: reduced ? (active ? 1 : 0.3) : 0.3,
								transition: "opacity 200ms ease-out",
							}}
						/>
					);
				}
				const stepFrac = SPIRAL_ORDER.indexOf(i) / CELLS;
				return (
					<rect
						key={i}
						x={cx}
						y={cy}
						width={CELL}
						height={CELL}
						fill="currentColor"
						style={{
							opacity: 0.25,
							animation: `weld-compute-pulse ${CYCLE_S}s linear infinite`,
							animationDelay: `${-(stepFrac * CYCLE_S)}s`,
							animationPlayState: playing ? "running" : "paused",
						}}
					/>
				);
			})}
		</>
	);
}
