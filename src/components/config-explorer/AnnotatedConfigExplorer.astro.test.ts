import { experimental_AstroContainer as AstroContainer } from "astro/container";
import { builtinEnvironments } from "vitest/environments";
import {
	afterAll,
	afterEach,
	beforeAll,
	describe,
	expect,
	it,
	vi,
} from "vitest";

import AnnotatedConfigExplorer from "./AnnotatedConfigExplorer.astro";
import { slug } from "./annotated-config";
import { allReferences } from "./config-examples";

const CODE = `import { bindings, defineConfig } from "cf/config";
import * as entrypoint from "./src/index.ts" with { type: "cf-worker" };

export default defineConfig({
	worker: {
		name: "my-worker", // </span><script>alert("x")</script>
		compatibilityDate: "2026-09-17",
		entrypoint,
		env: {
			WORLD: bindings.text("World"),
		},
	},
});`;

// Astro renders under Node. The client script needs a DOM, so every example
// is rendered first and happy-dom is installed afterwards.
const html: Record<string, string> = {};
const renderErrors: Record<string, unknown> = {};
let teardown: (() => unknown) | undefined;

const mount = (markup: string) => {
	// happy-dom only upgrades custom elements that are imported or created, not
	// ones parsed by `innerHTML`.
	const template = document.createElement("template");
	template.innerHTML = markup;
	document.body.replaceChildren(document.importNode(template.content, true));
	return [...document.querySelectorAll<HTMLElement>("cfdocs-annotated-config")];
};

const lines = (explorer: HTMLElement) => [
	...explorer.querySelectorAll<HTMLDetailsElement>("details.ace-annotated"),
];

const label = (button: HTMLElement | null) =>
	button?.querySelector("[data-ace-label]")?.textContent;

beforeAll(async () => {
	const container = await AstroContainer.create();
	const render = (props: Record<string, unknown>) =>
		container.renderToString(AnnotatedConfigExplorer, { props });

	html.init = await render({
		id: "init",
		code: CODE,
		filename: "cloudflare.config.ts",
	});
	html.pair =
		(await render({ id: "first", code: CODE })) +
		(await render({ id: "second", code: CODE }));
	html.bindings = await render({ category: "bindings" });
	html.reference = await render({ id: "reference" });
	for (const [name, props] of Object.entries({
		missingId: { code: CODE },
		empty: { id: "empty", code: "\n\t\n" },
	})) {
		await render(props).catch((error: unknown) => {
			renderErrors[name] = error;
		});
	}

	const environment = await builtinEnvironments["happy-dom"].setup(globalThis, {
		happyDOM: { url: "https://developers.cloudflare.com/" },
	});
	teardown = () => environment.teardown(globalThis);
	Element.prototype.scrollIntoView = () => {};
	await import("./annotated-config-explorer");
});

afterEach(() => {
	document.body.innerHTML = "";
	window.location.hash = "";
	vi.restoreAllMocks();
});

afterAll(async () => {
	await teardown?.();
});

