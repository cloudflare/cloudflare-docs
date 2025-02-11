import rehypeExternalLinks, { type Options } from "rehype-external-links";

export const rehypeExternalLinksOptions = {
	content: {
		type: "text",
		value: " ↗",
	},
	contentProperties: {
		class: "external-link",
	},
	properties: {
		target: "_blank",
	},
	rel: ["noopener"],
} as const satisfies Options;

export default function () {
	return rehypeExternalLinks(rehypeExternalLinksOptions);
}
