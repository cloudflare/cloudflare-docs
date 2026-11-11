/** Models whose served legacy aliases explicitly canonicalize to /ai/models. */
export const unifiedCanonicalModelIds = new Set([
	"@cf/cloudflare/clef",
	"@cf/cloudflare/clef-flash",
	"@cf/cloudflare/clef-omni",
	"@cf/cloudflare/clairic",
]);

/**
 * Extract the author/provider from a model ID.
 * @example "@cf/meta/llama-3.1-8b-instruct" -> "meta"
 * @example "google/nano-banana" -> "google"
 */
export function getModelAuthor(modelId: string): string {
	const parts = modelId.split("/");
	// Legacy `@cf/author/name` puts the author at index 1; catalog `author/name`
	// puts it at index 0.
	if (parts[0].startsWith("@")) {
		return parts[1] || parts[0];
	}
	return parts[0];
}
