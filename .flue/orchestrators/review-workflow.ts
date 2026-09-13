import {
	WorkflowEntrypoint,
	type WorkflowEvent,
	type WorkflowStep,
} from "cloudflare:workers";
import { agentStep } from "../lib/agent-step";
import { prepareSnapshot, readUnit, snapshotCommand } from "../lib/snapshot";
import {
	PAGE_SIZE,
	REVIEW_CONCURRENCY,
	FindingsSchema,
	artifactPrefix,
	identifyFindings,
	applyReconciliation,
	renderFinding,
	escapeMarkdown,
	appendReport,
	type ReviewJob,
	type ReviewPageParams,
	type Snapshot,
	type UnitResult,
	type Finding,
} from "../lib/review-domain";
import {
	getInstallationToken,
	getRepoFileContent,
	hasReviewReplies,
	addReactionToComment,
} from "../lib/github";
import { ConventionsReviewSchema } from "../agents/conventions-reviewer";
import { ReviewValidationSchema } from "../agents/review-validator";
import {
	DependabotReviewResultSchema,
	parseDependabotPackages,
	type DependabotPackage,
} from "../lib/dependabot-review";
import { moderate } from "../lib/moderation-step";
import { ReconciliationSchema } from "../agents/reconcile-findings";

interface Plan {
	hasReplies: boolean;
	snapshot: Snapshot;
	conventions: number;
	carry: number;
	total: number;
	packages: DependabotPackage[];
	repoInstructions: string;
	template: string;
	startedAt: string;
}
interface StoredResult extends UnitResult {
	packageReport?: string[];
}
interface ReportState {
	buffer: string;
	part: number;
	failed: number;
	unvalidated: number;
	findings: number;
	complete: number;
	archive: Finding[];
	batches: number;
}
const commands =
	"\n<details><summary>Commands (codeowners)</summary>\n\n`/review`: retry/reconcile changes since the last complete review. `/full-review`: explicitly review the complete PR again, preserving dismissals. `/disable-auto-review` and `/enable-auto-review`: control automatic reviews. `/rebase`: update the branch, using AI for conflicts when safe.\n\n</details>\n";

async function readJson<T>(bucket: R2Bucket, key: string): Promise<T> {
	const object = await bucket.get(key);
	if (!object) throw new Error(`Missing review artifact: ${key}`);
	return object.json<T>();
}

/** Each instance processes at most PAGE_SIZE tasks. Continuations start a new
 * Workflow, bounding step count and checkpoint storage independently of PR size. */
export class ReviewOrchestrator extends WorkflowEntrypoint<
	Env,
	ReviewPageParams
