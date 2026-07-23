/**
 * <cfdocs-docs-search> — a mocked docs search + "ask the docs" experience,
 * modeled on the Claude/Anthropic docs search.
 *
 * Two surfaces, one element:
 *
 *   1. A centered command-palette MODAL for search. It has a Search / Ask Docs
 *      toggle in the top-right and an "Ask about <query> — Start conversation ↵"
 *      row as the entry point into chat. Live results (real Algolia hits) render
 *      below.
 *
 *   2. A right slide-in SIDEBAR for chat. When the user decides to chat (toggles
 *      to "Ask Docs", clicks the Ask-about row, or presses ↵), the modal closes
 *      and the conversation is handed off to the sidebar, where they can ask
 *      follow-up questions in a persistent, multi-turn thread.
 *
 * Retrieval is real; the streamed answer is a client-side mock (no hosted LLM),
 * so the whole thing stays dependency-free while feeling like "chat with the docs".
 */

import { ALGOLIA_APP_ID, ALGOLIA_API_KEY } from "~/util/algolia";
import { getIndexName } from "~/plugins/docsearch";
import { track } from "~/util/zaraz";

type Mode = "search" | "ask";

interface Source {
	title: string;
	url: string;
	snippet: string;
	snippetHtml: string;
}

interface AlgoliaHit {
	objectID: string;
	url?: string;
	hierarchy?: Record<string, string | null | undefined>;
	content?: string;
	_snippetResult?: { content?: { value?: string } };
}

type ContextItem =
	| { type: "page"; title: string; url: string }
	| { type: "file"; name: string; mime: string; dataUrl?: string };

// sessionStorage keys used to keep the chat open across page navigation.
const SS_OPEN = "cfdocs-chat-open";
const SS_HTML = "cfdocs-chat-html";
const SS_CTX = "cfdocs-chat-context";

const SUGGESTED_QUESTIONS = [
	"How do I deploy a Worker?",
	"What is R2 and how does pricing work?",
	"Set up a custom domain on Pages",
	"Connect a database with Hyperdrive",
];

