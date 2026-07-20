// Click/keyboard-to-zoom for content images (T8), via medium-zoom + a
// starlight-image-zoom-style unzoom control.

import { mount } from "nimbus-docs/client";
import mediumZoom from "medium-zoom";
import type { Zoom } from "medium-zoom";
import "medium-zoom/dist/style.css";

let zoom: Zoom | null = null;

function getZoom(): Zoom {
	return (zoom ??= mediumZoom({
		margin: 24,
		background: "var(--nb-background)",
	}));
}

let closeBtn: HTMLButtonElement | null = null;
let previousFocus: HTMLElement | null = null;

const UNZOOM_ICON_PATH =
	"M21.71 2.29a1 1 0 0 0-1.42 0l-5.79 5.8V6.5a1 1 0 0 0-2 0v4a1 1 0 0 0 .08.38 1 1 0 0 0 .54.54 1 1 0 0 0 .38.08h4a1 1 0 0 0 0-2h-1.59l5.8-5.79a1 1 0 0 0 0-1.42ZM10.88 12.58a1 1 0 0 0-.38-.08h-4a1 1 0 0 0 0 2h1.59l-5.8 5.79a1 1 0 0 0 0 1.42 1 1 0 0 0 1.42 0l5.79-5.8v1.59a1 1 0 0 0 2 0v-4a1 1 0 0 0-.08-.38 1 1 0 0 0-.54-.54Z";

function getCloseButton(): HTMLButtonElement {
	if (closeBtn) return closeBtn;
	const btn = document.createElement("button");
	btn.type = "button";
	btn.className = "nb-zoom-close";
	btn.setAttribute("aria-label", "Unzoom image");
	btn.innerHTML = `<svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor"><path d="${UNZOOM_ICON_PATH}"></path></svg>`;
	btn.addEventListener("click", () => void zoom?.close());
	closeBtn = btn;
	return btn;
}

function onZoomOpen() {
	const btn = getCloseButton();
	previousFocus =
		document.activeElement instanceof HTMLElement
			? document.activeElement
			: null;
	document.body.appendChild(btn);
	void btn.offsetWidth; // reflow so opacity transitions 0 → 1
	btn.classList.add("nb-zoom-close--open");
}

function onZoomOpened() {
	closeBtn?.focus();
}

function onZoomClose() {
	closeBtn?.classList.remove("nb-zoom-close--open");
}

function onZoomClosed() {
	closeBtn?.remove();
	previousFocus?.focus();
	previousFocus = null;
}

function initImageZoom(root: HTMLElement): () => void {
	if (!(root instanceof HTMLImageElement)) return () => {};
	const img = root;
	if (img.closest("a") || img.alt === "" || "nbNoZoom" in img.dataset) {
		return () => {};
	}

	const z = getZoom();
	z.attach(img);

	img.setAttribute("role", "button");
	img.setAttribute("tabindex", "0");
	img.setAttribute("aria-label", `Zoom image: ${img.alt}`);

	function onKeydown(e: KeyboardEvent) {
		if (e.key === "Enter" || e.key === " ") {
			e.preventDefault();
			void z.open({ target: img });
		}
	}
	img.addEventListener("keydown", onKeydown);

	// Per-image: medium-zoom events don't bubble and on() only binds current images.
	img.addEventListener("medium-zoom:open", onZoomOpen);
	img.addEventListener("medium-zoom:opened", onZoomOpened);
	img.addEventListener("medium-zoom:close", onZoomClose);
	img.addEventListener("medium-zoom:closed", onZoomClosed);

	return () => {
		img.removeEventListener("keydown", onKeydown);
		img.removeEventListener("medium-zoom:open", onZoomOpen);
		img.removeEventListener("medium-zoom:opened", onZoomOpened);
		img.removeEventListener("medium-zoom:close", onZoomClose);
		img.removeEventListener("medium-zoom:closed", onZoomClosed);
		z.detach(img);
		for (const attr of ["role", "tabindex", "aria-label"]) {
			img.removeAttribute(attr);
		}
	};
}

// close() resolves on transitionend, which never fires once Astro swaps the DOM,
// wedging the singleton — force _handleCloseEnd synchronously before the swap.
document.addEventListener("astro:before-swap", () => {
	if (!zoom || !zoom.getZoomedImage()) return;
	const clones = Array.from(
		document.querySelectorAll(".medium-zoom-image--opened"),
	);
	const settle = () =>
		clones.forEach((el) => el.dispatchEvent(new Event("transitionend")));
	settle();
	void zoom.close();
	settle();
});

mount("article.docs-content img, .nb-cl-prose img", initImageZoom);
