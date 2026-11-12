"use client";

// Direction figure on the Connector selection page. One vertical path runs
// from a laptop, through Cloudflare and a connector, to a private server.
// Switch the connector between Cloudflare Tunnel and Cloudflare Mesh, then
// start a connection from either end. A laptop-started connection works with
// both. A server-started connection works with Mesh, and fails with Tunnel,
// which only carries connections that clients start.
import { useEffect, useState } from "react";
import { Diagram, useDiagramOrDefault } from "@cloudflare/nimbus-docs/react";
import { Tabs } from "@/components/react/diagram";
import {
	Caption,
	Connector,
	LabelCard,
	edgePoint,
	makeRect,
} from "../diagram-weld";
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

const LABEL =
	"A laptop, Cloudflare, a connector, and a private server on one vertical path. Switch the connector between Cloudflare Tunnel and Cloudflare Mesh, then start a connection from the laptop or from the server. Connections from the laptop work with both. Connections from the server work only with Mesh.";

const CONTROLS_CSS = `
.cd-controls { display: flex; flex-direction: column; gap: 0.5rem; padding: 0.5rem; }
.cd-actions { display: flex; flex-wrap: wrap; gap: 0.375rem; }
@media (min-width: 640px) {
  .cd-controls { flex-direction: row; align-items: center; justify-content: space-between; }
  .cd-actions { justify-content: flex-end; }
}
`;

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

const MODES: { id: Mode; label: string }[] = [
	{ id: "tunnel", label: "Tunnel" },
	{ id: "mesh", label: "Mesh" },
];

interface Run {
	id: number;
	origin: Origin;
	hops: Hop[];
	blocked: boolean;
}

function plan(mode: Mode, origin: Origin, id: number): Run {
	if (origin === "laptop") {
		return { id, origin, hops: [...DOWN, ...UP], blocked: false };
	}
	if (mode === "mesh") {
		return { id, origin, hops: [...UP, ...DOWN], blocked: false };
	}
	// Tunnel: cloudflared only proxies connections that arrive from Cloudflare.
	// The server's packet reaches cloudflared and goes no further.
	return { id, origin, hops: [[3, 2]], blocked: true };
}

function describe(mode: Mode, run: Run | null, running: boolean): string {
	if (!run) {
		if (mode === "tunnel") return "Tunnel: outbound-only connector";
		return "Mesh: every participant has a Mesh IP";
	}
	if (running) {
		if (run.origin === "laptop") return "Laptop starts a connection";
		return "Server starts a connection";
	}
	if (run.blocked) return "Failed: Tunnel only carries client connections";
	if (run.origin === "laptop") return "Round trip complete";
	return "Server reached the laptop, and the laptop replied";
}

function hopPoints([a, b]: Hop) {
	const down = a < b;
	const from = edgePoint(NODES[a], down ? "bottom" : "top");
	const to = edgePoint(NODES[b], down ? "top" : "bottom");
	return { from, to };
}

function segment(hop: Hop) {
	const { from, to } = hopPoints(hop);
	return `M ${from.x} ${from.y} L ${to.x} ${to.y}`;
}

export default function ConnectorDirection(_props: DiagramFallbackProps) {
	return (
		<Diagram label={LABEL} keyboard={false}>
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

	function start(origin: Origin) {
		const id = seq + 1;
		setSeq(id);
		setStep(0);
		setRun(plan(mode, origin, id));
	}

	function switchMode(next: Mode) {
		setMode(next);
		setRun(null);
		setStep(0);
	}

	const hop = run && !done ? run.hops[step] : null;
	const points = hop ? hopPoints(hop) : null;
	const path = hop ? segment(hop) : null;
	const status = describe(mode, run, running);
	const visible = run ? run.hops.slice(0, step + 1) : [];
	const touched = (i: number) => visible.some(([a, b]) => a === i || b === i);
	const ok = done && run !== null && !run.blocked;
	const failed = done && run !== null && run.blocked;
	const meshMode = mode === "mesh";
	const target = run?.origin === "laptop" ? SERVER : LAPTOP;

	return (
		<WeldCanvas
			width={VIEW_W}
			height={VIEW_H}
			liveStatus={status}
			controls={
				<div className="cd-controls">
					<style>{CONTROLS_CSS}</style>
					<Tabs<Mode>
						ariaLabel="Connector"
						options={MODES}
						active={mode}
						onChange={switchMode}
						disabled={running}
					/>
					<div className="cd-actions">
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
			<Connector
				from={edgePoint(LAPTOP, "bottom")}
				to={edgePoint(CLOUDFLARE, "top")}
				straight
				active={ok}
				ghost={!ok}
			/>
			<Connector
				from={edgePoint(CLOUDFLARE, "bottom")}
				to={edgePoint(CONNECTOR, "top")}
				straight
				active={ok}
				ghost={!ok}
			/>
			<Connector
				from={edgePoint(CONNECTOR, "bottom")}
				to={edgePoint(SERVER, "top")}
				straight
				active={ok}
				ghost={!ok}
			/>
			{points && (
				<Connector from={points.from} to={points.to} straight active />
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
			<LabelCard
				rect={SERVER}
				label="Server · 10.0.0.50"
				active={touched(3)}
				fontSize={10}
			/>

			<Caption x={CAPTION_X} y={81}>
				{meshMode ? "Reachable by Mesh IP" : "Not reachable from servers"}
			</Caption>
			<Caption x={CAPTION_X} y={167}>
				{meshMode ? "Bidirectional · L3" : "Outbound-only · L7"}
			</Caption>
			<Caption x={CAPTION_X} y={254}>
				{meshMode ? "Source IP preserved" : "Proxies inbound requests"}
			</Caption>

			{failed && <FailureMark x={CX} y={CONNECTOR.t - 16} />}
			{ok && <SuccessMark x={target.r + 14} y={target.cy} />}
			{path && !reduced && run && (
				<PacketPulse key={`${run.id}-${step}`} path={path} ms={BEAT_MS} />
			)}
		</WeldCanvas>
	);
}

function FailureMark({ x, y }: { x: number; y: number }) {
	const d = `M ${x - 3} ${y - 3} L ${x + 3} ${y + 3} M ${x + 3} ${y - 3} L ${x - 3} ${y + 3}`;
	return (
		<g className="text-red-500">
			<circle cx={x} cy={y} r={8} fill="currentColor" opacity={0.12} />
			<path
				d={d}
				stroke="currentColor"
				strokeWidth={1.5}
				strokeLinecap="round"
			/>
		</g>
	);
}

function SuccessMark({ x, y }: { x: number; y: number }) {
	const d = `M ${x - 3.5} ${y} L ${x - 1} ${y + 2.5} L ${x + 3.5} ${y - 2.5}`;
	return (
		<g className="text-emerald-500">
			<circle cx={x} cy={y} r={8} fill="currentColor" opacity={0.14} />
			<path
				d={d}
				fill="none"
				stroke="currentColor"
				strokeWidth={1.5}
				strokeLinecap="round"
				strokeLinejoin="round"
			/>
		</g>
	);
}
