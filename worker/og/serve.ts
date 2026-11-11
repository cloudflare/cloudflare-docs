import { ImageResponse } from "workers-og";
import { inter, loadTitleFont, measureWith, satoriFonts } from "./fonts";
import type { CardNode } from "./layout";
import { cardTypeFor } from "./registry";

const IMMUTABLE = "public, max-age=31536000, immutable";
const REVALIDATE = "public, max-age=300";

const notFound = () => new Response("Not found", { status: 404 });

async function render(element: CardNode, titleFont: ArrayBuffer) {
	// Buffered so a render failure surfaces here, not mid-stream.
	return new ImageResponse(
		element as unknown as ConstructorParameters<typeof ImageResponse>[0],
		{ width: 1200, height: 630, fonts: satoriFonts(titleFont) },
	).arrayBuffer();
}

/** `source` and `font` are reported in X-OG-Image for diagnostics. */
const png = (body: ArrayBuffer, cacheControl: string, diagnostic: string) =>
	new Response(body, {
		headers: {
			"Content-Type": "image/png",
			"Content-Length": String(body.byteLength),
			"Cache-Control": cacheControl,
			"X-OG-Image": diagnostic,
		},
	});

/**
 * Serves `/<page>/og.png`. Card content always comes from the deployed page;
 * the `v` query parameter only decides caching. Kunst renders are stored in R2
 * by content version, so each card is reused once it has rendered. Throws on
 * failure; the route serves the static card. Missing pages return 404.
 *
 * With `cache: false` (PR previews) every request renders from the deployed
 * page, and nothing is read from or written to the edge cache or R2 store.
 */
export async function serveOg(
	request: Request,
	env: Env,
	ctx: ExecutionContext,
	{ cache = true } = {},
): Promise<Response> {
	const url = new URL(request.url);
	const type = cardTypeFor(url.pathname);
	const cacheKey = new Request(url);

	const cached = cache
		? await caches.default.match(cacheKey).catch((error) => {
				console.error("Could not read OG cache", error);
				return undefined;
			})
		: undefined;
	if (cached) return cached;

	const page = await env.ASSETS.fetch(
		new URL(url.pathname.slice(0, -"og.png".length), url),
	);
	if (page.status === 404) return notFound();
	if (!page.ok) throw new Error(`Page asset returned ${page.status}`);

	const card = await type.resolve(page);
	if (!card) return notFound();

	const key = `og/${type.id}/${card.version}.png`;
	const stored = cache
		? await env.PRIVATE_ASSETS.get(key).catch((error) => {
				console.error(`Could not read ${key}`, error);
				return null;
			})
		: null;
	const titleFont = stored ? undefined : await loadTitleFont(env);

	// Only Kunst renders are stored or cached long-term, so a transient
	// font miss never pins an Inter card to a version.
	const kunst = stored !== null || titleFont !== inter;
	const image = stored
		? await stored.arrayBuffer()
		: await render(
				card.element(measureWith(titleFont ?? inter)),
				titleFont ?? inter,
			);
	if (cache && !stored && kunst) {
		ctx.waitUntil(
			env.PRIVATE_ASSETS.put(key, image, {
				httpMetadata: { contentType: "image/png" },
			}).catch((error) => console.error(`Could not store ${key}`, error)),
		);
	}

	const font = kunst ? "kunst" : "inter";
	const current = cache && kunst && url.searchParams.get("v") === card.version;
	if (current) {
		ctx.waitUntil(
			caches.default
				.put(cacheKey, png(image, IMMUTABLE, `cached; font=${font}`))
				.catch((error) => console.error("Could not store OG cache", error)),
		);
	}
	return png(
		image,
		current ? IMMUTABLE : REVALIDATE,
		`${stored ? "stored" : "rendered"}; font=${font}`,
	);
}
