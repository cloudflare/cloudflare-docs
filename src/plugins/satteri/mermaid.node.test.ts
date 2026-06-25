import { describe, expect, test } from "vitest";
import { markdownToHtml } from "satteri";

import mermaid from "./mermaid";

function render(source: string): string {
	const result = markdownToHtml(source, {
		hastPlugins: [mermaid],
	});
	return result.html;
}

describe("mermaid", () => {
	test("rewrites a ```mermaid fenced code block", () => {
		const source = ["```mermaid", "graph TD;", "A-->B;", "```"].join("\n");

		expect(render(source)).toMatchInlineSnapshot(`
			"<pre class="mermaid">graph TD;
			A--&gt;B;
			</pre>
			"
		`);
	});

	test("leaves non-mermaid code blocks alone", () => {
		const source = ["```ts", "const x = 1;", "```"].join("\n");

		expect(render(source)).toMatchInlineSnapshot(`
			"<pre><code class="language-ts">const x = 1;
			</code></pre>
			"
		`);
	});

	test("leaves unlabelled fenced code blocks alone", () => {
		const source = ["```", "plain text", "```"].join("\n");

		expect(render(source)).toMatchInlineSnapshot(`
			"<pre><code>plain text
			</code></pre>
			"
		`);
	});

	test("leaves inline code alone", () => {
		expect(render("an `inline mermaid` reference")).toMatchInlineSnapshot(`
			"<p>an <code>inline mermaid</code> reference</p>
			"
		`);
	});
});
