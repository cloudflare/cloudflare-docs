"use client";

import { useEffect } from "react";
// Container lifecycle (Concepts page). Started on demand: a request triggers
// a cold start, the instance serves, then it stops when idle.
// Autoplays once, then rests. The instance card is ephemeral — it mounts on
// cold-start over an empty state and unmounts when stopped.
import {
	Diagram,
	useDiagramOrDefault,
	usePhase,
} from "@cloudflare/nimbus-docs/react";
import {
	Caption,
	Connector,
	LabelCard,
	SimpleCard,
	WeldedCard,
	PhaseBadge,
	FillBars,
	autoLabelRect,
	edgePoint,
	makeRect,
} from "../diagram-weld";
import { WeldCanvas, weldEnter } from "./WeldCanvas";
import { Toolbar, PlayPauseButton, ResetButton } from "./Transport";
import type { DiagramFallbackProps } from "./DiagramFallback";

const REQUEST_H = 28;
const REQUEST_PAD_X = 12;
const REQUEST_FS = 11;

const DO_W = 244;
const DO_H = 122;
const DO_HEADER_H = 30;
const DO_HEADER_FS = 11;
const DO_BODY_FS = 13;
const DO_CAPTION_FS = 11;
const DO_ROW_GAP = 24;
const DO_PAD_X = 14;

const AWAIT_MS = 1000;
const REQUEST_MS = 750;
const STARTING_MS = 1200;
const RUNNING_MS = 1600;
const IDLE_MS = 1200;
const STOPPED_MS = 2400;

const VIEW_W = 340;
const REQUEST_TOP = 14;
const CONNECTOR_LEN = 30;
const BOTTOM_MARGIN = 18;

type Phase = "await" | "request" | "starting" | "running" | "idle" | "stopped";

const ORDER: Phase[] = [
	"await",
	"request",
	"starting",
	"running",
	"idle",
	"stopped",
];
const STEP_MS: Record<Phase, number> = {
	await: AWAIT_MS,
	request: REQUEST_MS,
	starting: STARTING_MS,
	running: RUNNING_MS,
	idle: IDLE_MS,
	stopped: STOPPED_MS,
};
const isPhase = (v: unknown): v is Phase => ORDER.some((p) => p === v);

// Reduced-motion rest frame: the fully-populated RUNNING beat.
const REST_PHASE: Phase = "running";

export function ContainerLifecycle(_props: DiagramFallbackProps) {
	return (
		<Diagram label="A container started on demand by a request, running, then stopping when idle">
			<LifecycleBody />
		</Diagram>
	);
}

