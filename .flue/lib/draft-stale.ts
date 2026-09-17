import {
	closePullRequest,
	createIssueComment,
	getIssueComment,
	getPullRequest,
	listOpenDraftPullRequests,
	type GitHubPullRequest,
} from "./github";

const DAY_MS = 24 * 60 * 60 * 1000;
const REMINDER_AFTER_MS = 3 * DAY_MS;
const CLOSE_AFTER_MS = 7 * DAY_MS;
const MINIMUM_WARNING_MS = 4 * DAY_MS;

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
	return `<!-- cloudflare-docs-flue-draft-stale -->
@${author} This draft pull request has had no activity for 3 days. It will close after 7 days of inactivity. Transition to ready for review if ready. A codeowner can comment \`/draft-never-stale\` to keep it open.`;
}

export function renderDraftStaleClose(author: string): string {
	return `<!-- cloudflare-docs-flue-draft-stale-close -->
@${author} Closing this draft pull request after 7 days of inactivity. Re-open at a later date and transition to ready for review when you are ready if you seek review.`;
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
					const reminderCommentId = await createIssueComment(
						token,
						pr.number,
						renderDraftStaleReminder(pr.user.login),
					);
					const [reminder, updatedPr] = await Promise.all([
						getIssueComment(token, reminderCommentId),
						getPullRequest(token, pr.number),
					]);
					if (updatedPr.state !== "open" || !updatedPr.draft) break;

					// A new update during the reminder request means the PR is no longer
					// stale. Do not begin a close timer from an outdated observation.
					if (updatedPr.updated_at > reminder.created_at) break;

					await setDraftStaleState(bucket, pr.number, {
						staleSince: pr.updated_at,
						reminderPostedAt: reminder.created_at,
						botUpdatedAt: updatedPr.updated_at,
						reminderCommentId,
					});
					break;
				}
				case "close": {
					if (!state) break;
					if (!state.closingCommentId) {
						const closingCommentId = await createIssueComment(
							token,
							pr.number,
							renderDraftStaleClose(pr.user.login),
						);
						const [closingComment, updatedPr] = await Promise.all([
							getIssueComment(token, closingCommentId),
							getPullRequest(token, pr.number),
						]);
						if (updatedPr.state !== "open" || !updatedPr.draft) break;
						if (updatedPr.updated_at > closingComment.created_at) {
							await clearDraftStaleState(bucket, pr.number);
							break;
						}
						await setDraftStaleState(bucket, pr.number, {
							...state,
							botUpdatedAt: updatedPr.updated_at,
							closingCommentId,
						});
					}
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
