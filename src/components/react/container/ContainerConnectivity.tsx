"use client";

// State and connectivity (Concepts page). A Worker fronts the container and
// configured outbound handlers can connect it to bindings and external
// services. The container has no SDK for those bindings, so requests use the
// configured handler path.
// Autoplays once; the reader can also step with Next / Previous or replay it.
// A local step index drives it — usePhase has no backward step.
import { useEffect, useState } from "react";
import { Diagram, useDiagramOrDefault } from "@cloudflare/nimbus-docs/react";
import {
	ARROW_OFFSET,
	Arrowhead,
	Caption,
	Connector,
	EASE_OUT,
	FillBars,
	LabelCard,
	MOTION,
	PhaseBadge,
	SimpleCard,
	WeldedCard,
	dockPoint,
	edgePoint,
	makeRect,
} from "../diagram-weld";
import type { FillState, NodeRect } from "../diagram-weld";
import { WeldCanvas } from "./WeldCanvas";
import {
	Toolbar,
	PlayPauseButton,
	ResetButton,
	PrevButton,
	NextButton,
} from "./Transport";
import type { DiagramFallbackProps } from "./DiagramFallback";

const MONO = "var(--font-mono)";

const CARD_W = 288;
const CARD_H = 104;
const HEADER_H = 32;
const HEADER_FS = 11;
const BODY_FS = 12;
const CAP_FS = 10;
const ROW_GAP = 26;
const PAD_X = 14;

// Five uneven segments so the gradual fill reads as scratch growing.
const DISK_WIDTHS = [22, 28, 18, 26, 20];

const VIEW_W = 340;
const TOP = 14;
const CLIENT_W = 82;
const CLIENT_H = 34;
const WORKER_W = 112;
const WORKER_H = 40;
const NODE_FS = 11;
const CLIENT_GAP = 48;
const CONTAINER_GAP = 52;
const STORE_GAP_Y = 40;
const MARGIN = 14;
const DIM_OPACITY = 0.28;
const FOCUS_MS = 320;

const STORE_HEADER_H = 28;
const STORE_HEADER_FS = 11;
const STORE_CHIP_W = 264;
const STORE_CHIP_H = 36;
const STORE_CHIP_GAP = 8;
const STORE_PAD = 12;
const STORE_LABEL_FS = 11;
const BINDINGS: string[] = ["KV", "R2", "D1", "Durable Objects"];
const STORE_W = STORE_CHIP_W + STORE_PAD * 2;
const STORE_H =
	STORE_HEADER_H +
	STORE_CHIP_GAP +
	BINDINGS.length * STORE_CHIP_H +
	(BINDINGS.length - 1) * STORE_CHIP_GAP +
	STORE_PAD;

type Phase = "running" | "stopped";
const BADGE: Record<Phase, string> = { running: "running", stopped: "stopped" };

type ArmFire =
	| { arm: "cw"; dir: "down" | "up" }
	| { arm: "wk"; dir: "down" | "up" }
	| { arm: "store"; dir: "out" | "back" };

type NodeKey = "client" | "worker" | "card" | "store";

interface Step {
	beat: string;
	phase: Phase;
	filled: number;
	fire?: ArmFire;
	focus: NodeKey[];
	stage: number | null;
	title: string;
	ms: number;
}

const CONTAINER_ACTIVE_BEATS = new Set([
	"route-in",
	"run",
	"outbound",
	"persist",
	"storage-return",
	"handler-return",
	"container-response",
	"respond",
]);

const IDLE_STEP: Step = {
	beat: "idle",
	phase: "running",
	filled: 0,
	focus: [],
	stage: null,
	title: "Idle — click Next to step through the request",
	ms: 900,
};

