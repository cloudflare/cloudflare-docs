/**
 * GitHub API-backed Flue tools for the Dependabot and code-review agents.
 *
 * These tools expose repo access to the model as structured tool calls,
 * using a GitHub App installation token from trusted agent code.
 * The token never crosses into the agent sandbox — only results do.
 */
import { defineTool, type ToolDefinition } from "@flue/runtime";
import * as v from "valibot";
import { getPullRequestFiles } from "./github";
import type { TokenProvider } from "./token-provider";

const REPO = "cloudflare/cloudflare-docs";
const DEFAULT_REF = "production";

function apiHeaders(token: string): Record<string, string> {
	return {
		Authorization: `Bearer ${token}`,
		Accept: "application/vnd.github+json",
		"X-GitHub-Api-Version": "2022-11-28",
		"User-Agent": "cloudflare-docs-agents",
	};
}

// ── Tool: get_pr_context ──────────────────────────────────────────────────────

export function makeGetPrContextTool(
	getToken: TokenProvider,
	prNumber: number,
): ToolDefinition {
	return defineTool({
		name: "get_pr_context",
		timeoutMs: 30_000,
		description:
			"Fetch the Dependabot PR metadata: title, body, author, base/head refs.",
		async run() {
			const token = await getToken();
			const res = await fetch(
				`https://api.github.com/repos/${REPO}/pulls/${prNumber}`,
				{ headers: apiHeaders(token) },
			);
			if (!res.ok)
				throw new Error(
					`get_pr_context failed: ${res.status} ${await res.text()}`,
				);
			const pr = (await res.json()) as Record<string, unknown>;
			return JSON.stringify({
				number: pr.number,
				title: pr.title,
				body: pr.body,
				author: (pr.user as Record<string, unknown>)?.login,
				base: (pr.base as Record<string, unknown>)?.ref,
				head: (pr.head as Record<string, unknown>)?.ref,
				headSha: (pr.head as Record<string, unknown>)?.sha,
			});
		},
	});
}

// ── Tool: get_pr_files ────────────────────────────────────────────────────────

export function makeGetPrFilesTool(
	getToken: TokenProvider,
	prNumber: number,
): ToolDefinition {
	return defineTool({
		name: "get_pr_files",
		timeoutMs: 30_000,
		description:
			"Fetch the list of files changed in the Dependabot PR, including patches.",
		async run() {
			const token = await getToken();
			const files = await getPullRequestFiles(token, prNumber);
			return JSON.stringify(
				files.map((f) => ({
					filename: f.filename,
					status: f.status,
					additions: f.additions,
					deletions: f.deletions,
					patch: f.patch,
				})),
			);
		},
	});
}

// ── Tool: read_repo_file ──────────────────────────────────────────────────────

const MAX_FILE_CHARS = 32_768;

export interface LineRange {
	start_line?: number;
	end_line?: number;
}

/**
 * Render file text for the model. A whole file within the size cap is
 * returned as-is. A line range, or a file over the cap, is returned with a
 * header giving the shown line span, and cut at a line boundary with a note
 * saying where to continue, so no part of the file is unreachable.
 */
export function renderRepoFile(
	path: string,
	text: string,
	range: LineRange = {},
): string {
	const ranged = range.start_line !== undefined || range.end_line !== undefined;
	if (!ranged && text.length <= MAX_FILE_CHARS) return text;

	const lines = text.split("\n");
	if (text.endsWith("\n")) lines.pop();
	const total = lines.length;
	const start = range.start_line ?? 1;
	const end = Math.min(range.end_line ?? total, total);
	if (start > total)
		return `${path} has ${total} lines; start_line ${start} is past the end.`;
	if (end < start) return `end_line ${end} is before start_line ${start}.`;

	const shown: string[] = [];
	let size = 0;
	let lastShown = start - 1;
	for (let n = start; n <= end; n++) {
		const line = lines[n - 1];
		if (shown.length > 0 && size + line.length + 1 > MAX_FILE_CHARS) break;
		shown.push(line.slice(0, MAX_FILE_CHARS));
		size += line.length + 1;
		lastShown = n;
	}

	const header = `[${path}: lines ${start}-${lastShown} of ${total}]`;
	const rest =
		lastShown < end
			? `\n[Output capped at ${MAX_FILE_CHARS} characters. Request start_line=${lastShown + 1} to continue.]`
			: "";
	return `${header}\n${shown.join("\n")}${rest}`;
}

const lineNumber = (description: string) =>
	v.optional(
		v.pipe(v.number(), v.integer(), v.minValue(1), v.description(description)),
	);

