/**
 * Style-guide review fan-out mechanics.
 *
 * Selects files eligible for style-guide review, dispatches concurrent child
 * workflow runs via accepted mode + Durable Streams polling, and merges the
 * per-file results into a single StyleGuideResult.
 *
 * Structured logs are emitted here for child-level events (admit, observe,
 * complete, timeout, failed). Caller logs the fan-out start/complete summary.
 */
import { admitWorkflow, pollRun } from "./poll-run";
import type {
	StyleGuideFinding,
	StyleGuideResult,
} from "./style-guide-results";
import type { getPullRequestFiles } from "./github";

// Only review docs/partials/changelog MDX, capped before specialist fan-out.
export const STYLE_GUIDE_REVIEWABLE_PATH_RE =
	/^src\/content\/(docs|partials|changelog)\/.+\.mdx$/;
export const STYLE_GUIDE_MAX_FILES = 20;
export const STYLE_GUIDE_CONCURRENCY = 5;

// Maximum time (ms) to wait for a single style-guide child run to complete.
export const STYLE_GUIDE_RUN_TIMEOUT_MS = 5 * 60 * 1000; // 5 minutes

export interface RunStyleGuideFanoutOptions {
	files: Awaited<ReturnType<typeof getPullRequestFiles>>;
	prNumber: number;
	diffDir: string;
	commentsPath: string;
	req: Request | undefined;
	internalHeaders: HeadersInit;
	runId: string;
}

/**
 * Select files eligible for style-guide review from the full PR file list.
 * Filters to reviewable MDX paths, requires additions and a patch, and caps
 * at STYLE_GUIDE_MAX_FILES (sorted largest-first).
 */
export function selectStyleGuideFiles(
	files: Awaited<ReturnType<typeof getPullRequestFiles>>,
): Awaited<ReturnType<typeof getPullRequestFiles>> {
	return files
		.filter(
			(file) =>
				STYLE_GUIDE_REVIEWABLE_PATH_RE.test(file.filename) &&
				file.additions > 0 &&
				file.patch,
		)
		.sort((a, b) => b.additions - a.additions)
		.slice(0, STYLE_GUIDE_MAX_FILES);
}

/**
 * Run up to `limit` async tasks concurrently and return results in input order.
 */
export async function withConcurrency<T>(
	tasks: Array<() => Promise<T>>,
	limit: number,
): Promise<T[]> {
	const results: T[] = new Array(tasks.length);
	let index = 0;

	async function worker() {
		while (index < tasks.length) {
			const current = index++;
			results[current] = await tasks[current]();
		}
	}

	await Promise.all(
		Array.from({ length: Math.min(limit, tasks.length) }, () => worker()),
	);
	return results;
}

/**
 * Merge per-file StyleGuideResult objects into a single result.
 * Deduplicates findings by ID across files.
 */
export function mergeStyleGuideResults(
	results: StyleGuideResult[],
): StyleGuideResult {
	const findingsById = new Map<string, StyleGuideFinding>();
	const reviewedFiles = new Set<string>();

	for (const result of results) {
		for (const finding of result.findings) {
			findingsById.set(finding.id, finding);
		}
		for (const file of result.reviewedFiles) {
			reviewedFiles.add(file);
		}
	}

	const findings = [...findingsById.values()];
	const warnings = findings.filter((f) => f.severity === "warning").length;
	const suggestions = findings.filter(
		(f) => f.severity === "suggestion",
	).length;
	const summary =
		findings.length === 0
			? "No style-guide issues found."
			: `${warnings} warning(s) and ${suggestions} suggestion(s) found across ${reviewedFiles.size} file(s).`;

	return {
		findings,
		summary,
		reviewedFiles: [...reviewedFiles],
	};
}

/**
 * Admit a style-guide-review child workflow and poll /runs/:runId until
 * run_end is observed. Uses the shared admitWorkflow + pollRun helpers from
 * lib/poll-run.ts so the pattern is consistent across all orchestrators.
 */
