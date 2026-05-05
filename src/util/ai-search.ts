export const AI_SEARCH_ENDPOINT =
	"https://42281356-757d-430e-abe5-8aa153ac2f64.search.ai.cloudflare.com";

export interface SearchModalSnippetElement extends HTMLElement {
	open(): void;
	search(query: string): Promise<void>;
}

export function getSearchModal(): SearchModalSnippetElement | null {
	return document.querySelector<SearchModalSnippetElement>(
		"search-modal-snippet",
	);
}
