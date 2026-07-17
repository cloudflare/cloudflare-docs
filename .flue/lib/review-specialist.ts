/**
 * Shared contract between the code-review orchestrator and the review
 * specialist workflows (code-review-specialist, style-guide-specialist).
 *
 * The orchestrator decides the diff mode and passes a small PR descriptor;
 * each specialist self-fetches its own files and stages its own diff. No diff
 * data is sent in the payload or staged in R2 — only this lightweight metadata.
 */
import type { DiffMode } from "./code-review-state";
import type { DiffPullRequest } from "./code-review-diff";

/** PR descriptor carried in the specialist admit payload (small, JSON-safe). */
export interface ReviewSpecialistPrMeta {
	number: number;
	title: string;
	body: string;
	author: string;
	base: string;
	head: string;
	labels: string[];
}

export interface ReviewSpecialistPayload {
	eventType: "pull_request";
	/** PR number. */
	number: number;
	/** PR head SHA — specialists read post-change file content at this ref. */
	headSha: string;
	/** Diff mode decided by the orchestrator (specialists self-heal incremental → full on rebase/force-push/upstream merge). */
	diffMode: DiffMode;
	/** PR metadata needed to stage the diff context. */
	pr: ReviewSpecialistPrMeta;

	/**
	 * The orchestrator's runId, used to scope the R2 rendezvous namespace.
	 * Isolates concurrent dispatches on the same head SHA.
	 */
	dispatchId?: string;
	/**
	 * Base URL of the Worker (origin only). Used by specialists to admit
	 * finalize-review without relying on their own req object.
	 */
	baseUrl?: string;
	/**
	 * All specialist stream names expected for this dispatch. Forwarded to
	 * tryClaimFinalize so N-stream rendezvous works correctly. Falls back to
	 * EXPECTED_STREAMS from finalize-rendezvous if absent (e.g. old dispatch).
	 */
	expectedStreams?: string[];
}

/** Build the orchestrator->specialist payload PR descriptor from a full PR. */
export function toReviewSpecialistPrMeta(pr: {
	number: number;
	title: string;
	body: string | null;
	user?: { login?: string } | null;
	base: { ref: string };
	head: { ref: string };
	labels: { name: string }[];
}): ReviewSpecialistPrMeta {
	return {
		number: pr.number,
		title: pr.title,
		body: pr.body ?? "",
		author: pr.user?.login ?? "",
		base: pr.base.ref,
		head: pr.head.ref,
		labels: pr.labels.map((l) => l.name),
	};
}

/** Adapt the payload PR descriptor into the shape `writeDiffToWorkspace` wants. */
export function toDiffPullRequest(pr: ReviewSpecialistPrMeta): DiffPullRequest {
	return {
		number: pr.number,
		title: pr.title,
		body: pr.body,
		user: { login: pr.author },
		base: { ref: pr.base },
		head: { ref: pr.head },
		labels: pr.labels.map((name) => ({ name })),
	};
}
/** Validate and normalize an incoming specialist payload. */
export function parseReviewSpecialistPayload(
	payload: unknown,
	workflowName: string,
): ReviewSpecialistPayload {
	const input = payload as Partial<ReviewSpecialistPayload>;

	if (
		input.eventType !== "pull_request" ||
		typeof input.number !== "number" ||
		typeof input.headSha !== "string" ||
		!input.diffMode ||
		typeof input.pr !== "object" ||
		input.pr === null
	) {
		throw new Error(
			`[flue] ${workflowName} requires payload { eventType: "pull_request", number, headSha, diffMode, pr }.`,
		);
	}

	// Validate ReviewSpecialistPrMeta fields so downstream property accesses
	// don't crash on malformed payloads.
	const pr = input.pr as ReviewSpecialistPrMeta;
	if (
		typeof pr.number !== "number" ||
		typeof pr.title !== "string" ||
		typeof pr.body !== "string" ||
		typeof pr.author !== "string" ||
		typeof pr.base !== "string" ||
		typeof pr.head !== "string" ||
		!Array.isArray(pr.labels) ||
		!pr.labels.every((l) => typeof l === "string")
	) {
		throw new Error(
			`[flue] ${workflowName}: malformed pr field — expected { number, title, body, author, base, head, labels: string[] }.`,
		);
	}

	// Validate DiffMode — incremental mode requires fromSha and toSha.
	const diffMode = input.diffMode;
	if (diffMode.type === "incremental") {
		if (
			typeof diffMode.fromSha !== "string" ||
			typeof diffMode.toSha !== "string"
		) {
			throw new Error(
				`[flue] ${workflowName}: incremental diffMode missing fromSha or toSha.`,
			);
		}
	} else if (diffMode.type !== "full") {
		throw new Error(
			`[flue] ${workflowName}: unknown diffMode.type "${String((diffMode as { type?: unknown }).type)}".`,
		);
	}

	// Validate and normalize baseUrl: must be an absolute http(s) origin.
	// Reject relative strings, opaque paths, or non-http schemes that could
	// redirect internal auth headers to an unintended destination.
	let normalizedBaseUrl: string | undefined;
	if (typeof input.baseUrl === "string" && input.baseUrl.length > 0) {
		try {
			const parsed = new URL(input.baseUrl);
			if (parsed.protocol === "http:" || parsed.protocol === "https:") {
				normalizedBaseUrl = parsed.origin;
			}
		} catch {
			// Unparseable — drop it; the specialist falls back to req.url.
		}
	}

	return {
		eventType: input.eventType,
		number: input.number,
		headSha: input.headSha,
		diffMode: input.diffMode,
		pr: input.pr,
		dispatchId:
			typeof input.dispatchId === "string" ? input.dispatchId : undefined,
		baseUrl: normalizedBaseUrl,
		expectedStreams:
			Array.isArray(input.expectedStreams) &&
			input.expectedStreams.every((s) => typeof s === "string")
				? (input.expectedStreams as string[])
				: undefined,
	};
}
