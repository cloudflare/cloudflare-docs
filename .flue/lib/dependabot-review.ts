/**
 * Dependabot review domain helpers.
 *
 * Types, schemas, PR body parsing, comment rendering, and GitHub comment
 * management for the dependabot-review workflow.
 */
import * as v from "valibot";

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
	summary: v.pipe(v.string(), v.maxLength(2000)),
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
