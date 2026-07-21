/**
 * Diagram UI — user-owned visual components for the headless
 * `nimbus-docs/react` primitives. Cards compose framework hooks for
 * behaviour with components from this dir for the visuals. Restyle freely.
 */

export { CardBadge, DIAGRAM_ACCENT } from "./CardBadge";
export type { CardBadgeProps } from "./CardBadge";

export { ActionBar } from "./ActionBar";
export type { ActionBarProps } from "./ActionBar";

export { ActionButton } from "./ActionButton";
export type { ActionButtonProps } from "./ActionButton";

export { ChipGroup } from "./ChipGroup";
export type { ChipGroupProps, ChipOption } from "./ChipGroup";

export { Tabs } from "./Tabs";
export type { TabsProps } from "./Tabs";

export { DiagramControls } from "./DiagramControls";
export type { DiagramControlsProps } from "./DiagramControls";

export { DiagramStage } from "./DiagramStage";
export type { DiagramStageProps } from "./DiagramStage";

export { DiagramDebug } from "./DiagramDebug";

export { DiagramPauseAll } from "./DiagramPauseAll";
export type { DiagramPauseAllProps } from "./DiagramPauseAll";

export { DiagramDefs } from "./DiagramDefs";

// scene.tsx ships in the separate `diagram-scene` registry slug — do not
// re-export it here, or installing `diagram` alone breaks the barrel.
// Import from "@/components/react/diagram/scene" directly.
