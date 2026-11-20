import { loadEnvValue } from "./dotenv";

// Replays the issue/PR spam gate against existing items. Follows the dev
// server's DOCS_FLUE_REVIEW_MODE: `log` is a dry run, `comment` labels, comments,
// and closes spam. A replay never starts a review.
const base = loadEnvValue("FLUE_BASE_URL") ?? "http://localhost:5173";
const token = loadEnvValue("DOCS_FLUE_INTERNAL_TOKEN");
if (!token)
	throw new Error(
		"DOCS_FLUE_INTERNAL_TOKEN not found in the environment or .flue/.env(.local)",
	);
const headers = { "x-dev-secret": token };

function numbersFor(flagName: string): number[] {
	const flag = process.argv.indexOf(flagName);
	if (flag === -1) return [];
	return String(process.argv[flag + 1])
		.split(",")
		.map((value) => value.trim())
		.filter(Boolean)
		.map((value) => {
			const n = Number(value);
			if (!Number.isInteger(n) || n <= 0)
				throw new Error(`${flagName} expects numbers, got "${value}"`);
			return n;
		});
}

const items = [
	...numbersFor("--issue").map((number) => ({ number, type: "issue" })),
	...numbersFor("--pr").map((number) => ({ number, type: "pull_request" })),
];
if (items.length === 0)
	throw new Error("Pass --issue <n,...> and/or --pr <n,...>");

type Output = {
	mode?: string;
	closed?: boolean;
	wouldClose?: boolean;
	category?: string | null;
	probability?: number | null;
	error?: string;
	verdict?: { is_spam: boolean; confidence: string; reason: string } | null;
};

async function replay(number: number, type: string, label: string) {
	const response = await fetch(`${base}/dev/spam-run/${number}?type=${type}`, {
		method: "POST",
		headers,
	});
	if (!response.ok)
		throw new Error(`${response.status} ${await response.text()}`);
	const { id, mode } = (await response.json()) as { id: string; mode: string };
	console.log(
		mode === "comment"
			? `${label}: comment mode, spam WILL be labeled and closed`
			: `${label}: log mode, dry run`,
	);
	const started = Date.now();
	while (Date.now() - started < 5 * 60_000) {
		await new Promise((done) => setTimeout(done, 3_000));
		const status = (await (
			await fetch(`${base}/dev/spam-run/${id}`, { headers })
		).json()) as { status?: string; output?: Output; error?: unknown };
		if (["complete", "errored", "terminated"].includes(String(status.status)))
			return status;
	}
	return { status: "timeout" } as { status: string; output?: Output };
}

const rows = [];
for (const { number, type } of items) {
	const label = `${type === "issue" ? "Issue" : "PR"} #${number}`;
	try {
		const { status, output } = (await replay(number, type, label)) as {
			status?: string;
			output?: Output;
		};
		rows.push({
			item: label,
			status,
			category: output?.category,
			probability: output?.probability?.toFixed(2),
			confidence: output?.verdict?.confidence,
			wouldClose: output?.wouldClose,
			closed: output?.closed,
			reason: output?.verdict?.reason ?? output?.error,
		});
	} catch (error) {
		rows.push({
			item: label,
			status: "error",
			reason: error instanceof Error ? error.message : String(error),
		});
	}
}
console.table(rows);
