import { defineConfig } from "vitest/config";

export default defineConfig({
	test: {
		include: ["evals/**/*.eval.ts"],
		reporters: ["default", "vitest-evals/reporter"],
		testTimeout: 120_000,
		hookTimeout: 120_000,
		// Live-model evals are nondeterministic; run serially to reduce flake
		// and avoid concurrent Workers AI rate limits.
		fileParallelism: false,
	},
});
