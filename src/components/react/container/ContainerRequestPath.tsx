"use client";

// Container request path (Concepts page). A request never reaches a container
// directly: it arrives at a Worker, which forwards it through a Durable Object
// — the instance's stable identity (routing, lifecycle hooks, sleep timer).
// One DO per instance, so a given key always reaches the same instance.
// Interactive: "send request" per identity routes client → Worker → that DO →
// its container. Containers are ephemeral and drawn only once booted;
// re-sending to a warm identity reuses the same instance. The per-request
// sequence is a local event-driven state machine.
import { useEffect, useRef, useState } from "react";
import { Diagram, useDiagramOrDefault } from "@cloudflare/nimbus-docs/react";
import {
	Caption,
	Connector,
	LabelCard,
	SimpleCard,
	VMUnit,
	autoCardWidth,
	edgePoint,
	makeRect,
	vmDims,
} from "../diagram-weld";
import type { NodeRect } from "../diagram-weld";
import { WeldCanvas, weldEnter } from "./WeldCanvas";
import { Toolbar, ResetButton, LabeledButton } from "./Transport";
import type { DiagramFallbackProps } from "./DiagramFallback";

const DO_W = 200;
const COL_GAP = 40;
const WORKER_GAP = 38;
const VM_GAP = 20;
const REQUEST_MS = 650;
const ROUTE_MS = 600;
const BOOT_MS = 900;
const ACTIVE_MS = 1100;

const IDENTITIES = ["8X92", "8X97"] as const;
type Identity = (typeof IDENTITIES)[number];

type Phase = "idle" | "request" | "route" | "boot" | "active";

const FS = 11;
const MARGIN = 20;
const MOBILE_TOP_SCALE = 1.5;
const MOBILE_DO_SCALE = 1.3;
const MOBILE_DO_W = 230;
const MOBILE_VM_SCALE = 1.5;
const TOP_OFFSET = 10;
const BOTTOM_MARGIN = 32;

const DO_HEADER_H = 26;
const DO_BODY_H = 34;
const DO_NODE_H = DO_HEADER_H + DO_BODY_H;
const DO_BADGES = ["ROUTE", "HOOKS", "SLEEP"];

export function ContainerRequestPath(_props: DiagramFallbackProps) {
	return (
		<Diagram
			label="A request routing through a Worker and a Durable Object to one of several container instances"
			keyboard={false}
		>
			<RequestPathBody />
		</Diagram>
	);
}

