/**
 * Reviewer-recommendation queue event processing.
 *
 * Trusted TypeScript owns every side effect (R2 state, GitHub comment
 * create/update/delete). Agents are not involved: the corpus computes the
 * recommendation, Flue renders it and keeps a singleton comment per PR.
 *
 * GitHub reviewers and assignees are NEVER mutated — CODEOWNERS alone manages
 * formal review requests.
 */
import * as v from "valibot";
import {
	createIssueComment,
	deleteIssueComment,
	getInstallationToken,
	getIssueComments,
	getPullRequest,
	updateIssueComment,
} from "./github";
import {
	RECOMMENDATION_COMMENT_MARKER,
	applyEventToState,
	emptyState,
	newMentions,
	parseRecommendationEvent,
	parseRecommendationsMode,
	renderRecommendationsComment,
	shouldSkipRecommendationUpdate,
	type RecommendationBoundedResult,
	type ReviewerRecommendationState,
	type ReviewerRecommendationsEvent,
	type ReviewerRecommendationsUpdatedEvent,
	withMentions,
} from "./reviewer-recommendations";

// ── Env ───────────────────────────────────────────────────────────────────────

export interface RecommendationEnv {
	DOCS_FLUE_BUCKET: R2Bucket;
	DOCS_FLUE_REVIEW_MODE?: string;
	DOCS_FLUE_RECOMMENDATIONS_MODE?: string;
	[key: string]: unknown;
}

const STATE_KEY_PREFIX = "diffs/pr-";

const StateSchema = v.object({
	eventAt: v.string(),
	headSha: v.union([v.string(), v.null()]),
	resultHash: v.optional(v.string()),
	status: v.optional(v.picklist(["complete", "fallback", "error"])),
	recommendation: v.union([v.null(), v.unknown()]),
	lastGoodRecommendation: v.union([v.null(), v.unknown()]),
	commentId: v.optional(v.number()),
	mentionedLogins: v.array(v.string()),
});

function stateKey(prNumber: number): string {
	return `${STATE_KEY_PREFIX}${prNumber}/reviewer-recommendations.json`;
}

async function readState(
	bucket: R2Bucket,
	prNumber: number,
): Promise<ReviewerRecommendationState> {
	const obj = await bucket.get(stateKey(prNumber));
	if (!obj) return emptyState();
	try {
		const parsed = v.safeParse(StateSchema, await obj.json());
		if (!parsed.success) return emptyState();
		const raw = parsed.output as unknown as Record<string, unknown>;
		return {
			eventAt: String(raw["eventAt"] ?? ""),
			headSha: raw["headSha"] === null ? null : String(raw["headSha"] ?? null),
			resultHash: raw["resultHash"] as string | undefined,
			status: raw["status"] as ReviewerRecommendationState["status"],
			recommendation: raw[
				"recommendation"
			] as RecommendationBoundedResult | null,
			lastGoodRecommendation: raw[
				"lastGoodRecommendation"
			] as RecommendationBoundedResult | null,
			commentId: raw["commentId"] as number | undefined,
			mentionedLogins: Array.isArray(raw["mentionedLogins"])
				? (raw["mentionedLogins"] as string[])
				: [],
		};
	} catch {
		return emptyState();
	}
}

async function saveState(
	bucket: R2Bucket,
	prNumber: number,
	state: ReviewerRecommendationState,
): Promise<void> {
	const body = JSON.stringify({
		eventAt: state.eventAt,
		headSha: state.headSha,
		resultHash: state.resultHash,
		status: state.status,
		recommendation: state.recommendation,
		lastGoodRecommendation: state.lastGoodRecommendation,
		commentId: state.commentId,
		mentionedLogins: state.mentionedLogins,
	});
	for (let attempt = 0; attempt < 3; attempt++) {
		const obj = await bucket.get(stateKey(prNumber));
		const etag = obj?.etag ?? null;
		const putResult = etag
			? await bucket.put(stateKey(prNumber), body, {
					onlyIf: new Headers({ "If-Match": etag }),
				})
			: await bucket.put(stateKey(prNumber), body, {
					onlyIf: new Headers({ "If-None-Match": "*" }),
				});
		if (putResult !== null) return;
		// Lost the race — another queue message updated the key; retry with a
		// fresh read. State transitions are deterministic given the same event.
	}
}

/**
 * Locate the singleton recommendation comment on a PR. Uses the recorded
 * comment id when present; otherwise scans the most recent comments for the
 * marker. Returns null when no comment exists.
 */
async function findRecommendationComment(
	token: string,
	prNumber: number,
	recordedId: number | undefined,
): Promise<number | null> {
	if (recordedId) {
		try {
			const found = await getIssueComments(token, prNumber);
			if (found.some((c) => c.id === recordedId)) return recordedId;
		} catch {
			// fall through to marker scan; the recorded id may be stale
		}
	}
	const comments = await getIssueComments(token, prNumber);
	const match = comments.find((c) =>
		c.body?.includes(RECOMMENDATION_COMMENT_MARKER),
	);
	return match ? match.id : null;
}

/** Should this GitHub error be retried by the queue, or is it permanent? */
export function isRetryableRecommendationError(err: unknown): boolean {
	if (!(err instanceof Error)) return true;
	const message = err.message;
	if (
		message.includes("(HTTP 401)") ||
		message.includes("(HTTP 404)") ||
		message.includes("(HTTP 422)")
	) {
		return false;
	}
	// 403 can be rate limiting (retryable) or a permanent permission error —
	// retry rather than treat it as fatal; max_retries caps the cost.
	return true;
}