const STYLES = `
:host { all: initial; }

/* ---------------- header trigger + ask button ---------------- */
.ds-bar { display: inline-flex; align-items: center; gap: 0.4rem; }

.ds-trigger {
	display: inline-flex; align-items: center; gap: 0.5rem;
	width: 15rem; max-width: 100%; height: 2.25rem; padding: 0 0.6rem;
	border-radius: 9999px;
	border: 1px solid var(--color-header-line, var(--sl-color-gray-5));
	background: transparent;
	color: var(--color-header-text-subtle, var(--sl-color-gray-2));
	font: inherit; font-size: 0.8125rem; line-height: 1; cursor: pointer;
	transition: color 150ms, background-color 150ms, border-color 150ms;
}
.ds-trigger:hover { background: var(--color-header-fill, var(--sl-color-gray-6)); color: var(--color-header-hover-text, var(--sl-color-white)); }
.ds-trigger .mag { width: 1rem; height: 1rem; flex-shrink: 0; opacity: 0.8; }
.ds-trigger .label { flex: 1; text-align: left; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ds-trigger kbd { padding: 0.15rem 0.35rem; border-radius: 0.35rem; border: 1px solid var(--color-header-line, var(--sl-color-gray-5)); font-size: 0.68rem; font-family: inherit; line-height: 1; opacity: 0.75; }

/* Ask Docs button — a clear, tab-focusable action next to the search bar. */
.ds-ask-btn {
	display: none; align-items: center; gap: 0.4rem;
	height: 2.25rem; padding: 0 0.85rem; border-radius: 9999px;
	border: 1px solid rgba(255, 102, 51, 0.5);
	background: transparent;
	color: var(--color-header-text, var(--sl-color-white));
	font: inherit; font-size: 0.8125rem; font-weight: 500; line-height: 1;
	white-space: nowrap; cursor: pointer;
	transition: color 150ms, background-color 150ms, border-color 150ms;
}
.ds-ask-btn .spark { width: 1rem; height: 1rem; color: #ff6633; flex-shrink: 0; }
.ds-ask-btn:hover { background: rgba(255, 102, 51, 0.12); border-color: #ff6633; }
.ds-ask-btn:focus-visible { outline: 2px solid #ff6633; outline-offset: 2px; }
@media (min-width: 1000px) { .ds-ask-btn { display: inline-flex; } }

/* ---------------- search modal (overlay) ---------------- */
.ds-modal {
	position: fixed; inset: 0; width: 100%; height: 100%;
	max-width: 100%; max-height: 100%; margin: 0; padding: 0;
	border: none; background: transparent;
}
.ds-modal::backdrop {
	background: rgba(15, 15, 17, 0.45); backdrop-filter: blur(3px);
}

/* ---------------- command-palette modal ---------------- */
.ds-card {
	position: fixed; top: 12vh; left: 50%; transform: translateX(-50%);
	width: min(640px, calc(100vw - 2rem));
	max-height: 70vh; display: flex; flex-direction: column;
	background: var(--sl-color-bg); color: var(--sl-color-white);
	border: 1px solid var(--sl-color-gray-5); border-radius: 14px;
	box-shadow: 0 24px 60px -12px rgba(0,0,0,0.35), 0 8px 24px -8px rgba(0,0,0,0.25);
	overflow: hidden;
}
.ds-modal[open] .ds-card { animation: ds-pop 150ms cubic-bezier(0.16, 1, 0.3, 1); }
@keyframes ds-pop { from { opacity: 0; transform: translate(-50%, 6px) scale(0.985); } to { opacity: 1; transform: translate(-50%, 0) scale(1); } }

.ds-search-row {
	display: flex; align-items: center; gap: 0.6rem;
	padding: 0.75rem 0.85rem;
	border-bottom: 1px solid var(--sl-color-gray-6);
}
.ds-search-row .mag { width: 1.15rem; height: 1.15rem; color: var(--sl-color-gray-3); flex-shrink: 0; }
.ds-search-input {
	flex: 1; min-width: 0; border: none; background: transparent;
	color: var(--sl-color-white); font: inherit; font-size: 1rem; outline: none;
}
.ds-search-input::placeholder { color: var(--sl-color-gray-3); }

/* segmented Search / Ask Docs toggle */
.ds-seg { display: inline-flex; gap: 0.25rem; flex-shrink: 0; }
.ds-seg button {
	display: inline-flex; align-items: center; gap: 0.35rem;
	padding: 0.35rem 0.7rem; border-radius: 8px;
	border: 1px solid var(--sl-color-gray-5); background: transparent;
	color: var(--sl-color-gray-2); font: inherit; font-size: 0.8rem; font-weight: 500;
	cursor: pointer; transition: background-color 130ms, color 130ms, border-color 130ms;
}
.ds-seg button svg { width: 0.9rem; height: 0.9rem; }
.ds-seg button:hover { background: var(--sl-color-gray-6); color: var(--sl-color-white); }
.ds-seg button:focus-visible { outline: 2px solid #ff6633; outline-offset: 1px; }
.ds-seg button[aria-pressed="true"] {
	background: var(--sl-color-gray-6);
	border-color: var(--sl-color-gray-4);
	color: var(--sl-color-white);
}
/* The Ask Docs toggle carries an accent so it clearly reads as an action. */
.ds-seg button[data-mode="ask"] { border-color: rgba(255, 102, 51, 0.5); color: var(--sl-color-white); }
.ds-seg button[data-mode="ask"]:hover { background: rgba(255, 102, 51, 0.12); border-color: #ff6633; }
.ds-seg .spark { color: #ff6633; }

.ds-modal-body { overflow-y: auto; padding: 0.5rem; }

/* ask-about row */
.ds-askrow {
	display: flex; align-items: center; gap: 0.6rem; width: 100%;
	padding: 0.7rem 0.65rem; border-radius: 9px; border: none;
	background: transparent; color: var(--sl-color-white);
	font: inherit; font-size: 0.9rem; text-align: left; cursor: pointer;
	transition: background-color 120ms;
}
.ds-askrow:hover, .ds-askrow.active { background: var(--sl-color-gray-6); }
.ds-askrow .book { width: 1.1rem; height: 1.1rem; flex-shrink: 0; color: var(--sl-color-gray-2); }
.ds-askrow .ask-label { flex: 1; min-width: 0; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ds-askrow .ask-label b { font-weight: 600; }
.ds-askrow .startconv {
	display: inline-flex; align-items: center; gap: 0.4rem; flex-shrink: 0;
	color: var(--sl-color-gray-3); font-size: 0.8rem;
}
.ds-askrow .startconv kbd {
	padding: 0.1rem 0.35rem; border-radius: 0.35rem;
	border: 1px solid var(--sl-color-gray-5); font-size: 0.72rem; font-family: inherit; line-height: 1;
}

.ds-sep { height: 1px; margin: 0.4rem 0.35rem; background: var(--sl-color-gray-6); }

.ds-results { display: flex; flex-direction: column; }
.ds-result { display: block; padding: 0.6rem 0.65rem; border-radius: 9px; text-decoration: none; transition: background-color 120ms; }
.ds-result:hover { background: var(--sl-color-gray-6); }
.ds-result .path { display: block; font-size: 0.72rem; color: var(--sl-color-gray-3); margin-bottom: 0.1rem; white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ds-result .title { display: block; font-size: 0.88rem; font-weight: 600; color: var(--sl-color-white); margin-bottom: 0.15rem; }
.ds-result .snippet { font-size: 0.79rem; line-height: 1.5; color: var(--sl-color-gray-2); display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
.ds-result .snippet mark { background: transparent; color: #ff6633; font-weight: 600; }

.ds-loading { display: flex; align-items: center; gap: 0.5rem; padding: 0.75rem 0.65rem; color: var(--sl-color-gray-2); font-size: 0.85rem; }
.ds-empty { padding: 0.75rem 0.65rem; color: var(--sl-color-gray-3); font-size: 0.85rem; }

/* ---------------- chat sidebar (docked, non-modal — does not block the docs) ---------------- */
.ds-sidebar {
	position: fixed; top: 0; right: 0; bottom: 0; left: auto;
	width: min(420px, 100vw); height: 100%;
	max-width: 100vw; max-height: 100vh; margin: 0; padding: 0;
	border: none; border-left: 1px solid var(--sl-color-gray-5);
	background: var(--sl-color-bg); color: var(--sl-color-white);
	box-shadow: -8px 0 32px -8px rgba(0,0,0,0.25);
	overflow: visible;
}
.ds-sidebar[open] { animation: ds-slide-in 320ms cubic-bezier(0.16, 1, 0.3, 1); }
.ds-sidebar.closing { animation: ds-slide-out 220ms ease-in forwards; }
@keyframes ds-slide-in { from { transform: translateX(100%); } to { transform: translateX(0); } }
@keyframes ds-slide-out { from { transform: translateX(0); } to { transform: translateX(100%); } }

.ds-panel { height: 100%; display: flex; flex-direction: column; }

/* ---------------- push the docs over (don't overlay them) ----------------
   Starlight's .header is position:fixed;width:100%, so it ignores wrapper
   padding — that is why it overlapped the panel. We fix it in two parts:
   1. Pad .page so the normal-flow content (main-frame + sticky TOC) reflows.
   2. Shrink the fixed .header's width so the top bar reflows too. */
:root { --cfdocs-chat-width: 420px; }
.page { transition: padding-right 320ms cubic-bezier(0.16, 1, 0.3, 1); }
.header { transition: width 320ms cubic-bezier(0.16, 1, 0.3, 1); }
@media (min-width: 1024px) {
	:root.cfdocs-chat-open .page { padding-right: var(--cfdocs-chat-width); }
	:root.cfdocs-chat-open .header {
		width: calc(100% - var(--cfdocs-chat-width)) !important;
	}
}
.ds-panel-head {
	display: flex; align-items: center; justify-content: space-between;
	padding: 0.85rem 1rem; border-bottom: 1px solid var(--sl-color-gray-6); gap: 0.75rem;
}
.ds-panel-head .title { display: flex; align-items: center; gap: 0.45rem; font-size: 0.9rem; font-weight: 600; }
.ds-panel-head .title .spark { width: 1rem; height: 1rem; color: #ff6633; }
.ds-close {
	display: flex; align-items: center; justify-content: center;
	width: 1.9rem; height: 1.9rem; border-radius: 0.45rem; border: none;
	background: transparent; color: var(--sl-color-gray-2); cursor: pointer;
	transition: background-color 120ms, color 120ms;
}
.ds-close:hover { background: var(--sl-color-gray-6); color: var(--sl-color-white); }
.ds-close svg { width: 1.05rem; height: 1.05rem; }

.ds-chat { flex: 1; overflow-y: auto; padding: 1rem; scroll-behavior: smooth; }

.ds-chat-hint { padding: 0.25rem; font-size: 0.85rem; color: var(--sl-color-gray-2); }
.ds-chat-hint h4 { margin: 0 0 0.5rem; font-size: 0.72rem; text-transform: uppercase; letter-spacing: 0.05em; color: var(--sl-color-gray-3); }
.ds-chips { display: flex; flex-direction: column; gap: 0.4rem; }
.ds-chip {
	display: flex; align-items: center; gap: 0.55rem; width: 100%; text-align: left;
	padding: 0.55rem 0.65rem; border-radius: 9px;
	border: 1px solid var(--sl-color-gray-6); background: var(--sl-color-gray-7, var(--sl-color-gray-6));
	color: var(--sl-color-gray-1); font: inherit; font-size: 0.83rem; cursor: pointer;
	transition: background-color 120ms, border-color 120ms;
}
.ds-chip:hover { background: var(--sl-color-gray-6); border-color: var(--sl-color-gray-5); }
.ds-chip svg { width: 0.85rem; height: 0.85rem; color: var(--sl-color-gray-3); flex-shrink: 0; }

.ds-turn { margin-bottom: 1.25rem; }
.ds-question {
	display: inline-block; max-width: 100%; padding: 0.5rem 0.8rem;
	border-radius: 12px 12px 12px 4px;
	background: rgba(255, 102, 51, 0.14);
	border: 1px solid rgba(255, 102, 51, 0.35);
	color: var(--sl-color-white); font-size: 0.88rem; font-weight: 500; margin-bottom: 0.85rem;
}
.ds-answer { font-size: 0.88rem; line-height: 1.6; color: var(--sl-color-gray-1); }
.ds-answer p { margin: 0 0 0.7rem; }
.ds-answer strong { color: var(--sl-color-white); font-weight: 600; }
.ds-answer .cite {
	display: inline-block; transform: translateY(-1px); margin: 0 1px; padding: 0 0.3rem;
	border-radius: 0.4rem; background: var(--sl-color-gray-6); color: var(--sl-color-gray-2);
	font-size: 0.68rem; font-weight: 600; text-decoration: none; vertical-align: super; line-height: 1.4;
}
.ds-answer .cite:hover { background: #ff6633; color: #fff; }
.ds-caret { display: inline-block; width: 7px; height: 1em; transform: translateY(2px); background: #ff6633; margin-left: 1px; animation: ds-blink 1s step-end infinite; }
@keyframes ds-blink { 50% { opacity: 0; } }

/* thumbs up / down feedback on an answer */
.ds-feedback { display: flex; align-items: center; gap: 0.35rem; margin-top: 0.75rem; }
.ds-feedback .fb-label { font-size: 0.72rem; color: var(--sl-color-gray-3); margin-right: 0.15rem; }
.ds-fb {
	display: inline-flex; align-items: center; justify-content: center;
	width: 1.75rem; height: 1.75rem; border-radius: 8px;
	border: 1px solid var(--sl-color-gray-5); background: transparent;
	color: var(--sl-color-gray-2); cursor: pointer;
	transition: background-color 120ms, color 120ms, border-color 120ms;
}
.ds-fb svg { width: 0.95rem; height: 0.95rem; }
.ds-fb:hover { background: var(--sl-color-gray-6); color: var(--sl-color-white); }
.ds-fb[aria-pressed="true"] { border-color: #ff6633; color: #ff6633; background: rgba(255, 102, 51, 0.12); }
.ds-fb.up[aria-pressed="true"] { border-color: #2ea043; color: #2ea043; background: rgba(46, 160, 67, 0.12); }
.ds-fb-thanks { font-size: 0.72rem; color: var(--sl-color-gray-3); margin-left: 0.25rem; }

.ds-sources { margin-top: 1rem; }
.ds-sources h3 { margin: 0 0 0.5rem; font-size: 0.7rem; font-weight: 600; text-transform: uppercase; letter-spacing: 0.05em; color: var(--sl-color-gray-3); }
.ds-source { display: flex; gap: 0.6rem; padding: 0.5rem 0.6rem; border-radius: 9px; border: 1px solid var(--sl-color-gray-6); text-decoration: none; margin-bottom: 0.4rem; transition: border-color 120ms, background-color 120ms; }
.ds-source:hover { border-color: var(--sl-color-gray-4); background: var(--sl-color-gray-6); }
.ds-source .num { flex-shrink: 0; width: 1.2rem; height: 1.2rem; display: flex; align-items: center; justify-content: center; border-radius: 0.4rem; background: var(--sl-color-gray-6); color: var(--sl-color-gray-2); font-size: 0.68rem; font-weight: 600; }
.ds-source .title { display: block; font-size: 0.82rem; font-weight: 500; color: var(--sl-color-white); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }
.ds-source .path { display: block; font-size: 0.72rem; color: var(--sl-color-gray-3); white-space: nowrap; overflow: hidden; text-overflow: ellipsis; }

.ds-spinner { width: 0.9rem; height: 0.9rem; border: 2px solid var(--sl-color-gray-5); border-top-color: #ff6633; border-radius: 50%; animation: ds-spin 0.7s linear infinite; flex-shrink: 0; }
@keyframes ds-spin { to { transform: rotate(360deg); } }
.ds-error { padding: 0.7rem; border-radius: 9px; border: 1px solid var(--sl-color-red, #b91c1c); color: var(--sl-color-red, #f87171); font-size: 0.83rem; }

/* follow-up composer */
/* ---------------- composer (one rounded box: pills, input, toolbar) ---------------- */
.ds-composer {
	margin: 0.75rem 1rem 1rem;
	display: flex; flex-direction: column; gap: 0.5rem;
	padding: 0.75rem 0.85rem 0.6rem;
	border: 1px solid var(--sl-color-gray-5); border-radius: 16px;
	background: var(--sl-color-bg);
	transition: border-color 140ms, box-shadow 140ms;
}
.ds-composer:focus-within { border-color: #ff6633; box-shadow: 0 0 0 3px rgba(255, 102, 51, 0.15); }

/* attached-context pills (top of the box) */
.ds-context-items { display: flex; flex-wrap: wrap; gap: 0.4rem; }
.ds-ctx-pill {
	display: inline-flex; align-items: center; gap: 0.45rem;
	max-width: 100%; padding: 0.3rem 0.5rem 0.3rem 0.45rem;
	border-radius: 10px; border: 1px solid var(--sl-color-gray-5);
	background: var(--sl-color-gray-6); font-size: 0.82rem; color: var(--sl-color-white);
}
.ds-ctx-pill .ico { display: inline-flex; }
.ds-ctx-pill .ico svg { width: 1.05rem; height: 1.05rem; color: var(--sl-color-gray-2); }
.ds-ctx-pill .ico.pdf svg { color: #e5484d; }
.ds-ctx-pill .thumb { width: 1.3rem; height: 1.3rem; border-radius: 5px; object-fit: cover; }
.ds-ctx-pill .txt { white-space: nowrap; overflow: hidden; text-overflow: ellipsis; max-width: 14rem; }
.ds-ctx-pill .rm { display: inline-flex; border: none; background: transparent; color: var(--sl-color-gray-3); cursor: pointer; padding: 0; }
.ds-ctx-pill .rm svg { width: 0.85rem; height: 0.85rem; }
.ds-ctx-pill .rm:hover { color: var(--sl-color-white); }

/* the question input */
.ds-composer-input {
	width: 100%; border: none; background: transparent; resize: none;
	color: var(--sl-color-white); font: inherit; font-size: 0.95rem; line-height: 1.5;
	outline: none; max-height: 8rem; min-height: 1.5rem; padding: 0.15rem 0.15rem;
}
.ds-composer-input::placeholder { color: var(--sl-color-gray-3); }

/* bottom toolbar: attach (left) + send (right) */
.ds-composer-toolbar { display: flex; align-items: center; justify-content: space-between; }

.ds-attach { position: relative; }
.ds-attach-btn {
	display: inline-flex; align-items: center; justify-content: center;
	width: 2rem; height: 2rem; border-radius: 8px;
	border: none; background: transparent;
	color: var(--sl-color-gray-2); cursor: pointer;
	transition: background-color 120ms, color 120ms;
}
.ds-attach-btn svg { width: 1.2rem; height: 1.2rem; }
.ds-attach-btn:hover { background: var(--sl-color-gray-6); color: var(--sl-color-white); }
.ds-attach-menu {
	position: absolute; bottom: calc(100% + 0.4rem); left: 0;
	min-width: 12rem; padding: 0.3rem; z-index: 5;
	border: 1px solid var(--sl-color-gray-5); border-radius: 10px;
	background: var(--sl-color-bg);
	box-shadow: 0 12px 32px -8px rgba(0, 0, 0, 0.35);
}
.ds-attach-opt {
	display: flex; align-items: center; gap: 0.5rem; width: 100%;
	padding: 0.5rem 0.55rem; border: none; border-radius: 7px;
	background: transparent; color: var(--sl-color-white);
	font: inherit; font-size: 0.83rem; text-align: left; cursor: pointer;
	transition: background-color 120ms;
}
.ds-attach-opt:hover { background: var(--sl-color-gray-6); }
.ds-attach-opt svg { width: 0.95rem; height: 0.95rem; color: var(--sl-color-gray-2); flex-shrink: 0; }

.ds-send {
	display: flex; align-items: center; justify-content: center;
	width: 2.1rem; height: 2.1rem; flex-shrink: 0; border: none; border-radius: 9999px;
	background: #ff6633; color: #fff; cursor: pointer; transition: opacity 120ms, transform 60ms;
}
.ds-send:hover { opacity: 0.92; }
.ds-send:active { transform: scale(0.94); }
.ds-send:disabled { opacity: 0.35; cursor: default; }
.ds-send svg { width: 1.1rem; height: 1.1rem; }

/* context chips shown under a chat question */
.ds-turn-context { display: flex; flex-wrap: wrap; gap: 0.35rem; margin: -0.4rem 0 0.75rem; }
.ds-ctx-chip {
	display: inline-flex; align-items: center; gap: 0.3rem;
	padding: 0.15rem 0.4rem; border-radius: 6px;
	background: var(--sl-color-gray-6); color: var(--sl-color-gray-2); font-size: 0.72rem;
}
.ds-ctx-chip svg { width: 0.8rem; height: 0.8rem; }
.ds-ctx-chip .thumb { width: 1rem; height: 1rem; border-radius: 3px; object-fit: cover; }


@media (prefers-reduced-motion: reduce) {
	.ds-modal[open] .ds-card, .ds-sidebar[open], .ds-sidebar.closing, .ds-spinner, .ds-caret { animation: none; }
	.page, .header { transition: none; }
}
`;

