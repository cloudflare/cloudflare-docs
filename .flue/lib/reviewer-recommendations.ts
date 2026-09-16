/**
 * Reviewer-recommendation event contract, durable state, and comment rendering.
 *
 * Consumes the `cloudflare-docs-reviewer-recommendations` queue published by the
 * corpus worker. This module is pure — no GitHub, R2, or Workers bindings — so
 * every transition and render here is unit-testable. The queue handler in
 * cloudflare.ts owns the side effects (comment create/update/delete, R2 state).
 */
import * as v from "valibot";

export const RECOMMENDATIONS_REPO = "cloudflare/cloudflare-docs";
export const RECOMMENDATIONS_EVENT_VERSION = 1;

/** Marker embedded in the singleton reviewer-recommendation comment. */
export const RECOMMENDATION_COMMENT_MARKER =
	"<!-- cloudflare-docs-flue-reviewer-recommendations -->";

/** Queue consumer modes. */
export type RecommendationsMode = "log" | "comment";
export const RECOMMENDATIONS_MODE_DEFAULT: RecommendationsMode = "log";
export function parseRecommendationsMode(value: unknown): RecommendationsMode {
	return value === "comment" ? "comment" : RECOMMENDATIONS_MODE_DEFAULT;
}

export type RecommendationEventStatus = "complete" | "fallback" | "error";

// ── Bounded projection contract (mirrors corpus events.ts) ───────────────────

export interface RecommendationSuggestion {
	login: string;
	roles: string[];
	isMatchingCodeowner: boolean;
}

export interface RecommendationArea {
	key: string;
	product: string | null;
	samplePaths: string[];
	totalPaths: number;
	codeownersPattern: string | null;
	suggestedPeople: RecommendationSuggestion[];
	satisfyingApprovers: string[];
	satisfied: boolean;
}

export interface RecommendationBoundedResult {
	ownershipAreas: RecommendationArea[];
	warnings: string[];
	areaCount: number;
	warningCount: number;
	overflowCounts: { areas: number; warnings: number };
}

export interface ReviewerRecommendationsUpdatedEvent {
	eventType: "reviewer-recommendations.updated";
	version: 1;
	artifactId: string;
	repository: string;
	prNumber: number;
	headSha: string | null;
	status: RecommendationEventStatus;
	resultHash: string;
	computedAt: string;
	result: RecommendationBoundedResult;
}

export interface ReviewerRecommendationsClearedEvent {
	eventType: "reviewer-recommendations.cleared";
	version: 1;
	artifactId: string;
	repository: string;
	prNumber: number;
	headSha: string | null;
	clearedAt: string;
}

export type ReviewerRecommendationsEvent =
	ReviewerRecommendationsUpdatedEvent | ReviewerRecommendationsClearedEvent;

// ── Valibot schemas ───────────────────────────────────────────────────────────

const SuggestionSchema = v.object({
	login: v.string(),
	roles: v.array(v.string()),
	isMatchingCodeowner: v.boolean(),
});

const AreaSchema = v.object({
	key: v.string(),
	product: v.union([v.string(), v.null()]),
	samplePaths: v.array(v.string()),
	totalPaths: v.number(),
	codeownersPattern: v.union([v.string(), v.null()]),
	suggestedPeople: v.array(SuggestionSchema),
	satisfyingApprovers: v.array(v.string()),
	satisfied: v.boolean(),
});

const ResultSchema = v.object({
	ownershipAreas: v.array(AreaSchema),
	warnings: v.array(v.string()),
	areaCount: v.number(),
	warningCount: v.number(),
	overflowCounts: v.object({
		areas: v.number(),
		warnings: v.number(),
	}),
});

export const UpdatedEventSchema = v.object({
	eventType: v.literal("reviewer-recommendations.updated"),
	version: v.literal(RECOMMENDATIONS_EVENT_VERSION),
	artifactId: v.string(),
	repository: v.literal(RECOMMENDATIONS_REPO),
	prNumber: v.number(),
	headSha: v.union([v.string(), v.null()]),
	status: v.picklist(["complete", "fallback", "error"]),
	resultHash: v.string(),
	computedAt: v.string(),
	result: ResultSchema,
});

export const ClearedEventSchema = v.object({
	eventType: v.literal("reviewer-recommendations.cleared"),
	version: v.literal(RECOMMENDATIONS_EVENT_VERSION),
	artifactId: v.string(),
	repository: v.literal(RECOMMENDATIONS_REPO),
	prNumber: v.number(),
	headSha: v.union([v.string(), v.null()]),
	clearedAt: v.string(),
});

/**
 * Validate an unknown queue message into a typed recommendation event.
 * Returns a discriminated result so the caller can ack malformed messages
 * after structured logging.
 */
