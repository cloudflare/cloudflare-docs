import { defineConfig } from "@flue/runtime/config";

// `target` also auto-detects from the `@cloudflare/vite-plugin` sibling; kept
// explicit for clarity. The source root is `.flue/` (auto-discovered).
export default defineConfig({
	target: "cloudflare",
});
