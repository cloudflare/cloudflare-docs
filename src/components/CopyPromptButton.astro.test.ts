import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { parse } from "node-html-parser";
import { describe, expect, test } from "vitest";

import { AGENT_SETUP_PROMPT } from "./agents";
import CopyPromptButton from "./CopyPromptButton.astro";

const renderPrompt = async (prompt?: string): Promise<string | undefined> => {
	const container = await AstroContainer.create();
	const html = await container.renderToString(CopyPromptButton, {
		props: prompt ? { prompt } : {},
	});

	return parse(html)
		.querySelector(".copy-prompt-btn")
		?.getAttribute("data-prompt");
};

describe("CopyPromptButton", () => {
	test("uses the agent setup prompt by default", async () => {
		expect(await renderPrompt()).toBe(AGENT_SETUP_PROMPT);
	});

	test("accepts a custom prompt", async () => {
		const prompt = 'Migrate "this application" <safely> & verify it';

		expect(await renderPrompt(prompt)).toBe(prompt);
	});
});
