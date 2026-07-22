import { describe, expect, test } from "vitest";

import {
	assertNoClientIslandInDerivedSlot,
	generateDescriptionFromHtml,
	stripMarkdownDescription,
} from "./description";

describe("generateDescriptionFromHtml", () => {
	test("returns the first top-level paragraph text", () => {
		expect(generateDescriptionFromHtml("<p>Hello world</p>")).toBe(
			"Hello world",
		);
	});

	test("ignores paragraphs that are not direct children of the root", () => {
		expect(
			generateDescriptionFromHtml("<div><p>Nested</p></div>"),
		).toBeUndefined();
	});

	test("returns undefined when there is no paragraph", () => {
		expect(
			generateDescriptionFromHtml("<h2>Title</h2><ul><li>x</li></ul>"),
		).toBeUndefined();
	});

	test("decodes HTML entities", () => {
		expect(generateDescriptionFromHtml("<p>Cloudflare &amp; Co</p>")).toBe(
			"Cloudflare & Co",
		);
	});

	test("strips the external-link arrow and trims", () => {
		expect(
			generateDescriptionFromHtml("<p>  See <a>Docs ↗</a> now  </p>"),
		).toBe("See Docs now");
	});

	test("empty paragraph yields an empty (falsy) string", () => {
		expect(generateDescriptionFromHtml("<p></p>")).toBe("");
	});
});

describe("assertNoClientIslandInDerivedSlot", () => {
	test("throws when the derived slot contains a client island", () => {
		const html =
			'<astro-island uid="x" component-url="/Foo.tsx" client="load"></astro-island>';
		expect(() =>
			assertNoClientIslandInDerivedSlot(html, "/some/page/"),
		).toThrow(/renders a client island/);
	});

	test("names the offending pathname in the error", () => {
		expect(() =>
			assertNoClientIslandInDerivedSlot("<astro-island></astro-island>", "/x/"),
		).toThrow('"/x/"');
	});

	test("does not throw for plain prose (no island)", () => {
		expect(() =>
			assertNoClientIslandInDerivedSlot("<p>Just a paragraph.</p>", "/x/"),
		).not.toThrow();
	});

	test("does not throw for escaped markup in code samples", () => {
		expect(() =>
			assertNoClientIslandInDerivedSlot(
				"<pre><code>&lt;astro-island&gt;</code></pre>",
				"/x/",
			),
		).not.toThrow();
	});

	test("does not throw for server islands (server:defer)", () => {
		expect(() =>
			assertNoClientIslandInDerivedSlot(
				"<!--[if astro]>server-island-start<![endif]--><script></script>",
				"/x/",
			),
		).not.toThrow();
	});
});

describe("stripMarkdownDescription", () => {
	test("strips links, emphasis, and inline code", async () => {
		expect(
			await stripMarkdownDescription("Use [X](/x) with **y** and `z`"),
		).toBe("Use X with y and z");
	});

	test("leaves plain text unchanged", async () => {
		expect(await stripMarkdownDescription("Just plain text.")).toBe(
			"Just plain text.",
		);
	});
});
