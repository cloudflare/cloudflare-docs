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
import { parse } from "node-html-parser";
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
 * parseInline: a single wrapping paragraph is unwrapped, and paragraph
 * breaks collapse to blank lines like any other inline whitespace.
 */
export function renderMarkdownInline(source: string): string {
	return renderMarkdown(source)
		.replace(/<\/p>\n<p>/g, "\n\n")
		.replace(/^<p>([\s\S]*)<\/p>\n?$/, "$1");
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
