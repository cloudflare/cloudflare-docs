import { SELF } from "cloudflare:test";
import { describe, expect, it } from "vitest";
import type { AiCatalogManifest } from "./ai-catalog";

describe("ai-catalog", () => {
	it("serves a valid ai-catalog manifest with ACAO header", async () => {
		const response = await SELF.fetch(
			new Request("http://fakehost/.well-known/ai-catalog.json"),
		);

		expect(response.status).toBe(200);
		expect(response.headers.get("Content-Type")).toContain(
			"application/ai-catalog+json",
		);
		expect(response.headers.get("Access-Control-Allow-Origin")).toBe("*");

		const body = (await response.json()) as AiCatalogManifest;
		expect(body.specVersion).toBe("1.0");
		expect(body.host?.displayName).toBeTruthy();
		expect(Array.isArray(body.entries)).toBe(true);
		expect(body.entries.length).toBeGreaterThan(0);

		for (const entry of body.entries) {
			expect(typeof entry.identifier).toBe("string");
			expect(
				entry.identifier.startsWith("urn:air:developers.cloudflare.com:"),
			).toBe(true);
			expect(typeof entry.displayName).toBe("string");
			expect(entry.displayName.length).toBeGreaterThan(0);
			expect(typeof entry.type).toBe("string");
			expect(entry.type.length).toBeGreaterThan(0);
			expect(typeof entry.description).toBe("string");
			expect(entry.description.length).toBeGreaterThan(0);

			expect(typeof entry.url).toBe("string");
			expect(entry.url.length).toBeGreaterThan(0);
			expect(() => new URL(entry.url)).not.toThrow();
			expect(new URL(entry.url).protocol).toMatch(/^https?:$/);

			// The catalog intentionally never embeds inline data — all entries
			// are URL references that consumers dereference separately.
			expect(entry).not.toHaveProperty("data");
		}
	});
});
