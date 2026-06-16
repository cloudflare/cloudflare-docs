import { defineHastPlugin } from "satteri";
import { parse } from "space-separated-tokens";
import type { Element, ElementContent } from "hast";

const nonWhitespacePattern = /\w/;

function isMermaidCode(node: ElementContent): node is Element {
	if (node.type !== "element" || node.tagName !== "code") {
		return false;
	}

	let className = node.properties?.className;
	if (typeof className === "string") {
		className = parse(className);
	}

	return Array.isArray(className) && className.includes("language-mermaid");
}

export default function mermaid() {
	return defineHastPlugin({
		name: "mermaid",
		element: {
			filter: ["pre"],
			visit(node, ctx) {
				let code: Element | undefined;

				for (const child of node.children) {
					if (child.type === "text") {
						if (nonWhitespacePattern.test(child.value)) {
							return;
						}
					} else if (isMermaidCode(child)) {
						code = child;
					} else {
						return;
					}
				}

				if (!code) {
					return;
				}

				return {
					type: "element",
					tagName: "pre",
					properties: { className: ["mermaid"] },
					children: [{ type: "text", value: ctx.textContent(code) }],
				};
			},
		},
	});
}
