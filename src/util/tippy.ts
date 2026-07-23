import tippy from "tippy.js";
import { type Props } from "tippy.js";

type Options = Partial<Props & { hideAfter: number }>;

export function addTooltip(
	element: HTMLElement,
	content: string,
	opts?: Options,
) {
	if (opts?.hideAfter) {
		const hideAfter = opts.hideAfter;
		opts.onShow = (instance) => {
			setTimeout(() => {
				instance.hide();
			}, hideAfter);
		};
	}

	tippy(element, {
		content,
		allowHTML: true,
		interactive: true,
		// This is imperfect as it stops you from tabbing into
		// links inside the tooltip, but stops tooltips being
		// cutoff by the sidebar
		// https://atomiks.github.io/tippyjs/v6/faq/#my-tooltip-appears-cut-off-or-is-not-showing-at-all
		appendTo: document.body,
		...opts,
	});
}
