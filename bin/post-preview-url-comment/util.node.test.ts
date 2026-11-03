import { describe, expect, test } from "vitest";
import { DOCS_BASE_URL } from "./constants";
import { filenameToPath } from "./util";

describe("filenameToPath", () => {
	test("index", () => {
		expect(filenameToPath("src/content/docs/workers/index.mdx")).toEqual(
			"workers/",
		);
	});

	test("index base", () => {
		expect(
			`${DOCS_BASE_URL}/${filenameToPath("src/content/docs/workers/index.mdx")}`,
		).toEqual("https://developers.cloudflare.com/workers/");
	});

	test("folder", () => {
		expect(
			filenameToPath("src/content/docs/workers/get-started/cli.mdx"),
		).toEqual("workers/get-started/cli/");
	});

	test("1.1.1.1", () => {
		expect(filenameToPath("src/content/docs/1111/index.mdx")).toEqual(
			"1.1.1.1/",
		);
	});

	test("changelog", () => {
		expect(
			filenameToPath("src/content/changelog/workers/2025-02-05-title.mdx"),
		).toEqual("changelog/post/2025-02-05-title/");
	});

	test("changelog base", () => {
		expect(
			`${DOCS_BASE_URL}/${filenameToPath("src/content/changelog/workers/2025-02-05-title.mdx")}`,
		).toEqual(
			"https://developers.cloudflare.com/changelog/post/2025-02-05-title/",
		);
	});
});
