import { mount } from "@cloudflare/nimbus-docs/client";
import {
	setCliPreference,
	subscribeCliPreference,
	type CliPreference,
} from "./cli-preference.client";

function initCliPreference(container: HTMLElement): () => void {
	const toggles = Array.from(
		container.querySelectorAll<HTMLButtonElement>("[data-nb-cli-toggle]"),
	);
	const control = container.querySelector<HTMLElement>("[data-nb-cli-control]");
	const status = container.querySelector<HTMLElement>("[data-nb-cli-status]");
	let readyFrame: number | undefined;

	const apply = (value: CliPreference) => {
		container
			.querySelectorAll<HTMLElement>("[data-nb-cli-variant]")
			.forEach((variant) => {
				variant.hidden = variant.dataset.nbCliVariant !== value;
			});
		toggles.forEach((toggle) => {
			toggle.disabled = false;
			toggle.setAttribute(
				"aria-pressed",
				String(toggle.dataset.nbCliToggle === value),
			);
		});
		control?.style.removeProperty("visibility");
		if (status) {
			status.textContent = container.contains(document.activeElement)
				? value === "cf"
					? "Showing Cloudflare CLI examples."
					: "Showing Wrangler examples."
				: "";
		}
		if (
			control &&
			!control.hasAttribute("data-nb-cli-ready") &&
			readyFrame === undefined
		) {
			readyFrame = requestAnimationFrame(() => {
				readyFrame = requestAnimationFrame(() => {
					control.setAttribute("data-nb-cli-ready", "");
					readyFrame = undefined;
				});
			});
		}
	};

	const onToggle = (event: Event) => {
		const value = (event.currentTarget as HTMLButtonElement).dataset
			.nbCliToggle;
		if (value !== "wrangler" && value !== "cf") return;
		setCliPreference(value);
	};

	toggles.forEach((toggle) => toggle.addEventListener("click", onToggle));
	const unsubscribe = subscribeCliPreference(apply);

	return () => {
		if (readyFrame !== undefined) cancelAnimationFrame(readyFrame);
		unsubscribe();
		toggles.forEach((toggle) => toggle.removeEventListener("click", onToggle));
	};
}

mount("[data-nb-cli-preference-scope]", initCliPreference);
