import { useEffect, useState } from "react";
const STORAGE_KEY = "realtimekit-sdk-selector";

export type Platform = "web" | "mobile";
export type Framework = {
	id: string;
	label: string;
};

export interface SelectedFramework {
	platform: Platform;
	framework: Framework;
}

export const webFrameworks: Framework[] = [
	{
		id: "react",
		label: "React",
	},
	{
		id: "web-components",
		label: "Web Components",
	},
	{
		id: "angular",
		label: "Angular",
	},
];
export const mobileFrameworks: Framework[] = [
	{
		id: "react-native",
		label: "React Native",
	},
	{
		id: "android",
		label: "Android",
	},
	{
		id: "ios",
		label: "iOS",
	},
	{
		id: "flutter",
		label: "Flutter",
	},
];

/**
 * Shared hook to read and update the currently selected platform/framework.
 *
 * - Persists selection in localStorage under STORAGE_KEY.
 * - Broadcasts changes via the `realtimekit-sdk-selector-change` custom event.
 * - Listens to the same event to stay in sync across multiple components.
 */
export function useFramework() {
	const [platform, setPlatform] = useState<Platform>("web");
	const [framework, setFramework] = useState<Framework>(webFrameworks[0]);

	// Helper: broadcast selection changes so other listeners can sync.
	function notifySelectionChange(
		nextPlatform: Platform,
		nextFrameworkId: string,
	) {
		if (typeof window === "undefined") return;
		try {
			window.dispatchEvent(
				new CustomEvent("realtimekit-sdk-selector-change", {
					detail: { platform: nextPlatform, frameworkId: nextFrameworkId },
				}),
			);
		} catch {
			// Ignore event dispatch errors.
		}
	}

	// Initialise selection from localStorage (if available) on first render.
	useEffect(() => {
		if (typeof window === "undefined") return;

		try {
			const raw = window.localStorage.getItem(STORAGE_KEY);
			if (raw) {
				const parsed = JSON.parse(raw) as {
					platform?: Platform;
					frameworkId?: string;
				};

				const storedPlatform: Platform =
					parsed.platform === "mobile" ? "mobile" : "web";
				const availableFrameworks =
					storedPlatform === "web" ? webFrameworks : mobileFrameworks;
				const selectedFromStore = availableFrameworks.find(
					(fw) => fw.id === parsed.frameworkId,
				);

				const nextFramework = selectedFromStore ?? availableFrameworks[0];
				setPlatform(storedPlatform);
				setFramework(nextFramework);
				notifySelectionChange(storedPlatform, nextFramework.id);
				return;
			}
		} catch {
			// Ignore JSON or storage errors and fall back to defaults.
		}

		// No stored selection: default to web and its first framework.
		setPlatform("web");
		setFramework(webFrameworks[0]);
		notifySelectionChange("web", webFrameworks[0].id);
	}, []);

	// Keep local state in sync with external changes.
	useEffect(() => {
		if (typeof window === "undefined") return;

		function handleChange(
			event: Event & {
				detail?: { platform?: Platform; frameworkId?: Framework["id"] };
			},
		) {
			if (!event.detail?.platform || !event.detail.frameworkId) return;
			const nextPlatform = event.detail.platform;
			const availableFrameworks =
				nextPlatform === "web" ? webFrameworks : mobileFrameworks;
			const nextFramework =
				availableFrameworks.find((fw) => fw.id === event.detail?.frameworkId) ??
				availableFrameworks[0];

			setPlatform(nextPlatform);
			setFramework(nextFramework);
		}

		window.addEventListener(
			"realtimekit-sdk-selector-change",
			handleChange as EventListener,
		);

		return () => {
			window.removeEventListener(
				"realtimekit-sdk-selector-change",
				handleChange as EventListener,
			);
		};
	}, []);

	function updateSelection(nextPlatform: Platform, nextFramework: Framework) {
		setPlatform(nextPlatform);
		setFramework(nextFramework);

		if (typeof window !== "undefined") {
			try {
				window.localStorage.setItem(
					STORAGE_KEY,
					JSON.stringify({
						platform: nextPlatform,
						frameworkId: nextFramework.id,
					}),
				);
			} catch {
				// Ignore storage errors.
			}
		}

		notifySelectionChange(nextPlatform, nextFramework.id);
	}

	return {
		platform,
		framework,
		setSelection: updateSelection,
	};
}
