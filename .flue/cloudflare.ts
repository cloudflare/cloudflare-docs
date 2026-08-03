/**
 * cloudflare.ts — authored non-HTTP Worker handlers (Flue 2.0).
 *
 * The generated Worker entry does `export * from cloudflare.ts`, so every named
 * export here is re-exported from the Worker's main module. That is exactly what
 * a `[[workflows]]` binding's `class_name` resolves against, which is how the
 * app-owned Cloudflare Workflow below is wired in (`REVIEW_ORCHESTRATOR` in
 * wrangler.jsonc). The default export is reserved for non-HTTP handlers (queue,
 * scheduled, …) and must not define `fetch` — HTTP stays in `app.ts`.
 *
 * ReviewOrchestrator is the durable code-review pipeline (D1). It replaces the
 * 0.11 dispatch/rendezvous machine (code-review-orchestrator + three specialist
 * workflows + finalize-review + the R2 finalize lock) with a single Workflow
 * whose steps drive the specialist and reconcile Flue agents directly via the
 * trusted drivers in `lib/run-*.ts`. Because the pipeline is now a linear set of
 * durable steps that *awaits* each specialist, there is no fire-and-forget
 * admit, no poll, and no R2 rendezvous namespace — Workflow step durability
 * provides the crash protection the placeholder results used to.
 *
 * Flue's `init().dispatch().read()` resolve their runtime from module scope
 * (configured once when the entry loads) and fall back to the module-scope
 * `cloudflare:workers` env, the same path that powers cron and queue consumers —
 * so calling them from inside a Workflow step is a supported design.
 */
import { WorkflowEntrypoint } from "cloudflare:workers";
import type { WorkflowEvent, WorkflowStep } from "cloudflare:workers";
import type { CodeReviewResult } from "./lib/code-review-results";
import type { StyleGuideResult } from "./lib/style-guide-results";
import type { ReconcileFinding } from "./agents/reconcile-reviewer";
import type { ConventionsReviewInput } from "./agents/conventions-reviewer";
import {
	BOT_COMMENT_MARKER,
	type DiffMode,
	extractReviewedHeadSha,
	getAutoReviewCount,
	isAutoReviewDisabled,
	isReviewLimitIgnored,
	markAutoReviewCompleted,
	partitionComments,
} from "./lib/code-review-state";
import {
	postOrUpdateComment,
	renderComment,
	renderFailureComment,
	renderPendingComment,
	renderReviewLimitComment,
	type ReconcileResult,
} from "./lib/code-review-render";
import {
	addReactionToComment,
	getInstallationToken,
	getIssueComments,
	getPullRequest,
	getPullRequestFiles,
	getRepoFileContent,
	removeReactionFromComment,
	type GitHubIssueComment,
} from "./lib/github";
import { fetchFilesForDiffMode } from "./lib/diff-fetch";
import {
	selectCodeReviewFiles,
	type CodeReviewPullRequest,
} from "./lib/code-review-files";
import {
	selectStyleGuideFiles,
	type StyleGuidePullRequest,
} from "./lib/style-guide-files";
import { runCodeReview } from "./lib/run-code-review";
import { runStyleGuide } from "./lib/run-style-guide";
import { runConventionsReview } from "./lib/run-conventions-review";
import { reconcileStream } from "./lib/run-reconcile";

/** Params carried in the Workflow instance payload (built by pipeline-entry). */
export interface ReviewOrchestratorParams {
	number: number;
	/** Ignore previous review state and review the full diff (from /full-review). */
	forceFullReview?: boolean;
	/** Skip the auto-review disabled + limit checks (codeowner commands). */
	bypassReviewLimit?: boolean;
	/** Comment id that triggered the run — 👀→👍 swapped on it when done. */
	triggerCommentId?: number;
	/** Reaction id of the 👀 to remove when the review completes. */
	triggerEyesReactionId?: number | null;
}

interface OrchestratorEnv {
	DOCS_FLUE_BUCKET: R2Bucket;
	DOCS_FLUE_REVIEW_MODE?: string;
	[key: string]: unknown;
}

/** Compact PR metadata carried between steps (JSON-serializable). */
interface OrchestratorPrMeta {
	number: number;
	title: string;
	body: string;
	author: string;
	base: string;
	head: string;
	labels: string[];
}

interface GatherContextOutput {
	currentHeadSha: string;
	previousReviewedSha: string | null;
	diffMode: DiffMode;
	humanComments: Array<{ author: string; created_at: string; body: string }>;
	prMeta: OrchestratorPrMeta;
}

