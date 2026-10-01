import { describe, expect, it } from "vitest";
import {
	buildJudgeMessage,
	buildSpecialistMessage,
	readPatchArtifactName,
} from "./agent-input";
import { parsePatch } from "./diff/patch";
import type { PatchFile, ReviewPlan, TrackedFinding } from "./types";

const file: PatchFile = {
	path: "src/example.ts",
	status: "modified",
	additions: 1,
	deletions: 0,
	disposition: "reviewable",
	hunks: parsePatch("@@ -1 +1 @@\n+const value = 1;\n"),
};

const plan: ReviewPlan = {
	tier: "inline",
	fullReview: true,
	targets: {
		code: {
			specialist: "code",
			lines: { [file.path]: [1] },
			files: [file.path],
			fingerprints: {},
			estimatedTokens: 1,
		},
	},
	skipped: {},
	notReviewed: [],
	totalEstimatedTokens: 1,
	conventionsInputHash: "hash",
};

const finding: TrackedFinding = {
	id: "C-123",
	specialist: "code",
	path: file.path,
	line: 1,
	title: "Example",
	explanation: "Example explanation.",
	firstSeenSha: "first",
	lastSeenSha: "last",
	status: "active",
};

describe("review agent inputs", () => {
	it("builds an inline specialist message with base instructions", () => {
		const message = buildSpecialistMessage({
			specialist: "code",
			pr: { number: 1, title: "Title", body: "Body", author: "author" },
			plan,
			files: [file],
			repoAgentsMd: "Repository rules",
		});
		expect(message).toContain("<pull_request>");
		expect(message).toContain("<repo_agents_md>");
		expect(message).toContain("<target_diff>");
		expect(message).toContain("+ 1 │ const value = 1;");
	});

	it("uses a file index for tool-mode specialist review", () => {
		const message = buildSpecialistMessage({
			specialist: "code",
			pr: { number: 1, title: "Title", body: "Body", author: "author" },
			plan: { ...plan, tier: "tool" },
			files: [file],
		});
		expect(message).toContain("<file_index>");
		expect(message).toContain("target: 1");
		expect(message).toContain("read_patch");
	});

	it("builds conventions input without a diff", () => {
		const message = buildSpecialistMessage({
			specialist: "conventions",
			pr: { number: 1, title: "Title", body: "Body", author: "author" },
			plan,
			files: [file],
			prTemplate: "Template",
		});
		expect(message).toContain("<pr_template>");
		expect(message).toContain("<changed_files>");
		expect(message).not.toContain("<target_diff>");
	});

	it("truncates the diff before removing oldest comments", () => {
		const message = buildJudgeMessage({
			pr: { number: 1, title: "Title", body: "Body", author: "author" },
			newFindings: [finding],
			touched: [{ finding }],
			dismissed: [],
			comments: [
				{
					id: 1,
					kind: "issue",
					author: "old",
					role: "author",
					createdAt: "2026-01-01T00:00:00Z",
					body: `old comment ${"x".repeat(2_000)}`,
				},
				{
					id: 2,
					kind: "issue",
					author: "new",
					role: "maintainer",
					createdAt: "2026-01-02T00:00:00Z",
					body: "new comment",
				},
			],
			targetDiffOrIndex: { kind: "target_diff", content: "x".repeat(50_000) },
			maxChars: 1_000,
		});
		expect(message).toContain("[Diff truncated for size.]");
		expect(message).toContain("new comment");
		expect(message).not.toContain("old comment");
	});

	it("uses a stable artifact name for each path", () => {
		expect(readPatchArtifactName(file.path)).toMatch(
			/^files\/[0-9a-f]+\.json$/,
		);
		expect(readPatchArtifactName(file.path)).toBe(
			readPatchArtifactName(file.path),
		);
	});
});
