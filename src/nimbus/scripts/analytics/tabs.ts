import { track } from "~/util/zaraz";

/**
 * Tab-click analytics. Same event name + payload as root
 * `src/scripts/analytics/tabs.ts` ("tab click", `{ selected_option }`), with
 * the selector adapted to Nimbus's tab DOM: root targets Starlight's
 * `starlight-tabs a[role='tab']`; Nimbus's `TabsTrigger` renders
 * `<button role="tab" data-nb-tabs-trigger>`. Delegated so React-hydrated tab
 * islands are covered too.
 */
export function registerTabs(): void {
	document.addEventListener("click", (event) => {
		const trigger = (event.target as Element | null)?.closest<HTMLElement>(
			"[data-nb-tabs-trigger]",
		);
		if (trigger) {
			track("tab click", { selected_option: trigger.innerText });
		}
	});
}
