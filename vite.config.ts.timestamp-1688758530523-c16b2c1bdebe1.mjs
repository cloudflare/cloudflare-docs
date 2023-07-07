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
  typescript: "ts",
  plaintext: "txt",
  text: "txt",
  py: "python",
  vue: "html",
  rb: "ruby"
};
var transformations = {
  js: {
    "keyword": {
      to: "declaration-keyword",
      for: /* @__PURE__ */ new Set(["const", "let", "var", "async", "await", "function", "class"])
    },
    "punctuation": {
      to: "operator",
      for: /* @__PURE__ */ new Set(["."])
    },
    "class-name": {
      to: "api",
      for: /* @__PURE__ */ new Set(["HTMLRewriter", "Request", "Response", "URL", "Error"])
    },
    "function": {
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
function highlight(code, lang, file) {
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
    process.stderr.write(`[ERROR] ${file}
Syntax highlighting error: You must specify the lines to highlight as an array (e.g., '[2]'). Found '${frontmatter.highlight}'.
`);
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
var renderCodeBlock = () => {
  return {
    name: "render-code-block",
    async transformIndexHtml(html) {
      return await rewrite(html, [
        [
          "unparsed-codeblock",
          {
            element: (element) => {
              const data = element.getAttribute("data-code").replaceAll("&#43;", " ");
              if (data.includes("&#")) {
                throw new Error("Unexpected HTML entity: " + data);
              }
              const decoded = decodeURIComponent(data);
              const code = decoded + "\n";
              element.replace(
                highlight(code, element.getAttribute("data-language"), ""),
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
  plugins: [renderCodeBlock(), hydrateVueComponents(), vue()],
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
    }
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYmluL3ByaXNtLmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9rb2R5L0Rlc2t0b3AvY2xvdWRmbGFyZS1kb2NzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMva29keS9EZXNrdG9wL2Nsb3VkZmxhcmUtZG9jcy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMva29keS9EZXNrdG9wL2Nsb3VkZmxhcmUtZG9jcy92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gXCJub2RlOnVybFwiO1xuaW1wb3J0IHsgSFRNTFJld3JpdGVyLCB0eXBlIEVsZW1lbnRIYW5kbGVycyB9IGZyb20gXCJodG1sLXJld3JpdGVyLXdhc21cIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgdHlwZSBQbHVnaW5PcHRpb24gfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IGdsb2IgZnJvbSBcImdsb2JcIjtcbmltcG9ydCB7IGhpZ2hsaWdodCB9IGZyb20gXCIuL2Jpbi9wcmlzbS5jb25maWdcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuY29uc3QgZW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcigpO1xuY29uc3QgZGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigpO1xuXG5hc3luYyBmdW5jdGlvbiByZXdyaXRlKFxuICBkb2N1bWVudDogc3RyaW5nLFxuICBoYW5kbGVyczogW3N0cmluZywgRWxlbWVudEhhbmRsZXJzXVtdXG4pIHtcbiAgbGV0IG91dHB1dCA9IFwiXCI7XG4gIGNvbnN0IHJld3JpdGVyID0gbmV3IEhUTUxSZXdyaXRlcigob3V0cHV0Q2h1bmspID0+IHtcbiAgICBvdXRwdXQgKz0gZGVjb2Rlci5kZWNvZGUob3V0cHV0Q2h1bmspO1xuICB9KTtcbiAgaGFuZGxlcnMuZm9yRWFjaCgoW2VsLCBoYW5kbGVyXSkgPT4gcmV3cml0ZXIub24oZWwsIGhhbmRsZXIpKTtcbiAgdHJ5IHtcbiAgICBhd2FpdCByZXdyaXRlci53cml0ZShlbmNvZGVyLmVuY29kZShkb2N1bWVudCkpO1xuICAgIGF3YWl0IHJld3JpdGVyLmVuZCgpO1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH0gZmluYWxseSB7XG4gICAgcmV3cml0ZXIuZnJlZSgpO1xuICB9XG59XG5cbmNvbnN0IGh5ZHJhdGVWdWVDb21wb25lbnRzID0gKCk6IFBsdWdpbk9wdGlvbiA9PiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogXCJoeWRyYXRlLXZ1ZVwiLFxuICAgIHRyYW5zZm9ybUluZGV4SHRtbDoge1xuICAgICAgb3JkZXI6IFwicHJlXCIsXG4gICAgICBoYW5kbGVyOiBhc3luYyAoaHRtbDogc3RyaW5nKSA9PiB7XG4gICAgICAgIGxldCBjb21wb25lbnRJZCA9IDE7XG4gICAgICAgIHJldHVybiBhd2FpdCByZXdyaXRlKGh0bWwsIFtcbiAgICAgICAgICBbXG4gICAgICAgICAgICBcInZ1ZS1jb21wb25lbnRcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZWxlbWVudDogKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuSWQgPSBjb21wb25lbnRJZCsrO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcIm5hbWVcIik7XG4gICAgICAgICAgICAgICAgZWxlbWVudC50YWdOYW1lID0gXCJkaXZcIjtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShcIm5hbWVcIik7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgdnVlLWMtJHtuSWR9YCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZnRlcihcbiAgICAgICAgICAgICAgICAgIGA8c2NyaXB0IHR5cGU9XCJtb2R1bGVcIj5cbiAgICAgICAgICAgICAgICAgIGltcG9ydCB7IGNyZWF0ZUFwcCB9IGZyb20gJ3Z1ZSdcbiAgICAgICAgICAgICAgICAgIGltcG9ydCBDb21wb25lbnQgZnJvbSBcIkAvJHtuYW1lfS52dWVcIlxuICAgICAgICAgICAgICAgICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2dWUtYy0ke25JZH0nKVxuICAgICAgICAgICAgICAgICAgY3JlYXRlQXBwKENvbXBvbmVudCwgey4uLnJvb3QuZGF0YXNldH0pLm1vdW50KHJvb3QsIHRydWUpXG4gICAgICAgICAgICAgIDwvc2NyaXB0PmAsXG4gICAgICAgICAgICAgICAgICB7IGh0bWw6IHRydWUgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIF0pO1xuICAgICAgfSxcbiAgICB9LFxuICB9O1xufTtcblxuY29uc3QgcmVuZGVyQ29kZUJsb2NrID0gKCk6IFBsdWdpbk9wdGlvbiA9PiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogXCJyZW5kZXItY29kZS1ibG9ja1wiLFxuICAgIGFzeW5jIHRyYW5zZm9ybUluZGV4SHRtbChodG1sOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiBhd2FpdCByZXdyaXRlKGh0bWwsIFtcbiAgICAgICAgW1xuICAgICAgICAgIFwidW5wYXJzZWQtY29kZWJsb2NrXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgZWxlbWVudDogKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb2RlXCIpIVxuICAgICAgICAgICAgICAgIC8vIEh1Z28ncyB1cmwgZW5jb2RpbmcgaXMgLi4ub2RkXG4gICAgICAgICAgICAgICAgLnJlcGxhY2VBbGwoXCImIzQzO1wiLCBcIiBcIik7XG5cbiAgICAgICAgICAgICAgaWYgKGRhdGEuaW5jbHVkZXMoXCImI1wiKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgSFRNTCBlbnRpdHk6IFwiICsgZGF0YSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29uc3QgZGVjb2RlZCA9IGRlY29kZVVSSUNvbXBvbmVudChkYXRhKTtcbiAgICAgICAgICAgICAgY29uc3QgY29kZSA9IGRlY29kZWQgKyBcIlxcblwiO1xuICAgICAgICAgICAgICBlbGVtZW50LnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0KGNvZGUsIGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1sYW5ndWFnZVwiKSEsIFwiXCIpLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGh0bWw6IHRydWUsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgXSk7XG4gICAgfSxcbiAgfTtcbn07XG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlbmRlckNvZGVCbG9jaygpLCBoeWRyYXRlVnVlQ29tcG9uZW50cygpLCB2dWUoKV0sXG4gIHJvb3Q6IFwicHVibGljXCIsXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vY29tcG9uZW50c1wiLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgIGRhdGE6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vZGF0YVwiLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiBnbG9iLnN5bmMoXCJwdWJsaWMvKiovKi5odG1sXCIpLFxuICAgIH0sXG4gIH0sXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2tvZHkvRGVza3RvcC9jbG91ZGZsYXJlLWRvY3MvYmluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMva29keS9EZXNrdG9wL2Nsb3VkZmxhcmUtZG9jcy9iaW4vcHJpc20uY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9rb2R5L0Rlc2t0b3AvY2xvdWRmbGFyZS1kb2NzL2Jpbi9wcmlzbS5jb25maWcudHNcIjtpbXBvcnQgUHJpc20gZnJvbSAncHJpc21qcyc7XG5pbXBvcnQgcmFuZ2VQYXJzZXIgZnJvbSAncGFyc2UtbnVtZXJpYy1yYW5nZSc7XG5cbmltcG9ydCB0eXBlIHsgVG9rZW4sIFRva2VuU3RyZWFtIH0gZnJvbSAncHJpc21qcyc7XG5cbmdsb2JhbFRoaXMuUHJpc20gPSBQcmlzbTtcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWJhc2gubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWMubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNzaGFycC5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY3N2Lm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1kaWZmLm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1naXQubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWdvLm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1ncmFwaHFsLm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1oY2wubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWh0dHAubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWluaS5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tamF2YS5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tanNvbi5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tanN4Lm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1tYXJrZG93bi5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcGVybC5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcGhwLm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1weXRob24ubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXJ1YnkubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXJ1c3QubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXNxbC5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tdHlwZXNjcmlwdC5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tdG9tbC5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20teWFtbC5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20ta290bGluLm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1zd2lmdC5taW4uanMnO1xuXG4vLyBDdXN0b20gYHNoZWxsYCBncmFtbWFyXG5QcmlzbS5sYW5ndWFnZXMuc2ggPSB7XG4gIGNvbW1lbnQ6IHtcbiAgICBwYXR0ZXJuOiAvKF58W14ne1xcXFwkXSkjLiovLFxuICAgIGFsaWFzOiAndW5zZWxlY3RhYmxlJyxcbiAgICBsb29rYmVoaW5kOiB0cnVlLFxuICB9LFxuXG4gIGRpcmVjdG9yeToge1xuICAgIHBhdHRlcm46IC9eW15cXHJcXG4kKiFdKyg/PVskXSkvbSxcbiAgICBhbGlhczogJ3Vuc2VsZWN0YWJsZScsXG4gIH0sXG5cbiAgY29tbWFuZDoge1xuICAgIHBhdHRlcm46IC9bJF0oPzpbXlxcclxcbl0pKy8sXG4gICAgaW5zaWRlOiB7XG4gICAgICBwcm9tcHQ6IHtcbiAgICAgICAgcGF0dGVybjogL15bJF0gLyxcbiAgICAgICAgYWxpYXM6ICd1bnNlbGVjdGFibGUnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufTtcblxuLy8gUHJpc20gbGFuZ3VhZ2UgYWxpYXNlc1xuZXhwb3J0IGNvbnN0IGxhbmdzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICB0ZjogJ2hjbCcsIC8vIHRlcnJhZm9ybSAtPiBoYXNoaWNvcnAgY29uZmlnIGxhbmdcbiAgcnM6ICdydXN0JyxcbiAgc2hlbGw6ICdzaCcsXG4gIGN1cmw6ICdiYXNoJyxcbiAgZ3FsOiAnZ3JhcGhxbCcsXG4gIHN2ZWx0ZTogJ2h0bWwnLFxuICBqYXZhc2NyaXB0OiAnanMnLFxuICB0eXBlc2NyaXB0OiAndHMnLFxuICBwbGFpbnRleHQ6ICd0eHQnLFxuICB0ZXh0OiAndHh0JyxcbiAgcHk6ICdweXRob24nLFxuICB2dWU6ICdodG1sJyxcbiAgcmI6ICdydWJ5Jyxcbn07XG5cbi8vIEN1c3RvbSB0b2tlbiB0cmFuc2Zvcm1zXG5jb25zdCB0cmFuc2Zvcm1hdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7XG4gIGpzOiB7XG4gICAgJ2tleXdvcmQnOiB7XG4gICAgICB0bzogJ2RlY2xhcmF0aW9uLWtleXdvcmQnLFxuICAgICAgZm9yOiBuZXcgU2V0KFsnY29uc3QnLCAnbGV0JywgJ3ZhcicsICdhc3luYycsICdhd2FpdCcsICdmdW5jdGlvbicsICdjbGFzcyddKSxcbiAgICB9LFxuICAgICdwdW5jdHVhdGlvbic6IHtcbiAgICAgIHRvOiAnb3BlcmF0b3InLFxuICAgICAgZm9yOiBuZXcgU2V0KFsnLiddKSxcbiAgICB9LFxuICAgICdjbGFzcy1uYW1lJzoge1xuICAgICAgdG86ICdhcGknLFxuICAgICAgZm9yOiBuZXcgU2V0KFsnSFRNTFJld3JpdGVyJywgJ1JlcXVlc3QnLCAnUmVzcG9uc2UnLCAnVVJMJywgJ0Vycm9yJ10pLFxuICAgIH0sXG4gICAgJ2Z1bmN0aW9uJzoge1xuICAgICAgdG86ICdidWlsdGluJyxcbiAgICAgIGZvcjogbmV3IFNldChbXG4gICAgICAgICdmZXRjaCcsXG4gICAgICAgICdjb25zb2xlJyxcbiAgICAgICAgJ2FkZEV2ZW50TGlzdGVuZXInLFxuICAgICAgICAnYXRvYicsXG4gICAgICAgICdidG9hJyxcbiAgICAgICAgJ3NldEludGVydmFsJyxcbiAgICAgICAgJ2NsZWFySW50ZXJ2YWwnLFxuICAgICAgICAnc2V0VGltZW91dCcsXG4gICAgICAgICdjbGVhclRpbWVvdXQnLFxuICAgICAgXSksXG4gICAgfSxcbiAgfSxcbn07XG5cbnRyYW5zZm9ybWF0aW9ucy50cyA9IHRyYW5zZm9ybWF0aW9ucy5qcztcblxudHJhbnNmb3JtYXRpb25zLmh0bWwgPSB7XG4gIGtleXdvcmQ6IHRyYW5zZm9ybWF0aW9ucy5qcy5rZXl3b3JkLFxufTtcblxuaW50ZXJmYWNlIE5vZGUge1xuICB0eXBlczogc3RyaW5nO1xuICBjb250ZW50OiBzdHJpbmc7XG59XG5cbnR5cGUgTGluZSA9IE5vZGVbXTtcblxuY29uc3QgRVNDQVBFID0gL1smXCI8Pl0vZztcbmNvbnN0IENIQVJTID0ge1xuICAnXCInOiAnJnF1b3Q7JyxcbiAgJyYnOiAnJmFtcDsnLFxuICAnPCc6ICcmbHQ7JyxcbiAgJz4nOiAnJmd0OycsXG59O1xuXG4vLyBAc2VlIGx1a2VlZC90ZW1wdXJhXG5mdW5jdGlvbiB0b0VzY2FwZSh2YWx1ZTogc3RyaW5nKSB7XG4gIGxldCB0bXAgPSAwO1xuICBsZXQgb3V0ID0gJyc7XG4gIGxldCBsYXN0ID0gKEVTQ0FQRS5sYXN0SW5kZXggPSAwKTtcbiAgd2hpbGUgKEVTQ0FQRS50ZXN0KHZhbHVlKSkge1xuICAgIHRtcCA9IEVTQ0FQRS5sYXN0SW5kZXggLSAxO1xuICAgIG91dCArPSB2YWx1ZS5zdWJzdHJpbmcobGFzdCwgdG1wKSArIENIQVJTW3ZhbHVlW3RtcF0gYXMga2V5b2YgdHlwZW9mIENIQVJTXTtcbiAgICBsYXN0ID0gdG1wICsgMTtcbiAgfVxuICByZXR1cm4gb3V0ICsgdmFsdWUuc3Vic3RyaW5nKGxhc3QpO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemUodG9rZW5zOiAoVG9rZW4gfCBzdHJpbmcpW10pIHtcbiAgbGV0IGxpbmU6IExpbmUgPSBbXTtcbiAgbGV0IGxpbmVzOiBMaW5lW10gPSBbXTtcblxuICBmdW5jdGlvbiBsb29wKHR5cGVzOiBzdHJpbmcsIGl0ZW06IFRva2VuU3RyZWFtKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICAgIGl0ZW0uZm9yRWFjaCh4ID0+IGxvb3AodHlwZXMsIHgpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xuICAgICAgdHlwZXMgPSB0eXBlcyB8fCAnQ29kZUJsb2NrLS10b2tlbi1wbGFpbic7XG5cbiAgICAgIGlmIChpdGVtID09PSAnJykge1xuICAgICAgICAvLyBpZ25vcmVcbiAgICAgIH0gZWxzZSBpZiAoaXRlbSA9PT0gJ1xcbicpIHtcbiAgICAgICAgbGluZS5wdXNoKHsgdHlwZXMsIGNvbnRlbnQ6IGl0ZW0gfSk7XG4gICAgICAgIGxpbmVzLnB1c2gobGluZSk7XG4gICAgICAgIGxpbmUgPSBbXTtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbSA9PT0gJ1xcblxcbicpIHtcbiAgICAgICAgbGluZS5wdXNoKHsgdHlwZXMsIGNvbnRlbnQ6ICdcXG4nIH0pO1xuICAgICAgICBsaW5lcy5wdXNoKGxpbmUpO1xuXG4gICAgICAgIGxpbmUgPSBbeyB0eXBlczogJ0NvZGVCbG9jay0tdG9rZW4tcGxhaW4nLCBjb250ZW50OiAnXFxuJyB9XTtcbiAgICAgICAgbGluZXMucHVzaChsaW5lKTtcblxuICAgICAgICBsaW5lID0gW107XG4gICAgICB9IGVsc2UgaWYgKGl0ZW0uaW5jbHVkZXMoJ1xcbicpKSB7XG4gICAgICAgIGl0ZW0uc3BsaXQoL1xccj9cXG4vZykuZm9yRWFjaCgodHh0LCBpZHgsIGFycikgPT4ge1xuICAgICAgICAgIGlmICghdHh0ICYmICFpZHggJiYgaWR4IDwgYXJyLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAgIGxldCBjb250ZW50ID0gdHh0ID8gdG9Fc2NhcGUodHh0KSA6ICdcXG4nO1xuXG4gICAgICAgICAgaWYgKGlkeCA+IDApIHtcbiAgICAgICAgICAgIGxpbmVzLnB1c2gobGluZSk7XG4gICAgICAgICAgICBsaW5lID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIGxpbmUucHVzaCh7IHR5cGVzLCBjb250ZW50IH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBjb250ZW50ID0gdG9Fc2NhcGUoaXRlbSk7XG4gICAgICAgIGxpbmUucHVzaCh7IHR5cGVzLCBjb250ZW50IH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXRlbSkge1xuICAgICAgaWYgKHR5cGVzKSB0eXBlcyArPSAnICc7XG4gICAgICB0eXBlcyArPSAnQ29kZUJsb2NrLS10b2tlbi0nICsgaXRlbS50eXBlO1xuXG4gICAgICBpZiAoaXRlbS5hbGlhcykge1xuICAgICAgICAoW10gYXMgc3RyaW5nW10pLmNvbmNhdChpdGVtLmFsaWFzKS5mb3JFYWNoKHR0ID0+IHtcbiAgICAgICAgICBpZiAoIXR5cGVzLmluY2x1ZGVzKHR0KSkge1xuICAgICAgICAgICAgaWYgKHR5cGVzKSB0eXBlcyArPSAnICc7XG4gICAgICAgICAgICB0eXBlcyArPSAnQ29kZUJsb2NrLS10b2tlbi0nICsgdHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGxvb3AodHlwZXMsIGl0ZW0uY29udGVudCk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICBsb29wKCcnLCB0b2tlbnNbaV0pO1xuICB9XG5cbiAgaWYgKGxpbmUubGVuZ3RoID4gMCkge1xuICAgIGxpbmVzLnB1c2gobGluZSk7XG4gIH1cblxuICBsZXQgYXJyOiBMaW5lW10gPSBbXTtcbiAgd2hpbGUgKChsaW5lID0gbGluZXMuc2hpZnQoKSkpIHtcbiAgICBpZiAobGluZS5sZW5ndGggPiAxICYmIGxpbmVbMF0uY29udGVudCA9PT0gJ1xcbicpIHtcbiAgICAgIC8vIHJlbW92ZSBleHRyYSBsZWFkaW5nIFwiXFxuXCIgaXRlbXMgZm9yIG5vbi13aGl0ZXNwYWNlIGxpbmVzXG4gICAgICBsaW5lWzBdLmNvbnRlbnQgPSBcIlwiXG4gICAgICBhcnIucHVzaChsaW5lKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcnIucHVzaChsaW5lKTtcbiAgICB9XG4gIH1cblxuICBsaW5lcyA9IGFycjtcblxuICAvLyBjaGVjayBmb3IgdXNlbGVzcyBuZXdsaW5lXG4gIC8vIH4+IGxhc3QgbGluZSB3aWxsIGJlIHNpbmdsZS1pdGVtIEFycmF5XG4gIGxldCBsYXN0ID0gbGluZXMucG9wKCk7XG4gIGlmIChsYXN0Lmxlbmd0aCAhPT0gMSB8fCBsYXN0WzBdLmNvbnRlbnQudHJpbSgpLmxlbmd0aCA+IDEpIHtcbiAgICBsaW5lcy5wdXNoKGxhc3QpOyAvLyBhZGQgaXQgYmFjaywgd2FzIHVzZWZ1bFxuICB9XG5cbiAgcmV0dXJuIGxpbmVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGlnaGxpZ2h0KGNvZGU6IHN0cmluZywgbGFuZzogc3RyaW5nLCBmaWxlOiBzdHJpbmcpOiBzdHJpbmcge1xuICBsYW5nID0gbGFuZ3NbbGFuZ10gfHwgbGFuZyB8fCAndHh0JztcbiAgbGV0IGdyYW1tYXIgPSBQcmlzbS5sYW5ndWFnZXNbbGFuZy50b0xvd2VyQ2FzZSgpXTtcblxuICBpZiAoIWdyYW1tYXIpIHtcbiAgICBjb25zb2xlLndhcm4oJ1twcmlzbV0gTWlzc2luZyBcIiVzXCIgZ3JhbW1hcjsgdXNpbmcgXCJ0eHRcIiBmYWxsYmFjaycsIGxhbmcpO1xuICAgIGdyYW1tYXIgPSBQcmlzbS5sYW5ndWFnZXMudHh0O1xuICB9XG5cbiAgbGV0IGZyb250bWF0dGVyOiB7XG4gICAgdGhlbWU/OiBzdHJpbmcgfCAnbGlnaHQnO1xuICAgIGhpZ2hsaWdodD86IGBbJHtzdHJpbmd9XWAgfCBzdHJpbmc7XG4gICAgZmlsZW5hbWU/OiBzdHJpbmc7XG4gICAgaGVhZGVyPzogc3RyaW5nO1xuICB9ID0ge307XG5cbiAgLy8gQ2hlY2sgZm9yIGEgWUFNTCBmcm9udG1hdHRlcixcbiAgLy8gYW5kIGVuc3VyZSBpdCdzIG5vdCBzb21ldGhpbmcgbGlrZSAtLS0tLUJFR0lOIENFUlRJRklDQVRFLS0tLS1cbiAgaWYgKGNvZGUuc3Vic3RyaW5nKDAsIDMpID09PSAnLS0tJyAmJiBjb2RlWzNdICE9ICctJykge1xuICAgIGxldCBpbmRleCA9IGNvZGUuaW5kZXhPZignLS0tJywgMyk7XG4gICAgaWYgKGluZGV4ID4gMykge1xuICAgICAgaW5kZXggKz0gMztcbiAgICAgIGxldCBjb250ZW50ID0gY29kZS5zdWJzdHJpbmcoMCwgaW5kZXgpO1xuICAgICAgY29kZSA9IGNvZGUuc3Vic3RyaW5nKGluZGV4KS5yZXBsYWNlKC9eKFxccj9cXG4pKy8sICcnKTtcblxuICAgICAgLy8gVE9ETzogcGFzcyBpbiBgdXRpbHMuZnJvbnRtYXR0ZXJgIGhlcmVcbiAgICAgIC8vIGZyb250bWF0dGVyID0gdXRpbHMuZnJvbnRtYXR0ZXIoY29udGVudCk7XG5cbiAgICAgIGxldCBtYXRjaCA9IC9eLS0tXFxyP1xcbihbXFxzXFxTXSs/KVxccj9cXG4tLS0vLmV4ZWMoY29udGVudCk7XG4gICAgICBpZiAobWF0Y2ggIT0gbnVsbClcbiAgICAgICAgbWF0Y2hbMV0uc3BsaXQoJ1xcbicpLmZvckVhY2gocGFpciA9PiB7XG4gICAgICAgICAgbGV0IFtrZXksIC4uLnZdID0gcGFpci5zcGxpdCgnOicpO1xuICAgICAgICAgIGZyb250bWF0dGVyW2tleS50cmltKCkgYXMgJ3RoZW1lJ10gPSB2LmpvaW4oJzonKS50cmltKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGxldCBoaWdobGlnaHRzOiBTZXQ8bnVtYmVyPjtcblxuICB0cnkge1xuICAgIGxldCBoaWdobGlnaHQgPSBmcm9udG1hdHRlci5oaWdobGlnaHQ7XG4gICAgLy8gbGV0IHJhbmdlLXBhcnNlciBkbyB0aGUgaGVhdnkgbGlmdGluZy4gSXQgaGFuZGxlcyBhbGwgc3VwcG9ydGVkIGNhc2VzXG4gICAgaWYgKGhpZ2hsaWdodD8uc3RhcnRzV2l0aCgnWycpKSB7XG4gICAgICBoaWdobGlnaHQgPSBoaWdobGlnaHQuc3Vic3RyaW5nKDEsIGhpZ2hsaWdodC5sZW5ndGggLSAxKTtcbiAgICB9XG4gICAgY29uc3QgcGFyc2VkUmFuZ2UgPSByYW5nZVBhcnNlcihoaWdobGlnaHQgfHwgJycpXG4gICAgaGlnaGxpZ2h0cyA9IG5ldyBTZXQocGFyc2VkUmFuZ2UubWFwKCh4OiBudW1iZXIpID0+IHggLSAxKSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHByb2Nlc3Muc3RkZXJyLndyaXRlKGBbRVJST1JdICR7ZmlsZX1cXG5TeW50YXggaGlnaGxpZ2h0aW5nIGVycm9yOiBZb3UgbXVzdCBzcGVjaWZ5IHRoZSBsaW5lcyB0byBoaWdobGlnaHQgYXMgYW4gYXJyYXkgKGUuZy4sICdbMl0nKS4gRm91bmQgJyR7ZnJvbnRtYXR0ZXIuaGlnaGxpZ2h0fScuXFxuYCk7XG4gICAgLy8gc3RpbGwgdGhyb3dpbmcgdGhlIG9yaWdpbmFsIGVycm9yIGJlY2F1c2UgaXQgY291bGQgYmUgc29tZXRoaW5nIGVsc2VcbiAgICB0aHJvdyBlcnI7XG4gIH1cblxuICAvLyB0b2tlbml6ZSAmIGJ1aWxkIGN1c3RvbSBzdHJpbmcgb3V0cHV0XG4gIGxldCB0b2tlbnMgPSBQcmlzbS50b2tlbml6ZShjb2RlLCBncmFtbWFyKTtcbiAgbGV0IG91dHB1dCA9ICcnO1xuXG4gIGxldCB0aGVtZSA9IGZyb250bWF0dGVyLnRoZW1lIHx8ICdsaWdodCc7XG4gIG91dHB1dCArPSAnPHByZSBjbGFzcz1cIkNvZGVCbG9jayBDb2RlQmxvY2std2l0aC1yb3dzIENvZGVCbG9jay1zY3JvbGxzLWhvcml6b250YWxseSc7XG5cbiAgaWYgKHRoZW1lID09PSAnbGlnaHQnKSBvdXRwdXQgKz0gJyBDb2RlQmxvY2staXMtbGlnaHQtaW4tbGlnaHQtdGhlbWUnO1xuICBvdXRwdXQgKz0gYCBDb2RlQmxvY2stLWxhbmd1YWdlLSR7bGFuZ31cIiBsYW5ndWFnZT1cIiR7bGFuZ31cIj5gO1xuXG4gIGlmIChmcm9udG1hdHRlci5oZWFkZXIpIG91dHB1dCArPSBgPHNwYW4gY2xhc3M9XCJDb2RlQmxvY2stLWhlYWRlclwiPiR7ZnJvbnRtYXR0ZXIuaGVhZGVyfTwvc3Bhbj5gO1xuICBlbHNlIGlmIChmcm9udG1hdHRlci5maWxlbmFtZSlcbiAgICBvdXRwdXQgKz0gYDxzcGFuIGNsYXNzPVwiQ29kZUJsb2NrLS1maWxlbmFtZVwiPiR7ZnJvbnRtYXR0ZXIuZmlsZW5hbWV9PC9zcGFuPmA7XG5cbiAgb3V0cHV0ICs9ICc8Y29kZT4nO1xuICBvdXRwdXQgKz0gJzxzcGFuIGNsYXNzPVwiQ29kZUJsb2NrLS1yb3dzXCI+JztcbiAgb3V0cHV0ICs9ICc8c3BhbiBjbGFzcz1cIkNvZGVCbG9jay0tcm93cy1jb250ZW50XCI+JztcblxuICBsZXQgaSA9IDA7XG4gIGxldCByb3cgPSAnJztcbiAgbGV0IGxpbmU6IExpbmU7XG4gIGxldCBsaW5lcyA9IG5vcm1hbGl6ZSh0b2tlbnMpO1xuXG4gIGZvciAoOyBpIDwgbGluZXMubGVuZ3RoOyBpKyspIHtcbiAgICBsaW5lID0gbGluZXNbaV07XG4gICAgcm93ID0gJzxzcGFuIGNsYXNzPVwiQ29kZUJsb2NrLS1yb3cnO1xuICAgIHJvdyArPSBoaWdobGlnaHRzLmhhcyhpKSA/ICcgQ29kZUJsb2NrLS1yb3ctaXMtaGlnaGxpZ2h0ZWRcIj4nIDogJ1wiPic7XG4gICAgcm93ICs9ICc8c3BhbiBjbGFzcz1cIkNvZGVCbG9jay0tcm93LWluZGljYXRvclwiPjwvc3Bhbj4nO1xuICAgIHJvdyArPSAnPGRpdiBjbGFzcz1cIkNvZGVCbG9jay0tcm93LWNvbnRlbnRcIj4nO1xuICAgIGZvciAobGV0IGogPSAwOyBqIDwgbGluZS5sZW5ndGg7IGorKykge1xuICAgICAgcm93ICs9ICc8c3BhbiBjbGFzcz1cIicgKyBsaW5lW2pdLnR5cGVzICsgJ1wiPicgKyBsaW5lW2pdLmNvbnRlbnQgKyAnPC9zcGFuPic7XG4gICAgfVxuICAgIG91dHB1dCArPSByb3cgKyAnPC9kaXY+PC9zcGFuPic7XG4gIH1cblxuICByZXR1cm4gb3V0cHV0ICsgJzwvc3Bhbj48L3NwYW4+PC9jb2RlPjwvcHJlPic7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQTJSLFNBQVMsZUFBZSxXQUFXO0FBQzlULFNBQVMsb0JBQTBDO0FBQ25ELFNBQVMsb0JBQXVDO0FBQ2hELE9BQU8sVUFBVTs7O0FDSHdSLE9BQU8sV0FBVztBQUMzVCxPQUFPLGlCQUFpQjtBQUt4QixPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFD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YSxNQUFNO0FBQ3hDLHdCQUFRLFVBQVU7QUFDbEIsd0JBQVEsZ0JBQWdCLE1BQU07QUFDOUIsd0JBQVEsYUFBYSxNQUFNLFNBQVMsS0FBSztBQUN6Qyx3QkFBUTtBQUFBLGtCQUNOO0FBQUE7QUFBQSw2Q0FFMkI7QUFBQSxnRUFDbUI7QUFBQTtBQUFBO0FBQUEsa0JBRzlDLEVBQUUsTUFBTSxLQUFLO0FBQUEsZ0JBQ2Y7QUFBQSxjQUNGO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGLENBQUM7QUFBQSxNQUNIO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFDRjtBQUVBLElBQU0sa0JBQWtCLE1BQW9CO0FBQzFDLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLE1BQU0sbUJBQW1CLE1BQWM7QUFDckMsYUFBTyxNQUFNLFFBQVEsTUFBTTtBQUFBLFFBQ3pCO0FBQUEsVUFDRTtBQUFBLFVBQ0E7QUFBQSxZQUNFLFNBQVMsQ0FBQyxZQUFZO0FBQ3BCLG9CQUFNLE9BQU8sUUFDVixhQUFhLFdBQVcsRUFFeEIsV0FBVyxTQUFTLEdBQUc7QUFFMUIsa0JBQUksS0FBSyxTQUFTLElBQUksR0FBRztBQUN2QixzQkFBTSxJQUFJLE1BQU0sNkJBQTZCLElBQUk7QUFBQSxjQUNuRDtBQUNBLG9CQUFNLFVBQVUsbUJBQW1CLElBQUk7QUFDdkMsb0JBQU0sT0FBTyxVQUFVO0FBQ3ZCLHNCQUFRO0FBQUEsZ0JBQ04sVUFBVSxNQUFNLFFBQVEsYUFBYSxlQUFlLEdBQUksRUFBRTtBQUFBLGdCQUMxRDtBQUFBLGtCQUNFLE1BQU07QUFBQSxnQkFDUjtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUyxDQUFDLGdCQUFnQixHQUFHLHFCQUFxQixHQUFHLElBQUksQ0FBQztBQUFBLEVBQzFELE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksZ0JBQWdCLHdDQUFlLENBQUM7QUFBQSxNQUMzRCxNQUFNLGNBQWMsSUFBSSxJQUFJLFVBQVUsd0NBQWUsQ0FBQztBQUFBLElBQ3hEO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsT0FBTyxLQUFLLEtBQUssa0JBQWtCO0FBQUEsSUFDckM7QUFBQSxFQUNGO0FBQ0YsQ0FBQzsiLAogICJuYW1lcyI6IFsiYXJyIiwgImhpZ2hsaWdodCJdCn0K
