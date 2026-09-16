import { describe, expect, it } from "vitest";
import {
	RECOMMENDATION_COMMENT_MARKER,
	RECOMMENDATIONS_REPO,
	applyClearedState,
	applyEventToState,
	applyUpdatedState,
	emptyState,
	newMentions,
	normalizeLogin,
	parseRecommendationEvent,
	parseRecommendationsMode,
	renderRecommendationsComment,
	shouldSkipRecommendationUpdate,
	withMentions,
	type RecommendationArea,
	type RecommendationBoundedResult,
	type ReviewerRecommendationsClearedEvent,
	type ReviewerRecommendationsUpdatedEvent,
} from "./reviewer-recommendations";

const REPO = RECOMMENDATIONS_REPO;
const HEAD_A = "a".repeat(40);

function area(overrides: Partial<RecommendationArea> = {}): RecommendationArea {
	return {
		key: "1:workers",
		product: "workers",
		samplePaths: ["src/content/docs/workers/index.mdx"],
		totalPaths: 3,
		codeownersPattern: "/src/content/docs/workers/",
		suggestedPeople: [
			{ login: "alice", roles: ["product_manager"], isMatchingCodeowner: true },
		],
		satisfyingApprovers: [],
		satisfied: false,
		...overrides,
	};
}

function result(areas: RecommendationArea[] = []): RecommendationBoundedResult {
	return {
		ownershipAreas: areas,
		warnings: [],
		areaCount: areas.length,
		warningCount: 0,
		overflowCounts: { areas: 0, warnings: 0 },
	};
}

function updatedEvent(
	overrides: Partial<ReviewerRecommendationsUpdatedEvent> = {},
): ReviewerRecommendationsUpdatedEvent {
	return {
		eventType: "reviewer-recommendations.updated",
		version: 1,
		artifactId: `${REPO}#12345`,
		repository: REPO,
		prNumber: 12345,
		headSha: HEAD_A,
		status: "complete",
		resultHash: "hash-1",
		computedAt: "2026-09-15T22:55:49.372Z",
		result: result([area()]),
		...overrides,
	};
}

function clearedEvent(
	overrides: Partial<ReviewerRecommendationsClearedEvent> = {},
): ReviewerRecommendationsClearedEvent {
	return {
		eventType: "reviewer-recommendations.cleared",
		version: 1,
		artifactId: `${REPO}#12345`,
		repository: REPO,
		prNumber: 12345,
		headSha: HEAD_A,
		clearedAt: "2026-09-15T23:00:00.000Z",
		...overrides,
	};
}

// ── parseRecommendationEvent ──────────────────────────────────────────────────

describe("parseRecommendationEvent", () => {
	it("parses a valid updated event", () => {
		const parsed = parseRecommendationEvent(updatedEvent());
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			expect(parsed.event.eventType).toBe("reviewer-recommendations.updated");
			expect(parsed.event.prNumber).toBe(12345);
		}
	});

	it("defaults the new coverage fields on a pre-contract updated event", () => {
		// The `area()` fixture never sets the coverage fields, so the parsed
		// event must fall back to the schema defaults.
		const parsed = parseRecommendationEvent(updatedEvent());
		expect(parsed.ok).toBe(true);
		if (
			parsed.ok &&
			parsed.event.eventType === "reviewer-recommendations.updated"
		) {
			const area = parsed.event.result.ownershipAreas[0];
			expect(area?.codeownersDeclared).toEqual([]);
			expect(area?.fallbackOwners).toEqual([]);
			expect(area?.totalOwners).toBe(0);
		}
	});

	it("parses a valid cleared event", () => {
		const parsed = parseRecommendationEvent(clearedEvent());
		expect(parsed.ok).toBe(true);
		if (parsed.ok) {
			expect(parsed.event.eventType).toBe("reviewer-recommendations.cleared");
		}
	});

	it("rejects a wrong repository", () => {
		const parsed = parseRecommendationEvent(
			updatedEvent({ repository: "other/org" }),
		);
		expect(parsed.ok).toBe(false);
	});

	it("rejects an unsupported version", () => {
		const parsed = parseRecommendationEvent(
			updatedEvent({ version: 2 as unknown as 1 }),
		);
		expect(parsed.ok).toBe(false);
	});

	it("rejects an unknown event type", () => {
		const parsed = parseRecommendationEvent({ eventType: "something.else" });
		expect(parsed.ok).toBe(false);
	});

	it("rejects a non-object payload", () => {
		for (const payload of [null, "string", 42]) {
			const parsed = parseRecommendationEvent(payload);
			expect(parsed.ok).toBe(false);
		}
	});
});