function log(event: Record<string, unknown>): void {
	console.log(event);
}

function applyUpdatedState(
	state: ReviewerRecommendationState,
	event: ReviewerRecommendationsUpdatedEvent,
	prOpen: boolean,
	prHeadSha: string | null,
): ReviewerRecommendationState {
	// Head-guard: a recommendation computed for an earlier head is stale and
	// must not clobber a newer one. When the PR has moved on, skip.
	if (!prOpen) return state;
	if (event.headSha !== null && event.headSha !== prHeadSha) return state;
	return applyEventToState(state, event);
}

function applyClearedState(
	state: ReviewerRecommendationState,
	event: ReviewerRecommendationsEvent & {
		eventType: "reviewer-recommendations.cleared";
	},
	prHeadSha: string | null,
): ReviewerRecommendationState {
	// Only apply a clear when the PR is no longer at the head the clear was
	// computed for. A reopen at the same head keeps the prior recommendation.
	if (event.headSha !== null && event.headSha === prHeadSha) return state;
	return applyEventToState(state, event);
}

/**
 * Process one reviewer-recommendation event to completion:
 * validate → head-check → R2 state → comment lifecycle.
 *
 * Throws on transient failures so the queue retries; returns normally for
 * success and for events that are stale/malformed (both are ack'd).
 */
export async function processRecommendationEvent(
	messageBody: unknown,
	env: RecommendationEnv,
): Promise<void> {
	const mode = parseRecommendationsMode(
		(env as Record<string, unknown>)["DOCS_FLUE_RECOMMENDATIONS_MODE"] ??
			env.DOCS_FLUE_REVIEW_MODE,
	);
	const bucket = env.DOCS_FLUE_BUCKET;
	const ghEnv = env as unknown as Record<string, string>;

	const parsed = parseRecommendationEvent(messageBody);
	if (!parsed.ok) {
		log({
			message: "Dropped malformed reviewer-recommendation event",
			event: "reviewer_recommendations",
			reason: parsed.reason,
			action: "drop_malformed",
		});
		return;
	}
	const event = parsed.event;
	const prNumber = event.prNumber;

	const token = await getInstallationToken(ghEnv);
	let pr: Awaited<ReturnType<typeof getPullRequest>> | null = null;
	try {
		pr = await getPullRequest(token, prNumber);
	} catch {
		log({
			message: `Failed to fetch PR #${prNumber} for reviewer-recommendation event`,
			event: "reviewer_recommendations",
			prNumber,
			action: "pr_fetch_failed",
		});
		throw new Error(`pr fetch failed for #${prNumber}`);
	}

	// Drop updated events for PRs we must never comment on: drafts, closed
	// PRs, and PRs the spam/off-topic gate labeled. Cleared events are still
	// processed so an existing comment is removed when the PR closes.
	if (
		event.eventType === "reviewer-recommendations.updated" &&
		shouldSkipRecommendationUpdate(pr)
	) {
		log({
			message: `Dropped reviewer-recommendation update for PR #${prNumber}`,
			event: "reviewer_recommendations",
			prNumber,
			draft: pr.draft,
			state: pr.state,
			labels: pr.labels.map((l) => l.name),
			action: "drop_skipped_pr",
		});
		return;
	}

	const state = await readState(bucket, prNumber);

	let nextState =
		event.eventType === "reviewer-recommendations.cleared"
			? applyClearedState(state, event, pr.head.sha)
			: applyUpdatedState(state, event, pr.state === "open", pr.head.sha);

	if (nextState === state) {
		log({
			message: `Skipped stale or duplicate reviewer-recommendation event for PR #${prNumber}`,
			event: "reviewer_recommendations",
			prNumber,
			eventType: event.eventType,
			action: "skip_stale",
		});
		return;
	}

	if (mode === "comment" && nextState.recommendation === null) {
		const commentId = await findRecommendationComment(
			token,
			prNumber,
			nextState.commentId,
		);
		if (commentId) {
			await deleteIssueComment(token, commentId);
			nextState.commentId = undefined;
		}
	} else if (
		mode === "comment" &&
		nextState.recommendation !== null &&
		!(nextState.status === "error" && nextState.lastGoodRecommendation === null)
	) {
		const degraded =
			nextState.status === "error" && nextState.lastGoodRecommendation !== null;
		const renderSource =
			nextState.status === "error" && nextState.lastGoodRecommendation !== null
				? nextState.lastGoodRecommendation
				: nextState.recommendation;
		const newMentioned = newMentions(nextState, renderSource);
		const previouslyMentionedLogins = nextState.mentionedLogins.filter(
			(login) => !newMentioned.includes(login),
		);
		const body = renderRecommendationsComment({
			recommendation: renderSource,
			newLogins: newMentioned,
			previouslyMentionedLogins,
			degraded,
		});
		const existingId = await findRecommendationComment(
			token,
			prNumber,
			nextState.commentId,
		);
		let commentId: number;
		if (existingId) {
			await updateIssueComment(token, existingId, body);
			commentId = existingId;
		} else {
			commentId = await createIssueComment(token, prNumber, body);
		}
		nextState.commentId = commentId;
		nextState = withMentions(nextState, newMentioned);
	} else {
		log({
			message: `Recommendation processed without a comment for PR #${prNumber}`,
			event: "reviewer_recommendations",
			prNumber,
			mode,
			status: nextState.status,
			hasRecommendation: nextState.recommendation !== null,
			areas: nextState.recommendation?.ownershipAreas.length ?? 0,
			action: "log_mode_or_degraded",
		});
	}

	await saveState(bucket, prNumber, nextState);
}
