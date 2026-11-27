import "./dev-editor.css";
import { buildEditPrompt, type DevEditRecord } from "./prompt";
import {
	collectEditableDescriptors,
	findComponentContext,
	findEmbeddedNonEditableElements,
	findNearestHeading,
	mapPartialSources,
	serializeEditable,
	type EditableMode,
} from "./serialize";

interface TrackedBlock {
	id: string;
	element: HTMLElement;
	kind: string;
	mode: EditableMode;
	codeLang?: string;
	sourcePath: string | null;
	isPartial: boolean;
	nearestHeading: string | null;
	componentContext: string[];
	originalHtml: string;
	originalSerialized: string;
	currentSerialized: string;
	note: string;
}

interface BlockSnapshot {
	block: TrackedBlock;
	html: string;
	note: string;
}

interface UndoEntry {
	label: string;
	snapshots: BlockSnapshot[];
}

const COPIED_RESET_MS = 2000;
const TOAST_DURATION_MS = 6000;
const MAX_UNDO_STACK = 50;

function isMacPlatform(): boolean {
	if (typeof navigator === "undefined") return false;
	return /mac|iphone|ipad/i.test(navigator.platform || navigator.userAgent);
}

async function copyTextToClipboard(text: string): Promise<boolean> {
	if (!navigator.clipboard?.writeText) return false;
	try {
		await navigator.clipboard.writeText(text);
		return true;
	} catch {
		return false;
	}
}

function insertPlainTextAtSelection(text: string): void {
	const selection = window.getSelection();
	if (!selection || selection.rangeCount === 0) return;

	const range = selection.getRangeAt(0);
	range.deleteContents();
	const textNode = document.createTextNode(text);
	range.insertNode(textNode);

	const nextRange = document.createRange();
	nextRange.setStartAfter(textNode);
	nextRange.collapse(true);
	selection.removeAllRanges();
	selection.addRange(nextRange);
}

function placeCaretFromPoint(
	element: HTMLElement,
	clientX: number,
	clientY: number,
): void {
	const selection = window.getSelection();
	if (!selection) return;

	type CaretPosDoc = Document & {
		caretPositionFromPoint?: (
			x: number,
			y: number,
		) => { offsetNode: Node; offset: number } | null;
	};
	const doc = document as CaretPosDoc;

	let range: Range | null = null;
	if (typeof doc.caretPositionFromPoint === "function") {
		const pos = doc.caretPositionFromPoint(clientX, clientY);
		if (pos && element.contains(pos.offsetNode)) {
			range = document.createRange();
			range.setStart(pos.offsetNode, pos.offset);
			range.collapse(true);
		}
	}

	if (!range) {
		range = document.createRange();
		range.selectNodeContents(element);
		range.collapse(false);
	}

	selection.removeAllRanges();
	selection.addRange(range);
}

function truncatePreview(value: string, maxLength = 220): string {
	if (value.length <= maxLength) return value;
	return `${value.slice(0, maxLength - 1)}…`;
}

function isBlockPending(block: TrackedBlock): boolean {
	return (
		block.currentSerialized !== block.originalSerialized ||
		block.note.trim().length > 0
	);
}

function formatBlockTag(block: TrackedBlock): string {
	if (block.componentContext.length === 0) return block.kind;
	const innerComponent =
		block.componentContext[block.componentContext.length - 1];
	return `${block.kind} · ${innerComponent}`;
}

export class DevEditorElement extends HTMLElement {
	private active = false;
	private activeBlock: TrackedBlock | null = null;
	private activeBlockSessionStart: BlockSnapshot | null = null;
	private activeEmbeddedLocks: HTMLElement[] = [];

	private drawerOpen = false;
	private activeTab: "changes" | "prompt" = "changes";
	private nextBlockId = 1;
	private blocks = new Map<HTMLElement, TrackedBlock>();
	private undoStack: UndoEntry[] = [];
	private copyResetTimer: ReturnType<typeof setTimeout> | undefined;
	private toastTimer: ReturnType<typeof setTimeout> | undefined;
	private toastMessage = "";

