import { createAppAuth } from "@octokit/auth-app";

const REPO = "cloudflare/cloudflare-docs";

function githubFetch(
	url: string,
	options: RequestInit = {},
): Promise<Response> {
	return fetch(url, {
		...options,
		signal: AbortSignal.any([
			...(options.signal ? [options.signal] : []),
			AbortSignal.timeout(30_000),
		]),
	});
}

export async function getPullRequestFileSample(
	token: string,
	number: number,
): Promise<PullRequestFile[]> {
	const response = await githubFetch(
		`https://api.github.com/repos/${REPO}/pulls/${number}/files?per_page=26`,
		{ headers: apiHeaders(token) },
	);
	if (!response.ok)
		throw new Error(`GitHub file sample returned ${response.status}`);
	return response.json<PullRequestFile[]>();
}

export interface PullRequestFile {
	filename: string;
	status: string;
	additions: number;
	deletions: number;
	changes: number;
	patch?: string;
	/**
	 * The previous filename for renamed files (status === "renamed").
	 * Present in the GitHub API response; absent for all other statuses.
	 * Use this — not filename — when computing the old path of a rename.
	 */
	previous_filename?: string;
}

export interface GitHubUser {
	login: string;
	type?: string;
}

export interface GitHubIssue {
	number: number;
	title: string;
	body: string | null;
	state: string;
	html_url: string;
	user: GitHubUser | null;
	author_association: string;
	labels: Array<{ name: string }>;
}

export interface GitHubPullRequest {
	number: number;
	title: string;
	body: string | null;
	state: string;
	html_url: string;
	user: GitHubUser | null;
	author_association: string;
	draft: boolean;
	labels: { name: string }[];
	base: { ref: string; sha: string; repo: { full_name: string } };
	/** head.repo can be null when the fork has been deleted. */
	head: { ref: string; sha: string; repo: { full_name: string } | null };
}

let appAuth:
	{ key: string; authenticate: ReturnType<typeof createAppAuth> } | undefined;

export async function getInstallationToken(env: {
	DOCS_FLUE_GITHUB_APP_ID?: string;
	DOCS_FLUE_GITHUB_APP_PRIVATE_KEY?: string;
	DOCS_FLUE_GITHUB_INSTALLATION_ID?: string;
}): Promise<string> {
	if (
		!env.DOCS_FLUE_GITHUB_APP_ID ||
		!env.DOCS_FLUE_GITHUB_APP_PRIVATE_KEY ||
		!env.DOCS_FLUE_GITHUB_INSTALLATION_ID
	)
		throw new Error("Missing GitHub App credentials");
	const key = `${env.DOCS_FLUE_GITHUB_APP_ID}:${env.DOCS_FLUE_GITHUB_INSTALLATION_ID}:${env.DOCS_FLUE_GITHUB_APP_PRIVATE_KEY}`;
	if (!appAuth || appAuth.key !== key)
		appAuth = {
			key,
			authenticate: createAppAuth({
				appId: env.DOCS_FLUE_GITHUB_APP_ID,
				privateKey: env.DOCS_FLUE_GITHUB_APP_PRIVATE_KEY,
				installationId: Number(env.DOCS_FLUE_GITHUB_INSTALLATION_ID),
			}),
		};

	const { token } = await appAuth.authenticate({ type: "installation" });
	return token;
}

function apiHeaders(token: string): Record<string, string> {
	return {
		Authorization: `Bearer ${token}`,
		Accept: "application/vnd.github+json",
		"X-GitHub-Api-Version": "2022-11-28",
		"Content-Type": "application/json",
		"User-Agent": "cloudflare-docs-agents",
	};
}

/**
 * Parse the `rel="next"` URL out of a GitHub `Link` response header.
 * Returns null when there is no next page.
 */
function parseNextLink(link: string | null): string | null {
	if (!link) return null;
	for (const part of link.split(",")) {
		const match = part.match(/<([^>]+)>\s*;\s*rel="next"/);
		if (match) return match[1];
	}
	return null;
}

