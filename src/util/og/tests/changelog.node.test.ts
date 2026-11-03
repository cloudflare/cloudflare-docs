import { describe, expect, test } from "vitest";

import {
	CHANGELOG_OG_TEMPLATE_VERSION,
	changelogOgVersion,
} from "../changelog";

const card = {
	title: "Workers KV bulk reads",
	date: "2026-09-27",
	product: "KV",
};

describe("changelogOgVersion", () => {
	// Live in production; changing the hash would re-render every card and
	// invalidate social platforms' cached previews.
	test("matches the published version of a real post", async () => {
		expect(
			await changelogOgVersion({
				title: "Subscribe to Browser Run crawl events",
				date: "2026-09-25",
				product: "Browser Run",
			}),
		).toBe("b554776c08c16fc5");
	});

	test("is stable for the same card", async () => {
		expect(await changelogOgVersion(card)).toBe(await changelogOgVersion(card));
	});

	test("changes with any card input", async () => {
		const version = await changelogOgVersion(card);
		for (const change of [
			{ title: "x" },
			{ date: "2026-09-28" },
			{ product: "R2" },
		]) {
			expect(await changelogOgVersion({ ...card, ...change })).not.toBe(
				version,
			);
		}
	});

	test("changes with the template version", async () => {
		expect(
			await changelogOgVersion(card, CHANGELOG_OG_TEMPLATE_VERSION + 1),
		).not.toBe(await changelogOgVersion(card));
	});
});
