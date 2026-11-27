import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { parse } from "node-html-parser";
import { expect, test } from "vitest";

import CopyPromptButton from "./CopyPromptButton.astro";
import { AGENT_SETUP_PROMPT } from "./agents";

test("preserves the default Cloudflare agent setup prompt", async () => {
	const container = await AstroContainer.create();
	const root = parse(await container.renderToString(CopyPromptButton));
	const button = root.querySelector("button.copy-prompt-btn");

	expect(button?.getAttribute("data-prompt")).toBe(AGENT_SETUP_PROMPT);
	expect(button?.textContent).toContain("Copy prompt");
	expect(button?.textContent).toContain("Prompt copied!");
});

test("renders a custom prompt without changing the default", async () => {
	const container = await AstroContainer.create();
	const prompt = "Create my first Artifacts repository and verify a Git push.";
	const root = parse(
		await container.renderToString(CopyPromptButton, { props: { prompt } }),
	);

	expect(root.querySelector("button")?.getAttribute("data-prompt")).toBe(
		prompt,
	);
	expect(prompt).not.toBe(AGENT_SETUP_PROMPT);
});

test("preserves multiline prompts and safely escapes attribute contents", async () => {
	const container = await AstroContainer.create();
	const prompt = `Use "cf" & Git.\nDo not execute <script>alert('test')</script>.`;
	const root = parse(
		await container.renderToString(CopyPromptButton, { props: { prompt } }),
	);

	expect(root.querySelector("button")?.getAttribute("data-prompt")).toBe(
		prompt,
	);
	expect(root.querySelector("button script")).toBeNull();
});
