import { describe, expect, test } from "vitest";
import { generateDescription } from "./props";
import { rehypeExternalLinksOptions } from "~/plugins/rehype/external-links";

describe("description", () => {
	describe("markdown", () => {
		test("unwraps formatting into text", async () => {
			const desc = await generateDescription({
				markdown: "`code` and [links](/)",
			});

			expect(desc).toEqual("code and links");
		});

		test("removes external link icon", async () => {
			const icon = rehypeExternalLinksOptions.content.value;

			const desc = await generateDescription({
				markdown: `[links${icon}](/) and **${icon}stuff**`,
			});

			expect(desc).toEqual("links and \\*\\*stuff\\*\\*");
		});
	});

	describe("html", () => {
		test("selects first paragraph", async () => {
			const desc = await generateDescription({
				html: "<code>not this</code><p>this <code>and this</code></p>",
			});

			expect(desc).toEqual("this and this");
		});

		test("decodes html entities", async () => {
			const desc = await generateDescription({
				html: "<p>&lt;this&gt;</p>",
			});

			expect(desc).toEqual("<this>");
		});
	});
});
