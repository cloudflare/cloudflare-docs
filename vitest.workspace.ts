import { defineWorkspace, defineProject } from "vitest/config";
import { defineWorkersProject } from "@cloudflare/vitest-pool-workers/config";

import tsconfigPaths from "vite-tsconfig-paths";

const workspace = defineWorkspace([
	defineWorkersProject({
		test: {
			name: "Workers",
			include: ["**/*.worker.test.ts"],
			deps: {
				optimizer: {
					ssr: {
						enabled: true,
						include: ["node-html-parser"],
					},
				},
			},
			poolOptions: {
				workers: {
					wrangler: { configPath: "./wrangler.toml" },
				},
			},
		},
	}),
	defineProject({
		test: {
			name: "Node",
			include: ["**/*.node.test.ts"],
		},
		plugins: [tsconfigPaths()],
	}),
]);

export default workspace;