function RequestPathBody() {
	const ctx = useDiagramOrDefault("ContainerRequestPath");
	const [target, setTarget] = useState<Identity | null>(null);
	const [phase, setPhase] = useState<Phase>("idle");
	const [booted, setBooted] = useState<Identity[]>([]);
	const [status, setStatus] = useState("");
	// Read `booted` inside the transition without re-arming timers on change.
	const bootedRef = useRef<Identity[]>(booted);
	bootedRef.current = booted;

	// Reduced motion collapses the boot/route timing so nothing animates in.
	const reduced = ctx.reducedMotion;

	useEffect(() => {
		if (target == null || !ctx.playing || !ctx.visible || !ctx.tabVisible)
			return;
		if (phase === "request") {
			const t = setTimeout(() => setPhase("route"), reduced ? 0 : REQUEST_MS);
			return () => clearTimeout(t);
		}
		if (phase === "route") {
			const t = setTimeout(
				() => {
					if (bootedRef.current.includes(target)) {
						setPhase("active");
					} else {
						setBooted((b) => (b.includes(target) ? b : [...b, target]));
						setPhase("boot");
					}
				},
				reduced ? 0 : ROUTE_MS,
			);
			return () => clearTimeout(t);
		}
		if (phase === "boot") {
			const t = setTimeout(() => setPhase("active"), reduced ? 0 : BOOT_MS);
			return () => clearTimeout(t);
		}
		if (phase === "active") {
			const t = setTimeout(
				() => {
					setPhase("idle");
					setTarget(null);
				},
				reduced ? 0 : ACTIVE_MS,
			);
			return () => clearTimeout(t);
		}
	}, [target, phase, reduced, ctx.playing, ctx.visible, ctx.tabVisible]);

	const sendRequest = (id: Identity) => {
		const isWarm = booted.includes(id);
		setStatus(
			isWarm
				? `Request routed to instance ${id} — already running.`
				: `Request routed to instance ${id} — cold start, booting.`,
		);
		setTarget(id);
		setPhase("request");
	};
	const handleReset = () => {
		setTarget(null);
		setPhase("idle");
		setBooted([]);
		setStatus("Reset — all container instances cleared.");
	};

	const workerW = autoCardWidth(["WORKER"], { fontSize: FS });
	const containerW = autoCardWidth(["CONTAINER"], { fontSize: FS });
	const { w: vmW, h: vmH } = vmDims(containerW);
	const { w: mobileVmW, h: mobileVmH } = vmDims(containerW, MOBILE_VM_SCALE);

	const colW = Math.max(DO_W, vmW);
	const VIEW_W = colW * 2 + COL_GAP + MARGIN * 2;
	const cx = VIEW_W / 2;
	const colX: Record<Identity, number> = {
		"8X92": MARGIN + colW / 2,
		"8X97": VIEW_W - MARGIN - colW / 2,
	};

	const stubTop = 16 + TOP_OFFSET;
	const workerTop = stubTop + 14;
	const workerH = 28;
	const worker = makeRect(cx - workerW / 2, workerTop, workerW, workerH);
	const mobileWorkerW = workerW * MOBILE_TOP_SCALE;
	const mobileWorkerH = workerH * MOBILE_TOP_SCALE;
	const mobileWorkerTop = 34 + TOP_OFFSET;
	const mobileWorker = makeRect(
		cx - mobileWorkerW / 2,
		mobileWorkerTop,
		mobileWorkerW,
		mobileWorkerH,
	);

	const doTop = mobileWorker.b + WORKER_GAP;
	const mobileDoH = DO_NODE_H * MOBILE_DO_SCALE;
	const vmTop = doTop + mobileDoH + VM_GAP;
	const VIEW_H = vmTop + mobileVmH + BOTTOM_MARGIN;

	const doRectOf = (id: Identity) =>
		makeRect(colX[id] - DO_W / 2, doTop, DO_W, DO_NODE_H);
	const mobileDoRectOf = (id: Identity) =>
		makeRect(colX[id] - MOBILE_DO_W / 2, doTop, MOBILE_DO_W, mobileDoH);
	const vmRectOf = (id: Identity) =>
		makeRect(colX[id] - vmW / 2, vmTop, vmW, vmH);
	const mobileVmRectOf = (id: Identity) =>
		makeRect(colX[id] - mobileVmW / 2, vmTop, mobileVmW, mobileVmH);

	const workerActive = phase !== "idle";
	const requestFiring = phase === "request";

	const identityButtons = IDENTITIES.map((id) => {
		const isTarget = target === id && phase !== "idle";
		const isWarm = booted.includes(id);
		return (
			<LabeledButton
				key={id}
				highlight={isTarget}
				ariaLabel={`Send a request to instance ${id} (${isWarm ? "already running" : "cold start"})`}
				onClick={() => sendRequest(id)}
			>
				<span
					aria-hidden="true"
					className={
						isWarm
							? "bg-brand inline-block h-2 w-2 rounded-full align-middle"
							: "inline-block h-2 w-2 rounded-full border border-neutral-400 bg-transparent align-middle dark:border-neutral-500"
					}
				/>
				{id}
			</LabeledButton>
		);
	});

	return (
		<WeldCanvas
			width={VIEW_W}
			height={VIEW_H}
			liveStatus={status}
			controls={
				<Toolbar
					status={
						<span className="block text-center text-[11px] leading-4 font-medium tracking-wide text-balance text-neutral-600 normal-case dark:text-neutral-300">
							Choose an instance to send a request
						</span>
					}
					className="grid grid-cols-1 items-center gap-2 px-2 py-2.5 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] [&>div]:col-start-1 [&>div]:row-start-2 [&>div]:ml-auto sm:[&>div]:col-start-3 sm:[&>div]:row-start-1 [&>span]:col-start-1 sm:[&>span]:col-start-2"
				>
					{identityButtons}
					<ResetButton onClick={handleReset} />
				</Toolbar>
			}
		>
			<g className="hidden sm:inline">
				<Caption
					x={cx}
					y={12 + TOP_OFFSET}
					anchor="middle"
					size={FS}
					tone="ghost"
					opacity={0.75}
				>
					Request
				</Caption>

				<Connector
					from={{ x: cx, y: stubTop }}
					to={edgePoint(worker, "top")}
					arrowhead
					active={requestFiring}
					ghost={!requestFiring}
				/>

				{IDENTITIES.map((id) => {
					const firing = target === id && phase === "route";
					return (
						<Connector
							key={`desktop-w2do-${id}`}
							from={edgePoint(worker, "bottom")}
							to={edgePoint(doRectOf(id), "top")}
							fromSide="bottom"
							toSide="top"
							arrowhead
							active={firing}
							ghost={!firing}
						/>
					);
				})}

				<LabelCard
					rect={worker}
					notches={{ top: true, bottom: true }}
					label="WORKER"
					active={workerActive}
					fontSize={FS}
				/>
			</g>

			<g className="sm:hidden">
				<Caption
					x={cx}
					y={16 + TOP_OFFSET}
					anchor="middle"
					size={FS * MOBILE_TOP_SCALE}
					tone="ghost"
					opacity={0.75}
				>
					Request
				</Caption>

				<Connector
					from={{ x: cx, y: 20 + TOP_OFFSET }}
					to={edgePoint(mobileWorker, "top")}
					arrowhead
					active={requestFiring}
					ghost={!requestFiring}
				/>

				{IDENTITIES.map((id) => {
					const firing = target === id && phase === "route";
					return (
						<Connector
							key={`mobile-w2do-${id}`}
							from={edgePoint(mobileWorker, "bottom")}
							to={edgePoint(mobileDoRectOf(id), "top")}
							fromSide="bottom"
							toSide="top"
							arrowhead
							active={firing}
							ghost={!firing}
						/>
					);
				})}

				<LabelCard
					rect={mobileWorker}
					notches={{ top: true, bottom: true }}
					label="WORKER"
					active={workerActive}
					fontSize={FS * MOBILE_TOP_SCALE}
				/>
			</g>

			<g className="hidden sm:inline">
				{IDENTITIES.map((id) => {
					const doActive =
						target === id &&
						(phase === "route" || phase === "boot" || phase === "active");
					return (
						<ControllerDO
							key={`desktop-do-${id}`}
							rect={doRectOf(id)}
							meta={id}
							active={doActive}
						/>
					);
				})}
			</g>

			<g className="sm:hidden">
				{IDENTITIES.map((id) => {
					const doActive =
						target === id &&
						(phase === "route" || phase === "boot" || phase === "active");
					return (
						<ControllerDO
							key={`mobile-do-${id}`}
							rect={mobileDoRectOf(id)}
							active={doActive}
							scale={MOBILE_DO_SCALE}
							badgeFontSize={12}
						/>
					);
				})}
			</g>

			{/* Instances are ephemeral: drawn only once booted; enter-only fade.
			    A Reset clearing `booted` unmounts them as a hard cut. */}
			{IDENTITIES.filter((id) => booted.includes(id)).map((id) => {
				const doRect = doRectOf(id);
				const mobileDoRect = mobileDoRectOf(id);
				const vm = vmRectOf(id);
				const mobileVm = mobileVmRectOf(id);
				const booting = target === id && phase === "boot";
				const containerActive = target === id && phase === "active";
				const edgeActive =
					target === id && (phase === "boot" || phase === "active");
				return (
					<g key={`inst-${id}`} style={{ animation: weldEnter(reduced, 280) }}>
						<g className="hidden sm:inline">
							<Connector
								from={edgePoint(doRect, "bottom")}
								to={edgePoint(vm, "top")}
								fromSide="bottom"
								toSide="top"
								arrowhead
								active={edgeActive}
								ghost={!edgeActive}
							/>
						</g>
						<g className="sm:hidden">
							<Connector
								from={edgePoint(mobileDoRect, "bottom")}
								to={edgePoint(mobileVm, "top")}
								fromSide="bottom"
								toSide="top"
								arrowhead
								active={edgeActive}
								ghost={!edgeActive}
							/>
						</g>
						<g className="hidden sm:inline">
							<VMUnit
								rect={vm}
								metaId={id}
								boundaryActive={booting}
								headerActive={containerActive || booting}
								containerActive={containerActive}
								fontSize={FS}
							/>
						</g>
						<g className="sm:hidden">
							<VMUnit
								rect={mobileVm}
								metaId={id}
								boundaryActive={booting}
								headerActive={containerActive || booting}
								containerActive={containerActive}
								fontSize={FS * MOBILE_VM_SCALE}
								scale={MOBILE_VM_SCALE}
							/>
						</g>
					</g>
				);
			})}
		</WeldCanvas>
	);
}

