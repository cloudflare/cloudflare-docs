import type { FormatMatcher } from './schema-formats';
import { schemaMatchers } from './schema-formats';
import * as templates from './templates';

export const INPUT_FORMATS: FormatMatcher[] = [
	// Binary format
	{
		id: 'binary-audio',
		label: 'Binary',
		priority: 100,
		matches: (schema) => schemaMatchers.isBinary(schema),
		generateExample: () => templates.binaryAudio(),
	},

	// LLM Formats
	{
		id: 'llm-messages',
		label: 'Messages',
		priority: 4,
		matches: (schema) => schemaMatchers.hasProperty('properties.messages')(schema),
		generateExample: () => templates.llmMessages(),
	},

	{
		id: 'llm-prompt',
		label: 'Prompt',
		priority: 5,
		matches: (schema) =>
			schemaMatchers.hasProperty('properties.prompt')(schema) &&
			!schemaMatchers.propertyIncludes('title', 'async')(schema),
		generateExample: () => templates.llmPrompt(),
	},

	// GPT-OSS / Responses format
	{
		id: 'gpt-oss-responses',
		label: 'Responses',
		priority: 6,
		matches: (schema, ctx) =>
			schemaMatchers.propertyIncludes('title', 'gpt_oss')(schema) ||
			schemaMatchers.propertyIncludes('title', 'responses')(schema),
		generateExample: (schema, ctx) => templates.gptOssResponses(ctx.modelName),
	},

	// Text Embeddings
	{
		id: 'embeddings-query-contexts',
		label: 'Query and Contexts',
		priority: 3,
		matches: (schema, ctx) =>
			ctx.taskName === 'Text Embeddings' &&
			schemaMatchers.hasProperty('properties.query')(schema) &&
			schemaMatchers.hasProperty('properties.contexts')(schema),
		generateExample: () => templates.embeddingsQueryContexts(),
	},

	{
		id: 'embeddings-text',
		label: 'Embedding',
		priority: 2,
		matches: (schema, ctx) =>
			ctx.taskName === 'Text Embeddings' &&
			schemaMatchers.hasProperty('properties.text')(schema),
		generateExample: () => templates.embeddingsText(),
	},

	// Async Batch
	{
		id: 'async-batch',
		label: 'Async Batch',
		priority: 9,
		matches: (schema) =>
			schemaMatchers.hasProperty('properties.requests')(schema) ||
			schemaMatchers.propertyIncludes('title', 'async')(schema) ||
			schemaMatchers.propertyIncludes('title', 'batch')(schema),
		generateExample: (schema, ctx) => {
			if (ctx.taskName === 'Text Embeddings') {
				return templates.asyncBatchEmbeddings();
			}
			return templates.asyncBatchLLM();
		},
	},

	// Automatic Speech Recognition
	{
		id: 'asr-nova3',
		label: 'JSON',
		priority: 1,
		matches: (schema, ctx) =>
			ctx.taskName === 'Automatic Speech Recognition' &&
			schemaMatchers.hasProperty('properties.audio.properties.body')(schema),
		generateExample: () => templates.asrNova3(),
	},

	{
		id: 'asr-whisper-array',
		label: 'JSON',
		priority: 1,
		matches: (schema, ctx) =>
			ctx.taskName === 'Automatic Speech Recognition' &&
			schemaMatchers.hasProperty('properties.audio.items')(schema),
		generateExample: () => templates.asrWhisperArray(),
	},

	{
		id: 'asr-flux',
		label: 'JSON',
		priority: 1,
		matches: (schema, ctx) =>
			ctx.taskName === 'Automatic Speech Recognition' &&
			schemaMatchers.hasProperty('properties.encoding')(schema) &&
			schemaMatchers.hasProperty('properties.sample_rate')(schema),
		generateExample: (schema) => {
			// Use schema information for intelligent defaults
			const encoding = schema.properties.encoding?.enum?.[0] || 'linear16';
			const sampleRate = '16000';
			return templates.asrFlux(encoding, sampleRate);
		},
	},

	// Text-to-Speech
	{
		id: 'tts-prompt',
		label: 'Text-to-Speech',
		priority: 1,
		matches: (schema, ctx) =>
			ctx.taskName === 'Text-to-Speech' &&
			schemaMatchers.hasProperty('properties.prompt')(schema),
		generateExample: () => templates.ttsPrompt(),
	},

	{
		id: 'tts-text',
		label: 'Text-to-Speech',
		priority: 1,
		matches: (schema, ctx) =>
			ctx.taskName === 'Text-to-Speech' &&
			schemaMatchers.hasProperty('properties.text')(schema),
		generateExample: () => templates.ttsText(),
	},
];
