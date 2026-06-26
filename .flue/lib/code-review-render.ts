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

/** The two reconciled review streams rendered into one comment. */
export interface RenderReviewInput {
	code: ReconcileResult;
	style: ReconcileResult;
	/** True when the code review degraded (its findings may be incomplete). */
	codeFailed?: boolean;
	/** True when the style-guide review degraded (its findings may be incomplete). */
	styleFailed?: boolean;
	/** Review mode from the specialist — drives the Code Review section heading. */
	codeMode?: "holistic" | "fan-out";
}

const SECTION_FAILURE_NOTE =
	"❌ This review could not complete this run; results may be incomplete. It will retry on the next push.";

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
 * `includeCritical` is true for the code review, false for the style guide
 * (whose specialist never emits critical findings).
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
			lines.push(noneMessage);
		}
		return;
	}

	if (includeCritical) {
		renderSeverityTable(lines, "Critical", critical);
	}
	renderSeverityTable(lines, "Warnings", warnings);
	renderSeverityTable(lines, "Suggestions", suggestions);
}

/** Render the final review comment from both reconciled finding streams. */
export function renderComment(
	reviews: RenderReviewInput,
	reviewedHeadSha: string,
	forceFullReview?: boolean,
): string {
	const shortSha = reviewedHeadSha.slice(0, 7);
	const reviewedAt = new Date().toISOString();
	const scope = forceFullReview ? "full PR diff" : `commit \`${shortSha}\``;

	const code = activeBySeverity(reviews.code);
	const style = activeBySeverity(reviews.style);

	const criticalCount = code.critical.length;
	const warningCount = code.warnings.length + style.warnings.length;
	const suggestionCount = code.suggestions.length + style.suggestions.length;
	const totalActive = criticalCount + warningCount + suggestionCount;
	const ignoredCount =
		reviews.code.ignored_by_reviewer.length +
		reviews.style.ignored_by_reviewer.length;

	const anyFailed = Boolean(reviews.codeFailed || reviews.styleFailed);
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

	const codeHeading =
		reviews.codeMode === "holistic"
			? "Holistic Code Review"
			: reviews.codeMode === "fan-out"
				? "Fan Out Code Review"
				: "Code Review";

	renderSection(
		lines,
		codeHeading,
		"✅ No code review issues found.",
		reviews.code,
		true,
		Boolean(reviews.codeFailed),
		"_This code review is in beta and may not always be helpful — use your judgment._",
	);

	renderSection(
		lines,
		"Style Guide Review",
		"✅ No style-guide issues found.",
		reviews.style,
		false,
		Boolean(reviews.styleFailed),
	);

	// Combined "acknowledged by author" block across both review streams.
	const ignored = [
		...reviews.code.ignored_by_reviewer.map((f) => ({
			f,
			kind: "Code" as const,
		})),
		...reviews.style.ignored_by_reviewer.map((f) => ({
			f,
			kind: "Style" as const,
		})),
	];
	if (ignored.length > 0) {
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
		"| `/fan-out-review` | Forces a full review using the per-file fan-out mode regardless of diff size. Each file is reviewed in its own session for maximum per-file detail. ⚠️ This may take a very long time on large PRs and may fail or time out — use only when you want the most thorough review and are willing to wait. |",
	);
	lines.push(
		"| `/holistic-review` | Forces a full review using the holistic mode regardless of diff size. The entire diff is reviewed in one pass, enabling cross-file reasoning. Faster and more reliable on large PRs. |",
	);
	lines.push(
		"| `/ignore-review-limit` | Permanently lifts the 2-review automatic limit for this PR. Future pushes will trigger reviews as normal. |",
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
