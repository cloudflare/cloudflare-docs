import type { FormatMatcher } from "./schema-formats";
import { schemaMatchers } from "./schema-formats";
import * as templates from "./templates";

export const OUTPUT_FORMATS: FormatMatcher[] = [
	// GPT-OSS / Responses format
	{
		id: "gpt-oss-responses",
		label: "Responses",
		priority: 1,
		matches: (schema, ctx) =>
			(ctx.modelName && ctx.modelName.includes("gpt-oss")) ||
			schemaMatchers.propertyIncludes("title", "gpt_oss")(schema) ||
			schemaMatchers.propertyIncludes("title", "responses")(schema),
		generateExample: (_schema, ctx) =>
			templates.gptOssResponsesOutput(ctx.modelName),
	},

	// Text-to-Image Binary Output
	{
		id: "text-to-image-binary",
		label: "Binary",
		priority: 1,
		matches: (schema, ctx) =>
			ctx.taskName === "Text-to-Image" && schemaMatchers.isBinary(schema),
		generateExample: () => templates.binaryImage(),
	},

	// Text-to-Image Output (check before generic Workers AI format)
	{
		id: "text-to-image-output",
		label: "JSON",
		priority: 1,
		matches: (schema, ctx) =>
			ctx.taskName === "Text-to-Image" &&
			schemaMatchers.hasProperty("properties.image")(schema),
		generateExample: () => templates.textToImageOutput(),
	},

	// Workers AI Format (standard response with result wrapper)
	{
		id: "workers-ai",
		label: "JSON",
		priority: 1,
		matches: (schema) =>
			schemaMatchers.hasProperty("properties.response")(schema) &&
			schemaMatchers.hasProperty("properties.usage")(schema) &&
			!schemaMatchers.hasProperty("properties.choices")(schema),
		generateExample: () => templates.workersAIOutput(),
	},

	// Chat/Text Completion (OpenAI-compatible format)
	{
		id: "chat-completion",
		label: "Chat Completion",
		priority: 2,
		matches: (schema) =>
			schemaMatchers.propertyIncludes("title", "chat completion")(schema),
		generateExample: (_schema, ctx) =>
			templates.chatCompletionOutput(ctx.modelName),
	},

	{
		id: "text-completion",
		label: "Text Completion",
		priority: 2,
		matches: (schema) =>
			schemaMatchers.propertyIncludes("title", "text completion")(schema),
		generateExample: (_schema, ctx) =>
			templates.textCompletionOutput(ctx.modelName),
	},

	// Streaming
	{
		id: "streaming",
		label: "Streaming",
		priority: 3,
		matches: (schema) =>
			schema.contentType === "text/event-stream" ||
			(schema.type === "string" && schema.format === "binary"),
		generateExample: () => templates.streamingOutput(),
	},

	// Async Batch Response
	{
		id: "async-batch-response",
		label: "Async Batch",
		priority: 99,
		matches: (schema) =>
			schemaMatchers.hasProperty("properties.request_id")(schema) &&
			schemaMatchers.propertyIncludes("title", "async")(schema),
		generateExample: (_schema, ctx) =>
			templates.asyncBatchResponse(ctx.modelName),
	},

	// Text Embeddings Outputs
	{
		id: "embeddings-query-output",
		label: "Query",
		priority: 1,
		matches: (schema) =>
			schemaMatchers.hasProperty("properties.response")(schema) &&
			schemaMatchers.propertyIncludes("title", "query")(schema),
		generateExample: () => templates.embeddingsQueryOutput(),
	},

	{
		id: "embeddings-contexts-output",
		label: "Embedding for Contexts",
		priority: 2,
		matches: (schema) =>
			schemaMatchers.hasProperty("properties.response")(schema) &&
			schemaMatchers.hasProperty("properties.shape")(schema) &&
			schemaMatchers.propertyIncludes("title", "context")(schema),
		generateExample: () => templates.embeddingsContextsOutput(),
	},

	{
		id: "embeddings-standard-output",
		label: "Embedding",
		priority: 3,
		matches: (schema) =>
			schemaMatchers.hasProperty("properties.data")(schema) &&
			schemaMatchers.hasProperty("properties.shape")(schema),
		generateExample: () => templates.embeddingsStandardOutput(),
	},

	// Automatic Speech Recognition Outputs
	{
		id: "asr-nova3-output",
		label: "JSON",
		priority: 1,
		matches: (schema) =>
			schemaMatchers.hasProperty("properties.results.properties.channels")(
				schema,
			),
		generateExample: () => templates.asrNova3Output(),
	},

	{
		id: "asr-whisper-segments-output",
		label: "JSON",
		priority: 1,
		matches: (schema) =>
			schemaMatchers.hasProperty("properties.text")(schema) &&
			schemaMatchers.hasProperty("properties.segments")(schema),
		generateExample: () => templates.asrWhisperSegmentsOutput(),
	},

	{
		id: "asr-whisper-words-output",
		label: "JSON",
		priority: 2,
		matches: (schema) => {
			const hasText = schemaMatchers.hasProperty("properties.text")(schema);
			const hasWords = schemaMatchers.hasProperty("properties.words.items")(
				schema,
			);
			if (!hasText || !hasWords) return false;

			const wordProps = schema.properties?.words?.items?.properties || {};
			return wordProps.start && wordProps.end;
		},
		generateExample: () => templates.asrWhisperWordsOutput(),
	},

	{
		id: "asr-flux-output",
		label: "JSON",
		priority: 3,
		matches: (schema) => {
			const hasWords = schemaMatchers.hasProperty("properties.words.items")(
				schema,
			);
			if (!hasWords) return false;

			const wordProps = schema.properties?.words?.items?.properties || {};
			return wordProps.confidence !== undefined;
		},
		generateExample: () => templates.asrFluxOutput(),
	},

	// Text-to-Speech Output (melotts style)
	{
		id: "tts-melotts-output",
		label: "JSON",
		priority: 1,
		matches: (schema) =>
			schemaMatchers.hasProperty("properties.audio")(schema) &&
			schema.properties.audio.description?.includes("base64-encoded"),
		generateExample: () => templates.ttsMelottsOutput(),
	},

	// Summarization Output
	{
		id: "summarization-output",
		label: "JSON",
		priority: 1,
		matches: (schema, ctx) =>
			ctx.taskName === "Summarization" &&
			schemaMatchers.hasProperty("properties.summary")(schema),
		generateExample: () => templates.summarizationOutput(),
	},

	// Text Classification Output
	{
		id: "text-classification-output",
		label: "JSON",
		priority: 1,
		matches: (schema, ctx) =>
			ctx.taskName === "Text Classification" &&
			schema.type === "array" &&
			schemaMatchers.hasProperty("items.properties.label")(schema) &&
			schemaMatchers.hasProperty("items.properties.score")(schema),
		generateExample: () => templates.textClassificationOutput(),
	},

	// Object Detection Output
	{
		id: "object-detection-output",
		label: "JSON",
		priority: 1,
		matches: (schema, ctx) =>
			ctx.taskName === "Object Detection" &&
			schema.type === "array" &&
			schemaMatchers.hasProperty("items.properties.box")(schema),
		generateExample: () => templates.objectDetectionOutput(),
	},

	// Translation Output
	{
		id: "translation-output",
		label: "JSON",
		priority: 1,
		matches: (schema, ctx) =>
			ctx.taskName === "Translation" &&
			schemaMatchers.hasProperty("properties.translated_text")(schema),
		generateExample: () => templates.translationOutput(),
	},

	// Image-to-Text Output
	{
		id: "image-to-text-output",
		label: "JSON",
		priority: 1,
		matches: (schema, ctx) =>
			ctx.taskName === "Image-to-Text" &&
			schemaMatchers.hasProperty("properties.description")(schema),
		generateExample: () => templates.imageToTextOutput(),
	},

	// Image Classification Output
	{
		id: "image-classification-output",
		label: "JSON",
		priority: 1,
		matches: (schema, ctx) =>
			ctx.taskName === "Image Classification" &&
			schema.type === "array" &&
			schemaMatchers.hasProperty("items.properties.label")(schema) &&
			schemaMatchers.hasProperty("items.properties.score")(schema),
		generateExample: () => templates.imageClassificationOutput(),
	},
];
