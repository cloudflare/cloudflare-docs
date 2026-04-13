const SHEET_STYLES = `
.sheet-dialog {
	position: fixed;
	inset: 0;
	width: 100%;
	height: 100%;
	max-width: 100%;
	max-height: 100%;
	margin: 0;
	padding: 0;
	border: none;
	background: transparent;
}

.sheet-dialog[open] .sheet-content {
	animation: slide-in-from-right 0.5s ease-in-out forwards;
}

.sheet-dialog.closing .sheet-content {
	animation: slide-out-to-right 0.3s ease-in-out forwards;
}

.sheet-content {
	position: fixed;
	top: 0;
	right: 0;
	height: 100%;
	width: 75%;
	max-width: 24rem;
	background: var(--sl-color-bg);
	padding: 1.5rem;
	overflow-y: auto;
	border-left: 1px solid var(--sl-color-gray-5);
	box-shadow: -4px 0 12px rgba(0, 0, 0, 0.15);
}

@keyframes slide-in-from-right {
	from {
		transform: translateX(100%);
	}
	to {
		transform: translateX(0);
	}
}

@keyframes slide-out-to-right {
	from {
		transform: translateX(0);
	}
	to {
		transform: translateX(100%);
	}
}

.sheet-close {
	position: sticky;
	top: 0;
	float: right;
	width: 2rem;
	height: 2rem;
	display: flex;
	align-items: center;
	justify-content: center;
	margin-bottom: 1rem;
	border-radius: 0.125rem;
	opacity: 0.7;
	background: var(--sl-color-bg);
	z-index: 10;
	transition: opacity 0.2s;
	border: none;
	cursor: pointer;
	color: inherit;
}

.sheet-close:hover {
	opacity: 1;
}

.sheet-close svg {
	width: 1rem;
	height: 1rem;
}
`;

interface SheetElement extends HTMLElement {
	open(): void;
	close(): void;
	setContent(html: string): void;
}

class SheetElementImpl extends HTMLElement implements SheetElement {
	private dialog: HTMLDialogElement | null = null;
	private contentContainer: HTMLElement | null = null;

	connectedCallback() {
		this.innerHTML = `
			<style>${SHEET_STYLES}</style>
			<dialog class="sheet-dialog">
				<div class="sheet-content">
					<button type="button" class="sheet-close" aria-label="Close">
						<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
							<path d="M18 6 6 18" />
							<path d="m6 6 12 12" />
						</svg>
					</button>
					<div class="sheet-content-inner"></div>
				</div>
			</dialog>
		`;

		this.dialog = this.querySelector("dialog");
		this.contentContainer = this.querySelector(".sheet-content-inner");
		this.setupEventListeners();
	}

	disconnectedCallback() {
		this.dialog = null;
		this.contentContainer = null;
	}

	private setupEventListeners() {
		this.dialog?.addEventListener("click", (e) => {
			if (e.target === this.dialog) {
				this.close();
			}
		});

		this.dialog?.addEventListener("close", () => {
			this.handleClose();
		});

		this.querySelector(".sheet-close")?.addEventListener("click", () => {
			this.close();
		});
	}

	setContent(html: string) {
		if (this.contentContainer) {
			this.contentContainer.innerHTML = html;
		}
	}

	open() {
		if (!this.dialog) return;
		this.dialog.showModal();
		document.body.style.overflow = "hidden";
	}

	close() {
		if (!this.dialog) return;
		this.dialog.classList.add("closing");

		setTimeout(() => {
			this.dialog?.close();
			this.dialog?.classList.remove("closing");
		}, 300);
	}

	private handleClose() {
		document.body.style.overflow = "";
		this.dispatchEvent(new CustomEvent("sheet-close"));
		this.remove();
	}
}

customElements.define("cfdocs-sheet", SheetElementImpl);

export type { SheetElement };
