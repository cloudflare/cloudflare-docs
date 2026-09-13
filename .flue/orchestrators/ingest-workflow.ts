import {
	WorkflowEntrypoint,
	type WorkflowEvent,
	type WorkflowStep,
} from "cloudflare:workers";
import {
	getInstallationToken,
	getPullRequest,
	isCodeOwner,
	addReactionToComment,
} from "../lib/github";
import type { WebhookClassification } from "../lib/webhook-classify";
import { moderate } from "../lib/moderation-step";
import type { ReviewJob } from "../lib/review-domain";

export interface IngestParams {
	classification: WebhookClassification;
	delivery: string;
}

export class IngestWorkflow extends WorkflowEntrypoint<Env, IngestParams> {
	async run(event: WorkflowEvent<IngestParams>, step: WorkflowStep) {
		const { classification: c, delivery } = event.payload;
		if (!c.number) return;
		const number = c.number;
		const codeowner = await step.do("authorize", async () => {
			if (!c.senderLogin) return false;
			const token = await getInstallationToken(this.env);
			return isCodeOwner(token, this.env.GITHUB_ORG_TOKEN ?? "", c.senderLogin);
		});
		if (c.command && !codeowner) return { ignored: "unauthorized" };
		if (c.eventType === "issues") {
			if (!codeowner)
				return moderate(
					step,
					this.env,
					{ eventType: "issues", number },
					delivery,
				);
			return { ignored: "codeowner" };
		}
		if (
			c.command === "disable-auto-review" ||
			c.command === "enable-auto-review" ||
			c.command === "ignore-review-limit"
		) {
			await step.do("preferences", async () => {
				const key = `diffs/pr-${number}/auto-review-disabled.json`;
				if (c.command === "disable-auto-review")
					await this.env.DOCS_FLUE_BUCKET.put(
						key,
						JSON.stringify({ disabled: true, by: c.senderLogin }),
					);
				else if (c.command === "enable-auto-review")
					await this.env.DOCS_FLUE_BUCKET.delete(key);
				if (this.env.DOCS_FLUE_REVIEW_MODE === "comment" && c.commentId)
					await addReactionToComment(
						await getInstallationToken(this.env),
						c.commentId,
						"+1",
					);
				return true;
			});
			if (c.command === "disable-auto-review")
				await step.do("cancel-disabled", () =>
					this.env.REVIEW_COORDINATOR.getByName(`pr-${number}`).cancel(),
				);
			return;
		}
		const pr = await step.do("pull-request", async () =>
			getPullRequest(await getInstallationToken(this.env), number),
		);
		if (pr.state !== "open" || (pr.draft && !c.command)) {
			await step.do("cancel", () =>
				this.env.REVIEW_COORDINATOR.getByName(`pr-${number}`).cancel(),
			);
			if (pr.draft && !codeowner && c.isSpamFilterEvent)
				await moderate(
					step,
					this.env,
					{ eventType: "pull_request", number },
					delivery,
					pr.head.sha,
				);
			return { ignored: "closed_or_draft" };
		}
		if (c.headSha && c.headSha !== pr.head.sha) return { ignored: "stale" };
		if (c.command === "rebase") {
			await step.do("rebase", async () => {
				const id = `rebase-${delivery}`;
				try {
					await this.env.REBASE.create({
						id,
						params: {
							prNumber: number,
							triggerCommentId: c.commentId!,
							triggerEyesReactionId: null,
							senderLogin: c.senderLogin!,
						},
					});
				} catch (error) {
					const existing = await this.env.REBASE.get(id);
					try {
						if ((await existing.status()).status === "unknown") throw error;
					} catch {
						throw error;
					}
				}
				return true;
			});
			return;
		}
		if (!c.command) {
			if (pr.draft) return { ignored: "draft" };
			const disabled = await step.do("auto-review", () =>
				this.env.DOCS_FLUE_BUCKET.head(
					`diffs/pr-${number}/auto-review-disabled.json`,
				).then(Boolean),
			);
			if (disabled) {
				await step.do("cancel-disabled", () =>
					this.env.REVIEW_COORDINATOR.getByName(`pr-${number}`).cancel(),
				);
				return { ignored: "disabled" };
			}
		}
		const job: ReviewJob = {
			number,
			runId: delivery,
			headSha: pr.head.sha,
			baseSha: pr.base.sha,
			baseRef: pr.base.ref,
			title: pr.title,
			body: pr.body ?? "",
			author: pr.user?.login ?? "",
			moderate:
				!codeowner &&
				pr.user?.login !== "dependabot[bot]" &&
				c.isSpamFilterEvent,
			force: !!c.command,
			full: c.command === "full-review",
			...(c.commentId ? { triggerCommentId: c.commentId } : {}),
		};
		await step.do("review", () =>
			this.env.REVIEW_COORDINATOR.getByName(`pr-${number}`).request(job),
		);
		return { admitted: true };
	}
}
