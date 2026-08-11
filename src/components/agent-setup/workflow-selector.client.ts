import { mount } from "@cloudflare/nimbus-docs/client";

const OPTION_CLASS =
	"border-border text-muted-foreground hover:border-primary hover:text-foreground aria-checked:border-primary aria-checked:bg-primary aria-checked:text-primary-foreground focus-visible:outline-primary inline-flex h-8 cursor-pointer items-center justify-center rounded-full border px-4 text-sm font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2";

let selectorCount = 0;

function initWorkflowSelector(container: HTMLElement): () => void {
	const id = `agent-workflow-${selectorCount++}`;
	const optionList = container.querySelector<HTMLElement>(
		"[data-agent-workflow-options]",
	);
	const panels = Array.from(
		container.querySelectorAll<HTMLElement>("[data-agent-workflow-option]"),
	).filter(
		(panel) => panel.closest("[data-agent-workflow-selector]") === container,
	);

	if (!optionList || panels.length === 0) return () => {};

	const buttons = panels.map((panel, index) => {
		const button = document.createElement("button");
		const buttonId = `${id}-option-${index}`;
		const panelId = `${id}-panel-${index}`;

		button.id = buttonId;
		button.type = "button";
		button.role = "radio";
		button.className = OPTION_CLASS;
		button.textContent = panel.dataset.label ?? `Option ${index + 1}`;
		button.setAttribute("aria-controls", panelId);

		panel.id = panelId;
		panel.setAttribute("aria-labelledby", buttonId);
		optionList.appendChild(button);

		return button;
	});

	const select = (selectedIndex: number, focus = false, updateUrl = true) => {
		buttons.forEach((button, index) => {
			const selected = index === selectedIndex;
			button.setAttribute("aria-checked", String(selected));
			button.tabIndex = selected ? 0 : -1;
			panels[index].toggleAttribute("data-active", selected);
			panels[index].hidden = !selected;
		});

		const urlParam = container.dataset.urlParam;
		if (updateUrl && urlParam) {
			const url = new URL(window.location.href);
			if (selectedIndex === 0) url.searchParams.delete(urlParam);
			else
				url.searchParams.set(
					urlParam,
					panels[selectedIndex].dataset.value ?? "",
				);
			window.history.replaceState({}, "", url);
		}

		if (focus) buttons[selectedIndex].focus();
	};

	const clickHandlers = buttons.map((button, index) => {
		const handler = () => select(index);
		button.addEventListener("click", handler);
		return handler;
	});

	const handleKeydown = (event: KeyboardEvent) => {
		const currentIndex = buttons.indexOf(event.target as HTMLButtonElement);
		if (currentIndex === -1) return;

		let nextIndex: number | undefined;
		if (event.key === "ArrowRight" || event.key === "ArrowDown") {
			nextIndex = (currentIndex + 1) % buttons.length;
		} else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
			nextIndex = (currentIndex - 1 + buttons.length) % buttons.length;
		} else if (event.key === "Home") {
			nextIndex = 0;
		} else if (event.key === "End") {
			nextIndex = buttons.length - 1;
		}

		if (nextIndex === undefined) return;
		event.preventDefault();
		select(nextIndex, true);
	};

	optionList.addEventListener("keydown", handleKeydown);
	const requestedValue = container.dataset.urlParam
		? new URLSearchParams(window.location.search).get(
				container.dataset.urlParam,
			)
		: null;
	const requestedIndex = panels.findIndex(
		(panel) => panel.dataset.value === requestedValue,
	);
	select(requestedIndex === -1 ? 0 : requestedIndex, false, false);
	container.setAttribute("data-ready", "");

	return () => {
		optionList.removeEventListener("keydown", handleKeydown);
		buttons.forEach((button, index) => {
			button.removeEventListener("click", clickHandlers[index]);
			button.remove();
		});
		panels.forEach((panel) => {
			panel.hidden = false;
			panel.removeAttribute("data-active");
			panel.removeAttribute("aria-labelledby");
			panel.removeAttribute("id");
		});
		container.removeAttribute("data-ready");
	};
}

mount("[data-agent-workflow-selector]", initWorkflowSelector);
