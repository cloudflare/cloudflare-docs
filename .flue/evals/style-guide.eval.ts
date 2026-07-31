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

type Finding = {
	severity?: string;
	path?: string;
	line?: number;
	rule?: string;
	evidence?: string;
	suggestion?: string;
};

const PR = {
	number: 999,
	title: "[Workers] Fix link",
	base: "production",
	head: "fix-link",
};

describeEval("style-guide reviewer", { harness }, (it) => {
	it("flags a full URL for an internal link", async ({ run }) => {
		const result = await run({
			pullRequest: PR,
			filename: "src/content/docs/workers/example.mdx",
			addedLines: [
				{
					line: 42,
					content:
						"See [the Workers docs](https://developers.cloudflare.com/workers/) for more.",
				},
			],
		});

		const findings = (result.output as { findings?: Finding[] })?.findings;
		expect(findings).toBeDefined();
		expect(findings!.length).toBeGreaterThan(0);

		const linkFinding = findings!.find(
			(f) =>
				f.rule?.toLowerCase().includes("link") ||
				f.rule?.toLowerCase().includes("url") ||
				f.rule?.toLowerCase().includes("root-relative"),
		);
		expect(linkFinding).toBeDefined();
		expect(linkFinding!.severity).toBe("warning");
		expect(linkFinding!.path).toBe("src/content/docs/workers/example.mdx");
		expect(linkFinding!.line).toBe(42);

		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_style_guide",
		);
	});

	it("passes on a clean root-relative link", async ({ run }) => {
		const result = await run({
			pullRequest: PR,
			filename: "src/content/docs/workers/example.mdx",
			addedLines: [
				{
					line: 42,
					content: "See [the Workers docs](/workers/) for more.",
				},
			],
		});

		const findings = (result.output as { findings?: Finding[] })?.findings;
		expect(findings).toBeDefined();
		// Live model eval — the model may find a minor suggestion.
		// Assert no warnings (the severity that matters); suggestions are noise.
		const warnings = (findings ?? []).filter((f) => f?.severity === "warning");
		expect(warnings).toHaveLength(0);
		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_style_guide",
		);
	});

	it("does not flag an Oxford comma when the serial comma is already present before final or", async ({
		run,
	}) => {
		const result = await run({
			pullRequest: PR,
			filename: "src/content/docs/stream/stream-live/start-stream-live.mdx",
			addedLines: [
				{
					line: 144,
					content:
						"Rotate the broadcast credentials for a live input when credentials may have been shared with the wrong audience, exposed in client code or a screenshare, or need to be refreshed as part of your security process. Rotating keys does not change the live input ID or its other configuration.",
				},
			],
		});

		const findings = (result.output as { findings?: Finding[] })?.findings;
		expect(findings).toBeDefined();

		const oxfordFindings = (findings ?? []).filter((f) =>
			`${f.rule ?? ""} ${f.evidence ?? ""} ${f.suggestion ?? ""}`.match(
				/oxford|serial comma/i,
			),
		);
		expect(oxfordFindings).toHaveLength(0);

		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_style_guide",
		);
	});

	it("flags a missing Oxford comma before final and", async ({ run }) => {
		const result = await run({
			pullRequest: PR,
			filename: "src/content/docs/workers/example.mdx",
			addedLines: [
				{
					line: 30,
					content: "Workers support bindings for KV, R2 and D1.",
				},
			],
		});

		const findings = (result.output as { findings?: Finding[] })?.findings;
		expect(findings).toBeDefined();

		const oxfordFindings = (findings ?? []).filter((f) =>
			`${f.rule ?? ""} ${f.evidence ?? ""} ${f.suggestion ?? ""}`.match(
				/oxford|serial comma/i,
			),
		);
		expect(oxfordFindings.length).toBeGreaterThan(0);

		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_style_guide",
		);
	});

	it("flags a body H1 heading", async ({ run }) => {
		const result = await run({
			pullRequest: PR,
			filename: "src/content/docs/workers/example.mdx",
			addedLines: [
				{
					line: 15,
					content: "# Getting Started with Workers",
				},
			],
		});

		const findings = (result.output as { findings?: Finding[] })?.findings;
		expect(findings).toBeDefined();
		expect(findings!.length).toBeGreaterThan(0);

		const h1Finding = findings!.find(
			(f) =>
				f.rule?.toLowerCase().includes("h1") ||
				f.rule?.toLowerCase().includes("heading"),
		);
		expect(h1Finding).toBeDefined();
		expect(h1Finding!.severity).toBe("warning");
		expect(h1Finding!.path).toBe("src/content/docs/workers/example.mdx");
		expect(h1Finding!.line).toBe(15);

		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_style_guide",
		);
	});
});
