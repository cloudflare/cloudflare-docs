import { describe, expect, it } from "vitest";
import {
	reviewInstanceId,
	shouldDebounce,
	startReview,
	type ReviewWorkflowParams,
} from "./start";

const params: ReviewWorkflowParams = {
	number: 12,
	headSha: "abcdef0123456789",
	trigger: "auto",
	action: "synchronize",
	fullReview: false,
};

describe("review start", () => {
	it("creates deterministic safe IDs", () => {
		expect(reviewInstanceId(params)).toBe("pr-12-abcdef012345");
		expect(
			reviewInstanceId({
				...params,
				trigger: "command",
				commentId: 44,
				fullReview: true,
			}),
		).toBe("pr-12-abcdef012345-c44-full");
		expect(
			reviewInstanceId({ ...params, headSha: "bad/value?", number: 999999999 }),
		).toMatch(/^[\w-]+$/);
	});

	it("only debounces automatic synchronize events", () => {
		expect(shouldDebounce(params)).toBe(true);
		expect(shouldDebounce({ ...params, action: "opened" })).toBe(false);
		expect(shouldDebounce({ ...params, trigger: "command" })).toBe(false);
	});

	it("handles duplicate workflow instances but rethrows other failures", async () => {
		const duplicate = {
			create: async () => {
				throw new Error("instance already exists");
			},
		} as unknown as Workflow<ReviewWorkflowParams>;
		expect(await startReview(duplicate, params)).toMatchObject({
			started: false,
			reason: "duplicate",
		});
		const failure = {
			create: async () => {
				throw new Error("unavailable");
			},
		} as unknown as Workflow<ReviewWorkflowParams>;
		await expect(startReview(failure, params)).rejects.toThrow("unavailable");
	});
});
