import {
	bindings,
	defineSettings,
	defineWorker,
	triggers,
} from "@cloudflare/vite-plugin/experimental-config";

export const settings = defineSettings({
	accountId: "b54f07a6c269ecca2fa60f1ae4920c99",
});

export default defineWorker(({ mode }) => {
	const preview = mode === "preview";

	return {
		name: preview ? "cloudflare-docs-preview" : "cloudflare-docs",
		compatibilityDate: "2025-06-02",
		compatibilityFlags: ["nodejs_compat"],
		entrypoint: preview ? "./worker/index.preview.ts" : "./worker/index.ts",
		assets: {
			notFoundHandling: "404-page",
			runWorkerFirst: true,
		},
		triggers: preview
			? []
			: [
					triggers.fetch({
						pattern: "developers.cloudflare.com/*",
						zone: "developers.cloudflare.com",
					}),
				],
		workersDev: true,
		observability: {
			enabled: true,
		},
		env: {
			ASSETS: bindings.assets(),
			MIDDLECACHE: bindings.r2({ name: "middlecache" }),
		},
	};
});
