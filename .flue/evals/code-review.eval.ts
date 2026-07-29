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

type Finding = {
	severity?: string;
	path?: string;
	line?: number;
	rule?: string;
	evidence?: string;
	suggestion?: string;
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
						"  fetch(url).then((r) => r.json()).then((d) => new Response(d));",
				},
			],
			fileContent: [
				"export default {",
				"  async fetch(request, env) {",
				"    const url = 'https://api.example.com/data';",
				"    fetch(url).then((r) => r.json()).then((d) => new Response(d));",
				"    return new Response('ok');",
				"  },",
				"};",
			].join("\n"),
			headSha: "abc123",
			repoAgentsMd: "# AGENTS.md\n\nThis is a test repo.",
		});

		const findings = (result.output as { findings?: Finding[] })?.findings;
		expect(findings).toBeDefined();
		expect(findings!.length).toBeGreaterThan(0);

		const match = findings!.find(
			(f) => f.severity === "warning" || f.severity === "critical",
		);
		expect(match).toBeDefined();
		expect(match!.path).toBe("src/handler.ts");
		expect(match!.line).toBe(10);
		expect(match!.rule?.toLowerCase()).toMatch(
			/promise|reject|unhandled|await|error|fire|discard|floating|ignored/,
		);

		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_code_review",
		);
	});

	it("passes on a file with proper error handling", async ({ run }) => {
		const result = await run({
			pullRequest: PR,
			filename: "src/handler.ts",
			addedLines: [
				{ line: 8, content: "  try {" },
				{ line: 9, content: "    const res = await fetch(url);" },
				{ line: 10, content: "    if (!res.ok) {" },
				{
					line: 11,
					content:
						"      return new Response('upstream error', { status: 502 });",
				},
				{ line: 12, content: "    }" },
				{ line: 13, content: "    const data = await res.json();" },
				{
					line: 14,
					content: "    return new Response(JSON.stringify(data));",
				},
				{ line: 15, content: "  } catch (e) {" },
				{
					line: 16,
					content:
						"    return new Response('internal error', { status: 500 });",
				},
				{ line: 17, content: "  }" },
			],
			fileContent: [
				"export default {",
				"  async fetch(request, env) {",
				"    const url = 'https://api.example.com/data';",
				"    try {",
				"      const res = await fetch(url);",
				"      if (!res.ok) {",
				"        return new Response('upstream error', { status: 502 });",
				"      }",
				"      const data = await res.json();",
				"      return new Response(JSON.stringify(data));",
				"    } catch (e) {",
				"      return new Response('internal error', { status: 500 });",
				"    }",
				"  },",
				"};",
			].join("\n"),
			headSha: "abc123",
			repoAgentsMd: "# AGENTS.md\n\nThis is a test repo.",
		});

		const findings = (result.output as { findings?: Finding[] })?.findings;
		expect(findings).toBeDefined();
		// Live model eval — the model may raise minor suggestions on any code.
		// Assert the model does not false-positive on the same issue class
		// we test in the positive case (promise/unhandled/error handling).
		const falsePositive = (findings ?? []).filter(
			(f) =>
				(f.severity === "warning" || f.severity === "critical") &&
				f.rule
					?.toLowerCase()
					.match(/promise|reject|unhandled|await|error.handl|missing.error/),
		);
		expect(falsePositive).toHaveLength(0);

		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_code_review",
		);
	});
});
