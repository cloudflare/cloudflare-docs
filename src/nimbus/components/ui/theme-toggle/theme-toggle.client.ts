/**
 * theme-toggle.client.ts — cycles the theme preference light → dark → auto.
 * Writes the choice to localStorage ("ui-mode"). BaseLayout's pre-paint script
 * owns DOM application (data-mode / data-theme) so view transitions, OS
 * changes, and cross-tab edits stay in sync.
 */

import { mount } from "nimbus-docs/client";

declare global {
	interface Window {
		__nbApplyTheme?: () => void;
	}
}

const ORDER = ["light", "dark", "auto"] as const;
type Pref = (typeof ORDER)[number];

function readPref(): Pref {
	try {
		const v = localStorage.getItem("ui-mode");
		if (v === "light" || v === "dark" || v === "auto") return v;
	} catch {
		// Ignore storage errors (private mode / restricted contexts).
	}
	return "auto";
}

// Describe the current state and the action a click will take, so the control
// is meaningful to screen readers as it cycles.
function labelFor(pref: Pref): string {
	return pref === "light"
		? "Theme: light. Activate to switch to dark."
		: pref === "dark"
			? "Theme: dark. Activate to switch to system."
			: "Theme: system. Activate to switch to light.";
}

function initThemeToggle(button: HTMLElement): () => void {
	function syncLabel() {
		button.setAttribute("aria-label", labelFor(readPref()));
	}

	function handleClick() {
		const next = ORDER[(ORDER.indexOf(readPref()) + 1) % ORDER.length];
		try {
			localStorage.setItem("ui-mode", next);
		} catch {
			// Ignore storage errors (private mode / restricted contexts).
		}
		window.__nbApplyTheme?.();
		syncLabel();
	}

	window.__nbApplyTheme?.();
	syncLabel();
	button.addEventListener("click", handleClick);
	return () => button.removeEventListener("click", handleClick);
}

mount("[data-nb-theme-toggle]", initThemeToggle);
