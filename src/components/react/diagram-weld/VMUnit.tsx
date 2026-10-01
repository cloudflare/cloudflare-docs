"use client";

// A VM boundary (single top notch + identity header + welded seam) wrapping
// an accent "CONTAINER" card. Shared by ContainerIsolation and
// ContainerRequestPath so the two diagrams read as one.
import {
	CardDivider,
	CardHeader,
	CenterLabel,
	WeldedCard,
	makeRect,
	notchesForDividers,
} from "./shapes";
import type { NodeRect } from "./welding";

export const VM_PAD_SIDE = 12;
export const VM_HEADER_H = 26;
export const VM_INNER_PAD = 8;
export const VM_CONTAINER_H = 30;
export const VM_PAD_BOTTOM = 12;

export function vmDims(containerW: number, scale = 1) {
	return {
		w: (containerW + VM_PAD_SIDE * 2) * scale,
		h: (VM_HEADER_H + VM_INNER_PAD + VM_CONTAINER_H + VM_PAD_BOTTOM) * scale,
	};
}

export function vmContainerRect(vm: NodeRect, scale = 1): NodeRect {
	return makeRect(
		vm.l + VM_PAD_SIDE * scale,
		vm.t + (VM_HEADER_H + VM_INNER_PAD) * scale,
		vm.w - VM_PAD_SIDE * 2 * scale,
		VM_CONTAINER_H * scale,
	);
}

export interface VMUnitProps {
	rect: NodeRect;
	metaId?: string;
	/** Lights the VM boundary (e.g. the cold-start beat). */
	boundaryActive?: boolean;
	/** Lights the identity header. */
	headerActive?: boolean;
	/** Lights the nested container. */
	containerActive?: boolean;
	fontSize?: number;
	scale?: number;
}

export function VMUnit({
	rect,
	metaId,
	boundaryActive = false,
	headerActive = false,
	containerActive = false,
	fontSize = 11,
	scale = 1,
}: VMUnitProps) {
	const dividerY = rect.t + VM_HEADER_H * scale;
	const container = vmContainerRect(rect, scale);
	const notches = notchesForDividers(rect, [dividerY], { top: true });
	const pad = Math.max(5 * scale, ((VM_HEADER_H - 6) / 2) * scale);
	return (
		<g>
			<WeldedCard rect={rect} notches={notches} active={boundaryActive} flat />
			<CardHeader
				x={rect.l + VM_PAD_SIDE * scale}
				y={rect.t + pad}
				label="VM"
				meta={metaId}
				rightEdge={rect.r - VM_PAD_SIDE * scale}
				active={headerActive}
				indicator={6 * scale}
				fontSize={fontSize}
			/>
			<CardDivider l={rect.l} r={rect.r} y={dividerY} />
			<WeldedCard
				rect={container}
				notches={{}}
				accent
				active={containerActive}
				flat
			/>
			<CenterLabel
				cx={container.cx}
				cy={container.cy}
				fontSize={fontSize}
				active={containerActive}
			>
				CONTAINER
			</CenterLabel>
		</g>
	);
}
