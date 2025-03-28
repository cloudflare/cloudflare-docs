import { SKIP, visit, type VisitorResult } from "unist-util-visit";
import type { Root, Element, Parents } from "hast";
import { selectAll } from "hast-util-select";

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
	// "figcaption",
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
	// Images
	"img",
	// Custom elements
	"rule-id",
	"starlight-tabs",
	"starlight-image-zoom-zoomable",
];

const ALLOWED_ATTRIBUTES: Record<string, string[]> = {
	a: ["href", "id", "target"],
	pre: ["dataLanguage"],
	code: ["className"],
	img: ["src", "alt"],
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

				if (tag === "pre") {
					if (classNames.includes("mermaid")) {
						const definition = element.children.find(
							(child) => child.type === "text",
						);
						if (!definition) return;

						element.children = [
							{
								type: "element",
								tagName: "code",
								properties: {
									className: ["language-mermaid"],
								},
								children: [
									{
										type: "text",
										value: definition.value,
									},
								],
							},
						];

						return;
					}

					const language = element.properties.dataLanguage;
					if (!language) return;

					const code = element.children.find(
						(child) => child.type === "element" && child.tagName === "code",
					);
					if (!code) return;

					(code as Element).properties.className = [`language-${language}`];
				}

				if (tag === "rule-id") {
					return unwrap(index, parent, {
						...element,
						children: [
							{ type: "text", value: element.properties.id as string },
						],
					});
				}

				if (tag === "starlight-tabs") {
					const tabs = selectAll('[role="tab"]', element);
					const panels = selectAll('[role="tabpanel"]', element);

					element.tagName = "ul";
					element.properties = {};
					element.children = [];

					for (const tab of tabs) {
						const id = (tab.properties?.id as string)?.split("tab-")[1];
						if (!id) continue;

						const panel = panels.find(
							(panel) => panel.properties?.id === `tab-panel-${id}`,
						);
						if (!panel) continue;

						const label = tab.children
							.filter((child) => child.type === "text" && child.value.trim())
							.map((child) => child.type === "text" && child.value.trim())
							.join("");

						const el = {
							type: "element",
							tagName: "li",
							properties: {},
							children: [
								{
									type: "element",
									tagName: "p",
									children: [{ type: "text", value: label }],
									properties: {},
								},
								panel,
							],
						} as Element;

						element.children.push(el);
					}
				}
			}
		});
	};
}
