import mermaid from "mermaid";

const diagrams = document.querySelectorAll<HTMLPreElement>("pre.mermaid");

let init = false;

async function render() {
	const theme =
		document.documentElement.getAttribute("data-theme") === "light"
			? "neutral"
			: "dark";

	for (const diagram of diagrams) {
		if (!init) {
			diagram.setAttribute("data-diagram", diagram.textContent as string);
		}

		const def = diagram.getAttribute("data-diagram") as string;

		mermaid.initialize({ startOnLoad: false, theme });
		await mermaid
			.render(`mermaid-${crypto.randomUUID()}`, def)
			.then(({ svg }) => (diagram.innerHTML = svg));

		diagram.setAttribute("data-processed", "true");
	}

	init = true;
}

const obs = new MutationObserver(() => render());

obs.observe(document.documentElement, {
	attributes: true,
	attributeFilter: ["data-theme"],
});