export function parseRecommendationEvent(
	value: unknown,
):
	| { ok: true; event: ReviewerRecommendationsEvent }
	| { ok: false; reason: string } {
	if (typeof value !== "object" || value === null) {
		return { ok: false, reason: "non_object" };
	}
	const raw = value as Record<string, unknown>;
	if (raw["eventType"] === "reviewer-recommendations.updated") {
		const parsed = v.safeParse(UpdatedEventSchema, value);
		if (!parsed.success) return { ok: false, reason: "invalid_updated_event" };
		return {
			ok: true,
			event: parsed.output as ReviewerRecommendationsUpdatedEvent,
		};
	}
	if (raw["eventType"] === "reviewer-recommendations.cleared") {
		const parsed = v.safeParse(ClearedEventSchema, value);
		if (!parsed.success) return { ok: false, reason: "invalid_cleared_event" };
		return {
			ok: true,
			event: parsed.output as ReviewerRecommendationsClearedEvent,
		};
	}
	return { ok: false, reason: "unknown_event_type" };
}

// ── Durable state ─────────────────────────────────────────────────────────────

export interface ReviewerRecommendationState {
	/** ISO timestamp of the latest applied event (computedAt or clearedAt). */
	eventAt: string;
	/** Current PR head SHA at apply time (may be null for cleared events). */
	headSha: string | null;
	/** Result hash of the current active recommendation (updated events only). */
	resultHash?: string;
	/** Status of the current active recommendation. */
	status?: RecommendationEventStatus;
	/** The latest recommendation projection (null when cleared). */
	recommendation: RecommendationBoundedResult | null;
	/** Last successful (non-error) recommendation, kept for degraded renders. */
	lastGoodRecommendation: RecommendationBoundedResult | null;
	/** GitHub comment id of the singleton comment (when known). */
	commentId?: number;
	/** Normalized logins that have already been @-mentioned on this PR. */
	mentionedLogins: string[];
}

export function emptyState(): ReviewerRecommendationState {
	return {
		eventAt: "",
		headSha: null,
		recommendation: null,
		lastGoodRecommendation: null,
		mentionedLogins: [],
	};
}

/** Normalize a GitHub login for case-insensitive dedup. */
export function normalizeLogin(login: string): string {
	return login.trim().toLowerCase();
}

/** Collect every unique suggestion login from a result (case-insensitive). */
export function allSuggestedLogins(
	result: RecommendationBoundedResult,
): string[] {
	const seen = new Set<string>();
	for (const area of result.ownershipAreas) {
		for (const person of area.suggestedPeople) {
			const key = normalizeLogin(person.login);
			if (!seen.has(key)) seen.add(key);
		}
	}
	return [...seen];
}

export function emptyResult(): RecommendationBoundedResult {
	return {
		ownershipAreas: [],
		warnings: [],
		areaCount: 0,
		warningCount: 0,
		overflowCounts: { areas: 0, warnings: 0 },
	};
}

/**
 * Apply an event to the durable state. Pure and deterministic: identical input
 * produces identical output, so duplicate queue deliveries are no-ops.
 *
 * Ordering uses the event timestamps (computedAt/clearedAt). Identical
 * timestamps for the same event type are treated as replays. An updated/cleared
 * pair with identical timestamps is ambiguous and left to the caller's GitHub
 * head-check (updated applies only when the head matches the current PR head;
 * cleared applies only when the PR is no longer at that head).
 */
export function applyEventToState(
	state: ReviewerRecommendationState,
	event: ReviewerRecommendationsEvent,
): ReviewerRecommendationState {
	if (event.eventType === "reviewer-recommendations.cleared") {
		if (state.eventAt && event.clearedAt < state.eventAt) return state;
		if (event.clearedAt === state.eventAt && state.recommendation === null) {
			return state; // replay of an already-applied clear
		}
		return {
			...state,
			eventAt: event.clearedAt,
			headSha: event.headSha,
			recommendation: null,
		};
	}

	// updated
	if (state.eventAt && event.computedAt < state.eventAt) return state;
	if (event.computedAt === state.eventAt && state.recommendation !== null) {
		// Same-timestamp replay of an already-applied update.
		return state;
	}

	const isError = event.status === "error";
	const next: ReviewerRecommendationState = {
		...state,
		eventAt: event.computedAt,
		headSha: event.headSha,
		resultHash: event.resultHash,
		status: event.status,
		recommendation: event.result,
		lastGoodRecommendation: isError
			? state.lastGoodRecommendation
			: event.result,
	};
	return next;
}

/**
 * Compute the normalized logins that should be @-mentioned in the next comment:
 * the current recommendation's suggestions that have not been mentioned before.
 */
