/**
 * Pure logic for `bin/check-changelog-updates.ts`.
 *
 * Feed readers only notify subscribers about items with a GUID they have not
 * seen. Editing a published changelog post keeps its GUID, so changes reach
 * nobody unless the edit adds an `updates` entry, which the RSS feeds emit as
 * a new item.
 *
 * - WAF release posts: changing rules or rule actions without a new `updates`
 *   entry is an error, because those changes always need to reach customers.
 * - All other published posts: content changes without a new `updates` entry
 *   get a non-blocking reminder, and the author decides. Mechanical edits
 *   (link targets, whitespace, capitalization, punctuation) are ignored.
 */
import { parse as parseYaml } from "yaml";

export const CHANGELOG_DIR = "src/content/changelog/";

/** Changelog folders whose release posts must add `updates` for rule changes. */
export const STRICT_CHANGELOG_DIRS = ["src/content/changelog/waf/"];

/** Only dated release posts are strict, not living pages such as `scheduled-waf-release.mdx`. */
const DATED_POST = /\/\d{4}-\d{2}-\d{2}-[^/]+\.mdx?$/;

/** Pages rewritten in place on a schedule, where every edit is expected. */
const LIVING_PAGES = ["src/content/changelog/waf/scheduled-waf-release.mdx"];

type Frontmatter = {
	title?: unknown;
	description?: unknown;
	date?: unknown;
	hidden?: unknown;
	updates?: unknown;
};

const FRONTMATTER = /^---\r?\n([\s\S]*?)\r?\n---/;

export function readFrontmatter(source: string): Frontmatter {
	const match = source.match(FRONTMATTER);
	if (!match) return {};
	const data = parseYaml(match[1]);
	return data && typeof data === "object" ? (data as Frontmatter) : {};
}

const stripTags = (html: string) =>
	html
		.replace(/<[^>]+>/g, " ")
		.replace(/\s+/g, " ")
		.trim();

/**
 * Map each rule ID in the post's tables to its action columns, for example
 * `{ "c1d4…" => "Previous Action: N/A | New Action: Block" }`. Action columns
 * are found by header text, so the check keeps working if columns move.
 */
export function extractRuleActions(source: string): Map<string, string> {
	const rules = new Map<string, string>();

	for (const [table] of source.matchAll(/<table[\s\S]*?<\/table>/g)) {
		const headers = [...table.matchAll(/<th[^>]*>([\s\S]*?)<\/th>/g)].map(
			([, cell]) => stripTags(cell),
		);
		const actionColumns = headers.flatMap((header, index) =>
			/action/i.test(header) ? [index] : [],
		);

		for (const [row] of table.matchAll(/<tr[\s\S]*?<\/tr>/g)) {
			const ruleId = row.match(/<RuleID\s+id="([^"]+)"/)?.[1];
			if (!ruleId) continue;

			const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map(
				([, cell]) => stripTags(cell),
			);
			const actions = actionColumns
				.map((index) => `${headers[index]}: ${cells[index] ?? ""}`)
				.join(" | ");

			rules.set(ruleId, actions);
		}
	}

	return rules;
}

export type RuleChanges = {
	added: string[];
	removed: string[];
	actionChanged: string[];
};

export function diffRules(base: string, head: string): RuleChanges {
	const before = extractRuleActions(base);
	const after = extractRuleActions(head);

	return {
		added: [...after.keys()].filter((id) => !before.has(id)),
		removed: [...before.keys()].filter((id) => !after.has(id)),
		actionChanged: [...after.keys()].filter(
			(id) => before.has(id) && before.get(id) !== after.get(id),
		),
	};
}

/**
 * The words readers see: title, description, and body, without imports, link
 * targets, `href`/`src` values, punctuation, or case. Two versions with the
 * same words differ only mechanically.
 */
export function readableWords(source: string): string[] {
	const { title, description } = readFrontmatter(source);
	const body = source
		.replace(FRONTMATTER, "")
		.replace(/^import .*$/gm, "")
		.replace(/\]\([^)]*\)/g, "]")
		.replace(/\b(?:href|src)="[^"]*"/g, "");

	return [title, description, body]
		.map((part) => (typeof part === "string" ? part : ""))
		.join(" ")
		.toLowerCase()
		.replace(/[^\p{L}\p{N}\s]/gu, " ")
		.split(/\s+/)
		.filter(Boolean);
}

const updateCount = (frontmatter: Frontmatter) =>
	Array.isArray(frontmatter.updates) ? frontmatter.updates.length : 0;

export type CheckResult =
	| { status: "ok" }
	| { status: "error"; message: string }
	| { status: "reminder"; message: string };

const OK: CheckResult = { status: "ok" };

const EXAMPLE = `updates:\n  - date: YYYY-MM-DD\n    summary: What changed and what readers should do.`;

/**
 * Decide whether a change to a changelog post needs an `updates` entry.
 * `base` is undefined for new files, which never need one.
 */
export function checkChangelogChange({
	path,
	base,
	head,
	now = new Date(),
}: {
	path: string;
	base: string | undefined;
	head: string;
	now?: Date;
}): CheckResult {
	if (base === undefined) return OK;
	if (!path.startsWith(CHANGELOG_DIR) || LIVING_PAGES.includes(path)) {
		return OK;
	}

	const baseFrontmatter = readFrontmatter(base);
	if (baseFrontmatter.hidden === true) return OK;

	const publishedAt = new Date(String(baseFrontmatter.date));
	if (Number.isNaN(publishedAt.getTime()) || publishedAt > now) return OK;

	if (updateCount(readFrontmatter(head)) > updateCount(baseFrontmatter)) {
		return OK;
	}

	if (
		STRICT_CHANGELOG_DIRS.some((dir) => path.startsWith(dir)) &&
		DATED_POST.test(path)
	) {
		const changes = diffRules(base, head);
		const details = [
			changes.added.length > 0 && `added rules: ${changes.added.join(", ")}`,
			changes.removed.length > 0 &&
				`removed rules: ${changes.removed.join(", ")}`,
			changes.actionChanged.length > 0 &&
				`changed actions: ${changes.actionChanged.join(", ")}`,
		].filter(Boolean);

		if (details.length > 0) {
			return {
				status: "error",
				message: `This published release post changes its rules (${details.join("; ")}) without a new \`updates\` entry. RSS subscribers are only notified through \`updates\`. Add an entry to the frontmatter, for example:\n\n${EXAMPLE}`,
			};
		}
	}

	if (readableWords(base).join(" ") !== readableWords(head).join(" ")) {
		return {
			status: "reminder",
			message: `This edits a published post, and RSS subscribers are not notified about edits. If readers need to know about this change, add an \`updates\` entry to the frontmatter, for example:\n\n${EXAMPLE}\n\nIf the change is minor (wording, a corrected link or sample), no action is needed.`,
		};
	}

	return OK;
}
