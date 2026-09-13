import { describe, it, expect } from "vitest";
import { carryForwardOnFallback } from "./run-reconcile";
import type { ReconcileFinding } from "../agents/reconcile-reviewer";

function finding(id: string, path: string): ReconcileFinding {
	return {
		id,
		severity: "warning",
		path,
		rule: "test-rule",
		evidence: "test evidence",
		suggestion: "test suggestion",
	};
}

describe("carryForwardOnFallback", () => {
	it("returns only current findings when there are no previous findings", () => {
		const current = [finding("CR-1", "src/a.ts")];
		const result = carryForwardOnFallback(current, [], ["src/a.ts"]);
		expect(result).toEqual(current);
	});

	it("carries forward previous findings for files not reviewed this run", () => {
		const current = [finding("CR-1", "src/a.ts")];
		const previous = [finding("CR-2", "src/b.ts"), finding("CR-3", "src/c.ts")];
		const reviewedFiles = ["src/a.ts"];
		const result = carryForwardOnFallback(current, previous, reviewedFiles);
		expect(result).toHaveLength(3);
		expect(result.map((f) => f.id)).toEqual(["CR-1", "CR-2", "CR-3"]);
	});

	it("does not carry forward previous findings for re-reviewed files", () => {
		const current = [finding("CR-1", "src/a.ts")];
		const previous = [
			finding("CR-old-1", "src/a.ts"),
			finding("CR-2", "src/b.ts"),
		];
		const reviewedFiles = ["src/a.ts"];
		const result = carryForwardOnFallback(current, previous, reviewedFiles);
		expect(result).toHaveLength(2);
		expect(result.map((f) => f.id)).toEqual(["CR-1", "CR-2"]);
	});

	it("dedupes by id when a current finding and a carried-forward finding share an id", () => {
		const current = [finding("CR-1", "src/a.ts")];
		const previous = [finding("CR-1", "src/b.ts")];
		const reviewedFiles = ["src/a.ts"];
		const result = carryForwardOnFallback(current, previous, reviewedFiles);
		expect(result).toHaveLength(1);
		expect(result[0].path).toBe("src/a.ts");
	});

	it("returns empty when both current and previous are empty", () => {
		const result = carryForwardOnFallback([], [], []);
		expect(result).toEqual([]);
	});

	it("carries forward all previous findings when nothing was reviewed", () => {
		const previous = [finding("CR-1", "src/a.ts"), finding("CR-2", "src/b.ts")];
		const result = carryForwardOnFallback([], previous, []);
		expect(result).toEqual(previous);
	});
});
