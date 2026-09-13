import { DurableObject } from "cloudflare:workers";
import { init } from "@flue/runtime";
import {
	getInstallationToken,
	getPullRequest,
	findBotComment,
	postComment,
	updateIssueComment,
} from "./github";
import { REVIEW_AGENTS, type AgentKind } from "./review-agents";
import { reviewSandbox } from "./snapshot";
import type {
	Baseline,
	Finding,
	ReviewJob,
	ReviewPageParams,
} from "./review-domain";

const MARKER = "<!-- cloudflare-docs-flue-code-review -->";
interface ActiveRun {
	job: ReviewJob;
	workflowId: string;
	finished: boolean;
}
interface ActiveAgent {
	kind: AgentKind;
	id: string;
}

/** One coordinator per PR. All mutations are serialized; external I/O is never
 * held inside blockConcurrencyWhile. The alarm is a durable workflow outbox. */
export class ReviewCoordinator extends DurableObject<Env> {
	private tail: Promise<unknown> = Promise.resolve();
	private serial<T>(action: () => Promise<T>): Promise<T> {
		const result = this.tail.then(action);
		this.tail = result.catch(() => {});
		return result;
	}

	request(job: ReviewJob): Promise<boolean> {
		return this.serial(async () => {
			const token = await getInstallationToken(this.env);
			const pr = await getPullRequest(token, job.number);
			if (pr.state !== "open" || pr.head.sha !== job.headSha) return false;
			if (await this.ctx.storage.get(`seen:${job.runId}`)) return false;
			const previous = await this.ctx.storage.get<ActiveRun>("active");
			if (previous?.job.headSha === job.headSha && !job.force) return false;
			const baseline = await this.ctx.storage.get<Baseline>("baseline");
			if (baseline) job = { ...job, baseline };
			const next: ReviewPageParams = { job, page: 0, phase: "prepare" };
			await this.ctx.storage.setAlarm(Date.now() + 1000);
			await this.ctx.storage.put({
				active: { job, workflowId: this.workflowId(next), finished: false },
				pending: next,
				[`seen:${job.runId}`]: true,
				...(previous ? { [`retired:${previous.job.runId}`]: previous } : {}),
			});
			return true;
		});
	}

	async isCurrent(runId: string): Promise<boolean> {
		const active = await this.ctx.storage.get<ActiveRun>("active");
		return active?.job.runId === runId && !active.finished;
	}

	cancel(): Promise<void> {
		return this.serial(async () => {
			const active = await this.ctx.storage.get<ActiveRun>("active");
			if (!active || active.finished) return;
			await this.ctx.storage.setAlarm(Date.now() + 1000);
			await this.ctx.storage.put({
				active: { ...active, finished: true },
				[`retired:${active.job.runId}`]: active,
			});
			await this.ctx.storage.delete("pending");
		});
	}

	/** Register before dispatch so supersession can abort every active agent. */
	track(runId: string, agents: ActiveAgent[]): Promise<boolean> {
		return this.serial(async () => {
			if (!(await this.isCurrent(runId))) return false;
			await this.ctx.storage.put(`agents:${runId}`, agents);
			return true;
		});
	}

	continue(params: ReviewPageParams): Promise<boolean> {
		return this.serial(async () => {
			if (!(await this.isCurrent(params.job.runId))) return false;
			await this.ctx.storage.setAlarm(Date.now() + 1000);
			await this.ctx.storage.put({
				pending: params,
				active: {
					job: params.job,
					workflowId: this.workflowId(params),
					finished: false,
				},
			});
			return true;
		});
	}

	private workflowId(params: ReviewPageParams): string {
		return `${params.job.runId}-${params.phase}-${params.page}`;
	}

	alarm(): Promise<void> {
		return this.serial(async () => {
			// Re-arm before network I/O; startup/termination failures remain retryable.
			await this.ctx.storage.setAlarm(Date.now() + 30_000);
			const pending = await this.ctx.storage.get<ReviewPageParams>("pending");
			if (pending && (await this.isCurrent(pending.job.runId))) {
				const id = this.workflowId(pending);
				try {
					await this.env.REVIEW_ORCHESTRATOR.create({ id, params: pending });
				} catch (error) {
					// An interrupted create may already have succeeded. Confirm that
					// exact instance exists before acknowledging the outbox entry.
					const existing = await this.env.REVIEW_ORCHESTRATOR.get(id);
					try {
						if ((await existing.status()).status === "unknown") throw error;
					} catch {
						throw error;
					}
				}
				await this.ctx.storage.delete("pending");
			}
			const retired = await this.ctx.storage.list<ActiveRun>({
				prefix: "retired:",
				limit: 1,
			});
			for (const [key, run] of retired) {
				try {
					const agents =
						(await this.ctx.storage.get<ActiveAgent[]>(
							`agents:${run.job.runId}`,
						)) ?? [];
					await Promise.all(
						agents.map(({ kind, id }) =>
							init(REVIEW_AGENTS[kind], { id }).abort(),
						),
					);
					const workflow = await this.env.REVIEW_ORCHESTRATOR.get(
						run.workflowId,
					);
					const status = await workflow.status().catch(() => null);
					if (
						!run.finished &&
						status &&
						!["complete", "errored", "terminated", "unknown"].includes(
							status.status,
						)
					)
						await workflow.terminate();
					await reviewSandbox(this.env, run.job).destroy();
					await this.ctx.storage.delete([key, `agents:${run.job.runId}`]);
				} catch (error) {
					console.error({
						event: "retirement_retry",
						runId: run.job.runId,
						error: String(error),
					});
				}
			}
			const active = await this.ctx.storage.get<ActiveRun>("active");
			if (active && !active.finished) {
				const workflow = await this.env.REVIEW_ORCHESTRATOR.get(
					active.workflowId,
				);
				const status = await workflow.status();
				if (["errored", "terminated", "complete"].includes(status.status)) {
					await this.publishCurrent(
						active,
						0,
						"## Review incomplete\n\nThe review stopped before completion. This is not a clean review. A codeowner can retry with `/review`.",
					);
					await this.ctx.storage.put({
						active: { ...active, finished: true },
						[`retired:${active.job.runId}`]: active,
					});
				}
			}
			if (
				(!active || active.finished) &&
				!(await this.ctx.storage.list({ prefix: "retired:", limit: 1 })).size
			)
				await this.ctx.storage.deleteAlarm();
		});
	}

