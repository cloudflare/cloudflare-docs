/**
 * GitHub webhook parsing helpers.
 *
 * Extracts normalized fields from raw GitHub webhook payloads so that
 * orchestrate.ts reads as routing logic rather than field-extraction code.
 */

/** Extract the issue or PR number from a GitHub webhook payload. */
export function getIssueOrPullRequestNumber(
	eventType: string,
	body: Record<string, unknown>,
): number | undefined {
	if (eventType === "issues" || eventType === "issue_comment") {
		return (body.issue as Record<string, unknown> | undefined)?.number as
			| number
			| undefined;
	}
	if (eventType === "pull_request") {
		return (body.pull_request as Record<string, unknown> | undefined)
			?.number as number | undefined;
	}
}

/** Extract the issue or PR HTML URL from a GitHub webhook payload. */
export function getIssueOrPullRequestUrl(
	eventType: string,
	body: Record<string, unknown>,
	number: number | undefined,
): string | undefined {
	if (eventType === "issues") {
		return (
			((body.issue as Record<string, unknown> | undefined)?.html_url as
				| string
				| undefined) ??
			(number
				? `https://github.com/cloudflare/cloudflare-docs/issues/${number}`
				: undefined)
		);
	}
	if (eventType === "pull_request") {
		return (
			((body.pull_request as Record<string, unknown> | undefined)?.html_url as
				| string
				| undefined) ??
			(number
				? `https://github.com/cloudflare/cloudflare-docs/pull/${number}`
				: undefined)
		);
	}
}

/** Return a human-readable label for the event type ("PR", "Issue", etc.). */
export function getIssueOrPullRequestLabel(eventType: string): string {
	if (eventType === "pull_request") return "PR";
	if (eventType === "issues") return "Issue";
	if (eventType === "issue_comment") return "PR";
	return "GitHub webhook";
}

/** Extract the issue or PR title from a GitHub webhook payload. */
export function getIssueOrPullRequestTitle(
	eventType: string,
	body: Record<string, unknown>,
): string | undefined {
	if (eventType === "issues" || eventType === "issue_comment") {
		return (body.issue as Record<string, unknown> | undefined)?.title as
			| string
			| undefined;
	}
	if (eventType === "pull_request") {
		return (body.pull_request as Record<string, unknown> | undefined)?.title as
			| string
			| undefined;
	}
}

/** Truncate a string to 100 characters for log output. */
export function truncateLogValue(value: string): string {
	return value.length > 100 ? `${value.slice(0, 97)}...` : value;
}
