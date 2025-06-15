import { track } from "~/util/zaraz";

export function registerCopyButtons() {
	const elements = document.querySelectorAll<HTMLElement>(
		".expressive-code > figure.frame",
	);

	if (!elements || elements.length === 0) {
		return;
	}

	for (const el of elements) {
		const hasTitle = el.classList.contains("has-title");

		const title = hasTitle
			? el.querySelector<HTMLElement>(".header")?.innerText
			: "title not set";

		const language =
			el.querySelector<HTMLPreElement>("pre")?.dataset.language ??
			"language not set";

		const button = el.querySelector<HTMLButtonElement>(".copy > button");

		if (!button) continue;

		button.addEventListener("click", () => {
			track("copy button link click", {
				title,
				language,
			});
		});
	}
}
