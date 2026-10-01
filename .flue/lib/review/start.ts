import * as v from "valibot";

export const ReviewWorkflowParamsSchema = v.object({
	number: v.pipe(v.number(), v.integer(), v.minValue(1)),
	headSha: v.pipe(v.string(), v.minLength(1)),
	trigger: v.picklist(["auto", "command"]),
	action: v.optional(v.string()),
	fullReview: v.boolean(),
	commentId: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),
	/** 👀 reaction added to the command comment; swapped for 👍 when done. */
	eyesReactionId: v.optional(v.pipe(v.number(), v.integer(), v.minValue(1))),
	requestedBy: v.optional(v.string()),
	/**
	 * Replay run (bin/replay.ts). Reviews the full PR diff from empty state,
	 * even for closed PRs, then publishes like any run: log mode prints the
	 * comment, and comment mode writes the in-progress note, the finished
	 * comment, and a failure note if the run fails. It has no debounce,
	 * supersession, reaction, or state write. Run artifacts, including the
	 * rendered comment, are kept.
	 */
	replay: v.optional(v.literal(true)),
});
export type ReviewWorkflowParams = v.InferOutput<
	typeof ReviewWorkflowParamsSchema
>;

/** Workflow instance IDs are limited to 100 URL-safe characters. */
export function reviewInstanceId(params: ReviewWorkflowParams): string {
	const sha = params.headSha.slice(0, 12).replace(/[^a-zA-Z0-9_-]/g, "-");
	const command =
		params.trigger === "command" ? `-c${params.commentId ?? "manual"}` : "";
	return `pr-${params.number}-${sha}${command}${params.fullReview ? "-full" : ""}`.slice(
		0,
		100,
	);
}

function isDuplicate(error: unknown): boolean {
	const message = error instanceof Error ? error.message : String(error);
	return /(?:already exists|already been created|instance.+exists|\b409\b)/i.test(
		message,
	);
}

export async function startReview(
	workflow: Workflow<ReviewWorkflowParams>,
	params: ReviewWorkflowParams,
): Promise<{ started: boolean; id: string; reason?: "duplicate" }> {
	const id = reviewInstanceId(params);
	try {
		await workflow.create({ id, params });
		return { started: true, id };
	} catch (error) {
		if (isDuplicate(error)) return { started: false, id, reason: "duplicate" };
		throw error;
	}
}

export function shouldDebounce(params: ReviewWorkflowParams): boolean {
	return params.trigger === "auto" && params.action === "synchronize";
}
