import {
	collectComponentDescriptors,
	findComponentContext,
	type EditableDescriptor,
	type EditableMode,
} from "./adapters";

export { findComponentContext, type EditableDescriptor, type EditableMode };

const EXTERNAL_LINK_ARROW_RE = /\s*\u2197\uFE0E?/g;

function stripExternalLinkArrow(value: string): string {
	return value.replace(EXTERNAL_LINK_ARROW_RE, "");
}

const EDITABLE_PROSE_SELECTOR =
	"p, h1, h2, h3, h4, h5, h6, li, blockquote, td, th";

const EXCLUDED_ANCESTOR_SELECTOR = [
	"pre",
	"svg",
	"astro-island",
	"button",
	"[data-nb-button]",
	"[data-file-tree]",
	"script",
	"style",
	"cfdocs-dev-editor",
	".nb-code-figure",
	".mermaid",
	".sr-only",
	"[aria-hidden='true']",
	"[data-dev-editor-ignore]",
].join(", ");

const NESTED_BLOCK_SELECTOR = [
	"p",
	"ul",
	"ol",
	"blockquote",
	"pre",
	"table",
	"aside",
	"details",
	".heading-wrapper",
	".nb-code-figure",
	"astro-island",
].join(", ");

const EMBEDDED_NON_EDITABLE_SELECTOR = [
	"button",
	"[data-nb-button]",
	"svg",
	"astro-island",
].join(", ");

const CONTAINER_TAGS = new Set(["li", "blockquote", "td", "th"]);
const BLOCK_CHILD_TAGS = new Set(["p", "div"]);

const PARTIAL_START_PREFIX = "cfdocs-dev-partial-start:";
const PARTIAL_END_MARKER = "cfdocs-dev-partial-end";

function isIgnoredInlineElement(el: Element): boolean {
	if (el.getAttribute("aria-hidden") === "true") return true;
	if (el.classList.contains("sr-only")) return true;
	if (el.classList.contains("anchor-link")) return true;
	if (el.classList.contains("anchor-icon")) return true;
	if (el.classList.contains("external-link")) return true;
	return false;
}

