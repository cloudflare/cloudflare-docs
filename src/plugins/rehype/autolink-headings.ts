import rehypeAutolinkHeadings, { type Options } from "rehype-autolink-headings";
import { h } from "hastscript";

import { AnchorLinkIcon } from "../shared";

export const rehypeAutolinkHeadingsOptions = {
	properties: {
		class: "anchor-link",
	},
	behavior: "after",
	group: ({ tagName }: { tagName: string }) =>
		h("div", {
			tabIndex: -1,
			class: `heading-wrapper level-${tagName}`,
		}),
	content: () => [AnchorLinkIcon],
} as const satisfies Options;

export default function () {
	return rehypeAutolinkHeadings(rehypeAutolinkHeadingsOptions);
}
