import { cloudflare } from "@cloudflare/vite-plugin";
import { flue, flueWorkerConfig } from "@flue/vite";
import { defineConfig, type Plugin } from "vite";

// Flue 2.0 build. `flue()` scans the source root for `'use agent'` modules and
// the `app.ts` route map, then merges its Worker contributions (DO classes,
// bindings, migrations) into a generated `.flue-vite.wrangler.jsonc`.
// `flueWorkerConfig()` hands that generated config to `@cloudflare/vite-plugin`.
//
// `flue()` MUST precede `cloudflare()`: the Cloudflare plugin calls
// `flueWorkerConfig()` while Vite resolves the config, and `flue()` must have
// scanned the project first.
//
// The wrapped customizer also forwards eval-only env vars from process.env
// into the Worker's vars so eval routes and the AI Gateway work in CI without
// .env. This only activates when DOCS_FLUE_AGENT_EVALS=1 is set (by
// run-evals.ts), so normal dev/build/deploy are unaffected.
const fluePlugin = flue();
const flueCustomizer = flueWorkerConfig();

// When running evals, redirect the style-guide agent's import of
// `makeReadRepoFileTool` to an eval-only mock that returns synthetic file
// content instead of calling the GitHub API. This keeps production agent and
// tool code free of eval-specific branches. Only the style-guide agent's
// import is redirected — other agents that import from the same module
// (code-review, dependabot) keep using the real implementation.
const evalRepoFileMock: Plugin = {
	name: "flue-eval-repo-file-mock",
	apply: "serve",
	resolveId(source, importer) {
		if (process.env.DOCS_FLUE_AGENT_EVALS !== "1") return null;
		if (!importer) return null;
		// Only redirect the style-guide agent's import of github-repo-tools.
		if (
			source.endsWith("/lib/github-repo-tools") &&
			importer.includes("style-guide-file")
		) {
			return this.resolve("/evals/mocks/github-repo-tools", importer, {
				skipSelf: true,
			});
		}
		return null;
	},
};

export default defineConfig({
	plugins: [
		fluePlugin,
		evalRepoFileMock,
		cloudflare({
			config: (config) => {
				flueCustomizer(config);
				if (
					process.env.DOCS_FLUE_AGENT_EVALS === "1" &&
					process.env.DOCS_FLUE_INTERNAL_TOKEN
				) {
					(config as Record<string, unknown>).vars = {
						...((config as Record<string, unknown>).vars ?? {}),
						DOCS_FLUE_INTERNAL_TOKEN: process.env.DOCS_FLUE_INTERNAL_TOKEN,
						DOCS_FLUE_ENABLE_EVAL_ROUTES: "1",
						...(process.env.DOCS_FLUE_AI_GATEWAY_ID
							? {
									DOCS_FLUE_AI_GATEWAY_ID: process.env.DOCS_FLUE_AI_GATEWAY_ID,
								}
							: {}),
					};
				}
			},
		}),
	],
});
