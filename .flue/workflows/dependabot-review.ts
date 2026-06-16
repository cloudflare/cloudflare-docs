/**
 * Dependabot review workflow
 *
 * Triggered from the orchestrator when a pull_request event comes in from
 * dependabot[bot]. Analyzes every bumped package — what changed upstream,
 * how this repo uses it, and whether action is needed beyond merging.
 *
 * Posts a single "## Dependabot review" comment on the PR (create or update).
 *
 * Behavior is controlled by DOCS_FLUE_REVIEW_MODE:
 *   "log"     — run analysis and log the rendered comment. Does NOT post.
 *   "comment" — create or update the single bot review comment on the PR.
 *
 * POST /workflows/dependabot-review
 */
import type { FlueContext, WorkflowRouteHandler } from "@flue/runtime";
import { createAgent } from "@flue/runtime";
import {
	getDefaultWorkspace,
	getShellSandbox,
} from "../connectors/cloudflare-shell";
import {
	addReactionToComment,
	getInstallationToken,
	removeReactionFromComment,
} from "../lib/github";
import { makeDependabotReviewTools } from "../lib/github-repo-tools";
import {
	BOT_COMMENT_MARKER,
	DependabotReviewResultSchema,
	type DependabotReviewResult,
	findExistingBotComment,
	parseDependabotPackages,
	postOrUpdateComment,
	renderComment,
} from "../lib/dependabot-review";

export const route: WorkflowRouteHandler = async (_c, next) => next();

interface DependabotReviewPayload {
	eventType: "pull_request";
	number: number;
	/** Comment ID that triggered /review — swap 👀 → 👍 when done. */
	triggerCommentId?: number;
	/** Reaction ID to remove when done. */
	triggerEyesReactionId?: number | null;
}

// ── run() ─────────────────────────────────────────────────────────────────────

