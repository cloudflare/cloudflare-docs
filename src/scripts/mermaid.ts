import mermaid from "mermaid";

const diagrams = document.querySelectorAll<HTMLPreElement>("pre.mermaid");

let init = false;

// Get computed font family from CSS variable
function getFontFamily(): string {
	const computedStyle = getComputedStyle(document.documentElement);
	const slFont = computedStyle.getPropertyValue("--__sl-font").trim();
	return slFont || "system-ui, -apple-system, sans-serif";
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
	const isLight =
		document.documentElement.getAttribute("data-theme") === "light";
	const fontFamily = getFontFamily();

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
		edgeLabelBackground: "#ffffff", // white background for edge labels in light mode
		labelBackground: "#ffffff", // white background for labels in light mode
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
		edgeLabelBackground: "#1d1d1d", // dark background for edge labels
		labelBackground: "#1d1d1d", // dark background for labels
	};

	const themeVariables = isLight ? lightThemeVars : darkThemeVars;

	for (const diagram of diagrams) {
		if (!init) {
			diagram.setAttribute("data-diagram", diagram.textContent as string);
		}

		const def = diagram.getAttribute("data-diagram") as string;

		// Initialize with base theme and custom variables
		mermaid.initialize({
			startOnLoad: false,
			theme: "base",
			themeVariables,
			flowchart: {
				htmlLabels: true,
				useMaxWidth: true,
			},
		});

		await mermaid
			.render(`mermaid-${crypto.randomUUID()}`, def)
			.then(({ svg }) => {
				diagram.innerHTML = svg;

				// Extract title from SVG for annotation
				const svgElement = diagram.querySelector("svg");
				const titleElement = svgElement?.querySelector("title");
				const title = titleElement?.textContent?.trim() || null;

				// Wrap diagram with container and annotation
				wrapDiagram(diagram, title);
			});

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
