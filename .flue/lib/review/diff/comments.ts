import type { EligibleComment } from "../types";

export interface RawComment {
	id: number;
	kind?: EligibleComment["kind"];
	body?: string | null;
	created_at?: string;
	submitted_at?: string;
	user?: { login?: string; type?: string } | null;
	author_association?: string;
	path?: string;
	line?: number;
}

export interface RawCommentLists {
	issues?: RawComment[];
	reviews?: RawComment[];
	reviewComments?: RawComment[];
}

const MAINTAINER_ROLES = new Set(["OWNER", "MEMBER", "COLLABORATOR"]);

function timestamp(comment: RawComment): string | undefined {
	return comment.created_at ?? comment.submitted_at;
}

/** Select the recent human comments that can provide dismissal evidence. */
export function eligibleComments(
	raw: RawComment[] | RawCommentLists,
	prAuthor: string,
	botLogin: string,
	since?: string,
	maxChars = 30_000,
): EligibleComment[] {
	let remaining = maxChars;
	const comments = Array.isArray(raw)
		? raw
		: [
				...(raw.issues ?? []).map((comment) => ({
					...comment,
					kind: "issue" as const,
				})),
				...(raw.reviews ?? []).map((comment) => ({
					...comment,
					kind: "review" as const,
				})),
				...(raw.reviewComments ?? []).map((comment) => ({
					...comment,
					kind: "review_comment" as const,
				})),
			];
	return comments
		.filter((comment) => {
			const login = comment.user?.login;
			const createdAt = timestamp(comment);
			return (
				!!login &&
				!!createdAt &&
				!!comment.body?.trim() &&
				login !== botLogin &&
				!login.endsWith("[bot]") &&
				comment.user?.type !== "Bot" &&
				(!since || createdAt > since) &&
				(login === prAuthor ||
					MAINTAINER_ROLES.has(comment.author_association ?? ""))
			);
		})
		.sort((left, right) => timestamp(right)!.localeCompare(timestamp(left)!))
		.flatMap((comment) => {
			const body = comment.body ?? "";
			if (body.length > remaining) return [];
			remaining -= body.length;
			return [
				{
					id: comment.id,
					kind: comment.kind ?? (comment.path ? "review_comment" : "issue"),
					author: comment.user!.login!,
					role: comment.user!.login === prAuthor ? "author" : "maintainer",
					createdAt: timestamp(comment)!,
					body,
					path: comment.path,
					line: comment.line,
				} satisfies EligibleComment,
			];
		});
}
