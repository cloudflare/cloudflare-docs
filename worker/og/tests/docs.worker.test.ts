import {
	SELF,
	createExecutionContext,
	env,
	waitOnExecutionContext,
} from "cloudflare:test";
import { afterEach, describe, expect, it, vi } from "vitest";
import { parse } from "node-html-parser";
import inter from "@fontsource/inter/files/inter-latin-500-normal.woff";
import {
	OG_CARD_META,
	docsOgVersion,
	parseDocsCard,
	type DocsCard,
} from "../../../src/util/og/docs";
import * as layout from "../layout";
import { handleOg } from "../route";

const bindings = env as unknown as Env;
const ORIGIN = "https://developers.cloudflare.com";
const KV = "/kv/concepts/how-kv-works/";
const TUTORIAL = "/workers/tutorials/upload-assets-with-r2/";

async function serve(path: string, overrides: Partial<Env> = {}) {
	const ctx = createExecutionContext();
	const response = await handleOg(
		new Request(`${ORIGIN}${path}`),
		{ ...bindings, ...overrides },
		ctx,
	);
	await waitOnExecutionContext(ctx);
	return response;
}

async function pageCard(path: string) {
	const html = parse(await (await SELF.fetch(`${ORIGIN}${path}`)).text());
	const meta = (selector: string) =>
		html.querySelector(selector)?.getAttribute("content");
	const tag = meta(`meta[name="${OG_CARD_META}"]`);
	return {
		card: tag === undefined ? null : parseDocsCard(tag),
		ogImage: meta('meta[property="og:image"]'),
		twitterImage: meta('meta[property="twitter:image"]'),
	};
}