	private toggleBtn!: HTMLButtonElement;
	private toggleLabel!: HTMLSpanElement;
	private blockBar!: HTMLElement;
	private blockTag!: HTMLSpanElement;
	private blockNoteInput!: HTMLInputElement;
	private blockUndoBtn!: HTMLButtonElement;
	private overlay!: HTMLElement;
	private summaryBtn!: HTMLButtonElement;
	private countBadge!: HTMLSpanElement;
	private summaryText!: HTMLSpanElement;
	private undoBtn!: HTMLButtonElement;
	private copyBtn!: HTMLButtonElement;
	private drawer!: HTMLElement;
	private changesTabBtn!: HTMLButtonElement;
	private promptTabBtn!: HTMLButtonElement;
	private drawerBody!: HTMLElement;
	private toast!: HTMLElement;
	private toastLabel!: HTMLSpanElement;

	private readonly onDocumentKeyDown = (event: KeyboardEvent) => {
		const modifier = isMacPlatform() ? event.metaKey : event.ctrlKey;
		const key = event.key.toLowerCase();

		if (modifier && event.shiftKey && !event.altKey && key === "e") {
			event.preventDefault();
			this.setActive(!this.active);
			return;
		}

		// Editor-level Undo when not actively typing in a contenteditable block or input.
		if (modifier && !event.shiftKey && !event.altKey && key === "z") {
			const target = event.target as HTMLElement | null;
			const isTextInput =
				target !== null &&
				(target.isContentEditable ||
					target.tagName === "INPUT" ||
					target.tagName === "TEXTAREA");
			if (!isTextInput && this.undoStack.length > 0) {
				event.preventDefault();
				this.performUndo();
			}
		}
	};

	private readonly onDocumentClick = (event: MouseEvent) => {
		if (!this.active) return;
		const target = event.target as Element | null;
		if (!target) return;

		// Ignore clicks inside our own editor UI (toggle, block bar, bottom overlay).
		if (this.contains(target)) return;

		// Allow switching PackageManagers tabs and CLI preference selectors cleanly,
		// and re-scan editable blocks afterwards in case new panels became active.
		if (
			target.closest(
				"[data-nb-pm-tab], [data-nb-cli-toggle], [data-nb-cli-control]",
			)
		) {
			if (this.activeBlock) this.deactivateActiveBlock();
			queueMicrotask(() => this.discoverBlocks());
			return;
		}

		// Refresh block discovery if a newly hydrated element was clicked.
		if (!target.closest("[data-dev-editable-node]")) {
			this.discoverBlocks();
		}

		const editableEl = target.closest<HTMLElement>("[data-dev-editable-node]");
		if (editableEl) {
			const block = this.blocks.get(editableEl);
			if (!block) return;

			// For <Tabs> triggers: clicking an INACTIVE tab switches tabs normally;
			// clicking the ALREADY-ACTIVE tab edits its label in isolation.
			if (editableEl.getAttribute("role") === "tab") {
				if (editableEl.getAttribute("aria-selected") !== "true") {
					if (this.activeBlock) this.deactivateActiveBlock();
					queueMicrotask(() => this.discoverBlocks());
					return;
				}
				event.preventDefault();
			}

			// Allow Cmd/Ctrl+Click on links to navigate even in edit mode.
			const anchor = target.closest("a");
			if (anchor && (event.metaKey || event.ctrlKey)) {
				return;
			}

			// Prevent navigating links or toggling <details> while activating/editing a block.
			if (anchor || target.closest("summary")) {
				event.preventDefault();
			}

			if (this.activeBlock !== block) {
				this.activateBlock(block, event);
			}
			return;
		}

		// Clicked outside any editable block -> commit & deactivate the isolated block.
		if (this.activeBlock) {
			this.deactivateActiveBlock();
		}
	};

	private readonly onViewportChange = () => {
		if (this.activeBlock) {
			this.positionBlockBar(this.activeBlock.element);
		}
	};

	private readonly onBlockInput = (event: Event) => {
		const target = event.currentTarget as HTMLElement | null;
		if (!target) return;
		this.syncBlock(target);
		if (this.activeBlock?.element === target) {
			this.updateBlockBarState();
			this.positionBlockBar(target);
		}
	};