/** Model-facing contract for `read_repo_file`; evals reuse it with fixture data. */
export function readRepoFileDefinition(defaultRef: string = DEFAULT_REF) {
	return {
		name: "read_repo_file",
		description: `Read a text file from the cloudflare/cloudflare-docs repo. The default ref is "${defaultRef}". Pass start_line and end_line to read part of a large file. Output over ${MAX_FILE_CHARS} characters is cut at a line boundary with a note saying where to continue.`,
		input: v.object({
			path: v.pipe(
				v.string(),
				v.description(
					"File path relative to repo root, e.g. 'package.json' or 'src/util/algolia.ts'",
				),
			),
			ref: v.optional(
				v.pipe(
					v.string(),
					v.description(`Git ref. Defaults to "${defaultRef}".`),
				),
			),
			start_line: lineNumber("First line to read, 1-based. Defaults to 1."),
			end_line: lineNumber(
				"Last line to read, inclusive. Defaults to the end of the file.",
			),
		}),
	};
}

export function makeReadRepoFileTool(
	getToken: TokenProvider,
	defaultRef: string = DEFAULT_REF,
): ToolDefinition {
	return defineTool({
		...readRepoFileDefinition(defaultRef),
		timeoutMs: 30_000,
		async run({ data }) {
			const token = await getToken();
			const path = data.path;
			const ref = data.ref ?? defaultRef;
			// Encode each path segment but preserve the slashes the contents API needs.
			const encodedPath = path.split("/").map(encodeURIComponent).join("/");
			const res = await fetch(
				`https://api.github.com/repos/${REPO}/contents/${encodedPath}?ref=${encodeURIComponent(ref)}`,
				{ headers: apiHeaders(token) },
			);
			if (res.status === 404) return `File not found: ${path}`;
			if (!res.ok)
				throw new Error(
					`read_repo_file failed for ${path}: ${res.status} ${await res.text()}`,
				);
			const data_ = (await res.json()) as Record<string, unknown>;
			if (data_.encoding === "base64" && typeof data_.content === "string") {
				// Decode as UTF-8 via TextDecoder — atob() alone produces Latin-1
				// mojibake for non-ASCII content (em dashes, smart quotes, CJK, etc.).
				const binary = atob((data_.content as string).replace(/\n/g, ""));
				const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
				const text = new TextDecoder().decode(bytes);
				return renderRepoFile(path, text, {
					start_line: data.start_line,
					end_line: data.end_line,
				});
			}
			return JSON.stringify(data_);
		},
	});
}

// ── Tool: search_repo ─────────────────────────────────────────────────────────
//
// Uses the GitHub code search API. If search returns no results or errors,
// use read_repo_file on specific paths instead.

/** Model-facing contract for `search_repo`; evals reuse it with fixture data. */
export const SEARCH_REPO_DEFINITION = {
	name: "search_repo",
	description: `Search the cloudflare/cloudflare-docs repo with GitHub code search to find definitions, import sites, usages, and callers. Returns up to 20 matching file paths with line snippets. Code search indexes the default branch only: results show code as it was before a PR, and cannot include code a PR adds. Use read_repo_file for current content. If search errors or finds nothing, read specific files instead.`,
	input: v.object({
		query: v.pipe(
			v.string(),
			v.description(
				"Search term, e.g. a package name, import path, or function name.",
			),
		),
		path: v.optional(
			v.pipe(
				v.string(),
				v.description(
					"Directory prefix to restrict the search, e.g. 'src/' or '.flue/lib/'. Not a file path; to search one file, read it instead.",
				),
			),
		),
	}),
};

export function makeSearchRepoTool(getToken: TokenProvider): ToolDefinition {
	return defineTool({
		...SEARCH_REPO_DEFINITION,
		timeoutMs: 60_000,
		async run({ data }) {
			const token = await getToken();
			const query = data.query;
			const path = data.path;
			const q = `${query} repo:${REPO}${path ? ` path:${path}` : ""}`;
			const res = await fetch(
				`https://api.github.com/search/code?q=${encodeURIComponent(q)}&per_page=20`,
				{
					headers: {
						...apiHeaders(token),
						Accept: "application/vnd.github.text-match+json",
					},
				},
			);
			if (!res.ok) {
				// Code search can 403/422 on some queries — return a descriptive message
				return `search_repo: GitHub code search returned ${res.status}. Try read_repo_file on specific paths instead.`;
			}
			const data_ = (await res.json()) as {
				total_count: number;
				items: Array<{
					path: string;
					name: string;
					text_matches?: Array<{ fragment: string }>;
				}>;
			};
			if (data_.total_count === 0) return "No results found.";
			return JSON.stringify({
				total: data_.total_count,
				shown: data_.items.length,
				results: data_.items.map((item) => ({
					path: item.path,
					snippets: (item.text_matches ?? [])
						.slice(0, 3)
						.map((m) => m.fragment),
				})),
			});
		},
	});
}

