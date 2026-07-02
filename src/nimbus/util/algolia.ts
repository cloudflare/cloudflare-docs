/**
 * Algolia DocSearch credentials.
 *
 * Nimbus-local copy of the upstream `src/util/algolia.ts`. Nimbus overrides the
 * `~` alias to `src/nimbus`, so `~/util/algolia` imports (e.g. the shared
 * `src/scripts/webmcp.ts`, loaded from PageHead.astro) resolve here. Mirrors the
 * same nimbus-local util pattern as `zaraz.ts`, and promotes cleanly to
 * `src/util/algolia.ts` at cutover.
 *
 * These are the SAME public, search-only DocSearch credentials as production
 * (App ID + search-only API key + the `prod_devdocs` index). Sharing them means
 * the Nimbus preview reads the same index production does — read-only search, so
 * it can never modify the index; the only usage is a handful of search
 * operations, and only when the WebMCP tool is invoked. Keep byte-identical to
 * production so this is a faithful mirror and cutover is a no-op.
 */
export const ALGOLIA_APP_ID = "D32WIYFTUF";
export const ALGOLIA_API_KEY = "5cec275adc19dd3bc17617f7d9cf312a";
export const ALGOLIA_INDEX = "prod_devdocs";
export const ALGOLIA_INDEX_STYLE_GUIDE = "prod_devdocs_styleguide";
