import {
	closePullRequest,
	createIssueComment,
	getCommitSummary,
	getIssueComment,
	getIssueComments,
	getPullRequest,
	listBranchActivity,
	listIssueEvents,
	listOpenDraftPullRequests,
	listPullRequestReviews,
	type GitHubBranchActivity,
	type GitHubCommitSummary,
	type GitHubIssueComment,
	type GitHubIssueEvent,
	type GitHubPullRequest,
	type GitHubPullRequestReview,
	REPO,
} from "./github";

const DAY_MS = 24 * 60 * 60 * 1000;
const REMINDER_AFTER_MS = 3 * DAY_MS;
const CLOSE_AFTER_MS = 7 * DAY_MS;
const MINIMUM_WARNING_MS = 4 * DAY_MS;
const ACTIVITY_SKEW_MS = 60 * 1000;

export const DRAFT_STALE_REMINDER_MARKER =
	"<!-- cloudflare-docs-flue-draft-stale -->";
export const DRAFT_STALE_CLOSE_MARKER =
	"<!-- cloudflare-docs-flue-draft-stale-close -->";

export interface DraftStaleState {
	staleSince: string;
	reminderPostedAt: string;
	reminderCommentId: number;
	closingCommentId?: number;
}

export type DraftStaleAction = "none" | "remind" | "reset" | "close";

function stateKey(prNumber: number): string {
	return `draft-stale/pr-${prNumber}/state.json`;
}

function neverStaleKey(prNumber: number): string {
	return `draft-stale/pr-${prNumber}/never-stale.json`;
}

const ORPHAN_STATE_KEY_PATTERN = /^draft-stale\/pr-(\d+)\/state\.json$/;

/** Issue events a human can cause that meaningfully touch a draft PR. */
export const ACTIVITY_EVENTS: ReadonlySet<string> = new Set([
	"reopened",
	"ready_for_review",
	"convert_to_draft",
	"head_ref_force_pushed",
	"head_ref_restored",
	"base_ref_changed",
	"renamed",
	"labeled",
	"unlabeled",
	"assigned",
	"unassigned",
	"review_requested",
	"review_request_removed",
	"milestoned",
	"demilestoned",
]);

export type ActivitySource =
	"created" | "comment" | "review" | "event" | "push";

export interface DraftActivitySignals {
	prCreatedAt: string;
	comments: GitHubIssueComment[];
	reviews: GitHubPullRequestReview[];
	events: GitHubIssueEvent[];
	lastPushAt: string | null;
}

export interface LastActivity {
	atMs: number;
	source: ActivitySource;
}

function isValidTimestamp(value: unknown): value is string {
	return typeof value === "string" && Number.isFinite(Date.parse(value));
}

function isDraftStaleState(value: unknown): value is DraftStaleState {
	if (typeof value !== "object" || value === null) return false;
	const state = value as Record<string, unknown>;
	return (
		isValidTimestamp(state.staleSince) &&
		isValidTimestamp(state.reminderPostedAt) &&
		typeof state.reminderCommentId === "number" &&
		(state.closingCommentId === undefined ||
			typeof state.closingCommentId === "number")
	);
}

/**
 * An actor is a bot only when GitHub says so. A null actor or user counts as
 * human: that is deliberately conservative, because miscounting a human as a
 * bot could close a draft on fabricated staleness, while the reverse only
 * keeps it open a little longer.
 */
function isBot(user: { type?: string } | null | undefined): boolean {
	return user?.type === "Bot";
}

/** Read reminder state. Corrupt state is ignored so the PR can be reconsidered. */
export async function getDraftStaleState(
	bucket: R2Bucket,
	prNumber: number,
): Promise<DraftStaleState | null> {
	const object = await bucket.get(stateKey(prNumber));
	if (!object) return null;
	try {
		const state = await object.json();
		return isDraftStaleState(state) ? state : null;
	} catch {
		return null;
	}
}

export async function setDraftStaleState(
	bucket: R2Bucket,
	prNumber: number,
	state: DraftStaleState,
): Promise<void> {
	await bucket.put(stateKey(prNumber), JSON.stringify(state));
}

export async function clearDraftStaleState(
	bucket: R2Bucket,
	prNumber: number,
): Promise<void> {
	await bucket.delete(stateKey(prNumber));
}

export async function isDraftNeverStale(
	bucket: R2Bucket,
	prNumber: number,
): Promise<boolean> {
	return (await bucket.head(neverStaleKey(prNumber))) !== null;
}

