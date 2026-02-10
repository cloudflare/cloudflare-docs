export const openGlobalSearch = (searchTerm?: string) => {
	// Try multiple selectors for DocSearch
	const docSearchButton =
		(document.querySelector("#docsearch button") as HTMLButtonElement) ||
		(document.querySelector(".DocSearch-Button") as HTMLButtonElement) ||
		(document.querySelector("[data-docsearch-button]") as HTMLButtonElement);

	if (docSearchButton) {
		// Click the DocSearch button to open the modal
		docSearchButton.click();

		if (searchTerm) {
			// Wait for modal to open and set the search term
			setTimeout(() => {
				const searchInput =
					(document.querySelector(".DocSearch-Input") as HTMLInputElement) ||
					(document.querySelector("#docsearch-input") as HTMLInputElement) ||
					(document.querySelector(
						"[data-docsearch-input]",
					) as HTMLInputElement);

				if (searchInput) {
					searchInput.value = searchTerm;
					searchInput.focus();
					// Trigger search
					searchInput.dispatchEvent(new Event("input", { bubbles: true }));
				}
			}, 100);
		}
	}
};