// ── applyEventToState ─────────────────────────────────────────────────────────

describe("applyEventToState", () => {
	it("applies a first updated event", () => {
		const next = applyEventToState(emptyState(), updatedEvent());
		expect(next.recommendation).not.toBeNull();
		expect(next.eventAt).toBe("2026-09-15T22:55:49.372Z");
		expect(next.headSha).toBe(HEAD_A);
	});

	it("is idempotent for a duplicate updated event", () => {
		const first = applyEventToState(emptyState(), updatedEvent());
		const second = applyEventToState(first, updatedEvent());
		expect(second).toBe(first);
	});

	it("ignores an older updated event", () => {
		const newer = applyEventToState(
			emptyState(),
			updatedEvent({
				computedAt: "2026-09-15T23:00:00.000Z",
				resultHash: "newer",
			}),
		);
		const older = applyEventToState(
			newer,
			updatedEvent({
				computedAt: "2026-09-15T22:55:49.372Z",
				resultHash: "older",
			}),
		);
		expect(older).toBe(newer);
	});

	it("replaces with a newer updated event", () => {
		const first = applyEventToState(emptyState(), updatedEvent());
		const second = applyEventToState(
			first,
			updatedEvent({
				computedAt: "2026-09-15T23:00:00.000Z",
				resultHash: "newer",
				result: result([area({ key: "2:d1" })]),
			}),
		);
		expect(second.recommendation?.ownershipAreas[0]?.key).toBe("2:d1");
	});

	it("clears a recommendation and keeps the mention history", () => {
		const withMention = withMentions(
			applyEventToState(emptyState(), updatedEvent()),
			["alice"],
		);
		const cleared = applyEventToState(withMention, clearedEvent());
		expect(cleared.recommendation).toBeNull();
		expect(cleared.mentionedLogins).toEqual(["alice"]);
	});

	it("keeps a cleared tombstone against a delayed updated event", () => {
		const cleared = applyEventToState(emptyState(), clearedEvent());
		// A stale update computed before the clear must not resurrect the state.
		const resurrect = applyEventToState(
			cleared,
			updatedEvent({ computedAt: "2026-09-15T22:55:49.372Z" }),
		);
		expect(resurrect.recommendation).toBeNull();
	});

	it("does not resurrect after a same-timestamp clear replay", () => {
		const cleared = applyEventToState(emptyState(), clearedEvent());
		const replay = applyEventToState(cleared, clearedEvent());
		expect(replay).toBe(cleared);
	});

	it("preserves the last good recommendation across an error event", () => {
		const good = applyEventToState(
			emptyState(),
			updatedEvent({ result: result([area({ key: "1:workers" })]) }),
		);
		const errored = applyEventToState(
			good,
			updatedEvent({
				status: "error",
				computedAt: "2026-09-15T23:10:00.000Z",
				result: result([]),
			}),
		);
		expect(errored.status).toBe("error");
		expect(errored.lastGoodRecommendation).toEqual(good.recommendation);
		expect(errored.recommendation?.ownershipAreas).toEqual([]);
	});
});

// ── Head guards (applyUpdatedState / applyClearedState) ───────────────────────