function LifecycleBody() {
	const ctx = useDiagramOrDefault("ContainerLifecycle");
	const walker = usePhase({
		steps: ORDER.map((id) => ({ id, hold: STEP_MS[id] })),
		loop: false,
		autoplay: false,
	});
	// Nimbus memoizes `start`, so this runs once for the mounted walker.
	useEffect(() => {
		walker.start();
	}, [walker.start]);

	const togglePlayback = () => {
		if (!walker.running) {
			walker.start();
			if (!ctx.playing) ctx.toggle();
			return;
		}
		ctx.toggle();
	};

	const phase: Phase = ctx.reducedMotion
		? REST_PHASE
		: isPhase(walker.current)
			? walker.current
			: "await";

	const present =
		phase === "starting" || phase === "running" || phase === "idle";
	const requestFiring = phase === "request";
	const starting = phase === "starting";
	const running = phase === "running";
	const idle = phase === "idle";
	const stopped = phase === "stopped";

	const requestProbe = autoLabelRect(0, REQUEST_TOP, "Request", {
		h: REQUEST_H,
		padX: REQUEST_PAD_X,
		fontSize: REQUEST_FS,
	});
	const requestRect = makeRect(
		(VIEW_W - requestProbe.w) / 2,
		REQUEST_TOP,
		requestProbe.w,
		REQUEST_H,
	);

	const doTop = REQUEST_TOP + REQUEST_H + CONNECTOR_LEN;
	const doRect = makeRect((VIEW_W - DO_W) / 2, doTop, DO_W, DO_H);
	const VIEW_H = doRect.b + BOTTOM_MARGIN;

	const doBodyTop = doRect.t + DO_HEADER_H;
	const firstRowOffset = Math.max(12, DO_BODY_FS + 4);
	const rowY = (i: number) => doBodyTop + firstRowOffset + i * DO_ROW_GAP;
	const headerPad = Math.max(2, (DO_HEADER_H - 6) / 2);

	const badgeLabel = starting ? "STARTING" : running ? "RUNNING" : "IDLE";
	const badgeTone: "accent" | "dim" | "muted" = idle ? "dim" : "accent";
	const slotPrimary = stopped
		? "No running instance"
		: phase === "request"
			? "Request received"
			: "Awaiting request";
	const slotSecondary = stopped
		? ["resources released", "until needed"]
		: phase === "request"
			? ["starting a Container"]
			: ["nothing runs until", "a request arrives"];
	const slotPrimaryFS = Math.max(13, DO_BODY_FS + 1);
	const slotSecondaryFS = Math.max(9, DO_CAPTION_FS - 1);

	const rowValue = (y: number, text: string) => (
		<text
			x={doRect.r - DO_PAD_X}
			y={y}
			textAnchor="end"
			className={
				idle
					? "fill-neutral-400 dark:fill-neutral-500"
					: "fill-neutral-700 dark:fill-neutral-300"
			}
			style={{
				fontFamily: "var(--font-mono)",
				fontSize: DO_BODY_FS,
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
			controls={
				<Toolbar>
					<PlayPauseButton
						playing={ctx.playing && walker.running}
						onClick={togglePlayback}
					/>
					<ResetButton onClick={ctx.reset} />
				</Toolbar>
			}
		>
			<LabelCard
				rect={requestRect}
				notches={{ bottom: true }}
				label="Request"
				active={requestFiring}
				fontSize={REQUEST_FS}
			/>
			<Connector
				from={edgePoint(requestRect, "bottom")}
				to={edgePoint(doRect, "top")}
				arrowhead
				active={requestFiring || starting}
				ghost={!(requestFiring || starting)}
			/>

			{!present && (
				<g>
					<WeldedCard rect={doRect} notches={{ top: true }} muted dashed flat />
					<text
						x={doRect.cx}
						y={doRect.cy - 3}
						textAnchor="middle"
						className="fill-neutral-500 dark:fill-neutral-400"
						style={{
							fontFamily: "var(--font-sans)",
							fontSize: slotPrimaryFS,
							fontWeight: 500,
							letterSpacing: "0.01em",
						}}
					>
						{slotPrimary}
					</text>
					{slotSecondary.map((line, index) => (
						<text
							key={line}
							x={doRect.cx}
							y={doRect.cy + slotSecondaryFS + 7 + index * 13}
							textAnchor="middle"
							className="fill-neutral-400 dark:fill-neutral-500"
							style={{
								fontFamily: "var(--font-mono)",
								fontSize: slotSecondaryFS,
								letterSpacing: "0.04em",
							}}
						>
							{line}
						</text>
					))}
				</g>
			)}

			{present && (
				<g style={{ animation: weldEnter(ctx.reducedMotion, 300) }}>
					<SimpleCard
						rect={doRect}
						notches={{ top: true }}
						label="Container"
						active={running || starting}
						headerH={DO_HEADER_H}
						headerFontSize={DO_HEADER_FS}
						pad={headerPad}
					>
						<PhaseBadge
							rect={doRect}
							headerH={DO_HEADER_H}
							fontSize={DO_HEADER_FS}
							label={badgeLabel}
							tone={badgeTone}
							pad={headerPad}
						/>

						<Caption x={doRect.l + DO_PAD_X} y={rowY(0)} size={DO_CAPTION_FS}>
							image
						</Caption>
						{rowValue(rowY(0), "myapp:latest")}

						<Caption x={doRect.l + DO_PAD_X} y={rowY(1)} size={DO_CAPTION_FS}>
							vm
						</Caption>
						{rowValue(rowY(1), "A")}

						<Caption x={doRect.l + DO_PAD_X} y={rowY(2)} size={DO_CAPTION_FS}>
							cpu
						</Caption>
						<FillBars
							right={doRect.r - DO_PAD_X}
							y={rowY(2) - 4}
							state={idle ? "dim" : "filled"}
							reduced={ctx.reducedMotion}
						/>
					</SimpleCard>
				</g>
			)}
		</WeldCanvas>
	);
}

export default ContainerLifecycle;
