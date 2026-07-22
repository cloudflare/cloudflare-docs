import { track } from "~/util/zaraz";

// Fire prod's "click docs search pop-up" event on a click within #docsearch.
// Delegated so it survives view transitions and the button's mount re-render.
export function registerDocSearch() {
	document.addEventListener("click", (event) => {
		const trigger = (event.target as Element | null)?.closest("#docsearch");
		if (!trigger) return;
		track("click docs search pop-up");
	});
}
