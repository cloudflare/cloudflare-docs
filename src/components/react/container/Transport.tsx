"use client";

import type { ReactNode } from "react";
import { ActionBar, ActionButton } from "@/components/react/diagram";
import { cn } from "@/lib/cn";

const ICON = {
	width: 11,
	height: 11,
	viewBox: "0 0 16 16",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 1.6,
	strokeLinecap: "round" as const,
	strokeLinejoin: "round" as const,
	"aria-hidden": true,
};

function ResetIcon() {
	return (
		<svg {...ICON}>
			<path d="M13.5 8a5.5 5.5 0 1 1-1.6-3.9" />
			<path d="M12.5 2v3h-3" />
		</svg>
	);
}

function PlayIcon() {
	return (
		<svg {...ICON} fill="currentColor" stroke="none">
			<path d="M5 3.5v9l7-4.5z" />
		</svg>
	);
}

function PauseIcon() {
	return (
		<svg {...ICON} fill="currentColor" stroke="none">
			<rect x="4.5" y="3.5" width="2.5" height="9" rx="0.5" />
			<rect x="9" y="3.5" width="2.5" height="9" rx="0.5" />
		</svg>
	);
}

function CaretLeftIcon() {
	return (
		<svg {...ICON}>
			<path d="M10 3.5 5.5 8l4.5 4.5" />
		</svg>
	);
}

function CaretRightIcon() {
	return (
		<svg {...ICON}>
			<path d="M6 3.5 10.5 8 6 12.5" />
		</svg>
	);
}

function iconLabel(icon: ReactNode, text?: string) {
	return (
		<span className="inline-flex items-center gap-1">
			{icon}
			{text}
		</span>
	);
}

export interface ToolbarProps {
	/** Left-aligned status text (phase labels, step counters). */
	status?: ReactNode;
	children: ReactNode;
	className?: string;
}

export function Toolbar({ status, children, className }: ToolbarProps) {
	return (
		<div
			className={cn(
				"flex flex-wrap items-center justify-between gap-2 p-2",
				className,
			)}
		>
			{status != null && (
				<span className="font-mono text-[9px] tracking-widest text-neutral-500 uppercase select-none dark:text-neutral-400">
					{status}
				</span>
			)}
			<ActionBar className="ml-auto max-w-full flex-wrap justify-end">
				{children}
			</ActionBar>
		</div>
	);
}

export function PlayPauseButton({
	playing,
	onClick,
}: {
	playing: boolean;
	onClick: () => void;
}) {
	return (
		<ActionButton
			label={iconLabel(
				playing ? <PauseIcon /> : <PlayIcon />,
				playing ? "Pause" : "Play",
			)}
			title={playing ? "Pause the animation" : "Play the animation"}
			onClick={onClick}
			className="px-2 py-1"
		/>
	);
}

export function ResetButton({
	onClick,
	label = "Reset",
}: {
	onClick: () => void;
	label?: string;
}) {
	return (
		<ActionButton
			label={iconLabel(<ResetIcon />, label)}
			title={`${label} the animation`}
			onClick={onClick}
			className="px-2 py-1"
		/>
	);
}

export function PrevButton({
	onClick,
	disabled,
}: {
	onClick: () => void;
	disabled?: boolean;
}) {
	return (
		<ActionButton
			label={iconLabel(<CaretLeftIcon />)}
			title="Previous step"
			onClick={onClick}
			disabled={disabled}
			className="px-2 py-1"
		/>
	);
}

export function NextButton({
	onClick,
	disabled,
}: {
	onClick: () => void;
	disabled?: boolean;
}) {
	return (
		<ActionButton
			label={iconLabel(<CaretRightIcon />)}
			title="Next step"
			onClick={onClick}
			disabled={disabled}
			className="px-2 py-1"
		/>
	);
}

// Plain momentary button carrying an explicit aria-label (the visible text
// may be terse). `highlight` is a purely visual ring — not a toggle state —
// so it never sets aria-pressed.
export function LabeledButton({
	ariaLabel,
	title,
	highlight,
	onClick,
	children,
}: {
	ariaLabel: string;
	title?: string;
	highlight?: boolean;
	onClick: () => void;
	children: ReactNode;
}) {
	return (
		<button
			type="button"
			onClick={onClick}
			aria-label={ariaLabel}
			title={title}
			className={cn(
				"inline-flex items-center justify-center gap-1.5 px-2 py-1 font-mono text-[10px] font-medium tracking-widest uppercase",
				"cursor-pointer rounded-sm border shadow-xs select-none active:scale-[0.97]",
				"transition-[background-color,opacity,transform] duration-200 ease-out",
				"border-neutral-200 dark:border-neutral-800",
				"bg-white hover:bg-neutral-50 dark:bg-neutral-900 dark:hover:bg-neutral-800",
				highlight && "ring-brand ring-1",
			)}
		>
			{children}
		</button>
	);
}
