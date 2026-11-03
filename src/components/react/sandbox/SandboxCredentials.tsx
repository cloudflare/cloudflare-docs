"use client";

// Sandbox credentials (Sandbox security page). What code inside a coding
// agent's sandbox sees: the agent runs `git pull`, and code from a test
// dependency reads `.git/config`. The reader moves the token between the
// clone URL and your Worker. The token is the only thing that moves, and
// `git pull` works the same either way; that contrast is the point.
//
// HTML, not SVG, so the terminal text is real text. Server rendering shows
// the token in the clone URL. After hydration a single floating copy of the
// token travels between two slots, measured from the DOM, so the motion
// keeps its identity and can reverse mid-flight.
import {
	useCallback,
	useEffect,
	useRef,
	useState,
	type CSSProperties,
} from "react";
import { DiagramStage } from "@/components/react/diagram";
import { cn } from "@/lib/cn";
import type { DiagramFallbackProps } from "../container/DiagramFallback";

type Place = "url" | "worker";

const TOKEN = "ghp_example";
// Strong ease-in-out for on-screen movement.
const EASE_MOVE = "cubic-bezier(0.77, 0, 0.175, 1)";
const MOVE_MS = 450;

const OPTIONS: { id: Place; label: string }[] = [
	{ id: "url", label: "Token in the clone URL" },
	{ id: "worker", label: "Token in your Worker" },
];

const WORKER_TEXT: Record<Place, string> = {
	url: "Requests go straight to github.com.",
	worker: "Adds the token to requests for github.com.",
};

const LIVE: Record<Place, string> = {
	url: "The token is in the clone URL. Code from a test dependency reads it from .git/config.",
	worker:
		"The token is in your Worker, which adds it to requests for github.com. The .git/config file holds no token, and git pull still works.",
};

const tokenStyle = {
	color: "var(--color-brand)",
	backgroundColor: "color-mix(in oklch, var(--color-brand) 12%, transparent)",
};

function Token({
	hidden,
	className,
	style,
}: {
	hidden?: boolean;
	className?: string;
	style?: CSSProperties;
}) {
	return (
		<span
			aria-hidden={style ? true : undefined}
			className={cn(
				"inline-block rounded-sm px-1",
				hidden && "opacity-0",
				className,
			)}
			style={{ ...tokenStyle, ...style }}
		>
			{TOKEN}
		</span>
	);
}

function CardHeader({ children }: { children: string }) {
	return (
		<div className="flex items-center gap-2 border-b border-neutral-200 px-3 py-2 font-mono text-[10px] font-medium tracking-[0.15em] text-neutral-700 uppercase dark:border-neutral-800 dark:text-neutral-300">
			<span
				aria-hidden="true"
				className="size-1.5"
				style={{ backgroundColor: "var(--color-brand)" }}
			/>
			{children}
		</div>
	);
}

const card =
	"overflow-hidden rounded-md border border-neutral-200 bg-white shadow-xs dark:border-neutral-800 dark:bg-neutral-900";

// Under reduced motion the token and the URL change place without moving.
function useReducedMotion() {
	const [reduce, setReduce] = useState(false);
	useEffect(() => {
		const query = window.matchMedia("(prefers-reduced-motion: reduce)");
		setReduce(query.matches);
		const onChange = () => setReduce(query.matches);
		query.addEventListener("change", onChange);
		return () => query.removeEventListener("change", onChange);
	}, []);
	return reduce;
}

