import { SELF } from "cloudflare:test";
import { describe, it, expect } from "vitest";
import { parse } from "node-html-parser";

describe("json-ld", () => {
	it("homepage JSON-LD is WebPage", async () => {
		const response = await SELF.fetch(new Request("http://fakehost/"));
		expect(response.status).toBe(200);

		const html = await response.text();
		const dom = parse(html);
		const jsonLd = dom.querySelector(
			"script[type='application/ld+json']",
		)?.innerText;
		expect(jsonLd).toBeTruthy();

		const data = JSON.parse(jsonLd!);
		expect(data["@type"]).toBe("WebPage");
	});
});
