import { parse } from "node-html-parser";
import he from "he";
import { remark } from "remark";
import strip from "strip-markdown";

// Rehype appends this to outbound links; strip it from derived descriptions.
const EXTERNAL_LINK_ARROW = " ↗";

// Parity: mirrors production's src/util/props.ts generateDescription (html
// branch); reimplemented because nimbus `~`/`@` aliases resolve to src/nimbus.

export function generateDescriptionFromHtml(html: string): string | undefined {
	const dom = parse(html);
	const paragraph = dom.querySelector(":root > p");

	if (!paragraph) return undefined;

	return he
		.decode(paragraph.innerText)
		.replaceAll(EXTERNAL_LINK_ARROW, "")
		.trim();
}

// Parity: production strips Markdown from the description only for JSON-LD
// (via Page.astro), leaving the raw string in <meta>/OG. No-op on plain text.
export async function stripMarkdownDescription(
	markdown: string,
): Promise<string> {
	const file = await remark().use(strip).process(markdown);

	return file.toString().replaceAll(EXTERNAL_LINK_ARROW, "").trim();
}
