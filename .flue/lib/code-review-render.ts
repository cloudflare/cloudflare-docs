/**
 * Code-review comment rendering.
 *
 * Builds the Markdown bodies for all GitHub comment states:
 *   - pending  — review in progress placeholder
 *   - complete — final review with findings tables (4 sections)
 *   - failure  — transient error message
 *   - paused   — auto-review limit reached
 *
 * Section order in the rendered comment:
 *   1. ### Code Review
 *   2. ### Conventions
 *   3. ### Style Guide Review
 *
 * Also exports ReconcileResultSchema / ReconcileResult, which are the model
 * output schema for the reconcile-code-review skill and the input type for
 * the render functions.
 */
import * as v from "valibot";
import { BOT_COMMENT_MARKER, type RebaseStatus } from "./code-review-state";
import {
	postComment,
	updateIssueComment,
	type GitHubIssueComment,
} from "./github";

// ── Reconcile result schema (model output) ────────────────────────────────────

export const ReconcileResultSchema = v.object({
	active: v.array(
		v.object({
			id: v.string(),
			severity: v.picklist(["critical", "warning", "suggestion"]),
			path: v.string(),
			line: v.optional(v.number()),
			rule: v.string(),
			evidence: v.string(),
			suggestion: v.string(),
		}),
	),
	ignored_by_reviewer: v.array(
		v.object({
			id: v.string(),
			severity: v.picklist(["critical", "warning", "suggestion"]),
			path: v.string(),
			line: v.optional(v.number()),
			rule: v.string(),
			evidence: v.string(),
			suggestion: v.string(),
			reviewer_note: v.string(),
		}),
	),
	resolved: v.array(v.string()),
	summary: v.string(),
});

export type ReconcileResult = v.InferOutput<typeof ReconcileResultSchema>;

/** All three reconciled review streams rendered into one comment. */
export interface RenderReviewInput {
	code: ReconcileResult;
	style: ReconcileResult;
	conventions: ReconcileResult;
	/** True when the code review degraded (its findings may be incomplete). */
	codeFailed?: boolean;
	/** True when the style-guide review degraded (its findings may be incomplete). */
	styleFailed?: boolean;
	/** True when the conventions check degraded (its findings may be incomplete). */
	conventionsFailed?: boolean;
}

const SECTION_FAILURE_NOTE =
	"❌ This review could not complete this run; results may be incomplete. It will retry on the next push.";

// ── Rendering helpers ─────────────────────────────────────────────────────────

/**
 * Shorten a file path for display.
 * The synthetic sentinel "pr" (used by the conventions specialist for PR-level
 * findings) is rendered as the human-readable label "PR" instead of a code span.
 */
