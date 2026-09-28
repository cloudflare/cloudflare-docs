import { describe, expect, test } from "vitest";

import {
	DOCS_OG_TEMPLATE_VERSION,
	docsOgVersion,
	parseDocsCard,
	resolveDocsCard,
} from "../docs";

const tutorial = (fields: Partial<Parameters<typeof resolveDocsCard>[0]>) =>
	resolveDocsCard({ title: "Build a thing", tutorial: true, ...fields }).pills;

describe("resolveDocsCard", () => {
	test("docs pages show only the primary product", () => {
		expect(
			resolveDocsCard({
				title: " How KV works ",
				tutorial: false,
				difficulty: "Beginner",
				primaryProduct: "KV",
				products: ["Workers"],
			}),
		).toEqual({ type: "docs", title: "How KV works", pills: ["KV"] });
	});

	test("docs pages without a product have no pills", () => {
		expect(
			resolveDocsCard({ title: "Glossary", tutorial: false }).pills,
		).toEqual([]);
	});

	test("tutorials show difficulty, then the primary, then other products", () => {
		// e.g. /workers/tutorials/upload-assets-with-r2/: primary from the URL
		// section, frontmatter products elsewhere.
		expect(
			tutorial({
				difficulty: "Beginner",
				primaryProduct: "Workers",
				products: ["R2"],
			}),
		).toEqual(["Beginner", "Workers", "R2"]);
	});

	test("tutorials without difficulty or products", () => {
		expect(tutorial({ primaryProduct: "Workers" })).toEqual(["Workers"]);
		expect(tutorial({})).toEqual([]);
	});

	test("drops empty labels and case-insensitive duplicates, keeping the first", () => {
		expect(
			tutorial({
				difficulty: " ",
				primaryProduct: "Secrets Store",
				products: ["Secrets Store", "secrets store", "", "Workers"],
			}),
		).toEqual(["Secrets Store", "Workers"]);
	});

	test("keeps at most four pills, difficulty first", () => {
		expect(
			tutorial({
				difficulty: "Advanced",
				primaryProduct: "Workers",
				products: ["R2", "D1", "KV", "Queues"],
			}),
		).toEqual(["Advanced", "Workers", "R2", "D1"]);
	});
});

describe("docsOgVersion", () => {
	const card = resolveDocsCard({
		title: "How KV works",
		tutorial: false,
		primaryProduct: "KV",
	});

	test("changes with the title, pills and template version", async () => {
		const version = await docsOgVersion(card);
		expect(await docsOgVersion({ ...card, title: "x" })).not.toBe(version);
		expect(
			await docsOgVersion({ ...card, pills: ["Beginner", "KV"] }),
		).not.toBe(version);
		expect(await docsOgVersion(card, DOCS_OG_TEMPLATE_VERSION + 1)).not.toBe(
			version,
		);
	});

	test("is identical for identical fields", async () => {
		expect(await docsOgVersion({ ...card })).toBe(await docsOgVersion(card));
	});
});

describe("parseDocsCard", () => {
	const valid = { type: "docs", title: "T", pills: ["A"] };

	test("accepts a well-formed card", () => {
		expect(parseDocsCard(JSON.stringify(valid))).toEqual(valid);
	});

	test.each([
		["not JSON", "{"],
		["a non-object", "[]"],
		["another type", JSON.stringify({ ...valid, type: "changelog" })],
		["an empty title", JSON.stringify({ ...valid, title: " " })],
		[
			"too many pills",
			JSON.stringify({ ...valid, pills: ["a", "b", "c", "d", "e"] }),
		],
		["a non-string pill", JSON.stringify({ ...valid, pills: [1] })],
		["an empty pill", JSON.stringify({ ...valid, pills: [""] })],
	])("rejects %s", (_, json) => {
		expect(parseDocsCard(json)).toBeNull();
	});
});
