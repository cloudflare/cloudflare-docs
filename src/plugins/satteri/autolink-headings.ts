import { h } from "hastscript";
import { defineHastPlugin } from "satteri";

import { AnchorLinkIcon } from "../rehype/autolink-headings";

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
					{ tabIndex: -1, class: `heading-wrapper level-${node.tagName}` },
					[anchor],
				);

				// `wrapNode` makes the heading the wrapper's first child, keeping the
				// declared anchor after it: div > [heading, anchor].
				ctx.wrapNode(node, wrapper);
			},
		},
	});
}