describe("applyUpdatedState / applyClearedState", () => {
	it("applies an updated event when the PR is open at the matching head", () => {
		const next = applyUpdatedState(emptyState(), updatedEvent(), true, HEAD_A);
		expect(next.recommendation).not.toBeNull();
		expect(next.eventAt).toBe("2026-09-15T22:55:49.372Z");
	});

	it("skips an updated event computed for an earlier head", () => {
		const state = emptyState();
		const next = applyUpdatedState(state, updatedEvent(), true, "b".repeat(40));
		expect(next).toBe(state);
	});

	it("skips an updated event for a closed PR", () => {
		const state = emptyState();
		const next = applyUpdatedState(state, updatedEvent(), false, HEAD_A);
		expect(next).toBe(state);
	});

	it("applies a clear for a closed PR even when the head matches", () => {
		// The corpus publishes cleared with the PR's head SHA on close, and a
		// closed PR keeps that head SHA — so the clear must apply when the PR is
		// no longer open, not be skipped by the head check.
		const state = applyUpdatedState(emptyState(), updatedEvent(), true, HEAD_A);
		expect(state.recommendation).not.toBeNull();
		const cleared = applyClearedState(state, clearedEvent(), false, HEAD_A);
		expect(cleared.recommendation).toBeNull();
		expect(cleared.eventAt).toBe("2026-09-15T23:00:00.000Z");
	});

	it("applies a clear when the PR is open but moved past the cleared head", () => {
		const state = applyUpdatedState(emptyState(), updatedEvent(), true, HEAD_A);
		const cleared = applyClearedState(
			state,
			clearedEvent(),
			true,
			"b".repeat(40),
		);
		expect(cleared.recommendation).toBeNull();
	});

	it("skips a clear when the PR is still open at the same head", () => {
		const state = applyUpdatedState(emptyState(), updatedEvent(), true, HEAD_A);
		const cleared = applyClearedState(state, clearedEvent(), true, HEAD_A);
		expect(cleared).toBe(state);
	});
});

// ── Mentions ─────────────────────────────────────────────────────────────────

describe("newMentions / withMentions", () => {
	it("normalizes logins for case-insensitive dedup", () => {
		expect(normalizeLogin("Alice")).toBe("alice");
		expect(normalizeLogin("  Bob  ")).toBe("bob");
	});

	it("collects unique suggested logins across areas", () => {
		const r = result([
			area({
				suggestedPeople: [
					{ login: "alice", roles: [], isMatchingCodeowner: true },
				],
			}),
			area({
				key: "2:d1",
				suggestedPeople: [
					{ login: "Alice", roles: [], isMatchingCodeowner: true },
					{ login: "bob", roles: [], isMatchingCodeowner: false },
				],
			}),
		]);
		const mentions = newMentions(emptyState(), r);
		expect(mentions.sort()).toEqual(["alice", "bob"]);
	});

	it("returns only people not previously mentioned", () => {
		const state = withMentions(
			applyEventToState(emptyState(), updatedEvent()),
			["alice"],
		);
		const mentions = newMentions(state, updatedEvent().result);
		expect(mentions).toEqual([]);
	});

	it("mentions a newly introduced person on a later event", () => {
		const first = withMentions(
			applyEventToState(emptyState(), updatedEvent()),
			["alice"],
		);
		const second = applyEventToState(
			first,
			updatedEvent({
				computedAt: "2026-09-15T23:00:00.000Z",
				result: result([
					area({
						suggestedPeople: [
							{ login: "alice", roles: [], isMatchingCodeowner: true },
							{ login: "carol", roles: [], isMatchingCodeowner: true },
						],
					}),
				]),
			}),
		);
		expect(newMentions(second, second.recommendation!)).toEqual(["carol"]);
	});

	it("mentions every suggestion regardless of approval or coverage", () => {
		const r = result([
			area({
				satisfied: true,
				satisfyingApprovers: ["bob"],
				suggestedPeople: [
					{ login: "alice", roles: [], isMatchingCodeowner: true },
					{ login: "bob", roles: [], isMatchingCodeowner: true },
				],
			}),
		]);
		const mentions = newMentions(emptyState(), r);
		expect(mentions.sort()).toEqual(["alice", "bob"]);
	});
});

