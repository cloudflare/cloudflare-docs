import { track } from "~/util/zaraz";

export function registerDocSearch() {
	document.querySelector("#docsearch")?.addEventListener("click", () => {
		track("click docs search pop-up");
	});
}
