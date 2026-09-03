// Shared SVG primitives for the weld visual language. Two connector
// conventions:
//   - welded/undirected: endpoints via dockPoint(rect, side), no arrowhead.
//   - directed/arrowed:  endpoints via edgePoint(rect, side), arrowhead set,
//     plus fromSide/toSide so the elbow emerges/arrives on the right axis.
// Notches encode where connectors dock (SimpleCard adds divider notches
// automatically). The #diagram-shadow filter comes from the shared
// <DiagramDefs /> (rendered once by WeldCanvas); the arrowhead is drawn
// inline by Connector via <Arrowhead> so its colour and opacity always match
// the line — an SVG <marker> cannot reliably inherit the referencing path's
// paint (see the note on <Arrowhead>).
import type { ReactNode } from "react";
import { cn } from "@/lib/cn";
import { EASE_OUT, MOTION } from "./motion";
import {
	NOTCH_D,
	RX,
	indentedRect,
	type NodeRect,
	type NotchConfig,
	type NotchSide,
} from "./welding";

const SHADOW_ID = "diagram-shadow";

// Distance an arrowed line stops short of `to` so the inline arrowhead glyph
// (drawn forward from that point) lands its tip on the card edge.
export const ARROW_OFFSET = 6;

// Arrowhead glyph, authored from its base at (0,4) extending +x to the tip at
// ~(6,4); ARROW_OFFSET matches that reach.
const ARROW_GLYPH_D =
	"M 0,1.5 Q 0,0 1.5,0 Q 3.5,1 5.8,3.2 Q 6.5,4 5.8,4.8 Q 3.5,7 1.5,8 Q 0,8 0,6.5 Z";

// Inline arrowhead filled with `currentColor`, meant to sit inside the same
// colour context as its connector so the head always matches the line's
// colour AND opacity. This replaces an SVG <marker>: marker content cannot
// reliably take the referencing path's paint — `currentColor` resolves at the
// marker's own (detached) position, and `context-stroke` is unevenly
// supported — which is why shared markers rendered black arrowheads.
export function Arrowhead({
	x,
	y,
	angle,
}: {
	x: number;
	y: number;
	/** Degrees; the direction the arrow points (0 = +x / right). */
	angle: number;
}) {
	return (
		<path
			d={ARROW_GLYPH_D}
			transform={`translate(${x} ${y}) rotate(${angle}) translate(0 -4)`}
			fill="currentColor"
		/>
	);
}

export interface WeldedCardProps {
	rect: NodeRect;
	notches?: NotchConfig;
	active?: boolean;
	ghost?: boolean;
	/** Use the de-emphasized surface color. */
	muted?: boolean;
	/** Render the border as a placeholder outline. */
	dashed?: boolean;
	/** Accent fill instead of plain white — for "your code" / input cards. */
	accent?: boolean;
	/** Drop the shadow — for a card overlaid on another. */
	flat?: boolean;
}

export function WeldedCard({
	rect,
	notches = { top: true, bottom: true, left: true, right: true },
	active = false,
	ghost = false,
	muted = false,
	dashed = false,
	accent = false,
	flat = false,
}: WeldedCardProps) {
	return (
		<path
			d={indentedRect(rect, notches)}
			fill={accent ? "var(--color-brand)" : "white"}
			fillOpacity={accent ? 0.06 : 1}
			stroke={active ? "var(--color-brand)" : "currentColor"}
			strokeWidth={active ? 1.25 : 1}
			strokeDasharray={dashed ? "4 3" : undefined}
			filter={flat ? undefined : `url(#${SHADOW_ID})`}
			opacity={ghost ? 0.4 : 1}
			className={cn(
				"dark:fill-neutral-900",
				!active && "text-neutral-300 dark:text-neutral-700",
			)}
			style={{
				fill: muted ? "var(--nb-muted)" : undefined,
				transition: `stroke ${MOTION.transition}ms ${EASE_OUT}, stroke-width ${MOTION.transition}ms ${EASE_OUT}, opacity ${MOTION.transition}ms ${EASE_OUT}`,
			}}
		/>
	);
}

export interface CardHeaderProps {
	/** Top-left of the header bounding box (not the indicator square). */
	x: number;
	y: number;
	label: string;
	active?: boolean;
	indicator?: number;
	fontSize?: number;
	/** Optional right-aligned secondary text (count, id). */
	meta?: string;
	rightEdge?: number;
}

