import { fileURLToPath, URL } from "node:url";
import { HTMLRewriter, type ElementHandlers } from "html-rewriter-wasm";
import { defineConfig, type PluginOption } from "vite";
import glob from "glob";
import { highlight } from "./bin/prism.config";
import vue from "@vitejs/plugin-vue";
const encoder = new TextEncoder();
const decoder = new TextDecoder();

async function rewrite(
  document: string,
  handlers: [string, ElementHandlers][]
) {
  let output = "";
  const rewriter = new HTMLRewriter((outputChunk) => {
    output += decoder.decode(outputChunk);
  });
  handlers.forEach(([el, handler]) => rewriter.on(el, handler));
  try {
    await rewriter.write(encoder.encode(document));
    await rewriter.end();
    return output;
  } finally {
    rewriter.free();
  }
}

const hydrateVueComponents = (): PluginOption => {
  return {
    name: "hydrate-vue",
    transformIndexHtml: {
      order: "pre",
      handler: async (html: string) => {
        let componentId = 1;
        return await rewrite(html, [
          [
            "vue-component",
            {
              element: (element) => {
                const nId = componentId++;
                const name = element.getAttribute("name");
                element.tagName = "div";
                element.removeAttribute("name");
                element.setAttribute("id", `vue-c-${nId}`);
                element.after(
                  `<script type="module">
                  import { createApp } from 'vue'
                  import Component from "@/${name}.vue"
                  const root = document.getElementById('vue-c-${nId}')
                  createApp(Component, {...root.dataset}).mount(root, true)
              </script>`,
                  { html: true }
                );
              },
            },
          ],
        ]);
      },
    },
  };
};

const renderCodeBlock = (): PluginOption => {
  return {
    name: "render-code-block",
    async transformIndexHtml(html: string) {
      return await rewrite(html, [
        [
          "unparsed-codeblock",
          {
            element: (element) => {
              const data = element
                .getAttribute("data-code")!
                // Hugo's url encoding is ...odd
                .replaceAll("&#43;", " ");

              if (data.includes("&#")) {
                throw new Error("Unexpected HTML entity: " + data);
              }
              const decoded = decodeURIComponent(data);
              const code = decoded + "\n";
              element.replace(
                highlight(code, element.getAttribute("data-language")!, ""),
                {
                  html: true,
                }
              );
            },
          },
        ],
      ]);
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
      data: fileURLToPath(new URL("./data", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input: glob.sync("public/**/*.html"),
    },
  },
});