export function newMentions(
	state: ReviewerRecommendationState,
	result: RecommendationBoundedResult | null,
): string[] {
	const already = new Set(state.mentionedLogins);
	return allSuggestedLogins(result ?? emptyResult()).filter(
		(login) => !already.has(login),
	);
}

/** Returns a copy of state with `logins` (normalized) added to mentionedLogins. */
export function withMentions(
	state: ReviewerRecommendationState,
	logins: string[],
): ReviewerRecommendationState {
	const merged = new Set(state.mentionedLogins);
	for (const login of logins) merged.add(normalizeLogin(login));
	return { ...state, mentionedLogins: [...merged] };
}

// ── Rendering ────────────────────────────────────────────────────────────────

export interface RecommendationRenderView {
	/** Result to render: latest when available, otherwise the last good one. */
	recommendation: RecommendationBoundedResult;
	/** Normalized logins to @-mention (new since the last comment). */
	newLogins: string[];
	/** Normalized logins previously mentioned (rendered without @). */
	previouslyMentionedLogins: string[];
	/** True when rendering the last good result due to a degraded latest one. */
	degraded: boolean;
}

function escapeCell(value: string): string {
	return value.replace(/\|/g, "\\|").replace(/\r?\n/g, " ");
}

function roleLabel(roles: string[]): string {
	const known: Record<string, string> = {
		product_manager: "Product management",
		engineering_manager: "Engineering leadership",
		historical_codeowner: "Relevant review history",
	};
	const labels = [...new Set(roles)]
		.map((role) => known[role] ?? "")
		.filter(Boolean);
	if (labels.length === 0) return "Code ownership";
	return labels.join(", ");
}

/**
 * Render the singleton reviewer-recommendation comment body.
 *
 * - `@`-mentions only logins in `newLogins` (once per PR).
 * - Table cells render usernames as code spans, never as @-mentions.
 * - Raw producer warnings/errors are never published.
 * - When `degraded` is true the tables come from the last good snapshot and a
 *   generic note replaces the status line.
 */
export function renderRecommendationsComment(
	view: RecommendationRenderView,
): string {
	const result = view.recommendation;
	const areas = result.ownershipAreas;
	const covered = areas.filter((area) => area.satisfied);
	const uncovered = areas.filter((area) => !area.satisfied);

	const lines: string[] = [
		RECOMMENDATION_COMMENT_MARKER,
		`<!-- reviewed-at: ${new Date().toISOString()} -->`,
		"",
		"## Suggested review contacts",
	];

	if (view.newLogins.length > 0) {
		lines.push(
			"",
			`New contacts: ${view.newLogins.map((login) => `@${login}`).join(" ")}`,
		);
	} else if (view.previouslyMentionedLogins.length > 0) {
		lines.push(
			"",
			`_No new contacts. Previously mentioned: ${view.previouslyMentionedLogins.join(", ")}_`,
		);
	} else {
		lines.push("", "_No new contacts._");
	}
	lines.push("");

	if (view.degraded) {
		lines.push(
			"⚠️ The latest recommendation could not be refreshed. Showing the last successful recommendation below.",
			"",
		);
	} else {
		const coveredCount = covered.length;
		const totalCount = result.areaCount > 0 ? result.areaCount : areas.length;
		lines.push(
			`**${coveredCount} of ${totalCount} ownership areas are covered.**`,
			"",
		);
	}

	if (uncovered.length > 0) {
		lines.push("| Uncovered area | Files | Suggested people | Basis |");
		lines.push("| --- | ---: | --- | --- |");
		for (const area of uncovered) {
			const people = area.suggestedPeople
				.map((p) => `\`${escapeCell(p.login)}\``)
				.join(", ");
			lines.push(
				`| ${escapeCell(area.key)} | ${area.totalPaths} | ${people || "_none_"} | ${escapeCell(roleLabel(area.suggestedPeople.flatMap((p) => p.roles)))} |`,
			);
		}
	} else if (areas.length > 0) {
		lines.push("_All ownership areas are covered._", "");
	}

	if (covered.length > 0) {
		lines.push(
			"",
			"<details>",
			`<summary>Covered areas (${covered.length})</summary>`,
			"<br/>",
			"",
			"| Area | Approved by | Suggested people |",
			"| --- | --- | --- |",
		);
		for (const area of covered) {
			const approvers = area.satisfyingApprovers
				.map((login) => `\`${escapeCell(login)}\``)
				.join(", ");
			const people = area.suggestedPeople
				.map((p) => `\`${escapeCell(p.login)}\``)
				.join(", ");
			lines.push(
				`| ${escapeCell(area.key)} | ${approvers || "_none_"} | ${people || "_none_"} |`,
			);
		}
		lines.push("", "</details>");
	}

	lines.push(
		"",
		"<sub>GitHub CODEOWNERS manages formal review requests.</sub>",
	);

	return lines.join("\n");
}
