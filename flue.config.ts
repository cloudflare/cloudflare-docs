import { defineConfig } from "@flue/cli/config";

export default defineConfig({
	target: "cloudflare",
	root: ".flue",
	output: ".flue/dist",
});
