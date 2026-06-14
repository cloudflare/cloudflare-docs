/**
 * Shared model identifiers used across Flue workflows.
 * Update here to change the model for all workflows at once.
 */

/** Primary model used for style-guide review, spam filter, and dependabot review. */
export const PRIMARY_MODEL =
	"cloudflare/@cf/moonshotai/kimi-k2.7-code" as const;

/** Lighter model used for the reconcile-code-review skill. */
export const RECONCILIATION_MODEL =
	"cloudflare/@cf/zai-org/glm-4.7-flash" as const;
