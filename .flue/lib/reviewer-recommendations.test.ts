import { describe, expect, it } from "vitest";
import { CODEOWNERS_ONLY_CONTACT_PATTERNS } from "./reviewer-contact-policy";
import {
	RECOMMENDATION_COMMENT_MARKER,
	RECOMMENDATIONS_REPO,
	applyClearedState,
	applyEventToState,
	applyUpdatedState,
	emptyResult,
	emptyState,
	isCurrentRecommendationEvent,
	newMentions,
	normalizeLogin,
	parseRecommendationEvent,
	parseRecommendationsMode,
	recommendationCommentBodyHash,
	recommendationDisplayHash,
	recommendationRenderSource,
	renderRecommendationsComment,
	shouldWriteRecommendationComment,
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
		expect(isCurrentRecommendationEvent(first, updatedEvent())).toBe(true);
		expect(
			isCurrentRecommendationEvent(
				first,
				updatedEvent({ resultHash: "different" }),
			),
		).toBe(false);
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
		expect(isCurrentRecommendationEvent(cleared, clearedEvent())).toBe(true);
		expect(
			isCurrentRecommendationEvent(
				cleared,
				clearedEvent({ headSha: "b".repeat(40) }),
			),
		).toBe(false);
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

	it("collects unique suggested logins across uncovered areas", () => {
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
			area({
				key: "3:r2",
				satisfied: true,
				suggestedPeople: [
					{ login: "carol", roles: [], isMatchingCodeowner: true },
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

	it("does not mention suggestions from covered areas", () => {
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
		expect(mentions).toEqual([]);
	});

	it.each(CODEOWNERS_ONLY_CONTACT_PATTERNS)(
		"does not mention suggestions for CODEOWNERS-only pattern %s",
		(codeownersPattern) => {
			const r = result([area({ codeownersPattern })]);
			expect(newMentions(emptyState(), r)).toEqual([]);
		},
	);

	it("uses declared CODEOWNERS instead of suggestions for configured patterns", () => {
		const r = result([
			area({
				key: "12:none",
				product: null,
				codeownersPattern: "/public/__redirects",
				suggestedPeople: [
					{ login: "alice", roles: [], isMatchingCodeowner: true },
					{ login: "bob", roles: [], isMatchingCodeowner: true },
				],
			}),
			area({
				key: "13:workers",
				suggestedPeople: [
					{ login: "Alice", roles: [], isMatchingCodeowner: true },
				],
			}),
		]);

		expect(newMentions(emptyState(), r)).toEqual(["alice"]);
	});
});

describe("shouldWriteRecommendationComment", () => {
	async function writtenState(
		recommendation: RecommendationBoundedResult = result([area()]),
	) {
		const state = {
			...emptyState(),
			eventAt: "2026-09-15T22:55:49.372Z",
			headSha: "a".repeat(40),
			resultHash: "envelope-a",
			status: "complete" as const,
			recommendation,
			lastGoodRecommendation: recommendation,
			commentId: 123,
			commentBodyHash: await recommendationCommentBodyHash("current body"),
			mentionedLogins: ["alice"],
		};
		return {
			...state,
			commentDisplayHash: await recommendationDisplayHash(state),
		};
	}

	it("skips a write when only the event envelope and hidden data changed", async () => {
		const previous = await writtenState();
		const nextRecommendation = {
			...result([
				area({
					suggestedPeople: [
						{
							login: "alice",
							roles: ["different_internal_role"],
							isMatchingCodeowner: false,
						},
					],
				}),
			]),
			warnings: ["not rendered"],
			warningCount: 1,
			overflowCounts: { areas: 0, warnings: 1 },
		};
		const next = {
			...previous,
			eventAt: "2026-09-15T23:00:00.000Z",
			headSha: "b".repeat(40),
			resultHash: "envelope-b",
			recommendation: nextRecommendation,
			lastGoodRecommendation: nextRecommendation,
		};

		await expect(
			shouldWriteRecommendationComment(previous, next, "current body"),
		).resolves.toBe(false);
	});

	it("writes when visible recommendation content changed", async () => {
		const previous = await writtenState();
		const covered = result([
			area({
				satisfied: true,
				satisfyingApprovers: ["bob"],
			}),
		]);
		const next = {
			...previous,
			recommendation: covered,
			lastGoodRecommendation: covered,
		};

		await expect(
			shouldWriteRecommendationComment(previous, next, "current body"),
		).resolves.toBe(true);
	});

	it("ignores hidden suggestion changes for CODEOWNERS-only patterns", async () => {
		const recommendation = result([
			area({
				key: "12:none",
				product: null,
				codeownersPattern: "/public/__redirects",
				codeownersDeclared: [
					"@cloudflare/product-owners",
					"@cloudflare/content-engineering",
				],
			}),
		]);
		const previous = await writtenState(recommendation);
		const changed = result([
			area({
				...recommendation.ownershipAreas[0],
				suggestedPeople: [
					{ login: "bob", roles: [], isMatchingCodeowner: true },
				],
			}),
		]);
		const next = {
			...previous,
			recommendation: changed,
			lastGoodRecommendation: changed,
		};

		await expect(
			shouldWriteRecommendationComment(previous, next, "current body"),
		).resolves.toBe(false);
	});

	it("ignores hidden suggestion changes under the default CODEOWNERS rule", async () => {
		const recommendation = result([
			area({
				key: "2:none",
				product: null,
				samplePaths: ["package.json"],
				codeownersPattern: "*",
				codeownersDeclared: ["@cloudflare/product-owners"],
			}),
		]);
		const previous = await writtenState(recommendation);
		const changed = result([
			area({
				...recommendation.ownershipAreas[0],
				suggestedPeople: [
					{ login: "bob", roles: [], isMatchingCodeowner: true },
				],
			}),
		]);
		const next = {
			...previous,
			recommendation: changed,
			lastGoodRecommendation: changed,
		};

		await expect(
			shouldWriteRecommendationComment(previous, next, "current body"),
		).resolves.toBe(false);
	});

	it("repairs a pre-policy display hash once on replay", async () => {
		const recommendation = result([
			area({
				key: "12:none",
				product: null,
				codeownersPattern: "/public/__redirects",
				codeownersDeclared: [
					"@cloudflare/product-owners",
					"@cloudflare/content-engineering",
				],
			}),
		]);
		const current = await writtenState(recommendation);
		const prePolicyDisplayHash = await recommendationCommentBodyHash(
			JSON.stringify({
				degraded: false,
				result: {
					areaCount: 1,
					ownershipAreas: [
						{
							name: "Workers",
							totalPaths: 3,
							codeownersPattern: "/public/__redirects",
							codeownersDeclared: [
								"@cloudflare/product-owners",
								"@cloudflare/content-engineering",
							],
							contacts: {
								suggestions: ["alice"],
								fallbackOwners: [],
								totalOwners: 0,
							},
							satisfyingApprovers: [],
							satisfied: false,
						},
					],
				},
			}),
		);
		expect(prePolicyDisplayHash).not.toBe(current.commentDisplayHash);
		const prePolicy = {
			...current,
			commentDisplayHash: prePolicyDisplayHash,
		};

		await expect(
			shouldWriteRecommendationComment(prePolicy, prePolicy, "current body"),
		).resolves.toBe(true);
		await expect(
			shouldWriteRecommendationComment(current, current, "current body"),
		).resolves.toBe(false);
	});

	it("writes when log mode advanced state beyond the last comment", async () => {
		const written = await writtenState();
		const changed = result([
			area({
				suggestedPeople: [
					{ login: "bob", roles: [], isMatchingCodeowner: true },
				],
			}),
		]);
		const previous = {
			...written,
			recommendation: changed,
			lastGoodRecommendation: changed,
		};

		await expect(
			shouldWriteRecommendationComment(previous, previous, "current body"),
		).resolves.toBe(true);
	});

	it("writes when the comment is missing, legacy, or externally edited", async () => {
		const previous = await writtenState();
		const legacy = {
			...previous,
			commentBodyHash: undefined,
			commentDisplayHash: undefined,
		};

		await expect(
			shouldWriteRecommendationComment(previous, previous, null),
		).resolves.toBe(true);
		await expect(
			shouldWriteRecommendationComment(legacy, legacy, "current body"),
		).resolves.toBe(true);
		await expect(
			shouldWriteRecommendationComment(previous, previous, "edited body"),
		).resolves.toBe(true);
	});

	it("writes when degraded status changes the rendered warning", async () => {
		const previous = await writtenState();
		const next = {
			...previous,
			status: "error" as const,
			recommendation: emptyResult(),
		};

		await expect(
			shouldWriteRecommendationComment(previous, next, "current body"),
		).resolves.toBe(true);
	});
});

describe("recommendationRenderSource", () => {
	it("uses the latest result for healthy state and last good result for errors", () => {
		const latest = result([area({ key: "latest" })]);
		const lastGood = result([area({ key: "last-good" })]);

		expect(
			recommendationRenderSource({
				...emptyState(),
				status: "complete",
				recommendation: latest,
				lastGoodRecommendation: lastGood,
			}),
		).toEqual({ degraded: false, result: latest });
		expect(
			recommendationRenderSource({
				...emptyState(),
				status: "error",
				recommendation: latest,
				lastGoodRecommendation: lastGood,
			}),
		).toEqual({ degraded: true, result: lastGood });
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
					codeownersDeclared: ["@cloudflare/workers-team", "@alice"],
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
					product: "d1",
					totalPaths: 5,
					codeownersPattern: "/src/content/docs/d1/",
					codeownersDeclared: ["@cloudflare/d1-team"],
					satisfied: true,
					satisfyingApprovers: ["carol"],
					suggestedPeople: [
						{ login: "carol", roles: [], isMatchingCodeowner: true },
					],
				}),
			]),
			newLogins: ["alice", "bob"],
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

	it("leads with review coverage rather than recommendation mechanics", () => {
		const body = renderRecommendationsComment(view());
		expect(body).toContain("## Review coverage");
		expect(body).not.toContain("## Suggested review contacts");
		expect(body).toContain("**workers**");
		expect(body).not.toContain("1:workers");
	});

	it("@-mentions only new contacts for uncovered areas", () => {
		const body = renderRecommendationsComment(view());
		expect(body).toContain("Suggested contacts notified: @alice @bob");
		expect(body).not.toContain("@carol");
	});

	it("renders uncovered suggestions without role metadata", () => {
		const body = renderRecommendationsComment(view());
		expect(body).toContain("`alice`, `bob`");
		expect(body).not.toContain("Product management");
		expect(body).not.toContain("Relevant review history");
	});

	it("shows declared CODEOWNERS instead of suggestors for configured patterns", () => {
		const body = renderRecommendationsComment(
			view({
				recommendation: result([
					area({
						key: "12:none",
						product: null,
						samplePaths: ["public/__redirects"],
						totalPaths: 1,
						codeownersPattern: "/public/__redirects",
						codeownersDeclared: [
							"@cloudflare/product-owners",
							"@cloudflare/content-engineering",
						],
						suggestedPeople: [
							{
								login: "alice",
								roles: ["historical_codeowner"],
								isMatchingCodeowner: true,
							},
						],
					}),
				]),
				newLogins: ["alice"],
				previouslyMentionedLogins: ["alice"],
			}),
		);

		expect(body).toContain("`@cloudflare/product-owners`");
		expect(body).toContain("`@cloudflare/content-engineering`");
		expect(body).toContain(
			"| **Other**<br/><sub>1 file changed</sub><br/>`/public/__redirects` | `@cloudflare/product-owners`, `@cloudflare/content-engineering` | `@cloudflare/product-owners`, `@cloudflare/content-engineering`<br/><sub>CODEOWNERS only · not notified</sub> |",
		);
		expect(body).not.toContain("Suggested contacts notified");
		expect(body).not.toContain("Suggested contacts previously notified");
		expect(body).not.toContain("alice");
	});

	it("shows declared CODEOWNERS instead of suggestors under the default rule", () => {
		const body = renderRecommendationsComment(
			view({
				recommendation: result([
					area({
						key: "2:none",
						product: null,
						samplePaths: ["package.json"],
						totalPaths: 1,
						codeownersPattern: "*",
						codeownersDeclared: ["@cloudflare/product-owners"],
						suggestedPeople: [
							{
								login: "alice",
								roles: ["historical_codeowner"],
								isMatchingCodeowner: true,
							},
						],
					}),
				]),
				newLogins: ["alice"],
				previouslyMentionedLogins: ["alice"],
			}),
		);

		expect(body).toContain("`@cloudflare/product-owners`");
		expect(body).toContain(
			"| **Other**<br/><sub>1 file changed</sub><br/>`*` | `@cloudflare/product-owners` | `@cloudflare/product-owners`<br/><sub>CODEOWNERS only · not notified</sub> |",
		);
		expect(body).not.toContain("Suggested contacts notified");
		expect(body).not.toContain("Suggested contacts previously notified");
		expect(body).not.toContain("alice");
	});

	it("falls back to the expanded CODEOWNERS roster for unsuggested areas without mentioning them", () => {
		const body = renderRecommendationsComment(
			view({
				recommendation: result([
					area({
						key: "1:changelog",
						codeownersPattern: "/src/content/changelog/",
						codeownersDeclared: [
							"@cloudflare/product-owners",
							"@cloudflare/pm-changelogs",
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
		expect(body).toContain("`@cloudflare/product-owners`");
		expect(body).not.toContain("_none_");
		expect(body).not.toContain("@dave");
		expect(body).not.toContain("@erin");
		expect(body).not.toContain("@frank");
		expect(body).not.toContain(
			"Suggested contacts notified: @cloudflare/product-owners",
		);
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

	it("renders an unavailable-contact label when the fallback roster is empty", () => {
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
		expect(body).toContain("_No suggestions_");
		expect(body).not.toContain("5 more");
	});

	it("renders a warning when an area matched no CODEOWNERS rule", () => {
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
		expect(body).toContain("⚠️ _No matching rule_");
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
			"2 additional ownership areas were omitted due to message size",
		);
	});

	it("does not expose internal roles", () => {
		const body = renderRecommendationsComment(view());
		expect(body).not.toContain("product_manager");
		expect(body).not.toContain("historical_codeowner");
		expect(body).not.toContain("Product management");
		expect(body).not.toContain("Relevant review history");
	});

	it("states outstanding approval work directly", () => {
		const body = renderRecommendationsComment(view());
		expect(body).toContain("🟡 **1 ownership area needs approval.**");
	});

	it("uses a success summary when every area is covered", () => {
		const body = renderRecommendationsComment(
			view({
				recommendation: result([
					area({
						product: "d1",
						satisfied: true,
						satisfyingApprovers: ["carol"],
					}),
				]),
				newLogins: [],
			}),
		);
		expect(body).toContain("✅ **The ownership area is covered.**");
		expect(body).not.toContain("| Needs approval |");
	});

	it("does not claim success when every ownership area was omitted", () => {
		const body = renderRecommendationsComment(
			view({
				recommendation: {
					...result([]),
					areaCount: 2,
				},
				newLogins: [],
			}),
		);
		expect(body).toContain("🟡 **Ownership coverage is not fully shown.**");
		expect(body).not.toContain("No ownership approvals are needed");
	});

	it("shows the previous-mentions note when nothing is new", () => {
		const body = renderRecommendationsComment(
			view({
				newLogins: [],
				previouslyMentionedLogins: ["alice", "bob", "carol"],
			}),
		);
		expect(body).toContain("Suggested contacts previously notified");
		expect(body).toContain("`alice`, `bob`");
		expect(body).not.toContain("`carol`._");
	});

	it("marks a degraded render", () => {
		const body = renderRecommendationsComment(view({ degraded: true }));
		expect(body).toContain("could not be refreshed");
	});

	it("renders exact matched CODEOWNERS mappings in a collapsed table", () => {
		const body = renderRecommendationsComment(view());
		expect(body).toContain(
			"<summary>CODEOWNERS mappings for displayed areas (2)</summary>",
		);
		expect(body).toContain("| Pattern | Owners |");
		expect(body).toContain(
			"| `/src/content/docs/workers/` | `@cloudflare/workers-team`, `@alice` |",
		);
		expect(body).toContain(
			"| `/src/content/docs/d1/` | `@cloudflare/d1-team` |",
		);
	});

	it("defensively prevents covered or malformed logins from becoming mentions", () => {
		const body = renderRecommendationsComment(
			view({
				recommendation: result([
					area({
						product: "@unexpected",
						suggestedPeople: [
							{
								login: "alice",
								roles: [],
								isMatchingCodeowner: true,
							},
							{
								login: "bad` @unexpected",
								roles: [],
								isMatchingCodeowner: false,
							},
						],
					}),
					area({
						product: "d1",
						satisfied: true,
						satisfyingApprovers: ["carol"],
						suggestedPeople: [
							{
								login: "carol",
								roles: [],
								isMatchingCodeowner: true,
							},
						],
					}),
				]),
				newLogins: ["alice", "bad` @unexpected", "carol"],
			}),
		);
		expect(body).toContain("Suggested contacts notified: @alice");
		expect(body).not.toContain("notified: @alice @");
		expect(body).not.toContain("@carol");
		expect(body).toContain("**@\u200bunexpected**");
	});

	it("disambiguates duplicate product areas with their matched patterns", () => {
		const body = renderRecommendationsComment(
			view({
				recommendation: result([
					area({
						product: "workers",
						codeownersPattern: "*.ts",
					}),
					area({
						key: "2:workers",
						product: "workers",
						codeownersPattern: "/src/components/",
					}),
				]),
			}),
		);
		expect(body).toContain(
			"**workers**<br/><sub>3 files changed</sub><br/>`*.ts`",
		);
		expect(body).toContain(
			"**workers**<br/><sub>3 files changed</sub><br/>`/src/components/`",
		);
	});

	it("escapes table cells", () => {
		const body = renderRecommendationsComment(
			view({
				recommendation: result([
					area({
						key: "1:weird|area",
						product: "weird|area",
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
