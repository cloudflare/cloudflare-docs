"use client";

import { useEffect, useState } from "react";
import { Diagram, useDiagramOrDefault } from "@cloudflare/nimbus-docs/react";
import {
	Caption,
	Connector,
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
const VIEW_H = 372;
const CLIENT = makeRect(110, 12, 120, 38);
const CLOUDFLARE = makeRect(100, 84, 140, 40);
const NODE = makeRect(18, 158, 304, 112);
const REPLICA_A = makeRect(36, 198, 122, 40);
const REPLICA_B = makeRect(182, 198, 122, 40);
const DATABASE = makeRect(110, 318, 120, 40);
const BEAT_MS = 900;

type Replica = "a" | "b";
type Phase =
	| "idle"
	| "request-to-cloudflare"
	| "failed"
	| "request-to-replica"
	| "request-to-database"
	| "complete";

export default function MeshHighAvailability(_props: DiagramFallbackProps) {
	return (
		<Diagram label="Test database traffic with one or two replicas. Stop the only active replica and send a request to see it fail, then add replica B and retry through the promoted standby.">
			<HighAvailabilityBody />
		</Diagram>
	);
}

function HighAvailabilityBody() {
	const ctx = useDiagramOrDefault("MeshHighAvailability");
	const [aOnline, setAOnline] = useState(true);
	const [hasReplicaB, setHasReplicaB] = useState(false);
	const [activeReplica, setActiveReplica] = useState<Replica | null>("a");
	const [targetReplica, setTargetReplica] = useState<Replica | null>("a");
	const [phase, setPhase] = useState<Phase>("idle");
	const [runId, setRunId] = useState(0);
	const running =
		phase === "request-to-cloudflare" ||
		phase === "request-to-replica" ||
		phase === "request-to-database";

	useEffect(() => {
		if (
			!running ||
			!ctx.playing ||
			ctx.reducedMotion ||
			!ctx.visible ||
			!ctx.tabVisible
		)
			return;
		const next =
			phase === "request-to-cloudflare"
				? targetReplica == null
					? "failed"
					: "request-to-replica"
				: phase === "request-to-replica"
					? "request-to-database"
					: "complete";
		const timer = setTimeout(() => setPhase(next), BEAT_MS);
		return () => clearTimeout(timer);
	}, [
		phase,
		running,
		targetReplica,
		ctx.playing,
		ctx.reducedMotion,
		ctx.visible,
		ctx.tabVisible,
	]);

	const status =
		phase === "request-to-cloudflare"
			? "Client sends request to Cloudflare"
			: phase === "failed"
				? "Request failed: no active replica"
				: phase === "request-to-replica"
					? `Cloudflare forwards through replica ${targetReplica?.toUpperCase()}`
					: phase === "request-to-database"
						? `Replica ${targetReplica?.toUpperCase()} forwards to the database`
						: phase === "complete"
							? "Database reached"
							: activeReplica == null
								? "No active replica"
								: `Replica ${activeReplica.toUpperCase()} active`;

	const toggleA = () => {
		if (aOnline) {
			setAOnline(false);
			if (activeReplica === "a") setActiveReplica(hasReplicaB ? "b" : null);
		} else {
			setAOnline(true);
			if (activeReplica == null) setActiveReplica("a");
		}
		setPhase("idle");
	};
	const toggleReplicaB = () => {
		if (hasReplicaB) {
			setHasReplicaB(false);
			if (activeReplica === "b") setActiveReplica(aOnline ? "a" : null);
		} else {
			setHasReplicaB(true);
			if (activeReplica == null) setActiveReplica("b");
		}
		setPhase("idle");
	};
	const sendRequest = () => {
		setRunId((value) => value + 1);
		setTargetReplica(activeReplica);
		if (ctx.reducedMotion) {
			setPhase(activeReplica == null ? "failed" : "complete");
		} else {
			setPhase("request-to-cloudflare");
		}
	};

	const target = targetReplica === "b" ? REPLICA_B : REPLICA_A;
	const targetFraction = targetReplica === "b" ? 0.7 : 0.3;
	const requestToCloudflare = line(CLIENT, "bottom", CLOUDFLARE, "top");
	const requestToReplica = line(
		CLOUDFLARE,
		"bottom",
		target,
		"top",
		targetFraction,
	);
	const requestToDatabase = line(
		target,
		"bottom",
		DATABASE,
		"top",
		0.5,
		targetFraction,
	);

	return (
		<WeldCanvas
			width={VIEW_W}
			height={VIEW_H}
			liveStatus={status}
			controls={
				<Toolbar status={status}>
					<LabeledButton
						ariaLabel={aOnline ? "Stop replica A" : "Start replica A"}
						onClick={toggleA}
						disabled={running}
					>
						{aOnline ? "Stop A" : "Start A"}
					</LabeledButton>
					<LabeledButton
						ariaLabel={hasReplicaB ? "Remove replica B" : "Add replica B"}
						onClick={toggleReplicaB}
						disabled={running}
						highlight={!hasReplicaB}
					>
						{hasReplicaB ? "Remove B" : "Add B"}
					</LabeledButton>
					<LabeledButton
						ariaLabel="Send a request to the private database"
						onClick={sendRequest}
						disabled={running}
						highlight
					>
						Send request
					</LabeledButton>
				</Toolbar>
			}
		>
			<Connector
				from={edgePoint(CLIENT, "bottom")}
				to={edgePoint(CLOUDFLARE, "top")}
				straight
				active={phase === "failed" || phase === "complete"}
				ghost={phase !== "failed" && phase !== "complete"}
			/>
			<Connector
				from={edgePoint(CLOUDFLARE, "bottom", 0.3)}
				to={edgePoint(REPLICA_A, "top")}
				straight
				active={activeReplica === "a"}
				ghost={activeReplica !== "a"}
			/>
			<Connector
				from={edgePoint(CLOUDFLARE, "bottom", 0.7)}
				to={edgePoint(REPLICA_B, "top")}
				straight
				active={activeReplica === "b"}
				ghost={activeReplica !== "b"}
			/>
			<Connector
				from={edgePoint(REPLICA_A, "bottom")}
				to={edgePoint(DATABASE, "top", 0.3)}
				straight
				active={activeReplica === "a"}
				ghost={activeReplica !== "a"}
			/>
			<Connector
				from={edgePoint(REPLICA_B, "bottom")}
				to={edgePoint(DATABASE, "top", 0.7)}
				straight
				active={activeReplica === "b"}
				ghost={activeReplica !== "b"}
			/>
			{phase === "request-to-replica" && targetReplica && (
				<Connector
					from={edgePoint(CLOUDFLARE, "bottom", targetFraction)}
					to={edgePoint(target, "top")}
					straight
					active
					arrowhead
				/>
			)}
			{phase === "request-to-database" && targetReplica && (
				<Connector
					from={edgePoint(target, "bottom")}
					to={edgePoint(DATABASE, "top", targetFraction)}
					straight
					active
					arrowhead
				/>
			)}

			<LabelCard rect={CLIENT} label="Client" active fontSize={10} />
			<LabelCard rect={CLOUDFLARE} label="Cloudflare" active fontSize={10} />
			<WeldedCard rect={NODE} dashed muted flat notches={{}} />
			<Caption x={NODE.cx} y={177} anchor="middle">
				Mesh node #123 · Route 10.0.0.0/24
			</Caption>
			<LabelCard
				rect={REPLICA_A}
				label="Replica A"
				active={activeReplica === "a"}
				ghost={!aOnline}
				fontSize={10}
			/>
			<LabelCard
				rect={REPLICA_B}
				label="Replica B"
				active={activeReplica === "b"}
				ghost={!hasReplicaB}
				fontSize={10}
			/>
			<Caption x={REPLICA_A.cx} y={254} anchor="middle">
				{!aOnline ? "Offline" : activeReplica === "a" ? "Active" : "Standby"}
			</Caption>
			<Caption x={REPLICA_B.cx} y={254} anchor="middle">
				{!hasReplicaB
					? "Not registered"
					: activeReplica === "b"
						? "Active"
						: "Standby"}
			</Caption>
			<Caption x={DATABASE.cx} y={298} anchor="middle">
				{phase === "failed" ? "Unreachable" : "Private network"}
			</Caption>
			<LabelCard
				rect={DATABASE}
				label="Database · 10.0.0.50"
				active={phase === "complete"}
				fontSize={10}
			/>
			{phase === "failed" && <FailureMark x={CLOUDFLARE.cx} y={143} />}

			{!ctx.reducedMotion && phase === "request-to-cloudflare" && (
				<PacketPulse
					key={`${runId}-${phase}`}
					path={requestToCloudflare}
					ms={BEAT_MS}
				/>
			)}
			{!ctx.reducedMotion && phase === "request-to-replica" && (
				<PacketPulse
					key={`${runId}-${phase}`}
					path={requestToReplica}
					ms={BEAT_MS}
				/>
			)}
			{!ctx.reducedMotion && phase === "request-to-database" && (
				<PacketPulse
					key={`${runId}-${phase}`}
					path={requestToDatabase}
					ms={BEAT_MS}
				/>
			)}
		</WeldCanvas>
	);
}

function FailureMark({ x, y }: { x: number; y: number }) {
	return (
		<g className="text-red-500">
			<circle cx={x} cy={y} r={7} fill="currentColor" opacity={0.12} />
			<path
				d={`M ${x - 3} ${y - 3} L ${x + 3} ${y + 3} M ${x + 3} ${y - 3} L ${x - 3} ${y + 3}`}
				stroke="currentColor"
				strokeWidth={1.5}
				strokeLinecap="round"
			/>
		</g>
	);
}

function line(
	from: typeof CLIENT,
	fromSide: "top" | "bottom",
	to: typeof CLIENT,
	toSide: "top" | "bottom",
	fromFraction = 0.5,
	toFraction = 0.5,
) {
	const a = edgePoint(from, fromSide, fromFraction);
	const b = edgePoint(to, toSide, toFraction);
	return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
}
