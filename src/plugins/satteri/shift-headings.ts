import { fileURLToPath } from "node:url";
import { headingRank } from "hast-util-heading-rank";
import { defineHastPlugin } from "satteri";
import type { Element } from "hast";

export default function shiftHeadings() {
	return defineHastPlugin({
		name: "shift-headings",
		element: {
			filter: ["div"],
			visit(node, ctx) {
				if (
					!ctx.fileURL ||
					!fileURLToPath(ctx.fileURL).includes("/src/content/changelog/")
				) {
					return;
				}

				const classNames = (node.properties?.className as string[]) ?? [];

				if (!classNames.includes("heading-wrapper")) {
					return;
				}

				const index = node.children.findIndex(
					(el) => el.type === "element" && headingRank(el),
				);
				if (index === -1) {
					return;
				}

				const heading = node.children[index] as Element;
				const level = headingRank(heading);

				if (level && level < 4) {
					const classIndex = classNames.indexOf(`level-h${level}`);

					ctx.removeChildAt(node, index);
					ctx.insertChildAt(node, index, { ...heading, tagName: "h4" });

					if (classIndex !== -1) {
						const updated = [...classNames];
						updated[classIndex] = "level-h4";
						ctx.setProperty(node, "className", updated);
					}
				}
			},
		},
	});
}
