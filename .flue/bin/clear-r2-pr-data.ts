/**
 * Clears all PR diff data (diffs/pr-*) from the local R2 bucket.
 *
 * Usage:
 *   pnpm flue:clear-r2-pr-data:local   (--local flag, uses wrangler dev state)
 */
import { execSync } from "node:child_process";
import { readdirSync } from "node:fs";
import { join } from "node:path";

const isLocal = process.argv.includes("--local");

if (!isLocal) {
	console.error(
		"Only --local is supported. Use the Cloudflare dashboard to manage remote R2 data.",
	);
	process.exit(1);
}

// Find the local miniflare R2 sqlite database
const r2StateDir = new URL(
	"../dist/.wrangler/state/v3/r2/miniflare-R2BucketObject",
	import.meta.url,
).pathname;

let dbPath: string | null = null;
try {
	for (const entry of readdirSync(r2StateDir)) {
		if (
			entry.endsWith(".sqlite") &&
			!entry.includes("metadata") &&
			!entry.includes("shm") &&
			!entry.includes("wal")
		) {
			dbPath = join(r2StateDir, entry);
			break;
		}
	}
} catch {
	console.error(
		`Local R2 state not found at ${r2StateDir}. Run wrangler dev first.`,
	);
	process.exit(1);
}

if (!dbPath) {
	console.error("Could not find local R2 SQLite database.");
	process.exit(1);
}

const result = execSync(
	`sqlite3 "${dbPath}" "SELECT COUNT(*) FROM _mf_objects WHERE key LIKE 'diffs/%';"`,
	{ encoding: "utf-8" },
).trim();

const count = parseInt(result, 10);

if (count === 0) {
	console.log("No PR data found in local R2.");
	process.exit(0);
}

console.log(`Deleting ${count} object(s) from local R2...`);

execSync(
	`sqlite3 "${dbPath}" "DELETE FROM _mf_objects WHERE key LIKE 'diffs/%';"`,
	{ stdio: "inherit" },
);

console.log(`Done. Deleted ${count} object(s).`);