export async function run({ id: runId, init, payload, env }: FlueContext) {
	const input = parsePayload(payload);
	const typedEnv = env as Record<string, unknown>;
	const reviewMode =
		(typedEnv.DOCS_FLUE_REVIEW_MODE as string | undefined) ?? "log";
	const bucket = typedEnv.DOCS_FLUE_BUCKET as unknown as R2Bucket;
	const loader = typedEnv.LOADER as Parameters<
		typeof getShellSandbox
	>[0]["loader"];

	const token = await getInstallationToken(typedEnv as Record<string, string>);

	// ── 1. Fetch PR metadata to extract packages and body ─────────────────────
	const prRes = await fetch(
		`https://api.github.com/repos/cloudflare/cloudflare-docs/pulls/${input.number}`,
		{
			headers: {
				Authorization: `Bearer ${token}`,
				Accept: "application/vnd.github+json",
				"X-GitHub-Api-Version": "2022-11-28",
				"User-Agent": "cloudflare-docs-agents",
			},
		},
	);
	if (!prRes.ok) {
		throw new Error(
			`Failed to fetch PR ${input.number}: ${prRes.status} ${await prRes.text()}`,
		);
	}
	const pr = (await prRes.json()) as {
		number: number;
		title: string;
		body: string | null;
		user: { login: string };
		head: { sha: string };
	};

	// Verify this is actually a Dependabot PR
	if (pr.user.login !== "dependabot[bot]") {
		return {
			acted: false,
			summary: `PR #${input.number} is not from dependabot[bot] (author: ${pr.user.login}).`,
		};
	}

	const prBody = pr.body ?? "";
	const packages = parseDependabotPackages(prBody);

	if (packages.length === 0) {
		return {
			acted: false,
			summary: `Could not parse any packages from Dependabot PR body for #${input.number}.`,
		};
	}

	console.log({
		message: `Dependabot review started: PR #${input.number} — ${packages.length} package(s)`,
		event: "dependabot_review",
		number: input.number,
		packages: packages.map((p) => `${p.name} ${p.from}→${p.to}`),
		runId,
		action: "started",
	});

	// ── 2. Hydrate the skill before init() ────────────────────────────────────
	const workspace = getDefaultWorkspace();
	const skillObj = await bucket.get(
		".agents/skills/dependabot-review/SKILL.md",
	);
	if (!skillObj) {
		throw new Error(
			"Missing .agents/skills/dependabot-review/SKILL.md in DOCS_FLUE_BUCKET. " +
				"Run `pnpm run flue:sync-agents:local` before invoking the workflow.",
		);
	}
	await workspace.mkdir("/.agents/skills/dependabot-review", {
		recursive: true,
	});
	await workspace.writeFile(
		"/.agents/skills/dependabot-review/SKILL.md",
		await skillObj.text(),
	);

	// ── 3. Create agent with GitHub repo tools ────────────────────────────────
	const repoTools = makeDependabotReviewTools(token, input.number);

	const agent = createAgent(() => ({
		sandbox: getShellSandbox({ workspace, loader }),
		model: "cloudflare/@cf/moonshotai/kimi-k2.7-code",
		tools: repoTools,
	}));
	const harness = await init(agent);
	const session = await harness.session(
		`dependabot-review:${input.number}:${pr.head.sha}:${runId}`,
	);

	// ── 4. Post a "review in progress" placeholder if in comment mode ─────────
	let existingComment: Awaited<ReturnType<typeof findExistingBotComment>> =
		null;
	if (reviewMode === "comment") {
		existingComment = await findExistingBotComment(token, input.number);
		await postOrUpdateComment(
			token,
			input.number,
			existingComment,
			[
				BOT_COMMENT_MARKER,
				`<!-- pr: ${input.number} -->`,
				`<!-- updated-at: ${new Date().toISOString()} -->`,
				"",
				"## Dependabot review",
				"",
				`⏳ Review in progress for **${packages.length}** package${packages.length !== 1 ? "s" : ""}…`,
			].join("\n"),
		);
	}

	// ── 5. Run the skill ───────────────────────────────────────────────────────
	let reviewResult: DependabotReviewResult | null = null;
	try {
		const { data } = await session.skill("dependabot-review", {
			result: DependabotReviewResultSchema,
			args: {
				prNumber: input.number,
				prTitle: pr.title,
				prBody,
				packages,
			},
		});
		reviewResult = data ?? null;
	} catch (err) {
		const errMsg = err instanceof Error ? err.message : String(err);
		console.log({
			message: `Dependabot review skill failed: PR #${input.number} — ${errMsg}`,
			event: "dependabot_review",
			number: input.number,
			error: errMsg,
			runId,
			action: "skill_failed",
		});

		if (reviewMode === "comment") {
			const failureBody = [
				BOT_COMMENT_MARKER,
				`<!-- pr: ${input.number} -->`,
				`<!-- updated-at: ${new Date().toISOString()} -->`,
				"",
				"## Dependabot review",
				"",
				"❌ Review failed — this is usually a transient error. It will retry on the next push.",
			].join("\n");
			const fresh = await findExistingBotComment(token, input.number);
			await postOrUpdateComment(token, input.number, fresh, failureBody).catch(
				() => {},
			);
		}

		return {
			mode: reviewMode,
			summary: "Dependabot review skill failed.",
			packageCount: packages.length,
			commentBody: null,
		};
	}

	if (!reviewResult) {
		return {
			mode: reviewMode,
			summary: "Dependabot review produced no result.",
			packageCount: packages.length,
			commentBody: null,
		};
	}

	// ── 6. Render and post the final comment ──────────────────────────────────
	const commentBody = renderComment(reviewResult, input.number);

	if (reviewMode === "log") {
		console.log({
			message: `Dependabot review complete (log mode): PR #${input.number} — ${packages.length} packages, recommendation: ${reviewResult.recommendation}`,
			event: "dependabot_review",
			number: input.number,
			mode: reviewMode,
			recommendation: reviewResult.recommendation,
			packageCount: packages.length,
			runId,
			action: "complete_log_mode",
			commentBody,
		});
	} else {
		const fresh =
			existingComment ?? (await findExistingBotComment(token, input.number));
		await postOrUpdateComment(token, input.number, fresh, commentBody);

		// Swap 👀 → 👍 on the trigger comment if this was a slash-command run
		if (input.triggerCommentId) {
			if (input.triggerEyesReactionId) {
				await removeReactionFromComment(
					token,
					input.triggerCommentId,
					input.triggerEyesReactionId,
				).catch(() => {}); // non-fatal
			}
			await addReactionToComment(token, input.triggerCommentId, "+1").catch(
				() => {},
			); // non-fatal
		}

		console.log({
			message: `Dependabot review complete: PR #${input.number} — ${reviewResult.recommendation}`,
			event: "dependabot_review",
			number: input.number,
			mode: reviewMode,
			recommendation: reviewResult.recommendation,
			packageCount: packages.length,
			runId,
			action: "complete_comment_posted",
		});
	}

	return {
		mode: reviewMode,
		recommendation: reviewResult.recommendation,
		packageCount: packages.length,
		summary: reviewResult.summary,
		commentBody,
	};
}

// ── Helpers ───────────────────────────────────────────────────────────────────

function parsePayload(payload: unknown): DependabotReviewPayload {
	const input = payload as Partial<DependabotReviewPayload>;
	if (input.eventType !== "pull_request" || typeof input.number !== "number") {
		throw new Error(
			'[flue] dependabot-review requires payload { eventType: "pull_request", number: number }.',
		);
	}
	return {
		eventType: input.eventType,
		number: input.number,
		triggerCommentId:
			typeof input.triggerCommentId === "number"
				? input.triggerCommentId
				: undefined,
		triggerEyesReactionId:
			typeof input.triggerEyesReactionId === "number"
				? input.triggerEyesReactionId
				: null,
	};
}
