import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	DRAFT_STALE_REMINDER_MARKER,
	collectActivitySignals,
	commitPushFallback,
	computeLastActivity,
	getDraftStaleAction,
	getDraftStaleState,
	getMarkedComment,
	latestHumanPush,
	selectOrphanStateKeys,
	type DraftActivitySignals,
} from "./draft-stale";
import {
	getCommitSummary,
	listBranchActivity,
	listIssueEvents,
	listPullRequestReviews,
	REPO,
	type GitHubBranchActivity,
	type GitHubCommitSummary,
	type GitHubIssueComment,
	type GitHubIssueEvent,
	type GitHubPullRequest,
	type GitHubPullRequestReview,
} from "./github";

vi.mock("./github", async (importOriginal) => ({
	...(await importOriginal<typeof import("./github")>()),
	listBranchActivity: vi.fn(),
	listIssueEvents: vi.fn(),
	listPullRequestReviews: vi.fn(),
	getCommitSummary: vi.fn(),
}));

const DAY_MS = 24 * 60 * 60 * 1000;
const now = new Date("2026-09-17T12:00:00.000Z");
const PR_CREATED = "2026-09-01T12:00:00.000Z";
const HUMAN = { login: "author", type: "User" };
const BOT = { login: "cloudflare-docs-bot[bot]", type: "Bot" };

function botComment(id: number, createdAt: string): GitHubIssueComment {
	return {
		id,
		body: null,
		created_at: createdAt,
		updated_at: createdAt,
		user: { ...BOT },
	};
}

function humanComment(id: number, createdAt: string): GitHubIssueComment {
	return {
		id,
		body: "Still working on this.",
		created_at: createdAt,
		updated_at: createdAt,
		user: { ...HUMAN },
	};
}

function event(
	eventType: string,
	createdAt: string,
	actor: GitHubIssueEvent["actor"] = { ...HUMAN },
): GitHubIssueEvent {
	return { id: 1, event: eventType, created_at: createdAt, actor };
}

function review(
	submittedAt: string | null,
	userType = "User",
): GitHubPullRequestReview {
	return {
		id: 1,
		body: null,
		submitted_at: submittedAt,
		user: { login: "reviewer", type: userType },
		author_association: "NONE",
	};
}

function signals(
	overrides: Partial<DraftActivitySignals> = {},
): DraftActivitySignals {
	return {
		prCreatedAt: PR_CREATED,
		comments: [],
		reviews: [],
		events: [],
		lastPushAt: null,
		...overrides,
	};
}

