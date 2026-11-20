import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { parse } from "node-html-parser";
import { expect, test } from "vitest";

import BuildFromScratch from "./BuildFromScratch.astro";

test("renders copyable commands for both CLI preferences", async () => {
	const container = await AstroContainer.create();
	const root = parse(await container.renderToString(BuildFromScratch));
	const section = root.querySelector("#build[data-nb-cli-preference-scope]");

	expect(section).not.toBeNull();
	expect(
		section?.querySelector('[data-nb-cli-toggle="wrangler"]'),
	).not.toBeNull();
	expect(section?.querySelector('[data-nb-cli-toggle="cf"]')).not.toBeNull();

	for (const [panelId, commands] of Object.entries({
		ai: {
			wrangler: "npx wrangler ai models",
			cf: "cf ai run @cf/meta/llama-3.1-8b-instruct --help",
		},
		storage: {
			wrangler: "npx wrangler d1 create my-database",
			cf: "cf d1 --help",
		},
	})) {
		const panel = section?.querySelector(`#build-panel-${panelId}`);
		for (const [cli, command] of Object.entries(commands)) {
			const variant = panel?.querySelector(`[data-nb-cli-variant="${cli}"]`);
			const codeId = `build-cmd-${panelId}-${cli}`;
			expect(variant?.querySelector("code")?.id).toBe(codeId);
			expect(variant?.querySelector("code")?.textContent).toBe(command);
			expect(
				variant
					?.querySelector("button[data-copy-target]")
					?.getAttribute("data-copy-target"),
			).toBe(codeId);
		}
	}
});