// Controller Durable Object — id in the header, ownership role badges below.
function ControllerDO({
	rect,
	meta,
	active,
	scale = 1,
	badgeFontSize = (FS - 3) * scale,
}: {
	rect: NodeRect;
	meta?: string;
	active: boolean;
	scale?: number;
	badgeFontSize?: number;
}) {
	const fontSize = FS * scale;
	const headerH = DO_HEADER_H * scale;
	const badgeH = 16 * scale;
	const badgeGap = 6 * scale;
	const badgePadX = 14 * scale;
	const badgeY = rect.t + headerH + 8 * scale;
	const badgeW =
		(rect.w - badgePadX * 2 - badgeGap * (DO_BADGES.length - 1)) /
		DO_BADGES.length;
	return (
		<SimpleCard
			rect={rect}
			notches={{ top: true, bottom: true }}
			label="DURABLE OBJECT"
			meta={meta}
			active={active}
			headerH={headerH}
			headerFontSize={fontSize}
			indicatorSize={6 * scale}
			pad={Math.max(5 * scale, (headerH - 6 * scale) / 2)}
		>
			{DO_BADGES.map((b, i) => {
				const bx = rect.l + badgePadX + i * (badgeW + badgeGap);
				return (
					<g key={b}>
						<rect
							x={bx}
							y={badgeY}
							width={badgeW}
							height={badgeH}
							rx={2}
							fill="none"
							stroke="currentColor"
							strokeWidth={1}
							className={
								active ? "text-brand" : "text-neutral-300 dark:text-neutral-700"
							}
						/>
						<text
							x={bx + badgeW / 2}
							y={badgeY + badgeH / 2 + badgeFontSize * 0.3}
							textAnchor="middle"
							className={
								active
									? "fill-neutral-700 dark:fill-neutral-200"
									: "fill-neutral-600 dark:fill-neutral-300"
							}
							style={{
								fontFamily: "var(--font-mono)",
								fontSize: badgeFontSize,
								letterSpacing: "0.1em",
							}}
						>
							{b}
						</text>
					</g>
				);
			})}
		</SimpleCard>
	);
}

export default ContainerRequestPath;
