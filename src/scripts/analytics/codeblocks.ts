import { track } from "~/util/zaraz";

/**
 * Code-block copy-button analytics. Same event + payload as root
 * `src/scripts/analytics/codeblocks.ts` ("copy button link click",
 * `{ title, language }`), including the `"title not set"` / `"language not set"`
 * fallbacks.
 *
 * DOM differs from root's Expressive Code (`.expressive-code > figure.frame`):
 * Nimbus renders `<figure class="nb-code-figure" data-nb-lang="…">` and the
 * `nimbus-docs` client (`codeCopy()` in BaseLayout) injects the copy control
 * `<button class="nb-code-copy">` *after* load. A delegated `document` listener
 * is therefore required — per-element binding would miss the injected button
 * and break across view transitions. Titled fences carry the title in
 * `.nb-code-title-name`.
 */
export function registerCopyButtons(): void {
	document.addEventListener("click", (event) => {
		const button = (event.target as Element | null)?.closest<HTMLElement>(
			".nb-code-copy",
		);
		if (!button) return;

		const figure = button.closest<HTMLElement>(".nb-code-figure");

		const title =
			figure?.querySelector<HTMLElement>(".nb-code-title-name")?.innerText ??
			"title not set";

		const language =
			figure?.dataset.nbLang ??
			figure?.querySelector<HTMLPreElement>("pre")?.dataset.language ??
			"language not set";

		track("copy button link click", { title, language });
	});
}
