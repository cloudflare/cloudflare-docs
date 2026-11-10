/**
 * Resolves `catalog-models` rows into a unified `ModelView`. The collection
 * holds every model: Cloudflare-hosted Workers AI models (`@cf/*`) and
 * third-party / proxied models. Hosting is a function of the `model_id`
 * namespace.
 */
import { getCollection, type CollectionEntry } from "astro:content";
import { authorData } from "~/components/models/data";
import type {
	ModelBanner,
	ModelCardData,
	ModelExample,
	ModelProvider,
	ModelView,
} from "./model-types";
import { getModelAuthor } from "./model-helpers";
import { CAPABILITY_PROPERTIES } from "./model-properties";
import { pinnedModelNames } from "./facets";

export type CatalogEntry = CollectionEntry<"catalog-models">;

const isTrue = (v: unknown): boolean => v === true || v === "true";

/** Display name from the author table, falling back to the raw id. */
const authorDisplayName = (author: string): string =>
	authorData[author]?.name ?? author;

/**
 * Pinned-first sort tier. The hardcoded `pinnedModelNames` list keeps its
 * explicit order and wins; models pinned by the API's `pinned` flag sort
 * after it, tied with each other (the catalog breaks ties by date). The list
 * stays until `@cf/*` models carry the flag too.
 */
function pinnedIndexFor(name: string, pinned: boolean | undefined): number {
	const listed = pinnedModelNames.indexOf(name);
	if (listed >= 0) return listed;
	return pinned ? pinnedModelNames.length : -1;
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
	tags: string[];
	properties: Record<string, unknown>;
	propertiesList: { property_id: string; value: unknown }[];
	schema: { input: Record<string, unknown>; output: Record<string, unknown> };
	createdAt?: string;
	zdrComment?: string | null;
	modelId?: string;
	requestFormats?: string[] | null;
	pricing?: Record<string, unknown>;
	modelProviders?: ModelProvider[] | null;
	examples?: ModelExample[];
	banner?: ModelBanner | null;
	pinned?: boolean;
	digest?: number | string;
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
		tags: args.tags,
		capabilities,
		beta: isTrue(args.properties.beta),
		createdAt: args.createdAt,
		properties: args.properties,
		propertiesList: args.propertiesList,
		modelId: args.modelId,
		requestFormats: args.requestFormats ?? null,
		pricing: args.pricing,
		modelProviders: args.modelProviders ?? null,
		examples: args.examples,
		banner: args.banner ?? null,
		pinnedIndex: pinnedIndexFor(args.name, args.pinned),
		schema: args.schema,
		zdrComment: args.zdrComment ?? null,
		digest: args.digest,
	};
}

/**
 * Catalog row → `ModelView`. Expands the flat fields + metadata into the
 * `properties` map/list (context_window, max_output_tokens, terms, info,
 * async_queue, zdr, then metadata flags) in a fixed order so badges/facets
 * work uniformly across both sources.
 */
export function catalogToResolved(entry: CatalogEntry): ModelView {
	const model = entry.data as Record<string, any>;
	const hosted = isHostedModelId(model.model_id);
	const properties: Record<string, unknown> = {};
	const propertiesList: { property_id: string; value: unknown }[] = [];
	const push = (property_id: string, value: unknown): void => {
		properties[property_id] = value;
		propertiesList.push({ property_id, value });
	};

	if (model.context_length != null)
		push("context_window", String(model.context_length));
	if (model.max_output_tokens != null)
		push("max_output_tokens", String(model.max_output_tokens));
	if (model.terms) push("terms", model.terms);
	if (model.external_info) push("info", model.external_info);
	if (model.supports_async) push("async_queue", "true");
	// All hosted Workers AI models support zero data retention.
	if (hosted || model.zdr === true) push("zdr", "true");

	const metadata = (model.metadata || {}) as Record<string, unknown>;
	if (metadata.lora) push("lora", "true");
	if (metadata.function_calling) push("function_calling", "true");
	if (metadata.beta) push("beta", "true");
	if (metadata.partner) push("partner", "true");
	if (metadata.realtime) push("realtime", "true");
	if (metadata.planned_deprecation_date)
		push("planned_deprecation_date", String(metadata.planned_deprecation_date));

	const schema = {
		input: (model.schema?.input ?? {}) as Record<string, unknown>,
		output: (model.schema?.output ?? {}) as Record<string, unknown>,
	};

	return buildView({
		id: entry.id,
		name: model.model_id,
		slug: model.model_id,
		displayName: model.name,
		dataSource: "catalog",
		source: hosted ? 1 : 2,
		hosting: hosted ? "hosted" : "proxied",
		task: model.task,
		description: model.description,
		tags: Array.isArray(model.tags) ? model.tags : [],
		properties,
		propertiesList,
		schema,
		createdAt:
			typeof model.created_at === "string" ? model.created_at : undefined,
		zdrComment: model.zdr_comment ?? null,
		modelId: model.model_id,
		requestFormats: (model.request_formats as string[] | undefined) ?? null,
		pricing: model.pricing,
		// Sorted here so every consumer lists providers in priority order.
		modelProviders: model.model_providers
			? [...(model.model_providers as ModelProvider[])].sort(
					(x, y) => x.ordinal - y.ordinal,
				)
			: null,
		examples: (model.examples as ModelExample[] | undefined) ?? [],
		banner: (model.banner as ModelBanner | null | undefined) ?? null,
		pinned: model.pinned === true,
		digest: entry.digest,
	});
}

/** Workers AI models are namespaced `@cf/<author>/<model>`. */
export const isHostedModelId = (modelId: string): boolean =>
	modelId.startsWith("@cf/");

/** Every model, hosted and proxied. Feeds `/ai/models`. */
export async function getResolvedModels(): Promise<ModelView[]> {
	const entries = await getCollection("catalog-models");
	return entries.map(catalogToResolved);
}

/** Only Cloudflare-hosted (`@cf/*`) models. Feeds `/workers-ai/models`. */
export async function getHostedModels(): Promise<ModelView[]> {
	return (await getResolvedModels()).filter(
		(model) => model.hosting === "hosted",
	);
}

/** Strip the heavy `schema` blob for the catalog index pages. */
export function toModelCardData(model: ModelView): ModelCardData {
	const { schema: _schema, ...card } = model;
	return card;
}
