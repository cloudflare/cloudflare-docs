import { parse, type Font } from "opentype.js";
import { ImageResponse } from "workers-og";
import plexMono from "@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff";
import inter from "@fontsource/inter/files/inter-latin-500-normal.woff";
import { changelogCard, type Measure } from "./changelog-og-card";
import {
	changelogOgVersion,
	type ChangelogCard,
} from "../src/util/changelog-og";
import { CHANGELOG_OG_IMAGE } from "../src/util/page-head";

const KUNST_GROTESK_KEY = "fonts/KunstGrotesk-Medium.ttf";
const STORE_PREFIX = "og/changelog";
const IMMUTABLE = "public, max-age=31536000, immutable";
const REVALIDATE = "public, max-age=300";

let kunstGrotesk: ArrayBuffer | undefined;

// Kunst Grotesk is licensed, so it lives in the PRIVATE_ASSETS bucket rather
// than this repo. Without it (local dev, tests, forks) titles are set in Inter.
async function loadTitleFont(env: Env) {
	try {
		kunstGrotesk ??= await (
			await env.PRIVATE_ASSETS.get(KUNST_GROTESK_KEY)
		)?.arrayBuffer();
	} catch (error) {
		console.error(`Could not read ${KUNST_GROTESK_KEY}`, error);
	}
	if (!kunstGrotesk) {
		console.warn(
			`${KUNST_GROTESK_KEY} missing from PRIVATE_ASSETS; using Inter`,
		);
	}
	return kunstGrotesk ?? inter;
}

const satoriFonts = (titleFont: ArrayBuffer) =>
	[
		{ name: "FT Kunst Grotesk", data: titleFont, weight: 500 },
		{ name: "Inter", data: inter, weight: 500 },
		{ name: "IBM Plex Mono", data: plexMono, weight: 500 },
	].map((font) => ({ ...font, style: "normal" as const }));

const faces = new WeakMap<ArrayBuffer, Font>();
function face(data: ArrayBuffer) {
	let font = faces.get(data);
	if (!font) faces.set(data, (font = parse(data)));
	return font;
}

// Kerned glyph advances, without opentype.js's shaping (which can't apply
// some of Inter's substitution lookups and doesn't affect Latin widths).
const measureWith =
	(titleFont: ArrayBuffer): Measure =>
	(text, font, fontSize) => {
		const metrics = face(font === "Inter" ? inter : titleFont);
		const glyphs = Array.from(text, (char) => metrics.charToGlyph(char));
		const units = glyphs.reduce(
			(width, glyph, i) =>
				width +
				glyph.advanceWidth +
				(i > 0 ? metrics.getKerningValue(glyphs[i - 1], glyph) : 0),
			0,
		);
		return (units / metrics.unitsPerEm) * fontSize;
	};

const ENTITIES: Record<string, string> = {
	amp: "&",
	lt: "<",
	gt: ">",
	quot: '"',
	apos: "'",
};

const decodeEntities = (value: string) =>
	value.replace(/&(#x[\da-f]+|#\d+|[a-z]+);/gi, (match, entity: string) =>
		entity[0] !== "#"
			? (ENTITIES[entity.toLowerCase()] ?? match)
			: String.fromCodePoint(
					entity[1] === "x" || entity[1] === "X"
						? parseInt(entity.slice(2), 16)
						: Number(entity.slice(1)),
				),
	);

export async function readChangelogCard(
	page: Response,
): Promise<ChangelogCard | null> {
	let title: string | null = null;
	let date: string | null = null;
	let product = "";

	await new HTMLRewriter()
		.on('meta[property="og:title"]', {
			element(meta) {
				title ??= meta.getAttribute("content");
			},
		})
		.on('meta[name="pcx_product"]', {
			element(meta) {
				product = meta.getAttribute("content") ?? "";
			},
		})
		.on("time[datetime]", {
			element(time) {
				date ??= time.getAttribute("datetime");
			},
		})
		.transform(page)
		.arrayBuffer();

	return title && date
		? {
				title: decodeEntities(title),
				date,
				product: decodeEntities(product),
			}
		: null;
}

async function render(card: ChangelogCard, titleFont: ArrayBuffer) {
	const element = changelogCard(
		card,
		measureWith(titleFont),
	) as unknown as ConstructorParameters<typeof ImageResponse>[0];
	// Buffered so a render failure surfaces here, not mid-stream.
	return new ImageResponse(element, {
		width: 1200,
		height: 630,
		fonts: satoriFonts(titleFont),
	}).arrayBuffer();
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
 * Serves /changelog/post/<id>/og.png. Card content always comes from the
 * entry's deployed page; the `v` query parameter only decides caching. Kunst
 * renders are stored in R2 by content version, so each card renders once.
 * Any failure after the page is found serves the static changelog card.
 *
 * With `cache: false` (PR previews) every request renders from the deployed
 * page, and nothing is read from or written to the edge cache or R2 store.
 */
export async function changelogOg(
	request: Request,
	env: Env,
	ctx: ExecutionContext,
	{ cache = true } = {},
): Promise<Response> {
	const url = new URL(request.url);
	const cacheKey = new Request(url);
	const cached = cache ? await caches.default.match(cacheKey) : undefined;
	if (cached) return cached;

	const [page, titleFont] = await Promise.all([
		env.ASSETS.fetch(new URL(url.pathname.slice(0, -"og.png".length), url)),
		loadTitleFont(env),
	]);
	if (!page.ok) return new Response("Not found", { status: 404 });

	try {
		const card = await readChangelogCard(page);
		if (!card) throw new Error("changelog entry metadata not found");

		const version = await changelogOgVersion(card);
		const key = `${STORE_PREFIX}/${version}.png`;
		const stored = cache
			? await env.PRIVATE_ASSETS.get(key).catch((error) => {
					console.error(`Could not read ${key}`, error);
					return null;
				})
			: null;

		// Only Kunst renders are stored or cached long-term, so a transient
		// font miss never pins an Inter card to a version.
		const kunst = stored !== null || titleFont !== inter;
		const image = stored
			? await stored.arrayBuffer()
			: await render(card, titleFont);
		if (cache && !stored && kunst) {
			ctx.waitUntil(
				env.PRIVATE_ASSETS.put(key, image, {
					httpMetadata: { contentType: "image/png" },
				}).catch((error) => console.error(`Could not store ${key}`, error)),
			);
		}

		const font = kunst ? "kunst" : "inter";
		const current = cache && kunst && url.searchParams.get("v") === version;
		if (current) {
			ctx.waitUntil(
				caches.default.put(
					cacheKey,
					png(image, IMMUTABLE, `cached; font=${font}`),
				),
			);
		}
		return png(
			image,
			current ? IMMUTABLE : REVALIDATE,
			`${stored ? "stored" : "rendered"}; font=${font}`,
		);
	} catch (error) {
		console.error(`Could not render ${url.pathname}`, error);
		const fallback = await env.ASSETS.fetch(new URL(CHANGELOG_OG_IMAGE, url));
		return png(await fallback.arrayBuffer(), REVALIDATE, "fallback");
	}
}