/**
 * Encode a git ref (branch, tag, or SHA) for use in a URL path segment while
 * preserving the `/` separators branch names can contain (e.g. `feature/foo`).
 * SHAs contain no special characters, so this is a no-op for them.
 */
function encodeRef(ref: string): string {
	return ref.split("/").map(encodeURIComponent).join("/");
}

export async function closeIssue(
	token: string,
	issueNumber: number,
): Promise<void> {
	const res = await githubFetch(
		`https://api.github.com/repos/${REPO}/issues/${issueNumber}`,
		{
			method: "PATCH",
			headers: apiHeaders(token),
			body: JSON.stringify({ state: "closed", state_reason: "not_planned" }),
		},
	);
	if (!res.ok) {
		throw new Error(
			`Failed to close issue ${issueNumber} (HTTP ${res.status}): ${await res.text()}`,
		);
	}
}

export async function postComment(
	token: string,
	issueNumber: number,
	body: string,
): Promise<number> {
	const res = await githubFetch(
		`https://api.github.com/repos/${REPO}/issues/${issueNumber}/comments`,
		{
			method: "POST",
			headers: apiHeaders(token),
			body: JSON.stringify({ body }),
		},
	);
	if (!res.ok) {
		throw new Error(
			`Failed to post comment on ${issueNumber} (HTTP ${res.status}): ${await res.text()}`,
		);
	}
	return ((await res.json()) as { id: number }).id;
}

export async function getIssue(
	token: string,
	issueNumber: number,
): Promise<GitHubIssue> {
	const res = await githubFetch(
		`https://api.github.com/repos/${REPO}/issues/${issueNumber}`,
		{
			headers: apiHeaders(token),
		},
	);
	if (!res.ok) {
		throw new Error(
			`Failed to get issue ${issueNumber} (HTTP ${res.status}): ${await res.text()}`,
		);
	}
	return (await res.json()) as GitHubIssue;
}

export async function getPullRequest(
	token: string,
	pullNumber: number,
): Promise<GitHubPullRequest> {
	const res = await githubFetch(
		`https://api.github.com/repos/${REPO}/pulls/${pullNumber}`,
		{
			headers: apiHeaders(token),
		},
	);
	if (!res.ok) {
		throw new Error(
			`Failed to get PR ${pullNumber} (HTTP ${res.status}): ${await res.text()}`,
		);
	}
	return (await res.json()) as GitHubPullRequest;
}

/**
 * Fetch the decoded text content of a repo file at a given ref via the
 * GitHub contents API. Returns null when the file is missing (404) or not
 * base64 text; throws on other non-2xx responses (rate limit, auth, 5xx) so
 * callers can distinguish "absent" from "failed to load". Used to load
 * repo-level context (e.g. the root AGENTS.md) into agents.
 */
export async function getRepoFileContent(
	token: string,
	path: string,
	ref: string,
	signal?: AbortSignal,
): Promise<string | null> {
	// Encode each path segment but preserve the slashes the contents API needs.
	const encodedPath = path.split("/").map(encodeURIComponent).join("/");
	const res = await githubFetch(
		`https://api.github.com/repos/${REPO}/contents/${encodedPath}?ref=${encodeURIComponent(ref)}`,
		{ headers: apiHeaders(token), signal },
	);
	if (res.status === 404) return null;
	if (!res.ok) {
		throw new Error(
			`Failed to get repo file ${path}@${ref} (HTTP ${res.status}): ${await res.text()}`,
		);
	}
	const data = (await res.json()) as {
		encoding?: string;
		content?: string;
	};
	if (data.encoding !== "base64" || typeof data.content !== "string") {
		throw new Error(
			`File ${path}@${ref} cannot be read through the contents API; it is not treated as absent.`,
		);
	}
	// atob yields a Latin-1 byte string; decode those bytes as UTF-8 so
	// non-ASCII content (e.g. em dashes in AGENTS.md) is not mojibake.
	const binary = atob(data.content.replace(/\n/g, ""));
	const bytes = Uint8Array.from(binary, (c) => c.charCodeAt(0));
	return new TextDecoder().decode(bytes);
}

