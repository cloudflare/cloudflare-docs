/**
 * Conventions specialist workflow
 *
 * A stateless specialist dispatched by the code-review orchestrator. It checks
 * the PR's title, description, and scope against the repository's PR conventions
 * using the conventions-check skill in a single session.
 *
 * Unlike the code/style specialists, this one does NOT review diffs — it
 * reviews only the PR metadata. It reads title and body from the specialist
 * payload (no extra GitHub fetch needed), fetches the PR template at the base
 * ref for template-driven checks, and computes the set of renamed/deleted docs
 * files from the PR file list.
 *
 * The synthetic file sentinel "pr" in reviewedFiles tells the reconciler that
 * PR-level findings were fully evaluated in this run.
 *
 * diffMode for reconciliation is always { type: "full" } — the PR description
 * is always the current state regardless of what the orchestrator decided for
 * the code/style diffs.
 *
 * POST /workflows/conventions-specialist  (internal — admitted by the orchestrator)
 */
import type { FlueContext, WorkflowRouteHandler } from "@flue/runtime";
import { createAgent } from "@flue/runtime";
import {
	getShellSandbox,
	getDefaultWorkspace,
} from "../connectors/cloudflare-shell";
import {
	getInstallationToken,
	getPullRequestFiles,
	getRepoFileContent,
} from "../lib/github";
import conventionsCheckSkill from "../.agents/skills/conventions-check/SKILL.md" with { type: "skill" };
import type { CodeReviewResult } from "../lib/code-review-results";
import { assignCodeReviewFindingIds } from "../lib/code-review-results";
import {
	type ReviewSpecialistPayload,
	parseReviewSpecialistPayload,
} from "../lib/review-specialist";
import {
	EXPECTED_STREAMS,
	degradedConventionsResult,
	reportSpecialistResult,
} from "../lib/finalize-rendezvous";
import * as v from "valibot";

export const route: WorkflowRouteHandler = async (_c, next) => next();

/** Derive a safe origin string from an optional request, returning "" on failure. */
function safeOrigin(req: Request | undefined): string {
	if (!req) return "";
	try {
		return new URL(req.url).origin;
	} catch {
		return "";
	}
}

// Valibot schema for the conventions-check skill result.
const ConventionsResultFromModelSchema = v.object({
	findings: v.array(
		v.object({
			severity: v.picklist(["critical", "warning", "suggestion"]),
			path: v.string(),
			line: v.optional(v.number()),
			rule: v.string(),
			evidence: v.string(),
			suggestion: v.string(),
		}),
	),
	summary: v.string(),
});