// ── parseRecommendationsMode ─────────────────────────────────────────────────

describe("parseRecommendationsMode", () => {
	it("defaults to log", () => {
		expect(parseRecommendationsMode(undefined)).toBe("log");
		expect(parseRecommendationsMode("bogus")).toBe("log");
	});
	it("accepts comment", () => {
		expect(parseRecommendationsMode("comment")).toBe("comment");
	});
});

// ── shouldSkipRecommendationUpdate ────────────────────────────────────────────

describe("shouldSkipRecommendationUpdate", () => {
	const pr = {
		draft: false,
		state: "open",
		labels: [{ name: "workers" }],
	};

	it("processes a normal open PR", () => {
		expect(shouldSkipRecommendationUpdate(pr)).toBe(false);
	});

	it("skips draft PRs", () => {
		expect(shouldSkipRecommendationUpdate({ ...pr, draft: true })).toBe(true);
	});

	it("skips closed PRs", () => {
		expect(shouldSkipRecommendationUpdate({ ...pr, state: "closed" })).toBe(
			true,
		);
	});

	it("skips PRs labeled spam or off topic", () => {
		expect(
			shouldSkipRecommendationUpdate({ ...pr, labels: [{ name: "spam" }] }),
		).toBe(true);
		expect(
			shouldSkipRecommendationUpdate({
				...pr,
				labels: [{ name: "off topic" }],
			}),
		).toBe(true);
	});

	it("processes an open PR with unrelated labels", () => {
		expect(
			shouldSkipRecommendationUpdate({
				...pr,
				labels: [{ name: "workers" }, { name: "spam-filter:reviewed" }],
			}),
		).toBe(false);
	});
});

// ── renderRecommendationsComment ──────────────────────────────────────────────

