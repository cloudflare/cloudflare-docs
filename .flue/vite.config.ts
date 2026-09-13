import { defineConfig } from "vite";
import { cloudflare } from "@cloudflare/vite-plugin";
import { flue, flueWorkerConfig } from "@flue/vite";
import { fileURLToPath } from "node:url";

// Fixtures are a development-only mode. Production builds always use real tools.
export default defineConfig(({ command, mode }) => ({
	plugins: [flue(), cloudflare({ config: flueWorkerConfig() })],
	resolve: {
		alias:
			command === "serve" && mode === "eval"
				? [
						{
							find: /^\.\.\/lib\/github-repo-tools$/,
							replacement: fileURLToPath(
								new URL("./evals/mocks/github-repo-tools.ts", import.meta.url),
							),
						},
					]
				: [],
	},
}));
