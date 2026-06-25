/**
 * Style-guide review result types, schemas, and ID assignment.
 *
 * Shared between style-guide-review (specialist) and
 * code-review-orchestrator (consumer).
 */
import * as v from "valibot";

// Model returns findings without IDs — trusted code assigns them after.
export const StyleGuideFindingFromModelSchema = v.object({
	severity: v.picklist(["warning", "suggestion"]),
	path: v.string(),
	line: v.optional(v.number()),
	rule: v.string(),
	evidence: v.string(),
	suggestion: v.string(),
});

export const StyleGuideResultFromModelSchema = v.object({
	findings: v.array(StyleGuideFindingFromModelSchema),
	summary: v.string(),
});

// Public types always include the trusted-code-assigned id.
export type StyleGuideFinding = v.InferOutput<
	typeof StyleGuideFindingFromModelSchema
> & {
	id: string;
};

export type StyleGuideResult = {
	findings: StyleGuideFinding[];
	summary: string;
	/** Files the specialist actually reviewed — used by the reconciler to resolve findings. */
	reviewedFiles: string[];
};

/**
 * Assign stable SHA-256-derived IDs to raw model findings.
 * Line number is excluded from the hash so IDs remain stable when surrounding
 * lines shift after partial fixes.
 */
export async function assignFindingIds(
	findings: v.InferOutput<typeof StyleGuideFindingFromModelSchema>[],
): Promise<StyleGuideFinding[]> {
	const encoder = new TextEncoder();
	return Promise.all(
		findings.map(async (f) => {
			const key = `${f.rule}:${f.path}:${f.evidence.trim()}`;
			const buf = await crypto.subtle.digest("SHA-256", encoder.encode(key));
			const hex = Array.from(new Uint8Array(buf))
				.map((b) => b.toString(16).padStart(2, "0"))
				.join("");
			return { ...f, id: `SG-${hex.slice(0, 6)}` };
		}),
	);
}