	private readonly onBlockKeyDown = (event: KeyboardEvent) => {
		const target = event.currentTarget as HTMLElement | null;
		if (!target) return;
		const block = this.blocks.get(target);
		if (!block) return;

		if (event.key === "Escape") {
			event.preventDefault();
			this.deactivateActiveBlock();
			return;
		}

		if (block.mode === "code") {
			if (event.key === "Enter") {
				event.preventDefault();
				insertPlainTextAtSelection("\n");
				this.syncBlock(target);
				this.updateBlockBarState();
				return;
			}
			if (event.key === "Tab") {
				event.preventDefault();
				insertPlainTextAtSelection("  ");
				this.syncBlock(target);
				this.updateBlockBarState();
				return;
			}
			return;
		}

		if (block.mode === "single-line" && event.key === "Enter") {
			event.preventDefault();
			this.deactivateActiveBlock();
		}
	};

	private readonly onBlockPaste = (event: ClipboardEvent) => {
		const target = event.currentTarget as HTMLElement | null;
		if (!this.active || !target || this.activeBlock?.element !== target) return;
		const block = this.blocks.get(target);
		if (!block) return;

		event.preventDefault();
		const plain = event.clipboardData?.getData("text/plain") ?? "";
		if (!plain) return;

		insertPlainTextAtSelection(
			block.mode === "single-line" ? plain.replace(/\r?\n+/g, " ") : plain,
		);
		this.syncBlock(target);
		this.updateBlockBarState();
	};

	connectedCallback(): void {
		if (this.dataset.initialized === "true") return;
		this.dataset.initialized = "true";

		this.renderShell();
		document.addEventListener("keydown", this.onDocumentKeyDown);
		document.addEventListener("click", this.onDocumentClick, true);
		window.addEventListener("scroll", this.onViewportChange, true);
		window.addEventListener("resize", this.onViewportChange);
	}

	disconnectedCallback(): void {
		clearTimeout(this.copyResetTimer);
		clearTimeout(this.toastTimer);
		document.removeEventListener("keydown", this.onDocumentKeyDown);
		document.removeEventListener("click", this.onDocumentClick, true);
		window.removeEventListener("scroll", this.onViewportChange, true);
		window.removeEventListener("resize", this.onViewportChange);
		this.setActive(false);
		for (const block of this.blocks.values()) {
			this.detachBlockListeners(block.element);
		}
		this.blocks.clear();
		this.undoStack = [];
		delete this.dataset.initialized;
	}

	private get pageSourcePath(): string | null {
		const raw = this.dataset.sourcePath?.trim();
		return raw ? raw : null;
	}

