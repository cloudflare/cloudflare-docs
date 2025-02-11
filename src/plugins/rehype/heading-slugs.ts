import { toString } from "hast-util-to-string";
import { visit } from "unist-util-visit";
import GithubSlugger from "github-slugger";
import { rehypeExternalLinksOptions } from "./external-links";
import type { Root } from "hast";
import type { MdxTextExpression } from "mdast-util-mdx-expression";

const slugs = new GithubSlugger();

// # foo {/*bar*/} = <a id="bar">foo</a>
export default function () {
	return function (tree: Root) {
		slugs.reset();

		visit(tree, "element", function (element) {
			if (/^h[1-6]$/.test(element.tagName)) {
				const last = element.children.at(-1);

				if (!last) return;

				if (last.type === "mdxTextExpression") {
					const lastElement = last as MdxTextExpression;
					if (
						lastElement.value.startsWith("/*") &&
						lastElement.value.endsWith("*/")
					) {
						const id = lastElement.value.slice(2, -2).trim();
						element.properties.id = slugs.slug(id);

						const text = element.children.at(-2) as MdxTextExpression;
						text.value = text.value.trimEnd();
						element.children.with(-2, text);
					}
				} else {
					if (!element.properties.id) {
						const string = toString(element)
							.replaceAll(rehypeExternalLinksOptions.content.value, "")
							.trimEnd();

						element.properties.id = slugs.slug(string);
					}
				}
			}
		});
	};
}
