import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import type {
	ReviewRunSummary,
	SpecialistRunSummary,
} from "../lib/review/types";
import { loadEnvValue } from "./dotenv";

type Entry = { pr: number; note: string; changedFiles?: number };
type Result = Entry & {
	id?: string;
	status?: string;
	output?: ReviewRunSummary;
	error?: unknown;
	wallMs: number;
	timeout?: boolean;
};
const scriptDir = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(scriptDir, "../replay-results");
const base = loadEnvValue("FLUE_BASE_URL") ?? "http://localhost:5173";
const token = loadEnvValue("DOCS_FLUE_INTERNAL_TOKEN");
if (!token)
	throw new Error(
		"DOCS_FLUE_INTERNAL_TOKEN not found in the environment or .flue/.env(.local)",
	);
const headers = { "x-dev-secret": token };
const arg = (name: string) => {
	const index = process.argv.indexOf(name);
	return index === -1 ? undefined : process.argv[index + 1];
};
const concurrency = Math.max(1, Number(arg("--concurrency") ?? 1));
const selectedPrs = arg("--pr")
	?.split(",")
	.map((value) => value.trim())
	.filter(Boolean)
	.map((value) => {
		const pr = Number(value);
		if (!Number.isInteger(pr) || pr <= 0)
			throw new Error(`--pr expects PR numbers, got "${value}"`);
		return pr;
	});
const entries = JSON.parse(
	await readFile(resolve(scriptDir, "replay-prs.json"), "utf8"),
) as Entry[];
// --pr accepts any PR; a replay-prs.json entry only supplies its note and file count.
const queue: Entry[] = selectedPrs
	? selectedPrs.map(
			(pr) =>
				entries.find((entry) => entry.pr === pr) ?? { pr, note: "ad hoc" },
		)
	: entries;
await mkdir(outputDir, { recursive: true });

async function replay(entry: Entry): Promise<Result> {
	const started = Date.now();
	const response = await fetch(`${base}/dev/review-run/${entry.pr}`, {
		method: "POST",
		headers,
	});
	if (!response.ok)
		throw new Error(
			`PR #${entry.pr}: ${response.status} ${await response.text()}`,
		);
	const { id, mode } = (await response.json()) as {
		id: string;
		mode: "log" | "comment";
	};
	console.log(
		mode === "comment"
			? `PR #${entry.pr}: replay started in comment mode; it will update the PR comment at ${prUrl(entry.pr)}`
			: `PR #${entry.pr}: replay started in log mode; the comment prints here when done`,
	);
	let status: { status?: string; output?: ReviewRunSummary; error?: unknown } =
		{};
	while (Date.now() - started < 45 * 60_000) {
		await new Promise((done) => setTimeout(done, 10_000));
		status = (await (
			await fetch(`${base}/dev/review-run/${id}`, {
				headers,
			})
		).json()) as typeof status;
		if (["complete", "errored", "terminated"].includes(String(status.status)))
			break;
	}
	const result = {
		...entry,
		id,
		wallMs: Date.now() - started,
		...status,
		timeout: !["complete", "errored", "terminated"].includes(
			String(status.status),
		),
	};
	if (status.output?.runId && status.output.commentArtifact) {
		const comment = await fetch(
			`${base}/dev/review-run/${entry.pr}/${status.output.runId}/comment`,
			{ headers },
		);
		if (comment.ok) {
			const markdown = await comment.text();
			await writeFile(resolve(outputDir, `${entry.pr}.md`), markdown);
			if (status.output.outcome === "logged")
				console.log(
					`\n===== PR #${entry.pr} review comment =====\n\n${markdown}\n\n===== end PR #${entry.pr} =====\n`,
				);
		}
	}
	if (status.output?.outcome === "published")
		console.log(`PR #${entry.pr}: comment posted to ${prUrl(entry.pr)}`);
	return result;
}

function prUrl(pr: number): string {
	return `https://github.com/cloudflare/cloudflare-docs/pull/${pr}`;
}

const results: Result[] = [];
let cursor = 0;
await Promise.all(
	Array.from({ length: Math.min(concurrency, queue.length) }, async () => {
		while (cursor < queue.length) {
			const entry = queue[cursor++];
			const started = Date.now();
			// One failing PR must not discard the rest of the batch.
			results.push(
				await replay(entry).catch((error: unknown): Result => ({
					...entry,
					error: error instanceof Error ? error.message : String(error),
					wallMs: Date.now() - started,
				})),
			);
		}
	}),
);
function errorText(error: unknown): string | undefined {
	if (error === null || error === undefined) return undefined;
	if (typeof error === "string") return error;
	if (typeof error === "object" && "message" in error)
		return String(error.message);
	return JSON.stringify(error);
}

function specialistCell(summary: SpecialistRunSummary | undefined): string {
	if (!summary) return "skipped";
	if (!summary.ok) return "FAILED";
	return `ok ${summary.accepted} (-${summary.droppedOffTarget})`;
}

console.log(
	"Specialist cells: ok <accepted findings> (-<dropped off-target>). Details: .flue/replay-results/",
);
console.table(
	results.map((result) => {
		const output = result.output;
		const error = errorText(result.error);
		return {
			pr: result.pr,
			files: result.changedFiles,
			tier: output?.tier,
			code: output && specialistCell(output.specialists?.code),
			style: output && specialistCell(output.specialists?.style),
			conventions: output && specialistCell(output.specialists?.conventions),
			judge: output?.judge,
			active: output?.findings?.active,
			newKept: output?.findings?.newKept,
			newDropped: output?.findings?.newDropped,
			notReviewed: output?.notReviewed,
			seconds: Math.round(result.wallMs / 100) / 10,
			outcome:
				output?.outcome ??
				(result.timeout ? "timeout" : error ? "error" : result.status),
			reason: output?.reason ?? error,
		};
	}),
);
await writeFile(
	resolve(outputDir, "results.json"),
	`${JSON.stringify(results, null, 2)}\n`,
);
