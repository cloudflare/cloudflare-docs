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
	base: { ref: string };
	head: { ref: string };
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
