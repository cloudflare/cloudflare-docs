"use client";

// "Applications or networks" figure on the Choose a connector page. One
// vertical path from a laptop, through Cloudflare and a connector, to a
// private server. Switch the connector between Cloudflare Tunnel and
// Cloudflare Mesh, then start a connection from either end. A laptop-started
// connection works with both. A server-started connection works with Mesh,
// and is refused with Tunnel, which only carries connections clients start.
import { useEffect, useState } from "react";
import { Diagram, useDiagramOrDefault } from "@cloudflare/nimbus-docs/react";
import { Tabs } from "@/components/react/diagram";
import { Caption, Connector, LabelCard, edgePoint, makeRect } from "../diagram-weld";
import { WeldCanvas } from "../container/WeldCanvas";
import { LabeledButton } from "../container/Transport";
import type { DiagramFallbackProps } from "../container/DiagramFallback";
import { PacketPulse } from "../mesh/PacketPulse";

const VIEW_W = 340;
const VIEW_H = 330;
const CX = VIEW_W / 2;
const LAPTOP = makeRect(90, 14, 160, 40);
const CLOUDFLARE = makeRect(100, 100, 140, 40);
const CONNECTOR = makeRect(100, 186, 140, 40);
const SERVER = makeRect(90, 274, 160, 40);
const NODES = [LAPTOP, CLOUDFLARE, CONNECTOR, SERVER];
const BEAT_MS = 620;
const CAPTION_X = CX + 10;

type Mode = "tunnel" | "mesh";
type Origin = "laptop" | "server";

// Each hop is [from index, to index] in NODES.
type Hop = [number, number];
const DOWN: Hop[] = [
	[0, 1],
	[1, 2],
	[2, 3],
];
const UP: Hop[] = [
	[3, 2],
	[2, 1],
	[1, 0],
];

interface Run {
	id: number;
	origin: Origin;
	hops: Hop[];
	blocked: boolean;
}

function plan(mode: Mode, origin: Origin, id: number): Run {
	if (origin === "laptop") return { id, origin, hops: [...DOWN, ...UP], blocked: false };
	if (mode === "mesh") return { id, origin, hops: [...UP, ...DOWN], blocked: false };
	// Tunnel: cloudflared only proxies connections that arrive from Cloudflare.
	// The server's packet reaches cloudflared and goes no further.
	return { id, origin, hops: [[3, 2]], blocked: true };
}

export default function ConnectorDirection(_props: DiagramFallbackProps) {
	return (
		<Diagram
			label="A laptop, Cloudflare, a connector, and a private server in one vertical path. Switch the connector between Cloudflare Tunnel and Cloudflare Mesh, then start a connection from the laptop or from the server. Laptop-started connections work with both. Server-started connections work only with Mesh."
			keyboard={false}
		>
			<DirectionBody />
		</Diagram>
	);
}

