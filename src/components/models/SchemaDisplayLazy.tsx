/**
 * SchemaDisplayLazy — client-side parameters fetcher + renderer.
 *
 * Fetches parameters.json (pre-processed SchemaRowData for all modes) from R2
 * via the worker proxy, then renders Input/Output tabs. For flat models renders
 * two tabs; for multi-mode models (sync/streaming/batch) renders the primary
 * mode (sync or flat) with Input/Output tabs.
 *
 * parameters.json shape:
 *   flat model:  { flat: true,  modes: null, input: RowsPayload, output: RowsPayload }
 *   multi-mode:  { flat: false, modes: ["sync","streaming","batch"], sync: { input, output }, ... }
 */

import { useState, useEffect, useRef } from "react";
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
	// flat model fields
	input?: RowsPayload;
	output?: RowsPayload;
	// multi-mode fields: keyed by mode id
	[mode: string]: unknown;
}

interface Props {
	url: string;
	schemaId: string;
}

function RowsPanel({
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
			<p className="py-4 text-sm text-gray-400 dark:text-gray-500">
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

	if (state.status === "idle" || state.status === "loading") {
		return (
			<div ref={ref} className="schema-display">
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
			</div>
		);
	}

	if (state.status === "error") {
		return (
			<div ref={ref} className="schema-display">
				<p className="py-4 text-sm text-gray-400 dark:text-gray-500">
					Could not load schema.
				</p>
			</div>
		);
	}

	const { payload } = state;

	// For flat models: render Input / Output tabs directly
	if (payload.flat) {
		const input = payload.input as RowsPayload | undefined;
		const output = payload.output as RowsPayload | undefined;
		return (
			<div ref={ref} className="schema-display">
				{/* Simple two-tab layout matching the build-time SchemaDisplay */}
				<div className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
					Input
				</div>
				{input ? (
					<RowsPanel
						payload={input}
						schemaId={`${schemaId}-input`}
						hideRequired={false}
					/>
				) : (
					<p className="py-4 text-sm text-gray-400 dark:text-gray-500">
						No input parameters defined.
					</p>
				)}
				<div className="mt-4 mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
					Output
				</div>
				{output ? (
					<RowsPanel
						payload={output}
						schemaId={`${schemaId}-output`}
						hideRequired={true}
					/>
				) : (
					<p className="py-4 text-sm text-gray-400 dark:text-gray-500">
						No output parameters defined.
					</p>
				)}
			</div>
		);
	}

	// For multi-mode models: show the primary mode (first in modes array, typically sync)
	const primaryMode = payload.modes?.[0];
	const modeData = primaryMode
		? (payload[primaryMode] as
				| { input: RowsPayload; output: RowsPayload }
				| undefined)
		: undefined;

	return (
		<div ref={ref} className="schema-display">
			{modeData ? (
				<>
					<div className="mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
						Input
					</div>
					<RowsPanel
						payload={modeData.input}
						schemaId={`${schemaId}-input`}
						hideRequired={false}
					/>
					<div className="mt-4 mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
						Output
					</div>
					<RowsPanel
						payload={modeData.output}
						schemaId={`${schemaId}-output`}
						hideRequired={true}
					/>
				</>
			) : (
				<p className="py-4 text-sm text-gray-400 dark:text-gray-500">
					No parameters defined.
				</p>
			)}
		</div>
	);
}
