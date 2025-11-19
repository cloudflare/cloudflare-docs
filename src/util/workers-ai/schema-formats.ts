// Type definitions for format matching system
export interface Schema {
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
	contentType?: string;
	pattern?: string;
	// Allow indexing for dynamic property access
	[key: string]: any;
}

export interface FormatMatcher {
	id: string;
	label: string;
	priority: number;
	matches: (schema: Schema, context: FormatContext) => boolean;
	generateExample: (schema: Schema, context: FormatContext) => string;
}

export interface FormatContext {
	type: "input" | "output";
	taskName?: string;
	modelName?: string;
}

// Helper functions for schema matching
export const schemaMatchers = {
	hasProperty:
		(path: string) =>
		(schema: Schema): boolean => {
			const parts = path.split(".");
			let current = schema;
			for (const part of parts) {
				if (!current || typeof current !== "object") return false;
				current = current[part];
			}
			return current !== undefined;
		},

	propertyEquals:
		(path: string, value: any) =>
		(schema: Schema): boolean => {
			const parts = path.split(".");
			let current: any = schema;
			for (const part of parts) {
				if (!current || typeof current !== "object") return false;
				current = current[part];
			}
			return current === value;
		},

	propertyIncludes:
		(path: string, substring: string) =>
		(schema: Schema): boolean => {
			const parts = path.split(".");
			let current: any = schema;
			for (const part of parts) {
				if (!current || typeof current !== "object") return false;
				current = current[part];
			}
			return (
				typeof current === "string" &&
				current.toLowerCase().includes(substring.toLowerCase())
			);
		},

	isBinary: (schema: Schema): boolean =>
		schema.type === "string" && schema.format === "binary",

	isObject: (schema: Schema): boolean =>
		schema.type === "object" ||
		!!(schema.properties && typeof schema.properties === "object"),
};

// Smart fallback that generates examples from schema
export function generateFromSchema(schema: Schema): string {
	const properties = schema.properties || {};
	const required = schema.required || [];
	const exampleObj: any = {};

	required.forEach((field: string) => {
		const fieldSchema = properties[field];
		if (fieldSchema) {
			exampleObj[field] = inferExampleValue(field, fieldSchema);
		} else {
			exampleObj[field] = `<${field}>`;
		}
	});

	return JSON.stringify(exampleObj, null, 2);
}

function inferExampleValue(fieldName: string, propSchema: Schema): any {
	// Use enum first value if available
	if (propSchema.enum && propSchema.enum.length > 0) {
		return propSchema.enum[0];
	}

	// Use default value if available
	if (propSchema.default !== undefined) {
		return propSchema.default;
	}

	// Use description if it looks like an example
	if (propSchema.description && propSchema.description.length < 100) {
		return propSchema.description;
	}

	// Type-based defaults
	if (propSchema.type === "string") {
		// Check if pattern suggests a numeric string
		if (propSchema.pattern === "^[0-9]+$") {
			if (fieldName.toLowerCase().includes("rate")) {
				return "16000";
			}
			return "1000";
		}
		return `<${fieldName}>`;
	}

	if (propSchema.type === "number" || propSchema.type === "integer") {
		return 0;
	}

	if (propSchema.type === "boolean") {
		return false;
	}

	if (propSchema.type === "array") {
		return [];
	}

	return `<${fieldName}>`;
}

// Format detection - finds the best matching format
// Registry is pre-sorted by priority (lower number = higher priority)
export function detectFormat(
	schema: Schema,
	context: FormatContext,
	formatRegistry: FormatMatcher[],
): FormatMatcher | null {
	for (const format of formatRegistry) {
		if (format.matches(schema, context)) {
			return format;
		}
	}

	return null;
}
