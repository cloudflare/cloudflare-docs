import type { DocsSearchElement } from "~/components/docs-search/docs-search";

/**
 * Opens the global docs search/chat panel in Search mode, optionally
 * pre-filling a query. Used by the 404 page and the sidebar "global search"
 * fallback. Falls back to legacy DocSearch selectors if the custom element
 * hasn't upgraded yet.
 */
export const openGlobalSearch = (searchTerm?: string) => {
	const panel = document.querySelector<DocsSearchElement>("cfdocs-docs-search");

	if (panel && typeof panel.open === "function") {
		panel.open("search", searchTerm);
		return;
	}

	// Fallback: click the trigger button directly if the element isn't ready.
	const trigger = document.querySelector<HTMLButtonElement>(
		"cfdocs-docs-search .ds-trigger",
	);
	trigger?.click();
};