	private renderShell(): void {
		const shortcut = isMacPlatform() ? "⇧⌘E" : "Ctrl+Shift+E";

		this.innerHTML = "";

		// Floating inline bar docked to whichever isolated block is being edited
		const blockBar = document.createElement("div");
		blockBar.className = "cfdocs-de-block-bar";
		blockBar.hidden = true;
		blockBar.setAttribute("role", "toolbar");
		blockBar.setAttribute("aria-label", "Active block controls");

		const blockTag = document.createElement("span");
		blockTag.className = "cfdocs-de-block-tag";

		const blockNoteInput = document.createElement("input");
		blockNoteInput.type = "text";
		blockNoteInput.className = "cfdocs-de-block-note";
		blockNoteInput.placeholder = "Optional context for AI…";
		blockNoteInput.setAttribute("aria-label", "Optional context for this edit");
		blockNoteInput.addEventListener("input", () => {
			if (!this.activeBlock) return;
			this.setBlockNote(this.activeBlock, blockNoteInput.value);
		});
		blockNoteInput.addEventListener("keydown", (event) => {
			if (event.key === "Escape" || event.key === "Enter") {
				event.preventDefault();
				this.deactivateActiveBlock();
			}
		});

		const blockUndoBtn = document.createElement("button");
		blockUndoBtn.type = "button";
		blockUndoBtn.className = "cfdocs-de-mini-btn";
		blockUndoBtn.textContent = "Undo";
		blockUndoBtn.title = "Revert this block to its original text";
		blockUndoBtn.addEventListener("click", () => {
			if (!this.activeBlock) return;
			this.revertBlock(this.activeBlock);
		});

		const blockDoneBtn = document.createElement("button");
		blockDoneBtn.type = "button";
		blockDoneBtn.className = "cfdocs-de-mini-btn";
		blockDoneBtn.textContent = "Done";
		blockDoneBtn.addEventListener("click", () => this.deactivateActiveBlock());

		blockBar.append(blockTag, blockNoteInput, blockUndoBtn, blockDoneBtn);

		// Bottom-left toggle button
		const toggle = document.createElement("button");
		toggle.type = "button";
		toggle.className = "cfdocs-de-toggle";
		toggle.setAttribute("aria-pressed", "false");
		toggle.title = `Toggle inline page editor (${shortcut})`;

		const dot = document.createElement("span");
		dot.className = "cfdocs-de-dot";
		dot.setAttribute("aria-hidden", "true");

		const label = document.createElement("span");
		label.textContent = "Edit page";

		const kbd = document.createElement("kbd");
		kbd.className = "cfdocs-de-kbd";
		kbd.textContent = shortcut;

		toggle.append(dot, label, kbd);
		toggle.addEventListener("click", () => this.setActive(!this.active));

		// Bottom-centre pop-in overlay
		const overlay = document.createElement("section");
		overlay.className = "cfdocs-de-overlay";
		overlay.setAttribute("aria-label", "Page edits");
		overlay.dataset.open = "false";

		// Expandable drawer above the bar
		const drawer = document.createElement("div");
		drawer.className = "cfdocs-de-drawer";
		drawer.hidden = true;

		const drawerHeader = document.createElement("div");
		drawerHeader.className = "cfdocs-de-drawer-header";

		const tabs = document.createElement("div");
		tabs.className = "cfdocs-de-tabs";
		tabs.setAttribute("role", "tablist");

		const changesTab = document.createElement("button");
		changesTab.type = "button";
		changesTab.className = "cfdocs-de-tab";
		changesTab.setAttribute("role", "tab");
		changesTab.setAttribute("aria-selected", "true");
		changesTab.textContent = "Changes";
		changesTab.addEventListener("click", () => {
			this.activeTab = "changes";
			this.updateDrawerContent();
		});

		const promptTab = document.createElement("button");
		promptTab.type = "button";
		promptTab.className = "cfdocs-de-tab";
		promptTab.setAttribute("role", "tab");
		promptTab.setAttribute("aria-selected", "false");
		promptTab.textContent = "Prompt preview";
		promptTab.addEventListener("click", () => {
			this.activeTab = "prompt";
			this.updateDrawerContent();
		});

		tabs.append(changesTab, promptTab);

		const sourceLabel = document.createElement("span");
		sourceLabel.className = "cfdocs-de-source-label";
		sourceLabel.textContent = this.pageSourcePath ?? window.location.pathname;
		sourceLabel.title = sourceLabel.textContent;

		drawerHeader.append(tabs, sourceLabel);

		const drawerBody = document.createElement("div");
		drawerBody.className = "cfdocs-de-drawer-body";

		drawer.append(drawerHeader, drawerBody);

		// Main action bar
		const bar = document.createElement("div");
		bar.className = "cfdocs-de-bar";

		const summaryBtn = document.createElement("button");
		summaryBtn.type = "button";
		summaryBtn.className = "cfdocs-de-summary-btn";
		summaryBtn.setAttribute("aria-expanded", "false");

		const countBadge = document.createElement("span");
		countBadge.className = "cfdocs-de-count-badge";
		countBadge.textContent = "0";

		const summaryText = document.createElement("span");
		summaryText.textContent = "edits";

		const chevron = document.createElementNS(
			"http://www.w3.org/2000/svg",
			"svg",
		);
		chevron.setAttribute("viewBox", "0 0 16 16");
		chevron.setAttribute("fill", "none");
		chevron.setAttribute("aria-hidden", "true");
		chevron.classList.add("cfdocs-de-chevron");
		const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute("d", "M4 10l4-4 4 4");
		path.setAttribute("stroke", "currentColor");
		path.setAttribute("stroke-width", "1.75");
		path.setAttribute("stroke-linecap", "round");
		path.setAttribute("stroke-linejoin", "round");
		chevron.appendChild(path);

		summaryBtn.append(countBadge, summaryText, chevron);
		summaryBtn.addEventListener("click", () => {
			this.drawerOpen = !this.drawerOpen;
			this.updateOverlay();
		});

		const actions = document.createElement("div");
		actions.className = "cfdocs-de-actions";

		const undoBtn = document.createElement("button");
		undoBtn.type = "button";
		undoBtn.className = "cfdocs-de-btn cfdocs-de-btn-ghost";
		undoBtn.textContent = "Undo";
		undoBtn.title = "Undo last action";
		undoBtn.hidden = true;
		undoBtn.addEventListener("click", () => this.performUndo());

		const resetBtn = document.createElement("button");
		resetBtn.type = "button";
		resetBtn.className = "cfdocs-de-btn cfdocs-de-btn-ghost";
		resetBtn.textContent = "Reset";
		resetBtn.addEventListener("click", () => this.resetAll());

		const copyBtn = document.createElement("button");
		copyBtn.type = "button";
		copyBtn.className = "cfdocs-de-btn cfdocs-de-btn-primary";
		copyBtn.textContent = "Copy prompt";
		copyBtn.addEventListener("click", () => void this.copyPrompt());

		actions.append(undoBtn, resetBtn, copyBtn);
		bar.append(summaryBtn, actions);
		overlay.append(drawer, bar);

		// Temporary Undo toast when reverting/resetting brings edit count to 0
		const toast = document.createElement("div");
		toast.className = "cfdocs-de-toast";
		toast.setAttribute("role", "status");
		toast.dataset.open = "false";

		const toastLabel = document.createElement("span");
		const toastUndoBtn = document.createElement("button");
		toastUndoBtn.type = "button";
		toastUndoBtn.className = "cfdocs-de-btn cfdocs-de-btn-ghost";
		toastUndoBtn.textContent = "Undo";
		toastUndoBtn.addEventListener("click", () => this.performUndo());

		toast.append(toastLabel, toastUndoBtn);

		this.append(blockBar, toggle, overlay, toast);

		this.blockBar = blockBar;
		this.blockTag = blockTag;
		this.blockNoteInput = blockNoteInput;
		this.blockUndoBtn = blockUndoBtn;
		this.toggleBtn = toggle;
		this.toggleLabel = label;
		this.overlay = overlay;
		this.summaryBtn = summaryBtn;
		this.countBadge = countBadge;
		this.summaryText = summaryText;
		this.undoBtn = undoBtn;
		this.copyBtn = copyBtn;
		this.drawer = drawer;
		this.changesTabBtn = changesTab;
		this.promptTabBtn = promptTab;
		this.drawerBody = drawerBody;
		this.toast = toast;
		this.toastLabel = toastLabel;
	}

