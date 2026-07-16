"use client";

import { useSyncExternalStore } from "react";
import { diagramRegistry } from "nimbus-docs/react";
import { cn } from "@/lib/cn";

/** Ghost-button styling — matches `ActionButton`. */
const PAUSE_ALL_BTN =
  "px-3 py-1.5 text-[10px] font-mono font-medium uppercase tracking-widest " +
  "border border-neutral-200 dark:border-neutral-800 rounded-sm shadow-xs " +
  "bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800 " +
  "cursor-pointer select-none active:scale-[0.97] " +
  "disabled:opacity-40 disabled:cursor-not-allowed " +
  "transition-[background-color,transform] duration-200 ease-out";

export interface DiagramPauseAllProps {
  className?: string;
  label?: string;
}

/**
 * Page-level pause-all control. Subscribes to the module-scoped
 * `diagramRegistry` (shared across Astro islands — React Context can't
 * bridge them).
 *
 * Hidden via visibility rather than returning null when count===0:
 * Astro 6 + React 19 dev SSR throws "Invalid hook call" when a component
 * with scheduled effects returns null, and a stable DOM also avoids layout
 * shift when the button appears.
 */
export function DiagramPauseAll({ className, label = "Pause all" }: DiagramPauseAllProps) {
  const count = useSyncExternalStore(
    diagramRegistry.subscribe,
    diagramRegistry.count,
    () => 0,
  );

  return (
    <button
      type="button"
      onClick={() => diagramRegistry.toggleAll()}
      data-nb-diagram-pause-all
      className={cn(PAUSE_ALL_BTN, className)}
      style={count === 0 ? { visibility: "hidden" } : undefined}
      aria-hidden={count === 0 ? true : undefined}
    >
      {label} ({count})
    </button>
  );
}
