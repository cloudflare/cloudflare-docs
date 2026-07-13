// Footnote refs → tippy tooltips; the footnote section is removed.

import { addTooltip } from "../util/tippy";

function initFootnotes() {
	for (const section of document.querySelectorAll("section.footnotes")) {
		for (const note of section.querySelectorAll("li")) {
			const content = note.querySelector("p");
			if (!content) continue;

			const fnrefs = document.querySelectorAll<HTMLAnchorElement>(
				`a[id|='${note.id.replace("fn", "fnref")}']`,
			);

			for (const fnref of fnrefs) {
				addTooltip(fnref, content.innerHTML);
				fnref.classList.add("footnote");
				fnref.setAttribute("tabindex", "0");
				fnref.removeAttribute("href");
			}
		}

		section.remove();
	}
}

initFootnotes();
document.addEventListener("astro:page-load", initFootnotes);
