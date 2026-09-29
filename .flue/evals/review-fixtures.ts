import { parsePatch } from "../lib/review/diff/patch";
import type {
	FileStatus,
	Finding,
	PatchFile,
	ReviewPlan,
	Specialist,
} from "../lib/review/types";

export const pr = {
	number: 999,
	title: "[Workers] Review fixtures",
	body: "Update Workers docs and code.",
	author: "author",
};

export function file(
	path: string,
	source: string,
	status: FileStatus = "modified",
): PatchFile {
	const lines = source.split("\n");
	return {
		path,
		status,
		additions: lines.filter((line) => line.startsWith("+")).length,
		deletions: lines.filter((line) => line.startsWith("-")).length,
		disposition: "reviewable",
		hunks: parsePatch(source),
	};
}

/** Post-change file content for a single hunk that spans the whole file. */
function headFromPatch(patch: string): string {
	return patch
		.split("\n")
		.slice(1)
		.filter((line) => line !== "" && !line.startsWith("-"))
		.map((line) => line.slice(1))
		.join("\n");
}

/**
 * Code-review cases. Each hunk covers the whole file, so `read_repo_file` at
 * the case's `headSha` returns content consistent with the diff.
 */
export const CODE_CASES = {
	unhandledPromise: {
		headSha: "eval-code-unhandled-promise",
		path: "src/handler.ts",
		patch: [
			"@@ -1,6 +1,7 @@",
			" export default {",
			" \tasync fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {",
			" \t\tconst response = await fetch(request);",
			'+\t\tfetch(env.ANALYTICS_URL, { method: "POST", body: new URL(request.url).pathname });',
			" \t\treturn response;",
			" \t},",
			" };",
			"",
		].join("\n"),
	},
	handledErrors: {
		headSha: "eval-code-handled-errors",
		path: "src/handler.ts",
		patch: [
			"@@ -1,5 +1,10 @@",
			" export default {",
			" \tasync fetch(request: Request): Promise<Response> {",
			"-\t\treturn fetch(request);",
			"+\t\ttry {",
			"+\t\t\treturn await fetch(request);",
			"+\t\t} catch (error) {",
			'+\t\t\tconsole.error("Origin fetch failed", error);',
			'+\t\t\treturn new Response("Origin unavailable", { status: 502 });',
			"+\t\t}",
			" \t},",
			" };",
			"",
		].join("\n"),
	},
} as const;

/** Repository content served by the eval `read_repo_file` mock: ref → path → text. */
export const REPO_FIXTURES: Record<
	string,
	Record<string, string>
> = Object.fromEntries(
	Object.values(CODE_CASES).map((entry) => [
		entry.headSha,
		{ [entry.path]: headFromPatch(entry.patch) },
	]),
);

export function plan(specialist: Specialist, files: PatchFile[]): ReviewPlan {
	const lines = Object.fromEntries(
		files.map((entry) => [
			entry.path,
			entry.hunks.flatMap((hunk) =>
				hunk.lines
					.filter((line) => line.kind === "add")
					.map((line) => line.newLine!),
			),
		]),
	);
	return {
		tier: "inline",
		fullReview: true,
		targets: {
			[specialist]: {
				specialist,
				lines,
				files: files.map((entry) => entry.path),
				fingerprints: {},
				estimatedTokens: 1,
			},
		},
		skipped: {},
		notReviewed: [],
		totalEstimatedTokens: 1,
		conventionsInputHash: "eval",
	};
}

export function finding(
	id: string,
	specialist: Specialist,
	path: string,
	line: number,
	title: string,
): Finding {
	return {
		id,
		specialist,
		path,
		line,
		title,
		explanation: `${title} explanation.`,
		firstSeenSha: "base",
		lastSeenSha: "head",
	};
}
