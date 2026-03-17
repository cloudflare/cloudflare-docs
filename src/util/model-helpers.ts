/**
 * Client-safe model helper functions.
 * These don't depend on Astro and can be used in React components.
 */

/**
 * Extract the model slug from a model ID.
 * Handles both legacy format (@cf/author/model-name) and catalog format (author/model-name).
 * @example "@cf/meta/llama-3.1-8b-instruct" -> "llama-3.1-8b-instruct"
 * @example "google/nano-banana" -> "nano-banana"
 */
export function getModelSlug(modelId: string): string {
	const parts = modelId.split("/");
	// Legacy format: @cf/author/model-name (3 parts, take last)
	// Catalog format: author/model-name (2 parts, take last)
	return parts[parts.length - 1];
}

/**
 * Extract the author/provider from a model ID.
 * @example "@cf/meta/llama-3.1-8b-instruct" -> "meta"
 * @example "google/nano-banana" -> "google"
 */
export function getModelAuthor(modelId: string): string {
	const parts = modelId.split("/");
	// Legacy format: @cf/author/model-name (author at index 1)
	// Catalog format: author/model-name (author at index 0)
	if (parts[0].startsWith("@")) {
		return parts[1] || parts[0];
	}
	return parts[0];
}
