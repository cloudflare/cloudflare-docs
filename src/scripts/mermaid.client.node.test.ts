import { afterEach, describe, expect, test, vi } from "vitest";

import { fitSvgToContents, fitSvgWhenVisible } from "./mermaid.client";

describe("fitSvgToContents", () => {
	test("replaces Mermaid's stale HTML label dimensions with rendered bounds", () => {
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute("viewBox", "-75 -35 2084 2043");
		svg.style.maxWidth = "2084px";
		svg.getBBox = vi.fn(() => new DOMRect(8, 8, 1431, 160));

		expect(fitSvgToContents(svg)).toBe(true);

		expect(svg.getAttribute("viewBox")).toBe("0 0 1447 176");
		expect(svg.style.maxWidth).toBe("1447px");
	});

	test("preserves a view box that already fits the rendered bounds", () => {
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute("viewBox", "0 0 120 70");
		svg.style.maxWidth = "120px";
		svg.getBBox = vi.fn(() => new DOMRect(10, 10, 100, 50));

		expect(fitSvgToContents(svg)).toBe(true);

		expect(svg.getAttribute("viewBox")).toBe("0 0 120 70");
		expect(svg.style.maxWidth).toBe("120px");
	});

	test("leaves dimensions unchanged when bounds are unavailable", () => {
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute("viewBox", "0 0 100 50");
		svg.getBBox = vi.fn(() => {
			throw new Error("not rendered");
		});

		expect(fitSvgToContents(svg)).toBe(false);

		expect(svg.getAttribute("viewBox")).toBe("0 0 100 50");
	});
});

describe("fitSvgWhenVisible", () => {
	afterEach(() => {
		vi.unstubAllGlobals();
	});

	test("refits a hidden diagram once ResizeObserver fires with non-zero bounds", () => {
		let callback: ResizeObserverCallback | undefined;
		const observe = vi.fn();
		const disconnect = vi.fn();

		vi.stubGlobal(
			"ResizeObserver",
			class MockResizeObserver {
				constructor(cb: ResizeObserverCallback) {
					callback = cb;
				}
				observe = observe;
				disconnect = disconnect;
			},
		);

		const diagram = document.createElement("pre");
		const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		svg.setAttribute("viewBox", "-75 -35 2084 2043");
		svg.style.maxWidth = "2084px";

		let visible = false;
		svg.getBBox = vi.fn(() =>
			visible ? new DOMRect(8, 8, 600, 300) : new DOMRect(0, 0, 0, 0),
		);

		fitSvgWhenVisible(diagram, svg);

		expect(observe).toHaveBeenCalledWith(diagram);
		expect(disconnect).not.toHaveBeenCalled();
		expect(svg.getAttribute("viewBox")).toBe("-75 -35 2084 2043");

		visible = true;
		callback?.([], {} as ResizeObserver);

		expect(svg.getAttribute("viewBox")).toBe("0 0 616 316");
		expect(svg.style.maxWidth).toBe("616px");
		expect(disconnect).toHaveBeenCalledTimes(1);
	});
});
