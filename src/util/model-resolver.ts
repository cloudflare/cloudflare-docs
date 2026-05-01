import { getCollection } from "astro:content";
import type { AiModelCard, AiModelDetail } from "~/schemas/ai-model-catalog";

import type { ModelCardData, ResolvedModel } from "./model-types";

// Re-export client-safe helpers and types for convenience
export { getModelAuthor } from "./model-helpers";
export type { ResolvedModel, ModelCardData } from "./model-types";
export type { ApiMode } from "./model-types";

const MIDDLECACHE_BASE = "https://middlecache.ced.cloudflare.com/";
const MODEL_DETAIL_BASE = `${MIDDLECACHE_BASE}v1/workers-ai-model-catalog/models/`;

/**
 * Convert a middlecache AiModelCard to the ResolvedModel format expected by
 * components. Card entries don't carry schema or examples — those are fetched
 * separately via fetchModelDetail for detail pages.
 */
function cardToResolved(card: AiModelCard): ResolvedModel {
	return {
		name: card.model_id,
		modelId: card.model_id,
		// Use model_id as slug (preserving @) to match the URL structure that
		// ModelDetailPage uses for schemaBasePath and that getStaticPaths emits.
		// The middlecache card.slug has @ stripped (R2 path key) — we don't use it here.
		slug: card.model_id,
		displayName: card.display_name,
		description: card.description,
		task: card.task,
		// Schema is not present in card data. Detail pages call fetchModelDetail.
		schema: { input: {}, output: {} },
		apiModes: undefined,
		tags: card.tags,
		contextLength: card.context_length ?? undefined,
		maxOutputTokens: card.max_output_tokens ?? undefined,
		supportsAsync: card.supports_async,
		metadata: card.metadata,
		coverImageUrl: card.cover_image_url ?? undefined,
		externalInfo: card.external_info ?? undefined,
		terms: card.terms ?? undefined,
		id: card.model_id,
		source: card.data_source === "catalog" ? 2 : 1,
		created_at: card.created_at ?? undefined,
		properties: card.properties,
		dataSource: card.data_source,
		hosting: card.hosting,
	};
}

/**
 * Convert a middlecache AiModelDetail to ResolvedModel, including schema
 * and examples for rendering detail pages.
 */
function detailToResolved(detail: AiModelDetail): ResolvedModel {
	// schema is not in detail.json — it lives in separate R2 files proxied at
	// request time. Keep schema empty so hasSchema is false (Parameters hidden).
	const schema = { input: {}, output: {} };

	// Extract filenames from full R2 paths in schema_manifest for the
	// "API Schemas (Raw)" section (e.g. "v1/.../sync-input.json" → "sync-input.json")
	const schemaFiles = detail.schema_manifest.files.map((r2Path) =>
		r2Path.split("/").at(-1)!,
	);

	return {
		name: detail.model_id,
		modelId: detail.model_id,
		// Use model_id as slug (preserving @) — matches URL structure.
		slug: detail.model_id,
		displayName: detail.display_name,
		description: detail.description,
		task: detail.task,
		schema,
		apiModes: undefined,
		schemaFiles,
		tags: detail.tags,
		contextLength: detail.context_length ?? undefined,
		maxOutputTokens: detail.max_output_tokens ?? undefined,
		supportsAsync: detail.supports_async,
		metadata: detail.metadata ?? {},
		coverImageUrl: detail.cover_image_url ?? undefined,
		externalInfo: detail.external_info ?? undefined,
		terms: detail.terms ?? undefined,
		codeSnippets: detail.code_snippets,
		examples: detail.examples,
		defaultExample: detail.default_example ?? undefined,
		id: detail.model_id,
		source: detail.data_source === "catalog" ? 2 : 1,
		created_at: detail.created_at ?? undefined,
		properties: detail.properties,
		dataSource: detail.data_source,
		hosting: detail.hosting,
	};
}

/**
 * Get all models for the /ai/models/ index page.
 * Reads card-only data from the middlecache ai-catalog collection.
 */
export async function getResolvedModels(): Promise<ResolvedModel[]> {
	const entries = await getCollection("ai-catalog");
	return entries.map((e) => cardToResolved(e.data));
}

/**
 * Get Workers AI-only models for the /workers-ai/models/ index page.
 * Reads card-only data from the middlecache workers-ai-catalog collection.
 */
export async function getLegacyModels(): Promise<ResolvedModel[]> {
	const entries = await getCollection("workers-ai-catalog");
	return entries.map((e) => cardToResolved(e.data));
}

/**
 * Fetch full model detail from middlecache for a single model detail page.
 * Called at build time in getStaticPaths for [...name].astro pages.
 *
 * @param slug - The detail file slug: model_id with leading @ stripped.
 *               e.g. "@cf/meta/llama-3.1-8b" → "cf/meta/llama-3.1-8b"
 *               e.g. "openai/gpt-5.4-mini"   → "openai/gpt-5.4-mini"
 */
export async function fetchModelDetail(
	slug: string,
): Promise<ResolvedModel | null> {
	const url = `${MODEL_DETAIL_BASE}${slug}/detail.json`;
	try {
		const res = await fetch(url);
		if (!res.ok) {
			console.warn(`fetchModelDetail: ${res.status} for ${url}`);
			return null;
		}
		const detail = (await res.json()) as AiModelDetail;
		return detailToResolved(detail);
	} catch (err) {
		console.warn(`fetchModelDetail: failed to fetch ${url}:`, err);
		return null;
	}
}

/**
 * Project a ResolvedModel to ModelCardData, stripping heavy fields
 * (schema, apiModes, codeSnippets, examples, metadata, etc.) that are
 * not needed by the catalog index pages.
 */
export function toModelCardData(model: ResolvedModel): ModelCardData {
	return {
		name: model.name,
		modelId: model.modelId,
		slug: model.slug,
		displayName: model.displayName,
		description: model.description,
		task: model.task,
		tags: model.tags,
		contextLength: model.contextLength,
		maxOutputTokens: model.maxOutputTokens,
		supportsAsync: model.supportsAsync,
		id: model.id,
		source: model.source,
		created_at: model.created_at,
		properties: model.properties,
		dataSource: model.dataSource,
		hosting: model.hosting,
		zdrComment: model.zdrComment,
	};
}
