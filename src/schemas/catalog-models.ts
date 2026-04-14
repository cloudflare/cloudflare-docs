import { z } from "astro/zod";

/**
 * Schema for the Unified Catalog API model data
 * Based on CatalogModel interface from stratus
 */

export const codeSnippetSchema = z.object({
	label: z.string(), // "typescript", "python", "curl"
	code: z.string(),
});

export const modelExampleSchema = z.object({
	name: z.string(),
	description: z.string().optional(),
	input: z.record(z.string(), z.unknown()),
	output: z.record(z.string(), z.unknown()).optional(),
	code_snippets: codeSnippetSchema.array().optional(),
});

export const defaultExampleSchema = z.object({
	input: z.record(z.string(), z.unknown()).optional(),
	output: z.record(z.string(), z.unknown()).optional(),
	code_snippets: codeSnippetSchema.array().optional(),
});

export const catalogModelsSchema = z.object({
	// Identification
	model_id: z.string(), // "@cf/meta/llama-3.1-70b-instruct"
	provider_id: z.string().nullable(), // "meta"
	name: z.string(), // Display name: "Llama 3.1 70B Instruct"

	// Content
	description: z.string(),
	task: z.string(), // "Text Generation"
	tags: z.string().array(),

	// Model capabilities
	context_length: z.number().nullable(),
	max_output_tokens: z.number().nullable(),
	supports_async: z.boolean(),

	// Pricing (flexible structure: {input, output} or {per_image} etc)
	pricing: z.record(z.string(), z.number()),

	// Examples
	examples: modelExampleSchema.array(),
	default_example: defaultExampleSchema.nullable().optional(),
	code_snippets: codeSnippetSchema.array().optional(),

	// Schema (JSON Schema format)
	schema: z
		.object({
			input: z.record(z.string(), z.unknown()).optional(),
			output: z.record(z.string(), z.unknown()).optional(),
		})
		.optional(),

	// Metadata & Links
	metadata: z.record(z.string(), z.unknown()),
	external_info: z.string().nullable(),
	terms: z.string().nullable(),
	cover_image_url: z.string().nullable(),
	schema_version: z.string().nullable(),
	private: z.boolean().optional(),

	// Timestamps
	created_at: z.string().optional(),
	updated_at: z.string().optional(),
});

export type CatalogModelsSchema = z.infer<typeof catalogModelsSchema>;
export type CodeSnippet = z.infer<typeof codeSnippetSchema>;
export type ModelExample = z.infer<typeof modelExampleSchema>;
