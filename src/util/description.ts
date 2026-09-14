import { parse } from "node-html-parser";
import he from "he";
import { stripMarkdownToText } from "./markdown";
import { EXTERNAL_LINK_ARROW } from "@cloudflare/nimbus-docs/markdown";

// Parity: mirrors production's src/util/props.ts generateDescription (html
// branch); reimplemented as a standalone function rather than reused.

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
export function stripMarkdownDescription(markdown: string): string {
	return stripMarkdownToText(markdown);
}
