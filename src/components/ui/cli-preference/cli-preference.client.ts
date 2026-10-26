import { getCliPreferenceDefault, type CliPreference } from "./cli-preference";

export type { CliPreference } from "./cli-preference";

const STORAGE_KEY = "ui-cli-preference";
const listeners = new Set<(value: CliPreference) => void>();
const runtime = window as typeof window & {
	__nbCliPreferenceOverride?: CliPreference;
	__nbCliPreferenceCleanup?: () => void;
};

function isCliPreference(value: unknown): value is CliPreference {
	return value === "wrangler" || value === "cf";
}

function readStoredPreference(): CliPreference | undefined {
	try {
		const stored = localStorage.getItem(STORAGE_KEY);
		return isCliPreference(stored) ? stored : undefined;
	} catch {
		return undefined;
	}
}

function readRouteDefault(): CliPreference {
	return getCliPreferenceDefault(location.pathname);
}

function readInitialPreference(): CliPreference {
	const rootValue = document.documentElement.dataset.nbCliPreference;
	if (isCliPreference(rootValue)) return rootValue;

	return readStoredPreference() ?? readRouteDefault();
}

let preference = readInitialPreference();
document.documentElement.dataset.nbCliPreference = preference;

function applyPreference(value: CliPreference): void {
	preference = value;
	document.documentElement.dataset.nbCliPreference = value;
	listeners.forEach((listener) => listener(value));
}

export function getCliPreference(): CliPreference {
	return preference;
}

export function setCliPreference(value: CliPreference): void {
	try {
		localStorage.setItem(STORAGE_KEY, value);
		delete runtime.__nbCliPreferenceOverride;
	} catch {
		runtime.__nbCliPreferenceOverride = value;
	}
	if (value === preference) return;
	applyPreference(value);
}

export function subscribeCliPreference(
	listener: (value: CliPreference) => void,
): () => void {
	listeners.add(listener);
	listener(preference);
	return () => listeners.delete(listener);
}

function handleStorage(event: StorageEvent): void {
	if (event.key !== STORAGE_KEY && event.key !== null) return;
	try {
		if (event.storageArea && event.storageArea !== localStorage) return;
	} catch {
		return;
	}
	if (runtime.__nbCliPreferenceOverride) {
		applyPreference(runtime.__nbCliPreferenceOverride);
		return;
	}
	applyPreference(
		isCliPreference(event.newValue) ? event.newValue : readRouteDefault(),
	);
}

function handleAfterSwap(): void {
	if (runtime.__nbCliPreferenceOverride) {
		applyPreference(runtime.__nbCliPreferenceOverride);
		return;
	}
	const stored = readStoredPreference();
	applyPreference(stored ?? readRouteDefault());
}

runtime.__nbCliPreferenceCleanup?.();
window.addEventListener("storage", handleStorage);
document.addEventListener("astro:after-swap", handleAfterSwap);
runtime.__nbCliPreferenceCleanup = () => {
	window.removeEventListener("storage", handleStorage);
	document.removeEventListener("astro:after-swap", handleAfterSwap);
};
