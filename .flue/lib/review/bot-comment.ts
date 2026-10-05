import type { GitHubIssueComment } from "../github";
import { BOT_COMMENT_MARKER } from "./render";

/** Locate only the bot-owned singleton review comment, never a quoted marker. */
export function findBotReviewComment(
	comments: GitHubIssueComment[],
	knownId?: number,
): GitHubIssueComment | undefined {
	const valid = (comment: GitHubIssueComment) =>
		comment.user?.type === "Bot" &&
		comment.body?.startsWith(BOT_COMMENT_MARKER);
	const known = knownId
		? comments.find((comment) => comment.id === knownId)
		: undefined;
	if (known && valid(known)) return known;
	return [...comments].reverse().find(valid);
}
