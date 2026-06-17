/**
 * Code-review comment rendering.
 *
 * Builds the Markdown bodies for all GitHub comment states:
 *   - pending  — review in progress placeholder
 *   - complete — final review with findings table
 *   - failure  — transient error message
 *   - paused   — auto-review limit reached
 *
 * Also exports ReconcileResultSchema / ReconcileResult, which are the model
 * output schema for the reconcile-code-review skill and the input type for
 * the render functions.
 */
import * as v from "valibot";
import { BOT_COMMENT_MARKER } from "./code-review-state";

// ── Reconcile result schema (model output) ────────────────────────────────────

export const ReconcileResultSchema = v.object({
	active: v.array(
		v.object({
			id: v.string(),
			severity: v.picklist(["warning", "suggestion"]),
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
			severity: v.picklist(["warning", "suggestion"]),
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

// ── Rendering helpers ─────────────────────────────────────────────────────────

/** Shorten a file path for display: drop src/content/docs/ or src/content/ prefix. */
function formatFile(path: string, line?: number): string {
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
		"",
		"## Review",
		"",
		`❌ Review failed for commit \`${shortSha}\`. This is usually a transient error — it will retry on the next push.`,
	].join("\n");
}

/** Render the final review comment from reconciled findings. */
export function renderComment(
	reconciled: ReconcileResult,
	reviewedHeadSha: string,
	forceFullReview?: boolean,
): string {
	const shortSha = reviewedHeadSha.slice(0, 7);
	const reviewedAt = new Date().toISOString();

	// Exclude anything acknowledged by the reviewer from active sections.
	const ignoredPaths = new Set(
		reconciled.ignored_by_reviewer.map((f) => `${f.path}:${f.line}:${f.rule}`),
	);
	const activeFindings = reconciled.active.filter(
		(f) => !ignoredPaths.has(`${f.path}:${f.line}:${f.rule}`),
	);
	const warnings = activeFindings.filter((f) => f.severity === "warning");
	const suggestions = activeFindings.filter((f) => f.severity === "suggestion");
	const totalActive = activeFindings.length;
	const scope = forceFullReview ? "full PR diff" : `commit \`${shortSha}\``;

	let statusLine: string;
	if (totalActive === 0 && reconciled.ignored_by_reviewer.length === 0) {
		statusLine = `✅ No style-guide issues found in ${scope}.`;
	} else if (warnings.length > 0) {
		statusLine = `⚠️ ${warnings.length} warning${warnings.length === 1 ? "" : "s"}${suggestions.length > 0 ? ` and ${suggestions.length} suggestion${suggestions.length === 1 ? "" : "s"}` : ""} found in ${scope}.`;
	} else {
		statusLine = `💡 ${suggestions.length} suggestion${suggestions.length === 1 ? "" : "s"} found in ${scope}.`;
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

	if (warnings.length > 0) {
		lines.push("");
		lines.push("<details open>");
		lines.push(`<summary><b>Warnings</b> (${warnings.length})</summary>`);
		lines.push("<br/>");
		lines.push("");
		lines.push("| File | Issue |");
		lines.push("|---|---|");
		for (const f of warnings) {
			lines.push(renderFindingRow(f));
		}
		lines.push("");
		lines.push("</details>");
	}

	if (suggestions.length > 0) {
		lines.push("");
		lines.push("<details open>");
		lines.push(`<summary><b>Suggestions</b> (${suggestions.length})</summary>`);
		lines.push("<br/>");
		lines.push("");
		lines.push("| File | Issue |");
		lines.push("|---|---|");
		for (const f of suggestions) {
			lines.push(renderFindingRow(f));
		}
		lines.push("");
		lines.push("</details>");
	}

	if (reconciled.ignored_by_reviewer.length > 0) {
		lines.push("");
		lines.push("<details>");
		lines.push(
			`<summary>Acknowledged by author (${reconciled.ignored_by_reviewer.length})</summary>`,
		);
		lines.push("<br/>");
		lines.push("");
		lines.push("| File | Issue | Note |");
		lines.push("|---|---|---|");
		for (const f of reconciled.ignored_by_reviewer) {
			const file = formatFile(f.path, f.line);
			lines.push(
				`| ${file} | ${sanitizeTableCell(f.rule)} | ${sanitizeTableCell(f.reviewer_note)} |`,
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
		"This PR has already received 2 automatic reviews. To run another review, a codeowner can comment `/review` or `/full-review`.",
		"",
		"> **Tip:** Keep PRs in draft mode until they are ready for review — the bot skips draft PRs automatically.",
	];

	if (preservedBody) {
		lines.push("", "---", "", preservedBody);
	}

	return lines.join("\n");
}
