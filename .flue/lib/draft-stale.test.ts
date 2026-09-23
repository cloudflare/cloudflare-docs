import { describe, expect, it } from "vitest";
import {
	DRAFT_STALE_REMINDER_MARKER,
	computeLastActivityAt,
	getDraftStaleAction,
	getMarkedComment,
} from "./draft-stale";
import type { GitHubIssueComment } from "./github";

const DAY_MS = 24 * 60 * 60 * 1000;
const now = new Date("2026-09-17T12:00:00.000Z");

function botComment(id: number, createdAt: string): GitHubIssueComment {
	return {
		id,
		body: null,
		created_at: createdAt,
		updated_at: createdAt,
		user: { login: "cloudflare-docs-bot[bot]", type: "Bot" },
	};
}

function humanComment(id: number, createdAt: string): GitHubIssueComment {
	return {
		id,
		body: "Still working on this.",
		created_at: createdAt,
		updated_at: createdAt,
		user: { login: "author", type: "User" },
	};
}

describe("computeLastActivityAt", () => {
	it("ignores bot comments entirely", () => {
		const pr = { updated_at: "2026-09-16T12:00:00.000Z" };
		const comments = [
			humanComment(1, "2026-09-10T12:00:00.000Z"),
			botComment(2, "2026-09-16T12:00:00.000Z"),
		];
		expect(computeLastActivityAt(pr, comments, null)).toBe(
			Date.parse("2026-09-10T12:00:00.000Z"),
		);
	});

	it("uses the newest human comment", () => {
		const pr = { updated_at: "2026-09-15T12:00:00.000Z" };
		const comments = [
			humanComment(1, "2026-09-10T12:00:00.000Z"),
			humanComment(2, "2026-09-14T12:00:00.000Z"),
			botComment(3, "2026-09-15T12:00:00.000Z"),
		];
		expect(computeLastActivityAt(pr, comments, null)).toBe(
			Date.parse("2026-09-14T12:00:00.000Z"),
		);
	});

	it("counts a push hidden behind a later bot comment", () => {
		const pr = { updated_at: "2026-09-16T12:00:00.000Z" };
		const comments = [
			humanComment(1, "2026-09-10T12:00:00.000Z"),
			botComment(2, "2026-09-16T12:00:00.000Z"),
		];
		expect(
			computeLastActivityAt(pr, comments, "2026-09-15T12:00:00.000Z"),
		).toBe(Date.parse("2026-09-15T12:00:00.000Z"));
	});

	it("counts a non-comment update no comment can explain", () => {
		const pr = { updated_at: "2026-09-14T12:00:00.000Z" };
		const comments = [botComment(1, "2026-09-14T11:00:00.000Z")];
		expect(computeLastActivityAt(pr, comments, null)).toBe(
			Date.parse("2026-09-14T12:00:00.000Z"),
		);
	});

	it("does not count an updated_at bump explained by a bot comment", () => {
		const pr = { updated_at: "2026-09-14T12:00:30.000Z" };
		const comments = [botComment(1, "2026-09-14T12:00:00.000Z")];
		expect(computeLastActivityAt(pr, comments, null)).toBe(0);
	});

	it("falls back to updated_at when there are no comments", () => {
		const pr = { updated_at: "2026-09-16T12:00:00.000Z" };
		expect(computeLastActivityAt(pr, [], null)).toBe(
			Date.parse("2026-09-16T12:00:00.000Z"),
		);
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
