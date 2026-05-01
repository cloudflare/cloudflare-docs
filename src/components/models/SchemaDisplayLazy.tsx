/**
 * SchemaDisplayLazy — client-side schema fetcher + renderer.
 *
 * Accepts a URL to a raw JSON Schema file (served from R2 via the worker proxy),
 * fetches it when the component becomes visible, processes it with
 * @stoplight/json-schema-tree (same logic as SchemaDisplay.astro), and renders
 * the result via SchemaTree / SchemaVariantSelector.
 *
 * This avoids fetching schema files at build time, keeping build fast.
 */

import { useState, useEffect, useRef } from "react";
import {
	SchemaTree,
	SchemaCombinerName,
	type SchemaNode,
	type RegularNode,
	type SchemaTreeRefDereferenceFn,
} from "@stoplight/json-schema-tree";
import { type Dictionary } from "@stoplight/types";
import { resolveInlineRef } from "@stoplight/json";

import SchemaTreeView from "./SchemaTree.tsx";
import SchemaVariantSelector from "./SchemaVariantSelector.tsx";
import type { SchemaRowData } from "./types";

// ── Schema processing (mirrors SchemaDisplay.astro logic) ─────────────────────

const SKIP_KEYS = new Set([
	"type", "properties", "items", "required", "description", "default",
	"enum", "oneOf", "anyOf", "allOf", "title", "additionalProperties",
]);

const shouldSkipKey = (key: string) =>
	SKIP_KEYS.has(key) || key.startsWith("$") || key.startsWith("x-");

const defaultResolver: SchemaTreeRefDereferenceFn =
	(contextObject: object) =>
	({ pointer }: { source: string | null; pointer: string | null }, _: unknown, currentObject?: object) => {
		const activeObject = contextObject ?? currentObject;
		if (pointer === null) return null;
		if (pointer === "#") return activeObject;
		const resolved = resolveInlineRef(activeObject as Dictionary<string>, pointer);
		if (resolved) return resolved;
		throw new ReferenceError(`Could not resolve '${pointer}'`);
	};

function isFlatSchema(schema: Record<string, unknown>): boolean {
	if (schema.properties) return false;
	const variants = (schema.oneOf || schema.anyOf) as Record<string, unknown>[] | undefined;
	if (variants?.some((v) => v.properties)) return false;
	return !!(schema.type || schema.contentType || schema.format);
}

function flatSchemaToRows(schema: Record<string, unknown>): SchemaRowData[] {
	return Object.keys(schema).map((key, i, arr) => ({
		id: key, name: key, type: String(schema[key]),
		isArray: false, isObject: false, isOneOf: false,
		isOneOfChild: false, isFirstOneOfChild: false, isLastOneOfChild: false,
		required: false, defaultValue: undefined, description: undefined,
		enumValues: undefined, metadata: undefined,
		depth: 0, isLast: i === arr.length - 1, ancestorIsLast: [],
		children: undefined,
	}));
}

