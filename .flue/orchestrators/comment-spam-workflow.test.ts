import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("cloudflare:workers", () => ({
	WorkflowEntrypoint: class {
		constructor(
			public ctx: unknown,
			public env: unknown,
		) {}
	},
}));

const mocks = vi.hoisted(() => ({
	getCommentSpamContext: vi.fn(),
	evaluateCommentSpam: vi.fn(),
	deleteIssueComment: vi.fn(),
}));
vi.mock("../lib/github", () => ({
	getInstallationToken: vi.fn().mockResolvedValue("token"),
	deleteIssueComment: mocks.deleteIssueComment,
}));
vi.mock("../lib/comment-spam", async (importOriginal) => ({
	...(await importOriginal<typeof import("../lib/comment-spam")>()),
	getCommentSpamContext: mocks.getCommentSpamContext,
	evaluateCommentSpam: mocks.evaluateCommentSpam,
}));

import { CommentSpamWorkflow } from "./comment-spam-workflow";

const context = {
	comment: {
		id: 1,
		body: "Approved",
		url: "u",
		author: "a",
		author_association: "NONE",
	},
	parent: {
		kind: "pull_request",
		number: 2,
		title: "t",
		state: "open",
		url: "u",
		author: "p",
	},
};

const step = {
	do: async (...args: unknown[]) => (args[args.length - 1] as () => unknown)(),
};

function run(mode: string | undefined, replay: boolean | undefined) {
	const put = vi.fn().mockResolvedValue(undefined);
	const workflow = new CommentSpamWorkflow(
		{} as never,
		{
			DOCS_FLUE_BUCKET: { put },
			DOCS_FLUE_REVIEW_MODE: mode,
			AI: {},
			DOCS_FLUE_AI_GATEWAY_ID: "gw",
		} as never,
	);
	const result = workflow.run(
		{
			instanceId: "i",
			payload: { commentId: 1, parentNumber: 2, isPullRequest: true, replay },
		} as never,
		step as never,
	);
	return { put, result };
}

describe("CommentSpamWorkflow", () => {
	it("forwards the gateway id to the verdict call", async () => {
		mocks.getCommentSpamContext.mockResolvedValue({ context });
		mocks.evaluateCommentSpam.mockResolvedValue({
			is_spam: false,
			confidence: "low",
			reason: "r",
		});
		await run("log", undefined).result;
		expect(mocks.evaluateCommentSpam).toHaveBeenCalledWith(
			expect.anything(),
			context,
			"gw",
		);
	});

	it("fails open when Clef errors: no audit write, no delete", async () => {
		mocks.getCommentSpamContext.mockResolvedValue({ context });
		mocks.evaluateCommentSpam.mockRejectedValue(new Error("boom"));
		const { put, result } = run("comment", undefined);
		expect(await result).toMatchObject({
			deleted: false,
			error: expect.stringContaining("boom"),
		});
		expect(put).not.toHaveBeenCalled();
		expect(mocks.deleteIssueComment).not.toHaveBeenCalled();
	});
});

describe("CommentSpamWorkflow replay", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mocks.getCommentSpamContext.mockResolvedValue({ context });
		mocks.evaluateCommentSpam.mockResolvedValue({
			is_spam: true,
			confidence: "high",
			reason: "r",
		});
	});

	it("log-mode replay is a dry run", async () => {
		const { put, result } = run("log", true);
		expect(await result).toMatchObject({ deleted: false, wouldDelete: true });
		expect(put).not.toHaveBeenCalled();
		expect(mocks.deleteIssueComment).not.toHaveBeenCalled();
	});

	it("comment-mode replay writes the audit record and deletes", async () => {
		const { put, result } = run("comment", true);
		expect(await result).toMatchObject({ deleted: true });
		expect(put).toHaveBeenCalledOnce();
		expect(mocks.deleteIssueComment).toHaveBeenCalledWith("token", 1);
	});

	it("real webhooks delete regardless of mode", async () => {
		const { put, result } = run("log", undefined);
		expect(await result).toMatchObject({ deleted: true });
		expect(put).toHaveBeenCalledOnce();
		expect(mocks.deleteIssueComment).toHaveBeenCalled();
	});
});
