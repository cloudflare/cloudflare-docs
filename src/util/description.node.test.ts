import { describe, expect, test } from "vitest";

import {
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
