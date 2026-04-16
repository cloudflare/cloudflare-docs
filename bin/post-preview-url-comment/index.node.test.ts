import { describe, expect, test } from "vitest";
import { DOCS_BASE_URL, PREVIEW_URL_REGEX } from "./constants";
import { filenameToPath } from "./util";

describe("PREVIEW_URL_REGEX", () => {
	test("no changed files", () => {
		const comment =
			"**Preview URL:** https://e9c79bc3.preview.developers.cloudflare.com\n**Preview Branch URL:** https://kian-pcx-15803.preview.developers.cloudflare.com";

		expect(PREVIEW_URL_REGEX.test(comment)).toBe(true);
	});

	test("changed files", () => {
		const comment =
			"**Preview URL:** https://e9c79bc3.preview.developers.cloudflare.com\n**Preview Branch URL:** https://kian-pcx-15803.preview.developers.cloudflare.com\n\n**Files with changes (up to 15)**\n\n| Original Link | Updated Link |\n| --- | --- |\n| [https://developers.cloudflare.com/workers/get-started/guide/](https://developers.cloudflare.com/workers/get-started/guide/) | [https://kian-pcx-15803.preview.developers.cloudflare.com/workers/get-started/guide/](https://kian-pcx-15803.preview.developers.cloudflare.com/workers/get-started/guide/) |";

		expect(PREVIEW_URL_REGEX.test(comment)).toBe(true);
	});

	test("empty", () => {
		expect(PREVIEW_URL_REGEX.test("")).toBe(false);
	});
});

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
		).toEqual("changelog/2025-02-05-title/");
	});

	test("changelog base", () => {
		expect(
			`${DOCS_BASE_URL}/${filenameToPath("src/content/changelog/workers/2025-02-05-title.mdx")}`,
		).toEqual("https://developers.cloudflare.com/changelog/2025-02-05-title/");
	});
});
