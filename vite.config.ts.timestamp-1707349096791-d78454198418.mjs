// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { HTMLRewriter } from "file:///Users/kody/Desktop/cloudflare-docs/node_modules/html-rewriter-wasm/dist/html_rewriter.js";
import { defineConfig } from "file:///Users/kody/Desktop/cloudflare-docs/node_modules/vite/dist/node/index.js";
import glob from "file:///Users/kody/Desktop/cloudflare-docs/node_modules/glob/glob.js";

// bin/prism.config.ts
import Prism from "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/prism.js";
import rangeParser from "file:///Users/kody/Desktop/cloudflare-docs/node_modules/parse-numeric-range/index.js";
import "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-bash.min.js";
import "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-c.min.js";
import "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-csharp.min.js";
import "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-csv.min.js";
import "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-diff.min.js";
import "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-git.min.js";
import "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-go.min.js";
import "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-graphql.min.js";
import "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-hcl.min.js";
import "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-http.min.js";
import "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-ini.min.js";
import "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-java.min.js";
import "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-json.min.js";
import "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-jsx.min.js";
import "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-markdown.min.js";
import "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-perl.min.js";
import "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-php.min.js";
import "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-python.min.js";
import "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-ruby.min.js";
import "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-rust.min.js";
import "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-sql.min.js";
import "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-typescript.min.js";
import "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-toml.min.js";
import "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-yaml.min.js";
import "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-kotlin.min.js";
import "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-swift.min.js";

// bin/playground.ts
import lzstring from "file:///Users/kody/Desktop/cloudflare-docs/node_modules/lz-string/libs/lz-string.js";
function serialiseWorker(code) {
  const formData = new FormData();
  const metadata = {
    main_module: "index.js"
  };
  formData.set(
    "index.js",
    new Blob([code], {
      type: "application/javascript+module"
    }),
    "index.js"
  );
  formData.set(
    "metadata",
    new Blob([JSON.stringify(metadata)], { type: "application/json" })
  );
  return formData;
}
async function compressWorker(worker) {
  const serialisedWorker = new Response(worker);
  return lzstring.compressToEncodedURIComponent(
    `${serialisedWorker.headers.get(
      "content-type"
    )}:${await serialisedWorker.text()}`
  );
}

