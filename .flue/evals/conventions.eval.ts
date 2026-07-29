import { expect } from "vitest";
import { describeEval, toolCalls } from "vitest-evals";
import { createFlueAgentHarness } from "./harness";
import type { ConventionsReviewInput } from "../agents/conventions-reviewer";

const baseUrl = process.env.FLUE_BASE_URL ?? "http://localhost:5173";
const token = process.env.DOCS_FLUE_INTERNAL_TOKEN;

const harness = createFlueAgentHarness<ConventionsReviewInput>({
	baseUrl,
	agentName: "conventions-reviewer",
	dataKey: "conventions_review",
	message:
		"Review this pull request against the repository conventions and submit your review.",
	token,
});

type Finding = {
	severity?: string;
	path?: string;
	rule?: string;
	evidence?: string;
	suggestion?: string;
};

describeEval("conventions reviewer", { harness }, (it) => {
	it("flags a vague title with no description", async ({ run }) => {
		const result = await run({
			pullRequest: { number: 999, title: "update" },
			description: "",
			prTemplate: "",
			renamedDocFiles: [],
			changedFiles: [
				{
					filename: "src/content/docs/workers/example.mdx",
					status: "modified",
					additions: 5,
					deletions: 2,
				},
			],
		});

		const findings = (result.output as { findings?: Finding[] })?.findings;
		expect(findings).toBeDefined();
		expect(findings!.length).toBeGreaterThan(0);

		const titleFinding = findings!.find(
			(f) =>
				f.path === "pr" &&
				f.severity === "warning" &&
				(f.rule?.toLowerCase().includes("title") ||
					f.rule?.toLowerCase().includes("prefix")),
		);
		expect(titleFinding).toBeDefined();
		expect(titleFinding!.severity).toBe("warning");
		expect(titleFinding!.path).toBe("pr");

		const descFinding = findings!.find(
			(f) =>
				f.path === "pr" &&
				f.severity === "warning" &&
				(f.rule?.toLowerCase().includes("description") ||
					f.rule?.toLowerCase().includes("explain")),
		);
		expect(descFinding).toBeDefined();
		expect(descFinding!.severity).toBe("warning");

		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_conventions_review",
		);
	});

	it("passes on a well-described PR with a product-prefixed title", async ({
		run,
	}) => {
		const result = await run({
			pullRequest: {
				number: 998,
				title: "[Workers] Add streaming example to get-started",
			},
			description:
				"Adds a streaming response example to the Workers get-started guide. The example shows how to use TransformStream to stream a response body.",
			prTemplate:
				"## What does this PR do?\n\nAdds a streaming example to the Workers get-started guide.\n\n## What kind of changes does this PR include?\n\n- Content changes in `src/content/docs/workers/`",
			renamedDocFiles: [],
			changedFiles: [
				{
					filename: "src/content/docs/workers/get-started.mdx",
					status: "modified",
					additions: 20,
					deletions: 0,
				},
			],
		});

		const findings = (result.output as { findings?: Finding[] })?.findings;
		expect(findings).toBeDefined();
		const titleOrDescFindings = (findings ?? []).filter(
			(f) =>
				f.rule?.toLowerCase().includes("title") ||
				f.rule?.toLowerCase().includes("description"),
		);
		expect(titleOrDescFindings).toHaveLength(0);
		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_conventions_review",
		);
	});

	it("flags scope inaccuracy when a new page is added but description only mentions a typo fix", async ({
		run,
	}) => {
		const result = await run({
			pullRequest: {
				number: 997,
				title: "[D1] Fix typo in concepts guide",
			},
			description:
				"Fixes a small typo in the D1 concepts page — changed 'recieve' to 'receive'.",
			prTemplate: "",
			renamedDocFiles: [],
			changedFiles: [
				{
					filename: "src/content/docs/d1/concepts.mdx",
					status: "modified",
					additions: 2,
					deletions: 2,
				},
				{
					filename: "src/content/docs/d1/configuration.mdx",
					status: "added",
					additions: 150,
					deletions: 0,
				},
			],
		});

		const findings = (result.output as { findings?: Finding[] })?.findings;
		expect(findings).toBeDefined();
		expect(findings!.length).toBeGreaterThan(0);

		const scopeFinding = findings!.find(
			(f) =>
				f.rule?.toLowerCase().includes("scope") ||
				f.rule?.toLowerCase().includes("change") ||
				f.rule?.toLowerCase().includes("unmentioned") ||
				f.rule?.toLowerCase().includes("new file") ||
				f.rule?.toLowerCase().includes("added page"),
		);
		expect(scopeFinding).toBeDefined();
		expect(scopeFinding!.severity).toBe("warning");
		expect(scopeFinding!.path).toBe("pr");

		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_conventions_review",
		);
	});
});
