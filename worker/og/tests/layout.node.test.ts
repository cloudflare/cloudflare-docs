import { describe, expect, test } from "vitest";

import { CHANGELOG_TITLE_SCALE } from "../cards/changelog";
import { DOCS_TITLE_SCALE } from "../cards/docs";
import type { Measure, TitleFont } from "../fonts";
import { fitPills, layoutTitle as layout } from "../layout";

const layoutTitle = (title: string, measure: Measure) =>
	layout(title, measure, CHANGELOG_TITLE_SCALE);

const em =
	(width: number): Measure =>
	(text, _font, fontSize) =>
		text.length * fontSize * width;
const halfEm = em(0.5);

const title = (length: number) =>
	"word ".repeat(length).slice(0, length).trim();

describe("layoutTitle", () => {
	test("starts at the tier the title length suggests", () => {
		expect(layoutTitle(title(40), halfEm).fontSize).toBe(76);
		expect(layoutTitle(title(50), halfEm).fontSize).toBe(66);
		expect(layoutTitle(title(70), halfEm).fontSize).toBe(56);
	});

	test("steps down while the measured title overflows", () => {
		const fit = layoutTitle(title(40), em(1));
		expect(fit.fontSize).toBe(56);
		expect(fit.lines.length).toBeLessThanOrEqual(3);
		expect(fit.truncated).toBe(false);
	});

	test("truncates at a word boundary past three lines at the smallest size", () => {
		const fit = layoutTitle(title(400), halfEm);
		expect(fit.fontSize).toBe(56);
		expect(fit.lines).toHaveLength(3);
		expect(fit.truncated).toBe(true);
		expect(fit.lines.flat().every((word) => word === "word")).toBe(true);
	});

	test("strips Markdown code ticks", () => {
		expect(layoutTitle("`wrangler dev` ships", halfEm).lines).toEqual([
			["wrangler", "dev", "ships"],
		]);
	});

	test("measures words Kunst Grotesk can't draw in Inter", () => {
		const fonts = new Map<string, TitleFont | "IBM Plex Mono">();
		layoutTitle("Workers text/javascript", (text, font, fontSize) => {
			fonts.set(text, font);
			return halfEm(text, font, fontSize);
		});
		expect(fonts.get("Workers")).toBe("FT Kunst Grotesk");
		expect(fonts.get("text/javascript")).toBe("Inter");
	});
});

describe("docs title scale", () => {
	const docsTitle = (text: string, measure: Measure = halfEm) =>
		layout(text, measure, DOCS_TITLE_SCALE);

	test("starts at the tier the title length suggests", () => {
		expect(docsTitle(title(40)).fontSize).toBe(76);
		expect(docsTitle(title(60)).fontSize).toBe(60);
		expect(docsTitle(title(90)).fontSize).toBe(54);
	});

	test("clamps at three lines on the smallest tier", () => {
		const fit = docsTitle(title(400));
		expect(fit.fontSize).toBe(54);
		expect(fit.lines).toHaveLength(3);
		expect(fit.truncated).toBe(true);
	});

	test("truncates a word wider than the line instead of overflowing", () => {
		const fit = docsTitle("RtkWaitListParticipantUpdateEventListener", em(0.6));
		const [[word]] = fit.lines;
		expect(fit.fontSize).toBe(54);
		expect(word.endsWith("\u2026")).toBe(true);
		expect(
			word.length * 54 * 0.6 - word.length * 0.02 * 54,
		).toBeLessThanOrEqual(1000);
	});

	test("breaks a wrapped title after its colon", () => {
		expect(docsTitle("Workers: Metrics and analytics").lines).toEqual([
			["Workers:"],
			["Metrics", "and", "analytics"],
		]);
		expect(docsTitle("Workers: Get started").lines).toEqual([
			["Workers:", "Get", "started"],
		]);
	});

	test("ignores the colon when breaking there would add a line", () => {
		const fit = docsTitle(`Go: ${title(48)}`);
		expect(fit.lines).toHaveLength(2);
		expect(fit.lines[0].length).toBeGreaterThan(1);
	});

	test("changelog keeps long words intact", () => {
		const fit = layoutTitle(
			"RtkWaitListParticipantUpdateEventListener",
			em(0.6),
		);
		expect(fit.lines).toEqual([["RtkWaitListParticipantUpdateEventListener"]]);
	});
});

describe("fitPills", () => {
	// Monospace stand-in: every character is 0.6em.
	const mono = em(0.6);
	// A pill is text + tracking (0.12em per character) + 55px chrome.
	const pillWidth = (label: string) => label.length * 24 * 0.72 + 55;

	test("keeps pills that fit in order", () => {
		expect(fitPills(["Beginner", "Workers", "R2"], mono)).toEqual([
			"Beginner",
			"Workers",
			"R2",
		]);
	});

	test("drops the first pill that overflows and everything after it", () => {
		const long = "x".repeat(20);
		expect(pillWidth(long) * 3 + 24).toBeGreaterThan(1008);
		expect(fitPills([long, long, long, "R2"], mono)).toEqual([long, long]);
	});

	test("truncates a lone pill wider than the row", () => {
		const [pill] = fitPills(["x".repeat(80)], mono);
		expect(pill.endsWith("\u2026")).toBe(true);
		expect(pillWidth(pill)).toBeLessThanOrEqual(1008);
	});
});
