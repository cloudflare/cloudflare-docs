import { visit } from "unist-util-visit";
import type { Root } from "hast";

const REWRITE_ELEMENTS = ["a", "img"];

export default function () {
	return function (tree: Root) {
		visit(tree, "element", function (element) {
			if (REWRITE_ELEMENTS.includes(element.tagName)) {
				const property = element.tagName === "a" ? "href" : "src";
				const href = element.properties[property] as string | undefined;

				if (href) {
					if (href.startsWith("/")) {
						const url = new URL(href, "https://developers.cloudflare.com/");

						element.properties[property] = url.href;
					}
				}
			}
		});
	};
}
