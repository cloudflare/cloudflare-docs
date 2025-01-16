import { addTooltip } from "~/util/tippy";

const footnotes = document.querySelectorAll("section.footnotes");

if (footnotes) {
	for (const section of footnotes) {
		const notes = section.querySelectorAll("li");

		for (const note of notes) {
			const content = note.querySelector("p") as HTMLParagraphElement;

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
