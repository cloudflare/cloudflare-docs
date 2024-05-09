// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { HTMLRewriter } from "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/html-rewriter-wasm/dist/html_rewriter.js";
import { defineConfig } from "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/vite/dist/node/index.js";
import glob from "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/glob/glob.js";

// bin/prism.config.ts
import Prism from "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/prism.js";
import rangeParser from "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/parse-numeric-range/index.js";
import "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-bash.min.js";
import "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-c.min.js";
import "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-csharp.min.js";
import "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-csv.min.js";
import "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-diff.min.js";
import "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-git.min.js";
import "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-go.min.js";
import "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-graphql.min.js";
import "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-hcl.min.js";
import "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-http.min.js";
import "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-ini.min.js";
import "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-java.min.js";
import "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-json.min.js";
import "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-jsx.min.js";
import "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-markdown.min.js";
import "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-perl.min.js";
import "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-php.min.js";
import "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-powershell.min.js";
import "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-python.min.js";
import "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-ruby.min.js";
import "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-rust.min.js";
import "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-sql.min.js";
import "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-typescript.min.js";
import "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-toml.min.js";
import "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-yaml.min.js";
import "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-kotlin.min.js";
import "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/prismjs/components/prism-swift.min.js";

// bin/playground.ts
import lzstring from "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/lz-string/libs/lz-string.js";
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
  output += ` CodeBlock--language-${lang}" language="${lang}"`;
  if (frontmatter.header)
    output += ` title="${frontmatter.header}">`;
  else
    output += ">";
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
import vue from "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/vite.config.ts";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYmluL3ByaXNtLmNvbmZpZy50cyIsICJiaW4vcGxheWdyb3VuZC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9rb2R5c2hlcm1hbmphY2tzb24vRGVza3RvcC9jbG91ZGZsYXJlLWRvY3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9rb2R5c2hlcm1hbmphY2tzb24vRGVza3RvcC9jbG91ZGZsYXJlLWRvY3Mvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2tvZHlzaGVybWFuamFja3Nvbi9EZXNrdG9wL2Nsb3VkZmxhcmUtZG9jcy92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gXCJub2RlOnVybFwiO1xuaW1wb3J0IHsgSFRNTFJld3JpdGVyLCB0eXBlIEVsZW1lbnRIYW5kbGVycyB9IGZyb20gXCJodG1sLXJld3JpdGVyLXdhc21cIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgdHlwZSBQbHVnaW5PcHRpb24gfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IGdsb2IgZnJvbSBcImdsb2JcIjtcbmltcG9ydCB7IGhpZ2hsaWdodCB9IGZyb20gXCIuL2Jpbi9wcmlzbS5jb25maWdcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuXG5jb25zdCBlbmNvZGVyID0gbmV3IFRleHRFbmNvZGVyKCk7XG5jb25zdCBkZWNvZGVyID0gbmV3IFRleHREZWNvZGVyKCk7XG5cbmFzeW5jIGZ1bmN0aW9uIHJld3JpdGUoXG4gIGRvY3VtZW50OiBzdHJpbmcsXG4gIGhhbmRsZXJzOiBbc3RyaW5nLCBFbGVtZW50SGFuZGxlcnNdW11cbikge1xuICBsZXQgb3V0cHV0ID0gXCJcIjtcbiAgY29uc3QgcmV3cml0ZXIgPSBuZXcgSFRNTFJld3JpdGVyKChvdXRwdXRDaHVuaykgPT4ge1xuICAgIG91dHB1dCArPSBkZWNvZGVyLmRlY29kZShvdXRwdXRDaHVuayk7XG4gIH0pO1xuICBoYW5kbGVycy5mb3JFYWNoKChbZWwsIGhhbmRsZXJdKSA9PiByZXdyaXRlci5vbihlbCwgaGFuZGxlcikpO1xuICB0cnkge1xuICAgIGF3YWl0IHJld3JpdGVyLndyaXRlKGVuY29kZXIuZW5jb2RlKGRvY3VtZW50KSk7XG4gICAgYXdhaXQgcmV3cml0ZXIuZW5kKCk7XG4gICAgcmV0dXJuIG91dHB1dDtcbiAgfSBmaW5hbGx5IHtcbiAgICByZXdyaXRlci5mcmVlKCk7XG4gIH1cbn1cblxuY29uc3QgaHlkcmF0ZVZ1ZUNvbXBvbmVudHMgPSAoKTogUGx1Z2luT3B0aW9uID0+IHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBcImh5ZHJhdGUtdnVlXCIsXG4gICAgdHJhbnNmb3JtSW5kZXhIdG1sOiB7XG4gICAgICBvcmRlcjogXCJwcmVcIixcbiAgICAgIGhhbmRsZXI6IGFzeW5jIChodG1sOiBzdHJpbmcpID0+IHtcbiAgICAgICAgbGV0IGNvbXBvbmVudElkID0gMTtcbiAgICAgICAgaWYgKCFodG1sLmluY2x1ZGVzKFwidnVlLWNvbXBvbmVudFwiKSkgcmV0dXJuIGh0bWw7XG4gICAgICAgIHJldHVybiBhd2FpdCByZXdyaXRlKGh0bWwsIFtcbiAgICAgICAgICBbXG4gICAgICAgICAgICBcInZ1ZS1jb21wb25lbnRcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZWxlbWVudDogKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuSWQgPSBjb21wb25lbnRJZCsrO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcIm5hbWVcIik7XG4gICAgICAgICAgICAgICAgZWxlbWVudC50YWdOYW1lID0gXCJkaXZcIjtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShcIm5hbWVcIik7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgdnVlLWMtJHtuSWR9YCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZnRlcihcbiAgICAgICAgICAgICAgICAgIGA8c2NyaXB0IHR5cGU9XCJtb2R1bGVcIj5cbiAgICAgICAgICAgICAgICAgIGltcG9ydCB7IGNyZWF0ZUFwcCB9IGZyb20gJ3Z1ZSdcbiAgICAgICAgICAgICAgICAgIGltcG9ydCBDb21wb25lbnQgZnJvbSBcIkAvJHtuYW1lfS52dWVcIlxuICAgICAgICAgICAgICAgICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2dWUtYy0ke25JZH0nKVxuICAgICAgICAgICAgICAgICAgY3JlYXRlQXBwKENvbXBvbmVudCwgey4uLnJvb3QuZGF0YXNldH0pLm1vdW50KHJvb3QsIHRydWUpXG4gICAgICAgICAgICAgIDwvc2NyaXB0PmAsXG4gICAgICAgICAgICAgICAgICB7IGh0bWw6IHRydWUgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIF0pO1xuICAgICAgfSxcbiAgICB9LFxuICB9O1xufTtcblxuY29uc3QgcmVuZGVyUGxheWdyb3VuZExpbmsgPSAoKTogUGx1Z2luT3B0aW9uID0+IHtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBcInJlbmRlci1wbGF5Z3JvdW5kLWxpbmtcIixcbiAgICBhc3luYyB0cmFuc2Zvcm1JbmRleEh0bWwoaHRtbDogc3RyaW5nKSB7XG4gICAgICBsZXQgcGxheWdyb3VuZFVybDogc3RyaW5nIHwgdW5kZWZpbmVkO1xuICAgICAgYXdhaXQgcmV3cml0ZShodG1sLCBbXG4gICAgICAgIFtcbiAgICAgICAgICBcImFcIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBlbGVtZW50OiAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAoZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJjbGFzc1wiKSA9PT0gXCJwbGF5Z3JvdW5kLWxpbmtcIikge1xuICAgICAgICAgICAgICAgIHBsYXlncm91bmRVcmwgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcImhyZWZcIikhO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICBdKTtcbiAgICAgIHJldHVybiBhd2FpdCByZXdyaXRlKGh0bWwsIFtcbiAgICAgICAgW1xuICAgICAgICAgIFwid29ya2Vycy1wbGF5Z3JvdW5kLWxpbmtcIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICBlbGVtZW50OiAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICBpZiAocGxheWdyb3VuZFVybCAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZXBsYWNlKFxuICAgICAgICAgICAgICAgICAgLypodG1sKi8gYFxuICAgICAgPGRpdiBjbGFzcz1cIkRvY3NNYXJrZG93bi0tY29udGVudC1jb2x1bW5cIj5cbiAgICAgICAgPGEgaHJlZj1cIiR7cGxheWdyb3VuZFVybH1cIiBjbGFzcz1cIkRvY3NNYXJrZG93bi0tbGlua1wiIHRhcmdldD1cIl9ibGFua1wiIHJlbD1cIm5vb3BlbmVyXCI+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJEb2NzTWFya2Rvd24tLWxpbmstY29udGVudFwiPlRyeSBpbiBXb3JrZXJzIFBsYXlncm91bmQ8L3NwYW4+XG4gICAgICAgICAgPHNwYW4gY2xhc3M9XCJEb2NzTWFya2Rvd24tLWxpbmstZXh0ZXJuYWwtaWNvblwiIGFyaWEtaGlkZGVuPVwidHJ1ZVwiPlxuICAgICAgICAgICAgPHN2ZyBmaWxsPVwibm9uZVwiIHN0cm9rZT1cImN1cnJlbnRDb2xvclwiIHN0cm9rZS13aWR0aD1cIjEuNVwiIHdpZHRoPVwiMjNweFwiIGhlaWdodD1cIjEycHhcIiBzdHJva2UtbGluZWNhcD1cInJvdW5kXCIgc3Ryb2tlLWxpbmVqb2luPVwicm91bmRcIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCIgcm9sZT1cImltZ1wiIGFyaWEtbGFiZWxsZWRieT1cInRpdGxlLTQ3NDQ3Mzg2NzQxMDIwMjdcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCI+XG4gICAgICAgICAgICAgIDx0aXRsZSBpZD1cInRpdGxlLTQ3NDQ3Mzg2NzQxMDIwMjdcIj5FeHRlcm5hbCBsaW5rIGljb248L3RpdGxlPlxuICAgICAgICAgICAgICA8cGF0aCBkPVwiTTYuNzUsMS43NWgtNXYxMi41aDEyLjV2LTVtMCwtNHYtMy41aC0zLjVNOCw4bDUuNS01LjVcIj48L3BhdGg+XG4gICAgICAgICAgICA8L3N2Zz5cbiAgICAgICAgICAgIDxzcGFuIGlzLXZpc3VhbGx5LWhpZGRlbj5PcGVuIGV4dGVybmFsIGxpbms8L3NwYW4+XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICA8L2E+XG4gICAgICA8L2Rpdj5gLFxuICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICBodG1sOiB0cnVlLFxuICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmUoKTtcbiAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgXSk7XG4gICAgfSxcbiAgfTtcbn07XG5cbmNvbnN0IHJlbmRlckNvZGVCbG9jayA9ICgpOiBQbHVnaW5PcHRpb24gPT4ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6IFwicmVuZGVyLWNvZGUtYmxvY2tcIixcbiAgICBhc3luYyB0cmFuc2Zvcm1JbmRleEh0bWwoaHRtbDogc3RyaW5nKSB7XG4gICAgICBpZiAoIWh0bWwuaW5jbHVkZXMoXCJ1bnBhcnNlZC1jb2RlYmxvY2tcIikpIHJldHVybiBodG1sO1xuXG4gICAgICByZXR1cm4gYXdhaXQgcmV3cml0ZShodG1sLCBbXG4gICAgICAgIFtcbiAgICAgICAgICBcInVucGFyc2VkLWNvZGVibG9ja1wiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IGFzeW5jIChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBlbGVtZW50XG4gICAgICAgICAgICAgICAgLmdldEF0dHJpYnV0ZShcImRhdGEtY29kZVwiKSFcbiAgICAgICAgICAgICAgICAvLyBIdWdvJ3MgdXJsIGVuY29kaW5nIGlzIC4uLm9kZFxuICAgICAgICAgICAgICAgIC5yZXBsYWNlQWxsKFwiJiM0MztcIiwgXCIgXCIpO1xuXG4gICAgICAgICAgICAgIGlmIChkYXRhLmluY2x1ZGVzKFwiJiNcIikpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIEhUTUwgZW50aXR5OiBcIiArIGRhdGEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IGRlY29kZWQgPSBkZWNvZGVVUklDb21wb25lbnQoZGF0YSk7XG4gICAgICAgICAgICAgIGNvbnN0IGNvZGUgPSBkZWNvZGVkICsgXCJcXG5cIjtcbiAgICAgICAgICAgICAgZWxlbWVudC5yZXBsYWNlKFxuICAgICAgICAgICAgICAgIGF3YWl0IGhpZ2hsaWdodChcbiAgICAgICAgICAgICAgICAgIGNvZGUsXG4gICAgICAgICAgICAgICAgICBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtbGFuZ3VhZ2VcIikhLFxuICAgICAgICAgICAgICAgICAgXCJcIlxuICAgICAgICAgICAgICAgICksXG4gICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgaHRtbDogdHJ1ZSxcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICk7XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICBdKTtcbiAgICB9LFxuICB9O1xufTtcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoe1xuICBwbHVnaW5zOiBbXG4gICAgcmVuZGVyQ29kZUJsb2NrKCksXG4gICAgcmVuZGVyUGxheWdyb3VuZExpbmsoKSxcbiAgICBoeWRyYXRlVnVlQ29tcG9uZW50cygpLFxuICAgIHZ1ZSgpLFxuICBdLFxuICByb290OiBcInB1YmxpY1wiLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoXCIuL2NvbXBvbmVudHNcIiwgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICBkYXRhOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoXCIuL2RhdGFcIiwgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBpbnB1dDogZ2xvYi5zeW5jKFwicHVibGljLyoqLyouaHRtbFwiKSxcbiAgICB9LFxuICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiBmYWxzZSxcbiAgfSxcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMva29keXNoZXJtYW5qYWNrc29uL0Rlc2t0b3AvY2xvdWRmbGFyZS1kb2NzL2JpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2tvZHlzaGVybWFuamFja3Nvbi9EZXNrdG9wL2Nsb3VkZmxhcmUtZG9jcy9iaW4vcHJpc20uY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9rb2R5c2hlcm1hbmphY2tzb24vRGVza3RvcC9jbG91ZGZsYXJlLWRvY3MvYmluL3ByaXNtLmNvbmZpZy50c1wiO2ltcG9ydCBQcmlzbSBmcm9tIFwicHJpc21qc1wiO1xuaW1wb3J0IHJhbmdlUGFyc2VyIGZyb20gXCJwYXJzZS1udW1lcmljLXJhbmdlXCI7XG5cbmltcG9ydCB0eXBlIHsgVG9rZW4sIFRva2VuU3RyZWFtIH0gZnJvbSBcInByaXNtanNcIjtcblxuZ2xvYmFsVGhpcy5QcmlzbSA9IFByaXNtO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWJhc2gubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tYy5taW4uanNcIjtcbmltcG9ydCBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jc2hhcnAubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY3N2Lm1pbi5qc1wiO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWRpZmYubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tZ2l0Lm1pbi5qc1wiO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWdvLm1pbi5qc1wiO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWdyYXBocWwubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20taGNsLm1pbi5qc1wiO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWh0dHAubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20taW5pLm1pbi5qc1wiO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWphdmEubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tanNvbi5taW4uanNcIjtcbmltcG9ydCBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS1qc3gubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tbWFya2Rvd24ubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcGVybC5taW4uanNcIjtcbmltcG9ydCBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS1waHAubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcG93ZXJzaGVsbC5taW4uanNcIjtcbmltcG9ydCBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS1weXRob24ubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcnVieS5taW4uanNcIjtcbmltcG9ydCBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS1ydXN0Lm1pbi5qc1wiO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXNxbC5taW4uanNcIjtcbmltcG9ydCBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS10eXBlc2NyaXB0Lm1pbi5qc1wiO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXRvbWwubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20teWFtbC5taW4uanNcIjtcbmltcG9ydCBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS1rb3RsaW4ubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tc3dpZnQubWluLmpzXCI7XG5pbXBvcnQgeyBjb21wcmVzc1dvcmtlciwgc2VyaWFsaXNlV29ya2VyIH0gZnJvbSBcIi4vcGxheWdyb3VuZFwiO1xuXG4vLyBDdXN0b20gYHNoZWxsYCBncmFtbWFyXG5QcmlzbS5sYW5ndWFnZXMuc2ggPSB7XG4gIGNvbW1lbnQ6IHtcbiAgICBwYXR0ZXJuOiAvKF58W14ne1xcXFwkXSkjLiovLFxuICAgIGFsaWFzOiBcInVuc2VsZWN0YWJsZVwiLFxuICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gIH0sXG5cbiAgZGlyZWN0b3J5OiB7XG4gICAgcGF0dGVybjogL15bXlxcclxcbiQqIV0rKD89WyRdKS9tLFxuICAgIGFsaWFzOiBcInVuc2VsZWN0YWJsZVwiLFxuICB9LFxuXG4gIGNvbW1hbmQ6IHtcbiAgICBwYXR0ZXJuOiAvWyRdKD86W15cXHJcXG5dKSsvLFxuICAgIGluc2lkZToge1xuICAgICAgcHJvbXB0OiB7XG4gICAgICAgIHBhdHRlcm46IC9eWyRdIC8sXG4gICAgICAgIGFsaWFzOiBcInVuc2VsZWN0YWJsZVwiLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufTtcblxuLy8gUHJpc20gbGFuZ3VhZ2UgYWxpYXNlc1xuZXhwb3J0IGNvbnN0IGxhbmdzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICB0ZjogXCJoY2xcIiwgLy8gdGVycmFmb3JtIC0+IGhhc2hpY29ycCBjb25maWcgbGFuZ1xuICByczogXCJydXN0XCIsXG4gIHNoZWxsOiBcInNoXCIsXG4gIGN1cmw6IFwiYmFzaFwiLFxuICBncWw6IFwiZ3JhcGhxbFwiLFxuICBzdmVsdGU6IFwiaHRtbFwiLFxuICBqYXZhc2NyaXB0OiBcImpzXCIsXG4gIGpzb25jOiBcImpzb25cIixcbiAgdHlwZXNjcmlwdDogXCJ0c1wiLFxuICBwbGFpbnRleHQ6IFwidHh0XCIsXG4gIHRleHQ6IFwidHh0XCIsXG4gIHB5OiBcInB5dGhvblwiLFxuICB2dWU6IFwiaHRtbFwiLFxuICByYjogXCJydWJ5XCIsXG59O1xuXG4vLyBDdXN0b20gdG9rZW4gdHJhbnNmb3Jtc1xuY29uc3QgdHJhbnNmb3JtYXRpb25zOiBSZWNvcmQ8c3RyaW5nLCBhbnk+ID0ge1xuICBqczoge1xuICAgIGtleXdvcmQ6IHtcbiAgICAgIHRvOiBcImRlY2xhcmF0aW9uLWtleXdvcmRcIixcbiAgICAgIGZvcjogbmV3IFNldChbXG4gICAgICAgIFwiY29uc3RcIixcbiAgICAgICAgXCJsZXRcIixcbiAgICAgICAgXCJ2YXJcIixcbiAgICAgICAgXCJhc3luY1wiLFxuICAgICAgICBcImF3YWl0XCIsXG4gICAgICAgIFwiZnVuY3Rpb25cIixcbiAgICAgICAgXCJjbGFzc1wiLFxuICAgICAgXSksXG4gICAgfSxcbiAgICBwdW5jdHVhdGlvbjoge1xuICAgICAgdG86IFwib3BlcmF0b3JcIixcbiAgICAgIGZvcjogbmV3IFNldChbXCIuXCJdKSxcbiAgICB9LFxuICAgIFwiY2xhc3MtbmFtZVwiOiB7XG4gICAgICB0bzogXCJhcGlcIixcbiAgICAgIGZvcjogbmV3IFNldChbXCJIVE1MUmV3cml0ZXJcIiwgXCJSZXF1ZXN0XCIsIFwiUmVzcG9uc2VcIiwgXCJVUkxcIiwgXCJFcnJvclwiXSksXG4gICAgfSxcbiAgICBmdW5jdGlvbjoge1xuICAgICAgdG86IFwiYnVpbHRpblwiLFxuICAgICAgZm9yOiBuZXcgU2V0KFtcbiAgICAgICAgXCJmZXRjaFwiLFxuICAgICAgICBcImNvbnNvbGVcIixcbiAgICAgICAgXCJhZGRFdmVudExpc3RlbmVyXCIsXG4gICAgICAgIFwiYXRvYlwiLFxuICAgICAgICBcImJ0b2FcIixcbiAgICAgICAgXCJzZXRJbnRlcnZhbFwiLFxuICAgICAgICBcImNsZWFySW50ZXJ2YWxcIixcbiAgICAgICAgXCJzZXRUaW1lb3V0XCIsXG4gICAgICAgIFwiY2xlYXJUaW1lb3V0XCIsXG4gICAgICBdKSxcbiAgICB9LFxuICB9LFxufTtcblxudHJhbnNmb3JtYXRpb25zLnRzID0gdHJhbnNmb3JtYXRpb25zLmpzO1xuXG50cmFuc2Zvcm1hdGlvbnMuaHRtbCA9IHtcbiAga2V5d29yZDogdHJhbnNmb3JtYXRpb25zLmpzLmtleXdvcmQsXG59O1xuXG5pbnRlcmZhY2UgTm9kZSB7XG4gIHR5cGVzOiBzdHJpbmc7XG4gIGNvbnRlbnQ6IHN0cmluZztcbn1cblxudHlwZSBMaW5lID0gTm9kZVtdO1xuXG5jb25zdCBFU0NBUEUgPSAvWyZcIjw+XS9nO1xuY29uc3QgQ0hBUlMgPSB7XG4gICdcIic6IFwiJnF1b3Q7XCIsXG4gIFwiJlwiOiBcIiZhbXA7XCIsXG4gIFwiPFwiOiBcIiZsdDtcIixcbiAgXCI+XCI6IFwiJmd0O1wiLFxufTtcblxuLy8gQHNlZSBsdWtlZWQvdGVtcHVyYVxuZnVuY3Rpb24gdG9Fc2NhcGUodmFsdWU6IHN0cmluZykge1xuICBsZXQgdG1wID0gMDtcbiAgbGV0IG91dCA9IFwiXCI7XG4gIGxldCBsYXN0ID0gKEVTQ0FQRS5sYXN0SW5kZXggPSAwKTtcbiAgd2hpbGUgKEVTQ0FQRS50ZXN0KHZhbHVlKSkge1xuICAgIHRtcCA9IEVTQ0FQRS5sYXN0SW5kZXggLSAxO1xuICAgIG91dCArPSB2YWx1ZS5zdWJzdHJpbmcobGFzdCwgdG1wKSArIENIQVJTW3ZhbHVlW3RtcF0gYXMga2V5b2YgdHlwZW9mIENIQVJTXTtcbiAgICBsYXN0ID0gdG1wICsgMTtcbiAgfVxuICByZXR1cm4gb3V0ICsgdmFsdWUuc3Vic3RyaW5nKGxhc3QpO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemUodG9rZW5zOiAoVG9rZW4gfCBzdHJpbmcpW10pIHtcbiAgbGV0IGxpbmU6IExpbmUgPSBbXTtcbiAgbGV0IGxpbmVzOiBMaW5lW10gPSBbXTtcblxuICBmdW5jdGlvbiBsb29wKHR5cGVzOiBzdHJpbmcsIGl0ZW06IFRva2VuU3RyZWFtKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICAgIGl0ZW0uZm9yRWFjaCgoeCkgPT4gbG9vcCh0eXBlcywgeCkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0gPT09IFwic3RyaW5nXCIpIHtcbiAgICAgIHR5cGVzID0gdHlwZXMgfHwgXCJDb2RlQmxvY2stLXRva2VuLXBsYWluXCI7XG5cbiAgICAgIGlmIChpdGVtID09PSBcIlwiKSB7XG4gICAgICAgIC8vIGlnbm9yZVxuICAgICAgfSBlbHNlIGlmIChpdGVtID09PSBcIlxcblwiKSB7XG4gICAgICAgIGxpbmUucHVzaCh7IHR5cGVzLCBjb250ZW50OiBpdGVtIH0pO1xuICAgICAgICBsaW5lcy5wdXNoKGxpbmUpO1xuICAgICAgICBsaW5lID0gW107XG4gICAgICB9IGVsc2UgaWYgKGl0ZW0gPT09IFwiXFxuXFxuXCIpIHtcbiAgICAgICAgbGluZS5wdXNoKHsgdHlwZXMsIGNvbnRlbnQ6IFwiXFxuXCIgfSk7XG4gICAgICAgIGxpbmVzLnB1c2gobGluZSk7XG5cbiAgICAgICAgbGluZSA9IFt7IHR5cGVzOiBcIkNvZGVCbG9jay0tdG9rZW4tcGxhaW5cIiwgY29udGVudDogXCJcXG5cIiB9XTtcbiAgICAgICAgbGluZXMucHVzaChsaW5lKTtcblxuICAgICAgICBsaW5lID0gW107XG4gICAgICB9IGVsc2UgaWYgKGl0ZW0uaW5jbHVkZXMoXCJcXG5cIikpIHtcbiAgICAgICAgaXRlbS5zcGxpdCgvXFxyP1xcbi9nKS5mb3JFYWNoKCh0eHQsIGlkeCwgYXJyKSA9PiB7XG4gICAgICAgICAgaWYgKCF0eHQgJiYgIWlkeCAmJiBpZHggPCBhcnIubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICAgbGV0IGNvbnRlbnQgPSB0eHQgPyB0b0VzY2FwZSh0eHQpIDogXCJcXG5cIjtcblxuICAgICAgICAgIGlmIChpZHggPiAwKSB7XG4gICAgICAgICAgICBsaW5lcy5wdXNoKGxpbmUpO1xuICAgICAgICAgICAgbGluZSA9IFtdO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsaW5lLnB1c2goeyB0eXBlcywgY29udGVudCB9KTtcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgY29udGVudCA9IHRvRXNjYXBlKGl0ZW0pO1xuICAgICAgICBsaW5lLnB1c2goeyB0eXBlcywgY29udGVudCB9KTtcbiAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGl0ZW0pIHtcbiAgICAgIGlmICh0eXBlcykgdHlwZXMgKz0gXCIgXCI7XG4gICAgICB0eXBlcyArPSBcIkNvZGVCbG9jay0tdG9rZW4tXCIgKyBpdGVtLnR5cGU7XG5cbiAgICAgIGlmIChpdGVtLmFsaWFzKSB7XG4gICAgICAgIChbXSBhcyBzdHJpbmdbXSkuY29uY2F0KGl0ZW0uYWxpYXMpLmZvckVhY2goKHR0KSA9PiB7XG4gICAgICAgICAgaWYgKCF0eXBlcy5pbmNsdWRlcyh0dCkpIHtcbiAgICAgICAgICAgIGlmICh0eXBlcykgdHlwZXMgKz0gXCIgXCI7XG4gICAgICAgICAgICB0eXBlcyArPSBcIkNvZGVCbG9jay0tdG9rZW4tXCIgKyB0dDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgbG9vcCh0eXBlcywgaXRlbS5jb250ZW50KTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgIGxvb3AoXCJcIiwgdG9rZW5zW2ldKTtcbiAgfVxuXG4gIGlmIChsaW5lLmxlbmd0aCA+IDApIHtcbiAgICBsaW5lcy5wdXNoKGxpbmUpO1xuICB9XG5cbiAgbGV0IGFycjogTGluZVtdID0gW107XG4gIHdoaWxlICgobGluZSA9IGxpbmVzLnNoaWZ0KCkpKSB7XG4gICAgaWYgKGxpbmUubGVuZ3RoID4gMSAmJiBsaW5lWzBdLmNvbnRlbnQgPT09IFwiXFxuXCIpIHtcbiAgICAgIC8vIHJlbW92ZSBleHRyYSBsZWFkaW5nIFwiXFxuXCIgaXRlbXMgZm9yIG5vbi13aGl0ZXNwYWNlIGxpbmVzXG4gICAgICBsaW5lWzBdLmNvbnRlbnQgPSBcIlwiO1xuICAgICAgYXJyLnB1c2gobGluZSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGFyci5wdXNoKGxpbmUpO1xuICAgIH1cbiAgfVxuXG4gIGxpbmVzID0gYXJyO1xuXG4gIC8vIGNoZWNrIGZvciB1c2VsZXNzIG5ld2xpbmVcbiAgLy8gfj4gbGFzdCBsaW5lIHdpbGwgYmUgc2luZ2xlLWl0ZW0gQXJyYXlcbiAgbGV0IGxhc3QgPSBsaW5lcy5wb3AoKTtcbiAgaWYgKGxhc3QubGVuZ3RoICE9PSAxIHx8IGxhc3RbMF0uY29udGVudC50cmltKCkubGVuZ3RoID4gMSkge1xuICAgIGxpbmVzLnB1c2gobGFzdCk7IC8vIGFkZCBpdCBiYWNrLCB3YXMgdXNlZnVsXG4gIH1cblxuICByZXR1cm4gbGluZXM7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBoaWdobGlnaHQoXG4gIGNvZGU6IHN0cmluZyxcbiAgbGFuZzogc3RyaW5nLFxuICBmaWxlOiBzdHJpbmdcbik6IFByb21pc2U8c3RyaW5nPiB7XG4gIGxhbmcgPSBsYW5nc1tsYW5nXSB8fCBsYW5nIHx8IFwidHh0XCI7XG4gIGxldCBncmFtbWFyID0gUHJpc20ubGFuZ3VhZ2VzW2xhbmcudG9Mb3dlckNhc2UoKV07XG5cbiAgaWYgKCFncmFtbWFyKSB7XG4gICAgY29uc29sZS53YXJuKCdbcHJpc21dIE1pc3NpbmcgXCIlc1wiIGdyYW1tYXI7IHVzaW5nIFwidHh0XCIgZmFsbGJhY2snLCBsYW5nKTtcbiAgICBncmFtbWFyID0gUHJpc20ubGFuZ3VhZ2VzLnR4dDtcbiAgfVxuXG4gIGxldCBmcm9udG1hdHRlcjoge1xuICAgIHRoZW1lPzogc3RyaW5nIHwgXCJsaWdodFwiO1xuICAgIGhpZ2hsaWdodD86IGBbJHtzdHJpbmd9XWAgfCBzdHJpbmc7XG4gICAgZmlsZW5hbWU/OiBzdHJpbmc7XG4gICAgaGVhZGVyPzogc3RyaW5nO1xuICAgIHBsYXlncm91bmQ/OiBib29sZWFuO1xuICB9ID0ge307XG5cbiAgLy8gQ2hlY2sgZm9yIGEgWUFNTCBmcm9udG1hdHRlcixcbiAgLy8gYW5kIGVuc3VyZSBpdCdzIG5vdCBzb21ldGhpbmcgbGlrZSAtLS0tLUJFR0lOIENFUlRJRklDQVRFLS0tLS1cbiAgaWYgKGNvZGUuc3Vic3RyaW5nKDAsIDMpID09PSBcIi0tLVwiICYmIGNvZGVbM10gIT0gXCItXCIpIHtcbiAgICBsZXQgaW5kZXggPSBjb2RlLmluZGV4T2YoXCItLS1cIiwgMyk7XG4gICAgaWYgKGluZGV4ID4gMykge1xuICAgICAgaW5kZXggKz0gMztcbiAgICAgIGxldCBjb250ZW50ID0gY29kZS5zdWJzdHJpbmcoMCwgaW5kZXgpO1xuICAgICAgY29kZSA9IGNvZGUuc3Vic3RyaW5nKGluZGV4KS5yZXBsYWNlKC9eKFxccj9cXG4pKy8sIFwiXCIpO1xuXG4gICAgICAvLyBUT0RPOiBwYXNzIGluIGB1dGlscy5mcm9udG1hdHRlcmAgaGVyZVxuICAgICAgLy8gZnJvbnRtYXR0ZXIgPSB1dGlscy5mcm9udG1hdHRlcihjb250ZW50KTtcblxuICAgICAgbGV0IG1hdGNoID0gL14tLS1cXHI/XFxuKFtcXHNcXFNdKz8pXFxyP1xcbi0tLS8uZXhlYyhjb250ZW50KTtcbiAgICAgIGlmIChtYXRjaCAhPSBudWxsKVxuICAgICAgICBtYXRjaFsxXS5zcGxpdChcIlxcblwiKS5mb3JFYWNoKChwYWlyKSA9PiB7XG4gICAgICAgICAgbGV0IFtrZXksIC4uLnZdID0gcGFpci5zcGxpdChcIjpcIik7XG4gICAgICAgICAgZnJvbnRtYXR0ZXJba2V5LnRyaW0oKSBhcyBcInRoZW1lXCJdID0gdi5qb2luKFwiOlwiKS50cmltKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGxldCBoaWdobGlnaHRzOiBTZXQ8bnVtYmVyPjtcblxuICB0cnkge1xuICAgIGxldCBoaWdobGlnaHQgPSBmcm9udG1hdHRlci5oaWdobGlnaHQ7XG4gICAgLy8gbGV0IHJhbmdlLXBhcnNlciBkbyB0aGUgaGVhdnkgbGlmdGluZy4gSXQgaGFuZGxlcyBhbGwgc3VwcG9ydGVkIGNhc2VzXG4gICAgaWYgKGhpZ2hsaWdodD8uc3RhcnRzV2l0aChcIltcIikpIHtcbiAgICAgIGhpZ2hsaWdodCA9IGhpZ2hsaWdodC5zdWJzdHJpbmcoMSwgaGlnaGxpZ2h0Lmxlbmd0aCAtIDEpO1xuICAgIH1cbiAgICBjb25zdCBwYXJzZWRSYW5nZSA9IHJhbmdlUGFyc2VyKGhpZ2hsaWdodCB8fCBcIlwiKTtcbiAgICBoaWdobGlnaHRzID0gbmV3IFNldChwYXJzZWRSYW5nZS5tYXAoKHg6IG51bWJlcikgPT4geCAtIDEpKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcHJvY2Vzcy5zdGRlcnIud3JpdGUoXG4gICAgICBgW0VSUk9SXSAke2ZpbGV9XFxuU3ludGF4IGhpZ2hsaWdodGluZyBlcnJvcjogWW91IG11c3Qgc3BlY2lmeSB0aGUgbGluZXMgdG8gaGlnaGxpZ2h0IGFzIGFuIGFycmF5IChlLmcuLCAnWzJdJykuIEZvdW5kICcke2Zyb250bWF0dGVyLmhpZ2hsaWdodH0nLlxcbmBcbiAgICApO1xuICAgIC8vIHN0aWxsIHRocm93aW5nIHRoZSBvcmlnaW5hbCBlcnJvciBiZWNhdXNlIGl0IGNvdWxkIGJlIHNvbWV0aGluZyBlbHNlXG4gICAgdGhyb3cgZXJyO1xuICB9XG5cbiAgLy8gdG9rZW5pemUgJiBidWlsZCBjdXN0b20gc3RyaW5nIG91dHB1dFxuICBsZXQgdG9rZW5zID0gUHJpc20udG9rZW5pemUoY29kZSwgZ3JhbW1hcik7XG4gIGxldCBvdXRwdXQgPSBcIlwiO1xuXG4gIGxldCB0aGVtZSA9IGZyb250bWF0dGVyLnRoZW1lIHx8IFwibGlnaHRcIjtcbiAgb3V0cHV0ICs9XG4gICAgJzxwcmUgY2xhc3M9XCJDb2RlQmxvY2sgQ29kZUJsb2NrLXdpdGgtcm93cyBDb2RlQmxvY2stc2Nyb2xscy1ob3Jpem9udGFsbHknO1xuXG4gIGlmICh0aGVtZSA9PT0gXCJsaWdodFwiKSBvdXRwdXQgKz0gXCIgQ29kZUJsb2NrLWlzLWxpZ2h0LWluLWxpZ2h0LXRoZW1lXCI7XG4gIG91dHB1dCArPSBgIENvZGVCbG9jay0tbGFuZ3VhZ2UtJHtsYW5nfVwiIGxhbmd1YWdlPVwiJHtsYW5nfVwiYDtcbiAgaWYgKGZyb250bWF0dGVyLmhlYWRlcikgb3V0cHV0ICs9IGAgdGl0bGU9XCIke2Zyb250bWF0dGVyLmhlYWRlcn1cIj5gO1xuICBlbHNlIG91dHB1dCArPSBcIj5cIlxuXG4gIGlmIChmcm9udG1hdHRlci5oZWFkZXIpXG4gICAgb3V0cHV0ICs9IGA8c3BhbiBjbGFzcz1cIkNvZGVCbG9jay0taGVhZGVyXCI+JHtmcm9udG1hdHRlci5oZWFkZXJ9PC9zcGFuPmA7XG4gIGVsc2UgaWYgKGZyb250bWF0dGVyLmZpbGVuYW1lKVxuICAgIG91dHB1dCArPSBgPHNwYW4gY2xhc3M9XCJDb2RlQmxvY2stLWZpbGVuYW1lXCI+JHtmcm9udG1hdHRlci5maWxlbmFtZX08L3NwYW4+YDtcblxuICBpZiAoZnJvbnRtYXR0ZXIucGxheWdyb3VuZCkge1xuICAgIGNvbnN0IHNlcmlhbGlzZWQgPSBhd2FpdCBjb21wcmVzc1dvcmtlcihzZXJpYWxpc2VXb3JrZXIoY29kZSkpO1xuICAgIGNvbnN0IHBsYXlncm91bmRVcmwgPSBgaHR0cHM6Ly93b3JrZXJzLmNsb3VkZmxhcmUuY29tL3BsYXlncm91bmQjJHtzZXJpYWxpc2VkfWA7XG5cbiAgICBvdXRwdXQgKz0gYDxhIHRhcmdldD1cIl9fYmxhbmtcIiBocmVmPVwiJHtwbGF5Z3JvdW5kVXJsfVwiIGNsYXNzPVwicGxheWdyb3VuZC1saW5rXCI+PHN2ZyBmaWxsPVwiY3VycmVudENvbG9yXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIj48cGF0aCBkPVwiTTYuMjEgMTIuMjkzbC0zLjIxNS00LjMgMy4xOTctNC4xNzgtLjYxNy0uODQyLTMuNjAzIDQuNzEyLS4wMDUuNjAzIDMuNjIgNC44NDcuNjIzLS44NDJ6XCI+PC9wYXRoPjxwYXRoIGQ9XCJNNy4zMzIgMS45ODhINi4wOTVsNC40NjIgNi4xLTQuMzU3IDUuOWgxLjI0NUwxMS44IDguMDkgNy4zMzIgMS45ODh6XCI+PC9wYXRoPjxwYXRoIGQ9XCJNOS43MjUgMS45ODhIOC40NzJsNC41MzMgNi4wMjctNC41MzMgNS45NzNoMS4yNTVsNC4zMDMtNS42N3YtLjYwM0w5LjcyNSAxLjk4OHpcIj48L3BhdGg+PC9zdmc+PHNwYW4+IFJ1biBXb3JrZXI8L3NwYW4+PC9hPmA7XG4gIH1cblxuICBvdXRwdXQgKz0gXCI8Y29kZT5cIjtcbiAgb3V0cHV0ICs9ICc8c3BhbiBjbGFzcz1cIkNvZGVCbG9jay0tcm93c1wiPic7XG4gIG91dHB1dCArPSAnPHNwYW4gY2xhc3M9XCJDb2RlQmxvY2stLXJvd3MtY29udGVudFwiPic7XG5cbiAgbGV0IGkgPSAwO1xuICBsZXQgcm93ID0gXCJcIjtcbiAgbGV0IGxpbmU6IExpbmU7XG4gIGxldCBsaW5lcyA9IG5vcm1hbGl6ZSh0b2tlbnMpO1xuXG4gIGZvciAoOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICBsaW5lID0gbGluZXNbaV07XG4gICAgcm93ID0gJzxzcGFuIGNsYXNzPVwiQ29kZUJsb2NrLS1yb3cnO1xuICAgIHJvdyArPSBoaWdobGlnaHRzLmhhcyhpKSA/ICcgQ29kZUJsb2NrLS1yb3ctaXMtaGlnaGxpZ2h0ZWRcIj4nIDogJ1wiPic7XG4gICAgcm93ICs9ICc8c3BhbiBjbGFzcz1cIkNvZGVCbG9jay0tcm93LWluZGljYXRvclwiPjwvc3Bhbj4nO1xuICAgIHJvdyArPSAnPGRpdiBjbGFzcz1cIkNvZGVCbG9jay0tcm93LWNvbnRlbnRcIj4nO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGluZS5sZW5ndGg7IGorKykge1xuICAgICAgcm93ICs9XG4gICAgICAgICc8c3BhbiBjbGFzcz1cIicgKyBsaW5lW2pdLnR5cGVzICsgJ1wiPicgKyBsaW5lW2pdLmNvbnRlbnQgKyBcIjwvc3Bhbj5cIjtcbiAgICB9XG4gICAgb3V0cHV0ICs9IHJvdyArIFwiPC9kaXY+PC9zcGFuPlwiO1xuICB9XG5cbiAgcmV0dXJuIG91dHB1dCArIFwiPC9zcGFuPjwvc3Bhbj48L2NvZGU+PC9wcmU+XCI7XG59XG4iLCAiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9rb2R5c2hlcm1hbmphY2tzb24vRGVza3RvcC9jbG91ZGZsYXJlLWRvY3MvYmluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMva29keXNoZXJtYW5qYWNrc29uL0Rlc2t0b3AvY2xvdWRmbGFyZS1kb2NzL2Jpbi9wbGF5Z3JvdW5kLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9rb2R5c2hlcm1hbmphY2tzb24vRGVza3RvcC9jbG91ZGZsYXJlLWRvY3MvYmluL3BsYXlncm91bmQudHNcIjtpbXBvcnQgbHpzdHJpbmcgZnJvbSBcImx6LXN0cmluZ1wiO1xuXG5leHBvcnQgZnVuY3Rpb24gc2VyaWFsaXNlV29ya2VyKGNvZGU6IHN0cmluZyk6IEZvcm1EYXRhIHtcbiAgY29uc3QgZm9ybURhdGEgPSBuZXcgRm9ybURhdGEoKTtcblxuICBjb25zdCBtZXRhZGF0YSA9IHtcbiAgICBtYWluX21vZHVsZTogXCJpbmRleC5qc1wiLFxuICB9O1xuXG4gIGZvcm1EYXRhLnNldChcbiAgICBcImluZGV4LmpzXCIsXG4gICAgbmV3IEJsb2IoW2NvZGVdLCB7XG4gICAgICB0eXBlOiBcImFwcGxpY2F0aW9uL2phdmFzY3JpcHQrbW9kdWxlXCIsXG4gICAgfSksXG4gICAgXCJpbmRleC5qc1wiXG4gICk7XG5cbiAgZm9ybURhdGEuc2V0KFxuICAgIFwibWV0YWRhdGFcIixcbiAgICBuZXcgQmxvYihbSlNPTi5zdHJpbmdpZnkobWV0YWRhdGEpXSwgeyB0eXBlOiBcImFwcGxpY2F0aW9uL2pzb25cIiB9KVxuICApO1xuXG4gIHJldHVybiBmb3JtRGF0YTtcbn1cblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGNvbXByZXNzV29ya2VyKHdvcmtlcjogRm9ybURhdGEpIHtcbiAgY29uc3Qgc2VyaWFsaXNlZFdvcmtlciA9IG5ldyBSZXNwb25zZSh3b3JrZXIpO1xuICByZXR1cm4gbHpzdHJpbmcuY29tcHJlc3NUb0VuY29kZWRVUklDb21wb25lbnQoXG4gICAgYCR7c2VyaWFsaXNlZFdvcmtlci5oZWFkZXJzLmdldChcbiAgICAgIFwiY29udGVudC10eXBlXCJcbiAgICApfToke2F3YWl0IHNlcmlhbGlzZWRXb3JrZXIudGV4dCgpfWBcbiAgKTtcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBcVUsU0FBUyxlQUFlLFdBQVc7QUFDeFcsU0FBUyxvQkFB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O0FBQUEsbUJBRVIsYUFBYTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUEsa0JBV2Q7QUFBQSxvQkFDRSxNQUFNO0FBQUEsa0JBQ1I7QUFBQSxnQkFDRjtBQUFBLGNBQ0YsT0FBTztBQUNMLHdCQUFRLE9BQU87QUFBQSxjQUNqQjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxJQUFNLGtCQUFrQixNQUFvQjtBQUMxQyxTQUFPO0FBQUEsSUFDTCxNQUFNO0FBQUEsSUFDTixNQUFNLG1CQUFtQixNQUFjO0FBQ3JDLFVBQUksQ0FBQyxLQUFLLFNBQVMsb0JBQW9CO0FBQUcsZUFBTztBQUVqRCxhQUFPLE1BQU0sUUFBUSxNQUFNO0FBQUEsUUFDekI7QUFBQSxVQUNFO0FBQUEsVUFDQTtBQUFBLFlBQ0UsU0FBUyxPQUFPLFlBQVk7QUFDMUIsb0JBQU0sT0FBTyxRQUNWLGFBQWEsV0FBVyxFQUV4QixXQUFXLFNBQVMsR0FBRztBQUUxQixrQkFBSSxLQUFLLFNBQVMsSUFBSSxHQUFHO0FBQ3ZCLHNCQUFNLElBQUksTUFBTSw2QkFBNkIsSUFBSTtBQUFBLGNBQ25EO0FBQ0Esb0JBQU0sVUFBVSxtQkFBbUIsSUFBSTtBQUN2QyxvQkFBTSxPQUFPLFVBQVU7QUFDdkIsc0JBQVE7QUFBQSxnQkFDTixNQUFNO0FBQUEsa0JBQ0o7QUFBQSxrQkFDQSxRQUFRLGFBQWEsZUFBZTtBQUFBLGtCQUNwQztBQUFBLGdCQUNGO0FBQUEsZ0JBQ0E7QUFBQSxrQkFDRSxNQUFNO0FBQUEsZ0JBQ1I7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFDRjtBQUVBLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzFCLFNBQVM7QUFBQSxJQUNQLGdCQUFnQjtBQUFBLElBQ2hCLHFCQUFxQjtBQUFBLElBQ3JCLHFCQUFxQjtBQUFBLElBQ3JCLElBQUk7QUFBQSxFQUNOO0FBQUEsRUFDQSxNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsSUFDUCxPQUFPO0FBQUEsTUFDTCxLQUFLLGNBQWMsSUFBSSxJQUFJLGdCQUFnQix3Q0FBZSxDQUFDO0FBQUEsTUFDM0QsTUFBTSxjQUFjLElBQUksSUFBSSxVQUFVLHdDQUFlLENBQUM7QUFBQSxJQUN4RDtBQUFBLEVBQ0Y7QUFBQSxFQUNBLE9BQU87QUFBQSxJQUNMLGVBQWU7QUFBQSxNQUNiLE9BQU8sS0FBSyxLQUFLLGtCQUFrQjtBQUFBLElBQ3JDO0FBQUEsSUFDQSxzQkFBc0I7QUFBQSxFQUN4QjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbImFyciIsICJoaWdobGlnaHQiXQp9Cg==
