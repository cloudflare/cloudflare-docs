import { describe, expect, it } from "vitest";
import {
	getChangelogDate,
	isUtcChangelogTimestamp,
	validateChangelogDate,
} from "./validate-changelog-dates";

describe("changelog date validation", () => {
	it("accepts a valid UTC timestamp", () => {
		const content = `---
title: Example
date: 2026-10-14T17:42:00Z
---
`;

		expect(getChangelogDate(content)).toBe("2026-10-14T17:42:00Z");
		expect(validateChangelogDate(content)).toBeNull();
	});

	it.each([
		"2026-10-14",
		"2026-10-14T17:42:00",
		"2026-10-14T17:42:00-04:00",
		"2026-10-14T17:42:00.000Z",
		"2026-02-30T17:42:00Z",
	])("rejects %s", (date) => {
		expect(isUtcChangelogTimestamp(date)).toBe(false);
	});

	it("reports a missing date", () => {
		const error = validateChangelogDate("---\ntitle: Example\n---\n");

		expect(error).toContain("received undefined");
	});
});
