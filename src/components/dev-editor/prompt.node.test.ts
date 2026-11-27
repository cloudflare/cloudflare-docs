import { describe, expect, test } from "vitest";
import { buildEditPrompt } from "./prompt";

describe("buildEditPrompt", () => {
	test("returns an empty string when there are no edits", () => {
		expect(
			buildEditPrompt({
				pagePath: "/workers/",
				pageSourcePath: "src/content/docs/workers/index.mdx",
				edits: [],
			}),
		).toBe("");
	});

	test("formats prose edits, code block fenced diffs, component isolation, and optional context", () => {
		const prompt = buildEditPrompt({
			pagePath: "/workers/get-started/guide/",
			pageSourcePath: "src/content/docs/workers/get-started/guide.mdx",
			edits: [
				{
					id: "block-1",
					kind: "frontmatter title",
					mode: "single-line",
					sourcePath: "src/content/docs/workers/get-started/guide.mdx",
					isPartial: false,
					nearestHeading: null,
					componentContext: [],
					original: "Get started - CLI",
					current: "Get started with the CLI",
				},
				{
					id: "block-2",
					kind: "paragraph",
					mode: "prose",
					sourcePath: "src/content/docs/workers/get-started/guide.mdx",
					isPartial: false,
					nearestHeading: "## 1. Create a new Worker project",
					componentContext: ['<CliVariant cli="cf">', '<Aside title="Note">'],
					original: "Run `npm create cloudflare@latest`.",
					current:
						"Run `pnpm create cloudflare@latest`.\nThen open the folder.",
					note: "Match the cf CLI naming across the guide.",
				},
				{
					id: "block-3",
					kind: "code block (ts)",
					mode: "code",
					codeLang: "ts",
					sourcePath: "src/content/docs/workers/get-started/guide.mdx",
					isPartial: false,
					nearestHeading: "## 2. Write your handler",
					componentContext: ['<TabItem label="TypeScript">'],
					original:
						'export default {\n  fetch() { return new Response("Hi"); }\n};',
					current:
						'export default {\n  fetch() { return new Response("Hello"); }\n};',
					note: "Use a friendlier greeting.",
				},
				{
					id: "block-4",
					kind: "list item",
					mode: "prose",
					sourcePath: "src/content/partials/workers/login.mdx",
					isPartial: true,
					nearestHeading: "## 3. Authenticate",
					componentContext: [],
					original: "Select **Allow**.",
					current: "Select **Allow**.",
					note: "Check whether the button label is still Allow in the dashboard.",
				},
			],
		});

		expect(prompt).toContain(
			"Apply the following copy edits made in the local docs preview for `/workers/get-started/guide/`.",
		);
		expect(prompt).toContain(
			"Source file: `src/content/docs/workers/get-started/guide.mdx`",
		);
		expect(prompt).toContain(
			"1. **frontmatter title**\n   - Before: Get started - CLI\n   - After: Get started with the CLI",
		);
		expect(prompt).toContain(
			'2. **paragraph** (under `## 1. Create a new Worker project`, inside `<CliVariant cli="cf">` > `<Aside title="Note">`)\n   - Before: Run `npm create cloudflare@latest`.\n   - After:\n     Run `pnpm create cloudflare@latest`.\n     Then open the folder.\n   - Context: Match the cf CLI naming across the guide.',
		);
		expect(prompt).toContain(
			'3. **code block (ts)** (under `## 2. Write your handler`, inside `<TabItem label="TypeScript">`)\n   - Before:\n     ```ts\n     export default {\n       fetch() { return new Response("Hi"); }\n     };\n     ```\n   - After:\n     ```ts\n     export default {\n       fetch() { return new Response("Hello"); }\n     };\n     ```\n   - Context: Use a friendlier greeting.',
		);
		expect(prompt).toContain(
			"4. **list item** (in partial `src/content/partials/workers/login.mdx`, under `## 3. Authenticate`)\n   - Current text: Select **Allow**.\n   - Context: Check whether the button label is still Allow in the dashboard.",
		);
	});
});
