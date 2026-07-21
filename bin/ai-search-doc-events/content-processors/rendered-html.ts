import { HTMLElement } from "node-html-parser";
import type { ContentTransformer, RawSection } from "../types";
import {
	MAX_SECTION_TEXT_LENGTH,
	normalizeText,
	sha256,
	truncateText,
} from "../shared";

export const MAX_CODE_TEXT_LENGTH = 200;

function extractSections(main: HTMLElement, pageTitle: string): RawSection[] {
	const sections: RawSection[] = [];
	const headings = main.querySelectorAll("h1, h2, h3");

	for (const heading of headings) {
		const anchor = heading.getAttribute("id") ?? "";
		const headingText = normalizeText(heading.text);
		const parts: string[] = [headingText];
		const startBlock =
			heading.parentNode instanceof HTMLElement &&
			heading.parentNode.classList.contains("heading-wrapper")
				? heading.parentNode
				: heading;
		let cursor = startBlock.nextElementSibling;

		while (cursor) {
			if (/^H[123]$/.test(cursor.tagName)) break;
			const nestedHeading = cursor.querySelector("h1, h2, h3");
			if (nestedHeading) break;
			const text = normalizeText(cursor.text);
			if (text) parts.push(text);
			cursor = cursor.nextElementSibling;
		}

		const content = truncateText(parts.join("\n\n"), MAX_SECTION_TEXT_LENGTH);
		if (content) {
			sections.push({
				anchor,
				heading: headingText,
				text: content,
				hash: sha256(content),
			});
		}
	}

	const fullText = truncateText(
		normalizeText(main.text),
		MAX_SECTION_TEXT_LENGTH,
	);
	const sectionTextLength = sections.reduce(
		(total, section) => total + section.text.length,
		0,
	);
	if (fullText && (sections.length === 0 || sectionTextLength < 100)) {
		return [
			{
				anchor: sections[0]?.anchor ?? "",
				heading: sections[0]?.heading || pageTitle,
				text: fullText,
				hash: sha256(fullText),
			},
		];
	}

	return sections;
}

export const renderedHtmlProcessor: ContentTransformer = {
	name: "rendered-html",
	transform: ({ root, title }) => {
		removeNonContent(root);

		const main =
			root.querySelector(".sl-markdown-content") ??
			root.querySelector("[data-pagefind-body]") ??
			root.querySelector("main") ??
			root.querySelector("body");
		if (!main) return [];

		removeNonContent(main);
		return extractSections(main, title);
	},
};

export function removeNonContent(root: HTMLElement) {
	for (const selector of [
		"script",
		"style",
		"svg",
		"nav",
		"header",
		"footer",
		"button",
		'[aria-hidden="true"]',
		"astro-breadcrumbs",
		".c-breadcrumbs",
		".breadcrumbs",
		".pagination-links",
		".right-sidebar",
		".right-sidebar-container",
		".sl-container > .right-sidebar",
		".example-raw-response",
	]) {
		for (const node of root.querySelectorAll(selector)) node.remove();
	}

	for (const node of root.querySelectorAll("pre, code")) {
		const text = normalizeText(node.text);
		if (text.length > MAX_CODE_TEXT_LENGTH) {
			node.set_content(truncateText(text, MAX_CODE_TEXT_LENGTH));
		}
	}
}
