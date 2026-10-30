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

describe("font loading", () => {
	test("waits for fonts before measuring any diagram labels", async () => {
		vi.resetModules();
		let finishLoading!: () => void;
		const fontsReady = new Promise<void>((resolve) => {
			finishLoading = resolve;
		});
		const fontsDescriptor = Object.getOwnPropertyDescriptor(document, "fonts");
		Object.defineProperty(document, "fonts", {
			configurable: true,
			value: { ready: fontsReady },
		});
		const initialize = vi.fn();
		const render = vi.fn(async () => ({
			svg: '<svg xmlns="http://www.w3.org/2000/svg"></svg>',
		}));
		vi.doMock("mermaid", () => ({ default: { initialize, render } }));
		document.body.innerHTML =
			'<pre class="mermaid">flowchart TD; A --> B</pre><pre class="mermaid">flowchart TD; C --> D</pre>';

		try {
			await import("./mermaid.client");
			await vi.waitFor(() => expect(initialize).toHaveBeenCalledOnce());
			expect(render).not.toHaveBeenCalled();
			expect(document.querySelector("[data-processed]")).toBeNull();

			finishLoading();

			await vi.waitFor(() => {
				expect(render).toHaveBeenCalledTimes(2);
				expect(
					document.querySelectorAll('pre[data-processed="true"]'),
				).toHaveLength(2);
			});
		} finally {
			finishLoading();
			if (fontsDescriptor) {
				Object.defineProperty(document, "fonts", fontsDescriptor);
			} else {
				Reflect.deleteProperty(document, "fonts");
			}
			document.body.innerHTML = "";
			vi.doUnmock("mermaid");
			vi.resetModules();
		}
	});
});
