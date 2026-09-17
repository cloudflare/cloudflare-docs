import { describe, expect, it } from "vitest";
import { getDraftStaleAction } from "./draft-stale";

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
