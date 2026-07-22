import { defineConfig } from "astro/config";
import { markdown, integrations, vite as appVite } from "./src/astro-config.ts";

// https://astro.build/config
export default defineConfig({
	site: "https://developers.cloudflare.com",
	prefetch: {
		prefetchAll: true,
		defaultStrategy: "hover",
	},
	outDir: "./dist",
	cacheDir: ".astro-cache",
	markdown,
	image: {
		service: {
			entrypoint: "astro/assets/services/sharp",
			config: {
				limitInputPixels: false,
			},
		},
	},
	server: {
		port: 1111,
	},
	integrations,
	vite: {
		...appVite,
		server: {
			watch: {
				ignored: ["**/dist/**", "**/.astro-cache/**"],
			},
		},
	},
});
