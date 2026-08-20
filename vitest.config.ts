import { defineConfig, defineProject } from "vitest/config";
import { cloudflareTest } from "@cloudflare/vitest-pool-workers";
import { getViteConfig } from "astro/config";

export default defineConfig({
	test: {
		projects: [
			defineConfig({
				plugins: [
					cloudflareTest({
						wrangler: { configPath: "./wrangler.test.json" },
					}),
				],
				test: {
					name: "Workers",
					include: ["**/*.worker.test.ts"],
					exclude: ["**/*.preview.worker.test.ts"],
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
