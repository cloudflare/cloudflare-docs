// Entry point for `/<page>/og.png`. Kept free of renderer imports so ordinary
// requests never load satori, fonts or card code.

import { CHANGELOG_OG_IMAGE, DEFAULT_OG_IMAGE } from "../../src/util/page-head";

const PNG_SIGNATURE = [137, 80, 78, 71, 13, 10, 26, 10];

/** Chosen from the path alone, so it works when nothing else can load. */
const fallbackFor = (pathname: string) =>
	pathname.startsWith("/changelog/post/")
		? CHANGELOG_OG_IMAGE
		: DEFAULT_OG_IMAGE;

async function fallback(request: Request, env: Env) {
	const path = fallbackFor(new URL(request.url).pathname);
	try {
		const response = await env.ASSETS.fetch(new URL(path, request.url));
		const contentType = response.headers
			.get("Content-Type")
			?.split(";")[0]
			.trim()
			.toLowerCase();
		if (response.status !== 200 || contentType !== "image/png") {
			throw new Error(`Invalid ${path} response: ${response.status}`);
		}
		const body = await response.arrayBuffer();
		const bytes = new Uint8Array(body);
		if (
			bytes.length <= 8 ||
			PNG_SIGNATURE.some((byte, i) => bytes[i] !== byte)
		) {
			throw new Error(`${path} is not a PNG`);
		}
		return new Response(body, {
			headers: {
				"Content-Type": "image/png",
				"Content-Length": String(body.byteLength),
				"Cache-Control": "public, max-age=300",
				"X-OG-Image": "fallback",
			},
		});
	} catch (error) {
		console.error(`Could not serve ${path}`, error);
		return new Response("Social image temporarily unavailable", {
			status: 503,
			headers: {
				"Cache-Control": "no-store",
				"X-OG-Image": "fallback-unavailable",
			},
		});
	}
}

export async function handleOg(
	request: Request,
	env: Env,
	ctx: ExecutionContext,
	options: { cache?: boolean } = {},
): Promise<Response> {
	if (request.method !== "GET" && request.method !== "HEAD") {
		return new Response("Method not allowed", {
			status: 405,
			headers: { Allow: "GET, HEAD" },
		});
	}

	try {
		const { serveOg } = await import("./serve");
		return await serveOg(request, env, ctx, options);
	} catch (error) {
		console.error(
			`Could not serve OG image for ${new URL(request.url).pathname}`,
			error,
		);
	}
	return fallback(request, env);
}