describe("computeLastActivity", () => {
	it("uses the creation date as the floor when nothing else exists", () => {
		expect(computeLastActivity(signals())).toEqual({
			atMs: Date.parse(PR_CREATED),
			source: "created",
		});
	});

	it("counts a human comment", () => {
		expect(
			computeLastActivity(
				signals({ comments: [humanComment(1, "2026-09-12T00:00:00.000Z")] }),
			),
		).toEqual({
			atMs: Date.parse("2026-09-12T00:00:00.000Z"),
			source: "comment",
		});
	});

	it("ignores a bot comment even when it is the newest", () => {
		expect(
			computeLastActivity(
				signals({
					comments: [
						humanComment(1, "2026-09-10T00:00:00.000Z"),
						botComment(2, "2026-09-16T00:00:00.000Z"),
					],
				}),
			),
		).toEqual({
			atMs: Date.parse("2026-09-10T00:00:00.000Z"),
			source: "comment",
		});
	});

	it("ignores updated_at on bot and human comments alike", () => {
		// Comment edits bump updated_at, and bot housekeeping edits too, so
		// edits must never look like human activity.
		const editedHuman = {
			...humanComment(1, "2026-09-10T00:00:00.000Z"),
			updated_at: "2026-09-16T00:00:00.000Z",
		};
		const editedBot = {
			...botComment(2, "2026-09-11T00:00:00.000Z"),
			updated_at: "2026-09-16T06:00:00.000Z",
		};
		expect(
			computeLastActivity(signals({ comments: [editedHuman, editedBot] })),
		).toEqual({
			atMs: Date.parse("2026-09-10T00:00:00.000Z"),
			source: "comment",
		});
	});

	it("counts a human review and ignores bot reviews and missing submitted_at", () => {
		expect(
			computeLastActivity(
				signals({
					reviews: [
						review("2026-09-13T00:00:00.000Z"),
						review("2026-09-15T00:00:00.000Z", "Bot"),
						review(null),
					],
				}),
			),
		).toEqual({
			atMs: Date.parse("2026-09-13T00:00:00.000Z"),
			source: "review",
		});
	});

	it("counts human labeled and renamed events", () => {
		expect(
			computeLastActivity(
				signals({
					events: [
						event("renamed", "2026-09-12T00:00:00.000Z"),
						event("labeled", "2026-09-14T00:00:00.000Z"),
					],
				}),
			),
		).toEqual({
			atMs: Date.parse("2026-09-14T00:00:00.000Z"),
			source: "event",
		});
	});

	it("ignores a bot labeled event", () => {
		expect(
			computeLastActivity(
				signals({
					events: [event("labeled", "2026-09-14T00:00:00.000Z", { ...BOT })],
				}),
			),
		).toEqual({ atMs: Date.parse(PR_CREATED), source: "created" });
	});

	it("ignores mentioned and subscribed events even from humans", () => {
		// Their actor is the user who was mentioned, not who caused the event.
		expect(
			computeLastActivity(
				signals({
					events: [
						event("mentioned", "2026-09-16T00:00:00.000Z"),
						event("subscribed", "2026-09-16T01:00:00.000Z"),
					],
				}),
			),
		).toEqual({ atMs: Date.parse(PR_CREATED), source: "created" });
	});

	it("counts an event with a null actor", () => {
		expect(
			computeLastActivity(
				signals({
					events: [event("labeled", "2026-09-15T00:00:00.000Z", null)],
				}),
			),
		).toEqual({
			atMs: Date.parse("2026-09-15T00:00:00.000Z"),
			source: "event",
		});
	});

	it("ignores event types outside the activity set", () => {
		expect(
			computeLastActivity(
				signals({ events: [event("locked", "2026-09-16T00:00:00.000Z")] }),
			),
		).toEqual({ atMs: Date.parse(PR_CREATED), source: "created" });
	});

	it("lets lastPushAt win with source push", () => {
		expect(
			computeLastActivity(
				signals({
					comments: [humanComment(1, "2026-09-14T00:00:00.000Z")],
					lastPushAt: "2026-09-16T00:00:00.000Z",
				}),
			),
		).toEqual({
			atMs: Date.parse("2026-09-16T00:00:00.000Z"),
			source: "push",
		});
	});

	it("ignores invalid timestamps everywhere", () => {
		expect(
			computeLastActivity(
				signals({
					comments: [{ ...humanComment(1, "not-a-timestamp") }],
					reviews: [review("nope")],
					events: [event("labeled", "still-nope")],
					lastPushAt: "garbage",
				}),
			),
		).toEqual({ atMs: Date.parse(PR_CREATED), source: "created" });
	});
});

describe("latestHumanPush", () => {
	it("finds the newest qualifying entry in unsorted input", () => {
		const activity: GitHubBranchActivity[] = [
			{
				id: 1,
				activity_type: "push",
				timestamp: "2026-09-14T00:00:00.000Z",
				actor: { ...HUMAN },
			},
			{
				id: 2,
				activity_type: "push",
				timestamp: "2026-09-16T00:00:00.000Z",
				actor: { ...HUMAN },
			},
			{
				id: 3,
				activity_type: "push",
				timestamp: "2026-09-12T00:00:00.000Z",
				actor: { ...HUMAN },
			},
		];
		expect(latestHumanPush(activity)).toBe("2026-09-16T00:00:00.000Z");
	});

	it("ignores bot actors even when their push is newest", () => {
		const activity: GitHubBranchActivity[] = [
			{
				id: 1,
				activity_type: "push",
				timestamp: "2026-09-16T00:00:00.000Z",
				actor: { ...BOT },
			},
			{
				id: 2,
				activity_type: "push",
				timestamp: "2026-09-14T00:00:00.000Z",
				actor: { ...HUMAN },
			},
		];
		expect(latestHumanPush(activity)).toBe("2026-09-14T00:00:00.000Z");
	});

	it("ignores pr_merge and branch_deletion activity", () => {
		const activity: GitHubBranchActivity[] = [
			{
				id: 1,
				activity_type: "pr_merge",
				timestamp: "2026-09-16T00:00:00.000Z",
				actor: { ...HUMAN },
			},
			{
				id: 2,
				activity_type: "branch_deletion",
				timestamp: "2026-09-15T00:00:00.000Z",
				actor: { ...HUMAN },
			},
			{
				id: 3,
				activity_type: "push",
				timestamp: "2026-09-13T00:00:00.000Z",
				actor: { ...HUMAN },
			},
		];
		expect(latestHumanPush(activity)).toBe("2026-09-13T00:00:00.000Z");
	});

	it("counts a null actor", () => {
		const activity: GitHubBranchActivity[] = [
			{
				id: 1,
				activity_type: "force_push",
				timestamp: "2026-09-16T00:00:00.000Z",
				actor: null,
			},
		];
		expect(latestHumanPush(activity)).toBe("2026-09-16T00:00:00.000Z");
	});

	it("returns null when only bot entries exist", () => {
		const activity: GitHubBranchActivity[] = [
			{
				id: 1,
				activity_type: "push",
				timestamp: "2026-09-16T00:00:00.000Z",
				actor: { ...BOT },
			},
			{
				id: 2,
				activity_type: "branch_creation",
				timestamp: "2026-09-15T00:00:00.000Z",
				actor: { ...BOT },
			},
		];
		expect(latestHumanPush(activity)).toBeNull();
	});
});

