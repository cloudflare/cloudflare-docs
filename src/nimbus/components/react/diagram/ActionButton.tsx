"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ActionButtonProps {
  /** Visible label. Strings or icons. */
  label: ReactNode;
  onClick: () => void;
  disabled?: boolean;
  /** Render in the brand-active state. */
  active?: boolean;
  /** Tooltip / a11y title. */
  title?: string;
  /** `ghost` (default) for toolbar controls; `primary` is the solid accent CTA. */
  variant?: "ghost" | "primary";
  className?: string;
}

/**
 * Ghost button — neutral border, monospace label, click feedback.
 * The workhorse control for diagram toolbars (Play / Pause / Reset /
 * mode toggles). The `primary` variant fills with the diagram accent
 * for a card's main call-to-action.
 */
export function ActionButton({
  label,
  onClick,
  disabled,
  active,
  title,
  variant = "ghost",
  className,
}: ActionButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      title={title}
      className={cn(
        "px-3 py-1.5 text-[10px] font-mono font-medium uppercase tracking-widest",
        "border rounded-sm shadow-xs",
        "cursor-pointer select-none active:scale-[0.97]",
        "disabled:opacity-40 disabled:cursor-not-allowed",
        "transition-[background-color,opacity,transform] duration-200 ease-out",
        variant === "primary"
          ? "text-white border-transparent bg-[var(--diagram-accent,#1447e6)] hover:opacity-90"
          : cn(
              "border-neutral-200 dark:border-neutral-800",
              "bg-white dark:bg-neutral-900 hover:bg-neutral-50 dark:hover:bg-neutral-800",
              active && "text-primary bg-primary/[0.08] dark:bg-primary/[0.12]",
            ),
        className,
      )}
    >
      {label}
    </button>
  );
}
