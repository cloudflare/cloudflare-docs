import { expect } from "vitest";
import { describeEval, toolCalls } from "vitest-evals";
import { createFlueAgentHarness } from "./harness";
import type { CommentSpamContext } from "../lib/comment-spam";

const baseUrl = process.env.FLUE_BASE_URL ?? "http://localhost:5173";
const token = process.env.DOCS_FLUE_INTERNAL_TOKEN;

const harness = createFlueAgentHarness<CommentSpamContext>({
	baseUrl,
	agentName: "comment-spam-filter",
	dataKey: "comment_spam_verdict",
	message: "Evaluate this comment for spam and submit your verdict.",
	token,
});

type Verdict = {
	is_spam?: boolean;
	confidence?: string;
	reason?: string;
};

const parent = {
	kind: "pull_request" as const,
	number: 33664,
	title: "Update Pages docs",
	state: "closed",
	url: "https://github.com/cloudflare/cloudflare-docs/pull/33664",
	body: "Rewrites the Pages build configuration docs.",
	author: "docs-writer",
};

describeEval("comment spam filter", { harness }, (it) => {
	it("flags an obvious link-drop spam comment", async ({ run }) => {
		const result = await run({
			comment: {
				id: 5818809326,
				body: "Nice post! Check out http://spam-site.example/ for the best casino bonuses and free crypto. Limited time offer!!!",
				url: "https://github.com/cloudflare/cloudflare-docs/pull/33664#issuecomment-5818809326",
				author: "promo-user-99",
				author_association: "NONE",
			},
			parent,
		});

		const verdict = result.output as Verdict;
		expect(verdict).toBeDefined();
		expect(verdict!.is_spam).toBe(true);
		expect(verdict!.confidence).toBe("high");
		expect(verdict!.reason).toBeTruthy();
		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_comment_spam_verdict",
		);
	});

	it("flags bot-flood gibberish", async ({ run }) => {
		const result = await run({
			comment: {
				id: 5818809327,
				body: "asdf asdf CLICK asdf http://junk.example asdf SEO asdf backlinks asdf",
				url: "https://github.com/cloudflare/cloudflare-docs/issues/42#issuecomment-5818809327",
				author: "junk-flood-01",
				author_association: "NONE",
			},
			parent: {
				...parent,
				kind: "issue" as const,
				number: 42,
				title: "Docs feedback thread",
				url: "https://github.com/cloudflare/cloudflare-docs/issues/42",
			},
		});

		const verdict = result.output as Verdict;
		expect(verdict).toBeDefined();
		expect(verdict!.is_spam).toBe(true);
		expect(verdict!.confidence).toBe("high");
		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_comment_spam_verdict",
		);
	});

	it("never flags a support question posted as a comment", async ({ run }) => {
		const result = await run({
			comment: {
				id: 5818809328,
				body: "Sorry to hijack this PR, but does anyone know if Pages supports monorepos? I can't find it in the docs and my build keeps failing.",
				url: "https://github.com/cloudflare/cloudflare-docs/pull/33664#issuecomment-5818809328",
				author: "confused-dev",
				author_association: "NONE",
			},
			parent,
		});

		const verdict = result.output as Verdict;
		expect(verdict).toBeDefined();
		expect(verdict!.is_spam).toBe(false);
		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_comment_spam_verdict",
		);
	});

	it("never flags short reactions like +1 or thanks", async ({ run }) => {
		const result = await run({
			comment: {
				id: 5818809329,
				body: "+1 this fixed the exact problem I was having, thanks!",
				url: "https://github.com/cloudflare/cloudflare-docs/pull/33664#issuecomment-5818809329",
				author: "happy-reader",
				author_association: "CONTRIBUTOR",
			},
			parent,
		});

		const verdict = result.output as Verdict;
		expect(verdict).toBeDefined();
		expect(verdict!.is_spam).toBe(false);
		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_comment_spam_verdict",
		);
	});
});
