import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { parse } from "node-html-parser";
import { expect, test } from "vitest";

import TypeScriptExample from "./TypeScriptExample.astro";

// `blockTextElements: {}` parses <pre> content so `textContent` returns code text.
const html = (s: string) => parse(s, { blockTextElements: {} });

const fence = (code: string) => `<pre><code>${code}</code></pre>`;

const render = async (code: string, props: Record<string, unknown> = {}) => {
	const container = await AstroContainer.create();
	return container.renderToString(TypeScriptExample, {
		props,
		slots: { default: fence(code) },
	});
};

test("renders a JavaScript tab with the types stripped", async () => {
	const root = html(await render("const count: number = 1;"));
	const panels = root.querySelectorAll("[data-nb-tabs-content]");

	expect(panels.map((p) => p.getAttribute("data-nb-tab-label"))).toEqual([
		"JavaScript",
		"TypeScript",
	]);
	expect(panels[0].textContent).toContain("const count = 1;");
	expect(panels[0].textContent).not.toContain("number");
});

test("keeps code that mixes types with runtime code", async () => {
	const root = html(
		await render(
			"interface Env { KV: KVNamespace }\n// a comment\nexport default { fetch() {} };",
		),
	);
	const js = root.querySelector('[data-nb-tab-label="JavaScript"]');

	expect(js?.textContent).toContain("export default");
	expect(js?.textContent).not.toContain("interface");
});

test.each([
	["a type alias", "type Event = { id: string; };"],
	["an interface", "interface Env { KV: KVNamespace }"],
	["types and comments", "// The event shape\n/** Docs */\ntype A = string;"],
	["a declaration", "declare const VERSION: string;"],
])("fails the build for a snippet with only %s", async (_, code) => {
	await expect(render(code)).rejects.toThrow(
		"[TypeScriptExample] The JavaScript tab would be empty",
	);
});

test("fails the build for type-only snippets with omitTabs", async () => {
	await expect(
		render("type Event = { id: string; };", { omitTabs: true }),
	).rejects.toThrow("[TypeScriptExample] The JavaScript tab would be empty");
});

test("omitTabs renders both panels without a tabs wrapper", async () => {
	const root = html(await render("const a: number = 1;", { omitTabs: true }));

	expect(root.querySelector("[data-nb-tabs]")).toBeNull();
	expect(
		root
			.querySelectorAll("[data-nb-tabs-content]")
			.map((p) => p.getAttribute("data-nb-tab-label")),
	).toEqual(["JavaScript", "TypeScript"]);
});
