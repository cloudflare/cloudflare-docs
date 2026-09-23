import { beforeEach, describe, expect, it, vi } from "vitest";
import { R2Fake } from "./testing/r2-fake";
import type { RunCtx } from "./run-context";
import { RUN_ARTIFACTS } from "./run-context";
import { readPatchArtifactName } from "./agent-input";
import {
	admitRun,
	postPlaceholder,
	prepareRun,
	supersedeRun,
} from "./run-start";
import { getRunArtifact, putRunArtifact, updateState } from "./state";

const github = vi.hoisted(() => ({
	getInstallationToken: vi.fn(),
	getPullRequest: vi.fn(),
	getPullRequestFiles: vi.fn(),
	getIssueComments: vi.fn(),
	listPullRequestReviews: vi.fn(),
	listPullRequestReviewComments: vi.fn(),
	createIssueComment: vi.fn(),
	getRepoFileContent: vi.fn(),
	updateIssueComment: vi.fn(),
}));
const abortRunAgents = vi.hoisted(() => vi.fn());
vi.mock("../github", () => github);
vi.mock("./run-agents", () => ({ abortRunAgents }));
function context(overrides: Partial<RunCtx["params"]> = {}) {
	const r2 = new R2Fake();
	const ctx: RunCtx = {
		env: {
			DOCS_FLUE_BUCKET: r2.asBucket(),
			REVIEW_ORCHESTRATOR: { get: vi.fn() } as unknown as Workflow<any>,
		},
		params: {
			number: 1,
			headSha: "head",
			trigger: "auto",
			fullReview: false,
			...overrides,
		},
		runId: "run",
		mode: "comment",
	};
	return { ctx, r2 };
}
const pr = (overrides = {}) => ({
	state: "open",
	draft: false,
	head: { sha: "head" },
	...overrides,
});
describe("run start", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		github.getInstallationToken.mockResolvedValue("token");
		github.getPullRequest.mockResolvedValue({
			...pr(),
			number: 1,
			title: "title",
			body: "body",
			user: { login: "author" },
			base: { ref: "production", sha: "base" },
		});
		github.getPullRequestFiles.mockResolvedValue([
			{
				filename: "src/content/docs/x.mdx",
				status: "modified",
				additions: 1,
				deletions: 0,
				changes: 1,
				patch: "@@ -0,0 +1 @@\n+text\n",
			},
		]);
		github.getIssueComments.mockResolvedValue([]);
		github.listPullRequestReviews.mockResolvedValue([]);
		github.listPullRequestReviewComments.mockResolvedValue([]);
	});
	it.each([
		[pr({ state: "closed" }), {}, "closed"],
		[pr({ head: { sha: "other" } }), {}, "stale_head"],
		[pr({ draft: true }), {}, "draft"],
	] as const)("rejects admission gates", async (pull, params, reason) => {
		const { ctx } = context(params);
		github.getPullRequest.mockResolvedValue(pull);
		expect(await admitRun(ctx)).toEqual({ proceed: false, reason });
	});
	it("rejects automatic reviews when disabled", async () => {
		const { ctx, r2 } = context();
		await r2.put(
			"diffs/pr-1/auto-review-disabled.json",
			JSON.stringify({ disabled: true }),
		);
		expect(await admitRun(ctx)).toEqual({
			proceed: false,
			reason: "auto_review_disabled",
		});
	});
	it("allows replay of a closed PR without state writes", async () => {
		const { ctx, r2 } = context({ replay: true });
		github.getPullRequest.mockResolvedValue(pr({ state: "closed" }));
		expect(await admitRun(ctx)).toEqual({ proceed: true });
		expect(await r2.get("reviews/v2/pr-1/state.json")).toBeUndefined();
	});
	it("claims the run and reports a superseded owner", async () => {
		const { ctx } = context();
		await updateState(ctx.env.DOCS_FLUE_BUCKET, 1, (state) => ({
			...state,
			activeRun: {
				runId: "old",
				workflowInstanceId: "old",
				headSha: "old",
				startedAt: "now",
				agentIds: ["old:code"],
			},
		}));
		const result = await admitRun(ctx);
		expect(result).toMatchObject({
			proceed: true,
			superseded: { runId: "old" },
		});
	});
	it("never throws while superseding unavailable work", async () => {
		const { ctx } = context();
		(ctx.env.REVIEW_ORCHESTRATOR.get as any).mockRejectedValue(
			new Error("gone"),
		);
		abortRunAgents.mockRejectedValue(new Error("gone"));
		await expect(
			supersedeRun(ctx, {
				runId: "old",
				workflowInstanceId: "old",
				headSha: "old",
				startedAt: "now",
				agentIds: ["old:code"],
			}),
		).resolves.toBeUndefined();
	});
	it("prepares artifacts and per-file read-patch data", async () => {
		const { ctx } = context();
		const summary = await prepareRun(ctx);
		expect(summary).toMatchObject({
			files: 1,
			reviewable: 1,
			fullReview: false,
		});
		for (const name of [
			RUN_ARTIFACTS.meta,
			RUN_ARTIFACTS.plan,
			RUN_ARTIFACTS.patchFiles,
			RUN_ARTIFACTS.prior,
			RUN_ARTIFACTS.relocated,
			RUN_ARTIFACTS.comments,
		])
			expect(
				await getRunArtifact(ctx.env.DOCS_FLUE_BUCKET, 1, "run", name),
			).not.toBeNull();
		expect(
			await getRunArtifact(
				ctx.env.DOCS_FLUE_BUCKET,
				1,
				"run",
				readPatchArtifactName("src/content/docs/x.mdx"),
			),
		).toMatchObject({ file: { path: "src/content/docs/x.mdx" } });
	});
	it("targets MDX code lines from the head file, falling back to hunks", async () => {
		// Line 10 is inside a code block whose fence is outside the hunk.
		github.getPullRequestFiles.mockResolvedValue([
			{
				filename: "src/content/docs/x.mdx",
				status: "modified",
				additions: 2,
				deletions: 1,
				changes: 3,
				patch:
					"@@ -9,3 +9,3 @@\n const a = 1;\n-const b = 1;\n+const b = 2;\n const c = 3;\n@@ -20,1 +21,2 @@\n Prose.\n+More prose.\n",
			},
		]);
		const head = [
			"---",
			"title: X",
			"---",
			"",
			"Intro.",
			"",
			"```ts",
			"// setup",
			"const a = 1;",
			"const b = 2;",
			"const c = 3;",
			"```",
			...Array.from({ length: 8 }, () => ""),
			"Prose.",
			"More prose.",
		].join("\n");
		const planFor = async (content: () => Promise<string | null>) => {
			const { ctx } = context({ replay: true });
			github.getRepoFileContent.mockImplementation((_token, path) =>
				path === "src/content/docs/x.mdx" ? content() : Promise.resolve(null),
			);
			await prepareRun(ctx);
			return getRunArtifact<any>(
				ctx.env.DOCS_FLUE_BUCKET,
				1,
				"run",
				RUN_ARTIFACTS.plan,
			);
		};
		const read = await planFor(async () => head);
		expect(github.getRepoFileContent).toHaveBeenCalledWith(
			"token",
			"src/content/docs/x.mdx",
			"head",
		);
		expect(read?.targets.code.lines).toEqual({
			"src/content/docs/x.mdx": [10],
		});
		expect(read?.targets.style.lines).toEqual({
			"src/content/docs/x.mdx": [10, 22],
		});
		const fallback = await planFor(() => Promise.reject(new Error("503")));
		expect(fallback?.targets.code).toBeUndefined();
		expect(fallback?.skipped.code).toBe("no code changes to review");
	});
	it("creates or updates the placeholder and does not persist a lost run", async () => {
		const { ctx } = context();
		await putRunArtifact(
			ctx.env.DOCS_FLUE_BUCKET,
			1,
			"run",
			RUN_ARTIFACTS.meta,
			{ pr: { number: 1, headSha: "head" }, startedAt: "now" },
		);
		github.createIssueComment.mockResolvedValue(10);
		await postPlaceholder(ctx, false);
		expect(github.createIssueComment).toHaveBeenCalled();
		expect(
			(
				await getRunArtifact<any>(
					ctx.env.DOCS_FLUE_BUCKET,
					1,
					"run",
					RUN_ARTIFACTS.meta,
				)
			)?.commentId,
		).toBe(10);
		github.getIssueComments.mockResolvedValue([
			{
				id: 10,
				body: "<!-- cloudflare-docs-flue-code-review -->",
				user: { type: "Bot" },
			},
		]);
		await postPlaceholder(ctx, false);
		expect(github.updateIssueComment).toHaveBeenCalledWith(
			"token",
			10,
			expect.any(String),
		);
		expect(
			(await updateState(ctx.env.DOCS_FLUE_BUCKET, 1, (state) => state))
				?.commentId,
		).toBeUndefined();
	});
	it("posts a full-review placeholder for a replay without writing state", async () => {
		const { ctx, r2 } = context({ replay: true, fullReview: true });
		await putRunArtifact(
			ctx.env.DOCS_FLUE_BUCKET,
			1,
			"run",
			RUN_ARTIFACTS.meta,
			{ pr: { number: 1, headSha: "headsha1234" }, startedAt: "now" },
		);
		github.createIssueComment.mockResolvedValue(10);
		await postPlaceholder(ctx, true);
		expect(github.createIssueComment).toHaveBeenCalledWith(
			"token",
			1,
			expect.stringContaining(
				"⏳ Full review in progress for commit `headsha`.",
			),
		);
		expect(
			(
				await getRunArtifact<any>(
					ctx.env.DOCS_FLUE_BUCKET,
					1,
					"run",
					RUN_ARTIFACTS.meta,
				)
			)?.commentId,
		).toBe(10);
		expect(await r2.get("reviews/v2/pr-1/state.json")).toBeUndefined();
	});
	it("skips the placeholder in log mode", async () => {
		const { ctx } = context({ replay: true });
		await postPlaceholder({ ...ctx, mode: "log" }, true);
		expect(github.getInstallationToken).not.toHaveBeenCalled();
	});
});
