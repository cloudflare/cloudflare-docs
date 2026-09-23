import { describe, expect, it, vi } from "vitest";

import { TeamMembershipCheckError } from "./github";
import { emptyResult } from "./reviewer-recommendations";
import {
	findRecommendationComment,
	isRetryableRecommendationError,
	parseRecommendationState,
} from "./run-reviewer-recommendations";

const github = vi.hoisted(() => ({ getIssueComments: vi.fn() }));
vi.mock("./github", async (importOriginal) => ({
	...(await importOriginal<typeof import("./github")>()),
	getIssueComments: github.getIssueComments,
}));

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

describe("parseRecommendationState", () => {
	const state = {
		eventAt: "2026-09-16T12:00:00.000Z",
		headSha: null,
		recommendation: null,
		lastGoodRecommendation: null,
	};

	it("accepts a valid durable state", () => {
		expect(parseRecommendationState(state)).toEqual(state);
	});

	it("rejects corrupt recommendation projections", () => {
		expect(
			parseRecommendationState({ ...state, recommendation: "corrupt" }),
		).toBeNull();
		expect(
			parseRecommendationState({
				...state,
				recommendation: { ...emptyResult(), ownershipAreas: "corrupt" },
			}),
		).toBeNull();
	});
});

describe("findRecommendationComment", () => {
	const marker = "<!-- cloudflare-docs-flue-reviewer-recommendations -->";
	it("ignores spoofed recorded ids and scans for the newest valid bot marker", async () => {
		const valid = { id: 2, body: `${marker}\nvalid`, user: { type: "Bot" } };
		github.getIssueComments.mockResolvedValue([
			{ id: 1, body: marker, user: { type: "User" } },
			valid,
			{ id: 3, body: `quoted ${marker}`, user: { type: "Bot" } },
		]);
		expect(await findRecommendationComment("token", 1, 1)).toBe(valid);
	});
	it("uses a valid recorded id", async () => {
		const recorded = { id: 1, body: `${marker}\nvalid`, user: { type: "Bot" } };
		github.getIssueComments.mockResolvedValue([recorded]);
		expect(await findRecommendationComment("token", 1, 1)).toBe(recorded);
	});
});