/** Permanently exempt a draft PR, recording the authorized actor for auditability. */
export async function setDraftNeverStale(
	bucket: R2Bucket,
	prNumber: number,
	actor: string,
): Promise<void> {
	await bucket.put(
		neverStaleKey(prNumber),
		JSON.stringify({ actor, setAt: new Date().toISOString() }),
	);
}

/**
 * The newest activity GitHub attributes to a non-bot actor, as milliseconds
 * since the epoch together with the source that produced it. `prCreatedAt` is
 * the floor, so a result always exists.
 *
 * Only signals that carry their own actor can be attributed to a human, and
 * `updated_at` is not one of them: bot comment edits and deletes, and bot
 * labels, all bump it, so it cannot distinguish bot housekeeping from real
 * activity. Comment edits never count. Bot pushes must not count either, so
 * push times are filtered upstream (see `latestHumanPush` and
 * `commitPushFallback`). Unparsable timestamps are ignored, and a null actor
 * counts as human to keep a questionable draft open rather than close it.
 */
export function computeLastActivity(
	signals: DraftActivitySignals,
): LastActivity {
	let best: LastActivity | null = null;
	const consider = (value: string, source: ActivitySource): void => {
		const ms = Date.parse(value);
		if (!Number.isFinite(ms)) return;
		if (best === null || ms > best.atMs) best = { atMs: ms, source };
	};
	consider(signals.prCreatedAt, "created");
	for (const comment of signals.comments) {
		if (isBot(comment.user)) continue;
		consider(comment.created_at, "comment");
	}
	for (const review of signals.reviews) {
		if (isBot(review.user) || review.submitted_at === null) continue;
		consider(review.submitted_at, "review");
	}
	for (const event of signals.events) {
		// Mentions and subscriptions carry the mentioned user as the actor, and
		// other unlisted event types are not signals of continued interest.
		if (isBot(event.actor) || !ACTIVITY_EVENTS.has(event.event)) continue;
		consider(event.created_at, "event");
	}
	if (signals.lastPushAt !== null) consider(signals.lastPushAt, "push");
	return best ?? { atMs: 0, source: "created" };
}

/**
 * The newest push-like branch-activity timestamp whose actor is not a bot.
 * Push, force push, and branch creation count; other activity types (merges,
 * deletions) do not. The input is not assumed to be sorted. A bot push — for
 * example a `/rebase` command — must not restart the staleness clock, so a
 * bot-only result is null and callers must not fall back to anything else.
 */
export function latestHumanPush(
	activity: GitHubBranchActivity[],
): string | null {
	let newest: { timestamp: string; atMs: number } | null = null;
	for (const entry of activity) {
		if (
			entry.activity_type !== "push" &&
			entry.activity_type !== "force_push" &&
			entry.activity_type !== "branch_creation"
		) {
			continue;
		}
		if (isBot(entry.actor)) continue;
		const atMs = Date.parse(entry.timestamp);
		if (!Number.isFinite(atMs)) continue;
		if (newest === null || atMs > newest.atMs) {
			newest = { timestamp: entry.timestamp, atMs };
		}
	}
	return newest?.timestamp ?? null;
}

/**
 * Push-time fallback for heads the branch activity API cannot describe (fork
 * heads, deleted forks): the head commit's committer date stands in for the
 * last push. A bot-linked commit author yields null, because a bot push such
 * as a `/rebase` result must not count as human activity.
 */
export function commitPushFallback(commit: GitHubCommitSummary): string | null {
	return isBot(commit.author) ? null : commit.committedAt;
}

/**
 * State files whose draft is no longer open. Only `state.json` keys match;
 * `never-stale.json` opt-outs and unrelated keys are left alone.
 */
export function selectOrphanStateKeys(
	keys: string[],
	openDraftNumbers: ReadonlySet<number>,
): string[] {
	const orphans: string[] = [];
	for (const key of keys) {
		const match = ORPHAN_STATE_KEY_PATTERN.exec(key);
		if (!match) continue;
		if (openDraftNumbers.has(Number(match[1]))) continue;
		orphans.push(key);
	}
	return orphans;
}

/**
 * Gather every activity signal the policy needs for one pull request. The
 * three fetches run concurrently. Commit-summary errors propagate: the
 * sweep's per-PR catch skips that PR for the night, which is safe.
 */
export async function collectActivitySignals(
	token: string,
	pr: Pick<GitHubPullRequest, "number" | "created_at" | "head">,
	comments: GitHubIssueComment[],
): Promise<DraftActivitySignals> {
	const [reviews, events, lastPushAt] = await Promise.all([
		listPullRequestReviews(token, pr.number),
		listIssueEvents(token, pr.number),
		getLastPushAt(token, pr),
	]);
	return {
		prCreatedAt: pr.created_at,
		comments,
		reviews,
		events,
		lastPushAt,
	};
}

