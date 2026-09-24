import { expect } from "vitest";
import { describeEval } from "vitest-evals";
import {
	buildSpecialistMessage,
	type CodeReviewerInitialData,
} from "../lib/review/agent-input";
import { createFlueAgentHarness } from "./harness";
import { CODE_CASES, file, plan, pr } from "./review-fixtures";
type Input = {
	files: ReturnType<typeof file>[];
	initialData: CodeReviewerInitialData;
};
const harness = createFlueAgentHarness<Input>({
	baseUrl: process.env.FLUE_BASE_URL ?? "http://localhost:5173",
	agentName: "code-reviewer",
	dataKey: "review",
	message: "",
	token: process.env.DOCS_FLUE_INTERNAL_TOKEN,
	buildInitialData: (input) => (input as Input).initialData,
	buildMessage: (input) => {
		const value = input as Input;
		return buildSpecialistMessage({
			specialist: "code",
			pr,
			plan: plan("code", value.files),
			files: value.files,
		});
	},
});
const input = (
	fixture: (typeof CODE_CASES)[keyof typeof CODE_CASES],
): Input => ({
	files: [file(fixture.path, fixture.patch)],
	initialData: {
		runId: "eval-code",
		pr: pr.number,
		headSha: fixture.headSha,
		baseSha: "base",
		specialist: "code",
		tier: "inline",
	},
});
describeEval("code reviewer", { harness }, (it) => {
	it("flags an unhandled promise", async ({ run }) => {
		const result = await run(input(CODE_CASES.unhandledPromise));
		expect(
			(result.output as { findings: unknown[] }).findings.length,
		).toBeGreaterThan(0);
	});
	it("does not flag handled errors", async ({ run }) => {
		const result = await run(input(CODE_CASES.handledErrors));
		expect((result.output as { findings: unknown[] }).findings).toHaveLength(0);
	});
});
