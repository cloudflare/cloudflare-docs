import { expect } from "vitest";
import { describeEval, toolCalls } from "vitest-evals";
import { createFlueAgentHarness } from "./harness";
import type { ReconcileInput } from "../agents/reconcile-reviewer";

const baseUrl = process.env.FLUE_BASE_URL ?? "http://localhost:5173";
const token = process.env.DOCS_FLUE_INTERNAL_TOKEN;

const harness = createFlueAgentHarness<ReconcileInput>({
	baseUrl,
	agentName: "reconcile-reviewer",
	dataKey: "reconcile_result",
	message:
		"Reconcile the current review findings against the previous review and human comments, then submit the result.",
	token,
});

const PR = {
	number: 999,
	title: "[Workers] Fix example",
	base: "production",
	head: "fix",
};

describeEval("reconcile reviewer", { harness }, (it) => {
	it("resolves a previous finding that is no longer present in a full diff", async ({
		run,
	}) => {
		const result = await run({
			pullRequest: PR,
			currentFindings: [],
			reviewedFiles: ["src/content/docs/workers/example.mdx"],
			previousFindings: [
				{
					id: "SG-aaa111",
					severity: "warning",
					path: "src/content/docs/workers/example.mdx",
					line: 42,
					rule: "Use root-relative internal links",
					evidence: "Line uses a full URL for an internal link",
					suggestion: "Change to /workers/",
				},
			],
			humanComments: [],
			diffMode: { type: "full" },
		});

		const output = result.output as {
			resolved?: string[];
			active?: unknown[];
		};
		expect(output).toBeDefined();
		expect(output?.resolved).toBeDefined();
		expect(output?.resolved).toContain("SG-aaa111");
		expect(output?.active).toHaveLength(0);
		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_reconcile_result",
		);
	});

	it("ignores a finding when the author gives a plausible reason", async ({
		run,
	}) => {
		const result = await run({
			pullRequest: PR,
			currentFindings: [
				{
					id: "SG-bbb222",
					severity: "warning",
					path: "src/content/docs/workers/example.mdx",
					line: 88,
					rule: "Avoid 'enable'",
					evidence: "Line uses 'enable' instead of 'turn on'",
					suggestion: "Change to 'turn on'",
				},
			],
			reviewedFiles: ["src/content/docs/workers/example.mdx"],
			previousFindings: [
				{
					id: "SG-bbb222",
					severity: "warning",
					path: "src/content/docs/workers/example.mdx",
					line: 88,
					rule: "Avoid 'enable'",
					evidence: "Line uses 'enable' instead of 'turn on'",
					suggestion: "Change to 'turn on'",
				},
			],
			humanComments: [
				{
					author: "doc-author",
					created_at: "2026-01-15T10:00:00Z",
					body: "This mirrors the exact wording in the dashboard — we need to match it.",
				},
			],
			diffMode: { type: "full" },
		});

		const output = result.output as {
			ignored_by_reviewer?: Array<{ id?: string; reviewer_note?: string }>;
			active?: unknown[];
		};
		expect(output).toBeDefined();
		expect(output?.ignored_by_reviewer).toBeDefined();
		expect(output?.ignored_by_reviewer).toHaveLength(1);
		expect(output?.ignored_by_reviewer?.[0]?.id).toBe("SG-bbb222");
		expect(output?.ignored_by_reviewer?.[0]?.reviewer_note).toBeTruthy();
		expect(output?.active).toHaveLength(0);
		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_reconcile_result",
		);
	});

	it("carries forward previous findings in incremental mode for unreviewed files", async ({
		run,
	}) => {
		const result = await run({
			pullRequest: PR,
			currentFindings: [],
			reviewedFiles: ["src/content/docs/workers/other.mdx"],
			previousFindings: [
				{
					id: "SG-ccc333",
					severity: "warning",
					path: "src/content/docs/workers/example.mdx",
					line: 42,
					rule: "Use root-relative internal links",
					evidence: "Line uses a full URL",
					suggestion: "Change to /workers/",
				},
			],
			humanComments: [],
			diffMode: {
				type: "incremental",
				fromSha: "aaa000",
				toSha: "bbb111",
			},
		});

		const output = result.output as {
			active?: Array<{ id?: string }>;
			resolved?: string[];
		};
		expect(output).toBeDefined();
		expect(output?.active).toBeDefined();
		expect(output?.active).toHaveLength(1);
		expect(output?.active?.[0]?.id).toBe("SG-ccc333");
		expect(output?.resolved).not.toContain("SG-ccc333");
		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_reconcile_result",
		);
	});

	it("keeps a finding active when a human comment is weak or unrelated", async ({
		run,
	}) => {
		const result = await run({
			pullRequest: PR,
			currentFindings: [
				{
					id: "SG-ddd444",
					severity: "warning",
					path: "src/content/docs/workers/example.mdx",
					line: 50,
					rule: "Avoid contractions",
					evidence: "Line uses 'don't' instead of 'do not'",
					suggestion: "Change to 'do not'",
				},
			],
			reviewedFiles: ["src/content/docs/workers/example.mdx"],
			previousFindings: [
				{
					id: "SG-ddd444",
					severity: "warning",
					path: "src/content/docs/workers/example.mdx",
					line: 50,
					rule: "Avoid contractions",
					evidence: "Line uses 'don't' instead of 'do not'",
					suggestion: "Change to 'do not'",
				},
			],
			humanComments: [
				{
					author: "doc-author",
					created_at: "2026-01-20T12:00:00Z",
					body: "I prefer it this way.",
				},
			],
			diffMode: { type: "full" },
		});

		const output = result.output as {
			active?: Array<{ id?: string }>;
			ignored_by_reviewer?: unknown[];
			resolved?: string[];
		};
		expect(output).toBeDefined();
		expect(output?.active).toBeDefined();
		expect(output?.active).toHaveLength(1);
		expect(output?.active?.[0]?.id).toBe("SG-ddd444");
		expect(output?.ignored_by_reviewer).toHaveLength(0);
		expect(output?.resolved).not.toContain("SG-ddd444");
		expect(toolCalls(result).map((c) => c.name)).toContain(
			"submit_reconcile_result",
		);
	});
});
