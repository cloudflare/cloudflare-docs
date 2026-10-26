import { afterEach, describe, expect, it, vi } from "vitest";

const gh = vi.hoisted(() => ({
	listCommitsForPath: vi.fn().mockResolvedValue([]),
	getPullRequestFiles: vi.fn(),
}));
vi.mock("./github", () => ({ REPO: "cloudflare/cloudflare-docs", ...gh }));

import {
	checkQuotes,
	collectDocsPage,
	collectPullRequestDiffs,
	excerptPage,
	extractQuotes,
	keywords,
} from "./docs-evidence";

const PAGE = `---
title: Limits
---
# Limits

Last updated Oct 1, 2026

Intro about Workers limits.

## Memory

Each isolate can use up to **128 MB** of memory.

## CPU time

CPU time is limited per request.

## Subrequests

Fifty subrequests per request.
`;

afterEach(() => vi.unstubAllGlobals());

describe("extractQuotes", () => {
	it("joins consecutive quote lines, skips headings and short quotes, max 3", () => {
		const body = [
			"> Workers have 64 MB of memory per isolate today.",
			"text",
			"> ## Heading",
			"> short",
			">> nested quote that is long enough to count here",
			"",
			"> third quote that is definitely long enough",
			"",
			"> fourth quote that is also long enough to count",
		].join("\n");
		expect(extractQuotes(body)).toEqual([
			"Workers have 64 MB of memory per isolate today.",
			"short nested quote that is long enough to count here",
			"third quote that is definitely long enough",
		]);
	});
});

describe("checkQuotes", () => {
	it("ignores formatting differences", () => {
		expect(checkQuotes(["use up to 128 MB of memory", "64 MB"], PAGE)).toEqual([
			{ quote: "use up to 128 MB of memory", found: true },
			{ quote: "64 MB", found: false },
		]);
	});
});

describe("excerptPage", () => {
	it("keeps the intro and the best-matching sections in order", () => {
		const ex = excerptPage(PAGE, "", keywords("memory isolate"), 140);
		expect(ex.title).toBe("Limits");
		expect(ex.lastUpdated).toBe("Oct 1, 2026");
		expect(ex.excerpt).toContain("128 MB");
		expect(ex.excerpt).not.toContain("Fifty subrequests");
		expect(ex.total).toBe(4);
		expect(ex.shown).toBeLessThan(ex.total);
	});

	it("always includes the anchored section", () => {
		const ex = excerptPage(PAGE, "subrequests", keywords("memory"), 160);
		expect(ex.excerpt).toContain("Fifty subrequests");
	});
});

function stubFetch(responses: Record<string, Response>) {
	vi.stubGlobal(
		"fetch",
		vi.fn(
			async (url: string) =>
				responses[url] ?? new Response("", { status: 404 }),
		),
	);
}
const md = (text: string) =>
	new Response(text, { headers: { "content-type": "text/markdown" } });

describe("collectDocsPage", () => {
	const opts = {
		kw: keywords("memory"),
		budget: 4000,
		since: "2026-01-01",
		quotes: ["Workers have 64 MB of memory"],
	};

	it("reads the page, checks quotes and finds source commits", async () => {
		stubFetch({
			"https://developers.cloudflare.com/workers/platform/limits/index.md":
				md(PAGE),
		});
		gh.listCommitsForPath.mockResolvedValueOnce([]).mockResolvedValueOnce([
			{
				sha: "abcdef123",
				commit: {
					message: "Bump memory\n\nbody",
					committer: { date: "2026-09-30T00:00:00Z" },
				},
			},
		]);
		const p = await collectDocsPage(
			"t",
			"https://developers.cloudflare.com/workers/platform/limits/",
			opts,
		);
		expect(p).toMatchObject({
			status: "ok",
			title: "Limits",
			sourcePath: "src/content/docs/workers/platform/limits/index.mdx",
			sourceFound: true,
			commits: [{ sha: "abcdef1", message: "Bump memory", date: "2026-09-30" }],
			quoteChecks: [{ quote: "Workers have 64 MB of memory", found: false }],
		});
	});

	it("finds the source file when it has no recent commits", async () => {
		stubFetch({
			"https://developers.cloudflare.com/kv/api/index.md": md(PAGE),
			"https://raw.githubusercontent.com/cloudflare/cloudflare-docs/production/src/content/docs/kv/api.mdx":
				new Response("---", { status: 206 }),
		});
		const p = await collectDocsPage(
			"t",
			"https://developers.cloudflare.com/kv/api/",
			opts,
		);
		expect(p).toMatchObject({
			sourcePath: "src/content/docs/kv/api.mdx",
			sourceFound: true,
			commits: [],
		});
	});

	it("marks generated pages (no .mdx) as source not found", async () => {
		stubFetch({
			"https://developers.cloudflare.com/workers-ai/models/x/index.md":
				md(PAGE),
		});
		const p = await collectDocsPage(
			"t",
			"https://developers.cloudflare.com/workers-ai/models/x/",
			opts,
		);
		expect(p).toMatchObject({ sourcePath: null, sourceFound: false });
	});

	it("follows redirects and marks the page moved", async () => {
		stubFetch({
			"https://developers.cloudflare.com/old/index.md": new Response(null, {
				status: 301,
				headers: { location: "/new/" },
			}),
			"https://developers.cloudflare.com/new/index.md": md(PAGE),
		});
		const p = await collectDocsPage(
			"t",
			"https://developers.cloudflare.com/old/",
			opts,
		);
		expect(p).toMatchObject({
			status: "moved",
			url: "https://developers.cloudflare.com/new/",
		});
	});

	it("reports a missing page", async () => {
		stubFetch({});
		const p = await collectDocsPage(
			"t",
			"https://developers.cloudflare.com/gone/",
			opts,
		);
		expect(p.status).toBe("not_found");
	});

	it("never throws when GitHub fails", async () => {
		stubFetch({ "https://developers.cloudflare.com/a/index.md": md(PAGE) });
		gh.listCommitsForPath.mockRejectedValueOnce(new Error("500"));
		const p = await collectDocsPage(
			"t",
			"https://developers.cloudflare.com/a/",
			opts,
		);
		expect(p.excerpt).toContain("128 MB");
	});
});

describe("collectPullRequestDiffs", () => {
	it("diffs merged then open same-repo PRs, skipping closed and other repos", async () => {
		gh.getPullRequestFiles.mockImplementation(async (_t: string, n: number) => [
			{
				filename: `src/content/docs/p${n}.mdx`,
				status: "modified",
				additions: 1,
				deletions: 1,
				patch: `+pr ${n}`,
			},
			{ filename: "image.png", status: "added", additions: 0, deletions: 0 },
		]);
		const out = await collectPullRequestDiffs("t", [
			{
				number: 1,
				title: "",
				repo: "cloudflare/cloudflare-docs",
				state: "closed",
				merged: false,
			},
			{
				number: 2,
				title: "",
				repo: "cloudflare/cloudflare-docs",
				state: "open",
				merged: false,
			},
			{
				number: 3,
				title: "",
				repo: "cloudflare/workerd",
				state: "closed",
				merged: true,
			},
			{
				number: 4,
				title: "",
				repo: "cloudflare/cloudflare-docs",
				state: "closed",
				merged: true,
			},
		]);
		expect(out.map((d) => d.number)).toEqual([4, 2]);
		expect(out[0].patch).toBe("--- src/content/docs/p4.mdx\n+pr 4");
	});
});