const SPARK = `<svg class="spark" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 2.5l1.6 5.1a3 3 0 0 0 1.9 1.9l5.1 1.6-5.1 1.6a3 3 0 0 0-1.9 1.9L12 19.7l-1.6-5.1a3 3 0 0 0-1.9-1.9L3.4 11.1l5.1-1.6a3 3 0 0 0 1.9-1.9L12 2.5z"/></svg>`;
const MAG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><circle cx="11" cy="11" r="7"/><path d="m21 21-4.3-4.3"/></svg>`;
const BOOK = `<svg class="book" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/></svg>`;
const CLOSE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>`;
// Paperclip — the "attach / link something" affordance.
const CLIP = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48"/></svg>`;
const FILE = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><path d="M14 2v6h6"/></svg>`;
const ARROW_UP = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M12 19V5"/><path d="m5 12 7-7 7 7"/></svg>`;
const THUMB_UP = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M7 10v12"/><path d="M15 5.88 14 10h5.83a2 2 0 0 1 1.92 2.56l-2.33 8A2 2 0 0 1 17.5 22H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h2.76a2 2 0 0 0 1.79-1.11L12 2a3.13 3.13 0 0 1 3 3.88Z"/></svg>`;
const THUMB_DOWN = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M17 14V2"/><path d="M9 18.12 10 14H4.17a2 2 0 0 1-1.92-2.56l2.33-8A2 2 0 0 1 6.5 2H20a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-2.76a2 2 0 0 0-1.79 1.11L12 22a3.13 3.13 0 0 1-3-3.88Z"/></svg>`;

