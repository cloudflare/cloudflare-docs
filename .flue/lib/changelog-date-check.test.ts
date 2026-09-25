import { describe, expect, it } from "vitest";
import {
	CHANGELOG_DATE_MARKER,
	getChangelogDateAction,
	getStaleChangelogEntries,
	isChangelogEntryFile,
	parseChangelogDate,
	renderChangelogDateComment,
	utcCalendarDaysBetween,
	type ChangelogEntry,
} from "./changelog-date-check";
import type { PullRequestFile } from "./github";

const now = new Date("2026-09-17T05:12:34.000Z");

function file(
	filename: string,
	status = "added",
): Pick<PullRequestFile, "filename" | "status"> {
	return { filename, status };
}

describe("isChangelogEntryFile", () => {
	it("selects added changelog entries in product subdirectories", () => {
		expect(
			isChangelogEntryFile(
				file("src/content/changelog/workers/2026-09-17-my-entry.mdx"),
			),
		).toBe(true);
		expect(
			isChangelogEntryFile(file("src/content/changelog/workers/note.md")),
		).toBe(true);
	});

	it("selects copied files (introduced by the PR)", () => {
		expect(
			isChangelogEntryFile(
				file("src/content/changelog/d1/2026-01-01-a.mdx", "copied"),
			),
		).toBe(true);
	});

	it("rejects modified, removed, and renamed files", () => {
		const path = "src/content/changelog/workers/2025-01-01-old.mdx";
		expect(isChangelogEntryFile(file(path, "modified"))).toBe(false);
		expect(isChangelogEntryFile(file(path, "removed"))).toBe(false);
		expect(isChangelogEntryFile(file(path, "renamed"))).toBe(false);
	});

	it("rejects non-changelog paths", () => {
		expect(
			isChangelogEntryFile(file("src/content/docs/workers/index.mdx")),
		).toBe(false);
		expect(
			isChangelogEntryFile(file("src/content/partials/workers/note.mdx")),
		).toBe(false);
	});

	it("rejects non-Markdown files", () => {
		expect(
			isChangelogEntryFile(file("src/content/changelog/workers/image.png")),
		).toBe(false);
	});
});

describe("parseChangelogDate", () => {
	it("parses a plain frontmatter date", () => {
		expect(
			parseChangelogDate(
				"---\ntitle: T\ndate: 2026-09-17\nproducts:\n  - workers\n---\n\nBody",
			),
		).toBe("2026-09-17");
	});

	it("parses a quoted date", () => {
		expect(parseChangelogDate('---\ndate: "2026-09-17"\n---\nBody')).toBe(
			"2026-09-17",
		);
	});

	it("parses datetime values, capturing only the date portion", () => {
		expect(
			parseChangelogDate(
				"---\ntitle: T\ndate: 2026-04-15T10:00:00Z\n---\nBody",
			),
		).toBe("2026-04-15");
		expect(
			parseChangelogDate('---\ndate: "2026-04-15T10:00:00Z"\n---\nBody'),
		).toBe("2026-04-15");
	});

	it("returns null without frontmatter", () => {
		expect(parseChangelogDate("# No frontmatter\n\ndate: 2026-09-17")).toBe(
			null,
		);
	});

	it("returns null when the date is outside the frontmatter", () => {
		expect(parseChangelogDate("---\ntitle: T\n---\ndate: 2026-09-17")).toBe(
			null,
		);
	});

	it("returns null for non-ISO dates", () => {
		expect(parseChangelogDate("---\ndate: September 17, 2026\n---\n")).toBe(
			null,
		);
		expect(parseChangelogDate("---\ndate: 2026-9-7\n---\n")).toBe(null);
	});

	it("returns null without a date field", () => {
		expect(parseChangelogDate("---\ntitle: T\n---\nBody")).toBe(null);
	});
});

