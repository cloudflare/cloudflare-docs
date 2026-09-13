/**
 * GitHub webhook parsing helpers.
 *
 * Extracts normalized fields from raw GitHub webhook payloads so that
 * webhook-classify.ts reads as routing logic rather than field-extraction code.
 */

/** Extract the issue or PR number from a GitHub webhook payload. */
export function getIssueOrPullRequestNumber(
	eventType: string,
	body: Record<string, unknown>,
): number | undefined {
	if (eventType === "issues" || eventType === "issue_comment") {
		return (body.issue as Record<string, unknown> | undefined)?.number as
			number | undefined;
	}
	if (eventType === "pull_request") {
		return (body.pull_request as Record<string, unknown> | undefined)
			?.number as number | undefined;
	}
}

/** Extract the issue or PR title from a GitHub webhook payload. */
export function getIssueOrPullRequestTitle(
	eventType: string,
	body: Record<string, unknown>,
): string | undefined {
	if (eventType === "issues" || eventType === "issue_comment") {
		return (body.issue as Record<string, unknown> | undefined)?.title as
			string | undefined;
	}
	if (eventType === "pull_request") {
		return (body.pull_request as Record<string, unknown> | undefined)?.title as
			string | undefined;
	}
}

/** Truncate a string to 100 characters for log output. */
