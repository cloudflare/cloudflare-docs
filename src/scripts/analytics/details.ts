import { track } from "~/util/zaraz";

/**
 * Details/disclosure analytics. Same event + payload as root
 * `src/scripts/analytics/details.ts` ("dropdown click", `{ text }`), fired when
 * a `<details>` is opened. The `toggle` event does not bubble, so this listens
 * in the capture phase on `document` (capture reaches ancestors even for
 * non-bubbling events) rather than binding each `<details>` — which keeps it
 * working across Astro view transitions. Nimbus's Details component renders
 * native `<details><summary>`, matching root's selector.
 */
export function registerDetails(): void {
	document.addEventListener(
		"toggle",
		(event) => {
			const el = event.target as HTMLElement | null;
			if (!(el instanceof HTMLDetailsElement) || !el.open) return;

			const summary = el.querySelector<HTMLElement>("summary");
			if (!summary) return;

			track("dropdown click", { text: summary.innerText });
		},
		true,
	);
}
