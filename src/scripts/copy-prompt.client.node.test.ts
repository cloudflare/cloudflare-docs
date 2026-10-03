import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";

const PROMPT = "Build a Worker and deploy it.";

function render() {
	document.body.innerHTML = `
		<div data-copy-prompt>
			<p><span data-copy-prompt-text>${PROMPT}</span></p>
			<button type="button">
				<span>
					<span data-copy-prompt-idle>Copy prompt</span>
					<span data-copy-prompt-done class="invisible">Copied!</span>
				</span>
			</button>
		</div>`;
	const root = document.querySelector<HTMLElement>("[data-copy-prompt]")!;
	return {
		button: root.querySelector("button")!,
		idle: root.querySelector("[data-copy-prompt-idle]")!,
		done: root.querySelector("[data-copy-prompt-done]")!,
	};
}

function stubClipboard(writeText: (text: string) => Promise<void>) {
	Object.defineProperty(navigator, "clipboard", {
		value: { writeText: vi.fn(writeText) },
		configurable: true,
	});
	return navigator.clipboard.writeText as ReturnType<typeof vi.fn>;
}

async function load() {
	vi.resetModules();
	await import("./copy-prompt.client");
}

const visible = (el: Element) => !el.classList.contains("invisible");

describe("CopyPrompt", () => {
	beforeEach(() => vi.useFakeTimers());
	afterEach(() => vi.useRealTimers());

	test("copies the prompt text and shows Copied!, then resets", async () => {
		const writeText = stubClipboard(async () => {});
		const { button, idle, done } = render();
		await load();

		button.click();
		await vi.advanceTimersByTimeAsync(0);

		expect(writeText).toHaveBeenCalledWith(PROMPT);
		expect(visible(idle)).toBe(false);
		expect(visible(done)).toBe(true);

		await vi.advanceTimersByTimeAsync(2000);

		expect(visible(idle)).toBe(true);
		expect(visible(done)).toBe(false);
	});

	test("keeps the idle label when copying fails", async () => {
		stubClipboard(async () => {
			throw new Error("denied");
		});
		const { button, idle, done } = render();
		await load();

		button.click();
		await vi.advanceTimersByTimeAsync(0);

		expect(visible(idle)).toBe(true);
		expect(visible(done)).toBe(false);
	});
});
