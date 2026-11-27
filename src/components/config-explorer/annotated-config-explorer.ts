class AnnotatedConfigElement extends HTMLElement {
	tabs: HTMLButtonElement[] = [];
	expandButton?: HTMLButtonElement;
	copyButton?: HTMLButtonElement;
	status?: HTMLElement;
	statusTimer?: number;
	copyTimer?: number;
	activatedLine?: HTMLDetailsElement;

	connectedCallback() {
		this.tabs = Array.from(
			this.querySelectorAll<HTMLButtonElement>(
				'[data-ace-tablist] > [role="tab"]',
			),
		);
		this.status =
			this.querySelector<HTMLElement>("[data-ace-status]") ?? undefined;

		for (const tab of this.tabs) {
			tab.addEventListener("click", () => this.selectTab(tab));
			tab.addEventListener("keydown", (event) => this.handleTabKeydown(event));
			this.panelFor(tab)?.addEventListener("beforematch", () =>
				this.selectTab(tab),
			);
		}

		this.expandButton =
			this.querySelector<HTMLButtonElement>("[data-ace-expand]") ?? undefined;
		this.copyButton =
			this.querySelector<HTMLButtonElement>("[data-ace-copy]") ?? undefined;
		if (this.expandButton) {
			this.expandButton.hidden = false;
			this.expandButton.addEventListener("click", () => this.toggleAll());
		}
		if (this.copyButton) {
			this.copyButton.hidden = false;
			this.copyButton.addEventListener("click", () => this.copyExample());
		}

		this.addEventListener("click", this.handleLineActivation);
		this.addEventListener("toggle", this.handleLineToggle, true);
		window.addEventListener("hashchange", this.revealHashTarget);
		this.revealHashTarget();
	}

	disconnectedCallback() {
		this.removeEventListener("click", this.handleLineActivation);
		this.removeEventListener("toggle", this.handleLineToggle, true);
		window.removeEventListener("hashchange", this.revealHashTarget);
	}

	panelFor(tab: HTMLButtonElement) {
		const panelId = tab.getAttribute("aria-controls");
		return panelId ? document.getElementById(panelId) : null;
	}

	selectTab(selectedTab: HTMLButtonElement, focus = false) {
		for (const tab of this.tabs) {
			const selected = tab === selectedTab;
			tab.setAttribute("aria-selected", String(selected));
			tab.tabIndex = selected ? 0 : -1;
			const panel = this.panelFor(tab);
			if (!panel) {
				continue;
			}
			if (selected) {
				panel.removeAttribute("hidden");
			} else {
				panel.setAttribute("hidden", "until-found");
			}
		}
		if (focus) {
			selectedTab.focus();
		}
		this.updateToggleAllButton();
	}

	activePanel() {
		// A custom snippet has a single panel and no tabs.
		if (!this.tabs.length) {
			return this.querySelector<HTMLElement>("[data-ace-panel]");
		}
		const tab = this.tabs.find(
			(candidate) => candidate.getAttribute("aria-selected") === "true",
		);
		return tab ? this.panelFor(tab) : null;
	}

	handleTabKeydown(event: KeyboardEvent) {
		const current = this.tabs.indexOf(event.currentTarget as HTMLButtonElement);
		const last = this.tabs.length - 1;
		const next: Record<string, number> = {
			ArrowRight: current === last ? 0 : current + 1,
			ArrowLeft: current === 0 ? last : current - 1,
			Home: 0,
			End: last,
		};
		if (!(event.key in next)) {
			return;
		}
		event.preventDefault();
		this.selectTab(this.tabs[next[event.key]], true);
	}

	revealHashTarget = () => {
		const id = decodeURIComponent(window.location.hash.slice(1));
		const target = id ? document.getElementById(id) : null;
		if (!target || !this.contains(target)) {
			return;
		}
		const panel = target.closest<HTMLElement>("[data-ace-panel]");
		const tab = this.tabs.find(
			(candidate) => this.panelFor(candidate) === panel,
		);
		if (tab) {
			this.selectTab(tab);
		}
		if (target instanceof HTMLDetailsElement) {
			target.open = true;
		}
		target.scrollIntoView({ block: "center" });
	};

	handleLineActivation = (event: Event) => {
		const summary =
			event.target instanceof Element
				? event.target.closest(".ace-summary")
				: null;
		if (summary?.parentElement instanceof HTMLDetailsElement) {
			this.activatedLine = summary.parentElement;
		}
	};

	handleLineToggle = (event: Event) => {
		const line = event.target;
		if (
			!(line instanceof HTMLDetailsElement) ||
			!line.matches(".ace-annotated")
		) {
			return;
		}
		if (line === this.activatedLine) {
			this.activatedLine = undefined;
			if (line.open) {
				this.revealLine(line);
			}
		}
		if (line.closest("[data-ace-panel]") === this.activePanel()) {
			this.updateToggleAllButton();
		}
	};

	revealLine(line: HTMLDetailsElement) {
		const container = line.closest<HTMLElement>(".ace-code");
		if (!container) {
			return;
		}
		const box = container.getBoundingClientRect();
		const rect = line.getBoundingClientRect();
		const overflow = rect.bottom - box.bottom;
		if (overflow <= 0) {
			return;
		}
		const reduceMotion = window.matchMedia(
			"(prefers-reduced-motion: reduce)",
		).matches;
		container.scrollBy({
			top: Math.min(overflow, rect.top - box.top),
			behavior: reduceMotion ? "auto" : "smooth",
		});
	}

	annotatedLines(panel: HTMLElement) {
		return Array.from(
			panel.querySelectorAll<HTMLDetailsElement>("details.ace-annotated"),
		);
	}

	setButtonState(
		button: HTMLButtonElement,
		label: string,
		visibleIcon: string,
	) {
		const text = button.querySelector("[data-ace-label]");
		if (text) {
			text.textContent = label;
		}
		button.querySelectorAll("[data-ace-icon]").forEach((icon) => {
			icon.classList.toggle(
				"hidden",
				icon.getAttribute("data-ace-icon") !== visibleIcon,
			);
		});
	}

	updateToggleAllButton() {
		const panel = this.activePanel();
		if (!panel || !this.expandButton) {
			return;
		}
		const allOpen = this.annotatedLines(panel).every((line) => line.open);
		this.setButtonState(
			this.expandButton,
			allOpen ? "Collapse all" : "Expand all",
			allOpen ? "collapse" : "expand",
		);
	}

	toggleAll() {
		const panel = this.activePanel();
		if (!panel) {
			return;
		}
		const lines = this.annotatedLines(panel);
		const open = lines.some((line) => !line.open);
		for (const line of lines) {
			line.open = open;
		}
		this.updateToggleAllButton();
		this.announce(
			open ? "Expanded all option details." : "Collapsed all option details.",
		);
	}

	async copyExample() {
		const button = this.copyButton;
		const source = this.activePanel()?.querySelector<HTMLTemplateElement>(
			"template[data-ace-source]",
		);
		if (!button || !source) {
			return;
		}
		window.clearTimeout(this.copyTimer);
		try {
			await navigator.clipboard.writeText(source.content.textContent ?? "");
			this.setButtonState(button, "Copied", "copied");
			this.announce("Copied the example to the clipboard.");
		} catch {
			this.setButtonState(button, "Copy failed", "copy");
			this.announce("The example could not be copied.");
		}
		this.copyTimer = window.setTimeout(() => {
			this.setButtonState(button, "Copy", "copy");
		}, 1500);
	}

	announce(message: string) {
		if (!this.status) {
			return;
		}
		window.clearTimeout(this.statusTimer);
		this.status.textContent = message;
		this.statusTimer = window.setTimeout(() => {
			if (this.status) {
				this.status.textContent = "";
			}
		}, 3000);
	}
}

if (
	globalThis.customElements &&
	!customElements.get("cfdocs-annotated-config")
) {
	customElements.define("cfdocs-annotated-config", AnnotatedConfigElement);
}

// Marks the file as a module so that tests can import it for its side effect.
export {};
