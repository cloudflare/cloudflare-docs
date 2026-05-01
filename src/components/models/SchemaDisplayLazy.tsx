/**
 * SchemaDisplayLazy — client-side schema rows fetcher + renderer.
 *
 * Fetches pre-processed SchemaRowData[] from a .rows.json file served
 * from R2 via the worker proxy, then renders via SchemaTree /
 * SchemaVariantSelector. Schema processing (json-schema-tree) is done
 * at pipeline build time in the middlecache, not in the browser.
 *
 * The URL passed in should be the .rows.json path, e.g.:
 *   /workers-ai/models/llama/sync-input.rows.json
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

interface Props {
	url: string;
	title: "Input" | "Output";
	schemaId: string;
}

export default function SchemaDisplayLazy({ url, title, schemaId }: Props) {
	const [state, setState] = useState<
		| { status: "idle" }
		| { status: "loading" }
		| { status: "error" }
		| { status: "ready"; payload: RowsPayload }
	>({ status: "idle" });

	const ref = useRef<HTMLDivElement>(null);
	const hideRequired = title === "Output";

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
							return r.json() as Promise<RowsPayload>;
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
			) : state.payload.variants && state.payload.variants.length > 0 ? (
				<SchemaVariantSelector
					variants={state.payload.variants}
					schemaId={schemaId}
					hideRequired={hideRequired}
				/>
			) : state.payload.rows.length === 0 ? (
				<p className="py-4 text-sm text-gray-400 dark:text-gray-500">
					No parameters defined.
				</p>
			) : (
				<SchemaTreeView
					rows={state.payload.rows}
					schemaId={schemaId}
					hideRequired={hideRequired}
				/>
			)}
		</div>
	);
}
