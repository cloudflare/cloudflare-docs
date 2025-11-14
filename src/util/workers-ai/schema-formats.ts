// Type definitions for format matching system
export interface FormatMatcher {
	id: string;
	label: string;
	priority: number;
	matches: (schema: any, context: FormatContext) => boolean;
	generateExample: (schema: any, context: FormatContext) => string;
}

export interface FormatContext {
	type: 'input' | 'output';
	taskName?: string;
	modelName?: string;
}

// Helper functions for schema matching
export const schemaMatchers = {
	hasProperty: (path: string) => (schema: any): boolean => {
		const parts = path.split('.');
		let current = schema;
		for (const part of parts) {
			if (!current || typeof current !== 'object') return false;
			current = current[part];
		}
		return current !== undefined;
	},

	propertyEquals: (path: string, value: any) => (schema: any): boolean => {
		const parts = path.split('.');
		let current = schema;
		for (const part of parts) {
			if (!current || typeof current !== 'object') return false;
			current = current[part];
		}
		return current === value;
	},

	propertyIncludes: (path: string, substring: string) => (schema: any): boolean => {
		const parts = path.split('.');
		let current = schema;
		for (const part of parts) {
			if (!current || typeof current !== 'object') return false;
			current = current[part];
		}
		return typeof current === 'string' && current.toLowerCase().includes(substring.toLowerCase());
	},

	isBinary: (schema: any): boolean =>
		schema.type === 'string' && schema.format === 'binary',

	isObject: (schema: any): boolean =>
		schema.type === 'object' || (schema.properties && typeof schema.properties === 'object'),
};

// Helper to get nested property safely
export function getNestedProperty(obj: any, path: string): any {
	const parts = path.split('.');
	let current = obj;
	for (const part of parts) {
		if (!current || typeof current !== 'object') return undefined;
		current = current[part];
	}
	return current;
}

// Smart fallback that generates examples from schema
export function generateFromSchema(schema: any): string {
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

function inferExampleValue(fieldName: string, propSchema: any): any {
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
	if (propSchema.type === 'string') {
		// Check if pattern suggests a numeric string
		if (propSchema.pattern === '^[0-9]+$') {
			if (fieldName.toLowerCase().includes('rate')) {
				return '16000';
			}
			return '1000';
		}
		return `<${fieldName}>`;
	}

	if (propSchema.type === 'number' || propSchema.type === 'integer') {
		return 0;
	}

	if (propSchema.type === 'boolean') {
		return false;
	}

	if (propSchema.type === 'array') {
		return [];
	}

	return `<${fieldName}>`;
}

// Format detection - finds the best matching format
export function detectFormat(
	schema: any,
	context: FormatContext,
	formatRegistry: FormatMatcher[]
): FormatMatcher | null {
	// Sort by priority (lower number = higher priority)
	const sortedFormats = [...formatRegistry].sort((a, b) => a.priority - b.priority);

	for (const format of sortedFormats) {
		if (format.matches(schema, context)) {
			return format;
		}
	}

	return null;
}
