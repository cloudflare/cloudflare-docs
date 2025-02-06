import { SELF } from "cloudflare:test";
import { describe, it, expect } from "vitest";

describe("Cloudflare Docs", () => {
	it("responds with index.html at `/`", async () => {
		const request = new Request("http://fakehost/");
		const response = await SELF.fetch(request);
		expect(response.status).toBe(200);
		expect(await response.text()).toContain("Cloudflare Docs");
	});

	// Remove once the whacky double-slash rules get removed
	it("responds with index.html at `//`", async () => {
		const request = new Request("http://fakehost//");
		const response = await SELF.fetch(request);
		expect(response.status).toBe(200);
		expect(await response.text()).toContain("Cloudflare Docs");
	});

	it("redirects requests with a trailing slash", async () => {
		const request = new Request("http://fakehost/docs/");
		const response = await SELF.fetch(request, { redirect: "manual" });
		expect(response.status).toBe(301);
		expect(response.headers.get("Location")).toBe("/products/");
	});

	it("redirects requests without a trailing slash", async () => {
		const request = new Request("http://fakehost/docs");
		const response = await SELF.fetch(request, { redirect: "manual" });
		expect(response.status).toBe(301);
		expect(response.headers.get("Location")).toBe("/products/");
	});

	it("redirects /changelog/index.xml to /release-notes/index.xml", async () => {
		const request = new Request("http://fakehost/changelog/index.xml");
		const response = await SELF.fetch(request, { redirect: "manual" });
		expect(response.status).toBe(301);
		expect(response.headers.get("Location")).toBe("/release-notes/index.xml");
	});

	it("redirects /changelog-next/ to /changelog/", async () => {
		const request = new Request("http://fakehost/changelog-next/");
		const response = await SELF.fetch(request, { redirect: "manual" });
		expect(response.status).toBe(301);
		expect(response.headers.get("Location")).toBe("/changelog/");
	});

	it("redirects /changelog-next/rss.xml to /changelog/rss.xml", async () => {
		const request = new Request("http://fakehost/changelog-next/rss.xml");
		const response = await SELF.fetch(request, { redirect: "manual" });

		expect(response.status).toBe(301);
		expect(response.headers.get("Location")).toBe("/changelog/rss.xml");
	});

	it("responds with 404.html at `/non-existent`", async () => {
		const request = new Request("http://fakehost/non-existent");
		const response = await SELF.fetch(request);
		expect(response.status).toBe(404);
		expect(await response.text()).toContain("Page not found.");
	});
});
