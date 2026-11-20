import { describe, expect, test } from "vitest";
import {
	changelogUpdateAnchor,
	duplicateUpdateAnchors,
	formatUpdateDate,
	publishedUpdates,
	sortByPubDateDesc,
	updateFeedDate,
} from "./changelog-updates";

describe("changelogUpdateAnchor", () => {
	test("builds a URL-safe fragment from the update time", () => {
		expect(changelogUpdateAnchor(new Date("2026-10-21T12:34:56Z"))).toBe(
			"update-2026-10-21T12-34",
		);
	});

	test("gives different updates different anchors", () => {
		expect(changelogUpdateAnchor(new Date("2026-10-21T03:29:00Z"))).not.toBe(
			changelogUpdateAnchor(new Date("2026-10-21T12:34:00Z")),
		);
	});
});

describe("publishedUpdates", () => {
	const now = new Date("2026-10-28T00:00:00Z");

	test("returns visible updates newest first", () => {
		const updates = publishedUpdates(
			[
				{ date: new Date("2026-10-21T03:29:00Z"), summary: "first" },
				{ date: new Date("2026-10-21T12:34:00Z"), summary: "second" },
			],
			now,
		);
		expect(updates.map((u) => u.summary)).toEqual(["second", "first"]);
	});

	test("hides future-dated updates", () => {
		expect(
			publishedUpdates(
				[{ date: new Date("2026-11-01T00:00:00Z"), summary: "later" }],
				now,
			),
		).toEqual([]);
	});

	test("handles posts without updates", () => {
		expect(publishedUpdates(undefined, now)).toEqual([]);
	});
});

describe("sortByPubDateDesc", () => {
	test("puts update items ahead of older posts and keeps ties in order", () => {
		const items = [
			{ id: "post-b", pubDate: new Date("2026-10-25") },
			{ id: "post-a-1", pubDate: new Date("2026-10-21") },
			{ id: "post-a-2", pubDate: new Date("2026-10-21") },
			{ id: "post-a-update", pubDate: new Date("2026-10-27") },
		];
		expect(sortByPubDateDesc(items).map((i) => i.id)).toEqual([
			"post-a-update",
			"post-b",
			"post-a-1",
			"post-a-2",
		]);
	});
});

describe("updateFeedDate", () => {
	const authorDate = new Date("2026-10-21T12:34:00Z");

	test("uses the time the update went live when it is later", () => {
		const landedAt = new Date("2026-10-30T15:30:00Z");
		expect(updateFeedDate(authorDate, landedAt)).toEqual(landedAt);
	});

	test("keeps the author's date when it is later or git has no answer", () => {
		expect(updateFeedDate(authorDate, new Date("2026-10-20"))).toEqual(
			authorDate,
		);
		expect(updateFeedDate(authorDate)).toEqual(authorDate);
	});
});

describe("formatUpdateDate", () => {
	test("includes the time in UTC", () => {
		expect(formatUpdateDate(new Date("2026-10-21T03:29:00Z"))).toBe(
			"October 21, 2026, 03:29 UTC",
		);
	});

	test("shows the date alone for date-only entries", () => {
		expect(formatUpdateDate(new Date("2026-10-22"))).toBe("October 22, 2026");
	});
});

describe("duplicateUpdateAnchors", () => {
	test("finds updates dated within the same minute", () => {
		expect(
			duplicateUpdateAnchors([
				{ date: new Date("2026-10-22") },
				{ date: new Date("2026-10-22") },
				{ date: new Date("2026-10-21T12:34:10Z") },
				{ date: new Date("2026-10-21T12:34:50Z") },
				{ date: new Date("2026-10-21T03:29:00Z") },
			]),
		).toEqual(["update-2026-10-22T00-00", "update-2026-10-21T12-34"]);
	});

	test("returns nothing when every update has its own time", () => {
		expect(
			duplicateUpdateAnchors([
				{ date: new Date("2026-10-22T09:00:00Z") },
				{ date: new Date("2026-10-22T09:01:00Z") },
			]),
		).toEqual([]);
	});
});
