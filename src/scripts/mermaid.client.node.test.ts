import { describe, expect, test, vi } from "vitest";

import { fitSvgToContents } from "./mermaid.client";

describe("fitSvgToContents", () => {
	test("replaces Mermaid's stale HTML label dimensions with rendered bounds", () => {
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute("viewBox", "-75 -35 2084 2043");
		svg.style.maxWidth = "2084px";
		svg.getBBox = vi.fn(() => new DOMRect(8, 8, 1431, 160));

		fitSvgToContents(svg);

		expect(svg.getAttribute("viewBox")).toBe("0 0 1447 176");
		expect(svg.style.maxWidth).toBe("1447px");
	});

	test("preserves a view box that already fits the rendered bounds", () => {
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute("viewBox", "0 0 120 70");
		svg.style.maxWidth = "120px";
		svg.getBBox = vi.fn(() => new DOMRect(10, 10, 100, 50));

		fitSvgToContents(svg);

		expect(svg.getAttribute("viewBox")).toBe("0 0 120 70");
		expect(svg.style.maxWidth).toBe("120px");
	});

	test("leaves dimensions unchanged when bounds are unavailable", () => {
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute("viewBox", "0 0 100 50");
		svg.getBBox = vi.fn(() => {
			throw new Error("not rendered");
		});

		fitSvgToContents(svg);

		expect(svg.getAttribute("viewBox")).toBe("0 0 100 50");
	});
});