export function SandboxCredentials(_props: DiagramFallbackProps) {
	const [place, setPlace] = useState<Place>("url");
	const [pos, setPos] = useState<{ x: number; y: number } | null>(null);
	const [moving, setMoving] = useState(false);
	const reduce = useReducedMotion();
	const rootRef = useRef<HTMLDivElement>(null);
	const urlRef = useRef<HTMLSpanElement>(null);
	const workerRef = useRef<HTMLSpanElement>(null);

	// Place the floating token over the slot for the current state.
	const measure = useCallback(() => {
		const root = rootRef.current;
		const slot = (place === "url" ? urlRef : workerRef).current;
		if (!root || !slot) return;
		const r = root.getBoundingClientRect();
		const s = slot.getBoundingClientRect();
		setPos({ x: s.left - r.left, y: s.top - r.top });
	}, [place]);

	useEffect(() => {
		measure();
		const root = rootRef.current;
		if (!root) return;
		const observer = new ResizeObserver(measure);
		observer.observe(root);
		return () => observer.disconnect();
	}, [measure]);

	// Enable the transition only after the first placement, so the token
	// does not fly in from the corner on load.
	useEffect(() => {
		if (!pos || moving) return;
		const id = requestAnimationFrame(() => setMoving(true));
		return () => cancelAnimationFrame(id);
	}, [pos, moving]);

	const floating = pos !== null;
	const inUrl = place === "url";

	return (
		<DiagramStage accent="var(--color-brand)" className="mt-4">
			<div className="flex justify-end p-2">
				<div
					role="group"
					aria-label="Where the token lives"
					className="flex flex-wrap overflow-hidden rounded-sm border border-neutral-200 bg-white shadow-xs dark:border-neutral-800 dark:bg-neutral-900"
				>
					{OPTIONS.map((opt) => {
						const active = place === opt.id;
						return (
							<button
								key={opt.id}
								type="button"
								aria-pressed={active}
								onClick={() => setPlace(opt.id)}
								className={cn(
									"cursor-pointer px-2.5 py-1.5 font-mono text-[10px] font-medium tracking-wider uppercase select-none",
									"border-r border-neutral-200 last:border-r-0 dark:border-neutral-800",
									"transition-[color,background-color,transform] duration-150 ease-out active:scale-[0.97]",
									active
										? "text-primary bg-primary/[0.08] dark:bg-primary/[0.12]"
										: "text-neutral-500 hover:bg-neutral-50 dark:text-neutral-400 dark:hover:bg-neutral-800/40",
								)}
							>
								{opt.label}
							</button>
						);
					})}
				</div>
			</div>

			<div
				ref={rootRef}
				className="relative mx-auto flex max-w-[34rem] flex-col gap-6 px-3 pt-2 pb-5 font-mono text-[11px] leading-[1.7] sm:px-6 sm:text-xs"
			>
				<div className={card}>
					<CardHeader>Your Worker</CardHeader>
					<div className="flex items-center justify-between gap-3 px-3 py-2.5">
						<span className="grid text-neutral-700 dark:text-neutral-300">
							{OPTIONS.map((opt) => (
								<span
									key={opt.id}
									aria-hidden={place !== opt.id || undefined}
									className={cn(
										"col-start-1 row-start-1 transition-opacity duration-200 ease-out",
										place === opt.id ? "opacity-100" : "opacity-0",
									)}
								>
									{WORKER_TEXT[opt.id]}
								</span>
							))}
						</span>
						<span
							className={cn(
								"shrink-0 rounded-sm border border-dashed transition-colors duration-200 ease-out",
								inUrl
									? "border-neutral-300 dark:border-neutral-700"
									: "border-transparent",
							)}
						>
							<span ref={workerRef} aria-hidden={inUrl || undefined}>
								<Token hidden={floating || inUrl} />
							</span>
						</span>
					</div>
				</div>

				<div className={card}>
					<CardHeader>Sandbox</CardHeader>
					<div className="px-3 py-2.5 text-neutral-700 dark:text-neutral-300">
						<p className="text-neutral-400 dark:text-neutral-500">
							# the agent
						</p>
						<p>
							<span className="text-neutral-400 select-none">$ </span>git pull
						</p>
						<p>Already up to date.</p>
						<p className="mt-3 text-neutral-400 dark:text-neutral-500">
							# code from a test dependency
						</p>
						<p>
							<span className="text-neutral-400 select-none">$ </span>cat
							.git/config
						</p>
						<p>[remote "origin"]</p>
						<p className="pl-[2ch] [overflow-wrap:anywhere]">
							url = https://
							<span
								aria-hidden={!inUrl || undefined}
								onTransitionEnd={measure}
								className="inline-block overflow-hidden align-top whitespace-nowrap"
								style={{
									maxWidth: inUrl ? "calc(12ch + 0.5rem)" : 0,
									transition:
										moving && !reduce
											? `max-width ${MOVE_MS - 100}ms ${EASE_MOVE} ${inUrl ? 0 : 100}ms`
											: undefined,
								}}
							>
								<span ref={urlRef}>
									<Token hidden={floating} />
								</span>
								@
							</span>
							github.com/acme/app.git
						</p>
					</div>
				</div>

				{/* The one token that moves. */}
				{pos && (
					<Token
						className="pointer-events-none absolute top-0 left-0"
						style={{
							transform: `translate(${pos.x}px, ${pos.y}px)`,
							transition:
								moving && !reduce
									? `transform ${MOVE_MS}ms ${EASE_MOVE}`
									: undefined,
						}}
					/>
				)}
			</div>

			<div className="sr-only" role="status" aria-live="polite">
				{LIVE[place]}
			</div>
		</DiagramStage>
	);
}

export default SandboxCredentials;
