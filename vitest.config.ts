import { configDefaults, defineConfig, defineProject } from "vitest/config";
import { cloudflareTest } from "@cloudflare/vitest-plugin";
import { getViteConfig } from "astro/config";

export default defineConfig({
	test: {
		projects: [
			defineConfig({
				plugins: [
					cloudflareTest({
						wrangler: { configPath: "./wrangler.jsonc" },
					}),
				],
				test: {
					name: "Workers",
					silent: "passed-only",
					include: ["**/*.worker.test.ts"],
					exclude: [...configDefaults.exclude, "**/*.preview.worker.test.ts"],
					deps: {
						optimizer: {
							ssr: {
								enabled: true,
								include: ["node-html-parser", "yaml"],
							},
						},
					},
				},
			}),
			defineConfig({
				plugins: [
					cloudflareTest({
						wrangler: { configPath: "./wrangler.preview.test.json" },
					}),
				],
				test: {
					name: "Workers (Preview)",
					silent: "passed-only",
					include: ["**/*.preview.worker.test.ts"],
					deps: {
						optimizer: {
							ssr: {
								enabled: true,
								include: ["node-html-parser", "yaml"],
							},
						},
					},
				},
			}),
			defineProject({
				test: {
					name: "Node",
					include: ["**/*.node.test.ts"],
					environment: "happy-dom",
				},
			}),
			getViteConfig({
				test: {
					name: "Astro",
					include: ["**/*.astro.test.ts"],
				},
			}),
		],
	},
});