interface DocsSearchElement extends HTMLElement {
	open(mode?: Mode, prefill?: string): void;
	close(): void;
}

class DocsSearchElementImpl extends HTMLElement implements DocsSearchElement {
	private modal: HTMLDialogElement | null = null;
	private sidebar: HTMLDialogElement | null = null;
	private searchInput: HTMLInputElement | null = null;
	private followInput: HTMLTextAreaElement | null = null;
	private modalBody: HTMLElement | null = null;
	private chat: HTMLElement | null = null;
	private debounce = 0;
	private searchToken = 0;
	private busy = false;
	private chatStarted = false;
	private context: ContextItem[] = [];

	connectedCallback() {
		this.innerHTML = `
			<style>${STYLES}</style>
			<div class="ds-bar">
				<button type="button" class="ds-trigger" aria-label="Search the docs">
					${MAG.replace("<svg", '<svg class="mag"')}
					<span class="label">Search or ask AI…</span>
					<kbd>⌘K</kbd>
				</button>
				<button type="button" class="ds-ask-btn" aria-label="Ask Docs">
					${SPARK}<span>Ask Docs</span>
				</button>
			</div>

			<dialog class="ds-modal" aria-label="Search Cloudflare docs">
				<div class="ds-card">
					<div class="ds-search-row">
						${MAG.replace("<svg", '<svg class="mag"')}
						<input class="ds-search-input" type="text" placeholder="Search for anything…" autocomplete="off" spellcheck="false" enterkeyhint="go" />
						<div class="ds-seg" role="group" aria-label="Search mode">
							<button type="button" data-mode="search" aria-pressed="true">${MAG}<span>Search</span></button>
							<button type="button" data-mode="ask" aria-pressed="false">${SPARK}<span>Ask Docs</span></button>
						</div>
					</div>
					<div class="ds-modal-body"></div>
				</div>
			</dialog>

			<dialog class="ds-sidebar" aria-label="Ask the Cloudflare docs">
				<div class="ds-panel">
					<div class="ds-panel-head">
						<span class="title">${SPARK}<span>Ask Docs</span></span>
						<button type="button" class="ds-close" aria-label="Close">${CLOSE}</button>
					</div>
					<div class="ds-chat"></div>
					<form class="ds-composer">
						<div class="ds-context-items"></div>
						<textarea class="ds-composer-input" rows="1" placeholder="Ask a question…" autocomplete="off" spellcheck="false" enterkeyhint="send"></textarea>
						<div class="ds-composer-toolbar">
							<div class="ds-attach">
								<button type="button" class="ds-attach-btn" aria-label="Attach" aria-haspopup="true" aria-expanded="false">${CLIP}</button>
								<div class="ds-attach-menu" hidden role="menu">
									<button type="button" class="ds-attach-opt" data-ctx="page" role="menuitem">${BOOK}<span>Current page</span></button>
									<button type="button" class="ds-attach-opt" data-ctx="file" role="menuitem">${FILE}<span>File…</span></button>
								</div>
								<input type="file" class="ds-ctx-file" hidden />
							</div>
							<button type="submit" class="ds-send" aria-label="Send" disabled>${ARROW_UP}</button>
						</div>
					</form>
				</div>
			</dialog>
		`;

		this.modal = this.querySelector(".ds-modal");
		this.sidebar = this.querySelector(".ds-sidebar");
		this.searchInput = this.querySelector(".ds-search-input");
		this.followInput = this.querySelector(".ds-composer-input");
		this.modalBody = this.querySelector(".ds-modal-body");
		this.chat = this.querySelector(".ds-chat");

		// trigger + close
		this.querySelector(".ds-trigger")?.addEventListener("click", () =>
			this.open("search"),
		);
		this.querySelector(".ds-ask-btn")?.addEventListener("click", () =>
			this.startChat(""),
		);
		this.querySelector(".ds-close")?.addEventListener("click", () =>
			this.closeSidebar(),
		);

		// Modal backdrop click closes the search modal.
		this.modal?.addEventListener("click", (e) => {
			if (e.target === this.modal) this.closeModal();
		});

		// The sidebar is non-modal (no backdrop), so Escape won't auto-close it.
		// Close it on Escape only when focus is inside the panel, so it never
		// interferes with reading the docs.
		this.sidebar?.addEventListener("keydown", (e) => {
			if (e.key === "Escape") {
				e.preventDefault();
				this.closeSidebar();
			}
		});

		// segmented toggle
		this.querySelectorAll<HTMLButtonElement>(".ds-seg button").forEach((btn) =>
			btn.addEventListener("click", () => {
				if (btn.dataset.mode === "ask") {
					this.startChat(this.searchInput?.value.trim() || "");
				}
			}),
		);

		// search input
		this.searchInput?.addEventListener("input", () => {
			window.clearTimeout(this.debounce);
			this.debounce = window.setTimeout(() => this.runSearch(), 170);
			this.updateAskRow();
		});
		this.searchInput?.addEventListener("keydown", (e) => {
			// Tab starts a conversation (matches the "Start conversation Tab" hint).
			if (e.key === "Tab" && !e.shiftKey) {
				e.preventDefault();
				this.startChat(this.searchInput?.value.trim() || "");
				return;
			}
			// Enter opens the top search result, if there is one.
			if (e.key === "Enter") {
				e.preventDefault();
				const first =
					this.modalBody?.querySelector<HTMLAnchorElement>("a.ds-result");
				if (first) window.location.href = first.href;
			}
		});

		// follow-up composer
		const form = this.querySelector(".ds-composer") as HTMLFormElement;
		form?.addEventListener("submit", (e) => {
			e.preventDefault();
			this.submitComposer();
		});
		this.followInput?.addEventListener("input", () => {
			this.syncSend();
			this.autoGrow();
		});
		// Enter sends; Shift+Enter inserts a newline.
		this.followInput?.addEventListener("keydown", (e) => {
			if (e.key === "Enter" && !e.shiftKey) {
				e.preventDefault();
				this.submitComposer();
			}
		});

		// context: the Attach clipboard menu (link current page or a file)
		const attachBtn = this.querySelector(".ds-attach-btn") as HTMLButtonElement;
		const attachMenu = this.querySelector(".ds-attach-menu") as HTMLElement;
		const fileInput = this.querySelector(".ds-ctx-file") as HTMLInputElement;

		attachBtn?.addEventListener("click", (e) => {
			e.stopPropagation();
			this.toggleAttachMenu();
		});
		this.querySelector('.ds-attach-opt[data-ctx="page"]')?.addEventListener(
			"click",
			() => {
				this.addPageContext();
				this.toggleAttachMenu(false);
			},
		);
		this.querySelector('.ds-attach-opt[data-ctx="file"]')?.addEventListener(
			"click",
			() => {
				fileInput?.click();
				this.toggleAttachMenu(false);
			},
		);
		fileInput?.addEventListener("change", () => {
			const file = fileInput.files?.[0];
			if (file) void this.addFileContext(file);
			fileInput.value = "";
		});
		// Close the menu on an outside click.
		document.addEventListener("click", (e) => {
			if (attachMenu && !attachMenu.hidden) {
				const target = e.target as Node;
				if (!this.querySelector(".ds-attach")?.contains(target)) {
					this.toggleAttachMenu(false);
				}
			}
		});

		// Re-open the panel (with its transcript) after a page navigation.
		this.restoreIfOpen();
	}

