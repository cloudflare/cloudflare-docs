/**
 * Middlecache-backed model resolver. Reads from the `ai-catalog` and
 * `workers-ai-catalog` content collections (populated from middlecache at
 * build time) and produces unified `ModelView` objects for both the
 * catalog index pages and the per-model detail pages.
 *
 * Card data (from the collections) is sufficient for the index pages.
 * Detail-page schema data is fetched via `fetchAllModelDetails()` which
 * downloads `all-models-detail.json` from middlecache.
 */
import { getCollection } from "astro:content";
import fs from "node:fs";
import { join } from "node:path";

import { authorData } from "~/components/models/data";
import { downloadToDotTempIfNotPresent } from "~/util/custom-loaders";
import type { AiModelCard, AiModelDetail } from "~/schemas/ai-model-catalog";
import type { ModelBanner, ModelExample } from "./model-types";
import type { ModelCardData, ModelView } from "./model-types";
import { getModelAuthor } from "./model-helpers";
import { CAPABILITY_PROPERTIES } from "./model-properties";

const MIDDLECACHE_BASE = "https://middlecache.ced.cloudflare.com/";
const ALL_MODELS_DETAIL_PATH =
	"v1/workers-ai-model-catalog/all-models-detail.json";

const isTrue = (v: unknown): boolean => v === true || v === "true";

/** Display name from the author table, falling back to the raw id. */
const authorDisplayName = (author: string): string =>
	authorData[author]?.name ?? author;

/**
 * Returns the absolute path to the .tmp/ directory at the repo root.
 * Uses process.cwd() rather than import.meta.url — the latter resolves
 * relative to the compiled output location (dist/) during astro build,
 * which is wrong. process.cwd() is always the repo root.
 */
export function getDotTmpPath(): string {
	return join(process.cwd(), ".tmp");
}

function buildView(args: {
	id: string;
	name: string;
	slug: string;
	displayName: string;
	dataSource: "catalog" | "legacy";
	source: number;
	hosting: "hosted" | "proxied";
	task: string;
	description: string;
	properties: Record<string, unknown>;
	propertiesList: { property_id: string; value: unknown }[];
	schema: { input: Record<string, unknown>; output: Record<string, unknown> };
	createdAt?: string;
	zdrComment?: string | null;
	modelId?: string;
	requestFormats?: string[] | null;
	examples?: ModelExample[];
	banner?: ModelBanner | null;
	schemaFiles?: string[];
}): ModelView {
	const author = getModelAuthor(args.name);
	const capabilities = args.propertiesList
		.filter((p) => p.property_id in CAPABILITY_PROPERTIES && p.value === "true")
		.map((p) => CAPABILITY_PROPERTIES[p.property_id].label);

	return {
		id: args.id,
		name: args.name,
		slug: args.slug,
		shortName: args.name.split("/").at(-1) ?? args.name,
		displayName: args.displayName,
		author,
		authorName: authorDisplayName(author),
		hosting: args.hosting,
		dataSource: args.dataSource,
		source: args.source,
		task: args.task,
		description: args.description,
		capabilities,
		beta: isTrue(args.properties.beta),
		createdAt: args.createdAt,
		properties: args.properties,
		propertiesList: args.propertiesList,
		modelId: args.modelId,
		requestFormats: args.requestFormats ?? null,
		examples: args.examples,
		banner: args.banner ?? null,
		schema: args.schema,
		zdrComment: args.zdrComment ?? null,
		schemaFiles: args.schemaFiles,
	};
}

/**
 * Middlecache card → `ModelView`. The middlecache `properties` array is
 * already in the `{ property_id, value }` shape — use it directly as
 * `propertiesList` and build the `properties` map from it.
 */
function cardToView(card: AiModelCard): ModelView {
	const propertiesList = card.properties;
	const properties: Record<string, unknown> = {};
	for (const p of propertiesList) {
		properties[p.property_id] = p.value;
	}

	return buildView({
		id: card.model_id,
		name: card.model_id,
		slug: card.model_id,
		displayName: card.display_name,
		dataSource: card.data_source,
		source: card.data_source === "catalog" ? 2 : 1,
		hosting: card.hosting,
		task: card.task.name,
		description: card.description,
		properties,
		propertiesList,
		schema: { input: {}, output: {} },
		createdAt: card.created_at ?? undefined,
		modelId: card.model_id,
	});
}

/**
 * Middlecache detail → `ModelView`. Includes examples and schema manifest
 * data. Schema itself is NOT in the detail JSON — it lives in separate R2
 * files fetched at request time via the schema proxy. `schemaFiles` carries
 * the raw filenames for download links.
 */
function detailToView(detail: AiModelDetail): ModelView {
	const propertiesList = detail.properties;
	const properties: Record<string, unknown> = {};
	for (const p of propertiesList) {
		properties[p.property_id] = p.value;
	}

	const schemaFiles = detail.schema_manifest.raw_files.filter(
		(f) => !f.endsWith(".rows.json"),
	);

	return buildView({
		id: detail.model_id,
		name: detail.model_id,
		slug: detail.model_id,
		displayName: detail.display_name,
		dataSource: detail.data_source,
		source: detail.data_source === "catalog" ? 2 : 1,
		hosting: detail.hosting,
		task: detail.task.name,
		description: detail.description,
		properties,
		propertiesList,
		schema: { input: {}, output: {} },
		createdAt: detail.created_at ?? undefined,
		modelId: detail.model_id,
		examples: detail.examples,
		schemaFiles,
	});
}

/**
 * All models for the /ai/models/ index page.
 * Reads card-only data from the middlecache ai-catalog collection.
 */
export async function getResolvedModels(): Promise<ModelView[]> {
	const entries = await getCollection("ai-catalog");
	return entries.map((e) => cardToView(e.data));
}

/**
 * Workers AI-only models for the /workers-ai/models/ index page.
 * Reads card-only data from the middlecache workers-ai-catalog collection.
 */
export async function getLegacyModels(): Promise<ModelView[]> {
	const entries = await getCollection("workers-ai-catalog");
	return entries.map((e) => cardToView(e.data));
}

/**
 * Fetch all model detail data from middlecache in a single request.
 * Returns a map of slug (@ stripped) → ModelView.
 */
export async function fetchAllModelDetails(): Promise<Map<string, ModelView>> {
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

	const map = new Map<string, ModelView>();
	for (const [slug, detail] of Object.entries(raw.models)) {
		map.set(slug, detailToView(detail));
	}

	if (map.size === 0) {
		throw new Error(
			"all-models-detail.json: no models loaded — refusing to build with empty model set",
		);
	}

	return map;
}

/** Strip the heavy `schema` blob for the catalog index pages. */
export function toModelCardData(model: ModelView): ModelCardData {
	const { schema: _schema, ...card } = model;
	return card;
}
