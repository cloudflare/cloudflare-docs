export function resolvePrompt(prompt: string, pageUrl: URL): string {
	const currentPage = new URL(pageUrl.pathname, pageUrl.origin).href;
	return prompt.replaceAll("{{pageUrl}}", currentPage);
}

export function bindCopyPromptButtons() {
	document
		.querySelectorAll<HTMLButtonElement>(".copy-prompt-btn")
		.forEach((button) => {
			if (button.dataset.bound === "true") return;
			button.dataset.bound = "true";

			const tooltip = button.dataset.tooltip;
			if (tooltip) button.setAttribute("title", tooltip);

			button.addEventListener("click", async () => {
				try {
					await navigator.clipboard.writeText(
						resolvePrompt(
							button.dataset.prompt ?? "",
							new URL(window.location.href),
						),
					);
				} catch {
					return;
				}
				button.dataset.copied = "true";
				setTimeout(() => delete button.dataset.copied, 1500);
			});
		});
}
