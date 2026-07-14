/**
 * In-process style-guide review fan-out.
 *
 * Replaces the previous child-workflow fan-out (admit `style-guide-review`
 * over HTTP + Durable Streams long-poll) with native Flue session concurrency:
 * one harness over a single shell-sandbox workspace, hydrated once, then one
 * detached session per file fired concurrently with `session.skill(...)`.
 *
 * Why this shape:
 *   - A Flue session runs one operation at a time, but separate named sessions
 *     in one harness run concurrently (verified against @flue/runtime). So the
 *     fan-out is N sessions, each running one skill operation — never N
 *     operations on one session.
 *   - The cloudflare-shell Workspace is bound to the current Durable Object's
 *     SQLite (`getDefaultWorkspace()`), so all sessions share one workspace.
 *     Shared reference/skill content is therefore hydrated exactly once instead
 *     of being re-fetched per file (the child fan-out re-hydrated all reference
 *     objects for every file).
 *   - A single file's failure (model error, interruption, no result) is caught
 *     and degraded to an empty result for that file — it never aborts the other
 *     files or the whole review.
 */
import type { FlueContext } from "@flue/runtime";
import { createAgent } from "@flue/runtime";
import styleGuideSkill from "../.agents/skills/style-guide-review/SKILL.md" with { type: "skill" };
import { getShellSandbox } from "../connectors/cloudflare-shell";
import type { getDefaultWorkspace } from "../connectors/cloudflare-shell";
import {
	assignFindingIds,
	StyleGuideResultFromModelSchema,
	type StyleGuideFinding,
	type StyleGuideResult,
} from "./style-guide-results";
import type { getPullRequestFiles } from "./github";
import { withConcurrency } from "./inproc-utils";

/** PR metadata passed to the style-guide skill as `args.pullRequest`. */
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
// Default concurrency, overridable via the STYLE_GUIDE_CONCURRENCY env var (see
// style-guide-specialist.ts). Lower it locally where every Durable Object shares
// one process.
export const STYLE_GUIDE_CONCURRENCY = 5;

/**
 * Default per-file hard timeout, overridable via STYLE_GUIDE_FILE_TIMEOUT_MS.
 * Single-wedged-file protection: on timeout the file's operation is aborted and
 * its session deleted (see reviewSingleFile), so one slow file cannot hold a
 * concurrency slot for the orchestrator's whole 20-minute poll. 10 min covers a
 * complex file while staying under the poll, which remains the overall bound.
 */
export const STYLE_GUIDE_FILE_TIMEOUT_MS = 10 * 60 * 1000;

type PullRequestFiles = Awaited<ReturnType<typeof getPullRequestFiles>>;

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

export interface RunStyleGuideReviewInProcessOptions {
	init: FlueContext["init"];
	/**
	 * The shared DO workspace. The orchestrator creates this via
	 * `getDefaultWorkspace()`, writes the PR diff into it, and initializes its
	 * own default harness over it; we reuse the same workspace and init a
	 * separate named harness so the two do not collide on the single
	 * per-context default harness name.
	 */
	workspace: ReturnType<typeof getDefaultWorkspace>;
	loader: Parameters<typeof getShellSandbox>[0]["loader"];
	prNumber: number;
	/** PR metadata for the skill's `args.pullRequest`. */
	pullRequest: StyleGuidePullRequest;
	/** Run-scoped workspace directory holding the diff (already written). */
	diffDir: string;
	/** Reviewable files selected by `selectStyleGuideFiles`. */
	files: PullRequestFiles;
	runId: string;
	concurrency?: number;
	/** Per-file hard timeout in ms. Defaults to STYLE_GUIDE_FILE_TIMEOUT_MS. */
	fileTimeoutMs?: number;
}

/**
 * Run the style-guide-review skill once per file across concurrent sessions
 * over the shared workspace (the diff is already staged there by the
 * orchestrator). The skill and its reference rules are bundled in the build
 * and registered on the agent; references are read as packaged resources.
 *
 * Replaces `dispatchStyleGuideReview` fan-out across child workflows.
 */