	// ---- public API ----
	open(mode: Mode = "search", prefill?: string) {
		if (mode === "ask") {
			this.startChat(prefill ?? "");
			return;
		}
		if (!this.modal) return;
		if (this.sidebar?.open) this.closeSidebar();
		if (!this.modal.open) this.modal.showModal();
		this.setPressed("search");
		if (this.searchInput) {
			if (prefill !== undefined) this.searchInput.value = prefill;
			this.searchInput.focus();
			this.searchInput.select();
		}
		this.updateAskRow();
		if (this.searchInput?.value.trim()) this.runSearch();
		else this.renderModalEmpty();
	}

	close() {
		this.closeModal();
		this.closeSidebar();
	}

	private closeModal() {
		this.modal?.close();
	}

	private closeSidebar() {
		if (!this.sidebar) return;
		// Remove the class first so the docs reflow back in sync with the slide-out.
		document.documentElement.classList.remove("cfdocs-chat-open");
		this.sidebar.classList.add("closing");
		window.setTimeout(() => {
			this.sidebar?.close();
			this.sidebar?.classList.remove("closing");
		}, 200);
		// User closed it on purpose — forget the session and the transcript.
		this.chatStarted = false;
		this.context = [];
		try {
			sessionStorage.removeItem(SS_OPEN);
			sessionStorage.removeItem(SS_HTML);
			sessionStorage.removeItem(SS_CTX);
		} catch {
			/* sessionStorage may be unavailable */
		}
	}

