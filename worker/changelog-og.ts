import { parse, type Font } from "opentype.js";
import { ImageResponse } from "workers-og";
import plexMono from "@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff";
import inter from "@fontsource/inter/files/inter-latin-500-normal.woff";
import {
	changelogCard,
	type ChangelogCard,
	type Measure,
} from "./changelog-og-card";
import { CHANGELOG_OG_IMAGE } from "../src/util/page-head";

const KUNST_GROTESK_KEY = "fonts/KunstGrotesk-Medium.ttf";

let kunstGrotesk: ArrayBuffer | undefined;

// Kunst Grotesk is licensed, so it lives in the PRIVATE_ASSETS bucket rather
// than this repo. Without it (local dev, tests, forks) titles are set in Inter.
async function loadTitleFont(env: Env) {
	kunstGrotesk ??= await (
		await env.PRIVATE_ASSETS.get(KUNST_GROTESK_KEY)
	)?.arrayBuffer();
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

async function readChangelogCard(
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

/** Serves /changelog/post/<id>/og.png from the entry's deployed page. */
export async function changelogOg(request: Request, env: Env) {
	const url = new URL(request.url);
	const [page, titleFont] = await Promise.all([
		env.ASSETS.fetch(new URL(url.pathname.slice(0, -"og.png".length), url)),
		loadTitleFont(env),
	]);
	if (!page.ok) return new Response("Not found", { status: 404 });

	try {
		const card = await readChangelogCard(page);
		if (!card) throw new Error("changelog entry metadata not found");
		const element = changelogCard(
			card,
			measureWith(titleFont),
		) as unknown as ConstructorParameters<typeof ImageResponse>[0];
		// Buffered so a render failure is caught here, not mid-stream.
		const png = await new ImageResponse(element, {
			width: 1200,
			height: 630,
			fonts: satoriFonts(titleFont),
		}).arrayBuffer();
		return new Response(png, {
			headers: {
				"Content-Type": "image/png",
				"Cache-Control": "public, max-age=86400",
			},
		});
	} catch (error) {
		console.error(`Could not render ${url.pathname}`, error);
		const fallback = await env.ASSETS.fetch(new URL(CHANGELOG_OG_IMAGE, url));
		return new Response(fallback.body, {
			headers: {
				"Content-Type": "image/png",
				"Cache-Control": "public, max-age=300",
			},
		});
	}
}
