import { track } from "~/util/zaraz";

// Delegated so it survives view transitions without counting modal interactions.
export function registerDocSearch() {
	const trackSearchOpen = () => track("click docs search pop-up");

	document.addEventListener("click", (event) => {
		const trigger = (event.target as Element | null)?.closest(
			"[data-search-trigger]",
		);
		if (!trigger) return;
		trackSearchOpen();
	});
	document.addEventListener("docs-search-open", trackSearchOpen);
}