export function CardHeader({
	x,
	y,
	label,
	active = false,
	indicator = 6,
	fontSize = 8,
	meta,
	rightEdge,
}: CardHeaderProps) {
	const labelX = x + indicator + 6;
	const labelY = y + indicator / 2 + fontSize * 0.35;
	return (
		<g>
			<rect
				x={x}
				y={y}
				width={indicator}
				height={indicator}
				className={
					active ? "fill-brand" : "fill-neutral-400 dark:fill-neutral-600"
				}
				style={{ transition: `fill ${MOTION.transition}ms ${EASE_OUT}` }}
			/>
			<text
				x={labelX}
				y={labelY}
				className={cn(
					"font-mono font-medium uppercase",
					active
						? "fill-neutral-900 dark:fill-neutral-100"
						: "fill-neutral-700 dark:fill-neutral-300",
				)}
				style={{
					fontSize,
					letterSpacing: "0.15em",
					transition: `fill ${MOTION.transition}ms ${EASE_OUT}`,
				}}
			>
				{label}
			</text>
			{meta != null && rightEdge != null && (
				<text
					x={rightEdge}
					y={labelY}
					textAnchor="end"
					className="fill-neutral-500 font-mono uppercase dark:fill-neutral-400"
					style={{
						fontSize: Math.max(7, fontSize - 1),
						letterSpacing: "0.18em",
					}}
				>
					{meta}
				</text>
			)}
		</g>
	);
}

export interface CardDividerProps {
	l: number;
	r: number;
	y: number;
}

// Insets by NOTCH_D so the line meets the deepest point of the side notches
// (the welded seam); the card path must carry left/right notches at this y.
export function CardDivider({ l, r, y }: CardDividerProps) {
	return (
		<line
			x1={l + NOTCH_D}
			y1={y}
			x2={r - NOTCH_D}
			y2={y}
			stroke="currentColor"
			strokeWidth={1}
			className="text-neutral-200 dark:text-neutral-800"
		/>
	);
}

export interface Point {
	x: number;
	y: number;
}

// Elbow between two points. Shape depends on each endpoint's docking axis:
// y→y = V-H-V (default), x→x = H-V-H, x→y / y→x = single-bend L. Colinear
// endpoints collapse to a straight line.
export function makePath(
	from: Point,
	to: Point,
	fromSide?: Side,
	toSide?: Side,
	r = RX,
): string {
	if (Math.abs(from.x - to.x) < 1 || Math.abs(from.y - to.y) < 1) {
		return `M ${from.x},${from.y} L ${to.x},${to.y}`;
	}
	const startAxis = sideAxis(fromSide) ?? "y";
	const endAxis = sideAxis(toSide) ?? "y";
	if (startAxis === "x" && endAxis === "x") return hvhPath(from, to, r);
	if (startAxis === "x" && endAxis === "y")
		return lPath(from, to, "h-first", r);
	if (startAxis === "y" && endAxis === "x")
		return lPath(from, to, "v-first", r);
	return vhvPath(from, to, r);
}

type Axis = "x" | "y";

function sideAxis(side?: Side): Axis | undefined {
	if (side === "left" || side === "right") return "x";
	if (side === "top" || side === "bottom") return "y";
	return undefined;
}

// V-H-V with the horizontal segment pinned at a caller-specified `midY`, so
// a set of fan-in edges can share one corridor.
export function vhvPathAt(
	from: Point,
	to: Point,
	midY: number,
	r = RX,
): string {
	const sx = Math.sign(to.x - from.x);
	const sy1 = Math.sign(midY - from.y);
	const sy2 = Math.sign(to.y - midY);
	const rr = Math.min(
		r,
		Math.abs(midY - from.y),
		Math.abs(to.x - from.x) / 2,
		Math.abs(to.y - midY),
	);
	return [
		`M ${from.x},${from.y}`,
		`L ${from.x},${midY - rr * sy1}`,
		`Q ${from.x},${midY} ${from.x + rr * sx},${midY}`,
		`L ${to.x - rr * sx},${midY}`,
		`Q ${to.x},${midY} ${to.x},${midY + rr * sy2}`,
		`L ${to.x},${to.y}`,
	].join(" ");
}

