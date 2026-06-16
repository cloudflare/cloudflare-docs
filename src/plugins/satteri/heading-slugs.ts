import GithubSlugger from "github-slugger";
import { defineHastPlugin } from "satteri";

import { externalLinkArrow } from "../rehype/external-links";

const HEADINGS = ["h1", "h2", "h3", "h4", "h5", "h6"];

// # foo {/*bar*/} = <a id="bar">foo</a>
export default function headingSlugs() {
	const slugs = new GithubSlugger();

	return defineHastPlugin({
		name: "heading-slugs",
		element: {
			filter: HEADINGS,
			visit(node, ctx) {
				const last = node.children.at(-1);

				if (last?.type === "mdxTextExpression") {
					if (last.value.startsWith("/*") && last.value.endsWith("*/")) {
						const id = last.value.slice(2, -2).trim();
						ctx.setProperty(node, "id", slugs.slug(id));

						const index = node.children.length - 2;
						const text = node.children[index];
						if (text?.type === "text") {
							ctx.removeChildAt(node, index);
							ctx.insertChildAt(node, index, {
								type: "text",
								value: text.value.trimEnd(),
							});
						}
					}
				} else if (!node.properties?.id) {
					const text = ctx
						.textContent(node)
						.replaceAll(externalLinkArrow, "")
						.trimEnd();

					ctx.setProperty(node, "id", slugs.slug(text));
				}
			},
		},
	});
}
