import {
	createExecutionContext,
	env,
	waitOnExecutionContext,
} from "cloudflare:test";
import { afterEach, describe, expect, it, vi } from "vitest";
import { handleOg } from "../route";

vi.mock("../serve", () => {
	throw new Error("Renderer module failed to initialize");
});

const bindings = env as unknown as Env;
const URL =
	"https://developers.cloudflare.com/changelog/post/2025-02-11-custom-errors-beta/og.png";

async function serve() {
	const ctx = createExecutionContext();
	const response = await handleOg(new Request(URL), bindings, ctx);
	await waitOnExecutionContext(ctx);
	return response;
}

describe("changelog OG error boundary", () => {
	afterEach(() => vi.restoreAllMocks());

	it("serves the static PNG even when the renderer module cannot load", async () => {
		const response = await serve();
		expect(response.status).toBe(200);
		expect(response.headers.get("Content-Type")).toBe("image/png");
		expect(response.headers.get("X-OG-Image")).toBe("fallback");
		expect(response.headers.get("Cache-Control")).toBe("public, max-age=300");
		const bytes = new Uint8Array(await response.arrayBuffer());
		expect([...bytes.subarray(0, 8)]).toEqual([
			137, 80, 78, 71, 13, 10, 26, 10,
		]);
		expect(response.headers.get("Content-Length")).toBe(String(bytes.length));
		expect(await caches.default.match(URL)).toBeUndefined();
	});

	it.each([
		{
			name: "missing",
			fetch: async () => new Response("Not found", { status: 404 }),
		},
		{
			name: "a server error",
			fetch: async () => new Response("Unavailable", { status: 500 }),
		},
		{
			name: "HTML",
			fetch: async () =>
				new Response("<html>Error</html>", {
					headers: { "Content-Type": "text/html" },
				}),
		},
		{
			name: "HTML labelled as PNG",
			fetch: async () =>
				new Response("<html>Error</html>", {
					headers: { "Content-Type": "image/png" },
				}),
		},
		{
			name: "empty",
			fetch: async () =>
				new Response(null, { headers: { "Content-Type": "image/png" } }),
		},
		{
			name: "unreachable",
			fetch: async () => {
				throw new Error("ASSETS unavailable");
			},
		},
		{
			name: "an unreadable body",
			fetch: async () =>
				new Response(
					new ReadableStream({
						start(controller) {
							controller.error(new Error("Body failed"));
						},
					}),
					{ headers: { "Content-Type": "image/png" } },
				),
		},
	])(
		"returns an uncached 503 when the fallback is $name",
		async ({ fetch }) => {
			vi.spyOn(bindings.ASSETS, "fetch").mockImplementationOnce(fetch);
			const response = await serve();
			expect(response.status).toBe(503);
			expect(response.headers.get("Cache-Control")).toBe("no-store");
			expect(response.headers.get("Content-Type")).toContain("text/plain");
			expect(response.headers.get("X-OG-Image")).toBe("fallback-unavailable");
			expect(await response.text()).toBe(
				"Social image temporarily unavailable",
			);
			expect(await caches.default.match(URL)).toBeUndefined();
		},
	);
});
