import type { CatalogModel } from "./models-api";

/**
 * PROTOTYPE ONLY. Stand-ins for the Workers AI (`@cf/*`) rows the unified
 * models endpoint will return, shaped like today's `/ai/catalog/models`
 * detail response. They let us work out how hosted models render from the
 * catalog before the endpoint ships. Delete once the endpoint returns real
 * Workers AI rows; the loader already prefers a real row with the same
 * `model_id`.
 */

const textGenerationSchema = {
	input: {
		type: "object",
		properties: {
			messages: {
				type: "array",
				items: {
					type: "object",
					properties: {
						role: { type: "string", enum: ["system", "user", "assistant"] },
						content: { type: "string" },
					},
					required: ["role", "content"],
				},
			},
			max_tokens: { type: "integer", default: 256 },
			stream: { type: "boolean", default: false },
		},
		required: ["messages"],
	},
	output: {
		type: "object",
		properties: { response: { type: "string" } },
	},
};

const shared = {
	provider_id: "workers-ai",
	supports_async: false,
	zdr: true,
	zdr_comment: null,
	banner: null,
	request_formats: ["openai-chat"],
	external_info: null,
	terms: null,
	cover_image_url: null,
	schema_version: "1.0.0",
	created_at: "2026-11-01 00:00:00",
} satisfies Partial<CatalogModel>;

export const DUMMY_WORKERS_AI_MODELS: CatalogModel[] = [
	{
		...shared,
		model_id: "@cf/cloudflare/clef",
		name: "Clef (dummy)",
		pinned: true,
		description:
			"Dummy Workers AI row for prototyping the unified models endpoint. A pinned Cloudflare-hosted text generation model.",
		task: "Text Generation",
		tags: ["LLM", "Function calling"],
		context_length: 128000,
		max_output_tokens: 8192,
		pricing: {
			"Input tokens (per 1M)": 0.2,
			"Output tokens (per 1M)": 0.8,
		},
		metadata: { function_calling: true },
		examples: [
			{
				name: "Simple question",
				input: {
					messages: [{ role: "user", content: "What is Cloudflare?" }],
				},
				output: { response: "Cloudflare is a connectivity cloud." },
			},
		],
		schema: textGenerationSchema,
	},
	{
		...shared,
		model_id: "@cf/meta/llama-3.1-8b-instruct-dummy",
		name: "Llama 3.1 8B Instruct (dummy)",
		description:
			"Dummy Workers AI row for prototyping the unified models endpoint. An unpinned hosted model from a third-party author.",
		task: "Text Generation",
		tags: ["LLM"],
		context_length: 8192,
		max_output_tokens: 2048,
		pricing: {
			"Input tokens (per 1M)": 0.05,
			"Output tokens (per 1M)": 0.1,
		},
		metadata: { beta: true },
		// Listed out of order on purpose: the resolver sorts by `ordinal`.
		model_providers: [
			{
				provider: "groq",
				ordinal: 2,
				pricing: {
					"Input tokens (per 1M)": 0.06,
					"Output tokens (per 1M)": 0.12,
				},
			},
			{
				provider: "workers-ai",
				ordinal: 1,
				pricing: {
					"Input tokens (per 1M)": 0.05,
					"Output tokens (per 1M)": 0.1,
				},
			},
		],
		examples: [],
		schema: textGenerationSchema,
	},
	{
		...shared,
		model_id: "@cf/baai/bge-m3-dummy",
		name: "BGE M3 (dummy)",
		description:
			"Dummy Workers AI row for prototyping the unified models endpoint. A hosted non-chat model with no request formats, pinned only by the API flag.",
		pinned: true,
		task: "Text Embeddings",
		tags: ["Embeddings"],
		context_length: 8192,
		max_output_tokens: null,
		request_formats: null,
		pricing: { "Input tokens (per 1M)": 0.01 },
		metadata: {},
		examples: [],
		schema: {
			input: {
				type: "object",
				properties: { text: { type: "array", items: { type: "string" } } },
				required: ["text"],
			},
			output: {
				type: "object",
				properties: {
					data: {
						type: "array",
						items: { type: "array", items: { type: "number" } },
					},
				},
			},
		},
	},
];
