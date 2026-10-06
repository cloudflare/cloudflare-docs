import { loadEnvValue } from "./dotenv";

// Replays the comment spam gate against existing comments. Follows the dev
// server's DOCS_FLUE_REVIEW_MODE: `log` is a dry run, `comment` writes the R2
// audit record and deletes high-confidence spam.
const DEFAULT_COMMENTS = [5893607602, 5893616992, 5893624322];

const base = loadEnvValue("FLUE_BASE_URL") ?? "http://localhost:5173";
const token = loadEnvValue("DOCS_FLUE_INTERNAL_TOKEN");
if (!token)
	throw new Error(
		"DOCS_FLUE_INTERNAL_TOKEN not found in the environment or .flue/.env(.local)",
	);
const headers = { "x-dev-secret": token };

const flag = process.argv.indexOf("--comment");
const commentIds =
	flag === -1
		? DEFAULT_COMMENTS
		: String(process.argv[flag + 1])
				.split(",")
				.map((value) => value.trim())
				.filter(Boolean)
				.map((value) => {
					const id = Number(value);
					if (!Number.isInteger(id) || id <= 0)
						throw new Error(`--comment expects comment IDs, got "${value}"`);
					return id;
				});

type Output = {
	mode?: string;
	skipped?: string;
	deleted?: boolean;
	wouldDelete?: boolean;
	error?: string;
	verdict?: { is_spam: boolean; confidence: string; reason: string };
};

async function replay(commentId: number) {
	const response = await fetch(`${base}/dev/comment-spam-run/${commentId}`, {
		method: "POST",
		headers,
	});
	if (!response.ok)
		throw new Error(`${response.status} ${await response.text()}`);
	const { id, mode } = (await response.json()) as { id: string; mode: string };
	console.log(
		mode === "comment"
			? `Comment ${commentId}: comment mode, high-confidence spam WILL be deleted`
			: `Comment ${commentId}: log mode, dry run`,
	);
	const started = Date.now();
	while (Date.now() - started < 5 * 60_000) {
		await new Promise((done) => setTimeout(done, 3_000));
		const status = (await (
			await fetch(`${base}/dev/comment-spam-run/${id}`, { headers })
		).json()) as { status?: string; output?: Output; error?: unknown };
		if (["complete", "errored", "terminated"].includes(String(status.status)))
			return status;
	}
	return { status: "timeout" } as { status: string; output?: Output };
}

const rows = [];
for (const commentId of commentIds) {
	try {
		const { status, output } = (await replay(commentId)) as {
			status?: string;
			output?: Output;
		};
		rows.push({
			comment: commentId,
			status,
			skipped: output?.skipped,
			spam: output?.verdict?.is_spam,
			confidence: output?.verdict?.confidence,
			wouldDelete: output?.wouldDelete,
			deleted: output?.deleted,
			reason: output?.verdict?.reason ?? output?.error,
		});
	} catch (error) {
		rows.push({
			comment: commentId,
			status: "error",
			reason: error instanceof Error ? error.message : String(error),
		});
	}
}
console.table(rows);