const CYCLE: Step[] = [
	IDLE_STEP,
	{
		beat: "request",
		phase: "running",
		filled: 0,
		fire: { arm: "cw", dir: "down" },
		focus: ["client", "worker"],
		stage: 1,
		title: "The request arrives at the Worker",
		ms: 1100,
	},
	{
		beat: "route-in",
		phase: "running",
		filled: 0,
		fire: { arm: "wk", dir: "down" },
		focus: ["worker", "card"],
		stage: 2,
		title: "The Worker routes the request into the container",
		ms: 1100,
	},
	{
		beat: "run",
		phase: "running",
		filled: 5,
		focus: ["card"],
		stage: 3,
		title: "The container runs — its local disk fills as scratch",
		ms: 1100,
	},
	{
		beat: "outbound",
		phase: "running",
		filled: 5,
		fire: { arm: "wk", dir: "up" },
		focus: ["card", "worker"],
		stage: 4,
		title: "The container's outbound call is handed back to the Worker",
		ms: 1100,
	},
	{
		beat: "persist",
		phase: "running",
		filled: 5,
		fire: { arm: "store", dir: "out" },
		focus: ["worker", "store"],
		stage: 5,
		title: "The outbound handler reaches persistent storage",
		ms: 1200,
	},
	{
		beat: "storage-return",
		phase: "running",
		filled: 5,
		fire: { arm: "store", dir: "back" },
		focus: ["worker", "store"],
		stage: 6,
		title: "Persistent storage returns the result to the outbound handler",
		ms: 1200,
	},
	{
		beat: "handler-return",
		phase: "running",
		filled: 5,
		fire: { arm: "wk", dir: "down" },
		focus: ["worker", "card"],
		stage: 7,
		title: "The outbound handler returns its response to the container",
		ms: 1100,
	},
	{
		beat: "container-response",
		phase: "running",
		filled: 5,
		fire: { arm: "wk", dir: "up" },
		focus: ["card", "worker"],
		stage: 8,
		title: "The container completes its response to the Worker",
		ms: 1100,
	},
	{
		beat: "respond",
		phase: "running",
		filled: 5,
		fire: { arm: "cw", dir: "up" },
		focus: ["worker", "client"],
		stage: 9,
		title: "The Worker responds to the client",
		ms: 1100,
	},
	{
		beat: "stopped",
		phase: "stopped",
		filled: 0,
		focus: [],
		stage: 10,
		title:
			"The container goes inactive and its disk is gone — only persistent storage survives",
		ms: 1600,
	},
];

const TOTAL_STAGES = Math.max(...CYCLE.map((s) => s.stage ?? 0));
const stepAt = (i: number): Step =>
	CYCLE[Math.min(Math.max(i, 0), CYCLE.length - 1)] ?? IDLE_STEP;

export function ContainerConnectivity(_props: DiagramFallbackProps) {
	return (
		<Diagram
			label="A configured request flow where the Worker routes an inbound request into a Container, handles its outbound request to persistent storage, and returns the result to the Container before responding to the client. The Container's local disk is temporary, while persistent storage remains available beyond its lifecycle. Step through with the Next and Previous controls."
			keyboard={false}
		>
			<ConnectivityBody />
		</Diagram>
	);
}

