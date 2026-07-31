import { SELF } from "cloudflare:test";
import { describe, it, expect } from "vitest";
import { parse } from "node-html-parser";

const ROBOTS_POLICY = "noindex, nofollow, noarchive, nosnippet, noimageindex";

describe("Preview anti-indexing", () => {
	describe("robots.txt", () => {
		it("returns Disallow: / with no AI content signals", async () => {
			const response = await SELF.fetch(
				new Request("http://fakehost/robots.txt"),
			);
			expect(response.status).toBe(200);
			expect(response.headers.get("X-Robots-Tag")).toBe(ROBOTS_POLICY);

			const text = await response.text();
			expect(text).toContain("User-agent: *");
			expect(text).toContain("Disallow: /");
			expect(text).toContain("ai-train=no");
			expect(text).toContain("search=no");
			expect(text).toContain("ai-input=no");
		});

		it("does not contain the production sitemap line", async () => {
			const response = await SELF.fetch(
				new Request("http://fakehost/robots.txt"),
			);
			const text = await response.text();
			expect(text).not.toContain("Sitemap:");
			expect(text).not.toContain("Allow: /");
		});
	});

	describe("X-Robots-Tag header", () => {
		it("is present on HTML pages", async () => {
			const response = await SELF.fetch(
				new Request("http://fakehost/workers/"),
			);
			expect(response.status).toBe(200);
			expect(response.headers.get("X-Robots-Tag")).toBe(ROBOTS_POLICY);
		});

		it("is present on 404 pages", async () => {
			const response = await SELF.fetch(
				new Request("http://fakehost/non-existent"),
			);
			expect(response.status).toBe(404);
			expect(response.headers.get("X-Robots-Tag")).toBe(ROBOTS_POLICY);
		});

		it("is present on redirect responses", async () => {
			const response = await SELF.fetch(new Request("http://fakehost/docs/"), {
				redirect: "manual",
			});
			expect(response.status).toBe(301);
			expect(response.headers.get("X-Robots-Tag")).toBe(ROBOTS_POLICY);
		});

		it("is present on JSON endpoints", async () => {
			const response = await SELF.fetch(
				new Request(
					"http://fakehost/workers/platform/compatibility-flags.json",
				),
			);
			expect(response.status).toBe(200);
			expect(response.headers.get("X-Robots-Tag")).toBe(ROBOTS_POLICY);
		});

		it("is present on RSS endpoints", async () => {
			const response = await SELF.fetch(
				new Request("http://fakehost/changelog/rss/index.xml"),
			);
			expect(response.status).toBe(200);
			expect(response.headers.get("X-Robots-Tag")).toBe(ROBOTS_POLICY);
		});

		it("is present on llms.txt", async () => {
			const response = await SELF.fetch(
				new Request("http://fakehost/llms.txt"),
			);
			expect(response.status).toBe(200);
			expect(response.headers.get("X-Robots-Tag")).toBe(ROBOTS_POLICY);
		});
	});

	describe("HTML meta robots tag", () => {
		it("is injected into HTML pages", async () => {
			const response = await SELF.fetch(
				new Request("http://fakehost/workers/"),
			);
			expect(response.status).toBe(200);

			const html = await response.text();
			const dom = parse(html);

			const meta = dom.querySelector("meta[name='robots']");
			expect(meta).toBeDefined();
			expect(meta?.attributes.content).toBe(ROBOTS_POLICY);
		});

		it("is injected into 404 HTML pages", async () => {
			const response = await SELF.fetch(
				new Request("http://fakehost/non-existent"),
			);
			expect(response.status).toBe(404);

			const html = await response.text();
			const dom = parse(html);

			const metas = dom.querySelectorAll("meta[name='robots']");
			const hasFullPolicy = metas.some(
				(m) => m.attributes.content === ROBOTS_POLICY,
			);
			expect(hasFullPolicy).toBe(true);
		});
	});

	describe("sitemap blocking", () => {
		it("returns 404 for /sitemap-index.xml", async () => {
			const response = await SELF.fetch(
				new Request("http://fakehost/sitemap-index.xml"),
			);
			expect(response.status).toBe(404);
			expect(response.headers.get("X-Robots-Tag")).toBe(ROBOTS_POLICY);
		});

		it("returns 404 for /sitemap-0.xml", async () => {
			const response = await SELF.fetch(
				new Request("http://fakehost/sitemap-0.xml"),
			);
			expect(response.status).toBe(404);
			expect(response.headers.get("X-Robots-Tag")).toBe(ROBOTS_POLICY);
		});
	});
});
