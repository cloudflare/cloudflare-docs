import { expect } from "vitest";
import { describeEval, toolCalls } from "vitest-evals";
import {
	buildSpecialistMessage,
	type StyleGuideReviewerInitialData,
} from "../lib/review/agent-input";
import { createFlueAgentHarness } from "./harness";
import { file, plan, pr } from "./review-fixtures";

type Input = {
	files: ReturnType<typeof file>[];
	initialData: StyleGuideReviewerInitialData;
};
const harness = createFlueAgentHarness<Input>({
	baseUrl: process.env.FLUE_BASE_URL ?? "http://localhost:5173",
	agentName: "style-guide-reviewer",
	dataKey: "review",
	message: "",
	token: process.env.DOCS_FLUE_INTERNAL_TOKEN,
	buildInitialData: (input) => (input as Input).initialData,
	buildMessage: (input) => {
		const value = input as Input;
		return buildSpecialistMessage({
			specialist: "style",
			pr,
			plan: plan("style", value.files),
			files: value.files,
		});
	},
});
const input = (source: string): Input => ({
	files: [file("src/content/docs/workers/example.mdx", source)],
	initialData: {
		runId: "eval-style",
		pr: pr.number,
		headSha: "head",
		baseSha: "base",
		specialist: "style",
		tier: "inline",
	},
});
describeEval("style-guide reviewer", { harness }, (it) => {
	it("flags a full internal URL", async ({ run }) => {
		const result = await run(
			input(
				"@@ -1 +1 @@\n+Refer to [Workers](https://developers.cloudflare.com/workers/).\n",
			),
		);
		expect(
			(result.output as { findings: Array<{ title: string }> }).findings.length,
		).toBeGreaterThan(0);
		expect(toolCalls(result).map((call) => call.name)).toContain(
			"submit_review",
		);
	});
	it("passes a root-relative link", async ({ run }) => {
		const result = await run(
			input("@@ -1 +1 @@\n+Refer to [Workers](/workers/).\n"),
		);
		expect((result.output as { findings: unknown[] }).findings).toHaveLength(0);
	});
	it("flags a body H1", async ({ run }) => {
		const result = await run(input("@@ -1 +1 @@\n+# Workers guide\n"));
		expect(
			(result.output as { findings: unknown[] }).findings.length,
		).toBeGreaterThan(0);
	});
	it("flags a missing Oxford comma", async ({ run }) => {
		const result = await run(
			input("@@ -1 +1 @@\n+Workers, KV and D1 support this feature.\n"),
		);
		expect(
			(result.output as { findings: unknown[] }).findings.length,
		).toBeGreaterThan(0);
	});
});