export async function addLabels(
	token: string,
	issueNumber: number,
	labels: string[],
): Promise<void> {
	const res = await githubFetch(
		`https://api.github.com/repos/${REPO}/issues/${issueNumber}/labels`,
		{
			method: "POST",
			headers: apiHeaders(token),
			body: JSON.stringify({ labels }),
		},
	);
	if (!res.ok) {
		throw new Error(
			`Failed to add labels to ${issueNumber} (HTTP ${res.status}): ${await res.text()}`,
		);
	}
}

export interface GitHubIssueComment {
	author_association?: string;
	performed_via_github_app?: { id: number } | null;
	id: number;
	body: string | null;
	created_at: string;
	updated_at: string;
	user: GitHubUser | null;
}

export async function findBotComment(
	token: string,
	number: number,
	appId: number,
	marker: string,
): Promise<GitHubIssueComment | undefined> {
	let page = 1;
	while (true) {
		const response = await githubFetch(
			`https://api.github.com/repos/${REPO}/issues/${number}/comments?per_page=100&page=${page}`,
			{ headers: apiHeaders(token) },
		);
		if (!response.ok)
			throw new Error(`GitHub comments returned ${response.status}`);
		const comments = await response.json<GitHubIssueComment[]>();
		const found = comments.find(
			(comment) =>
				comment.performed_via_github_app?.id === appId &&
				comment.body?.includes(marker),
		);
		if (found) return found;
		if (!parseNextLink(response.headers.get("Link"))) return undefined;
		page++;
	}
}

export async function hasReviewReplies(
	token: string,
	number: number,
	author: string,
	since: string,
): Promise<boolean> {
	let page = 1;
	while (true) {
		const response = await githubFetch(
			`https://api.github.com/repos/${REPO}/issues/${number}/comments?per_page=100&page=${page}&since=${encodeURIComponent(since)}`,
			{ headers: apiHeaders(token) },
		);
		if (!response.ok)
			throw new Error(`GitHub replies returned ${response.status}`);
		const comments = await response.json<GitHubIssueComment[]>();
		if (
			comments.some(
				(comment) =>
					comment.user?.type !== "Bot" &&
					(comment.user?.login === author ||
						["OWNER", "MEMBER", "COLLABORATOR"].includes(
							comment.author_association ?? "",
						)),
			)
		)
			return true;
		if (!parseNextLink(response.headers.get("Link"))) return false;
		page++;
	}
}

export async function updateIssueComment(
	token: string,
	commentId: number,
	body: string,
): Promise<boolean> {
	const res = await githubFetch(
		`https://api.github.com/repos/${REPO}/issues/comments/${commentId}`,
		{
			method: "PATCH",
			headers: apiHeaders(token),
			body: JSON.stringify({ body }),
		},
	);
	if (res.status === 404) {
		await res.body?.cancel();
		return false;
	}
	if (!res.ok) {
		throw new Error(
			`Failed to update comment ${commentId} (HTTP ${res.status}): ${await res.text()}`,
		);
	}
	return true;
}

/**
 * Result of a `base...head` three-dot compare.
 *
 * `status` reflects how head relates to base (GitHub's comparison status):
 *   - "ahead"     — head is a strict forward extension of base (normal push).
 *                   `files` is exactly the new commits' diff.
 *   - "identical" — head === base (no new commits).
 *   - "behind"    — base is ahead of head.
 *   - "diverged"  — base is NOT an ancestor of head (rebase / force-push).
 *
 * When status is "diverged" the merge-base regresses to where the branch
 * originally forked, so `files` includes every upstream commit absorbed by the
 * rebase — files that are not part of the PR. Callers must not trust `files`
 * for an incremental review unless status is "ahead" or "identical".
 */
