import { fetchMock, SELF } from "cloudflare:test";
import { describe, it, expect, beforeAll, afterEach } from "vitest";
import openAPISchema from "./fixtures/openapi.json";
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

	it("responds with API schema at `/schema`", async () => {
		fetchMock
			.get("https://raw.githubusercontent.com")
			.intercept({ path: "/cloudflare/api-schemas/main/openapi.json" })
			.reply(200, JSON.stringify(openAPISchema));

		const request = new Request("http://fakehost/schema");
		const response = await SELF.fetch(request);
		expect(response.headers.get("Content-Type")).toBe("application/json");
		const data = (await response.json()) as any;
		expect(Object.keys(data)).toMatchInlineSnapshot(`
			[
			  "components",
			  "info",
			  "openapi",
			  "paths",
			  "security",
			  "servers",
			]
		`);
	});

	it("responds with API docs files at `/api/*`", async () => {
		const mockContents = `const some = 'js';`;

		fetchMock
			.get("https://cloudflare-api-docs-frontend.pages.dev")
			.intercept({
				path: (p) => {
					return p === "//static/js/file.js";
				},
			})
			.reply(200, mockContents);

		const request = new Request("http://fakehost/api/static/js/file.js");
		const response = await SELF.fetch(request);
		expect(await response.text()).toEqual(mockContents);
	});
});
