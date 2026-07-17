import { mount } from "nimbus-docs/client";
import tippy, { type Instance } from "tippy.js";
import { track } from "~/util/zaraz";

const COPY_LABEL = "Copy as Markdown";

/**
 * Wires the page-actions row. Matches production behavior (src/components/
 * PageActions.astro): zaraz `track` on every clickable action, a tippy tooltip
 * on Agent setup, and the Safari-safe clipboard write (the ClipboardItem is
 * constructed synchronously inside the click gesture so Safari accepts the
 * async fetch).
 *
 * Copy / View target the page's `index.md` twin *relatively* — resolved against
 * the current URL — so no per-page prop is needed. On pages without a twin the
 * fetch/navigation 404s (intended until edge Markdown-for-Agents ships).
 */
function initPageActions(root: HTMLElement): () => void {
	const cleanups: Array<() => void> = [];

	// Relative to the current page: /foo/bar/ -> /foo/bar/index.md. This mirrors
	// the `href="index.md"` on the View link and prod's edge markdown shape.
	const mdUrl = new URL("index.md", window.location.href).href;

	// --- Copy as Markdown ---
	const copyBtn = root.querySelector<HTMLButtonElement>(
		"[data-nb-page-actions-copy]",
	);
	const copyIcon = root.querySelector<SVGElement>(
		"[data-nb-page-actions-copy-icon]",
	);
	const checkIcon = root.querySelector<SVGElement>(
		"[data-nb-page-actions-check-icon]",
	);
	const label = root.querySelector<HTMLSpanElement>(
		"[data-nb-page-actions-label]",
	);

	if (copyBtn) {
		let resetTimer: number | undefined;

		const showState = (state: "copied" | "error") => {
			if (state === "copied") {
				copyIcon?.classList.add("hidden");
				checkIcon?.classList.remove("hidden");
				if (label) label.textContent = "Copied!";
			} else if (label) {
				label.textContent = "Couldn't copy";
			}
			if (resetTimer) window.clearTimeout(resetTimer);
			resetTimer = window.setTimeout(() => {
				copyIcon?.classList.remove("hidden");
				checkIcon?.classList.add("hidden");
				if (label) label.textContent = COPY_LABEL;
			}, 1500);
		};

		const handleCopy = () => {
			try {
				// Build the ClipboardItem synchronously in the gesture (Safari).
				navigator.clipboard
					.write([
						new ClipboardItem({
							"text/plain": fetch(mdUrl)
								.then((r) => {
									if (!r.ok) throw new Error(String(r.status));
									return r.text();
								})
								.then((t) => new Blob([t], { type: "text/plain" })),
						}),
					])
					.then(() => {
						showState("copied");
						track("agents toolkit clicked", { value: "copy markdown" });
					})
					.catch(() => showState("error"));
			} catch {
				showState("error");
			}
		};

		copyBtn.addEventListener("click", handleCopy);
		cleanups.push(() => {
			if (resetTimer) window.clearTimeout(resetTimer);
			copyBtn.removeEventListener("click", handleCopy);
		});
	}

	// --- View as Markdown: native navigation (href="index.md"); track only ---
	const viewLink = root.querySelector<HTMLAnchorElement>(
		"[data-nb-page-actions-view]",
	);
	if (viewLink) {
		const onView = () =>
			track("agents toolkit clicked", { value: "view markdown" });
		viewLink.addEventListener("click", onView);
		cleanups.push(() => viewLink.removeEventListener("click", onView));
	}

	// --- Agent setup: tooltip + track ---
	const agentLink = root.querySelector<HTMLAnchorElement>(
		"[data-nb-page-actions-agent]",
	);
	if (agentLink) {
		const onAgent = () =>
			track("agents toolkit clicked", { value: "view ai options" });
		agentLink.addEventListener("click", onAgent);

		// Direct tippy (not addTooltip) so we hold the instance and can destroy it
		// on teardown, and so opts match prod exactly (no interactive/allowHTML).
		const tip: Instance = tippy(agentLink, {
			content: agentLink.getAttribute("aria-label") ?? "",
			appendTo: () => document.body,
		});

		cleanups.push(() => {
			agentLink.removeEventListener("click", onAgent);
			tip.destroy();
		});
	}

	return () => cleanups.forEach((fn) => fn());
}

mount("[data-nb-page-actions]", initPageActions);