export interface CompareResult {
	files: PullRequestFile[];
	status: "ahead" | "behind" | "identical" | "diverged";
	aheadBy: number;
	behindBy: number;
}

/** Raw response shape returned by each page of /compare/{base}...{head}. */
interface ComparePageData {
	files?: PullRequestFile[];
	commits?: { sha: string; commit: { message: string } }[];
	merge_base_commit?: { sha: string };
	status?: string;
	ahead_by?: number;
	behind_by?: number;
}

/**
 * Shared pagination helper for the GitHub compare endpoint.
 * Fetches all pages of `/compare/{base}...{head}?per_page=100` and returns
 * the raw page objects. Returns null if the comparison does not exist (404).
 *
 * Both `comparePullRequestHeads` and `compareCommits` use this to avoid
 * duplicating the pagination loop, Link header parsing, and error handling.
 */
async function fetchComparePages(
	token: string,
	base: string,
	head: string,
): Promise<ComparePageData[] | null> {
	const pages: ComparePageData[] = [];
	let url: string | null =
		`https://api.github.com/repos/${REPO}/compare/${encodeRef(base)}...${encodeRef(head)}?per_page=100`;

	while (url) {
		const res: Response = await githubFetch(url, {
			headers: apiHeaders(token),
		});
		if (res.status === 404) return null;
		if (!res.ok) {
			throw new Error(
				`Failed to compare ${base}...${head} (HTTP ${res.status}): ${await res.text()}`,
			);
		}
		pages.push((await res.json()) as ComparePageData);
		url = parseNextLink(res.headers.get("Link"));
	}

	return pages;
}

export async function comparePullRequestHeads(
	token: string,
	base: string,
	head: string,
): Promise<CompareResult | null> {
	// Pages from the compare endpoint; returns null for 404.
	// Note: GitHub caps the compare files list at 300 even when paginated.
	// Callers that care about truncation should check files.length === 300.
	const pages = await fetchComparePages(token, base, head);
	if (!pages) return null;

	// Accumulate files by filename across pages (last write wins for duplicates).
	// Capture status/ahead_by/behind_by from the first page only.
	const filesByName = new Map<string, PullRequestFile>();
	let status: CompareResult["status"] | undefined;
	let aheadBy = 0;
	let behindBy = 0;

	for (const data of pages) {
		if (status === undefined) {
			status =
				data.status === "ahead" ||
				data.status === "behind" ||
				data.status === "identical"
					? data.status
					: "diverged";
			aheadBy = data.ahead_by ?? 0;
			behindBy = data.behind_by ?? 0;
		}
		for (const file of data.files ?? []) {
			filesByName.set(file.filename, file);
		}
	}

	return {
		files: [...filesByName.values()],
		status: status ?? "diverged",
		aheadBy,
		behindBy,
	};
}

export async function addReactionToComment(
	token: string,
	commentId: number,
	reaction:
		"+1" | "-1" | "laugh" | "confused" | "heart" | "hooray" | "rocket" | "eyes",
): Promise<number | null> {
	const res = await githubFetch(
		`https://api.github.com/repos/${REPO}/issues/comments/${commentId}/reactions`,
		{
			method: "POST",
			headers: apiHeaders(token),
			body: JSON.stringify({ content: reaction }),
		},
	);
	if (res.status === 422) return null; // already exists
	if (!res.ok) {
		throw new Error(
			`Failed to add reaction to comment ${commentId} (HTTP ${res.status}): ${await res.text()}`,
		);
	}
	const data = (await res.json()) as { id: number };
	return data.id;
}

/**
 * Check whether `username` is a codeowner in .github/CODEOWNERS on the
 * production branch. Always reads from the production branch so ad-hoc
 * CODEOWNERS changes on feature branches don't grant access.
 *
 * @param installationToken - GitHub App installation token (for repo contents API)
 * @param orgToken - Personal/org token with read:org scope (for team membership API)
 * @param username - GitHub username to check
 */