export async function runStyleGuideReviewInProcess(
	options: RunStyleGuideReviewInProcessOptions,
): Promise<StyleGuideResult> {
	const {
		init,
		workspace,
		loader,
		prNumber,
		pullRequest,
		diffDir,
		runId,
		concurrency = STYLE_GUIDE_CONCURRENCY,
		fileTimeoutMs = STYLE_GUIDE_FILE_TIMEOUT_MS,
	} = options;

	// The per-file review list is the orchestrator's selection (additions > 0,
	// has a patch, capped, largest-first).
	const reviewFilenames = options.files.map((f) => f.filename);
	if (reviewFilenames.length === 0) {
		return {
			findings: [],
			summary: "No reviewable documentation files changed.",
			reviewedFiles: [],
		};
	}

	// ── Init a named harness over the specialist's workspace. The skill is
	//    registered here; its reference rules ship as packaged resources read
	//    via the `read` tool. ──────────────────────────────────────────────
	const agent = createAgent(() => ({
		sandbox: getShellSandbox({ workspace, loader }),
		model: "cloudflare/@cf/moonshotai/kimi-k2.7-code",
		skills: [styleGuideSkill],
	}));
	const harness = await init(agent, { name: "style-guide" });

	// ── One detached session per file, fired concurrently. Each file's
	//    failure is caught and degraded so it cannot abort the others. ───────
	const tasks = reviewFilenames.map(
		(filename, index) => async (): Promise<StyleGuideResult> => {
			try {
				const total = reviewFilenames.length;
				console.log({
					message: `Style-guide review: reviewing file (${index + 1}/${total}) — ${filename}`,
					event: "style_guide_specialist",
					number: prNumber,
					filename,
					fileIndex: index + 1,
					totalFiles: total,
					runId,
					action: "file_start",
				});

				const result = await reviewSingleFile({
					harness,
					sessionName: `${runId}:sg:${index}`,
					pullRequest,
					diffDir,
					filename,
					fileTimeoutMs,
				});

				console.log({
					message: `Style-guide review: done reviewing file (${index + 1}/${total}) — ${filename} — ${result.findings.length} finding(s)`,
					event: "style_guide_specialist",
					number: prNumber,
					filename,
					findings: result.findings.length,
					fileIndex: index + 1,
					totalFiles: total,
					runId,
					action: "file_complete",
				});

				return result;
			} catch (err) {
				const errMsg = err instanceof Error ? err.message : String(err);
				console.error({
					message: `Style-guide file review failed (degraded): PR #${prNumber} — ${filename} — ${errMsg}`,
					event: "style_guide_specialist",
					number: prNumber,
					filename,
					diffDir,
					runId,
					error: errMsg,
					action: "style_guide_file_degraded",
				});
				// Degrade: empty result, and deliberately NOT in reviewedFiles so
				// the reconciler does not falsely resolve prior findings on a file
				// we could not actually review.
				return {
					findings: [],
					summary: "Style-guide review could not complete for this file.",
					reviewedFiles: [],
				};
			}
		},
	);

	const results = await withConcurrency(tasks, concurrency);
	return mergeStyleGuideResults(results);
}

/**
 * Run the style-guide-review skill for a single file in its own session.
 * Mirrors the per-file logic of the former style-guide-review workflow.
 */
async function reviewSingleFile({
	harness,
	sessionName,
	pullRequest,
	diffDir,
	filename,
	fileTimeoutMs,
}: {
	harness: Awaited<ReturnType<FlueContext["init"]>>;
	sessionName: string;
	pullRequest: StyleGuidePullRequest;
	diffDir: string;
	filename: string;
	fileTimeoutMs: number;
}): Promise<StyleGuideResult> {
	const session = await harness.sessions.create(sessionName);

	// Bound the per-file session so one wedged file cannot hold a concurrency
	// slot for the orchestrator's whole poll. On timeout we ABORT the operation
	// (not just race it) — otherwise the model loop keeps running and the
	// session.delete() below would reject ("rejects while an operation is
	// active"), leaking the session and its work. Aborting settles the operation
	// so delete() succeeds and the slot is freed.
	//
	// Structured result mode: flue injects finish/give_up tools and loops until
	// the model calls finish — reliable across models that don't self-terminate.
	let timedOut = false;
	const handle = session.skill("style-guide-review", {
		result: StyleGuideResultFromModelSchema,
		args: {
			pullRequest,
			diffDir,
			filename,
		},
	});
	const timer = setTimeout(() => {
		timedOut = true;
		// Guard against abort() throwing or returning a rejecting promise — an
		// error here would be an unhandled rejection from the timer callback.
		Promise.resolve(handle.abort()).catch(() => {});
	}, fileTimeoutMs);

	try {
		const skillResult = await handle;

		const rawData = skillResult.data;
		if (!rawData) {
			return {
				findings: [],
				summary: "Style-guide review produced no result.",
				reviewedFiles: [filename],
			};
		}

		const findings = await assignFindingIds(rawData.findings);
		return {
			findings,
			summary: rawData.summary,
			reviewedFiles: [filename],
		};
	} catch (err) {
		// Normalize the abort into a clear timeout message for the degraded log;
		// rethrow any other error unchanged. Either way the caller degrades this
		// file to an empty result.
		throw timedOut
			? new Error(`Per-file review timed out after ${fileTimeoutMs}ms`, {
					cause: err,
				})
			: err;
	} finally {
		// Clear the timeout (no-op if it already fired), then release this file's
		// session immediately so its accumulated context is not retained for the
		// whole run. The operation has settled (completed or aborted) by here, so
		// delete() succeeds, keeping peak heap bounded to ~concurrency sessions.
		clearTimeout(timer);
		await session.delete().catch(() => {});
	}
}