function collectRows(
	nodes: SchemaNode[] | undefined,
	depth: number,
	ancestorIsLast: boolean[],
	parentPath = "",
): SchemaRowData[] {
	if (!nodes) return [];
	const rows: SchemaRowData[] = [];

	const validNodes = nodes.filter((node) => {
		const reg = node as RegularNode;
		const rawName = reg.subpath?.[reg.subpath.length - 1];
		if (rawName === undefined || rawName === "") return false;
		const parentProperties = reg.parent?.fragment?.properties;
		if (parentProperties && !(String(rawName) in (parentProperties as object))) return false;
		return true;
	});

	for (let i = 0; i < validNodes.length; i++) {
		const reg = validNodes[i] as RegularNode;
		const name = String(reg.subpath?.[reg.subpath.length - 1] ?? "");
		const isLast = i === validNodes.length - 1;
		const id = parentPath ? `${parentPath}.${name}` : name;

		const parentRequired = reg.parent?.fragment?.required;
		const required = Array.isArray(parentRequired)
			? (parentRequired as string[]).includes(name) : false;

		const isArray = reg.primaryType === "array";
		const isObject = reg.primaryType === "object";
		const hasOneOf = reg.combiners?.includes(SchemaCombinerName.OneOf) ?? false;
		const hasAnyOf = reg.combiners?.includes(SchemaCombinerName.AnyOf) ?? false;

		let isNullable = false;
		let nullableType: string | undefined;
		let nullableChildDescription: string | undefined;
		if ((hasOneOf || hasAnyOf) && reg.children?.length === 2) {
			const childTypes = reg.children.map((c) => String((c as RegularNode).primaryType ?? ""));
			const nullIndex = childTypes.findIndex((t) => t === "null");
			if (nullIndex !== -1) {
				const nonNullIndex = nullIndex === 0 ? 1 : 0;
				const nonNullChild = reg.children[nonNullIndex] as RegularNode;
				nullableType = childTypes[nonNullIndex];
				nullableChildDescription = nonNullChild.annotations?.description as string | undefined;
				isNullable = true;
			}
		}

		const isOneOf = (hasOneOf || hasAnyOf) && !isNullable;
		const type = isNullable && nullableType
			? `${nullableType} | null`
			: isOneOf ? "one of" : (reg.primaryType ?? "");

		const defaultValue = reg.annotations?.default !== undefined
			? String(reg.annotations.default) : undefined;
		const description = (reg.annotations?.description as string | undefined) ?? nullableChildDescription;
		const enumValues = ((reg.validations?.enum as unknown[]) ??
			((reg.fragment as Record<string, unknown>)?.enum as unknown[]))?.map(String);

		const metadata: Record<string, string | number | boolean> = {};
		const fragment = reg.fragment as Record<string, unknown>;
		if (fragment) {
			for (const [key, value] of Object.entries(fragment)) {
				if (!shouldSkipKey(key) && (typeof value === "string" || typeof value === "number" || typeof value === "boolean")) {
					metadata[key] = value;
				}
			}
		}
		if (reg.validations) {
			for (const [key, value] of Object.entries(reg.validations)) {
				if (!shouldSkipKey(key) && key !== "enum" && (typeof value === "string" || typeof value === "number" || typeof value === "boolean")) {
					metadata[key] = value;
				}
			}
		}
		if (isArray && reg.children?.length === 1) {
			const itemsNode = reg.children[0] as RegularNode;
			const itemsFragment = itemsNode.fragment as Record<string, unknown>;
			if (itemsFragment?.format && typeof itemsFragment.format === "string") {
				metadata["format"] = itemsFragment.format;
			}
		}

		let children: SchemaRowData[] | undefined;
		if (reg.children?.length && !isNullable) {
			if (isArray && reg.children.length === 1) {
				const itemsNode = reg.children[0] as RegularNode;
				const itemsName = String(itemsNode.subpath?.[itemsNode.subpath.length - 1] ?? "");
				if (itemsName === "items" && itemsNode.children?.length) {
					children = collectRows(itemsNode.children, depth + 1, [...ancestorIsLast, isLast], id);
				} else {
					children = collectRows(reg.children, depth + 1, [...ancestorIsLast, isLast], id);
				}
			} else {
				children = collectRows(reg.children, depth + 1, [...ancestorIsLast, isLast], id);
			}
		}

		let displayName = name;
		const parentReg = reg.parent as RegularNode | undefined;
		const isOneOfChild = parentReg?.combiners?.includes(SchemaCombinerName.OneOf);
		const isAnyOfChild = parentReg?.combiners?.includes(SchemaCombinerName.AnyOf);
		if (isOneOfChild || isAnyOfChild) {
			const frag = reg.fragment as Record<string, unknown>;
			const title = reg.title ?? ((reg.annotations as Record<string, unknown>)?.title as string | undefined) ?? (frag?.title as string | undefined);
			if (title) {
				displayName = title;
			} else {
				const properties = frag?.properties as Record<string, Record<string, unknown>> | undefined;
				const roleEnum = properties?.role?.enum as string[] | undefined;
				if (roleEnum && roleEnum.length === 1) {
					displayName = `${roleEnum[0]} message`;
				} else {
					const nestedOneOf = frag?.oneOf as Record<string, unknown>[] | undefined;
					if (nestedOneOf && nestedOneOf.length > 0 && nestedOneOf[0]?.title) {
						displayName = `${nestedOneOf[0].title as string} format`;
					} else if (properties) {
						const props = Object.keys(properties);
						displayName = props.includes("requests") ? "Batch request" : `Option ${Number(name) + 1}`;
					} else {
						displayName = `Option ${Number(name) + 1}`;
					}
				}
			}
		}

		rows.push({
			id, name: displayName, type, isArray, isObject, isOneOf,
			isOneOfChild: !!(isOneOfChild || isAnyOfChild),
			isFirstOneOfChild: !!(isOneOfChild || isAnyOfChild) && i === 0,
			isLastOneOfChild: !!(isOneOfChild || isAnyOfChild) && isLast,
			required, defaultValue, description, enumValues,
			metadata: Object.keys(metadata).length > 0 ? metadata : undefined,
			depth, isLast, ancestorIsLast, children,
		});
	}
	return rows;
}

