import { readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { cloudflare } from "@cloudflare/vite-plugin";
import { defineConfig, type Plugin } from "vite";

const redirectsPath = fileURLToPath(
	new URL("./dist/__redirects", import.meta.url),
);

/** Loads the extensionless redirects file as text for the Worker bundle. */
const redirectsModule = {
	name: "cloudflare-docs:redirects-module",
	enforce: "pre",
	async load(id) {
		if (id !== redirectsPath) return;
		return `export default ${JSON.stringify(await readFile(id, "utf8"))};`;
	},
} satisfies Plugin;

export default defineConfig({
	// Astro writes the static site to dist before the Cloudflare build. Treat
	// that output as Vite's public assets so cf can package it with the Worker.
	publicDir: "dist",
	plugins: [
		redirectsModule,
		cloudflare({
			experimental: {
				newConfig: {
					cfBuildOutput: true,
					types: { generate: false },
				},
			},
		}),
	],
});
