import { cloudflare } from "@cloudflare/vite-plugin";
import { flue, flueWorkerConfig } from "@flue/vite";
import { defineConfig } from "vite";

// Flue 2.0 build. `flue()` scans the source root for `'use agent'` modules and
// the `app.ts` route map, then merges its Worker contributions (DO classes,
// bindings, migrations) into a generated `.flue-vite.wrangler.jsonc`.
// `flueWorkerConfig()` hands that generated config to `@cloudflare/vite-plugin`.
//
// `flue()` MUST precede `cloudflare()`: the Cloudflare plugin calls
// `flueWorkerConfig()` while Vite resolves the config, and `flue()` must have
// scanned the project first.
//
// The wrapped customizer also forwards DOCS_FLUE_INTERNAL_TOKEN from
// process.env into the Worker's vars so eval routes work in CI without .env.
const flueCustomizer = flueWorkerConfig();

export default defineConfig({
	plugins: [
		flue(),
		cloudflare({
			config: (config) => {
				flueCustomizer(config);
				const token = process.env.DOCS_FLUE_INTERNAL_TOKEN;
				if (token) {
					(config as Record<string, unknown>).vars = {
						...((config as Record<string, unknown>).vars ?? {}),
						DOCS_FLUE_INTERNAL_TOKEN: token,
					};
				}
			},
		}),
	],
});
