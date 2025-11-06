import { SELF } from "cloudflare:test";
import { describe, it, expect } from "vitest";
import { XMLParser } from "fast-xml-parser";
import { parse } from "node-html-parser";

describe("Cloudflare Docs", () => {
	describe("html handling", () => {
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

		it("redirects /workers/index.html.md to /workers/index.md", async () => {
			const request = new Request("http://fakehost/workers/index.html.md");
			const response = await SELF.fetch(request, { redirect: "manual" });

			expect(response.status).toBe(301);
			expect(response.headers.get("Location")).toBe("/workers/index.md");
		});

		it("redirects /fundamentals/setup/manage-domains/remove-domain/index.md to /fundamentals/manage-domains/remove-domain/index.md", async () => {
			const request = new Request(
				"http://fakehost/fundamentals/setup/manage-domains/remove-domain/index.md",
			);
			const response = await SELF.fetch(request, { redirect: "manual" });

			expect(response.status).toBe(301);
			expect(response.headers.get("Location")).toBe(
				"/fundamentals/manage-domains/remove-domain/index.md",
			);
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
		const parser = new XMLParser();

		describe("changelog", () => {
			it("global", async () => {
				const request = new Request("http://fakehost/changelog/rss/index.xml");
				const response = await SELF.fetch(request);

				expect(response.status).toBe(200);

				const xml = await response.text();
				const parsed = parser.parse(xml);
				const { channel } = parsed.rss;

				expect(channel.title).toBe("Cloudflare changelogs");

				const item = channel.item.find(
					(item: any) =>
						item.title ===
						"Access - New SAML and OIDC Fields and SAML transforms for Access for SaaS",
				);

				expect(item).toBeDefined();
				expect(item.product).toBe("Access");
				expect(item.category).toBe("Access");
				expect(item.pubDate).toBe("Mon, 03 Mar 2025 00:00:00 GMT");
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
	});

	describe("index.md handling", () => {
		it("style-guide fixture", async () => {
			const request = new Request(
				"http://fakehost/style-guide/fixtures/markdown/index.md",
			);
			const response = await SELF.fetch(request);

			expect(response.status).toBe(200);
			expect(response.headers.get("x-robots-tag")).toBe("noindex");

			const text = await response.text();
			expect(text).toMatchInlineSnapshot(`
				"---
				title: Markdown · Cloudflare Style Guide
				description: "The HTML generated by this file is used as a test fixture for our
				  Markdown generation:"
				lastUpdated: 2025-01-01T00:00:00.000Z
				chatbotDeprioritize: true
				source_url:
				  html: http://fakehost/style-guide/fixtures/markdown/
				  md: http://fakehost/style-guide/fixtures/markdown/index.md
				---

				The HTML generated by this file is used as a test fixture for our Markdown generation:

				* mdx

				  \`\`\`mdx
				  test
				  \`\`\`

				* md

				  \`\`\`md
				  test
				  \`\`\`
				"
			`);
		});

		it("responds with 404.html at `/non-existent/index.md`", async () => {
			const request = new Request("http://fakehost/non-existent/index.md");
			const response = await SELF.fetch(request);
			expect(response.status).toBe(404);
			expect(await response.text()).toContain("Check the URL,");
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

		describe("/style-guide/fixtures/markdown/", async () => {
			const request = new Request(
				"http://fakehost/style-guide/fixtures/markdown/",
			);
			const response = await SELF.fetch(request);
			expect(response.status).toBe(200);

			const html = await response.text();
			const dom = parse(html);

			it("title", () => {
				const title = dom.querySelector("title")?.textContent;

				expect(title).toMatchInlineSnapshot(
					`"Markdown · Cloudflare Style Guide"`,
				);
			});

			it("description", () => {
				const desc = dom.querySelector("meta[name='description']")?.attributes
					.content;

				const og = dom.querySelector("meta[property='og:description']")
					?.attributes.content;

				expect(desc).toMatchInlineSnapshot(
					`"The HTML generated by this file is used as a test fixture for our Markdown generation:"`,
				);
				expect(og).toMatchInlineSnapshot(
					`"The HTML generated by this file is used as a test fixture for our Markdown generation:"`,
				);
			});
		});
		describe("/changelog/ entry content types", async () => {
			const request = new Request(
				"http://fakehost/changelog/2025-03-03-saml-oidc-fields-saml-transformations/",
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
