import tippy from "tippy.js";

export function addTooltip(element: HTMLElement, content: string) {
	const id = "#" + CSS.escape(element.id);

	tippy(id, {
		content,
		allowHTML: true,
		interactive: true,
		placement: "auto",
		arrow: false,
	});
}