	public setActive(next: boolean): void {
		if (this.active === next) return;
		this.active = next;

		if (this.active) {
			document.documentElement.dataset.devEditorActive = "true";
			this.discoverBlocks();
		} else {
			this.deactivateActiveBlock();
			delete document.documentElement.dataset.devEditorActive;
		}

		this.toggleBtn.setAttribute("aria-pressed", String(this.active));
		this.toggleLabel.textContent = this.active ? "Editing" : "Edit page";
	}

	private activateBlock(block: TrackedBlock, clickEvent?: MouseEvent): void {
		if (this.activeBlock === block) return;
		this.deactivateActiveBlock();

		this.activeBlock = block;
		this.activeBlockSessionStart = {
			block,
			html: block.element.innerHTML,
			note: block.note,
		};

		// Lock any embedded non-prose UI children so edits stay strictly isolated.
		this.activeEmbeddedLocks = findEmbeddedNonEditableElements(block.element);
		for (const child of this.activeEmbeddedLocks) {
			child.setAttribute("contenteditable", "false");
		}

		block.element.dataset.devActiveBlock = "true";
		block.element.setAttribute("contenteditable", "true");
		block.element.setAttribute(
			"spellcheck",
			block.mode === "code" ? "false" : "true",
		);
		block.element.focus();

		if (clickEvent) {
			placeCaretFromPoint(
				block.element,
				clickEvent.clientX,
				clickEvent.clientY,
			);
		}

		this.blockTag.textContent = formatBlockTag(block);
		this.blockTag.title = this.blockTag.textContent;
		this.blockNoteInput.value = block.note;
		this.updateBlockBarState();
		this.blockBar.hidden = false;
		this.positionBlockBar(block.element);
	}

	private deactivateActiveBlock(): void {
		const block = this.activeBlock;
		if (!block) return;

		const start = this.activeBlockSessionStart;
		if (
			start &&
			(block.element.innerHTML !== start.html || block.note !== start.note)
		) {
			this.pushUndo({
				label: `Edited ${block.kind}`,
				snapshots: [start],
			});
		}

		block.element.removeAttribute("contenteditable");
		delete block.element.dataset.devActiveBlock;
		for (const child of this.activeEmbeddedLocks) {
			child.removeAttribute("contenteditable");
		}

		this.activeEmbeddedLocks = [];
		this.activeBlock = null;
		this.activeBlockSessionStart = null;
		this.blockBar.hidden = true;
		this.updateOverlay();
	}

