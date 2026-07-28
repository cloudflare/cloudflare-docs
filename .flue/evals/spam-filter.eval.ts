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

		const verdict = result.output as {
			is_spam?: boolean;
			confidence?: string;
		};
		expect(verdict).toBeDefined();
		expect(verdict!.is_spam).toBe(true);
		expect(["medium", "high"]).toContain(verdict!.confidence);
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

		const verdict = result.output as {
			is_spam?: boolean;
			confidence?: string;
		};
		expect(verdict).toBeDefined();
		expect(verdict!.is_spam).toBe(false);
		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_spam_verdict",
		);
	});
});
