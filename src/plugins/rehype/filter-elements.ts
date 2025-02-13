import { SKIP, visit, type VisitorResult } from "unist-util-visit";
import type { Root, Element, Parents } from "hast";

const remove = (index: number, parent: Parents): VisitorResult => {
	parent.children.splice(index, 1);
	return [SKIP, index];
};

const unwrap = (
	index: number,
	parent: Parents,
	element: Element,
): VisitorResult => {
	parent.children.splice(index, 1, ...element.children);
	return [SKIP, index];
};

const ALLOWED_ELEMENTS = [
	// Content sectioning
	"address",
	"article",
	"aside",
	"footer",
	"header",
	"h1",
	"h2",
	"h3",
	"h4",
	"h5",
	"h6",
	"hgroup",
	"main",
	"nav",
	"section",
	// Text content
	"blockquote",
	"dd",
	"div",
	"dl",
	"dt",
	"figcaption",
	"figure",
	"hr",
	"li",
	"menu",
	"ol",
	"p",
	"pre",
	"ul",
	// Inline text semantics
	"a",
	"abbr",
	"b",
	"bdi",
	"bdo",
	"br",
	"cite",
	"code",
	"data",
	"dfn",
	"em",
	"i",
	"kbd",
	"mark",
	"q",
	"rb",
	"rp",
	"rt",
	"rtc",
	"ruby",
	"s",
	"samp",
	"small",
	"span",
	"strong",
	"sub",
	"sup",
	"time",
	"u",
	"var",
	"wbr",
	// Table content
	"caption",
	"col",
	"colgroup",
	"table",
	"tbody",
	"td",
	"tfoot",
	"th",
	"thead",
	"tr",
	// Custom elements
	"rule-id",
];

const ALLOWED_ATTRIBUTES: Record<string, string[]> = {
	a: ["href", "id", "target"],
	"rule-id": ["id"],
};

const UNWRAP_CLASS_NAMES = ["heading-wrapper"];

const DISALLOWED_CLASS_NAMES = ["external-link", "anchor-link"];

export default function () {
	return function (tree: Root) {
		visit(tree, "element", function (element, index, parent) {
			if (typeof index === "number" && parent) {
				const tag = element.tagName;
				const classNames = (element.properties.className as string[]) ?? [];

				if (!ALLOWED_ELEMENTS.includes(tag)) {
					return remove(index, parent);
				}

				if (DISALLOWED_CLASS_NAMES.some((v) => classNames.includes(v))) {
					return remove(index, parent);
				}

				if (UNWRAP_CLASS_NAMES.some((v) => classNames.includes(v))) {
					return unwrap(index, parent, element);
				}

				for (const key of Object.keys(element.properties)) {
					if (!ALLOWED_ATTRIBUTES[tag]?.includes(key)) {
						delete element.properties[key];
					}
				}

				if (tag === "rule-id") {
					return unwrap(index, parent, {
						...element,
						children: [
							{ type: "text", value: element.properties.id as string },
						],
					});
				}
			}
		});
	};
}
