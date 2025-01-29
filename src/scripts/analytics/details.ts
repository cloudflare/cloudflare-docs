import { track } from "~/util/zaraz";

export function registerDetails() {
	const elements = document.querySelectorAll<HTMLDetailsElement>("details");

	if (!elements || elements.length === 0) {
		return;
	}

	for (const el of elements) {
		const summary = el.querySelector("summary");

		if (!summary) continue;

		el.addEventListener("toggle", () => {
			if (!el.open) return;
			track("dropdown click", { text: summary.innerText });
		});
	}
}
