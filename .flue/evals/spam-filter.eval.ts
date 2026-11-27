import { expect } from "vitest";
import { describeEval } from "vitest-evals";
import { createClefHarness } from "./clef-harness";
import type { ItemSpamInput, ItemSpamVerdict } from "../lib/spam-filter";

const baseUrl = process.env.FLUE_BASE_URL ?? "http://localhost:5173";
const token = process.env.DOCS_FLUE_INTERNAL_TOKEN;

const harness = createClefHarness<ItemSpamInput>({
	baseUrl,
	kind: "item",
	token,
});

type Verdict = ItemSpamVerdict;

describeEval("item spam gate (clef)", { harness }, (it) => {
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

		const verdict = result.output as unknown as Verdict;
		expect(verdict).toBeDefined();
		expect(verdict.is_spam).toBe(true);
		expect(["medium", "high"]).toContain(verdict.confidence);
		expect(["spam", "bot_or_test"]).toContain(verdict.category);
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

		const verdict = result.output as unknown as Verdict;
		expect(verdict).toBeDefined();
		expect(verdict.is_spam).toBe(false);
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

		const verdict = result.output as unknown as Verdict;
		expect(verdict).toBeDefined();
		// Off-topic support requests should be closed. The model returns
		// is_spam:true with medium/high confidence, and trusted code closes
		// the issue with the OFF_TOPIC_COMMENT redirect.
		expect(verdict.is_spam).toBe(true);
		expect(["medium", "high"]).toContain(verdict.confidence);
		expect(verdict.category).toBe("support_request");
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

		const verdict = result.output as unknown as Verdict;
		expect(verdict).toBeDefined();
		expect(verdict.is_spam).toBe(false);
	});

	it("categorises a product feature request", async ({ run }) => {
		const result = await run({
			eventType: "issues",
			item: {
				kind: "issue",
				number: 995,
				title: "Please add support for per-route rate limits in Workers",
				body: "It would be great if Workers had a built-in way to rate limit per route, like a new binding with a config per path. Can you add this feature to the product?",
				state: "open",
				url: "https://github.com/cloudflare/cloudflare-docs/issues/995",
				user: { login: "product-fan" },
				author_association: "NONE",
				labels: [],
			},
		});

		const verdict = result.output as unknown as Verdict;
		expect(verdict.category).toBe("feature_request");
	});

	it("does not flag a legitimate non-English docs issue", async ({ run }) => {
		const result = await run({
			eventType: "issues",
			item: {
				kind: "issue",
				number: 994,
				title: "Error en la documentación de Workers KV",
				body: "En la página de Workers KV, el ejemplo de `put` usa un nombre de método incorrecto. Debería ser `KV.put(clave, valor)`.",
				state: "open",
				url: "https://github.com/cloudflare/cloudflare-docs/issues/994",
				user: { login: "lector-docs" },
				author_association: "NONE",
				labels: [],
			},
		});

		const verdict = result.output as unknown as Verdict;
		expect(verdict.is_spam).toBe(false);
	});
});
