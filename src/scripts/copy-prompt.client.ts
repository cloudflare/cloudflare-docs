// Click-to-copy for the CopyPrompt box. Global (not a hoisted component
// script) because CopyPrompt can render inside changelog entries, whose render
// path does not propagate hoisted scripts.

import { mount } from "@cloudflare/nimbus-docs/client";

const RESET_MS = 2000;

function initCopyPrompt(root: HTMLElement): () => void {
	const button = root.querySelector<HTMLButtonElement>("button");
	const text = root.querySelector<HTMLElement>("[data-copy-prompt-text]");
	const idle = root.querySelector<HTMLElement>("[data-copy-prompt-idle]");
	const done = root.querySelector<HTMLElement>("[data-copy-prompt-done]");
	if (!button || !text || !idle || !done) return () => {};

	let timer: ReturnType<typeof setTimeout> | undefined;

	// `invisible` (visibility: hidden) also removes the inactive label from the
	// accessibility tree, so the button's accessible name follows the swap.
	function show(copied: boolean) {
		idle!.classList.toggle("invisible", copied);
		done!.classList.toggle("invisible", !copied);
	}

	async function onClick() {
		try {
			await navigator.clipboard.writeText(text!.textContent ?? "");
		} catch {
			// Clipboard unavailable (insecure context) or permission denied.
			return;
		}
		show(true);
		clearTimeout(timer);
		timer = setTimeout(() => show(false), RESET_MS);
	}

	button.addEventListener("click", onClick);

	return () => {
		clearTimeout(timer);
		button.removeEventListener("click", onClick);
	};
}

mount("[data-copy-prompt]", initCopyPrompt);
