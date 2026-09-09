"use client";

import type { ReactNode, Ref } from "react";
import { DiagramStage } from "@/components/react/diagram";
import { DiagramDefs } from "@/components/react/diagram/DiagramDefs";

// Empirical upscale from the intrinsic viewBox width to the rendered CSS
// width, preserved from the pre-migration shell so rendered sizes are
// unchanged. Aspect ratio is preserved via `h-auto`.
export const RENDER_SCALE = 1.056;

// Mount-enter animation for ephemeral groups (keyframe in globals.css), or
// undefined under reduced motion.
export function weldEnter(
	reduced: boolean,
	durationMs = 300,
): string | undefined {
	return reduced
		? undefined
		: `weld-enter ${durationMs}ms cubic-bezier(0.23, 1, 0.32, 1)`;
}

export interface WeldCanvasProps {
	width: number;
	height: number;
	/** Transport / interaction chrome, rendered as a top toolbar. */
	controls?: ReactNode;
	/** Native controls positioned over the responsive SVG scene. */
	overlay?: ReactNode;
	/** Optional access to the rendered SVG wrapper for responsive measurements. */
	contentRef?: Ref<HTMLDivElement>;
	/**
	 * Plain-language narration of the current state, announced politely.
	 * Omit for autoplay diagrams (the <Diagram label> names the graphic and
	 * the framework announces play/pause) to avoid live-region flooding.
	 */
	liveStatus?: string;
	children: ReactNode;
}

// Presentational shell for the container concept diagrams: the DiagramStage
// canvas, the top control slot, the shared <DiagramDefs />, responsive
// sizing, and an optional polite live region. The SVG scene is aria-hidden;
// the accessible name comes from the surrounding <Diagram label>.
export function WeldCanvas({
	width,
	height,
	controls,
	overlay,
	contentRef,
	liveStatus,
	children,
}: WeldCanvasProps) {
	return (
		<DiagramStage accent="var(--color-brand)" className="mt-4">
			{controls}
			<div className="px-3 pt-4 pb-4 sm:px-6">
				<div
					ref={contentRef}
					className="relative mx-auto"
					style={{ width: width * RENDER_SCALE, maxWidth: "100%" }}
				>
					<DiagramDefs />
					<svg
						viewBox={`0 0 ${width} ${height}`}
						aria-hidden="true"
						focusable="false"
						className="block h-auto w-full"
					>
						{children}
					</svg>
					{overlay}
				</div>
			</div>
			{liveStatus !== undefined && (
				<div className="sr-only" role="status" aria-live="polite">
					{liveStatus}
				</div>
			)}
		</DiagramStage>
	);
}

export default WeldCanvas;
