/**
 * Taken from https://github.com/remcohaszing/rehype-mermaid
 * to only support the "pre-mermaid" strategy.
 */

import { visitParents } from "unist-util-visit-parents";
import type { Root, Element } from "hast";
import { parse } from "space-separated-tokens";
import { toText } from "hast-util-to-text";

interface CodeInstance {
	diagram: string;
	ancestors: Element[];
}

const nonWhitespacePattern = /\w/;

function isMermaidElement(element: Element): boolean {
	let mermaidClassName: string;

	if (element.tagName === "code") {
		mermaidClassName = "language-mermaid";
	} else {
		return false;
	}

	let className = element.properties?.className;
	if (typeof className === "string") {
		className = parse(className);
	}

	if (!Array.isArray(className)) {
		return false;
	}

	return className.includes(mermaidClassName);
}

export default function () {
	return function (tree: Root) {
		const instances: CodeInstance[] = [];

		visitParents(tree, "element", (node, ancestors) => {
			if (!isMermaidElement(node)) {
				return;
			}

			const parent = ancestors.at(-1)!;
			let inclusiveAncestors = ancestors as Element[];

			if (parent.type === "element" && parent.tagName === "pre") {
				for (const child of parent.children) {
					if (child.type === "text") {
						if (nonWhitespacePattern.test(child.value)) {
							return;
						}
					} else if (child !== node) {
						return;
					}
				}
			} else {
				inclusiveAncestors = [...inclusiveAncestors, node];
			}

			instances.push({
				diagram: toText(node, { whitespace: "pre" }),
				ancestors: inclusiveAncestors,
			});
		});

		if (!instances.length) {
			return;
		}

		for (const { ancestors, diagram } of instances) {
			const parent = ancestors.at(-2)!;
			const node = ancestors.at(-1)!;

			parent.children[parent.children.indexOf(node)] = {
				type: "element",
				tagName: "pre",
				properties: {
					className: ["mermaid"],
				},
				children: [{ type: "text", value: diagram }],
			};
		}
	};
}
