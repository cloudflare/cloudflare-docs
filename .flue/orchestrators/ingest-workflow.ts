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
 *   1. spam-filter — `runSpamFilter` dispatches the spam-filter agent and, on a
 *      confident spam verdict, labels/comments/closes the item (all in trusted
 *      TS). Any error is treated as "not spam" so a filter failure never blocks
 *      a legitimate review.
 *   2. kick-review — only when the item is a non-draft PR that survived the gate
 *      (draft PRs are skipped unless the trigger action is `ready_for_review`).
 */
import { WorkflowEntrypoint } from "cloudflare:workers";
import type { WorkflowEvent, WorkflowStep } from "cloudflare:workers";
import SpamFilter, {
	SPAM_VERDICT_DATA,
	type SpamFilterInput,
} from "../agents/spam-filter";
import { agentStep } from "../lib/agents/agent-step";
import { SMALL_AGENT_DURABILITY } from "../lib/agents/durability";
import {
	addLabels,
	closeIssue,
	closePullRequest,
	getInstallationToken,
	getPullRequest,
	postComment,
} from "../lib/github";
import { startReview, type ReviewWorkflowParams } from "../lib/review/start";
import { truncateLogValue } from "../lib/github-webhook";
import {
	OFF_TOPIC_COMMENT,
	SPAM_COMMENT,
	SpamVerdictSchema,
	getGitHubContext,
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
}

interface IngestEnv {
	REVIEW_ORCHESTRATOR: Workflow<ReviewWorkflowParams>;
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
		const { eventType, number, isPullRequest, isDraft, action } = event.payload;
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
		const verdict = await agentStep(step, {
			name: "spam-filter",
			agent: SpamFilter,
			id: `${event.instanceId}:spam:${number}`,
			message:
				"Evaluate this GitHub item for spam/off-topic and submit your verdict.",
			initialData: {
				eventType,
				item: context.item,
				diff: context.diff,
			} satisfies SpamFilterInput,
			dataName: SPAM_VERDICT_DATA,
			schema: SpamVerdictSchema,
			readTimeoutMs: SMALL_AGENT_DURABILITY.timeoutMs,
		});
		const gate = await step.do<{ closed: boolean }>(
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

				const isOffTopic = /support|wrong repo|feature/i.test(
					verdict.value.reason,
				);
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
