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
const VIEW_H = 288;
const LAPTOP = makeRect(102, 16, 136, 42);
const CLOUDFLARE = makeRect(88, 122, 164, 48);
const SERVER = makeRect(102, 230, 136, 42);
const BEAT_MS = 900;

type Direction = "to-server" | "to-laptop";
type Phase =
	| "idle"
	| "request-to-cloudflare"
	| "request-to-peer"
	| "response-to-cloudflare"
	| "response-to-sender"
	| "complete";

const NEXT_PHASE: Partial<Record<Phase, Phase>> = {
	"request-to-cloudflare": "request-to-peer",
	"request-to-peer": "response-to-cloudflare",
	"response-to-cloudflare": "response-to-sender",
	"response-to-sender": "complete",
};

export default function MeshBidirectional(_props: DiagramFallbackProps) {
	return (
		<Diagram label="A laptop and server can each initiate private traffic. Send a packet from either participant to see the request travel through Cloudflare and the response return along the reverse path.">
			<BidirectionalBody />
		</Diagram>
	);
}

function BidirectionalBody() {
	const ctx = useDiagramOrDefault("MeshBidirectional");
	const [direction, setDirection] = useState<Direction>("to-server");
	const [phase, setPhase] = useState<Phase>("idle");
	const [runId, setRunId] = useState(0);
	const toServer = direction === "to-server";
	const source = toServer ? LAPTOP : SERVER;
	const destination = toServer ? SERVER : LAPTOP;
	const sourceSide = toServer ? ("bottom" as const) : ("top" as const);
	const destinationSide = toServer ? ("top" as const) : ("bottom" as const);
	const cloudflareSourceSide = toServer
		? ("top" as const)
		: ("bottom" as const);
	const cloudflareDestinationSide = toServer
		? ("bottom" as const)
		: ("top" as const);
	const requestToCloudflare = phase === "request-to-cloudflare";
	const requestToPeer = phase === "request-to-peer";
	const responseToCloudflare = phase === "response-to-cloudflare";
	const responseToSender = phase === "response-to-sender";
	const active = phase !== "idle";

	useEffect(() => {
		const next = NEXT_PHASE[phase];
		if (
			!next ||
			!ctx.playing ||
			ctx.reducedMotion ||
			!ctx.visible ||
			!ctx.tabVisible
		)
			return;
		const timer = setTimeout(() => setPhase(next), BEAT_MS);
		return () => clearTimeout(timer);
	}, [phase, ctx.playing, ctx.reducedMotion, ctx.visible, ctx.tabVisible]);

	const sendPacket = (nextDirection: Direction) => {
		setDirection(nextDirection);
		setRunId((value) => value + 1);
		setPhase(ctx.reducedMotion ? "complete" : "request-to-cloudflare");
	};

	const sender = toServer ? "Laptop" : "Server";
	const receiver = toServer ? "Server" : "Laptop";
	const status =
		phase === "idle"
			? "Choose a sender"
			: requestToCloudflare
				? `${sender} sends request to Cloudflare`
				: requestToPeer
					? `Cloudflare forwards request to ${receiver}`
					: responseToCloudflare
						? `${receiver} returns response to Cloudflare`
						: responseToSender
							? `Cloudflare returns response to ${sender}`
							: "Round trip complete";

	return (
		<WeldCanvas
			width={VIEW_W}
			height={VIEW_H}
			liveStatus={status}
			controls={
				<Toolbar status={status}>
					<LabeledButton
						ariaLabel="Send a packet from the laptop to the server"
						onClick={() => sendPacket("to-server")}
						highlight={active && toServer}
					>
						Send from laptop
					</LabeledButton>
					<LabeledButton
						ariaLabel="Send a packet from the server to the laptop"
						onClick={() => sendPacket("to-laptop")}
						highlight={active && !toServer}
					>
						Send from server
					</LabeledButton>
				</Toolbar>
			}
		>
			<Connector
				from={edgePoint(LAPTOP, "bottom")}
				to={edgePoint(CLOUDFLARE, "top")}
				straight
				ghost
			/>
			<Connector
				from={edgePoint(CLOUDFLARE, "bottom")}
				to={edgePoint(SERVER, "top")}
				straight
				ghost
			/>
			{(requestToCloudflare || responseToSender || phase === "complete") && (
				<>
					<Connector
						from={
							responseToSender
								? edgePoint(CLOUDFLARE, cloudflareSourceSide)
								: edgePoint(source, sourceSide)
						}
						to={
							responseToSender
								? edgePoint(source, sourceSide)
								: edgePoint(CLOUDFLARE, cloudflareSourceSide)
						}
						straight
						arrowhead={phase !== "complete"}
						active
					/>
				</>
			)}
			{(requestToPeer || responseToCloudflare || phase === "complete") && (
				<>
					<Connector
						from={
							responseToCloudflare
								? edgePoint(destination, destinationSide)
								: edgePoint(CLOUDFLARE, cloudflareDestinationSide)
						}
						to={
							responseToCloudflare
								? edgePoint(CLOUDFLARE, cloudflareDestinationSide)
								: edgePoint(destination, destinationSide)
						}
						straight
						arrowhead={phase !== "complete"}
						active
					/>
				</>
			)}

			<LabelCard rect={LAPTOP} label="Laptop" active fontSize={10} />
			<LabelCard rect={CLOUDFLARE} label="Cloudflare" active fontSize={10} />
			<LabelCard rect={SERVER} label="Server" active fontSize={10} />
			<Caption x={VIEW_W / 2} y={94} anchor="middle">
				Encrypted Mesh connection
			</Caption>
			<Caption x={VIEW_W / 2} y={206} anchor="middle">
				Encrypted Mesh connection
			</Caption>
			{phase !== "idle" && phase !== "complete" && !ctx.reducedMotion && (
				<Packet
					key={`${runId}-${phase}`}
					path={
						requestToCloudflare
							? line(source, sourceSide, CLOUDFLARE, cloudflareSourceSide)
							: requestToPeer
								? line(
										CLOUDFLARE,
										cloudflareDestinationSide,
										destination,
										destinationSide,
									)
								: responseToCloudflare
									? line(
											destination,
											destinationSide,
											CLOUDFLARE,
											cloudflareDestinationSide,
										)
									: line(CLOUDFLARE, cloudflareSourceSide, source, sourceSide)
					}
				/>
			)}
		</WeldCanvas>
	);
}

function line(
	from: typeof LAPTOP,
	fromSide: "top" | "bottom",
	to: typeof LAPTOP,
	toSide: "top" | "bottom",
) {
	const a = edgePoint(from, fromSide);
	const b = edgePoint(to, toSide);
	return `M ${a.x} ${a.y} L ${b.x} ${b.y}`;
}

function Packet({ path }: { path: string }) {
	return <PacketPulse path={path} ms={BEAT_MS} />;
}
