"use client";

import { useCallback, useRef, type ReactNode } from "react";
import { useTabIndicator } from "nimbus-docs/react";
import { cn } from "@/lib/cn";
import type { ChipOption } from "./ChipGroup";

export interface TabsProps<T extends string = string> {
  options: readonly ChipOption<T>[];
  /** Selected id; `null` for "no tab active". */
  active: T | null;
  onChange: (id: T) => void;
  disabled?: boolean | ((id: T) => boolean);
  ariaLabel?: string;
  className?: string;
}

/**
 * Single-select tabs with a sliding floating-pill indicator. Recessed
 * track + elevated active pill; mono/uppercase labels.
 *
 * Pill measurement comes from the framework's `useTabIndicator` hook —
 * this component owns the rendering only.
 */
export function Tabs<T extends string = string>({
  options,
  active,
  onChange,
  disabled,
  ariaLabel,
  className,
}: TabsProps<T>) {
  const isDisabled = (id: T): boolean =>
    typeof disabled === "function" ? disabled(id) : Boolean(disabled);

  const containerRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<Record<string, HTMLButtonElement | null>>({});

  const getTab = useCallback(
    (id: string) => tabRefs.current[id] ?? null,
    [],
  );

  const { style } = useTabIndicator(containerRef, getTab, active);

  return (
    <div
      ref={containerRef}
      role="tablist"
      aria-label={ariaLabel}
      className={cn(
        "relative inline-flex items-stretch shrink min-w-0 px-0.5 h-8 rounded-lg",
        "bg-neutral-100/70 dark:bg-neutral-900/40",
        "ring-1 ring-black/[0.06] dark:ring-white/[0.08]",
        className,
      )}
    >
      {options.map((opt) => {
        const a = active === opt.id;
        const d = isDisabled(opt.id);
        return (
          <button
            key={opt.id}
            ref={(el) => {
              const key = opt.id as string;
              tabRefs.current[key] = el;
              return () => { delete tabRefs.current[key]; };
            }}
            type="button"
            role="tab"
            aria-selected={a}
            tabIndex={a ? 0 : -1}
            onClick={() => !d && onChange(opt.id)}
            disabled={d}
            className={cn(
              "relative z-10 my-0.5 px-2.5",
              "flex items-center cursor-pointer select-none whitespace-nowrap",
              "rounded-sm font-mono text-[10px] font-medium uppercase tracking-wider",
              "bg-transparent transition-colors duration-150",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-neutral-400 dark:focus-visible:ring-neutral-500",
              "disabled:opacity-40 disabled:cursor-not-allowed",
              a
                ? "text-neutral-900 dark:text-neutral-100"
                : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700 dark:hover:text-neutral-200",
            )}
          >
            {opt.label}
          </button>
        );
      })}
      {style && (
        <div
          role="presentation"
          aria-hidden
          className={cn(
            "absolute z-0 pointer-events-none",
            "rounded-sm bg-white dark:bg-neutral-800",
            "shadow-sm ring-1 ring-black/[0.06] dark:ring-white/[0.08]",
            "transition-all duration-200 ease-out",
          )}
          style={{
            top: style.top,
            left: 0,
            width: style.width,
            height: style.height,
            transform: `translateX(${style.left}px)`,
          }}
        />
      )}
    </div>
  );
}