describe("commitPushFallback", () => {
	it("returns the committer date for a User author", () => {
		const commit: GitHubCommitSummary = {
			committedAt: "2026-09-16T00:00:00.000Z",
			author: { ...HUMAN },
		};
		expect(commitPushFallback(commit)).toBe("2026-09-16T00:00:00.000Z");
	});

	it("returns the committer date when the author is unknown", () => {
		const commit: GitHubCommitSummary = {
			committedAt: "2026-09-16T00:00:00.000Z",
			author: null,
		};
		expect(commitPushFallback(commit)).toBe("2026-09-16T00:00:00.000Z");
	});

	it("returns null for a Bot author", () => {
		const commit: GitHubCommitSummary = {
			committedAt: "2026-09-16T00:00:00.000Z",
			author: { ...BOT },
		};
		expect(commitPushFallback(commit)).toBeNull();
	});
});

describe("getDraftStaleAction", () => {
	it("reminds after three days without human activity", () => {
		expect(getDraftStaleAction(now.getTime() - 3 * DAY_MS, null, now)).toBe(
			"remind",
		);
	});

	it("stays quiet inside the three-day window", () => {
		expect(getDraftStaleAction(now.getTime() - 2 * DAY_MS, null, now)).toBe(
			"none",
		);
	});

	it("closes once seven days pass since the last human activity", () => {
		const state = {
			staleSince: "2026-09-10T12:00:00.000Z",
			reminderPostedAt: "2026-09-13T12:00:00.000Z",
			reminderCommentId: 1,
		};
		expect(getDraftStaleAction(Date.parse(state.staleSince), state, now)).toBe(
			"close",
		);
	});

	it("waits four days after the warning when it was already overdue", () => {
		const state = {
			staleSince: "2026-09-01T12:00:00.000Z",
			reminderPostedAt: "2026-09-17T12:00:00.000Z",
			reminderCommentId: 1,
		};
		expect(getDraftStaleAction(Date.parse(state.staleSince), state, now)).toBe(
			"none",
		);
	});

	it("closes an already overdue draft four days after its warning", () => {
		const state = {
			staleSince: "2026-09-01T12:00:00.000Z",
			reminderPostedAt: "2026-09-17T12:00:00.000Z",
			reminderCommentId: 1,
		};
		expect(
			getDraftStaleAction(
				Date.parse(state.staleSince),
				state,
				new Date("2026-09-21T12:00:00.000Z"),
			),
		).toBe("close");
	});

	it("does not reset when only bot comments landed after the reminder", () => {
		// Nightly bot comments must never restart the close timer: activity
		// stays anchored at staleSince, so the close still fires.
		const state = {
			staleSince: "2026-09-10T12:00:00.000Z",
			reminderPostedAt: "2026-09-13T12:00:00.000Z",
			reminderCommentId: 1,
		};
		expect(getDraftStaleAction(Date.parse(state.staleSince), state, now)).toBe(
			"close",
		);
	});

	it("does not reset on activity 30 seconds after the staleness anchor", () => {
		// The 60 s skew absorbs commit-timestamp drift against legacy anchors
		// stored from updated_at, which differ by about 30 s.
		const state = {
			staleSince: "2026-09-10T12:00:00.000Z",
			reminderPostedAt: "2026-09-13T12:00:00.000Z",
			reminderCommentId: 1,
		};
		expect(
			getDraftStaleAction(Date.parse(state.staleSince) + 30 * 1000, state, now),
		).toBe("close");
	});

	it("resets on activity 61 seconds after the staleness anchor", () => {
		const state = {
			staleSince: "2026-09-10T12:00:00.000Z",
			reminderPostedAt: "2026-09-13T12:00:00.000Z",
			reminderCommentId: 1,
		};
		expect(
			getDraftStaleAction(Date.parse(state.staleSince) + 61 * 1000, state, now),
		).toBe("reset");
	});

	it("resets when a human comments after the reminder", () => {
		const state = {
			staleSince: "2026-09-10T12:00:00.000Z",
			reminderPostedAt: "2026-09-13T12:00:00.000Z",
			reminderCommentId: 1,
		};
		expect(
			getDraftStaleAction(
				Date.parse(state.staleSince) + 60 * 60 * 1000,
				state,
				now,
			),
		).toBe("reset");
	});

	it("resets when a push lands after the reminder", () => {
		const state = {
			staleSince: "2026-09-10T12:00:00.000Z",
			reminderPostedAt: "2026-09-13T12:00:00.000Z",
			reminderCommentId: 1,
		};
		expect(
			getDraftStaleAction(Date.parse("2026-09-12T00:00:00.000Z"), state, now),
		).toBe("reset");
	});
});

