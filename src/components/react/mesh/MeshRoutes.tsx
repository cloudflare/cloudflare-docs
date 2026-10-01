"use client";

import { useEffect, useState } from "react";
import { Diagram, useDiagramOrDefault } from "@cloudflare/nimbus-docs/react";
import {
	Caption,
	Connector,
	LabelCard,
	edgePoint,
	makeRect,
} from "../diagram-weld";
import { WeldCanvas } from "../container/WeldCanvas";
import { LabeledButton, Toolbar } from "../container/Transport";
import type { DiagramFallbackProps } from "../container/DiagramFallback";
import { PacketPulse } from "./PacketPulse";

const VIEW_W = 340;
const VIEW_H = 350;
const CLIENT = makeRect(110, 16, 120, 40);
const CLOUDFLARE = makeRect(100, 104, 140, 40);
const NODE = makeRect(100, 202, 140, 40);
const DATABASE = makeRect(110, 294, 120, 40);
const BEAT_MS = 850;

type Phase =
	| "idle"
	| "request-to-cloudflare"
	| "blocked"
	| "request-to-node"
	| "request-to-database"
	| "response-to-node"
	| "response-to-cloudflare"
	| "response-to-client"
	| "complete";

const NEXT_PHASE: Partial<Record<Phase, Phase>> = {
	"request-to-node": "request-to-database",
	"request-to-database": "response-to-node",
	"response-to-node": "response-to-cloudflare",
	"response-to-cloudflare": "response-to-client",
	"response-to-client": "complete",
};

export default function MeshRoutes(_props: DiagramFallbackProps) {
	return (
		<Diagram label="Test a request to a private database with or without a CIDR route. Without a route, Cloudflare drops the request. With a route, the request and response travel through the Mesh node.">
			<RoutesBody />
		</Diagram>
	);
}

function RoutesBody() {
	const ctx = useDiagramOrDefault("MeshRoutes");
	const [hasRoute, setHasRoute] = useState(false);
	const [routeForRun, setRouteForRun] = useState(false);
	const [phase, setPhase] = useState<Phase>("idle");
	const [runId, setRunId] = useState(0);
	const running =
		phase !== "idle" && phase !== "blocked" && phase !== "complete";

	useEffect(() => {
		if (!ctx.playing || ctx.reducedMotion || !ctx.visible || !ctx.tabVisible)
			return;
		const next =
			phase === "request-to-cloudflare"
				? routeForRun
					? "request-to-node"
					: "blocked"
				: NEXT_PHASE[phase];
		if (!next) return;
		const timer = setTimeout(() => setPhase(next), BEAT_MS);
		return () => clearTimeout(timer);
	}, [
		phase,
		routeForRun,
		ctx.playing,
		ctx.reducedMotion,
		ctx.visible,
		ctx.tabVisible,
	]);

	const status =
		phase === "idle"
			? hasRoute
				? "Route 10.0.0.0/24 active"
				: "No matching route"
			: phase === "request-to-cloudflare"
				? "Client sends request to Cloudflare"
				: phase === "blocked"
					? "Request dropped: no matching route"
					: phase === "request-to-node"
						? "Cloudflare matches the route"
						: phase === "request-to-database"
							? "Mesh node forwards to the database"
							: phase === "response-to-node"
								? "Database returns the result"
								: phase === "response-to-cloudflare"
									? "Mesh node returns the response"
									: phase === "response-to-client"
										? "Cloudflare responds to the client"
										: "Database round trip complete";

	const sendRequest = () => {
		setRunId((value) => value + 1);
		setRouteForRun(hasRoute);
		if (ctx.reducedMotion) {
			setPhase(hasRoute ? "complete" : "blocked");
		} else {
			setPhase("request-to-cloudflare");
		}
	};
	const toggleRoute = () => {
		setHasRoute((value) => !value);
		setPhase("idle");
	};

	const segment = activeSegment(phase);
	const path = segment
		? line(segment.from, segment.fromSide, segment.to, segment.toSide)
		: null;

	return (
		<WeldCanvas
			width={VIEW_W}
			height={VIEW_H}
			liveStatus={status}
			controls={
				<Toolbar status={status}>
					<LabeledButton
						ariaLabel={
							hasRoute ? "Remove the CIDR route" : "Add the CIDR route"
						}
						onClick={toggleRoute}
						disabled={running}
						highlight={!hasRoute}
					>
						{hasRoute ? "Remove route" : "Add route"}
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
				active={phase === "blocked" || phase === "complete"}
				ghost={phase !== "blocked" && phase !== "complete"}
			/>
			<Connector
				from={edgePoint(CLOUDFLARE, "bottom")}
				to={edgePoint(NODE, "top")}
				straight
				active={hasRoute || phase === "complete"}
				ghost={!hasRoute && phase !== "complete"}
			/>
			<Connector
				from={edgePoint(NODE, "bottom")}
				to={edgePoint(DATABASE, "top")}
				straight
				active={phase === "complete"}
				ghost={phase !== "complete"}
			/>
			{segment && (
				<Connector
					from={edgePoint(segment.from, segment.fromSide)}
					to={edgePoint(segment.to, segment.toSide)}
					straight
					active
					arrowhead
				/>
			)}

			<LabelCard rect={CLIENT} label="Client" active fontSize={10} />
			<LabelCard rect={CLOUDFLARE} label="Cloudflare" active fontSize={10} />
			<LabelCard
				rect={NODE}
				label="Mesh node"
				active={hasRoute}
				fontSize={10}
			/>
			<LabelCard
				rect={DATABASE}
				label="Database · 10.0.0.50"
				active={phase === "complete"}
				fontSize={10}
			/>
			<Caption x={VIEW_W / 2} y={178} anchor="middle">
				{phase === "blocked"
					? "Dropped · no matching route"
					: hasRoute
						? "Route 10.0.0.0/24"
						: "No matching route"}
			</Caption>
			<Caption x={VIEW_W / 2} y={274} anchor="middle">
				Private network
			</Caption>
			{phase === "blocked" && <FailureMark x={VIEW_W / 2} y={166} />}
			{path && !ctx.reducedMotion && (
				<PacketPulse key={`${runId}-${phase}`} path={path} ms={BEAT_MS} />
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

function activeSegment(phase: Phase) {
	if (phase === "request-to-cloudflare")
		return {
			from: CLIENT,
			fromSide: "bottom" as const,
			to: CLOUDFLARE,
			toSide: "top" as const,
		};
	if (phase === "request-to-node")
		return {
			from: CLOUDFLARE,
			fromSide: "bottom" as const,
			to: NODE,
			toSide: "top" as const,
		};
	if (phase === "request-to-database")
		return {
			from: NODE,
			fromSide: "bottom" as const,
			to: DATABASE,
			toSide: "top" as const,
		};
	if (phase === "response-to-node")
		return {
			from: DATABASE,
			fromSide: "top" as const,
			to: NODE,
			toSide: "bottom" as const,
		};
	if (phase === "response-to-cloudflare")
		return {
			from: NODE,
			fromSide: "top" as const,
			to: CLOUDFLARE,
			toSide: "bottom" as const,
		};
	if (phase === "response-to-client")
		return {
			from: CLOUDFLARE,
			fromSide: "top" as const,
			to: CLIENT,
			toSide: "bottom" as const,
		};
	return null;
}

function line(
	from: typeof CLIENT,
	fromSide: "top" | "bottom",
	to: typeof CLIENT,
	toSide: "top" | "bottom",
) {
	const a = edgePoint(from, fromSide);
	const b = edgePoint(to, toSide);
	return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
}
