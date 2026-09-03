"use client";

// Container placement & routing (Concepts page). Instances run across
// Cloudflare's network and requests are routed to an available instance.
// Three locations are shown with a request control for each one.
import { useEffect, useRef, useState } from "react";
import { Diagram, useDiagramOrDefault } from "@cloudflare/nimbus-docs/react";
import {
	Connector,
	LabelCard,
	SimpleCard,
	WeldedCard,
	ComputeGlyph,
	COMPUTE_GLYPH_W,
	COMPUTE_GLYPH_H,
	convergenceDocks,
	autoLabelRect,
	dockPoint,
	edgePoint,
	makeRect,
	uniformCardWidth,
	EASE_OUT,
	MOTION,
} from "../diagram-weld";
import { RENDER_SCALE, WeldCanvas } from "./WeldCanvas";
import { Toolbar, ResetButton } from "./Transport";
import type { DiagramFallbackProps } from "./DiagramFallback";

const REGION_H = 32;
const REGION_PAD_X = 12;
const REGION_FONT_SIZE = 11;

const INSTANCE_W = 124;
const INSTANCE_H = 88;
const INSTANCE_HEADER_H = 28;
const INSTANCE_HEADER_FS = 11;
const DESKTOP_GLYPH_SCALE = 1;
const MOBILE_GLYPH_SCALE = 1.35;
const REFERENCE_VIEW_W = 340;
const REFERENCE_HEADER_FS = 11;

const DESKTOP_REGION_GAP = 24;
const MOBILE_REGION_GAP = 32;
const ROW_GAP_TOP = 54;
const MOBILE_REGION_W_DELTA = 8;
const MOBILE_INSTANCE_W_DELTA = 10;
const ROW_GAP_BOTTOM = 64;

const SCHEDULER_H = 32;
const SCHEDULER_PAD_X = 12;

const MAX_INSTANCES = 4;
const CONCURRENCY = 1;
const PROCESS_MS = 900;
const TILE_OFFSET = 5;
const IDLE_MS = 2600;
const DECAY_MS = 700;
const DECK_REACH = (MAX_INSTANCES - 1) * TILE_OFFSET;

const REGIONS = ["us", "eu", "apac"] as const;
type RegionId = (typeof REGIONS)[number];
const REGION_LABELS: Record<RegionId, string> = {
	us: "Location A",
	eu: "Location B",
	apac: "Location C",
};

const MIN_VIEW_W = 360;
const SIDE_MARGIN = 16;
const TOP = 18;
const BOTTOM_MARGIN = 20;
const REGION_DOCK_FRAC = 0.5;
const PULSE_MS = 650;

const ones = (): Record<RegionId, number> => ({ us: 1, eu: 1, apac: 1 });
const zeros = (): Record<RegionId, number> => ({ us: 0, eu: 0, apac: 0 });
const falses = (): Record<RegionId, boolean> => ({
	us: false,
	eu: false,
	apac: false,
});

// Container + spiral compute glyph, matching the Workers `worker` card.
function InstanceCard({
	rect,
	active,
	playing,
	reduced,
	headerH,
	headerFS,
}: {
	rect: ReturnType<typeof makeRect>;
	active: boolean;
	playing: boolean;
	reduced: boolean;
	headerH: number;
	headerFS: number;
}) {
	const bodyTop = rect.t + headerH;
	const bodyAvail = rect.h - headerH;
	const glyphTransform = (scale: number) => {
		const glyphW = COMPUTE_GLYPH_W * scale;
		const glyphH = COMPUTE_GLYPH_H * scale;
		const gx = rect.cx - glyphW / 2;
		const gy = bodyTop + (bodyAvail - glyphH) / 2;
		return `translate(${gx} ${gy}) scale(${scale})`;
	};
	return (
		<SimpleCard
			rect={rect}
			notches={{ top: true, bottom: true }}
			label="Container"
			active={active}
			headerH={headerH}
			headerFontSize={headerFS}
			pad={Math.max(2, (headerH - 6) / 2)}
		>
			<g
				style={{
					color: active ? "var(--color-brand)" : "currentColor",
					transition: `color ${MOTION.transition}ms ${EASE_OUT}`,
				}}
				className={active ? "" : "text-neutral-500 dark:text-neutral-500"}
			>
				<g
					className="hidden min-[480px]:inline"
					transform={glyphTransform(DESKTOP_GLYPH_SCALE)}
				>
					<ComputeGlyph
						x={0}
						y={0}
						active={active}
						reduced={reduced}
						playing={playing}
					/>
				</g>
				<g
					className="min-[480px]:hidden"
					transform={glyphTransform(MOBILE_GLYPH_SCALE)}
				>
					<ComputeGlyph
						x={0}
						y={0}
						active={active}
						reduced={reduced}
						playing={playing}
					/>
				</g>
			</g>
		</SimpleCard>
	);
}

