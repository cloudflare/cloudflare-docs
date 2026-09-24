import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	BOT_COMMENT_MARKER,
	findExistingBotComment,
} from "./dependabot-review";

const github = vi.hoisted(() => ({ getIssueComments: vi.fn() }));
vi.mock("./github", () => github);

describe("findExistingBotComment", () => {
	beforeEach(() => vi.clearAllMocks());
	it("selects the newest valid bot comment", async () => {
		const first = {
			id: 1,
			body: `${BOT_COMMENT_MARKER}\nfirst`,
			user: { type: "Bot" },
		};
		const latest = {
			id: 2,
			body: `${BOT_COMMENT_MARKER}\nlatest`,
			user: { type: "Bot" },
		};
		github.getIssueComments.mockResolvedValue([first, latest]);
		expect(await findExistingBotComment("token", 1)).toBe(latest);
	});
	it("ignores human spoofing and quoted bot markers", async () => {
		const valid = {
			id: 1,
			body: `${BOT_COMMENT_MARKER}\nvalid`,
			user: { type: "Bot" },
		};
		github.getIssueComments.mockResolvedValue([
			valid,
			{ id: 2, body: BOT_COMMENT_MARKER, user: { type: "User" } },
			{ id: 3, body: `> ${BOT_COMMENT_MARKER}`, user: { type: "Bot" } },
		]);
		expect(await findExistingBotComment("token", 1)).toBe(valid);
	});
});
