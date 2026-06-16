/**
 * Dependabot review domain helpers.
 *
 * Types, schemas, PR body parsing, comment rendering, and GitHub comment
 * management for the dependabot-review workflow.
 */
import * as v from "valibot";
import {
	getIssueComments,
	postComment,
	updateIssueComment,
	type GitHubIssueComment,
} from "./github";

// ── Marker ────────────────────────────────────────────────────────────────────

export const BOT_COMMENT_MARKER =
	"<!-- cloudflare-docs-flue-dependabot-review -->";

// ── Types ─────────────────────────────────────────────────────────────────────

export interface DependabotPackage {
	name: string;
	from: string;
	to: string;
	repoUrl?: string;
}

// ── Schema ────────────────────────────────────────────────────────────────────

export const DependabotReviewResultSchema = v.object({
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

export type DependabotReviewResult = v.InferOutput<
	typeof DependabotReviewResultSchema
>;

// ── PR body parser ────────────────────────────────────────────────────────────

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
export function parseDependabotPackages(body: string): DependabotPackage[] {
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

// ── Comment rendering ─────────────────────────────────────────────────────────

/** Render the final Dependabot review comment from the skill result. */
export function renderComment(
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

	// Summary table (always visible)
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

	// Per-package detail blocks (collapsed)
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

// ── GitHub comment helpers ────────────────────────────────────────────────────

/** Find the most recent bot review comment on a PR, or null. */
export async function findExistingBotComment(
	token: string,
	prNumber: number,
): Promise<GitHubIssueComment | null> {
	const comments = await getIssueComments(token, prNumber);
	return comments.findLast((c) => c.body?.includes(BOT_COMMENT_MARKER)) ?? null;
}

/** Create or update the bot review comment on a PR. */
export async function postOrUpdateComment(
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
