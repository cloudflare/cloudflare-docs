"use client";

import { EASE_OUT } from "./motion";

// A right-aligned row of bars that fill left-to-right as a resource is
// allocated, dim when retained but dormant, and collapse to zero when gone.
// Pass `states` to drive each bar independently (this also drops the
// entrance cascade, since the caller then owns timing).
export type FillState = "filled" | "dim" | "empty";

const DEFAULT_WIDTHS = [28, 36, 22, 32];
const GAP = 3;
const HEIGHT = 3;
const STAGGER = 50;
const DURATION = 350;

const STATE_FILL: Record<FillState, string> = {
	filled: "fill-brand",
	dim: "fill-neutral-400 dark:fill-neutral-600",
	empty: "fill-neutral-300 dark:fill-neutral-800",
};

export interface FillBarsProps {
	/** The x-coordinate the bar row is right-aligned to. */
	right: number;
	y: number;
	/** Uniform fill state; overridden per-bar by `states`. */
	state: FillState;
	/** Reduced-motion: drop the cascade and quicken the transition. */
	reduced: boolean;
	/** Per-bar states, left→right. Present ⇒ no entrance cascade. */
	states?: FillState[];
	widths?: number[];
	gap?: number;
	height?: number;
	stagger?: number;
}

export function FillBars({
	right,
	y,
	state,
	reduced,
	states,
	widths = DEFAULT_WIDTHS,
	gap = GAP,
	height = HEIGHT,
	stagger = STAGGER,
}: FillBarsProps) {
	const perBar = states != null;
	const totalW = widths.reduce((a, b) => a + b, 0) + gap * (widths.length - 1);
	const start = right - totalW;
	const duration = reduced ? 200 : DURATION;

	return (
		<>
			{widths.map((w, i) => {
				const barState = states?.[i] ?? state;
				const filled = barState === "filled";
				const empty = barState === "empty";
				const dim = barState === "dim";
				const offset = widths.slice(0, i).reduce((a, b) => a + b, 0);
				const barX = start + offset + i * gap;
				const delay = filled && !perBar && !reduced ? i * stagger : 0;
				return (
					<rect
						key={i}
						x={barX}
						y={y}
						width={w}
						height={height}
						className={STATE_FILL[barState]}
						style={{
							opacity: filled ? 1 : dim ? 0.45 : 0,
							transform: `scaleX(${empty ? 0 : 1})`,
							transformBox: "fill-box",
							transformOrigin: "left center",
							transition: `transform ${duration}ms ${EASE_OUT} ${delay}ms, opacity ${duration}ms ${EASE_OUT} ${delay}ms`,
						}}
					/>
				);
			})}
		</>
	);
}
