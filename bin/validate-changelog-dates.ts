import { spawnSync } from "node:child_process";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { parse } from "yaml";

const CHANGELOG_DIR = "src/content/changelog";
const UTC_TIMESTAMP = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}Z$/;

export function getChangelogDate(content: string): unknown {
	const frontmatter = content.match(/^---\s*\n([\s\S]*?)\n---(?:\s*\n|\s*$)/);
	if (!frontmatter) return undefined;

	const data: unknown = parse(frontmatter[1]);
	if (typeof data !== "object" || data === null) return undefined;

	return (data as Record<string, unknown>).date;
}

export function isUtcChangelogTimestamp(value: unknown): value is string {
	if (typeof value !== "string" || !UTC_TIMESTAMP.test(value)) return false;

	const parsed = new Date(value);
	return (
		Number.isFinite(parsed.getTime()) &&
		parsed.toISOString().replace(".000Z", "Z") === value
	);
}

export function validateChangelogDate(content: string): string | null {
	const date = getChangelogDate(content);
	if (isUtcChangelogTimestamp(date)) return null;

	return `New changelog entries must set date to a UTC timestamp in YYYY-MM-DDTHH:MM:SSZ format (for example, 2026-10-14T17:42:00Z); received ${JSON.stringify(date)}.`;
}

function getArgument(name: string): string | undefined {
	const index = process.argv.indexOf(name);
	return index === -1 ? undefined : process.argv[index + 1];
}

function getAddedChangelogFiles(base: string, head: string): string[] {
	const result = spawnSync(
		"git",
		[
			"diff",
			"--diff-filter=A",
			"--name-only",
			"-z",
			`${base}...${head}`,
			"--",
			CHANGELOG_DIR,
		],
		{ encoding: "utf8" },
	);

	if (result.status !== 0) {
		throw new Error(
			result.stderr.trim() || "Unable to list added changelog files",
		);
	}

	return result.stdout.split("\0").filter((path) => /\.mdx?$/.test(path));
}

export function main(): void {
	const base = getArgument("--base");
	const head = getArgument("--head") ?? "HEAD";
	if (!base) {
		throw new Error(
			"Usage: validate-changelog-dates.ts --base <sha> [--head <sha>]",
		);
	}

	const failures = getAddedChangelogFiles(base, head).flatMap((path) => {
		const error = validateChangelogDate(readFileSync(path, "utf8"));
		return error ? [{ path, error }] : [];
	});

	for (const { path, error } of failures) {
		console.error(`::error file=${path}::${error}`);
	}

	if (failures.length > 0) process.exitCode = 1;
}

if (
	process.argv[1] &&
	resolve(process.argv[1]) === fileURLToPath(import.meta.url)
) {
	main();
}