export async function isCodeOwner(
	installationToken: string,
	orgToken: string,
	username: string,
): Promise<boolean> {
	// Fetch CODEOWNERS from the production branch via the GitHub contents API
	const res = await githubFetch(
		`https://api.github.com/repos/${REPO}/contents/.github/CODEOWNERS?ref=production`,
		{ headers: apiHeaders(installationToken) },
	);
	if (!res.ok) return false;

	const data = (await res.json()) as { content?: string; encoding?: string };
	if (!data.content || data.encoding !== "base64") return false;

	const content = atob(data.content.replace(/\n/g, ""));

	// Extract all @mentions from non-comment lines
	const mentions = new Set<string>();
	for (const line of content.split("\n")) {
		const trimmed = line.split("#", 1)[0].trim();
		if (!trimmed || trimmed.startsWith("#")) continue;
		for (const match of trimmed
			.split(/\s+/)
			.slice(1)
			.join(" ")
			.matchAll(/@([\w.-]+\/[\w.-]+|[\w.-]+)/g)) {
			mentions.add(match[1]);
		}
	}

	for (const mention of mentions) {
		if (mention.includes("/")) {
			// Team mention: @org/team — check membership using org token (needs read:org)
			const [org, team] = mention.split("/");
			const memberRes = await githubFetch(
				`https://api.github.com/orgs/${org}/teams/${team}/memberships/${username}`,
				{ headers: apiHeaders(orgToken) },
			);
			if (
				memberRes.ok &&
				(await memberRes.json<{ state: string }>()).state === "active"
			)
				return true;
		} else {
			// Direct user mention
			if (mention.toLowerCase() === username.toLowerCase()) return true;
		}
	}

	return false;
}

// ── Rebase / Git Data API ─────────────────────────────────────────────────────

export interface UpdateBranchResult {
	ok: boolean;
	/**
	 * True when GitHub accepted the request asynchronously (202 Accepted).
	 * The caller should poll the PR's head SHA to detect when the operation
	 * has completed before relying on the branch state.
	 */
	async?: boolean;
	/** Present when ok=false (conflict or other API error message). */
	message?: string;
}

/**
 * Update a pull request's branch against its base using the GitHub API.
 * Pass update_method "rebase" to attempt a rebase rather than a merge commit.
 *
 * - 200 OK: branch was updated synchronously. { ok: true }
 * - 202 Accepted: GitHub queued the work asynchronously. { ok: true, async: true }
 *   Callers should poll the PR's head SHA before treating the branch as ready.
 * - 422: conflict or validation error. { ok: false, message }
 */
export async function updatePullRequestBranch(
	token: string,
	pullNumber: number,
	updateMethod: "merge" | "rebase",
	expectedHeadSha?: string,
): Promise<UpdateBranchResult> {
	const res = await githubFetch(
		`https://api.github.com/repos/${REPO}/pulls/${pullNumber}/update-branch`,
		{
			method: "PUT",
			headers: apiHeaders(token),
			body: JSON.stringify({
				update_method: updateMethod,
				...(expectedHeadSha ? { expected_head_sha: expectedHeadSha } : {}),
			}),
		},
	);
	if (res.status === 202) return { ok: true, async: true };
	if (res.ok) return { ok: true };
	const text = await res.text();
	let message = text;
	try {
		const json = JSON.parse(text) as { message?: string };
		if (json.message) message = json.message;
	} catch {
		// leave message as raw text
	}
	if (res.status === 422) return { ok: false, message };
	throw new Error(
		`Failed to update branch for PR #${pullNumber} (HTTP ${res.status}): ${message}`,
	);
}

