/**
 * Scheduled code-review watchdog.
 *
 * Flue workflows are not resumable: if the code-review orchestrator's Durable
 * Object is interrupted mid-run, Flue terminalizes the run without re-running
 * its code, so the orchestrator never collects the specialists' results or
 * updates its "review in progress" comment. The placeholder then hangs forever
 * until a human comments `/review`.
 *
 * This watchdog automates that recovery. On a cron schedule it scans the
 * in-flight markers, and for any review whose orchestrator run is provably dead
 * (terminal without delivering), or whose specialists finished while the
 * orchestrator stalled, or which has simply exceeded a max age, it re-admits a
 * fresh orchestrator run (which is idempotent — same session, same comment,
 * bounded specialist work). After a bounded number of attempts it gives up and
 * surfaces a visible failure comment so a review never hangs silently.
 *
 * Recovery retries set `bypassReviewLimit`, so they never consume an
 * auto-review slot and are never blocked by the cap.
 */
import {
	BOT_COMMENT_MARKER,
	clearReviewInflight,
	listReviewInflight,
	type ReviewInflightEntry,
} from "./code-review-state";
import { renderFailureComment } from "./code-review-render";
import {
	getInstallationToken,
	getIssueComments,
	postComment,
	updateIssueComment,
	getPullRequest,
} from "./github";
import { getInternalHeaders } from "./internal-auth";
import { admitWorkflow } from "./poll-run";
import { readRunTerminalState } from "./run-state";
import {
	decideWatchdogAction,
	type WatchdogInputs,
} from "./review-watchdog-decide";

/** Specialists done but orchestrator stalled past this → dead parent. */
const GRACE_MS = 3 * 60 * 1000;
/** Final safety net: an undelivered review older than this is retried. */
const MAX_AGE_MS = 25 * 60 * 1000;
/** Retries before giving up and surfacing a failure comment. */
const MAX_ATTEMPTS = 2;

interface WatchdogEnv {
	[key: string]: unknown;
	DOCS_FLUE_BUCKET: R2Bucket;
}

export async function runReviewWatchdog(env: WatchdogEnv): Promise<void> {
	// Only meaningful in comment mode — in log mode there is no comment to hang.
	const reviewMode = (env.DOCS_FLUE_REVIEW_MODE as string | undefined) ?? "log";
	if (reviewMode !== "comment") return;

	const bucket = env.DOCS_FLUE_BUCKET;
	const baseUrl = env.DOCS_FLUE_BASE_URL as string | undefined;
	if (!baseUrl) {
		console.log({
			message:
				"Review watchdog skipped: DOCS_FLUE_BASE_URL is not configured for self-admission.",
			event: "review_watchdog",
			action: "config_missing_base_url",
		});
		return;
	}

	const markers = await listReviewInflight(bucket);
	if (markers.length === 0) return;

	const stringEnv = env as unknown as Record<string, string>;
	const headers = getInternalHeaders(stringEnv);
	const token = await getInstallationToken(stringEnv);

	for (const marker of markers) {
		try {
			await processMarker({ marker, bucket, baseUrl, headers, token });
		} catch (err) {
			console.log({
				message: `Review watchdog error: PR #${marker.prNumber} — ${err instanceof Error ? err.message : String(err)}`,
				event: "review_watchdog",
				number: marker.prNumber,
				error: err instanceof Error ? err.message : String(err),
				action: "watchdog_error",
			});
		}
	}
}

interface ProcessMarkerArgs {
	marker: ReviewInflightEntry;
	bucket: R2Bucket;
	baseUrl: string;
	headers: HeadersInit;
	token: string;
}

async function processMarker({
	marker,
	bucket,
	baseUrl,
	headers,
	token,
}: ProcessMarkerArgs): Promise<void> {
	const prNumber = marker.prNumber;

	// Delivered? A successful run writes review-<headSha>.json before posting the
	// final comment, so its presence means the review actually completed.
	const reviewKey = `diffs/pr-${prNumber}/review-${marker.headSha}.json`;
	const delivered = (await bucket.head(reviewKey)) !== null;

	// PR state — skip closed/merged PRs. On fetch failure, assume open so we
	// still attempt recovery rather than abandoning a real review.
	let prClosed = false;
	try {
		const pr = await getPullRequest(token, prNumber);
		prClosed = pr.state !== "open";
	} catch {
		prClosed = false;
	}

	// Terminal state of the prior orchestrator run.
	const run = await readRunTerminalState({
		runId: marker.orchestratorRunId,
		baseUrl,
		headers,
	});

	// Are all recorded specialists terminal? null when none were recorded.
	let specialistsTerminal: boolean | null = null;
	if (marker.specialistRunIds && marker.specialistRunIds.length > 0) {
		const states = await Promise.all(
			marker.specialistRunIds.map((runId) =>
				readRunTerminalState({ runId, baseUrl, headers }),
			),
		);
		specialistsTerminal = states.every((s) => s.found && s.terminal);
	}

	const inputs: WatchdogInputs = {
		now: Date.now(),
		startedAt: marker.startedAt,
		attempt: marker.attempt,
		delivered,
		prClosed,
		run: { terminal: run.terminal, found: run.found },
		specialistsTerminal,
		graceMs: GRACE_MS,
		maxAgeMs: MAX_AGE_MS,
		maxAttempts: MAX_ATTEMPTS,
	};

	const action = decideWatchdogAction(inputs);

	switch (action.kind) {
		case "skip":
			return;

		case "clear":
			await clearReviewInflight(bucket, prNumber);
			console.log({
				message: `Review watchdog cleared marker: PR #${prNumber} — ${action.reason}`,
				event: "review_watchdog",
				number: prNumber,
				reason: action.reason,
				action: "watchdog_cleared",
			});
			return;

		case "retry": {
			// Re-admit a fresh orchestrator run. Do not touch the marker — the new
			// run owns it (it writes a fresh marker with attempt = this + 1). Bypass
			// the auto-review cap so recovery is never blocked or counted.
			const newRunId = await admitWorkflow({
				baseUrl,
				pathname: "/workflows/code-review-orchestrator",
				headers,
				body: {
					eventType: "pull_request",
					number: prNumber,
					bypassReviewLimit: true,
					watchdogAttempt: marker.attempt + 1,
				},
			});
			console.log({
				message: `Review watchdog recovered stuck review: PR #${prNumber} — ${action.reason} (attempt ${marker.attempt + 1}) — runId: ${newRunId}`,
				event: "review_watchdog",
				number: prNumber,
				reason: action.reason,
				attempt: marker.attempt + 1,
				runId: newRunId,
				action: "watchdog_recovered",
			});
			return;
		}

		case "giveup": {
			// Out of retries — surface a visible failure comment and drop the marker
			// (the dead orchestrator will not clear it).
			const comments = await getIssueComments(token, prNumber);
			const botComment =
				comments.findLast((c) => c.body?.includes(BOT_COMMENT_MARKER)) ?? null;
			const body = renderFailureComment(marker.headSha);
			if (botComment) {
				await updateIssueComment(token, botComment.id, body);
			} else {
				await postComment(token, prNumber, body);
			}
			await clearReviewInflight(bucket, prNumber);
			console.log({
				message: `Review watchdog gave up after ${marker.attempt} attempt(s): PR #${prNumber} — posted failure comment`,
				event: "review_watchdog",
				number: prNumber,
				attempt: marker.attempt,
				reason: action.reason,
				action: "watchdog_gave_up",
			});
			return;
		}
	}
}
