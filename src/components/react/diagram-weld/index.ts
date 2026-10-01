// diagram-weld — repo-owned SVG "weld" primitives for the container concept
// diagrams (src/components/react/container). NOT managed by the
// nimbus-docs CLI (unlike src/components/react/diagram/). All motion is CSS;
// there is no framer-motion dependency.
export {
	WeldedCard,
	LabelCard,
	SimpleCard,
	Connector,
	Arrowhead,
	CardHeader,
	CardDivider,
	Caption,
	CenterLabel,
	edgePoint,
	dockPoint,
	makeRect,
	makePath,
	vhvPathAt,
	hvhPath,
	autoLabelRect,
	uniformCardWidth,
	autoCardWidth,
	measureLabel,
	notchesForDividers,
	ARROW_OFFSET,
	MONO_CHAR_RATIO,
} from "./shapes";
export type {
	WeldedCardProps,
	LabelCardProps,
	SimpleCardProps,
	ConnectorProps,
	CardHeaderProps,
	CardDividerProps,
	CaptionProps,
	CaptionTone,
	CenterLabelProps,
	MeasureLabelOptions,
	AutoCardOptions,
	Side,
	Point,
} from "./shapes";

export type { NodeRect, NotchConfig, NotchSide, EdgeRect } from "./welding";

export { MOTION, EASE_OUT, EASE_OUT_POINTS } from "./motion";

export { ComputeGlyph, COMPUTE_GLYPH_W, COMPUTE_GLYPH_H } from "./ComputeGlyph";
export type { ComputeGlyphProps } from "./ComputeGlyph";

export { convergenceDocks } from "./convergence";

export { PhaseBadge } from "./PhaseBadge";
export type { PhaseBadgeProps, PhaseTone } from "./PhaseBadge";

export { FillBars } from "./FillBars";
export type { FillBarsProps, FillState } from "./FillBars";

export {
	VMUnit,
	vmDims,
	vmContainerRect,
	VM_PAD_SIDE,
	VM_HEADER_H,
	VM_INNER_PAD,
	VM_CONTAINER_H,
	VM_PAD_BOTTOM,
} from "./VMUnit";
export type { VMUnitProps } from "./VMUnit";
