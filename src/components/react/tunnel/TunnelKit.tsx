"use client";

// Shared marks for the tunnel concept diagrams (src/content/docs/tunnel/
// concepts/index.mdx). Built on diagram-weld; all motion is CSS
// (weld-draw / weld-pour-fade / weld-squash / weld-spark in globals.css).
import { WeldedCard, measureLabel, type NodeRect } from "../diagram-weld";

/** Port hardware — the pad atom seated on a card edge. A live
 *  connection's port is taken (brand inner mark); a free one rests. */
export function Port({
	cx,
	cy,
	taken,
}: {
	cx: number;
	cy: number;
	taken: boolean;
}) {
	return (
		<g>
			<rect
				x={cx - 5}
				y={cy - 5}
				width={10}
				height={10}
				rx={2}
				strokeWidth={1.25}
				fill="var(--nb-background, white)"
				className="stroke-neutral-300 dark:stroke-neutral-700"
			/>
			<rect
				x={cx - 2}
				y={cy - 2}
				width={4}
				height={4}
				className={
					taken ? "fill-brand" : "fill-neutral-400 dark:fill-neutral-600"
				}
				style={{ transition: "fill 250ms" }}
			/>
		</g>
	);
}

/** A network / scope boundary: the dashed-fence idiom, named by a
 *  dash-bordered pill straddling its top border. */
export function NetBoundary({
	rect,
	label,
	labelAnchor = "start",
}: {
	rect: NodeRect;
	label: string;
	labelAnchor?: "start" | "middle";
}) {
	const w = measureLabel(label, { fontSize: 9, letterSpacing: 0.12 }) + 18;
	const h = 18;
	const cx =
		labelAnchor === "middle" ? rect.l + rect.w / 2 : rect.l + 10 + w / 2;
	return (
		<g>
			<WeldedCard rect={rect} dashed muted flat notches={{}} />
			<rect
				x={cx - w / 2}
				y={rect.t - h / 2}
				width={w}
				height={h}
				rx={h / 2}
				strokeWidth={1}
				strokeDasharray="4 3"
				fill="var(--nb-background, white)"
				className="stroke-neutral-300 dark:stroke-neutral-700"
			/>
			<text
				x={cx}
				y={rect.t + 3}
				textAnchor="middle"
				className="fill-neutral-600 font-mono font-medium uppercase dark:fill-neutral-300"
				style={{ fontSize: 9, letterSpacing: "0.12em" }}
			>
				{label}
			</text>
		</g>
	);
}

/** Orthogonal path with rounded corners (radius 6 quadratics). */
export function ortho(pts: [number, number][], r = 6): string {
	if (pts.length < 2) return "";
	let d = `M ${pts[0]![0]} ${pts[0]![1]}`;
	for (let i = 1; i < pts.length - 1; i++) {
		const [px, py] = pts[i - 1]!;
		const [cx, cy] = pts[i]!;
		const [nx, ny] = pts[i + 1]!;
		const idx = Math.sign(cx - px),
			idy = Math.sign(cy - py);
		const odx = Math.sign(nx - cx),
			ody = Math.sign(ny - cy);
		const rr = Math.min(
			r,
			Math.max(Math.abs(cx - px), Math.abs(cy - py)) / 2,
			Math.max(Math.abs(nx - cx), Math.abs(ny - cy)) / 2,
		);
		d += ` L ${cx - idx * rr} ${cy - idy * rr} Q ${cx} ${cy} ${cx + odx * rr} ${cy + ody * rr}`;
	}
	d += ` L ${pts[pts.length - 1]![0]} ${pts[pts.length - 1]![1]}`;
	return d;
}

/** A request as a smooth pour of colour along a path — draws with the
 *  weld-draw keyframe, holds, fades. Pure CSS; safe under SSR. */
export function Pour({
	d,
	dur,
	fade = dur + 0.45,
}: {
	d: string;
	dur: number;
	/** Total lifetime including the fade-out; defaults to dur + 0.45s. */
	fade?: number;
}) {
	// weld-pour-fade holds full opacity until 72% of `fade`; the clamp
	// keeps the stroke from fading before it finishes drawing.
	const fadeS = Math.max(fade, dur / 0.72);
	return (
		<path
			d={d}
			fill="none"
			strokeWidth={1.5}
			strokeLinecap="round"
			strokeLinejoin="round"
			pathLength={1}
			strokeDasharray="1"
			strokeDashoffset={1}
			className="stroke-brand"
			style={{
				animation: `weld-draw ${dur}s cubic-bezier(0.45, 0, 0.55, 1) forwards, weld-pour-fade ${fadeS}s linear forwards`,
			}}
		/>
	);
}

/** The refusal: a request squashed flat against a boundary. */
export function Squash({ x, y }: { x: number; y: number }) {
	return (
		<g style={{ transform: `translate(${x}px, ${y}px)` }}>
			<rect
				x={-3}
				y={-3}
				width={6}
				height={6}
				className="fill-brand"
				style={{ animation: "weld-squash 0.5s ease-out forwards" }}
			/>
		</g>
	);
}

/** Open-circuit sparks at a bare conductor end. */
export function Sparks({ x, y }: { x: number; y: number }) {
	const jets: [number, number][] = [
		[-9, -10],
		[-4, -14],
		[1, -16],
		[6, -12],
		[10, -8],
	];
	return (
		<g style={{ transform: `translate(${x}px, ${y}px)` }}>
			{jets.map(([dx, dy], i) => (
				<rect
					key={i}
					x={-1.5}
					y={-1.5}
					width={3}
					height={3}
					className="fill-brand"
					style={
						{
							"--spark-x": `${dx}px`,
							"--spark-y": `${dy}px`,
							animation: `weld-spark 0.5s ease-out ${i * 0.04}s forwards`,
							opacity: 0,
						} as React.CSSProperties
					}
				/>
			))}
		</g>
	);
}