	// ---- persistence (keep the panel open across navigation) ----
	private persist() {
		try {
			if (this.sidebar?.open) {
				sessionStorage.setItem(SS_OPEN, "1");
				sessionStorage.setItem(SS_HTML, this.chat?.innerHTML ?? "");
				sessionStorage.setItem(SS_CTX, JSON.stringify(this.context));
			}
		} catch {
			/* ignore quota / availability errors */
		}
	}

	private restoreIfOpen() {
		let open = false;
		let html = "";
		let ctx = "[]";
		try {
			open = sessionStorage.getItem(SS_OPEN) === "1";
			html = sessionStorage.getItem(SS_HTML) ?? "";
			ctx = sessionStorage.getItem(SS_CTX) ?? "[]";
		} catch {
			return;
		}
		if (!open || !this.sidebar || !this.chat) return;

		try {
			this.context = JSON.parse(ctx) as ContextItem[];
		} catch {
			this.context = [];
		}

		this.sidebar.show();
		document.documentElement.classList.add("cfdocs-chat-open");
		if (html.trim()) {
			this.chat.innerHTML = html;
			this.chatStarted = true;
		} else {
			this.renderChatHint();
		}
		this.renderContext();
	}

	// ---- context (add current page or an image) ----
	private addPageContext() {
		const title = document.title.replace(/\s*[|·—-]\s*Cloudflare Docs.*$/i, "");
		const url = window.location.pathname;
		if (this.context.some((c) => c.type === "page" && c.url === url)) return;
		this.context.push({ type: "page", title: title || url, url });
		this.renderContext();
		this.persist();
	}

	private toggleAttachMenu(force?: boolean) {
		const menu = this.querySelector(".ds-attach-menu") as HTMLElement;
		const btn = this.querySelector(".ds-attach-btn") as HTMLButtonElement;
		if (!menu) return;
		const show = force ?? menu.hidden;
		menu.hidden = !show;
		btn?.setAttribute("aria-expanded", String(show));
	}

	private submitComposer() {
		const q = this.followInput?.value.trim();
		if (q && !this.busy) void this.askInChat(q);
	}

	private syncSend() {
		const send = this.querySelector(".ds-send") as HTMLButtonElement;
		if (send) send.disabled = !this.followInput?.value.trim();
	}

	private autoGrow() {
		const ta = this.followInput;
		if (!ta) return;
		ta.style.height = "auto";
		ta.style.height = `${Math.min(ta.scrollHeight, 128)}px`;
	}

	private renderFeedback(turn: HTMLElement, query: string) {
		if (turn.querySelector(".ds-feedback")) return;
		const fb = document.createElement("div");
		fb.className = "ds-feedback";
		fb.innerHTML = `
			<span class="fb-label">Was this helpful?</span>
			<button type="button" class="ds-fb up" aria-pressed="false" aria-label="Helpful">${THUMB_UP}</button>
			<button type="button" class="ds-fb down" aria-pressed="false" aria-label="Not helpful">${THUMB_DOWN}</button>`;
		turn.appendChild(fb);

		const up = fb.querySelector(".ds-fb.up") as HTMLButtonElement;
		const down = fb.querySelector(".ds-fb.down") as HTMLButtonElement;

		const vote = (rating: "up" | "down") => {
			const chosen = rating === "up" ? up : down;
			const other = rating === "up" ? down : up;
			const active = chosen.getAttribute("aria-pressed") === "true";
			// Toggle off if the same rating is clicked again.
			chosen.setAttribute("aria-pressed", String(!active));
			other.setAttribute("aria-pressed", "false");

			const thanks = fb.querySelector(".ds-fb-thanks");
			if (!active) {
				if (!thanks) {
					const span = document.createElement("span");
					span.className = "ds-fb-thanks";
					span.textContent = "Thanks for the feedback!";
					fb.appendChild(span);
				}
				track("docs chat feedback", {
					rating,
					question: query,
					path: window.location.pathname,
				});
			} else {
				thanks?.remove();
			}
			this.persist();
		};

		up.addEventListener("click", () => vote("up"));
		down.addEventListener("click", () => vote("down"));
	}

	private async addFileContext(file: File) {
		const isImage = file.type.startsWith("image/");
		let dataUrl: string | undefined;
		if (isImage) {
			dataUrl = await new Promise<string>((resolve, reject) => {
				const reader = new FileReader();
				reader.onload = () => resolve(String(reader.result));
				reader.onerror = () => reject(reader.error);
				reader.readAsDataURL(file);
			});
		}
		this.context.push({
			type: "file",
			name: file.name,
			mime: file.type,
			dataUrl,
		});
		this.renderContext();
		this.persist();
	}

	private removeContext(index: number) {
		this.context.splice(index, 1);
		this.renderContext();
		this.persist();
	}

	private renderContext() {
		const wrap = this.querySelector(".ds-context-items") as HTMLElement;
		if (!wrap) return;
		if (this.context.length === 0) {
			wrap.innerHTML = "";
			return;
		}
		wrap.innerHTML = this.context
			.map((c, i) => {
				let lead: string;
				if (c.type === "page") {
					lead = `<span class="ico">${BOOK}</span>`;
				} else if (c.dataUrl) {
					lead = `<img class="thumb" src="${escapeAttr(c.dataUrl)}" alt="" />`;
				} else {
					const isPdf =
						c.mime === "application/pdf" ||
						c.name.toLowerCase().endsWith(".pdf");
					lead = `<span class="ico${isPdf ? " pdf" : ""}">${FILE}</span>`;
				}
				const label = c.type === "page" ? c.title : c.name;
				const title = c.type === "page" ? c.url : c.name;
				return `<span class="ds-ctx-pill" title="${escapeAttr(title)}">
						${lead}
						<span class="txt">${escapeHtml(label)}</span>
						<button type="button" class="rm" data-i="${i}" aria-label="Remove">${CLOSE}</button>
					</span>`;
			})
			.join("");
		wrap
			.querySelectorAll<HTMLButtonElement>(".rm")
			.forEach((btn) =>
				btn.addEventListener("click", () =>
					this.removeContext(Number(btn.dataset.i)),
				),
			);
	}

	private setPressed(mode: Mode) {
		this.querySelectorAll<HTMLButtonElement>(".ds-seg button").forEach((btn) =>
			btn.setAttribute("aria-pressed", String(btn.dataset.mode === mode)),
		);
	}

	// ---- modal / search ----
	private renderModalEmpty() {
		if (!this.modalBody) return;
		this.modalBody.innerHTML = `
			${this.askRowHtml("")}
			<div class="ds-sep"></div>
			<div class="ds-empty">Start typing to search the Cloudflare docs — or press <kbd>Tab</kbd> to ask a question.</div>`;
		this.wireAskRow();
	}