function vhvPath(from: Point, to: Point, r: number): string {
	return vhvPathAt(from, to, (from.y + to.y) / 2, r);
}

export function hvhPath(from: Point, to: Point, r = RX): string {
	const midX = (from.x + to.x) / 2;
	const sy = Math.sign(to.y - from.y);
	const sx1 = Math.sign(midX - from.x);
	const sx2 = Math.sign(to.x - midX);
	const rr = Math.min(
		r,
		Math.abs(midX - from.x),
		Math.abs(to.y - from.y) / 2,
		Math.abs(to.x - midX),
	);
	return [
		`M ${from.x},${from.y}`,
		`L ${midX - rr * sx1},${from.y}`,
		`Q ${midX},${from.y} ${midX},${from.y + rr * sy}`,
		`L ${midX},${to.y - rr * sy}`,
		`Q ${midX},${to.y} ${midX + rr * sx2},${to.y}`,
		`L ${to.x},${to.y}`,
	].join(" ");
}

function lPath(
	from: Point,
	to: Point,
	order: "h-first" | "v-first",
	r: number,
): string {
	const sx = Math.sign(to.x - from.x);
	const sy = Math.sign(to.y - from.y);
	const rr = Math.min(r, Math.abs(to.x - from.x), Math.abs(to.y - from.y));
	if (order === "h-first") {
		return [
			`M ${from.x},${from.y}`,
			`L ${to.x - rr * sx},${from.y}`,
			`Q ${to.x},${from.y} ${to.x},${from.y + rr * sy}`,
			`L ${to.x},${to.y}`,
		].join(" ");
	}
	return [
		`M ${from.x},${from.y}`,
		`L ${from.x},${to.y - rr * sy}`,
		`Q ${from.x},${to.y} ${from.x + rr * sx},${to.y}`,
		`L ${to.x},${to.y}`,
	].join(" ");
}

export interface ConnectorProps {
	from: Point;
	to: Point;
	fromSide?: Side;
	toSide?: Side;
	active?: boolean;
	ghost?: boolean;
	arrowhead?: boolean;
	straight?: boolean;
}

export function Connector({
	from,
	to,
	fromSide,
	toSide,
	active = false,
	ghost = false,
	arrowhead = false,
	straight = false,
}: ConnectorProps) {
	let endX = to.x;
	let endY = to.y;
	if (arrowhead) {
		const dx = to.x - from.x;
		const dy = to.y - from.y;
		const finalAxis: Axis =
			Math.abs(dy) < 1
				? "x"
				: Math.abs(dx) < 1
					? "y"
					: (sideAxis(toSide) ?? "y");
		if (finalAxis === "x") {
			endX = to.x - Math.sign(dx) * ARROW_OFFSET;
		} else {
			endY = to.y - Math.sign(dy) * ARROW_OFFSET;
		}
	}
	const adjusted = { x: endX, y: endY };

	const d = straight
		? `M ${from.x},${from.y} L ${adjusted.x},${adjusted.y}`
		: makePath(from, adjusted, fromSide, toSide);
	// Arrow direction = the final segment's tangent, mirroring a marker's
	// orient="auto": for a straight line that is from→end; for an elbow the
	// approach is axis-aligned, so end←(pulled-back point).
	const angle = straight
		? (Math.atan2(adjusted.y - from.y, adjusted.x - from.x) * 180) / Math.PI
		: (Math.atan2(to.y - adjusted.y, to.x - adjusted.x) * 180) / Math.PI;
	return (
		<g
			className={active ? undefined : "text-neutral-300 dark:text-neutral-700"}
			style={{
				color: active ? "var(--color-brand)" : undefined,
				opacity: ghost ? 0.3 : active ? 1 : 0.55,
				transition: `color ${MOTION.transition}ms ${EASE_OUT}, opacity ${MOTION.transition}ms ${EASE_OUT}`,
			}}
		>
			<path
				d={d}
				fill="none"
				stroke="currentColor"
				strokeWidth={active ? 1.5 : 1.25}
				strokeLinecap="round"
			/>
			{arrowhead && <Arrowhead x={adjusted.x} y={adjusted.y} angle={angle} />}
		</g>
	);
}

