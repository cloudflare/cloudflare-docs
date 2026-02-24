/**
 * Rehype plugin: renders mermaid code fences to SVG at build time
 * using beautiful-mermaid. Replaces the bulk of client-side rendering.
 *
 * Code fences (```mermaid ... ```) are rendered at build time.
 * Legacy <pre class="mermaid"> blocks (from JSX/MDX) are left for
 * the slim client-side fallback in src/scripts/mermaid.ts.
 *
 * Theme switching is handled via CSS custom properties — the SVG
 * references --mermaid-* variables that are set in mermaid.css with
 * light/dark variants.
 */

import { visitParents } from "unist-util-visit-parents";
import type { Root, Element, ElementContent } from "hast";
import { parse } from "space-separated-tokens";
import { toText } from "hast-util-to-text";
import { fromHtml } from "hast-util-from-html";
import { renderMermaidSVG } from "beautiful-mermaid";

interface CodeInstance {
	diagram: string;
	ancestors: Element[];
}

const nonWhitespacePattern = /\S/;
let idCounter = 0;

/**
 * Render options for beautiful-mermaid.
 *
 * Uses CSS custom properties so the SVG adapts to light/dark themes
 * purely via the CSS cascade — no client-side re-rendering needed.
 * The actual color values are defined in src/styles/mermaid.css on
 * .mermaid-container, with different values for :root[data-theme="dark"].
 */
const RENDER_OPTIONS = {
	bg: "var(--mermaid-bg)",
	fg: "var(--mermaid-fg)",
	accent: "var(--mermaid-accent)",
	line: "var(--mermaid-line)",
	surface: "var(--mermaid-surface)",
	border: "var(--mermaid-border)",
	muted: "var(--mermaid-muted)",
	transparent: true,
	font: "Inter",
} as const;

/**
 * Extract accTitle from mermaid source text.
 * Mermaid syntax: `accTitle: Some Title Here`
 */
function extractAccTitle(diagram: string): string | null {
	const match = diagram.match(/^\s*accTitle:\s*(.+)/m);
	return match ? match[1].trim() : null;
}

/**
 * Extract accDescr from mermaid source text.
 * Supports single-line: `accDescr: Some description`
 */
function extractAccDescr(diagram: string): string | null {
	const match = diagram.match(/^\s*accDescr:\s*(.+)/m);
	return match ? match[1].trim() : null;
}

/**
 * Strip trailing semicolons from the diagram header line.
 * Some legacy diagrams use `flowchart TD;` which beautiful-mermaid rejects.
 */
function normalizeDiagram(diagram: string): string {
	return diagram.replace(
		/^(\s*(?:flowchart|graph|sequenceDiagram|stateDiagram(?:-v2)?|classDiagram|erDiagram)\b[^;\n]*);/m,
		"$1",
	);
}

/**
 * Post-process SVG to:
 * 1. Remove the Google Fonts @import (the page already loads its own fonts)
 * 2. Inject <title> and <desc> for accessibility
 * 3. Add role="img" and aria-labelledby
 */
function postProcessSvg(
	svg: string,
	accTitle: string | null,
	accDescr: string | null,
): string {
	// Strip Google Fonts @import line
	svg = svg.replace(/\s*@import url\([^)]+\);\s*/g, "\n  ");

	// Inject accessibility elements after the opening <svg> tag
	if (accTitle || accDescr) {
		const titleId = `mermaid-title-${idCounter++}`;
		const descrId = accDescr ? `mermaid-desc-${idCounter++}` : null;

		const ariaIds = [titleId, descrId].filter(Boolean).join(" ");
		const accessibilityElements = [
			accTitle ? `<title id="${titleId}">${escapeXml(accTitle)}</title>` : "",
			accDescr ? `<desc id="${descrId}">${escapeXml(accDescr)}</desc>` : "",
		]
			.filter(Boolean)
			.join("");

		// Add role="img" and aria-labelledby to the <svg> element
		svg = svg.replace("<svg ", `<svg role="img" aria-labelledby="${ariaIds}" `);

		// Insert title/desc after the opening <svg ...> tag
		svg = svg.replace(/(<svg[^>]*>)/, `$1${accessibilityElements}`);
	}

	return svg;
}

