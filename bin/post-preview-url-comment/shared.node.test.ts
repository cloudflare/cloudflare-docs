import { describe, expect, test } from "vitest";
import {
	GITHUB_ACTIONS_BOT_ID,
	PREVIEW_URL_REGEX,
	WORKER_PREVIEW_URL_REGEX,
} from "./constants";
import { upsertComment } from "./shared";

type Pull = Parameters<typeof upsertComment>[0];

const WFP =
	"**Preview URL:** https://e9c79bc3.preview.developers.cloudflare.com";
const WP =
	"**Worker Preview URL:** https://gh-foo.previews.developers.cloudflare.com";

function setup(comments: { id: number; body: string; userId?: number }[]) {
	const calls: { type: "update" | "create"; id?: number; body: string }[] = [];
	const pull = {
		ctx: { repo: { owner: "o", repo: "r" } },
		pull_number: 1,
		octokit: {
			rest: {
				issues: {
					listComments: async () => ({
						data: comments.map((c) => ({
							id: c.id,
							body: c.body,
							user: { id: c.userId ?? GITHUB_ACTIONS_BOT_ID },
						})),
					}),
					updateComment: async (args: { comment_id: number; body: string }) => {
						calls.push({
							type: "update",
							id: args.comment_id,
							body: args.body,
						});
					},
					createComment: async (args: { body: string }) => {
						calls.push({ type: "create", body: args.body });
					},
				},
			},
		},
	} as unknown as Pull;
	return { pull, calls };
}

describe("upsertComment", () => {
	test("updates the existing comment that has its marker", async () => {
		const { pull, calls } = setup([{ id: 10, body: WFP }]);
		await upsertComment(pull, PREVIEW_URL_REGEX, "new body");
		expect(calls).toEqual([{ type: "update", id: 10, body: "new body" }]);
	});

	test("creates a comment when none has its marker", async () => {
		const { pull, calls } = setup([{ id: 10, body: "unrelated" }]);
		await upsertComment(pull, PREVIEW_URL_REGEX, "new body");
		expect(calls).toEqual([{ type: "create", body: "new body" }]);
	});

	test("each preview kind only updates its own comment", async () => {
		const comments = [
			{ id: 10, body: WFP },
			{ id: 20, body: WP },
		];

		const wp = setup(comments);
		await upsertComment(wp.pull, WORKER_PREVIEW_URL_REGEX, "wp body");
		expect(wp.calls).toEqual([{ type: "update", id: 20, body: "wp body" }]);

		const wfp = setup(comments);
		await upsertComment(wfp.pull, PREVIEW_URL_REGEX, "wfp body");
		expect(wfp.calls).toEqual([{ type: "update", id: 10, body: "wfp body" }]);
	});

	test("creates the Worker Preview comment when only the other kind exists", async () => {
		const { pull, calls } = setup([{ id: 10, body: WFP }]);
		await upsertComment(pull, WORKER_PREVIEW_URL_REGEX, "wp body");
		expect(calls).toEqual([{ type: "create", body: "wp body" }]);
	});

	test("ignores a matching comment from another user", async () => {
		const { pull, calls } = setup([{ id: 10, body: WFP, userId: 999 }]);
		await upsertComment(pull, PREVIEW_URL_REGEX, "new body");
		expect(calls).toEqual([{ type: "create", body: "new body" }]);
	});
});
