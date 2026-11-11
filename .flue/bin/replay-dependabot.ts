import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { loadEnvValue } from "./dotenv";

const scriptDir = dirname(fileURLToPath(import.meta.url));
const outputDir = resolve(scriptDir, "../replay-results");
const base = loadEnvValue("FLUE_BASE_URL") ?? "http://localhost:5173";
const token = loadEnvValue("DOCS_FLUE_INTERNAL_TOKEN");
if (!token)
	throw new Error(
		"DOCS_FLUE_INTERNAL_TOKEN not found in the environment or .flue/.env(.local)",
	);
const headers = { "x-dev-secret": token };

const index = process.argv.indexOf("--pr");
const prs = (index === -1 ? "" : (process.argv[index + 1] ?? ""))
	.split(",")
	.map((value) => value.trim())
	.filter(Boolean)
	.map((value) => {
		const pr = Number(value);
		if (!Number.isInteger(pr) || pr <= 0)
			throw new Error(`--pr expects PR numbers, got "${value}"`);
		return pr;
	});
if (prs.length === 0)
	throw new Error("Usage: pnpm run flue:replay:dependabot --pr <number,...>");

type Status = {
	status?: string;
	output?: {
		acted?: boolean;
		reason?: string;
		mode?: string;
		commentBody?: string;
	} | null;
	error?: unknown;
};
const done = ["complete", "errored", "terminated"];

await mkdir(outputDir, { recursive: true });

async function replay(pr: number): Promise<void> {
	const response = await fetch(`${base}/dev/review-run/dependabot/${pr}`, {
		method: "POST",
		headers,
	});
	if (!response.ok)
		throw new Error(`PR #${pr}: ${response.status} ${await response.text()}`);
	const { id, mode } = (await response.json()) as { id: string; mode: string };
	const url = `https://github.com/cloudflare/cloudflare-docs/pull/${pr}`;
	console.log(
		mode === "comment"
			? `PR #${pr}: comment mode; will update the PR comment at ${url}`
			: `PR #${pr}: log mode; the comment prints here when done`,
	);
	const started = Date.now();
	let status: Status = {};
	while (Date.now() - started < 20 * 60_000) {
		await new Promise((r) => setTimeout(r, 5_000));
		status = (await (
			await fetch(`${base}/dev/review-run/dependabot/status/${id}`, { headers })
		).json()) as Status;
		if (done.includes(String(status.status))) break;
	}
	if (status.status !== "complete") {
		console.error(
			`PR #${pr}: ${status.status ?? "timeout"}`,
			status.error ?? "",
		);
		return;
	}
	const output = status.output;
	if (!output?.acted) {
		console.log(`PR #${pr}: not reviewed (${output?.reason ?? "unknown"})`);
		return;
	}
	if (output.commentBody) {
		await writeFile(
			resolve(outputDir, `dependabot-${pr}.md`),
			output.commentBody,
		);
	}
	if (output.mode === "comment")
		console.log(`PR #${pr}: comment posted to ${url}`);
	else
		console.log(
			`\n===== PR #${pr} dependabot review =====\n\n${output.commentBody}\n\n===== end PR #${pr} =====\n`,
		);
}

for (const pr of prs) {
	await replay(pr).catch((error: unknown) =>
		console.error(error instanceof Error ? error.message : String(error)),
	);
}
