/**
 * Spam-and-off-topic-filter domain helpers.
 *
 * Schema, constants, and context-fetching logic used by the
 * spam-and-off-topic-filter workflow. GitHub side-effect calls (closeIssue,
 * addLabels, postComment) remain in the workflow so they're easy to audit.
 */
import * as v from "valibot";
import { getIssue, getPullRequest, getPullRequestFiles } from "./github";

// ── Schema ─────────────────────────────────────────────────────────────────────

export const SpamVerdictSchema = v.object({
	is_spam: v.boolean(),
	confidence: v.picklist(["low", "medium", "high"]),
	reason: v.string(),
});

export type SpamVerdict = v.InferOutput<typeof SpamVerdictSchema>;

// ── Comment templates ─────────────────────────────────────────────────────────

export const SPAM_COMMENT =
	"Thank you for reaching out. This issue appears to be spam or " +
	"doesn't contain actionable documentation feedback, so we're closing " +
	"it. If you have a genuine documentation " +
	"question or suggestion, please open a new issue with details.";

export const OFF_TOPIC_COMMENT =
	"Thank you for reaching out. We're closing this because it is unclear " +
	"how this issue relates to the Cloudflare developer documentation. " +
	"If you can clarify what you would like to see changed in the docs, " +
	"or how this issue relates to the docs, please open a new issue with " +
	"those details. For product support or feature requests, " +
	"please visit https://community.cloudflare.com or " +
	"https://support.cloudflare.com.";

// ── Constants ─────────────────────────────────────────────────────────────────

export const MAX_PR_FILES = 25;
export const MAX_PATCH_CHARS = 2_000;

// ── Types ─────────────────────────────────────────────────────────────────────

export interface PullRequestDiffSummary {
	truncated: boolean;
	files: Array<{
		filename: string;
		status: string;
		additions: number;
		deletions: number;
		changes: number;
		patch?: string;
		patch_truncated?: boolean;
	}>;
}

export interface SpamFilterPayload {
	eventType: "issues" | "pull_request";
	number: number;
}

// ── Context fetching ──────────────────────────────────────────────────────────

/**
 * Fetch the GitHub item (issue or PR) and optional diff summary for the
 * spam filter skill.
 */
export async function getGitHubContext(
	token: string,
	input: SpamFilterPayload,
) {
	if (input.eventType === "pull_request") {
		const pullRequest = await getPullRequest(token, input.number);
		return {
			item: {
				kind: "pull_request",
				number: pullRequest.number,
				title: pullRequest.title,
				body: pullRequest.body,
				state: pullRequest.state,
				url: pullRequest.html_url,
				user: pullRequest.user,
				author_association: pullRequest.author_association,
				draft: pullRequest.draft,
				base: pullRequest.base.ref,
				head: pullRequest.head.ref,
			},
			diff: await getPullRequestDiffSummary(token, input.number),
		};
	}

	const issue = await getIssue(token, input.number);
	return {
		item: {
			kind: "issue",
			number: issue.number,
			title: issue.title,
			body: issue.body,
			state: issue.state,
			url: issue.html_url,
			user: issue.user,
			author_association: issue.author_association,
			labels: issue.labels.map((label) => label.name),
		},
		diff: undefined,
	};
}

/**
 * Build a truncated diff summary for the spam filter — caps file count and
 * patch length to keep agent context lean.
 */
export async function getPullRequestDiffSummary(
	token: string,
	pullRequestNumber: number,
): Promise<PullRequestDiffSummary> {
	const files = await getPullRequestFiles(token, pullRequestNumber);
	return {
		truncated: files.length > MAX_PR_FILES,
		files: files.slice(0, MAX_PR_FILES).map((file) => {
			const patch = file.patch;
			return {
				filename: file.filename,
				status: file.status,
				additions: file.additions,
				deletions: file.deletions,
				changes: file.changes,
				patch: patch ? patch.slice(0, MAX_PATCH_CHARS) : undefined,
				patch_truncated: patch ? patch.length > MAX_PATCH_CHARS : undefined,
			};
		}),
	};
}
