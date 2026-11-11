import { describe, expect, it } from "vitest";
import { R2Fake } from "./testing/r2-fake";
import {
	claimActiveRun,
	commitRun,
	deleteRunArtifacts,
	emptyState,
	getRunArtifact,
	isActiveRun,
	isAutoReviewDisabled,
	loadState,
	releaseActiveRun,
	resetForFullReview,
	saveState,
	setAutoReviewDisabled,
	stateKey,
	updateState,
	putRunArtifact,
} from "./state";
import type { ActiveRun, TrackedFinding } from "./types";

const run: ActiveRun = {
	runId: "run",
	workflowInstanceId: "workflow",
	headSha: "a",
	startedAt: "now",
	agentIds: [],
};
const finding = (
	status: TrackedFinding["status"] = "active",
): TrackedFinding => ({
	id: "C-1",
	specialist: "code",
	path: "a.ts",
	line: 1,
	title: "Title",
	explanation: "Explanation",
	firstSeenSha: "a",
	lastSeenSha: "a",
	status,
});

describe("review state", () => {
	it("loads defaults and uses conditional writes", async () => {
		const fake = new R2Fake();
		const bucket = fake.asBucket();
		const first = await loadState(bucket, 1);
		expect(first.state).toEqual(emptyState(1));
		expect(await saveState(bucket, 1, first.state, null)).toBe(true);
		expect(await saveState(bucket, 1, first.state, null)).toBe(false);
		expect(stateKey(1)).toBe("reviews/v2/pr-1/state.json");
	});

	it("retries update after a conditional-write race", async () => {
		const fake = new R2Fake();
		const bucket = fake.asBucket();
		await updateState(
			bucket,
			2,
			async (state) => {
				await saveState(bucket, 2, state, null);
				return { ...state, commentId: 2 };
			},
			2,
		);
		expect((await loadState(bucket, 2)).state.commentId).toBe(2);
	});

	it("claims, commits, releases, and resets runs", () => {
		const claimed = claimActiveRun(emptyState(1), run);
		expect(isActiveRun(claimed.state, "run")).toBe(true);
		expect(
			claimActiveRun(claimed.state, { ...run, runId: "replacement" })
				.superseded,
		).toEqual(run);
		const committed = commitRun(claimed.state, {
			runId: "run",
			headSha: "b",
			completedAt: "later",
			successfulSpecialists: ["code"],
			reviewedFingerprints: { code: ["one", "one", "two"] },
			findings: [finding()],
			commentId: 8,
			commentsSeenThrough: "comment-time",
		});
		expect(committed.committed).toBe(true);
		expect(committed.state.reviewed.code).toEqual(["one", "two"]);
		expect(
			commitRun(committed.state, {
				runId: "other",
				headSha: "b",
				completedAt: "later",
				successfulSpecialists: [],
				reviewedFingerprints: {},
				findings: [],
			}).committed,
		).toBe(false);
		expect(releaseActiveRun(claimed.state, "run").activeRun).toBeUndefined();
		expect(resetForFullReview(committed.state)).toMatchObject({
			reviewed: { code: [], style: [], conventions: [] },
			findings: [finding()],
			commentId: 8,
			commentsSeenThrough: "comment-time",
			lastCompleted: { runId: "run", headSha: "b", completedAt: "later" },
		});
	});

	it("stores, deletes, and paginates run artifacts", async () => {
		const fake = new R2Fake();
		const bucket = fake.asBucket();
		await putRunArtifact(bucket, 1, "run", "one", { one: true });
		await putRunArtifact(bucket, 1, "run", "two", { two: true });
		await putRunArtifact(bucket, 1, "run", "three", { three: true });
		expect(
			await getRunArtifact<{ one: boolean }>(bucket, 1, "run", "one"),
		).toEqual({ one: true });
		await deleteRunArtifacts(bucket, 1, "run");
		expect(await getRunArtifact(bucket, 1, "run", "one")).toBeNull();
		expect(await getRunArtifact(bucket, 1, "run", "three")).toBeNull();
	});

	it("uses the legacy auto-review-disabled flag", async () => {
		const fake = new R2Fake();
		const bucket = fake.asBucket();
		await setAutoReviewDisabled(bucket, 1, true);
		expect(await isAutoReviewDisabled(bucket, 1)).toBe(true);
		await setAutoReviewDisabled(bucket, 1, false);
		expect(await isAutoReviewDisabled(bucket, 1)).toBe(false);
	});
});
