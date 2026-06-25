import { h } from "hastscript";
import { defineHastPlugin } from "satteri";

import { AnchorLinkIcon } from "../shared";

const HEADINGS = ["h1", "h2", "h3", "h4", "h5", "h6"];

export default function autolinkHeadings() {
	return defineHastPlugin({
		name: "autolink-headings",
		element: {
			filter: HEADINGS,
			visit(node, ctx) {
				const id = node.properties?.id;
				if (typeof id !== "string") {
					return;
				}

				const anchor = h("a", { class: "anchor-link", href: `#${id}` }, [
					AnchorLinkIcon,
				]);

				const wrapper = h(
					"div",
					{ tabindex: -1, class: `heading-wrapper level-${node.tagName}` },
					[anchor],
				);

				// wrapNode keeps the wrapper's declared children after the heading: div > [heading, anchor].
				ctx.wrapNode(node, wrapper);
			},
		},
	});
}
