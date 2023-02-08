import { fileURLToPath, URL } from "node:url";
import { parse } from "node-html-parser";
import { defineConfig, type PluginOption } from "vite";
import glob from "glob";
import { highlight } from "./bin/prism.config";
import vue from "@vitejs/plugin-vue";
const hydrateVueComponents = (): PluginOption => {
  return {
    name: "hydrate-vue",
    transformIndexHtml: {
      order: "pre",
      handler: (html: string) => {
        let componentId = 1;
        const parsedHtml = parse(html);
        const vueComponents = parsedHtml.querySelectorAll("vue-component");
        for (const component of vueComponents) {
          const nId = componentId++;
          const name = component.attributes["name"];

          component.replaceWith(`<div id="vue-c-${nId}">
            ${component.innerHTML}
        </div>
        <script type="module">
            import { createApp } from 'vue'
            import Component from "@/${name}.vue"
            createApp(Component).mount('#vue-c-${nId}', true)
        </script>`);
        }
        return parsedHtml.outerHTML;
      },
    },
  };
};

const renderCodeBlock = (): PluginOption => {
  return {
    name: "render-code-block",
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
  plugins: [renderCodeBlock(), hydrateVueComponents(), vue()],
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
