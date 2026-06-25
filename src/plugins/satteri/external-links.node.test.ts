import { describe, expect, test } from "vitest";
import { markdownToHtml } from "satteri";

import externalLinks from "./external-links";

function render(source: string): string {
	const result = markdownToHtml(source, {
		hastPlugins: [externalLinks],
	});
	return result.html;
}

describe("external-links", () => {
	test("annotates absolute https links", () => {
		expect(render("[foo](https://example.com)")).toMatchInlineSnapshot(`
			"<p><a href="https://example.com" target="_blank" rel="noopener">foo<span class="external-link"> ↗</span></a></p>
			"
		`);
	});

	test("annotates absolute http links", () => {
		expect(render("[foo](http://example.com)")).toMatchInlineSnapshot(`
			"<p><a href="http://example.com" target="_blank" rel="noopener">foo<span class="external-link"> ↗</span></a></p>
			"
		`);
	});

	test("leaves internal links untouched", () => {
		expect(render("[foo](/workers/)")).toMatchInlineSnapshot(`
			"<p><a href="/workers/">foo</a></p>
			"
		`);
	});

	test("leaves anchor-only links untouched", () => {
		expect(render("[foo](#section)")).toMatchInlineSnapshot(`
			"<p><a href="#section">foo</a></p>
			"
		`);
	});

	test("leaves mailto links untouched", () => {
		expect(render("[foo](mailto:hi@example.com)")).toMatchInlineSnapshot(`
			"<p><a href="mailto:hi@example.com">foo</a></p>
			"
		`);
	});

	test("does not append the arrow when the link wraps an image", () => {
		expect(render("[![alt](/image.jpg)](https://example.com)"))
			.toMatchInlineSnapshot(`
			"<p><a href="https://example.com" target="_blank" rel="noopener"><img src="/image.jpg" alt="alt"></a></p>
			"
		`);
	});
});
