import { fetchMock, SELF } from "cloudflare:test";
import { describe, it, expect, beforeAll, afterEach } from "vitest";
import puppeteer, { Browser, HTTPRequest } from "@cloudflare/puppeteer";
import { inject } from "vitest";

const interceptRequest = async (request: HTTPRequest) => {
	const miniflareRequest = new Request(request.url(), {
		method: request.method(),
		body: request.postData(),
	});
	const response = await SELF.fetch(miniflareRequest);
	const arrayBuffer = await response.arrayBuffer();

	await request.respond({
		body: Buffer.from(arrayBuffer),
		headers: Object.fromEntries(response.headers.entries()),
		status: response.status,
	});
};

describe("Cloudflare Docs", () => {
	let browser: Browser;

	beforeAll(async () => {
		fetchMock.activate();
		fetchMock.disableNetConnect();

		browser = await puppeteer.connect({
			browserWSEndpoint: inject("browserWSEndpoint"),
		});
	});

	afterEach(() => {
		fetchMock.assertNoPendingInterceptors();
	});

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

	it("responds with 404.html at `/non-existent`", async () => {
		const request = new Request("http://fakehost/non-existent");
		const response = await SELF.fetch(request);
		expect(response.status).toBe(404);
		expect(await response.text()).toContain("Page not found.");
	});

	it("works in Chrome", async () => {
		const page = await browser.newPage();

		page.setRequestInterception(true);
		page.on("request", interceptRequest);

		await page.goto("http://developers.cloudflare.com/workers");

		const textSelector = await page.locator("text/Cloudflare").waitHandle();
		const fullTitle = await textSelector?.evaluate((el) => el.textContent);
		expect(fullTitle).toContain("Cloudflare Docs");
	});
});
