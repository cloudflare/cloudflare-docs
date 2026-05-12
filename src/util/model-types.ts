/**
 * Client-safe model type definitions.
 * These don't depend on Astro and can be used in React components.
 */

import type { CodeSnippet, ModelExample } from "~/schemas/catalog-models";

/**
 * Slimmed model type for the catalog index pages.
 * Only includes the fields needed to render model cards and run filters.
 * schema, apiModes, codeSnippets, examples, metadata, etc. are stripped
 * to avoid serializing megabytes of JSON Schema data into the page HTML.
 */
export interface ModelCardData {
	name: string;
	modelId: string;
	slug: string;
	displayName: string;
	description: string;
	task: {
		id: string;
		name: string;
		description: string;
	};
	tags: string[];
	contextLength?: number;
	maxOutputTokens?: number;
	supportsAsync: boolean;
	id: string;
	source: number;
	created_at?: string;
	properties: Array<{
		property_id: string;
		value: string | Array<Record<string, unknown>>;
	}>;
	dataSource: "catalog" | "legacy";
	hosting: "proxied" | "hosted";
}

/**
 * Represents a distinct API mode for a model (e.g., sync, streaming, batch).
 * Each mode has its own input/output schema derived from the combined schema.
 */
export interface ApiMode {
	id: string; // e.g., "sync", "streaming", "batch"
	name: string; // Human-readable name, e.g., "Synchronous", "Streaming", "Batch"
	description?: string; // Optional description of this mode
	input: Record<string, unknown>; // Input schema for this mode
	output: Record<string, unknown>; // Output schema for this mode
}

/**
 * Unified model interface that works with both catalog and legacy data sources.
 * When a model exists in the catalog, catalog data replaces legacy entirely.
 */
export interface ResolvedModel {
	// Identification - 'name' is the full model ID for compatibility with existing components
	name: string; // @cf/author/name (same as modelId, for backward compatibility)
	modelId: string; // @cf/author/name
	slug: string; // Full model path used in URL routing (e.g., "openai/tts-1")
	displayName: string; // Human-readable name

	// Content
	description: string;
	task: {
		id: string;
		name: string;
		description: string;
	};

	// Schema (combined/raw)
	schema: {
		input: Record<string, unknown>;
		output: Record<string, unknown>;
	};

	// API modes - split schema into logical usage patterns
	// e.g., sync vs streaming vs batch
	apiModes?: ApiMode[];

	// Capabilities & metadata
	tags: string[];
	contextLength?: number;
	maxOutputTokens?: number;
	supportsAsync: boolean;

	// Enhanced fields (catalog only)
	codeSnippets?: CodeSnippet[];
	examples?: ModelExample[];
	defaultExample?: {
		input?: Record<string, unknown>;
		output?: Record<string, unknown>;
		code_snippets?: CodeSnippet[];
	};
	metadata?: Record<string, unknown>;
	coverImageUrl?: string;

	// Links
	externalInfo?: string;
	terms?: string;

	// Legacy compatibility fields
	id: string; // Unique identifier
	source: number; // 1 for legacy, 2 for catalog (numeric for legacy compatibility)
	created_at?: string; // Creation timestamp

	// Legacy properties (for backward compatibility with existing components)
	properties: Array<{
		property_id: string;
		value: string | Array<Record<string, unknown>>;
	}>;

	// Source tracking (for internal use)
	dataSource: "catalog" | "legacy";

	// Hosting type: proxied models are served via third-party providers,
	// hosted models run on Cloudflare infrastructure.
	// Currently inferred from data source; will eventually come from the Deus CMS.
	hosting: "proxied" | "hosted";
}
