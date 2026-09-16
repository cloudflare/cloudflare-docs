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

/**
 * Labels the Flue spam/off-topic gate applies to PRs it classifies as spam.
 * Recommendation updates for such PRs are dropped so the comment never posts.
 */
export const RECOMMENDATIONS_SKIP_LABELS = ["spam", "off topic"] as const;

/**
 * Whether an updated recommendation event for this PR should be dropped:
 * never comment on draft, closed, or spam/off-topic PRs. Cleared events are
 * still processed so an existing comment is removed on close.
 */
export function shouldSkipRecommendationUpdate(pr: {
	draft: boolean;
	state: string;
	labels: Array<{ name: string }>;
}): boolean {
	if (pr.draft) return true;
	if (pr.state !== "open") return true;
	return pr.labels.some((label) =>
		(RECOMMENDATIONS_SKIP_LABELS as readonly string[]).includes(label.name),
	);
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
	/** Declared CODEOWNERS refs (`@user`, `@org/team`, email). Display-only. */
	codeownersDeclared?: string[];
	/** Expanded owner logins; populated only when suggestions are empty. Display-only, never @-mentioned. */
	fallbackOwners?: string[];
	/** Full expanded owner count before the per-area cap (for "+ N more" display). */
	totalOwners?: number;
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
	codeownersDeclared: v.optional(v.array(v.string()), []),
	fallbackOwners: v.optional(v.array(v.string()), []),
	totalOwners: v.optional(v.number(), 0),
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
 * Apply an `updated` event under the PR-head guard: a recommendation computed
 * for an earlier head is stale and must not clobber a newer one, so it applies
 * only when the PR is open and the event's head matches the PR's current head
 * (or the event carries no head). Returning `state` unchanged marks the event
 * stale/duplicate.
 */
export function applyUpdatedState(
	state: ReviewerRecommendationState,
	event: ReviewerRecommendationsUpdatedEvent,
	prOpen: boolean,
	prHeadSha: string | null,
): ReviewerRecommendationState {
	if (!prOpen) return state;
	if (event.headSha !== null && event.headSha !== prHeadSha) return state;
	return applyEventToState(state, event);
}

/**
 * Apply a `cleared` event under the PR-head guard. A clear represents a PR
 * closing or exclusion: it applies when the PR is no longer open (a closed PR
 * keeps its head SHA, so the head check cannot be used there), and it applies
 * when the PR is open but has moved past the head the clear was computed for.
 * It is skipped only when the PR is still open at that exact head — a
 * spurious or out-of-order clear — so a reopen at the same head keeps the
 * prior recommendation.
 */
export function applyClearedState(
	state: ReviewerRecommendationState,
	event: ReviewerRecommendationsEvent & {
		eventType: "reviewer-recommendations.cleared";
	},
	prOpen: boolean,
	prHeadSha: string | null,
): ReviewerRecommendationState {
	if (prOpen && event.headSha !== null && event.headSha === prHeadSha) {
		return state;
	}
	return applyEventToState(state, event);
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

/**
 * Display logins for an area: the suggestions when present, otherwise the
 * expanded CODEOWNERS fallback roster. Display-only, never @-mentioned. When
 * the fallback roster was capped, `totalOwners` drives a "+ N more" suffix —
 * this applies only to the fallback path (suggestions are never supplemented).
 */
function displayPeople(area: RecommendationArea): string {
	if (area.suggestedPeople.length > 0) {
		return area.suggestedPeople
			.map((p) => `\`${escapeCell(p.login)}\``)
			.join(", ");
	}
	const logins = area.fallbackOwners ?? [];
	if (logins.length === 0) return "";
	const rendered = logins.map((login) => `\`${escapeCell(login)}\``).join(", ");
	const omitted = Math.max(0, (area.totalOwners ?? 0) - logins.length);
	return omitted > 0 ? `${rendered} + ${omitted} more` : rendered;
}

/**
 * The CODEOWNERS cell: the declared refs as code spans, or "_no rule_" when
 * the area matched no CODEOWNERS rule. Display-only, never @-mentioned.
 */
function codeownersCell(area: RecommendationArea): string {
	const refs = area.codeownersDeclared ?? [];
	if (area.codeownersPattern === null) return "_no rule_";
	if (refs.length === 0) return "_none_";
	return refs
		.map((ref) => `\`${escapeCell(ref.replace(/^@/, ""))}\``)
		.join(", ");
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

	if (result.areaCount > areas.length) {
		lines.push(
			`_${result.areaCount - areas.length} area(s) omitted from this message due to message size._`,
			"",
		);
	}

	if (uncovered.length > 0) {
		lines.push(
			"| Uncovered area | Files | CODEOWNERS | Suggested people | Basis |",
		);
		lines.push("| --- | ---: | --- | --- | --- |");
		for (const area of uncovered) {
			const people = displayPeople(area);
			lines.push(
				`| ${escapeCell(area.key)} | ${area.totalPaths} | ${codeownersCell(area)} | ${people || "_none_"} | ${escapeCell(roleLabel(area.suggestedPeople.flatMap((p) => p.roles)))} |`,
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
			"| Area | Files | CODEOWNERS | Approved by | Suggested people |",
			"| --- | ---: | --- | --- | --- |",
		);
		for (const area of covered) {
			const approvers = area.satisfyingApprovers
				.map((login) => `\`${escapeCell(login)}\``)
				.join(", ");
			const people = displayPeople(area);
			lines.push(
				`| ${escapeCell(area.key)} | ${area.totalPaths} | ${codeownersCell(area)} | ${approvers || "_none_"} | ${people || "_none_"} |`,
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
