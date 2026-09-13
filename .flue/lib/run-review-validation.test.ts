import { describe, expect, it } from "vitest";
import { applyValidationDecisions } from "./run-review-validation";
import type { ReconcileFinding } from "../agents/reconcile-reviewer";

function finding(id: string): ReconcileFinding {
	return {
		id,
		severity: "warning",
		path: "src/example.ts",
		line: 10,
		rule: "Test rule",
		evidence: "Test evidence",
		suggestion: "Test suggestion",
	};
}

describe("applyValidationDecisions", () => {
	it("keeps all findings when decisions are empty", () => {
		const findings = [finding("CR-1"), finding("CR-2")];
		const result = applyValidationDecisions(findings, []);
		expect(result).toHaveLength(2);
	});

	it("removes findings marked invalid", () => {
		const findings = [finding("CR-1"), finding("CR-2"), finding("CR-3")];
		const result = applyValidationDecisions(findings, [
			{ id: "CR-1", verdict: "valid", reason: "ok" },
			{ id: "CR-2", verdict: "invalid", reason: "false positive" },
			{ id: "CR-3", verdict: "valid", reason: "ok" },
		]);
		expect(result).toHaveLength(2);
		expect(result.map((f) => f.id)).toEqual(["CR-1", "CR-3"]);
	});

	it("keeps findings with no decision (fail-open)", () => {
		const findings = [finding("CR-1"), finding("CR-2")];
		const result = applyValidationDecisions(findings, [
			{ id: "CR-1", verdict: "valid", reason: "ok" },
		]);
		expect(result).toHaveLength(2);
	});

	it("keeps findings marked valid", () => {
		const findings = [finding("CR-1"), finding("CR-2")];
		const result = applyValidationDecisions(findings, [
			{ id: "CR-1", verdict: "valid", reason: "ok" },
			{ id: "CR-2", verdict: "valid", reason: "ok" },
		]);
		expect(result).toHaveLength(2);
	});

	it("prefers valid over invalid for duplicate decisions", () => {
		const findings = [finding("CR-1")];
		const result = applyValidationDecisions(findings, [
			{ id: "CR-1", verdict: "invalid", reason: "false positive" },
			{ id: "CR-1", verdict: "valid", reason: "actually correct" },
		]);
		expect(result).toHaveLength(1);
	});

	it("ignores decisions for unknown finding ids", () => {
		const findings = [finding("CR-1")];
		const result = applyValidationDecisions(findings, [
			{ id: "CR-999", verdict: "invalid", reason: "unknown" },
		]);
		expect(result).toHaveLength(1);
	});

	it("removes all findings when all are invalid", () => {
		const findings = [finding("CR-1"), finding("CR-2")];
		const result = applyValidationDecisions(findings, [
			{ id: "CR-1", verdict: "invalid", reason: "fp" },
			{ id: "CR-2", verdict: "invalid", reason: "fp" },
		]);
		expect(result).toHaveLength(0);
	});

	it("handles empty findings array", () => {
		const result = applyValidationDecisions(
			[],
			[{ id: "CR-1", verdict: "invalid", reason: "fp" }],
		);
		expect(result).toHaveLength(0);
	});
});
