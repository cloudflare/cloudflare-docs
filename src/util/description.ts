import type { CollectionEntry } from "astro:content";
import { parse } from "node-html-parser";
import { entryToString } from "./container";
import { remark } from "remark";
import strip from "strip-markdown";
import he from "he";
import { rehypeExternalLinksOptions } from "~/plugins/rehype/external-links";

/**
 * Generates a plain-text description for use in the `description` and `og:description` meta tags.
 *
 * 1. If there is a `description` property in the frontmatter, strip any Markdown tokens and return.
 * 2. If there is a `<p>...</p>` element in the HTML, decode any HTML entities and return that.
 * 3. Return `undefined` to signal to consumers there is no suitable description.
 */
export async function getPageDescription(
	entry: CollectionEntry<"docs">,
	locals: any,
) {
	let description = undefined;

	if (entry.data.description) {
		const file = await remark().use(strip).process(entry.data.description);

		description = file.toString();
	} else {
		const html = await entryToString(entry, locals);

		if (!html) return undefined;

		const dom = parse(html);
		const paragraph = dom.querySelector(":root > p");

		if (paragraph) description = he.decode(paragraph.innerText);
	}

	return description
		?.replaceAll(rehypeExternalLinksOptions.content.value, "")
		.trim();
}
