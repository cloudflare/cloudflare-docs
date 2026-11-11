import { beforeEach, describe, expect, it, vi } from "vitest";
import type { AgentStepResult } from "../agents/agent-step";
import type { SpecialistResult } from "./types";
import { R2Fake } from "./testing/r2-fake";
import { RUN_ARTIFACTS, type RunCtx } from "./run-context";
import {
	emptyState,
	getRunArtifact,
	putRunArtifact,
	updateState,
} from "./state";
import {
	acceptSpecialist,
	buildRunSummary,
	cleanupRun,
	failRun,
	finalizeRun,
	prepareJudge,
	publishRun,
} from "./run-finish";

const github = vi.hoisted(() => ({
	getInstallationToken: vi.fn(),
	getPullRequest: vi.fn(),
	getIssueComments: vi.fn(),
	createIssueComment: vi.fn(),
	updateIssueComment: vi.fn(),
	addReactionToComment: vi.fn(),
	removeReactionFromComment: vi.fn(),
}));
vi.mock("../github", () => github);

const plan = {
	tier: "inline",
	fullReview: false,
	targets: {
		code: {
			specialist: "code",
			files: ["src/example.ts"],
			lines: { "src/example.ts": [1] },
			fingerprints: { "src/example.ts:1": "fingerprint" },
			estimatedTokens: 1,
		},
	},
	skipped: { style: "no docs" },
	notReviewed: [],
	totalEstimatedTokens: 1,
	conventionsInputHash: "metadata",
} as const;
function context(replay = false): { ctx: RunCtx; r2: R2Fake } {
	const r2 = new R2Fake();
	return {
		r2,
		ctx: {
			env: {
				DOCS_FLUE_BUCKET: r2.asBucket(),
				REVIEW_ORCHESTRATOR: {} as Workflow<any>,
			},
			params: {
				number: 1,
				headSha: "head",
				trigger: "auto",
				fullReview: false,
				...(replay ? { replay: true as const } : {}),
			},
			runId: "run",
			mode: "comment",
		},
	};
}
async function seed(ctx: RunCtx) {
	const write = (name: string, value: unknown) =>
		putRunArtifact(ctx.env.DOCS_FLUE_BUCKET, 1, "run", name, value);
	await Promise.all([
		write(RUN_ARTIFACTS.plan, plan),
		write(RUN_ARTIFACTS.meta, {
			pr: {
				number: 1,
				title: "title",
				body: "body",
				author: "author",
				baseRef: "production",
				baseSha: "base",
				headSha: "head",
			},
			startedAt: "now",
		}),
		write(RUN_ARTIFACTS.patchFiles, [
			{
				path: "src/example.ts",
				status: "modified",
				additions: 1,
				deletions: 0,
				disposition: "reviewable",
				hunks: [
					{
						header: "@@ -0,0 +1 @@",
						oldStart: 0,
						newStart: 1,
						lines: [{ kind: "add", newLine: 1, text: "bad()" }],
					},
				],
			},
		]),
		write(RUN_ARTIFACTS.prior, []),
		write(RUN_ARTIFACTS.relocated, { untouched: [], touched: [] }),
		write(RUN_ARTIFACTS.comments, []),
	]);
}
const failed = {
	ok: false,
	error: "agent failed",
} as AgentStepResult<SpecialistResult>;

