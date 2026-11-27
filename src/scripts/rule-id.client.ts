// Click-to-copy for the RuleID pill. Global (not a hoisted component script)
// because RuleID renders inside changelog entries, whose render path does not
// propagate hoisted scripts.

import { mount } from "@cloudflare/nimbus-docs/client";

function initRuleIdCopy(root: HTMLElement): () => void {
	const button = root.querySelector<HTMLButtonElement>("button");
	if (!button) return () => {};

	async function onClick() {
		try {
			await navigator.clipboard?.writeText(root.dataset.ruleId ?? "");
		} catch {
			// Clipboard unavailable (insecure context) or permission denied.
		}
	}

	button.addEventListener("click", onClick);

	return () => button.removeEventListener("click", onClick);
}

mount("[data-rule-id]", initRuleIdCopy);
