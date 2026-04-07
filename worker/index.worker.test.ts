import { SELF } from "cloudflare:test";
import { describe, it, expect } from "vitest";
import { parse } from "node-html-parser";

describe("Cloudflare Docs", () => {
	describe("html handling", () => {
		it("responds with index.html at `/`", async () => {
			const request = new Request("http://fakehost/");
			const response = await SELF.fetch(request);
			expect(response.status).toBe(200);
			expect(await response.text()).toContain("Cloudflare Docs");
		});

		it("responds with 404.html at `/non-existent`", async () => {
			const request = new Request("http://fakehost/non-existent");
			const response = await SELF.fetch(request);
			expect(response.status).toBe(404);
			expect(await response.text()).toContain("Check the URL,");
		});
	});

	describe("redirects", () => {
		it("redirects requests with a trailing slash", async () => {
			const request = new Request("http://fakehost/docs/");
			const response = await SELF.fetch(request, { redirect: "manual" });
			expect(response.status).toBe(301);
			expect(response.headers.get("Location")).toBe("/directory/");
		});

		it("redirects requests without a trailing slash", async () => {
			const request = new Request("http://fakehost/docs");
			const response = await SELF.fetch(request, { redirect: "manual" });
			expect(response.status).toBe(301);
			expect(response.headers.get("Location")).toBe("/directory/");
		});
	});

	describe("json endpoints", () => {
		it("compatibility flags", async () => {
			const request = new Request(
				"http://fakehost/workers/platform/compatibility-flags.json",
			);
			const response = await SELF.fetch(request);
			expect(response.status).toBe(200);

			const json: any[] = await response.json();
			const urlFlag = json.find((flag) => flag.enable_flag === "url_standard");
			const nodeJsFlag = json.find(
				(flag) => flag.enable_flag === "nodejs_compat",
			);

			expect(urlFlag).toBeDefined();
			expect(urlFlag.experimental).toBe(false);

			expect(nodeJsFlag).toBeDefined();
			expect(nodeJsFlag.enable_date).toBe(null);
		});

		it("pages framework configurations", async () => {
			const request = new Request(
				"http://fakehost/pages/platform/build-configuration.json",
			);
			const response = await SELF.fetch(request);
			expect(response.status).toBe(200);

			const json: any = await response.json();

			const analog = json["analog"];

			expect(analog).toBeDefined();
			expect(analog.icon).toBe("/icons/framework-icons/logo-analog.svg");
		});

		it("pages build image language and tools", async () => {
			const request = new Request(
				"http://fakehost/pages/platform/language-support-and-tools.json",
			);
			const response = await SELF.fetch(request);
			expect(response.status).toBe(200);

			const json: any[] = await response.json();

			const v1 = json.find((x) => x.major_version === 1);
			const v2 = json.find((x) => x.major_version === 2);

			expect(v1).toBeDefined();
			expect(v2).toBeDefined();

			const v1NodeJs = v1.languages.find((x: any) => x.name === "Node.js");
			const v2NodeJs = v2.languages.find((x: any) => x.name === "Node.js");

			expect(v1NodeJs).toBeDefined();
			expect(v1NodeJs.default).toBe("12.18.0");
			expect(v1NodeJs.file).toContain(".nvmrc");

			expect(v2NodeJs).toBeDefined();
			expect(v2NodeJs.default).toBe("18.17.1");
			expect(v2NodeJs.file).toContain(".nvmrc");
		});
	});

	describe("rss endpoints", () => {
		describe("changelog", () => {
			it("global", async () => {
				const request = new Request("http://fakehost/changelog/rss/index.xml");
				const response = await SELF.fetch(request);

				expect(response.status).toBe(200);

				const xml = await response.text();

				expect(xml).toContain("<title>Cloudflare changelogs</title>");
				expect(xml).toContain(
					"<title>Access - New SAML and OIDC Fields and SAML transforms for Access for SaaS</title>",
				);
				expect(xml).toContain("<product>Access</product>");
				expect(xml).toContain("<category>Access</category>");
				expect(xml).toContain(
					"<pubDate>Mon, 03 Mar 2025 00:00:00 GMT</pubDate>",
				);
			});
		});
	});

	describe("llms", () => {
		it("llms.txt", async () => {
			const request = new Request("http://fakehost/llms.txt");
			const response = await SELF.fetch(request);

			expect(response.status).toBe(200);

			const text = await response.text();
			expect(text).toContain("# Cloudflare Developer Documentation");
		});

		it("index.md requests preserve markdown through redirects", async () => {
			// /learning-paths/ redirects to /resources/ — an index.md request
			// should redirect to /resources/index.md, not the HTML page.
			const request = new Request("http://fakehost/learning-paths/index.md");
			const response = await SELF.fetch(request, { redirect: "manual" });

			expect(response.status).toBe(301);
			expect(response.headers.get("Location")).toBe("/resources/index.md");
		});

		it("index.md requests for non-redirected paths pass through", async () => {
			const request = new Request("http://fakehost/workers/index.md");
			const response = await SELF.fetch(request);

			// Should not be a redirect — just serve normally via ASSETS
			expect(response.status).not.toBe(301);
		});
	});

	describe("head tags", async () => {
		describe("/workers/", async () => {
			const request = new Request("http://fakehost/workers/");
			const response = await SELF.fetch(request);
			expect(response.status).toBe(200);

			const html = await response.text();
			const dom = parse(html);

			it("meta tags", () => {
				const product = dom.querySelector("meta[name='pcx_product']")
					?.attributes.content;

				const group = dom.querySelector("meta[name='pcx_content_group']")
					?.attributes.content;

				const content_type = dom.querySelector("meta[name='pcx_content_type']")
					?.attributes.content;

				expect(product).toBe("Workers");
				expect(group).toBe("Developer platform");
				expect(content_type).toBe("Overview");
			});

			it("index.md rel='alternate' tag", () => {
				const markdown = dom.querySelector(
					"link[rel='alternate'][type='text/markdown']",
				)?.attributes.href;

				expect(markdown).toBe(
					"https://developers.cloudflare.com/workers/index.md",
				);
			});

			it("og:image tag", () => {
				const image = dom.querySelector("meta[property='og:image']")?.attributes
					.content;

				expect(image).toBe(
					"https://developers.cloudflare.com/dev-products-preview.png",
				);
			});
		});

		describe("/changelog/ entry content types", async () => {
			const request = new Request(
				"http://fakehost/changelog/post/2025-03-03-saml-oidc-fields-saml-transformations/",
			);
			const response = await SELF.fetch(request);
			expect(response.status).toBe(200);

			const html = await response.text();
			const dom = parse(html);

			it("correct meta tags", () => {
				const product = dom.querySelector("meta[name='pcx_product']")
					?.attributes.content;

				const group = dom.querySelector("meta[name='pcx_content_group']")
					?.attributes.content;

				const content_type = dom.querySelector("meta[name='pcx_content_type']")
					?.attributes.content;

				expect(product).toBe("Access");
				expect(group).toBe("Cloudflare One");
				expect(content_type).toBe("Changelog entry");
			});
		});
	});
});
