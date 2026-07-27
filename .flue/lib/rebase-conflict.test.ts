import { describe, it, expect } from "vitest";
import type { ConflictFileForAgent } from "./rebase-conflict";

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

// Extracted predicate matching the one in resolveConflictsWithAI.
function isDeleteModifyConflict(f: ConflictFileForAgent): boolean {
	return (
		f.baseVersion !== null &&
		(f.prVersion === null) !== (f.productionVersion === null)
	);
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