export function ContainerPlacement(_props: DiagramFallbackProps) {
	return (
		<Diagram
			label="Container instances in different locations, with requests routed to an available instance and a scheduler adding capacity during bursts"
			keyboard={false}
		>
			<PlacementBody />
		</Diagram>
	);
}

function PlacementBody() {
	const ctx = useDiagramOrDefault("ContainerPlacement");
	const reduced = ctx.reducedMotion;
	const glyphPlaying = ctx.playing && ctx.visible && ctx.tabVisible;

	const [load, setLoad] = useState<Record<RegionId, number>>(ones);
	const [pulse, setPulse] = useState<Record<RegionId, boolean>>(falses);
	const [scaleFlash, setScaleFlash] =
		useState<Record<RegionId, boolean>>(falses);
	const [status, setStatus] = useState("");
	const [instanceHeaderFS, setInstanceHeaderFS] = useState(INSTANCE_HEADER_FS);
	const [widenMobileNodes, setWidenMobileNodes] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);
	const countRef = useRef<Record<RegionId, number>>(ones());
	const inflightRef = useRef<Record<RegionId, number>>(zeros());

	const pulseTimers = useRef<
		Partial<Record<RegionId, ReturnType<typeof setTimeout>>>
	>({});
	const scaleTimers = useRef<
		Partial<Record<RegionId, ReturnType<typeof setTimeout>>>
	>({});
	const sleepTimers = useRef<
		Partial<Record<RegionId, ReturnType<typeof setTimeout>>>
	>({});
	const releaseTimers = useRef<ReturnType<typeof setTimeout>[]>([]);

	const regionAt = (i: number): RegionId => REGIONS[i] ?? REGIONS[0];
	const setCount = (id: RegionId, count: number) => {
		countRef.current = { ...countRef.current, [id]: count };
		setLoad((current) => ({ ...current, [id]: count }));
	};

	const scheduleSleep = (id: RegionId) => {
		if (sleepTimers.current[id]) clearTimeout(sleepTimers.current[id]);
		const step = () => {
			const count = countRef.current[id];
			if (count <= 1) return;
			setCount(id, count - 1);
			if (count - 1 > 1) {
				sleepTimers.current[id] = setTimeout(step, DECAY_MS);
			}
		};
		sleepTimers.current[id] = setTimeout(step, IDLE_MS);
	};

	const sendRequest = (i: number) => {
		const id = regionAt(i);

		setPulse((p) => ({ ...p, [id]: true }));
		if (pulseTimers.current[id]) clearTimeout(pulseTimers.current[id]);
		pulseTimers.current[id] = setTimeout(() => {
			setPulse((p) => ({ ...p, [id]: false }));
		}, PULSE_MS);

		const inflight = inflightRef.current[id] + 1;
		inflightRef.current[id] = inflight;
		const release = setTimeout(() => {
			inflightRef.current[id] = Math.max(0, inflightRef.current[id] - 1);
			releaseTimers.current = releaseTimers.current.filter(
				(timer) => timer !== release,
			);
		}, PROCESS_MS);
		releaseTimers.current.push(release);

		const count = countRef.current[id];
		if (inflight > count * CONCURRENCY && count < MAX_INSTANCES) {
			const next = count + 1;
			setCount(id, next);
			setScaleFlash((current) => ({ ...current, [id]: true }));
			if (scaleTimers.current[id]) clearTimeout(scaleTimers.current[id]);
			scaleTimers.current[id] = setTimeout(() => {
				setScaleFlash((current) => ({ ...current, [id]: false }));
			}, PULSE_MS);
			setStatus(`${REGION_LABELS[id]} scaled out to ${next} instances.`);
		} else {
			setStatus(
				`${REGION_LABELS[id]} handled a request on ${count} instance${count === 1 ? "" : "s"}.`,
			);
		}

		scheduleSleep(id);
	};

	const clearAllTimers = () => {
		for (const timers of [pulseTimers, scaleTimers, sleepTimers]) {
			Object.values(timers.current).forEach((timer) => {
				if (timer) clearTimeout(timer);
			});
			timers.current = {};
		}
		releaseTimers.current.forEach(clearTimeout);
		releaseTimers.current = [];
	};

	const handleReset = () => {
		clearAllTimers();
		countRef.current = ones();
		inflightRef.current = zeros();
		setLoad(ones());
		setPulse(falses());
		setScaleFlash(falses());
		setStatus("Reset — one instance per location.");
	};

	useEffect(() => clearAllTimers, []);

	const regionW = uniformCardWidth(
		REGIONS.map((r) => `+ ${REGION_LABELS[r]}`),
		{ padX: REGION_PAD_X, fontSize: REGION_FONT_SIZE },
	);
	const viewRegionRowW = regionW * 3 + DESKTOP_REGION_GAP * 2;
	const VIEW_W = Math.max(
		MIN_VIEW_W,
		viewRegionRowW + (SIDE_MARGIN + DECK_REACH) * 2,
	);
	const regionGap = widenMobileNodes ? MOBILE_REGION_GAP : DESKTOP_REGION_GAP;
	const regionRowW = regionW * 3 + regionGap * 2;
	const regionStartX = (VIEW_W - regionRowW) / 2;
	const regionRects = REGIONS.map((_, i) =>
		makeRect(regionStartX + i * (regionW + regionGap), TOP, regionW, REGION_H),
	);

	const instTop = TOP + REGION_H + ROW_GAP_TOP;
	const instRects = regionRects.map((r) =>
		makeRect(r.cx - INSTANCE_W / 2, instTop, INSTANCE_W, INSTANCE_H),
	);
	const visibleRegionRects = regionRects.map((rect) =>
		widenMobileNodes
			? makeRect(
					rect.l - MOBILE_REGION_W_DELTA / 2,
					rect.t,
					rect.w + MOBILE_REGION_W_DELTA,
					rect.h,
				)
			: rect,
	);
	const visibleInstRects = instRects.map((rect) =>
		widenMobileNodes
			? makeRect(
					rect.l - MOBILE_INSTANCE_W_DELTA / 2,
					rect.t,
					rect.w + MOBILE_INSTANCE_W_DELTA,
					rect.h,
				)
			: rect,
	);

	const schedulerProbe = autoLabelRect(0, 0, "Scheduler", {
		h: SCHEDULER_H,
		padX: SCHEDULER_PAD_X,
		fontSize: instanceHeaderFS,
	});
	const schedulerTop = instTop + INSTANCE_H + ROW_GAP_BOTTOM;
	const schedulerRect = makeRect(
		(VIEW_W - schedulerProbe.w) / 2,
		schedulerTop,
		schedulerProbe.w,
		SCHEDULER_H,
	);
	const schedulerDocks = convergenceDocks(REGIONS.length);
	const anyScaling = REGIONS.some((id) => scaleFlash[id]);
	const VIEW_H = schedulerRect.b + BOTTOM_MARGIN;

	useEffect(() => {
		const content = contentRef.current;
		const available = content?.parentElement;
		if (!content || !available) return;

		const updateHeaderSize = () => {
			const contentWidth = content.getBoundingClientRect().width;
			const availableWidth = available.getBoundingClientRect().width;
			if (contentWidth === 0 || availableWidth === 0) return;
			setWidenMobileNodes(availableWidth < VIEW_W * RENDER_SCALE);

			const referenceWidth = Math.min(
				availableWidth,
				REFERENCE_VIEW_W * RENDER_SCALE,
			);
			const referenceRenderedFS =
				REFERENCE_HEADER_FS * (referenceWidth / REFERENCE_VIEW_W);
			const placementScale = contentWidth / VIEW_W;
			const nextSize = Math.min(
				REFERENCE_HEADER_FS * (VIEW_W / REFERENCE_VIEW_W),
				Math.max(REFERENCE_HEADER_FS, referenceRenderedFS / placementScale),
			);

			setInstanceHeaderFS(Number(nextSize.toFixed(2)));
		};

		updateHeaderSize();
		const observer = new ResizeObserver(updateHeaderSize);
		observer.observe(content);
		observer.observe(available);
		return () => observer.disconnect();
	}, [VIEW_W]);

	return (
		<WeldCanvas
			width={VIEW_W}
			height={VIEW_H}
			contentRef={contentRef}
			liveStatus={status}
			controls={
				<Toolbar>
					<ResetButton onClick={handleReset} />
				</Toolbar>
			}
			overlay={visibleRegionRects.map((rect, i) => {
				const id = regionAt(i);
				return (
					<button
						key={id}
						type="button"
						aria-label={`Send a request to ${REGION_LABELS[id]}`}
						onClick={() => sendRequest(i)}
						className="absolute flex cursor-pointer items-center justify-center gap-1 rounded-sm bg-transparent font-mono text-[10px] font-medium tracking-widest text-neutral-700 uppercase transition-colors hover:bg-neutral-50/70 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 dark:text-neutral-300 dark:hover:bg-neutral-900/70"
						style={{
							left: `${(rect.l / VIEW_W) * 100}%`,
							top: `${(rect.t / VIEW_H) * 100}%`,
							width: `${(rect.w / VIEW_W) * 100}%`,
							height: `${(rect.h / VIEW_H) * 100}%`,
						}}
					>
						<svg
							aria-hidden="true"
							viewBox="0 0 16 16"
							className="h-3.5 w-3.5 shrink-0"
							fill="none"
							stroke="currentColor"
							strokeWidth="1.75"
							strokeLinecap="round"
						>
							<path d="M8 3v10M3 8h10" />
						</svg>
						<span className="leading-none">{REGION_LABELS[id]}</span>
					</button>
				);
			})}
		>
			<g>
				{regionRects.map((rR, i) => {
					const id = regionAt(i);
					const rI = instRects[i];
					if (!rI) return null;
					if (!pulse[id]) {
						return (
							<Connector
								key={`v-${i}`}
								from={dockPoint(rR, "bottom", REGION_DOCK_FRAC)}
								to={dockPoint(rI, "top", REGION_DOCK_FRAC)}
								ghost
							/>
						);
					}
					return (
						<Connector
							key={`v-${i}`}
							from={edgePoint(rR, "bottom", REGION_DOCK_FRAC)}
							to={edgePoint(rI, "top", REGION_DOCK_FRAC)}
							fromSide="bottom"
							toSide="top"
							arrowhead
							active
						/>
					);
				})}

				{visibleInstRects.map((rect, i) => {
					const id = regionAt(i);
					return (
						<g
							key={`scheduler-${id}`}
							style={{
								opacity: scaleFlash[id] ? 1 : 0,
								transition: reduced ? "none" : `opacity 160ms ${EASE_OUT}`,
							}}
						>
							<Connector
								from={edgePoint(schedulerRect, "top", schedulerDocks[i])}
								to={edgePoint(rect, "bottom")}
								fromSide="top"
								toSide="bottom"
								arrowhead
								active
							/>
						</g>
					);
				})}

				{visibleRegionRects.map((rect, i) => (
					<WeldedCard
						key={`region-${i}`}
						rect={rect}
						notches={{ bottom: true }}
						active={pulse[regionAt(i)]}
					/>
				))}

				{visibleInstRects.map((rect, i) => {
					const id = regionAt(i);
					const active = pulse[id];
					const extra = Math.max(0, Math.min(MAX_INSTANCES, load[id]) - 1);
					const depths = Array.from(
						{ length: MAX_INSTANCES - 1 },
						(_, index) => MAX_INSTANCES - 1 - index,
					);
					return (
						<g key={`inst-${i}`}>
							{depths.map((depth) => {
								const visible = depth <= extra;
								const offset = depth * TILE_OFFSET;
								const tileRect = makeRect(
									rect.l + offset,
									rect.t + offset,
									rect.w,
									rect.h,
								);
								return (
									<g
										key={`tile-${id}-${depth}`}
										style={{
											opacity: visible ? 1 : 0,
											transform: visible
												? "translate(0px, 0px)"
												: `translate(${-TILE_OFFSET}px, ${-TILE_OFFSET}px)`,
											transition: reduced
												? "none"
												: `opacity 220ms ${EASE_OUT}, transform 220ms ${EASE_OUT}`,
										}}
									>
										<WeldedCard
											rect={tileRect}
											notches={{ top: true, bottom: true }}
										/>
									</g>
								);
							})}
							<InstanceCard
								rect={rect}
								active={active}
								playing={glyphPlaying}
								reduced={reduced}
								headerH={INSTANCE_HEADER_H}
								headerFS={instanceHeaderFS}
							/>
						</g>
					);
				})}

				<LabelCard
					rect={schedulerRect}
					notches={{ top: schedulerDocks }}
					label="Scheduler"
					active={anyScaling}
					fontSize={instanceHeaderFS}
				/>
			</g>
		</WeldCanvas>
	);
}

export default ContainerPlacement;
