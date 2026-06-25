import { describe, expect, test } from "vitest";
import { markdownToHtml } from "satteri";

import headingSlugs from "./heading-slugs";
import externalLinks from "./external-links";

function render(source: string): string {
	const result = markdownToHtml(source, {
		hastPlugins: [headingSlugs],
	});
	return result.html;
}

function renderWithExternalLinks(source: string): string {
	const result = markdownToHtml(source, {
		// external-links runs first so heading-slugs has to strip the trailing arrow.
		hastPlugins: [externalLinks, headingSlugs],
	});
	return result.html;
}

describe("heading-slugs", () => {
	test("adds a slug derived from text content", () => {
		expect(render("## Hello World")).toMatchInlineSnapshot(`
			"<h2 id="hello-world">Hello World</h2>
			"
		`);
	});

	test("dedupes slugs across a single document", () => {
		expect(render("## Same\n\n## Same\n\n### Same")).toMatchInlineSnapshot(`
			"<h2 id="same">Same</h2>
			<h2 id="same-1">Same</h2>
			<h3 id="same-2">Same</h3>
			"
		`);
	});

	test("strips the external-link arrow before slugifying", () => {
		expect(renderWithExternalLinks("## [Linked Heading](https://example.com)"))
			.toMatchInlineSnapshot(`
			"<h2 id="linked-heading"><a href="https://example.com" target="_blank" rel="noopener">Linked Heading<span class="external-link"> ↗</span></a></h2>
			"
		`);
	});

	test("handles all heading ranks", () => {
		expect(
			render(
				"# One\n\n## Two\n\n### Three\n\n#### Four\n\n##### Five\n\n###### Six",
			),
		).toMatchInlineSnapshot(`
			"<h1 id="one">One</h1>
			<h2 id="two">Two</h2>
			<h3 id="three">Three</h3>
			<h4 id="four">Four</h4>
			<h5 id="five">Five</h5>
			<h6 id="six">Six</h6>
			"
		`);
	});

	test("slugifies headings with punctuation and casing", () => {
		expect(render("## Hello, World! 123")).toMatchInlineSnapshot(`
			"<h2 id="hello-world-123">Hello, World! 123</h2>
			"
		`);
	});
});