/**
 * Poll until the PR's head SHA changes from `priorSha`, indicating an async
 * `update-branch` has completed. Checks immediately, then every 3 seconds, for
 * up to `timeoutMs` (default 60 s). Returns the new head SHA on success, null
 * on timeout.
 *
 * Transient errors from `getPullRequest` (rate limits, 5xx) are caught and
 * retried rather than aborting the loop, since the async operation may still
 * be in progress.
 *
 * **Limitation:** any push to the PR branch while polling (e.g. a concurrent
 * force-push by the author) will also change the head SHA and be treated as
 * completion of the async rebase. The caller must verify base ancestry after the poll; a
 * concurrent push invalidates the rebase anyway, and the subsequent
 * incremental review will run against whatever head SHA is current.
 */
export async function pollForBranchUpdate(
	token: string,
	pullNumber: number,
	priorSha: string,
	timeoutMs = 60_000,
): Promise<string | null> {
	const deadline = Date.now() + timeoutMs;
	do {
		let status = 0;
		try {
			// Inline the fetch so we can inspect the HTTP status and distinguish
			// permanent failures (401/403/404) from transient ones (429/5xx/network).
			const res = await githubFetch(
				`https://api.github.com/repos/${REPO}/pulls/${pullNumber}`,
				{ headers: apiHeaders(token) },
			);
			status = res.status;

			if (res.ok) {
				const pr = (await res.json()) as GitHubPullRequest;
				if (pr.head.sha !== priorSha) return pr.head.sha;
			} else if (status === 401 || status === 404) {
				// Permanent authentication or not-found failure — abort immediately.
				throw new Error(
					`pollForBranchUpdate: permanent failure fetching PR #${pullNumber} (HTTP ${status}): ${await res.text()}`,
				);
			} else if (status === 403) {
				// 403 can be either a permanent auth failure OR a transient rate-limit
				// (GitHub sends 403 with X-RateLimit-Remaining: 0 or a Retry-After
				// header). Distinguish by inspecting the response headers.
				const isRateLimit =
					res.headers.get("X-RateLimit-Remaining") === "0" ||
					res.headers.get("Retry-After") !== null;
				if (isRateLimit) {
					const retryAfter = res.headers.get("Retry-After");
					console.log({
						message: `pollForBranchUpdate: rate-limited (HTTP 403) for PR #${pullNumber}, retrying`,
						event: "poll_for_branch_update",
						pullNumber,
						retryAfter,
						action: "rate_limit_retry",
					});
					// Honour Retry-After if present, clamped to the remaining deadline so
					// we never sleep past the poll window. Set a flag to skip the regular
					// 3 s inter-poll sleep — Retry-After already serves that purpose.
					const retryMs = retryAfter ? parseInt(retryAfter, 10) * 1000 : 0;
					if (retryMs > 0) {
						const remaining = deadline - Date.now();
						const clampedMs = Math.min(retryMs, Math.max(0, remaining));
						if (clampedMs > 0)
							await new Promise((r) => setTimeout(r, clampedMs));
						// Skip the inter-poll sleep below — we already waited.
						if (Date.now() < deadline) continue;
					}
				} else {
					throw new Error(
						`pollForBranchUpdate: permanent failure fetching PR #${pullNumber} (HTTP 403): ${await res.text()}`,
					);
				}
			} else {
				// Transient (429, 5xx, etc.) — log and retry.
				console.log({
					message: `pollForBranchUpdate: transient HTTP ${status} for PR #${pullNumber}, retrying`,
					event: "poll_for_branch_update",
					pullNumber,
					status,
					action: "transient_error_retry",
				});
			}
		} catch (err) {
			// Only rethrow if it's the permanent-failure error we threw above,
			// or if status indicates a permanent failure. Network errors are retried.
			if (
				status === 401 ||
				status === 404 ||
				(err instanceof Error &&
					err.message.startsWith("pollForBranchUpdate: permanent"))
			) {
				throw err;
			}
			console.log({
				message: `pollForBranchUpdate: network error for PR #${pullNumber}, retrying`,
				event: "poll_for_branch_update",
				pullNumber,
				error: err instanceof Error ? err.message : String(err),
				action: "network_error_retry",
			});
		}
		if (Date.now() < deadline) {
			await new Promise((r) => setTimeout(r, 3_000));
		}
	} while (Date.now() < deadline);
	return null;
}

