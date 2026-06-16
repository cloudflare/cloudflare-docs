import { defineHastPlugin } from "satteri";
import type { Element } from "hast";

import { externalLinkArrow } from "../rehype/external-links";

function hasImgChild(node: Element): boolean {
	return node.children.some(
		(child) => child.type === "element" && child.tagName === "img",
	);
}

export default function externalLinks() {
	return defineHastPlugin({
		name: "external-links",
		element: {
			filter: ["a"],
			visit(node, ctx) {
				const href = node.properties?.href;

				if (typeof href !== "string" || !/^https?:\/\//.test(href)) {
					return;
				}

				ctx.setProperty(node, "target", "_blank");
				ctx.setProperty(node, "rel", ["noopener"]);

				if (!hasImgChild(node)) {
					ctx.appendChild(node, {
						type: "element",
						tagName: "span",
						properties: { className: ["external-link"] },
						children: [{ type: "text", value: externalLinkArrow }],
					});
				}
			},
		},
	});
}
