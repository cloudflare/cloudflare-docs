import { pathToFileURL } from "node:url";
import { describe, expect, test } from "vitest";
import { markdownToHtml } from "satteri";

import validateImages from "./validate-images";

const fakePage = pathToFileURL(`${process.cwd()}/src/content/docs/example.mdx`);

function render(
	source: string,
	options: { fileURL?: URL | null } = { fileURL: fakePage },
): string {
	const result = markdownToHtml(source, {
		mdastPlugins: [validateImages],
		fileURL: options.fileURL ?? undefined,
	});
	return result.html;
}

describe("validate-images", () => {
	test("accepts ~/assets paths that resolve to a real file", () => {
		expect(() =>
			render("![cat](~/assets/images/1.1.1.1/google-sheet-function.png)"),
		).not.toThrow();
	});

	test("accepts /public paths that resolve to a real file", () => {
		expect(() => render("![](/favicon.png)")).not.toThrow();
	});

	test("ignores remote URLs", () => {
		expect(() => render("![](https://example.com/cat.png)")).not.toThrow();
	});

	test("ignores bare relative URLs", () => {
		expect(() => render("![](relative-image.png)")).not.toThrow();
	});

	test("throws for missing ~/assets paths", () => {
		expect(() => render("![](~/assets/images/does-not-exist.png)")).toThrow(
			/Image not found: "~\/assets\/images\/does-not-exist\.png"/,
		);
	});

	test("throws for missing absolute public paths", () => {
		expect(() => render("![](/nope/missing.png)")).toThrow(
			/Image not found: "\/nope\/missing\.png"/,
		);
	});

	test("error message includes position and source file path", () => {
		try {
			render("text\n\n![](~/assets/images/missing.png)");
			expect.fail("expected validate-images to throw");
		} catch (err) {
			const message = (err as Error).message;
			expect(message).toContain("at line 3, column 1");
			expect(message).toContain("/src/content/docs/example.mdx");
			expect(message).toContain("Expected to find at:");
		}
	});

	test("attaches the source file path to the error", () => {
		try {
			render("![](~/assets/images/missing.png)");
			expect.fail("expected validate-images to throw");
		} catch (err) {
			expect((err as Error & { file?: string }).file).toContain(
				"/src/content/docs/example.mdx",
			);
		}
	});

	test("falls back to <unknown> when no fileURL is provided", () => {
		try {
			render("![](~/assets/images/missing.png)", { fileURL: null });
			expect.fail("expected validate-images to throw");
		} catch (err) {
			expect((err as Error).message).toContain("<unknown>");
		}
	});
});