function ConnectivityBody() {
	const ctx = useDiagramOrDefault("ContainerConnectivity");
	const [stepIdx, setStepIdx] = useState(0);
	const [isPlaying, setIsPlaying] = useState(true);
	const [hasPersisted, setHasPersisted] = useState(false);

	// Reduced-motion users rest on the idle frame and never autoplay.
	useEffect(() => {
		if (ctx.reducedMotion) {
			setIsPlaying(false);
			setStepIdx(0);
		}
	}, [ctx.reducedMotion]);

	useEffect(() => {
		if (
			!isPlaying ||
			!ctx.playing ||
			ctx.reducedMotion ||
			!ctx.visible ||
			!ctx.tabVisible
		) {
			return;
		}
		if (stepIdx >= CYCLE.length - 1) {
			setIsPlaying(false);
			return;
		}
		const nextIdx = stepIdx + 1;
		const id = setTimeout(() => {
			setStepIdx(nextIdx);
			if (stepAt(nextIdx).beat === "persist") setHasPersisted(true);
		}, stepAt(stepIdx).ms);
		return () => clearTimeout(id);
	}, [
		isPlaying,
		stepIdx,
		ctx.playing,
		ctx.reducedMotion,
		ctx.visible,
		ctx.tabVisible,
	]);

	const atStart = stepIdx <= 0;
	const atEnd = stepIdx >= CYCLE.length - 1;
	const playPause = () => {
		if (!ctx.playing) {
			ctx.toggle();
			setIsPlaying(true);
			return;
		}
		if (!isPlaying && atEnd) {
			setStepIdx(0);
			setIsPlaying(true);
			return;
		}
		setIsPlaying((p) => !p);
	};
	const reset = () => {
		setStepIdx(0);
		setIsPlaying(false);
		setHasPersisted(false);
	};
	const prev = () => {
		setIsPlaying(false);
		setStepIdx((s) => Math.max(0, s - 1));
	};
	const next = () => {
		setIsPlaying(false);
		const nextIdx = Math.min(CYCLE.length - 1, stepIdx + 1);
		setStepIdx(nextIdx);
		if (stepAt(nextIdx).beat === "persist") setHasPersisted(true);
	};

	const step = stepAt(stepIdx);
	const { phase, filled, fire } = step;
	const reduced = ctx.reducedMotion;

	// Request spine down the center; storage continues below the Container while
	// its configured connection branches from the Worker around the right edge.
	const spineCx = VIEW_W / 2;
	const client = makeRect(spineCx - CLIENT_W / 2, TOP, CLIENT_W, CLIENT_H);
	const worker = makeRect(
		spineCx - WORKER_W / 2,
		client.b + CLIENT_GAP,
		WORKER_W,
		WORKER_H,
	);
	const card = makeRect(
		spineCx - CARD_W / 2,
		worker.b + CONTAINER_GAP,
		CARD_W,
		CARD_H,
	);
	const store = makeRect(
		spineCx - STORE_W / 2,
		card.b + STORE_GAP_Y,
		STORE_W,
		STORE_H,
	);

	const VIEW_H = store.b + MARGIN;

	const storeDirection = fire?.arm === "store" ? fire.dir : null;
	const hasFocus = step.focus.length > 0;
	const lit = (k: NodeKey) => step.focus.includes(k);
	const dim = (k: NodeKey) =>
		({
			opacity: lit(k) ? 1 : hasFocus ? DIM_OPACITY : 1,
			transition: `opacity ${FOCUS_MS}ms ${EASE_OUT}`,
		}) as const;
	const cardActive = CONTAINER_ACTIVE_BEATS.has(step.beat);

	const corridorX = (card.r + VIEW_W) / 2;
	const bindPath = (endX: number) =>
		`M ${worker.r} ${worker.cy} H ${corridorX} V ${store.cy} H ${endX}`;
	const bindReturnPath = (endX: number) =>
		`M ${store.r} ${store.cy} H ${corridorX} V ${worker.cy} H ${endX}`;

	return (
		<WeldCanvas
			width={VIEW_W}
			height={VIEW_H}
			liveStatus={`${step.stage != null ? `Step ${step.stage} of ${TOTAL_STAGES}: ` : ""}${step.title}`}
			controls={
				<Toolbar>
					<ResetButton onClick={reset} />
					<PrevButton onClick={prev} disabled={atStart} />
					<PlayPauseButton
						playing={isPlaying && ctx.playing}
						onClick={playPause}
					/>
					<NextButton onClick={next} disabled={atEnd} />
				</Toolbar>
			}
		>
			<Connector
				from={dockPoint(client, "bottom")}
				to={dockPoint(worker, "top")}
				ghost
			/>
			<Connector
				from={dockPoint(worker, "bottom")}
				to={dockPoint(card, "top")}
				ghost
			/>
			<path
				d={bindPath(store.r)}
				fill="none"
				stroke="currentColor"
				strokeWidth={1.25}
				strokeLinecap="round"
				strokeLinejoin="round"
				className="text-neutral-300 dark:text-neutral-700"
			/>

			{/* Keyed by beat so the pulse dot remounts and its SMIL replays. */}
			{fire && (fire.arm === "cw" || fire.arm === "wk") && (
				<g key={step.beat}>
					{(() => {
						const down = fire.dir === "down";
						const [a, b, aSide, bSide]: [
							NodeRect,
							NodeRect,
							"top" | "bottom",
							"top" | "bottom",
						] =
							fire.arm === "cw"
								? down
									? [client, worker, "bottom", "top"]
									: [worker, client, "top", "bottom"]
								: down
									? [worker, card, "bottom", "top"]
									: [card, worker, "top", "bottom"];
						const p1 = edgePoint(a, aSide);
						const p2 = edgePoint(b, bSide);
						return (
							<>
								<Connector
									from={p1}
									to={p2}
									fromSide={aSide}
									toSide={bSide}
									arrowhead
									active
								/>
								{!reduced && (
									<PulseDot
										d={`M ${p1.x} ${p1.y} L ${p2.x} ${p2.y}`}
										ms={step.ms}
									/>
								)}
							</>
						);
					})()}
				</g>
			)}

			{storeDirection && (
				<g key={step.beat} style={{ color: "var(--color-brand)" }}>
					<path
						d={
							storeDirection === "out"
								? bindPath(store.r + ARROW_OFFSET)
								: bindReturnPath(worker.r + ARROW_OFFSET)
						}
						fill="none"
						stroke="currentColor"
						strokeWidth={2}
						strokeLinecap="round"
						strokeLinejoin="round"
					/>
					<Arrowhead
						x={
							storeDirection === "out"
								? store.r + ARROW_OFFSET
								: worker.r + ARROW_OFFSET
						}
						y={storeDirection === "out" ? store.cy : worker.cy}
						angle={180}
					/>
					{!reduced && (
						<PulseDot
							d={
								storeDirection === "out"
									? bindPath(store.r)
									: bindReturnPath(worker.r)
							}
							ms={step.ms}
						/>
					)}
				</g>
			)}

			<g style={dim("client")}>
				<rect
					x={client.l}
					y={client.t}
					width={client.w}
					height={client.h}
					rx={5}
					className="fill-none stroke-neutral-300 dark:stroke-neutral-700"
					strokeDasharray="3 3"
				/>
				<Caption
					x={client.cx}
					y={client.cy + NODE_FS * 0.33}
					anchor="middle"
					size={NODE_FS}
					tone="ghost"
				>
					Client
				</Caption>
			</g>

			<g style={dim("worker")}>
				<LabelCard
					rect={worker}
					notches={{ top: true, bottom: true }}
					label="Worker"
					active={lit("worker")}
					fontSize={NODE_FS}
				/>
			</g>

			<ContainerInstanceCard
				rect={card}
				phase={phase}
				filled={filled}
				active={cardActive}
				reduced={reduced}
			/>

			<PersistentStorage
				rect={store}
				active={lit("store")}
				persisted={hasPersisted}
				reduced={reduced}
			/>
		</WeldCanvas>
	);
}

