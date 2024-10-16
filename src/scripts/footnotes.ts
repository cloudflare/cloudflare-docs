import { addTooltip } from "~/util/tippy";

const footnotes = document.querySelector("section.footnotes");

if (footnotes) {
	const notes = footnotes.querySelectorAll("li");

	for (const note of notes) {
		const content = note.querySelector("p") as HTMLParagraphElement;

		const fnrefs = document.querySelectorAll<HTMLAnchorElement>(
			`a[id^='${note.id.replace("fn", "fnref")}']`,
		);

		for (const fnref of fnrefs) {
			addTooltip(fnref, content.innerHTML);

			fnref.classList.add("footnote");

			fnref.setAttribute("tabindex", "0");
			fnref.removeAttribute("href");
		}
	}

	footnotes.remove();
}
