import { afterEach, beforeEach, describe, expect, test, vi } from "vitest";
import "./dev-editor.client";

function stubClipboard() {
	const writeText = vi.fn<(text: string) => Promise<void>>(async () => {});
	Object.defineProperty(navigator, "clipboard", {
		value: { writeText },
		configurable: true,
	});
	return writeText;
}

function renderDocPage() {
	document.body.innerHTML = `
		<h1 id="title" data-dev-editable="frontmatter:title">Workers Guide</h1>
		<article class="docs-content">
			<div class="heading-wrapper level-h2">
				<h2 id="intro">Overview</h2>
				<a class="anchor-link" href="#intro"></a>
			</div>
			<div data-nb-cli-variant="cf" data-cli-variants-item="cf">
				<p id="p1">Run <code>cf dev</code> to preview <a id="doc-link" href="/workers/">Workers</a>.</p>
			</div>
			<div data-nb-tabs>
				<div role="tablist">
					<button id="tab-active" role="tab" aria-selected="true" type="button">Dashboard</button>
					<button id="tab-inactive" role="tab" aria-selected="false" type="button">API</button>
				</div>
				<div role="tabpanel" data-nb-tabs-content data-nb-tab-label="Dashboard">
					<figure class="nb-code-figure" data-nb-lang="ts">
						<pre data-language="ts"><code id="code-ts">const greeting = "hi";</code></pre>
					</figure>
				</div>
			</div>
			<!--cfdocs-dev-partial-start:src/content/partials/workers/note.mdx-->
			<p id="partial-p">Original partial text.</p>
			<!--cfdocs-dev-partial-end-->
		</article>
		<cfdocs-dev-editor data-source-path="src/content/docs/workers/guide.mdx"></cfdocs-dev-editor>
	`;

	return {
		editor: document.querySelector("cfdocs-dev-editor") as HTMLElement,
		p1: document.getElementById("p1")!,
		partialP: document.getElementById("partial-p")!,
		codeTs: document.getElementById("code-ts")!,
		tabActive: document.getElementById("tab-active")!,
		tabInactive: document.getElementById("tab-inactive")!,
		link: document.getElementById("doc-link")!,
		toggle: document.querySelector<HTMLButtonElement>(".cfdocs-de-toggle")!,
		blockBar: document.querySelector<HTMLElement>(".cfdocs-de-block-bar")!,
		blockNoteInput: document.querySelector<HTMLInputElement>(
			".cfdocs-de-block-note",
		)!,
		overlay: document.querySelector<HTMLElement>(".cfdocs-de-overlay")!,
		summaryBtn: document.querySelector<HTMLButtonElement>(
			".cfdocs-de-summary-btn",
		)!,
		copyBtn: document.querySelector<HTMLButtonElement>(
			".cfdocs-de-btn-primary",
		)!,
		toast: document.querySelector<HTMLElement>(".cfdocs-de-toast")!,
	};
}