// A brand dot travelling source → target along the firing edge.
function PulseDot({ d, ms }: { d: string; ms: number }) {
	const sec = Math.max(0.5, (ms / 1000) * 0.82);
	return (
		<g>
			<circle r={8} className="fill-brand" opacity={0}>
				<animateMotion
					dur={`${sec}s`}
					path={d}
					keyPoints="0;1"
					keyTimes="0;1"
					calcMode="linear"
					fill="freeze"
				/>
				<animate
					attributeName="opacity"
					values="0;0.2;0.2;0"
					keyTimes="0;0.12;0.82;1"
					dur={`${sec}s`}
					fill="freeze"
				/>
			</circle>
			<circle r={4} className="fill-brand" opacity={0}>
				<animateMotion
					dur={`${sec}s`}
					path={d}
					keyPoints="0;1"
					keyTimes="0;1"
					calcMode="linear"
					fill="freeze"
				/>
				<animate
					attributeName="opacity"
					values="0;1;1;0.001"
					keyTimes="0;0.1;0.88;1"
					dur={`${sec}s`}
					fill="freeze"
				/>
			</circle>
		</g>
	);
}

function ContainerInstanceCard({
	rect,
	phase,
	filled,
	active,
	reduced,
}: {
	rect: NodeRect;
	phase: Phase;
	filled: number;
	active: boolean;
	reduced: boolean;
}) {
	const isRunning = phase === "running";
	const bodyTop = rect.t + HEADER_H;
	const firstRowOffset = Math.max(12, BODY_FS + 4);
	const rowY = (i: number) => bodyTop + firstRowOffset + i * ROW_GAP;
	const headerPad = Math.max(2, (HEADER_H - 6) / 2);

	const diskStates: FillState[] = DISK_WIDTHS.map((_, i) =>
		isRunning && i < filled ? "filled" : "empty",
	);

	return (
		<SimpleCard
			rect={rect}
			notches={{ top: true }}
			label="Container instance"
			active={active}
			headerH={HEADER_H}
			headerFontSize={HEADER_FS}
			pad={headerPad}
		>
			<PhaseBadge
				rect={rect}
				headerH={HEADER_H}
				fontSize={HEADER_FS}
				label={BADGE[phase]}
				tone={active ? "accent" : "muted"}
				pad={headerPad}
			/>

			<Caption x={rect.l + PAD_X} y={rowY(0)} size={CAP_FS}>
				image
			</Caption>
			<text
				x={rect.r - PAD_X}
				y={rowY(0)}
				textAnchor="end"
				className={
					active
						? "fill-neutral-700 dark:fill-neutral-300"
						: "fill-neutral-400 dark:fill-neutral-500"
				}
				style={{
					fontFamily: MONO,
					fontSize: BODY_FS,
					letterSpacing: "0.05em",
					transition: `fill ${MOTION.transition}ms ${EASE_OUT}`,
				}}
			>
				my-app:latest
			</text>

			<Caption x={rect.l + PAD_X} y={rowY(1)} size={CAP_FS}>
				local disk
			</Caption>
			<FillBars
				right={rect.r - PAD_X}
				y={rowY(1) - 4}
				state="empty"
				states={diskStates}
				widths={DISK_WIDTHS}
				reduced={reduced}
			/>
		</SimpleCard>
	);
}

