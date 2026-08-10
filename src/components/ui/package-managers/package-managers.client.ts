/**
 * Sync key `ui-pm-tab` (sessionStorage) is shared with the
 * `<nb-pm-restore>` early-paint element to avoid flash across navigations.
 */

import { mount, initTabs } from "@cloudflare/nimbus-docs/client";

function initPackageManager(container: HTMLElement): () => void {
	const tabs = initTabs({
		container,
		tabSelector: "[data-nb-pm-tab]",
		panelSelector: "[data-nb-pm-panel]",
		rovingTabindex: true,
		sync: { key: "ui-pm-tab", storage: "session" },
	});

	const copyHandlers: Array<{
		btn: HTMLButtonElement;
		handler: () => void;
		timer?: number;
	}> = [];

	container
		.querySelectorAll<HTMLButtonElement>("[data-nb-pm-copy]")
		.forEach((btn) => {
			// Toggle between the two icons instead of replacing the button's
			// children. Icon renders the first `ph:copy`/`ph:check` on the
			// page as a shared `<symbol>` and every other instance as a `<use>`
			// reference to it; removing the button that hosts the definition would
			// orphan every other copy icon on the page. Never remove the nodes.
			const copyIcon = btn.querySelector<SVGElement>('[data-icon="ph:copy"]');
			const checkIcon = btn.querySelector<SVGElement>('[data-icon="ph:check"]');
			const handlerInfo: {
				btn: HTMLButtonElement;
				handler: () => void;
				timer?: number;
			} = {
				btn,
				handler: async () => {
					try {
						await navigator.clipboard.writeText(btn.dataset.nbCommand ?? "");
					} catch {
						return;
					}
					copyIcon?.classList.add("hidden");
					checkIcon?.classList.remove("hidden");
					if (handlerInfo.timer) window.clearTimeout(handlerInfo.timer);
					handlerInfo.timer = window.setTimeout(() => {
						checkIcon?.classList.add("hidden");
						copyIcon?.classList.remove("hidden");
					}, 1500);
				},
			};
			btn.addEventListener("click", handlerInfo.handler);
			copyHandlers.push(handlerInfo);
		});

	return () => {
		tabs.destroy();
		copyHandlers.forEach(({ btn, handler, timer }) => {
			btn.removeEventListener("click", handler);
			if (timer) window.clearTimeout(timer);
		});
	};
}

mount("[data-nb-pm]", initPackageManager);