async function staticBytes(path: string) {
	const response = await bindings.ASSETS.fetch(`${ORIGIN}${path}`);
	expect(response.headers.get("Content-Type")).toBe("image/png");
	const bytes = new Uint8Array(await response.arrayBuffer());
	expect([...bytes.subarray(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
	return bytes;
}

const pageWith = (html: string) =>
	({
		fetch: (input: RequestInfo | URL) =>
			new URL(String(input)).pathname.endsWith(".png")
				? bindings.ASSETS.fetch(input)
				: Promise.resolve(
						new Response(html, { headers: { "Content-Type": "text/html" } }),
					),
	}) as Fetcher;

const cardTag = (card: unknown) =>
	`<html><head><meta name="${OG_CARD_META}" content='${JSON.stringify(card)}'></head></html>`;

describe("docs cards: build contract", () => {
	it.each([
		[KV, ["KV"]],
		[TUTORIAL, ["Beginner", "Workers", "R2"]],
	])("%s emits its resolved card", async (path, pills) => {
		const { card } = await pageCard(path);
		expect(card?.pills).toEqual(pills);
	});

	it.each([
		KV,
		TUTORIAL,
		"/workers/",
		"/1.1.1.1/encryption/",
		"/agent-setup/cursor/",
	])("%s links og:image to its versioned card", async (path) => {
		const { card, ogImage, twitterImage } = await pageCard(path);
		expect(card).not.toBeNull();
		const expected = `${ORIGIN}${path}og.png?v=${await docsOgVersion(card as DocsCard)}`;
		expect(ogImage).toBe(expected);
		expect(twitterImage).toBe(expected);
	});

	it.each([
		"/workers-ai/models/aura-1/",
		"/security-center/cloudforce-one/cloudforce-one/",
	])("%s keeps the static image and has no card", async (path) => {
		const { card, ogImage } = await pageCard(path);
		expect(card).toBeNull();
		expect(ogImage).toBe(`${ORIGIN}/og-docs.png`);
	});
});

describe("docs cards: Worker", () => {
	afterEach(() => vi.restoreAllMocks());

	// Runs first: the title font is cached per isolate once it loads.
	it("renders in Inter, uncached and unstored, without the title font", async () => {
		const response = await serve(`${KV}og.png?v=font-missing`);
		expect(response.headers.get("X-OG-Image")).toBe("rendered; font=inter");
		expect(response.headers.get("Cache-Control")).toBe("public, max-age=300");
		const { objects } = await bindings.PRIVATE_ASSETS.list({ prefix: "og/" });
		expect(objects).toEqual([]);
	});

	it.each([
		"/workers-ai/models/aura-1/og.png",
		"/security-center/cloudforce-one/cloudforce-one/og.png",
		"/api/og.png",
		"/og.png",
		"/does-not-exist/og.png",
	])("returns 404 for %s", async (path) => {
		const response = await serve(path);
		expect(response.status).toBe(404);
	});

	it("renders a PNG card, then serves it from the edge cache and R2", async () => {
		await bindings.PRIVATE_ASSETS.put("fonts/KunstGrotesk-Medium.ttf", inter);
		const { card } = await pageCard(TUTORIAL);
		const version = await docsOgVersion(card as DocsCard);

		const first = await serve(`${TUTORIAL}og.png?v=${version}`);
		expect(first.headers.get("X-OG-Image")).toBe("rendered; font=kunst");
		expect(first.headers.get("Cache-Control")).toBe(
			"public, max-age=31536000, immutable",
		);
		const bytes = await first.arrayBuffer();
		const view = new DataView(bytes);
		expect(view.getUint32(0)).toBe(0x89504e47);
		expect([view.getUint32(16), view.getUint32(20)]).toEqual([1200, 630]);
		expect(bytes.byteLength).toBeLessThan(5_000_000);
		expect(
			await bindings.PRIVATE_ASSETS.head(`og/docs/${version}.png`),
		).not.toBeNull();

		const second = await serve(`${TUTORIAL}og.png?v=${version}`);
		expect(second.headers.get("X-OG-Image")).toBe("cached; font=kunst");

		const unversioned = await serve(`${TUTORIAL}og.png`);
		expect(unversioned.headers.get("X-OG-Image")).toBe("stored; font=kunst");
		expect(unversioned.headers.get("Cache-Control")).toBe(
			"public, max-age=300",
		);
	});

	it("never caches immutably or stores under a caller-supplied version", async () => {
		const url = `${ORIGIN}${KV}og.png?v=not-the-version`;
		const response = await serve(`${KV}og.png?v=not-the-version`);
		expect(response.headers.get("Cache-Control")).toBe("public, max-age=300");
		expect(await caches.default.match(url)).toBeUndefined();
		const { objects } = await bindings.PRIVATE_ASSETS.list({ prefix: "og/" });
		expect(objects.some(({ key }) => key.includes("not-the-version"))).toBe(
			false,
		);
	});

	it("renders when the edge cache or R2 image read fails", async () => {
		vi.spyOn(caches.default, "match").mockRejectedValueOnce(new Error("down"));
		const failingR2 = {
			get: (key: string) =>
				key.startsWith("og/")
					? Promise.reject(new Error("down"))
					: bindings.PRIVATE_ASSETS.get(key),
			put: () => Promise.reject(new Error("down")),
		} as unknown as R2Bucket;
		const response = await serve(`${KV}og.png?v=r2-down`, {
			PRIVATE_ASSETS: failingR2,
		});
		expect(response.status).toBe(200);
		expect(response.headers.get("X-OG-Image")).toMatch(/^rendered; /);
	});

	it.each([
		["the page returns 503", () => new Response("down", { status: 503 })],
		["the card tag is invalid", () => cardTag({ type: "docs", title: "" })],
		[
			"the card tag isn't JSON",
			() =>
				`<html><head><meta name="${OG_CARD_META}" content="{"></head></html>`,
		],
	])("serves /og-docs.png when %s", async (_, page) => {
		const body = page();
		const response = await serve(`${KV}og.png`, {
			ASSETS:
				typeof body === "string"
					? pageWith(body)
					: ({
							fetch: (input: RequestInfo | URL) =>
								new URL(String(input)).pathname.endsWith(".png")
									? bindings.ASSETS.fetch(input)
									: Promise.resolve(body),
						} as Fetcher),
		});
		expect(response.status).toBe(200);
		expect(response.headers.get("X-OG-Image")).toBe("fallback");
		expect(new Uint8Array(await response.arrayBuffer())).toEqual(
			await staticBytes("/og-docs.png"),
		);
	});

	it("serves /og-docs.png when rendering throws", async () => {
		vi.spyOn(layout, "canvas").mockImplementationOnce(() => {
			throw new Error("Render failed");
		});
		// A page no other test renders, so nothing is stored for it yet.
		const response = await serve("/1.1.1.1/encryption/og.png");
		expect(response.headers.get("X-OG-Image")).toBe("fallback");
		expect(new Uint8Array(await response.arrayBuffer())).toEqual(
			await staticBytes("/og-docs.png"),
		);
	});

	it("renders any page whose build emitted a card, like a socialImage-free stub", async () => {
		const response = await serve(`/any/page/og.png`, {
			ASSETS: pageWith(
				cardTag({ type: "docs", title: "Stubbed page", pills: ["Workers"] }),
			),
		});
		expect(response.headers.get("X-OG-Image")).toBe("rendered; font=kunst");
	});

	it("returns 404 for a page without a card, like a socialImage override", async () => {
		const response = await serve(`/any/page/og.png`, {
			ASSETS: pageWith("<html><head></head></html>"),
		});
		expect(response.status).toBe(404);
	});
});
