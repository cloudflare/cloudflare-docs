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
import * as v from "valibot";
import {
	getDefaultWorkspace,
	getShellSandbox,
} from "../connectors/cloudflare-shell";
import {
	addReactionToComment,
	getInstallationToken,
	getIssueComments,
	postComment,
	removeReactionFromComment,
	updateIssueComment,
	type GitHubIssueComment,
} from "../lib/github";
import { makeDependabotReviewTools } from "../lib/github-repo-tools";

export const route: WorkflowRouteHandler = async (_c, next) => next();

// ── Marker / schema ───────────────────────────────────────────────────────────

const BOT_COMMENT_MARKER = "<!-- cloudflare-docs-flue-dependabot-review -->";

interface DependabotPackage {
	name: string;
	from: string;
	to: string;
	repoUrl?: string;
}

interface DependabotReviewPayload {
	eventType: "pull_request";
	number: number;
	/** Comment ID that triggered /review — swap 👀 → 👍 when done. */
	triggerCommentId?: number;
	/** Reaction ID to remove when done. */
	triggerEyesReactionId?: number | null;
}

const DependabotReviewResultSchema = v.object({
	summary: v.string(),
	recommendation: v.picklist(["merge", "merge-verify", "investigate"]),
	packageReviews: v.array(
		v.object({
			name: v.string(),
			from: v.string(),
			to: v.string(),
			type: v.string(),
			dependencyType: v.string(),
			whatChanged: v.array(v.string()),
			repoUsage: v.string(),
			impact: v.picklist(["None", "Very Low", "Low", "Medium", "High"]),
			impactReason: v.string(),
		}),
	),
});

type DependabotReviewResult = v.InferOutput<
	typeof DependabotReviewResultSchema
>;

// ── Dependabot PR body parser ─────────────────────────────────────────────────

/**
 * Parse the Dependabot PR body for bumped packages.
 *
 * Grouped PRs use a markdown table:
 *   | Package | From | To |
 *   | --- | --- | --- |
 *   | [name](url) | `old` | `new` |
 *
 * Single-package PRs use prose on the first line:
 *   Bumps [name](url) from X to Y.
 */
function parseDependabotPackages(body: string): DependabotPackage[] {
	const packages: DependabotPackage[] = [];

	// Grouped PR: package table rows
	const tableRowRe =
		/^\|\s*\[([^\]]+)\]\(([^)]+)\)\s*\|\s*`([^`]+)`\s*\|\s*`([^`]+)`\s*\|/gm;
	let m: RegExpExecArray | null;
	while ((m = tableRowRe.exec(body)) !== null) {
		packages.push({
			name: m[1],
			repoUrl: m[2],
			from: m[3],
			to: m[4],
		});
	}

	// Single-package PR: prose on first line — "Bumps [name](url) from X to Y."
	if (packages.length === 0) {
		const proseRe = /^Bumps \[([^\]]+)\]\(([^)]+)\) from ([\S]+) to ([\S]+)/m;
		const pm = proseRe.exec(body);
		if (pm) {
			packages.push({
				name: pm[1],
				repoUrl: pm[2],
				from: pm[3],
				to: pm[4].replace(/\.$/, ""), // strip trailing period if present
			});
		}
	}

	return packages;
}

// ── Render comment ────────────────────────────────────────────────────────────

function renderComment(
	result: DependabotReviewResult,
	prNumber: number,
): string {
	const recLabel = {
		merge: "✅ Merge",
		"merge-verify": "✅ Merge + spot-check",
		investigate: "⚠️ Investigate before merging",
	}[result.recommendation];

	const impactEmoji: Record<string, string> = {
		None: "⬜",
		"Very Low": "🟢",
		Low: "🟡",
		Medium: "🟠",
		High: "🔴",
	};

	const lines: string[] = [
		BOT_COMMENT_MARKER,
		`<!-- pr: ${prNumber} -->`,
		`<!-- updated-at: ${new Date().toISOString()} -->`,
		"",
		"## Dependabot review",
		"",
	];

	// ── Summary table (always visible) ───────────────────────────────────────
	lines.push("| Package | Impact | Recommendation |");
	lines.push("|---------|--------|----------------|");
	for (const pkg of result.packageReviews) {
		const emoji = impactEmoji[pkg.impact] ?? "⬜";
		const pkgRec =
			pkg.impact === "High" || pkg.impact === "Medium"
				? "⚠️ Verify"
				: "✅ Merge";
		lines.push(
			`| \`${pkg.name}\` ${pkg.from} → ${pkg.to} | ${emoji} ${pkg.impact} | ${pkgRec} |`,
		);
	}
	lines.push("");
	lines.push(`**Overall:** ${recLabel}`);
	if (result.summary) {
		lines.push("");
		lines.push(result.summary);
	}
	lines.push("");

	// ── Per-package detail blocks (collapsed) ─────────────────────────────────
	lines.push("<details>");
	lines.push("<summary>Package details</summary>");
	lines.push("<br/>");
	lines.push("");
	for (const pkg of result.packageReviews) {
		const emoji = impactEmoji[pkg.impact] ?? "⬜";
		lines.push(`### \`${pkg.name}\`: ${pkg.from} → ${pkg.to}`);
		lines.push("");
		lines.push(`**Type:** ${pkg.type}`);
		lines.push(`**Dependency type:** ${pkg.dependencyType}`);
		lines.push("");
		if (pkg.whatChanged.length > 0) {
			lines.push("**What changed**");
			for (const change of pkg.whatChanged) {
				lines.push(`- ${change}`);
			}
			lines.push("");
		}
		lines.push("**Usage in this repo**");
		lines.push(pkg.repoUsage);
		lines.push("");
		lines.push(`**Impact:** ${emoji} ${pkg.impact} — ${pkg.impactReason}`);
		lines.push("");
		lines.push("---");
		lines.push("");
	}
	lines.push("</details>");

	return lines.join("\n");
}

// ── Comment helpers ───────────────────────────────────────────────────────────

async function findExistingBotComment(
	token: string,
	prNumber: number,
): Promise<GitHubIssueComment | null> {
	const comments = await getIssueComments(token, prNumber);
	return comments.findLast((c) => c.body?.includes(BOT_COMMENT_MARKER)) ?? null;
}

async function postOrUpdateComment(
	token: string,
	prNumber: number,
	existing: GitHubIssueComment | null,
	body: string,
): Promise<void> {
	if (existing) {
		await updateIssueComment(token, existing.id, body);
	} else {
		await postComment(token, prNumber, body);
	}
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
		model: "cloudflare/@cf/moonshotai/kimi-k2.6",
		tools: repoTools,
	}));
	const harness = await init(agent);
	const session = await harness.session(
		`dependabot-review:${input.number}:${pr.head.sha}:${runId}`,
	);

	// ── 4. Post a "review in progress" placeholder if in comment mode ─────────
	let existingComment: GitHubIssueComment | null = null;
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
