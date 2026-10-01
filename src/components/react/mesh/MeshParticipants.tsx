"use client";

import { useEffect, useState } from "react";
import { Diagram, useDiagramOrDefault } from "@cloudflare/nimbus-docs/react";
import {
	Caption,
	LabelCard,
	WeldedCard,
	edgePoint,
	makeRect,
} from "../diagram-weld";
import { WeldCanvas } from "../container/WeldCanvas";
import { LabeledButton, Toolbar } from "../container/Transport";
import type { DiagramFallbackProps } from "../container/DiagramFallback";
import { PacketPulse } from "./PacketPulse";

const VIEW_W = 340;
const VIEW_H = 260;
const NETWORK = makeRect(14, 18, 312, 218);
const NODE = makeRect(30, 52, 124, 42);
const DEVICE = makeRect(186, 52, 124, 42);
const CLOUDFLARE = makeRect(108, 150, 124, 42);
const BEAT_MS = 900;

type Phase =
	| "idle"
	| "node-connecting"
	| "node-connected"
	| "device-connecting"
	| "complete";

export default function MeshParticipants(_props: DiagramFallbackProps) {
	return (
		<Diagram label="A Mesh node and client device connect independently to Cloudflare. Cloudflare assigns each one a private Mesh IP in the same account network.">
			<ParticipantsBody />
		</Diagram>
	);
}

function ParticipantsBody() {
	const ctx = useDiagramOrDefault("MeshParticipants");
	const [phase, setPhase] = useState<Phase>("idle");
	const [runId, setRunId] = useState(0);
	const nodeConnected = phase !== "idle" && phase !== "node-connecting";
	const deviceConnected = phase === "complete";

	useEffect(() => {
		if (
			(phase !== "node-connecting" && phase !== "device-connecting") ||
			!ctx.playing ||
			ctx.reducedMotion ||
			!ctx.visible ||
			!ctx.tabVisible
		)
			return;
		const timer = setTimeout(
			() =>
				setPhase(phase === "node-connecting" ? "node-connected" : "complete"),
			BEAT_MS,
		);
		return () => clearTimeout(timer);
	}, [phase, ctx.playing, ctx.reducedMotion, ctx.visible, ctx.tabVisible]);

	const status =
		phase === "idle"
			? "Not connected"
			: phase === "node-connecting"
				? "Mesh node establishing connection"
				: phase === "node-connected"
					? "Mesh node assigned 100.96.0.1"
					: phase === "device-connecting"
						? "Client device establishing connection"
						: "Both participants have Mesh IPs";
	const action =
		phase === "idle"
			? "Connect node"
			: phase === "node-connected"
				? "Connect device"
				: phase === "complete"
					? "Reset"
					: "Connecting";
	const handleAction = () => {
		if (phase === "idle") {
			setRunId((value) => value + 1);
			setPhase(ctx.reducedMotion ? "node-connected" : "node-connecting");
		} else if (phase === "node-connected") {
			setRunId((value) => value + 1);
			setPhase(ctx.reducedMotion ? "complete" : "device-connecting");
		} else if (phase === "complete") {
			setPhase("idle");
		}
	};

	return (
		<WeldCanvas
			width={VIEW_W}
			height={VIEW_H}
			liveStatus={status}
			controls={
				<Toolbar status={status}>
					<LabeledButton
						ariaLabel={action}
						onClick={handleAction}
						highlight={phase === "idle" || phase === "node-connected"}
						disabled={
							phase === "node-connecting" || phase === "device-connecting"
						}
					>
						{action}
					</LabeledButton>
				</Toolbar>
			}
		>
			<WeldedCard rect={NETWORK} dashed muted flat notches={{}} />
			<Caption x={NETWORK.cx} y={37} anchor="middle">
				Your account's Mesh network
			</Caption>

			<path
				d={`M ${NODE.cx} ${NODE.b} L ${CLOUDFLARE.cx - 34} ${CLOUDFLARE.t}`}
				fill="none"
				strokeWidth={nodeConnected || phase === "node-connecting" ? 1.75 : 1.25}
				className={
					nodeConnected || phase === "node-connecting"
						? "stroke-brand"
						: "stroke-neutral-300 dark:stroke-neutral-700"
				}
			/>
			<path
				d={`M ${DEVICE.cx} ${DEVICE.b} L ${CLOUDFLARE.cx + 34} ${CLOUDFLARE.t}`}
				fill="none"
				strokeWidth={
					deviceConnected || phase === "device-connecting" ? 1.75 : 1.25
				}
				className={
					deviceConnected || phase === "device-connecting"
						? "stroke-brand"
						: "stroke-neutral-300 dark:stroke-neutral-700"
				}
			/>

			<LabelCard
				rect={NODE}
				label="Mesh node"
				active={nodeConnected}
				fontSize={10}
			/>
			<LabelCard
				rect={DEVICE}
				label="Client device"
				active={deviceConnected}
				fontSize={10}
			/>
			<LabelCard
				rect={CLOUDFLARE}
				label="Cloudflare"
				active={nodeConnected || deviceConnected}
				fontSize={10}
			/>
			<Caption
				x={NODE.cx}
				y={116}
				anchor="middle"
				opacity={nodeConnected ? 1 : 0}
			>
				100.96.0.1
			</Caption>
			<Caption
				x={DEVICE.cx}
				y={116}
				anchor="middle"
				opacity={deviceConnected ? 1 : 0}
			>
				100.96.0.10
			</Caption>
			<Caption x={NETWORK.cx} y={216} anchor="middle">
				Private Mesh IPs
			</Caption>
			{phase === "node-connecting" && !ctx.reducedMotion && (
				<PacketPulse
					key={`${runId}-${phase}`}
					path={line(NODE, CLOUDFLARE, 0.23)}
					ms={BEAT_MS}
				/>
			)}
			{phase === "device-connecting" && !ctx.reducedMotion && (
				<PacketPulse
					key={`${runId}-${phase}`}
					path={line(DEVICE, CLOUDFLARE, 0.77)}
					ms={BEAT_MS}
				/>
			)}
		</WeldCanvas>
	);
}

function line(from: typeof NODE, to: typeof CLOUDFLARE, toFraction: number) {
	const a = edgePoint(from, "bottom");
	const b = edgePoint(to, "top", toFraction);
	return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
}
