import {
	closePullRequest,
	createIssueComment,
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
	botUpdatedAt: string;
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
		isValidTimestamp(state.botUpdatedAt) &&
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

export function getDraftStaleAction(
	pr: Pick<GitHubPullRequest, "updated_at">,
	state: DraftStaleState | null,
	now = new Date(),
): DraftStaleAction {
	const nowMs = now.getTime();
	const updatedAtMs = Date.parse(pr.updated_at);
	if (!Number.isFinite(updatedAtMs)) return "none";

	if (!state) {
		return nowMs - updatedAtMs >= REMINDER_AFTER_MS ? "remind" : "none";
	}

	// The state records updated_at after the bot's latest comment. A later value
	// means a person changed the PR, so the warning and close timer reset.
	if (Date.parse(pr.updated_at) > Date.parse(state.botUpdatedAt)) {
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
	return comments.findLast((comment) => comment.body?.includes(marker)) ?? null;
}

export function hasActivityAfterComment(
	pr: Pick<GitHubPullRequest, "updated_at">,
	comments: GitHubIssueComment[],
	comment: GitHubIssueComment,
): boolean {
	const commentTime = Date.parse(comment.created_at);
	return (
		comments.some(
			(candidate) =>
				candidate.user?.type !== "Bot" &&
				candidate.created_at > comment.created_at,
		) || Date.parse(pr.updated_at) > commentTime + COMMENT_TIMESTAMP_SKEW_MS
	);
}

export async function runDraftStaleSweep(
	token: string,
	bucket: R2Bucket,
): Promise<void> {
	for (const listedPr of await listOpenDraftPullRequests(token)) {
		try {
			const pr = await getPullRequest(token, listedPr.number);
			if (pr.state !== "open" || !pr.draft || !pr.user?.login) continue;
			if (await isDraftNeverStale(bucket, pr.number)) continue;

			const state = await getDraftStaleState(bucket, pr.number);
			switch (getDraftStaleAction(pr, state)) {
				case "none":
					break;
				case "reset":
					await clearDraftStaleState(bucket, pr.number);
					break;
				case "remind": {
					const comments = await getIssueComments(token, pr.number);
					let reminder = getMarkedComment(
						comments,
						DRAFT_STALE_REMINDER_MARKER,
					);
					if (reminder && hasActivityAfterComment(pr, comments, reminder)) {
						reminder = null;
					}
					const reusingReminder = reminder !== null;

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
					if (hasActivityAfterComment(updatedPr, updatedComments, reminder)) {
						break;
					}

					await setDraftStaleState(bucket, pr.number, {
						staleSince: reusingReminder ? reminder.created_at : pr.updated_at,
						reminderPostedAt: reminder.created_at,
						botUpdatedAt: updatedPr.updated_at,
						reminderCommentId,
					});
					break;
				}
				case "close": {
					if (!state) break;
					if (!state.closingCommentId) {
						const comments = await getIssueComments(token, pr.number);
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
						if (
							hasActivityAfterComment(
								updatedPr,
								updatedComments,
								confirmedClosingComment,
							)
						) {
							await clearDraftStaleState(bucket, pr.number);
							break;
						}
						await setDraftStaleState(bucket, pr.number, {
							...state,
							botUpdatedAt: updatedPr.updated_at,
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
