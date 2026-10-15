import { track } from "~/util/zaraz";

export function registerSearch() {
	document.addEventListener("docs-search-open", () =>
		track("click docs search pop-up"),
	);
}