/**
 * The last time the head branch received a human push, or null when none did.
 *
 * Same-repo heads use the branch activity API, which attributes each entry to
 * an actor. When it reports any entries, that result is final even when null:
 * a bot push such as `/rebase` must not count, and the commit fallback would
 * resurrect exactly that bot push as the head commit's date. An empty or
 * failed listing leaves nothing attributable, so the head commit's committer
 * date is the best remaining signal. Fork heads (and deleted forks, where
 * head.repo is null) are not branches of this repository and always use the
 * commit fallback.
 */
async function getLastPushAt(
	token: string,
	pr: Pick<GitHubPullRequest, "number" | "head">,
): Promise<string | null> {
	if (pr.head.repo?.full_name === REPO) {
		let activity: GitHubBranchActivity[];
		try {
			activity = await listBranchActivity(token, pr.head.ref);
		} catch (error) {
			console.warn({
				message: `Draft stale sweep could not list branch activity for PR #${pr.number}: ${error instanceof Error ? error.message : String(error)}`,
				event: "draft_stale",
				number: pr.number,
				action: "branch_activity_unavailable",
			});
			return commitPushFallback(await getCommitSummary(token, pr.head.sha));
		}
		if (activity.length > 0) return latestHumanPush(activity);
	}
	return commitPushFallback(await getCommitSummary(token, pr.head.sha));
}

export function getDraftStaleAction(
	lastActivityAtMs: number,
	state: DraftStaleState | null,
	now = new Date(),
): DraftStaleAction {
	const nowMs = now.getTime();

	if (!state) {
		return nowMs - lastActivityAtMs >= REMINDER_AFTER_MS ? "remind" : "none";
	}

	// Activity later than the staleness anchor restarts the clock. The skew
	// absorbs timestamp drift between the anchor and the recomputed activity:
	// legacy anchors were stored from `updated_at`, while commit and push
	// timestamps can differ from it by about 30 s, so without the skew the
	// same moment would read as perpetually newer.
	if (lastActivityAtMs > Date.parse(state.staleSince) + ACTIVITY_SKEW_MS) {
		return "reset";
	}

	const closeAt = Math.max(
		Date.parse(state.staleSince) + CLOSE_AFTER_MS,
		Date.parse(state.reminderPostedAt) + MINIMUM_WARNING_MS,
	);
	return nowMs >= closeAt ? "close" : "none";
}

export function renderDraftStaleReminder(author: string): string {
	return `${DRAFT_STALE_REMINDER_MARKER}
@${author} This draft pull request has had no activity for 3 days. It will close after 7 days of inactivity. Transition to ready for review if ready. A codeowner can comment \`/draft-never-stale\` to keep it open.`;
}

export function renderDraftStaleClose(author: string): string {
	return `${DRAFT_STALE_CLOSE_MARKER}
@${author} Closing this draft pull request after 7 days of inactivity. Re-open at a later date and transition to ready for review when you are ready if you seek review.`;
}

export function getMarkedComment(
	comments: GitHubIssueComment[],
	marker: string,
): GitHubIssueComment | null {
	return (
		comments.findLast(
			(comment) =>
				comment.user?.type === "Bot" && comment.body?.startsWith(marker),
		) ?? null
	);
}

