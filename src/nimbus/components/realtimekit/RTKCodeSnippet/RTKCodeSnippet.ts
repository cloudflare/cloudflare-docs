const STORAGE_KEY = "realtimekit-sdk-selector";
const DEFAULT_PLATFORM = "web";
const DEFAULT_FRAMEWORK_ID = "react";

function getActiveId(): string {
	try {
		const raw = localStorage.getItem(STORAGE_KEY);
		if (raw) {
			const parsed = JSON.parse(raw);
			const platform = parsed.platform === "mobile" ? "mobile" : "web";
			const frameworkId =
				parsed.frameworkId ||
				(platform === "web" ? DEFAULT_FRAMEWORK_ID : "android");
			return `${platform}-${frameworkId}`;
		}
	} catch {
		// Ignore localStorage / JSON errors.
	}
	return `${DEFAULT_PLATFORM}-${DEFAULT_FRAMEWORK_ID}`;
}

function updateSnippets(activeId: string) {
	document.querySelectorAll<HTMLElement>(".rtk-code-snippet").forEach((el) => {
		const ids = (el.dataset.rtkIds || "").split(",");
		el.classList.toggle("hidden", !ids.includes(activeId));
	});
}

// Reveal the correct snippets on initial load.
updateSnippets(getActiveId());

// Re-run after view-transition navigations (if enabled).
document.addEventListener("astro:page-load", () =>
	updateSnippets(getActiveId()),
);

// React to framework changes broadcast by RTKSDKSelector.
window.addEventListener("realtimekit-sdk-selector-change", ((
	event: CustomEvent,
) => {
	const { platform, frameworkId } = event.detail || {};
	if (platform && frameworkId) {
		updateSnippets(`${platform}-${frameworkId}`);
	}
}) as EventListener);
