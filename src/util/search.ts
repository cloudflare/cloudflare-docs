import type { SearchModalSnippet } from "@cloudflare/ai-search-snippet/search";

export const openGlobalSearch = async (searchTerm?: string) => {
	const modal = document.querySelector<SearchModalSnippet>(
		"search-modal-snippet",
	);
	if (!modal) return;

	await customElements.whenDefined("search-modal-snippet");
	if (searchTerm) await modal.search(searchTerm);
	else modal.open();
};