type SchemaVariant = { title: string; rows: SchemaRowData[] };

function processSchema(schema: Record<string, unknown>): SchemaRowData[] {
	const tree = new SchemaTree(schema, { mergeAllOf: true, refResolver: defaultResolver, maxRefDepth: 3 });
	tree.populate();
	const topNodes = (tree.root.children[0] as RegularNode)?.children ?? undefined;
	return collectRows(topNodes, 0, []);
}

function getTopLevelVariants(schema: Record<string, unknown>): SchemaVariant[] | null {
	const variants = (schema.oneOf || schema.anyOf) as Record<string, unknown>[] | undefined;
	if (!variants || variants.length < 2) return null;
	const titled = variants.map((v, i) => ({ title: (v.title as string) || `Option ${i + 1}`, schema: v }));
	const hasRealTitle = variants.some((v) => v.title);
	return hasRealTitle ? titled.map((v) => ({ title: v.title, rows: processSchema(v.schema) })) : null;
}

function buildDisplay(schema: Record<string, unknown>): {
	rows: SchemaRowData[];
	variants: SchemaVariant[] | null;
	isFlat: boolean;
} {
	const isFlat = isFlatSchema(schema);
	const variants = isFlat ? null : getTopLevelVariants(schema);
	const rows = isFlat
		? flatSchemaToRows(schema)
		: variants ? [] : processSchema(schema);
	return { rows, variants, isFlat };
}

// ── Component ─────────────────────────────────────────────────────────────────

interface Props {
	url: string;
	title: "Input" | "Output";
	schemaId: string;
}

export default function SchemaDisplayLazy({ url, title, schemaId }: Props) {
	const [state, setState] = useState<
		| { status: "idle" }
		| { status: "loading" }
		| { status: "error"; message: string }
		| { status: "ready"; rows: SchemaRowData[]; variants: SchemaVariant[] | null }
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
							return r.json() as Promise<Record<string, unknown>>;
						})
						.then((schema) => {
							const { rows, variants } = buildDisplay(schema);
							setState({ status: "ready", rows, variants });
						})
						.catch((err) => {
							setState({ status: "error", message: String(err) });
						});
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
						<circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
						<path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
					</svg>
					Loading parameters…
				</div>
			) : state.status === "error" ? (
				<p className="py-4 text-sm text-gray-400 dark:text-gray-500">
					Could not load schema.
				</p>
			) : state.variants && state.variants.length > 0 ? (
				<SchemaVariantSelector
					variants={state.variants}
					schemaId={schemaId}
					hideRequired={hideRequired}
				/>
			) : state.rows.length === 0 ? (
				<p className="py-4 text-sm text-gray-400 dark:text-gray-500">
					No parameters defined.
				</p>
			) : (
				<SchemaTreeView
					rows={state.rows}
					schemaId={schemaId}
					hideRequired={hideRequired}
				/>
			)}
		</div>
	);
}
