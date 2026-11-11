import {
	createExecutionContext,
	env,
	waitOnExecutionContext,
} from "cloudflare:test";
import { expect, it } from "vitest";
import inter from "@fontsource/inter/files/inter-latin-500-normal.woff";
import { handleOg } from "../route";
import { changelogOgVersion } from "../../../src/util/og/changelog";

const bindings = env as unknown as Env;
const ORIGIN = "https://developers.cloudflare.com";

async function serve(url: string) {
	const ctx = createExecutionContext();
	const response = await handleOg(new Request(url), bindings, ctx);
	await waitOnExecutionContext(ctx);
	return response;
}

it("uses uncached Inter for a corrupt R2 font and recovers after the font is repaired", async () => {
	const version = await changelogOgVersion({
		title: "Custom Errors (beta): Stored Assets & Account-level Rules",
		date: "2025-02-11",
		product: "Rules",
	});
	const url = `${ORIGIN}/changelog/post/2025-02-11-custom-errors-beta/og.png?v=${version}`;
	await bindings.PRIVATE_ASSETS.put(
		"fonts/KunstGrotesk-Medium.ttf",
		"corrupt font",
	);
	const response = await serve(url);
	expect(response.status).toBe(200);
	expect(response.headers.get("X-OG-Image")).toBe("rendered; font=inter");
	expect(response.headers.get("Cache-Control")).toBe("public, max-age=300");
	expect(response.headers.get("Content-Type")).toBe("image/png");
	const bytes = new Uint8Array(await response.arrayBuffer());
	expect([...bytes.subarray(0, 8)]).toEqual([137, 80, 78, 71, 13, 10, 26, 10]);
	const fallback = await bindings.ASSETS.fetch(`${ORIGIN}/og-changelog.png`);
	expect(fallback.status).toBe(200);
	expect(bytes).not.toEqual(new Uint8Array(await fallback.arrayBuffer()));
	expect(await caches.default.match(url)).toBeUndefined();
	expect(
		(await bindings.PRIVATE_ASSETS.list({ prefix: "og/" })).objects,
	).toEqual([]);

	await bindings.PRIVATE_ASSETS.put("fonts/KunstGrotesk-Medium.ttf", inter);
	const recovered = await serve(url);
	expect(recovered.status).toBe(200);
	expect(recovered.headers.get("X-OG-Image")).toBe("rendered; font=kunst");
	expect(recovered.headers.get("Cache-Control")).toBe(
		"public, max-age=31536000, immutable",
	);
	await recovered.arrayBuffer();
}, 15_000);