describe("getDraftStaleState", () => {
	it("accepts legacy state with an extra botUpdatedAt field", async () => {
		const legacy = {
			staleSince: "2026-09-10T12:00:00.000Z",
			reminderPostedAt: "2026-09-13T12:00:00.000Z",
			reminderCommentId: 1,
			botUpdatedAt: "2026-09-14T12:00:00.000Z",
		};
		const bucket = {
			get: async () => ({ json: async () => legacy }),
		} as unknown as R2Bucket;
		await expect(getDraftStaleState(bucket, 7)).resolves.toEqual(legacy);
	});
});

describe("selectOrphanStateKeys", () => {
	it("selects state files whose draft is no longer open", () => {
		const keys = [
			"draft-stale/pr-1/state.json",
			"draft-stale/pr-2/state.json",
			"draft-stale/pr-3/state.json",
		];
		expect(selectOrphanStateKeys(keys, new Set([2, 3]))).toEqual([
			"draft-stale/pr-1/state.json",
		]);
	});

	it("never returns never-stale keys or unrelated keys", () => {
		const keys = [
			"draft-stale/pr-9/never-stale.json",
			"reviews/v2/pr-4/state.json",
			"draft-stale/pr-not-a-number/state.json",
			"draft-stale/pr-1/state.json.bak",
		];
		expect(selectOrphanStateKeys(keys, new Set())).toEqual([]);
	});

	it("selects never-stale-adjacent state files but never the opt-out itself", () => {
		const keys = [
			"draft-stale/pr-5/never-stale.json",
			"draft-stale/pr-5/state.json",
		];
		expect(selectOrphanStateKeys(keys, new Set())).toEqual([
			"draft-stale/pr-5/state.json",
		]);
	});
});

