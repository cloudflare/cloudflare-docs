"use client";

// Sandbox lifetime (Sandbox lifetime page). The parts of one sandbox, top to
// bottom: the name, the Durable Object, the Linux instance, and a mounted
// bucket. The reader stops the instance and watches what ends with it, then
// starts a new instance from the snapshot and watches what comes back.
// Nothing plays on its own; each state change follows a button press. The
// empty-instance slot and the mount-on-start entrance follow
// ContainerLifecycle.
import { useState } from "react";
import { Diagram, useDiagramOrDefault } from "@cloudflare/nimbus-docs/react";
import {
	Caption,
	Connector,
	LabelCard,
	PhaseBadge,
	SimpleCard,
	WeldedCard,
	autoLabelRect,
	edgePoint,
	makeRect,
} from "../diagram-weld";
import { WeldCanvas, weldEnter } from "../container/WeldCanvas";
import { LabeledButton, ResetButton, Toolbar } from "../container/Transport";
import type { DiagramFallbackProps } from "../container/DiagramFallback";

// Layout, in SVG user units, on the 340-wide grid of the container diagrams.
const VIEW_W = 340;
const CX = VIEW_W / 2;
const TOP = 14;
const GAP = 26;
const CARD_W = 244;
const HEADER_H = 30;
const HEADER_FS = 11;
const NODE_H = 28;
const NODE_FS = 11;
const BODY_FS = 12;
const CAPTION_FS = 10;
const ROW_GAP = 24;
const PAD_X = 14;

const NAME_LABEL = "Sandbox name";
const nameProbe = autoLabelRect(0, TOP, NAME_LABEL, {
	h: NODE_H,
	fontSize: NODE_FS,
});
const NAME = makeRect(CX - nameProbe.w / 2, TOP, nameProbe.w, NODE_H);
const DO = makeRect(CX - CARD_W / 2, NAME.b + GAP, CARD_W, HEADER_H + 34);
const INSTANCE = makeRect(CX - CARD_W / 2, DO.b + GAP, CARD_W, HEADER_H + 58);
const bucketProbe = autoLabelRect(0, 0, "R2 bucket", {
	h: NODE_H,
	fontSize: NODE_FS,
});
const BUCKET = makeRect(
	CX - bucketProbe.w / 2,
	INSTANCE.b + GAP,
	bucketProbe.w,
	NODE_H,
);
const VIEW_H = BUCKET.b + 18;

const rowY = (card: typeof DO, i: number) =>
	card.t + HEADER_H + 20 + i * ROW_GAP;

type State = "running" | "stopped" | "restored";

const INSTANCE_ROWS: Record<Exclude<State, "stopped">, [string, string]> = {
	running: ["dev server", "repository, edits"],
	restored: ["no dev server", "repository, edits"],
};

const STATUS: Record<State, string> = {
	running: "Instance running",
	stopped: "Instance stopped",
	restored: "New instance from snapshot",
};

const LIVE: Record<State, string> = {
	running:
		"The Linux instance runs a development server and holds the repository and edits on its disk.",
	stopped:
		"The Linux instance has stopped. Its processes and disk files ended. The name, the Durable Object with its snapshot ID, and the objects in the bucket remain.",
	restored:
		"A new Linux instance started from the snapshot. The repository and edits are back on its disk. No development server is running until the agent starts it again.",
};

export function SandboxLifetime(_props: DiagramFallbackProps) {
	return (
		<Diagram label="A sandbox from top to bottom: its name, its Durable Object, its Linux instance, and a mounted R2 bucket. Stopping the instance ends its processes and disk files, while the name, the Durable Object with its snapshot ID, and the bucket remain. Starting from the snapshot brings back the files but not the development server. Operate it with the Stop instance and Start from snapshot controls.">
			<LifetimeBody />
		</Diagram>
	);
}

