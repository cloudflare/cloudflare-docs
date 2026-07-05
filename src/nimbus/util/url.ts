/**
 * URL helpers — small client-side history utilities.
 */
export function setSearchParams(
  params: URLSearchParams,
  opts: { replace?: boolean } = {},
) {
  const next =
    params.size === 0
      ? window.location.pathname
      : `${window.location.pathname}?${params.toString()}`;

  if (opts.replace) {
    history.replaceState(null, "", next);
  } else {
    history.pushState(null, "", next);
  }
}
