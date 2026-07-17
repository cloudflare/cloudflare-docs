/**
 * URL helpers — small client-side history utilities.
 */
export function setSearchParams(
	params: URLSearchParams,
	opts: { replace?: boolean } = {},
) {
	const next =
		params.size === 0
			? `${window.location.pathname}${window.location.hash}`
			: `${window.location.pathname}?${params.toString()}${window.location.hash}`;

	if (opts.replace) {
		history.replaceState(null, "", next);
	} else {
		history.pushState(null, "", next);
	}
}