function LifetimeBody() {
	const ctx = useDiagramOrDefault("SandboxLifetime");
	const [state, setState] = useState<State>("running");
	const up = state !== "stopped";

	const value = (card: typeof DO, i: number, text: string) => (
		<text
			x={card.r - PAD_X}
			y={rowY(card, i)}
			textAnchor="end"
			className="fill-neutral-700 dark:fill-neutral-300"
			style={{
				fontFamily: "var(--font-mono)",
				fontSize: BODY_FS,
				letterSpacing: "0.05em",
			}}
		>
			{text}
		</text>
	);

	return (
		<WeldCanvas
			width={VIEW_W}
			height={VIEW_H}
			liveStatus={LIVE[state]}
			controls={
				<Toolbar status={STATUS[state]}>
					<ResetButton onClick={() => setState("running")} />
					<LabeledButton
						ariaLabel="Stop instance"
						onClick={() => setState("stopped")}
						ariaDisabled={!up}
						highlight={up}
					>
						Stop instance
					</LabeledButton>
					<LabeledButton
						ariaLabel="Start from snapshot"
						onClick={() => setState("restored")}
						ariaDisabled={up}
						highlight={!up}
					>
						Start from snapshot
					</LabeledButton>
				</Toolbar>
			}
		>
			{/* The name always reaches the same Durable Object. */}
			<LabelCard
				rect={NAME}
				notches={{ bottom: true }}
				label={NAME_LABEL}
				fontSize={NODE_FS}
				active
			/>
			<Connector
				from={edgePoint(NAME, "bottom")}
				to={edgePoint(DO, "top")}
				arrowhead
				active
			/>
			<SimpleCard
				rect={DO}
				notches={{ top: true, bottom: true }}
				label="Durable Object"
				active
				headerH={HEADER_H}
				headerFontSize={HEADER_FS}
				pad={12}
			>
				<Caption x={DO.l + PAD_X} y={rowY(DO, 0)} size={CAPTION_FS}>
					storage
				</Caption>
				{value(DO, 0, "snapshot ID")}
			</SimpleCard>

			<Connector
				from={edgePoint(DO, "bottom")}
				to={edgePoint(INSTANCE, "top")}
				arrowhead
				active={up}
				ghost={!up}
			/>

			{/* The instance: present while running, an empty slot once stopped.
			    Keyed by state so a new instance enters as a new card. */}
			{up ? (
				<g key={state} style={{ animation: weldEnter(ctx.reducedMotion) }}>
					<SimpleCard
						rect={INSTANCE}
						notches={{ top: true, bottom: true }}
						label="Linux instance"
						active
						headerH={HEADER_H}
						headerFontSize={HEADER_FS}
						pad={12}
					>
						<PhaseBadge
							rect={INSTANCE}
							headerH={HEADER_H}
							fontSize={HEADER_FS}
							label={state === "restored" ? "NEW" : "RUNNING"}
							tone="accent"
							pad={12}
						/>
						<Caption
							x={INSTANCE.l + PAD_X}
							y={rowY(INSTANCE, 0)}
							size={CAPTION_FS}
						>
							processes
						</Caption>
						{value(INSTANCE, 0, INSTANCE_ROWS[state][0])}
						<Caption
							x={INSTANCE.l + PAD_X}
							y={rowY(INSTANCE, 1)}
							size={CAPTION_FS}
						>
							disk
						</Caption>
						{value(INSTANCE, 1, INSTANCE_ROWS[state][1])}
					</SimpleCard>
				</g>
			) : (
				<g>
					<WeldedCard
						rect={INSTANCE}
						notches={{ top: true, bottom: true }}
						muted
						dashed
						flat
					/>
					<text
						x={INSTANCE.cx}
						y={INSTANCE.cy - 3}
						textAnchor="middle"
						className="fill-neutral-500 dark:fill-neutral-400"
						style={{
							fontFamily: "var(--font-sans)",
							fontSize: 13,
							fontWeight: 500,
						}}
					>
						No Linux instance
					</text>
					<text
						x={INSTANCE.cx}
						y={INSTANCE.cy + 15}
						textAnchor="middle"
						className="fill-neutral-400 dark:fill-neutral-500"
						style={{
							fontFamily: "var(--font-mono)",
							fontSize: 9,
							letterSpacing: "0.04em",
						}}
					>
						processes and files ended
					</text>
				</g>
			)}

			{/* The bucket keeps its objects; only the mount belongs to an instance. */}
			<Connector
				from={edgePoint(INSTANCE, "bottom")}
				to={edgePoint(BUCKET, "top")}
				active={up}
				ghost={!up}
			/>
			<Caption x={CX + 8} y={INSTANCE.b + GAP / 2 + 3} size={CAPTION_FS}>
				{up ? "mounted" : "not mounted"}
			</Caption>
			<LabelCard
				rect={BUCKET}
				notches={{ top: true }}
				label="R2 bucket"
				fontSize={NODE_FS}
				active
			/>
		</WeldCanvas>
	);
}

export default SandboxLifetime;
