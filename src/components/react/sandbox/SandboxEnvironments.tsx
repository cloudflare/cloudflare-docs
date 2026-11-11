"use client";

// Sandbox environments (Choose a sandbox environment page). Your Worker keeps
// credentials and policy, and starts two kinds of sandbox: a Container that
// runs a command in your Linux image, and a Dynamic Worker that runs
// generated code against the methods and values you pass. The dashed inset
// shows what a Dynamic Worker does not inherit. Static: the page describes
// what each environment contains, and nothing changes over time.
import { Diagram } from "@cloudflare/nimbus-docs/react";
import {
	Caption,
	Connector,
	SimpleCard,
	WeldedCard,
	edgePoint,
	makeRect,
} from "../diagram-weld";
import { WeldCanvas } from "../container/WeldCanvas";
import type { DiagramFallbackProps } from "../container/DiagramFallback";

// Layout, in SVG user units.
const VIEW_W = 360;
const TOP = 14;
const GAP = 30;
const HEADER_H = 30;
const HEADER_FS = 11;
const VALUE_FS = 11;
const CAPTION_FS = 9;
const PAD_X = 12;
const LINE = 15;
const SECTION_GAP = 22;
const PANEL_W = 164;
// Fits the Dynamic Worker column: three header-and-value groups plus the
// two-line inset, which is taller than the Container column.
const PANEL_H = 202;

const WORKER = makeRect((VIEW_W - 260) / 2, TOP, 260, HEADER_H + 34);
const PANEL_T = WORKER.b + GAP;
const CONTAINER = makeRect(8, PANEL_T, PANEL_W, PANEL_H);
const DYNAMIC = makeRect(VIEW_W - 8 - PANEL_W, PANEL_T, PANEL_W, PANEL_H);
const VIEW_H = CONTAINER.b + 14;

// Where each connector leaves the Worker: directly over its panel.
const frac = (x: number) => (x - WORKER.l) / WORKER.w;

type Section = { caption: string; lines: string[] };

const CONTAINER_SECTIONS: Section[] = [
	{ caption: "runs", lines: ["a command"] },
	{ caption: "from", lines: ["your Linux image"] },
	{ caption: "can use", lines: ["runtimes, packages", "files, processes"] },
];

const DYNAMIC_SECTIONS: Section[] = [
	{ caption: "runs", lines: ["generated code"] },
	{ caption: "receives", lines: ["methods, values", "you pass"] },
];

const NOT_INHERITED = ["bindings, data", "credentials"];

const firstCaptionY = (card: typeof CONTAINER) => card.t + HEADER_H + 22;

function Value({
	x,
	y,
	dim = false,
	children,
}: {
	x: number;
	y: number;
	dim?: boolean;
	children: string;
}) {
	return (
		<text
			x={x}
			y={y}
			className={
				dim
					? "fill-neutral-400 dark:fill-neutral-500"
					: "fill-neutral-700 dark:fill-neutral-300"
			}
			style={{
				fontFamily: "var(--font-mono)",
				fontSize: VALUE_FS,
				letterSpacing: "0.05em",
			}}
		>
			{children}
		</text>
	);
}

// Captioned groups of values, top to bottom. Returns the elements and the
// y where the next group would start.
function sections(card: typeof CONTAINER, list: Section[]) {
	let y = firstCaptionY(card);
	const nodes = list.map(({ caption, lines }) => {
		const top = y;
		y += LINE * lines.length + SECTION_GAP;
		return (
			<g key={caption}>
				<Caption x={card.l + PAD_X} y={top} size={CAPTION_FS}>
					{caption}
				</Caption>
				{lines.map((line, i) => (
					<Value key={line} x={card.l + PAD_X} y={top + LINE * (i + 1)}>
						{line}
					</Value>
				))}
			</g>
		);
	});
	return { nodes, next: y };
}

export function SandboxEnvironments(_props: DiagramFallbackProps) {
	return (
		<Diagram label="Your Worker keeps credentials and policy. It starts a Container, which runs a command in your Linux image and can use runtimes, packages, files, and processes. It also passes methods and values to a Dynamic Worker, which runs generated code and does not inherit your bindings, data, or credentials.">
			<EnvironmentsBody />
		</Diagram>
	);
}

function EnvironmentsBody() {
	const container = sections(CONTAINER, CONTAINER_SECTIONS);
	const dynamic = sections(DYNAMIC, DYNAMIC_SECTIONS);
	const inset = makeRect(
		DYNAMIC.l + PAD_X - 4,
		dynamic.next - 10,
		DYNAMIC.w - 2 * (PAD_X - 4),
		DYNAMIC.b - PAD_X - (dynamic.next - 10),
	);

	return (
		<WeldCanvas width={VIEW_W} height={VIEW_H}>
			<SimpleCard
				rect={WORKER}
				notches={{ bottom: [frac(CONTAINER.cx), frac(DYNAMIC.cx)] }}
				label="Your Worker"
				active
				headerH={HEADER_H}
				headerFontSize={HEADER_FS}
				pad={12}
			>
				<Caption
					x={WORKER.l + PAD_X}
					y={WORKER.t + HEADER_H + 20}
					size={CAPTION_FS}
				>
					keeps
				</Caption>
				<text
					x={WORKER.r - PAD_X}
					y={WORKER.t + HEADER_H + 20}
					textAnchor="end"
					className="fill-neutral-700 dark:fill-neutral-300"
					style={{
						fontFamily: "var(--font-mono)",
						fontSize: VALUE_FS,
						letterSpacing: "0.05em",
					}}
				>
					credentials, policy
				</text>
			</SimpleCard>

			<Connector
				from={edgePoint(WORKER, "bottom", frac(CONTAINER.cx))}
				to={edgePoint(CONTAINER, "top")}
				arrowhead
				active
			/>
			<Connector
				from={edgePoint(WORKER, "bottom", frac(DYNAMIC.cx))}
				to={edgePoint(DYNAMIC, "top")}
				arrowhead
				active
			/>

			<SimpleCard
				rect={CONTAINER}
				notches={{ top: true }}
				label="Container"
				active
				headerH={HEADER_H}
				headerFontSize={HEADER_FS}
				pad={12}
			>
				{container.nodes}
			</SimpleCard>

			<SimpleCard
				rect={DYNAMIC}
				notches={{ top: true }}
				label="Dynamic Worker"
				active
				headerH={HEADER_H}
				headerFontSize={HEADER_FS}
				pad={12}
			>
				{dynamic.nodes}
				{/* What stays behind in your Worker. */}
				<WeldedCard rect={inset} notches={{}} muted dashed flat />
				<Caption
					x={inset.l + 8}
					y={inset.t + 17}
					size={CAPTION_FS}
					tone="ghost"
				>
					not inherited
				</Caption>
				{NOT_INHERITED.map((line, i) => (
					<Value
						key={line}
						x={inset.l + 8}
						y={inset.t + 17 + LINE * (i + 1)}
						dim
					>
						{line}
					</Value>
				))}
			</SimpleCard>
		</WeldCanvas>
	);
}

export default SandboxEnvironments;
