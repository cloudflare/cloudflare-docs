import { describe, expect, test } from "vitest";

import { layoutTitle, type Measure, type TitleFont } from "./changelog-og-card";

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
		const fonts = new Map<string, TitleFont>();
		layoutTitle("Workers text/javascript", (text, font, fontSize) => {
			fonts.set(text, font);
			return halfEm(text, font, fontSize);
		});
		expect(fonts.get("Workers")).toBe("FT Kunst Grotesk");
		expect(fonts.get("text/javascript")).toBe("Inter");
	});
});