	private askRowHtml(query: string) {
		const label = query
			? `Ask about <b>${escapeHtml(query)}</b>`
			: `Ask about anything`;
		return `
			<button type="button" class="ds-askrow active">
				${BOOK}
				<span class="ask-label">${label}</span>
				<span class="startconv">Start conversation <kbd>Tab</kbd></span>
			</button>`;
	}

	private wireAskRow() {
		this.modalBody
			?.querySelector(".ds-askrow")
			?.addEventListener("click", () =>
				this.startChat(this.searchInput?.value.trim() || ""),
			);
	}

	private updateAskRow() {
		const label = this.modalBody?.querySelector(".ds-askrow .ask-label");
		if (!label) return;
		const q = this.searchInput?.value.trim() ?? "";
		label.innerHTML = q
			? `Ask about <b>${escapeHtml(q)}</b>`
			: `Ask about anything`;
	}

	private async runSearch() {
		if (!this.modalBody || !this.searchInput) return;
		const query = this.searchInput.value.trim();
		if (!query) {
			this.renderModalEmpty();
			return;
		}
		const token = ++this.searchToken;
		this.modalBody.innerHTML = `
			${this.askRowHtml(query)}
			<div class="ds-sep"></div>
			<div class="ds-loading"><span class="ds-spinner"></span><span>Searching…</span></div>`;
		this.wireAskRow();
		const results = this.modalBody.querySelector(".ds-loading");

		try {
			const hits = await this.retrieve(query, 6);
			if (token !== this.searchToken) return;
			if (!results) return;
			if (hits.length === 0) {
				results.outerHTML = `<div class="ds-empty">No results for “${escapeHtml(query)}”. Press <kbd>Tab</kbd> to ask instead.</div>`;
				return;
			}
			results.outerHTML = `<div class="ds-results">${hits
				.map(
					(r) => `
				<a class="ds-result" href="${escapeAttr(r.url)}">
					<span class="path">${escapeHtml(prettyPath(r.url))}</span>
					<span class="title">${escapeHtml(r.title)}</span>
					<span class="snippet">${r.snippetHtml}</span>
				</a>`,
				)
				.join("")}</div>`;
		} catch (err) {
			if (token !== this.searchToken) return;
			if (results)
				results.outerHTML = `<div class="ds-error">Search is unavailable right now. Please try again.</div>`;
			console.error("[docs-search]", err);
		}
	}

	// ---- chat sidebar ----
	private startChat(seed: string) {
		this.closeModal();
		if (!this.sidebar) return;
		// show() (non-modal) keeps the docs fully interactive alongside the panel,
		// and the .cfdocs-chat-open class reflows the docs into the space left of it.
		if (!this.sidebar.open) this.sidebar.show();
		document.documentElement.classList.add("cfdocs-chat-open");
		this.renderContext();

		if (seed) {
			void this.askInChat(seed);
		} else if (!this.chatStarted) {
			this.renderChatHint();
			this.followInput?.focus();
		} else {
			this.followInput?.focus();
		}
		this.persist();
	}

	private renderChatHint() {
		if (!this.chat) return;
		const chips = SUGGESTED_QUESTIONS.map(
			(q) =>
				`<button type="button" class="ds-chip" data-q="${escapeAttr(q)}">
					<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17 17 7"/><path d="M7 7h10v10"/></svg>
					<span>${escapeHtml(q)}</span>
				</button>`,
		).join("");
		this.chat.innerHTML = `
			<div class="ds-chat-hint">
				<h4>Ask a question</h4>
				<div class="ds-chips">${chips}</div>
			</div>`;
		this.chat
			.querySelectorAll<HTMLButtonElement>(".ds-chip")
			.forEach((chip) =>
				chip.addEventListener("click", () =>
					this.askInChat(chip.getAttribute("data-q") ?? ""),
				),
			);
	}

	private async askInChat(query: string) {
		if (!this.chat || this.busy || !query) return;
		this.busy = true;

		// Clear the initial suggestions on the first turn.
		if (!this.chatStarted) {
			this.chat.innerHTML = "";
			this.chatStarted = true;
		}
		if (this.followInput) {
			this.followInput.value = "";
			this.followInput.style.height = "auto";
		}
		this.syncSend();

		// Snapshot the context attached to this turn, then clear it from the
		// composer — the attachments are sent with this message.
		const ctx = [...this.context];
		this.context = [];
		this.renderContext();
		const ctxHtml = ctx.length
			? `<div class="ds-turn-context">${ctx
					.map((c) => {
						if (c.type === "page")
							return `<span class="ds-ctx-chip">${BOOK}<span>${escapeHtml(c.title)}</span></span>`;
						const lead = c.dataUrl
							? `<img class="thumb" src="${escapeAttr(c.dataUrl)}" alt="" />`
							: FILE;
						return `<span class="ds-ctx-chip">${lead}<span>${escapeHtml(c.name)}</span></span>`;
					})
					.join("")}</div>`
			: "";

		const turn = document.createElement("div");
		turn.className = "ds-turn";
		turn.innerHTML = `
			<div class="ds-question">${escapeHtml(query)}</div>
			${ctxHtml}
			<div class="ds-loading"><span class="ds-spinner"></span><span class="ds-loading-text">Searching Cloudflare docs…</span></div>
			<div class="ds-answer" hidden></div>
			<div class="ds-sources" hidden></div>`;
		this.chat.appendChild(turn);
		this.chat.scrollTo({ top: this.chat.scrollHeight });

		const loading = turn.querySelector(".ds-loading") as HTMLElement;
		const loadingText = turn.querySelector(".ds-loading-text") as HTMLElement;
		const answerEl = turn.querySelector(".ds-answer") as HTMLElement;
		const sourcesEl = turn.querySelector(".ds-sources") as HTMLElement;

		try {
			const sources = await this.retrieve(query, 4);

			// Pin any "current page" context as a first source so it is cited.
			for (const c of ctx) {
				if (c.type !== "page") continue;
				if (sources.some((s) => prettyPath(s.url) === c.url)) continue;
				sources.unshift({
					title: c.title,
					url: rewriteUrl(window.location.origin + c.url),
					snippet: "The page you are currently viewing.",
					snippetHtml: "The page you are currently viewing.",
				});
			}
			const attachmentName = ctx.find(
				(c): c is Extract<ContextItem, { type: "file" }> => c.type === "file",
			)?.name;

			if (sources.length === 0) {
				loading.remove();
				answerEl.hidden = false;
				answerEl.innerHTML = `<div class="ds-error">I couldn't find anything relevant for that. Try rephrasing.</div>`;
				this.persist();
				return;
			}
			loadingText.textContent = `Reading ${sources.length} source${sources.length === 1 ? "" : "s"}…`;
			await delay(420);

			sourcesEl.hidden = false;
			sourcesEl.innerHTML = `<h3>Sources</h3>${sources
				.map(
					(s, i) => `
				<a class="ds-source" href="${escapeAttr(s.url)}">
					<span class="num">${i + 1}</span>
					<span class="meta">
						<span class="title">${escapeHtml(s.title)}</span>
						<span class="path">${escapeHtml(prettyPath(s.url))}</span>
					</span>
				</a>`,
				)
				.join("")}`;

			loading.remove();
			answerEl.hidden = false;
			await this.streamAnswer(
				answerEl,
				buildAnswer(query, sources, { attachmentName }),
				sources,
			);
			this.renderFeedback(turn, query);
		} catch (err) {
			loading.remove();
			answerEl.hidden = false;
			answerEl.innerHTML = `<div class="ds-error">Something went wrong reaching the docs index. Please try again.</div>`;
			console.error("[docs-search]", err);
		} finally {
			this.busy = false;
			this.followInput?.focus();
			this.persist();
		}
	}

