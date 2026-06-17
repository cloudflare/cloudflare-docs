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
export const STYLE_GUIDE_CONCURRENCY = 5;

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
 * Run up to `limit` async tasks concurrently and return results in input order.
 * Tasks are expected not to reject — wrap per-task error handling at the call
 * site so one failure cannot abort the pool.
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

	// ── Init a separate named harness over the shared workspace. The
	//    orchestrator owns the default harness for reconciliation, so this
	//    fan-out uses a distinct name to satisfy the once-per-name rule.
	//    The skill is registered here; its reference rules ship as packaged
	//    resources read via the `read` tool. ────────────────────────────────
	const agent = createAgent(() => ({
		sandbox: getShellSandbox({ workspace, loader }),
		model: "cloudflare/@cf/moonshotai/kimi-k2.7-code",
		compaction: { reserveTokens: 64_000 },
		skills: [styleGuideSkill],
	}));
	const harness = await init(agent, { name: "style-guide" });

	// ── One detached session per file, fired concurrently. Each file's
	//    failure is caught and degraded so it cannot abort the others. ───────
	const tasks = reviewFilenames.map(
		(filename, index) => async (): Promise<StyleGuideResult> => {
			try {
				return await reviewSingleFile({
					harness,
					sessionName: `sg:${index}`,
					pullRequest,
					diffDir,
					filename,
				});
			} catch (err) {
				const errMsg = err instanceof Error ? err.message : String(err);
				console.error({
					message: `Style-guide file review failed (degraded): PR #${prNumber} — ${filename} — ${errMsg}`,
					event: "code_review_orchestrator",
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
}: {
	harness: Awaited<ReturnType<FlueContext["init"]>>;
	sessionName: string;
	pullRequest: StyleGuidePullRequest;
	diffDir: string;
	filename: string;
}): Promise<StyleGuideResult> {
	const session = await harness.session(sessionName);

	// Structured result mode: flue injects finish/give_up tools and loops until
	// the model calls finish — reliable across models that don't self-terminate.
	const skillResult = await session.skill("style-guide-review", {
		result: StyleGuideResultFromModelSchema,
		args: {
			pullRequest,
			diffDir,
			filename,
		},
	});

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
}
