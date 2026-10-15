import { registerLinks } from "./analytics/links";
import { registerTabs } from "./analytics/tabs";
import { registerDetails } from "./analytics/details";
import { registerCopyButtons } from "./analytics/codeblocks";
import { registerHeader } from "./analytics/header";
import { registerSearch } from "./analytics/search";

// Listeners are delegated on `document`; the guard registers them once per
// document (idempotent across view transitions / module re-evaluation).
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
	registerSearch();
}
