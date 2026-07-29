import { expect } from "vitest";
import { describeEval, toolCalls } from "vitest-evals";
import { createFlueAgentHarness } from "./harness";
import type { SpamFilterInput } from "../agents/spam-filter";

const baseUrl = process.env.FLUE_BASE_URL ?? "http://localhost:5173";
const token = process.env.DOCS_FLUE_INTERNAL_TOKEN;

const harness = createFlueAgentHarness<SpamFilterInput>({
	baseUrl,
	agentName: "spam-filter",
	dataKey: "spam_verdict",
	message:
		"Evaluate this GitHub item for spam/off-topic and submit your verdict.",
	token,
});

type Verdict = {
	is_spam?: boolean;
	confidence?: string;
	reason?: string;
};

describeEval("spam filter", { harness }, (it) => {
	it("flags obvious spam issue", async ({ run }) => {
		const result = await run({
			eventType: "issues",
			item: {
				kind: "issue",
				number: 999,
				title: "BUY CHEAP VIAGRA ONLINE FREE SHIPPING!!!",
				body: "Click here: http://spam-site.example/ for best deals on pharmacy products. Limited time offer!!!",
				state: "open",
				url: "https://github.com/cloudflare/cloudflare-docs/issues/999",
				user: { login: "spam-bot-12345" },
				author_association: "NONE",
				labels: [],
			},
		});

		const verdict = result.output as Verdict;
		expect(verdict).toBeDefined();
		expect(verdict!.is_spam).toBe(true);
		expect(["medium", "high"]).toContain(verdict!.confidence);
		expect(verdict!.reason).toBeTruthy();
		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_spam_verdict",
		);
	});

	it("does not flag a legitimate docs typo report", async ({ run }) => {
		const result = await run({
			eventType: "issues",
			item: {
				kind: "issue",
				number: 998,
				title: "Typo in Workers get-started guide",
				body: "On the Workers get-started page, 'recieve' should be 'receive' in the second paragraph.",
				state: "open",
				url: "https://github.com/cloudflare/cloudflare-docs/issues/998",
				user: { login: "docs-reader" },
				author_association: "CONTRIBUTOR",
				labels: [],
			},
		});

		const verdict = result.output as Verdict;
		expect(verdict).toBeDefined();
		expect(verdict!.is_spam).toBe(false);
		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_spam_verdict",
		);
	});

	it("flags a support request as off-topic", async ({ run }) => {
		const result = await run({
			eventType: "issues",
			item: {
				kind: "issue",
				number: 997,
				title: "My zone is not working after DNS change",
				body: "I changed my DNS records yesterday and my site is still not loading. Can someone help me fix this? My domain is example.com.",
				state: "open",
				url: "https://github.com/cloudflare/cloudflare-docs/issues/997",
				user: { login: "frustrated-user" },
				author_association: "NONE",
				labels: [],
			},
		});

		const verdict = result.output as Verdict;
		expect(verdict).toBeDefined();
		// Support requests are off-topic but not spam. The bot's ground rules
		// say "Be conservative. When in doubt, do nothing. A false negative
		// (missing spam) is better than a false positive (closing a legitimate
		// contribution)." Expect the agent to identify it as off-topic without
		// closing it.
		expect(verdict!.is_spam).toBe(false);
		expect(verdict!.reason?.toLowerCase()).toMatch(
			/\b(support|off-topic|wrong repo|community)\b/,
		);
		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_spam_verdict",
		);
	});

	it("does not flag a PR with sparse metadata but real docs content", async ({
		run,
	}) => {
		const result = await run({
			eventType: "pull_request",
			item: {
				kind: "pull_request",
				number: 996,
				title: "update",
				body: "",
				state: "open",
				url: "https://github.com/cloudflare/cloudflare-docs/pull/996",
				user: { login: "new-contributor" },
				author_association: "CONTRIBUTOR",
				draft: false,
				base: "production",
				head: "fix-typo",
			},
			diff: {
				truncated: false,
				files: [
					{
						filename: "src/content/docs/workers/get-started.mdx",
						status: "modified",
						additions: 2,
						deletions: 2,
						changes: 4,
						patch: "@@ -42,7 +42,7 @@\n-recieve\n+receive",
					},
				],
			},
		});

		const verdict = result.output as Verdict;
		expect(verdict).toBeDefined();
		expect(verdict!.is_spam).toBe(false);
		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_spam_verdict",
		);
	});
});
