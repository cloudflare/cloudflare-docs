/**
 * Shared types for schema display components
 */

/**
 * Schema row data structure for rendering parameter trees
 */
export interface SchemaRowData {
	id: string;
	name: string;
	type: string;
	isArray: boolean;
	isObject: boolean;
	isOneOf: boolean;
	isOneOfChild: boolean; // This item is a child of a oneOf/anyOf
	isFirstOneOfChild: boolean; // First child (no OR divider before)
	isLastOneOfChild: boolean; // Last child (no OR divider after, so show border)
	required: boolean;
	defaultValue?: string;
	description?: string;
	enumValues?: string[];
	// Generic metadata - all other schema properties (format, min, max, minItems, maxItems, etc.)
	metadata?: Record<string, string | number | boolean>;
	depth: number;
	isLast: boolean;
	ancestorIsLast: boolean[];
	children?: SchemaRowData[];
}