export interface GitRef {
	sha: string;
	ref: string;
}

export async function getRef(token: string, branch: string): Promise<GitRef> {
	const res = await githubFetch(
		`https://api.github.com/repos/${REPO}/git/refs/heads/${encodeRef(branch)}`,
		{ headers: apiHeaders(token) },
	);
	if (!res.ok) {
		throw new Error(
			`Failed to get ref heads/${branch} (HTTP ${res.status}): ${await res.text()}`,
		);
	}
	const data = (await res.json()) as { object: { sha: string }; ref: string };
	return { sha: data.object.sha, ref: data.ref };
}

export interface GitCommit {
	sha: string;
	treeSha: string;
	parentShas: string[];
	message: string;
}

export async function getGitCommit(
	token: string,
	sha: string,
): Promise<GitCommit> {
	const res = await githubFetch(
		`https://api.github.com/repos/${REPO}/git/commits/${sha}`,
		{ headers: apiHeaders(token) },
	);
	if (!res.ok) {
		throw new Error(
			`Failed to get commit ${sha} (HTTP ${res.status}): ${await res.text()}`,
		);
	}
	const data = (await res.json()) as {
		sha: string;
		tree: { sha: string };
		parents: { sha: string }[];
		message: string;
	};
	return {
		sha: data.sha,
		treeSha: data.tree.sha,
		parentShas: data.parents.map((p) => p.sha),
		message: data.message,
	};
}

export interface GitTreeEntry {
	path: string;
	mode: string;
	type: string;
	sha: string | null;
	size?: number;
}

export async function getTree(
	token: string,
	treeSha: string,
): Promise<GitTreeEntry[]> {
	const res = await githubFetch(
		`https://api.github.com/repos/${REPO}/git/trees/${treeSha}?recursive=1`,
		{ headers: apiHeaders(token) },
	);
	if (!res.ok) {
		throw new Error(
			`Failed to get tree ${treeSha} (HTTP ${res.status}): ${await res.text()}`,
		);
	}
	const data = (await res.json()) as {
		tree: GitTreeEntry[];
		truncated?: boolean;
	};
	if (data.truncated) {
		throw new Error(
			`Git tree ${treeSha} is too large and was returned truncated by the GitHub API. Cannot safely enumerate files.`,
		);
	}
	return data.tree;
}

/**
 * Create a new git blob from text content.
 * Returns the new blob SHA.
 */
export async function createBlob(
	token: string,
	content: string,
): Promise<string> {
	const res = await githubFetch(
		`https://api.github.com/repos/${REPO}/git/blobs`,
		{
			method: "POST",
			headers: apiHeaders(token),
			body: JSON.stringify({ content, encoding: "utf-8" }),
		},
	);
	if (!res.ok) {
		throw new Error(
			`Failed to create blob (HTTP ${res.status}): ${await res.text()}`,
		);
	}
	const data = (await res.json()) as { sha: string };
	return data.sha;
}

export interface TreeUpdate {
	path: string;
	/** "100644" for regular file */
	mode: "100644" | "100755" | "040000" | "160000" | "120000";
	type: "blob" | "tree" | "commit";
	/** The blob SHA, or null to delete the file */
	sha: string | null;
}

/**
 * Create a new git tree by applying updates on top of a base tree.
 * Pass sha=null in a TreeUpdate to delete that path.
 * Returns the new tree SHA.
 */