describe("cfdocs-dev-editor", () => {
	beforeEach(() => {
		vi.useFakeTimers();
		window.history.replaceState({}, "", "/workers/guide/");
	});

	afterEach(() => {
		vi.useRealTimers();
		document.body.innerHTML = "";
		delete document.documentElement.dataset.devEditorActive;
	});

	test("isolates editing to one clicked block at a time and includes code diffs, context, and component provenance in prompt", async () => {
		const writeText = stubClipboard();
		const {
			p1,
			partialP,
			codeTs,
			toggle,
			blockBar,
			blockNoteInput,
			overlay,
			copyBtn,
		} = renderDocPage();

		toggle.click();
		expect(p1.getAttribute("contenteditable")).toBeNull();
		expect(codeTs.getAttribute("contenteditable")).toBeNull();

		// Clicking p1 isolates editing exclusively to p1.
		p1.click();
		expect(p1.getAttribute("contenteditable")).toBe("true");
		expect(p1.dataset.devActiveBlock).toBe("true");
		expect(partialP.getAttribute("contenteditable")).toBeNull();
		expect(blockBar.hidden).toBe(false);

		p1.innerHTML =
			'Run <code>cf dev</code> to preview <a id="doc-link" href="/workers/">Cloudflare Workers</a>.';
		p1.dispatchEvent(new Event("input", { bubbles: true }));

		blockNoteInput.value = "Use full product name on first mention.";
		blockNoteInput.dispatchEvent(new Event("input", { bubbles: true }));

		// Switching to code block isolates code editing with spellcheck=false
		codeTs.click();
		expect(p1.getAttribute("contenteditable")).toBeNull();
		expect(codeTs.getAttribute("contenteditable")).toBe("true");
		expect(codeTs.getAttribute("spellcheck")).toBe("false");

		codeTs.textContent = 'const greeting = "hello";';
		codeTs.dispatchEvent(new Event("input", { bubbles: true }));

		// Switching to partialP
		partialP.click();
		partialP.textContent = "Updated partial text.";
		partialP.dispatchEvent(new Event("input", { bubbles: true }));

		expect(overlay.dataset.open).toBe("true");

		copyBtn.click();
		await vi.advanceTimersByTimeAsync(0);

		expect(writeText).toHaveBeenCalledTimes(1);
		const copied = writeText.mock.calls[0]?.[0] as string;
		expect(copied).toContain(
			"Source file: `src/content/docs/workers/guide.mdx`",
		);
		expect(copied).toContain('inside `<CliVariant cli="cf">`');
		expect(copied).toContain(
			"Context: Use full product name on first mention.",
		);
		expect(copied).toContain("```ts");
		expect(copied).toContain('const greeting = "hello";');
		expect(copied).toContain(
			"in partial `src/content/partials/workers/note.mdx`",
		);
	});

	test("lets inactive tabs switch normally while editing an already-active tab label", () => {
		const { tabActive, tabInactive, toggle } = renderDocPage();
		toggle.click();

		// Clicking inactive tab does NOT lock it into edit mode (allows switching tabs)
		tabInactive.click();
		expect(tabInactive.getAttribute("contenteditable")).toBeNull();

		// Clicking already-selected tab activates editing on its label
		tabActive.click();
		expect(tabActive.getAttribute("contenteditable")).toBe("true");
	});

	test("supports undoing edits and recovering from an accidental Reset via Undo toast", () => {
		const { p1, toggle, blockNoteInput, overlay, summaryBtn, toast } =
			renderDocPage();
		const originalHtml = p1.innerHTML;

		toggle.click();
		p1.click();
		p1.textContent = "Mistaken edit";
		p1.dispatchEvent(new Event("input", { bubbles: true }));
		blockNoteInput.value = "Keep this note";
		blockNoteInput.dispatchEvent(new Event("input", { bubbles: true }));

		expect(overlay.dataset.open).toBe("true");

		// Open Changes drawer and verify the note input is synced
		summaryBtn.click();
		const drawerNoteInput = document.querySelector<HTMLInputElement>(
			".cfdocs-de-note-input",
		)!;
		expect(drawerNoteInput.value).toBe("Keep this note");

		// Click Reset in the bottom bar
		const resetBtn = Array.from(
			document.querySelectorAll<HTMLButtonElement>(".cfdocs-de-bar button"),
		).find((b) => b.textContent === "Reset")!;
		resetBtn.click();

		expect(p1.innerHTML).toBe(originalHtml);
		expect(overlay.dataset.open).toBe("false");
		expect(toast.dataset.open).toBe("true");

		// Click Undo in the toast to recover the edit + note
		const toastUndoBtn = toast.querySelector<HTMLButtonElement>("button")!;
		toastUndoBtn.click();

		expect(p1.textContent).toBe("Mistaken edit");
		expect(overlay.dataset.open).toBe("true");
		expect(toast.dataset.open).toBe("false");

		// Click individual Undo button in the inline block bar to revert the block
		p1.click();
		const blockUndoBtn = Array.from(
			document.querySelectorAll<HTMLButtonElement>(
				".cfdocs-de-block-bar button",
			),
		).find((b) => b.textContent === "Undo")!;
		blockUndoBtn.click();

		expect(p1.innerHTML).toBe(originalHtml);
		expect(overlay.dataset.open).toBe("false");
	});

	test("prevents accidental link navigation in edit mode unless Cmd/Ctrl is held", () => {
		const { link, toggle } = renderDocPage();
		toggle.click();

		const normalClick = new MouseEvent("click", {
			bubbles: true,
			cancelable: true,
		});
		link.dispatchEvent(normalClick);
		expect(normalClick.defaultPrevented).toBe(true);

		const cmdClick = new MouseEvent("click", {
			bubbles: true,
			cancelable: true,
			metaKey: true,
		});
		link.dispatchEvent(cmdClick);
		expect(cmdClick.defaultPrevented).toBe(false);
	});

	test("toggles edit mode via keyboard shortcut", () => {
		const { toggle } = renderDocPage();
		expect(toggle.getAttribute("aria-pressed")).toBe("false");

		document.dispatchEvent(
			new KeyboardEvent("keydown", {
				key: "e",
				ctrlKey: true,
				shiftKey: true,
				bubbles: true,
			}),
		);
		expect(toggle.getAttribute("aria-pressed")).toBe("true");
	});
});
