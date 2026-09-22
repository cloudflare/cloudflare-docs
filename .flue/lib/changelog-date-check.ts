/**
 * Changelog date check — non-blocking warning for PRs that add changelog
 * entries dated in the past.
 *
 * Trusted TypeScript only: no agent, no model. The check is deterministic date
 * math (an agent adds nothing), so it follows the reviewer-recommendations
 * pattern rather than the specialist-agent pattern: a short driver reconciles
 * a singleton marker comment per PR — created/updated while a stale entry
 * exists, deleted once it no longer does. There is no R2 state: the marker
 * comment is the only persistent artifact and is located by its HTML comment
 * marker on every run.
 *
 * One code path (`reconcileChangelogDateComment`) serves both triggers:
 *   - the nightly cron sweep over every open PR (`runChangelogDateSweep`),
 *   - webhook `pull_request` events (opened/reopened/synchronize/
 *     ready_for_review/closed) handled inline in `lib/pipeline-entry.ts`.
 *
 * A closed PR never needs the warning, so reconcile removes any leftover
 * marker comment for it — that is how the comment disappears on close/merge.
 *
 * Only files the PR *introduces* (status added/copied) are checked. Editing an
 * old entry must not nag about its historical date.
 */
import {
	createIssueComment,
	deleteIssueComment,
	getIssueComments,
	getPullRequestFiles,
	getRepoFileContent,
	listOpenPullRequests,
	updateIssueComment,
	type GitHubIssueComment,
	type GitHubPullRequest,
	type PullRequestFile,
} from "./github";
import { getMarkedComment } from "./draft-stale";

export const CHANGELOG_DATE_MARKER =
	"<!-- cloudflare-docs-flue-changelog-date -->";

const CHANGELOG_DIR = "src/content/changelog/";

/** GitHub statuses that mean "this PR introduces the file as new". */
const NEW_FILE_STATUSES = new Set(["added", "copied"]);

export interface ChangelogEntry {
	path: string;
	/** `YYYY-MM-DD` frontmatter date. */
	date: string;
}

export interface StaleChangelogEntry {
	path: string;
	date: string;
	/** Whole UTC calendar days between the entry date and the reference day. */
	ageDays: number;
}

/** Does this PR file add a changelog entry this check applies to? */
export function isChangelogEntryFile(
	file: Pick<PullRequestFile, "filename" | "status">,
): boolean {
	return (
		file.filename.startsWith(CHANGELOG_DIR) &&
		/\.(mdx|md)$/.test(file.filename) &&
		NEW_FILE_STATUSES.has(file.status)
	);
}

/**
 * Parse `date: YYYY-MM-DD` (optionally with a datetime suffix — the content
 * schema coerces via `z.coerce.date()`, so real entries like
 * `date: 2026-04-15T10:00:00Z` are valid) from an MDX file's YAML frontmatter.
 * Returns null for anything the frontmatter does not clearly provide —
 * unparsable dates are the docs build's problem (the content schema validates
 * them), not ours.
 */
export function parseChangelogDate(content: string): string | null {
	if (!content.startsWith("---")) return null;
	const closing = content.slice(3).match(/^---\s*$/m);
	if (!closing || closing.index === undefined) return null;
	const frontmatter = content.slice(3, closing.index + 3);
	const match = frontmatter.match(
		/^date:\s*["']?(\d{4}-\d{2}-\d{2})(?:T[^"'\s]*)?["']?\s*$/m,
	);
	return match ? match[1] : null;
}

/**
 * Whole UTC calendar days from `from` to `to` (both `YYYY-MM-DD`). The
 * changelog dates are timezone-less, and the cron runs in UTC, so UTC
 * calendar days are the deterministic unit.
 */
export function utcCalendarDaysBetween(from: string, to: string): number {
	const fromMs = Date.parse(`${from}T00:00:00.000Z`);
	const toMs = Date.parse(`${to}T00:00:00.000Z`);
	if (!Number.isFinite(fromMs) || !Number.isFinite(toMs)) return Number.NaN;
	return Math.round((toMs - fromMs) / 86_400_000);
}

/**
 * Entries dated before the current UTC day (zero tolerance: an entry written
 * today is fine, one dated yesterday nags as "1 day old"). Future dates pass —
 * scheduled entries via `publish_future_dated_entry` are a supported feature.
 * Unparsable dates are skipped.
 */
export function getStaleChangelogEntries(
	entries: ChangelogEntry[],
	now = new Date(),
): StaleChangelogEntry[] {
	const today = now.toISOString().slice(0, 10);
	const stale: StaleChangelogEntry[] = [];
	for (const entry of entries) {
		const ageDays = utcCalendarDaysBetween(entry.date, today);
		if (Number.isFinite(ageDays) && ageDays >= 1) {
			stale.push({ ...entry, ageDays });
		}
	}
	return stale;
}

