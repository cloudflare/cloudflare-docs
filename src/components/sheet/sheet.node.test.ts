import { describe, test, expect, beforeEach, afterEach, vi } from "vitest";
import { screen, fireEvent } from "@testing-library/dom";
import type { SheetElement } from "./sheet";
import "./sheet";

describe("<cfdocs-sheet>", () => {
	beforeEach(() => {
		vi.useFakeTimers();
	});

	afterEach(() => {
		document.body.innerHTML = "";
		vi.useRealTimers();
	});

	test("renders dialog structure when connected", () => {
		const sheet = document.createElement("cfdocs-sheet");
		document.body.appendChild(sheet);

		expect(screen.getByRole("dialog", { hidden: true })).toBeTruthy();
		expect(
			screen.getByRole("button", { name: /close/i, hidden: true }),
		).toBeTruthy();
	});

	test("open() shows the dialog and locks body scroll", () => {
		const sheet = document.createElement("cfdocs-sheet") as SheetElement;
		document.body.appendChild(sheet);

		sheet.open();

		const dialog = screen.getByRole("dialog");
		expect(dialog.hasAttribute("open")).toBe(true);
		expect(document.body.style.overflow).toBe("hidden");
	});

	test("close() animates, closes dialog, dispatches event, resets scroll, and removes from DOM", () => {
		const sheet = document.createElement("cfdocs-sheet") as SheetElement;
		document.body.appendChild(sheet);
		sheet.open();

		const closeHandler = vi.fn();
		sheet.addEventListener("sheet-close", closeHandler);

		const dialog = screen.getByRole("dialog");

		sheet.close();

		expect(dialog.classList.contains("closing")).toBe(true);
		expect(document.body.style.overflow).toBe("hidden");

		// need to wait for the animation to finish
		vi.advanceTimersByTime(300);

		expect(dialog.hasAttribute("open")).toBe(false);
		expect(closeHandler).toHaveBeenCalledTimes(1);
		expect(document.body.style.overflow).toBe("");
		expect(document.body.contains(sheet)).toBe(false);
	});

	test("close button triggers close", () => {
		const sheet = document.createElement("cfdocs-sheet") as SheetElement;
		document.body.appendChild(sheet);
		sheet.open();

		fireEvent.click(screen.getByRole("button", { name: /close/i }));

		vi.advanceTimersByTime(300);
		expect(document.body.contains(sheet)).toBe(false);
	});

	test("setContent() updates inner HTML", () => {
		const sheet = document.createElement("cfdocs-sheet") as SheetElement;
		document.body.appendChild(sheet);

		sheet.setContent("<p>Test content</p>");

		expect(screen.getByText("Test content")).toBeTruthy();
	});
});
