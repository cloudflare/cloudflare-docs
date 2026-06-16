import { h } from "hastscript";
import { defineHastPlugin } from "satteri";
import type { Element } from "hast";

function buildFigure(img: Element): Element {
	const title = `${img.properties?.title ?? ""}`;
	if (!title) {
		return img;
	}

	return h("figure", [h("img", { ...img.properties }), h("figcaption", title)]);
}

export default function titleFigure() {
	return defineHastPlugin({
		name: "title-figure",
		element: {
			filter: ["p"],
			visit(node, ctx) {
				const images = node.children.filter(
					(child): child is Element =>
						child.type === "element" && child.tagName === "img",
				);

				if (images.length === 0) {
					return;
				}

				const figures = images.map(buildFigure);

				if (figures.length === 1) {
					return figures[0];
				}

				ctx.insertBefore(node, figures);
				ctx.removeNode(node);
			},
		},
	});
}
