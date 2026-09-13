import {
	WorkflowEntrypoint,
	type WorkflowEvent,
	type WorkflowStep,
} from "cloudflare:workers";
import { agentStep } from "../lib/agent-step";
import {
	getInstallationToken,
	getPullRequest,
	updatePullRequestBranch,
	pollForBranchUpdate,
	findBotComment,
	compareCommits,
	postComment,
	updateIssueComment,
	addReactionToComment,
} from "../lib/github";
import {
	prepareConflicts,
	finalizeResolution,
	applyResolution,
	ConflictResolutionFromModelSchema,
} from "../lib/rebase-conflict";
import { escapeMarkdown } from "../lib/review-domain";

export interface RebaseParams {
	prNumber: number;
	triggerCommentId: number;
	triggerEyesReactionId: number | null;
	senderLogin: string;
}

/** Branch mutations have their own steps and never replay a model request. */
export class RebaseWorkflow extends WorkflowEntrypoint<Env, RebaseParams> {
	async run(event: WorkflowEvent<RebaseParams>, step: WorkflowStep) {
		const { prNumber, triggerCommentId } = event.payload;
		try {
			const pr = await step.do("prepare", async () => {
				const pr = await getPullRequest(
					await getInstallationToken(this.env),
					prNumber,
				);
				if (pr.state !== "open") throw new Error("The pull request is closed.");
				if (pr.base.ref !== "production")
					throw new Error("Rebase requires production as the target branch.");
				if (pr.head.repo?.full_name !== pr.base.repo.full_name)
					throw new Error("Fork branches must be rebased by their owner.");
				return pr;
			});
			if (this.env.DOCS_FLUE_REVIEW_MODE !== "comment") {
				console.log({
					event: "rebase_preview",
					prNumber,
					headSha: pr.head.sha,
				});
				return { applied: false, preview: true };
			}
			await step.do("pending", () =>
				this.report(prNumber, "Updating the branch…"),
			);
			const attempt = await step.do(
				"update-branch",
				{ retries: { limit: 0, delay: "1 second" } },
				async () =>
					updatePullRequestBranch(
						await getInstallationToken(this.env),
						prNumber,
						"rebase",
						pr.head.sha,
					),
			);
			if (attempt.ok) {
				if (attempt.async)
					await step.do(
						"wait-for-update",
						{ timeout: "3 minutes" },
						async () => {
							const sha = await pollForBranchUpdate(
								await getInstallationToken(this.env),
								prNumber,
								pr.head.sha,
							);
							if (!sha)
								throw new Error(
									"GitHub has not confirmed the branch update. Check the branch before retrying.",
								);
							return sha;
						},
					);
			} else {
				const prepared = await step.do(
					"conflicts",
					{ timeout: "3 minutes" },
					async () => {
						const result = await prepareConflicts(
							await getInstallationToken(this.env),
							pr,
						);
						return {
							...result,
							conflictCandidateSet: [...result.conflictCandidateSet],
							conflictWritePathMap: [...result.conflictWritePathMap],
						};
					},
				);
				if (!prepared.agentInput) throw new Error(prepared.reason);
				const outcome = await agentStep(
					step,
					"resolve",
					"rebase",
					`${event.instanceId}:resolve`,
					prepared.agentInput,
					"conflict_resolution",
					ConflictResolutionFromModelSchema,
				);
				if (!outcome.ok)
					throw new Error(
						"AI conflict resolution did not complete. No resolution was applied.",
					);
				const resolution = finalizeResolution(
					{
						...prepared,
						conflictCandidateSet: new Set(prepared.conflictCandidateSet),
						conflictWritePathMap: new Map(prepared.conflictWritePathMap),
					},
					outcome.value,
				);
				if (resolution.confidence !== "high")
					throw new Error(
						resolution.reason || "The resolution needs human review.",
					);
				await step.do(
					"apply-resolution",
					{ timeout: "3 minutes", retries: { limit: 0, delay: "1 second" } },
					async () => {
						await applyResolution(
							await getInstallationToken(this.env),
							pr,
							resolution,
						);
						return true;
					},
				);
			}
			await step.do("confirm-base", async () => {
				const token = await getInstallationToken(this.env);
				const current = await getPullRequest(token, prNumber);
				const comparison = await compareCommits(
					token,
					pr.base.sha,
					current.head.sha,
				);
				if (comparison.mergeBaseSha !== pr.base.sha)
					throw new Error(
						"The branch changed, but GitHub has not confirmed that the requested base was incorporated.",
					);
				return true;
			});
			await step.do("complete", () =>
				this.report(prNumber, "Branch update completed."),
			);
			await step.do("review", async () => {
				const current = await getPullRequest(
					await getInstallationToken(this.env),
					prNumber,
				);
				return this.env.REVIEW_COORDINATOR.getByName(`pr-${prNumber}`).request({
					number: prNumber,
					runId: `${event.instanceId}-review`,
					headSha: current.head.sha,
					baseSha: current.base.sha,
					baseRef: current.base.ref,
					title: current.title,
					body: current.body ?? "",
					author: current.user?.login ?? "",
					moderate: false,
					force: true,
				});
			});
			await step.do("reaction", () =>
				getInstallationToken(this.env).then((token) =>
					addReactionToComment(token, triggerCommentId, "+1"),
				),
			);
			return { applied: true };
		} catch (error) {
			console.error({ event: "rebase_failed", prNumber, error: String(error) });
			if (this.env.DOCS_FLUE_REVIEW_MODE === "comment")
				await step.do("failure", () =>
					this.report(
						prNumber,
						`Branch update needs attention: ${error instanceof Error ? error.message : "Unknown failure"}`,
					),
				);
			throw error;
		}
	}

	private async report(number: number, message: string): Promise<void> {
		const token = await getInstallationToken(this.env);
		const marker = "<!-- docs-flue-rebase -->";
		const body = `${marker}\n## Branch update\n\n${escapeMarkdown(message)}`;
		const existing = await findBotComment(
			token,
			number,
			Number(this.env.DOCS_FLUE_GITHUB_APP_ID),
			marker,
		);
		if (existing && (await updateIssueComment(token, existing.id, body)))
			return;
		await postComment(token, number, body);
	}
}
