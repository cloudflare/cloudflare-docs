import { describe, expect, it } from "vitest";

import { TeamMembershipCheckError } from "./github";
import { isRetryableRecommendationError } from "./run-reviewer-recommendations";

describe("isRetryableRecommendationError", () => {
	it("always retries membership-check errors, even with a permanent-looking status", () => {
		const err = new TeamMembershipCheckError(
			"cloudflare",
			"content-engineering",
			"alice",
			401,
			"bad credentials",
		);
		expect(isRetryableRecommendationError(err)).toBe(true);
	});

	it("treats permanent GitHub 4xx failures as non-retryable", () => {
		expect(isRetryableRecommendationError(new Error("boom (HTTP 404)"))).toBe(
			false,
		);
		expect(isRetryableRecommendationError(new Error("boom (HTTP 422)"))).toBe(
			false,
		);
	});

	it("retries transient failures and rate limits", () => {
		expect(isRetryableRecommendationError(new Error("boom (HTTP 429)"))).toBe(
			true,
		);
		expect(isRetryableRecommendationError(new Error("boom (HTTP 500)"))).toBe(
			true,
		);
		expect(isRetryableRecommendationError(new Error("network reset"))).toBe(
			true,
		);
	});
});