// bin/prism.config.ts
globalThis.Prism = Prism;
Prism.languages.sh = {
  comment: {
    pattern: /(^|[^'{\\$])#.*/,
    alias: "unselectable",
    lookbehind: true
  },
  directory: {
    pattern: /^[^\r\n$*!]+(?=[$])/m,
    alias: "unselectable"
  },
  command: {
    pattern: /[$](?:[^\r\n])+/,
    inside: {
      prompt: {
        pattern: /^[$] /,
        alias: "unselectable"
      }
    }
  }
};
var langs = {
  tf: "hcl",
  // terraform -> hashicorp config lang
  rs: "rust",
  shell: "sh",
  curl: "bash",
  gql: "graphql",
  svelte: "html",
  javascript: "js",
  jsonc: "json",
  typescript: "ts",
  plaintext: "txt",
  text: "txt",
  py: "python",
  vue: "html",
  rb: "ruby"
};
var transformations = {
  js: {
    keyword: {
      to: "declaration-keyword",
      for: /* @__PURE__ */ new Set([
        "const",
        "let",
        "var",
        "async",
        "await",
        "function",
        "class"
      ])
    },
    punctuation: {
      to: "operator",
      for: /* @__PURE__ */ new Set(["."])
    },
    "class-name": {
      to: "api",
      for: /* @__PURE__ */ new Set(["HTMLRewriter", "Request", "Response", "URL", "Error"])
    },
    function: {
      to: "builtin",
      for: /* @__PURE__ */ new Set([
        "fetch",
        "console",
        "addEventListener",
        "atob",
        "btoa",
        "setInterval",
        "clearInterval",
        "setTimeout",
        "clearTimeout"
      ])
    }
  }
};
transformations.ts = transformations.js;
transformations.html = {
  keyword: transformations.js.keyword
};
var ESCAPE = /[&"<>]/g;
var CHARS = {
  '"': "&quot;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;"
};
function toEscape(value) {
  let tmp = 0;
  let out = "";
  let last = ESCAPE.lastIndex = 0;
  while (ESCAPE.test(value)) {
    tmp = ESCAPE.lastIndex - 1;
    out += value.substring(last, tmp) + CHARS[value[tmp]];
    last = tmp + 1;
  }
  return out + value.substring(last);
}
function normalize(tokens) {
  let line = [];
  let lines = [];
  function loop(types, item) {
    if (Array.isArray(item)) {
      item.forEach((x) => loop(types, x));
    } else if (typeof item === "string") {
      types = types || "CodeBlock--token-plain";
      if (item === "") {
      } else if (item === "\n") {
        line.push({ types, content: item });
        lines.push(line);
        line = [];
      } else if (item === "\n\n") {
        line.push({ types, content: "\n" });
        lines.push(line);
        line = [{ types: "CodeBlock--token-plain", content: "\n" }];
        lines.push(line);
        line = [];
      } else if (item.includes("\n")) {
        item.split(/\r?\n/g).forEach((txt, idx, arr2) => {
          if (!txt && !idx && idx < arr2.length)
            return;
          let content = txt ? toEscape(txt) : "\n";
          if (idx > 0) {
            lines.push(line);
            line = [];
          }
          line.push({ types, content });
        });
      } else {
        let content = toEscape(item);
        line.push({ types, content });
      }
    } else if (item) {
      if (types)
        types += " ";
      types += "CodeBlock--token-" + item.type;
      if (item.alias) {
        [].concat(item.alias).forEach((tt) => {
          if (!types.includes(tt)) {
            if (types)
              types += " ";
            types += "CodeBlock--token-" + tt;
          }
        });
      }
      loop(types, item.content);
    }
  }
  for (let i = 0; i < tokens.length; i++) {
    loop("", tokens[i]);
  }
  if (line.length > 0) {
    lines.push(line);
  }
  let arr = [];
  while (line = lines.shift()) {
    if (line.length > 1 && line[0].content === "\n") {
      line[0].content = "";
      arr.push(line);
    } else {
      arr.push(line);
    }
  }
  lines = arr;
  let last = lines.pop();
  if (last.length !== 1 || last[0].content.trim().length > 1) {
    lines.push(last);
  }
  return lines;
}
async function highlight(code, lang, file) {
  lang = langs[lang] || lang || "txt";
  let grammar = Prism.languages[lang.toLowerCase()];
  if (!grammar) {
    console.warn('[prism] Missing "%s" grammar; using "txt" fallback', lang);
    grammar = Prism.languages.txt;
  }
  let frontmatter = {};
  if (code.substring(0, 3) === "---" && code[3] != "-") {
    let index = code.indexOf("---", 3);
    if (index > 3) {
      index += 3;
      let content = code.substring(0, index);
      code = code.substring(index).replace(/^(\r?\n)+/, "");
      let match = /^---\r?\n([\s\S]+?)\r?\n---/.exec(content);
      if (match != null)
        match[1].split("\n").forEach((pair) => {
          let [key, ...v] = pair.split(":");
          frontmatter[key.trim()] = v.join(":").trim();
        });
    }
  }
  let highlights;
  try {
    let highlight2 = frontmatter.highlight;
    if (highlight2 == null ? void 0 : highlight2.startsWith("[")) {
      highlight2 = highlight2.substring(1, highlight2.length - 1);
    }
    const parsedRange = rangeParser(highlight2 || "");
    highlights = new Set(parsedRange.map((x) => x - 1));
  } catch (err) {
    process.stderr.write(
      `[ERROR] ${file}
Syntax highlighting error: You must specify the lines to highlight as an array (e.g., '[2]'). Found '${frontmatter.highlight}'.
`
    );
    throw err;
  }
  let tokens = Prism.tokenize(code, grammar);
  let output = "";
  let theme = frontmatter.theme || "light";
  output += '<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally';
  if (theme === "light")
    output += " CodeBlock-is-light-in-light-theme";
  output += ` CodeBlock--language-${lang}" language="${lang}">`;
  if (frontmatter.header)
    output += `<span class="CodeBlock--header">${frontmatter.header}</span>`;
  else if (frontmatter.filename)
    output += `<span class="CodeBlock--filename">${frontmatter.filename}</span>`;
  if (frontmatter.playground) {
    const serialised = await compressWorker(serialiseWorker(code));
    const playgroundUrl = `https://workers.cloudflare.com/playground#${serialised}`;
    output += `<a target="__blank" href="${playgroundUrl}" class="playground-link"><svg fill="currentColor" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16"><path d="M6.21 12.293l-3.215-4.3 3.197-4.178-.617-.842-3.603 4.712-.005.603 3.62 4.847.623-.842z"></path><path d="M7.332 1.988H6.095l4.462 6.1-4.357 5.9h1.245L11.8 8.09 7.332 1.988z"></path><path d="M9.725 1.988H8.472l4.533 6.027-4.533 5.973h1.255l4.303-5.67v-.603L9.725 1.988z"></path></svg><span> Run Worker</span></a>`;
  }
  output += "<code>";
  output += '<span class="CodeBlock--rows">';
  output += '<span class="CodeBlock--rows-content">';
  let i = 0;
  let row = "";
  let line;
  let lines = normalize(tokens);
  for (; i < lines.length; i++) {
    line = lines[i];
    row = '<span class="CodeBlock--row';
    row += highlights.has(i) ? ' CodeBlock--row-is-highlighted">' : '">';
    row += '<span class="CodeBlock--row-indicator"></span>';
    row += '<div class="CodeBlock--row-content">';
    for (let j = 0; j < line.length; j++) {
      row += '<span class="' + line[j].types + '">' + line[j].content + "</span>";
    }
    output += row + "</div></span>";
  }
  return output + "</span></span></code></pre>";
}

// vite.config.ts
import vue from "file:///Users/kody/Desktop/cloudflare-docs/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///Users/kody/Desktop/cloudflare-docs/vite.config.ts";
var encoder = new TextEncoder();
var decoder = new TextDecoder();
async function rewrite(document, handlers) {
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
var hydrateVueComponents = () => {
  return {
    name: "hydrate-vue",
    transformIndexHtml: {
      order: "pre",
      handler: async (html) => {
        let componentId = 1;
        if (!html.includes("vue-component"))
          return html;
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
              }
            }
          ]
        ]);
      }
    }
  };
};
var renderPlaygroundLink = () => {
  return {
    name: "render-playground-link",
    async transformIndexHtml(html) {
      let playgroundUrl;
      await rewrite(html, [
        [
          "a",
          {
            element: (element) => {
              if (element.getAttribute("class") === "playground-link") {
                playgroundUrl = element.getAttribute("href");
              }
            }
          }
        ]
      ]);
      return await rewrite(html, [
        [
          "workers-playground-link",
          {
            element: (element) => {
              if (playgroundUrl !== void 0) {
                element.replace(
                  /*html*/
                  `
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
                    html: true
                  }
                );
              } else {
                element.remove();
              }
            }
          }
        ]
      ]);
    }
  };
};
var renderCodeBlock = () => {
  return {
    name: "render-code-block",
    async transformIndexHtml(html) {
      if (!html.includes("unparsed-codeblock"))
        return html;
      return await rewrite(html, [
        [
          "unparsed-codeblock",
          {
            element: async (element) => {
              const data = element.getAttribute("data-code").replaceAll("&#43;", " ");
              if (data.includes("&#")) {
                throw new Error("Unexpected HTML entity: " + data);
              }
              const decoded = decodeURIComponent(data);
              const code = decoded + "\n";
              element.replace(
                await highlight(
                  code,
                  element.getAttribute("data-language"),
                  ""
                ),
                {
                  html: true
                }
              );
            }
          }
        ]
      ]);
    }
  };
};
var vite_config_default = defineConfig({
  plugins: [
    renderCodeBlock(),
    renderPlaygroundLink(),
    hydrateVueComponents(),
    vue()
  ],
  root: "public",
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./components", __vite_injected_original_import_meta_url)),
      data: fileURLToPath(new URL("./data", __vite_injected_original_import_meta_url))
    }
  },
  build: {
    rollupOptions: {
      input: glob.sync("public/**/*.html")
    },
    reportCompressedSize: false
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYmluL3ByaXNtLmNvbmZpZy50cyIsICJiaW4vcGxheWdyb3VuZC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9rb2R5L0Rlc2t0b3AvY2xvdWRmbGFyZS1kb2NzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMva29keS9EZXNrdG9wL2Nsb3VkZmxhcmUtZG9jcy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMva29keS9EZXNrdG9wL2Nsb3VkZmxhcmUtZG9jcy92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gXCJub2RlOnVybFwiO1xuaW1wb3J0IHsgSFRNTFJld3JpdGVyLCB0eXBlIEVsZW1lbnRIYW5kbGVycyB9IGZyb20gXCJodG1sLXJld3JpdGVyLXdhc21cIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgdHlwZSBQbHVnaW5PcHRpb24gfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IGdsb2IgZnJvbSBcImdsb2JcIjtcbmltcG9ydCB7IGhpZ2hsaWdodCB9IGZyb20gXCIuL2Jpbi9wcmlzbS5jb25maWdcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuXG5jb25zdCBlbmNvZGVyID0gbmV3IFRleHRFbmNvZGVyKCk7XG5jb25zdCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCk7XG5cbmFzeW5jIGZ1bmN0aW9uIHJld3JpdGUoXG4gIGRvY3VtZW50OiBzdHJpbmcsXG4gIGhhbmRsZXJzOiBbc3RyaW5nLCBFbGVtZW50SGFuZGxlcnNdW11cbikge1xuICBsZXQgb3V0cHV0ID0gXCJcIjtcbiAgY29uc3QgcmV3cml0ZXIgPSBuZXcgSFRNTFJld3JpdGVyKChvdXRwdXRDaHVuaykgPT4ge1xuICAgIG91dHB1dCArPSBkZWNvZGVyLmRlY29kZShvdXRwdXRDaHVuayk7XG4gIH0pO1xuICBoYW5kbGVycy5mb3JFYWNoKChbZWwsIGhhbmRsZXJdKSA9PiByZXdyaXRlci5vbihlbCwgaGFuZGxlcikpO1xuICB0cnkge1xuICAgIGF3YWl0IHJld3JpdGVyLndyaXRlKGVuY29kZXIuZW5jb2RlKGRvY3VtZW50KSk7XG4gICAgYXdhaXQgcmV3cml0ZXIuZW5kKCk7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfSBmaW5hbGx5IHtcbiAgICByZXdyaXRlci5mcmVlKCk7XG4gIH1cbn1cblxuY29uc3QgaHlkcmF0ZVZ1ZUNvbXBvbmVudHMgPSAoKTogUGx1Z2luT3B0aW9uID0+IHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBcImh5ZHJhdGUtdnVlXCIsXG4gICAgdHJhbnNmb3JtSW5kZXhIdG1sOiB7XG4gICAgICBvcmRlcjogXCJwcmVcIixcbiAgICAgIGhhbmRsZXI6IGFzeW5jIChodG1sOiBzdHJpbmcpID0+IHtcbiAgICAgICAgbGV0IGNvbXBvbmVudElkID0gMTtcbiAgICAgICAgaWYgKCFodG1sLmluY2x1ZGVzKFwidnVlLWNvbXBvbmVudFwiKSkgcmV0dXJuIGh0bWw7XG4gICAgICAgIHJldHVybiBhd2FpdCByZXdyaXRlKGh0bWwsIFtcbiAgICAgICAgICBbXG4gICAgICAgICAgICBcInZ1ZS1jb21wb25lbnRcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZWxlbWVudDogKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuSWQgPSBjb21wb25lbnRJZCsrO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcIm5hbWVcIik7XG4gICAgICAgICAgICAgICAgZWxlbWVudC50YWdOYW1lID0gXCJkaXZcIjtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShcIm5hbWVcIik7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgdnVlLWMtJHtuSWR9YCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZnRlcihcbiAgICAgICAgICAgICAgICAgIGA8c2NyaXB0IHR5cGU9XCJtb2R1bGVcIj5cbiAgICAgICAgICAgICAgICAgIGltcG9ydCB7IGNyZWF0ZUFwcCB9IGZyb20gJ3Z1ZSdcbiAgICAgICAgICAgICAgICAgIGltcG9ydCBDb21wb25lbnQgZnJvbSBcIkAvJHtuYW1lfS52dWVcIlxuICAgICAgICAgICAgICAgICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2dWUtYy0ke25JZH0nKVxuICAgICAgICAgICAgICAgICAgY3JlYXRlQXBwKENvbXBvbmVudCwgey4uLnJvb3QuZGF0YXNldH0pLm1vdW50KHJvb3QsIHRydWUpXG4gICAgICAgICAgICAgIDwvc2NyaXB0PmAsXG4gICAgICAgICAgICAgICAgICB7IGh0bWw6IHRydWUgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIF0pO1xuICAgICAgfSxcbiAgICB9LFxuICB9O1xufTtcblxuY29uc3QgcmVuZGVyUGxheWdyb3VuZExpbmsgPSAoKTogUGx1Z2luT3B0aW9uID0+IHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBcInJlbmRlci1wbGF5Z3JvdW5kLWxpbmtcIixcbiAgICBhc3luYyB0cmFuc2Zvcm1JbmRleEh0bWwoaHRtbDogc3RyaW5nKSB7XG4gICAgICBsZXQgcGxheWdyb3VuZFVybDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgYXdhaXQgcmV3cml0ZShodG1sLCBbXG4gICAgICAgIFtcbiAgICAgICAgICBcImFcIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBlbGVtZW50OiAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSA9PT0gXCJwbGF5Z3JvdW5kLWxpbmtcIikge1xuICAgICAgICAgICAgICAgIHBsYXlncm91bmRVcmwgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImhyZWZcIikhO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICBdKTtcbiAgICAgIHJldHVybiBhd2FpdCByZXdyaXRlKGh0bWwsIFtcbiAgICAgICAgW1xuICAgICAgICAgIFwid29ya2Vycy1wbGF5Z3JvdW5kLWxpbmtcIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBlbGVtZW50OiAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAocGxheWdyb3VuZFVybCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZXBsYWNlKFxuICAgICAgICAgICAgICAgICAgLypodG1sKi8gYFxuICAgICAgPGRpdiBjbGFzcz1cIkRvY3NNYXJrZG93bi0tY29udGVudC1jb2x1bW5cIj5cbiAgICAgICAgPGEgaHJlZj1cIiR7cGxheWdyb3VuZFVybH1cIiBjbGFzcz1cIkRvY3NNYXJrZG93bi0tbGlua1wiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJEb2NzTWFya2Rvd24tLWxpbmstY29udGVudFwiPlRyeSBpbiBXb3JrZXJzIFBsYXlncm91bmQ8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJEb2NzTWFya2Rvd24tLWxpbmstZXh0ZXJuYWwtaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgPHN2ZyBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHdpZHRoPVwiMjNweFwiIGhlaWdodD1cIjEycHhcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCIgcm9sZT1cImltZ1wiIGFyaWEtbGFiZWxsZWRieT1cInRpdGxlLTQ3NDQ3Mzg2NzQxMDIwMjdcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgIDx0aXRsZSBpZD1cInRpdGxlLTQ3NDQ3Mzg2NzQxMDIwMjdcIj5FeHRlcm5hbCBsaW5rIGljb248L3RpdGxlPlxuICAgICAgICAgICAgICA8cGF0aCBkPVwiTTYuNzUsMS43NWgtNXYxMi41aDEyLjV2LTVtMCwtNHYtMy41aC0zLjVNOCw4bDUuNS01LjVcIj48L3BhdGg+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDxzcGFuIGlzLXZpc3VhbGx5LWhpZGRlbj5PcGVuIGV4dGVybmFsIGxpbms8L3NwYW4+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2E+XG4gICAgICA8L2Rpdj5gLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBodG1sOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgXSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmNvbnN0IHJlbmRlckNvZGVCbG9jayA9ICgpOiBQbHVnaW5PcHRpb24gPT4ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6IFwicmVuZGVyLWNvZGUtYmxvY2tcIixcbiAgICBhc3luYyB0cmFuc2Zvcm1JbmRleEh0bWwoaHRtbDogc3RyaW5nKSB7XG4gICAgICBpZiAoIWh0bWwuaW5jbHVkZXMoXCJ1bnBhcnNlZC1jb2RlYmxvY2tcIikpIHJldHVybiBodG1sO1xuXG4gICAgICByZXR1cm4gYXdhaXQgcmV3cml0ZShodG1sLCBbXG4gICAgICAgIFtcbiAgICAgICAgICBcInVucGFyc2VkLWNvZGVibG9ja1wiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IGFzeW5jIChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBlbGVtZW50XG4gICAgICAgICAgICAgICAgLmdldEF0dHJpYnV0ZShcImRhdGEtY29kZVwiKSFcbiAgICAgICAgICAgICAgICAvLyBIdWdvJ3MgdXJsIGVuY29kaW5nIGlzIC4uLm9kZFxuICAgICAgICAgICAgICAgIC5yZXBsYWNlQWxsKFwiJiM0MztcIiwgXCIgXCIpO1xuXG4gICAgICAgICAgICAgIGlmIChkYXRhLmluY2x1ZGVzKFwiJiNcIikpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIEhUTUwgZW50aXR5OiBcIiArIGRhdGEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IGRlY29kZWQgPSBkZWNvZGVVUklDb21wb25lbnQoZGF0YSk7XG4gICAgICAgICAgICAgIGNvbnN0IGNvZGUgPSBkZWNvZGVkICsgXCJcXG5cIjtcbiAgICAgICAgICAgICAgZWxlbWVudC5yZXBsYWNlKFxuICAgICAgICAgICAgICAgIGF3YWl0IGhpZ2hsaWdodChcbiAgICAgICAgICAgICAgICAgIGNvZGUsXG4gICAgICAgICAgICAgICAgICBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtbGFuZ3VhZ2VcIikhLFxuICAgICAgICAgICAgICAgICAgXCJcIlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgaHRtbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICBdKTtcbiAgICB9LFxuICB9O1xufTtcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVuZGVyQ29kZUJsb2NrKCksXG4gICAgcmVuZGVyUGxheWdyb3VuZExpbmsoKSxcbiAgICBoeWRyYXRlVnVlQ29tcG9uZW50cygpLFxuICAgIHZ1ZSgpLFxuICBdLFxuICByb290OiBcInB1YmxpY1wiLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoXCIuL2NvbXBvbmVudHNcIiwgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICBkYXRhOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoXCIuL2RhdGFcIiwgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBpbnB1dDogZ2xvYi5zeW5jKFwicHVibGljLyoqLyouaHRtbFwiKSxcbiAgICB9LFxuICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiBmYWxzZSxcbiAgfSxcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMva29keS9EZXNrdG9wL2Nsb3VkZmxhcmUtZG9jcy9iaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9rb2R5L0Rlc2t0b3AvY2xvdWRmbGFyZS1kb2NzL2Jpbi9wcmlzbS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2tvZHkvRGVza3RvcC9jbG91ZGZsYXJlLWRvY3MvYmluL3ByaXNtLmNvbmZpZy50c1wiO2ltcG9ydCBQcmlzbSBmcm9tIFwicHJpc21qc1wiO1xuaW1wb3J0IHJhbmdlUGFyc2VyIGZyb20gXCJwYXJzZS1udW1lcmljLXJhbmdlXCI7XG5cbmltcG9ydCB0eXBlIHsgVG9rZW4sIFRva2VuU3RyZWFtIH0gZnJvbSBcInByaXNtanNcIjtcblxuZ2xvYmFsVGhpcy5QcmlzbSA9IFByaXNtO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWJhc2gubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tYy5taW4uanNcIjtcbmltcG9ydCBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jc2hhcnAubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY3N2Lm1pbi5qc1wiO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWRpZmYubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tZ2l0Lm1pbi5qc1wiO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWdvLm1pbi5qc1wiO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWdyYXBocWwubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20taGNsLm1pbi5qc1wiO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWh0dHAubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20taW5pLm1pbi5qc1wiO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWphdmEubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tanNvbi5taW4uanNcIjtcbmltcG9ydCBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS1qc3gubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tbWFya2Rvd24ubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcGVybC5taW4uanNcIjtcbmltcG9ydCBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS1waHAubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcHl0aG9uLm1pbi5qc1wiO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXJ1YnkubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcnVzdC5taW4uanNcIjtcbmltcG9ydCBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS1zcWwubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tdHlwZXNjcmlwdC5taW4uanNcIjtcbmltcG9ydCBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS10b21sLm1pbi5qc1wiO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXlhbWwubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20ta290bGluLm1pbi5qc1wiO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXN3aWZ0Lm1pbi5qc1wiO1xuaW1wb3J0IHsgY29tcHJlc3NXb3JrZXIsIHNlcmlhbGlzZVdvcmtlciB9IGZyb20gXCIuL3BsYXlncm91bmRcIjtcblxuLy8gQ3VzdG9tIGBzaGVsbGAgZ3JhbW1hclxuUHJpc20ubGFuZ3VhZ2VzLnNoID0ge1xuICBjb21tZW50OiB7XG4gICAgcGF0dGVybjogLyhefFteJ3tcXFxcJF0pIy4qLyxcbiAgICBhbGlhczogXCJ1bnNlbGVjdGFibGVcIixcbiAgICBsb29rYmVoaW5kOiB0cnVlLFxuICB9LFxuXG4gIGRpcmVjdG9yeToge1xuICAgIHBhdHRlcm46IC9eW15cXHJcXG4kKiFdKyg/PVskXSkvbSxcbiAgICBhbGlhczogXCJ1bnNlbGVjdGFibGVcIixcbiAgfSxcblxuICBjb21tYW5kOiB7XG4gICAgcGF0dGVybjogL1skXSg/OlteXFxyXFxuXSkrLyxcbiAgICBpbnNpZGU6IHtcbiAgICAgIHByb21wdDoge1xuICAgICAgICBwYXR0ZXJuOiAvXlskXSAvLFxuICAgICAgICBhbGlhczogXCJ1bnNlbGVjdGFibGVcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbn07XG5cbi8vIFByaXNtIGxhbmd1YWdlIGFsaWFzZXNcbmV4cG9ydCBjb25zdCBsYW5nczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgdGY6IFwiaGNsXCIsIC8vIHRlcnJhZm9ybSAtPiBoYXNoaWNvcnAgY29uZmlnIGxhbmdcbiAgcnM6IFwicnVzdFwiLFxuICBzaGVsbDogXCJzaFwiLFxuICBjdXJsOiBcImJhc2hcIixcbiAgZ3FsOiBcImdyYXBocWxcIixcbiAgc3ZlbHRlOiBcImh0bWxcIixcbiAgamF2YXNjcmlwdDogXCJqc1wiLFxuICBqc29uYzogXCJqc29uXCIsXG4gIHR5cGVzY3JpcHQ6IFwidHNcIixcbiAgcGxhaW50ZXh0OiBcInR4dFwiLFxuICB0ZXh0OiBcInR4dFwiLFxuICBweTogXCJweXRob25cIixcbiAgdnVlOiBcImh0bWxcIixcbiAgcmI6IFwicnVieVwiLFxufTtcblxuLy8gQ3VzdG9tIHRva2VuIHRyYW5zZm9ybXNcbmNvbnN0IHRyYW5zZm9ybWF0aW9uczogUmVjb3JkPHN0cmluZywgYW55PiA9IHtcbiAganM6IHtcbiAgICBrZXl3b3JkOiB7XG4gICAgICB0bzogXCJkZWNsYXJhdGlvbi1rZXl3b3JkXCIsXG4gICAgICBmb3I6IG5ldyBTZXQoW1xuICAgICAgICBcImNvbnN0XCIsXG4gICAgICAgIFwibGV0XCIsXG4gICAgICAgIFwidmFyXCIsXG4gICAgICAgIFwiYXN5bmNcIixcbiAgICAgICAgXCJhd2FpdFwiLFxuICAgICAgICBcImZ1bmN0aW9uXCIsXG4gICAgICAgIFwiY2xhc3NcIixcbiAgICAgIF0pLFxuICAgIH0sXG4gICAgcHVuY3R1YXRpb246IHtcbiAgICAgIHRvOiBcIm9wZXJhdG9yXCIsXG4gICAgICBmb3I6IG5ldyBTZXQoW1wiLlwiXSksXG4gICAgfSxcbiAgICBcImNsYXNzLW5hbWVcIjoge1xuICAgICAgdG86IFwiYXBpXCIsXG4gICAgICBmb3I6IG5ldyBTZXQoW1wiSFRNTFJld3JpdGVyXCIsIFwiUmVxdWVzdFwiLCBcIlJlc3BvbnNlXCIsIFwiVVJMXCIsIFwiRXJyb3JcIl0pLFxuICAgIH0sXG4gICAgZnVuY3Rpb246IHtcbiAgICAgIHRvOiBcImJ1aWx0aW5cIixcbiAgICAgIGZvcjogbmV3IFNldChbXG4gICAgICAgIFwiZmV0Y2hcIixcbiAgICAgICAgXCJjb25zb2xlXCIsXG4gICAgICAgIFwiYWRkRXZlbnRMaXN0ZW5lclwiLFxuICAgICAgICBcImF0b2JcIixcbiAgICAgICAgXCJidG9hXCIsXG4gICAgICAgIFwic2V0SW50ZXJ2YWxcIixcbiAgICAgICAgXCJjbGVhckludGVydmFsXCIsXG4gICAgICAgIFwic2V0VGltZW91dFwiLFxuICAgICAgICBcImNsZWFyVGltZW91dFwiLFxuICAgICAgXSksXG4gICAgfSxcbiAgfSxcbn07XG5cbnRyYW5zZm9ybWF0aW9ucy50cyA9IHRyYW5zZm9ybWF0aW9ucy5qcztcblxudHJhbnNmb3JtYXRpb25zLmh0bWwgPSB7XG4gIGtleXdvcmQ6IHRyYW5zZm9ybWF0aW9ucy5qcy5rZXl3b3JkLFxufTtcblxuaW50ZXJmYWNlIE5vZGUge1xuICB0eXBlczogc3RyaW5nO1xuICBjb250ZW50OiBzdHJpbmc7XG59XG5cbnR5cGUgTGluZSA9IE5vZGVbXTtcblxuY29uc3QgRVNDQVBFID0gL1smXCI8Pl0vZztcbmNvbnN0IENIQVJTID0ge1xuICAnXCInOiBcIiZxdW90O1wiLFxuICBcIiZcIjogXCImYW1wO1wiLFxuICBcIjxcIjogXCImbHQ7XCIsXG4gIFwiPlwiOiBcIiZndDtcIixcbn07XG5cbi8vIEBzZWUgbHVrZWVkL3RlbXB1cmFcbmZ1bmN0aW9uIHRvRXNjYXBlKHZhbHVlOiBzdHJpbmcpIHtcbiAgbGV0IHRtcCA9IDA7XG4gIGxldCBvdXQgPSBcIlwiO1xuICBsZXQgbGFzdCA9IChFU0NBUEUubGFzdEluZGV4ID0gMCk7XG4gIHdoaWxlIChFU0NBUEUudGVzdCh2YWx1ZSkpIHtcbiAgICB0bXAgPSBFU0NBUEUubGFzdEluZGV4IC0gMTtcbiAgICBvdXQgKz0gdmFsdWUuc3Vic3RyaW5nKGxhc3QsIHRtcCkgKyBDSEFSU1t2YWx1ZVt0bXBdIGFzIGtleW9mIHR5cGVvZiBDSEFSU107XG4gICAgbGFzdCA9IHRtcCArIDE7XG4gIH1cbiAgcmV0dXJuIG91dCArIHZhbHVlLnN1YnN0cmluZyhsYXN0KTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplKHRva2VuczogKFRva2VuIHwgc3RyaW5nKVtdKSB7XG4gIGxldCBsaW5lOiBMaW5lID0gW107XG4gIGxldCBsaW5lczogTGluZVtdID0gW107XG5cbiAgZnVuY3Rpb24gbG9vcCh0eXBlczogc3RyaW5nLCBpdGVtOiBUb2tlblN0cmVhbSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgICBpdGVtLmZvckVhY2goKHgpID0+IGxvb3AodHlwZXMsIHgpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB0eXBlcyA9IHR5cGVzIHx8IFwiQ29kZUJsb2NrLS10b2tlbi1wbGFpblwiO1xuXG4gICAgICBpZiAoaXRlbSA9PT0gXCJcIikge1xuICAgICAgICAvLyBpZ25vcmVcbiAgICAgIH0gZWxzZSBpZiAoaXRlbSA9PT0gXCJcXG5cIikge1xuICAgICAgICBsaW5lLnB1c2goeyB0eXBlcywgY29udGVudDogaXRlbSB9KTtcbiAgICAgICAgbGluZXMucHVzaChsaW5lKTtcbiAgICAgICAgbGluZSA9IFtdO1xuICAgICAgfSBlbHNlIGlmIChpdGVtID09PSBcIlxcblxcblwiKSB7XG4gICAgICAgIGxpbmUucHVzaCh7IHR5cGVzLCBjb250ZW50OiBcIlxcblwiIH0pO1xuICAgICAgICBsaW5lcy5wdXNoKGxpbmUpO1xuXG4gICAgICAgIGxpbmUgPSBbeyB0eXBlczogXCJDb2RlQmxvY2stLXRva2VuLXBsYWluXCIsIGNvbnRlbnQ6IFwiXFxuXCIgfV07XG4gICAgICAgIGxpbmVzLnB1c2gobGluZSk7XG5cbiAgICAgICAgbGluZSA9IFtdO1xuICAgICAgfSBlbHNlIGlmIChpdGVtLmluY2x1ZGVzKFwiXFxuXCIpKSB7XG4gICAgICAgIGl0ZW0uc3BsaXQoL1xccj9cXG4vZykuZm9yRWFjaCgodHh0LCBpZHgsIGFycikgPT4ge1xuICAgICAgICAgIGlmICghdHh0ICYmICFpZHggJiYgaWR4IDwgYXJyLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAgIGxldCBjb250ZW50ID0gdHh0ID8gdG9Fc2NhcGUodHh0KSA6IFwiXFxuXCI7XG5cbiAgICAgICAgICBpZiAoaWR4ID4gMCkge1xuICAgICAgICAgICAgbGluZXMucHVzaChsaW5lKTtcbiAgICAgICAgICAgIGxpbmUgPSBbXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGluZS5wdXNoKHsgdHlwZXMsIGNvbnRlbnQgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSB0b0VzY2FwZShpdGVtKTtcbiAgICAgICAgbGluZS5wdXNoKHsgdHlwZXMsIGNvbnRlbnQgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpdGVtKSB7XG4gICAgICBpZiAodHlwZXMpIHR5cGVzICs9IFwiIFwiO1xuICAgICAgdHlwZXMgKz0gXCJDb2RlQmxvY2stLXRva2VuLVwiICsgaXRlbS50eXBlO1xuXG4gICAgICBpZiAoaXRlbS5hbGlhcykge1xuICAgICAgICAoW10gYXMgc3RyaW5nW10pLmNvbmNhdChpdGVtLmFsaWFzKS5mb3JFYWNoKCh0dCkgPT4ge1xuICAgICAgICAgIGlmICghdHlwZXMuaW5jbHVkZXModHQpKSB7XG4gICAgICAgICAgICBpZiAodHlwZXMpIHR5cGVzICs9IFwiIFwiO1xuICAgICAgICAgICAgdHlwZXMgKz0gXCJDb2RlQmxvY2stLXRva2VuLVwiICsgdHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGxvb3AodHlwZXMsIGl0ZW0uY29udGVudCk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICBsb29wKFwiXCIsIHRva2Vuc1tpXSk7XG4gIH1cblxuICBpZiAobGluZS5sZW5ndGggPiAwKSB7XG4gICAgbGluZXMucHVzaChsaW5lKTtcbiAgfVxuXG4gIGxldCBhcnI6IExpbmVbXSA9IFtdO1xuICB3aGlsZSAoKGxpbmUgPSBsaW5lcy5zaGlmdCgpKSkge1xuICAgIGlmIChsaW5lLmxlbmd0aCA+IDEgJiYgbGluZVswXS5jb250ZW50ID09PSBcIlxcblwiKSB7XG4gICAgICAvLyByZW1vdmUgZXh0cmEgbGVhZGluZyBcIlxcblwiIGl0ZW1zIGZvciBub24td2hpdGVzcGFjZSBsaW5lc1xuICAgICAgbGluZVswXS5jb250ZW50ID0gXCJcIjtcbiAgICAgIGFyci5wdXNoKGxpbmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcnIucHVzaChsaW5lKTtcbiAgICB9XG4gIH1cblxuICBsaW5lcyA9IGFycjtcblxuICAvLyBjaGVjayBmb3IgdXNlbGVzcyBuZXdsaW5lXG4gIC8vIH4+IGxhc3QgbGluZSB3aWxsIGJlIHNpbmdsZS1pdGVtIEFycmF5XG4gIGxldCBsYXN0ID0gbGluZXMucG9wKCk7XG4gIGlmIChsYXN0Lmxlbmd0aCAhPT0gMSB8fCBsYXN0WzBdLmNvbnRlbnQudHJpbSgpLmxlbmd0aCA+IDEpIHtcbiAgICBsaW5lcy5wdXNoKGxhc3QpOyAvLyBhZGQgaXQgYmFjaywgd2FzIHVzZWZ1bFxuICB9XG5cbiAgcmV0dXJuIGxpbmVzO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGlnaGxpZ2h0KFxuICBjb2RlOiBzdHJpbmcsXG4gIGxhbmc6IHN0cmluZyxcbiAgZmlsZTogc3RyaW5nXG4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBsYW5nID0gbGFuZ3NbbGFuZ10gfHwgbGFuZyB8fCBcInR4dFwiO1xuICBsZXQgZ3JhbW1hciA9IFByaXNtLmxhbmd1YWdlc1tsYW5nLnRvTG93ZXJDYXNlKCldO1xuXG4gIGlmICghZ3JhbW1hcikge1xuICAgIGNvbnNvbGUud2FybignW3ByaXNtXSBNaXNzaW5nIFwiJXNcIiBncmFtbWFyOyB1c2luZyBcInR4dFwiIGZhbGxiYWNrJywgbGFuZyk7XG4gICAgZ3JhbW1hciA9IFByaXNtLmxhbmd1YWdlcy50eHQ7XG4gIH1cblxuICBsZXQgZnJvbnRtYXR0ZXI6IHtcbiAgICB0aGVtZT86IHN0cmluZyB8IFwibGlnaHRcIjtcbiAgICBoaWdobGlnaHQ/OiBgWyR7c3RyaW5nfV1gIHwgc3RyaW5nO1xuICAgIGZpbGVuYW1lPzogc3RyaW5nO1xuICAgIGhlYWRlcj86IHN0cmluZztcbiAgICBwbGF5Z3JvdW5kPzogYm9vbGVhbjtcbiAgfSA9IHt9O1xuXG4gIC8vIENoZWNrIGZvciBhIFlBTUwgZnJvbnRtYXR0ZXIsXG4gIC8vIGFuZCBlbnN1cmUgaXQncyBub3Qgc29tZXRoaW5nIGxpa2UgLS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tXG4gIGlmIChjb2RlLnN1YnN0cmluZygwLCAzKSA9PT0gXCItLS1cIiAmJiBjb2RlWzNdICE9IFwiLVwiKSB7XG4gICAgbGV0IGluZGV4ID0gY29kZS5pbmRleE9mKFwiLS0tXCIsIDMpO1xuICAgIGlmIChpbmRleCA+IDMpIHtcbiAgICAgIGluZGV4ICs9IDM7XG4gICAgICBsZXQgY29udGVudCA9IGNvZGUuc3Vic3RyaW5nKDAsIGluZGV4KTtcbiAgICAgIGNvZGUgPSBjb2RlLnN1YnN0cmluZyhpbmRleCkucmVwbGFjZSgvXihcXHI/XFxuKSsvLCBcIlwiKTtcblxuICAgICAgLy8gVE9ETzogcGFzcyBpbiBgdXRpbHMuZnJvbnRtYXR0ZXJgIGhlcmVcbiAgICAgIC8vIGZyb250bWF0dGVyID0gdXRpbHMuZnJvbnRtYXR0ZXIoY29udGVudCk7XG5cbiAgICAgIGxldCBtYXRjaCA9IC9eLS0tXFxyP1xcbihbXFxzXFxTXSs/KVxccj9cXG4tLS0vLmV4ZWMoY29udGVudCk7XG4gICAgICBpZiAobWF0Y2ggIT0gbnVsbClcbiAgICAgICAgbWF0Y2hbMV0uc3BsaXQoXCJcXG5cIikuZm9yRWFjaCgocGFpcikgPT4ge1xuICAgICAgICAgIGxldCBba2V5LCAuLi52XSA9IHBhaXIuc3BsaXQoXCI6XCIpO1xuICAgICAgICAgIGZyb250bWF0dGVyW2tleS50cmltKCkgYXMgXCJ0aGVtZVwiXSA9IHYuam9pbihcIjpcIikudHJpbSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBsZXQgaGlnaGxpZ2h0czogU2V0PG51bWJlcj47XG5cbiAgdHJ5IHtcbiAgICBsZXQgaGlnaGxpZ2h0ID0gZnJvbnRtYXR0ZXIuaGlnaGxpZ2h0O1xuICAgIC8vIGxldCByYW5nZS1wYXJzZXIgZG8gdGhlIGhlYXZ5IGxpZnRpbmcuIEl0IGhhbmRsZXMgYWxsIHN1cHBvcnRlZCBjYXNlc1xuICAgIGlmIChoaWdobGlnaHQ/LnN0YXJ0c1dpdGgoXCJbXCIpKSB7XG4gICAgICBoaWdobGlnaHQgPSBoaWdobGlnaHQuc3Vic3RyaW5nKDEsIGhpZ2hsaWdodC5sZW5ndGggLSAxKTtcbiAgICB9XG4gICAgY29uc3QgcGFyc2VkUmFuZ2UgPSByYW5nZVBhcnNlcihoaWdobGlnaHQgfHwgXCJcIik7XG4gICAgaGlnaGxpZ2h0cyA9IG5ldyBTZXQocGFyc2VkUmFuZ2UubWFwKCh4OiBudW1iZXIpID0+IHggLSAxKSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHByb2Nlc3Muc3RkZXJyLndyaXRlKFxuICAgICAgYFtFUlJPUl0gJHtmaWxlfVxcblN5bnRheCBoaWdobGlnaHRpbmcgZXJyb3I6IFlvdSBtdXN0IHNwZWNpZnkgdGhlIGxpbmVzIHRvIGhpZ2hsaWdodCBhcyBhbiBhcnJheSAoZS5nLiwgJ1syXScpLiBGb3VuZCAnJHtmcm9udG1hdHRlci5oaWdobGlnaHR9Jy5cXG5gXG4gICAgKTtcbiAgICAvLyBzdGlsbCB0aHJvd2luZyB0aGUgb3JpZ2luYWwgZXJyb3IgYmVjYXVzZSBpdCBjb3VsZCBiZSBzb21ldGhpbmcgZWxzZVxuICAgIHRocm93IGVycjtcbiAgfVxuXG4gIC8vIHRva2VuaXplICYgYnVpbGQgY3VzdG9tIHN0cmluZyBvdXRwdXRcbiAgbGV0IHRva2VucyA9IFByaXNtLnRva2VuaXplKGNvZGUsIGdyYW1tYXIpO1xuICBsZXQgb3V0cHV0ID0gXCJcIjtcblxuICBsZXQgdGhlbWUgPSBmcm9udG1hdHRlci50aGVtZSB8fCBcImxpZ2h0XCI7XG4gIG91dHB1dCArPVxuICAgICc8cHJlIGNsYXNzPVwiQ29kZUJsb2NrIENvZGVCbG9jay13aXRoLXJvd3MgQ29kZUJsb2NrLXNjcm9sbHMtaG9yaXpvbnRhbGx5JztcblxuICBpZiAodGhlbWUgPT09IFwibGlnaHRcIikgb3V0cHV0ICs9IFwiIENvZGVCbG9jay1pcy1saWdodC1pbi1saWdodC10aGVtZVwiO1xuICBvdXRwdXQgKz0gYCBDb2RlQmxvY2stLWxhbmd1YWdlLSR7bGFuZ31cIiBsYW5ndWFnZT1cIiR7bGFuZ31cIj5gO1xuXG4gIGlmIChmcm9udG1hdHRlci5oZWFkZXIpXG4gICAgb3V0cHV0ICs9IGA8c3BhbiBjbGFzcz1cIkNvZGVCbG9jay0taGVhZGVyXCI+JHtmcm9udG1hdHRlci5oZWFkZXJ9PC9zcGFuPmA7XG4gIGVsc2UgaWYgKGZyb250bWF0dGVyLmZpbGVuYW1lKVxuICAgIG91dHB1dCArPSBgPHNwYW4gY2xhc3M9XCJDb2RlQmxvY2stLWZpbGVuYW1lXCI+JHtmcm9udG1hdHRlci5maWxlbmFtZX08L3NwYW4+YDtcblxuICBpZiAoZnJvbnRtYXR0ZXIucGxheWdyb3VuZCkge1xuICAgIGNvbnN0IHNlcmlhbGlzZWQgPSBhd2FpdCBjb21wcmVzc1dvcmtlcihzZXJpYWxpc2VXb3JrZXIoY29kZSkpO1xuICAgIGNvbnN0IHBsYXlncm91bmRVcmwgPSBgaHR0cHM6Ly93b3JrZXJzLmNsb3VkZmxhcmUuY29tL3BsYXlncm91bmQjJHtzZXJpYWxpc2VkfWA7XG5cbiAgICBvdXRwdXQgKz0gYDxhIHRhcmdldD1cIl9fYmxhbmtcIiBocmVmPVwiJHtwbGF5Z3JvdW5kVXJsfVwiIGNsYXNzPVwicGxheWdyb3VuZC1saW5rXCI+PHN2ZyBmaWxsPVwiY3VycmVudENvbG9yXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIj48cGF0aCBkPVwiTTYuMjEgMTIuMjkzbC0zLjIxNS00LjMgMy4xOTctNC4xNzgtLjYxNy0uODQyLTMuNjAzIDQuNzEyLS4wMDUuNjAzIDMuNjIgNC44NDcuNjIzLS44NDJ6XCI+PC9wYXRoPjxwYXRoIGQ9XCJNNy4zMzIgMS45ODhINi4wOTVsNC40NjIgNi4xLTQuMzU3IDUuOWgxLjI0NUwxMS44IDguMDkgNy4zMzIgMS45ODh6XCI+PC9wYXRoPjxwYXRoIGQ9XCJNOS43MjUgMS45ODhIOC40NzJsNC41MzMgNi4wMjctNC41MzMgNS45NzNoMS4yNTVsNC4zMDMtNS42N3YtLjYwM0w5LjcyNSAxLjk4OHpcIj48L3BhdGg+PC9zdmc+PHNwYW4+IFJ1biBXb3JrZXI8L3NwYW4+PC9hPmA7XG4gIH1cblxuICBvdXRwdXQgKz0gXCI8Y29kZT5cIjtcbiAgb3V0cHV0ICs9ICc8c3BhbiBjbGFzcz1cIkNvZGVCbG9jay0tcm93c1wiPic7XG4gIG91dHB1dCArPSAnPHNwYW4gY2xhc3M9XCJDb2RlQmxvY2stLXJvd3MtY29udGVudFwiPic7XG5cbiAgbGV0IGkgPSAwO1xuICBsZXQgcm93ID0gXCJcIjtcbiAgbGV0IGxpbmU6IExpbmU7XG4gIGxldCBsaW5lcyA9IG5vcm1hbGl6ZSh0b2tlbnMpO1xuXG4gIGZvciAoOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICBsaW5lID0gbGluZXNbaV07XG4gICAgcm93ID0gJzxzcGFuIGNsYXNzPVwiQ29kZUJsb2NrLS1yb3cnO1xuICAgIHJvdyArPSBoaWdobGlnaHRzLmhhcyhpKSA/ICcgQ29kZUJsb2NrLS1yb3ctaXMtaGlnaGxpZ2h0ZWRcIj4nIDogJ1wiPic7XG4gICAgcm93ICs9ICc8c3BhbiBjbGFzcz1cIkNvZGVCbG9jay0tcm93LWluZGljYXRvclwiPjwvc3Bhbj4nO1xuICAgIHJvdyArPSAnPGRpdiBjbGFzcz1cIkNvZGVCbG9jay0tcm93LWNvbnRlbnRcIj4nO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGluZS5sZW5ndGg7IGorKykge1xuICAgICAgcm93ICs9XG4gICAgICAgICc8c3BhbiBjbGFzcz1cIicgKyBsaW5lW2pdLnR5cGVzICsgJ1wiPicgKyBsaW5lW2pdLmNvbnRlbnQgKyBcIjwvc3Bhbj5cIjtcbiAgICB9XG4gICAgb3V0cHV0ICs9IHJvdyArIFwiPC9kaXY+PC9zcGFuPlwiO1xuICB9XG5cbiAgcmV0dXJuIG91dHB1dCArIFwiPC9zcGFuPjwvc3Bhbj48L2NvZGU+PC9wcmU+XCI7XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9rb2R5L0Rlc2t0b3AvY2xvdWRmbGFyZS1kb2NzL2JpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2tvZHkvRGVza3RvcC9jbG91ZGZsYXJlLWRvY3MvYmluL3BsYXlncm91bmQudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2tvZHkvRGVza3RvcC9jbG91ZGZsYXJlLWRvY3MvYmluL3BsYXlncm91bmQudHNcIjtpbXBvcnQgbHpzdHJpbmcgZnJvbSBcImx6LXN0cmluZ1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXNlV29ya2VyKGNvZGU6IHN0cmluZyk6IEZvcm1EYXRhIHtcbiAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcblxuICBjb25zdCBtZXRhZGF0YSA9IHtcbiAgICBtYWluX21vZHVsZTogXCJpbmRleC5qc1wiLFxuICB9O1xuXG4gIGZvcm1EYXRhLnNldChcbiAgICBcImluZGV4LmpzXCIsXG4gICAgbmV3IEJsb2IoW2NvZGVdLCB7XG4gICAgICB0eXBlOiBcImFwcGxpY2F0aW9uL2phdmFzY3JpcHQrbW9kdWxlXCIsXG4gICAgfSksXG4gICAgXCJpbmRleC5qc1wiXG4gICk7XG5cbiAgZm9ybURhdGEuc2V0KFxuICAgIFwibWV0YWRhdGFcIixcbiAgICBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkobWV0YWRhdGEpXSwgeyB0eXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9KVxuICApO1xuXG4gIHJldHVybiBmb3JtRGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbXByZXNzV29ya2VyKHdvcmtlcjogRm9ybURhdGEpIHtcbiAgY29uc3Qgc2VyaWFsaXNlZFdvcmtlciA9IG5ldyBSZXNwb25zZSh3b3JrZXIpO1xuICByZXR1cm4gbHpzdHJpbmcuY29tcHJlc3NUb0VuY29kZWRVUklDb21wb25lbnQoXG4gICAgYCR7c2VyaWFsaXNlZFdvcmtlci5oZWFkZXJzLmdldChcbiAgICAgIFwiY29udGVudC10eXBlXCJcbiAgICApfToke2F3YWl0IHNlcmlhbGlzZWRXb3JrZXIudGV4dCgpfWBcbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlIsU0FBUyxlQUFlLFdBQVc7QUFDOVQsU0FBUyxvQkFBMEM7QUFDbkQsU0FBUyxvQkFBdUM7QUFDaEQsT0FBTyxVQUFVOzs7QUNId1IsT0FBTyxXQUFXO0FBQzNULE9BQU8saUJBQWlCO0FBS3hCLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1As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
