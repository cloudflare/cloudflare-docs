import { fileURLToPath, URL } from "node:url";
import { HTMLRewriter, type ElementHandlers } from "html-rewriter-wasm";
import { defineConfig, type PluginOption } from "vite";
import { globSync } from "glob";
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
        if (!html.includes("vue-component")) return html;
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

const renderPlaygroundLink = (): PluginOption => {
  return {
    name: "render-playground-link",
    async transformIndexHtml(html: string) {
      let playgroundUrl: string | undefined;
      await rewrite(html, [
        [
          "a",
          {
            element: (element) => {
              if (element.getAttribute("class") === "playground-link") {
                playgroundUrl = element.getAttribute("href")!;
              }
            },
          },
        ],
      ]);
      return await rewrite(html, [
        [
          "workers-playground-link",
          {
            element: (element) => {
              if (playgroundUrl !== undefined) {
                element.replace(
                  /*html*/ `
      <div class="DocsMarkdown--content-column">
        <a href="${playgroundUrl}" class="DocsMarkdown--link" target="_blank" rel="noopener">
          <span class="DocsMarkdown--link-content">Try in Workers Playground</span>
          <span class="DocsMarkdown--link-external-icon" aria-hidden="true">
            <svg fill="none" stroke="currentColor" stroke-width="1.5" width="23px" height="12px" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 16 16" role="img" aria-labelledby="title-4744738674102027" xmlns="http://www.w3.org/2000/svg">
              <title id="title-4744738674102027">External link icon</title>
              <path d="M6.75,1.75h-5v12.5h12.5v-5m0,-4v-3.5h-3.5M8,8l5.5-5.5"></path>
            </svg>
            <span is-visually-hidden>Open external link</span>
          </span>
        </a>
      </div>`,
                  {
                    html: true,
                  }
                );
              } else {
                element.remove();
              }
            },
          },
        ],
      ]);
    },
  };
};

const renderCodeBlock = (): PluginOption => {
  return {
    name: "render-code-block",
    async transformIndexHtml(html: string) {
      if (!html.includes("unparsed-codeblock")) return html;

      return await rewrite(html, [
        [
          "unparsed-codeblock",
          {
            element: async (element) => {
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
                await highlight(
                  code,
                  element.getAttribute("data-language")!,
                  ""
                ),
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
  plugins: [
    renderCodeBlock(),
    renderPlaygroundLink(),
    hydrateVueComponents(),
    vue(),
  ],
  root: "public",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./components", import.meta.url)),
      data: fileURLToPath(new URL("./data", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      input: globSync("public/**/*.html"),
    },
    reportCompressedSize: false,
  },
});
