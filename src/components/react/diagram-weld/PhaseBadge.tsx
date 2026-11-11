"use client";

import { type NodeRect } from "./welding";
import { MOTION, EASE_OUT } from "./motion";

// Right-aligned header badge naming a stateful entity's current phase, so
// state and identity read as one object. Tones are an emphasis ladder; the
// caller owns the state → tone mapping.
export type PhaseTone = "accent" | "dim" | "muted";

const TONE_FILL: Record<PhaseTone, string> = {
	accent: "fill-brand",
	dim: "fill-neutral-400 dark:fill-neutral-500",
	muted: "fill-neutral-500 dark:fill-neutral-400",
};

export interface PhaseBadgeProps {
	rect: NodeRect;
	/** Height of the card's header band (top → divider). */
	headerH: number;
	fontSize: number;
	label: string;
	tone: PhaseTone;
	/** Horizontal inset from the card's right edge. */
	pad?: number;
}

export function PhaseBadge({
	rect,
	headerH,
	fontSize,
	label,
	tone,
	pad,
}: PhaseBadgeProps) {
	const gutter = pad ?? Math.max(2, (headerH - 6) / 2);
	return (
		<text
			x={rect.r - gutter}
			y={rect.t + headerH / 2 + fontSize * 0.35}
			textAnchor="end"
			className={TONE_FILL[tone]}
			style={{
				fontFamily: "var(--font-mono)",
				fontSize,
				fontWeight: 500,
				letterSpacing: "0.18em",
				textTransform: "uppercase",
				transition: `fill ${MOTION.transition}ms ${EASE_OUT}`,
			}}
		>
			{label}
		</text>
	);
}
