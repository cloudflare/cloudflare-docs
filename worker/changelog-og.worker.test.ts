import { SELF } from "cloudflare:test";
import { describe, expect, it } from "vitest";

const POST = "/changelog/post/2025-02-11-custom-errors-beta/";

describe("changelog OG images", () => {
	it("renders a PNG card for a changelog entry", async () => {
		const response = await SELF.fetch(`http://fakehost${POST}og.png`);

		expect(response.status).toBe(200);
		expect(response.headers.get("Content-Type")).toBe("image/png");
		const bytes = new Uint8Array(await response.arrayBuffer());
		expect([...bytes.subarray(0, 4)]).toEqual([0x89, 0x50, 0x4e, 0x47]);
	});

	it("returns 404 for an unknown entry", async () => {
		const response = await SELF.fetch(
			"http://fakehost/changelog/post/does-not-exist/og.png",
		);
		expect(response.status).toBe(404);
	});

	it("is the entry page's og:image", async () => {
		const html = await (await SELF.fetch(`http://fakehost${POST}`)).text();
		expect(html).toContain(
			`<meta property="og:image" content="https://developers.cloudflare.com${POST}og.png"`,
		);
	});
});
