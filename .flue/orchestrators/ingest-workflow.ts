/**
 * IngestWorkflow — durable spam gate for issues and non-Dependabot PRs (D7).
 *
 * Cloudflare `WorkflowEntrypoint` that runs the spam gate before review.
 * Re-exported from `cloudflare.ts`;
 * bound as `INGEST`. Kicked from `pipeline-entry.ts` for spam-filter events whose
 * sender is not a codeowner (codeowner-authored items skip the gate and go
 * straight to review in the pipeline entry).
 *
 * Why a workflow: the spam filter is an AI call, so it cannot run inline in the
 * webhook handler without blowing GitHub's delivery timeout. Running it as a
 * durable step lets the handler return 202 immediately while the gate — and, for
 * a clean PR, the follow-on review — run in the background.
 *
 * Steps:
 *   1. spam-filter — a direct Clef call and, on a confident spam verdict, labels/comments/closes the item (all in trusted
 *      TS). Any error is treated as "not spam" so a filter failure never blocks
 *      a legitimate review.
 *   2. kick-review — only when the item is a non-draft PR that survived the gate
 *      (draft PRs are skipped unless the trigger action is `ready_for_review`).
 */
import { WorkflowEntrypoint } from "cloudflare:workers";
import type { WorkflowEvent, WorkflowStep } from "cloudflare:workers";
import {
	addLabels,
	closeIssue,
	closePullRequest,
	getInstallationToken,
	getPullRequest,
	postComment,
} from "../lib/github";
import type { AiRunner } from "../lib/clef";
import { startReview, type ReviewWorkflowParams } from "../lib/review/start";
import { reviewMode, type ReviewRunEnv } from "../lib/review/run-context";
import { truncateLogValue } from "../lib/github-webhook";
import {
	OFF_TOPIC_COMMENT,
	SPAM_COMMENT,
	evaluateItemSpam,
	getGitHubContext,
	isOffTopicCategory,
	type ItemSpamVerdict,
} from "../lib/spam-filter";

/** Params carried in the Workflow instance payload (built by pipeline-entry). */
export interface IngestParams {
	eventType: "issues" | "pull_request";
	number: number;
	/** Whether the item is a PR (issues never route to code review). */
	isPullRequest: boolean;
	/** Draft PRs are skipped for review unless `action` is `ready_for_review`. */
	isDraft: boolean;
	/** The triggering webhook action (for the draft gate). */
	action?: string;
	/**
	 * Dev replay. In log mode it is a dry run (no GitHub writes); in comment
	 * mode it acts for real. A replay never kicks a review.
	 */
	replay?: boolean;
}

interface IngestEnv {
	REVIEW_ORCHESTRATOR: Workflow<ReviewWorkflowParams>;
	AI: AiRunner;
	DOCS_FLUE_REVIEW_MODE?: string;
	DOCS_FLUE_AI_GATEWAY_ID?: string;
	[key: string]: unknown;
}

export class IngestWorkflow extends WorkflowEntrypoint<
	IngestEnv,
	IngestParams
