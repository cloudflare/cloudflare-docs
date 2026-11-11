import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { parse } from "node-html-parser";
import { expect, test } from "vitest";

import CliPreferenceGuidance from "./CliPreferenceGuidance.astro";
import CliPreferenceSwitch from "./CliPreferenceSwitch.astro";

test("renders the guidance, then cf, then Wrangler", async () => {
	const container = await AstroContainer.create();
	const scope = parse(
		await container.renderToString(CliPreferenceSwitch, {
			slots: { wrangler: "<p>Run Wrangler.</p>", cf: "<p>Run cf.</p>" },
		}),
	).querySelector("[data-nb-cli-preference-scope]");

	expect(
		scope?.querySelectorAll("[data-nb-cli-guidance], [data-nb-cli-variant]"),
	).toEqual([
		scope?.querySelector("[data-nb-cli-guidance]"),
		scope?.querySelector('[data-nb-cli-variant="cf"]'),
		scope?.querySelector('[data-nb-cli-variant="wrangler"]'),
	]);
});

test("the guidance is hidden from readers and names both CLIs", async () => {
	const container = await AstroContainer.create();
	const guidance = parse(
		await container.renderToString(CliPreferenceGuidance),
	).querySelector("[data-nb-cli-guidance]");

	expect(guidance?.classList.contains("sr-only")).toBe(true);
	expect(guidance?.getAttribute("aria-hidden")).toBe("true");
	expect(guidance?.textContent.replace(/\s+/g, " ").trim()).toBe(
		"The following content appears twice: first for the Cloudflare CLI (cf), then for Wrangler. Use cf for new projects. In an existing project, use the CLI that the project already uses.",
	);
});
