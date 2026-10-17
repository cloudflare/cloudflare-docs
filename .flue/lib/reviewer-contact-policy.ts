/**
 * CODEOWNERS rules whose declared owners replace suggested contacts in the
 * public comment. Exact pattern matching keeps this policy independent of
 * mutable CODEOWNERS source-line numbers and derived product keys.
 */
export const CODEOWNERS_ONLY_CONTACT_PATTERNS = [
	"*",
	"/.github/CODEOWNERS",
	"/public/__redirects",
] as const;

export function isCodeownersOnlyContactPattern(
	pattern: string | null,
): boolean {
	return (
		pattern !== null &&
		(CODEOWNERS_ONLY_CONTACT_PATTERNS as readonly string[]).includes(pattern)
	);
}
