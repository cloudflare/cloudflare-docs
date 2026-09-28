import {
	SELF,
	createExecutionContext,
	env,
	waitOnExecutionContext,
} from "cloudflare:test";
import { describe, expect, it } from "vitest";
import inter from "@fontsource/inter/files/inter-latin-500-normal.woff";
import { changelogOg, readChangelogCard } from "./changelog-og";
import { changelogOgVersion } from "../src/util/changelog-og";

const bindings = env as unknown as Env;
const ORIGIN = "https://developers.cloudflare.com";
const POST = "/changelog/post/2025-02-11-custom-errors-beta/";
const CARD = {
	title: "Custom Errors (beta): Stored Assets & Account-level Rules",
	date: "2025-02-11",
	product: "Rules",
};

async function serve(url: string, overrides: Partial<Env> = {}) {
	const ctx = createExecutionContext();
	const response = await changelogOg(
		new Request(url),
		{ ...bindings, ...overrides },
		ctx,
	);
	await waitOnExecutionContext(ctx);
	return response;
}

const storedKey = async () =>
	`og/changelog/${await changelogOgVersion(CARD)}.png`;

const fallbackBytes = async () =>
	new Uint8Array(
		await (
			await bindings.ASSETS.fetch(`${ORIGIN}/og-changelog.png`)
		).arrayBuffer(),
	);

describe("changelog OG images", () => {
	// Runs first: the title font is cached per isolate once it loads.
	it("renders in Inter, uncached and unstored, without the title font", async () => {
		const response = await serve(`${ORIGIN}${POST}og.png?v=font-missing`);

		expect(response.status).toBe(200);
		expect(response.headers.get("X-OG-Image")).toBe("rendered; font=inter");
		expect(response.headers.get("Cache-Control")).toBe("public, max-age=300");
		expect(await bindings.PRIVATE_ASSETS.head(await storedKey())).toBeNull();
	});

	it("reads the card from the built page", async () => {
		const page = await SELF.fetch(`${ORIGIN}${POST}`);
		expect(await readChangelogCard(page)).toEqual(CARD);
	});

	it("links the versioned card from the page's og:image", async () => {
		const html = await (await SELF.fetch(`${ORIGIN}${POST}`)).text();
		const ogImage = html.match(/<meta property="og:image" content="([^"]*)"/);
		expect(ogImage?.[1]).toBe(
			`${ORIGIN}${POST}og.png?v=${await changelogOgVersion(CARD)}`,
		);
	});

	it("renders once, then serves from the edge cache and R2", async () => {
		await bindings.PRIVATE_ASSETS.put("fonts/KunstGrotesk-Medium.ttf", inter);
		const url = `${ORIGIN}${POST}og.png?v=${await changelogOgVersion(CARD)}`;

		const first = await serve(url);
		expect(first.headers.get("X-OG-Image")).toBe("rendered; font=kunst");
		expect(first.headers.get("Cache-Control")).toBe(
			"public, max-age=31536000, immutable",
		);
		const bytes = new Uint8Array(await first.arrayBuffer());
		expect([...bytes.subarray(0, 4)]).toEqual([0x89, 0x50, 0x4e, 0x47]);
		expect(bytes).not.toEqual(await fallbackBytes());
		expect(
			await bindings.PRIVATE_ASSETS.head(await storedKey()),
		).not.toBeNull();

		const second = await serve(url);
		expect(second.headers.get("X-OG-Image")).toBe("cached; font=kunst");

		const unversioned = await serve(`${ORIGIN}${POST}og.png`);
		expect(unversioned.headers.get("X-OG-Image")).toBe("stored; font=kunst");
		expect(unversioned.headers.get("Cache-Control")).toBe(
			"public, max-age=300",
		);
	});

	it("never caches or stores under a version it didn't compute", async () => {
		const url = `${ORIGIN}${POST}og.png?v=not-the-version`;
		const response = await serve(url);

		expect(response.headers.get("Cache-Control")).toBe("public, max-age=300");
		expect(await caches.default.match(url)).toBeUndefined();
		const { objects } = await bindings.PRIVATE_ASSETS.list({ prefix: "og/" });
		expect(objects.map((object) => object.key)).toEqual([await storedKey()]);
	});

	it("still renders when R2 reads and writes fail", async () => {
		const failing = {
			get: () => Promise.reject(new Error("R2 down")),
			put: () => Promise.reject(new Error("R2 down")),
		} as unknown as R2Bucket;
		const response = await serve(`${ORIGIN}${POST}og.png?v=r2-down`, {
			PRIVATE_ASSETS: failing,
		});

		expect(response.status).toBe(200);
		expect(response.headers.get("X-OG-Image")).toMatch(/^rendered; /);
	});

	it("falls back to the static card when the entry can't be read", async () => {
		const puts: string[] = [];
		const url = `${ORIGIN}${POST}og.png?v=broken-page`;
		const response = await serve(url, {
			ASSETS: {
				fetch: (input: RequestInfo | URL) =>
					new URL(String(input)).pathname === "/og-changelog.png"
						? bindings.ASSETS.fetch(input)
						: Promise.resolve(new Response("<html></html>")),
			} as Fetcher,
			PRIVATE_ASSETS: {
				get: () => Promise.resolve(null),
				put: (key: string) => {
					puts.push(key);
					return Promise.resolve(null);
				},
			} as unknown as R2Bucket,
		});

		const bytes = new Uint8Array(await response.arrayBuffer());
		expect(response.status).toBe(200);
		expect(response.headers.get("Content-Type")).toBe("image/png");
		expect(response.headers.get("Content-Length")).toBe(String(bytes.length));
		expect(response.headers.get("Cache-Control")).toBe("public, max-age=300");
		expect(response.headers.get("X-OG-Image")).toBe("fallback");
		expect(bytes).toEqual(await fallbackBytes());
		expect(puts).toEqual([]);
		expect(await caches.default.match(url)).toBeUndefined();
	});

	it("returns 404 for an unknown entry", async () => {
		const response = await SELF.fetch(
			`${ORIGIN}/changelog/post/does-not-exist/og.png`,
		);
		expect(response.status).toBe(404);
	});
});
