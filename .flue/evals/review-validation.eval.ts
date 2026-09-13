import { expect } from "vitest";
import { describeEval, toolCalls } from "vitest-evals";
import { createFlueAgentHarness } from "./harness";
import type { ReviewValidatorInput } from "../agents/review-validator";

const baseUrl = process.env.FLUE_BASE_URL ?? "http://localhost:5173";
const token = process.env.DOCS_FLUE_INTERNAL_TOKEN;

const harness = createFlueAgentHarness<ReviewValidatorInput>({
	baseUrl,
	agentName: "review-validator",
	dataKey: "review_validation",
	message:
		"Validate the review findings by reading the actual file content, then submit your decisions.",
	token,
});

const PR = {
	number: 999,
	title: "[Workers] Fix handler",
	base: "production",
	head: "fix-handler",
};

const changedFiles = [
	{
		filename: "src/handler.ts",
		status: "modified",
		additions: 5,
		deletions: 2,
	},
];

describeEval("review validator", { harness }, (it) => {
	it("validates a legitimate unhandled-promise finding", async ({ run }) => {
		const result = await run({
			pullRequest: PR,
			headSha: "eval-val-unhandled-promise",
			streamLabel: "code",
			findings: [
				{
					id: "CR-aaa111",
					severity: "warning",
					path: "src/handler.ts",
					line: 4,
					rule: "Unhandled promise rejection",
					evidence:
						"The added `fetch(url).then(...)` has no error handling; a network failure throws and crashes the request.",
					suggestion:
						"Wrap in try/catch and handle the failure, or check `res.ok` before using the response.",
				},
			],
			prBody: "Fix the fetch handler.",
			prTemplate: "",
			changedFiles,
		});

		const output = result.output as {
			decisions?: Array<{
				id?: string;
				verdict?: string;
				reason?: string;
			}>;
		};
		expect(output).toBeDefined();
		expect(output?.decisions).toBeDefined();
		expect(output?.decisions!.length).toBeGreaterThan(0);

		const decision = output?.decisions!.find((d) => d.id === "CR-aaa111");
		expect(decision).toBeDefined();
		expect(decision!.verdict).toBe("valid");

		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_review_validation",
		);
	});

	it("suppresses a style-guide finding for img inside a code block", async ({
		run,
	}) => {
		const result = await run({
			pullRequest: PR,
			headSha: "eval-val-fenced-img",
			streamLabel: "style",
			findings: [
				{
					id: "SG-ccc333",
					severity: "warning",
					path: "src/content/docs/workers/example.mdx",
					line: 9,
					rule: "Raw <img> tag",
					evidence:
						"Line uses a raw <img> tag instead of Markdown image syntax.",
					suggestion: "Use ![alt](~/assets/images/...) instead of <img>.",
				},
			],
			prBody: "Add an example with an img tag.",
			prTemplate: "",
			changedFiles: [
				{
					filename: "src/content/docs/workers/example.mdx",
					status: "modified",
					additions: 6,
					deletions: 0,
				},
			],
		});

		const output = result.output as {
			decisions?: Array<{
				id?: string;
				verdict?: string;
				reason?: string;
			}>;
		};
		expect(output).toBeDefined();
		expect(output?.decisions).toBeDefined();

		const decision = output?.decisions!.find((d) => d.id === "SG-ccc333");
		expect(decision).toBeDefined();
		expect(decision!.verdict).toBe("invalid");

		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_review_validation",
		);
	});
});
