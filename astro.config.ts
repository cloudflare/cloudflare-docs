import { defineConfig } from "astro/config";
import {
	markdown,
	integrations,
	vite as nimbusVite,
} from "./src/nimbus/astro-config.ts";

// https://astro.build/config
export default defineConfig({
	site: "https://developers.cloudflare.com",
	prefetch: {
		prefetchAll: true,
		defaultStrategy: "hover",
	},
	srcDir: "./src/nimbus",
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
	experimental: {
		contentIntellisense: true,
	},
	server: {
		port: 1111,
	},
	integrations,
	vite: {
		...nimbusVite,
		server: {
			watch: {
				ignored: ["**/dist/**", "**/.astro-cache/**"],
			},
		},
	},
});
