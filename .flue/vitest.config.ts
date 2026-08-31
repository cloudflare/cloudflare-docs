import { defineConfig } from "vitest/config";

export default defineConfig({
	// Treat .md skill files as static assets so the `with { type: "skill" }`
	// import assertions in source files don't fail during test transforms.
	assetsInclude: ["**/*.md"],
	test: {
		environment: "node",
		include: ["**/*.test.ts"],
	},
});
