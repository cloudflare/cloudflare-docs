import { cloudflare } from "@cloudflare/vite-plugin";
import { flue, flueWorkerConfig } from "@flue/vite";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig, loadEnv, type Plugin } from "vite";

// Flue 2.0 build. `flue()` scans the source root for `'use agent'` modules and
// the `app.ts` route map, then merges its Worker contributions (DO classes,
// bindings, migrations) into a generated `.flue-vite.wrangler.jsonc`.
// `flueWorkerConfig()` hands that generated config to `@cloudflare/vite-plugin`.
//
// `flue()` MUST precede `cloudflare()`: the Cloudflare plugin calls
// `flueWorkerConfig()` while Vite resolves the config, and `flue()` must have
// scanned the project first.
//
// The wrapped customizer also forwards two sets of values into the Worker's
// vars, neither of which affects builds or deploys:
// - `vite dev` only: the non-secret settings in LOCAL_DEV_SETTINGS.
// - When DOCS_FLUE_AGENT_EVALS=1 is set (by run-evals.ts): eval-only env vars
//   from process.env, so eval routes and the AI Gateway work in CI without .env.
const fluePlugin = flue();
const flueCustomizer = flueWorkerConfig();

// When running evals, redirect the review agents' `read_repo_file` and
// `search_repo` imports to an eval-only mock that serves fixture content
// instead of calling the GitHub API. This keeps production agent and tool code
// free of eval-specific branches. Only the importers listed below are
// redirected; other agents that import from the same module (dependabot,
// rebase) keep using the real implementation.
const evalRepoFileMock: Plugin = {
	name: "flue-eval-repo-file-mock",
	apply: "serve",
	resolveId(source, importer) {
		if (process.env.DOCS_FLUE_AGENT_EVALS !== "1") return null;
		if (!importer) return null;
		// Only redirect review agents that need repository reads during evals.
		if (
			source.endsWith("/lib/github-repo-tools") &&
			[
				"code-reviewer.ts",
				"style-guide-reviewer.ts",
				"review-judge.ts",
			].includes(path.basename(importer))
		) {
			return this.resolve("/evals/mocks/github-repo-tools", importer, {
				skipSelf: true,
			});
		}
		return null;
	},
};

/**
 * Non-secret settings that local dev reads from .flue/.env(.local). The
 * `secrets.required` list in wrangler.jsonc makes the Cloudflare plugin load
 * only those secrets from the env files, so these reach the Worker as vars
 * instead. Builds skip this, so local values never reach a deploy.
 */
const LOCAL_DEV_SETTINGS = [
	"DOCS_FLUE_REVIEW_MODE",
	"DOCS_FLUE_RECOMMENDATIONS_MODE",
	"DOCS_FLUE_REVIEW_DEBOUNCE_SECONDS",
] as const;

function localDevSettings(mode: string): Record<string, string> {
	const env = loadEnv(mode, path.dirname(fileURLToPath(import.meta.url)), "");
	return Object.fromEntries(
		LOCAL_DEV_SETTINGS.flatMap((key) => (env[key] ? [[key, env[key]]] : [])),
	);
}

export default defineConfig(({ command, mode }) => {
	const devSettings = command === "serve" ? localDevSettings(mode) : {};
	if (Object.keys(devSettings).length > 0)
		console.log(
			`[flue] Local dev settings: ${Object.entries(devSettings)
				.map(([key, value]) => `${key}=${value}`)
				.join(", ")}`,
		);
	return {
		plugins: [
			fluePlugin,
			evalRepoFileMock,
			cloudflare({
				config: (config) => {
					flueCustomizer(config);
					if (Object.keys(devSettings).length > 0) {
						const cfg = config as Record<string, unknown>;
						cfg.vars = {
							...((cfg.vars as Record<string, unknown> | undefined) ?? {}),
							...devSettings,
						};
					}
					// Dev tooling must never attach to the live reviewer-recommendations
					// queue. `flue:dev:wrangler` runs `wrangler dev --remote`, which would
					// register this worker as a queue consumer against the production
					// queue; strip the consumer here so remote dev can only drive events
					// through POST /dev/recommendations. Normal `flue dev` runs local
					// Miniflare (no live-queue attachment) and production deploys keep
					// the consumer from the authored wrangler.jsonc.
					if (process.env.FLUE_DEV_NO_QUEUE_CONSUMER === "1") {
						const cfg = config as Record<string, unknown>;
						const queues =
							cfg["queues"] && typeof cfg["queues"] === "object"
								? (cfg["queues"] as Record<string, unknown>)
								: null;
						// Snapshot the declared consumers BEFORE clearing so the guard
						// below checks the config as emitted, not the array we just
						// emptied. The dev build legitimately inherits the consumer from
						// the authored wrangler.jsonc — that is what we strip — so the
						// guard must fail closed only when the config is reshaped such
						// that consumers cannot be reliably removed (a missing `queues`
						// section, a non-array `queues.consumers`, or consumers declared
						// under another top-level key).
						const declaredConsumers = queues?.["consumers"];
						const strayConsumerKeys = Object.entries(cfg)
							.filter(([key, value]) => {
								if (
									key === "queues" ||
									typeof value !== "object" ||
									value === null
								) {
									return false;
								}
								const nested = (value as Record<string, unknown>)["consumers"];
								return Array.isArray(nested) && nested.length > 0;
							})
							.map(([key]) => key);
						if (queues) queues["consumers"] = [];
						const stripped =
							(queues === null || Array.isArray(declaredConsumers)) &&
							strayConsumerKeys.length === 0;
						if (!stripped) {
							throw new Error(
								"FLUE_DEV_NO_QUEUE_CONSUMER=1 but the emitted worker config does not expose queue consumers as a plain queues.consumers array" +
									(strayConsumerKeys.length > 0
										? ` (consumers also declared under: ${strayConsumerKeys.join(", ")})`
										: "") +
									"; refusing to build an artifact that could attach to the live queue",
							);
						}
						console.log(
							"[flue] Stripped the reviewer-recommendations queue consumer from the dev build.",
						);
					}
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
										DOCS_FLUE_AI_GATEWAY_ID:
											process.env.DOCS_FLUE_AI_GATEWAY_ID,
									}
								: {}),
						};
					}
				},
			}),
		],
	};
});
