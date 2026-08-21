/**
 * Pure helpers for the code-review file fan-out.
 *
 * Extracted from the 0.11 `code-review-inproc.ts` so the diff-parsing, file
 * selection, and result merging are plain, unit-testable functions with no
 * Flue/sandbox/GitHub runtime imports. The 2.0 agent (`agents/code-review-file.ts`)
 * and its trusted driver (`lib/run-code-review.ts`) both build on these.
 */
import type {
	CodeReviewFinding,
	CodeReviewResult,
} from "./code-review-results";
import type { getPullRequestFiles } from "./github";

/** A single added or changed line extracted from a unified diff patch. */
export interface AddedLine {
	/** New-file line number (1-indexed). */
	line: number;
	/** Line content, without the leading `+`. */
	content: string;
}

/**
 * Parse a unified diff patch string and return the added lines with their
 * new-file line numbers. Line numbers are computed by tracking hunk headers
 * (`@@ -old[,count] +new[,count] @@`) and advancing for added and context
 * lines. Returns an empty array for an empty or addition-free patch.
 *
 * This runs in trusted TypeScript — the model never has to parse the diff
 * format itself, which eliminates ~2 mandatory setup turns per file.
 */
export function parseAddedLines(patch: string): AddedLine[] {
	const result: AddedLine[] = [];
	let newLine = 0;
	let inHunk = false;

	for (const raw of patch.split("\n")) {
		// Hunk header: @@ -old[,count] +new[,count] @@
		const hunkMatch = raw.match(/^@@ -\d+(?:,\d+)? \+(\d+)(?:,\d+)? @@/);
		if (hunkMatch) {
			newLine = parseInt(hunkMatch[1], 10);
			inHunk = true;
			continue;
		}
		// Skip git file headers (+++ b/path, --- a/path, +++ /dev/null, etc.).
		// Match exactly on the path prefixes git uses so source lines like
		// "++ something" (patch: "+++ something") inside a hunk are not skipped.
		if (
			raw.startsWith("+++ b/") ||
			raw.startsWith("+++ a/") ||
			raw.startsWith("+++ /dev/null") ||
			raw.startsWith('+++ "b/') ||
			raw.startsWith('+++ "a/') ||
			raw.startsWith("--- b/") ||
			raw.startsWith("--- a/") ||
			raw.startsWith("--- /dev/null") ||
			raw.startsWith('--- "b/') ||
			raw.startsWith('--- "a/')
		)
			continue;
		// Ignore lines outside hunks (diff --git, index, similarity, etc.)
		if (!inHunk) continue;

		if (raw.startsWith("+")) {
			result.push({ line: newLine, content: raw.slice(1) });
			newLine++;
		} else if (raw.startsWith("-")) {
			// Deleted line — do not advance the new-file line counter.
		} else if (raw.startsWith("\\")) {
			// "\ No newline at end of file" — not a content line, ignore.
		} else {
			// Context line (space-prefixed or empty trailing line) — advance.
			newLine++;
		}
	}

	return result;
}

/** PR metadata passed to the code-review agent. */
export interface CodeReviewPullRequest {
	number: number;
	title: string;
	base: string;
	head: string;
}

export const CODE_REVIEW_MAX_FILES = 20;
// Default fan-out concurrency. Each file is reviewed by its own agent instance
// (its own Durable Object / isolate), so peak heap is bounded by the DO model
// rather than by deleting sessions; concurrency here bounds how many per-file
// reads the driver awaits at once.
export const CODE_REVIEW_CONCURRENCY = 2;

/**
 * Default per-file hard timeout. A single file's agent run is multi-turn with
 * slow model calls, so it is bounded; on timeout the driver aborts that file's
 * instance and degrades it to an empty result, freeing the concurrency slot.
 */
export const CODE_REVIEW_FILE_TIMEOUT_MS = 10 * 60 * 1000;

/**
 * Paths excluded from code review: lockfiles, generated output, vendored
 * assets, and binary/image files. Everything else that changed is fair game.
 */
const CODE_REVIEW_IGNORE_PATH_RE =
	/(^|\/)(pnpm-lock\.yaml|bun\.lock|package-lock\.json|yarn\.lock)$|\.lock$|^(dist|skills|node_modules)\/|(^|\/)\.wrangler\/|^src\/assets\/|\.(png|jpe?g|gif|svg|webp|ico|avif|woff2?|ttf|eot|mp4|webm|mov|pdf|zip|gz|tar|wasm|lockb)$/i;

/** Maximum file content size passed to the agent. Matches read_repo_file cap. */
export const FILE_CONTENT_MAX_BYTES = 32768;

export type PullRequestFiles = Awaited<ReturnType<typeof getPullRequestFiles>>;

/**
 * Select files eligible for code review from the full PR file list.
 * Includes any changed text file with additions and a patch, excluding
 * generated/binary noise, sorted largest-first and capped at `maxFiles`
 * (defaults to CODE_REVIEW_MAX_FILES).
 */
export function selectCodeReviewFiles(
	files: PullRequestFiles,
	maxFiles: number = CODE_REVIEW_MAX_FILES,
): PullRequestFiles {
	return files
		.filter(
			(file) =>
				file.status !== "removed" &&
				file.additions > 0 &&
				!!file.patch &&
				!CODE_REVIEW_IGNORE_PATH_RE.test(file.filename),
		)
		.sort(
			(a, b) =>
				b.additions - a.additions || a.filename.localeCompare(b.filename),
		)
		.slice(0, maxFiles);
}

/**
 * Merge per-file CodeReviewResult objects into a single result.
 * Deduplicates findings by ID across files.
 */
export function mergeCodeReviewResults(
	results: CodeReviewResult[],
): CodeReviewResult {
	const findingsById = new Map<string, CodeReviewFinding>();
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
	const critical = findings.filter((f) => f.severity === "critical").length;
	const warnings = findings.filter((f) => f.severity === "warning").length;
	const suggestions = findings.filter(
		(f) => f.severity === "suggestion",
	).length;
	const summary =
		findings.length === 0
			? "No code review issues found."
			: `${critical} critical, ${warnings} warning(s), and ${suggestions} suggestion(s) found across ${reviewedFiles.size} file(s).`;

	return {
		findings,
		summary,
		reviewedFiles: [...reviewedFiles],
	};
}
