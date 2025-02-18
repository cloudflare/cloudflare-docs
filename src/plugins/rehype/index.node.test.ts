import { describe, expect, test } from "vitest";

import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";

import rehypeAutolinkHeadings from "./autolink-headings";
import rehypeExternalLinks from "./external-links";
import rehypeHeadingSlugs from "./heading-slugs";
import rehypeMermaid from "./mermaid";

describe("heading-slugs", () => {
	const process = async (html: string) => {
		const file = await unified()
			.data("settings", {
				fragment: true,
			})
			.use([rehypeParse, rehypeHeadingSlugs, rehypeStringify])
			.process(html);

		return file.toString();
	};

	test("adds id to heading", async () => {
		const text = await process("<h2>foo</h2>");

		expect(text).toMatchInlineSnapshot(`"<h2 id="foo">foo</h2>"`);
	});

	test("ignores existing id", async () => {
		const text = await process('<h2 id="bar">foo</h2>');

		expect(text).toMatchInlineSnapshot(`"<h2 id="bar">foo</h2>"`);
	});
});

describe("external-links", () => {
	const process = async (html: string) => {
		const file = await unified()
			.data("settings", {
				fragment: true,
			})
			.use([rehypeParse, rehypeExternalLinks, rehypeStringify])
			.process(html);

		return file.toString();
	};

	test("adds icon to external link", async () => {
		const text = await process("<a href='https://example.com'>foo</a>");

		expect(text).toMatchInlineSnapshot(
			`"<a href="https://example.com" target="_blank" rel="noopener">foo<span class="external-link"> ↗</span></a>"`,
		);
	});

	test("ignores internal link", async () => {
		const text = await process('<a href="/">foo</a>');

		expect(text).toMatchInlineSnapshot(`"<a href="/">foo</a>"`);
	});
});

describe("autolink-headings", () => {
	const process = async (html: string) => {
		const file = await unified()
			.data("settings", {
				fragment: true,
			})
			.use([rehypeParse, rehypeAutolinkHeadings, rehypeStringify])
			.process(html);

		return file.toString();
	};

	test("ignores headings without id", async () => {
		const text = await process("<h2>foo</h2>");

		expect(text).toMatchInlineSnapshot(`"<h2>foo</h2>"`);
	});

	test("wraps heading with id", async () => {
		const text = await process("<h2 id='bar'>foo</h2>");

		expect(text).toMatchInlineSnapshot(
			`"<div tabindex="-1" class="heading-wrapper level-h2"><h2 id="bar">foo</h2><a class="anchor-link" href="#bar"><span aria-hidden="true" class="anchor-icon"><svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentcolor" d="m12.11 15.39-3.88 3.88a2.52 2.52 0 0 1-3.5 0 2.47 2.47 0 0 1 0-3.5l3.88-3.88a1 1 0 0 0-1.42-1.42l-3.88 3.89a4.48 4.48 0 0 0 6.33 6.33l3.89-3.88a1 1 0 1 0-1.42-1.42Zm8.58-12.08a4.49 4.49 0 0 0-6.33 0l-3.89 3.88a1 1 0 0 0 1.42 1.42l3.88-3.88a2.52 2.52 0 0 1 3.5 0 2.47 2.47 0 0 1 0 3.5l-3.88 3.88a1 1 0 1 0 1.42 1.42l3.88-3.89a4.49 4.49 0 0 0 0-6.33ZM8.83 15.17a1 1 0 0 0 1.1.22 1 1 0 0 0 .32-.22l4.92-4.92a1 1 0 0 0-1.42-1.42l-4.92 4.92a1 1 0 0 0 0 1.42Z"></path></svg></span></a></div>"`,
		);
	});
});

describe("mermaid", () => {
	const process = async (html: string) => {
		const file = await unified()
			.data("settings", {
				fragment: true,
			})
			.use([rehypeParse, rehypeMermaid, rehypeStringify])
			.process(html);

		return file.toString();
	};

	test("ignores code without mermaid language", async () => {
		const text = await process("<code>foo</code>");

		expect(text).toMatchInlineSnapshot(`"<code>foo</code>"`);
	});

	test("transforms code with mermaid language into pre", async () => {
		const text = await process("<code class='language-mermaid'>foo</code>");

		expect(text).toMatchInlineSnapshot(`"<pre class="mermaid">foo</pre>"`);
	});
});
