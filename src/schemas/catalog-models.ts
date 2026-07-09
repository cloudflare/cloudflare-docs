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
	// Full provider response as returned by the upstream API. Shape varies by
	// provider — streaming responses are arrays of chunks, non-streaming are
	// objects. Rendered as JSON in the UI regardless of shape.
	raw_response: z
		.union([z.record(z.string(), z.unknown()), z.array(z.unknown())])
		.optional(),
	code_snippets: codeSnippetSchema.array().optional(),
});

export const defaultExampleSchema = z.object({
	input: z.record(z.string(), z.unknown()).optional(),
	output: z.record(z.string(), z.unknown()).optional(),
	code_snippets: codeSnippetSchema.array().optional(),
});

// In-page notice surfaced on the model detail page. Distinct from the
// page-frontmatter `banner` in `src/schemas/base.ts` — the catalog API ships
// this richer shape (title/text/severity/dismissible/link) and we render it
// as a Starlight `Aside` directly under the model description. `severity` is
// left as `z.string()` because the upstream enum is not yet locked down
// (observed today: "warning", "info"); the renderer falls back to a neutral
// note style for any unrecognised value. `dismissible` is preserved through
// the schema for round-trip fidelity with the upstream API but is not yet
// honored at render time — the docs site renders banners statically and
// never hides them. Adding client-side dismissal is a follow-up.
//
// `link.url` is validated via Zod 4's `z.httpUrl()`, which rejects any
// well-formed URL whose scheme is not `http`/`https` (case-insensitive,
// per RFC 3986) and also rejects bareword hostnames / IP literals such as
// `localhost` and `127.0.0.1`. Without this guard a compromised or
// malformed catalog row could inject `javascript:` (or other unsafe
// scheme) hrefs into the rendered <a>; `target="_blank" rel="noopener
// noreferrer"` does not block non-http(s) schemes from executing. The
// protocol enforcement lives at the schema layer so a bad URL fails the
// content-collection load loudly rather than silently shipping an unsafe
// link.
export const catalogBannerSchema = z.object({
	title: z.string().optional(),
	text: z.string(),
	severity: z.string(),
	dismissible: z.boolean().optional(),
	link: z
		.object({
			url: z.httpUrl(),
			label: z.string(),
		})
		.optional(),
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

	// Zero Data Retention. Optional because older catalog API responses omit
	// the field entirely — the UI treats `undefined` the same as `false`
	// (badge stays hidden). `zdr_comment` carries an optional supplementary
	// note such as plan requirements when the upstream provider needs one.
	zdr: z.boolean().optional(),
	zdr_comment: z.string().nullable().optional(),

	// In-page notice (rendered as a Starlight `Aside` on the model detail
	// page). Null/missing on most models; populated when upstream needs to
	// surface availability constraints, deprecation warnings, etc.
	banner: catalogBannerSchema.nullable().optional(),

	// Request-format identifiers the model accepts at the API layer (e.g.
	// "chat-completions", "responses", "anthropic-messages"). Rendered as a
	// "Request formats" row in the Model Info table. Null/missing when the
	// model has only one canonical request shape.
	request_formats: z.string().array().nullable().optional(),

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
export type CatalogBanner = z.infer<typeof catalogBannerSchema>;