function wrapInlineCode(text: string): string {
	const cleaned = text.replace(/\u00a0/g, " ");
	if (!cleaned) return "";
	const matches = cleaned.match(/`+/g);
	const maxRun = matches ? Math.max(...matches.map((run) => run.length)) : 0;
	const fence = "`".repeat(maxRun + 1);
	const needsPadding =
		cleaned.startsWith("`") ||
		cleaned.endsWith("`") ||
		(cleaned.startsWith(" ") &&
			cleaned.endsWith(" ") &&
			cleaned.trim().length > 0);
	return needsPadding
		? `${fence} ${cleaned} ${fence}`
		: `${fence}${cleaned}${fence}`;
}

function serializeChildNodes(parent: Node): string {
	let output = "";
	for (const child of Array.from(parent.childNodes)) {
		output += serializeNode(child);
	}
	return output;
}

function serializeNode(node: Node): string {
	if (node.nodeType === Node.TEXT_NODE) {
		const raw = (node.textContent ?? "").replace(/\u00a0/g, " ");
		const cleaned = stripExternalLinkArrow(raw);
		return cleaned.replace(/[ \t\r\n]+/g, " ");
	}

	if (node.nodeType !== Node.ELEMENT_NODE) {
		return "";
	}

	const el = node as Element;
	if (isIgnoredInlineElement(el)) return "";

	const tag = el.tagName.toLowerCase();

	if (tag === "br") return "\n";

	if (tag === "code") {
		return wrapInlineCode(el.textContent ?? "");
	}

	if (tag === "a") {
		const inner = stripExternalLinkArrow(serializeChildNodes(el)).trim();
		const href = el.getAttribute("href")?.trim();
		if (!inner) return "";
		if (!href || href === "#") return inner;
		return `[${inner}](${href})`;
	}

	if (tag === "strong" || tag === "b") {
		const inner = serializeChildNodes(el);
		return inner.trim() ? `**${inner.trim()}**` : inner;
	}

	if (tag === "em" || tag === "i") {
		const inner = serializeChildNodes(el);
		return inner.trim() ? `*${inner.trim()}*` : inner;
	}

	if (tag === "del" || tag === "s") {
		const inner = serializeChildNodes(el);
		return inner.trim() ? `~~${inner.trim()}~~` : inner;
	}

	if (tag === "kbd") {
		const inner = serializeChildNodes(el).trim();
		return inner ? `<kbd>${inner}</kbd>` : "";
	}

	if (BLOCK_CHILD_TAGS.has(tag)) {
		const inner = serializeChildNodes(el).trim();
		return inner ? `\n${inner}\n` : "";
	}

	return serializeChildNodes(el);
}

/**
 * Serialise an editable DOM block into compact, Markdown-friendly text so the
 * generated AI prompt preserves inline links, code spans, and emphasis.
 */
export function serializeBlock(element: HTMLElement): string {
	const raw = serializeChildNodes(element);
	return raw
		.split("\n")
		.map((line) => line.replace(/[ \t]+/g, " ").trim())
		.join("\n")
		.replace(/\n{3,}/g, "\n\n")
		.trim();
}

function serializeCodeNode(node: Node): string {
	if (node.nodeType === Node.TEXT_NODE) {
		return (node.textContent ?? "")
			.replace(/\r\n/g, "\n")
			.replace(/\u00a0/g, " ");
	}
	if (node.nodeType !== Node.ELEMENT_NODE) return "";
	const el = node as Element;
	const tag = el.tagName.toLowerCase();
	if (tag === "br") return "\n";
	let inner = "";
	for (const child of Array.from(el.childNodes)) {
		inner += serializeCodeNode(child);
	}
	if (BLOCK_CHILD_TAGS.has(tag)) {
		return `\n${inner}`;
	}
	return inner;
}

/**
 * Serialise an editable code block verbatim, preserving indentation and line
 * breaks while normalising browser-inserted non-breaking spaces and `<br>`.
 */
export function serializeCodeBlock(element: HTMLElement): string {
	return serializeCodeNode(element).replace(/\n$/, "");
}

export function serializeEditable(
	element: HTMLElement,
	mode: EditableMode,
): string {
	if (mode === "code") {
		return serializeCodeBlock(element);
	}
	if (mode === "single-line") {
		return serializeBlock(element).replace(/\n+/g, " ").trim();
	}
	return serializeBlock(element);
}

/**
 * Walk HTML comment markers emitted by `Render.astro` in dev mode and map every
 * descendant element inside a partial to its source file path.
 */
export function mapPartialSources(root: ParentNode): WeakMap<Element, string> {
	const map = new WeakMap<Element, string>();
	const doc = root.ownerDocument ?? (root as Document);
	if (!doc || typeof doc.createTreeWalker !== "function") return map;

	const walker = doc.createTreeWalker(
		root,
		NodeFilter.SHOW_COMMENT | NodeFilter.SHOW_ELEMENT,
	);

	const stack: string[] = [];
	let current = walker.nextNode();
	while (current) {
		if (current.nodeType === Node.COMMENT_NODE) {
			const value = (current.nodeValue ?? "").trim();
			if (value.startsWith(PARTIAL_START_PREFIX)) {
				const path = value.slice(PARTIAL_START_PREFIX.length).trim();
				if (path) stack.push(path);
			} else if (value === PARTIAL_END_MARKER) {
				stack.pop();
			}
		} else if (current.nodeType === Node.ELEMENT_NODE && stack.length > 0) {
			map.set(current as Element, stack[stack.length - 1]!);
		}
		current = walker.nextNode();
	}

	return map;
}

/**
 * Collect all editable prose and component regions on the page while
 * guaranteeing that no editable element is nested inside another editable element.
 */
export function collectEditableDescriptors(
	doc: Document,
): EditableDescriptor[] {
	const selected: EditableDescriptor[] = [];
	const selectedSet = new Set<HTMLElement>();

	const hasSelectedAncestor = (el: HTMLElement): boolean => {
		let parent = el.parentElement;
		while (parent) {
			if (selectedSet.has(parent)) return true;
			parent = parent.parentElement;
		}
		return false;
	};

	const hasSelectedDescendant = (el: HTMLElement): boolean => {
		for (const existing of selectedSet) {
			if (el.contains(existing)) return true;
		}
		return false;
	};

	const tryAdd = (descriptor: EditableDescriptor) => {
		const { element, mode } = descriptor;
		if (selectedSet.has(element)) return;
		if (hasSelectedAncestor(element)) return;
		if (hasSelectedDescendant(element)) return;
		if (serializeEditable(element, mode).length === 0) return;
		selected.push(descriptor);
		selectedSet.add(element);
	};

	// 1. Explicit frontmatter / layout editable hooks (dev-only)
	for (const el of Array.from(
		doc.querySelectorAll<HTMLElement>("[data-dev-editable]"),
	)) {
		if (el.closest("cfdocs-dev-editor, [data-dev-editor-ignore]")) continue;
		const isTitle = el.dataset.devEditable === "frontmatter:title";
		tryAdd({
			element: el,
			kind: describeElementKind(el),
			mode: isTitle ? "single-line" : "prose",
		});
	}

	// 2. Component-specific editable regions (titles, headers, labels, code blocks, etc.)
	for (const descriptor of collectComponentDescriptors(doc)) {
		tryAdd(descriptor);
	}

	// 3. Standard Markdown prose blocks inside `.docs-content`
	for (const container of Array.from(
		doc.querySelectorAll<HTMLElement>(".docs-content"),
	)) {
		const candidates = container.querySelectorAll<HTMLElement>(
			EDITABLE_PROSE_SELECTOR,
		);
		for (const el of Array.from(candidates)) {
			// Markdown-authored prose blocks never carry class names; components do.
			if (el.classList.length > 0) continue;
			if (el.closest(EXCLUDED_ANCESTOR_SELECTOR)) continue;

			const tag = el.tagName.toLowerCase();
			if (
				CONTAINER_TAGS.has(tag) &&
				el.querySelector(NESTED_BLOCK_SELECTOR) !== null
			) {
				continue;
			}

			const isHeading = /^h[1-6]$/.test(tag);
			tryAdd({
				element: el,
				kind: describeElementKind(el),
				mode: isHeading ? "single-line" : "prose",
			});
		}
	}

	// Sort into document order so the Changes drawer and prompt follow reading order.
	selected.sort((a, b) => {
		const pos = a.element.compareDocumentPosition(b.element);
		if (pos & Node.DOCUMENT_POSITION_FOLLOWING) return -1;
		if (pos & Node.DOCUMENT_POSITION_PRECEDING) return 1;
		return 0;
	});

	return selected;
}

/**
 * Convenience wrapper returning the DOM elements from `collectEditableDescriptors`.
 */
export function collectEditableElements(doc: Document): HTMLElement[] {
	return collectEditableDescriptors(doc).map((d) => d.element);
}

/**
 * Return embedded UI elements inside a prose block that should stay
 * non-editable so edits remain strictly isolated to prose text.
 */
export function findEmbeddedNonEditableElements(
	element: HTMLElement,
): HTMLElement[] {
	return Array.from(
		element.querySelectorAll<HTMLElement>(EMBEDDED_NON_EDITABLE_SELECTOR),
	);
}

/**
 * Find the closest preceding heading within the same `.docs-content` container
 * so the AI prompt can pinpoint the section being edited.
 */
export function findNearestHeading(element: HTMLElement): string | null {
	if (element.dataset.devEditable?.startsWith("frontmatter:")) {
		return null;
	}

	const container = element.closest(".docs-content");
	if (!container) return null;

	const headings = Array.from(
		container.querySelectorAll<HTMLElement>("h1, h2, h3, h4, h5, h6"),
	);
	let nearest: HTMLElement | null = null;

	for (const heading of headings) {
		if (heading === element || element.contains(heading)) continue;
		if (heading.classList.length > 0) continue;
		const pos = heading.compareDocumentPosition(element);
		if (pos & Node.DOCUMENT_POSITION_FOLLOWING) {
			nearest = heading;
		} else {
			break;
		}
	}

	if (!nearest) return null;
	const level = Number(nearest.tagName.slice(1));
	const text = serializeBlock(nearest);
	if (!text || Number.isNaN(level)) return null;
	return `${"#".repeat(level)} ${text}`;
}

export function describeElementKind(element: HTMLElement): string {
	const explicit = element.dataset.devEditable;
	if (explicit === "frontmatter:title") return "frontmatter title";
	if (explicit === "frontmatter:summary") return "frontmatter summary";
	if (element.closest("summary") && !element.closest("[data-file-tree]")) {
		return "<Details> header";
	}

	const tag = element.tagName.toLowerCase();
	switch (tag) {
		case "p":
			return "paragraph";
		case "li":
			return "list item";
		case "blockquote":
			return "blockquote";
		case "td":
			return "table cell";
		case "th":
			return "table header";
		case "h1":
		case "h2":
		case "h3":
		case "h4":
		case "h5":
		case "h6":
			return `heading (${tag})`;
		default:
			return tag;
	}
}