	private positionBlockBar(el: HTMLElement): void {
		if (this.blockBar.hidden) return;
		const rect = el.getBoundingClientRect();
		const barRect = this.blockBar.getBoundingClientRect();
		const barHeight = barRect.height || 38;
		const barWidth = barRect.width || 360;
		const margin = 10;

		const topAbove = rect.top - barHeight - margin;
		const top =
			topAbove >= 8
				? topAbove
				: Math.min(window.innerHeight - barHeight - 8, rect.bottom + margin);
		const left = Math.max(
			8,
			Math.min(rect.left, window.innerWidth - barWidth - 8),
		);

		this.blockBar.style.top = `${Math.round(top)}px`;
		this.blockBar.style.left = `${Math.round(left)}px`;
	}

	private updateBlockBarState(): void {
		if (!this.activeBlock) return;
		this.blockUndoBtn.disabled = !isBlockPending(this.activeBlock);
	}

	private discoverBlocks(): void {
		const partialSources = mapPartialSources(document.body);
		const descriptors = collectEditableDescriptors(document);

		for (const descriptor of descriptors) {
			const { element: el, kind, mode, codeLang } = descriptor;
			if (this.blocks.has(el)) continue;

			const partialPath = partialSources.get(el) ?? null;
			const serialized = serializeEditable(el, mode);
			const id = `block-${this.nextBlockId++}`;

			const block: TrackedBlock = {
				id,
				element: el,
				kind,
				mode,
				codeLang,
				sourcePath: partialPath ?? this.pageSourcePath,
				isPartial: partialPath !== null,
				nearestHeading: findNearestHeading(el),
				componentContext: findComponentContext(el),
				originalHtml: el.innerHTML,
				originalSerialized: serialized,
				currentSerialized: serialized,
				note: "",
			};

			el.dataset.devEditableNode = id;
			this.attachBlockListeners(el);
			this.blocks.set(el, block);
		}
	}

	private attachBlockListeners(el: HTMLElement): void {
		el.addEventListener("input", this.onBlockInput);
		el.addEventListener("keydown", this.onBlockKeyDown);
		el.addEventListener("paste", this.onBlockPaste);
	}

	private detachBlockListeners(el: HTMLElement): void {
		el.removeEventListener("input", this.onBlockInput);
		el.removeEventListener("keydown", this.onBlockKeyDown);
		el.removeEventListener("paste", this.onBlockPaste);
		el.removeAttribute("contenteditable");
		delete el.dataset.devEditableNode;
		delete el.dataset.devActiveBlock;
		delete el.dataset.devEdited;
	}

	private syncBlock(el: HTMLElement): void {
		const block = this.blocks.get(el);
		if (!block) return;

		block.currentSerialized = serializeEditable(el, block.mode);
		this.syncBlockBadge(block);
		this.hideToast();
		this.updateOverlay();
	}

	private setBlockNote(
		block: TrackedBlock,
		note: string,
		options: { skipDrawerRerender?: boolean } = {},
	): void {
		block.note = note;
		if (this.activeBlock === block && this.blockNoteInput.value !== note) {
			this.blockNoteInput.value = note;
		}
		this.syncBlockBadge(block);
		this.updateBlockBarState();
		this.hideToast();
		this.updateOverlay(options.skipDrawerRerender);
	}

	private syncBlockBadge(block: TrackedBlock): void {
		if (isBlockPending(block)) {
			block.element.dataset.devEdited = "true";
		} else {
			delete block.element.dataset.devEdited;
		}
	}

	private getPendingBlocks(): TrackedBlock[] {
		const pending: TrackedBlock[] = [];
		for (const block of this.blocks.values()) {
			if (isBlockPending(block)) {
				pending.push(block);
			}
		}
		return pending;
	}

