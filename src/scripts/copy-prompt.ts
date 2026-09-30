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
					await navigator.clipboard.writeText(button.dataset.prompt ?? "");
				} catch {
					return;
				}
				button.dataset.copied = "true";
				setTimeout(() => delete button.dataset.copied, 1500);
			});
		});
}
