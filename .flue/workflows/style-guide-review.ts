/**
 * Style-guide review specialist
 *
 * Reads skill and reference files from R2 at request time and writes them
 * directly into the workspace via harness.fs — no bulk hydration or caching.
 * This ensures the agent always runs with the latest synced content.
 *
 * This agent is a pure analysis component — it never posts to GitHub.
 * All mutations are handled by code-review-orchestrator.
 *
 * POST /workflows/style-guide-review
 */
import type { FlueContext, WorkflowRouteHandler } from "@flue/runtime";
import { createAgent } from "@flue/runtime";
import {
	getDefaultWorkspace,
	getShellSandbox,
} from "../connectors/cloudflare-shell";
import { hydrateStyleGuideWorkspace } from "../lib/style-guide-hydration";
import {
	assignFindingIds,
	StyleGuideResultFromModelSchema,
	type StyleGuideResult,
} from "../lib/style-guide-results";
export type {
	StyleGuideFinding,
	StyleGuideResult,
} from "../lib/style-guide-results";

export const route: WorkflowRouteHandler = async (_c, next) => next();

interface StyleGuideReviewPayload {
	number: number;
	diffDir: string;
	commentsPath: string;
	/** When set, review only this file. Used by orchestrator fan-out. */
	filename?: string;
}

export async function run({ id: runId, init, payload, env }: FlueContext) {
	const input = parsePayload(payload);
	const typedEnv = env as Record<string, unknown>;
	const bucket = typedEnv.DOCS_FLUE_BUCKET as R2Bucket;
	const loader = typedEnv.LOADER as Parameters<
		typeof getShellSandbox
	>[0]["loader"];
	const workspace = getDefaultWorkspace();

	try {
		return await runImpl({
			runId,
			input,
			bucket,
			loader,
			workspace,
			init,
		});
	} catch (err) {
		const errMsg = err instanceof Error ? err.message : String(err);
		const errStack = err instanceof Error && err.stack ? err.stack : undefined;
		console.error({
			message: `Style-guide review failed: PR #${input.number}${input.filename ? ` — ${input.filename}` : ""} — ${errMsg}`,
			event: "style_guide_review",
			number: input.number,
			filename: input.filename ?? null,
			diffDir: input.diffDir,
			error: errMsg,
			errorStack: errStack ?? null,
			runId,
			action: "failed",
		});
		throw err;
	}
}

