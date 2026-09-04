"use client";

import { useEffect, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { cn } from "@/lib/cn";

const LOCATIONS = ["Location A", "Location B", "Location C"] as const;
type LocationIndex = 0 | 1 | 2;
type Cue =
	| "fork"
	| "preview"
	| "depth"
	| "ripple"
	| "dock"
	| "rail"
	| "junction"
	| "options"
	| "actuator"
	| "inset";

const VARIANTS: Array<{
	key: Cue;
	name: string;
	principle: string;
	detail: string;
}> = [
	{
		key: "fork",
		name: "Pending fork",
		principle: "Leave the motion visibly unfinished",
		detail:
			"A request arrives, then waits at the decision point. The scene cannot resolve until a destination is chosen.",
	},
	{
		key: "preview",
		name: "Responsive preview",
		principle: "Let proximity reveal agency",
		detail:
			"Approaching a location previews its route immediately. Clicking commits the request and adds capacity.",
	},
	{
		key: "depth",
		name: "Tactile nodes",
		principle: "Separate controls from diagram objects",
		detail:
			"Location nodes have physical depth and press travel. Passive nodes remain flat, creating a visual grammar for control.",
	},
	{
		key: "ripple",
		name: "Invitation ripple",
		principle: "Wake only the available actions",
		detail:
			"A single restrained readiness ripple moves across the three targets. Nothing in the system executes on its own.",
	},
	{
		key: "dock",
		name: "Control dock",
		principle: "Put agency in a familiar control surface",
		detail:
			"The topology stays purely explanatory while a compact dock maps one-to-one to its destinations.",
	},
	{
		key: "rail",
		name: "Selector rail",
		principle: "Embed a latched control into the topology",
		detail:
			"A persistent selector and connected route establish that the diagram represents a changeable configuration, not a timeline.",
	},
	{
		key: "junction",
		name: "Routing switch",
		principle: "Make the decision mechanism tangible",
		detail:
			"A physical switch at the branch point exposes one active route and two available destinations without relying on motion.",
	},
	{
		key: "options",
		name: "Option nodes",
		principle: "Borrow the clearest selection convention",
		detail:
			"Radio morphology is absorbed into each location node. The diagram remains diagrammatic, but selection is never hidden.",
	},
	{
		key: "actuator",
		name: "Split actuators",
		principle: "Give every active object a visible control edge",
		detail:
			"A narrow actuator is welded onto each location card, separating what the node is from where it can be manipulated.",
	},
	{
		key: "inset",
		name: "Inset control plane",
		principle: "Use persistent material contrast, not animation",
		detail:
			"All selectable nodes sit inside recessed wells. The selected node locks flush while alternatives remain visibly available.",
	},
];

export function PlacementCueLab() {
	return (
		<div className="placement-cue-lab min-h-dvh bg-neutral-50 text-neutral-950 dark:bg-neutral-950 dark:text-neutral-50">
			<header className="border-b border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
				<div className="mx-auto max-w-[1480px] px-5 py-12 sm:px-8 lg:px-12">
					<p className="mb-3 font-mono text-[11px] font-medium text-neutral-500 uppercase dark:text-neutral-400">
						Placement diagram study
					</p>
					<h1 className="max-w-3xl text-3xl font-semibold text-balance sm:text-4xl">
						Interaction should be felt before it is explained.
					</h1>
					<p className="mt-4 max-w-2xl text-sm leading-6 text-pretty text-neutral-600 dark:text-neutral-400">
						Ten ways to distinguish a diagram that waits for the reader from one
						that plays by itself. Try each scene without reading its rationale
						first.
					</p>
				</div>
			</header>

			<main
				id="main-content"
				className="mx-auto max-w-[1480px] px-5 py-8 sm:px-8 lg:px-12"
			>
				<div className="grid gap-6 xl:grid-cols-2">
					{VARIANTS.map((variant, index) => (
						<section
							key={variant.key}
							data-variant={String.fromCharCode(65 + index)}
							className="overflow-hidden rounded-xl border border-neutral-200 bg-white dark:border-neutral-800 dark:bg-neutral-900"
						>
							<div className="flex items-start gap-4 border-b border-neutral-200 px-5 py-4 dark:border-neutral-800">
								<span className="flex size-7 shrink-0 items-center justify-center rounded-md border border-neutral-200 font-mono text-[11px] text-neutral-500 dark:border-neutral-700 dark:text-neutral-400">
									{String.fromCharCode(65 + index)}
								</span>
								<div className="min-w-0">
									<h2 className="text-sm font-semibold text-balance">
										{variant.name}
									</h2>
									<p className="mt-1 text-xs text-pretty text-neutral-500 dark:text-neutral-400">
										{variant.principle}
									</p>
								</div>
							</div>

							<PlacementVariant cue={variant.key} />

							<p className="border-t border-neutral-200 px-5 py-4 text-xs leading-5 text-pretty text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
								{variant.detail}
							</p>
						</section>
					))}
				</div>
			</main>
		</div>
	);
}

function PlacementVariant({ cue }: { cue: Cue }) {
	const [active, setActive] = useState<LocationIndex | null>(null);
	const [preview, setPreview] = useState<LocationIndex | null>(null);
	const [selected, setSelected] = useState<LocationIndex>(1);
	const [counts, setCounts] = useState<[number, number, number]>([1, 1, 1]);
	const [rippleReady, setRippleReady] = useState(false);
	const [status, setStatus] = useState("Choose a location to route a request.");
	const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
	const requestRef = useRef(0);
	const sceneRef = useRef<HTMLDivElement>(null);

	useEffect(
		() => () => {
			if (timerRef.current) clearTimeout(timerRef.current);
		},
		[],
	);

	useEffect(() => {
		if (cue !== "ripple" || !sceneRef.current) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry?.isIntersecting) return;
				setRippleReady(true);
				observer.disconnect();
			},
			{ threshold: 0.55 },
		);
		observer.observe(sceneRef.current);
		return () => observer.disconnect();
	}, [cue]);

	const send = (index: LocationIndex) => {
		if (timerRef.current) clearTimeout(timerRef.current);
		requestRef.current += 1;
		const nextCount = Math.min(4, counts[index] + 1);
		setActive(index);
		setSelected(index);
		setCounts((current) => {
			const next = [...current] as [number, number, number];
			next[index] = nextCount;
			return next;
		});
		setStatus(
			`Request ${requestRef.current} routed to ${LOCATIONS[index]}. ${nextCount} instances available.`,
		);
		timerRef.current = setTimeout(() => setActive(null), 1100);
	};

	const persistent = [
		"rail",
		"junction",
		"options",
		"actuator",
		"inset",
	].includes(cue);
	const indicated = active ?? preview ?? (persistent ? selected : null);
	const dock = cue === "dock";
	const selectWithKeyboard = (
		event: KeyboardEvent<HTMLButtonElement>,
		index: LocationIndex,
	) => {
		if (
			!persistent ||
			(event.key !== "ArrowLeft" && event.key !== "ArrowRight")
		)
			return;
		event.preventDefault();
		const offset = event.key === "ArrowRight" ? 1 : -1;
		const next = ((index + offset + LOCATIONS.length) %
			LOCATIONS.length) as LocationIndex;
		send(next);
		const controls =
			event.currentTarget.parentElement?.querySelectorAll<HTMLElement>(
				'[role="radio"]',
			);
		controls?.[next]?.focus();
	};

	return (
		<div
			ref={sceneRef}
			role="group"
			aria-label="Three locations route requests to their container instances, coordinated by a scheduler."
			className={cn("placement-scene", `cue-${cue}`, rippleReady && "is-ready")}
			onPointerLeave={() => setPreview(null)}
		>
			<div className="scene-canvas">
				<svg
					viewBox="0 0 600 320"
					className="block h-auto w-full"
					aria-hidden="true"
					focusable="false"
				>
					<defs>
						<marker
							id={`cue-arrow-${cue}`}
							markerWidth="5"
							markerHeight="5"
							refX="4.5"
							refY="2.5"
							orient="auto"
						>
							<path d="M0 0L5 2.5L0 5Z" fill="currentColor" />
						</marker>
					</defs>

					{cue === "fork" && (
						<g className="pending-request">
							<path d="M300 4V24H130V34M300 24V34M300 24H470V34" />
							<circle cx="300" cy="24" r="4" />
							<circle className="pending-ring" cx="300" cy="24" r="10" />
						</g>
					)}
					{cue === "junction" && (
						<g className="routing-junction">
							<path d="M300 112V98M300 98L130 82M300 98V82M300 98L470 82" />
							<circle cx="300" cy="98" r="8" />
							<path
								className="switch-arm"
								d={`M300 98L${130 + selected * 170} 82`}
							/>
						</g>
					)}

					{LOCATIONS.map((_, index) => {
						const x = 130 + index * 170;
						const selected = indicated === index;
						return (
							<g
								key={`route-${index}`}
								className={selected ? "route-active" : "route-idle"}
							>
								<path
									d={`M${x} 76V140`}
									markerEnd={selected ? `url(#cue-arrow-${cue})` : undefined}
								/>
							</g>
						);
					})}

					{LOCATIONS.map((_, index) => {
						const x = 75 + index * 170;
						const selected = indicated === index;
						return (
							<g key={`instance-${index}`}>
								{Array.from({ length: counts[index] - 1 }, (_, depth) => (
									<rect
										key={depth}
										x={x + 8 + depth * 5}
										y={148 + 8 + depth * 5}
										width="110"
										height="78"
										rx="5"
										className="instance-stack"
									/>
								))}
								<rect
									x={x}
									y="140"
									width="110"
									height="78"
									rx="5"
									className={
										selected ? "instance-card is-active" : "instance-card"
									}
								/>
								<line
									x1={x}
									y1="169"
									x2={x + 110}
									y2="169"
									className="instance-rule"
								/>
								<circle
									cx={x + 14}
									cy="155"
									r="3"
									className={selected ? "status-active" : "status-idle"}
								/>
								<text x={x + 24} y="159" className="node-label">
									Container
								</text>
								<path
									d={`M${x + 41} 191c8-11 21-11 28 0-6 9-20 9-28 0Zm7 0c4-5 10-5 14 0-4 4-10 4-14 0Z`}
									className={selected ? "compute-active" : "compute-idle"}
								/>
							</g>
						);
					})}

					<path
						d="M130 226V266H300M300 226V266M470 226V266H300"
						className="scheduler-lines"
					/>
					<rect
						x="248"
						y="266"
						width="104"
						height="32"
						rx="5"
						className="scheduler-card"
					/>
					<text x="300" y="286" textAnchor="middle" className="scheduler-label">
						Scheduler
					</text>
				</svg>
				{cue === "junction" && (
					<button
						type="button"
						className="junction-control"
						aria-label="Select the next location"
						onClick={() => send(((selected + 1) % 3) as LocationIndex)}
					/>
				)}

				<div
					className={cn("location-row", dock && "pointer-events-none")}
					role={persistent ? "radiogroup" : undefined}
					aria-label={persistent ? "Container location" : undefined}
				>
					{LOCATIONS.map((label, index) => {
						const locationIndex = index as LocationIndex;
						if (dock) {
							return (
								<div key={label} className="passive-location">
									{label}
								</div>
							);
						}
						return (
							<button
								key={label}
								type="button"
								role={persistent ? "radio" : undefined}
								aria-label={
									persistent ? `Select ${label}` : `Send a request to ${label}`
								}
								aria-checked={persistent ? selected === index : undefined}
								tabIndex={
									persistent ? (selected === index ? 0 : -1) : undefined
								}
								onClick={() => send(locationIndex)}
								onKeyDown={(event) => selectWithKeyboard(event, locationIndex)}
								onPointerEnter={() =>
									cue === "preview" && setPreview(locationIndex)
								}
								onFocus={() => cue === "preview" && setPreview(locationIndex)}
								onBlur={() => setPreview(null)}
								className={cn(
									"location-button",
									indicated === index && "is-active",
								)}
							>
								{cue === "options" ? (
									<span aria-hidden="true" className="option-control">
										<span />
									</span>
								) : (
									<span aria-hidden="true" className="location-action">
										+
									</span>
								)}
								<span className="location-name">{label}</span>
								{cue === "actuator" && (
									<span aria-hidden="true" className="node-actuator">
										<svg viewBox="0 0 16 16">
											<path d="M3 8h9m-3.5-3.5L12 8l-3.5 3.5" />
										</svg>
									</span>
								)}
							</button>
						);
					})}
				</div>
			</div>

			{dock && (
				<div className="route-dock" role="group" aria-label="Route a request">
					{LOCATIONS.map((label, index) => (
						<button
							key={label}
							type="button"
							onClick={() => send(index as LocationIndex)}
							onPointerEnter={() => setPreview(index as LocationIndex)}
							onPointerLeave={() => setPreview(null)}
							onFocus={() => setPreview(index as LocationIndex)}
							onBlur={() => setPreview(null)}
							aria-label={`Send a request to ${label}`}
							className={indicated === index ? "is-active" : undefined}
						>
							<span>{String.fromCharCode(65 + index)}</span>
							<svg aria-hidden="true" viewBox="0 0 16 16">
								<path d="M3 8h9m-3.5-3.5L12 8l-3.5 3.5" />
							</svg>
						</button>
					))}
				</div>
			)}

			<div className="sr-only" role="status" aria-live="polite">
				{status}
			</div>
		</div>
	);
}

export default PlacementCueLab;
