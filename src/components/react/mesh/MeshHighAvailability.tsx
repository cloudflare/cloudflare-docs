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

type Replica = "a" | "b";
type Point = { x: number; y: number };

const VIEW_W = 340;
const VIEW_H = 368;
const CLIENT = makeRect(110, 12, 120, 38);
const CLOUDFLARE = makeRect(80, 84, 180, 40);
const NODE = makeRect(18, 158, 304, 118);
const REPLICA_A = makeRect(29, 206, 122, 40);
const REPLICA_B = makeRect(189, 206, 122, 40);
const DATABASE = makeRect(80, 316, 180, 40);
const BEAT_MS = 900;

// Every link is vertical so captions can sit in the clear space between
// them. Uplinks drop straight from Cloudflare onto each replica's centre;
// downlinks leave each replica near its inner corner, leaving room for the
// status caption on the outer side.
type Link = { from: Point; to: Point };
const vertical = (x: number, fromY: number, toY: number): Link => ({
	from: { x, y: fromY },
	to: { x, y: toY },
});
const UPLINK: Record<Replica, Link> = {
	a: vertical(REPLICA_A.cx, CLOUDFLARE.b, REPLICA_A.t),
	b: vertical(REPLICA_B.cx, CLOUDFLARE.b, REPLICA_B.t),
};
const DOWNLINK: Record<Replica, Link> = {
	a: vertical(140, REPLICA_A.b, DATABASE.t),
	b: vertical(200, REPLICA_B.b, DATABASE.t),
};

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

	const target: Replica = targetReplica ?? "a";
	const requestToCloudflare = path({
		from: edgePoint(CLIENT, "bottom"),
		to: edgePoint(CLOUDFLARE, "top"),
	});
	const requestToReplica = path(UPLINK[target]);
	const requestToDatabase = path(DOWNLINK[target]);

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
			{/* Drawn first so the links into each replica stay visible on top. */}
			<WeldedCard rect={NODE} dashed muted flat notches={{}} />
			{/* Centred between the two uplinks. */}
			<Caption x={NODE.cx} y={186} anchor="middle">
				Mesh node #123
			</Caption>
			<Connector
				from={edgePoint(CLIENT, "bottom")}
				to={edgePoint(CLOUDFLARE, "top")}
				straight
				active={phase === "failed" || phase === "complete"}
				ghost={phase !== "failed" && phase !== "complete"}
			/>
			{(["a", "b"] as const).map((replica) => (
				<g key={replica}>
					<Connector
						{...UPLINK[replica]}
						straight
						active={activeReplica === replica}
						ghost={activeReplica !== replica}
					/>
					<Connector
						{...DOWNLINK[replica]}
						straight
						active={activeReplica === replica}
						ghost={activeReplica !== replica}
					/>
				</g>
			))}

			<LabelCard rect={CLIENT} label="Client" active fontSize={10} />
			<LabelCard rect={CLOUDFLARE} label="Cloudflare" active fontSize={10} />
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
			{/* Status captions sit on the outer side of each downlink. */}
			<Caption x={REPLICA_A.l} y={262}>
				{!aOnline ? "Offline" : activeReplica === "a" ? "Active" : "Standby"}
			</Caption>
			<Caption x={REPLICA_B.r} y={262} anchor="end">
				{!hasReplicaB
					? "Not added"
					: activeReplica === "b"
						? "Active"
						: "Standby"}
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

function path({ from, to }: Link) {
	return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
}
