import { describe, expect, test } from "vitest";

import { unified } from "unified";
import rehypeParse from "rehype-parse";
import rehypeStringify from "rehype-stringify";

import rehypeExternalLinks from "./external-links";
import rehypeHeadingSlugs from "./heading-slugs";
import rehypeMermaid from "./mermaid";

describe("heading-slugs", () => {
	const process = async (html: string) => {
		const file = await unified()
			.data("settings", {
				fragment: true,
			})
			.use([
				rehypeParse,
				rehypeExternalLinks,
				rehypeHeadingSlugs,
				rehypeStringify,
			])
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

	test("does not add arrow if image children", async () => {
		const text = await process(
			'<h2 id="bar"><a href="https://example.com">foo</a></h2>',
		);

		expect(text).toMatchInlineSnapshot(
			`"<h2 id="bar"><a href="https://example.com" target="_blank" rel="noopener">foo<span class="external-link"> ↗</span></a></h2>"`,
		);
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

	test("does not add arrow if image children", async () => {
		const text = await process(
			'<a href="https://example.com"><img src="/image.jpg" /></a>',
		);

		expect(text).toMatchInlineSnapshot(
			`"<a href="https://example.com" target="_blank" rel="noopener"><img src="/image.jpg"></a>"`,
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
