import { describe, expect, test } from "vitest";
import { DOCS_BASE_URL, PREVIEW_URL_REGEX } from "./constants";
import { filenameToPath } from "./util";

test("PREVIEW_URL_REGEX", () => {
	const comment =
		"**Preview URL:** https://ac148943-cloudflare-docs.cloudflare-docs.workers.dev";
	const matches = comment.match(PREVIEW_URL_REGEX);

	expect(matches).toBeDefined();
	expect(matches![1]).toEqual(
		"https://ac148943-cloudflare-docs.cloudflare-docs.workers.dev",
	);
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
			filenameToPath("src/content/changelogs-next/2025-02-05-title.mdx"),
		).toEqual("changelog/2025-02-05-title/");
	});

	test("changelog base", () => {
		expect(
			`${DOCS_BASE_URL}/${filenameToPath("src/content/changelogs-next/2025-02-05-title.mdx")}`,
		).toEqual("https://developers.cloudflare.com/changelog/2025-02-05-title/");
	});
});
