import "../components/explain-code-sheet/explain-code-sheet";
import tippy, { type Instance } from "tippy.js";

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

const tippyInstances: Instance[] = [];
const copyClickListeners: Array<{
	button: HTMLButtonElement;
	listener: () => void;
}> = [];
let initialized = false;

function init() {
	if (initialized) return;
	initialized = true;

	const explainButtons = document.querySelectorAll<HTMLButtonElement>(
		"button[data-explain-code]",
	);
	explainButtons.forEach((button) => {
		button.addEventListener("click", handleExplainButtonClick);
		const instance = tippy(button, {
			content: "Explain Code",
			placement: "top",
			arrow: false,
			appendTo: () => document.body,
		});
		tippyInstances.push(instance);
	});

	const copyButtons = document.querySelectorAll<HTMLButtonElement>(
		".expressive-code .copy > button",
	);
	copyButtons.forEach((button) => {
		const instance = tippy(button, {
			content: "Copy to clipboard",
			placement: "top",
			arrow: false,
			appendTo: () => document.body,
		});
		tippyInstances.push(instance);

		const listener = () => {
			instance.setContent("Copied!");
			instance.show();
			setTimeout(() => {
				instance.setContent("Copy to clipboard");
			}, 2500);
		};
		button.addEventListener("click", listener);
		copyClickListeners.push({ button, listener });
	});
}

function cleanup() {
	const explainButtons = document.querySelectorAll<HTMLButtonElement>(
		"button[data-explain-code]",
	);
	explainButtons.forEach((button) => {
		button.removeEventListener("click", handleExplainButtonClick);
	});
	tippyInstances.forEach((instance) => instance.destroy());
	tippyInstances.length = 0;
	copyClickListeners.forEach(({ button, listener }) =>
		button.removeEventListener("click", listener),
	);
	copyClickListeners.length = 0;
	initialized = false;
}

document.addEventListener("astro:before-swap", cleanup);
document.addEventListener("astro:page-load", init);

if (document.readyState === "loading") {
	document.addEventListener("DOMContentLoaded", init);
} else {
	init();
}
