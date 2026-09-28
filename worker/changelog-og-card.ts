// Changelog entry social card: a satori element tree, rendered by
// worker/changelog-og.ts.

export interface ChangelogCard {
	title: string;
	/** YYYY-MM-DD */
	date: string;
	product: string;
}

type Style = Record<string, string | number>;
type Child = CardNode | string;
interface CardNode {
	type: string;
	props: { style?: Style; children?: Child | Child[]; [attr: string]: unknown };
}

const el = (style: Style, children?: Child | Child[]): CardNode => ({
	type: "div",
	props: { style: { display: "flex", ...style }, children },
});

const INK = "#292929";
const LABEL = "#8f8f8f";
const DASH = "#cccccc";
const MONO = "IBM Plex Mono";

export type TitleFont = "FT Kunst Grotesk" | "Inter";
/** Advance width in px of `text` set in `font` at `fontSize`. */
export type Measure = (
	text: string,
	font: TitleFont,
	fontSize: number,
) => number;

// The Kunst Grotesk cut covers Latin letters but little punctuation, and
// satori falls back per line segment rather than per glyph, so any word Kunst
// can't fully draw is set in Inter instead.
const KUNST_GLYPHS =
	/^[ "'()+,\-.0-9:;A-Z`a-z\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u017F]*$/;
const fontFor = (text: string): TitleFont =>
	KUNST_GLYPHS.test(text) ? "FT Kunst Grotesk" : "Inter";

const M = 96;
const TITLE_WIDTH = 1000;
const TRACKING = -0.02;
const ELLIPSIS = "\u2026";
// The display-title scale: 76 → 66 → 56, stepping down on measured overflow.
const TIERS = [
	{ fontSize: 76, lineHeight: 1.08, maxLines: 2 },
	{ fontSize: 66, lineHeight: 1.12, maxLines: 2 },
	{ fontSize: 56, lineHeight: 1.16, maxLines: 3 },
];
const SMALLEST = TIERS[TIERS.length - 1];

const LOGO_SVG =
	'<svg width="66" height="30" viewBox="0 0 341 156" fill="none" xmlns="http://www.w3.org/2000/svg">' +
	'<path d="M275.125 68.25C311.507 68.25 341 97.9335 341 134.55C341 141.077 340.063 147.385 338.317 153.343C337.848 154.943 336.363 156 334.706 156H243.056C241.697 156 240.76 154.628 241.247 153.351L242.999 148.76C248.595 134.03 264.56 121.963 279.331 121.256L307.33 119.813C308.826 119.736 310 118.492 310 116.985C310 115.485 308.838 114.245 307.351 114.157L281.059 112.601C266.924 111.877 260.018 99.2932 263.82 86.179L268.195 71.0866C268.64 69.5514 269.971 68.4343 271.557 68.3476C272.738 68.2831 273.928 68.25 275.125 68.25Z" fill="#FF9910"/>' +
	'<path d="M184.062 0C222 0 253.868 26.1297 262.882 61.4824C263.26 62.967 263.142 64.5333 262.601 65.9662L255.383 85.0897C249.787 99.8196 235.406 112.593 219.134 112.593L93.7928 114.043C92.2801 114.061 91.063 115.3 91.0625 116.823C91.0625 118.344 92.2776 119.585 93.789 119.605L217.365 121.248C231.531 121.248 238.406 134.556 234.606 147.671L233.011 153.189C232.53 154.855 231.014 156 229.291 156H3.90889C1.98075 156 0.330745 154.574 0.17634 152.64C0.0594555 151.175 0 149.695 0 148.2C0 119.723 21.6617 96.3403 49.306 93.8266C48.7387 91.2419 48.4375 88.5564 48.4375 85.8C48.4375 65.3379 64.919 48.75 85.25 48.75C93.3413 48.75 100.822 51.3789 106.897 55.8321C117.716 23.3806 148.176 0 184.062 0Z" fill="#FF5F08"/>' +
	"</svg>";

function tierMetrics(fontSize: number, measure: Measure) {
	const wordWidth = (text: string) =>
		measure(text, fontFor(text), fontSize) + text.length * TRACKING * fontSize;
	const space = wordWidth(" ");
	const lineWidth = (line: string[]) =>
		line.reduce((width, text) => width + wordWidth(text), 0) +
		(line.length - 1) * space;
	return { wordWidth, lineWidth, space };
}

function wrap(words: string[], lineWidth: (line: string[]) => number) {
	const lines: string[][] = [];
	for (const text of words) {
		const line = lines[lines.length - 1];
		if (line && lineWidth([...line, text]) <= TITLE_WIDTH) line.push(text);
		else lines.push([text]);
	}
	return lines;
}

// As in the tinytools card, a character-count guess picks the starting tier and
// measured overflow steps it down. Lines are broken here with real glyph
// metrics (satori's own line-clamp misreports flow height).
export function layoutTitle(raw: string, measure: Measure) {
	const title = raw.replace(/`/g, "").replace(/\s+/g, " ").trim();
	const words = title.split(" ").filter(Boolean);
	const start = title.length > 60 ? 2 : title.length > 45 ? 1 : 0;

	for (const tier of TIERS.slice(start)) {
		const { lineWidth, space } = tierMetrics(tier.fontSize, measure);
		const lines = wrap(words, lineWidth);
		if (lines.length <= tier.maxLines) {
			return { ...tier, lines, space, truncated: false };
		}
	}

	const { wordWidth, lineWidth, space } = tierMetrics(
		SMALLEST.fontSize,
		measure,
	);
	const kept = wrap(words, lineWidth).slice(0, SMALLEST.maxLines);
	const last = kept[kept.length - 1];
	while (
		last.length > 1 &&
		lineWidth(last) + wordWidth(ELLIPSIS) > TITLE_WIDTH
	) {
		last.pop();
	}
	return { ...SMALLEST, lines: kept, space, truncated: true };
}

// Consecutive words in the same font share one text run so satori spaces them
// natively; only a font change needs its own box, spaced by the measured gap.
function titleLine(line: string[], ellipsis: boolean, space: number) {
	const runs: { font: TitleFont; text: string }[] = [];
	for (const text of line) {
		const run = runs[runs.length - 1];
		if (run?.font === fontFor(text)) run.text += ` ${text}`;
		else runs.push({ font: fontFor(text), text });
	}
	if (ellipsis) runs.push({ font: fontFor(ELLIPSIS), text: ELLIPSIS });

	return el(
		{ whiteSpace: "nowrap" },
		runs.map((run, i) =>
			el(
				{
					flexShrink: 0,
					fontFamily: run.font,
					marginRight:
						i < runs.length - 1 && !(ellipsis && i === runs.length - 2)
							? space
							: 0,
				},
				run.text,
			),
		),
	);
}

const PIN: Style = {
	position: "absolute",
	width: 10,
	height: 10,
	background: "#fff",
	border: "1.25px solid #c9c9c9",
	borderRadius: 2,
};

const dashes = (direction: "horizontal" | "vertical", style: Style) =>
	el({
		position: "absolute",
		...(direction === "horizontal"
			? {
					height: 1.5,
					backgroundImage: `linear-gradient(90deg, ${DASH} 55%, transparent 45%)`,
					backgroundSize: "8px 1.5px",
				}
			: {
					width: 1.5,
					backgroundImage: `linear-gradient(180deg, ${DASH} 55%, transparent 45%)`,
					backgroundSize: "1.5px 8px",
				}),
		...style,
	});

// The house paper: a registration frame at a 40px inset, pinned at the corners.
const FRAME = [
	...[40, 1160].map((x) => dashes("vertical", { top: 0, bottom: 0, left: x })),
	...[40, 590].map((y) => dashes("horizontal", { left: 0, right: 0, top: y })),
	...[40, 1160].flatMap((x) =>
		[40.75, 590.75].map((y) => el({ ...PIN, left: x - 5, top: y - 5 })),
	),
];

const MONO_LABEL: Style = {
	fontFamily: MONO,
	fontWeight: 500,
	lineHeight: 1,
	textTransform: "uppercase",
};

export function changelogCard(
	{ title, date, product }: ChangelogCard,
	measure: Measure,
) {
	const fit = layoutTitle(title, measure);
	const [, month, day] = date.split("-");

	return el(
		{ position: "relative", width: 1200, height: 630, background: "#fff" },
		[
			...FRAME,
			// Header logo, its corner inset matching the left margin.
			el({ position: "absolute", top: M, left: M }, [
				{
					type: "img",
					props: {
						src: `data:image/svg+xml,${encodeURIComponent(LOGO_SVG)}`,
						width: 66,
						height: 30,
					},
				},
			]),
			// The title centers in its band; the dimension line and pill hold
			// fixed positions so every card shares the same geometry.
			el(
				{
					position: "absolute",
					top: 140,
					left: M,
					right: M,
					height: 260,
					flexDirection: "column",
					justifyContent: "center",
				},
				[
					el(
						{
							flexDirection: "column",
							maxWidth: TITLE_WIDTH,
							fontSize: fit.fontSize,
							lineHeight: fit.lineHeight,
							fontWeight: 500,
							letterSpacing: `${TRACKING}em`,
							color: INK,
						},
						fit.lines.map((line, i) =>
							titleLine(
								line,
								fit.truncated && i === fit.lines.length - 1,
								fit.space,
							),
						),
					),
				],
			),
			el({ position: "absolute", top: 415, left: M, width: 1008, height: 10 }, [
				dashes("horizontal", { left: 0, right: 0, top: 4 }),
				el({ ...PIN, left: -5, top: 0 }),
				el({ ...PIN, right: -5, top: 0 }),
				el(
					{
						...MONO_LABEL,
						position: "absolute",
						left: 18,
						top: -9,
						padding: "0 12px",
						background: "#fff",
						fontSize: 26,
						lineHeight: "28px",
						letterSpacing: "0.16em",
						color: LABEL,
					},
					`${month}.${day}`,
				),
			]),
			// Product pill, anchored clear of the zone X overlays with the title.
			...(product
				? [
						el({ position: "absolute", bottom: 120, left: M }, [
							el(
								{
									...MONO_LABEL,
									padding: "15px 26px",
									background: "#fff",
									border: "1.5px solid #d4d4d4",
									borderRadius: 999,
									fontSize: 24,
									letterSpacing: "0.12em",
									color: INK,
								},
								product,
							),
						]),
					]
				: []),
		],
	);
}
