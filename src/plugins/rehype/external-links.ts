import rehypeExternalLinks, { type Options } from "rehype-external-links";
import type { Element } from "hast";

function hasImgChild(node: Element): boolean {
	return node.children.some(
		(child) => child.type === "element" && child.tagName === "img",
	);
}

export const externalLinkArrow = " ↗";

export const rehypeExternalLinksOptions = {
	content: (element) => {
		if (!hasImgChild(element)) {
			return {
				type: "text",
				value: externalLinkArrow,
			};
		}
	},
	contentProperties: {
		class: "external-link",
	},
	properties: {
		target: "_blank",
	},
	rel: ["noopener"],
} as const satisfies Options;

export default function () {
	return rehypeExternalLinks(rehypeExternalLinksOptions);
}
