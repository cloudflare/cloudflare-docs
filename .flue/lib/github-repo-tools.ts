import { defineTool, type ToolDefinition } from "@flue/runtime";
import * as v from "valibot";
import type { TokenProvider } from "./token-provider";

const REPO = "cloudflare/cloudflare-docs";
const DEFAULT_REF = "production";
const headers = (token: string, accept = "application/vnd.github+json") => ({
	Authorization: `Bearer ${token}`,
	Accept: accept,
	"X-GitHub-Api-Version": "2022-11-28",
	"User-Agent": "cloudflare-docs-flue",
});

async function json(
	token: string,
	path: string,
	signal?: AbortSignal,
): Promise<unknown> {
	const response = await fetch(`https://api.github.com/${path}`, {
		headers: headers(token),
		signal: signal
			? AbortSignal.any([
					...(signal ? [signal] : []),
					AbortSignal.timeout(30_000),
				])
			: AbortSignal.timeout(30_000),
	});
	if (!response.ok) throw new Error(`GitHub returned HTTP ${response.status}`);
	return response.json();
}

/** Stream to a bounded output window, including continuations within long lines. */
async function readRange(
	response: Response,
	startLine: number,
	startColumn: number,
	endLine: number,
) {
	if (!response.body) return { text: "", next: null };
	const reader = response.body.getReader();
	const decoder = new TextDecoder();
	let line = 1,
		column = 0,
		text = "",
		done = false;
	try {
		while (!done) {
			const part = await reader.read();
			const chunk = decoder.decode(part.value, { stream: !part.done });
			done = part.done;
			for (const character of chunk) {
				if (line > endLine || text.length >= 24000)
					return { text, next: { startLine: line, startColumn: column } };
				if (line >= startLine && (line > startLine || column >= startColumn))
					text += character;
				if (character === "\n") {
					line++;
					column = 0;
				} else column++;
			}
		}
		return { text, next: null };
	} finally {
		await reader.cancel();
	}
}

export function makeReadRepoFileTool(
	getToken: TokenProvider,
	defaultRef = DEFAULT_REF,
): ToolDefinition {
	return defineTool({
		name: "read_repo_file",
		description: `Read exact repository file content, default commit ${defaultRef}. Reads are bounded; follow the returned next cursor to continue. Use line ranges to inspect surrounding context.`,
		input: v.object({
			path: v.string(),
			ref: v.optional(v.string()),
			startLine: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1)), 1),
			startColumn: v.optional(
				v.pipe(v.number(), v.integer(), v.minValue(0)),
				0,
			),
			endLine: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),
		}),
		async run({ data, signal }) {
			if (data.path.startsWith("/") || data.path.split("/").includes(".."))
				throw new Error("Expected repository-relative path");
			const ref = data.ref ?? defaultRef;
			const path = data.path.split("/").map(encodeURIComponent).join("/");
			const response = await fetch(
				`https://api.github.com/repos/${REPO}/contents/${path}?ref=${encodeURIComponent(ref)}`,
				{
					headers: headers(await getToken(), "application/vnd.github.raw+json"),
					signal: AbortSignal.any([
						...(signal ? [signal] : []),
						AbortSignal.timeout(30_000),
					]),
				},
			);
			if (response.status === 404) {
				await response.body?.cancel();
				return "File does not exist at this commit.";
			}
			if (!response.ok) {
				await response.body?.cancel();
				throw new Error(`GitHub file read returned ${response.status}`);
			}
			const result = await readRange(
				response,
				data.startLine,
				data.startColumn,
				Math.min(data.endLine ?? data.startLine + 199, data.startLine + 999),
			);
			return JSON.stringify({
				path: data.path,
				ref,
				startLine: data.startLine,
				...result,
			});
		},
	});
}

export function makeSearchRepoTool(getToken: TokenProvider): ToolDefinition {
	return defineTool({
		name: "search_repo",
		description:
			"Find callers and definitions on the DEFAULT branch through GitHub search. Results are hints, not evidence about the PR: verify with read_repo_file at the PR head commit. Search may be unavailable for an installation token.",
		input: v.object({ query: v.string(), path: v.optional(v.string()) }),
		async run({ data, signal }) {
			try {
				const query = `${data.query} repo:${REPO}${data.path ? ` path:${data.path}` : ""}`;
				return JSON.stringify(
					await json(
						await getToken(),
						`search/code?q=${encodeURIComponent(query)}&per_page=10`,
						signal,
					),
				);
			} catch {
				return "Search unavailable; read known repository paths at the pinned commit.";
			}
		},
	});
}

