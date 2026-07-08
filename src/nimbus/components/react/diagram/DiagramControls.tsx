"use client";

import type { ReactNode } from "react";
import { useDiagram } from "nimbus-docs/react";
import { cn } from "@/lib/cn";
import { ActionBar } from "./ActionBar";
import { ActionButton } from "./ActionButton";

export interface DiagramControlsProps {
  /** Left-aligned status text (phase labels, step counters). */
  status?: ReactNode;
  statusClassName?: string;
  /** Render the Play/Pause button. */
  playPause?: boolean;
  /** Render the Reset button. */
  reset?: boolean;
  /** Extra controls rendered alongside the defaults (mode toggles, etc.). */
  children?: ReactNode;
  className?: string;
}

/**
 * Pre-wired toolbar for the surrounding `<Diagram>`. Reads `playing`,
 * `toggle`, `reset` from the framework's `useDiagram` hook; the framework
 * renders no UI of its own.
 *
 * Status text sits left, action buttons right. Extras (tabs, chips,
 * bespoke run buttons) pass as children and sit alongside the defaults;
 * drop the built-ins via `playPause={false}` / `reset={false}` when a
 * card supplies its own.
 */
export function DiagramControls({
  status,
  statusClassName,
  playPause = true,
  reset = true,
  children,
  className,
}: DiagramControlsProps) {
  const ctx = useDiagram();
  if (!ctx) return null;

  return (
    <div className={cn("flex items-center justify-between flex-wrap gap-2 p-3", className)}>
      {status != null && (
        <span
          className={cn(
            "font-mono text-[9px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 select-none",
            statusClassName,
          )}
        >
          {status}
        </span>
      )}
      <ActionBar className="ml-auto">
        {playPause && (
          <ActionButton label={ctx.playing ? "Pause" : "Play"} onClick={ctx.toggle} />
        )}
        {reset && <ActionButton label="Reset" onClick={ctx.reset} />}
        {children}
      </ActionBar>
    </div>
  );
}
