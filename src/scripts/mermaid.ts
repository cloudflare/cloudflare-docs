const diagrams = document.querySelectorAll<HTMLPreElement>("pre.mermaid");

// Skip all setup if no mermaid diagrams on this page
if (diagrams.length === 0) {
	// No-op — avoid creating dialog, listeners, or loading the mermaid bundle
} else {
	let init = false;

	// Full-screen expand dialog (lazy — only created because diagrams exist)
	let dialog: HTMLDialogElement | null = null;

	function getDialog(): HTMLDialogElement {
		if (dialog) return dialog;

		dialog = document.createElement("dialog");
		dialog.className = "mermaid-dialog";
		dialog.innerHTML = `
			<div class="mermaid-dialog-body"></div>
			<button class="mermaid-dialog-close" aria-label="Close">
				<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
					<line x1="18" y1="6" x2="6" y2="18"></line>
					<line x1="6" y1="6" x2="18" y2="18"></line>
				</svg>
			</button>
		`;
		document.body.appendChild(dialog);

		function closeWithAnimation() {
			if (!dialog || !dialog.open) return;
			dialog.classList.add("closing");
			dialog.addEventListener(
				"animationend",
				() => {
					dialog!.classList.remove("closing");
					dialog!.close();
					document.documentElement.style.overflow = "";
				},
				{ once: true },
			);
		}

		dialog.addEventListener("click", (e) => {
			if (e.target === dialog) closeWithAnimation();
		});
		dialog
			.querySelector(".mermaid-dialog-close")
			?.addEventListener("click", () => {
				closeWithAnimation();
			});
		// Handle Escape key — native dialog closes immediately,
		// so we intercept cancel to animate first
		dialog.addEventListener("cancel", (e) => {
			e.preventDefault();
			closeWithAnimation();
		});

		return dialog;
	}

	function openDiagram(container: HTMLElement) {
		const d = getDialog();
		const clone = container.cloneNode(true) as HTMLElement;

		// Remove the expand button from the clone
		clone.querySelector(".mermaid-expand")?.remove();

		// Let the SVG scale freely in the expanded view
		const svg = clone.querySelector("svg");
		if (svg) {
			svg.removeAttribute("style");
			svg.setAttribute("width", "100%");
			svg.setAttribute("height", "auto");
		}

		const body = d.querySelector(".mermaid-dialog-body");
		if (!body) return;
		body.replaceChildren(clone);

		// Close dialog when clicking Mermaid `click` links inside the expanded view.
		clone.addEventListener("click", (e) => {
			const target = e.target as Element;
			const anchor = target.closest("a");
			const clickable = target.closest(".clickable");
			if (anchor || clickable) {
				// Skip animation for link clicks — navigate immediately
				d.close();
				document.documentElement.style.overflow = "";
			}
		});

		document.documentElement.style.overflow = "hidden";
		d.showModal();
	}

	// Get computed font family from CSS variable
	function getFontFamily(): string {
		const computedStyle = getComputedStyle(document.documentElement);
		const slFont = computedStyle.getPropertyValue("--__sl-font").trim();
		return slFont || "system-ui, -apple-system, sans-serif";
	}

	// Read the actual page background color from CSS
	function getPageBackground(): string {
		const style = getComputedStyle(document.documentElement);
		const bg = style.getPropertyValue("--sl-color-bg").trim();
		return (
			bg ||
			(document.documentElement.getAttribute("data-theme") === "light"
				? "#ffffff"
				: "#1d1d1d")
		);
	}

	// Create wrapper container with annotation
	function wrapDiagram(diagram: HTMLPreElement, title: string | null) {
		// Skip if already wrapped
		if (diagram.parentElement?.classList.contains("mermaid-container")) {
			return;
		}

		// Create container
		const container = document.createElement("div");
		container.className = "mermaid-container";

		// Wrap the diagram
		diagram.parentNode?.insertBefore(container, diagram);
		container.appendChild(diagram);

		// Add expand button
		const expandBtn = document.createElement("button");
		expandBtn.className = "mermaid-expand";
		expandBtn.setAttribute("aria-label", "Expand diagram");
		expandBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<polyline points="15 3 21 3 21 9"></polyline>
			<polyline points="9 21 3 21 3 15"></polyline>
			<line x1="21" y1="3" x2="14" y2="10"></line>
			<line x1="3" y1="21" x2="10" y2="14"></line>
		</svg>`;
		expandBtn.addEventListener("click", () => openDiagram(container));
		container.appendChild(expandBtn);

		// Add annotation footer if title exists
		if (title) {
			const footer = document.createElement("div");
			footer.className = "mermaid-annotation";

			const titleSpan = document.createElement("span");
			titleSpan.className = "mermaid-annotation-title";
			titleSpan.textContent = title;

			const logo = document.createElement("img");
			logo.src = "/logo.svg";
			logo.alt = "Cloudflare";
			logo.className = "mermaid-annotation-logo";

			footer.appendChild(titleSpan);
			footer.appendChild(logo);
			container.appendChild(footer);
		}
	}

	async function render() {
		// Dynamically import mermaid — the ~2.5 MB bundle is only fetched
		// on the ~2% of pages that actually contain diagrams.
		const { default: mermaid } = await import("mermaid");

		const isLight =
			document.documentElement.getAttribute("data-theme") === "light";
		const fontFamily = getFontFamily();
		const pageBg = getPageBackground();

		// Custom theme variables for Cloudflare branding
		const lightThemeVars = {
			fontFamily,
			primaryColor: "#fef1e6", // cl1-orange-9 (very light orange for node backgrounds)
			primaryBorderColor: "#f6821f", // cl1-brand-orange
			primaryTextColor: "#1d1d1d", // cl1-gray-0
			secondaryColor: "#f2f2f2", // cl1-gray-9
			secondaryBorderColor: "#999999", // cl1-gray-6
			secondaryTextColor: "#1d1d1d", // cl1-gray-0
			tertiaryColor: "#f2f2f2", // cl1-gray-9
			tertiaryBorderColor: "#999999", // cl1-gray-6
			tertiaryTextColor: "#1d1d1d", // cl1-gray-0
			lineColor: "#f6821f", // cl1-brand-orange for arrows
			textColor: "#1d1d1d", // cl1-gray-0
			mainBkg: "#fef1e6", // cl1-orange-9
			errorBkgColor: "#ffefee", // cl1-red-9
			errorTextColor: "#3c0501", // cl1-red-0
			edgeLabelBackground: pageBg, // match page background to occlude arrows
			labelBackground: pageBg,
		};

		const darkThemeVars = {
			fontFamily,
			primaryColor: "#482303", // cl1-orange-1 (dark orange for node backgrounds)
			primaryBorderColor: "#f6821f", // cl1-brand-orange
			primaryTextColor: "#f2f2f2", // cl1-gray-9
			secondaryColor: "#313131", // cl1-gray-1
			secondaryBorderColor: "#797979", // cl1-gray-5
			secondaryTextColor: "#f2f2f2", // cl1-gray-9
			tertiaryColor: "#313131", // cl1-gray-1
			tertiaryBorderColor: "#797979", // cl1-gray-5
			tertiaryTextColor: "#f2f2f2", // cl1-gray-9
			lineColor: "#f6821f", // cl1-brand-orange for arrows
			textColor: "#f2f2f2", // cl1-gray-9
			mainBkg: "#482303", // cl1-orange-1
			background: "#1d1d1d", // cl1-gray-0
			errorBkgColor: "#3c0501", // cl1-red-0
			errorTextColor: "#ffefee", // cl1-red-9
			edgeLabelBackground: pageBg, // match page background to occlude arrows
			labelBackground: pageBg,
		};

		const themeVariables = isLight ? lightThemeVars : darkThemeVars;

		// Initialize once before the loop — config is identical for all diagrams
		mermaid.initialize({
			startOnLoad: false,
			theme: "base",
			themeVariables,
			flowchart: {
				htmlLabels: true,
				useMaxWidth: true,
				curve: "linear",
			},
		});

		for (const diagram of diagrams) {
			try {
				if (!init) {
					diagram.setAttribute("data-diagram", diagram.textContent as string);
				}

				const def = diagram.getAttribute("data-diagram") as string;

				const { svg } = await mermaid.render(
					`mermaid-${crypto.randomUUID()}`,
					def,
				);
				diagram.innerHTML = svg;

				// Extract title from SVG for annotation
				const svgElement = diagram.querySelector("svg");
				const titleElement = svgElement?.querySelector("title");
				const title = titleElement?.textContent?.trim() || null;

				// Wrap diagram with container and annotation
				wrapDiagram(diagram, title);
			} catch (e) {
				console.error("Mermaid render failed:", e);
			}

			diagram.setAttribute("data-processed", "true");
		}

		init = true;
	}

	const obs = new MutationObserver(() => render());

	obs.observe(document.documentElement, {
		attributes: true,
		attributeFilter: ["data-theme"],
	});

	render();
}
