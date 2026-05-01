import { z } from "astro/zod";

/**
 * Schema for a single model card entry in the middlecache
 * ai-catalog.json / workers-ai-catalog.json files.
 *
 * These are produced by the workers_ai_model_catalog middlecache pipeline.
 * They contain card-level fields only (no schema, no examples) — sufficient
 * for rendering index pages and model cards.
 */
export const aiModelCardSchema = z.object({
	model_id: z.string(),
	slug: z.string(),
	display_name: z.string(),
	description: z.string(),
	task: z.object({
		id: z.string(),
		name: z.string(),
		description: z.string(),
	}),
	tags: z.string().array(),
	context_length: z.number().nullable().optional(),
	max_output_tokens: z.number().nullable().optional(),
	supports_async: z.boolean(),
	hosting: z.enum(["proxied", "hosted"]),
	data_source: z.enum(["catalog", "legacy"]),
	properties: z
		.object({
			property_id: z.string(),
			value: z.string().or(z.array(z.looseObject({}))),
		})
		.array(),
	metadata: z.record(z.string(), z.unknown()),
	external_info: z.string().nullable().optional(),
	terms: z.string().nullable().optional(),
	cover_image_url: z.string().nullable().optional(),
	created_at: z.string().nullable().optional(),
});

/**
 * Schema for the top-level ai-catalog.json / workers-ai-catalog.json files.
 */
export const aiModelCatalogFileSchema = z.object({
	generated_at: z.string(),
	model_count: z.number(),
	models: aiModelCardSchema.array(),
});

export type AiModelCard = z.infer<typeof aiModelCardSchema>;
export type AiModelCatalogFile = z.infer<typeof aiModelCatalogFileSchema>;

/**
 * Schema for detail.json — per-model full data fetched at detail-page
 * build time. Includes examples and code_snippets but NOT the raw schema
 * (schema lives in separate R2 files, referenced via schema_manifest).
 */
export const aiModelDetailSchema = z.object({
	model_id: z.string(),
	slug: z.string(),
	display_name: z.string(),
	description: z.string(),
	task: z.object({
		id: z.string(),
		name: z.string(),
		description: z.string(),
	}),
	tags: z.string().array(),
	context_length: z.number().nullable().optional(),
	max_output_tokens: z.number().nullable().optional(),
	supports_async: z.boolean(),
	hosting: z.enum(["proxied", "hosted"]),
	data_source: z.enum(["catalog", "legacy"]),
	properties: z
		.object({
			property_id: z.string(),
			value: z.string().or(z.array(z.looseObject({}))),
		})
		.array(),
	metadata: z.record(z.string(), z.unknown()).optional(),
	external_info: z.string().nullable().optional(),
	terms: z.string().nullable().optional(),
	cover_image_url: z.string().nullable().optional(),
	created_at: z.string().nullable().optional(),
	// Catalog-only fields
	examples: z
		.object({
			name: z.string(),
			description: z.string().optional(),
			input: z.record(z.string(), z.unknown()),
			output: z.record(z.string(), z.unknown()).optional(),
			raw_response: z
				.union([z.record(z.string(), z.unknown()), z.array(z.unknown())])
				.optional(),
			code_snippets: z
				.object({ label: z.string(), code: z.string() })
				.array()
				.optional(),
		})
		.array()
		.optional(),
	default_example: z
		.object({
			input: z.record(z.string(), z.unknown()).optional(),
			output: z.record(z.string(), z.unknown()).optional(),
			code_snippets: z
				.object({ label: z.string(), code: z.string() })
				.array()
				.optional(),
		})
		.nullable()
		.optional(),
	code_snippets: z
		.object({ label: z.string(), code: z.string() })
		.array()
		.optional(),
	// schema_manifest lists the full R2 paths for the schema files
	schema_manifest: z.object({
		files: z.string().array(),
	}),
});

export type AiModelDetail = z.infer<typeof aiModelDetailSchema>;
