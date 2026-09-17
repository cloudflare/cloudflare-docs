import { describe, expect, it } from "vitest";
import {
	DRAFT_STALE_REMINDER_MARKER,
	getDraftStaleAction,
	getMarkedComment,
	hasActivityAfterComment,
} from "./draft-stale";

const now = new Date("2026-09-17T12:00:00.000Z");

describe("getDraftStaleAction", () => {
	it("reminds after three days of inactivity", () => {
		expect(
			getDraftStaleAction(
				{ updated_at: "2026-09-14T12:00:00.000Z" },
				null,
				now,
			),
		).toBe("remind");
	});

	it("warns first when a draft is already more than seven days stale", () => {
		expect(
			getDraftStaleAction(
				{ updated_at: "2026-09-01T12:00:00.000Z" },
				null,
				now,
			),
		).toBe("remind");
	});

	it("waits four days after the warning when it was already overdue", () => {
		expect(
			getDraftStaleAction(
				{ updated_at: "2026-09-17T12:00:00.000Z" },
				{
					staleSince: "2026-09-01T12:00:00.000Z",
					reminderPostedAt: "2026-09-17T12:00:00.000Z",
					botUpdatedAt: "2026-09-17T12:00:00.000Z",
					reminderCommentId: 1,
				},
				now,
			),
		).toBe("none");
	});

	it("closes an already overdue draft four days after its warning", () => {
		expect(
			getDraftStaleAction(
				{ updated_at: "2026-09-17T12:00:00.000Z" },
				{
					staleSince: "2026-09-01T12:00:00.000Z",
					reminderPostedAt: "2026-09-17T12:00:00.000Z",
					botUpdatedAt: "2026-09-17T12:00:00.000Z",
					reminderCommentId: 1,
				},
				new Date("2026-09-21T12:00:00.000Z"),
			),
		).toBe("close");
	});

	it("closes after the normal seven-day stale period", () => {
		expect(
			getDraftStaleAction(
				{ updated_at: "2026-09-13T12:00:00.000Z" },
				{
					staleSince: "2026-09-10T12:00:00.000Z",
					reminderPostedAt: "2026-09-13T12:00:00.000Z",
					botUpdatedAt: "2026-09-13T12:00:00.000Z",
					reminderCommentId: 1,
				},
				now,
			),
		).toBe("close");
	});

	it("resets when activity follows the reminder", () => {
		expect(
			getDraftStaleAction(
				{ updated_at: "2026-09-14T12:00:01.000Z" },
				{
					staleSince: "2026-09-10T12:00:00.000Z",
					reminderPostedAt: "2026-09-13T12:00:00.000Z",
					botUpdatedAt: "2026-09-13T12:00:00.000Z",
					reminderCommentId: 1,
				},
				now,
			),
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

	it("tolerates the bot's own updated_at timestamp skew", () => {
		expect(
			hasActivityAfterComment(
				{ updated_at: "2026-09-14T12:00:30.000Z" },
				[reminder],
				reminder,
			),
		).toBe(false);
	});

	it("detects a human comment after the reminder", () => {
		expect(
			hasActivityAfterComment(
				{ updated_at: "2026-09-14T12:00:30.000Z" },
				[
					reminder,
					{
						...reminder,
						id: 2,
						body: "I am still working on this.",
						created_at: "2026-09-14T12:00:31.000Z",
						user: { login: "author", type: "User" },
					},
				],
				reminder,
			),
		).toBe(true);
	});

	it("detects a later PR update outside the bot timestamp skew", () => {
		expect(
			hasActivityAfterComment(
				{ updated_at: "2026-09-14T12:01:01.000Z" },
				[reminder],
				reminder,
			),
		).toBe(true);
	});
});