> {
	async run(
		event: Readonly<WorkflowEvent<IngestParams>>,
		step: WorkflowStep,
	): Promise<Record<string, unknown>> {
		const { eventType, number, isPullRequest, isDraft, action, replay } =
			event.payload;
		const mode = reviewMode(this.env as unknown as ReviewRunEnv);
		const dryRun = replay === true && mode === "log";
		const ghEnv = this.env as unknown as Record<string, string>;

		// ── 1. Spam / off-topic gate ─────────────────────────────────────────────
		const context = await step
			.do("spam-context", async () => {
				const token = await getInstallationToken(ghEnv);
				return getGitHubContext(token, { eventType, number });
			})
			.catch((error) => {
				console.warn(
					`Spam context failed for #${number}; failing open: ${error}`,
				);
				return null;
			});
		if (!context) {
			if (replay) return { acted: true, closed: false, replay: true, mode };
			if (isPullRequest && !(isDraft && action !== "ready_for_review")) {
				await step.do("kick-review", async () => {
					const token = await getInstallationToken(ghEnv);
					const pr = await getPullRequest(token, number);
					await startReview(this.env.REVIEW_ORCHESTRATOR, {
						number,
						headSha: pr.head.sha,
						trigger: "auto",
						action,
						fullReview: false,
					});
					return { kicked: true };
				});
				return { acted: true, closed: false, review: "kicked" };
			}
			return { acted: true, closed: false, review: "skipped" };
		}
		const verdict = await step.do<
			{ ok: true; value: ItemSpamVerdict } | { ok: false; error: string }
		>("spam-filter", async () => {
			try {
				const value = await evaluateItemSpam(
					this.env.AI,
					{ eventType, item: context.item, diff: context.diff },
					this.env.DOCS_FLUE_AI_GATEWAY_ID,
				);
				return { ok: true, value };
			} catch (error) {
				return {
					ok: false,
					error: error instanceof Error ? error.message : String(error),
				};
			}
		});
		const gate = await step.do<{ closed: boolean; wouldClose?: boolean }>(
			"spam-verdict",
			async () => {
				if (!verdict.ok) {
					console.log({
						message: `Spam filter errored (treated as not spam): #${number} — ${verdict.error}`,
						event: "ingest_workflow",
						number,
						action: "spam_filter_error",
					});
					return { closed: false };
				}

				const itemType = context.item.kind === "pull_request" ? "PR" : "Issue";
				const itemLabel = `${itemType} #${context.item.number} "${truncateLogValue(context.item.title)}"`;
				if (!verdict.value.is_spam || verdict.value.confidence === "low") {
					console.log({
						message: `${itemType} Left open: ${itemLabel} (${verdict.value.confidence} confidence not spam/off-topic)`,
						event: "spam_and_off_topic_filter_verdict",
						eventType,
						kind: context.item.kind,
						number: context.item.number,
						url: context.item.url,
						...verdict.value,
						action: "left_open",
					});
					return { closed: false };
				}
				if (context.item.state !== "open") return { closed: false };

				const isOffTopic = isOffTopicCategory(verdict.value.category);
				if (dryRun) {
					console.log({
						message: `${itemType} Would close (replay, log mode): ${itemLabel} (${verdict.value.confidence} confidence, ${verdict.value.category})`,
						event: "spam_and_off_topic_filter_verdict",
						eventType,
						number: context.item.number,
						...verdict.value,
						action: "would_close",
					});
					return { closed: false, wouldClose: true };
				}
				const token = await getInstallationToken(ghEnv);
				await addLabels(token, number, [
					isOffTopic ? "off topic" : "spam",
				]).catch(() => {});
				const closed = await (
					context.item.kind === "pull_request"
						? closePullRequest(token, number)
						: closeIssue(token, number)
				).then(
					() => true,
					(error) => {
						console.warn(
							`Spam close failed for #${number}; failing open: ${error}`,
						);
						return false;
					},
				);
				if (!closed) return { closed: false };
				await postComment(
					token,
					number,
					isOffTopic ? OFF_TOPIC_COMMENT : SPAM_COMMENT,
				).catch(() => {});
				console.log({
					message: `${itemType} Closed: ${itemLabel} (${verdict.value.confidence} confidence spam/off-topic)`,
					event: "spam_and_off_topic_filter_verdict",
					eventType,
					kind: context.item.kind,
					number: context.item.number,
					url: context.item.url,
					...verdict.value,
					action: "closed",
				});
				return { closed: true };
			},
		);

		if (replay) {
			return {
				acted: true,
				closed: gate.closed,
				wouldClose: dryRun ? (gate.wouldClose ?? false) : gate.closed,
				category: verdict.ok ? verdict.value.category : null,
				probability: verdict.ok ? verdict.value.probability : null,
				mode,
				replay: true,
				verdict: verdict.ok ? verdict.value : null,
				error: verdict.ok ? undefined : verdict.error,
			};
		}

		if (gate.closed) {
			return { acted: true, closed: true };
		}

		// ── 2. Code review (PRs only, draft-gated) ───────────────────────────────
		const draftSkipped = isDraft && action !== "ready_for_review";
		if (isPullRequest && !draftSkipped) {
			await step.do("kick-review", async () => {
				const token = await getInstallationToken(ghEnv);
				const pr = await getPullRequest(token, number);
				await startReview(this.env.REVIEW_ORCHESTRATOR, {
					number,
					headSha: pr.head.sha,
					trigger: "auto",
					action,
					fullReview: false,
				});
				return { kicked: true };
			});
			return { acted: true, closed: false, review: "kicked" };
		}

		return { acted: true, closed: false, review: "skipped" };
	}
}
