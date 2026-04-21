/**
 * Client-safe model helper functions.
 * These don't depend on Astro and can be used in React components.
 */

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
