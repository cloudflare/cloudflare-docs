import { defineConfig, defineProject } from "vitest/config";
import { cloudflareTest } from "@cloudflare/vitest-pool-workers";
import { getViteConfig } from "astro/config";

import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
	test: {
		projects: [
			defineConfig({
				plugins: [
					cloudflareTest({
						wrangler: { configPath: "./wrangler.toml" },
					}),
				],
				test: {
					name: "Workers",
					include: ["**/*.worker.test.ts"],
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
				plugins: [tsconfigPaths()],
			}),
			getViteConfig({
				test: {
					name: "Astro",
					include: ["**/*.astro.test.ts"],
				},
				plugins: [tsconfigPaths()],
			}),
		],
	},
});
