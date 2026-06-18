/**
 * Style-guide review specialist workflow
 *
 * A stateless specialist dispatched by the code-review orchestrator. It runs in
 * its own Durable Object (its own isolate and memory budget), self-fetches the
 * PR diff for the requested mode, stages it into its own workspace, runs the
 * per-file style-guide fan-out, and returns the findings as its run result.
 *
 * POST /workflows/style-guide-specialist  (internal — admitted by the orchestrator)
 */
import type { FlueContext, WorkflowRouteHandler } from "@flue/runtime";
import { getShellSandbox } from "../connectors/cloudflare-shell";
import { getDefaultWorkspace } from "../connectors/cloudflare-shell";
import {
	comparePullRequestHeads,
	getInstallationToken,
	getPullRequestFiles,
} from "../lib/github";
import { writeDiffToWorkspace } from "../lib/code-review-diff";
import {
	runStyleGuideReviewInProcess,
	selectStyleGuideFiles,
	STYLE_GUIDE_CONCURRENCY,
} from "../lib/style-guide-inproc";
import type { StyleGuideResult } from "../lib/style-guide-results";
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
}: FlueContext): Promise<StyleGuideResult> {
	const input: ReviewSpecialistPayload = parseReviewSpecialistPayload(
		payload,
		"style-guide-specialist",
	);
	const typedEnv = env as Record<string, unknown>;
	const loader = typedEnv.LOADER as Parameters<
		typeof getShellSandbox
	>[0]["loader"];
	const token = await getInstallationToken(typedEnv as Record<string, string>);

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

	const selected = selectStyleGuideFiles(files);
	const workspace = getDefaultWorkspace();
	const diffDir = `diffs/pr-${input.number}/runs/${runId}`;

	await writeDiffToWorkspace(
		workspace,
		diffDir,
		selected,
		toDiffPullRequest(input.pr),
	);

	console.log({
		message: `Style-guide specialist started: PR #${input.number} — ${selected.length} file(s), concurrency ${STYLE_GUIDE_CONCURRENCY}`,
		event: "style_guide_specialist",
		number: input.number,
		files: selected.length,
		diffMode: input.diffMode.type,
		runId,
		action: "started",
	});

	const result = await runStyleGuideReviewInProcess({
		init,
		workspace,
		loader,
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
		concurrency: STYLE_GUIDE_CONCURRENCY,
	});

	console.log({
		message: `Style-guide specialist complete: PR #${input.number} — ${result.findings.length} finding(s) across ${result.reviewedFiles.length} file(s)`,
		event: "style_guide_specialist",
		number: input.number,
		findings: result.findings.length,
		reviewedFiles: result.reviewedFiles.length,
		runId,
		action: "complete",
	});

	return result;
}
