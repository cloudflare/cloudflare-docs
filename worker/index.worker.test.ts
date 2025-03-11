import { SELF } from "cloudflare:test";
import { describe, it, expect } from "vitest";
import { XMLParser } from "fast-xml-parser";

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
			expect(await response.text()).toContain("Page not found.");
		});
	});

	describe("redirects", () => {
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
				expect(item.pubDate).toBe("Mon, 03 Mar 2025 06:00:00 GMT");
			});

			it("legacy global", async () => {
				const request = new Request("http://fakehost/release-notes/index.xml");
				const response = await SELF.fetch(request);

				expect(response.status).toBe(200);

				const xml = await response.text();
				const parsed = parser.parse(xml);
				const { channel } = parsed.rss;

				expect(channel.title).toBe("Cloudflare release notes");

				const item = channel.item.find(
					(item: any) => item.title === "WAF - 2025-02-24",
				);

				expect(item).toBeDefined();
				expect(item.product).toBe("WAF");
				expect(item.pubDate).toBe("Mon, 24 Feb 2025 00:00:00 GMT");
			});

			it("legacy product-specific", async () => {
				const request = new Request("http://fakehost/waf/change-log/index.xml");
				const response = await SELF.fetch(request);

				expect(response.status).toBe(200);

				const xml = await response.text();
				const parsed = parser.parse(xml);
				const { channel } = parsed.rss;

				expect(channel.title).toBe("Changelog | WAF");

				const item = channel.item.find(
					(item: any) => item.title === "WAF - 2025-02-24",
				);

				expect(item).toBeDefined();
				expect(item.product).toBeUndefined();
				expect(item.pubDate).toBe("Mon, 24 Feb 2025 00:00:00 GMT");
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

		it("llms-full.txt", async () => {
			const request = new Request("http://fakehost/llms-full.txt");
			const response = await SELF.fetch(request);

			expect(response.status).toBe(200);

			const text = await response.text();
			expect(text).toContain("URL: https://developers.cloudflare.com/");
			expect(text).toContain('from "~/components"');
		});

		it("product-specific llms-full.txt", async () => {
			const request = new Request("http://fakehost/workers/llms-full.txt");
			const response = await SELF.fetch(request);

			expect(response.status).toBe(200);

			const text = await response.text();
			expect(text).toContain("URL: https://developers.cloudflare.com/");
			expect(text).toContain('from "~/components"');
		});

		it("area-specific llms-full.txt", async () => {
			const request = new Request(
				"http://fakehost/developer-platform/llms-full.txt",
			);
			const response = await SELF.fetch(request);

			expect(response.status).toBe(200);

			const text = await response.text();
			expect(text).toContain("URL: https://developers.cloudflare.com/");
			expect(text).toContain('from "~/components"');
		});
	});
});