export type Side = "top" | "right" | "bottom" | "left";

// Endpoint inside the notch dip (inset by NOTCH_D) — welded/undirected.
export function dockPoint(rect: NodeRect, side: Side, frac = 0.5): Point {
	if (side === "top") return { x: rect.l + rect.w * frac, y: rect.t + NOTCH_D };
	if (side === "bottom")
		return { x: rect.l + rect.w * frac, y: rect.b - NOTCH_D };
	if (side === "left")
		return { x: rect.l + NOTCH_D, y: rect.t + rect.h * frac };
	return { x: rect.r - NOTCH_D, y: rect.t + rect.h * frac };
}

// Endpoint at the card's outer edge — directed/arrowed.
export function edgePoint(rect: NodeRect, side: Side, frac = 0.5): Point {
	if (side === "top") return { x: rect.l + rect.w * frac, y: rect.t };
	if (side === "bottom") return { x: rect.l + rect.w * frac, y: rect.b };
	if (side === "left") return { x: rect.l, y: rect.t + rect.h * frac };
	return { x: rect.r, y: rect.t + rect.h * frac };
}

export function makeRect(x: number, y: number, w: number, h: number): NodeRect {
	return {
		l: x,
		t: y,
		r: x + w,
		b: y + h,
		w,
		h,
		cx: x + w / 2,
		cy: y + h / 2,
	};
}

function withFrac(side: NotchSide | undefined, frac: number): NotchSide {
	if (side === true) return [0.5, frac].sort((a, b) => a - b);
	if (side == null || side === false) return [frac];
	return [...side, frac].sort((a, b) => a - b);
}

// Add left+right notches at every divider y so each seam reads as welded.
export function notchesForDividers(
	rect: NodeRect,
	dividerYs: number[],
	base: NotchConfig = {},
): NotchConfig {
	const fracs = dividerYs
		.map((y) => (y - rect.t) / rect.h)
		.filter((f) => f > 0 && f < 1)
		.sort((a, b) => a - b);
	const left = fracs.reduce<NotchSide>(
		(acc, f) => withFrac(acc, f),
		base.left ?? false,
	);
	const right = fracs.reduce<NotchSide>(
		(acc, f) => withFrac(acc, f),
		base.right ?? false,
	);
	return { ...base, left, right };
}

// Cards are sized from their labels, assuming DM Mono: advance ≈ 0.6 × font
// size, letter-spacing applied per character (em). Slightly conservative so
// hinting never pushes text into the edge.
export const MONO_CHAR_RATIO = 0.6;
export const CARD_PAD_X = 10;
export const CARD_MIN_W = 48;
export const CARD_LABEL_H = 30;

export interface MeasureLabelOptions {
	fontSize?: number;
	letterSpacing?: number;
}

export function measureLabel(
	text: string,
	opts: MeasureLabelOptions = {},
): number {
	const fontSize = opts.fontSize ?? 9;
	const letterSpacing = opts.letterSpacing ?? 0.15;
	const perChar = fontSize * (MONO_CHAR_RATIO + letterSpacing);
	return Math.ceil(text.length * perChar);
}

export interface AutoCardOptions extends MeasureLabelOptions {
	padX?: number;
	minW?: number;
}

export function autoCardWidth(
	labels: string[],
	opts: AutoCardOptions = {},
): number {
	const padX = opts.padX ?? CARD_PAD_X;
	const minW = opts.minW ?? CARD_MIN_W;
	let textW = 0;
	for (const l of labels) {
		const w = measureLabel(l, opts);
		if (w > textW) textW = w;
	}
	return Math.max(minW, textW + padX * 2);
}

export function autoLabelRect(
	x: number,
	y: number,
	label: string,
	opts: AutoCardOptions & { h?: number } = {},
): NodeRect {
	const w = autoCardWidth([label], opts);
	return makeRect(x, y, w, opts.h ?? CARD_LABEL_H);
}

export function uniformCardWidth(
	labels: string[],
	opts: AutoCardOptions = {},
): number {
	return autoCardWidth(labels, opts);
}

// Small tracked-uppercase-mono caption, for row labels and ambient text.
export type CaptionTone = "muted" | "ghost" | "body";