describe("utcCalendarDaysBetween", () => {
	it("counts whole calendar days", () => {
		expect(utcCalendarDaysBetween("2026-09-16", "2026-09-17")).toBe(1);
		expect(utcCalendarDaysBetween("2026-09-17", "2026-09-17")).toBe(0);
		expect(utcCalendarDaysBetween("2026-09-17", "2026-09-16")).toBe(-1);
		expect(utcCalendarDaysBetween("2026-08-18", "2026-09-17")).toBe(30);
	});

	it("returns NaN for unparsable dates", () => {
		expect(utcCalendarDaysBetween("garbage", "2026-09-17")).toBeNaN();
	});
});

describe("getStaleChangelogEntries", () => {
	const entry = (date: string): ChangelogEntry => ({
		path: `src/content/changelog/workers/${date}-x.mdx`,
		date,
	});

	it("flags entries dated before the current UTC day", () => {
		const stale = getStaleChangelogEntries(
			[entry("2026-09-16"), entry("2026-09-01")],
			now,
		);
		expect(stale).toEqual([
			{
				path: "src/content/changelog/workers/2026-09-16-x.mdx",
				date: "2026-09-16",
				ageDays: 1,
			},
			{
				path: "src/content/changelog/workers/2026-09-01-x.mdx",
				date: "2026-09-01",
				ageDays: 16,
			},
		]);
	});

	it("passes entries dated today or in the future", () => {
		expect(
			getStaleChangelogEntries([entry("2026-09-17"), entry("2026-10-01")], now),
		).toEqual([]);
	});

	it("skips unparsable dates", () => {
		expect(getStaleChangelogEntries([entry("not-a-date")], now)).toEqual([]);
	});
});

describe("renderChangelogDateComment", () => {
	const stale = getStaleChangelogEntries(
		[
			{
				path: "src/content/changelog/workers/2026-09-16-x.mdx",
				date: "2026-09-16",
			},
		],
		now,
	);

	it("renders the marker, warning, entry list, and non-blocking note", () => {
		const body = renderChangelogDateComment(stale, "octocat");
		expect(body).toContain(CHANGELOG_DATE_MARKER);
		expect(body).toContain("⚠️ @octocat ");
		expect(body).toContain("`src/content/changelog/workers/2026-09-16-x.mdx`");
		expect(body).toContain(
			"- `src/content/changelog/workers/2026-09-16-x.mdx` — dated **2026-09-16**\n",
		);
		expect(body).not.toContain("day old");
		expect(body).toContain(
			"Typically, changelog entries should be dated the day they merge.",
		);
		expect(body).toContain("not blocking");
		expect(body).not.toContain("removed automatically");
	});

	it("renders the same body as the entry ages", () => {
		const entries = [
			{ path: "src/content/changelog/d1/a.mdx", date: "2026-09-01" },
		];
		const today = renderChangelogDateComment(
			getStaleChangelogEntries(entries, now),
			undefined,
		);
		const tomorrow = renderChangelogDateComment(
			getStaleChangelogEntries(
				entries,
				new Date(now.getTime() + 24 * 60 * 60 * 1000),
			),
			undefined,
		);
		expect(tomorrow).toBe(today);
		expect(today).not.toContain("@");
	});
});

describe("getChangelogDateAction", () => {
	const stale = [
		{ path: "src/content/changelog/d1/a.mdx", date: "2026-09-01", ageDays: 16 },
	];
	const marked = {
		id: 42,
		body: "old body",
		created_at: "",
		updated_at: "",
		user: null,
	};

	it("upserts when stale and no comment exists", () => {
		const action = getChangelogDateAction(stale, null, "body");
		expect(action).toEqual({ kind: "upsert", body: "body" });
	});

	it("is a no-op when stale and the comment body already matches", () => {
		const action = getChangelogDateAction(
			stale,
			{ ...marked, body: "body" },
			"body",
		);
		expect(action).toEqual({ kind: "none" });
	});

	it("upserts when the rendered body changed", () => {
		const action = getChangelogDateAction(stale, marked, "new body");
		expect(action).toEqual({ kind: "upsert", body: "new body" });
	});

	it("deletes when no longer stale and a comment exists", () => {
		const action = getChangelogDateAction([], marked, "");
		expect(action).toEqual({ kind: "delete", commentId: 42 });
	});

	it("is a no-op when clean with no comment", () => {
		expect(getChangelogDateAction([], null, "")).toEqual({ kind: "none" });
	});
});
