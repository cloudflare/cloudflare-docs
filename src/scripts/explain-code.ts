import "../components/explain-code-sheet/explain-code-sheet";

function getCodeBlockPosition(button: HTMLElement): number {
	const wrapperSelector = ".explain";
	const codeSelector = "pre code";
	const codeBlocks = document.querySelectorAll(codeSelector);
	const wrapper = button.closest(wrapperSelector);

	let currentBlock = wrapper?.previousElementSibling;
	while (currentBlock) {
		if (currentBlock.tagName === "PRE") {
			currentBlock = currentBlock.querySelector(codeSelector);
			break;
		}
		currentBlock = currentBlock.previousElementSibling;
	}
	if (!currentBlock) return 1;
	return Array.from(codeBlocks).indexOf(currentBlock) + 1;
}

function handleExplainButtonClick(this: HTMLButtonElement, e: MouseEvent) {
	e.preventDefault();

	const position = getCodeBlockPosition(this);

	const sheet = document.createElement("cfdocs-explain-code");
	sheet.setAttribute("code-block-position", String(position));
	document.body.appendChild(sheet);
}

function init() {
	const buttons = document.querySelectorAll<HTMLButtonElement>(
		"button[data-explain-code]",
	);
	buttons.forEach((button) => {
		button.addEventListener("click", handleExplainButtonClick);
	});
}

function cleanup() {
	const buttons = document.querySelectorAll<HTMLButtonElement>(
		"button[data-explain-code]",
	);
	buttons.forEach((button) => {
		button.removeEventListener("click", handleExplainButtonClick);
	});
}

document.addEventListener("astro:before-swap", cleanup);
document.addEventListener("astro:page-load", init);

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}
