import { describe, expect, it } from "vitest";
import {
	docsSourcePath,
	docsUrlsIn,
	parseCodeowners,
	productCodeownerAreas,
} from "./codeowners";

const RULES = parseCodeowners(`
# comment
* @cloudflare/product-owners
/src/content/docs/workers/ @cloudflare/workers-docs @cloudflare/content-engineering
/src/content/docs/workers/ai/ @cloudflare/workers-ai
/src/content/docs/style/ @cloudflare/content-engineering
*.png @someone
`);

describe("productCodeownerAreas", () => {
	it("uses the last matching rule", () => {
		expect(
			productCodeownerAreas(RULES, ["src/content/docs/workers/ai/models"]),
		).toEqual(["/src/content/docs/workers/ai/"]);
	});

	it("ignores rules with only generic owners", () => {
		expect(
			productCodeownerAreas(RULES, [
				"src/content/docs/style/guide",
				"src/content/docs/d1/get-started",
			]),
		).toEqual([]);
	});

	it("dedupes areas", () => {
		expect(
			productCodeownerAreas(RULES, [
				"src/content/docs/workers/a",
				"src/content/docs/workers/b",
			]),
		).toEqual(["/src/content/docs/workers/"]);
	});

	it("matches unanchored globs anywhere", () => {
		expect(productCodeownerAreas(RULES, ["src/assets/x/y.png"])).toEqual([
			"*.png",
		]);
	});
});

describe("docsSourcePath", () => {
	it("maps docs URLs and paths", () => {
		expect(
			docsSourcePath(
				"https://developers.cloudflare.com/workers/platform/limits/",
			),
		).toBe("src/content/docs/workers/platform/limits");
		expect(docsSourcePath("/d1/get-started/index.md")).toBe(
			"src/content/docs/d1/get-started",
		);
	});

	it("rejects other hosts and the root", () => {
		expect(docsSourcePath("https://example.com/workers/")).toBeNull();
		expect(docsSourcePath("https://developers.cloudflare.com/")).toBeNull();
	});
});

describe("docsUrlsIn", () => {
	it("finds docs URLs, trims punctuation and anchors, dedupes", () => {
		expect(
			docsUrlsIn(
				"See https://developers.cloudflare.com/kv/api/#write. And (https://developers.cloudflare.com/kv/api/), https://example.com/x",
			),
		).toEqual(["https://developers.cloudflare.com/kv/api/"]);
	});
});