// ── Tool: get_npm_package_info ────────────────────────────────────────────────

export function makeGetNpmPackageInfoTool(): ToolDefinition {
	return defineTool({
		name: "get_npm_package_info",
		timeoutMs: 60_000,
		description:
			"Fetch npm registry metadata for a package version — description, homepage, repository, keywords, and any dist-tags. Useful when the PR body lacks release notes.",
		input: v.object({
			packageName: v.pipe(
				v.string(),
				v.description("npm package name, e.g. 'astro' or '@astrojs/react'"),
			),
			version: v.optional(
				v.pipe(
					v.string(),
					v.description(
						"Specific version to fetch. Omit to get latest dist-tag info.",
					),
				),
			),
		}),
		async run({ data }) {
			const packageName = data.packageName;
			const version = data.version;
			const encoded = encodeURIComponent(packageName);
			const url = version
				? `https://registry.npmjs.org/${encoded}/${encodeURIComponent(version)}`
				: `https://registry.npmjs.org/${encoded}`;
			const res = await fetch(url, {
				headers: { Accept: "application/json" },
			});
			if (!res.ok)
				return `npm registry returned ${res.status} for ${packageName}`;
			const data_ = (await res.json()) as Record<string, unknown>;
			// Return only useful fields to avoid context bloat
			return JSON.stringify({
				name: data_.name,
				version: data_.version,
				description: data_.description,
				homepage: data_.homepage,
				repository: data_.repository,
				keywords: data_.keywords,
				"dist-tags": version ? undefined : data_["dist-tags"],
			});
		},
	});
}

// ── Tool: trace_dependency ────────────────────────────────────────────────────
//
// Reads package.json and the top of pnpm-lock.yaml to determine whether a
// package is a direct or transitive dependency, and which direct dep pulls it
// in if transitive. More reliable than code-searching the lockfile.

export function makeTraceDependencyTool(
	getToken: TokenProvider,
): ToolDefinition {
	return defineTool({
		name: "trace_dependency",
		timeoutMs: 60_000,
		description:
			"Determine whether a package is a direct or transitive dependency of this repo by reading package.json and pnpm-lock.yaml from the production branch.",
		input: v.object({
			packageName: v.pipe(
				v.string(),
				v.description(
					"npm package name, e.g. 'algoliasearch' or '@astrojs/react'",
				),
			),
		}),
		async run({ data }) {
			const token = await getToken();
			const packageName = data.packageName;
			// 1. Check package.json for direct dep
			const pkgRes = await fetch(
				`https://api.github.com/repos/${REPO}/contents/package.json?ref=${DEFAULT_REF}`,
				{ headers: apiHeaders(token) },
			);
			let directDep = false;
			let depType: "dependencies" | "devDependencies" | null = null;
			if (pkgRes.ok) {
				const pkgData = (await pkgRes.json()) as Record<string, unknown>;
				if (
					pkgData.encoding === "base64" &&
					typeof pkgData.content === "string"
				) {
					const pkgJson = JSON.parse(
						atob((pkgData.content as string).replace(/\n/g, "")),
					) as Record<string, Record<string, string>>;
					if (pkgJson.dependencies?.[packageName]) {
						directDep = true;
						depType = "dependencies";
					} else if (pkgJson.devDependencies?.[packageName]) {
						directDep = true;
						depType = "devDependencies";
					}
				}
			}

			if (directDep) {
				return JSON.stringify({
					direct: true,
					type: depType,
					note: `${packageName} is a direct ${depType} of this repo.`,
				});
			}

			// 2. Check pnpm-lock.yaml importers section for transitive resolution
			// The lock file is large; fetch only enough to check the importers block.
			// We use the raw API to avoid base64 size limits.
			const lockRes = await fetch(
				`https://raw.githubusercontent.com/${REPO}/${DEFAULT_REF}/pnpm-lock.yaml`,
				{ headers: { Authorization: `Bearer ${token}` } },
			);
			if (!lockRes.ok) {
				return JSON.stringify({
					direct: false,
					transitive: true,
					note: "Could not read pnpm-lock.yaml to trace transitive dep.",
				});
			}
			// Read enough of the lockfile to find the package in snapshots
			const lockText = await lockRes.text();
			const escapedName = packageName.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
			// Check if it appears in the snapshots section (transitive)
			const inSnapshots = new RegExp(`^\\s+${escapedName}@`, "m").test(
				lockText,
			);

			// Find which direct deps pull it in by searching snapshot dependencies
			// This is a heuristic: look for the package name near other known deps
			return JSON.stringify({
				direct: false,
				transitive: inSnapshots,
				note: inSnapshots
					? `${packageName} appears to be a transitive dependency. Use read_repo_file to inspect specific snapshot entries in pnpm-lock.yaml for the full dependency chain.`
					: `${packageName} was not found in pnpm-lock.yaml — it may not be installed at all.`,
			});
		},
	});
}

