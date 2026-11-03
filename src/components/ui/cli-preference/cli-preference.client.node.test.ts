import { beforeEach, describe, expect, test, vi } from "vitest";

async function loadPreference() {
	vi.resetModules();
	return import("./cli-preference.client");
}

describe("CLI preference", () => {
	beforeEach(() => {
		localStorage.clear();
		delete document.documentElement.dataset.nbCliPreference;
		delete (
			window as typeof window & {
				__nbCliPreferenceOverride?: "wrangler" | "cf";
			}
		).__nbCliPreferenceOverride;
		window.history.replaceState({}, "", "/");
		vi.restoreAllMocks();
	});

	test("defaults to Wrangler", async () => {
		const preference = await loadPreference();
		expect(preference.getCliPreference()).toBe("wrangler");
	});

	test("uses the route default when no preference is stored", async () => {
		window.history.replaceState({}, "", "/cf/get-started/");
		const preference = await loadPreference();
		expect(preference.getCliPreference()).toBe("cf");
	});

	test("prefers a saved selection over the route default", async () => {
		window.history.replaceState({}, "", "/cf/get-started/");
		localStorage.setItem("ui-cli-preference", "wrangler");
		const preference = await loadPreference();
		expect(preference.getCliPreference()).toBe("wrangler");
	});

	test("persists an explicit selection of the active route default", async () => {
		window.history.replaceState({}, "", "/cf/get-started/");
		const preference = await loadPreference();

		preference.setCliPreference("cf");

		expect(localStorage.getItem("ui-cli-preference")).toBe("cf");
	});

	test("persists and synchronously publishes changes", async () => {
		const preference = await loadPreference();
		const listener = vi.fn();
		const unsubscribe = preference.subscribeCliPreference(listener);

		preference.setCliPreference("cf");

		expect(localStorage.getItem("ui-cli-preference")).toBe("cf");
		expect(document.documentElement.dataset.nbCliPreference).toBe("cf");
		expect(listener).toHaveBeenNthCalledWith(1, "wrangler");
		expect(listener).toHaveBeenNthCalledWith(2, "cf");

		unsubscribe();
	});

	test("retains in-memory state when storage throws", async () => {
		vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
			throw new DOMException("Blocked", "SecurityError");
		});
		vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
			throw new DOMException("Blocked", "SecurityError");
		});
		const preference = await loadPreference();

		preference.setCliPreference("cf");
		window.history.replaceState({}, "", "/workers/wrangler/");
		document.dispatchEvent(new Event("astro:after-swap"));

		expect(preference.getCliPreference()).toBe("cf");
	});

	test("updates the route default when storage is blocked", async () => {
		vi.spyOn(Storage.prototype, "getItem").mockImplementation(() => {
			throw new DOMException("Blocked", "SecurityError");
		});
		const preference = await loadPreference();

		window.history.replaceState({}, "", "/cf/get-started/");
		document.dispatchEvent(new Event("astro:after-swap"));

		expect(preference.getCliPreference()).toBe("cf");
	});

	test("retains in-memory state when only storage writes throw", async () => {
		localStorage.setItem("ui-cli-preference", "wrangler");
		vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
			throw new DOMException("Full", "QuotaExceededError");
		});
		const preference = await loadPreference();

		preference.setCliPreference("cf");
		window.history.replaceState({}, "", "/workers/wrangler/");
		document.dispatchEvent(new Event("astro:after-swap"));

		expect(preference.getCliPreference()).toBe("cf");
	});

	test("retains an in-memory override across storage events", async () => {
		vi.spyOn(Storage.prototype, "setItem").mockImplementation(() => {
			throw new DOMException("Full", "QuotaExceededError");
		});
		const preference = await loadPreference();

		preference.setCliPreference("cf");
		window.dispatchEvent(
			new StorageEvent("storage", {
				key: "ui-cli-preference",
				newValue: "wrangler",
				storageArea: localStorage,
			}),
		);
		document.dispatchEvent(new Event("astro:after-swap"));

		expect(preference.getCliPreference()).toBe("cf");
	});

	test("treats clearing local storage as a route-default reset", async () => {
		window.history.replaceState({}, "", "/cf/get-started/");
		const preference = await loadPreference();
		preference.setCliPreference("wrangler");
		window.dispatchEvent(
			new StorageEvent("storage", {
				key: null,
				newValue: null,
				storageArea: localStorage,
			}),
		);
		expect(preference.getCliPreference()).toBe("cf");
	});

	test("applies the route default after Astro navigation", async () => {
		await loadPreference();
		window.history.replaceState({}, "", "/cf/get-started/");
		document.dispatchEvent(new Event("astro:after-swap"));
		expect(document.documentElement.dataset.nbCliPreference).toBe("cf");
	});

	test("replaces global listeners when the module reloads", async () => {
		const removeWindowListener = vi.spyOn(window, "removeEventListener");
		const removeDocumentListener = vi.spyOn(document, "removeEventListener");

		await loadPreference();
		await loadPreference();

		expect(removeWindowListener).toHaveBeenCalledWith(
			"storage",
			expect.any(Function),
		);
		expect(removeDocumentListener).toHaveBeenCalledWith(
			"astro:after-swap",
			expect.any(Function),
		);
	});
});
