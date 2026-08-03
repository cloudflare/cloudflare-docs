/**
 * Pure GitHub-webhook classification.
 *
 * Extracted from the 0.11 `orchestrate` workflow so the routing decision is a
 * plain, unit-testable function with no transport, no GitHub API calls, and no
 * bindings. `app.ts` verifies the HMAC, calls `classifyWebhook`, and acts on
 * the result (dispatching the durable orchestrator or handling a codeowner
 * command). Codeowner authorization and any GitHub/R2 side effects stay in the
 * caller — this function only reads the payload.
 */
import {
	getIssueOrPullRequestNumber,
	getIssueOrPullRequestTitle,
} from "./github-webhook";

/** Codeowner-only slash commands, commented on a PR. */
export type WebhookCommand =
	| "review"
	| "full-review"
	| "ignore-review-limit"
	| "disable-auto-review"
	| "rebase";

export interface WebhookClassification {
	eventType: string;
	action: string | undefined;
	number: number | undefined;
	title: string | undefined;
	senderLogin: string | undefined;
	/** PR author login from a `pull_request` payload (Dependabot detection). */
	prAuthorLogin: string | undefined;
	isDependabotPr: boolean;
	/** Dependabot PR event that should route to the Dependabot review path. */
	isDependabotReviewEvent: boolean;
	/** Non-Dependabot issue/PR event that should run the spam/off-topic gate. */
	isSpamFilterEvent: boolean;
	/** Non-Dependabot PR event that should run code review (after the gate). */
	isCodeReviewEvent: boolean;
	/** Whether the PR is a draft (code review is suppressed unless ready_for_review). */
	isDraft: boolean;
	/** Codeowner slash command, if the event is an actionable PR comment. */
	command: WebhookCommand | null;
	/** Comment id for a slash-command event (for reactions). */
	commentId: number | undefined;
	/** PR author login read from an `issue_comment` payload (`issue.user.login`). */
	commentPrAuthorLogin: string | undefined;
}

const PR_REVIEW_ACTIONS = [
	"opened",
	"reopened",
	"synchronize",
	"ready_for_review",
];

function asRecord(value: unknown): Record<string, unknown> | undefined {
	return typeof value === "object" && value !== null
		? (value as Record<string, unknown>)
		: undefined;
}

function commandFromComment(
	comment: string | undefined,
): WebhookCommand | null {
	switch (comment?.trim()) {
		case "/full-review":
			return "full-review";
		case "/review":
			return "review";
		case "/ignore-review-limit":
			return "ignore-review-limit";
		case "/disable-auto-review":
			return "disable-auto-review";
		case "/rebase":
			return "rebase";
		default:
			return null;
	}
}

/** Classify a GitHub webhook payload into the pipeline routing decision. */
export function classifyWebhook(
	eventType: string,
	body: Record<string, unknown>,
): WebhookClassification {
	const action = body.action as string | undefined;
	const number = getIssueOrPullRequestNumber(eventType, body);
	const title = getIssueOrPullRequestTitle(eventType, body);
	const senderLogin = asRecord(body.sender)?.login as string | undefined;

	const pullRequest = asRecord(body.pull_request);
	const prAuthorLogin = asRecord(pullRequest?.user)?.login as
		| string
		| undefined;
	const isDependabotPr =
		eventType === "pull_request" && prAuthorLogin === "dependabot[bot]";

	const isPrReviewAction =
		action !== undefined && PR_REVIEW_ACTIONS.includes(action);

	const isSpamFilterEvent =
		!isDependabotPr &&
		(eventType === "issues" || eventType === "pull_request") &&
		(["opened", "reopened", "synchronize"].includes(action ?? "") ||
			(eventType === "pull_request" && action === "ready_for_review"));

	const isCodeReviewEvent =
		!isDependabotPr && eventType === "pull_request" && isPrReviewAction;

	const isDependabotReviewEvent = isDependabotPr && isPrReviewAction;

	const isDraft = pullRequest?.draft === true;

	// Slash commands: issue_comment created on a PR.
	const issue = asRecord(body.issue);
	const isOnPullRequest =
		eventType === "issue_comment" &&
		action === "created" &&
		issue?.pull_request !== undefined;
	const commentBody = asRecord(body.comment)?.body as string | undefined;
	const command = isOnPullRequest ? commandFromComment(commentBody) : null;
	const commentId = asRecord(body.comment)?.id as number | undefined;
	const commentPrAuthorLogin = asRecord(issue?.user)?.login as
		| string
		| undefined;

	return {
		eventType,
		action,
		number,
		title,
		senderLogin,
		prAuthorLogin,
		isDependabotPr,
		isDependabotReviewEvent,
		isSpamFilterEvent,
		isCodeReviewEvent,
		isDraft,
		command,
		commentId,
		commentPrAuthorLogin,
	};
}

/** Whether any pipeline should run for this classification. */
export function isActionable(c: WebhookClassification): boolean {
	if (c.number === undefined) return false;
	return (
		c.isDependabotReviewEvent ||
		c.isSpamFilterEvent ||
		c.isCodeReviewEvent ||
		c.command !== null
	);
}
