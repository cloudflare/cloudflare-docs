import { beforeEach, describe, expect, it, vi } from "vitest";
import {
	BOT_COMMENT_MARKER,
	bumpLevel,
	escapeText,
	findExistingBotComment,
	renderComment,
	type DependabotReviewResult,
} from "./dependabot-review";

const github = vi.hoisted(() => ({ getIssueComments: vi.fn() }));
vi.mock("./github", () => github);

describe("findExistingBotComment", () => {
	beforeEach(() => vi.clearAllMocks());
	it("selects the newest valid bot comment", async () => {
		const first = {
			id: 1,
			body: `${BOT_COMMENT_MARKER}\nfirst`,
			user: { type: "Bot" },
		};
		const latest = {
			id: 2,
			body: `${BOT_COMMENT_MARKER}\nlatest`,
			user: { type: "Bot" },
		};
		github.getIssueComments.mockResolvedValue([first, latest]);
		expect(await findExistingBotComment("token", 1)).toBe(latest);
	});
	it("ignores human spoofing and quoted bot markers", async () => {
		const valid = {
			id: 1,
			body: `${BOT_COMMENT_MARKER}\nvalid`,
			user: { type: "Bot" },
		};
		github.getIssueComments.mockResolvedValue([
			valid,
			{ id: 2, body: BOT_COMMENT_MARKER, user: { type: "User" } },
			{ id: 3, body: `> ${BOT_COMMENT_MARKER}`, user: { type: "Bot" } },
		]);
		expect(await findExistingBotComment("token", 1)).toBe(valid);
	});
});

type Pkg = DependabotReviewResult["packageReviews"][number];

function pkg(name: string, risk: Pkg["risk"], extra: Partial<Pkg> = {}): Pkg {
	return {
		name,
		from: "1.0.0",
		to: "1.0.1",
		risk,
		why: "reason",
		changes: [],
		usedIn: [],
		...extra,
	};
}

function result(
	packages: Pkg[],
	extra: Partial<DependabotReviewResult> = {},
): DependabotReviewResult {
	return {
		recommendation: "merge",
		headline: "All additive.",
		checks: [],
		packageReviews: packages,
		...extra,
	};
}

describe("bumpLevel", () => {
	it("classifies bumps", () => {
		expect(bumpLevel("1.2.3", "2.0.0")).toBe("major");
		expect(bumpLevel("1.2.3", "1.3.0")).toBe("minor");
		expect(bumpLevel("1.2.3", "1.2.4")).toBe("patch");
		expect(bumpLevel("5.20260921.1", "5.20260928.1")).toBe("minor");
		expect(bumpLevel("abc", "1.0.0")).toBe("other");
	});
});

describe("escapeText", () => {
	it("escapes pipes, html, and newlines outside code spans", () => {
		expect(escapeText("a | b <i>\nc")).toBe("a \\| b &lt;i&gt; c");
		expect(escapeText("`a|b`")).toBe("`a\\|b`");
	});
	it("removes the bot marker", () => {
		expect(escapeText(`x ${BOT_COMMENT_MARKER}`)).not.toContain(
			BOT_COMMENT_MARKER,
		);
	});
});

describe("renderComment", () => {
	it("keeps exactly one marker", () => {
		const body = renderComment(
			result([pkg("a", "low", { why: BOT_COMMENT_MARKER })], {
				headline: BOT_COMMENT_MARKER,
			}),
			1,
		);
		expect(body.split(BOT_COMMENT_MARKER)).toHaveLength(2);
	});

	it("omits the checks section when there are none", () => {
		const body = renderComment(result([pkg("a", "low")]), 1);
		expect(body).not.toContain("Before merging");
		expect(body).toContain("**\u2705 Merge**");
	});

	it("renders checks as a task list and counts them", () => {
		const body = renderComment(
			result([pkg("a", "medium")], {
				recommendation: "merge-verify",
				checks: [{ package: "a", action: "Open page", where: "/x/" }],
			}),
			1,
		);
		expect(body).toContain("### Before merging");
		expect(body).toContain("- [ ] `a`: Open page \u00b7 /x/");
		expect(body).toContain("1 to check");
	});

	it("sorts by risk and keeps small sets in one table", () => {
		const body = renderComment(
			result([pkg("low-pkg", "low"), pkg("high-pkg", "high")]),
			1,
		);
		expect(body.indexOf("high-pkg")).toBeLessThan(body.indexOf("low-pkg"));
		expect(body).not.toContain("low-risk package");
	});

	it("collapses low-risk rows above the threshold", () => {
		const packages = [
			pkg("med", "medium"),
			...Array.from({ length: 6 }, (_, i) => pkg(`low${i}`, "low")),
		];
		const body = renderComment(result(packages), 1);
		expect(body).toContain("<summary>6 low-risk packages</summary>");
		const [top] = body.split("<details>");
		expect(top).toContain("`med`");
		expect(top).not.toContain("`low0`");
	});

	it("counts breaking and security changes and renders change tables", () => {
		const body = renderComment(
			result([
				pkg("a", "high", {
					usedIn: ["src/a.ts"],
					changes: [
						{ kind: "breaking", text: "Removed x", affectsUs: "Yes: x used" },
						{ kind: "security", text: "GHSA-1", affectsUs: "No" },
					],
				}),
			]),
			1,
		);
		expect(body).toContain("1 breaking");
		expect(body).toContain("1 security");
		expect(body).toContain(
			"| Removed x | \ud83d\udca5 breaking | Yes: x used |",
		);
		expect(body).toContain("Used in: `src/a.ts`");
	});
});
