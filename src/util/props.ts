import type { Props } from "@astrojs/starlight/props";
import { parse } from "node-html-parser";
import he from "he";
import { remark } from "remark";
import strip from "strip-markdown";
import { rehypeExternalLinksOptions } from "~/plugins/rehype/external-links";

type TableOfContentsItems = NonNullable<Props["toc"]>["items"];

export async function generateTableOfContents(
	html: string,
): Promise<TableOfContentsItems> {
	const items: TableOfContentsItems = [
		{
			text: "Overview",
			slug: "_top",
			depth: 1,
			children: [],
		},
	];

	const dom = parse(html);
	const headers = dom.querySelectorAll("h2[id],h3[id]");

	if (headers) {
		function headerDepth(header: any) {
			return Number(header.rawTagName.slice(1));
		}

		for (const header of headers) {
			if (header.id === "footnote-label") continue;

			const depth = headerDepth(header);

			const title = he.decode(header.innerText);

			if (depth === 2) {
				items.push({
					text: title,
					slug: header.id,
					depth,
					children: [],
				});

				continue;
			}

			items.at(-1)?.children.push({
				text: title,
				slug: header.id,
				depth,
				children: [],
			});
		}
	}

	return items;
}

/**
 * Generates a plain-text description for use in the `description` and `og:description` meta tags.
 *
 * 1. If there is a `description` property in the frontmatter, strip any Markdown tokens and return.
 * 2. If there is a `<p>...</p>` element in the HTML, decode any HTML entities and return that.
 * 3. Return `undefined` to signal to consumers there is no suitable description.
 */
export async function generateDescription({
	html,
	markdown,
}: {
	html?: string;
	markdown?: string;
}) {
	let description = undefined;

	if (markdown) {
		const file = await remark().use(strip).process(markdown);

		description = file.toString();
	} else if (html) {
		const dom = parse(html);
		const paragraph = dom.querySelector(":root > p");

		if (paragraph) description = he.decode(paragraph.innerText);
	}

	return description
		?.replaceAll(rehypeExternalLinksOptions.content.value, "")
		.trim();
}