describe("renderRecommendationsComment", () => {
	function view(
		overrides: Partial<Parameters<typeof renderRecommendationsComment>[0]> = {},
	) {
		return {
			recommendation: result([
				area({
					key: "1:workers",
					totalPaths: 18,
					suggestedPeople: [
						{
							login: "alice",
							roles: ["product_manager"],
							isMatchingCodeowner: true,
						},
						{
							login: "bob",
							roles: ["historical_codeowner"],
							isMatchingCodeowner: true,
						},
					],
				}),
				area({
					key: "2:d1",
					totalPaths: 5,
					satisfied: true,
					satisfyingApprovers: ["carol"],
					suggestedPeople: [
						{ login: "carol", roles: [], isMatchingCodeowner: true },
					],
				}),
			]),
			newLogins: ["alice", "bob", "carol"],
			previouslyMentionedLogins: [],
			degraded: false,
			...overrides,
		};
	}

	it("contains the marker", () => {
		expect(renderRecommendationsComment(view())).toContain(
			RECOMMENDATION_COMMENT_MARKER,
		);
	});

	it("@-mentions only new logins once", () => {
		const body = renderRecommendationsComment(view());
		expect(body).toContain("New contacts: @alice @bob @carol");
	});

	it("renders every suggested person in the tables without @", () => {
		const body = renderRecommendationsComment(view());
		expect(body).toContain("`alice`");
		expect(body).toContain("`bob`");
		expect(body).toContain("`carol`");
		expect(body).not.toContain("@alice`");
	});

	it("falls back to the expanded CODEOWNERS roster for unsuggested areas without mentioning them", () => {
		const body = renderRecommendationsComment(
			view({
				recommendation: result([
					area({
						key: "1:changelog",
						codeownersPattern: "/src/content/changelog/",
						codeownersDeclared: [
							"cloudflare/product-owners",
							"cloudflare/pm-changelogs",
						],
						suggestedPeople: [],
						fallbackOwners: ["dave", "erin", "frank"],
						totalOwners: 3,
					}),
				]),
				newLogins: [],
				previouslyMentionedLogins: [],
			}),
		);
		expect(body).toContain("`dave`");
		expect(body).toContain("`erin`");
		expect(body).toContain("`frank`");
		expect(body).toContain("`cloudflare/product-owners`");
		expect(body).not.toContain("_none_");
		expect(body).not.toContain("@dave");
		expect(body).not.toContain("@erin");
		expect(body).not.toContain("@frank");
		expect(body).not.toContain("@cloudflare/product-owners");
	});

	it("renders the + N more suffix when the fallback roster was capped", () => {
		const body = renderRecommendationsComment(
			view({
				recommendation: result([
					area({
						key: "1:changelog",
						codeownersPattern: "/src/content/changelog/",
						suggestedPeople: [],
						fallbackOwners: ["dave", "erin", "frank"],
						totalOwners: 90,
					}),
				]),
				newLogins: [],
				previouslyMentionedLogins: [],
			}),
		);
		expect(body).toContain("+ 87 more");
	});

	it("does not add a + N more suffix to suggested people", () => {
		const body = renderRecommendationsComment(
			view({
				recommendation: result([
					area({
						key: "1:workers",
						suggestedPeople: [
							{ login: "alice", roles: [], isMatchingCodeowner: true },
						],
						totalOwners: 90,
					}),
				]),
				newLogins: [],
				previouslyMentionedLogins: [],
			}),
		);
		expect(body).toContain("`alice`");
		expect(body).not.toContain("more");
	});

	it("renders _none_ when the fallback roster is empty despite totalOwners", () => {
		const body = renderRecommendationsComment(
			view({
				recommendation: result([
					area({
						key: "1:changelog",
						codeownersPattern: "/src/content/changelog/",
						suggestedPeople: [],
						fallbackOwners: [],
						totalOwners: 5,
					}),
				]),
				newLogins: [],
				previouslyMentionedLogins: [],
			}),
		);
		expect(body).toContain("_none_");
		expect(body).not.toContain("5 more");
	});

	it("renders _no rule_ when an area matched no CODEOWNERS rule", () => {
		const body = renderRecommendationsComment(
			view({
				recommendation: result([
					area({
						key: "none:none",
						codeownersPattern: null,
						suggestedPeople: [],
					}),
				]),
				newLogins: [],
				previouslyMentionedLogins: [],
			}),
		);
		expect(body).toContain("_no rule_");
	});

	it("notes areas omitted by the message-size budget", () => {
		const body = renderRecommendationsComment(
			view({
				recommendation: {
					...result([area()]),
					areaCount: 3,
				},
			}),
		);
		expect(body).toContain(
			"2 area(s) omitted from this message due to message size",
		);
	});

	it("does not expose internal roles", () => {
		const body = renderRecommendationsComment(view());
		expect(body).not.toContain("product_manager");
		expect(body).not.toContain("historical_codeowner");
		expect(body).toContain("Product management");
		expect(body).toContain("Relevant review history");
	});

	it("renders coverage counts", () => {
		const body = renderRecommendationsComment(view());
		expect(body).toContain("**1 of 2 ownership areas are covered.**");
	});

	it("shows the previous-mentions note when nothing is new", () => {
		const body = renderRecommendationsComment(
			view({
				newLogins: [],
				previouslyMentionedLogins: ["alice", "bob", "carol"],
			}),
		);
		expect(body).toContain("No new contacts");
		expect(body).toContain("Previously mentioned: alice, bob, carol");
	});

	it("marks a degraded render", () => {
		const body = renderRecommendationsComment(view({ degraded: true }));
		expect(body).toContain("could not be refreshed");
	});

	it("escapes table cells", () => {
		const body = renderRecommendationsComment(
			view({
				recommendation: result([
					area({
						key: "1:weird|area",
						totalPaths: 2,
						suggestedPeople: [
							{ login: "al|ice", roles: [], isMatchingCodeowner: true },
						],
					}),
				]),
				newLogins: [],
				previouslyMentionedLogins: [],
			}),
		);
		expect(body).toContain("weird\\|area");
		expect(body).toContain("al\\|ice");
	});
});