async function runImpl({
	runId,
	input,
	bucket,
	loader,
	workspace,
	init,
}: {
	runId: string;
	input: StyleGuideReviewPayload;
	bucket: R2Bucket;
	loader: Parameters<typeof getShellSandbox>[0]["loader"];
	workspace: ReturnType<typeof getDefaultWorkspace>;
	init: FlueContext["init"];
}): Promise<StyleGuideResult> {
	console.log({
		message: `Style-guide review started: PR #${input.number}${input.filename ? ` — ${input.filename}` : ""}`,
		event: "style_guide_review",
		number: input.number,
		diffDir: input.diffDir,
		filename: input.filename ?? null,
		runId,
		action: "started",
	});

	// ── 1. Hydrate workspace from R2 ──────────────────────────────────────────
	console.log({
		message: `Style-guide review hydrating workspace: PR #${input.number}${input.filename ? ` — ${input.filename}` : ""}`,
		event: "style_guide_review",
		number: input.number,
		filename: input.filename ?? null,
		diffDir: input.diffDir,
		runId,
		action: "hydration_start",
	});

	const hydration = await hydrateStyleGuideWorkspace(bucket, workspace, {
		diffDir: input.diffDir,
		commentsPath: input.commentsPath,
		filename: input.filename,
		prNumber: input.number,
	});

	if (!hydration) {
		const reason = input.filename
			? "No reviewable documentation files changed."
			: "No diff files found in R2.";
		console.log({
			message: `Style-guide review: ${reason} PR #${input.number}${input.filename ? ` — ${input.filename}` : ""}`,
			event: "style_guide_review",
			number: input.number,
			diffDir: input.diffDir,
			filename: input.filename ?? null,
			runId,
			action: "no_diff_files",
		});
		return {
			findings: [],
			summary: reason,
			reviewedFiles: [],
		} satisfies StyleGuideResult;
	}

	const { pullRequest, reviewedFiles, diffObjects, referenceObjects } =
		hydration;

	console.log({
		message: `Style-guide review workspace ready: PR #${input.number}${input.filename ? ` — ${input.filename}` : ""}`,
		event: "style_guide_review",
		number: input.number,
		filename: input.filename ?? null,
		diffDir: input.diffDir,
		diffObjects,
		referenceObjects,
		runId,
		action: "hydration_complete",
	});

	// ── 2. Init harness ───────────────────────────────────────────────────────
	const agent = createAgent(() => ({
		sandbox: getShellSandbox({ workspace, loader }),
		model: "cloudflare/@cf/moonshotai/kimi-k2.7-code",
		compaction: { reserveTokens: 64_000 },
	}));
	const harness = await init(agent);

	// ── 3. Run the skill ───────────────────────────────────────────────────────
	const session = await harness.session(
		`style-guide-review:${input.number}:${runId}`,
	);

	// Use structured result mode so flue injects finish/give_up tools and loops
	// until the model calls finish — works reliably across models that don't
	// self-terminate.
	const skillResult = await session.skill("style-guide-review", {
		result: StyleGuideResultFromModelSchema,
		args: {
			pullRequest: {
				number: pullRequest.number,
				title: pullRequest.title,
				base: pullRequest.base,
				head: pullRequest.head,
			},
			diffDir: input.diffDir,
			commentsPath: input.commentsPath,
			filename: input.filename,
		},
	});

	const rawData = skillResult.data;

	if (!rawData) {
		console.log({
			message: `Style-guide review: no result for PR #${input.number}${input.filename ? ` — ${input.filename}` : ""}`,
			event: "style_guide_review",
			number: input.number,
			filename: input.filename ?? null,
			runId,
			action: "no_result",
		});
		return {
			findings: [],
			summary: "Style-guide review produced no result.",
			reviewedFiles,
		} satisfies StyleGuideResult;
	}

	const mergedFindings = await assignFindingIds(rawData.findings);
	const data: StyleGuideResult = {
		findings: mergedFindings,
		summary:
			mergedFindings.length === rawData.findings.length
				? rawData.summary
				: `${mergedFindings.length} finding(s) found across ${reviewedFiles.length} file(s).`,
		reviewedFiles,
	};

	console.log({
		message: `Style-guide review complete: PR #${input.number}${input.filename ? ` — ${input.filename}` : ""} — ${data.findings.length} finding(s) (${data.findings.filter((f) => f.severity === "warning").length} warning(s), ${data.findings.filter((f) => f.severity === "suggestion").length} suggestion(s))`,
		event: "style_guide_review",
		number: input.number,
		filename: input.filename ?? null,
		findings: data.findings.length,
		warnings: data.findings.filter((f) => f.severity === "warning").length,
		suggestions: data.findings.filter((f) => f.severity === "suggestion")
			.length,
		runId,
		action: "complete",
	});

	return data;
}

function parsePayload(payload: unknown): StyleGuideReviewPayload {
	const input = payload as Partial<StyleGuideReviewPayload>;
	if (
		typeof input.number !== "number" ||
		typeof input.diffDir !== "string" ||
		typeof input.commentsPath !== "string"
	) {
		throw new Error(
			"[flue] style-guide-review requires payload { number: number, diffDir: string, commentsPath: string }.",
		);
	}
	return {
		number: input.number,
		diffDir: input.diffDir,
		commentsPath: input.commentsPath,
		filename: typeof input.filename === "string" ? input.filename : undefined,
	};
}
