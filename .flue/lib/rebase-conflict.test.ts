import { describe, it, expect } from "vitest";
import {
	isDeleteModifyConflict,
	finalizeResolution,
	type ResolvedConflicts,
	type ConflictFileForAgent,
} from "./rebase-conflict";

function conflictFile(
	path: string,
	overrides: Partial<ConflictFileForAgent> = {},
): ConflictFileForAgent {
	return {
		path,
		writePath: path,
		baseVersion: "base content",
		prVersion: "pr content",
		productionVersion: "prod content",
		...overrides,
	};
}

describe("delete/modify conflict detection", () => {
	it("detects production deleted, PR modified", () => {
		const f = conflictFile("src/a.ts", { productionVersion: null });
		expect(isDeleteModifyConflict(f)).toBe(true);
	});

	it("detects PR deleted, production modified", () => {
		const f = conflictFile("src/a.ts", { prVersion: null });
		expect(isDeleteModifyConflict(f)).toBe(true);
	});

	it("does not flag a normal modify/modify conflict", () => {
		const f = conflictFile("src/a.ts");
		expect(isDeleteModifyConflict(f)).toBe(false);
	});

	it("does not flag add/add (no base version)", () => {
		const f = conflictFile("src/new.ts", { baseVersion: null });
		expect(isDeleteModifyConflict(f)).toBe(false);
	});

	it("does not flag add/modify (no base, one side null)", () => {
		const f = conflictFile("src/new.ts", {
			baseVersion: null,
			productionVersion: null,
		});
		expect(isDeleteModifyConflict(f)).toBe(false);
	});

	it("does not flag when both sides deleted (null pr and prod, non-null base)", () => {
		const f = conflictFile("src/a.ts", {
			prVersion: null,
			productionVersion: null,
		});
		// Both sides deleted — not a modify/delete conflict.
		expect(isDeleteModifyConflict(f)).toBe(false);
	});
});

describe("resolution completeness and path guards", () => {
	const prepared: ResolvedConflicts = {
		confidence: "low",
		reason: "",
		files: [],
		allPrFiles: [],
		conflictCandidateSet: new Set(["old.ts"]),
		conflictWritePathMap: new Map([["old.ts", "renamed.ts"]]),
		mergeBaseSha: "base",
		productionRefSha: "production",
	};
	it("downgrades omitted files", () => {
		expect(
			finalizeResolution(prepared, {
				confidence: "high",
				reason: "",
				files: [],
			}).confidence,
		).toBe("medium");
	});
	it("accepts the explicit rename destination", () => {
		expect(
			finalizeResolution(prepared, {
				confidence: "high",
				reason: "",
				files: [{ path: "renamed.ts", content: "merged" }],
			}).confidence,
		).toBe("high");
	});
	it("rejects unexpected write paths", () => {
		expect(
			finalizeResolution(prepared, {
				confidence: "high",
				reason: "",
				files: [{ path: ".github/workflows/injected.yml", content: "bad" }],
			}).confidence,
		).toBe("low");
	});
	it("rejects two outputs mapped to the same destination", () => {
		expect(
			finalizeResolution(prepared, {
				confidence: "high",
				reason: "",
				files: [
					{ path: "old.ts", content: "one" },
					{ path: "renamed.ts", content: "two" },
				],
			}).confidence,
		).toBe("low");
	});
});
