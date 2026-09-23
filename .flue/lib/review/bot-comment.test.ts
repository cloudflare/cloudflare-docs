import { describe, expect, it } from "vitest";
import { findBotReviewComment } from "./bot-comment";
import { BOT_COMMENT_MARKER } from "./render";

const comment = (id: number, body: string, type = "Bot") =>
	({ id, body, user: { type } }) as never;

describe("findBotReviewComment", () => {
	it("rejects quoted and non-bot markers", () => {
		expect(
			findBotReviewComment([
				comment(1, `quoted ${BOT_COMMENT_MARKER}`),
				comment(2, BOT_COMMENT_MARKER, "User"),
			]),
		).toBeUndefined();
	});
	it("prefers a valid known id, otherwise the newest valid bot comment", () => {
		const old = comment(1, BOT_COMMENT_MARKER);
		const latest = comment(2, BOT_COMMENT_MARKER);
		expect(findBotReviewComment([old, latest], 1)?.id).toBe(1);
		expect(findBotReviewComment([old, latest], 99)?.id).toBe(2);
	});
});
