import { createAppAuth } from "@octokit/auth-app";

const REPO = "cloudflare/cloudflare-docs";

export interface PullRequestFile {
	filename: string;
	status: string;
	additions: number;
	deletions: number;
	changes: number;
	patch?: string;
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
	base: { ref: string; sha: string };
	head: { ref: string; sha: string };
}

export async function getInstallationToken(
	env: Record<string, string>,
): Promise<string> {
	const auth = createAppAuth({
		appId: env.DOCS_FLUE_GITHUB_APP_ID,
		privateKey: env.DOCS_FLUE_GITHUB_APP_PRIVATE_KEY,
		installationId: Number(env.DOCS_FLUE_GITHUB_INSTALLATION_ID),
	});

	const { token } = await auth({ type: "installation" });
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

export async function closeIssue(
	token: string,
	issueNumber: number,
): Promise<void> {
	const res = await fetch(
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
): Promise<void> {
	const res = await fetch(
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
}

export async function getIssue(
	token: string,
	issueNumber: number,
): Promise<GitHubIssue> {
	const res = await fetch(
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
	const res = await fetch(
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

export async function getPullRequestFiles(
	token: string,
	pullNumber: number,
): Promise<PullRequestFile[]> {
	const res = await fetch(
		`https://api.github.com/repos/${REPO}/pulls/${pullNumber}/files?per_page=100`,
		{
			headers: apiHeaders(token),
		},
	);
	if (!res.ok) {
		throw new Error(
			`Failed to get PR files for ${pullNumber} (HTTP ${res.status}): ${await res.text()}`,
		);
	}
	return (await res.json()) as PullRequestFile[];
}

export async function addLabels(
	token: string,
	issueNumber: number,
	labels: string[],
): Promise<void> {
	const res = await fetch(
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
	id: number;
	body: string | null;
	created_at: string;
	updated_at: string;
	user: GitHubUser | null;
}

export async function getIssueComments(
	token: string,
	issueNumber: number,
): Promise<GitHubIssueComment[]> {
	// Fetch newest comments first so recent human replies aren't missed on
	// busy PRs that exceed the 100-comment page limit.
	const res = await fetch(
		`https://api.github.com/repos/${REPO}/issues/${issueNumber}/comments?per_page=100&direction=desc`,
		{ headers: apiHeaders(token) },
	);
	if (!res.ok) {
		throw new Error(
			`Failed to get comments for ${issueNumber} (HTTP ${res.status}): ${await res.text()}`,
		);
	}
	// Reverse so callers get oldest-first order (consistent with previous behavior
	// and safe for findLast() / botComment detection).
	const comments = (await res.json()) as GitHubIssueComment[];
	return comments.reverse();
}

export async function updateIssueComment(
	token: string,
	commentId: number,
	body: string,
): Promise<void> {
	const res = await fetch(
		`https://api.github.com/repos/${REPO}/issues/comments/${commentId}`,
		{
			method: "PATCH",
			headers: apiHeaders(token),
			body: JSON.stringify({ body }),
		},
	);
	if (!res.ok) {
		throw new Error(
			`Failed to update comment ${commentId} (HTTP ${res.status}): ${await res.text()}`,
		);
	}
}

export async function comparePullRequestHeads(
	token: string,
	base: string,
	head: string,
): Promise<{ files: PullRequestFile[] } | null> {
	const res = await fetch(
		`https://api.github.com/repos/${REPO}/compare/${base}...${head}`,
		{ headers: apiHeaders(token) },
	);
	if (res.status === 404) return null;
	if (!res.ok) {
		throw new Error(
			`Failed to compare ${base}...${head} (HTTP ${res.status}): ${await res.text()}`,
		);
	}
	const data = (await res.json()) as { files?: PullRequestFile[] };
	return { files: data.files ?? [] };
}

export async function addReactionToComment(
	token: string,
	commentId: number,
	reaction:
		| "+1"
		| "-1"
		| "laugh"
		| "confused"
		| "heart"
		| "hooray"
		| "rocket"
		| "eyes",
): Promise<number | null> {
	const res = await fetch(
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

export async function removeReactionFromComment(
	token: string,
	commentId: number,
	reactionId: number,
): Promise<void> {
	const res = await fetch(
		`https://api.github.com/repos/${REPO}/issues/comments/${commentId}/reactions/${reactionId}`,
		{
			method: "DELETE",
			headers: apiHeaders(token),
		},
	);
	// 204 = success, 404 = already gone — both are fine
	if (!res.ok && res.status !== 404) {
		throw new Error(
			`Failed to remove reaction ${reactionId} from comment ${commentId} (HTTP ${res.status}): ${await res.text()}`,
		);
	}
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
	const res = await fetch(
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
		const trimmed = line.trim();
		if (!trimmed || trimmed.startsWith("#")) continue;
		for (const match of trimmed.matchAll(/@([\w.-]+\/[\w.-]+|[\w.-]+)/g)) {
			mentions.add(match[1]);
		}
	}

	for (const mention of mentions) {
		if (mention.includes("/")) {
			// Team mention: @org/team — check membership using org token (needs read:org)
			const [org, team] = mention.split("/");
			const memberRes = await fetch(
				`https://api.github.com/orgs/${org}/teams/${team}/memberships/${username}`,
				{ headers: apiHeaders(orgToken) },
			);
			if (memberRes.ok) return true;
		} else {
			// Direct user mention
			if (mention.toLowerCase() === username.toLowerCase()) return true;
		}
	}

	return false;
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
