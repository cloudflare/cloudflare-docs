"use client";

// Container placement & routing (Concepts page). Instances run across
// Cloudflare's network and requests are routed to an available instance.
// Three locations are shown with a request control for each one.
import { useEffect, useRef, useState } from "react";
import { Diagram, useDiagramOrDefault } from "@cloudflare/nimbus-docs/react";
import {
	Connector,
	SimpleCard,
	WeldedCard,
	ComputeGlyph,
	COMPUTE_GLYPH_W,
	COMPUTE_GLYPH_H,
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

const REGION_GAP = 24;
const ROW_GAP_TOP = 54;
const MOBILE_REGION_W_DELTA = 8;
const MOBILE_INSTANCE_W_DELTA = 10;

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
			label="Container instances in different locations, with requests routed to an available instance"
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

	const [pulse, setPulse] = useState<Record<RegionId, boolean>>(falses);
	const [status, setStatus] = useState("");
	const [instanceHeaderFS, setInstanceHeaderFS] = useState(INSTANCE_HEADER_FS);
	const [widenMobileNodes, setWidenMobileNodes] = useState(false);
	const contentRef = useRef<HTMLDivElement>(null);

	const pulseTimers = useRef<
		Partial<Record<RegionId, ReturnType<typeof setTimeout>>>
	>({});

	const regionAt = (i: number): RegionId => REGIONS[i] ?? REGIONS[0];

	const sendRequest = (i: number) => {
		const id = regionAt(i);

		setPulse((p) => ({ ...p, [id]: true }));
		if (pulseTimers.current[id]) clearTimeout(pulseTimers.current[id]);
		pulseTimers.current[id] = setTimeout(() => {
			setPulse((p) => ({ ...p, [id]: false }));
		}, PULSE_MS);

		setStatus(`${REGION_LABELS[id]} handled a request.`);
	};

	const clearAllTimers = () => {
		Object.values(pulseTimers.current).forEach((t) => t && clearTimeout(t));
		pulseTimers.current = {};
	};

	const handleReset = () => {
		clearAllTimers();
		setPulse(falses());
		setStatus("Reset — one instance per location.");
	};

	useEffect(() => clearAllTimers, []);

	const regionW = uniformCardWidth(
		REGIONS.map((r) => `+ ${REGION_LABELS[r]}`),
		{ padX: REGION_PAD_X, fontSize: REGION_FONT_SIZE },
	);
	const regionRowW = regionW * 3 + REGION_GAP * 2;
	const VIEW_W = Math.max(MIN_VIEW_W, regionRowW + SIDE_MARGIN * 2);
	const regionStartX = (VIEW_W - regionRowW) / 2;
	const regionRects = REGIONS.map((_, i) =>
		makeRect(regionStartX + i * (regionW + REGION_GAP), TOP, regionW, REGION_H),
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

	const VIEW_H = instTop + INSTANCE_H + BOTTOM_MARGIN;

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
						<span
							aria-hidden="true"
							className="text-base leading-none tracking-normal"
						>
							+
						</span>
						<span>{REGION_LABELS[id]}</span>
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
					return (
						<g key={`inst-${i}`}>
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
			</g>
		</WeldCanvas>
	);
}

export default ContainerPlacement;
