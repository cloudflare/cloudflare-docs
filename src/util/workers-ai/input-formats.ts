import type { FormatMatcher } from "./schema-formats";
import { schemaMatchers } from "./schema-formats";
import * as templates from "./templates";

export const INPUT_FORMATS: FormatMatcher[] = [
	// Binary format
	{
		id: "binary-audio",
		label: "Binary",
		priority: 100,
		matches: (schema) => schemaMatchers.isBinary(schema),
		generateExample: () => templates.binaryAudio(),
	},

	// LLM Formats
	{
		id: "llm-messages",
		label: "Messages",
		priority: 4,
		matches: (schema) =>
			schemaMatchers.hasProperty("properties.messages")(schema),
		generateExample: () => templates.llmMessages(),
	},

	{
		id: "llm-prompt",
		label: "Prompt",
		priority: 5,
		matches: (schema) =>
			schemaMatchers.hasProperty("properties.prompt")(schema) &&
			!schemaMatchers.propertyIncludes("title", "async")(schema),
		generateExample: () => templates.llmPrompt(),
	},

	// GPT-OSS / Responses format
	{
		id: "gpt-oss-responses",
		label: "Responses",
		priority: 6,
		matches: (schema, _ctx) =>
			schemaMatchers.propertyIncludes("title", "gpt_oss")(schema) ||
			schemaMatchers.propertyIncludes("title", "responses")(schema),
		generateExample: (_schema, ctx) => templates.gptOssResponses(ctx.modelName),
	},

	// Text Embeddings
	{
		id: "embeddings-query-contexts",
		label: "Query and Contexts",
		priority: 3,
		matches: (schema, ctx) =>
			ctx.taskName === "Text Embeddings" &&
			schemaMatchers.hasProperty("properties.query")(schema) &&
			schemaMatchers.hasProperty("properties.contexts")(schema),
		generateExample: () => templates.embeddingsQueryContexts(),
	},

	{
		id: "embeddings-text",
		label: "Embedding",
		priority: 2,
		matches: (schema, ctx) =>
			ctx.taskName === "Text Embeddings" &&
			schemaMatchers.hasProperty("properties.text")(schema),
		generateExample: () => templates.embeddingsText(),
	},

	// Async Batch
	{
		id: "async-batch",
		label: "Async Batch",
		priority: 9,
		matches: (schema) =>
			schemaMatchers.hasProperty("properties.requests")(schema) ||
			schemaMatchers.propertyIncludes("title", "async")(schema) ||
			schemaMatchers.propertyIncludes("title", "batch")(schema),
		generateExample: (_schema, ctx) => {
			if (ctx.taskName === "Text Embeddings") {
				return templates.asyncBatchEmbeddings();
			}
			return templates.asyncBatchLLM();
		},
	},

	// Automatic Speech Recognition
	{
		id: "asr-nova3",
		label: "JSON",
		priority: 1,
		matches: (schema, ctx) =>
			ctx.taskName === "Automatic Speech Recognition" &&
			schemaMatchers.hasProperty("properties.audio.properties.body")(schema),
		generateExample: () => templates.asrNova3(),
	},

	{
		id: "asr-whisper-array",
		label: "JSON",
		priority: 1,
		matches: (schema, ctx) =>
			ctx.taskName === "Automatic Speech Recognition" &&
			schemaMatchers.hasProperty("properties.audio.items")(schema),
		generateExample: () => templates.asrWhisperArray(),
	},

	{
		id: "asr-flux",
		label: "JSON",
		priority: 1,
		matches: (schema, ctx) =>
			ctx.taskName === "Automatic Speech Recognition" &&
			schemaMatchers.hasProperty("properties.encoding")(schema) &&
			schemaMatchers.hasProperty("properties.sample_rate")(schema),
		generateExample: (schema) => {
			// Use schema information for intelligent defaults
			const encoding = schema.properties.encoding?.enum?.[0] || "linear16";
			const sampleRate = "16000";
			return templates.asrFlux(encoding, sampleRate);
		},
	},

	// Text-to-Speech
	{
		id: "tts-prompt",
		label: "Text-to-Speech",
		priority: 1,
		matches: (schema, ctx) =>
			ctx.taskName === "Text-to-Speech" &&
			schemaMatchers.hasProperty("properties.prompt")(schema),
		generateExample: () => templates.ttsPrompt(),
	},

	{
		id: "tts-text",
		label: "Text-to-Speech",
		priority: 1,
		matches: (schema, ctx) =>
			ctx.taskName === "Text-to-Speech" &&
			schemaMatchers.hasProperty("properties.text")(schema),
		generateExample: () => templates.ttsText(),
	},

	// Text-to-Image
	{
		id: "text-to-image-img2img",
		label: "Image-to-Image",
		priority: 2,
		matches: (schema, ctx) =>
			ctx.taskName === "Text-to-Image" &&
			(schemaMatchers.hasProperty("properties.image")(schema) ||
				schemaMatchers.hasProperty("properties.image_b64")(schema)),
		generateExample: () => templates.textToImageImg2Img(),
	},

	{
		id: "text-to-image-prompt",
		label: "Text-to-Image",
		priority: 1,
		matches: (schema, ctx) =>
			ctx.taskName === "Text-to-Image" &&
			schemaMatchers.hasProperty("properties.prompt")(schema),
		generateExample: () => templates.textToImagePrompt(),
	},

	// Summarization
	{
		id: "summarization-input",
		label: "JSON",
		priority: 1,
		matches: (schema, ctx) =>
			ctx.taskName === "Summarization" &&
			schemaMatchers.hasProperty("properties.input_text")(schema),
		generateExample: () => templates.summarizationInput(),
	},

	// Text Classification
	{
		id: "text-classification-input",
		label: "JSON",
		priority: 1,
		matches: (schema, ctx) =>
			ctx.taskName === "Text Classification" &&
			schemaMatchers.hasProperty("properties.text")(schema) &&
			!schemaMatchers.hasProperty("properties.query")(schema),
		generateExample: () => templates.textClassificationInput(),
	},

	// Object Detection
	{
		id: "object-detection-binary",
		label: "Binary",
		priority: 1,
		matches: (schema, ctx) =>
			ctx.taskName === "Object Detection" && schemaMatchers.isBinary(schema),
		generateExample: () => templates.objectDetectionBinary(),
	},

	{
		id: "object-detection-image",
		label: "JSON",
		priority: 2,
		matches: (schema, ctx) =>
			ctx.taskName === "Object Detection" &&
			schemaMatchers.hasProperty("properties.image.items")(schema),
		generateExample: () => templates.objectDetectionImage(),
	},

	// Translation
	{
		id: "translation-input",
		label: "JSON",
		priority: 1,
		matches: (schema, ctx) =>
			ctx.taskName === "Translation" &&
			schemaMatchers.hasProperty("properties.text")(schema) &&
			schemaMatchers.hasProperty("properties.target_lang")(schema) &&
			!schemaMatchers.hasProperty("properties.requests")(schema),
		generateExample: () => templates.translationInput(),
	},
];
