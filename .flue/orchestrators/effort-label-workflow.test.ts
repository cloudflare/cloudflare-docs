import { beforeEach, describe, expect, it, vi } from "vitest";

vi.mock("cloudflare:workers", () => ({
	WorkflowEntrypoint: class {
		constructor(
			public ctx: unknown,
			public env: unknown,
		) {}
	},
}));
vi.mock("../prompts/effort-label.md", () => ({ default: "PROMPT" }));

const mocks = vi.hoisted(() => ({
	getIssue: vi.fn(),
	getEffortContext: vi.fn(),
	assessEffort: vi.fn(),
	codeownerAreasFor: vi.fn(),
	addLabels: vi.fn().mockResolvedValue(undefined),
	removeLabel: vi.fn().mockResolvedValue(undefined),
}));
vi.mock("../lib/github", () => ({
	getInstallationToken: vi.fn().mockResolvedValue("token"),
	getIssue: mocks.getIssue,
	addLabels: mocks.addLabels,
	removeLabel: mocks.removeLabel,
}));
vi.mock("../lib/effort-assessment", () => ({
	getEffortContext: mocks.getEffortContext,
	assessEffort: mocks.assessEffort,
	codeownerAreasFor: mocks.codeownerAreasFor,
}));

import {
	EffortLabelWorkflow,
	effortLabelWrites,
	type EffortLabelParams,
} from "./effort-label-workflow";

const sleep = vi.fn();
const step = {
	do: async (...args: unknown[]) => (args[args.length - 1] as () => unknown)(),
	sleep,
};

function issue(over: Record<string, unknown> = {}) {
	return {
		number: 9,
		title: "t",
		body: "b",
		state: "open",
		user: { login: "r" },
		author_association: "NONE",
		labels: [{ name: "product:workers" }, { name: "effort:low" }],
		comments: 0,
		created_at: "2026-01-01T00:00:00Z",
		...over,
	};
}

const ASSESSMENT = {
	decision: "Needs owner or SME input",
	issue_type: "missing_content",
	requirements: [{ text: "a", status: "not_met" }],
	owner: "product_team",
	pages: [
		"https://developers.cloudflare.com/workers/x/",
		"https://example.com/y",
	],
	effort_estimate: "Medium",
	reason: "r",
};

async function run(
	params: EffortLabelParams,
	env: Record<string, unknown> = {},
) {
	const wf = new EffortLabelWorkflow({} as never, { AI: {}, ...env } as never);
	return wf.run({ payload: params } as never, step as never);
}

beforeEach(() => {
	vi.clearAllMocks();
	mocks.getIssue.mockResolvedValue(issue());
	mocks.getEffortContext.mockResolvedValue({
		docsPages: ["https://developers.cloudflare.com/workers/y/"],
		livePages: [{ sourcePath: "src/content/docs/workers/y.mdx" }],
	});
	mocks.assessEffort.mockResolvedValue(ASSESSMENT);
	mocks.codeownerAreasFor.mockResolvedValue(["/src/content/docs/workers/"]);
});

describe("effortLabelWrites", () => {
	it("webhooks write only in label mode; replays follow the review mode", () => {
		expect(effortLabelWrites({}, false)).toBe(false);
		expect(
			effortLabelWrites({ DOCS_FLUE_EFFORT_LABEL_MODE: "label" }, false),
		).toBe(true);
		expect(
			effortLabelWrites({ DOCS_FLUE_EFFORT_LABEL_MODE: "label" }, true),
		).toBe(false);
		expect(effortLabelWrites({ DOCS_FLUE_REVIEW_MODE: "comment" }, true)).toBe(
			true,
		);
	});
});

describe("EffortLabelWorkflow", () => {
	it("scores and labels in label mode", async () => {
		const out = await run(
			{ number: 9, action: "edited" },
			{ DOCS_FLUE_EFFORT_LABEL_MODE: "label", DOCS_FLUE_AI_GATEWAY_ID: "gw" },
		);
		// 1 base + 1 not met + 1.5 missing + 1 page only (example.com dropped) → no extra page
		// + 2 product team + 0.5 codeowners + 0.75 Medium estimate = 6.75
		expect(out).toMatchObject({
			level: "High",
			score: 6.75,
			target: "effort:high",
			added: true,
			removed: ["effort:low"],
			dryRun: false,
		});
		expect(mocks.assessEffort).toHaveBeenCalledWith(
			{},
			"PROMPT",
			expect.anything(),
			"gw",
		);
		expect(mocks.codeownerAreasFor).toHaveBeenCalledWith(
			"token",
			[
				"https://developers.cloudflare.com/workers/x/",
				"https://developers.cloudflare.com/workers/y/",
			],
			["src/content/docs/workers/y.mdx"],
		);
		expect(mocks.addLabels).toHaveBeenCalledWith("token", 9, ["effort:high"]);
		expect(mocks.removeLabel).toHaveBeenCalledWith("token", 9, "effort:low");
		expect(sleep).not.toHaveBeenCalled();
	});

	it("is a dry run by default", async () => {
		const out = await run({ number: 9, action: "edited" });
		expect(out).toMatchObject({ target: "effort:high", dryRun: true });
		expect(mocks.addLabels).not.toHaveBeenCalled();
		expect(mocks.removeLabel).not.toHaveBeenCalled();
	});

	it.each(["opened", "reopened"])(
		"waits for the spam gate on %s",
		async (action) => {
			await run({ number: 9, action });
			expect(sleep).toHaveBeenCalledWith("wait-for-spam-gate", "3 minutes");
		},
	);

	it("does not wait on replays", async () => {
		await run({ number: 9, action: "opened", replay: true });
		expect(sleep).not.toHaveBeenCalled();
	});

	it.each([
		["pull_request", issue({ pull_request: {} })],
		["closed", issue({ state: "closed" })],
		["spam_or_off_topic", issue({ labels: [{ name: "Off Topic" }] })],
	])("skips %s without calling the model", async (reason, raw) => {
		mocks.getIssue.mockResolvedValueOnce(raw);
		expect(await run({ number: 9 })).toEqual({ number: 9, skipped: reason });
		expect(mocks.assessEffort).not.toHaveBeenCalled();
	});

	it("leaves labels alone when the model fails", async () => {
		mocks.assessEffort.mockRejectedValueOnce(new Error("bad reply"));
		const out = await run(
			{ number: 9 },
			{ DOCS_FLUE_EFFORT_LABEL_MODE: "label" },
		);
		expect(out).toEqual({ number: 9, error: "bad reply" });
		expect(mocks.addLabels).not.toHaveBeenCalled();
	});

	it("does not label an issue closed while the model ran", async () => {
		mocks.getIssue
			.mockResolvedValueOnce(issue())
			.mockResolvedValueOnce(issue({ state: "closed" }));
		const out = await run(
			{ number: 9 },
			{ DOCS_FLUE_EFFORT_LABEL_MODE: "label" },
		);
		expect(out).toMatchObject({ target: null, added: false });
		expect(mocks.addLabels).not.toHaveBeenCalled();
	});

	it("uses the live labels when labeling", async () => {
		mocks.getIssue
			.mockResolvedValueOnce(issue())
			.mockResolvedValueOnce(issue({ labels: [{ name: "effort:high" }] }));
		const out = await run(
			{ number: 9 },
			{ DOCS_FLUE_EFFORT_LABEL_MODE: "label" },
		);
		expect(out).toMatchObject({ added: false, removed: [] });
		expect(mocks.addLabels).not.toHaveBeenCalled();
		expect(mocks.removeLabel).not.toHaveBeenCalled();
	});
});