export function makeReviewCommentsTool(
	getToken: TokenProvider,
	number: number,
	author: string,
	since?: string,
): ToolDefinition {
	return defineTool({
		name: "read_review_comments",
		description:
			"Read human replies since the previous review. Follow nextPage until null. Only the PR author and repository collaborators can dismiss findings. Truncated comment bodies have explicit offsets for continuation.",
		input: v.object({
			page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1)), 1),
			commentId: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),
			offset: v.optional(v.pipe(v.number(), v.integer(), v.minValue(0)), 0),
		}),
		async run({ data, signal }) {
			type Comment = {
				issue_url: string;
				id: number;
				body: string;
				user: { login: string; type: string };
				author_association: string;
			};
			const token = await getToken();
			const allowed = (c: Comment) =>
				c.user.type !== "Bot" &&
				(c.user.login === author ||
					["OWNER", "MEMBER", "COLLABORATOR"].includes(c.author_association));
			if (data.commentId) {
				const comment = (await json(
					token,
					`repos/${REPO}/issues/comments/${data.commentId}`,
					signal,
				)) as Comment;
				if (
					comment.issue_url !==
						`https://api.github.com/repos/${REPO}/issues/${number}` ||
					!allowed(comment)
				)
					return "This commenter cannot dismiss findings.";
				const text = comment.body.slice(data.offset, data.offset + 12000);
				return JSON.stringify({
					id: comment.id,
					author: comment.user.login,
					text,
					nextOffset:
						data.offset + text.length < comment.body.length
							? data.offset + text.length
							: null,
				});
			}
			const comments = (await json(
				token,
				`repos/${REPO}/issues/${number}/comments?per_page=10&page=${data.page}${since ? `&since=${encodeURIComponent(since)}` : ""}`,
				signal,
			)) as Comment[];
			return JSON.stringify({
				comments: comments.filter(allowed).map((c) => ({
					id: c.id,
					author: c.user.login,
					body: c.body.slice(0, 1500),
					nextOffset: c.body.length > 1500 ? 1500 : null,
				})),
				nextPage: comments.length === 10 ? data.page + 1 : null,
			});
		},
	});
}

export function makeGetNpmPackageInfoTool(): ToolDefinition {
	return defineTool({
		name: "get_npm_package_info",
		description:
			"Read npm package-version metadata to corroborate release details.",
		input: v.object({
			packageName: v.string(),
			version: v.optional(v.string()),
		}),
		async run({ data, signal }) {
			const response = await fetch(
				`https://registry.npmjs.org/${encodeURIComponent(data.packageName)}/${encodeURIComponent(data.version ?? "latest")}`,
				{
					signal: AbortSignal.any([
						...(signal ? [signal] : []),
						AbortSignal.timeout(30_000),
					]),
				},
			);
			if (!response.ok) return `npm returned HTTP ${response.status}`;
			const metadata = (await response.json()) as Record<string, unknown>;
			return JSON.stringify({
				name: metadata.name,
				version: metadata.version,
				description: metadata.description,
				repository: metadata.repository,
				engines: metadata.engines,
				deprecated: metadata.deprecated,
			});
		},
	});
}

export function makeDependabotReviewTools(
	getToken: TokenProvider,
	prNumber: number,
	headSha = DEFAULT_REF,
): ToolDefinition[] {
	return [
		makeReadRepoFileTool(getToken, headSha),
		makeSearchRepoTool(getToken),
		makeGetNpmPackageInfoTool(),
		defineTool({
			name: "get_pr_context",
			description: "Read PR release notes and metadata.",
			async run({ signal }) {
				const pr = (await json(
					await getToken(),
					`repos/${REPO}/pulls/${prNumber}`,
					signal,
				)) as Record<string, unknown>;
				return JSON.stringify({ title: pr.title, body: pr.body });
			},
		}),
		defineTool({
			name: "get_pr_files",
			description:
				"Read one page of changed-file metadata. Follow nextPage for additional files; read file contents at the pinned head SHA.",
			input: v.object({
				page: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1)), 1),
			}),
			async run({ data, signal }) {
				const files = (await json(
					await getToken(),
					`repos/${REPO}/pulls/${prNumber}/files?per_page=25&page=${data.page}`,
					signal,
				)) as Array<Record<string, unknown>>;
				return JSON.stringify({
					files: files.map((f) => ({ filename: f.filename, status: f.status })),
					nextPage: files.length === 25 ? data.page + 1 : null,
				});
			},
		}),
	];
}

export function makeCodeReviewTools(
	getToken: TokenProvider,
	headSha: string,
): ToolDefinition[] {
	return [
		makeReadRepoFileTool(getToken, headSha),
		makeSearchRepoTool(getToken),
	];
}

export function makeRebaseConflictTools(
	getToken: TokenProvider,
): ToolDefinition[] {
	return [
		makeReadRepoFileTool(getToken),
		defineTool({
			name: "get_commit_pr",
			description: "Read the PR descriptions explaining a production commit.",
			input: v.object({
				commit_sha: v.pipe(v.string(), v.regex(/^[0-9a-f]{40}$/)),
			}),
			async run({ data, signal }) {
				const prs = (await json(
					await getToken(),
					`repos/${REPO}/commits/${data.commit_sha}/pulls`,
					signal,
				)) as Array<Record<string, unknown>>;
				return JSON.stringify(
					prs.map((pr) => ({
						number: pr.number,
						title: pr.title,
						body: typeof pr.body === "string" ? pr.body.slice(0, 6000) : null,
					})),
				);
			},
		}),
	];
}
