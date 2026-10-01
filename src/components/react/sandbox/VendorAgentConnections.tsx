"use client";

// Vendor agent connections (Cursor and Devin template pages). Who connects
// to whom when a vendor runs the agent loop: your Worker reaches the vendor
// to find sessions, a Durable Object per session starts a container, and
// the process in the container reaches the vendor to run the session. Every
// arrow into the vendor starts inside your Cloudflare account, drawn as a
// dashed boundary, and no arrow crosses it inward: the arrow directions are
// the content. Static: nothing changes over time.
import { Diagram } from "@cloudflare/nimbus-docs/react";
import {
	Caption,
	Connector,
	LabelCard,
	SimpleCard,
	WeldedCard,
	edgePoint,
	makeRect,
} from "../diagram-weld";
import { WeldCanvas } from "../container/WeldCanvas";
import type { DiagramFallbackProps } from "../container/DiagramFallback";

type Vendor = "cursor" | "devin";

const VENDORS: Record<
	Vendor,
	{
		name: string;
		workerAction: string;
		process: string;
		processAction: string;
		label: string;
	}
> = {
	cursor: {
		name: "Cursor",
		workerAction: "claims sessions",
		process: "Cursor worker",
		processAction: "runs the session",
		label:
			"Your Worker connects to Cursor on a cron trigger and claims sessions. It sends each session to its own Durable Object, which starts and stops a container. The Cursor worker in the container connects to Cursor and runs the session. Every connection to Cursor starts on Cloudflare, so nothing connects in.",
	},
	devin: {
		name: "Devin",
		workerAction: "lists sessions",
		process: "Devin CLI",
		processAction: "claims the session",
		label:
			"Your Worker connects to Devin on a cron trigger and lists sessions. It sends each session to its own Durable Object, which starts and stops a container. The Devin CLI in the container connects to Devin, claims the session, and runs it. Every connection to Devin starts on Cloudflare, so nothing connects in.",
	},
};

// Layout, in SVG user units. The cards stack in a left column, and the
// container's connection to the vendor runs up a lane on the right.
const VIEW_W = 384;
const TOP = 14;
const GAP = 38;
const CARD_L = 16;
const CARD_W = 208;
const HEADER_H = 30;
const HEADER_FS = 11;
const NODE_H = 30;
const NODE_FS = 11;
const VALUE_FS = 11;
const CAPTION_FS = 9;
const LINE_CAPTION_FS = 8;
const PAD_X = 12;
const CARD_H = HEADER_H + 34;
const LANE_X = 352;

const VENDOR = makeRect(CARD_L, TOP, VIEW_W - 2 * CARD_L, NODE_H);
const BOUNDARY_T = VENDOR.b + 26;
const WORKER = makeRect(CARD_L, BOUNDARY_T + 28, CARD_W, CARD_H);
const DO = makeRect(CARD_L, WORKER.b + GAP, CARD_W, CARD_H);
const CONTAINER = makeRect(CARD_L, DO.b + GAP, CARD_W, CARD_H);
const BOUNDARY = makeRect(
	6,
	BOUNDARY_T,
	VIEW_W - 12,
	CONTAINER.b + 26 - BOUNDARY_T,
);
const VIEW_H = BOUNDARY.b + 14;

const rowY = (card: typeof WORKER) => card.t + HEADER_H + 20;
const vendorFrac = (x: number) => (x - VENDOR.l) / VENDOR.w;

function Row({
	card,
	caption,
	value,
}: {
	card: typeof WORKER;
	caption: string;
	value: string;
}) {
	return (
		<>
			<Caption x={card.l + PAD_X} y={rowY(card)} size={CAPTION_FS}>
				{caption}
			</Caption>
			<text
				x={card.r - PAD_X}
				y={rowY(card)}
				textAnchor="end"
				className="fill-neutral-700 dark:fill-neutral-300"
				style={{
					fontFamily: "var(--font-mono)",
					fontSize: VALUE_FS,
					letterSpacing: "0.05em",
				}}
			>
				{value}
			</text>
		</>
	);
}