function escapeXml(str: string): string {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

/**
 * Build the annotation footer HAST element.
 * Shows the accTitle on the left and Cloudflare logo on the right.
 */
function buildAnnotationFooter(title: string): Element {
	return {
		type: "element",
		tagName: "div",
		properties: { className: ["mermaid-annotation"] },
		children: [
			{
				type: "element",
				tagName: "span",
				properties: { className: ["mermaid-annotation-title"] },
				children: [{ type: "text", value: title }],
			},
			{
				type: "element",
				tagName: "img",
				properties: {
					src: "/logo.svg",
					alt: "Cloudflare",
					className: ["mermaid-annotation-logo"],
				},
				children: [],
			},
		],
	};
}

function isMermaidCodeElement(element: Element): boolean {
	if (element.tagName !== "code") {
		return false;
	}

	let className = element.properties?.className;
	if (typeof className === "string") {
		className = parse(className);
	}

	if (!Array.isArray(className)) {
		return false;
	}

	return className.includes("language-mermaid");
}

export default function () {
	return function (tree: Root) {
		const instances: CodeInstance[] = [];

		visitParents(tree, "element", (node, ancestors) => {
			if (!isMermaidCodeElement(node)) {
				return;
			}

			const parent = ancestors.at(-1)!;
			let inclusiveAncestors = ancestors as Element[];

			if (parent.type === "element" && parent.tagName === "pre") {
				for (const child of parent.children) {
					if (child.type === "text") {
						if (nonWhitespacePattern.test(child.value)) {
							return;
						}
					} else if (child !== node) {
						return;
					}
				}
			} else {
				inclusiveAncestors = [...inclusiveAncestors, node];
			}

			instances.push({
				diagram: toText(node, { whitespace: "pre" }),
				ancestors: inclusiveAncestors,
			});
		});

		if (!instances.length) {
			return;
		}

		for (const { ancestors, diagram } of instances) {
			const parent = ancestors.at(-2)!;
			const node = ancestors.at(-1)!;

			// Extract accessibility metadata before rendering
			const accTitle = extractAccTitle(diagram);
			const accDescr = extractAccDescr(diagram);

			// Normalize syntax (strip trailing semicolons from header)
			const normalizedDiagram = normalizeDiagram(diagram);

			// Render SVG at build time
			let svgString: string;
			try {
				svgString = renderMermaidSVG(normalizedDiagram, RENDER_OPTIONS);
			} catch (error) {
				// On render failure, preserve raw diagram text with error info.
				// This prevents the build from breaking and makes failures visible.
				const message = error instanceof Error ? error.message : String(error);
				console.warn(`[rehype-mermaid] Failed to render diagram: ${message}`);

				parent.children[parent.children.indexOf(node)] = {
					type: "element",
					tagName: "pre",
					properties: {
						className: ["mermaid", "mermaid-error"],
						dataError: message,
					},
					children: [{ type: "text", value: diagram }],
				};
				continue;
			}

			// Post-process SVG: strip font imports, add accessibility attributes
			svgString = postProcessSvg(svgString, accTitle, accDescr);

			// Parse SVG string into proper HAST nodes (not raw — raw is unreliable in Astro MDX)
			const svgHast = fromHtml(svgString, { fragment: true });

			// Build the container children: diagram wrapper + optional annotation
			const containerChildren: ElementContent[] = [
				{
					type: "element",
					tagName: "div",
					properties: { className: ["mermaid-diagram"] },
					children: svgHast.children as ElementContent[],
				},
			];

			if (accTitle) {
				containerChildren.push(buildAnnotationFooter(accTitle));
			}

			// Store original diagram text as data attribute for export pipelines
			parent.children[parent.children.indexOf(node)] = {
				type: "element",
				tagName: "div",
				properties: {
					className: ["mermaid-container"],
					dataDiagram: diagram,
				},
				children: containerChildren,
			};
		}
	};
}
