"use client";

// Figure 3 on the Tunnel concepts page: one vertical path from a user down
// into a private network, assembled from named parts. "Connect hostname"
// seats the app.example.com route inside Cloudflare; "Enable tunnel" drops
// the tunnel card (with its two ports) into the gap between the networks.
// "Send request" reveals whichever part is still missing — no route and the
// request sparks out at the user's doorstep; routed but with no tunnel and
// it is refused at Cloudflare's edge. With both parts in place, the request
// pours the whole way through to the web service.
import { useEffect, useRef, useState } from "react";
import { Diagram, useDiagramOrDefault } from "@cloudflare/nimbus-docs/react";
import { LabelCard, makeRect } from "../diagram-weld";
import { WeldCanvas, weldEnter } from "../container/WeldCanvas";
import { LabeledButton, Toolbar } from "../container/Transport";
import type { DiagramFallbackProps } from "../container/DiagramFallback";
import { NetBoundary, Port, Pour, Sparks, Squash } from "./TunnelKit";

// Layout, in SVG user units. Everything shares one vertical spine.
const VIEW_W = 340;
const VIEW_H = 394;
const CX = 170;
const USER = makeRect(136, 4, 68, 32);
const CF_REGION = makeRect(78, 52, 184, 76);
const HOST = makeRect(110, 82, 120, 26);
const CHIP = makeRect(122, 154, 96, 44);
const FIELD = makeRect(60, 230, 220, 150);
const DAEMON = makeRect(110, 258, 120, 40);
const RES = makeRect(110, 332, 120, 34);

// Timing (ms).
const TUNNEL_UP_MS = 700;
const TUNNEL_UP_MS_REDUCED = 60;
// Per-stage durations: [request travels, outcome shows, clear].
const STAGE_MS_REDUCED = [60, 1100, 400];
const STAGE_MS_OK = [1250, 700, 450];
const STAGE_MS_FAIL = [650, 550, 350];

export function TunnelTraffic(_props: DiagramFallbackProps) {
	return (
		<Diagram
			label="One vertical path from a user into your network. Connect the public hostname and enable the tunnel to complete it; a request sent before either part exists fails at the missing layer, and a completed path delivers the request to the web service. Operate it with the Enable tunnel, Connect hostname, and Send request controls."
			keyboard={false}
		>
			<TrafficBody />
		</Diagram>
	);
}

type Outcome = "no-route" | "no-tunnel" | "ok";

