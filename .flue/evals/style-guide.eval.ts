import { expect } from "vitest";
import { describeEval, toolCalls } from "vitest-evals";
import { createFlueAgentHarness } from "./harness";
import type { StyleGuideFileInput } from "../agents/style-guide-file";

const baseUrl = process.env.FLUE_BASE_URL ?? "http://localhost:5173";
const token = process.env.DOCS_FLUE_INTERNAL_TOKEN;

const harness = createFlueAgentHarness<StyleGuideFileInput>({
	baseUrl,
	agentName: "style-guide-file",
	dataKey: "style_guide_file",
	message:
		"Review the added lines of this file against the style guide and submit your findings.",
	token,
});

describeEval("style-guide reviewer", { harness }, (it) => {
	it("flags a full URL for an internal link", async ({ run }) => {
		const result = await run({
			pullRequest: {
				number: 999,
				title: "[Workers] Fix link",
				base: "production",
				head: "fix-link",
			},
			filename: "src/content/docs/workers/example.mdx",
			addedLines: [
				{
					line: 42,
					content:
						"See [the Workers docs](https://developers.cloudflare.com/workers/) for more.",
				},
			],
		});

		const findings = (result.output as { findings?: unknown[] })?.findings;
		expect(findings).toBeDefined();
		expect(findings!.length).toBeGreaterThan(0);
		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_style_guide",
		);
	});

	it("passes on a clean root-relative link", async ({ run }) => {
		const result = await run({
			pullRequest: {
				number: 998,
				title: "[Workers] Fix link",
				base: "production",
				head: "fix-link",
			},
			filename: "src/content/docs/workers/example.mdx",
			addedLines: [
				{
					line: 42,
					content: "See [the Workers docs](/workers/) for more.",
				},
			],
		});

		const findings = (result.output as { findings?: unknown[] })?.findings;
		expect(findings).toBeDefined();
		// Live model eval — the model may find a minor suggestion.
		// Assert no warnings (the severity that matters); suggestions are noise.
		const warnings = (findings as Array<{ severity?: string }>).filter(
			(f) => f?.severity === "warning",
		);
		expect(warnings).toHaveLength(0);
		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_style_guide",
		);
	});
});
