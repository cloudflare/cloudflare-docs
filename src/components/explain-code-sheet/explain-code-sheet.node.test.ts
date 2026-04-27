import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { screen } from "@testing-library/dom";
import "./explain-code-sheet";

describe("<cfdocs-explain-code>", () => {
	beforeEach(() => {
		vi.stubGlobal("fetch", vi.fn());

		Object.defineProperty(window, "location", {
			value: { pathname: "/workers/examples/" },
			writable: true,
		});
	});

	afterEach(() => {
		document.body.innerHTML = "";
		vi.unstubAllGlobals();
	});

	test("creates sheet and shows loading state", () => {
		vi.mocked(fetch).mockImplementation(() => new Promise(() => {}));

		const explainCode = document.createElement("cfdocs-explain-code");
		explainCode.setAttribute("code-block-position", "1");
		document.body.appendChild(explainCode);

		expect(screen.getByRole("dialog", { hidden: true })).toBeTruthy();
		expect(
			screen.getByRole("heading", { name: /code explanation/i }),
		).toBeTruthy();
	});

	test("fetches from correct API URL with code block position", () => {
		vi.mocked(fetch).mockImplementation(() => new Promise(() => {}));

		const explainCode = document.createElement("cfdocs-explain-code");
		explainCode.setAttribute("code-block-position", "3");
		document.body.appendChild(explainCode);

		expect(fetch).toHaveBeenCalledWith(
			"https://docs-ai-production.cloudflare-docs.workers.dev/explain/workers/examples?codeBlock=3",
			expect.objectContaining({
				headers: { Accept: "text/html" },
			}),
		);
	});

	test("shows explanation on successful response", async () => {
		vi.mocked(fetch).mockResolvedValue({
			ok: true,
			headers: new Headers({ "cf-docs-finish-reason": "stop" }),
			text: () => Promise.resolve("<p>This code creates a Worker.</p>"),
		} as Response);

		const explainCode = document.createElement("cfdocs-explain-code");
		explainCode.setAttribute("code-block-position", "1");
		document.body.appendChild(explainCode);

		await vi.waitFor(() => {
			expect(
				screen.getByText(/experimental and may produce incorrect/i),
			).toBeTruthy();
		});

		expect(screen.getByText("This code creates a Worker.")).toBeTruthy();
	});

	test("shows error state on fetch failure", async () => {
		vi.mocked(fetch).mockRejectedValue(new Error("Network error"));

		const explainCode = document.createElement("cfdocs-explain-code");
		explainCode.setAttribute("code-block-position", "1");
		document.body.appendChild(explainCode);

		await vi.waitFor(() => {
			expect(screen.getByText(/unable to generate explanation/i)).toBeTruthy();
		});
	});

	test("shows error when finish-reason header is not 'stop'", async () => {
		vi.mocked(fetch).mockResolvedValue({
			ok: true,
			headers: new Headers({ "cf-docs-finish-reason": "length" }),
			text: () => Promise.resolve("partial content"),
		} as Response);

		const explainCode = document.createElement("cfdocs-explain-code");
		explainCode.setAttribute("code-block-position", "1");
		document.body.appendChild(explainCode);

		await vi.waitFor(() => {
			expect(screen.getByText(/unable to generate explanation/i)).toBeTruthy();
		});
	});

	test("aborts fetch when disconnected", () => {
		const abortSpy = vi.fn();
		vi.mocked(fetch).mockImplementation((_, options) => {
			(options as RequestInit)?.signal?.addEventListener("abort", abortSpy);
			return new Promise(() => {});
		});

		const explainCode = document.createElement("cfdocs-explain-code");
		explainCode.setAttribute("code-block-position", "1");
		document.body.appendChild(explainCode);

		explainCode.remove();

		expect(abortSpy).toHaveBeenCalled();
	});

	test("removes itself when sheet dispatches close event", async () => {
		vi.mocked(fetch).mockResolvedValue({
			ok: true,
			headers: new Headers({ "cf-docs-finish-reason": "stop" }),
			text: () => Promise.resolve("<p>Explanation</p>"),
		} as Response);

		const explainCode = document.createElement("cfdocs-explain-code");
		explainCode.setAttribute("code-block-position", "1");
		document.body.appendChild(explainCode);

		await vi.waitFor(() => {
			expect(screen.getByText("Explanation")).toBeTruthy();
		});

		const sheet = explainCode.querySelector("cfdocs-sheet")!;
		sheet.dispatchEvent(new CustomEvent("sheet-close"));

		expect(document.body.contains(explainCode)).toBe(false);
	});
});
