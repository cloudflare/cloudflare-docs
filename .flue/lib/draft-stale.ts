import {
	closePullRequest,
	createIssueComment,
	getHeadRefPushedAt,
	getIssueComment,
	getIssueComments,
	getPullRequest,
	listOpenDraftPullRequests,
	type GitHubIssueComment,
	type GitHubPullRequest,
} from "./github";

const DAY_MS = 24 * 60 * 60 * 1000;
const REMINDER_AFTER_MS = 3 * DAY_MS;
const CLOSE_AFTER_MS = 7 * DAY_MS;
const MINIMUM_WARNING_MS = 4 * DAY_MS;
const COMMENT_TIMESTAMP_SKEW_MS = 60 * 1000;

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
 * The last time a human meaningfully touched the pull request: their most
 * recent comment, the most recent push to the head branch, or a non-comment
 * update (body/title edit, labels) that no comment can explain.
 *
 * Bot comments are ignored so nightly bot activity (changelog warnings, the
 * draft-stale reminders themselves) can never restart the staleness clock.
 * `lastPushAt` (GraphQL headRefPushedAt) recovers pushes that a later bot
 * comment hides from `updated_at`.
 *
 * Returns null when the last human activity is unknowable: without a push
 * time, a push that landed before the newest comment is invisible, and when
 * that comment is a bot's it also explains `updated_at`. Callers must skip
 * the PR rather than act on fabricated staleness.
 */
export function computeLastActivityAt(
	pr: Pick<GitHubPullRequest, "updated_at">,
	comments: GitHubIssueComment[],
	lastPushAt: string | null | undefined,
): number | null {
	const lastHumanCommentMs = Math.max(
		0,
		...comments
			.filter((comment) => comment.user?.type !== "Bot")
			.map((comment) => Date.parse(comment.created_at))
			.filter((ms) => Number.isFinite(ms)),
	);
	const lastAnyCommentMs = Math.max(
		0,
		...comments
			.map((comment) => Date.parse(comment.created_at))
			.filter((ms) => Number.isFinite(ms)),
	);
	const updatedAtMs = Date.parse(pr.updated_at);
	// A non-comment update after the newest comment counts as activity. Bot
	// workflows here only comment, so a bump no comment explains is human.
	const unexplainedBumpMs =
		updatedAtMs > lastAnyCommentMs + COMMENT_TIMESTAMP_SKEW_MS
			? updatedAtMs
			: 0;
	const lastPushMs = lastPushAt != null ? Date.parse(lastPushAt) : 0;
	const hasPushTime = Number.isFinite(lastPushMs) && lastPushMs > 0;

	const newestComment = comments.reduce<GitHubIssueComment | null>(
		(latest, comment) =>
			latest === null || comment.created_at > latest.created_at
				? comment
				: latest,
		null,
	);
	if (
		!hasPushTime &&
		unexplainedBumpMs === 0 &&
		newestComment?.user?.type === "Bot"
	) {
		return null;
	}
	return Math.max(
		hasPushTime ? lastPushMs : 0,
		lastHumanCommentMs,
		unexplainedBumpMs,
	);
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

	// Human activity after the staleness anchor restarts the clock. Bot
	// comments are already excluded from lastActivityAtMs, so nightly bot
	// activity can never trigger a reset.
	if (lastActivityAtMs > Date.parse(state.staleSince)) {
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
	let headPushTimes = new Map<number, string>();
	try {
		headPushTimes = await getHeadRefPushedAt(
			token,
			listedPrs.map((pr) => pr.number),
		);
	} catch (error) {
		// Without push times, a push hidden behind a later bot comment is
		// invisible. computeLastActivityAt returns null for those PRs and the
		// sweep skips them rather than acting on unknowable staleness.
		console.error({
			message: `Draft stale sweep could not fetch head ref push times: ${error instanceof Error ? error.message : String(error)}`,
			event: "draft_stale",
			action: "head_push_times_unavailable",
		});
	}
	for (const listedPr of listedPrs) {
		try {
			const pr = await getPullRequest(token, listedPr.number);
			if (pr.state !== "open" || !pr.draft || !pr.user?.login) continue;
			if (await isDraftNeverStale(bucket, pr.number)) continue;

			const [state, comments] = await Promise.all([
				getDraftStaleState(bucket, pr.number),
				getIssueComments(token, pr.number),
			]);
			const lastActivityAtMs = computeLastActivityAt(
				pr,
				comments,
				headPushTimes.get(pr.number),
			);
			if (lastActivityAtMs === null) {
				console.log({
					message: `Draft stale sweep skipped PR #${listedPr.number}: last human activity unknowable without head push times`,
					event: "draft_stale",
					number: listedPr.number,
					action: "activity_unknown",
				});
				continue;
			}
			switch (getDraftStaleAction(lastActivityAtMs, state)) {
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
					if (reminder && lastActivityAtMs > Date.parse(reminder.created_at)) {
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
					// Null means no new information (e.g. the reminder now being
					// the newest bot comment masks updated_at on a degraded
					// night) — the top-level gate already verified activity.
					const updatedActivityAtMs = computeLastActivityAt(
						updatedPr,
						updatedComments,
						headPushTimes.get(pr.number),
					);
					if (
						updatedActivityAtMs !== null &&
						updatedActivityAtMs > Date.parse(reminder.created_at)
					) {
						break;
					}

					await setDraftStaleState(bucket, pr.number, {
						staleSince: new Date(lastActivityAtMs).toISOString(),
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
						const updatedActivityAtMs = computeLastActivityAt(
							updatedPr,
							updatedComments,
							headPushTimes.get(pr.number),
						);
						if (
							updatedActivityAtMs !== null &&
							updatedActivityAtMs >
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
}