function DirectionBody() {
	const ctx = useDiagramOrDefault("ConnectorDirection");
	const reduced = ctx.reducedMotion;
	const [mode, setMode] = useState<Mode>("tunnel");
	const [run, setRun] = useState<Run | null>(null);
	const [step, setStep] = useState(0);
	const [seq, setSeq] = useState(0);

	const done = run !== null && step >= run.hops.length;
	const running = run !== null && !done;

	useEffect(() => {
		if (!run || done) return;
		if (reduced) {
			setStep(run.hops.length);
			return;
		}
		const t = setTimeout(() => setStep((s) => s + 1), BEAT_MS);
		return () => clearTimeout(t);
	}, [run, step, done, reduced]);

	const start = (origin: Origin) => {
		const id = seq + 1;
		setSeq(id);
		setStep(0);
		setRun(plan(mode, origin, id));
	};

	const switchMode = (m: Mode) => {
		setMode(m);
		setRun(null);
		setStep(0);
	};

	const hop = run && !done ? run.hops[step] : null;
	const path = hop ? segment(hop) : null;

	const status = !run
		? mode === "tunnel"
			? "Tunnel: outbound-only connector"
			: "Mesh: every participant has a Mesh IP"
		: running
			? run.origin === "laptop"
				? "Laptop starts a connection"
				: "Server starts a connection"
			: run.blocked
				? "Refused: Tunnel only carries client-started connections"
				: run.origin === "laptop"
					? "Round trip complete"
					: "Server reached the laptop, and the laptop replied";

	const touched = (i: number) =>
		run !== null &&
		run.hops.slice(0, done ? run.hops.length : step + 1).some(([a, b]) => a === i || b === i);

	const ok = done && run && !run.blocked;
	const meshMode = mode === "mesh";

	return (
		<WeldCanvas
			width={VIEW_W}
			height={VIEW_H}
			liveStatus={status}
			controls={
				<div className="flex flex-col gap-2 p-2 sm:flex-row sm:items-center sm:justify-between">
					<Tabs<Mode>
						ariaLabel="Connector"
						options={[
							{ id: "tunnel", label: "Tunnel" },
							{ id: "mesh", label: "Mesh" },
						]}
						active={mode}
						onChange={switchMode}
						disabled={running}
					/>
					<div className="flex flex-wrap gap-1.5 sm:justify-end">
						<LabeledButton
							ariaLabel="Start a connection from the laptop to the server"
							onClick={() => start("laptop")}
							disabled={running}
							highlight
						>
							Laptop → server
						</LabeledButton>
						<LabeledButton
							ariaLabel="Start a connection from the server to the laptop"
							onClick={() => start("server")}
							disabled={running}
							highlight
						>
							Server → laptop
						</LabeledButton>
					</div>
				</div>
			}
		>
			<Connector from={edgePoint(LAPTOP, "bottom")} to={edgePoint(CLOUDFLARE, "top")} straight active={Boolean(ok)} ghost={!ok} />
			<Connector from={edgePoint(CLOUDFLARE, "bottom")} to={edgePoint(CONNECTOR, "top")} straight active={Boolean(ok)} ghost={!ok} />
			<Connector from={edgePoint(CONNECTOR, "bottom")} to={edgePoint(SERVER, "top")} straight active={Boolean(ok)} ghost={!ok} />
			{hop && (
				<Connector
					from={edgePoint(NODES[hop[0]], hop[0] < hop[1] ? "bottom" : "top")}
					to={edgePoint(NODES[hop[1]], hop[0] < hop[1] ? "top" : "bottom")}
					straight
					active
				/>
			)}

			<LabelCard
				rect={LAPTOP}
				label={meshMode ? "Laptop · 100.96.0.12" : "Laptop"}
				active={touched(0)}
				fontSize={10}
			/>
			<LabelCard rect={CLOUDFLARE} label="Cloudflare" active fontSize={10} />
			<LabelCard
				rect={CONNECTOR}
				label={meshMode ? "Mesh node" : "cloudflared"}
				active={touched(2)}
				fontSize={10}
			/>
			<LabelCard rect={SERVER} label="Server · 10.0.0.50" active={touched(3)} fontSize={10} />

			<Caption x={CAPTION_X} y={81}>
				{meshMode ? "Reachable by Mesh IP" : "Not reachable from servers"}
			</Caption>
			<Caption x={CAPTION_X} y={167}>
				{meshMode ? "Bidirectional · L3" : "Outbound-only · L7"}
			</Caption>
			<Caption x={CAPTION_X} y={254}>
				{meshMode ? "Source IP preserved" : "Proxies inbound requests"}
			</Caption>

			{done && run?.blocked && <FailureMark x={CX} y={CONNECTOR.t - 16} />}
			{done && ok && <SuccessMark x={run?.origin === "laptop" ? SERVER.r + 14 : LAPTOP.r + 14} y={run?.origin === "laptop" ? SERVER.cy : LAPTOP.cy} />}
			{path && !reduced && run && (
				<PacketPulse key={`${run.id}-${step}`} path={path} ms={BEAT_MS} />
			)}
		</WeldCanvas>
	);
}

function segment([a, b]: Hop) {
	const down = a < b;
	const p = edgePoint(NODES[a], down ? "bottom" : "top");
	const q = edgePoint(NODES[b], down ? "top" : "bottom");
	return `M ${p.x} ${p.y} L ${q.x} ${q.y}`;
}

function FailureMark({ x, y }: { x: number; y: number }) {
	return (
		<g className="text-red-500">
			<circle cx={x} cy={y} r={8} fill="currentColor" opacity={0.12} />
			<path
				d={`M ${x - 3} ${y - 3} L ${x + 3} ${y + 3} M ${x + 3} ${y - 3} L ${x - 3} ${y + 3}`}
				stroke="currentColor"
				strokeWidth={1.5}
				strokeLinecap="round"
			/>
		</g>
	);
}

function SuccessMark({ x, y }: { x: number; y: number }) {
	return (
		<g className="text-emerald-500">
			<circle cx={x} cy={y} r={8} fill="currentColor" opacity={0.14} />
			<path
				d={`M ${x - 3.5} ${y} L ${x - 1} ${y + 2.5} L ${x + 3.5} ${y - 2.5}`}
				fill="none"
				stroke="currentColor"
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</g>
	);
}