// ── Factory: all tools ────────────────────────────────────────────────────────

export function makeDependabotReviewTools(
	getToken: TokenProvider,
	prNumber: number,
): ToolDefinition[] {
	return [
		makeGetPrContextTool(getToken, prNumber),
		makeGetPrFilesTool(getToken, prNumber),
		makeReadRepoFileTool(getToken),
		makeSearchRepoTool(getToken),
		makeTraceDependencyTool(getToken),
		makeGetNpmPackageInfoTool(),
	];
}

// ── Tool: get_commit_pr ───────────────────────────────────────────────────────

function makeGetCommitPrTool(getToken: TokenProvider): ToolDefinition {
	return defineTool({
		name: "get_commit_pr",
		timeoutMs: 30_000,
		description:
			"Given a commit SHA from the production branch, return the pull request(s) that introduced that commit — including the PR title, description (body), number, and URL. Use this to understand WHY a production change was made and what the author intended, which helps determine the correct merge resolution.",
		input: v.object({
			commit_sha: v.pipe(
				v.string(),
				v.description("The full 40-character git commit SHA to look up."),
			),
		}),
		async run({ data }) {
			const token = await getToken();
			const sha = data.commit_sha.trim();
			// Validate before URL-interpolation: the GitHub commits/{sha}/pulls
			// endpoint requires a full 40-character SHA.
			if (!/^[0-9a-f]{40}$/i.test(sha)) {
				return `Invalid commit SHA: "${sha}". Provide a full 40-character hex SHA.`;
			}
			const res = await fetch(
				`https://api.github.com/repos/${REPO}/commits/${encodeURIComponent(sha)}/pulls`,
				{
					headers: {
						Authorization: `Bearer ${token}`,
						// The commit-pulls endpoint historically required the groot-preview
						// media type. It has since graduated to the stable API, but
						// including the preview type ensures compatibility with any
						// GitHub Enterprise instances that may still require it.
						Accept:
							"application/vnd.github.groot-preview+json, application/vnd.github+json",
						"X-GitHub-Api-Version": "2022-11-28",
						"User-Agent": "cloudflare-docs-agents",
					},
				},
			);
			if (!res.ok) {
				// 422 means the SHA is invalid/malformed — surface the real error
				// rather than masking it as "no PRs found" (200 + empty array is
				// how the API signals an empty result).
				throw new Error(
					`get_commit_pr failed for ${sha}: HTTP ${res.status} — ${await res.text()}`,
				);
			}
			const prs = (await res.json()) as Array<{
				number: number;
				title: string;
				body: string | null;
				html_url: string;
				state: string;
			}>;
			if (prs.length === 0) return "No pull requests found for that commit.";
			return JSON.stringify(
				prs.map((pr) => ({
					number: pr.number,
					title: pr.title,
					body: pr.body
						? pr.body.slice(0, 2000) +
							(pr.body.length > 2000 ? "\n[...truncated]" : "")
						: null,
					url: pr.html_url,
					state: pr.state,
				})),
			);
		},
	});
}

// ── Factory: rebase-conflict tools ────────────────────────────────────────────
//
// Tools for the AI conflict-resolution agent in /rebaseWithConflicts.
//
// Bounded to:
//   - read_repo_file: read any file at any ref (merge base, PR head, prod head)
//   - get_commit_pr: look up the PR title+description for a production commit
//
// The agent CANNOT make arbitrary GitHub calls — only these two.

export function makeRebaseConflictTools(
	getToken: TokenProvider,
): ToolDefinition[] {
	// read_repo_file defaults to "production" but the agent can override the
	// ref parameter to read files at the merge base SHA, PR head SHA, or
	// production head SHA as needed for conflict resolution.
	const readTool = makeReadRepoFileTool(getToken, "production");
	return [readTool, makeGetCommitPrTool(getToken)];
}
