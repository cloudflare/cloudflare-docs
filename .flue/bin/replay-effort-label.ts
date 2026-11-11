import { loadEnvValue } from "./dotenv";

// Replays effort labeling on existing issues. DOCS_FLUE_REVIEW_MODE=log is a dry run.
const base = loadEnvValue("FLUE_BASE_URL") ?? "http://localhost:5173";
const token = loadEnvValue("DOCS_FLUE_INTERNAL_TOKEN");
if (!token)
	throw new Error(
		"DOCS_FLUE_INTERNAL_TOKEN not found in the environment or .flue/.env(.local)",
	);
const headers = { "x-dev-secret": token };

const flag = process.argv.indexOf("--issue");
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
						throw new Error(`--issue expects numbers, got "${value}"`);
					return n;
				});
if (numbers.length === 0) throw new Error("Pass --issue <n,...>");

type Output = {
	skipped?: string;
	error?: string;
	level?: string;
	score?: number;
	target?: string | null;
	added?: boolean;
	removed?: string[];
	dryRun?: boolean;
	assessment?: { decision: string; owner: string; reason: string };
};

async function run(number: number): Promise<Output> {
	const start = await fetch(`${base}/dev/effort-label-run/${number}`, {
		method: "POST",
		headers,
	});
	if (!start.ok) throw new Error(`${start.status} ${await start.text()}`);
	const { id } = (await start.json()) as { id: string };
	for (let i = 0; i < 120; i++) {
		await new Promise((r) => setTimeout(r, 2_000));
		const res = await fetch(`${base}/dev/effort-label-run/${id}`, { headers });
		const body = (await res.json()) as {
			status: string;
			output: Output | null;
			error: unknown;
		};
		if (body.status === "complete") return body.output ?? {};
		if (body.status === "errored" || body.status === "terminated")
			throw new Error(JSON.stringify(body.error));
	}
	throw new Error("timed out after 4 minutes");
}

const rows = [];
for (const number of numbers) {
	try {
		const out = await run(number);
		rows.push({
			issue: `#${number}`,
			mode: out.skipped
				? `skipped (${out.skipped})`
				: out.error
					? "model error"
					: out.dryRun
						? "dry run"
						: "applied",
			decision: out.assessment?.decision ?? "-",
			owner: out.assessment?.owner ?? "-",
			score: out.score ?? "-",
			target: out.target ?? "-",
			add: out.added ? out.target : "-",
			remove: out.removed?.join(", ") || "-",
			reason: out.error ?? out.assessment?.reason ?? "-",
		});
	} catch (error) {
		rows.push({
			issue: `#${number}`,
			mode: "error",
			reason: error instanceof Error ? error.message : String(error),
		});
	}
}
console.table(rows);
