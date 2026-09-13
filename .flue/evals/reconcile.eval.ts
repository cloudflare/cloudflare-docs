import { expect } from "vitest";
import { describeEval, toolCalls } from "vitest-evals";
import { createFlueAgentHarness } from "./harness";
import type { Finding, ReviewJob } from "../lib/review-domain";

const harness = createFlueAgentHarness<{
	job: ReviewJob;
	findings: Finding[];
	changedPaths: string[];
}>({
	baseUrl: process.env.FLUE_BASE_URL ?? "http://localhost:5173",
	agentName: "reconcile-findings",
	dataKey: "reconciliation",
	message: "Reconcile existing findings without discovering new ones.",
	token: process.env.DOCS_FLUE_INTERNAL_TOKEN,
});
const finding: Finding = {
	id: "existing",
	category: "style",
	severity: "warning",
	path: "src/content/docs/workers/example.mdx",
	line: 42,
	rule: "Avoid contractions",
	evidence: "Uses don't.",
	suggestion: "Use do not.",
};
const job: ReviewJob = {
	number: 1000,
	runId: "eval",
	headSha: "eval",
	baseSha: "production",
	baseRef: "production",
	title: "[Workers] Example",
	body: "",
	author: "doc-author",
	moderate: false,
};

describeEval("incremental reconciliation", { harness }, (it) => {
	it("keeps an unchanged finding active, never inferring resolution from missing diff", async ({
		run,
	}) => {
		const result = await run({ job, findings: [finding], changedPaths: [] });
		expect(result.output).toMatchObject({
			decisions: [{ id: "existing", status: "active" }],
		});
	});
	it("accepts an unambiguous natural-language dismissal from the author", async ({
		run,
	}) => {
		const result = await run({
			job: { ...job, number: 1001 },
			findings: [finding],
			changedPaths: [],
		});
		expect(result.output).toMatchObject({
			decisions: [{ id: "existing", status: "ignored" }],
		});
		expect(toolCalls(result).map((tool) => tool.name)).toContain(
			"read_review_comments",
		);
	});
	it("preserves a prior dismissal without demanding another explanation", async ({
		run,
	}) => {
		const result = await run({
			job,
			findings: [
				{
					...finding,
					status: "ignored",
					reviewerNote: "Intentional dashboard wording",
				},
			],
			changedPaths: [],
		});
		expect(result.output).toMatchObject({
			decisions: [{ id: "existing", status: "ignored" }],
		});
	});
});