export async function createTree(
	token: string,
	baseTreeSha: string,
	updates: TreeUpdate[],
): Promise<string> {
	const res = await githubFetch(
		`https://api.github.com/repos/${REPO}/git/trees`,
		{
			method: "POST",
			headers: apiHeaders(token),
			body: JSON.stringify({ base_tree: baseTreeSha, tree: updates }),
		},
	);
	if (!res.ok) {
		throw new Error(
			`Failed to create tree (HTTP ${res.status}): ${await res.text()}`,
		);
	}
	const data = (await res.json()) as { sha: string };
	return data.sha;
}

/**
 * Create a new git commit.
 * Returns the new commit SHA.
 */
export async function createGitCommit(
	token: string,
	message: string,
	treeSha: string,
	parentShas: string[],
): Promise<string> {
	const res = await githubFetch(
		`https://api.github.com/repos/${REPO}/git/commits`,
		{
			method: "POST",
			headers: apiHeaders(token),
			body: JSON.stringify({ message, tree: treeSha, parents: parentShas }),
		},
	);
	if (!res.ok) {
		throw new Error(
			`Failed to create commit (HTTP ${res.status}): ${await res.text()}`,
		);
	}
	const data = (await res.json()) as { sha: string };
	return data.sha;
}

/**
 * Force-update a branch ref to point to a new commit SHA.
 *
 * **Pre-condition:** callers are responsible for verifying the branch's current
 * head SHA before invoking this function. Because `force: true` is always sent,
 * any commits pushed to the branch between reading its state and calling
 * `updateRef` will be silently overwritten. Fetch the current ref and compare
 * it against the expected SHA immediately before this call.
 */
export async function updateRef(
	token: string,
	branch: string,
	sha: string,
): Promise<void> {
	const res = await githubFetch(
		`https://api.github.com/repos/${REPO}/git/refs/heads/${encodeRef(branch)}`,
		{
			method: "PATCH",
			headers: apiHeaders(token),
			body: JSON.stringify({ sha, force: true }),
		},
	);
	if (!res.ok) {
		throw new Error(
			`Failed to update ref heads/${branch} to ${sha} (HTTP ${res.status}): ${await res.text()}`,
		);
	}
}

/**
 * Get the commits between a base and head ref (non-inclusive of base).
 * Used to find the commits on a PR branch since its merge base.
 */
export interface CompareCommit {
	sha: string;
	message: string;
}

export async function compareCommits(
	token: string,
	base: string,
	head: string,
): Promise<{ mergeBaseSha: string; commits: CompareCommit[] }> {
	// Uses the shared fetchComparePages helper to avoid duplicating the
	// pagination loop. compareCommits is always called with SHAs that exist
	// so 404 is treated as an error.
	const pages = await fetchComparePages(token, base, head);
	if (!pages || pages.length === 0) {
		throw new Error(
			`Failed to compare ${base}...${head}: comparison not found`,
		);
	}

	let mergeBaseSha = "";
	const commits: CompareCommit[] = [];

	for (const data of pages) {
		if (!mergeBaseSha && data.merge_base_commit?.sha) {
			mergeBaseSha = data.merge_base_commit.sha;
		}
		for (const c of data.commits ?? []) {
			commits.push({ sha: c.sha, message: c.commit.message });
		}
	}

	return { mergeBaseSha, commits };
}

export async function verifyGitHubSignature(
	body: string,
	signature: string,
	secret: string,
): Promise<boolean> {
	if (!signature.startsWith("sha256=")) return false;

	const encoder = new TextEncoder();
	const key = await crypto.subtle.importKey(
		"raw",
		encoder.encode(secret),
		{ name: "HMAC", hash: "SHA-256" },
		false,
		["sign"],
	);

	const mac = await crypto.subtle.sign("HMAC", key, encoder.encode(body));
	const expected =
		"sha256=" +
		Array.from(new Uint8Array(mac))
			.map((b) => b.toString(16).padStart(2, "0"))
			.join("");

	if (expected.length !== signature.length) return false;
	let diff = 0;
	for (let i = 0; i < expected.length; i++) {
		diff |= expected.charCodeAt(i) ^ signature.charCodeAt(i);
	}
	return diff === 0;
}
