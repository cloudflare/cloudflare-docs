import { fileURLToPath, URL } from "node:url";
import { parse } from "node-html-parser";
import { defineConfig, type PluginOption } from "vite";
import glob from "glob";
import { highlight } from "./bin/prism.config";
import vue from "@vitejs/plugin-vue";
const renderCodeBlock = (): PluginOption => {
  return {
    name: "html-transform",
    transformIndexHtml(html: string) {
      const parsedHtml = parse(html);
      const codeBlocks = parsedHtml.querySelectorAll("pre[data-code]");

      for (const block of codeBlocks) {
        // Base64 is used in order to preserve whitespace
        block.replaceWith(
          highlight(
            atob(block.attributes["data-code"]),
            block.attributes["data-language"],
            ""
          )
        );
      }
      return parsedHtml.outerHTML;
    },
  };
};
// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), renderCodeBlock()],
  root: "public",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./components", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input: glob.sync("public/**/*.html"),
    },
  },
});
