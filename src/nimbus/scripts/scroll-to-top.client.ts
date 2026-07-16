// Update ring on scroll, reveal past threshold, scroll to top on click.

import { mount } from "nimbus-docs/client";
import { addTooltip } from "../util/tippy";

const SHOW_AFTER_PX = 300;

function initScrollToTop(btn: HTMLElement): () => void {
	const progress = btn.querySelector<SVGCircleElement>(".nb-scroll-progress");
	addTooltip(btn, "Back to top", { placement: "left" });

	function update() {
		const doc = document.documentElement;
		const max = doc.scrollHeight - doc.clientHeight;
		const pct = max > 0 ? Math.min(doc.scrollTop / max, 1) : 0;
		if (progress) progress.style.strokeDashoffset = String(1 - pct);
		btn.toggleAttribute("data-nb-visible", doc.scrollTop > SHOW_AFTER_PX);
	}

	function onClick() {
		const reduce = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		window.scrollTo({ top: 0, behavior: reduce ? "auto" : "smooth" });
	}

	update();
	window.addEventListener("scroll", update, { passive: true });
	btn.addEventListener("click", onClick);

	return () => {
		window.removeEventListener("scroll", update);
		btn.removeEventListener("click", onClick);
	};
}

mount("[data-nb-scroll-top]", initScrollToTop);
