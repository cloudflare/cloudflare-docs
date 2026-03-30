/**
 * Client-safe model type definitions.
 * These don't depend on Astro and can be used in React components.
 */

import type { CodeSnippet, ModelExample } from "~/schemas/catalog-models";

/**
 * Unified model interface that works with both catalog and legacy data sources.
 * When a model exists in the catalog, catalog data replaces legacy entirely.
 */
export interface ResolvedModel {
	// Identification - 'name' is the full model ID for compatibility with existing components
	name: string; // @cf/author/name (same as modelId, for backward compatibility)
	modelId: string; // @cf/author/name
	slug: string; // model-name (for URLs)
	displayName: string; // Human-readable name

	// Content
	description: string;
	task: {
		id: string;
		name: string;
		description: string;
	};

	// Schema
	schema: {
		input: Record<string, unknown>;
		output: Record<string, unknown>;
	};

	// Capabilities & metadata
	tags: string[];
	contextLength?: number;
	maxOutputTokens?: number;
	supportsAsync: boolean;

	// Pricing
	pricing?: Record<string, number>;

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
