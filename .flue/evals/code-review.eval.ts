import { expect } from "vitest";
import { describeEval, toolCalls } from "vitest-evals";
import { createFlueAgentHarness } from "./harness";
import type { CodeReviewFileInput } from "../agents/code-review-file";

const baseUrl = process.env.FLUE_BASE_URL ?? "http://localhost:5173";
const token = process.env.DOCS_FLUE_INTERNAL_TOKEN;

const harness = createFlueAgentHarness<CodeReviewFileInput>({
	baseUrl,
	agentName: "code-review-file",
	dataKey: "code_review_file",
	message: "Review the changed lines of this file and submit your findings.",
	token,
});

const PR = {
	number: 999,
	title: "[Workers] Fix fetch handler",
	base: "production",
	head: "fix-handler",
};

describeEval("code review file", { harness }, (it) => {
	it("flags an unhandled promise rejection in a Worker handler", async ({
		run,
	}) => {
		const result = await run({
			pullRequest: PR,
			filename: "src/handler.ts",
			addedLines: [
				{
					line: 10,
					content:
						"  fetch(url).then((r) => r.json()).then((d) => return new Response(d));",
				},
			],
			fileContent: [
				"export default {",
				"  async fetch(request, env) {",
				"    const url = 'https://api.example.com/data';",
				"    fetch(url).then((r) => r.json()).then((d) => return new Response(d));",
				"    return new Response('ok');",
				"  },",
				"};",
			].join("\n"),
			headSha: "abc123",
			repoAgentsMd: "# AGENTS.md\n\nThis is a test repo.",
		});

		const findings = (result.output as { findings?: unknown[] })?.findings;
		expect(findings).toBeDefined();
		expect(findings!.length).toBeGreaterThan(0);
		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_code_review",
		);
	});
});