// A caption beside a vertical connector, centred on the gap it spans.
function LineCaption({
	x,
	top,
	bottom,
	children,
}: {
	x: number;
	top: number;
	bottom: number;
	children: string;
}) {
	return (
		<Caption
			x={x + 8}
			y={(top + bottom) / 2 + 3}
			size={LINE_CAPTION_FS}
			tone="muted"
		>
			{children}
		</Caption>
	);
}

export function VendorAgentConnections({
	vendor,
}: DiagramFallbackProps & { vendor: Vendor }) {
	const v = VENDORS[vendor];
	return (
		<Diagram label={v.label}>
			<WeldCanvas width={VIEW_W} height={VIEW_H}>
				{/* Everything you deploy. Arrows only leave it. */}
				<WeldedCard rect={BOUNDARY} notches={{}} muted dashed flat />
				<Caption
					x={BOUNDARY.l + 10}
					y={BOUNDARY.b - 9}
					size={LINE_CAPTION_FS}
					tone="ghost"
				>
					your Cloudflare account
				</Caption>

				<LabelCard
					rect={VENDOR}
					notches={{
						bottom: [vendorFrac(WORKER.cx), vendorFrac(LANE_X)],
					}}
					label={v.name}
					fontSize={NODE_FS}
					active
				/>

				{/* Your Worker reaches the vendor to find sessions. */}
				<Connector
					from={edgePoint(WORKER, "top")}
					to={edgePoint(VENDOR, "bottom", vendorFrac(WORKER.cx))}
					arrowhead
					active
				/>
				<LineCaption x={WORKER.cx} top={VENDOR.b} bottom={BOUNDARY.t}>
					{v.workerAction}
				</LineCaption>
				<SimpleCard
					rect={WORKER}
					notches={{ top: true, bottom: true }}
					label="Your Worker"
					active
					headerH={HEADER_H}
					headerFontSize={HEADER_FS}
					pad={12}
				>
					<Row card={WORKER} caption="runs on" value="cron trigger" />
				</SimpleCard>

				<Connector
					from={edgePoint(WORKER, "bottom")}
					to={edgePoint(DO, "top")}
					arrowhead
					active
				/>
				<LineCaption x={WORKER.cx} top={WORKER.b} bottom={DO.t}>
					sends each session
				</LineCaption>
				<SimpleCard
					rect={DO}
					notches={{ top: true, bottom: true }}
					label="Durable Object"
					active
					headerH={HEADER_H}
					headerFontSize={HEADER_FS}
					pad={12}
				>
					<Row card={DO} caption="one per" value="session" />
				</SimpleCard>

				<Connector
					from={edgePoint(DO, "bottom")}
					to={edgePoint(CONTAINER, "top")}
					arrowhead
					active
				/>
				<LineCaption x={DO.cx} top={DO.b} bottom={CONTAINER.t}>
					starts and stops
				</LineCaption>
				<SimpleCard
					rect={CONTAINER}
					notches={{ top: true, right: true }}
					label="Container"
					active
					headerH={HEADER_H}
					headerFontSize={HEADER_FS}
					pad={12}
				>
					<Row card={CONTAINER} caption="runs" value={v.process} />
				</SimpleCard>

				{/* The process in the container reaches the vendor too. */}
				<Connector
					from={edgePoint(CONTAINER, "right")}
					to={edgePoint(VENDOR, "bottom", vendorFrac(LANE_X))}
					fromSide="right"
					toSide="bottom"
					arrowhead
					active
				/>
				<Caption
					x={CONTAINER.r + 8}
					y={CONTAINER.cy - 6}
					size={LINE_CAPTION_FS}
					tone="muted"
				>
					{v.processAction}
				</Caption>
			</WeldCanvas>
		</Diagram>
	);
}

export default VendorAgentConnections;
