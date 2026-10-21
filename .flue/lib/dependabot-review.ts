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

export const CHANGE_KINDS = [
	"breaking",
	"behavior",
	"security",
	"fix",
	"feature",
] as const;

export const RISK_LEVELS = ["none", "low", "medium", "high"] as const;

export const DependabotReviewResultSchema = v.object({
	recommendation: v.picklist(["merge", "merge-verify", "investigate"]),
	headline: v.string(),
	checks: v.array(
		v.object({
			package: v.string(),
			action: v.string(),
			where: v.string(),
		}),
	),
	packageReviews: v.array(
		v.object({
			name: v.string(),
			from: v.string(),
			to: v.string(),
			risk: v.picklist(RISK_LEVELS),
			why: v.string(),
			changes: v.array(
				v.object({
					kind: v.picklist(CHANGE_KINDS),
					text: v.string(),
					affectsUs: v.string(),
				}),
			),
			usedIn: v.array(v.string()),
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

const RISK_ICON: Record<
	DependabotReviewResult["packageReviews"][number]["risk"],
	string
> = {
	none: "⚪",
	low: "🟢",
	medium: "🟠",
	high: "🔴",
};

const RISK_ORDER = ["high", "medium", "low", "none"] as const;

const KIND_ICON: Record<(typeof CHANGE_KINDS)[number], string> = {
	breaking: "💥",
	behavior: "🔀",
	security: "🔒",
	fix: "🐛",
	feature: "✨",
};

/** Above this many packages, low/none-risk rows collapse into a details block. */
const COLLAPSE_THRESHOLD = 5;

/**
 * Neutralize model text: no raw HTML, no table-breaking pipes or newlines, and
 * no second copy of the marker (the comment is located by it).
 */
export function escapeText(value: string): string {
	return value
		.replaceAll(BOT_COMMENT_MARKER, "[marker removed]")
		.split(/(`+[^`]*`+)/g)
		.map((part, index) =>
			index % 2 === 1
				? part.replaceAll("|", "\\|")
				: part
						.replaceAll("<", "&lt;")
						.replaceAll(">", "&gt;")
						.replaceAll("|", "\\|"),
		)
		.join("")
		.replace(/\s*\n\s*/g, " ")
		.trim();
}

/** Semver bump level from version strings; "other" when not parseable. */
export function bumpLevel(
	from: string,
	to: string,
): "major" | "minor" | "patch" | "other" {
	const parse = (s: string) => {
		const m = /^v?(\d+)\.(\d+)\.(\d+)/.exec(s.trim());
		return m ? [Number(m[1]), Number(m[2]), Number(m[3])] : null;
	};
	const a = parse(from);
	const b = parse(to);
	if (!a || !b) return "other";
	if (a[0] !== b[0]) return "major";
	if (a[1] !== b[1]) return "minor";
	return "patch";
}

type PackageReview = DependabotReviewResult["packageReviews"][number];

function bumpCell(pkg: PackageReview): string {
	return `${escapeText(pkg.from)} → ${escapeText(pkg.to)} · ${bumpLevel(pkg.from, pkg.to)}`;
}

function sortByRisk(packages: PackageReview[]): PackageReview[] {
	return [...packages].sort(
		(a, b) =>
			RISK_ORDER.indexOf(a.risk) - RISK_ORDER.indexOf(b.risk) ||
			a.name.localeCompare(b.name),
	);
}

function packageTable(packages: PackageReview[]): string[] {
	return [
		"| Package | Bump | Risk | Why |",
		"|---|---|---|---|",
		...packages.map(
			(pkg) =>
				`| \`${escapeText(pkg.name)}\` | ${bumpCell(pkg)} | ${RISK_ICON[pkg.risk]} ${pkg.risk} | ${escapeText(pkg.why)} |`,
		),
	];
}

/** Render the final Dependabot review comment from the agent result. */
export function renderComment(
	result: DependabotReviewResult,
	prNumber: number,
): string {
	const recLabel = {
		merge: "✅ Merge",
		"merge-verify": "✅ Merge + verify",
		investigate: "⚠️ Investigate before merging",
	}[result.recommendation];

	const packages = sortByRisk(result.packageReviews);
	const allChanges = packages.flatMap((pkg) => pkg.changes);
	const breaking = allChanges.filter((c) => c.kind === "breaking").length;
	const security = allChanges.filter((c) => c.kind === "security").length;
	const count = packages.length;

	const stats = [
		`${count} package${count === 1 ? "" : "s"}`,
		`${breaking} breaking`,
		`${security} security`,
	];
	if (result.checks.length > 0) stats.push(`${result.checks.length} to check`);

	const lines: string[] = [
		BOT_COMMENT_MARKER,
		`<!-- pr: ${prNumber} -->`,
		`<!-- updated-at: ${new Date().toISOString()} -->`,
		"",
		"## Dependabot review",
		"",
		`**${recLabel}** · ${stats.join(" · ")}`,
	];

	if (result.headline.trim()) {
		lines.push("", `> ${escapeText(result.headline)}`);
	}

	if (result.checks.length > 0) {
		lines.push("", "### Before merging");
		for (const check of result.checks) {
			lines.push(
				`- [ ] \`${escapeText(check.package)}\`: ${escapeText(check.action)} · ${escapeText(check.where)}`,
			);
		}
	}

	const collapse = count > COLLAPSE_THRESHOLD;
	const attention = collapse
		? packages.filter((p) => p.risk === "medium" || p.risk === "high")
		: packages;
	const quiet = collapse
		? packages.filter((p) => p.risk === "low" || p.risk === "none")
		: [];

	if (attention.length > 0) {
		lines.push("", ...packageTable(attention));
	}
	if (quiet.length > 0) {
		lines.push(
			"",
			"<details>",
			`<summary>${quiet.length} low-risk package${quiet.length === 1 ? "" : "s"}</summary>`,
			"",
			...packageTable(quiet),
			"",
			"</details>",
		);
	}

	const detailed = packages.filter((p) => p.changes.length > 0);
	if (detailed.length > 0) {
		lines.push("", "<details>", "<summary>Details</summary>", "");
		for (const pkg of detailed) {
			lines.push(
				`#### \`${escapeText(pkg.name)}\` ${escapeText(pkg.from)} → ${escapeText(pkg.to)}`,
				"",
				"| Change | Kind | Affects us? |",
				"|---|---|---|",
				...pkg.changes.map(
					(c) =>
						`| ${escapeText(c.text)} | ${KIND_ICON[c.kind]} ${c.kind} | ${escapeText(c.affectsUs)} |`,
				),
			);
			if (pkg.usedIn.length > 0) {
				lines.push(
					"",
					`Used in: ${pkg.usedIn.map((f) => `\`${f.replaceAll("`", "")}\``).join(", ")}`,
				);
			}
			lines.push("");
		}
		lines.push("</details>");
	}

	return lines.join("\n");
}

// ── GitHub comment helpers ────────────────────────────────────────────────────

/** Find the most recent bot review comment on a PR, or null. */
export async function findExistingBotComment(
	token: string,
	prNumber: number,
): Promise<GitHubIssueComment | null> {
	const comments = await getIssueComments(token, prNumber);
	return (
		comments.findLast(
			(comment) =>
				comment.user?.type === "Bot" &&
				comment.body?.startsWith(BOT_COMMENT_MARKER),
		) ?? null
	);
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