	private getPromptText(): string {
		const edits: DevEditRecord[] = this.getPendingBlocks().map((block) => ({
			id: block.id,
			kind: block.kind,
			mode: block.mode,
			codeLang: block.codeLang,
			sourcePath: block.sourcePath,
			isPartial: block.isPartial,
			nearestHeading: block.nearestHeading,
			componentContext: block.componentContext,
			original: block.originalSerialized,
			current: block.currentSerialized,
			note: block.note.trim() || undefined,
		}));

		return buildEditPrompt({
			pagePath: window.location.pathname,
			pageSourcePath: this.pageSourcePath,
			edits,
		});
	}

	private pushUndo(entry: UndoEntry): void {
		this.undoStack.push(entry);
		if (this.undoStack.length > MAX_UNDO_STACK) {
			this.undoStack.shift();
		}
	}

	private showToast(message: string): void {
		this.toastMessage = message;
		this.toastLabel.textContent = message;
		this.toast.dataset.open = "true";
		clearTimeout(this.toastTimer);
		this.toastTimer = setTimeout(() => {
			this.hideToast();
		}, TOAST_DURATION_MS);
	}

	private hideToast(): void {
		clearTimeout(this.toastTimer);
		this.toastMessage = "";
		this.toast.dataset.open = "false";
	}

	private revertBlock(block: TrackedBlock): void {
		if (!isBlockPending(block)) return;

		this.pushUndo({
			label: `Reverted ${block.kind}`,
			snapshots: [
				{
					block,
					html: block.element.innerHTML,
					note: block.note,
				},
			],
		});

		block.element.innerHTML = block.originalHtml;
		block.currentSerialized = block.originalSerialized;
		block.note = "";
		delete block.element.dataset.devEdited;

		if (this.activeBlock === block) {
			this.activeBlockSessionStart = {
				block,
				html: block.element.innerHTML,
				note: "",
			};
			this.blockNoteInput.value = "";
			this.updateBlockBarState();
		}

		this.updateOverlay();
		if (this.getPendingBlocks().length === 0) {
			this.showToast(`Reverted ${block.kind}`);
		}
	}

	private resetAll(): void {
		const pending = this.getPendingBlocks();
		if (pending.length === 0) return;

		this.deactivateActiveBlock();

		this.pushUndo({
			label: `Reset ${pending.length} ${pending.length === 1 ? "edit" : "edits"}`,
			snapshots: pending.map((block) => ({
				block,
				html: block.element.innerHTML,
				note: block.note,
			})),
		});

		for (const block of pending) {
			block.element.innerHTML = block.originalHtml;
			block.currentSerialized = block.originalSerialized;
			block.note = "";
			delete block.element.dataset.devEdited;
		}

		this.drawerOpen = false;
		this.updateOverlay();
		this.showToast(
			`Reset ${pending.length} ${pending.length === 1 ? "edit" : "edits"}`,
		);
	}

	public performUndo(): void {
		const entry = this.undoStack.pop();
		if (!entry) return;

		this.hideToast();

		for (const snapshot of entry.snapshots) {
			const { block } = snapshot;
			block.element.innerHTML = snapshot.html;
			block.currentSerialized = serializeEditable(block.element, block.mode);
			block.note = snapshot.note;
			this.syncBlockBadge(block);

			if (this.activeBlock === block) {
				this.activeBlockSessionStart = {
					block,
					html: block.element.innerHTML,
					note: block.note,
				};
				this.blockNoteInput.value = block.note;
				this.updateBlockBarState();
			}
		}

		this.updateOverlay();
	}

	private async copyPrompt(): Promise<void> {
		const prompt = this.getPromptText();
		if (!prompt) return;

		const ok = await copyTextToClipboard(prompt);
		if (!ok) {
			this.drawerOpen = true;
			this.activeTab = "prompt";
			this.updateOverlay();
			return;
		}

		this.copyBtn.dataset.copied = "true";
		this.copyBtn.textContent = "Copied!";
		clearTimeout(this.copyResetTimer);
		this.copyResetTimer = setTimeout(() => {
			delete this.copyBtn.dataset.copied;
			this.copyBtn.textContent = "Copy prompt";
		}, COPIED_RESET_MS);
	}

	private updateOverlay(skipDrawerRerender = false): void {
		const pending = this.getPendingBlocks();
		const count = pending.length;

		this.countBadge.textContent = String(count);
		this.summaryText.textContent = count === 1 ? "edit" : "edits";

		const isOpen = count > 0;
		this.overlay.dataset.open = String(isOpen);
		this.undoBtn.hidden = this.undoStack.length === 0;

		if (isOpen && this.toastMessage) {
			this.hideToast();
		}

		if (!isOpen) {
			this.drawerOpen = false;
		}

		this.summaryBtn.setAttribute("aria-expanded", String(this.drawerOpen));
		this.drawer.hidden = !this.drawerOpen;

		if (this.drawerOpen && !skipDrawerRerender) {
			this.updateDrawerContent(pending);
		}
	}

