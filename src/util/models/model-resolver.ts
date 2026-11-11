/**
 * Resolves `catalog-models` rows into a unified `ModelView`. The collection
 * holds every model: Cloudflare-hosted Workers AI models (`@cf/*`) and
 * third-party / proxied models. Hosting is a function of the `model_id`
 * namespace.
 */
import { getCollection, type CollectionEntry } from "astro:content";
import type {
	ModelBanner,
	ModelCardData,
	ModelExample,
	ModelProvider,
	ModelView,
	ProviderBrand,
} from "./model-types";
import { getModelAuthor } from "./model-helpers";
import { CAPABILITY_PROPERTIES } from "./model-properties";
import { pinnedModelNames } from "./facets";

export type CatalogEntry = CollectionEntry<"catalog-models">;

const isTrue = (v: unknown): boolean => v === true || v === "true";

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

const hasPricing = (
	pricing: Record<string, unknown> | null | undefined,
): pricing is Record<string, unknown> =>
	!!pricing && Object.keys(pricing).length > 0;

/**
 * Providers serving a model, in priority order. `model_providers` is the new
 * field; `provider_details` is the older one it replaces, so it fills in
 * while the API migrates. A provider without its own pricing falls back to
 * the model's top-level `pricing` when it is the only provider (that price is
 * the model's single price), then to its `provider_details` entry. Not
 * `provider_id`: that names the model's author, which can differ from the
 * serving provider (e.g. `google` vs `google-vertex-ai`).
 */
function resolveModelProviders(
	model: Record<string, any>,
	brands: ReadonlyMap<string, ProviderBrand>,
): ModelProvider[] | null {
	const details = (model.provider_details ?? []) as Array<{
		id: string;
		pricing?: Record<string, unknown> | null;
	}>;
	const providers: ModelProvider[] = model.model_providers
		? [...(model.model_providers as ModelProvider[])]
		: details.map((detail, ordinal) => ({
				provider: detail.id,
				ordinal,
				pricing: null,
			}));
	if (providers.length === 0) return null;

	const soleProvider = providers.length === 1;
	return providers
		.sort((x, y) => x.ordinal - y.ordinal)
		.map((provider) => {
			const name = brands.get(provider.provider)?.name ?? provider.provider;
			if (hasPricing(provider.pricing)) return { ...provider, name };
			const detailPricing = details.find(
				(detail) => detail.id === provider.provider,
			)?.pricing;
			const pricing =
				soleProvider && hasPricing(model.pricing)
					? model.pricing
					: hasPricing(detailPricing)
						? detailPricing
						: null;
			return { ...provider, name, pricing };
		});
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
	brands: ReadonlyMap<string, ProviderBrand>;
}): ModelView {
	const author = getModelAuthor(args.name);
	const authorBrand = args.brands.get(author);
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
		authorName: authorBrand?.name ?? author,
		authorIcon: authorBrand?.icon ?? null,
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
export function catalogToResolved(
	entry: CatalogEntry,
	brands: ReadonlyMap<string, ProviderBrand> = new Map(),
): ModelView {
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
		modelProviders: resolveModelProviders(model, brands),
		examples: (model.examples as ModelExample[] | undefined) ?? [],
		banner: (model.banner as ModelBanner | null | undefined) ?? null,
		pinned: model.pinned === true,
		digest: entry.digest,
		brands,
	});
}

/** Workers AI models are namespaced `@cf/<author>/<model>`. */
export const isHostedModelId = (modelId: string): boolean =>
	modelId.startsWith("@cf/");

/** Every model, hosted and proxied. Feeds `/ai/models`. */
export async function getResolvedModels(): Promise<ModelView[]> {
	const [entries, providers] = await Promise.all([
		getCollection("catalog-models"),
		getCollection("catalog-providers"),
	]);
	// Provider ids and their aliases → display name and icon. The catalog CMS
	// is the single source of provider branding.
	const brands = new Map<string, ProviderBrand>(
		providers.flatMap(({ data }) => {
			const { brand, brand_dark } = data.icons ?? {};
			const brandInfo: ProviderBrand = {
				name: data.name,
				icon: brand ? { light: brand, dark: brand_dark ?? brand } : null,
			};
			return [data.id, ...data.aliases].map((id) => [id, brandInfo] as const);
		}),
	);
	return entries.map((entry) => catalogToResolved(entry, brands));
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
