import { registerLinks } from "./analytics/links";
import { registerTabs } from "./analytics/tabs";
import { registerDetails } from "./analytics/details";
import { registerCopyButtons } from "./analytics/codeblocks";
import { registerHeader } from "./analytics/header";

/**
 * Nimbus analytics entry point — the counterpart to root
 * `src/scripts/analytics.ts`, injected on every page via BaseLayout.
 *
 * All listeners are delegated on `document`, which persists across Astro view
 * transitions, so registration must happen exactly once per document. The guard
 * makes this idempotent even if the module is re-evaluated.
 *
 * Search-open tracking (root's `docsearch.ts`) is intentionally omitted: search
 * is disabled in Nimbus (`search: false`), so no trigger renders. It will be
 * wired alongside the search work (E4).
 */
declare global {
	interface Window {
		__nbAnalyticsRegistered?: boolean;
	}
}

if (!window.__nbAnalyticsRegistered) {
	window.__nbAnalyticsRegistered = true;

	registerLinks();
	registerTabs();
	registerDetails();
	registerCopyButtons();
	registerHeader();
}
