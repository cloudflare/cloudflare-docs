#!/usr/bin/env tsx

/**
 * Checks edits to published changelog posts. See `changelog-update-check.ts`.
 *
 * - Fails when a published WAF release post changes its rules or rule actions
 *   without adding a frontmatter `updates` entry.
 * - Warns (without failing) when any other published post changes content
 *   without one.
 *
 * Usage: tsx bin/check-changelog-updates.ts <base-ref> [--comment <file>]
 * The base ref must be available locally (for example, `git fetch origin <sha>`).
 * With `--comment`, writes a Markdown PR comment to <file>, or an empty file
 * when there is nothing to report.
 */

import { execFileSync } from "child_process";
import fs from "fs";
import {
	CHANGELOG_DIR,
	checkChangelogChange,
	type CheckResult,
} from "./changelog-update-check";

const COMMENT_MARKER = "<!-- changelog-updates-check -->";

const [baseRef, ...rest] = process.argv.slice(2);
const commentIndex = rest.indexOf("--comment");
const commentFile = commentIndex === -1 ? undefined : rest[commentIndex + 1];

if (!baseRef || (commentIndex !== -1 && !commentFile)) {
	console.error(
		"Usage: tsx bin/check-changelog-updates.ts <base-ref> [--comment <file>]",
	);
	process.exit(2);
}

const git = (...args: string[]) =>
	execFileSync("git", args, { encoding: "utf8" });

const changedFiles = git(
	"diff",
	"--name-only",
	"--diff-filter=M",
	// No second ref: compare against the working tree, which matches HEAD in
	// CI and also covers uncommitted edits when run locally.
	baseRef,
	"--",
	CHANGELOG_DIR,
)
	.split("\n")
	.filter((path) => /\.mdx?$/.test(path));

const findings: Array<{
	path: string;
	result: Exclude<CheckResult, { status: "ok" }>;
}> = [];

for (const path of changedFiles) {
	const base = git("show", `${baseRef}:${path}`);
	const head = fs.readFileSync(path, "utf8");
	const result = checkChangelogChange({ path, base, head });
	if (result.status === "ok") continue;

	findings.push({ path, result });
	const level = result.status === "error" ? "error" : "warning";
	console.log(
		`::${level} file=${path}::${result.message.replaceAll("\n", "%0A")}`,
	);
	console.error(`\n[${level}] ${path}\n${result.message}\n`);
}

const errors = findings.filter(({ result }) => result.status === "error");
const reminders = findings.filter(({ result }) => result.status === "reminder");

if (commentFile) {
	const list = (items: typeof findings) =>
		items.map(({ path }) => `- \`${path}\``).join("\n");

	const sections = [
		errors.length > 0 &&
			`**Required:** these published WAF release posts change rules or rule actions. Add an \`updates\` entry to each, so RSS subscribers are notified:\n\n${list(errors)}`,
		reminders.length > 0 &&
			`**Check:** this PR edits published changelog posts. RSS subscribers are not notified about edits. If readers need to know about a change, add an \`updates\` entry to the post's frontmatter. If the change is minor, no action is needed.\n\n${list(reminders)}`,
	].filter(Boolean);

	const example =
		"```yaml\nupdates:\n  - date: YYYY-MM-DD\n    summary: What changed and what readers should do.\n```";

	fs.writeFileSync(
		commentFile,
		sections.length === 0
			? ""
			: `${COMMENT_MARKER}\n### Changelog updates\n\n${sections.join("\n\n")}\n\nEach \`updates\` entry is listed on the post and sent to RSS feeds as a new item:\n\n${example}\n`,
	);
}

if (errors.length > 0) {
	console.error(
		`${errors.length} changelog post(s) need an \`updates\` entry so feed subscribers are notified.`,
	);
	process.exit(1);
}

console.log(
	`Checked ${changedFiles.length} modified changelog post(s): ${reminders.length} reminder(s), no missing required updates entries.`,
);
