/**
 * Client-side fallback for legacy <pre class="mermaid"> blocks.
 *
 * Most diagrams (```mermaid code fences) are rendered at build time by
 * the rehype plugin using beautiful-mermaid. This script ONLY handles
 * the ~9 legacy <pre class="mermaid"> blocks that use JSX template
 * expressions and cannot be processed at build time.
 *
 * Uses a dynamic import so beautiful-mermaid (~1.6MB with elkjs) is
 * only fetched on pages that actually have legacy mermaid blocks.
 */

const diagrams = document.querySelectorAll<HTMLPreElement>("pre.mermaid");

if (diagrams.length > 0) {
	/** Cloudflare-branded theme using beautiful-mermaid's enrichment model */
	function getThemeOptions() {
		const isLight =
			document.documentElement.getAttribute("data-theme") === "light";

		return isLight
			? {
					bg: "#ffffff",
					fg: "#1d1d1d",
					accent: "#f6821f",
					line: "#f6821f",
					surface: "#fef1e6",
					border: "#f6821f",
					muted: "#999999",
					transparent: true,
					font: "Inter",
				}
			: {
					bg: "#1d1d1d",
					fg: "#f2f2f2",
					accent: "#f6821f",
					line: "#f6821f",
					surface: "#482303",
					border: "#f6821f",
					muted: "#797979",
					transparent: true,
					font: "Inter",
				};
	}

	/** Extract accTitle from mermaid source text */
	function extractAccTitle(text: string): string | null {
		const match = text.match(/^\s*accTitle:\s*(.+)/m);
		return match ? match[1].trim() : null;
	}

	/** Strip trailing semicolons from diagram header */
	function normalizeDiagram(text: string): string {
		return text.replace(
			/^(\s*(?:flowchart|graph|sequenceDiagram|stateDiagram(?:-v2)?|classDiagram|erDiagram)\b[^;\n]*);/m,
			"$1",
		);
	}

	/** Create wrapper container with annotation footer */
	function wrapDiagram(diagram: HTMLPreElement, title: string | null) {
		if (diagram.parentElement?.classList.contains("mermaid-container")) {
			return;
		}

		const container = document.createElement("div");
		container.className = "mermaid-container";

		diagram.parentNode?.insertBefore(container, diagram);
		container.appendChild(diagram);

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

	// Dynamic import — only loads beautiful-mermaid on pages with legacy blocks
	import("beautiful-mermaid").then(({ renderMermaidSVG }) => {
		function render() {
			const options = getThemeOptions();

			for (const diagram of diagrams) {
				const source =
					diagram.getAttribute("data-diagram") || diagram.textContent || "";

				// Store the original source on first render
				if (!diagram.hasAttribute("data-diagram")) {
					diagram.setAttribute("data-diagram", source);
				}

				const accTitle = extractAccTitle(source);
				const normalized = normalizeDiagram(source);

				try {
					let svg = renderMermaidSVG(normalized, options);

					// Strip Google Fonts @import (the page already loads its fonts)
					svg = svg.replace(/\s*@import url\([^)]+\);\s*/g, "\n  ");

					diagram.innerHTML = svg;
					wrapDiagram(diagram, accTitle);
					diagram.setAttribute("data-processed", "true");
				} catch (error) {
					console.warn(
						"[mermaid] Failed to render diagram:",
						error instanceof Error ? error.message : error,
					);
					diagram.classList.add("mermaid-error");
					diagram.setAttribute("data-processed", "error");
				}
			}
		}

		// Observe theme changes and re-render (client-side diagrams need re-rendering
		// because their colors are baked in, unlike build-time SVGs which use CSS vars)
		const obs = new MutationObserver(() => render());
		obs.observe(document.documentElement, {
			attributes: true,
			attributeFilter: ["data-theme"],
		});

		render();
	});
}
