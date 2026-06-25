import { describe, expect, test } from "vitest";
import { markdownToHtml } from "satteri";

import autolinkHeadings from "./autolink-headings";
import headingSlugs from "./heading-slugs";

function render(source: string): string {
	const result = markdownToHtml(source, {
		// heading-slugs runs first so headings have ids for autolink-headings to wrap.
		hastPlugins: [headingSlugs, autolinkHeadings],
	});
	return result.html;
}

function renderWithoutSlugs(source: string): string {
	const result = markdownToHtml(source, {
		hastPlugins: [autolinkHeadings],
	});
	return result.html;
}

const EXPECTED_ANCHOR_ICON =
	'<svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentcolor" d="m12.11 15.39-3.88 3.88a2.52 2.52 0 0 1-3.5 0 2.47 2.47 0 0 1 0-3.5l3.88-3.88a1 1 0 0 0-1.42-1.42l-3.88 3.89a4.48 4.48 0 0 0 6.33 6.33l3.89-3.88a1 1 0 1 0-1.42-1.42Zm8.58-12.08a4.49 4.49 0 0 0-6.33 0l-3.89 3.88a1 1 0 0 0 1.42 1.42l3.88-3.88a2.52 2.52 0 0 1 3.5 0 2.47 2.47 0 0 1 0 3.5l-3.88 3.88a1 1 0 1 0 1.42 1.42l3.88-3.89a4.49 4.49 0 0 0 0-6.33ZM8.83 15.17a1 1 0 0 0 1.1.22 1 1 0 0 0 .32-.22l4.92-4.92a1 1 0 0 0-1.42-1.42l-4.92 4.92a1 1 0 0 0 0 1.42Z"></path></svg>';

describe("autolink-headings", () => {
	test("wraps headings that have an id", () => {
		expect(render("## foo")).toMatchInlineSnapshot(`
			"<div tabindex="-1" class="heading-wrapper level-h2"><h2 id="foo">foo</h2><a class="anchor-link" href="#foo"><span aria-hidden="true" class="anchor-icon">${EXPECTED_ANCHOR_ICON}</span></a></div>
			"
		`);
	});

	test("uses the heading rank in the wrapper class", () => {
		expect(render("#### deep heading")).toMatchInlineSnapshot(`
			"<div tabindex="-1" class="heading-wrapper level-h4"><h4 id="deep-heading">deep heading</h4><a class="anchor-link" href="#deep-heading"><span aria-hidden="true" class="anchor-icon">${EXPECTED_ANCHOR_ICON}</span></a></div>
			"
		`);
	});

	test("anchor href matches the heading id", () => {
		expect(render("### My Section")).toMatchInlineSnapshot(`
			"<div tabindex="-1" class="heading-wrapper level-h3"><h3 id="my-section">My Section</h3><a class="anchor-link" href="#my-section"><span aria-hidden="true" class="anchor-icon">${EXPECTED_ANCHOR_ICON}</span></a></div>
			"
		`);
	});

	test("ignores headings without an id", () => {
		expect(renderWithoutSlugs("## foo")).toMatchInlineSnapshot(`
			"<h2>foo</h2>
			"
		`);
	});
});
