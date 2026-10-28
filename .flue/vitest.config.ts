import { defineConfig } from "vitest/config";

export default defineConfig({
	// Resolve .md prompt imports as static assets. The Flue Vite plugin that
	// loads their text is not part of the unit test config.
	assetsInclude: ["**/*.md"],
	test: {
		environment: "node",
		include: ["**/*.test.ts"],
	},
});