interface CodeSpecialistOutput {
	ok: boolean;
	result: CodeReviewResult;
}
interface StyleSpecialistOutput {
	ok: boolean;
	result: StyleGuideResult;
}

interface ReconcileOutput {
	code: ReconcileResult;
	style: ReconcileResult;
	conventions: ReconcileResult;
	codeOk: boolean;
	styleOk: boolean;
	conventionsOk: boolean;
}

/** Empty degraded results (specialist could not produce anything this run). */
function emptyCodeResult(summary: string): CodeReviewResult {
	return { findings: [], summary, reviewedFiles: [] };
}
function emptyStyleResult(summary: string): StyleGuideResult {
	return { findings: [], summary, reviewedFiles: [] };
}

export class ReviewOrchestrator extends WorkflowEntrypoint<
	OrchestratorEnv,
	ReviewOrchestratorParams
> {
	async run(
		event: Readonly<WorkflowEvent<ReviewOrchestratorParams>>,
		step: WorkflowStep,
	): Promise<Record<string, unknown>> {
		const env = this.env;
		const params = event.payload;
		const runId = event.instanceId;
		const number = params.number;
		const forceFullReview = params.forceFullReview === true;
		const bypassReviewLimit = params.bypassReviewLimit === true;
		const reviewMode = env.DOCS_FLUE_REVIEW_MODE ?? "log";
		const bucket = env.DOCS_FLUE_BUCKET;
		const ghEnv = env as unknown as Record<string, string>;

		// ── 1. Guards: auto-review-disabled + auto-review limit ─────────────────
		const gate = await step.do("guards", async () => {
			if (bypassReviewLimit) return { proceed: true as const };

			if (await isAutoReviewDisabled(bucket, number)) {
				return { proceed: false as const, reason: "auto_review_disabled" };
			}

			const [count, ignored] = await Promise.all([
				getAutoReviewCount(bucket, number),
				isReviewLimitIgnored(bucket, number),
			]);
			if (count >= 2 && !ignored) {
				if (reviewMode === "comment") {
					const token = await getInstallationToken(ghEnv);
					const allComments = await getIssueComments(token, number);
					const botComment =
						allComments.findLast((c) => c.body?.includes(BOT_COMMENT_MARKER)) ??
						null;
					const alreadyPaused = botComment?.body?.includes(
						"Automatic reviews for this PR are paused",
					);
					if (!alreadyPaused) {
						await postOrUpdateComment(
							token,
							number,
							botComment,
							renderReviewLimitComment(botComment?.body ?? undefined),
						);
					}
				}
				return { proceed: false as const, reason: "auto_review_limit_reached" };
			}
			return { proceed: true as const };
		});

		if (!gate.proceed) {
			return { dispatched: false, reason: gate.reason };
		}

		// ── 2. Gather PR context ────────────────────────────────────────────────
		const ctx = await step.do<GatherContextOutput>(
			"gather-context",
			async () => {
				const token = await getInstallationToken(ghEnv);
				const [allComments, pr] = await Promise.all([
					getIssueComments(token, number),
					getPullRequest(token, number),
				]);
				const { botComment, humanCommentsAfterBot } =
					partitionComments(allComments);
				const currentHeadSha = pr.head.sha;

				// forceFullReview: wipe previous review JSONs so reconcile starts fresh.
				if (forceFullReview) {
					const prefix = `diffs/pr-${number}/`;
					const existing = await bucket.list({ prefix });
					await Promise.all(
						existing.objects
							.filter((o) => o.key.match(/review-[0-9a-f]+\.json$/))
							.map((o) => bucket.delete(o.key)),
					);
				}

				const previousReviewedSha = forceFullReview
					? null
					: extractReviewedHeadSha(botComment?.body ?? null);

				const diffMode: DiffMode =
					!forceFullReview &&
					previousReviewedSha &&
					previousReviewedSha !== currentHeadSha
						? {
								type: "incremental",
								fromSha: previousReviewedSha,
								toSha: currentHeadSha,
							}
						: { type: "full" };

				return {
					currentHeadSha,
					previousReviewedSha,
					diffMode,
					humanComments: humanCommentsAfterBot.map((c) => ({
						author: c.user?.login ?? "unknown",
						created_at: c.created_at,
						body: c.body ?? "",
					})),
					prMeta: {
						number: pr.number,
						title: pr.title,
						body: pr.body ?? "",
						author: pr.user?.login ?? "",
						base: pr.base.ref,
						head: pr.head.ref,
						labels: pr.labels.map((l) => l.name),
					},
				};
			},
		);

		const headSha = ctx.currentHeadSha;
		const codePr: CodeReviewPullRequest = {
			number: ctx.prMeta.number,
			title: ctx.prMeta.title,
			base: ctx.prMeta.base,
			head: ctx.prMeta.head,
		};
		const stylePr: StyleGuidePullRequest = codePr;

		// ── 3. Placeholder comment (comment mode only) ──────────────────────────
		if (reviewMode === "comment") {
			await step.do("placeholder-comment", async () => {
				const token = await getInstallationToken(ghEnv);
				const { botComment } = partitionComments(
					await getIssueComments(token, number),
				);
				await postOrUpdateComment(
					token,
					number,
					botComment,
					renderPendingComment(
						headSha,
						botComment !== null,
						forceFullReview,
						botComment?.body ?? undefined,
					),
				);
				return { posted: true };
			});
		}

		// ── 4. Run the three specialists (concurrent durable steps) ─────────────
		const [code, style, conventions] = await Promise.all([
			step.do<CodeSpecialistOutput>("code-review", async () => {
				try {
					const token = await getInstallationToken(ghEnv);
					const { files } = await fetchFilesForDiffMode(
						token,
						number,
						ctx.diffMode,
					);
					const selected = selectCodeReviewFiles(files);
					const repoAgentsMd =
						selected.length > 0
							? ((await getRepoFileContent(
									token,
									"AGENTS.md",
									ctx.prMeta.base,
								).catch(() => null)) ?? undefined)
							: undefined;
					const result = await runCodeReview({
						token,
						headSha,
						repoAgentsMd,
						prNumber: number,
						pullRequest: codePr,
						files: selected,
						runId,
					});
					return { ok: true, result };
				} catch (err) {
					console.error({
						message: `Code review specialist failed (degraded): PR #${number} — ${err instanceof Error ? err.message : String(err)}`,
						event: "review_orchestrator",
						number,
						runId,
						action: "code_specialist_degraded",
					});
					return {
						ok: false,
						result: emptyCodeResult(
							"Code review could not complete — prior findings carried forward.",
						),
					};
				}
			}),

			step.do<StyleSpecialistOutput>("style-guide", async () => {
				try {
					const token = await getInstallationToken(ghEnv);
					const { files } = await fetchFilesForDiffMode(
						token,
						number,
						ctx.diffMode,
					);
					const selected = selectStyleGuideFiles(files);
					const result = await runStyleGuide({
						prNumber: number,
						pullRequest: stylePr,
						files: selected,
						runId,
					});
					return { ok: true, result };
				} catch (err) {
					console.error({
						message: `Style-guide specialist failed (degraded): PR #${number} — ${err instanceof Error ? err.message : String(err)}`,
						event: "review_orchestrator",
						number,
						runId,
						action: "style_specialist_degraded",
					});
					return {
						ok: false,
						result: emptyStyleResult(
							"Style-guide review could not complete — prior findings carried forward.",
						),
					};
				}
			}),

			step.do<CodeSpecialistOutput>("conventions", async () => {
				try {
					const token = await getInstallationToken(ghEnv);
					const [files, prTemplate] = await Promise.all([
						getPullRequestFiles(token, number),
						getRepoFileContent(
							token,
							".github/pull_request_template.md",
							ctx.prMeta.base,
						).catch(() => null),
					]);
					const renamedDocFiles = files
						.filter(
							(f) =>
								(f.status === "renamed" || f.status === "removed") &&
								/^src\/content\/docs\/.+\.mdx$/.test(
									f.status === "renamed"
										? (f.previous_filename ?? f.filename)
										: f.filename,
								),
						)
						.map((f) =>
							f.status === "renamed"
								? (f.previous_filename ?? f.filename)
								: f.filename,
						);
					const changedFiles = files.map((f) => ({
						filename: f.filename,
						status: f.status,
						additions: f.additions,
						deletions: f.deletions,
					}));
					const input: ConventionsReviewInput = {
						pullRequest: { number, title: ctx.prMeta.title },
						description: ctx.prMeta.body,
						prTemplate: prTemplate ?? "",
						renamedDocFiles,
						changedFiles,
					};
					const result = await runConventionsReview(
						input,
						`${runId}:cv:${number}`,
					);
					return { ok: true, result };
				} catch (err) {
					console.error({
						message: `Conventions specialist failed (degraded): PR #${number} — ${err instanceof Error ? err.message : String(err)}`,
						event: "review_orchestrator",
						number,
						runId,
						action: "conventions_specialist_degraded",
					});
					return {
						ok: false,
						result: emptyCodeResult(
							"Conventions check could not complete — prior findings carried forward.",
						),
					};
				}
			}),
		]);

		// ── 5. Reconcile each stream against prior findings + human comments ────
		const reconciled = await step.do<ReconcileOutput>("reconcile", async () => {
			// Load previous findings from R2 (legacy bare array = style-only).
			let prevCode: ReconcileFinding[] = [];
			let prevStyle: ReconcileFinding[] = [];
			let prevConventions: ReconcileFinding[] = [];
			if (ctx.previousReviewedSha) {
				try {
					const obj = await bucket.get(
						`diffs/pr-${number}/review-${ctx.previousReviewedSha}.json`,
					);
					if (obj) {
						const parsed = JSON.parse(await obj.text());
						if (Array.isArray(parsed)) {
							prevStyle = parsed as ReconcileFinding[];
						} else {
							prevCode = (parsed.code ?? []) as ReconcileFinding[];
							prevStyle = (parsed.style ?? []) as ReconcileFinding[];
							prevConventions = (parsed.conventions ??
								[]) as ReconcileFinding[];
						}
					}
				} catch {
					// Non-fatal — fall back to empty previous findings.
				}
			}

			const pullRequest = {
				number,
				title: ctx.prMeta.title,
				base: ctx.prMeta.base,
				head: ctx.prMeta.head,
			};
			const fullDiff: DiffMode = { type: "full" };

			// Degraded streams (ok:false) carry previous findings forward as
			// active rather than reconciling — an empty degraded result must not
			// falsely resolve prior findings the specialist never reviewed.
			const reconciledCode: ReconcileResult = code.ok
				? await reconcileStream({
						streamLabel: "code",
						pullRequest,
						currentFindings: code.result.findings,
						reviewedFiles: code.result.reviewedFiles,
						previousFindings: prevCode,
						humanComments: ctx.humanComments,
						diffMode: ctx.diffMode,
						fallbackSummary:
							code.result.findings.length === 0
								? "No code review issues found."
								: `${code.result.findings.length} finding(s); no prior review to reconcile against.`,
						instanceId: `${runId}:rc:code`,
						runId,
					})
				: {
						active: prevCode,
						ignored_by_reviewer: [],
						resolved: [],
						summary:
							"Code review could not complete — prior findings carried forward.",
					};

			const reconciledStyle: ReconcileResult = style.ok
				? await reconcileStream({
						streamLabel: "style",
						pullRequest,
						currentFindings: style.result.findings,
						reviewedFiles: style.result.reviewedFiles,
						previousFindings: prevStyle,
						humanComments: ctx.humanComments,
						diffMode: ctx.diffMode,
						fallbackSummary:
							style.result.findings.length === 0
								? "No style-guide issues found."
								: `${style.result.findings.length} finding(s); no prior review to reconcile against.`,
						instanceId: `${runId}:rc:style`,
						runId,
					})
				: {
						active: prevStyle,
						ignored_by_reviewer: [],
						resolved: [],
						summary:
							"Style-guide review could not complete — prior findings carried forward.",
					};

			// Conventions always reconciles in full-diff mode: the PR description
			// is always the current state regardless of the code/style diff mode.
			const reconciledConventions: ReconcileResult = conventions.ok
				? await reconcileStream({
						streamLabel: "conventions",
						pullRequest,
						currentFindings: conventions.result.findings,
						reviewedFiles: conventions.result.reviewedFiles,
						previousFindings: prevConventions,
						humanComments: ctx.humanComments,
						diffMode: fullDiff,
						fallbackSummary:
							conventions.result.findings.length === 0
								? "No convention issues found."
								: `${conventions.result.findings.length} finding(s); no prior review to reconcile against.`,
						instanceId: `${runId}:rc:conventions`,
						runId,
					})
				: {
						active: prevConventions,
						ignored_by_reviewer: [],
						resolved: [],
						summary:
							"Conventions check could not complete — prior findings carried forward.",
					};

			// Persist the reconciled findings for the next incremental review.
			await bucket.put(
				`diffs/pr-${number}/review-${headSha}.json`,
				JSON.stringify({
					code: reconciledCode.active,
					style: reconciledStyle.active,
					conventions: reconciledConventions.active,
				}),
			);

			return {
				code: reconciledCode,
				style: reconciledStyle,
				conventions: reconciledConventions,
				codeOk: code.ok,
				styleOk: style.ok,
				conventionsOk: conventions.ok,
			};
		});

		// ── 6. Publish: head-guard, idempotency-guard, render, post/log ─────────
		const published = await step.do("publish", async () => {
			const token = await getInstallationToken(ghEnv);

			// Head-guard: a newer push already owns the comment — do not clobber it.
			const pr = await getPullRequest(token, number);
			if (pr.head.sha !== headSha) {
				return { finalized: false, reason: "head_moved" };
			}

			// Idempotency-guard (comment mode only): skip if this head is already
			// finalized, unless the existing comment is retryable (pending/failure).
			let botComment: GitHubIssueComment | null = null;
			if (reviewMode === "comment") {
				const allComments = await getIssueComments(token, number);
				botComment =
					allComments.findLast((c) => c.body?.includes(BOT_COMMENT_MARKER)) ??
					null;
				const alreadyFinalizedSha = extractReviewedHeadSha(
					botComment?.body ?? null,
				);
				const isRetryable =
					botComment?.body?.includes("<!-- status: pending -->") ||
					botComment?.body?.includes("<!-- status: failure -->");
				if (alreadyFinalizedSha === headSha && !isRetryable) {
					return { finalized: false, reason: "already_finalized" };
				}
			}

			const bothFailed = !reconciled.codeOk && !reconciled.styleOk;
			const commentBody = bothFailed
				? renderFailureComment(headSha)
				: renderComment(
						{
							code: reconciled.code,
							style: reconciled.style,
							conventions: reconciled.conventions,
							codeFailed: !reconciled.codeOk,
							styleFailed: !reconciled.styleOk,
							conventionsFailed: !reconciled.conventionsOk,
						},
						headSha,
						forceFullReview,
						number,
					);

			const totalActive =
				reconciled.code.active.length +
				reconciled.style.active.length +
				reconciled.conventions.active.length;

			if (reviewMode === "log") {
				console.log({
					message: `Review complete (log mode): PR #${number} — ${totalActive} active finding(s)`,
					event: "review_orchestrator",
					number,
					mode: reviewMode,
					active: totalActive,
					runId,
					action: "complete_log_mode",
					commentBody,
				});
			} else {
				await postOrUpdateComment(token, number, botComment, commentBody);
				// Swap 👀 → 👍 on the trigger comment if applicable.
				if (params.triggerCommentId) {
					if (params.triggerEyesReactionId) {
						await removeReactionFromComment(
							token,
							params.triggerCommentId,
							params.triggerEyesReactionId,
						).catch(() => {});
					}
					await addReactionToComment(
						token,
						params.triggerCommentId,
						"+1",
					).catch(() => {});
				}
				console.log({
					message: `Review complete (comment mode): PR #${number} — ${totalActive} active finding(s)`,
					event: "review_orchestrator",
					number,
					mode: reviewMode,
					active: totalActive,
					runId,
					action: "complete_comment_posted",
				});
			}

			return { finalized: true, bothFailed, active: totalActive };
		});

		// ── 7. Mark the auto-review slot consumed ───────────────────────────────
		// Only when both code and style succeeded and this was an automatic run.
		if (
			published.finalized &&
			!bypassReviewLimit &&
			reconciled.codeOk &&
			reconciled.styleOk
		) {
			await step.do("mark-auto-review", async () => {
				try {
					await markAutoReviewCompleted(bucket, number, headSha);
				} catch (err) {
					console.error({
						message: `Failed to mark auto-review completed: PR #${number} — ${err instanceof Error ? err.message : String(err)}`,
						event: "review_orchestrator",
						number,
						runId,
						action: "mark_auto_review_failed",
					});
				}
				return { marked: true };
			});
		}

		return {
			finalized: published.finalized === true,
			headSha,
			diffMode: ctx.diffMode.type,
			codeOk: reconciled.codeOk,
			styleOk: reconciled.styleOk,
			conventionsOk: reconciled.conventionsOk,
		};
	}
}

// Additional app-owned WorkflowEntrypoints (D6). Kept in sibling files to keep
// this module legible; re-exported here so the generated entry's
// `export * from cloudflare.ts` picks them up and their `[[workflows]]`
// class_name bindings resolve against the Worker's main module.
export { DependabotReviewWorkflow } from "./orchestrators/dependabot-review-workflow";
export { RebaseWorkflow } from "./orchestrators/rebase-workflow";
export { IngestWorkflow } from "./orchestrators/ingest-workflow";

// Reserved for future non-HTTP handlers (queue, scheduled). Must not define
// `fetch` — HTTP handling stays in app.ts.
export default {};
