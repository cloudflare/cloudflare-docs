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
	getGitHubContext: vi.fn(),
	evaluateItemSpam: vi.fn(),
	addLabels: vi.fn().mockResolvedValue(undefined),
	closeIssue: vi.fn().mockResolvedValue(undefined),
	closePullRequest: vi.fn().mockResolvedValue(undefined),
	postComment: vi.fn().mockResolvedValue(undefined),
	startReview: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("../lib/github", () => ({
	getInstallationToken: vi.fn().mockResolvedValue("token"),
	getPullRequest: vi.fn().mockResolvedValue({ head: { sha: "sha" } }),
	addLabels: mocks.addLabels,
	closeIssue: mocks.closeIssue,
	closePullRequest: mocks.closePullRequest,
	postComment: mocks.postComment,
}));
vi.mock("../lib/review/start", () => ({ startReview: mocks.startReview }));
vi.mock("../lib/spam-filter", async (importOriginal) => ({
	...(await importOriginal<typeof import("../lib/spam-filter")>()),
	getGitHubContext: mocks.getGitHubContext,
	evaluateItemSpam: mocks.evaluateItemSpam,
}));

import { IngestWorkflow, type IngestParams } from "./ingest-workflow";
import { OFF_TOPIC_COMMENT, SPAM_COMMENT } from "../lib/spam-filter";

const step = {
	do: async (...args: unknown[]) => (args[args.length - 1] as () => unknown)(),
};

function verdict(category: string, probability = 0.95) {
	return {
		is_spam: true,
		confidence: probability >= 0.8 ? "high" : "medium",
		reason: "r",
		category,
		probability,
	};
}

function context(state = "open") {
	return {
		item: {
			kind: "pull_request",
			number: 7,
			title: "t",
			url: "u",
			state,
		},
		diff: undefined,
	};
}

function run(
	mode: string | undefined,
	payload: Partial<IngestParams> = {},
	gateway?: string,
) {
	const workflow = new IngestWorkflow(
		{} as never,
		{
			AI: {},
			REVIEW_ORCHESTRATOR: {},
			DOCS_FLUE_REVIEW_MODE: mode,
			DOCS_FLUE_AI_GATEWAY_ID: gateway,
		} as never,
	);
	return workflow.run(
		{
			instanceId: "i",
			payload: {
				eventType: "pull_request",
				number: 7,
				isPullRequest: true,
				isDraft: false,
				...payload,
			},
		} as never,
		step as never,
	);
}

describe("IngestWorkflow", () => {
	beforeEach(() => {
		vi.clearAllMocks();
		mocks.getGitHubContext.mockResolvedValue(context());
		mocks.evaluateItemSpam.mockResolvedValue(verdict("spam"));
	});

	it("labels spam and closes with the spam comment", async () => {
		expect(await run("log")).toMatchObject({ closed: true });
		expect(mocks.addLabels).toHaveBeenCalledWith("token", 7, ["spam"]);
		expect(mocks.postComment).toHaveBeenCalledWith("token", 7, SPAM_COMMENT);
		expect(mocks.closePullRequest).toHaveBeenCalled();
		expect(mocks.startReview).not.toHaveBeenCalled();
	});

	it.each(["support_request", "feature_request"])(
		"maps %s to the off-topic label and comment",
		async (category) => {
			mocks.evaluateItemSpam.mockResolvedValue(verdict(category));
			await run("log");
			expect(mocks.addLabels).toHaveBeenCalledWith("token", 7, ["off topic"]);
			expect(mocks.postComment).toHaveBeenCalledWith(
				"token",
				7,
				OFF_TOPIC_COMMENT,
			);
		},
	);

	it("does not close items that are already closed", async () => {
		mocks.getGitHubContext.mockResolvedValue(context("closed"));
		expect(await run("log")).toMatchObject({ closed: false });
		expect(mocks.addLabels).not.toHaveBeenCalled();
		expect(mocks.closePullRequest).not.toHaveBeenCalled();
	});

	it("forwards the gateway id", async () => {
		await run("log", {}, "gw");
		expect(mocks.evaluateItemSpam).toHaveBeenCalledWith(
			{},
			expect.objectContaining({ eventType: "pull_request" }),
			"gw",
		);
	});

	it("fails open on a Clef error and still kicks review", async () => {
		mocks.evaluateItemSpam.mockRejectedValue(new Error("boom"));
		expect(await run("log")).toMatchObject({ closed: false, review: "kicked" });
		expect(mocks.closePullRequest).not.toHaveBeenCalled();
		expect(mocks.startReview).toHaveBeenCalledOnce();
	});

	it("log-mode replay is a dry run with no writes and no review", async () => {
		const result = await run("log", { replay: true });
		expect(result).toMatchObject({
			closed: false,
			wouldClose: true,
			category: "spam",
			probability: 0.95,
			mode: "log",
			replay: true,
		});
		expect(mocks.addLabels).not.toHaveBeenCalled();
		expect(mocks.closePullRequest).not.toHaveBeenCalled();
		expect(mocks.postComment).not.toHaveBeenCalled();
		expect(mocks.startReview).not.toHaveBeenCalled();
	});

	it("comment-mode replay acts but does not kick review", async () => {
		const result = await run("comment", { replay: true });
		expect(result).toMatchObject({ closed: true, replay: true });
		expect(mocks.closePullRequest).toHaveBeenCalled();
		expect(mocks.startReview).not.toHaveBeenCalled();
		mocks.evaluateItemSpam.mockResolvedValue(verdict("none", 0.1));
		await run("comment", { replay: true });
		expect(mocks.startReview).not.toHaveBeenCalled();
	});

	it("real webhooks act in log mode and kick review for clean PRs", async () => {
		await run("log");
		expect(mocks.closePullRequest).toHaveBeenCalled();
		mocks.evaluateItemSpam.mockResolvedValue({
			...verdict("none", 0.1),
			is_spam: false,
			confidence: "low",
		});
		expect(await run("log")).toMatchObject({ review: "kicked" });
		expect(mocks.startReview).toHaveBeenCalledOnce();
	});
});
