import { describe, expect, it } from "vitest";
import type { Finding, TrackedFinding } from "./types";
import { selectJudgeWork } from "./pipeline";

const finding = (id: string, overrides: Partial<Finding> = {}): Finding => ({
	id,
	specialist: "code",
	path: "src/example.ts",
	line: 10,
	title: "Unhandled promise",
	explanation: "Await this promise.",
	firstSeenSha: "new",
	lastSeenSha: "new",
	...overrides,
});
const prior = (id = "C-prior", overrides: Partial<TrackedFinding> = {}) =>
	({
		...finding(id, { firstSeenSha: "old", lastSeenSha: "old" }),
		status: "active",
		...overrides,
	}) satisfies TrackedFinding;
const work = (touched: TrackedFinding[], newFindings: Finding[]) =>
	selectJudgeWork({
		prior: touched,
		relocated: { untouched: [], touched },
		newFindings,
		newComments: [],
		maxTouched: 10,
		failedSpecialists: [],
	});

describe("selectJudgeWork re-raises", () => {
	it("absorbs a touched prior finding with the same location and title", () => {
		const result = work(
			[prior()],
			[
				finding("C-new", {
					explanation: "Updated explanation.",
					fingerprint: "new-fingerprint",
				}),
			],
		);
		expect(result.newFindings).toEqual([]);
		expect(result.touched).toEqual([]);
		expect(result.carried).toEqual([
			expect.objectContaining({
				id: "C-prior",
				firstSeenSha: "old",
				explanation: "Updated explanation.",
				fingerprint: "new-fingerprint",
			}),
		]);
	});

	it.each([
		["title", finding("C-new", { title: "Different issue" })],
		["line", finding("C-new", { line: 11 })],
		["specialist", finding("S-new", { specialist: "style" })],
	])("does not absorb a different %s", (_name, fresh) => {
		const result = work([prior()], [fresh]);
		expect(result.newFindings).toEqual([fresh]);
		expect(result.touched).toEqual([
			expect.objectContaining({ id: "C-prior" }),
		]);
	});

	it("absorbs at most one new finding per prior", () => {
		const result = work([prior()], [finding("C-new-1"), finding("C-new-2")]);
		expect(result.carried).toHaveLength(1);
		expect(result.newFindings).toEqual([
			expect.objectContaining({ id: "C-new-2" }),
		]);
	});

	it("does not match dismissed priors", () => {
		const dismissed = prior("C-dismissed", { status: "dismissed" });
		const result = selectJudgeWork({
			prior: [dismissed],
			relocated: { untouched: [], touched: [dismissed] },
			newFindings: [finding("C-new")],
			newComments: [],
			maxTouched: 10,
			failedSpecialists: [],
		});
		expect(result.newFindings).toEqual([
			expect.objectContaining({ id: "C-new" }),
		]);
	});
});
