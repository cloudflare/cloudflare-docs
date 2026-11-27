import { loadEnvValue } from "./dotenv";

// Replays size labeling against existing PRs. Follows the dev server's
// DOCS_FLUE_REVIEW_MODE: `log` is a dry run, `comment` applies the labels.
const base = loadEnvValue("FLUE_BASE_URL") ?? "http://localhost:5173";
const token = loadEnvValue("DOCS_FLUE_INTERNAL_TOKEN");
if (!token)
	throw new Error(
		"DOCS_FLUE_INTERNAL_TOKEN not found in the environment or .flue/.env(.local)",
	);
const headers = { "x-dev-secret": token };

const flag = process.argv.indexOf("--pr");
const numbers =
	flag === -1
		? []
		: String(process.argv[flag + 1])
				.split(",")
				.map((value) => value.trim())
				.filter(Boolean)
				.map((value) => {
					const n = Number(value);
					if (!Number.isInteger(n) || n <= 0)
						throw new Error(`--pr expects numbers, got "${value}"`);
					return n;
				});
if (numbers.length === 0) throw new Error("Pass --pr <n,...>");

type Output = {
	mode: string;
	current: string[];
	changes: number;
	target: string;
	added: boolean;
	removed: string[];
	dryRun: boolean;
};

const rows = [];
for (const number of numbers) {
	try {
		const response = await fetch(`${base}/dev/size-label-run/${number}`, {
			method: "POST",
			headers,
		});
		if (!response.ok)
			throw new Error(`${response.status} ${await response.text()}`);
		const out = (await response.json()) as Output;
		rows.push({
			pr: `#${number}`,
			mode: out.dryRun ? "dry run" : "applied",
			changes: out.changes,
			current: out.current.join(", ") || "-",
			target: out.target,
			add: out.added ? out.target : "-",
			remove: out.removed.join(", ") || "-",
		});
	} catch (error) {
		rows.push({
			pr: `#${number}`,
			mode: "error",
			error: error instanceof Error ? error.message : String(error),
		});
	}
}
console.table(rows);
