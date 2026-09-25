import { expect } from "vitest";
import { describeEval } from "vitest-evals";
import {
	buildSpecialistMessage,
	type ConventionsReviewerInitialData,
} from "../lib/review/agent-input";
import { createFlueAgentHarness } from "./harness";
import { file, plan, pr } from "./review-fixtures";
type Input = {
	title: string;
	body: string;
	files: ReturnType<typeof file>[];
	initialData: ConventionsReviewerInitialData;
};
const harness = createFlueAgentHarness<Input>({
	baseUrl: process.env.FLUE_BASE_URL ?? "http://localhost:5173",
	agentName: "conventions-reviewer",
	dataKey: "review",
	message: "",
	token: process.env.DOCS_FLUE_INTERNAL_TOKEN,
	buildInitialData: (input) => (input as Input).initialData,
	buildMessage: (input) => {
		const value = input as Input;
		return buildSpecialistMessage({
			specialist: "conventions",
			pr: { ...pr, title: value.title, body: value.body },
			plan: plan("conventions", value.files),
			files: value.files,
			prTemplate: "Describe the change.",
		});
	},
});
const newPage = [
	"@@ -0,0 +1,14 @@",
	"+---",
	"+title: Cache API responses",
	"+description: Cache fetch responses from a Worker with the Cache API.",
	"+pcx_content_type: how-to",
	"+---",
	"+",
	"+The Cache API stores responses in the Cloudflare data center that served the request.",
	"+",
	"+## Cache a response",
	"+",
	"+1. Open the Worker that returns the response.",
	"+2. Call `cache.put()` with the request and a clone of the response.",
	"+",
	"+Cached responses follow the `Cache-Control` header on the response.",
	"",
].join("\n");
const input = (
	title: string,
	body: string,
	changed = file(
		"src/content/docs/workers/example.mdx",
		"@@ -1 +1 @@\n-Old text.\n+Updated text.\n",
	),
): Input => ({
	title,
	body,
	files: [changed],
	initialData: {
		runId: "eval-conventions",
		pr: pr.number,
		headSha: "head",
		baseSha: "base",
		specialist: "conventions",
		tier: "inline",
	},
});
describeEval("conventions reviewer", { harness }, (it) => {
	it("flags a vague title", async ({ run }) => {
		const output = (await run(input("update", ""))).output as {
			findings: unknown[];
		};
		expect(output.findings.length).toBeGreaterThan(0);
	});
	it("passes a well-described change", async ({ run }) => {
		const output = (
			await run(
				input(
					"[Workers] Clarify fetch example",
					"Clarifies the Workers fetch example.",
				),
			)
		).output as { findings: unknown[] };
		expect(output.findings).toHaveLength(0);
	});
	it("flags an omitted core scope change", async ({ run }) => {
		const output = (
			await run(
				input(
					"[Workers] Fix typo",
					"Fixes a typo.",
					file(
						"src/content/docs/workers/examples/cache-api.mdx",
						newPage,
						"added",
					),
				),
			)
		).output as { findings: unknown[] };
		expect(output.findings.length).toBeGreaterThan(0);
	});
});
