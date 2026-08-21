import { track } from "~/util/zaraz";

/**
 * Header login-button analytics. Parity with root `Header.astro`, which emits
 * "clicked header login button" on the dashboard CTA. Delegated on `document`
 * so it survives Astro view transitions; registration is centralized in
 * `analytics.ts` behind the `__nbAnalyticsRegistered` guard, so the listener is
 * only ever attached once (no duplicate events on client navigation).
 */
export function registerHeader(): void {
	document.addEventListener("click", (event) => {
		if ((event.target as Element | null)?.closest("#header-login-button")) {
			track("clicked header login button");
		}
	});
}
