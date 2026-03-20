import { getCollection } from "astro:content";
import type { CatalogModelsSchema } from "~/schemas/catalog-models";
import type { WorkersAIModelsSchema } from "~/schemas/workers-ai-models";

import type { ResolvedModel } from "./model-types";

// Re-export client-safe helpers and types for convenience
export { getModelAuthor } from "./model-helpers";
export type { ResolvedModel } from "./model-types";

/**
 * Normalize raw pricing unit keys (e.g. "per_image", "per_megapixel") into a
 * human-readable unit label (e.g. "per image", "per megapixel").
 */
function normalizePricingUnit(unit: string): string {
	const withoutPrefix = unit.startsWith("per_") ? unit.slice(4) : unit;
	const humanReadable = withoutPrefix.replace(/_/g, " ");
	return `per ${humanReadable}`;
}

/**
 * Convert catalog model to resolved model format.
 */
function catalogToResolved(model: CatalogModelsSchema): ResolvedModel {
	// Build legacy-compatible properties array from catalog fields
	const properties: ResolvedModel["properties"] = [];

	// Pricing
	if (model.pricing && Object.keys(model.pricing).length > 0) {
		const priceValue = Object.entries(model.pricing).map(([unit, price]) => ({
			unit: normalizePricingUnit(unit),
			price,
			currency: "USD",
		}));
		properties.push({ property_id: "price", value: priceValue });
	}

	// Context window
	if (model.context_length != null) {
		properties.push({
			property_id: "context_window",
			value: String(model.context_length),
		});
	}

	// Max output tokens
	if (model.max_output_tokens != null) {
		properties.push({
			property_id: "max_output_tokens",
			value: String(model.max_output_tokens),
		});
	}

	// Terms
	if (model.terms) {
		properties.push({ property_id: "terms", value: model.terms });
	}

	// External info
	if (model.external_info) {
		properties.push({ property_id: "info", value: model.external_info });
	}

	// Async/batch support
	if (model.supports_async) {
		properties.push({ property_id: "async_queue", value: "true" });
	}

	// Extract additional properties from metadata
	const metadata = model.metadata || {};
	if (metadata.lora) {
		properties.push({ property_id: "lora", value: "true" });
	}
	if (metadata.function_calling) {
		properties.push({ property_id: "function_calling", value: "true" });
	}
	if (metadata.beta) {
		properties.push({ property_id: "beta", value: "true" });
	}
	if (metadata.partner) {
		properties.push({ property_id: "partner", value: "true" });
	}
	if (metadata.realtime) {
		properties.push({ property_id: "realtime", value: "true" });
	}
	if (metadata.planned_deprecation_date) {
		properties.push({
			property_id: "planned_deprecation_date",
			value: String(metadata.planned_deprecation_date),
		});
	}

	return {
		name: model.model_id,
		modelId: model.model_id,
		slug: model.model_id,
		displayName: model.name,
		description: model.description,
		task: {
			id: "", // Catalog doesn't include task ID
			name: model.task,
			description: "", // Catalog doesn't include task description
		},
		schema: {
			input: model.schema?.input || {},
			output: model.schema?.output || {},
		},
		tags: model.tags || [],
		contextLength: model.context_length ?? undefined,
		maxOutputTokens: model.max_output_tokens ?? undefined,
		supportsAsync: model.supports_async,
		pricing: model.pricing,
		codeSnippets: model.code_snippets,
		examples: model.examples,
		defaultExample: model.default_example,
		metadata: model.metadata,
		coverImageUrl: model.cover_image_url ?? undefined,
		externalInfo: model.external_info ?? undefined,
		terms: model.terms ?? undefined,
		id: model.model_id,
		source: 2, // 2 = catalog
		created_at: model.created_at,
		properties,
		dataSource: "catalog",
	};
}

/**
 * Convert legacy model to resolved model format.
 */
function legacyToResolved(model: WorkersAIModelsSchema): ResolvedModel {
	const slug = model.name;

	// Extract values from properties array
	const getProp = (id: string) =>
		model.properties.find((p) => p.property_id === id)?.value;

	const contextWindow = getProp("context_window");
	const maxOutputTokens = getProp("max_output_tokens");

	return {
		name: model.name,
		modelId: model.name,
		slug,
		displayName: slug, // Legacy doesn't have separate display name
		description: model.description,
		task: {
			id: model.task.id,
			name: model.task.name,
			description: model.task.description,
		},
		schema: {
			input: model.schema.input,
			output: model.schema.output,
		},
		tags: model.tags || [],
		contextLength:
			typeof contextWindow === "string"
				? parseInt(contextWindow, 10)
				: undefined,
		maxOutputTokens:
			typeof maxOutputTokens === "string"
				? parseInt(maxOutputTokens, 10)
				: undefined,
		supportsAsync: getProp("async_queue") === "true",
		// Legacy doesn't have structured pricing, examples, or code snippets
		id: model.id,
		source: model.source, // Preserve original source number
		created_at: model.created_at,
		properties: model.properties,
		dataSource: "legacy",
	};
}

/**
 * Get all models, preferring catalog data over legacy when available.
 * Catalog models completely replace their legacy counterparts.
 */
export async function getResolvedModels(): Promise<ResolvedModel[]> {
	const [catalogModels, legacyModels] = await Promise.all([
		getCollection("catalog-models"),
		getCollection("workers-ai-models"),
	]);

	// Build map of catalog models by slug
	const catalogBySlug = new Map<string, ResolvedModel>();
	for (const entry of catalogModels) {
		const resolved = catalogToResolved(entry.data);
		catalogBySlug.set(resolved.slug, resolved);
	}

	// Build final list: catalog models first, then legacy models not in catalog
	const resolved: ResolvedModel[] = [...catalogBySlug.values()];
	const catalogSlugs = new Set(catalogBySlug.keys());

	for (const entry of legacyModels) {
		const slug = entry.data.name;
		if (!catalogSlugs.has(slug)) {
			resolved.push(legacyToResolved(entry.data));
		}
	}

	return resolved;
}
