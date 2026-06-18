/**
 * Generic code-review specialist workflow
 *
 * A stateless specialist dispatched by the code-review orchestrator. It runs in
 * its own Durable Object (its own isolate and memory budget), self-fetches the
 * PR diff for the requested mode, stages it into its own workspace, runs the
 * per-file code-review fan-out, and returns the findings as its run result.
 *
 * Isolating each specialist in its own DO is what keeps the orchestrator DO
 * from over-running its memory limit when both reviews run at once.
 *
 * POST /workflows/code-review-specialist  (internal — admitted by the orchestrator)
 */
import type { FlueContext, WorkflowRouteHandler } from "@flue/runtime";
import {
	getDefaultWorkspace,
	getShellSandbox,
} from "../connectors/cloudflare-shell";
import {
	comparePullRequestHeads,
	getInstallationToken,
	getPullRequestFiles,
	getRepoFileContent,
} from "../lib/github";
import { writeDiffToWorkspace } from "../lib/code-review-diff";
import {
	CODE_REVIEW_CONCURRENCY,
	runCodeReviewInProcess,
	selectCodeReviewFiles,
} from "../lib/code-review-inproc";
import type { CodeReviewResult } from "../lib/code-review-results";
import {
	type ReviewSpecialistPayload,
	parseReviewSpecialistPayload,
	toDiffPullRequest,
} from "../lib/review-specialist";

export const route: WorkflowRouteHandler = async (_c, next) => next();

export async function run({
	id: runId,
	init,
	payload,
	env,
}: FlueContext): Promise<CodeReviewResult> {
	const input: ReviewSpecialistPayload = parseReviewSpecialistPayload(
		payload,
		"code-review-specialist",
	);
	const typedEnv = env as Record<string, unknown>;
	const loader = typedEnv.LOADER as Parameters<
		typeof getShellSandbox
	>[0]["loader"];
	const token = await getInstallationToken(typedEnv as Record<string, string>);

	// Self-fetch the diff for the requested mode. Incremental is SHA-pinned;
	// if the base SHA is gone (force-push since the orchestrator decided),
	// self-heal to the full PR diff.
	let files: Awaited<ReturnType<typeof getPullRequestFiles>>;
	if (input.diffMode.type === "incremental") {
		const compare = await comparePullRequestHeads(
			token,
			input.diffMode.fromSha,
			input.diffMode.toSha,
		);
		files = compare
			? compare.files
			: await getPullRequestFiles(token, input.number);
	} else {
		files = await getPullRequestFiles(token, input.number);
	}

	const selected = selectCodeReviewFiles(files);
	const workspace = getDefaultWorkspace();
	const diffDir = `diffs/pr-${input.number}/runs/${runId}`;

	await writeDiffToWorkspace(
		workspace,
		diffDir,
		selected,
		toDiffPullRequest(input.pr),
	);

	// Load the repo's root AGENTS.md from the PR base ref (trusted, not the PR
	// head — the content is injected into agent instructions). Best-effort.
	const repoAgentsMd =
		selected.length > 0
			? ((await getRepoFileContent(token, "AGENTS.md", input.pr.base).catch(
					() => null,
				)) ?? undefined)
			: undefined;

	console.log({
		message: `Code review specialist started: PR #${input.number} — ${selected.length} file(s), concurrency ${CODE_REVIEW_CONCURRENCY}`,
		event: "code_review_specialist",
		number: input.number,
		files: selected.length,
		diffMode: input.diffMode.type,
		runId,
		action: "started",
	});

	const result = await runCodeReviewInProcess({
		init,
		workspace,
		loader,
		token,
		headSha: input.headSha,
		repoAgentsMd,
		prNumber: input.number,
		pullRequest: {
			number: input.pr.number,
			title: input.pr.title,
			base: input.pr.base,
			head: input.pr.head,
		},
		diffDir,
		files: selected,
		runId,
		concurrency: CODE_REVIEW_CONCURRENCY,
	});

	console.log({
		message: `Code review specialist complete: PR #${input.number} — ${result.findings.length} finding(s) across ${result.reviewedFiles.length} file(s)`,
		event: "code_review_specialist",
		number: input.number,
		findings: result.findings.length,
		reviewedFiles: result.reviewedFiles.length,
		runId,
		action: "complete",
	});

	return result;
}
