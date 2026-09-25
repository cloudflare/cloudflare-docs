"use client";

// Sandbox SDK 0.12 and 1.0 side by side (How Sandbox SDK 1.0 differs page).
// Both columns list the same jobs: starting the container, keeping it
// running, previews, and backups. In 0.12 the package's Sandbox class does
// them and a server from the package's image runs commands. In 1.0 your own
// Durable Object does them, and the container runs your image, with the
// package's helper only when you use Files or S3Mounts. Tinted cards are code
// you write; the "from" line says the same in words. Static: the page
// compares two designs, and nothing changes over time.
import type { ReactNode } from "react";
import { Diagram } from "@cloudflare/nimbus-docs/react";
import {
	CardDivider,
	CardHeader,
	Caption,
	Connector,
	WeldedCard,
	edgePoint,
	makeRect,
	notchesForDividers,
} from "../diagram-weld";
import type { NodeRect } from "../diagram-weld";
import { WeldCanvas } from "../container/WeldCanvas";
import type { DiagramFallbackProps } from "../container/DiagramFallback";

// Layout, in SVG user units.
const VIEW_W = 360;
const TITLE_Y = 14;
const TOP = 28;
const GAP = 24;
const HEADER_H = 30;
const HEADER_FS = 11;
const VALUE_FS = 11;
const CAPTION_FS = 9;
const PAD_X = 12;
const LINE = 15;
const SECTION_GAP = 20;
const COL_W = 164;
const WORKER_H = HEADER_H + 34;
const OWNER_H = 130;
// Fits the 1.0 container: two header-and-value groups plus the helper inset.
const CONTAINER_H = 176;

const LEFT = 8;
const RIGHT = VIEW_W - 8 - COL_W;
const OWNER_T = TOP + WORKER_H + GAP;
const CONTAINER_T = OWNER_T + OWNER_H + GAP;
const VIEW_H = CONTAINER_T + CONTAINER_H + 10;

type Section = { caption: string; lines: string[] };

type Column = {
	title: string;
	calls: string;
	owner: { label: string; yours: boolean; sections: Section[] };
	container: Section[];
	helper?: { caption: string; value: string };
};

const JOBS = ["start, lifetime", "previews, backups"];

const COLUMNS: Column[] = [
	{
		title: "Sandbox SDK 0.12",
		calls: "getSandbox()",
		owner: {
			label: "Sandbox class",
			yours: false,
			sections: [
				{ caption: "from", lines: ["the package"] },
				{ caption: "manages", lines: JOBS },
			],
		},
		container: [
			{ caption: "image", lines: ["cloudflare/sandbox"] },
			{ caption: "runs", lines: ["the SDK server", "bash sessions"] },
		],
	},
	{
		title: "Sandbox SDK 1.0",
		calls: "getByName()",
		owner: {
			label: "Durable Object",
			yours: true,
			sections: [
				{ caption: "from", lines: ["your code"] },
				{ caption: "manages", lines: JOBS },
			],
		},
		container: [
			{ caption: "image", lines: ["your image"] },
			{ caption: "runs", lines: ["your commands"] },
		],
		helper: { caption: "for Files", value: "sandbox-shim" },
	},
];

function Value({ x, y, children }: { x: number; y: number; children: string }) {
	return (
		<text
			x={x}
			y={y}
			className="fill-neutral-700 dark:fill-neutral-300"
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

// A card with a header, drawn from the weld parts so that code you write can
// take the accent fill.
function Card({
	rect,
	label,
	yours,
	top,
	bottom,
	children,
}: {
	rect: NodeRect;
	label: string;
	yours: boolean;
	top: boolean;
	bottom: boolean;
	children: ReactNode;
}) {
	const dividerY = rect.t + HEADER_H;
	return (
		<g>
			<WeldedCard
				rect={rect}
				notches={notchesForDividers(rect, [dividerY], { top, bottom })}
				active
				accent={yours}
			/>
			<CardHeader
				x={rect.l + 12}
				y={rect.t + 12}
				label={label}
				active
				fontSize={HEADER_FS}
			/>
			<CardDivider l={rect.l} r={rect.r} y={dividerY} />
			{children}
		</g>
	);
}

// Captioned groups of values, top to bottom. Returns the elements and the
// y where the next group would start.
function sections(card: NodeRect, list: Section[]) {
	let y = card.t + HEADER_H + 22;
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

function VersionColumn({ column, x }: { column: Column; x: number }) {
	const worker = makeRect(x, TOP, COL_W, WORKER_H);
	const owner = makeRect(x, OWNER_T, COL_W, OWNER_H);
	const container = makeRect(x, CONTAINER_T, COL_W, CONTAINER_H);
	const ownerBody = sections(owner, column.owner.sections);
	const containerBody = sections(container, column.container);
	const helper = column.helper;
	const inset = makeRect(
		container.l + PAD_X - 4,
		containerBody.next - 10,
		container.w - 2 * (PAD_X - 4),
		container.b - PAD_X - (containerBody.next - 10),
	);

	return (
		<g>
			<Caption x={worker.cx} y={TITLE_Y} anchor="middle" size={CAPTION_FS}>
				{column.title}
			</Caption>

			<Card rect={worker} label="Your Worker" yours top={false} bottom>
				<Caption
					x={worker.l + PAD_X}
					y={worker.t + HEADER_H + 20}
					size={CAPTION_FS}
				>
					calls
				</Caption>
				<text
					x={worker.r - PAD_X}
					y={worker.t + HEADER_H + 20}
					textAnchor="end"
					className="fill-neutral-700 dark:fill-neutral-300"
					style={{
						fontFamily: "var(--font-mono)",
						fontSize: VALUE_FS,
						letterSpacing: "0.05em",
					}}
				>
					{column.calls}
				</text>
			</Card>

			<Connector
				from={edgePoint(worker, "bottom")}
				to={edgePoint(owner, "top")}
				arrowhead
				active
			/>

			<Card
				rect={owner}
				label={column.owner.label}
				yours={column.owner.yours}
				top
				bottom
			>
				{ownerBody.nodes}
			</Card>

			<Connector
				from={edgePoint(owner, "bottom")}
				to={edgePoint(container, "top")}
				arrowhead
				active
			/>

			<Card rect={container} label="Container" yours={false} top bottom={false}>
				{containerBody.nodes}
				{helper && (
					<g>
						{/* The package's only part inside a 1.0 container. */}
						<WeldedCard rect={inset} notches={{}} muted dashed flat />
						<Caption
							x={inset.l + 8}
							y={inset.t + 17}
							size={CAPTION_FS}
							tone="ghost"
						>
							{helper.caption}
						</Caption>
						<Value x={inset.l + 8} y={inset.t + 17 + LINE}>
							{helper.value}
						</Value>
					</g>
				)}
			</Card>
		</g>
	);
}

export function SandboxSdkVersions(_props: DiagramFallbackProps) {
	return (
		<Diagram label="In Sandbox SDK 0.12, your Worker calls getSandbox(), and the Sandbox class from the package starts the container, keeps it running, and manages previews and backups. The container runs the cloudflare/sandbox image, with the SDK server and bash sessions. In Sandbox SDK 1.0, your Worker calls getByName(), and your own Durable Object manages the same jobs. The container runs your image and your commands, plus the sandbox-shim helper when you use Files.">
			<WeldCanvas width={VIEW_W} height={VIEW_H}>
				<VersionColumn column={COLUMNS[0]} x={LEFT} />
				<VersionColumn column={COLUMNS[1]} x={RIGHT} />
			</WeldCanvas>
		</Diagram>
	);
}

export default SandboxSdkVersions;
