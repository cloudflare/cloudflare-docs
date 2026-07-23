"use client";

import type { ReactNode } from "react";
import { cn } from "@/lib/cn";

export interface ChipOption<T extends string = string> {
	id: T;
	label: ReactNode;
}

export interface ChipGroupProps<T extends string = string> {
	options: readonly ChipOption<T>[];
	/** Single id, `null` for none, or `Set<id>` for multi-select. */
	active: T | null | ReadonlySet<T>;
	onChange: (id: T) => void;
	/** Disable the whole group, or per-id via predicate. */
	disabled?: boolean | ((id: T) => boolean);
	className?: string;
}

/** Segmented control — mutually-exclusive or multi-select chips. */
export function ChipGroup<T extends string = string>({
	options,
	active,
	onChange,
	disabled,
	className,
}: ChipGroupProps<T>) {
	const isActive = (id: T): boolean =>
		active instanceof Set ? active.has(id) : active === id;

	const isDisabled = (id: T): boolean =>
		typeof disabled === "function" ? disabled(id) : Boolean(disabled);

	return (
		<div
			className={cn(
				"flex border border-neutral-200 dark:border-neutral-800",
				"overflow-hidden rounded-sm bg-white shadow-xs dark:bg-neutral-900",
				className,
			)}
		>
			{options.map((opt) => {
				const a = isActive(opt.id);
				const d = isDisabled(opt.id);
				return (
					<button
						key={opt.id}
						type="button"
						onClick={() => !d && onChange(opt.id)}
						disabled={d}
						className={cn(
							"cursor-pointer select-none",
							"border-r border-neutral-200 last:border-r-0 dark:border-neutral-800",
							"px-2.5 py-1.5 font-mono text-[10px] font-medium tracking-wider uppercase",
							"transition-[color,background-color] duration-150 ease-out",
							"disabled:cursor-not-allowed disabled:opacity-40",
							a
								? "text-primary bg-primary/[0.08] dark:bg-primary/[0.12]"
								: "text-neutral-500 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-800/40",
						)}
					>
						{opt.label}
					</button>
				);
			})}
		</div>
	);
}
