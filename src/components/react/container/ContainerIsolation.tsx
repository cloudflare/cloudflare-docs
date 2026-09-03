"use client";

import { useEffect } from "react";
// Container isolation (Concepts page, diagram 1). A Cloudflare Container runs
// your image inside its own VM, started on demand and reached through a
// Worker: idle → request → boot → active. Autoplays once, then rests.
import {
	Diagram,
	useDiagramOrDefault,
	usePhase,
} from "@cloudflare/nimbus-docs/react";
import {
	Caption,
	Connector,
	LabelCard,
	VMUnit,
	autoCardWidth,
	edgePoint,
	makeRect,
	vmDims,
} from "../diagram-weld";
import { WeldCanvas, weldEnter } from "./WeldCanvas";
import { Toolbar, PlayPauseButton, ResetButton } from "./Transport";
import type { DiagramFallbackProps } from "./DiagramFallback";

const WORKER_FS = 11;
const WORKER_H = 28;
const STUB_LEN = 18;
const CONTAINER_FS = 11;
const WORKER_GAP = 30;

const IDLE_MS = 900;
const REQUEST_MS = 800;
const BOOT_MS = 1100;
const ACTIVE_MS = 1500;

type Phase = "idle" | "request" | "boot" | "active";
const ORDER: Phase[] = ["idle", "request", "boot", "active"];
const isPhase = (v: unknown): v is Phase => ORDER.some((p) => p === v);
const STEP_MS: Record<Phase, number> = {
	idle: IDLE_MS,
	request: REQUEST_MS,
	boot: BOOT_MS,
	active: ACTIVE_MS,
};

// Reduced-motion rest frame: the fully-booted state is the most informative.
const REST_PHASE: Phase = "active";

const MARGIN_X = 20;
const REQUEST_LABEL_Y = 12;
const STUB_TOP_Y = 16;

export function ContainerIsolation(_props: DiagramFallbackProps) {
	return (
		<Diagram label="A container booting on demand inside its own VM, fronted by a Worker">
			<IsolationBody />
		</Diagram>
	);
}

function IsolationBody() {
	const ctx = useDiagramOrDefault("ContainerIsolation");
	const walker = usePhase({
		steps: ORDER.map((id) => ({ id, hold: STEP_MS[id] })),
		loop: false,
		autoplay: false,
	});
	// Nimbus memoizes `start`, so this runs once for the mounted walker.
	useEffect(() => {
		walker.start();
	}, [walker.start]);

	const togglePlayback = () => {
		if (!walker.running) {
			walker.start();
			if (!ctx.playing) ctx.toggle();
			return;
		}
		ctx.toggle();
	};

	const phase: Phase = ctx.reducedMotion
		? REST_PHASE
		: isPhase(walker.current)
			? walker.current
			: "idle";
	const idx = ORDER.indexOf(phase);

	const workerActive = idx >= ORDER.indexOf("request");
	const requestFiring = phase === "request";
	const hasInstance = idx >= ORDER.indexOf("boot");
	const forwardFiring = phase === "boot";
	const containerActive = phase === "active";

	const containerW = autoCardWidth(["CONTAINER"], { fontSize: CONTAINER_FS });
	const workerW = autoCardWidth(["WORKER"], { fontSize: WORKER_FS });
	const { w: vmW, h: vmH } = vmDims(containerW);

	const VIEW_W = Math.max(vmW, workerW) + MARGIN_X * 2;
	const cx = VIEW_W / 2;
	const workerTop = STUB_TOP_Y + STUB_LEN;
	const worker = makeRect(cx - workerW / 2, workerTop, workerW, WORKER_H);
	const vm = makeRect(cx - vmW / 2, worker.b + WORKER_GAP, vmW, vmH);
	const VIEW_H = vm.b + 18;

	return (
		<WeldCanvas
			width={VIEW_W}
			height={VIEW_H}
			controls={
				<Toolbar>
					<PlayPauseButton
						playing={ctx.playing && walker.running}
						onClick={togglePlayback}
					/>
					<ResetButton onClick={ctx.reset} />
				</Toolbar>
			}
		>
			<Caption
				x={cx}
				y={REQUEST_LABEL_Y}
				anchor="middle"
				size={WORKER_FS}
				tone="ghost"
				opacity={0.5}
			>
				Request
			</Caption>

			<Connector
				from={{ x: cx, y: STUB_TOP_Y }}
				to={edgePoint(worker, "top")}
				arrowhead
				active={requestFiring}
				ghost={!requestFiring}
			/>

			<LabelCard
				rect={worker}
				notches={{ top: true, bottom: true }}
				label="WORKER"
				active={workerActive}
				fontSize={WORKER_FS}
			/>

			{hasInstance && (
				<g style={{ animation: weldEnter(ctx.reducedMotion, 280) }}>
					<VMUnit
						rect={vm}
						metaId="8X92"
						headerActive={containerActive}
						containerActive={containerActive}
						fontSize={CONTAINER_FS}
					/>
					<Connector
						from={edgePoint(worker, "bottom")}
						to={edgePoint(vm, "top")}
						fromSide="bottom"
						toSide="top"
						arrowhead
						active={forwardFiring}
					/>
				</g>
			)}
		</WeldCanvas>
	);
}

export default ContainerIsolation;