function PersistentStorage({
	rect,
	active,
	persisted,
	reduced,
}: {
	rect: NodeRect;
	active: boolean;
	persisted: boolean;
	reduced: boolean;
}) {
	const headerPad = Math.max(4, (STORE_HEADER_H - 6) / 2);
	let y = rect.t + STORE_HEADER_H + STORE_CHIP_GAP;
	const chipX = rect.l + STORE_PAD;
	return (
		<SimpleCard
			rect={rect}
			label="Persistent storage"
			active={active}
			headerH={STORE_HEADER_H}
			headerFontSize={STORE_HEADER_FS}
			pad={headerPad}
		>
			{BINDINGS.map((label) => {
				const chip = makeRect(chipX, y, STORE_CHIP_W, STORE_CHIP_H);
				y += STORE_CHIP_H + STORE_CHIP_GAP;
				return (
					<StorageChip
						key={label}
						rect={chip}
						label={label}
						active={active}
						persisted={persisted}
						reduced={reduced}
					/>
				);
			})}
		</SimpleCard>
	);
}

function StorageChip({
	rect,
	label,
	active,
	persisted,
	reduced,
}: {
	rect: NodeRect;
	label: string;
	active: boolean;
	persisted: boolean;
	reduced: boolean;
}) {
	return (
		<g>
			<WeldedCard rect={rect} active={active} />
			<text
				x={rect.l + 10}
				y={rect.cy + STORE_LABEL_FS * 0.34}
				textAnchor="start"
				className={
					active
						? "fill-neutral-900 dark:fill-neutral-100"
						: "fill-neutral-700 dark:fill-neutral-300"
				}
				style={{
					fontFamily: MONO,
					fontWeight: 500,
					fontSize: STORE_LABEL_FS,
					letterSpacing: "0.06em",
					textTransform: "uppercase",
					transition: `fill ${MOTION.transition}ms ${EASE_OUT}`,
				}}
			>
				{label}
			</text>
			<FillBars
				right={rect.r - 9}
				y={rect.cy - 1}
				state={persisted ? "filled" : "dim"}
				widths={[7, 9, 5]}
				height={2}
				gap={2}
				reduced={reduced}
			/>
		</g>
	);
}

export default ContainerConnectivity;
