import "../sheet/sheet";
import type { SheetElement } from "../sheet/sheet";

const EXPLAIN_CODE_STYLES = `
.sheet-title {
	font-size: 1.125rem;
	font-weight: 600;
	margin-bottom: 1rem;
}

.explanation-content {
	font-size: 0.875rem;
	color: var(--sl-color-gray-2);
	padding: 1rem;
	background: var(--sl-color-gray-6);
	border-radius: 0.25rem;
	overflow: auto;
	width: 100%;
}

.loading-skeleton {
	display: flex;
	flex-direction: column;
	gap: 0.75rem;
}

.skeleton-line {
	height: 1rem;
	background: var(--sl-color-gray-5);
	border-radius: 0.25rem;
	animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}

.skeleton-line.w-5-6 { width: 83.333%; }
.skeleton-line.w-4-6 { width: 66.667%; }
.skeleton-line.w-3-4 { width: 75%; }
.skeleton-line.w-2-3 { width: 66.667%; }
.skeleton-line.w-4-5 { width: 80%; }
.skeleton-line.mt-6 { margin-top: 1.5rem; }

@keyframes pulse {
	0%, 100% { opacity: 1; }
	50% { opacity: 0.5; }
}

.error-state {
	display: flex;
	align-items: flex-start;
	gap: 0.75rem;
	padding: 1rem;
	border-radius: 0.25rem;
	background: var(--sl-color-red-low);
	border: 1px solid var(--sl-color-red);
	font-size: 0.875rem;
	color: var(--sl-color-text);
	width: 100%;
}

.error-state svg {
	flex-shrink: 0;
	margin-top: 0.125rem;
	color: var(--sl-color-red);
}

.sheet-disclaimer {
	display: flex;
	align-items: flex-start;
	gap: 0.75rem;
	padding: 1rem;
	margin-top: 1rem;
	border-radius: 0.25rem;
	background: var(--sl-color-orange-low);
	border: 1px solid var(--sl-color-orange);
	font-size: 0.875rem;
	color: var(--sl-color-text);
}

.sheet-disclaimer svg {
	flex-shrink: 0;
	margin-top: 0.125rem;
	color: var(--sl-color-orange);
}
`;

const ERROR_MESSAGE = "Unable to generate explanation. Please try again later.";

const LOADING_HTML = `
	<style>${EXPLAIN_CODE_STYLES}</style>
	<h2 class="sheet-title">Code Explanation</h2>
	<div class="explanation-content">
		<div class="loading-skeleton">
			<div class="skeleton-line"></div>
			<div class="skeleton-line w-5-6"></div>
			<div class="skeleton-line w-4-6"></div>
			<div class="skeleton-line mt-6"></div>
			<div class="skeleton-line w-3-4"></div>
			<div class="skeleton-line w-5-6"></div>
			<div class="skeleton-line w-2-3 mt-6"></div>
			<div class="skeleton-line"></div>
			<div class="skeleton-line w-4-5"></div>
			<div class="skeleton-line"></div>
			<div class="skeleton-line w-5-6"></div>
			<div class="skeleton-line w-4-6"></div>
			<div class="skeleton-line mt-6"></div>
			<div class="skeleton-line w-3-4"></div>
			<div class="skeleton-line w-5-6"></div>
			<div class="skeleton-line w-2-3 mt-6"></div>
			<div class="skeleton-line"></div>
			<div class="skeleton-line w-4-5"></div>
			<div class="skeleton-line"></div>
			<div class="skeleton-line w-5-6"></div>
			<div class="skeleton-line w-4-6"></div>
			<div class="skeleton-line mt-6"></div>
			<div class="skeleton-line w-3-4"></div>
			<div class="skeleton-line w-5-6"></div>
			<div class="skeleton-line w-2-3 mt-6"></div>
			<div class="skeleton-line"></div>
			<div class="skeleton-line w-4-5"></div>
			<div class="skeleton-line"></div>
			<div class="skeleton-line w-5-6"></div>
			<div class="skeleton-line w-4-6"></div>
			<div class="skeleton-line mt-6"></div>
			<div class="skeleton-line w-3-4"></div>
			<div class="skeleton-line w-5-6"></div>
		</div>
	</div>
`;

const ERROR_HTML = `
	<style>${EXPLAIN_CODE_STYLES}</style>
	<h2 class="sheet-title">Code Explanation</h2>
	<div class="error-state">
		<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
			<circle cx="12" cy="12" r="10"/>
			<line x1="12" y1="8" x2="12" y2="12"/>
			<line x1="12" y1="16" x2="12.01" y2="16"/>
		</svg>
		<div>
			<p>${ERROR_MESSAGE}</p>
		</div>
	</div>
`;

function getSuccessHtml(explanation: string): string {
	return `
		<style>${EXPLAIN_CODE_STYLES}</style>
		<h2 class="sheet-title">Code Explanation</h2>
		<div class="explanation-content">
			${explanation}
		</div>
		<div class="sheet-disclaimer">
			<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
				<path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z"/>
				<line x1="12" y1="9" x2="12" y2="13"/>
				<line x1="12" y1="17" x2="12.01" y2="17"/>
			</svg>
			<div>
				<p>Explain Code is experimental and may produce incorrect answers. Always verify the output before executing.</p>
			</div>
		</div>
	`;
}

class ExplainCodeElement extends HTMLElement {
	private codeBlockPosition = 0;
	private abortController: AbortController | null = null;
	private sheet: SheetElement | null = null;

	connectedCallback() {
		this.codeBlockPosition = parseInt(
			this.getAttribute("code-block-position") || "0",
			10,
		);

		this.innerHTML = `<cfdocs-sheet></cfdocs-sheet>`;
		this.sheet = this.querySelector("cfdocs-sheet") as SheetElement;

		this.sheet?.addEventListener("sheet-close", () => {
			this.remove();
		});

		this.sheet?.setContent(LOADING_HTML);
		this.sheet?.open();

		this.fetchExplanation();
	}

	disconnectedCallback() {
		this.abortController?.abort();
	}

	private getApiBaseUrl(): string {
		return (
			(import.meta.env?.PUBLIC_EXPLAIN_CODE_API_URL as string | undefined) ||
			"https://docs-ai-production.cloudflare-docs.workers.dev"
		);
	}

	private async fetchExplanation() {
		this.abortController = new AbortController();
		const path = window.location.pathname.replace(/^\/|\/$/g, "");
		const baseUrl = this.getApiBaseUrl();
		const url = `${baseUrl}/explain/${path}?codeBlock=${this.codeBlockPosition}`;

		try {
			const response = await fetch(url, {
				signal: this.abortController.signal,
				headers: {
					Accept: "text/html",
				},
			});

			const finishReason = response.headers.get("cf-docs-finish-reason");

			if (!response.ok || finishReason !== "stop") {
				throw new Error("Request failed");
			}

			const explanation = await response.text();
			this.sheet?.setContent(getSuccessHtml(explanation));
		} catch (error) {
			if ((error as Error).name === "AbortError") return;
			this.sheet?.setContent(ERROR_HTML);
		}
	}
}

customElements.define("cfdocs-explain-code", ExplainCodeElement);

export { ExplainCodeElement };
