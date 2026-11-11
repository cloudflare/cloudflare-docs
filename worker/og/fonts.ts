import { parse, type Font } from "opentype.js";
import plexMono from "@fontsource/ibm-plex-mono/files/ibm-plex-mono-latin-500-normal.woff";
import inter from "@fontsource/inter/files/inter-latin-500-normal.woff";

export { inter };

export type TitleFont = "FT Kunst Grotesk" | "Inter";
/** Advance width in px of `text` set in `font` at `fontSize`. */
export type Measure = (
	text: string,
	font: TitleFont | "IBM Plex Mono",
	fontSize: number,
) => number;

const KUNST_GROTESK_KEY = "fonts/KunstGrotesk-Medium.ttf";

let kunstGrotesk: ArrayBuffer | undefined;

// Kunst Grotesk is licensed, so it lives in the PRIVATE_ASSETS bucket rather
// than this repo. Without it (local dev, tests, forks) titles are set in Inter.
export async function loadTitleFont(env: Env) {
	if (kunstGrotesk) return kunstGrotesk;
	try {
		const data = await (
			await env.PRIVATE_ASSETS.get(KUNST_GROTESK_KEY)
		)?.arrayBuffer();
		if (data) {
			face(data);
			kunstGrotesk = data;
			return data;
		}
		console.warn(
			`${KUNST_GROTESK_KEY} missing from PRIVATE_ASSETS; using Inter`,
		);
	} catch (error) {
		console.warn(`Could not load ${KUNST_GROTESK_KEY}; using Inter`, error);
	}
	return inter;
}

export const satoriFonts = (titleFont: ArrayBuffer) =>
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
export const measureWith =
	(titleFont: ArrayBuffer): Measure =>
	(text, font, fontSize) => {
		const metrics = face(
			font === "Inter"
				? inter
				: font === "IBM Plex Mono"
					? plexMono
					: titleFont,
		);
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