function TrafficBody() {
	const ctx = useDiagramOrDefault("TunnelTraffic");
	const reduced = ctx.reducedMotion;
	const [tunnel, setTunnel] = useState<"none" | "connecting" | "up">("none");
	const [route, setRoute] = useState(false);
	const [req, setReq] = useState<{ kind: Outcome; n: number } | null>(null);
	const [stage, setStage] = useState(0);
	const reqSeq = useRef(0);

	// Enabling the tunnel settles to "up" after a short connect delay.
	useEffect(() => {
		if (tunnel !== "connecting") return;
		const t = setTimeout(
			() => setTunnel("up"),
			reduced ? TUNNEL_UP_MS_REDUCED : TUNNEL_UP_MS,
		);
		return () => clearTimeout(t);
	}, [tunnel, reduced]);

	// A request steps through its stages, then clears itself. Reduced motion
	// skips the travel stage but still holds the outcome.
	useEffect(() => {
		if (!req) return;
		const durs = reduced
			? STAGE_MS_REDUCED
			: req.kind === "ok"
				? STAGE_MS_OK
				: STAGE_MS_FAIL;
		if (stage < durs.length) {
			const t = setTimeout(() => {
				if (stage === durs.length - 1) {
					setReq(null);
					setStage(0);
				} else setStage(stage + 1);
			}, durs[stage]);
			return () => clearTimeout(t);
		}
	}, [req, stage, reduced]);

	// The outcome is decided the moment a request is sent: a missing route
	// fails first, then a missing tunnel, otherwise it is delivered.
	const send = () => {
		if (req) return;
		setStage(0);
		reqSeq.current += 1;
		setReq({
			kind: !route ? "no-route" : tunnel !== "up" ? "no-tunnel" : "ok",
			n: reqSeq.current,
		});
	};

	const kind = req?.kind;
	const delivering = kind === "ok";
	const inPour: Record<Outcome, string> = {
		"no-route": `M ${CX} ${USER.b} L ${CX} ${USER.b + 14}`,
		"no-tunnel": `M ${CX} ${USER.b} L ${CX} ${CF_REGION.b - 6}`,
		ok: `M ${CX} ${USER.b} L ${CX} ${DAEMON.t}`,
	};
	return (
		<WeldCanvas
			width={VIEW_W}
			height={VIEW_H}
			liveStatus={
				kind === "no-route"
					? "The request failed immediately: no route exists."
					: kind === "no-tunnel"
						? "The request matched the route but found no tunnel connection at Cloudflare's edge."
						: kind === "ok"
							? "The request travelled the completed path to the web service."
							: !route && tunnel !== "up"
								? "No route or tunnel exists yet."
								: !route
									? "The tunnel is up; no route exists yet."
									: tunnel !== "up"
										? "The route is set; the tunnel is not enabled."
										: "The path is complete."
			}
			controls={
				<Toolbar className="justify-end">
					<div className="flex flex-col items-stretch gap-1">
						<LabeledButton
							ariaLabel="Enable the tunnel"
							ariaDisabled={tunnel !== "none"}
							onClick={() => tunnel === "none" && setTunnel("connecting")}
						>
							{tunnel === "connecting" ? "Connecting…" : "Enable tunnel"}
						</LabeledButton>
						<LabeledButton
							ariaLabel="Connect the public hostname"
							ariaDisabled={route}
							onClick={() => !route && setRoute(true)}
						>
							Connect hostname
						</LabeledButton>
						<LabeledButton ariaLabel="Send a request" onClick={send}>
							Send request
						</LabeledButton>
					</div>
				</Toolbar>
			}
		>
			<NetBoundary rect={CF_REGION} label="Cloudflare" />
			<NetBoundary rect={FIELD} label="Your network" />
			{/* Local wiring: cloudflared to the service it reaches. */}
			<line
				x1={CX}
				y1={DAEMON.b}
				x2={CX}
				y2={RES.t}
				strokeWidth={1.25}
				className="stroke-neutral-300 dark:stroke-neutral-700"
			/>
			{/* The request pour, beneath the installed parts. */}
			{req && stage === 0 && !reduced && (
				<Pour
					key={`p-${req.n}`}
					d={inPour[req.kind]}
					dur={kind === "no-route" ? 0.35 : kind === "no-tunnel" ? 0.6 : 1.05}
				/>
			)}
			{req && kind === "no-route" && stage === 1 && !reduced && (
				<Sparks x={CX} y={USER.b + 12} />
			)}
			{req && kind === "no-tunnel" && stage === 1 && !reduced && (
				<Squash x={CX} y={CF_REGION.b - 6} />
			)}
			{req && delivering && stage >= 1 && !reduced && (
				<Pour
					key={`o-${req.n}`}
					d={`M ${CX} ${DAEMON.b} L ${CX} ${RES.t}`}
					dur={0.5}
				/>
			)}
			{/* Reduced motion: the same outcomes, held statically. */}
			{reduced && req && stage >= 1 && kind === "no-route" && (
				<rect
					x={CX - 5}
					y={USER.b + 10}
					width={10}
					height={3}
					rx={1}
					className="fill-brand"
				/>
			)}
			{reduced && req && stage >= 1 && kind === "no-tunnel" && (
				<rect
					x={CX - 5}
					y={CF_REGION.b - 9}
					width={10}
					height={3}
					rx={1}
					className="fill-brand"
				/>
			)}
			{reduced && delivering && stage >= 1 && (
				<g>
					<line
						x1={CX}
						y1={USER.b}
						x2={CX}
						y2={DAEMON.t}
						strokeWidth={1.5}
						strokeLinecap="round"
						className="stroke-brand"
					/>
					<line
						x1={CX}
						y1={DAEMON.b}
						x2={CX}
						y2={RES.t}
						strokeWidth={1.5}
						strokeLinecap="round"
						className="stroke-brand"
					/>
				</g>
			)}
			{/* The caller. */}
			<LabelCard
				rect={USER}
				label="User"
				fontSize={11}
				notches={{ bottom: true }}
				active={req !== null}
			/>
			{/* The route: absent until the hostname is connected. */}
			{route && (
				<g style={{ animation: weldEnter(reduced) }}>
					<line
						x1={CX}
						y1={USER.b}
						x2={CX}
						y2={HOST.t}
						strokeWidth={1.25}
						className="stroke-neutral-300 dark:stroke-neutral-700"
					/>
					<line
						x1={CX}
						y1={HOST.b}
						x2={CX}
						y2={CF_REGION.b}
						strokeWidth={1.25}
						className="stroke-neutral-300 dark:stroke-neutral-700"
					/>
					<LabelCard
						rect={HOST}
						label="app.example.com"
						fontSize={9}
						rx={HOST.h / 2 - 3}
						notches={{ top: true, bottom: true }}
					/>
				</g>
			)}
			{/* The tunnel: card, ports and conductors arrive together and
			    bridge the gap between the two networks. */}
			{tunnel !== "none" && (
				<g style={{ animation: weldEnter(reduced) }}>
					<line
						x1={CX}
						y1={CF_REGION.b}
						x2={CX}
						y2={CHIP.t - 5}
						strokeWidth={1.25}
						className="stroke-neutral-300 dark:stroke-neutral-700"
					/>
					<line
						x1={CX}
						y1={CHIP.b + 5}
						x2={CX}
						y2={DAEMON.t}
						strokeWidth={1.25}
						className="stroke-neutral-300 dark:stroke-neutral-700"
					/>
					<LabelCard
						rect={CHIP}
						label="Tunnel"
						fontSize={11}
						active={tunnel === "up"}
					/>
					<Port cx={CX} cy={CHIP.t} taken={tunnel === "up"} />
					<Port cx={CX} cy={CHIP.b} taken={tunnel === "up"} />
				</g>
			)}
			{/* Inside the network. */}
			<LabelCard
				rect={DAEMON}
				label="cloudflared"
				fontSize={11}
				notches={{ top: true, bottom: true }}
				active={delivering && stage >= 1}
			/>
			<LabelCard
				rect={RES}
				label="Web service"
				fontSize={11}
				notches={{ top: true }}
				active={delivering && (reduced ? stage >= 1 : stage >= 2)}
			/>
		</WeldCanvas>
	);
}

export default TunnelTraffic;
