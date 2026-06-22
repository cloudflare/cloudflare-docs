export const INTERNAL_AUTH_HEADER = "x-flue-internal-token";

export function getInternalHeaders(env: Record<string, string>) {
	const token = env.DOCS_FLUE_INTERNAL_TOKEN;
	if (!token) {
		throw new Error(
			"DOCS_FLUE_INTERNAL_TOKEN is required for internal workflow dispatch.",
		);
	}
	return {
		"content-type": "application/json",
		[INTERNAL_AUTH_HEADER]: token,
	};
}

export function hasValidInternalToken(
	env: Record<string, string | undefined>,
	provided: string | undefined,
) {
	const expected = env.DOCS_FLUE_INTERNAL_TOKEN;
	return expected !== undefined && provided === expected;
}

export function normalizePathname(pathname: string) {
	return pathname.replace(/\/+$/, "") || "/";
}
