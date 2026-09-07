import { describe, expect, test } from "vitest";

import { formatPage, normalizeForIndexMd } from "./llms-txt";

// Mirrors the module-default resolveRedirect passthrough for tests that
// don't care about __redirects.
const passthrough = (p: string) => p;

const page = (over: Partial<Parameters<typeof formatPage>[1]> = {}) =>
	({
		id: "workers/get-started/guide",
		data: { title: "Guide", ...over.data },
	}) as Parameters<typeof formatPage>[1];

describe("normalizeForIndexMd", () => {
	test("adds a trailing slash to a bare path", () => {
		expect(normalizeForIndexMd("/analytics/analytics-engine")).toEqual({
			path: "/analytics/analytics-engine/",
			fragment: "",
		});
	});

	test("keeps an existing trailing slash", () => {
		expect(normalizeForIndexMd("/hyperdrive/")).toEqual({
			path: "/hyperdrive/",
			fragment: "",
		});
	});

	test("splits a fragment and keeps it for re-attachment after index.md", () => {
		expect(
			normalizeForIndexMd(
				"/workers-ai/get-started/workers-wrangler/#2-connect-your-worker-to-workers-ai",
			),
		).toEqual({
			path: "/workers-ai/get-started/workers-wrangler/",
			fragment: "#2-connect-your-worker-to-workers-ai",
		});
	});
});

describe("formatPage", () => {
	test("regular page: id-based path gets index.md", () => {
		expect(formatPage("https://example.com", page(), passthrough)).toBe(
			"- [Guide](https://example.com/workers/get-started/guide/index.md)",
		);
	});

	test("external_link without trailing slash: no more Xindex.md concatenation", () => {
		expect(
			formatPage(
				"https://example.com",
				page({
					data: { title: "AE", external_link: "/analytics/analytics-engine" },
				}),
				passthrough,
			),
		).toBe("- [AE](https://example.com/analytics/analytics-engine/index.md)");
	});

	test("external_link with fragment: index.md lands before the anchor", () => {
		const out = formatPage(
			"https://example.com",
			page({
				data: {
					title: "AI",
					external_link:
						"/workers-ai/get-started/workers-wrangler/#2-connect-your-worker-to-workers-ai",
				},
			}),
			passthrough,
		);
		expect(out).toBe(
			"- [AI](https://example.com/workers-ai/get-started/workers-wrangler/index.md#2-connect-your-worker-to-workers-ai)",
		);
	});

	test("description is appended after the link", () => {
		const out = formatPage(
			"https://example.com",
			page({
				data: { title: "AE", description: "Store and query analytics." },
			}),
			passthrough,
		);
		expect(out).toBe(
			"- [AE](https://example.com/workers/get-started/guide/index.md): Store and query analytics.",
		);
	});

	test("redirect-resolved paths are normalized too (harness parity)", () => {
		const resolve = (p: string) => (p === "/sandbox-sdk/" ? "/sandbox/" : p);
		expect(
			formatPage(
				"https://example.com",
				page({ data: { title: "Sandbox", external_link: "/sandbox-sdk/" } }),
				resolve,
			),
		).toBe("- [Sandbox](https://example.com/sandbox/index.md)");
	});

	test("invariants: no Xindex.md and no in-fragment index.md in output", () => {
		const cases = [
			page(),
			page({
				data: { title: "AE", external_link: "/analytics/analytics-engine" },
			}),
			page({
				data: {
					title: "AI",
					external_link: "/workers-ai/get-started/workers-wrangler/#2-connect",
				},
			}),
		];
		for (const c of cases) {
			const out = formatPage("https://example.com", c, passthrough);
			expect(out).not.toMatch(/[a-z]index\.md/);
			expect(out).not.toMatch(/#[a-z0-9-]*index\.md/);
		}
	});
});
