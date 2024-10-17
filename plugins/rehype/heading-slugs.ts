import { toString } from "hast-util-to-string";
import { visit } from "unist-util-visit";
import GithubSlugger from "github-slugger";

const slugs = new GithubSlugger();

// # foo {/*bar*/} = <a id="bar">foo</a>
export default function () {
	return function (tree: any) {
		slugs.reset();

		visit(tree, "element", function (element: any) {
			if (/^h[1-6]$/.test(element.tagName)) {
				const last = element.children.at(-1);

				if (
					last.type === "mdxTextExpression" &&
					last.value.startsWith("/*") &&
					last.value.endsWith("*/")
				) {
					const id = last.value.slice(2, -2).trim();
					element.properties.id = slugs.slug(id);

					const text = element.children.at(-2);
					text.value = text.value.trimEnd();
					element.children.with(-2, text);
				} else {
					if (!element.properties.id) {
						element.properties.id = slugs.slug(toString(element));
					}
				}
			}
		});
	};
}
