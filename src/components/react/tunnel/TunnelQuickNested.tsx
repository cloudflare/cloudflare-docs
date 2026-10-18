"use client";

// Variant of the Quick tunnels figure using two nested zones instead of a
// three-band stack. Everything Cloudflare owns sits inside one "Cloudflare"
// boundary; inside that, a "your account" sub-box is the durable store. A named
// tunnel keeps its identity as a record in the account; a quick tunnel keeps the
// account empty and its address floats in the Cloudflare zone, held up only by
// the live connection down to cloudflared in "Your network". The Quick tunnel
// toggle empties the account, and Stop cloudflared shows the consequence: the
// named record survives in the account, the quick address does not.
import { useRef, useState } from "react";
import { Diagram, useDiagramOrDefault } from "@cloudflare/nimbus-docs/react";
import { LabelCard, WeldedCard, makeRect } from "../diagram-weld";
import { WeldCanvas, weldEnter } from "../container/WeldCanvas";
import { LabeledButton, Toolbar } from "../container/Transport";
import type { DiagramFallbackProps } from "../container/DiagramFallback";
import { NetBoundary, Port } from "./TunnelKit";

// Layout, in SVG user units. Two zones on the centre spine: Cloudflare (with a
// nested account) above, your network below.
const VIEW_W = 340;
const VIEW_H = 346;
const CX = 170; // centre spine
const CF = makeRect(24, 16, 292, 166); // "Cloudflare" zone
const ACCT = makeRect(50, 44, 240, 72); // "your account", nested inside CF
const IDN = makeRect(72, 62, 196, 38); // the identity record (named)
const ADDR = makeRect(46, 128, 248, 34); // quick address, floating in CF
const FIELD = makeRect(24, 218, 292, 108); // "Your network" zone
const DAEMON = makeRect(110, 258, 120, 42); // cloudflared connector

// The addresses a quick tunnel is handed across runs — a fixed, deterministic
// cycle (never Math.random) so SSR and client agree; only the change matters.
const ADDRESSES = [
	"blue-sky-1234",
	"quiet-frog-8842",
	"still-lake-0271",
	"brave-moon-5390",
	"warm-pine-6417",
].map((w) => `${w}.trycloudflare.com`);

const SPINE = [0.5]; // centre-edge notch fraction, shared by all cards

export function TunnelQuickNested(_props: DiagramFallbackProps) {
	return (
		<Diagram
			label="Everything Cloudflare owns sits in one Cloudflare zone; inside it, a your-account box is the durable store. A named tunnel keeps its identity as a record in the account, so stopping cloudflared leaves the record in place. A quick tunnel keeps the account empty — its trycloudflare.com address floats in the Cloudflare zone, held up only by the live connection to cloudflared in your network, so stopping cloudflared destroys it and the next run mints a different one. Operate it with the Quick tunnel toggle and the Run cloudflared control."
			keyboard={false}
		>
			<NestedBody />
		</Diagram>
	);
}

