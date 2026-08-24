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
				"px-3 py-1.5 font-mono text-[10px] font-medium tracking-widest uppercase",
				"rounded-sm border shadow-xs",
				"cursor-pointer select-none active:scale-[0.97]",
				"disabled:cursor-not-allowed disabled:opacity-40",
				"transition-[background-color,opacity,transform] duration-200 ease-out",
				variant === "primary"
					? "border-transparent bg-[var(--diagram-accent,#1447e6)] text-white hover:opacity-90"
					: cn(
							"border-neutral-200 dark:border-neutral-800",
							"bg-white hover:bg-neutral-50 dark:bg-neutral-900 dark:hover:bg-neutral-800",
							active && "text-primary bg-primary/[0.08] dark:bg-primary/[0.12]",
						),
				className,
			)}
		>
			{label}
		</button>
	);
}
