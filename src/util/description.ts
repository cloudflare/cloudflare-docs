import type { CollectionEntry } from "astro:content";
import { parse } from "node-html-parser";
import { entryToString } from "./container";
/*
    1. If there is a `description` property in the frontmatter, return that.
    2. If there is a `<p>...</p>` element in the HTML, return that.
    3. Return `undefined` to signal to consumers there is no suitable description.
*/
export async function getPageDescription(
	entry: CollectionEntry<"docs">,
	locals: any,
) {
	if (entry.data.description) return entry.data.description;

	const html = await entryToString(entry, locals);

	if (!html) return undefined;

	const dom = parse(html);
	const description = dom.querySelector(":root > p");

	if (description) return description.innerText;

	return undefined;
}
