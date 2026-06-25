import { describe, expect, test } from "vitest";
import { markdownToHtml } from "satteri";

import titleFigure from "./title-figure";

function render(source: string): string {
	const result = markdownToHtml(source, {
		hastPlugins: [titleFigure],
	});
	return result.html;
}

describe("title-figure", () => {
	test("wraps a single image with a title in a <figure>", () => {
		expect(render(`![a cat](/cat.png "Pictured: a cat")`))
			.toMatchInlineSnapshot(`
			"<figure><img src="/cat.png" alt="a cat" title="Pictured: a cat"><figcaption>Pictured: a cat</figcaption></figure>
			"
		`);
	});

	test("returns the image untouched when it has no title", () => {
		expect(render(`![a cat](/cat.png)`)).toMatchInlineSnapshot(`
			"<img src="/cat.png" alt="a cat">
			"
		`);
	});

	test("handles multiple images", () => {
		expect(render(`![](/a.png "A")\n![](/b.png)`)).toMatchInlineSnapshot(`
			"<figure><img src="/a.png" alt="" title="A"><figcaption>A</figcaption></figure><img src="/b.png" alt="">
			"
		`);
	});

	test("ignores paragraphs without images", () => {
		expect(render("just words")).toMatchInlineSnapshot(`
			"<p>just words</p>
			"
		`);
	});
});
