import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { parse } from "node-html-parser";
import { expect, test } from "vitest";

import CliVariant from "./CliVariant.astro";
import CliVariants from "./CliVariants.astro";

const variant = (cli: string, body: string) =>
	`<div data-nb-cli-variant="${cli}" data-cli-variants-item="${cli}">${body}</div>`;

test("renders both variants inside one CLI preference scope", async () => {
	const container = await AstroContainer.create();
	const root = parse(
		await container.renderToString(CliVariants, {
			props: { anchorId: "create-a-namespace" },
			slots: {
				default:
					variant("wrangler", "<p>Run Wrangler.</p>") +
					variant("cf", "<p>Run cf.</p>"),
			},
		}),
	);
	const scope = root.querySelector("[data-nb-cli-preference-scope]");

	expect(scope?.getAttribute("data-nb-cli-anchor")).toBe("create-a-namespace");
	expect(
		scope?.querySelector('[data-nb-cli-toggle="wrangler"]'),
	).not.toBeNull();
	expect(scope?.querySelector('[data-nb-cli-toggle="cf"]')).not.toBeNull();
	expect(
		scope?.querySelector('[data-nb-cli-variant="wrangler"]')?.textContent,
	).toBe("Run Wrangler.");
	expect(scope?.querySelector('[data-nb-cli-variant="cf"]')?.textContent).toBe(
		"Run cf.",
	);
	expect(
		scope?.querySelectorAll("[data-nb-cli-guidance], [data-nb-cli-variant]"),
	).toEqual([
		scope?.querySelector("[data-nb-cli-guidance]"),
		scope?.querySelector('[data-nb-cli-variant="cf"]'),
		scope?.querySelector('[data-nb-cli-variant="wrangler"]'),
	]);
});

test("fails the build when a variant is missing", async () => {
	const container = await AstroContainer.create();
	await expect(
		container.renderToString(CliVariants, {
			slots: { default: variant("wrangler", "<p>Only Wrangler.</p>") },
		}),
	).rejects.toThrow('[CliVariants] Expected exactly one <CliVariant cli="cf">');
});

test("CliVariant renders a marked panel for its CLI", async () => {
	const container = await AstroContainer.create();
	const root = parse(
		await container.renderToString(CliVariant, {
			props: { cli: "cf" },
			slots: { default: "<p>Run cf.</p>" },
		}),
	);
	const panel = root.querySelector("[data-nb-cli-variant]");

	expect(panel?.getAttribute("data-nb-cli-variant")).toBe("cf");
	expect(panel?.getAttribute("data-cli-variants-item")).toBe("cf");
	expect(panel?.querySelector("[data-nb-cli-label]")?.textContent.trim()).toBe(
		"Cloudflare CLI",
	);
	expect(panel?.lastElementChild?.textContent).toBe("Run cf.");
});

test("CliVariant rejects an unknown CLI", async () => {
	const container = await AstroContainer.create();
	await expect(
		container.renderToString(CliVariant, { props: { cli: "npm" } }),
	).rejects.toThrow('`cli` must be "wrangler" or "cf"');
});
