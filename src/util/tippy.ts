import tippy from "tippy.js";

export function addTooltip(element: HTMLElement, content: string) {
	const id = "#" + CSS.escape(element.id);

	tippy(id, {
		content,
		allowHTML: true,
		interactive: true,
		placement: "auto",
		arrow: false,
		// This is imperfect as it stops you from tabbing into
		// links inside the tooltip, but stops tooltips being
		// cutoff by the sidebar
		// https://atomiks.github.io/tippyjs/v6/faq/#my-tooltip-appears-cut-off-or-is-not-showing-at-all
		appendTo: document.body,
	});
}
