/**
 * IngestWorkflow — durable spam gate for issues and non-Dependabot PRs (D7).
 *
 * Cloudflare `WorkflowEntrypoint` that replaces the spam-gating half of the 0.11
 * `orchestrate` workflow (the `spam-and-off-topic-filter` admit + poll, then the
 * conditional `code-review-orchestrator` admit). Re-exported from `cloudflare.ts`;
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
 *      TS). Any error is treated as "not spam" (matching the 0.11 timeout/error
 *      handling) so a filter failure never blocks a legitimate review.
 *   2. kick-review — only when the item is a non-draft PR that survived the gate
 *      (draft PRs are skipped unless the trigger action is `ready_for_review`).
 */
import { WorkflowEntrypoint } from "cloudflare:workers";
import type { WorkflowEvent, WorkflowStep } from "cloudflare:workers";
import type { ReviewOrchestratorParams } from "../cloudflare";
import { runSpamFilter } from "../lib/run-spam-filter";

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
	REVIEW_ORCHESTRATOR: Workflow<ReviewOrchestratorParams>;
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
		const gate = await step.do<{ closed: boolean }>("spam-filter", async () => {
			try {
				const result = await runSpamFilter(
					ghEnv,
					{ eventType, number },
					`${event.instanceId}:spam:${number}`,
				);
				return { closed: result.closed };
			} catch (err) {
				// Treat any filter error as "not spam" so a transient failure never
				// blocks a legitimate review (matches the 0.11 timeout/error handling).
				console.log({
					message: `Spam filter errored (treated as not spam): #${number} — ${err instanceof Error ? err.message : String(err)}`,
					event: "ingest_workflow",
					number,
					action: "spam_filter_error",
				});
				return { closed: false };
			}
		});

		if (gate.closed) {
			return { acted: true, closed: true };
		}

		// ── 2. Code review (PRs only, draft-gated) ───────────────────────────────
		const draftSkipped = isDraft && action !== "ready_for_review";
		if (isPullRequest && !draftSkipped) {
			await step.do("kick-review", async () => {
				await this.env.REVIEW_ORCHESTRATOR.create({ params: { number } });
				return { kicked: true };
			});
			return { acted: true, closed: false, review: "kicked" };
		}

		return { acted: true, closed: false, review: "skipped" };
	}
}