const CAPTION_TONE: Record<CaptionTone, string> = {
	muted: "fill-neutral-600 dark:fill-neutral-300",
	ghost: "fill-neutral-500 dark:fill-neutral-400",
	body: "fill-neutral-700 dark:fill-neutral-300",
};

export interface CaptionProps {
	x: number;
	y: number;
	anchor?: "start" | "middle" | "end";
	size?: number;
	tone?: CaptionTone;
	opacity?: number;
	children: ReactNode;
}

export function Caption({
	x,
	y,
	anchor = "start",
	size = 10,
	tone = "muted",
	opacity,
	children,
}: CaptionProps) {
	return (
		<text
			x={x}
			y={y}
			textAnchor={anchor}
			opacity={opacity}
			className={CAPTION_TONE[tone]}
			style={{
				fontFamily: "var(--font-mono)",
				fontSize: size,
				letterSpacing: "0.18em",
				textTransform: "uppercase",
			}}
		>
			{children}
		</text>
	);
}

// Centred tracked-uppercase-mono label with a two-tone active state.
export interface CenterLabelProps {
	cx: number;
	cy: number;
	fontSize: number;
	active?: boolean;
	weight?: number;
	children: ReactNode;
}

export function CenterLabel({
	cx,
	cy,
	fontSize,
	active = false,
	weight = 500,
	children,
}: CenterLabelProps) {
	return (
		<text
			x={cx}
			y={cy + fontSize * 0.33}
			textAnchor="middle"
			className={
				active
					? "fill-neutral-900 dark:fill-neutral-100"
					: "fill-neutral-700 dark:fill-neutral-300"
			}
			style={{
				fontFamily: "var(--font-mono)",
				fontSize,
				fontWeight: weight,
				letterSpacing: "0.15em",
				textTransform: "uppercase",
				transition: `fill ${MOTION.transition}ms ${EASE_OUT}`,
			}}
		>
			{children}
		</text>
	);
}

export interface LabelCardProps {
	rect: NodeRect;
	notches?: NotchConfig;
	label: string;
	active?: boolean;
	ghost?: boolean;
	fontSize?: number;
}

export function LabelCard({
	rect,
	notches,
	label,
	active = false,
	ghost = false,
	fontSize = 9,
}: LabelCardProps) {
	return (
		<g>
			<WeldedCard rect={rect} notches={notches} active={active} ghost={ghost} />
			<text
				x={rect.cx}
				y={rect.cy + fontSize * 0.33}
				textAnchor="middle"
				className={cn(
					"font-mono font-medium uppercase",
					active
						? "fill-neutral-900 dark:fill-neutral-100"
						: ghost
							? "fill-neutral-400 dark:fill-neutral-600"
							: "fill-neutral-700 dark:fill-neutral-300",
				)}
				style={{
					fontSize,
					letterSpacing: "0.15em",
					transition: `fill ${MOTION.transition}ms ${EASE_OUT}`,
				}}
			>
				{label}
			</text>
		</g>
	);
}

export interface SimpleCardProps {
	rect: NodeRect;
	notches?: NotchConfig;
	label: string;
	active?: boolean;
	ghost?: boolean;
	meta?: string;
	children?: ReactNode;
	pad?: number;
	headerH?: number;
	headerFontSize?: number;
	indicatorSize?: number;
}

// Welded chrome + header row + divider + body. The silhouette carries the
// divider seam notches automatically.
export function SimpleCard({
	rect,
	notches,
	label,
	active = false,
	ghost = false,
	meta,
	children,
	pad = 5,
	headerH = 14,
	headerFontSize = 8,
	indicatorSize = 6,
}: SimpleCardProps) {
	const headerY = rect.t + pad;
	const dividerY = rect.t + headerH;
	const composedNotches = notchesForDividers(rect, [dividerY], notches);

	return (
		<g style={{ opacity: ghost ? 0.5 : 1 }}>
			<WeldedCard
				rect={rect}
				notches={composedNotches}
				active={active}
				ghost={ghost}
			/>
			<CardHeader
				x={rect.l + pad}
				y={headerY}
				label={label}
				active={active}
				indicator={indicatorSize}
				fontSize={headerFontSize}
				meta={meta}
				rightEdge={rect.r - pad}
			/>
			<CardDivider l={rect.l} r={rect.r} y={dividerY} />
			{children}
		</g>
	);
}