	/** Publishing and accepting a newer run share the same serial queue. */
	publish(runId: string, part: number, body: string): Promise<number | null> {
		return this.serial(async () => {
			const active = await this.ctx.storage.get<ActiveRun>("active");
			if (!active || active.job.runId !== runId || active.finished) return null;
			return this.publishCurrent(active, part, body);
		});
	}

	private async publishCurrent(
		active: ActiveRun,
		part: number,
		body: string,
	): Promise<number | null> {
		const runId = active.job.runId;
		const token = await getInstallationToken(this.env);
		const pr = await getPullRequest(token, active.job.number);
		if (pr.head.sha !== active.job.headSha || pr.state !== "open") return null;
		const marker =
			part === 0 ? MARKER : `<!-- docs-flue-review-part:${part} -->`;
		const content = `${marker}\n<!-- reviewed-head-sha: ${active.job.headSha} -->\n${body}`;
		if (this.env.DOCS_FLUE_REVIEW_MODE !== "comment") {
			console.log({ event: "review_report", runId, part, body: content });
			return null;
		}
		let commentId = await this.ctx.storage.get<number>(`comment:${part}`);
		if (!commentId) {
			const existing = await findBotComment(
				token,
				active.job.number,
				Number(this.env.DOCS_FLUE_GITHUB_APP_ID),
				marker,
			);
			commentId = existing?.id;
		}
		if (commentId && !(await updateIssueComment(token, commentId, content)))
			commentId = undefined;
		if (!commentId) {
			commentId = await postComment(token, active.job.number, content);
		}
		await this.ctx.storage.put(`comment:${part}`, commentId);
		if (part > (await this.visibleParts()))
			await this.ctx.storage.put("visibleParts", part);
		return commentId;
	}

	async visibleParts(): Promise<number> {
		return (await this.ctx.storage.get<number>("visibleParts")) ?? 0;
	}

	finish(runId: string, baseline?: Baseline, lastPart?: number): Promise<void> {
		return this.serial(async () => {
			const active = await this.ctx.storage.get<ActiveRun>("active");
			if (!active || active.job.runId !== runId) return;
			await this.ctx.storage.put({
				active: { ...active, finished: true },
				[`retired:${runId}`]: { ...active, finished: true },
			});
			await this.ctx.storage.setAlarm(Date.now() + 1000);
			if (baseline) await this.ctx.storage.put("baseline", baseline);
			if (lastPart !== undefined)
				await this.ctx.storage.put("visibleParts", lastPart);
		});
	}

	async priorFindings(
		runId: string,
		path: string,
		cursor?: string,
	): Promise<{ findings: Finding[]; cursor?: string }> {
		const prefix = `known:${runId}:${await this.pathKey(path)}:`;
		if (cursor && !cursor.startsWith(prefix))
			throw new Error("Invalid finding cursor");
		const page = await this.ctx.storage.list<Finding>({
			prefix,
			startAfter: cursor,
			limit: 25,
		});
		return {
			findings: [...page.values()],
			...(page.size === 25 ? { cursor: [...page.keys()].at(-1)! } : {}),
		};
	}

	private async pathKey(path: string): Promise<string> {
		const hash = await crypto.subtle.digest(
			"SHA-256",
			new TextEncoder().encode(path),
		);
		return Array.from(new Uint8Array(hash), (byte) =>
			byte.toString(16).padStart(2, "0"),
		).join("");
	}

	/** Stable deduplication with replay ownership: retrying the owning task
	 * returns the same findings, never loses them after an interrupted write. */
	deduplicate(
		runId: string,
		task: number,
		findings: Finding[],
	): Promise<Finding[]> {
		return this.serial(async () => {
			const result: Finding[] = [];
			const seen = new Set<string>();
			for (const finding of findings) {
				if (seen.has(finding.id)) continue;
				seen.add(finding.id);
				const key = `finding:${runId}:${finding.id}`;
				const owner = await this.ctx.storage.get<number>(key);
				if (owner === undefined) await this.ctx.storage.put(key, task);
				if (owner === undefined || owner === task) {
					result.push(finding);
					await this.ctx.storage.put(
						`known:${runId}:${await this.pathKey(finding.path)}:${finding.id}`,
						finding,
					);
				}
			}
			return result;
		});
	}
}