	private async streamAnswer(
		el: HTMLElement,
		segments: AnswerSegment[],
		sources: Source[],
	) {
		el.innerHTML = `<p></p>`;
		let para = el.querySelector("p") as HTMLElement;
		const caret = document.createElement("span");
		caret.className = "ds-caret";
		para.appendChild(caret);

		for (const seg of segments) {
			if (seg.type === "break") {
				caret.remove();
				para = document.createElement("p");
				el.appendChild(para);
				para.appendChild(caret);
				await delay(90);
				continue;
			}
			if (seg.type === "cite") {
				const src = sources[seg.index];
				const a = document.createElement("a");
				a.className = "cite";
				a.textContent = String(seg.index + 1);
				if (src) a.href = src.url;
				para.insertBefore(a, caret);
				this.chat?.scrollTo({ top: this.chat.scrollHeight });
				await delay(60);
				continue;
			}
			const words = seg.text.split(/(\s+)/);
			for (const w of words) {
				const node = seg.bold
					? Object.assign(document.createElement("strong"), {
							textContent: w,
						})
					: document.createTextNode(w);
				para.insertBefore(node, caret);
				this.chat?.scrollTo({ top: this.chat.scrollHeight });
				await delay(w.trim() ? 14 : 6);
			}
		}
		caret.remove();
	}

	// ---- shared retrieval ----
	private async retrieve(query: string, hits: number): Promise<Source[]> {
		const index = getIndexName();
		const res = await fetch(
			`https://${ALGOLIA_APP_ID}-dsn.algolia.net/1/indexes/${index}/query`,
			{
				method: "POST",
				headers: {
					"X-Algolia-Application-Id": ALGOLIA_APP_ID,
					"X-Algolia-API-Key": ALGOLIA_API_KEY,
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					query,
					filters: "type:content",
					hitsPerPage: hits,
					attributesToRetrieve: ["url", "hierarchy", "content"],
					attributesToSnippet: ["content:35"],
					highlightPreTag: "<mark>",
					highlightPostTag: "</mark>",
				}),
			},
		);
		if (!res.ok) throw new Error(`Algolia ${res.status}`);
		const data = (await res.json()) as { hits: AlgoliaHit[] };

		return data.hits.map((hit) => {
			const h = hit.hierarchy ?? {};
			const title = String(h.lvl1 || h.lvl0 || "Cloudflare Docs");
			const raw =
				hit._snippetResult?.content?.value ?? hit.content?.slice(0, 260) ?? "";
			return {
				title,
				url: rewriteUrl(hit.url ?? ""),
				snippet: cleanSnippet(raw),
				snippetHtml: allowOnlyMarks(raw),
			};
		});
	}
}

// ---------------------------------------------------------------------------
// Answer synthesis (client-side mock, grounded in retrieved snippets)
// ---------------------------------------------------------------------------

type AnswerSegment =
	| { type: "text"; text: string; bold?: boolean }
	| { type: "cite"; index: number }
	| { type: "break" };

function buildAnswer(
	query: string,
	sources: Source[],
	opts: { attachmentName?: string } = {},
): AnswerSegment[] {
	const segs: AnswerSegment[] = [];
	const topic = query.replace(/[?.!]+$/, "").trim();

	if (opts.attachmentName) {
		segs.push({
			type: "text",
			text: `You attached "${opts.attachmentName}". This demo cannot read attachments yet, so the answer uses the docs only. `,
		});
		segs.push({ type: "break" });
	}

	segs.push({
		type: "text",
		text: "Here's what the Cloudflare docs say about ",
	});
	segs.push({ type: "text", text: topic, bold: true });
	segs.push({ type: "text", text: ":" });
	segs.push({ type: "break" });

	const used = sources.slice(0, 3);
	used.forEach((s, i) => {
		const sentence = firstSentence(s.snippet);
		if (!sentence) return;
		segs.push({ type: "text", text: sentence + " " });
		segs.push({ type: "cite", index: i });
		if (i < used.length - 1) segs.push({ type: "break" });
	});

	segs.push({ type: "break" });
	segs.push({
		type: "text",
		text: "See the sources below for step-by-step details and examples.",
	});
	return segs;
}

function firstSentence(text: string): string {
	const clean = text.trim();
	if (!clean) return "";
	const match = /^.*?[.!?](\s|$)/.exec(clean);
	const sentence = (match ? match[0] : clean).trim();
	if (sentence.length > 220) return sentence.slice(0, 217).trimEnd() + "…";
	return sentence;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function delay(ms: number): Promise<void> {
	return new Promise((r) => setTimeout(r, ms));
}

function cleanSnippet(raw: string): string {
	const withoutTags = raw.replace(/<[^>]+>/g, "");
	const txt = document.createElement("textarea");
	txt.innerHTML = withoutTags;
	return txt.value.replace(/\s+/g, " ").trim();
}

// Keep only <mark> highlight tags from an Algolia snippet; strip everything
// else. Algolia content is our own trusted index, not user input.
function allowOnlyMarks(raw: string): string {
	return raw.replace(/<(?!\/?mark\b)[^>]*>/gi, "");
}

function rewriteUrl(url: string): string {
	if (!url) return "";
	try {
		const { pathname, hash } = new URL(url);
		return new URL(pathname + hash, window.location.origin).toString();
	} catch {
		return url;
	}
}

function prettyPath(url: string): string {
	try {
		return new URL(url).pathname;
	} catch {
		return url;
	}
}

function escapeHtml(s: string): string {
	return s
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

function escapeAttr(s: string): string {
	return escapeHtml(s).replace(/'/g, "&#39;");
}

if (!customElements.get("cfdocs-docs-search")) {
	customElements.define("cfdocs-docs-search", DocsSearchElementImpl);
}

export type { DocsSearchElement };
