/**
 * Loads the <cfdocs-docs-search> mocked search + chat experience and wires the
 * global keyboard shortcuts that open it:
 *   • ⌘K / Ctrl+K and "/"  → open in Search mode
 *   • ⌘I / Ctrl+I          → open in Ask AI (chat) mode
 *
 * Mirrors the lifecycle handling of the other client scripts.
 */

import "../components/docs-search/docs-search";
import type { DocsSearchElement } from "../components/docs-search/docs-search";

function panel(): DocsSearchElement | null {
	return document.querySelector<DocsSearchElement>("cfdocs-docs-search");
}

function isTypingTarget(target: EventTarget | null): boolean {
	const el = target as HTMLElement | null;
	if (!el) return false;
	const tag = el.tagName;
	return (
		tag === "INPUT" ||
		tag === "TEXTAREA" ||
		tag === "SELECT" ||
		el.isContentEditable
	);
}

function onKeydown(e: KeyboardEvent) {
	const key = e.key.toLowerCase();

	// ⌘K / Ctrl+K → Search
	if ((e.metaKey || e.ctrlKey) && !e.altKey && key === "k") {
		e.preventDefault();
		panel()?.open("search");
		return;
	}

	// ⌘I / Ctrl+I → Ask AI
	if ((e.metaKey || e.ctrlKey) && !e.altKey && key === "i") {
		e.preventDefault();
		panel()?.open("ask");
		return;
	}

	// "/" → Search (only when not already typing somewhere)
	if (key === "/" && !e.metaKey && !e.ctrlKey && !e.altKey) {
		if (isTypingTarget(e.target)) return;
		e.preventDefault();
		panel()?.open("search");
	}
}

function init() {
	document.removeEventListener("keydown", onKeydown);
	document.addEventListener("keydown", onKeydown);
}

document.addEventListener("astro:page-load", init);

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}