function NestedBody() {
	const ctx = useDiagramOrDefault("TunnelQuickNested");
	const reduced = ctx.reducedMotion;
	const [quick, setQuick] = useState(false);
	const [connected, setConnected] = useState(true);
	const [addrIndex, setAddrIndex] = useState(0);
	const [drawKey, setDrawKey] = useState(0);
	const address = ADDRESSES[addrIndex % ADDRESSES.length]!;

	const connectedRef = useRef(connected);
	connectedRef.current = connected;

	// Bringing the connection up: replay the wire draw, and in quick mode mint a
	// fresh address. Switching modes always comes up connected.
	function bringUp(nextQuick: boolean) {
		if (nextQuick) setAddrIndex((i) => i + 1);
		setConnected(true);
		setDrawKey((k) => k + 1);
	}

	function toggleMode() {
		const next = !quick;
		setQuick(next);
		bringUp(next);
	}

	function toggleConnection() {
		if (connectedRef.current) setConnected(false);
		else bringUp(quick);
	}

	// Where the connection meets what it serves: the account record (named) or
	// the floating address (quick).
	const anchorY = quick ? ADDR.b : IDN.b;

	const modeState = quick
		? connected
			? "Quick · live"
			: "Quick · no address"
		: connected
			? "Named · live"
			: "Named · idle (identity kept)";

	return (
		<WeldCanvas
			width={VIEW_W}
			height={VIEW_H}
			liveStatus={
				quick
					? connected
						? `Cloudflare minted ${address}. It floats in the Cloudflare zone, held up only by this connection — nothing is stored in your account.`
						: "cloudflared has stopped. The address was held only by the connection, so it is gone; the next run mints a different one."
					: connected
						? "Tunnel #123 is a record in your account, bound to app.example.com. cloudflared holds the connection."
						: "cloudflared has stopped, but Tunnel #123 and its route stay in your account. Reconnecting resolves the same hostname."
			}
			controls={
				<Toolbar status={modeState}>
					<LabeledButton
						ariaLabel={
							quick ? "Switch to a named tunnel" : "Switch to a quick tunnel"
						}
						onClick={toggleMode}
					>
						{quick ? "Named tunnel" : "Quick tunnel"}
					</LabeledButton>
					<LabeledButton
						ariaLabel={connected ? "Stop cloudflared" : "Run cloudflared"}
						onClick={toggleConnection}
						highlight={!connected}
					>
						{connected ? "Stop cloudflared" : "Run cloudflared"}
					</LabeledButton>
				</Toolbar>
			}
		>
			{/* Zone 1 — Cloudflare, holding the nested account. */}
			<NetBoundary rect={CF} label="Cloudflare" />
			<NetBoundary rect={ACCT} label="your account" />

			{/* Named: an identity record lives in the account and persists across a
			    stop. Quick: the account is empty. */}
			{quick ? (
				<text
					x={CX}
					y={ACCT.t + ACCT.h / 2 + 3}
					textAnchor="middle"
					className="fill-neutral-400 font-mono uppercase dark:fill-neutral-600"
					style={{ fontSize: 9, letterSpacing: "0.12em" }}
				>
					no record
				</text>
			) : (
				<g>
					<WeldedCard rect={IDN} active notches={{ bottom: SPINE }} />
					<text
						x={CX}
						y={IDN.t + 17}
						textAnchor="middle"
						className="fill-neutral-900 font-mono font-medium dark:fill-neutral-100"
						style={{ fontSize: 11 }}
					>
						Tunnel #123
					</text>
					<text
						x={CX}
						y={IDN.t + 31}
						textAnchor="middle"
						className="fill-neutral-500 font-mono dark:fill-neutral-400"
						style={{ fontSize: 9, letterSpacing: "0.04em" }}
					>
						app.example.com
					</text>
				</g>
			)}

			{/* Quick: the address floats in the Cloudflare zone, below the account,
			    only while connected. Re-mounting per run replays the mint. */}
			{quick && connected && (
				<g key={addrIndex} style={{ animation: weldEnter(reduced) }}>
					<LabelCard
						rect={ADDR}
						label={address}
						fontSize={9}
						active
						notches={{ bottom: SPINE }}
					/>
				</g>
			)}

			{/* Zone 2 — your network, holding cloudflared. Drawn before the
			    connection so the zone's fill does not paint over the wire. */}
			<NetBoundary
				rect={FIELD}
				label={quick ? "Your machine" : "Your network"}
			/>
			<LabelCard
				rect={DAEMON}
				label="cloudflared"
				fontSize={11}
				active={connected}
				notches={{ top: SPINE }}
			/>

			{/* The tunnel connection: cloudflared up to what it serves, only while
			    connected. Drawn on top of both zones so it stays visible across
			    their boundaries; the ports cap it. A brand pulse draws along it as
			    it comes up, then the neutral conductor remains. */}
			{connected && (
				<>
					<line
						x1={CX}
						y1={anchorY}
						x2={CX}
						y2={DAEMON.t}
						strokeWidth={1.25}
						className="stroke-neutral-300 dark:stroke-neutral-700"
					/>
					{!reduced && (
						<path
							key={drawKey}
							d={`M ${CX} ${anchorY} L ${CX} ${DAEMON.t}`}
							fill="none"
							strokeWidth={1.5}
							pathLength={1}
							strokeDasharray="1"
							strokeDashoffset={1}
							className="stroke-brand"
							style={{
								animation:
									"weld-draw 0.5s cubic-bezier(0.45,0,0.55,1) forwards, weld-pour-fade 1.1s linear forwards",
							}}
						/>
					)}
				</>
			)}

			{/* Ports at both ends of the connection, seated only while live. The
			    top port only exists when a node is there to seat it: the account
			    record (named) or, in quick mode, the address that appears only
			    while connected — so a stopped quick tunnel leaves no orphan socket. */}
			{(!quick || connected) && <Port cx={CX} cy={anchorY} taken={connected} />}
			<Port cx={CX} cy={DAEMON.t} taken={connected} />
		</WeldCanvas>
	);
}

export default TunnelQuickNested;
