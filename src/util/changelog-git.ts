/**
 * When each changelog `updates` entry first reached the current branch, read
 * from `git log`.
 *
 * Some feed tools (for example, Slack's RSS app) only deliver items dated
 * later than the newest item they have already seen. An update's feed date
 * must therefore be when it went live, not the date its author wrote, which is
 * often the day of the change and earlier than posts merged in the meantime.
 *
 * Uses the committer date of the first first-parent commit containing the
 * update. On `production` (squash merges through the merge queue) that is the
 * merge time. Returns an empty map when git can't answer (shallow clone,
 * untracked file, no git), so callers fall back to the author's date.
 */
import { execFileSync } from "node:child_process";
import { parse as parseYaml } from "yaml";
import {
	changelogUpdateAnchor,
	publishedUpdates,
	updateFeedDate,
	type ChangelogUpdate,
} from "./changelog-updates";

const git = (args: string[]) =>
	execFileSync("git", args, {
		encoding: "utf8",
		stdio: ["ignore", "pipe", "ignore"],
	});

let shallow: boolean | undefined;
const isShallow = () =>
	(shallow ??=
		git(["rev-parse", "--is-shallow-repository"]).trim() !== "false");

/** Dates of the `updates` entries in a changelog source file. */
export function updateDatesInSource(source: string): Date[] {
	const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!match) return [];
	const data = parseYaml(match[1]) as { updates?: unknown } | null;
	if (!Array.isArray(data?.updates)) return [];

	return data.updates
		.map((update) => new Date(String(update?.date)))
		.filter((date) => !Number.isNaN(date.getTime()));
}

const cache = new Map<string, Map<string, Date>>();

/** Map of update anchor (see `changelogUpdateAnchor`) to the time it landed. */
export function updatesLandedAt(filePath: string): Map<string, Date> {
	const cached = cache.get(filePath);
	if (cached) return cached;

	const landed = new Map<string, Date>();
	cache.set(filePath, landed);

	try {
		if (isShallow()) return landed;

		const commits = git([
			"log",
			"--first-parent",
			"--reverse",
			"--format=%H %cI",
			"--",
			filePath,
		])
			.split("\n")
			.filter(Boolean);

		for (const line of commits) {
			const [sha, committedAt] = line.split(" ");
			let source: string;
			try {
				source = git(["show", `${sha}:${filePath}`]);
			} catch {
				continue;
			}
			for (const date of updateDatesInSource(source)) {
				const anchor = changelogUpdateAnchor(date);
				if (!landed.has(anchor)) landed.set(anchor, new Date(committedAt));
			}
		}
	} catch {
		// No git history available: callers use the author's date.
	}

	return landed;
}

export type LiveUpdate = ChangelogUpdate & {
	/** Fragment ID used on the post page and in the RSS GUID. */
	anchor: string;
	/** When the update went live, or the author's date without git history. */
	liveAt: Date;
};

/**
 * Visible updates with the date they went live, newest first. The post page,
 * the feed list, and the RSS feeds all use this, so they show the same dates.
 */
export function liveUpdates(
	updates: ChangelogUpdate[] | undefined,
	filePath: string | undefined,
	now: Date = new Date(),
): LiveUpdate[] {
	const visible = publishedUpdates(updates, now);
	if (visible.length === 0) return [];

	const landed = filePath ? updatesLandedAt(filePath) : undefined;
	return visible
		.map((update) => {
			const anchor = changelogUpdateAnchor(update.date);
			return {
				...update,
				anchor,
				liveAt: updateFeedDate(update.date, landed?.get(anchor)),
			};
		})
		.sort((a, b) => b.liveAt.getTime() - a.liveAt.getTime());
}