export async function run({
	id: runId,
	init,
	payload,
	env,
	req,
}: FlueContext): Promise<CodeReviewResult> {
	const typedEnv = env as Record<string, unknown>;
	const bucket = typedEnv.DOCS_FLUE_BUCKET as unknown as R2Bucket;

	let input: ReviewSpecialistPayload | undefined;
	let baseUrl = safeOrigin(req);
	let result: CodeReviewResult = degradedConventionsResult();
	let reviewOk = false;
	let session:
		| Awaited<ReturnType<Awaited<ReturnType<FlueContext["init"]>>["session"]>>
		| undefined;

	try {
		input = parseReviewSpecialistPayload(payload, "conventions-specialist");
		baseUrl = input.baseUrl ?? safeOrigin(req);
		const loader = typedEnv.LOADER as Parameters<
			typeof getShellSandbox
		>[0]["loader"];
		const token = await getInstallationToken(
			typedEnv as Record<string, string>,
		);

		// Fetch PR files and PR template in parallel.
		// Title and body come directly from the payload (captured at dispatch time).
		const [files, prTemplate] = await Promise.all([
			getPullRequestFiles(token, input.number),
			getRepoFileContent(
				token,
				".github/pull_request_template.md",
				input.pr.base,
			).catch(() => null),
		]);

		// Compute the old paths of renamed/deleted docs MDX files.
		// For renames: GitHub sets filename = new path, previous_filename = old path.
		// For removals: filename is the old path.
		const renamedDocFiles: string[] = files
			.filter(
				(f) =>
					(f.status === "renamed" || f.status === "removed") &&
					/^src\/content\/docs\/.+\.mdx$/.test(
						f.status === "renamed"
							? (f.previous_filename ?? f.filename)
							: f.filename,
					),
			)
			.map((f) =>
				f.status === "renamed"
					? (f.previous_filename ?? f.filename)
					: f.filename,
			);

		console.log({
			message: `Conventions specialist started: PR #${input.number} — ${renamedDocFiles.length} renamed doc file(s)`,
			event: "conventions_specialist",
			number: input.number,
			renamedDocFiles: renamedDocFiles.length,
			runId,
			action: "started",
		});

		const workspace = getDefaultWorkspace();
		const agent = createAgent(() => ({
			sandbox: getShellSandbox({ workspace, loader }),
			model: "cloudflare/@cf/moonshotai/kimi-k2.7-code",
			skills: [conventionsCheckSkill],
		}));
		const harness = await init(agent);
		const sessionKey = `conventions-specialist:${input.number}:${input.headSha}`;
		session = await harness.session(sessionKey);

		// Compact file list for scope-accuracy check — paths, status, and change
		// counts only; no patch content so the payload stays light.
		const changedFiles = files.map((f) => ({
			filename: f.filename,
			status: f.status,
			additions: f.additions,
			deletions: f.deletions,
		}));

		const { data } = await session.skill("conventions-check", {
			model: "cloudflare/@cf/moonshotai/kimi-k2.7-code",
			args: {
				pullRequest: { number: input.number, title: input.pr.title },
				description: input.pr.body,
				prTemplate: prTemplate ?? "",
				renamedDocFiles,
				changedFiles,
			},
			result: ConventionsResultFromModelSchema,
		});

		if (data) {
			const findingsWithIds = await assignCodeReviewFindingIds(
				data.findings.map((f) => ({
					...f,
					// Force to warning — skill is specified to emit warning-only, but
					// guard in case the model strays.
					severity: "warning" as const,
				})),
			);
			// Override ID prefix: CV- instead of CR-
			const cvFindings = findingsWithIds.map((f) => ({
				...f,
				id: f.id.replace(/^CR-/, "CV-"),
			}));
			result = {
				findings: cvFindings,
				summary: data.summary,
				reviewedFiles: ["pr"],
			};
		}

		reviewOk = true;

		console.log({
			message: `Conventions specialist complete: PR #${input.number} — ${result.findings.length} finding(s)`,
			event: "conventions_specialist",
			number: input.number,
			findings: result.findings.length,
			runId,
			action: "complete",
		});
	} catch (err) {
		const errMsg = err instanceof Error ? err.message : String(err);
		console.log({
			message: `Conventions specialist error (degraded): PR #${input?.number ?? "unknown"} — ${errMsg}`,
			event: "conventions_specialist",
			number: input?.number,
			error: errMsg,
			runId,
			action: "specialist_error_degraded",
		});
		// result and reviewOk keep their degraded defaults.
	} finally {
		// Delete the session so its SQLite event-stream data is cleaned up.
		// Without this the DO's SQLite WAL accumulates across runs, growing the
		// state that must be loaded on each alarm restart.
		await session?.delete().catch(() => {});
	}

	// ── Rendezvous: write final result, try to claim finalize lock ─────────────
	await reportSpecialistResult({
		bucket,
		env: typedEnv,
		baseUrl,
		dispatchId: input?.dispatchId ?? "",
		prNumber: input?.number ?? 0,
		headSha: input?.headSha ?? "",
		stream: "conventions",
		expectedStreams: input?.expectedStreams ?? [...EXPECTED_STREAMS],
		ok: reviewOk,
		result,
		runId,
		eventName: "conventions_specialist",
	});

	return result;
}
