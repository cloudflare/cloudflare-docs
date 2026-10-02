import { readFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";

const here = dirname(fileURLToPath(import.meta.url));

// Components that ship a scoped <style> but are allowed in the barrel because
// they are also in the global MDX registry (src/mdx-components.ts), so every
// MDX page loads their CSS regardless.
const ALLOWED_STYLED_EXPORTS = new Set([
	"Details",
	"Feature",
	"GlossaryTooltip",
]);

/** Parses `export { default as Name } from "./path.astro";` lines. */
function astroExports(source: string) {
	const re =
		/export\s*\{\s*default\s+as\s+(\w+)\s*\}\s*from\s*"([^"]+\.astro)"/g;
	return [...source.matchAll(re)].map((m) => ({ name: m[1], path: m[2] }));
}

/** True when the file has a <style> block that Astro scopes to the component. */
function hasScopedStyle(astroSource: string) {
	const tags = astroSource.match(/<style\b[^>]*>/g) ?? [];
	return tags.some((tag) => !/\bis:(global|inline)\b/.test(tag));
}

describe("components barrel", () => {
	it("does not export components with scoped styles", () => {
		const barrel = readFileSync(resolve(here, "components.ts"), "utf8");
		const offenders = astroExports(barrel)
			.filter(({ name }) => !ALLOWED_STYLED_EXPORTS.has(name))
			.filter(({ path }) => path.startsWith("."))
			.filter(({ path }) =>
				hasScopedStyle(readFileSync(resolve(here, path), "utf8")),
			)
			.map(({ name }) => name);

		// Astro attributes a component's CSS to every MDX entry that imports the
		// barrel, even when the component is not rendered there. Import
		// components with scoped styles directly from their .astro file instead.
		expect(
			offenders,
			`Move out of src/components.ts: ${offenders.join(", ")}`,
		).toEqual([]);
	});
});