> {
	async run(event: WorkflowEvent<ReviewPageParams>, step: WorkflowStep) {
		const { job, page, phase } = event.payload;
		const coordinator = this.env.REVIEW_COORDINATOR.getByName(
			`pr-${job.number}`,
		);
		const prefix = artifactPrefix(job);
		if (!(await step.do("current", () => coordinator.isCurrent(job.runId))))
			return { superseded: true };
		try {
			if (page === 0 && phase === "prepare" && job.moderate) {
				const tracked = await step.do("track-moderation", () =>
					coordinator.track(job.runId, [
						{ kind: "spam", id: `${job.runId}:spam` },
					]),
				);
				if (!tracked) return { superseded: true };
				const gate = await moderate(
					step,
					this.env,
					{ eventType: "pull_request", number: job.number },
					job.runId,
					job.headSha,
				);
				if (gate.closed) {
					await step.do("finish-moderated", () =>
						coordinator.finish(job.runId),
					);
					return gate;
				}
			}
			if (phase === "prepare") {
				if (page === 0)
					await step.do("preparing", () =>
						coordinator.publish(
							job.runId,
							0,
							`## Review\n\nPreparing the changes at \`${job.headSha.slice(0, 12)}\`.\n${commands}`,
						),
					);
				const prepared = await step.do(
					"snapshot-page",
					{
						timeout: "7 minutes",
						retries: { limit: 4, delay: "15 seconds", backoff: "exponential" },
					},
					async () => {
						const result = await prepareSnapshot(this.env, job, page);
						await Promise.all(
							result.units.map((unit) =>
								this.env.DOCS_FLUE_BUCKET.put(
									`${prefix}units/${unit.index}.json`,
									JSON.stringify(unit),
								),
							),
						);
						if (result.done)
							await this.env.DOCS_FLUE_BUCKET.put(
								`${prefix}snapshot.json`,
								JSON.stringify(result.snapshot),
							);
						return { done: result.done, units: result.snapshot.units };
					},
				);
				await step.do("continue-preparing", () =>
					coordinator.continue({
						job,
						phase: prepared.done ? "review" : "prepare",
						page: prepared.done ? 0 : page + 1,
					}),
				);
				return prepared;
			}
			const plan = await step.do(
				"plan",
				{
					timeout: "7 minutes",
					retries: { limit: 3, delay: "10 seconds", backoff: "exponential" },
				},
				async () => {
					const existing = await this.env.DOCS_FLUE_BUCKET.get(
						`${prefix}plan.json`,
					);
					if (existing) return existing.json<Plan>();
					const packages =
						job.author === "dependabot[bot]"
							? parseDependabotPackages(job.body)
							: [];
					const snapshot = await readJson<Snapshot>(
						this.env.DOCS_FLUE_BUCKET,
						`${prefix}snapshot.json`,
					);
					const token = await getInstallationToken(this.env);
					const [repoInstructions, template] = await Promise.all([
						getRepoFileContent(token, "AGENTS.md", job.baseSha),
						getRepoFileContent(
							token,
							".github/pull_request_template.md",
							job.baseSha,
						),
					]);
					const metadataChanged =
						!job.baseline ||
						job.baseline.title !== job.title ||
						job.baseline.body !== job.body;
					const conventions = Math.max(
						metadataChanged ? 1 : 0,
						Math.ceil(snapshot.changedFiles / 100),
					);
					const carry = job.baseline?.batches ?? 0;
					const hasReplies =
						!!job.baseline &&
						(await hasReviewReplies(
							token,
							job.number,
							job.author,
							job.baseline.reviewedAt,
						));
					const result: Plan = {
						hasReplies,
						snapshot,
						conventions,
						carry,
						total: packages.length || snapshot.units + conventions + carry,
						packages,
						repoInstructions: repoInstructions ?? "",
						template: template ?? "",
						startedAt: new Date().toISOString(),
					};
					await this.env.DOCS_FLUE_BUCKET.put(
						`${prefix}plan.json`,
						JSON.stringify(result),
					);
					return result;
				},
			);
			if (phase === "publish")
				return await this.publishPage(step, job, page, plan);
			if (phase === "deliver")
				return await this.deliverPage(step, job, page, plan);
			if (page === 0)
				await step.do("placeholder", () =>
					coordinator.publish(
						job.runId,
						0,
						`## Review\n\nReviewing ${plan.snapshot.files} changed files at \`${job.headSha.slice(0, 12)}\`.\n\n${plan.snapshot.excluded} generated, vendored, or binary files excluded.\n${commands}`,
					),
				);
			const start = page * PAGE_SIZE;
			const end = Math.min(start + PAGE_SIZE, plan.total);
			for (let batch = start; batch < end; batch += REVIEW_CONCURRENCY) {
				const indices = Array.from(
					{ length: Math.min(REVIEW_CONCURRENCY, end - batch) },
					(_, i) => batch + i,
				);
				const current = await step.do(`batch:${batch}`, () =>
					coordinator.track(
						job.runId,
						indices.flatMap((index) => [
							{
								kind: plan.packages.length
									? ("dependabot" as const)
									: index < plan.carry
										? ("reconcile" as const)
										: index < plan.carry + plan.conventions
											? ("conventions" as const)
											: ("chunk" as const),
								id: `${job.runId}:task:${index}`,
							},
							{
								kind: "validation" as const,
								id: `${job.runId}:validate:${index}`,
							},
						]),
					),
				);
				if (!current) return { superseded: true };
				await Promise.all(
					indices.map(async (index) => {
						try {
							await this.reviewUnit(step, job, plan, index);
						} catch (error) {
							console.error({
								event: "review_task_failed",
								runId: job.runId,
								index,
								error: String(error),
							});
							await step.do(`task:${index}:failed`, async () => {
								await this.env.DOCS_FLUE_BUCKET.put(
									`${prefix}results/${index}.json`,
									JSON.stringify({
										index,
										path: "pr",
										findings: [],
										status: "failed",
										validation: "unnecessary",
									}),
								);
								return true;
							});
						}
					}),
				);
			}
			await step.do("continue", () =>
				coordinator.continue({
					job,
					phase: end < plan.total ? "review" : "publish",
					page: end < plan.total ? page + 1 : 0,
				}),
			);
			return { completed: end, total: plan.total };
		} catch (error) {
			console.error({
				event: "review_failed",
				runId: job.runId,
				page,
				phase,
				error: String(error),
			});
			await step.do("failure-report", () =>
				coordinator.publish(
					job.runId,
					0,
					`## Review incomplete\n\nReview of \`${job.headSha.slice(0, 12)}\` could not finish. Completed work is preserved; this is not a clean review. A codeowner can retry with \`/review\`.\n${commands}`,
				),
			);
			await step.do("finish-failed", () => coordinator.finish(job.runId));
			throw error;
		}
	}

	private async reviewUnit(
		step: WorkflowStep,
		job: ReviewJob,
		plan: Plan,
		index: number,
	): Promise<void> {
		const name = `task:${index}`;
		const id = `${job.runId}:${name}`;
		let cacheKey: string | undefined;
		let changedFiles: Array<{ filename: string; status: string }> = [];
		let result: StoredResult = {
			index,
			path: "pr",
			findings: [],
			status: "failed",
			validation: "unnecessary",
		};
		if (plan.packages.length) {
			const pkg = plan.packages[index];
			const outcome = await agentStep(
				step,
				name,
				"dependabot",
				id,
				{
					prNumber: job.number,
					prTitle: job.title,
					prBody: job.body,
					headSha: job.headSha,
					packages: [pkg],
				},
				"dependabot_review",
				DependabotReviewResultSchema,
			);
			if (
				outcome.ok &&
				outcome.value.packageReviews.some(
					(review) =>
						review.name === pkg.name &&
						review.from === pkg.from &&
						review.to === pkg.to,
				)
			) {
				const review = outcome.value.packageReviews.find(
					(review) =>
						review.name === pkg.name &&
						review.from === pkg.from &&
						review.to === pkg.to,
				)!;
				result = {
					...result,
					path: pkg.name,
					status: "complete",
					packageReport: [
						`### ${escapeMarkdown(pkg.name)}\n\n${escapeMarkdown(pkg.from)} → ${escapeMarkdown(pkg.to)} · ${escapeMarkdown(outcome.value.recommendation)}\n\n`,
						...review.whatChanged.map(
							(change) => `${escapeMarkdown(change)}\n\n`,
						),
						`${escapeMarkdown(review.repoUsage)}\n\n`,
						`Impact: ${escapeMarkdown(review.impact)}. ${escapeMarkdown(review.impactReason)}\n\n`,
					],
				};
			}
		} else if (index < plan.carry) {
			const previousPrefix = artifactPrefix({
				...job,
				runId: job.baseline!.runId,
			});
			const findings = await step.do(`${name}:prior`, () =>
				readJson<Finding[]>(
					this.env.DOCS_FLUE_BUCKET,
					`${previousPrefix}findings/${index}.json`,
				),
			);
			const changedPaths = await step.do(
				`${name}:changed`,
				{ timeout: "7 minutes" },
				() =>
					snapshotCommand<string[]>(
						this.env,
						job,
						"changed",
						0,
						1,
						findings.map((f) => f.path),
					),
			);
			const metadataChanged =
				job.baseline?.title !== job.title || job.baseline?.body !== job.body;
			const outcome =
				!plan.hasReplies && !changedPaths.length && !metadataChanged
					? {
							ok: true as const,
							value: {
								decisions: findings.map((finding) => ({
									id: finding.id,
									status: finding.status ?? ("active" as const),
									reason: finding.reviewerNote ?? "",
								})),
							},
						}
					: await agentStep(
							step,
							name,
							"reconcile",
							id,
							{ job, findings, changedPaths },
							"reconciliation",
							ReconciliationSchema,
						);
			result = { ...result, findings, status: "complete" };
			if (outcome.ok) {
				try {
					result.findings = applyReconciliation(
						findings,
						outcome.value.decisions,
						changedPaths,
						job.baseline?.title !== job.title ||
							job.baseline?.body !== job.body,
					);
				} catch {
					result.validation = "failed";
				}
			} else result.validation = "failed";
		} else if (index < plan.carry + plan.conventions) {
			const files = await step.do(
				`${name}:files`,
				{ timeout: "7 minutes" },
				() =>
					snapshotCommand<Array<{ filename: string; status: string }>>(
						this.env,
						job,
						"files",
						(index - plan.carry) * 100,
						100,
					),
			);
			changedFiles = files;
			const outcome = await agentStep(
				step,
				name,
				"conventions",
				id,
				{
					metadataChanged:
						(!job.baseline ||
							job.baseline.title !== job.title ||
							job.baseline.body !== job.body) &&
						index === plan.carry,
					pullRequest: { number: job.number, title: job.title },
					description: job.body,
					prTemplate: plan.template,
					renamedDocFiles: files
						.filter(
							(f) =>
								f.status === "removed" &&
								/^src\/content\/docs\/.+\.mdx$/.test(f.filename),
						)
						.map((f) => f.filename),
					changedFiles: files,
				},
				"conventions_review",
				ConventionsReviewSchema,
			);
			if (outcome.ok)
				result = {
					...result,
					status: "complete",
					findings: await identifyFindings(
						outcome.value.findings.map((f) => ({
							...f,
							category: "conventions" as const,
						})),
					),
				};
		} else {
			const unit = await step.do(
				`${name}:input`,
				{ timeout: "7 minutes" },
				() => readUnit(this.env, job, index - plan.carry - plan.conventions),
			);
			result.path = unit.filename;
			changedFiles = [{ filename: unit.filename, status: unit.status }];
			cacheKey = `review-cache/2.0.3-1/pr-${job.number}/${job.baseSha}/${plan.snapshot.diffBase}/${job.headSha}/${unit.index}.json`;
			const cached =
				!job.full &&
				(await step.do(`${name}:cache`, async () => {
					const object = await this.env.DOCS_FLUE_BUCKET.get(cacheKey!);
					return object ? object.json<StoredResult>() : null;
				}));
			if (cached) {
				await step.do(`${name}:reuse`, async () => {
					await this.env.DOCS_FLUE_BUCKET.put(
						`${artifactPrefix(job)}results/${index}.json`,
						JSON.stringify({ ...cached, index }),
					);
					return true;
				});
				return;
			}
			const outcome = await agentStep(
				step,
				name,
				"chunk",
				id,
				{
					job,
					unit,
					repoInstructions: plan.repoInstructions,
					comparisonBaseSha: plan.snapshot.diffBase,
					mergeBaseSha: plan.snapshot.mergeBase,
				},
				"review",
				FindingsSchema,
			);
			if (outcome.ok)
				result = {
					...result,
					status: "complete",
					findings: await identifyFindings(outcome.value.findings, unit),
				};
		}
		if (result.findings.length && index >= plan.carry) {
			const validation = await agentStep(
				step,
				`${name}:validation`,
				"validation",
				`${job.runId}:validate:${index}`,
				{
					pullRequest: {
						number: job.number,
						title: job.title,
						base: job.baseRef,
						head: job.headSha,
					},
					headSha: job.headSha,
					baseSha: plan.snapshot.diffBase,
					prBaseSha: plan.snapshot.mergeBase,
					streamLabel: "review",
					findings: result.findings,
					prBody: job.body,
					prTemplate: plan.template,
					changedFiles,
				},
				"review_validation",
				ReviewValidationSchema,
			);
			if (validation.ok) {
				const invalid = new Set(
					validation.value.decisions
						.filter((d) => d.verdict === "invalid")
						.map((d) => d.id),
				);
				result.findings = result.findings.filter((f) => !invalid.has(f.id));
				result.validation = validation.value.decisions.some(
					(decision) => decision.verdict === "unverified",
				)
					? "failed"
					: "complete";
			} else result.validation = "failed";
		}
		result.findings = result.findings.map((finding) => ({
			...finding,
			commitSha:
				finding.commitSha ??
				(finding.side === "base" ? plan.snapshot.diffBase : job.headSha),
		}));
		await step.do(`${name}:save`, async () => {
			await this.env.DOCS_FLUE_BUCKET.put(
				`${artifactPrefix(job)}results/${index}.json`,
				JSON.stringify(result),
			);
			if (
				cacheKey &&
				result.status === "complete" &&
				result.validation !== "failed"
			)
				await this.env.DOCS_FLUE_BUCKET.put(cacheKey, JSON.stringify(result));
			return { status: result.status, findings: result.findings.length };
		});
	}

	private async publishPage(
		step: WorkflowStep,
		job: ReviewJob,
		page: number,
		plan: Plan,
	) {
		const prefix = artifactPrefix(job);
		const coordinator = this.env.REVIEW_COORDINATOR.getByName(
			`pr-${job.number}`,
		);
		let state: ReportState = await step.do("report-state", async () =>
			page === 0
				? {
						buffer: "",
						part: 0,
						failed: 0,
						unvalidated: 0,
						findings: 0,
						complete: 0,
						archive: [] as Finding[],
						batches: 0,
					}
				: readJson<ReportState>(
						this.env.DOCS_FLUE_BUCKET,
						`${prefix}render/${page - 1}.json`,
					),
		);
		const end = Math.min((page + 1) * PAGE_SIZE, plan.total);
		for (let index = page * PAGE_SIZE; index < end; index++) {
			const result = await step.do(`load:${index}`, () =>
				readJson<StoredResult>(
					this.env.DOCS_FLUE_BUCKET,
					`${prefix}results/${index}.json`,
				),
			);
			result.findings = await step.do(`deduplicate:${index}`, () =>
				coordinator.deduplicate(job.runId, index, result.findings),
			);
			for (const finding of result.findings) {
				state.archive.push(finding);
				if (state.archive.length === 25) {
					const batch = state.batches;
					await step.do(`archive:${batch}`, async () => {
						await this.env.DOCS_FLUE_BUCKET.put(
							`${prefix}findings/${batch}.json`,
							JSON.stringify(state.archive),
						);
						return true;
					});
					state.archive = [];
					state.batches++;
				}
			}
			if (result.status === "failed") state.failed++;
			else state.complete++;
			if (result.validation === "failed") state.unvalidated++;
			const blocks = result.packageReport
				? result.packageReport
				: result.findings.map((finding) =>
						renderFinding(finding, job, plan.snapshot.diffBase),
					);
			if (result.validation === "failed")
				blocks.unshift(
					`Validation is incomplete for ${escapeMarkdown(result.path)}, task ${index + 1}. Treat the following findings as unverified.\n\n`,
				);
			if (result.status === "failed")
				blocks.push(
					`Review incomplete for ${escapeMarkdown(result.path)}, task ${index + 1}.\n\n`,
				);
			state.findings += result.findings.filter(
				(f) => f.status !== "ignored",
			).length;
			for (let blockIndex = 0; blockIndex < blocks.length; blockIndex++) {
				const appended = appendReport(state.buffer, blocks[blockIndex]);
				if (appended.flush !== undefined) {
					await step.do(`part:${index}:${blockIndex}`, async () => {
						await this.env.DOCS_FLUE_BUCKET.put(
							`${prefix}parts/${state.part}.md`,
							appended.flush!,
						);
						return true;
					});
					state.part++;
				}
				state.buffer = appended.buffer;
			}
		}
		await step.do("save-render", async () => {
			await this.env.DOCS_FLUE_BUCKET.put(
				`${prefix}render/${page}.json`,
				JSON.stringify(state),
			);
			return true;
		});
		if (end < plan.total) {
			await step.do("continue-render", () =>
				coordinator.continue({ job, phase: "publish", page: page + 1 }),
			);
			return { rendered: end };
		}
		// Each report part remains below GitHub's limit. Publishing many parts is
		// independently checkpointed; the normal case stays one summary comment.
		await step.do("save-last-part", async () => {
			await this.env.DOCS_FLUE_BUCKET.put(
				`${prefix}parts/${state.part}.md`,
				state.buffer,
			);
			return true;
		});
		if (state.archive.length) {
			await step.do("archive-last", async () => {
				await this.env.DOCS_FLUE_BUCKET.put(
					`${prefix}findings/${state.batches}.json`,
					JSON.stringify(state.archive),
				);
				return true;
			});
			state.batches++;
			state.archive = [];
		}
		await step.do("final-report-state", async () => {
			await this.env.DOCS_FLUE_BUCKET.put(
				`${prefix}report.json`,
				JSON.stringify(state),
			);
			return true;
		});
		await step.do("deliver", () =>
			coordinator.continue({ job, phase: "deliver", page: 0 }),
		);
		return { rendered: end };
	}

	private async deliverPage(
		step: WorkflowStep,
		job: ReviewJob,
		page: number,
		plan: Plan,
	) {
		const prefix = artifactPrefix(job);
		const coordinator = this.env.REVIEW_COORDINATOR.getByName(
			`pr-${job.number}`,
		);
		const state = await step.do("report", () =>
			readJson<ReportState>(this.env.DOCS_FLUE_BUCKET, `${prefix}report.json`),
		);
		const status =
			state.failed || state.unvalidated
				? "Review incomplete"
				: "Review complete";
		const fallback = plan.snapshot.incrementalFallback
			? "The previously reviewed commit could not be fetched, so this pass reviewed the full PR diff. Existing findings and dismissals were carried forward.\n\n"
			: "";
		const summary = `## ${status}\n\nCommit \`${job.headSha.slice(0, 12)}\` · ${plan.snapshot.files} files in the PR; ${plan.snapshot.changedFiles} changed in this pass; ${plan.snapshot.excluded} generated, vendored, or binary files excluded from this pass.\n\n${fallback}${state.complete}/${plan.total} review tasks completed; ${state.failed} failed; ${state.unvalidated} tasks have unverified findings. ${state.findings} findings.\n\n`;
		const previousParts = await step.do("previous-parts", () =>
			coordinator.visibleParts(),
		);
		const lastPosition = Math.max(previousParts, state.part);
		const end = Math.min((page + 1) * PAGE_SIZE, lastPosition + 1);
		for (let position = page * PAGE_SIZE; position < end; position++) {
			// Publish overflow first; the primary summary becomes complete last.
			const part = position === lastPosition ? 0 : position + 1;
			await step.do(`publish:${part}`, async () => {
				if (part > state.part)
					return coordinator.publish(
						job.runId,
						part,
						`This overflow comment is no longer needed. See the main review summary for commit \`${job.headSha.slice(0, 12)}\`.`,
					);
				const object = await this.env.DOCS_FLUE_BUCKET.get(
					`${prefix}parts/${part}.md`,
				);
				if (!object) throw new Error("Missing rendered report part");
				const body = await object.text();
				return coordinator.publish(
					job.runId,
					part,
					(part === 0
						? summary + commands
						: `## Review findings (continued ${part})\n\n`) +
						body +
						(state.part
							? `\nReview has ${state.part + 1} comment parts for this commit.\n`
							: ""),
				);
			});
		}
		if (end <= lastPosition) {
			await step.do("continue-delivery", () =>
				coordinator.continue({ job, phase: "deliver", page: page + 1 }),
			);
			return { published: end };
		}
		await step.do("finish", () =>
			coordinator.finish(
				job.runId,
				state.failed || state.unvalidated
					? undefined
					: {
							runId: job.runId,
							headSha: job.headSha,
							baseSha: job.baseSha,
							reviewedAt: plan.startedAt,
							batches: state.batches,
							title: job.title,
							body: job.body,
						},
				state.part,
			),
		);
		if (job.triggerCommentId && this.env.DOCS_FLUE_REVIEW_MODE === "comment")
			await step.do("reaction", async () => {
				const token = await getInstallationToken(this.env);
				await addReactionToComment(
					token,
					job.triggerCommentId!,
					state.failed || state.unvalidated ? "-1" : "+1",
				);
				return true;
			});
		return {
			complete: state.failed === 0 && state.unvalidated === 0,
			findings: state.findings,
		};
	}
}
