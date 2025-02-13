import { visit } from "unist-util-visit";
import type { Root } from "hast";

export default function () {
	return function (tree: Root) {
		visit(tree, "element", function (element) {
			if (element.tagName === "a") {
				const href = element.properties.href as string | undefined;

				if (href) {
					if (href.startsWith("/")) {
						const url = new URL(href, "https://developers.cloudflare.com/");

						element.properties.href = url.href;
					}
				}
			}
		});
	};
}
