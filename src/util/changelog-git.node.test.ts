// @vitest-environment node
import { execFileSync } from "node:child_process";
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { afterAll, beforeAll, describe, expect, test } from "vitest";
import {
	liveUpdates,
	updateDatesInSource,
	updatesLandedAt,
} from "./changelog-git";

const post = (updates: string) =>
	`---\ntitle: Example\ndate: 2026-10-21\n${updates}---\n\nBody.\n`;

const FIRST = "  - date: 2026-10-21T12:34:00Z\n    summary: First.\n";
const SECOND = "  - date: 2026-10-22\n    summary: Second.\n";

describe("updateDatesInSource", () => {
	test("reads update dates from frontmatter", () => {
		expect(updateDatesInSource(post(`updates:\n${FIRST}${SECOND}`))).toEqual([
			new Date("2026-10-21T12:34:00Z"),
			new Date("2026-10-22T00:00:00Z"),
		]);
	});

	test("returns nothing without updates", () => {
		expect(updateDatesInSource(post(""))).toEqual([]);
	});
});

describe("updatesLandedAt", () => {
	const cwd = process.cwd();
	let dir: string;

	const commit = (content: string, when: string) => {
		fs.writeFileSync(path.join(dir, "post.mdx"), content);
		const env = {
			...process.env,
			GIT_AUTHOR_DATE: "2026-10-21T12:00:00Z",
			GIT_COMMITTER_DATE: when,
		};
		execFileSync("git", ["add", "post.mdx"], { cwd: dir });
		execFileSync("git", ["commit", "-q", "-m", when], { cwd: dir, env });
	};

	beforeAll(() => {
		dir = fs.mkdtempSync(path.join(os.tmpdir(), "changelog-git-"));
		execFileSync("git", ["init", "-q"], { cwd: dir });
		execFileSync("git", ["config", "user.email", "test@example.com"], {
			cwd: dir,
		});
		execFileSync("git", ["config", "user.name", "Test"], { cwd: dir });

		commit(post(""), "2026-10-21T01:44:00Z");
		commit(post(`updates:\n${FIRST}`), "2026-10-29T09:00:00Z");
		commit(post(`updates:\n${FIRST}${SECOND}`), "2026-10-30T15:30:00Z");
		// A later edit that keeps both updates must not move them.
		commit(
			post(`updates:\n${FIRST}${SECOND}`) + "More.\n",
			"2026-11-02T08:00:00Z",
		);

		process.chdir(dir);
	});

	afterAll(() => {
		process.chdir(cwd);
		fs.rmSync(dir, { recursive: true, force: true });
	});

	test("uses the committer date of the first commit with each update", () => {
		const landed = updatesLandedAt("post.mdx");
		expect(landed.get("update-2026-10-21T12-34")).toEqual(
			new Date("2026-10-29T09:00:00Z"),
		);
		expect(landed.get("update-2026-10-22T00-00")).toEqual(
			new Date("2026-10-30T15:30:00Z"),
		);
	});

	test("dates visible updates by when they went live, newest first", () => {
		const updates = [
			{ date: new Date("2026-10-21T12:34:00Z"), summary: "First." },
			{ date: new Date("2026-10-22T00:00:00Z"), summary: "Second." },
		];
		const live = liveUpdates(updates, "post.mdx", new Date("2026-11-05"));
		expect(live.map(({ anchor, liveAt }) => [anchor, liveAt])).toEqual([
			["update-2026-10-22T00-00", new Date("2026-10-30T15:30:00Z")],
			["update-2026-10-21T12-34", new Date("2026-10-29T09:00:00Z")],
		]);
	});

	test("falls back to the author's date without git history", () => {
		const updates = [{ date: new Date("2026-10-21T12:34:00Z"), summary: "x" }];
		expect(
			liveUpdates(updates, undefined, new Date("2026-11-05"))[0].liveAt,
		).toEqual(new Date("2026-10-21T12:34:00Z"));
	});

	test("returns nothing for untracked files", () => {
		expect(updatesLandedAt("missing.mdx").size).toBe(0);
	});
});