export async function dispatchStyleGuideReview(
	reviewId: string,
	prNumber: number,
	diffDir: string,
	commentsPath: string,
	req: Request | undefined,
	internalHeaders: HeadersInit,
	filename?: string,
): Promise<StyleGuideResult> {
	const baseUrl = req ? new URL(req.url).origin : "http://localhost:8787";
	const label = `PR #${prNumber} — ${filename ?? "(all files)"}`;

	console.log({
		message: `Style-guide child dispatch: ${label}`,
		event: "code_review_orchestrator",
		number: prNumber,
		filename: filename ?? null,
		diffDir,
		reviewId,
		action: "style_guide_child_dispatch_start",
	});

	// ── 1. Admit child workflow ────────────────────────────────────────────────
	let runId: string;
	try {
		runId = await admitWorkflow({
			baseUrl,
			pathname: `/workflows/style-guide-review`,
			headers: internalHeaders,
			body: { number: prNumber, diffDir, commentsPath, filename },
		});
	} catch (err) {
		const errMsg = err instanceof Error ? err.message : String(err);
		console.log({
			message: `Style-guide child dispatch failed: ${label} — ${errMsg}`,
			event: "code_review_orchestrator",
			number: prNumber,
			filename: filename ?? null,
			diffDir,
			reviewId,
			error: errMsg,
			action: "style_guide_child_dispatch_failed",
		});
		throw new Error(`Style-guide review dispatch failed: ${errMsg}`);
	}

	console.log({
		message: `Style-guide child admitted: ${label} — runId: ${runId}`,
		event: "code_review_orchestrator",
		number: prNumber,
		filename: filename ?? null,
		diffDir,
		reviewId,
		runId,
		action: "style_guide_child_run_admitted",
	});

	// ── 2. Poll for run_end ────────────────────────────────────────────────────
	console.log({
		message: `Style-guide child observe start: ${label} — runId: ${runId}`,
		event: "code_review_orchestrator",
		number: prNumber,
		filename: filename ?? null,
		diffDir,
		reviewId,
		runId,
		action: "style_guide_child_run_observe_start",
	});

	const pollResult = await pollRun<StyleGuideResult>({
		runId,
		baseUrl,
		headers: internalHeaders,
		timeoutMs: STYLE_GUIDE_RUN_TIMEOUT_MS,
		label,
	});

	if (pollResult.timedOut) {
		console.log({
			message: `Style-guide child observe timed out: ${label}`,
			event: "code_review_orchestrator",
			number: prNumber,
			filename: filename ?? null,
			diffDir,
			reviewId,
			runId,
			action: "style_guide_child_run_observe_timeout",
		});
		return {
			findings: [],
			summary: "Style-guide review timed out waiting for result.",
			reviewedFiles: filename ? [filename] : [],
		};
	}

	if (pollResult.isError) {
		const errMsg = pollResult.error?.message ?? "Unknown error";
		console.log({
			message: `Style-guide child run failed: ${label} — ${errMsg}`,
			event: "code_review_orchestrator",
			number: prNumber,
			filename: filename ?? null,
			diffDir,
			reviewId,
			runId,
			error: errMsg,
			durationMs: pollResult.durationMs ?? null,
			action: "style_guide_child_run_observe_failed",
		});
		throw new Error(`Style-guide child run failed: ${errMsg}`);
	}

	const childResult: StyleGuideResult = pollResult.result ?? {
		findings: [],
		summary: "Style-guide review produced no result.",
		reviewedFiles: [],
	};

	console.log({
		message: `Style-guide child observe complete: ${label} — ${childResult.findings.length} finding(s)`,
		event: "code_review_orchestrator",
		number: prNumber,
		filename: filename ?? null,
		diffDir,
		reviewId,
		runId,
		findings: childResult.findings.length,
		durationMs: pollResult.durationMs ?? null,
		action: "style_guide_child_run_observe_complete",
	});

	console.log({
		message: `Style-guide child dispatch complete: ${label} — ${childResult.findings.length} finding(s)`,
		event: "code_review_orchestrator",
		number: prNumber,
		filename: filename ?? null,
		diffDir,
		reviewId,
		runId,
		findings: childResult.findings.length,
		action: "style_guide_child_dispatch_complete",
	});

	return childResult;
}
