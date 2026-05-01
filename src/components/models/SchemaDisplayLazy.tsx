/**
 * SchemaDisplayLazy — fetches parameters.json and replicates production layout.
 *
 * parameters.json shape (from middlecache):
 *   flat:  { flat: true,  modes: null, input: RowsPayload, output: RowsPayload }
 *   multi: { flat: false, modes: ["sync","streaming","batch"],
 *             sync: { input: RowsPayload, output: RowsPayload }, ... }
 *
 * Replicates the production ModelDetailPage layout:
 *   - Flat: Input tab + Output tab (via SchemaDisplay.astro equivalent)
 *   - Multi, shared input: "Input" once + per-mode output collapsibles
 *   - Multi, differing inputs: per-mode collapsibles with Input/Output tabs
 */

import { useState, useEffect, useRef, useCallback } from "react";
import SchemaTreeView from "./SchemaTree.tsx";
import SchemaVariantSelector from "./SchemaVariantSelector.tsx";
import type { SchemaRowData } from "./types";

type SchemaVariant = { title: string; rows: SchemaRowData[] };

interface RowsPayload {
	rows: SchemaRowData[];
	variants: SchemaVariant[] | null;
	isFlat: boolean;
}

interface ParametersPayload {
	flat: boolean;
	modes: string[] | null;
	input?: RowsPayload; // flat model
	output?: RowsPayload; // flat model
	[mode: string]: unknown; // multi-mode entries
}

// Mode display names matching production
const MODE_NAMES: Record<string, string> = {
	sync: "Synchronous",
	streaming: "Streaming",
	batch: "Batch",
};
const MODE_DESCRIPTIONS: Record<string, string> = {
	sync: "Send a request and receive a complete response",
	streaming:
		"Send a request with `stream: true` and receive server-sent events",
	batch: "Send multiple requests in a single API call",
};

function RowsDisplay({
	payload,
	schemaId,
	hideRequired,
}: {
	payload: RowsPayload;
	schemaId: string;
	hideRequired: boolean;
}) {
	if (payload.variants && payload.variants.length > 0) {
		return (
			<SchemaVariantSelector
				variants={payload.variants}
				schemaId={schemaId}
				hideRequired={hideRequired}
			/>
		);
	}
	if (!payload.rows || payload.rows.length === 0) {
		return (
			<p className="text-sm text-gray-500 dark:text-gray-400">
				No parameters defined.
			</p>
		);
	}
	return (
		<SchemaTreeView
			rows={payload.rows}
			schemaId={schemaId}
			hideRequired={hideRequired}
		/>
	);
}

function ModeDetails({
	modeId,
	modeData,
	schemaId,
	inputLabel,
}: {
	modeId: string;
	modeData: { input: RowsPayload; output: RowsPayload };
	schemaId: string;
	inputLabel?: string; // if set, render input with this label (shared-input path)
}) {
	const [open, setOpen] = useState(false);
	const name = MODE_NAMES[modeId] ?? modeId;
	const description = MODE_DESCRIPTIONS[modeId];

	return (
		<details
			className="group rounded-lg border border-gray-200 p-0 py-3 dark:border-gray-700"
			onToggle={(e) => setOpen((e.target as HTMLDetailsElement).open)}
		>
			<summary className="cursor-pointer px-8 font-medium text-gray-900 dark:text-gray-100">
				<span>{name}</span>
				{description && (
					<span className="ml-2 text-sm font-normal text-gray-500 dark:text-gray-400">
						— {description}
					</span>
				)}
			</summary>
			{open && (
				<div className="border-t border-gray-200 p-4 pb-1 dark:border-gray-700">
					{inputLabel ? (
						// shared-input path: only show output inside details
						<RowsDisplay
							payload={modeData.output}
							schemaId={`${schemaId}-${modeId}-output`}
							hideRequired={true}
						/>
					) : (
						// differing-inputs path: show both input and output
						<>
							<div className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
								Input
							</div>
							<RowsDisplay
								payload={modeData.input}
								schemaId={`${schemaId}-${modeId}-input`}
								hideRequired={false}
							/>
							<div className="mt-4 mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
								Output
							</div>
							<RowsDisplay
								payload={modeData.output}
								schemaId={`${schemaId}-${modeId}-output`}
								hideRequired={true}
							/>
						</>
					)}
				</div>
			)}
		</details>
	);
}

