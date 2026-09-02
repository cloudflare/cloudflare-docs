/**
 * Fragment-level Markdown rendering on Sätteri — the same compiler the
 * content pipeline uses (see astro.config.ts) — replacing the per-component
 * `marked`/`remark` calls that ran during page rendering.
 *
 * Fragment renders deliberately omit the site's hast plugin pipeline
 * (heading slugs, autolink anchors, external-link arrows, table wrappers):
 * those transforms exist for full documents, not tooltips, summaries, and
 * disclosure headers.
 *
 * Feature flags mirror `marked`'s defaults: GFM on, footnotes off (marked
 * core has none), and smart punctuation disabled (marked never applied it).
 */
import { markdownToHtml } from "satteri";
import { NodeType, parse } from "node-html-parser";
import type { HTMLElement, Node, TextNode } from "node-html-parser";
import he from "he";
import { EXTERNAL_LINK_ARROW } from "@cloudflare/nimbus-docs/markdown";

const FRAGMENT_FEATURES = {
	smartPunctuation: false,
	gfm: { footnotes: false },
};

/** Render a Markdown string to an HTML fragment (block semantics). */
export function renderMarkdown(source: string): string {
	return markdownToHtml(source, { features: FRAGMENT_FEATURES }).html;
}

/**
 * Render inline Markdown (no block wrappers), mirroring `marked`'s
 * parseInline: the output is phrasing content only. Paragraph wrappers are
 * unwrapped, paragraph breaks collapse to blank lines like any other inline
 * whitespace, and block constructs (headings, lists, quotes, …) are flattened
 * so no block element can leak into an inline context.
 */
export function renderMarkdownInline(source: string): string {
	const dom = parse(renderMarkdown(source));

	return dom.childNodes
		.filter((node) => !isWhitespaceText(node))
		.map(inlineContent)
		.join("\n\n");
}

const isWhitespaceText = (node: Node): boolean =>
	node.nodeType === NodeType.TEXT_NODE && !(node as TextNode).rawText.trim();

/**
 * Flatten a rendered node to inline-safe HTML: paragraphs lose their
 * wrapper, and every other element (heading, quote, list, table, …) is
 * unwrapped to its own inline content. Whitespace between inline siblings
 * is collapsed, never dropped, so words stay separated; the line breaks the
 * HTML serializer puts between blocks collapse to a single newline.
 */
function inlineContent(node: Node): string {
	if (node.nodeType === NodeType.TEXT_NODE) {
		const raw = (node as TextNode).rawText;
		if (raw.trim() === "") return raw.includes("\n") ? "\n" : " ";
		return raw;
	}

	const element = node as HTMLElement;
	if (element.tagName === "P") return element.innerHTML;

	return (
		element.childNodes
			.map(inlineContent)
			.join("")
			// Serialization pads block children with line breaks; trim them so
			// containers do not leak padding into the surrounding join.
			.trim()
	);
}

/**
 * Reduce Markdown to plain text, matching production's
 * remark + strip-markdown description stripping: formatting markers are
 * removed, links/images collapse to their text, and top-level blocks stay
 * separated by blank lines.
 */
export function stripMarkdownToText(source: string): string {
	const dom = parse(renderMarkdown(source));

	return dom.childNodes
		.map((node) => he.decode(node.innerText))
		.filter((text) => text.trim().length > 0)
		.join("\n\n")
		.replaceAll(EXTERNAL_LINK_ARROW, "")
		.trim();
}
