/**
 * Core dark mode synchronization logic
 */

import {
	initDarkMode,
	addDarkModeChangeListener,
	DarkModeNamingStrategy,
	setDarkModeFromStrategy,
	type DarkModeChangeEventDetail,
} from "@cloudflare/style-const";

import type { DarkModeConfig } from "./types";

export function initDarkModeSync(config: DarkModeConfig = {}): () => void {
	if (typeof window === "undefined") return () => {};

	const {
		storageKey = "starlight-theme",
		themeAttribute = "data-theme",
		autoInit = true,
	} = config;

	let isUpdating = false;
	let lastLibraryTheme: string | null = null;

	// Initialize with Astro naming strategy
	const cleanup1 = initDarkMode({
		namingStrategy: DarkModeNamingStrategy.ASTRO,
	});

	// Listen for changes from library
	const cleanup2 = addDarkModeChangeListener(
		(detail: DarkModeChangeEventDetail) => {
			if (isUpdating) return;

			const theme = detail.value; // Already in Astro format ('dark', 'light', 'auto')

			isUpdating = true;
			lastLibraryTheme = theme;

			// For "auto", determine the actual theme to apply to DOM
			let domTheme = theme;
			if (theme === "auto") {
				domTheme = window.matchMedia("(prefers-color-scheme: dark)").matches
					? "dark"
					: "light";
			}

			// Update DOM with the actual theme (auto -> dark/light)
			document.documentElement.setAttribute(themeAttribute, domTheme);

			// Update localStorage with user's intent (preserve auto)
			try {
				localStorage.setItem(storageKey, theme);
			} catch (_e) {
				// Ignore localStorage errors (e.g., private browsing mode)
			}

			// Update Starlight UI with user's intent
			if (typeof (window as any).StarlightThemeProvider !== "undefined") {
				(window as any).StarlightThemeProvider.updatePickers(theme);
			}

			isUpdating = false;
		},
	);

	// Watch for Starlight theme changes from user interaction
	const observer = new MutationObserver(() => {
		if (isUpdating) return;

		const domTheme = document.documentElement.getAttribute(themeAttribute);
		if (domTheme && ["dark", "light", "auto"].includes(domTheme)) {
			// Read the user's actual intent from localStorage
			// Starlight stores '' for 'auto', so we need to normalize
			const storedTheme =
				typeof localStorage !== "undefined"
					? localStorage.getItem(storageKey)
					: null;
			const actualTheme = storedTheme || "auto";

			// Only propagate if this is different from what the library last sent us
			if (actualTheme !== lastLibraryTheme) {
				isUpdating = true;
				lastLibraryTheme = actualTheme;
				// Use the new library function to automatically handle strategy conversion
				setDarkModeFromStrategy(actualTheme, DarkModeNamingStrategy.ASTRO);
				isUpdating = false;
			}
		}
	});

	observer.observe(document.documentElement, {
		attributes: true,
		attributeFilter: [themeAttribute],
	});

	// Listen for system preference changes when in auto mode
	const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
	const handleSystemChange = () => {
		if (isUpdating) return;

		// Check if user selected auto by looking at localStorage
		const storedTheme =
			typeof localStorage !== "undefined"
				? localStorage.getItem(storageKey)
				: null;

		if (storedTheme === "auto") {
			isUpdating = true;
			const newDomTheme = mediaQuery.matches ? "dark" : "light";
			document.documentElement.setAttribute(themeAttribute, newDomTheme);
			isUpdating = false;
		}
	};

	mediaQuery.addEventListener("change", handleSystemChange);

	// Auto-initialize current theme
	if (autoInit) {
		// Get user's intent from localStorage first
		const storedTheme =
			typeof localStorage !== "undefined"
				? localStorage.getItem(storageKey)
				: null;
		const initialTheme = storedTheme || "auto";

		// Track this as the last library theme to prevent immediate re-sync
		lastLibraryTheme = initialTheme;

		// Initialize the library with the current theme
		setDarkModeFromStrategy(initialTheme, DarkModeNamingStrategy.ASTRO);
	}

	return () => {
		cleanup1?.();
		cleanup2?.();
		observer.disconnect();
		mediaQuery.removeEventListener("change", handleSystemChange);
	};
}
