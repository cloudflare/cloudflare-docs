/**
 * GitHub API-backed Flue tools for the Dependabot and code-review agents.
 *
 * These tools expose repo access to the model as structured tool calls,
 * using a GitHub App installation token from trusted workflow code.
 * The token never crosses into the agent sandbox — only results do.
 */
import { Type, type ToolDefinition } from "@flue/runtime";

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
	token: string,
	prNumber: number,
): ToolDefinition {
	return {
		name: "get_pr_context",
		description:
			"Fetch the Dependabot PR metadata: title, body, author, base/head refs.",
		parameters: Type.Object({}),
		async execute() {
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
	};
}

// ── Tool: get_pr_files ────────────────────────────────────────────────────────

export function makeGetPrFilesTool(
	token: string,
	prNumber: number,
): ToolDefinition {
	return {
		name: "get_pr_files",
		description:
			"Fetch the list of files changed in the Dependabot PR, including patches.",
		parameters: Type.Object({}),
		async execute() {
			const res = await fetch(
				`https://api.github.com/repos/${REPO}/pulls/${prNumber}/files?per_page=100`,
				{ headers: apiHeaders(token) },
			);
			if (!res.ok)
				throw new Error(
					`get_pr_files failed: ${res.status} ${await res.text()}`,
				);
			const files = (await res.json()) as Array<Record<string, unknown>>;
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
	};
}

// ── Tool: read_repo_file ──────────────────────────────────────────────────────

export function makeReadRepoFileTool(
	token: string,
	defaultRef: string = DEFAULT_REF,
): ToolDefinition {
	return {
		name: "read_repo_file",
		description: `Read any text file from the cloudflare/cloudflare-docs repo. Use for package.json, tsconfig, source files, etc. The default ref is "${defaultRef}".`,
		parameters: Type.Object({
			path: Type.String({
				description:
					"File path relative to repo root, e.g. 'package.json' or 'src/util/algolia.ts'",
			}),
			ref: Type.Optional(
				Type.String({ description: `Git ref. Defaults to "${defaultRef}".` }),
			),
		}),
		async execute(args) {
			const path = String(args.path ?? "");
			const ref = String(args.ref ?? defaultRef);
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
			const data = (await res.json()) as Record<string, unknown>;
			if (data.encoding === "base64" && typeof data.content === "string") {
				// Decode as UTF-8 via TextDecoder — atob() alone produces Latin-1
				// mojibake for non-ASCII content (em dashes, smart quotes, CJK, etc.).
				const binary = atob((data.content as string).replace(/\n/g, ""));
				const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
				const text = new TextDecoder().decode(bytes);
				// Cap at 32 KB to avoid bloating context
				if (text.length > 32768) {
					return (
						text.slice(0, 32768) +
						`\n\n[...truncated at 32 KB — file is ${text.length} bytes total]`
					);
				}
				return text;
			}
			return JSON.stringify(data);
		},
	};
}

// ── Tool: search_repo ─────────────────────────────────────────────────────────
//
// Uses the GitHub code search API. If search returns no results or errors,
// use read_repo_file on specific paths instead.

export function makeSearchRepoTool(token: string): ToolDefinition {
	return {
		name: "search_repo",
		description: `Search the cloudflare/cloudflare-docs repo for a string or pattern using GitHub code search. Returns matching file paths and line snippets. Use to find import sites, usages, and callers. Limited to 20 results. Note: code search indexes the default branch, so results may not reflect changes on the PR branch — use read_repo_file for exact current content. If code search returns an error or no results, use read_repo_file on specific paths instead.`,
		parameters: Type.Object({
			query: Type.String({
				description:
					"Search term, e.g. a package name, import path, or function name.",
			}),
			path: Type.Optional(
				Type.String({
					description:
						"Restrict search to this path prefix, e.g. 'src/' or 'worker/'.",
				}),
			),
		}),
		async execute(args) {
			const query = String(args.query ?? "");
			const path = typeof args.path === "string" ? args.path : undefined;
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
			const data = (await res.json()) as {
				total_count: number;
				items: Array<{
					path: string;
					name: string;
					text_matches?: Array<{ fragment: string }>;
				}>;
			};
			if (data.total_count === 0) return "No results found.";
			return JSON.stringify({
				total: data.total_count,
				shown: data.items.length,
				results: data.items.map((item) => ({
					path: item.path,
					snippets: (item.text_matches ?? [])
						.slice(0, 3)
						.map((m) => m.fragment),
				})),
			});
		},
	};
}

// ── Tool: get_npm_package_info ────────────────────────────────────────────────

export function makeGetNpmPackageInfoTool(): ToolDefinition {
	return {
		name: "get_npm_package_info",
		description:
			"Fetch npm registry metadata for a package version — description, homepage, repository, keywords, and any dist-tags. Useful when the PR body lacks release notes.",
		parameters: Type.Object({
			packageName: Type.String({
				description: "npm package name, e.g. 'astro' or '@astrojs/react'",
			}),
			version: Type.Optional(
				Type.String({
					description:
						"Specific version to fetch. Omit to get latest dist-tag info.",
				}),
			),
		}),
		async execute(args) {
			const packageName = String(args.packageName ?? "");
			const version =
				typeof args.version === "string" ? args.version : undefined;
			const encoded = encodeURIComponent(packageName);
			const url = version
				? `https://registry.npmjs.org/${encoded}/${encodeURIComponent(version)}`
				: `https://registry.npmjs.org/${encoded}`;
			const res = await fetch(url, {
				headers: { Accept: "application/json" },
			});
			if (!res.ok)
				return `npm registry returned ${res.status} for ${packageName}`;
			const data = (await res.json()) as Record<string, unknown>;
			// Return only useful fields to avoid context bloat
			return JSON.stringify({
				name: data.name,
				version: data.version,
				description: data.description,
				homepage: data.homepage,
				repository: data.repository,
				keywords: data.keywords,
				"dist-tags": version ? undefined : data["dist-tags"],
			});
		},
	};
}

// ── Tool: trace_dependency ────────────────────────────────────────────────────
//
// Reads package.json and the top of pnpm-lock.yaml to determine whether a
// package is a direct or transitive dependency, and which direct dep pulls it
// in if transitive. More reliable than code-searching the lockfile.

export function makeTraceDependencyTool(token: string): ToolDefinition {
	return {
		name: "trace_dependency",
		description:
			"Determine whether a package is a direct or transitive dependency of this repo by reading package.json and pnpm-lock.yaml from the production branch.",
		parameters: Type.Object({
			packageName: Type.String({
				description:
					"npm package name, e.g. 'algoliasearch' or '@astrojs/react'",
			}),
		}),
		async execute(args) {
			const packageName = String(args.packageName ?? "");
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
	};
}

// ── Factory: all tools ────────────────────────────────────────────────────────

export function makeDependabotReviewTools(
	token: string,
	prNumber: number,
): ToolDefinition[] {
	return [
		makeGetPrContextTool(token, prNumber),
		makeGetPrFilesTool(token, prNumber),
		makeReadRepoFileTool(token),
		makeSearchRepoTool(token),
		makeTraceDependencyTool(token),
		makeGetNpmPackageInfoTool(),
	];
}

// ── Factory: code-review tools ────────────────────────────────────────────────
//
// Tools for the generic code-review specialist. `read_repo_file` defaults to
// the PR head SHA so the agent reads post-change file content for full context
// (the diff patch alone is staged in the workspace). `search_repo` indexes the
// default branch only, so it is best-effort for finding usages/callers.

export function makeCodeReviewTools(
	token: string,
	headSha: string,
): ToolDefinition[] {
	return [makeReadRepoFileTool(token, headSha), makeSearchRepoTool(token)];
}

// ── Tool: get_commit_pr ───────────────────────────────────────────────────────

function makeGetCommitPrTool(token: string): ToolDefinition {
	return {
		name: "get_commit_pr",
		description:
			"Given a commit SHA from the production branch, return the pull request(s) that introduced that commit — including the PR title, description (body), number, and URL. Use this to understand WHY a production change was made and what the author intended, which helps determine the correct merge resolution.",
		parameters: Type.Object({
			commit_sha: Type.String({
				description: "The full or abbreviated git commit SHA to look up.",
			}),
		}),
		async execute(args) {
			const sha = String(args.commit_sha ?? "").trim();
			const res = await fetch(
				`https://api.github.com/repos/${REPO}/commits/${sha}/pulls`,
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
	};
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

export function makeRebaseConflictTools(token: string): ToolDefinition[] {
	// read_repo_file defaults to "production" but the agent can override the
	// ref parameter to read files at the merge base SHA, PR head SHA, or
	// production head SHA as needed for conflict resolution.
	const readTool = makeReadRepoFileTool(token, "production");
	return [readTool, makeGetCommitPrTool(token)];
}
