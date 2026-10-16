import { track } from "~/util/zaraz";

export function registerPreferredSource(): void {
	document.addEventListener("click", (event) => {
		const link = (event.target as Element | null)?.closest<HTMLAnchorElement>(
			"a[data-preferred-source]",
		);
		if (!link) return;
		track("preferred source click", { placement: link.dataset.placement });
	});
}
