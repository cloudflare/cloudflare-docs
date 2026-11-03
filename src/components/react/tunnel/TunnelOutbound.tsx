"use client";

// Figure 1 on the Tunnel concepts page: cloudflared opens connections
// outward. Before the tunnel exists a request squashes against the
// port-less network boundary (no public address, nothing listening).
// Enabling the tunnel draws connections upward out of cloudflared, seating
// into ports at both ends. There are no arrowheads: the connection is
// hardware; direction is carried only by the moving request.
import { useEffect, useState } from "react";
import { Diagram, useDiagramOrDefault } from "@cloudflare/nimbus-docs/react";
import { LabelCard, makeRect } from "../diagram-weld";
import { WeldCanvas } from "../container/WeldCanvas";
import { LabeledButton, Toolbar } from "../container/Transport";
import type { DiagramFallbackProps } from "../container/DiagramFallback";
import { NetBoundary, Port, Pour, Squash } from "./TunnelKit";

// Layout, in SVG user units.
const VIEW_W = 340;
const VIEW_H = 258;
const CX = 170; // centre spine
const CF = makeRect(122, 22, 96, 40); // Cloudflare card
const FIELD = makeRect(52, 116, 236, 122); // "Your network" boundary
const DAEMON = makeRect(110, 148, 120, 40); // cloudflared card
const LANES = [154, 186]; // x of the two connection lanes

// Timing (ms).
const CONNECT_MS = 1050;
const CONNECT_MS_REDUCED = 60;
const REFUSED_HOLD_MS = 1000;
const FLOW_HOLD_MS = 780;
const REDUCED_HOLD_MS = 1100;
const SQUASH_DELAY_MS = 480;

// Fraction along a card's top/bottom edge where each lane meets it.
const laneFracs = (rect: { l: number; w: number }) =>
	LANES.map((lx) => (lx - rect.l) / rect.w);

export function TunnelOutbound(_props: DiagramFallbackProps) {
	return (
		<Diagram
			label="cloudflared opens connections from a private network upward to Cloudflare; a request then travels back down through those connections. A request sent before the tunnel exists is refused at the network boundary. Operate it with the Enable tunnel and Send request controls."
			keyboard={false}
		>
			<OutboundBody />
		</Diagram>
	);
}

