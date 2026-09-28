import { CHANGELOG_OG_IMAGE } from "../src/util/page-head";

export async function handleChangelogOg(
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
		const { changelogOg } = await import("./changelog-og");
		return await changelogOg(request, env, ctx, options);
	} catch (error) {
		console.error(
			`Could not serve OG image for ${new URL(request.url).pathname}`,
			error,
		);
	}

	try {
		const fallback = await env.ASSETS.fetch(
			new URL(CHANGELOG_OG_IMAGE, request.url),
		);
		if (
			fallback.status !== 200 ||
			fallback.headers
				.get("Content-Type")
				?.split(";")[0]
				.trim()
				.toLowerCase() !== "image/png"
		) {
			throw new Error(
				`Invalid changelog fallback response: ${fallback.status}`,
			);
		}
		const body = await fallback.arrayBuffer();
		const bytes = new Uint8Array(body);
		if (
			bytes.length <= 8 ||
			[137, 80, 78, 71, 13, 10, 26, 10].some((byte, i) => bytes[i] !== byte)
		) {
			throw new Error("Changelog fallback is not a PNG");
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
		console.error("Could not serve changelog fallback", error);
		return new Response("Social image temporarily unavailable", {
			status: 503,
			headers: {
				"Cache-Control": "no-store",
				"X-OG-Image": "fallback-unavailable",
			},
		});
	}
}
