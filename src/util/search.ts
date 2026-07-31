import type { SearchModalSnippet } from "@cloudflare/ai-search-snippet/search";

export const openGlobalSearch = async (searchTerm?: string) => {
	const snippet = document.querySelector<SearchModalSnippet>(
		"search-modal-snippet",
	);
	if (snippet) {
		await customElements.whenDefined("search-modal-snippet");
		const modal = document.querySelector<SearchModalSnippet>(
			"search-modal-snippet",
		);
		if (!modal) return;

		document.dispatchEvent(new Event("docs-search-open"));
		if (searchTerm) await modal.search(searchTerm);
		else modal.open();
		return;
	}

	const docSearchButton = document.querySelector<HTMLButtonElement>(
		"#docsearch button, .DocSearch-Button, [data-docsearch-button]",
	);
	if (!docSearchButton) return;
	docSearchButton.click();

	if (searchTerm) {
		setTimeout(() => {
			const searchInput = document.querySelector<HTMLInputElement>(
				".DocSearch-Input, #docsearch-input, [data-docsearch-input]",
			);
			if (!searchInput) return;
			searchInput.value = searchTerm;
			searchInput.focus();
			searchInput.dispatchEvent(new Event("input", { bubbles: true }));
		}, 100);
	}
};