export async function runDraftStaleSweep(
	token: string,
	bucket: R2Bucket,
): Promise<void> {
	const listedPrs = await listOpenDraftPullRequests(token);
	for (const listedPr of listedPrs) {
		try {
			const pr = await getPullRequest(token, listedPr.number);
			if (pr.state !== "open" || !pr.draft || !pr.user?.login) continue;
			if (await isDraftNeverStale(bucket, pr.number)) continue;

			const [state, comments] = await Promise.all([
				getDraftStaleState(bucket, pr.number),
				getIssueComments(token, pr.number),
			]);
			const activity = computeLastActivity(
				await collectActivitySignals(token, pr, comments),
			);
			const action = getDraftStaleAction(activity.atMs, state);
			console.log({
				message: `Draft stale sweep action for PR #${pr.number}: ${action}`,
				event: "draft_stale",
				number: pr.number,
				action,
				lastActivityAt: new Date(activity.atMs).toISOString(),
				source: activity.source,
			});
			switch (action) {
				case "none":
					break;
				case "reset":
					await clearDraftStaleState(bucket, pr.number);
					break;
				case "remind": {
					let reminder = getMarkedComment(
						comments,
						DRAFT_STALE_REMINDER_MARKER,
					);
					// Reuse the marker reminder only while the staleness anchor does
					// not postdate it. There is no age cap on reuse.
					if (reminder && activity.atMs > Date.parse(reminder.created_at)) {
						reminder = null;
					}

					const reminderCommentId = reminder
						? reminder.id
						: await createIssueComment(
								token,
								pr.number,
								renderDraftStaleReminder(pr.user.login),
							);
					reminder ??= await getIssueComment(token, reminderCommentId);
					const [updatedPr, updatedComments] = await Promise.all([
						getPullRequest(token, pr.number),
						getIssueComments(token, pr.number),
					]);
					if (updatedPr.state !== "open" || !updatedPr.draft) break;
					// Newer activity since the sweep computed `activity` means the
					// author is responsive: anchor to the reminder instead of stale
					// state, and write nothing tonight.
					const updatedActivity = computeLastActivity(
						await collectActivitySignals(token, updatedPr, updatedComments),
					);
					if (updatedActivity.atMs > Date.parse(reminder.created_at)) {
						break;
					}

					await setDraftStaleState(bucket, pr.number, {
						staleSince: new Date(activity.atMs).toISOString(),
						reminderPostedAt: reminder.created_at,
						reminderCommentId,
					});
					break;
				}
				case "close": {
					if (!state) break;
					if (!state.closingCommentId) {
						const closingComment = getMarkedComment(
							comments,
							DRAFT_STALE_CLOSE_MARKER,
						);
						const closingCommentId = closingComment
							? closingComment.id
							: await createIssueComment(
									token,
									pr.number,
									renderDraftStaleClose(pr.user.login),
								);
						const [updatedPr, updatedComments] = await Promise.all([
							getPullRequest(token, pr.number),
							getIssueComments(token, pr.number),
						]);
						if (updatedPr.state !== "open" || !updatedPr.draft) break;
						const confirmedClosingComment =
							closingComment ??
							(await getIssueComment(token, closingCommentId));
						const updatedActivity = computeLastActivity(
							await collectActivitySignals(token, updatedPr, updatedComments),
						);
						if (
							updatedActivity.atMs >
							Date.parse(confirmedClosingComment.created_at)
						) {
							await clearDraftStaleState(bucket, pr.number);
							break;
						}
						await setDraftStaleState(bucket, pr.number, {
							...state,
							closingCommentId,
						});
					}
					if (await isDraftNeverStale(bucket, pr.number)) break;
					await closePullRequest(token, pr.number);
					await clearDraftStaleState(bucket, pr.number);
					break;
				}
			}
		} catch (error) {
			console.error({
				message: `Draft stale sweep failed for PR #${listedPr.number}: ${error instanceof Error ? error.message : String(error)}`,
				event: "draft_stale",
				number: listedPr.number,
			});
		}
	}
	await deleteOrphanedState(bucket, listedPrs);
}

/**
 * Delete state files whose draft PR is no longer open, keeping the R2
 * namespace from growing without bound. Failures are logged and swallowed so
 * cleanup can never fail the sweep; the next night retries, and deleting an
 * already-deleted key is a no-op, so this is idempotent.
 */
async function deleteOrphanedState(
	bucket: R2Bucket,
	listedPrs: GitHubPullRequest[],
): Promise<void> {
	try {
		const openDraftNumbers = new Set(listedPrs.map((pr) => pr.number));
		const orphanKeys: string[] = [];
		let cursor: string | undefined;
		do {
			const listing = await bucket.list({
				prefix: "draft-stale/",
				cursor,
			});
			orphanKeys.push(
				...selectOrphanStateKeys(
					listing.objects.map((object) => object.key),
					openDraftNumbers,
				),
			);
			cursor = listing.truncated ? listing.cursor : undefined;
		} while (cursor);
		if (orphanKeys.length === 0) return;
		await bucket.delete(orphanKeys);
		const orphanNumbers = orphanKeys.map((key) =>
			Number(ORPHAN_STATE_KEY_PATTERN.exec(key)?.[1]),
		);
		console.log({
			message: `Draft stale sweep deleted ${orphanKeys.length} orphaned state file(s) for PRs ${orphanNumbers.join(", ")}`,
			event: "draft_stale",
			action: "orphan_cleanup",
			deleted: orphanKeys.length,
			numbers: orphanNumbers,
		});
	} catch (error) {
		console.error({
			message: `Draft stale sweep orphan cleanup failed: ${error instanceof Error ? error.message : String(error)}`,
			event: "draft_stale",
			action: "orphan_cleanup_failed",
		});
	}
}