function formatFile(path: string, line?: number): string {
	if (path === "pr") return "PR";
	const short = path
		.replace(/^src\/content\/docs\//, "")
		.replace(/^src\/content\//, "");
	return line ? `\`${short}\` line ${line}` : `\`${short}\``;
}

/** Escape pipe, asterisk, and newline characters for use in Markdown table cells. */
function sanitizeTableCell(value: string): string {
	return value
		.replace(/\|/g, "\\|")
		.replace(/\*/g, "\\*")
		.replace(/\r?\n/g, " ");
}

function renderFindingRow(f: ReconcileResult["active"][number]): string {
	const file = formatFile(f.path, f.line);
	const rule = sanitizeTableCell(f.rule);
	const evidence = sanitizeTableCell(f.evidence);
	const suggestion = sanitizeTableCell(f.suggestion);
	return `| ${file} | **${rule}** — ${evidence} Fix: ${suggestion} |`;
}

/**
 * Render the "review in progress" placeholder comment.
 * When an existing completed review body is provided it is preserved below
 * a separator so the reviewer still has context while waiting.
 */
export function renderPendingComment(
	headSha: string,
	isUpdate: boolean,
	forceFullReview?: boolean,
	existingBody?: string,
): string {
	const shortSha = headSha.slice(0, 7);
	const status = forceFullReview
		? `Full review in progress for entire PR diff (commit \`${shortSha}\`)…`
		: isUpdate
			? `Reviewing new changes (commit \`${shortSha}\`)…`
			: `Review in progress for commit \`${shortSha}\`…`;

	// If there's an existing *completed* review body, preserve it below the
	// pending notice. Don't preserve a body that was itself a pending
	// placeholder (to avoid duplication). Strip old header metadata lines.
	const wasAlreadyPending = existingBody?.includes("<!-- status: pending -->");
	const preservedBody =
		existingBody && !wasAlreadyPending
			? existingBody
					.split("\n")
					.filter(
						(l) =>
							!l.startsWith("<!-- ") &&
							l !== "## Review" &&
							l !== BOT_COMMENT_MARKER,
					)
					.join("\n")
					.replace(/^\n+/, "")
			: null;

	const lines = [
		BOT_COMMENT_MARKER,
		`<!-- reviewed-head-sha: ${headSha} -->`,
		`<!-- updated-at: ${new Date().toISOString()} -->`,
		`<!-- status: pending -->`,
		"",
		"## Review",
		"",
		status,
	];

	if (preservedBody) {
		lines.push("", "---", "", preservedBody);
	}

	return lines.join("\n");
}

/** Render the transient-error failure comment. */
export function renderFailureComment(headSha: string): string {
	const shortSha = headSha.slice(0, 7);
	return [
		BOT_COMMENT_MARKER,
		`<!-- reviewed-head-sha: ${headSha} -->`,
		`<!-- updated-at: ${new Date().toISOString()} -->`,
		`<!-- status: failure -->`,
		"",
		"## Review",
		"",
		`❌ Review failed for commit \`${shortSha}\`. This is usually a transient error — it will retry on the next push.`,
	].join("\n");
}

/** Active findings (ignored ones removed) split by severity, for one section. */
function activeBySeverity(reconciled: ReconcileResult) {
	// Match by stable id so two findings sharing path/line/rule are not both
	// dropped when only one is acknowledged.
	const ignoredIds = new Set(reconciled.ignored_by_reviewer.map((f) => f.id));
	const active = reconciled.active.filter((f) => !ignoredIds.has(f.id));
	return {
		active,
		critical: active.filter((f) => f.severity === "critical"),
		warnings: active.filter((f) => f.severity === "warning"),
		suggestions: active.filter((f) => f.severity === "suggestion"),
	};
}

/** Render a `<details>` block with a severity table, when non-empty. */
function renderSeverityTable(
	lines: string[],
	label: string,
	findings: ReconcileResult["active"],
): void {
	if (findings.length === 0) return;
	lines.push("");
	lines.push("<details open>");
	lines.push(`<summary><b>${label}</b> (${findings.length})</summary>`);
	lines.push("<br/>");
	lines.push("");
	lines.push("| File | Issue |");
	lines.push("|---|---|");
	for (const f of findings) {
		lines.push(renderFindingRow(f));
	}
	lines.push("");
	lines.push("</details>");
}

/**
 * Render one review section (### heading + status + severity tables).
 * `includeCritical` controls whether a Critical table is rendered.
 * Set false for style and conventions (warning/suggestion only by convention)
 * but the caller still counts and surfaces criticals from those streams if
 * the model strays outside the specified severities.
 */
function renderSection(
	lines: string[],
	heading: string,
	noneMessage: string,
	reconciled: ReconcileResult,
	includeCritical: boolean,
	failed: boolean,
	note?: string,
): void {
	const { active, critical, warnings, suggestions } =
		activeBySeverity(reconciled);

	lines.push("");
	lines.push(`### ${heading}`);

	if (note) {
		lines.push("");
		lines.push(note);
	}

	// A degraded review must not claim "no issues" — surface the failure. Any
	// findings carried forward from a prior review are still shown below it.
	if (failed) {
		lines.push("");
		lines.push(SECTION_FAILURE_NOTE);
	}

	if (active.length === 0) {
		if (!failed) {
			lines.push("");
			lines.push(`<sub>${noneMessage}</sub>`);
		}
		return;
	}

	if (includeCritical) {
		renderSeverityTable(lines, "Critical", critical);
	}
	renderSeverityTable(lines, "Warnings", warnings);
	renderSeverityTable(lines, "Suggestions", suggestions);
}

const PR_BASE_URL = "https://github.com/cloudflare/cloudflare-docs/pull";

/**
 * Render a single finding as a named subsection for the agent prompt.
 * Uses the finding's stable id as an anchor so the user can reference it
 * when asking the agent to skip and explain specific findings.
 */
function renderFindingForPrompt(f: ReconcileResult["active"][number]): string {
	const lines: string[] = [];
	const fileLabel =
		f.path === "pr"
			? "PR-level finding"
			: f.line
				? `\`${f.path}\` line ${f.line}`
				: `\`${f.path}\``;
	lines.push(`#### ${f.id} · ${f.rule}`);
	lines.push(`- **File:** ${fileLabel}`);
	lines.push(`- **Issue:** ${f.evidence}`);
	lines.push(`- **Fix:** ${f.suggestion}`);
	return lines.join("\n");
}

/**
 * Render one stream's findings as a prompt section (e.g. "## Code Review").
 * Returns an empty string when the stream has no active findings.
 */
function renderStreamForPrompt(
	heading: string,
	reconciled: ReconcileResult,
	includeCritical: boolean,
): string {
	const { critical, warnings, suggestions } = activeBySeverity(reconciled);

	const blocks: string[] = [];

	if (includeCritical && critical.length > 0) {
		blocks.push(`### Critical (${critical.length})`);
		blocks.push("");
		for (const f of critical) {
			blocks.push(renderFindingForPrompt(f));
			blocks.push("");
		}
	}
	if (warnings.length > 0) {
		blocks.push(`### Warnings (${warnings.length})`);
		blocks.push("");
		for (const f of warnings) {
			blocks.push(renderFindingForPrompt(f));
			blocks.push("");
		}
	}
	if (suggestions.length > 0) {
		blocks.push(`### Suggestions (${suggestions.length})`);
		blocks.push("");
		for (const f of suggestions) {
			blocks.push(renderFindingForPrompt(f));
			blocks.push("");
		}
	}

	if (blocks.length === 0) return "";

	return [`## ${heading}`, "", ...blocks].join("\n");
}

/**
 * Render the collapsed "Fix in your agent" block.
 *
 * Only called when there is at least one active finding. The agent prompt is
 * wrapped in a fenced ```markdown code block so GitHub renders a one-click
 * copy button, matching the GitLab bot UX.
 */
function renderFixInAgentBlock(
	reviews: RenderReviewInput,
	prNumber?: number,
): string {
	const prRef =
		prNumber != null
			? `PR #${prNumber} (${PR_BASE_URL}/${prNumber})`
			: "this PR";

	const preamble = [
		`Fix the following review findings in ${prRef}.`,
		"",
		"Before making changes, review each finding and present a brief summary table:",
		"- For each finding, state whether you agree, disagree, or need clarification",
		"- If you disagree (e.g. the fix requires disproportionate effort for minimal benefit,",
		"  or the finding is factually incorrect), explain why",
		"- If you need clarification before deciding, ask those questions",
		"- Then share your plan for which issues to tackle and in what order",
		"",
		"After triaging, fix all legitimate findings. For any you decide to skip,",
		"post a comment on this PR with the finding ID and your reasoning.",
	].join("\n");

	const sections = [
		renderStreamForPrompt("Code Review", reviews.code, true),
		renderStreamForPrompt("Conventions", reviews.conventions, false),
		renderStreamForPrompt("Style Guide Review", reviews.style, false),
	]
		.filter(Boolean)
		.join("\n---\n\n");

	const promptBody = [preamble, "", "---", "", sections].join("\n");

	// Fenced as ```markdown so GitHub renders a copy button.
	const fenced = ["```markdown", promptBody, "```"].join("\n");

	return [
		"<details>",
		"<summary>Fix in your agent</summary>",
		"",
		fenced,
		"",
		"</details>",
	].join("\n");
}

/** Render the final review comment from all four reconciled finding streams. */
export function renderComment(
	reviews: RenderReviewInput,
	reviewedHeadSha: string,
	forceFullReview?: boolean,
	prNumber?: number,
): string {
	const shortSha = reviewedHeadSha.slice(0, 7);
	const reviewedAt = new Date().toISOString();
	const scope = forceFullReview ? "full PR diff" : `commit \`${shortSha}\``;

	const code = activeBySeverity(reviews.code);
	const style = activeBySeverity(reviews.style);
	const conventions = activeBySeverity(reviews.conventions);

	const criticalCount =
		code.critical.length + conventions.critical.length + style.critical.length;
	const warningCount =
		code.warnings.length + conventions.warnings.length + style.warnings.length;
	const suggestionCount =
		code.suggestions.length +
		conventions.suggestions.length +
		style.suggestions.length;
	const totalActive = criticalCount + warningCount + suggestionCount;
	const ignoredCount =
		reviews.code.ignored_by_reviewer.length +
		reviews.conventions.ignored_by_reviewer.length +
		reviews.style.ignored_by_reviewer.length;

	const anyFailed = Boolean(
		reviews.codeFailed || reviews.conventionsFailed || reviews.styleFailed,
	);
	const failureSuffix =
		" ⚠️ Part of the review could not complete and will retry on the next push.";

	let statusLine: string;
	if (totalActive === 0 && ignoredCount === 0) {
		statusLine = anyFailed
			? `⚠️ Part of the review could not complete in ${scope} — it will retry on the next push.`
			: `✅ No issues found in ${scope}.`;
	} else if (totalActive === 0) {
		statusLine =
			`✅ No outstanding issues in ${scope}.` +
			(anyFailed ? failureSuffix : "");
	} else {
		const pieces: string[] = [];
		if (criticalCount > 0) pieces.push(`🚨 ${criticalCount} critical`);
		if (warningCount > 0)
			pieces.push(`⚠️ ${warningCount} warning${warningCount === 1 ? "" : "s"}`);
		if (suggestionCount > 0)
			pieces.push(
				`💡 ${suggestionCount} suggestion${suggestionCount === 1 ? "" : "s"}`,
			);
		statusLine =
			`${pieces.join(", ")} found in ${scope}.` +
			(anyFailed ? failureSuffix : "");
	}

	const lines: string[] = [
		BOT_COMMENT_MARKER,
		`<!-- reviewed-head-sha: ${reviewedHeadSha} -->`,
		`<!-- reviewed-at: ${reviewedAt} -->`,
		`<!-- updated-at: ${new Date().toISOString()} -->`,
		"",
		"## Review",
		"",
		statusLine,
	];

	// ── "Fix in your agent" prompt (collapsed, copy-button fenced block) ─────
	// Only rendered when there is at least one active finding — nothing useful
	// to copy if the review is clean.
	if (totalActive > 0) {
		lines.push("");
		lines.push(renderFixInAgentBlock(reviews, prNumber));
	}

	// ── Section 1: Code Review ────────────────────────────────────────────────
	renderSection(
		lines,
		"Code Review",
		"No code review issues found.",
		reviews.code,
		true,
		Boolean(reviews.codeFailed),
		"_This code review is in beta and may not always be helpful — use your judgment._",
	);

	// ── Section 2: Conventions ────────────────────────────────────────────────
	renderSection(
		lines,
		"Conventions",
		"No convention issues found.",
		reviews.conventions,
		false,
		Boolean(reviews.conventionsFailed),
	);

	// ── Section 3: Style Guide Review ────────────────────────────────────────
	renderSection(
		lines,
		"Style Guide Review",
		"No style-guide issues found.",
		reviews.style,
		false,
		Boolean(reviews.styleFailed),
	);

	// ── Combined "acknowledged by author" block ───────────────────────────────
	// Separator visually detaches this from the last review section so it reads
	// as a top-level block rather than an appendix to Style Guide Review.
	const ignored = [
		...reviews.code.ignored_by_reviewer.map((f) => ({
			f,
			kind: "Code" as const,
		})),
		...reviews.conventions.ignored_by_reviewer.map((f) => ({
			f,
			kind: "Conventions" as const,
		})),
		...reviews.style.ignored_by_reviewer.map((f) => ({
			f,
			kind: "Style" as const,
		})),
	];
	if (ignored.length > 0) {
		lines.push("");
		lines.push("---");
		lines.push("");
		lines.push("<details>");
		lines.push(`<summary>Acknowledged by author (${ignored.length})</summary>`);
		lines.push("<br/>");
		lines.push("");
		lines.push("| Review | File | Issue | Note |");
		lines.push("|---|---|---|---|");
		for (const { f, kind } of ignored) {
			const file = formatFile(f.path, f.line);
			lines.push(
				`| ${kind} | ${file} | ${sanitizeTableCell(f.rule)} | ${sanitizeTableCell(f.reviewer_note)} |`,
			);
		}
		lines.push("");
		lines.push("</details>");
	}

	lines.push("");
	lines.push("<details>");
	lines.push("<summary>Commands</summary>");
	lines.push("<br/>");
	lines.push("");
	lines.push(
		"_Only codeowners can run commands. Post a comment with the command to trigger it._",
	);
	lines.push("");
	lines.push("| Command | Description |");
	lines.push("|---|---|");
	lines.push(
		"| `/review` | Runs a review now. Incremental if a prior review exists, full if not. |",
	);
	lines.push(
		"| `/full-review` | Re-reviews the entire PR diff from scratch, ignoring incremental history. Useful after a rebase, when you want a fresh review, or if the bot gets out of sync and reports issues that no longer exist. |",
	);
	lines.push(
		"| `/ignore-review-limit` | Permanently lifts the 2-review automatic limit for this PR. Future pushes will trigger reviews as normal. |",
	);
	lines.push(
		"| `/disable-auto-review` | Stops automatic reviews from triggering on future pushes to this PR. Codeowners can still run `/review` or `/full-review` manually. |",
	);
	lines.push(
		"| `/rebase` | Rebases the PR branch against `production`. Stops if there are conflicts and reports which files conflict. |",
	);
	lines.push(
		"| `/rebaseWithConflicts` | Rebases against `production` and attempts to resolve conflicts automatically using AI. Stops with an explanation if confidence is not high enough. |",
	);
	lines.push("");
	lines.push("</details>");

	return lines.join("\n");
}

/** Render the auto-review-limit-reached pause comment. */
export function renderReviewLimitComment(existingBody?: string): string {
	const wasAlreadyPending = existingBody?.includes("<!-- status: pending -->");
	const preservedBody =
		existingBody && !wasAlreadyPending
			? existingBody
					.split("\n")
					.filter(
						(l) =>
							!l.startsWith("<!-- ") &&
							l !== "## Review" &&
							l !== BOT_COMMENT_MARKER,
					)
					.join("\n")
					.replace(/^\n+/, "") || null
			: null;

	const lines = [
		BOT_COMMENT_MARKER,
		`<!-- updated-at: ${new Date().toISOString()} -->`,
		"",
		"## Review",
		"",
		"⏸️ Automatic reviews for this PR are paused.",
		"",
		"This PR has already received 2 automatic reviews. To run another review, a codeowner can comment `/review` or `/full-review`. To permanently lift the limit for this PR, a codeowner can comment `/ignore-review-limit`.",
		"",
		"> **Tip:** Keep PRs in draft mode until they are ready for review — the bot skips draft PRs automatically.",
	];

	if (preservedBody) {
		lines.push("", "---", "", preservedBody);
	}

	return lines.join("\n");
}

// ── Shared comment upsert ─────────────────────────────────────────────────────

/**
 * Create or update the singleton bot comment on a PR.
 * If existingBotComment is null a new comment is posted; otherwise the
 * existing comment is updated in place. All callers should go through this
 * helper so the create-if-absent logic lives in one place.
 */
export async function postOrUpdateComment(
	token: string,
	prNumber: number,
	existingBotComment: GitHubIssueComment | null,
	body: string,
): Promise<void> {
	if (existingBotComment) {
		await updateIssueComment(token, existingBotComment.id, body);
	} else {
		await postComment(token, prNumber, body);
	}
}

// ── Rebase status rendering ───────────────────────────────────────────────────

/**
 * Sanitize a detail string for safe interpolation into Markdown.
 * - Collapses newlines to a space (prevents blockquote breaks).
 * - Strips backticks (prevents breaking inline code spans when detail is
 *   placed inside `\`...\`` as in the halted-wrong-base status line).
 * - Removes leading `>` characters (prevents unintended nested blockquotes).
 */
function sanitizeRebaseDetail(detail: string): string {
	return (
		detail
			.replace(/\r?\n/g, " ") // collapse newlines
			// Remove backticks rather than escaping: CommonMark does NOT honour
			// backslash escapes inside inline code spans, so \\` inside `...` would
			// render the backslash literally. Backtick-containing branch names are
			// not valid git refs, so stripping is safe.
			.replace(/`/g, "")
			.replace(/^>+\s*/g, "") // strip leading blockquote markers
			.trim()
	);
}

/**
 * Build the one-line rebase status text for a given status value.
 * detail carries context-specific text (e.g. conflict info, base branch name).
 */
function rebaseStatusLine(
	status: RebaseStatus,
	detail: string | undefined,
	senderLogin: string | undefined,
): string {
	const by = senderLogin ? ` (triggered by @${senderLogin})` : "";
	switch (status) {
		case "in-progress":
			return `⏳ **Rebase:** Rebasing against \`production\`${by}…`;
		case "complete":
			return `✅ **Rebase:** Rebased against \`production\` — full review triggered.`;
		case "halted-conflict":
			return [
				`⚠️ **Rebase:** Rebase halted — conflicts detected. Resolve manually or use \`/rebaseWithConflicts\`.`,
				...(detail ? [`> ${sanitizeRebaseDetail(detail)}`] : []),
			].join("\n");
		case "halted-wrong-base":
			return `⚠️ **Rebase:** Rebase skipped — this PR targets \`${sanitizeRebaseDetail(detail ?? "a non-production branch")}\`, not \`production\`. Rebase is only supported for PRs targeting \`production\`.`;
		case "halted-fork":
			return `⚠️ **Rebase:** Rebase skipped — cannot push to fork branches. The PR author must rebase locally.`;
		case "halted-confidence":
			return [
				`⚠️ **Rebase:** AI conflict resolution stopped — confidence not high enough to auto-resolve.`,
				...(detail ? [`> ${sanitizeRebaseDetail(detail)}`] : []),
			].join("\n");
		case "failed":
			return `❌ **Rebase:** Failed unexpectedly. ${sanitizeRebaseDetail(detail ?? "Check the worker logs.")}`;
	}
}

const REBASE_STATUS_MARKER_RE = /^<!-- rebase-status: [^\s]+ -->\n?/m;
// Matches the status line we produce: starts with one of our known emoji
// prefixes and contains **Rebase:**, then optionally an immediately-following
// blockquote line (no blank line between them after the sanitizeRebaseDetail fix).
// Avoids a character class with multi-codepoint emoji (no-misleading-character-class).
const REBASE_STATUS_LINE_RE =
	/^(?:⏳|✅|⚠️|❌).+\*\*Rebase:\*\*[^\n]*(\n\n?>[^\n]*)*/m;

/**
 * Strip any existing rebase status block from a comment body so we can
 * replace it with an updated one.
 */
function stripRebaseBlock(body: string): string {
	let result = body.replace(REBASE_STATUS_MARKER_RE, "");
	result = result.replace(REBASE_STATUS_LINE_RE, "");
	// Collapse triple-or-more blank lines left by the removal.
	result = result.replace(/\n{3,}/g, "\n\n");
	return result;
}

/**
 * Inject or replace the rebase status block at the top of the review comment
 * body (just below `## Review`). All existing review content is preserved.
 *
 * When existingBody is null (no prior bot comment) a minimal fresh comment is
 * created containing only the rebase status — the review sections will be
 * populated when the next review runs.
 */
export function renderRebaseStatusUpdate(
	status: RebaseStatus,
	detail: string | undefined,
	senderLogin: string | undefined,
	existingBody: string | null,
): string {
	const statusLine = rebaseStatusLine(status, detail, senderLogin);
	const statusMarker = `<!-- rebase-status: ${status} -->`;

	if (!existingBody) {
		return [
			BOT_COMMENT_MARKER,
			`<!-- updated-at: ${new Date().toISOString()} -->`,
			statusMarker,
			"",
			"## Review",
			"",
			statusLine,
		].join("\n");
	}

	// Strip any previous rebase block so we can inject the new one cleanly.
	const stripped = stripRebaseBlock(existingBody);

	// Find the `## Review` heading and inject immediately after it.
	const reviewHeadingRe = /^## Review\s*$/m;
	const match = reviewHeadingRe.exec(stripped);

	let updatedBody: string;
	if (match) {
		const headingEnd = match.index + match[0].length;
		const before = stripped.slice(0, headingEnd);
		const after = stripped.slice(headingEnd);

		// Insert the rebase-status HTML marker alongside the other <!-- ... --> lines
		// that live above ## Review. All renderers emit a blank line between the
		// marker block and "## Review" (via a "" element in the lines array), so
		// the regex must allow an optional \n before the heading.
		const beforeWithMarker = before.replace(
			/^((?:<!-- [^\n]+ -->\n)*)\n?## Review/m,
			`$1${statusMarker}\n\n## Review`,
		);

		updatedBody = `${beforeWithMarker}\n\n${statusLine}${after}`;
	} else {
		// Defensive fallback: no ## Review heading — build a fresh wrapper.
		// Strip BOT_COMMENT_MARKER and all <!-- ... --> metadata lines so that
		// stale markers (reviewed-head-sha, reviewed-at, updated-at, etc.) from
		// the original body are not appended below the separator, where
		// extractReviewedHeadSha / extractReviewedAt would pick them up instead
		// of the freshly-emitted ones above.
		const strippedBody = stripped
			.replace(BOT_COMMENT_MARKER + "\n", "")
			.replace(BOT_COMMENT_MARKER, "")
			.replace(/^<!-- [^\n]+ -->\n?/gm, "")
			.replace(/\n{3,}/g, "\n\n")
			.trim();
		updatedBody = [
			BOT_COMMENT_MARKER,
			`<!-- updated-at: ${new Date().toISOString()} -->`,
			statusMarker,
			"",
			"## Review",
			"",
			statusLine,
			"",
			"---",
			"",
			strippedBody,
		].join("\n");
	}

	// Always refresh the updated-at timestamp.
	return updatedBody.replace(
		/<!-- updated-at: [^\n]+ -->/,
		`<!-- updated-at: ${new Date().toISOString()} -->`,
	);
}
