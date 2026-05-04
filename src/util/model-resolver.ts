import { getCollection } from "astro:content";
import type { AiModelCard, AiModelDetail } from "~/schemas/ai-model-catalog";
import { downloadToDotTempIfNotPresent } from "./custom-loaders";
import fs from "node:fs";

import { join } from "node:path";

import type { ModelCardData, ResolvedModel } from "./model-types";

// Re-export client-safe helpers and types for convenience
export { getModelAuthor } from "./model-helpers";
export type { ResolvedModel, ModelCardData } from "./model-types";
export type { ApiMode } from "./model-types";

const MIDDLECACHE_BASE = "https://middlecache.ced.cloudflare.com/";
const ALL_MODELS_DETAIL_PATH =
	"v1/workers-ai-model-catalog/all-models-detail.json";

/**
 * Returns the absolute path to the .tmp/ directory at the repo root.
 * Uses process.cwd() rather than import.meta.url — the latter resolves
 * relative to the compiled output location (dist/) during astro build,
 * which is wrong. process.cwd() is always the repo root.
 */
export function getDotTmpPath(): string {
	return join(process.cwd(), ".tmp");
}

/**
 * Convert a middlecache AiModelCard to the ResolvedModel format expected by
 * components. Card entries carry card-level fields only — schema and examples
 * are available via fetchAllModelDetails() for detail pages.
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
		// Schema is not present in card data — detail pages use fetchAllModelDetails().
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

	// schema_manifest.raw_files: filenames for "API Schemas (Raw)" download links.
	// Filter out .rows.json entries defensively — the worker proxy only serves
	// raw .json schema files; .rows.json would result in a 404 download link.
	const schemaFiles = detail.schema_manifest.raw_files.filter(
		(f) => !f.endsWith(".rows.json"),
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
 * Fetch all model detail data from middlecache in a single request.
 * Returns a map of slug (@ stripped) → ResolvedModel.
 *
 * Uses downloadToDotTempIfNotPresent to cache the file locally for the
 * build session — subsequent calls within the same build are free.
 *
 * Throws on failure so the build fails loudly rather than silently
 * generating broken detail page links from the index.
 */
export async function fetchAllModelDetails(): Promise<
	Map<string, ResolvedModel>
> {
	await downloadToDotTempIfNotPresent(
		`${MIDDLECACHE_BASE}${ALL_MODELS_DETAIL_PATH}`,
		`middlecache/${ALL_MODELS_DETAIL_PATH}`,
	);

	const localPath = join(
		getDotTmpPath(),
		"middlecache",
		ALL_MODELS_DETAIL_PATH,
	);
	const raw = JSON.parse(fs.readFileSync(localPath, "utf8")) as {
		model_count: number;
		models: Record<string, AiModelDetail>;
	};

	if (!raw.models || typeof raw.models !== "object") {
		throw new Error(
			`all-models-detail.json: expected .models to be an object, got ${typeof raw.models}`,
		);
	}

	const map = new Map<string, ResolvedModel>();
	for (const [slug, detail] of Object.entries(raw.models)) {
		map.set(slug, detailToResolved(detail));
	}

	if (map.size === 0) {
		throw new Error(
			"all-models-detail.json: no models loaded — refusing to build with empty model set",
		);
	}

	return map;
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