export function renderChangelogDateComment(
	stale: StaleChangelogEntry[],
	author: string | undefined,
): string {
	const lines = [
		CHANGELOG_DATE_MARKER,
		`⚠️ ${author ? `@${author} ` : ""}This pull request adds a changelog entry dated in the past:`,
		"",
	];
	for (const entry of stale) {
		lines.push(
			`- \`${entry.path}\` — dated **${entry.date}**, ${entry.ageDays} day${entry.ageDays === 1 ? "" : "s"} old`,
		);
	}
	lines.push(
		"",
		`Typically, changelog entries should be dated the day they merge. This is not blocking — if the date is unintentional, please update it.`,
	);
	return lines.join("\n");
}

/** What to do with the marker comment for the current staleness state. */
export type ChangelogDateAction =
	| { kind: "none" }
	| { kind: "upsert"; body: string }
	| { kind: "delete"; commentId: number };

export function getChangelogDateAction(
	stale: StaleChangelogEntry[],
	marked: GitHubIssueComment | null,
	body: string,
): ChangelogDateAction {
	if (stale.length > 0) {
		if (marked && marked.body === body) return { kind: "none" };
		return { kind: "upsert", body };
	}
	return marked ? { kind: "delete", commentId: marked.id } : { kind: "none" };
}

export interface ChangelogDateResult {
	action: ChangelogDateAction;
	stale: StaleChangelogEntry[];
}

/**
 * Reconcile the marker comment for one PR to its current staleness state.
 * Throws on GitHub API failures — callers own retry/logging policy.
 */
export async function reconcileChangelogDateComment(
	token: string,
	pr: GitHubPullRequest,
	now = new Date(),
): Promise<ChangelogDateResult> {
	// A closed PR never needs the warning; this also cleans up on close/merge
	// (the webhook `closed` event routes here through the same code path).
	if (pr.state !== "open") {
		return removeChangelogDateComment(token, pr.number);
	}

	const stale = await collectStaleChangelogEntries(token, pr, now);
	const body =
		stale.length > 0 ? renderChangelogDateComment(stale, pr.user?.login) : "";
	const comments = await getIssueComments(token, pr.number);
	const marked = getMarkedComment(comments, CHANGELOG_DATE_MARKER);
	const action = getChangelogDateAction(stale, marked, body);

	if (action.kind === "upsert") {
		if (marked) await updateIssueComment(token, marked.id, action.body);
		else await createIssueComment(token, pr.number, action.body);
	} else if (action.kind === "delete") {
		await deleteIssueComment(token, action.commentId);
	}

	return { action, stale };
}

async function removeChangelogDateComment(
	token: string,
	prNumber: number,
): Promise<ChangelogDateResult> {
	const comments = await getIssueComments(token, prNumber);
	const marked = getMarkedComment(comments, CHANGELOG_DATE_MARKER);
	if (!marked) return { action: { kind: "none" }, stale: [] };
	await deleteIssueComment(token, marked.id);
	return { action: { kind: "delete", commentId: marked.id }, stale: [] };
}

async function collectStaleChangelogEntries(
	token: string,
	pr: GitHubPullRequest,
	now: Date,
): Promise<StaleChangelogEntry[]> {
	const files = await getPullRequestFiles(token, pr.number);
	const paths = files.filter(isChangelogEntryFile).map((file) => file.filename);
	if (paths.length === 0) return [];

	// Fetch all file contents concurrently — this runs inline on the webhook
	// hot path, so per-file fetches must not stack up sequentially.
	// The contents API accepts a PR head SHA even for fork branches, since the
	// head commit is reachable in the base repository.
	const contents = await Promise.all(
		paths.map((path) => getRepoFileContent(token, path, pr.head.sha)),
	);

	const entries: ChangelogEntry[] = [];
	for (const [i, content] of contents.entries()) {
		if (!content) continue;
		const date = parseChangelogDate(content);
		if (date) entries.push({ path: paths[i], date });
	}
	return getStaleChangelogEntries(entries, now);
}

/**
 * Nightly cron sweep: reconcile the marker comment for every open PR. A
 * single PR's failure is logged and isolated so one broken PR never stops
 * the sweep (mirrors the draft-stale sweep).
 */
export async function runChangelogDateSweep(token: string): Promise<void> {
	for (const pr of await listOpenPullRequests(token)) {
		try {
			await reconcileChangelogDateComment(token, pr);
		} catch (error) {
			console.error({
				message: `Changelog date sweep failed for PR #${pr.number}: ${error instanceof Error ? error.message : String(error)}`,
				event: "changelog_date",
				number: pr.number,
				action: "check_failed",
			});
		}
	}
}
