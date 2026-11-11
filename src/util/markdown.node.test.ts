import { describe, expect, test } from "vitest";

import {
	renderMarkdown,
	renderMarkdownInline,
	stripMarkdownToText,
} from "./markdown";

describe("renderMarkdown", () => {
	test("matches marked's GFM defaults without smart punctuation", () => {
		expect(renderMarkdown("Use [X](/x) with **y** and `z`")).toBe(
			`<p>Use <a href="/x">X</a> with <strong>y</strong> and <code>z</code></p>\n`,
		);
		expect(
			renderMarkdown(
				`Deploy with \`wrangler deploy\` -- see [docs](/workers/)`,
			),
		).toBe(
			`<p>Deploy with <code>wrangler deploy</code> -- see <a href="/workers/">docs</a></p>\n`,
		);
	});

	test("keeps raw HTML and escapes ampersands", () => {
		expect(renderMarkdown("text with <code>x</code> & more")).toBe(
			`<p>text with <code>x</code> &amp; more</p>\n`,
		);
	});

	test("autolinks bare URLs like marked's gfm option", () => {
		expect(renderMarkdown("See https://example.com for details")).toBe(
			`<p>See <a href="https://example.com">https://example.com</a> for details</p>\n`,
		);
	});

	test("renders tables and lists", () => {
		expect(renderMarkdown("| A | B |\n| --- | --- |\n| 1 | 2 |")).toBe(
			`<table>\n<thead>\n<tr>\n<th>A</th>\n<th>B</th>\n</tr>\n</thead>\n<tbody>\n<tr>\n<td>1</td>\n<td>2</td>\n</tr>\n</tbody>\n</table>\n`,
		);
		expect(renderMarkdown("1. one\n2. two")).toBe(
			`<ol>\n<li>one</li>\n<li>two</li>\n</ol>\n`,
		);
	});

	test("returns an empty string for empty input", () => {
		expect(renderMarkdown("")).toBe("");
	});
});

describe("renderMarkdownInline", () => {
	test("unwraps the single paragraph wrapper", () => {
		expect(renderMarkdownInline("Use `x` and **y**")).toBe(
			"Use <code>x</code> and <strong>y</strong>",
		);
	});

	test("keeps links, raw HTML, and entities", () => {
		expect(renderMarkdownInline("[docs](/workers/) and <code>x</code>")).toBe(
			`<a href="/workers/">docs</a> and <code>x</code>`,
		);
	});

	test("returns an empty string for empty input", () => {
		expect(renderMarkdownInline("")).toBe("");
	});

	test("flattens block constructs to inline content", () => {
		expect(renderMarkdownInline("# Heading")).toBe("Heading");
		expect(renderMarkdownInline("- a\n- b")).toBe("a\nb");
		expect(renderMarkdownInline("> quoted text")).toBe("quoted text");
	});

	test("flattens mixed block content to inline text", () => {
		expect(renderMarkdownInline("para one\n\n- a\n- b\n\npara two")).toBe(
			"para one\n\na\nb\n\npara two",
		);
	});

	test("preserves inline formatting when flattening blocks", () => {
		expect(renderMarkdownInline("## **bold**")).toBe("<strong>bold</strong>");
		expect(renderMarkdownInline("# *A* plain **B**")).toBe(
			"<em>A</em> plain <strong>B</strong>",
		);
		expect(renderMarkdownInline("- `x` and [docs](/d)")).toBe(
			`<code>x</code> and <a href="/d">docs</a>`,
		);
		expect(renderMarkdownInline("> ~~struck~~")).toBe("<del>struck</del>");
	});

	test("drops form controls flattened inside blocks", () => {
		expect(renderMarkdownInline("- [ ] task")).toBe("task");
	});

	test("separates block content nested in list items", () => {
		expect(renderMarkdownInline("- Parent\n\n  - Child")).toBe("Parent\nChild");
		expect(renderMarkdownInline("- Parent\n  - Child")).toBe("Parent\nChild");
	});
});

describe("stripMarkdownToText", () => {
	test("strips links, emphasis, and inline code", () => {
		expect(stripMarkdownToText("Use [X](/x) with **y** and `z`")).toBe(
			"Use X with y and z",
		);
	});

	test("leaves plain text unchanged", () => {
		expect(stripMarkdownToText("Just plain text.")).toBe("Just plain text.");
	});

	test("keeps blank lines between top-level blocks", () => {
		expect(stripMarkdownToText("# Heading\n\nBody [link](/l) text")).toBe(
			"Heading\n\nBody link text",
		);
	});

	test("decodes entities and drops non-text blocks", () => {
		expect(stripMarkdownToText("Cloudflare & Co\n\n---\n\n[D](/d)")).toBe(
			"Cloudflare & Co\n\nD",
		);
	});
});
