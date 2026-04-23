import { getCollection } from "astro:content";
import type { CatalogModelsSchema } from "~/schemas/catalog-models";
import type { WorkersAIModelsSchema } from "~/schemas/workers-ai-models";

import type { ApiMode, ResolvedModel } from "./model-types";

// Re-export client-safe helpers and types for convenience
export { getModelAuthor } from "./model-helpers";
export type { ResolvedModel, ApiMode } from "./model-types";

/**
 * Detect and split a model's schema into logical API modes.
 * Handles common patterns like:
 * - Sync vs Batch (anyOf with requests array)
 * - Prompt vs Messages input formats
 * - JSON vs Streaming output
 */
function detectApiModes(schema: {
	input: Record<string, unknown>;
	output: Record<string, unknown>;
}): ApiMode[] | undefined {
	const { input, output } = schema;
	const modes: ApiMode[] = [];

	// Check for anyOf/oneOf at the input level
	const inputVariants =
		(input.anyOf as Record<string, unknown>[]) ||
		(input.oneOf as Record<string, unknown>[]);

	// Check for anyOf/oneOf at the output level
	const outputVariants =
		(output.anyOf as Record<string, unknown>[]) ||
		(output.oneOf as Record<string, unknown>[]);

	if (!inputVariants || inputVariants.length === 0) {
		// No variants to split - return undefined to use combined schema
		return undefined;
	}

	// Find batch input (has "requests" property)
	const batchInputIndex = inputVariants.findIndex((v) => {
		const props = v.properties as Record<string, unknown> | undefined;
		return props && "requests" in props;
	});

	// Find sync input (not batch)
	const syncInputIndex = inputVariants.findIndex(
		(_, i) => i !== batchInputIndex,
	);

	// Find JSON output (contentType: application/json or has properties)
	const jsonOutputIndex =
		outputVariants?.findIndex((v) => {
			return (
				v.contentType === "application/json" ||
				(v.type === "object" && v.properties)
			);
		}) ?? -1;

	// Find streaming output (type: string, or format: binary for SSE)
	const streamOutputIndex =
		outputVariants?.findIndex((v) => {
			return v.type === "string" || v.format === "binary";
		}) ?? -1;

	// Build sync mode
	if (syncInputIndex !== -1) {
		const syncInput = inputVariants[syncInputIndex];
		const syncOutput =
			jsonOutputIndex !== -1 && outputVariants
				? outputVariants[jsonOutputIndex]
				: output;

		modes.push({
			id: "sync",
			name: "Synchronous",
			description: "Send a request and receive a complete response",
			input: syncInput,
			output: syncOutput,
		});

		// Build streaming mode (same input as sync, different output)
		if (streamOutputIndex !== -1 && outputVariants) {
			modes.push({
				id: "streaming",
				name: "Streaming",
				description:
					"Send a request with `stream: true` and receive server-sent events",
				input: syncInput,
				output: outputVariants[streamOutputIndex],
			});
		}
	}

	// Build batch mode
	if (batchInputIndex !== -1) {
		const batchInput = inputVariants[batchInputIndex];
		// Batch typically uses the same JSON output format
		const batchOutput =
			jsonOutputIndex !== -1 && outputVariants
				? outputVariants[jsonOutputIndex]
				: output;

		modes.push({
			id: "batch",
			name: "Batch",
			description: "Send multiple requests in a single API call",
			input: batchInput,
			output: batchOutput,
		});
	}

	// Only return modes if we found meaningful splits
	return modes.length > 1 ? modes : undefined;
}

/**
 * Convert catalog model to resolved model format.
 */
function catalogToResolved(model: CatalogModelsSchema): ResolvedModel {
	// Build legacy-compatible properties array from catalog fields
	const properties: ResolvedModel["properties"] = [];

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

	const schema = {
		input: model.schema?.input || {},
		output: model.schema?.output || {},
	};

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
		schema,
		apiModes: detectApiModes(schema),
		tags: model.tags || [],
		contextLength: model.context_length ?? undefined,
		maxOutputTokens: model.max_output_tokens ?? undefined,
		supportsAsync: model.supports_async,
		codeSnippets: model.code_snippets,
		examples: model.examples,
		defaultExample: model.default_example ?? undefined,
		metadata: model.metadata,
		coverImageUrl: model.cover_image_url ?? undefined,
		externalInfo: model.external_info ?? undefined,
		terms: model.terms ?? undefined,
		id: model.model_id,
		source: 2, // 2 = catalog
		created_at: model.created_at,
		properties,
		dataSource: "catalog",
		hosting: "proxied",
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

	const schema = {
		input: model.schema.input,
		output: model.schema.output,
	};

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
		schema,
		apiModes: detectApiModes(schema),
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
		hosting: "hosted",
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

/**
 * Get only legacy Workers AI models (hosted on Cloudflare infrastructure).
 * These are models from workers-ai-models collection that are NOT in the catalog.
 */
export async function getLegacyModels(): Promise<ResolvedModel[]> {
	const [catalogModels, legacyModels] = await Promise.all([
		getCollection("catalog-models"),
		getCollection("workers-ai-models"),
	]);

	// Get catalog slugs to exclude
	const catalogSlugs = new Set(
		catalogModels.map((entry) => entry.data.model_id),
	);

	// Return only legacy models not in catalog
	return legacyModels
		.filter((entry) => !catalogSlugs.has(entry.data.name))
		.map((entry) => legacyToResolved(entry.data));
}
