/**
 * Pure helpers for the style-guide file fan-out.
 *
 * Extracted from the 0.11 `style-guide-inproc.ts` so file selection and result
 * merging are plain, unit-testable functions with no Flue/sandbox imports. The
 * 2.0 agent (`agents/style-guide-file.ts`) and its driver
 * (`lib/run-style-guide.ts`) build on these.
 */
import type {
	StyleGuideFinding,
	StyleGuideResult,
} from "./style-guide-results";
import type { getPullRequestFiles } from "./github";

/** PR metadata passed to the style-guide agent. */
export interface StyleGuidePullRequest {
	number: number;
	title: string;
	base: string;
	head: string;
}

// Only review docs/partials/changelog MDX, capped before fan-out.
export const STYLE_GUIDE_REVIEWABLE_PATH_RE =
	/^src\/content\/(docs|partials|changelog)\/.+\.mdx$/;
export const STYLE_GUIDE_MAX_FILES = 20;
// Default fan-out concurrency; bounds how many per-file reads the driver awaits
// at once (each file is its own agent instance / Durable Object).
export const STYLE_GUIDE_CONCURRENCY = 5;

/**
 * Default per-file hard timeout. On timeout the driver aborts that file's
 * instance and degrades it to an empty result, freeing the concurrency slot.
 */
export const STYLE_GUIDE_FILE_TIMEOUT_MS = 10 * 60 * 1000;

export type PullRequestFiles = Awaited<ReturnType<typeof getPullRequestFiles>>;

/**
 * Select files eligible for style-guide review from the full PR file list.
 * Filters to reviewable MDX paths, requires additions and a patch, and caps
 * at STYLE_GUIDE_MAX_FILES (sorted largest-first).
 */
export function selectStyleGuideFiles(
	files: PullRequestFiles,
): PullRequestFiles {
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