describe("collectActivitySignals", () => {
	beforeEach(() => {
		vi.resetAllMocks();
	});

	function sameRepoPr(): Pick<
		GitHubPullRequest,
		"number" | "created_at" | "head"
	> {
		return {
			number: 42,
			created_at: PR_CREATED,
			head: { ref: "patch-1", sha: "abc123", repo: { full_name: REPO } },
		};
	}

	function forkPr(
		repo: { full_name: string } | null,
	): Pick<GitHubPullRequest, "number" | "created_at" | "head"> {
		return {
			number: 42,
			created_at: PR_CREATED,
			head: { ref: "patch-1", sha: "abc123", repo },
		};
	}

	function emptyLists(): void {
		vi.mocked(listPullRequestReviews).mockResolvedValue([]);
		vi.mocked(listIssueEvents).mockResolvedValue([]);
	}

	it("uses branch activity for a same-repo head and never calls the commit helper", async () => {
		emptyLists();
		vi.mocked(listBranchActivity).mockResolvedValue([
			{
				id: 1,
				activity_type: "push",
				timestamp: "2026-09-15T00:00:00.000Z",
				actor: { ...HUMAN },
			},
		]);
		vi.mocked(getCommitSummary).mockRejectedValue(
			new Error("getCommitSummary must not be called"),
		);

		const signals = await collectActivitySignals("token", sameRepoPr(), []);

		expect(signals).toEqual({
			prCreatedAt: PR_CREATED,
			comments: [],
			reviews: [],
			events: [],
			lastPushAt: "2026-09-15T00:00:00.000Z",
		});
		expect(getCommitSummary).not.toHaveBeenCalled();
	});

	it("gives a null push time for bot-only branch activity without calling the commit helper", async () => {
		emptyLists();
		vi.mocked(listBranchActivity).mockResolvedValue([
			{
				id: 1,
				activity_type: "push",
				timestamp: "2026-09-16T00:00:00.000Z",
				actor: { ...BOT },
			},
		]);
		vi.mocked(getCommitSummary).mockRejectedValue(
			new Error("getCommitSummary must not be called"),
		);

		const signals = await collectActivitySignals("token", sameRepoPr(), []);

		expect(signals.lastPushAt).toBeNull();
		expect(getCommitSummary).not.toHaveBeenCalled();
	});

	it("falls back to the head commit when branch activity is empty", async () => {
		emptyLists();
		vi.mocked(listBranchActivity).mockResolvedValue([]);
		vi.mocked(getCommitSummary).mockResolvedValue({
			committedAt: "2026-09-16T00:00:00.000Z",
			author: { ...HUMAN },
		});

		const signals = await collectActivitySignals("token", sameRepoPr(), []);

		expect(signals.lastPushAt).toBe("2026-09-16T00:00:00.000Z");
		expect(getCommitSummary).toHaveBeenCalledWith("token", "abc123");
	});

	it("falls back to the head commit when branch activity throws", async () => {
		emptyLists();
		const warn = vi.spyOn(console, "warn").mockImplementation(() => {});
		vi.mocked(listBranchActivity).mockRejectedValue(new Error("boom"));
		vi.mocked(getCommitSummary).mockResolvedValue({
			committedAt: "2026-09-16T00:00:00.000Z",
			author: null,
		});

		const signals = await collectActivitySignals("token", sameRepoPr(), []);

		expect(signals.lastPushAt).toBe("2026-09-16T00:00:00.000Z");
		expect(warn).toHaveBeenCalledWith(
			expect.objectContaining({
				event: "draft_stale",
				number: 42,
				action: "branch_activity_unavailable",
			}),
		);
		warn.mockRestore();
	});

	it("uses the head commit directly for a fork head", async () => {
		emptyLists();
		vi.mocked(getCommitSummary).mockResolvedValue({
			committedAt: "2026-09-16T00:00:00.000Z",
			author: { ...HUMAN },
		});

		const signals = await collectActivitySignals(
			"token",
			forkPr({ full_name: "someone/cloudflare-docs" }),
			[],
		);

		expect(signals.lastPushAt).toBe("2026-09-16T00:00:00.000Z");
		expect(listBranchActivity).not.toHaveBeenCalled();
	});

	it("uses the head commit directly for a deleted fork", async () => {
		emptyLists();
		vi.mocked(getCommitSummary).mockResolvedValue({
			committedAt: "2026-09-16T00:00:00.000Z",
			author: { ...HUMAN },
		});

		const signals = await collectActivitySignals("token", forkPr(null), []);

		expect(signals.lastPushAt).toBe("2026-09-16T00:00:00.000Z");
		expect(listBranchActivity).not.toHaveBeenCalled();
	});

	it("gives a null push time when the commit author is a bot", async () => {
		emptyLists();
		vi.mocked(getCommitSummary).mockResolvedValue({
			committedAt: "2026-09-16T00:00:00.000Z",
			author: { login: "dependabot[bot]", type: "Bot" },
		});

		const signals = await collectActivitySignals("token", forkPr(null), []);

		expect(signals.lastPushAt).toBeNull();
	});
});

describe("draft stale comment helpers", () => {
	const reminder = {
		id: 1,
		body: DRAFT_STALE_REMINDER_MARKER,
		created_at: "2026-09-14T12:00:00.000Z",
		updated_at: "2026-09-14T12:00:00.000Z",
		user: { login: "cloudflare-docs-bot", type: "Bot" },
	};

	it("locates the latest marked comment", () => {
		const latest = { ...reminder, id: 2 };
		expect(
			getMarkedComment([reminder, latest], DRAFT_STALE_REMINDER_MARKER),
		).toBe(latest);
	});

	it("ignores marker text posted verbatim by a non-bot", () => {
		const spoofed = {
			...reminder,
			id: 2,
			body: DRAFT_STALE_REMINDER_MARKER,
			user: { login: "author", type: "User" },
		};
		expect(
			getMarkedComment([reminder, spoofed], DRAFT_STALE_REMINDER_MARKER),
		).toBe(reminder);
	});

	it("ignores quoted marker text posted by a bot", () => {
		const quoted = {
			...reminder,
			id: 2,
			body: `> ${DRAFT_STALE_REMINDER_MARKER}\n> Bot message\n\nPlease do not close.`,
		};
		expect(
			getMarkedComment([reminder, quoted], DRAFT_STALE_REMINDER_MARKER),
		).toBe(reminder);
	});
});