describe("AnnotatedConfigExplorer with code", () => {
	it("renders one annotated example with a filename instead of tabs", async () => {
		const [explorer] = mount(html.init);

		expect(explorer.classList.contains("ace-snippet")).toBe(true);
		expect(explorer.querySelector(".ace-filename")?.textContent).toBe(
			"cloudflare.config.ts",
		);
		expect(explorer.querySelector('[role="tablist"]')).toBeNull();
		expect(explorer.querySelector('[role="tabpanel"]')).toBeNull();
		expect(explorer.querySelector(".ace-source")).toBeNull();
		expect(explorer.querySelectorAll("[data-ace-panel]")).toHaveLength(1);
		expect(lines(explorer).map((line) => line.id)).toEqual([
			"init-defineconfig",
			"init-cloudflareconfig-worker",
			"init-workerconfig-name",
			"init-workerconfig-compatibilitydate",
			"init-workerconfig-entrypoint",
			"init-workerconfig-env",
			"init-bindings-text-default",
		]);
		expect(
			explorer.querySelector<HTMLTemplateElement>("template[data-ace-source]")
				?.content.textContent,
		).toBe(CODE);
	});

	it("does not render the snippet as HTML", async () => {
		const [explorer] = mount(html.init);

		expect(html.init).not.toContain("<script>alert");
		expect(explorer.querySelector(".ace-code script")).toBeNull();
		expect(
			explorer.querySelector("#init-workerconfig-name .ace-comment")
				?.textContent,
		).toBe('// </span><script>alert("x")</script>');
	});

	it("requires an explicit id and non-empty code", () => {
		expect(String(renderErrors.missingId)).toMatch(/unique `id`/);
		expect(String(renderErrors.empty)).toMatch(/is empty/);
	});

	it("expands, collapses, and copies without a tablist", async () => {
		const writeText = vi.fn(() => Promise.resolve());
		vi.spyOn(navigator, "clipboard", "get").mockReturnValue({
			writeText,
		} as unknown as Clipboard);
		const [first, second] = mount(html.pair);
		const expand = first.querySelector<HTMLButtonElement>("[data-ace-expand]");
		const copy = first.querySelector<HTMLButtonElement>("[data-ace-copy]");

		expect(expand?.hidden).toBe(false);
		expect(copy?.hidden).toBe(false);

		expand?.click();
		expect(lines(first).every((line) => line.open)).toBe(true);
		expect(lines(second).some((line) => line.open)).toBe(false);
		expect(label(expand)).toBe("Collapse all");
		expect(label(second.querySelector("[data-ace-expand]"))).toBe("Expand all");

		expand?.click();
		expect(lines(first).some((line) => line.open)).toBe(false);
		expect(label(expand)).toBe("Expand all");

		copy?.click();
		await vi.waitFor(() => expect(writeText).toHaveBeenCalledWith(CODE));
	});

	it("opens a deep-linked line only in the explorer that contains it", async () => {
		const [first, second] = mount(html.pair);

		window.location.hash = "#second-workerconfig-name";
		window.dispatchEvent(new HashChangeEvent("hashchange"));

		expect(
			lines(second)
				.filter((line) => line.open)
				.map((line) => line.id),
		).toEqual(["second-workerconfig-name"]);
		expect(lines(first).some((line) => line.open)).toBe(false);
	});
});

describe("AnnotatedConfigExplorer without code", () => {
	it("keeps the category tabs", async () => {
		const [explorer] = mount(html.bindings);
		const tabs = [
			...explorer.querySelectorAll<HTMLButtonElement>('[role="tab"]'),
		];

		expect(explorer.id).toBe("config-reference");
		expect(explorer.classList.contains("ace-snippet")).toBe(false);
		expect(explorer.querySelector(".ace-filename")).toBeNull();
		expect(tabs.map((tab) => tab.textContent?.trim())).toEqual([
			expect.stringMatching(/^defineConfig\s*\d+\s*options$/),
			expect.stringMatching(/^Worker\s*\d+\s*options$/),
			expect.stringMatching(/^Bindings\s*\d+\s*options$/),
			expect.stringMatching(/^Triggers\s*\d+\s*options$/),
			expect.stringMatching(/^Exports\s*\d+\s*options$/),
		]);
		expect(
			tabs.find((tab) => tab.getAttribute("aria-selected") === "true")?.id,
		).toBe("config-reference-tab-bindings");
		expect(
			explorer.querySelectorAll('[role="tabpanel"][data-ace-panel]'),
		).toHaveLength(5);
	});

	it.each(["observability", "assets", "placement"])(
		"renders clickable references for every %s field",
		(name) => {
			const [explorer] = mount(html.reference);
			const panel = explorer.querySelector("#reference-panel-worker")!;
			const prefix = `WorkerConfig.${name}`;
			const references = allReferences().filter(
				(ref) => ref.id === prefix || ref.id.startsWith(`${prefix}.`),
			);

			expect(references.length).toBeGreaterThan(1);
			for (const reference of references) {
				expect(
					panel.querySelector(`#reference-worker-${slug(reference.id)}`),
				).not.toBeNull();
			}
		},
	);

	it("expands only the selected category", async () => {
		const [explorer] = mount(html.reference);
		const expand =
			explorer.querySelector<HTMLButtonElement>("[data-ace-expand]");
		const panel = (name: string) =>
			explorer.querySelector<HTMLElement>(`#reference-panel-${name}`)!;

		expand?.click();
		expect(lines(panel("config")).every((line) => line.open)).toBe(true);
		expect(lines(panel("worker")).some((line) => line.open)).toBe(false);

		explorer.querySelector<HTMLButtonElement>("#reference-tab-worker")?.click();
		expect(panel("worker").hidden).toBe(false);
		expect(label(expand)).toBe("Expand all");
	});
});