function OutboundBody() {
	const ctx = useDiagramOrDefault("TunnelOutbound");
	const reduced = ctx.reducedMotion;
	const [phase, setPhase] = useState<"idle" | "connecting" | "connected">(
		"idle",
	);
	const [flow, setFlow] = useState<"none" | "in" | "back" | "refused">("none");
	const connected = phase === "connected";

	// Enabling the tunnel: settle into the connected state after the draw.
	useEffect(() => {
		if (phase !== "connecting") return;
		const t = setTimeout(
			() => setPhase("connected"),
			reduced ? CONNECT_MS_REDUCED : CONNECT_MS,
		);
		return () => clearTimeout(t);
	}, [phase, reduced]);

	// A request advances one leg at a time (in → back → none); a refused
	// request holds its outcome and then clears. Reduced motion still holds
	// each outcome long enough to read.
	useEffect(() => {
		if (flow === "none") return;
		const hold = reduced
			? REDUCED_HOLD_MS
			: flow === "refused"
				? REFUSED_HOLD_MS
				: FLOW_HOLD_MS;
		const t = setTimeout(() => setFlow(flow === "in" ? "back" : "none"), hold);
		return () => clearTimeout(t);
	}, [flow, reduced]);

	return (
		<WeldCanvas
			width={VIEW_W}
			height={VIEW_H}
			liveStatus={
				flow === "refused"
					? "The request was refused at the network boundary — nothing is listening."
					: flow === "in"
						? "A request travels down an established connection into the network."
						: flow === "back"
							? "The response returns to Cloudflare over the second connection."
							: connected
								? "cloudflared holds open connections to Cloudflare."
								: "The private network has no inbound connections."
			}
			controls={
				<Toolbar className="justify-end">
					<div className="flex flex-col items-stretch gap-1">
						<LabeledButton
							ariaLabel="Enable the tunnel"
							ariaDisabled={phase !== "idle"}
							onClick={() => phase === "idle" && setPhase("connecting")}
						>
							{phase === "connecting" ? "Connecting…" : "Enable tunnel"}
						</LabeledButton>
						<LabeledButton
							ariaLabel="Send a request"
							onClick={() =>
								flow === "none" && setFlow(connected ? "in" : "refused")
							}
						>
							Send request
						</LabeledButton>
					</div>
				</Toolbar>
			}
		>
			<NetBoundary rect={FIELD} label="Your network" />
			<LabelCard
				rect={DAEMON}
				label="cloudflared"
				fontSize={11}
				active
				notches={{ top: laneFracs(DAEMON) }}
			/>
			<LabelCard
				rect={CF}
				label="Cloudflare"
				fontSize={11}
				active={connected || flow === "refused"}
				notches={{ bottom: laneFracs(CF) }}
			/>

			{/* Enabling: draw both connections upward out of cloudflared. */}
			{!reduced &&
				phase === "connecting" &&
				LANES.map((lx, i) => (
					<path
						key={lx}
						d={`M ${lx} ${DAEMON.t - 5} L ${lx} ${CF.b + 5}`}
						fill="none"
						strokeWidth={1.5}
						pathLength={1}
						strokeDasharray="1"
						strokeDashoffset={1}
						className="stroke-brand"
						style={{
							animation: `weld-draw 0.55s cubic-bezier(0.23, 1, 0.32, 1) ${i * 0.22}s forwards`,
						}}
					/>
				))}
			{/* Established: the two connections as static conductors. */}
			{(connected || (reduced && phase !== "idle")) &&
				LANES.map((lx) => (
					<line
						key={lx}
						x1={lx}
						y1={CF.b + 5}
						x2={lx}
						y2={DAEMON.t - 5}
						strokeWidth={1.25}
						className="stroke-neutral-300 dark:stroke-neutral-700"
					/>
				))}
			{/* Ports at both ends, taken once connected. */}
			{phase !== "idle" &&
				LANES.map((lx) => (
					<g key={`ports-${lx}`}>
						<Port cx={lx} cy={CF.b} taken={connected} />
						<Port cx={lx} cy={DAEMON.t} taken={connected} />
					</g>
				))}

			{/* Refused: a pour descends from Cloudflare and squashes against
			    the port-less boundary once it arrives. */}
			{!reduced && flow === "refused" && (
				<g>
					<Pour d={`M ${CX} ${CF.b} L ${CX} ${FIELD.t - 6}`} dur={0.55} />
					<DelayedSquash x={CX} y={FIELD.t - 6} delayMs={SQUASH_DELAY_MS} />
				</g>
			)}
			{/* Request in, down the first connection. */}
			{!reduced && flow === "in" && (
				<Pour d={`M ${LANES[0]} ${CF.b} L ${LANES[0]} ${DAEMON.t}`} dur={0.6} />
			)}
			{/* Response out, up the second. */}
			{!reduced && flow === "back" && (
				<Pour d={`M ${LANES[1]} ${DAEMON.t} L ${LANES[1]} ${CF.b}`} dur={0.6} />
			)}
			{/* Reduced motion: the same outcomes, held statically. */}
			{reduced && flow === "refused" && (
				<rect
					x={CX - 5}
					y={FIELD.t - 8}
					width={10}
					height={3}
					rx={1}
					className="fill-brand"
				/>
			)}
			{reduced && (flow === "in" || flow === "back") && (
				<line
					x1={LANES[flow === "in" ? 0 : 1]}
					y1={CF.b}
					x2={LANES[flow === "in" ? 0 : 1]}
					y2={DAEMON.t}
					strokeWidth={1.5}
					strokeLinecap="round"
					className="stroke-brand"
				/>
			)}
		</WeldCanvas>
	);
}

/** Squash that waits for the pour to arrive before flattening. */
function DelayedSquash({
	x,
	y,
	delayMs,
}: {
	x: number;
	y: number;
	delayMs: number;
}) {
	const [show, setShow] = useState(false);
	useEffect(() => {
		const t = setTimeout(() => setShow(true), delayMs);
		return () => clearTimeout(t);
	}, [delayMs]);
	return show ? <Squash x={x} y={y} /> : null;
}

export default TunnelOutbound;
