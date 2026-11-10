import { HTMLElement, NodeType, parse } from "node-html-parser";

const ITEM = "data-cli-variants-item";
const CLIS = ["wrangler", "cf"] as const;

/**
 * Checks the rendered children of `<CliVariants>` and returns a problem
 * description, or `null` when the markup is valid.
 *
 * The selector script shows only the first `[data-nb-cli-variant]` that
 * matches the preference inside a scope and hides every other one, so a
 * nested scope (for example `<PackageManagers cfCommand>` inside a variant)
 * would have its own variants hidden. Reject that rather than render a
 * page that silently loses content.
 */
export function validateCliVariants(html: string): string | null {
	const root = parse(html);

	const strayContent = root.childNodes.some((node) => {
		if (node.nodeType === NodeType.TEXT_NODE) return node.text.trim() !== "";
		if (node.nodeType === NodeType.ELEMENT_NODE) {
			return !(node as HTMLElement).hasAttribute(ITEM);
		}
		return false;
	});
	if (strayContent) {
		return 'Put all content inside a <CliVariant cli="wrangler"> or <CliVariant cli="cf"> child.';
	}

	const items = root.querySelectorAll(`[${ITEM}]`);
	if (items.some((item) => item.parentNode !== root)) {
		return "Do not nest <CliVariants> inside another <CliVariants>.";
	}

	if (root.querySelector("[data-nb-cli-preference-scope]")) {
		return "Do not put components with their own CLI selector (cfCommand, cfConfig or cfNamespace) inside <CliVariants>. Write the cf version inside the cf variant instead.";
	}

	for (const cli of CLIS) {
		const count = items.filter(
			(item) => item.getAttribute(ITEM) === cli,
		).length;
		if (count !== 1) {
			return `Expected exactly one <CliVariant cli="${cli}"> child, found ${count}.`;
		}
	}

	return null;
}