function ParametersContent({
	payload,
	schemaId,
}: {
	payload: ParametersPayload;
	schemaId: string;
}) {
	// Flat model: Input + Output sections
	if (payload.flat) {
		return (
			<>
				<h3 className="mt-4! mb-2! text-base font-semibold">Input</h3>
				<RowsDisplay
					payload={payload.input!}
					schemaId={`${schemaId}-input`}
					hideRequired={false}
				/>
				<h3 className="mt-6! mb-2! text-base font-semibold">Output</h3>
				<RowsDisplay
					payload={payload.output!}
					schemaId={`${schemaId}-output`}
					hideRequired={true}
				/>
			</>
		);
	}

	const modes = payload.modes ?? [];
	const modeEntries = modes.map(
		(id) =>
			[id, payload[id] as { input: RowsPayload; output: RowsPayload }] as const,
	);

	if (modeEntries.length === 0) return null;

	// Detect whether all modes share identical input (compare JSON)
	const firstInputJson = JSON.stringify(modeEntries[0][1].input);
	const allInputsIdentical = modeEntries.every(
		([, data]) => JSON.stringify(data.input) === firstInputJson,
	);

	if (allInputsIdentical) {
		// Shared input: render input once, then per-mode output collapsibles
		return (
			<>
				<h3 className="mt-4! mb-2! text-base font-semibold">Input</h3>
				<RowsDisplay
					payload={modeEntries[0][1].input}
					schemaId={`${schemaId}-input`}
					hideRequired={false}
				/>
				<h3 className="mt-6! mb-2! text-base font-semibold">Output</h3>
				<div className="space-y-3">
					{modeEntries.map(([id, data]) => (
						<ModeDetails
							key={id}
							modeId={id}
							modeData={data}
							schemaId={schemaId}
							inputLabel="shared"
						/>
					))}
				</div>
			</>
		);
	}

	// Differing inputs: per-mode collapsibles with Input/Output tabs
	return (
		<div className="space-y-3">
			{modeEntries.map(([id, data]) => (
				<ModeDetails key={id} modeId={id} modeData={data} schemaId={schemaId} />
			))}
		</div>
	);
}

interface Props {
	url: string;
	schemaId: string;
}

export default function SchemaDisplayLazy({ url, schemaId }: Props) {
	const [state, setState] = useState<
		| { status: "idle" }
		| { status: "loading" }
		| { status: "error" }
		| { status: "ready"; payload: ParametersPayload }
	>({ status: "idle" });

	const ref = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const el = ref.current;
		if (!el) return;

		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					observer.disconnect();
					setState({ status: "loading" });
					fetch(url)
						.then((r) => {
							if (!r.ok) throw new Error(`HTTP ${r.status}`);
							return r.json() as Promise<ParametersPayload>;
						})
						.then((payload) => setState({ status: "ready", payload }))
						.catch(() => setState({ status: "error" }));
				}
			},
			{ rootMargin: "200px" },
		);
		observer.observe(el);
		return () => observer.disconnect();
	}, [url]);

	return (
		<div ref={ref} className="schema-display">
			{state.status === "idle" || state.status === "loading" ? (
				<div className="flex items-center gap-2 py-4 text-sm text-gray-400 dark:text-gray-500">
					<svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
						<circle
							className="opacity-25"
							cx="12"
							cy="12"
							r="10"
							stroke="currentColor"
							strokeWidth="4"
						/>
						<path
							className="opacity-75"
							fill="currentColor"
							d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
						/>
					</svg>
					Loading parameters…
				</div>
			) : state.status === "error" ? (
				<p className="py-4 text-sm text-gray-400 dark:text-gray-500">
					Could not load schema.
				</p>
			) : (
				<ParametersContent payload={state.payload} schemaId={schemaId} />
			)}
		</div>
	);
}