describe("run finish", () => {
	beforeEach(() => vi.clearAllMocks());
	it("persists no findings for a failed specialist", async () => {
		const { ctx } = context();
		await seed(ctx);
		expect(await acceptSpecialist(ctx, "code", failed)).toMatchObject({
			ok: false,
			accepted: 0,
		});
		expect(
			await getRunArtifact(
				ctx.env.DOCS_FLUE_BUCKET,
				1,
				"run",
				RUN_ARTIFACTS.findings("code"),
			),
		).toEqual([]);
	});

	it("prepares judge work and finalizes skipped, failed, and successful judges", async () => {
		const { ctx } = context();
		await seed(ctx);
		await acceptSpecialist(ctx, "code", {
			ok: true,
			value: {
				findings: [
					{ path: "src/example.ts", line: 1, title: "Bug", explanation: "bad" },
				],
				summary: "",
			},
		});
		expect(
			await prepareJudge(ctx, {
				code: { ok: true, accepted: 1, droppedOffTarget: 0 },
			}),
		).toMatchObject({ judgeNeeded: true, newFindings: 1 });
		for (const judge of [
			null,
			{ ok: false, error: "judge failed" } as any,
			{
				ok: true,
				value: {
					new_findings: [
						{
							id: (await getRunArtifact<any[]>(
								ctx.env.DOCS_FLUE_BUCKET,
								1,
								"run",
								RUN_ARTIFACTS.findings("code"),
							))![0].id,
							decision: "keep",
							reason: "valid",
						},
					],
					prior_findings: [],
				},
			} as any,
		]) {
			const summary = await finalizeRun(ctx, judge, {
				code: { ok: true, accepted: 1, droppedOffTarget: 0 },
			});
			expect(summary.committed).toBe(false);
		}
	});

	it("does not write replay state and keeps replay artifacts", async () => {
		const { ctx, r2 } = context(true);
		await seed(ctx);
		await putRunArtifact(
			ctx.env.DOCS_FLUE_BUCKET,
			1,
			"run",
			RUN_ARTIFACTS.judgeWork,
			{ newFindings: [], touched: [], carried: [], dismissedContext: [] },
		);
		await finalizeRun(ctx, null, {});
		await cleanupRun(ctx);
		expect(
			await getRunArtifact(r2.asBucket(), 1, "run", RUN_ARTIFACTS.comment),
		).not.toBeNull();
		expect(await r2.get("reviews/v2/pr-1/state.json")).toBeUndefined();
	});

	it("reports lost ownership without committing", async () => {
		const { ctx, r2 } = context();
		await seed(ctx);
		await putRunArtifact(
			ctx.env.DOCS_FLUE_BUCKET,
			1,
			"run",
			RUN_ARTIFACTS.judgeWork,
			{ newFindings: [], touched: [], carried: [], dismissedContext: [] },
		);
		const summary = await finalizeRun(ctx, null, {});
		expect(summary.committed).toBe(false);
		expect(
			await (await r2.get("reviews/v2/pr-1/state.json"))?.json(),
		).not.toMatchObject({ lastCompleted: { runId: "run" } });
	});

	it("classifies summary outcomes", () => {
		const base = {
			pr: 1,
			headSha: "head",
			runId: "run",
			startedAt: "before",
			finishedAt: "now",
			findings: {
				active: 0,
				resolved: 0,
				dismissed: 0,
				newKept: 0,
				newDropped: 0,
			},
		};
		expect(
			buildRunSummary({ ...base, publish: { published: true } }).outcome,
		).toBe("published");
		expect(
			buildRunSummary({ ...base, publish: { published: false, reason: "log" } })
				.outcome,
		).toBe("logged");
		expect(
			buildRunSummary({ ...base, publish: { published: false } }).outcome,
		).toBe("skipped");
		expect(
			buildRunSummary({
				...base,
				publish: { published: false, reason: "head_changed" },
			}),
		).toMatchObject({ outcome: "skipped", reason: "head_changed" });
		expect(
			buildRunSummary({
				...base,
				finalize: { committed: false, findings: base.findings },
			}).outcome,
		).toBe("superseded");
		expect(buildRunSummary({ ...base, failed: true }).outcome).toBe("failed");
	});

	it("guards tracked publishing by active state and current head", async () => {
		const { ctx } = context();
		await seed(ctx);
		await putRunArtifact(
			ctx.env.DOCS_FLUE_BUCKET,
			1,
			"run",
			RUN_ARTIFACTS.comment,
			{ markdown: "comment" },
		);
		expect(await publishRun(ctx)).toMatchObject({ reason: "superseded" });
		await updateState(ctx.env.DOCS_FLUE_BUCKET, 1, () => ({
			...emptyState(1),
			lastCompleted: { runId: "run", headSha: "head", completedAt: "now" },
		}));
		github.getInstallationToken.mockResolvedValue("token");
		github.getPullRequest.mockResolvedValue({ head: { sha: "new-head" } });
		expect(await publishRun(ctx)).toMatchObject({ reason: "head_changed" });
	});

	it("posts a replay comment without claiming state", async () => {
		const { ctx, r2 } = context(true);
		await seed(ctx);
		await putRunArtifact(
			ctx.env.DOCS_FLUE_BUCKET,
			1,
			"run",
			RUN_ARTIFACTS.comment,
			{ markdown: "comment" },
		);
		github.getInstallationToken.mockResolvedValue("token");
		github.getPullRequest.mockResolvedValue({ head: { sha: "head" } });
		github.getIssueComments.mockResolvedValue([]);
		github.createIssueComment.mockResolvedValue(42);
		expect(await publishRun(ctx)).toEqual({ published: true });
		expect(github.createIssueComment).toHaveBeenCalledWith(
			"token",
			1,
			"comment",
		);
		expect(await r2.get("reviews/v2/pr-1/state.json")).toBeUndefined();

		github.getPullRequest.mockResolvedValue({ head: { sha: "new-head" } });
		expect(await publishRun(ctx)).toMatchObject({ reason: "head_changed" });
	});

	it("prints a replay comment in log mode without calling GitHub", async () => {
		const { ctx } = context(true);
		await seed(ctx);
		await putRunArtifact(
			ctx.env.DOCS_FLUE_BUCKET,
			1,
			"run",
			RUN_ARTIFACTS.comment,
			{ markdown: "comment" },
		);
		const log = vi.spyOn(console, "log").mockImplementation(() => {});
		try {
			expect(await publishRun({ ...ctx, mode: "log" })).toEqual({
				published: false,
				reason: "log",
			});
			expect(log).toHaveBeenCalledWith("comment");
		} finally {
			log.mockRestore();
		}
		expect(github.getInstallationToken).not.toHaveBeenCalled();
	});

	it("releases an active run on failure and cleanup removes normal artifacts", async () => {
		const { ctx } = context();
		await seed(ctx);
		await updateState(ctx.env.DOCS_FLUE_BUCKET, 1, () => ({
			...emptyState(1),
			activeRun: {
				runId: "run",
				workflowInstanceId: "run",
				headSha: "head",
				startedAt: "now",
				agentIds: [],
			},
		}));
		await failRun(ctx, "failed");
		await cleanupRun(ctx);
		expect(
			(await updateState(ctx.env.DOCS_FLUE_BUCKET, 1, (state) => state))
				?.activeRun,
		).toBeUndefined();
		expect(
			await getRunArtifact(
				ctx.env.DOCS_FLUE_BUCKET,
				1,
				"run",
				RUN_ARTIFACTS.plan,
			),
		).toBeNull();
	});

	it("replaces a failed replay's in-progress note without writing state", async () => {
		const { ctx, r2 } = context(true);
		await seed(ctx);
		github.getInstallationToken.mockResolvedValue("token");
		github.getIssueComments.mockResolvedValue([
			{
				id: 10,
				body: "<!-- cloudflare-docs-flue-code-review -->\n<!-- status: pending -->",
				user: { type: "Bot" },
			},
		]);
		await failRun(ctx, "failed");
		expect(github.updateIssueComment).toHaveBeenCalledWith(
			"token",
			10,
			expect.stringContaining("❌ Review failed"),
		);
		expect(await r2.get("reviews/v2/pr-1/state.json")).toBeUndefined();
	});
});
