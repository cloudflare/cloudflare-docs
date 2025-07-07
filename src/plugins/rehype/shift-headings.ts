import { headingRank } from "hast-util-heading-rank";
import { visit } from "unist-util-visit";
import type { Root, Element } from "hast";

export default function () {
	return function (tree: Root, file: any) {
		visit(tree, "element", function (element) {
			if (
				!file.history.find((path: string) =>
					path.includes("/src/content/changelog/"),
				)
			) {
				return;
			}

			const classNames = (element.properties.className as string[]) ?? [];

			if (classNames.includes("heading-wrapper")) {
				const heading = element.children.find(
					(el) => el.type === "element" && headingRank(el),
				) as Element | undefined;

				if (heading) {
					let level = headingRank(heading);

					if (level && level < 4) {
						const index = classNames.indexOf(`level-h${level}`);

						level = 4;
						element.children[element.children.indexOf(heading)] = {
							...heading,
							tagName: "h" + (level > 6 ? 6 : level < 1 ? 1 : level),
						};

						classNames[index] = `level-h${level}`;
					}
				}
			}
		});
	};
}
