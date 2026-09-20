// SVG path helpers for welded cards: a rounded border tracking an HTML box,
// with small notches where connectors dock. A notch side is `true` (one
// notch at 0.5) or fractional positions `[0.33, 0.66]`; notches overlapping a
// corner arc are dropped, so any fraction is safe to pass.

export const RX = 6;
export const NOTCH_W = 4;
export const NOTCH_D = 2;

export interface EdgeRect {
	l: number;
	t: number;
	w: number;
	h: number;
}

export interface NodeRect extends EdgeRect {
	cx: number;
	cy: number;
	r: number;
	b: number;
}

export type NotchSide = boolean | number[];

export interface NotchConfig {
	top?: NotchSide;
	bottom?: NotchSide;
	left?: NotchSide;
	right?: NotchSide;
}

function resolveSide(side: NotchSide | undefined, edge: number): number[] {
	if (!side) return [];
	const raw = side === true ? [0.5] : [...side].sort((a, b) => a - b);
	if (edge <= 0) return [];
	const min = (RX + NOTCH_W) / edge;
	const max = 1 - min;
	if (min >= max) return [];
	return raw.filter((f) => f >= min && f <= max);
}

export function indentedRect(rect: NodeRect, notches: NotchConfig): string {
	const { l, t, r: right, b, w, h } = rect;
	const rx = Math.min(RX, w / 2, h / 2);
	const nw = NOTCH_W;
	const nd = NOTCH_D;

	const top = resolveSide(notches.top, w);
	const bottom = resolveSide(notches.bottom, w);
	const leftSide = resolveSide(notches.left, h);
	const rightSide = resolveSide(notches.right, h);

	const parts: string[] = [`M ${l + rx},${t}`];

	for (const frac of top) {
		const nx = l + w * frac;
		parts.push(`L ${nx - nw},${t}`);
		parts.push(
			`C ${nx - nw * 0.5},${t} ${nx - nw * 0.4},${t + nd} ${nx},${t + nd}`,
		);
		parts.push(
			`C ${nx + nw * 0.4},${t + nd} ${nx + nw * 0.5},${t} ${nx + nw},${t}`,
		);
	}
	parts.push(`L ${right - rx},${t}`);
	parts.push(`Q ${right},${t} ${right},${t + rx}`);

	for (const frac of rightSide) {
		const ny = t + h * frac;
		parts.push(`L ${right},${ny - nw}`);
		parts.push(
			`C ${right},${ny - nw * 0.5} ${right - nd},${ny - nw * 0.4} ${right - nd},${ny}`,
		);
		parts.push(
			`C ${right - nd},${ny + nw * 0.4} ${right},${ny + nw * 0.5} ${right},${ny + nw}`,
		);
	}
	parts.push(`L ${right},${b - rx}`);
	parts.push(`Q ${right},${b} ${right - rx},${b}`);

	for (const frac of [...bottom].reverse()) {
		const nx = l + w * frac;
		parts.push(`L ${nx + nw},${b}`);
		parts.push(
			`C ${nx + nw * 0.5},${b} ${nx + nw * 0.4},${b - nd} ${nx},${b - nd}`,
		);
		parts.push(
			`C ${nx - nw * 0.4},${b - nd} ${nx - nw * 0.5},${b} ${nx - nw},${b}`,
		);
	}
	parts.push(`L ${l + rx},${b}`);
	parts.push(`Q ${l},${b} ${l},${b - rx}`);

	for (const frac of [...leftSide].reverse()) {
		const ny = t + h * frac;
		parts.push(`L ${l},${ny + nw}`);
		parts.push(
			`C ${l},${ny + nw * 0.5} ${l + nd},${ny + nw * 0.4} ${l + nd},${ny}`,
		);
		parts.push(
			`C ${l + nd},${ny - nw * 0.4} ${l},${ny - nw * 0.5} ${l},${ny - nw}`,
		);
	}
	parts.push(`L ${l},${t + rx}`);
	parts.push(`Q ${l},${t} ${l + rx},${t}`);
	parts.push("Z");

	return parts.join(" ");
}
