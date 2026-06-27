/**
 * Generic code-review result types, schemas, and ID assignment.
 *
 * Mirrors style-guide-results.ts but for the generic engineering review:
 * findings span all changed files (not just MDX) and add a `critical`
 * severity above warning/suggestion. Shared between code-review-inproc
 * (specialist) and code-review-orchestrator (consumer).
 */
import * as v from "valibot";

// Model returns findings without IDs — trusted code assigns them after.
export const CodeReviewFindingFromModelSchema = v.object({
	severity: v.picklist(["critical", "warning", "suggestion"]),
	path: v.string(),
	line: v.optional(v.number()),
	rule: v.string(),
	evidence: v.string(),
	suggestion: v.string(),
});

export const CodeReviewResultFromModelSchema = v.object({
	findings: v.array(CodeReviewFindingFromModelSchema),
	summary: v.string(),
});

// Public types always include the trusted-code-assigned id.
export type CodeReviewFinding = v.InferOutput<
	typeof CodeReviewFindingFromModelSchema
> & {
	id: string;
};

export type CodeReviewResult = {
	findings: CodeReviewFinding[];
	summary: string;
	/** Files the specialist actually reviewed — used by the reconciler to resolve findings. */
	reviewedFiles: string[];
};

/**
 * Assign stable SHA-256-derived IDs to raw model findings.
 * Line number is excluded from the hash so IDs remain stable when surrounding
 * lines shift after partial fixes. Prefixed `CR-` to distinguish from the
 * style-guide `SG-` namespace.
 */
export async function assignCodeReviewFindingIds(
	findings: v.InferOutput<typeof CodeReviewFindingFromModelSchema>[],
): Promise<CodeReviewFinding[]> {
	const encoder = new TextEncoder();
	return Promise.all(
		findings.map(async (f) => {
			const key = `${f.rule}:${f.path}:${f.evidence.trim()}`;
			const buf = await crypto.subtle.digest("SHA-256", encoder.encode(key));
			const hex = Array.from(new Uint8Array(buf))
				.map((b) => b.toString(16).padStart(2, "0"))
				.join("");
			return { ...f, id: `CR-${hex.slice(0, 12)}` };
		}),
	);
}
