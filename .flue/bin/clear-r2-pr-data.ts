/**
 * Clears per-PR review state (diffs/pr-*) from the local R2 bucket — review
 * JSONs, pending rendezvous namespaces, auto-review counters, and ignore-limit
 * flags. Leaves Durable Object run history intact.
 *
 * For a full local reset (Durable Objects + R2), stop the dev server and run
 * `pnpm run flue:reset:local` instead — that is what reclaims the multi-GB DO
 * SQLite state that accumulates across runs.
 *
 * Usage:
 *   pnpm flue:clear-r2-pr-data:local   (--local flag, uses wrangler dev state)
 */
import { execFileSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";

const isLocal = process.argv.includes("--local");

if (!isLocal) {
	console.error(
		"Only --local is supported. Use the Cloudflare dashboard to manage remote R2 data.",
	);
	process.exit(1);
}

// The local miniflare R2 SQLite lives in different places depending on how the
// dev server was started:
//   - `flue dev`            → .flue/.wrangler/state/v3/r2/...
//   - `flue:dev:wrangler`   → .flue/dist/.../.wrangler/state/v3/r2/...
// Check both and operate on whichever exists.
const R2_SUBPATH = "state/v3/r2/miniflare-R2BucketObject";
const candidateDirs = [
	new URL(`../.wrangler/${R2_SUBPATH}`, import.meta.url).pathname,
	new URL(`../dist/.wrangler/${R2_SUBPATH}`, import.meta.url).pathname,
	new URL(
		`../dist/cloudflare_docs_flue/.wrangler/${R2_SUBPATH}`,
		import.meta.url,
	).pathname,
];

function findDb(stateDir: string): string | null {
	if (!existsSync(stateDir)) return null;
	for (const entry of readdirSync(stateDir)) {
		if (
			entry.endsWith(".sqlite") &&
			!entry.includes("metadata") &&
			!entry.includes("shm") &&
			!entry.includes("wal")
		) {
			return join(stateDir, entry);
		}
	}
	return null;
}

const dbPaths = candidateDirs
	.map(findDb)
	.filter((p): p is string => p !== null);

if (dbPaths.length === 0) {
	console.error(
		`Local R2 state not found. Looked in:\n${candidateDirs.map((d) => `  - ${d}`).join("\n")}\nRun the dev server first.`,
	);
	process.exit(1);
}

// Scope to PR-specific keys only: diffs/pr-* (review JSONs, pending rendezvous
// namespaces, counters, ignore-limit flags). The broader 'diffs/%' pattern
// would also delete any future non-PR keys stored under diffs/.
const WHERE = "key LIKE 'diffs/pr-%'";

let total = 0;
for (const dbPath of dbPaths) {
	const count = parseInt(
		execFileSync(
			"sqlite3",
			[dbPath, `SELECT COUNT(*) FROM _mf_objects WHERE ${WHERE};`],
			{ encoding: "utf-8" },
		).trim(),
		10,
	);
	if (count > 0) {
		console.log(`Deleting ${count} object(s) from ${dbPath}...`);
		execFileSync(
			"sqlite3",
			[dbPath, `DELETE FROM _mf_objects WHERE ${WHERE};`],
			{ stdio: "inherit" },
		);
		total += count;
	}
}

console.log(
	total === 0
		? "No PR data found in local R2."
		: `Done. Deleted ${total} object(s).`,
);
