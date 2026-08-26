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

const HEAD_SHA = "abc123def456";

// Fixture refs for image eval cases — the mock read_repo_file (wired via
// Vite alias in eval builds) returns synthetic file content keyed by these.
const RAW_IMG_SHA = "eval-style-raw-img";
const IMAGES_PATH_SHA = "eval-style-images-path";
const CORRECT_IMG_SHA = "eval-style-correct-img";
const FENCED_IMG_SHA = "eval-style-fenced-img";
const REF_IMG_SHA = "eval-style-ref-img";

describeEval("style-guide reviewer", { harness }, (it) => {
	it("flags a full URL for an internal link", async ({ run }) => {
		const result = await run({
			pullRequest: PR,
			headSha: HEAD_SHA,
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
			headSha: HEAD_SHA,
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
			headSha: HEAD_SHA,
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
			headSha: HEAD_SHA,
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
			headSha: HEAD_SHA,
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

	it("flags a raw <img> tag for a content image", async ({ run }) => {
		const result = await run({
			pullRequest: PR,
			headSha: RAW_IMG_SHA,
			filename: "src/content/docs/cloudflare-challenges/precursor.mdx",
			addedLines: [
				{
					line: 50,
					content:
						'<img src="/images/precursor/precursor-rules.png" alt="Precursor mode selector" style="border:1px solid #e5e7eb;" />',
				},
			],
		});

		const findings = (result.output as { findings?: Finding[] })?.findings;
		expect(findings).toBeDefined();
		expect(findings!.length).toBeGreaterThan(0);

		const imgFinding = findings!.find(
			(f) =>
				f.rule?.toLowerCase().includes("img") ||
				f.rule?.toLowerCase().includes("image") ||
				f.rule?.toLowerCase().includes("markdown image"),
		);
		expect(imgFinding).toBeDefined();
		expect(imgFinding!.severity).toBe("warning");
		expect(imgFinding!.path).toBe(
			"src/content/docs/cloudflare-challenges/precursor.mdx",
		);
		expect(imgFinding!.line).toBe(50);

		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_style_guide",
		);
	});

	it("flags a Markdown image using /images/ instead of ~/assets/images/", async ({
		run,
	}) => {
		const result = await run({
			pullRequest: PR,
			headSha: IMAGES_PATH_SHA,
			filename: "src/content/docs/cloudflare-challenges/precursor.mdx",
			addedLines: [
				{
					line: 35,
					content:
						"![Precursor mode selector](/images/precursor/precursor-rules.png)",
				},
			],
		});

		const findings = (result.output as { findings?: Finding[] })?.findings;
		expect(findings).toBeDefined();

		const pathFinding = (findings ?? []).filter(
			(f) =>
				f.rule?.toLowerCase().includes("image") ||
				f.rule?.toLowerCase().includes("path") ||
				f.rule?.toLowerCase().includes("asset") ||
				f.evidence?.includes("/images/"),
		);
		expect(pathFinding.length).toBeGreaterThan(0);
		expect(pathFinding[0].severity).toBe("warning");

		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_style_guide",
		);
	});

	it("flags a reference-style image link with an unresolved ~/ alias", async ({
		run,
	}) => {
		const result = await run({
			pullRequest: PR,
			headSha: REF_IMG_SHA,
			filename: "src/content/docs/cloudflare-challenges/precursor.mdx",
			addedLines: [
				{
					line: 8,
					content: "![Precursor mode selector][1]",
				},
				{
					line: 10,
					content:
						"[1]: ~/assets/images/cloudflare-challenges/precursor-rules.png",
				},
			],
		});

		const findings = (result.output as { findings?: Finding[] })?.findings;
		expect(findings).toBeDefined();

		const refFinding = (findings ?? []).filter(
			(f) =>
				f.rule?.toLowerCase().includes("image") ||
				f.rule?.toLowerCase().includes("reference") ||
				f.rule?.toLowerCase().includes("inline") ||
				f.evidence?.includes("[1]"),
		);
		expect(refFinding.length).toBeGreaterThan(0);
		expect(refFinding[0].severity).toBe("warning");

		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_style_guide",
		);
	});

	it("does not flag a reference-style image link inside a fenced code block", async ({
		run,
	}) => {
		const result = await run({
			pullRequest: PR,
			headSha: HEAD_SHA,
			filename: "src/content/docs/workers/example.mdx",
			addedLines: [
				{
					line: 7,
					content: "```mdx",
				},
				{
					line: 8,
					content: "![Example][1]",
				},
				{
					line: 9,
					content: "[1]: ~/assets/images/example/example.png",
				},
				{
					line: 10,
					content: "```",
				},
			],
		});

		const findings = (result.output as { findings?: Finding[] })?.findings;
		expect(findings).toBeDefined();

		const imgFindings = (findings ?? []).filter(
			(f) =>
				f.severity === "warning" &&
				(f.rule?.toLowerCase().includes("img") ||
					f.rule?.toLowerCase().includes("image") ||
					f.rule?.toLowerCase().includes("reference") ||
					f.evidence?.includes("[1]")),
		);
		expect(imgFindings).toHaveLength(0);

		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_style_guide",
		);
	});

	it("passes on correct Markdown image syntax with ~/assets/images/", async ({
		run,
	}) => {
		const result = await run({
			pullRequest: PR,
			headSha: CORRECT_IMG_SHA,
			filename: "src/content/docs/cloudflare-challenges/precursor.mdx",
			addedLines: [
				{
					line: 35,
					content:
						"![Precursor mode selector showing Minimize Friction and Maximize Security options](~/assets/images/cloudflare-challenges/precursor-rules.png)",
				},
			],
		});

		const findings = (result.output as { findings?: Finding[] })?.findings;
		expect(findings).toBeDefined();

		const imageWarnings = (findings ?? []).filter(
			(f) =>
				f.severity === "warning" &&
				(f.rule?.toLowerCase().includes("img") ||
					f.rule?.toLowerCase().includes("image") ||
					f.rule?.toLowerCase().includes("path") ||
					f.rule?.toLowerCase().includes("asset")),
		);
		expect(imageWarnings).toHaveLength(0);

		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_style_guide",
		);
	});

	it("does not flag <img> inside a fenced HTML code block", async ({ run }) => {
		const result = await run({
			pullRequest: PR,
			headSha: FENCED_IMG_SHA,
			filename: "src/content/docs/workers/example.mdx",
			addedLines: [
				{
					line: 7,
					content: "```html",
				},
				{
					line: 8,
					content: '<div class="gallery">',
				},
				{
					line: 9,
					content: '  <img src="/static/logo.png" alt="Company Logo" />',
				},
				{
					line: 10,
					content: '  <img src="/static/banner.png" alt="Banner" />',
				},
				{
					line: 11,
					content: "</div>",
				},
				{
					line: 12,
					content: "```",
				},
			],
		});

		const findings = (result.output as { findings?: Finding[] })?.findings;
		expect(findings).toBeDefined();

		const imgFindings = (findings ?? []).filter(
			(f) =>
				f.rule?.toLowerCase().includes("img") ||
				f.rule?.toLowerCase().includes("image") ||
				f.evidence?.includes("<img"),
		);
		expect(imgFindings).toHaveLength(0);

		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_style_guide",
		);
	});

	it("flags a barrel-exported component imported via a deep path", async ({
		run,
	}) => {
		const result = await run({
			pullRequest: PR,
			headSha: HEAD_SHA,
			filename: "src/content/docs/workers/example.mdx",
			addedLines: [
				{
					line: 3,
					content: 'import Tabs from "~/components/ui/tabs/Tabs.astro";',
				},
			],
		});

		const findings = (result.output as { findings?: Finding[] })?.findings;
		expect(findings).toBeDefined();

		const importFinding = (findings ?? []).find(
			(f) =>
				f.rule?.toLowerCase().includes("import") ||
				f.rule?.toLowerCase().includes("component") ||
				f.rule?.toLowerCase().includes("barrel") ||
				f.evidence?.includes("~/components/ui/"),
		);
		expect(importFinding).toBeDefined();
		expect(importFinding!.severity).toBe("warning");
		expect(importFinding!.path).toBe("src/content/docs/workers/example.mdx");
		expect(importFinding!.line).toBe(3);

		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_style_guide",
		);
	});

	it("does not flag a page-specific wrapper component imported via a deep path", async ({
		run,
	}) => {
		const result = await run({
			pullRequest: PR,
			headSha: HEAD_SHA,
			filename: "src/content/docs/ai/models/index.mdx",
			addedLines: [
				{
					line: 15,
					content:
						'import BaseSchemaProperties from "~/components/BaseSchemaProperties.astro";',
				},
			],
		});

		const findings = (result.output as { findings?: Finding[] })?.findings;
		expect(findings).toBeDefined();

		const importWarnings = (findings ?? []).filter(
			(f) =>
				f.severity === "warning" &&
				(f.rule?.toLowerCase().includes("import") ||
					f.rule?.toLowerCase().includes("component") ||
					f.rule?.toLowerCase().includes("barrel") ||
					f.evidence?.includes("~/components/BaseSchemaProperties")),
		);
		expect(importWarnings).toHaveLength(0);

		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_style_guide",
		);
	});
});
