/**
 * Generate example JSON data from a JSON schema
 * This utility creates realistic example inputs and outputs for Workers AI model schemas
 */

type JsonSchema = {
	type?: string;
	properties?: Record<string, any>;
	items?: any;
	oneOf?: any[];
	required?: string[];
	default?: any;
	description?: string;
	format?: string;
	enum?: any[];
	minLength?: number;
	maxLength?: number;
	minimum?: number;
	maximum?: number;
	title?: string;
};

/**
 * Task-specific example data templates
 */
export const TASK_EXAMPLES = {
	"Text Generation": {
		prompt: "Tell me an interesting fact about space exploration",
		messages: [
			{ role: "system", content: "You are a helpful assistant" },
			{
				role: "user",
				content: "What are the key principles of quantum computing?",
			},
		],
	},
	"Automatic Speech Recognition": {
		audio: "<<binary audio data>>",
	},
	"Image Classification": {
		image: "<<binary image data>>",
	},
	"Image-to-Text": {
		image: "<<binary image data>>",
		prompt: "Describe this image in detail",
	},
	"Text-to-Image": {
		prompt: "A serene mountain landscape at sunset with snow-capped peaks",
	},
	"Text Embeddings": {
		text: "The quick brown fox jumps over the lazy dog",
	},
	"Text-to-Speech": {
		text: "Hello, welcome to Cloudflare Workers AI",
	},
	Translation: {
		text: "Hello, how are you today?",
		source_lang: "en",
		target_lang: "es",
	},
	Summarization: {
		input_text:
			"Artificial intelligence (AI) is intelligence demonstrated by machines, as opposed to natural intelligence displayed by animals including humans. AI research has been defined as the field of study of intelligent agents, which refers to any system that perceives its environment and takes actions that maximize its chance of achieving its goals.",
	},
	"Text Classification": {
		text: "I absolutely loved this product! It exceeded all my expectations.",
	},
	"Object Detection": {
		image: "<<binary image data>>",
	},
	"Voice Activity Detection": {
		audio: "<<binary audio data>>",
	},
};

/**
 * Generate a realistic example value for a given schema property
 */
function generateExampleValue(
	propertyName: string,
	schema: JsonSchema,
	taskName?: string,
): any {
	// Check for default value
	if (schema.default !== undefined) {
		return schema.default;
	}

	// Check for enum
	if (schema.enum && schema.enum.length > 0) {
		return schema.enum[0];
	}

	// Use task-specific examples if available
	if (taskName && TASK_EXAMPLES[taskName as keyof typeof TASK_EXAMPLES]) {
		const taskExample =
			TASK_EXAMPLES[taskName as keyof typeof TASK_EXAMPLES] as Record<
				string,
				any
			>;
		if (propertyName in taskExample) {
			return taskExample[propertyName];
		}
	}

	// Handle specific property names with common patterns
	if (propertyName === "prompt") {
		return "Tell me an interesting fact";
	}
	if (propertyName === "messages") {
		return [
			{ role: "system", content: "You are a helpful assistant" },
			{ role: "user", content: "What is the capital of France?" },
		];
	}
	if (propertyName === "text") {
		return "Sample text for processing";
	}
	if (propertyName === "audio" && schema.type === "array") {
		return [255, 216, 255, 224];
	}
	if (propertyName === "image" && schema.type === "array") {
		return [255, 216, 255, 224];
	}
	if (propertyName === "temperature") {
		return 0.7;
	}
	if (propertyName === "max_tokens") {
		return 512;
	}
	if (propertyName === "stream") {
		return false;
	}

	// Generate based on type
	switch (schema.type) {
		case "string":
			if (schema.format === "binary") {
				return "<<binary data>>";
			}
			return "example string";
		case "number":
			if (schema.minimum !== undefined) {
				return schema.minimum;
			}
			return 0.5;
		case "integer":
			if (schema.minimum !== undefined) {
				return schema.minimum;
			}
			if (schema.default !== undefined) {
				return schema.default;
			}
			return 256;
		case "boolean":
			return false;
		case "array":
			if (schema.items) {
				return [generateExampleValue("item", schema.items, taskName)];
			}
			return [];
		case "object":
			if (schema.properties) {
				return generateExampleFromSchema(schema, taskName);
			}
			return {};
		default:
			return null;
	}
}

/**
 * Generate an example JSON object from a schema
 */
export function generateExampleFromSchema(
	schema: JsonSchema,
	taskName?: string,
): any {
	// Handle oneOf by selecting the first option (don't recurse here, let generateAllExamples handle it)
	if (schema.oneOf && Array.isArray(schema.oneOf)) {
		// Find the option with the most meaningful title or the first one
		const selectedOption =
			schema.oneOf.find(
				(option) =>
					option.title === "Messages" || option.title === "Prompt",
			) || schema.oneOf[0];
		// Don't recurse - directly process this option
		schema = selectedOption;
	}

	// Handle binary format
	if (schema.format === "binary") {
		return "<<binary data>>";
	}

	// Handle object type with properties
	if (schema.properties) {
		const example: Record<string, any> = {};
		const required = schema.required || [];

		// Only include required properties for cleaner examples
		for (const [key, propSchema] of Object.entries(schema.properties)) {
			if (required.includes(key)) {
				example[key] = generateExampleValue(key, propSchema, taskName);
			}
		}

		return example;
	}

	// Handle object type without properties
	if (schema.type === "object" && !schema.properties) {
		return {};
	}

	// Handle array type
	if (schema.type === "array" && schema.items) {
		return [generateExampleValue("item", schema.items, taskName)];
	}

	// Handle primitive types
	if (schema.type) {
		return generateExampleValue("value", schema, taskName);
	}

	// Fallback
	return null;
}

/**
 * Generate all example variations for a schema with oneOf
 */
export function generateAllExamples(
	schema: JsonSchema,
	taskName?: string,
): { title: string; example: any }[] {
	if (schema.oneOf && Array.isArray(schema.oneOf)) {
		return schema.oneOf.map((option, index) => {
			const title = option.title || `Option ${index + 1}`;
			const example = generateExampleFromSchema(option, taskName);
			return { title, example };
		});
	}

	// If no oneOf, return a single example
	return [
		{
			title: "Example",
			example: generateExampleFromSchema(schema, taskName),
		},
	];
}
