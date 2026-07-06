"use client";

import { cn } from "@/lib/cn";

/** Accent color token for diagram cards — themed via `--diagram-accent`. */
export const DIAGRAM_ACCENT = "var(--diagram-accent, #1447e6)";

export interface CardBadgeProps {
  label: string;
  /** `accent` (default) tints the label; `neutral` keeps the accent in the dot only. */
  tone?: "accent" | "neutral";
  /** Position within the relative parent. Default: top-left corner. */
  className?: string;
}

/** Floating ID pill that sits on a card's top border. */
export function CardBadge({ label, tone = "accent", className }: CardBadgeProps) {
  return (
    <div
      className={cn(
        "absolute -top-3 left-3 z-10 flex items-center gap-1.5 border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 rounded-sm shadow-xs px-2 py-0.5",
        className,
      )}
    >
      <div className="size-1.5" style={{ backgroundColor: DIAGRAM_ACCENT }} />
      <span
        className={cn(
          "font-mono text-[10px] font-medium uppercase tracking-widest",
          tone === "neutral" && "text-neutral-900 dark:text-neutral-100",
        )}
        style={tone === "accent" ? { color: DIAGRAM_ACCENT } : undefined}
      >
        {label}
      </span>
    </div>
  );
}
