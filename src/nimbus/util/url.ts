/**
 * URL helpers — small client-side history utilities.
 *
 * CF source: cloudflare-docs/src/util/url.ts (faithful port). Used by the
 * DirectoryCatalog component to reflect active filters in the query string.
 */
export function setSearchParams(params: URLSearchParams) {
  if (params.size === 0) {
    history.pushState(null, "", window.location.pathname);
    return;
  }

  history.pushState(
    null,
    "",
    `${window.location.pathname}?${params.toString()}`,
  );
}
