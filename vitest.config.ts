import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersConfig({
	test: {
		globalSetup: ["./tests/globalSetup.ts"],
		poolOptions: {
			workers: {
				wrangler: { configPath: "./wrangler-workers.toml" },
			},
		},
	},
});