	private updateDrawerContent(pending = this.getPendingBlocks()): void {
		this.changesTabBtn.setAttribute(
			"aria-selected",
			String(this.activeTab === "changes"),
		);
		this.promptTabBtn.setAttribute(
			"aria-selected",
			String(this.activeTab === "prompt"),
		);

		this.drawerBody.innerHTML = "";

		if (this.activeTab === "prompt") {
			const pre = document.createElement("pre");
			pre.className = "cfdocs-de-prompt-preview";
			pre.textContent = this.getPromptText();
			this.drawerBody.appendChild(pre);
			return;
		}

		const list = document.createElement("ul");
		list.className = "cfdocs-de-edit-list";

		for (const block of pending) {
			const item = document.createElement("li");
			item.className = "cfdocs-de-edit-item";

			const meta = document.createElement("div");
			meta.className = "cfdocs-de-edit-meta";

			const title = document.createElement("span");
			title.className = "cfdocs-de-edit-title";
			title.textContent = block.kind;

			const subtitleParts: string[] = [];
			if (block.componentContext.length > 0) {
				subtitleParts.push(block.componentContext.join(" > "));
			}
			if (block.isPartial && block.sourcePath) {
				subtitleParts.push(block.sourcePath);
			}
			if (block.nearestHeading) {
				subtitleParts.push(block.nearestHeading);
			}
			if (subtitleParts.length > 0) {
				const subtitle = document.createElement("span");
				subtitle.className = "cfdocs-de-edit-subtitle";
				subtitle.textContent = ` · ${subtitleParts.join(" · ")}`;
				title.appendChild(subtitle);
			}

			const controls = document.createElement("div");
			controls.className = "cfdocs-de-edit-controls";

			const jumpBtn = document.createElement("button");
			jumpBtn.type = "button";
			jumpBtn.className = "cfdocs-de-mini-btn";
			jumpBtn.textContent = "Jump";
			jumpBtn.addEventListener("click", () => {
				block.element.scrollIntoView({ behavior: "smooth", block: "center" });
				if (this.active) {
					this.activateBlock(block);
				}
			});

			const undoEditBtn = document.createElement("button");
			undoEditBtn.type = "button";
			undoEditBtn.className = "cfdocs-de-mini-btn";
			undoEditBtn.textContent = "Undo";
			undoEditBtn.addEventListener("click", () => this.revertBlock(block));

			controls.append(jumpBtn, undoEditBtn);
			meta.append(title, controls);
			item.append(meta);

			if (block.currentSerialized !== block.originalSerialized) {
				const before = document.createElement("div");
				before.className = "cfdocs-de-diff-row cfdocs-de-diff-before";
				before.textContent = truncatePreview(block.originalSerialized);

				const after = document.createElement("div");
				after.className = "cfdocs-de-diff-row cfdocs-de-diff-after";
				after.textContent = truncatePreview(block.currentSerialized);

				item.append(before, after);
			} else {
				const unchanged = document.createElement("div");
				unchanged.className = "cfdocs-de-diff-row cfdocs-de-diff-unchanged";
				unchanged.textContent = truncatePreview(block.originalSerialized);
				item.append(unchanged);
			}

			const noteInput = document.createElement("input");
			noteInput.type = "text";
			noteInput.className = "cfdocs-de-note-input";
			noteInput.placeholder = "Optional context for AI…";
			noteInput.setAttribute(
				"aria-label",
				`Optional context for ${block.kind}`,
			);
			noteInput.value = block.note;
			noteInput.addEventListener("input", () => {
				this.setBlockNote(block, noteInput.value, {
					skipDrawerRerender: true,
				});
			});

			item.append(noteInput);
			list.appendChild(item);
		}

		this.drawerBody.appendChild(list);
	}
}

if (
	typeof customElements !== "undefined" &&
	!customElements.get("cfdocs-dev-editor")
) {
	customElements.define("cfdocs-dev-editor", DevEditorElement);
}
