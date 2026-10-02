import { afterEach, beforeEach, expect, test, vi } from "vitest";

import { bindCopyPromptButtons } from "./copy-prompt";

const writeText = vi.fn<(text: string) => Promise<void>>();

beforeEach(() => {
	vi.useFakeTimers();
	writeText.mockReset();
	writeText.mockResolvedValue(undefined);
	vi.stubGlobal("navigator", { clipboard: { writeText } });
});

afterEach(() => {
	document.body.replaceChildren();
	vi.unstubAllGlobals();
	vi.useRealTimers();
});

function createButton(prompt: string) {
	const button = document.createElement("button");
	button.className = "copy-prompt-btn";
	button.dataset.prompt = prompt;
	document.body.append(button);
	return button;
}

test("copies each button's own prompt and resets its confirmation", async () => {
	const defaultButton = createButton("Set up my Cloudflare agent.");
	const artifactsButton = createButton(
		"Create my Artifacts repository.\nVerify Git.",
	);
	artifactsButton.dataset.tooltip = "Set up your first Artifacts repository";
	bindCopyPromptButtons();

	defaultButton.click();
	artifactsButton.click();
	await Promise.resolve();

	expect(writeText.mock.calls).toEqual([
		[defaultButton.dataset.prompt],
		[artifactsButton.dataset.prompt],
	]);
	expect(artifactsButton.title).toBe(artifactsButton.dataset.tooltip);
	expect(artifactsButton.dataset.copied).toBe("true");
	await vi.advanceTimersByTimeAsync(1500);
	expect(artifactsButton.dataset.copied).toBeUndefined();
});

test("does not register duplicate click handlers after rebinding", async () => {
	const button = createButton("Create my Artifacts repository.");
	bindCopyPromptButtons();
	bindCopyPromptButtons();
	button.click();
	await Promise.resolve();

	expect(writeText).toHaveBeenCalledExactlyOnceWith(button.dataset.prompt);
});

test("binds newly added buttons without rebinding existing buttons", async () => {
	const existingButton = createButton("Default setup.");
	bindCopyPromptButtons();
	const newButton = createButton("Artifacts setup.");
	bindCopyPromptButtons();
	existingButton.click();
	newButton.click();
	await Promise.resolve();

	expect(writeText).toHaveBeenCalledTimes(2);
	expect(writeText).toHaveBeenLastCalledWith(newButton.dataset.prompt);
});

test("does not report success when clipboard access is rejected", async () => {
	writeText.mockRejectedValue(new Error("Clipboard access denied"));
	const button = createButton("Create my Artifacts repository.");
	bindCopyPromptButtons();
	button.click();
	await Promise.resolve();

	expect(button.dataset.copied).toBeUndefined();
});
