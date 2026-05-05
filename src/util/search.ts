import type { SearchModalSnippetElement } from "~/util/ai-search";

export const openGlobalSearch = (searchTerm?: string) => {
	const modal = document.querySelector<SearchModalSnippetElement>(
		"search-modal-snippet",
	);

	if (!modal) {
		return;
	}

	if (searchTerm) {
		void modal.search(searchTerm);
	} else {
		modal.open();
	}
};
