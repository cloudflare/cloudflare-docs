import { defineConfig } from "vitest/config";
import {
	JUDGE_DURABILITY,
	SPECIALIST_DURABILITY,
} from "./lib/agents/durability";

// The harness waits up to the agent's durability timeout. Give vitest an extra
// minute so the harness reports why it stopped waiting.
const TEST_TIMEOUT_MS =
	Math.max(SPECIALIST_DURABILITY.timeoutMs, JUDGE_DURABILITY.timeoutMs) +
	60_000;

export default defineConfig({
	test: {
		include: ["evals/**/*.eval.ts"],
		reporters: ["default", "vitest-evals/reporter"],
		testTimeout: TEST_TIMEOUT_MS,
		hookTimeout: 120_000,
		// Live-model evals are nondeterministic; run serially to reduce flake
		// and avoid concurrent Workers AI rate limits.
		fileParallelism: false,
	},
});
