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
  else
    output += `<span class="CodeBlock--header"><br/></span>`;
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYmluL3ByaXNtLmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9rb2R5L0Rlc2t0b3AvY2xvdWRmbGFyZS1kb2NzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMva29keS9EZXNrdG9wL2Nsb3VkZmxhcmUtZG9jcy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMva29keS9EZXNrdG9wL2Nsb3VkZmxhcmUtZG9jcy92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gXCJub2RlOnVybFwiO1xuaW1wb3J0IHsgSFRNTFJld3JpdGVyLCB0eXBlIEVsZW1lbnRIYW5kbGVycyB9IGZyb20gXCJodG1sLXJld3JpdGVyLXdhc21cIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgdHlwZSBQbHVnaW5PcHRpb24gfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IGdsb2IgZnJvbSBcImdsb2JcIjtcbmltcG9ydCB7IGhpZ2hsaWdodCB9IGZyb20gXCIuL2Jpbi9wcmlzbS5jb25maWdcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuY29uc3QgZW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcigpO1xuY29uc3QgZGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigpO1xuXG5hc3luYyBmdW5jdGlvbiByZXdyaXRlKFxuICBkb2N1bWVudDogc3RyaW5nLFxuICBoYW5kbGVyczogW3N0cmluZywgRWxlbWVudEhhbmRsZXJzXVtdXG4pIHtcbiAgbGV0IG91dHB1dCA9IFwiXCI7XG4gIGNvbnN0IHJld3JpdGVyID0gbmV3IEhUTUxSZXdyaXRlcigob3V0cHV0Q2h1bmspID0+IHtcbiAgICBvdXRwdXQgKz0gZGVjb2Rlci5kZWNvZGUob3V0cHV0Q2h1bmspO1xuICB9KTtcbiAgaGFuZGxlcnMuZm9yRWFjaCgoW2VsLCBoYW5kbGVyXSkgPT4gcmV3cml0ZXIub24oZWwsIGhhbmRsZXIpKTtcbiAgdHJ5IHtcbiAgICBhd2FpdCByZXdyaXRlci53cml0ZShlbmNvZGVyLmVuY29kZShkb2N1bWVudCkpO1xuICAgIGF3YWl0IHJld3JpdGVyLmVuZCgpO1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH0gZmluYWxseSB7XG4gICAgcmV3cml0ZXIuZnJlZSgpO1xuICB9XG59XG5cbmNvbnN0IGh5ZHJhdGVWdWVDb21wb25lbnRzID0gKCk6IFBsdWdpbk9wdGlvbiA9PiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogXCJoeWRyYXRlLXZ1ZVwiLFxuICAgIHRyYW5zZm9ybUluZGV4SHRtbDoge1xuICAgICAgb3JkZXI6IFwicHJlXCIsXG4gICAgICBoYW5kbGVyOiBhc3luYyAoaHRtbDogc3RyaW5nKSA9PiB7XG4gICAgICAgIGxldCBjb21wb25lbnRJZCA9IDE7XG4gICAgICAgIHJldHVybiBhd2FpdCByZXdyaXRlKGh0bWwsIFtcbiAgICAgICAgICBbXG4gICAgICAgICAgICBcInZ1ZS1jb21wb25lbnRcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZWxlbWVudDogKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuSWQgPSBjb21wb25lbnRJZCsrO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcIm5hbWVcIik7XG4gICAgICAgICAgICAgICAgZWxlbWVudC50YWdOYW1lID0gXCJkaXZcIjtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShcIm5hbWVcIik7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgdnVlLWMtJHtuSWR9YCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZnRlcihcbiAgICAgICAgICAgICAgICAgIGA8c2NyaXB0IHR5cGU9XCJtb2R1bGVcIj5cbiAgICAgICAgICAgICAgICAgIGltcG9ydCB7IGNyZWF0ZUFwcCB9IGZyb20gJ3Z1ZSdcbiAgICAgICAgICAgICAgICAgIGltcG9ydCBDb21wb25lbnQgZnJvbSBcIkAvJHtuYW1lfS52dWVcIlxuICAgICAgICAgICAgICAgICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2dWUtYy0ke25JZH0nKVxuICAgICAgICAgICAgICAgICAgY3JlYXRlQXBwKENvbXBvbmVudCwgey4uLnJvb3QuZGF0YXNldH0pLm1vdW50KHJvb3QsIHRydWUpXG4gICAgICAgICAgICAgIDwvc2NyaXB0PmAsXG4gICAgICAgICAgICAgICAgICB7IGh0bWw6IHRydWUgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIF0pO1xuICAgICAgfSxcbiAgICB9LFxuICB9O1xufTtcblxuY29uc3QgcmVuZGVyQ29kZUJsb2NrID0gKCk6IFBsdWdpbk9wdGlvbiA9PiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogXCJyZW5kZXItY29kZS1ibG9ja1wiLFxuICAgIGFzeW5jIHRyYW5zZm9ybUluZGV4SHRtbChodG1sOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiBhd2FpdCByZXdyaXRlKGh0bWwsIFtcbiAgICAgICAgW1xuICAgICAgICAgIFwidW5wYXJzZWQtY29kZWJsb2NrXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgZWxlbWVudDogKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb2RlXCIpIVxuICAgICAgICAgICAgICAgIC8vIEh1Z28ncyB1cmwgZW5jb2RpbmcgaXMgLi4ub2RkXG4gICAgICAgICAgICAgICAgLnJlcGxhY2VBbGwoXCImIzQzO1wiLCBcIiBcIik7XG5cbiAgICAgICAgICAgICAgaWYgKGRhdGEuaW5jbHVkZXMoXCImI1wiKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgSFRNTCBlbnRpdHk6IFwiICsgZGF0YSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29uc3QgZGVjb2RlZCA9IGRlY29kZVVSSUNvbXBvbmVudChkYXRhKTtcbiAgICAgICAgICAgICAgY29uc3QgY29kZSA9IGRlY29kZWQgKyBcIlxcblwiO1xuICAgICAgICAgICAgICBlbGVtZW50LnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0KGNvZGUsIGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1sYW5ndWFnZVwiKSEsIFwiXCIpLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGh0bWw6IHRydWUsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgXSk7XG4gICAgfSxcbiAgfTtcbn07XG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlbmRlckNvZGVCbG9jaygpLCBoeWRyYXRlVnVlQ29tcG9uZW50cygpLCB2dWUoKV0sXG4gIHJvb3Q6IFwicHVibGljXCIsXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vY29tcG9uZW50c1wiLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgIGRhdGE6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vZGF0YVwiLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiBnbG9iLnN5bmMoXCJwdWJsaWMvKiovKi5odG1sXCIpLFxuICAgIH0sXG4gIH0sXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2tvZHkvRGVza3RvcC9jbG91ZGZsYXJlLWRvY3MvYmluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMva29keS9EZXNrdG9wL2Nsb3VkZmxhcmUtZG9jcy9iaW4vcHJpc20uY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9rb2R5L0Rlc2t0b3AvY2xvdWRmbGFyZS1kb2NzL2Jpbi9wcmlzbS5jb25maWcudHNcIjtpbXBvcnQgUHJpc20gZnJvbSAncHJpc21qcyc7XG5pbXBvcnQgcmFuZ2VQYXJzZXIgZnJvbSAncGFyc2UtbnVtZXJpYy1yYW5nZSc7XG5cbmltcG9ydCB0eXBlIHsgVG9rZW4sIFRva2VuU3RyZWFtIH0gZnJvbSAncHJpc21qcyc7XG5cbmdsb2JhbFRoaXMuUHJpc20gPSBQcmlzbTtcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWJhc2gubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWMubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNzaGFycC5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY3N2Lm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1kaWZmLm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1naXQubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWdvLm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1ncmFwaHFsLm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1oY2wubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWh0dHAubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWluaS5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tamF2YS5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tanNvbi5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tanN4Lm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1tYXJrZG93bi5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcGVybC5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcGhwLm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1weXRob24ubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXJ1YnkubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXJ1c3QubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXNxbC5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tdHlwZXNjcmlwdC5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tdG9tbC5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20teWFtbC5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20ta290bGluLm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1zd2lmdC5taW4uanMnO1xuXG4vLyBDdXN0b20gYHNoZWxsYCBncmFtbWFyXG5QcmlzbS5sYW5ndWFnZXMuc2ggPSB7XG4gIGNvbW1lbnQ6IHtcbiAgICBwYXR0ZXJuOiAvKF58W14ne1xcXFwkXSkjLiovLFxuICAgIGFsaWFzOiAndW5zZWxlY3RhYmxlJyxcbiAgICBsb29rYmVoaW5kOiB0cnVlLFxuICB9LFxuXG4gIGRpcmVjdG9yeToge1xuICAgIHBhdHRlcm46IC9eW15cXHJcXG4kKiFdKyg/PVskXSkvbSxcbiAgICBhbGlhczogJ3Vuc2VsZWN0YWJsZScsXG4gIH0sXG5cbiAgY29tbWFuZDoge1xuICAgIHBhdHRlcm46IC9bJF0oPzpbXlxcclxcbl0pKy8sXG4gICAgaW5zaWRlOiB7XG4gICAgICBwcm9tcHQ6IHtcbiAgICAgICAgcGF0dGVybjogL15bJF0gLyxcbiAgICAgICAgYWxpYXM6ICd1bnNlbGVjdGFibGUnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufTtcblxuLy8gUHJpc20gbGFuZ3VhZ2UgYWxpYXNlc1xuZXhwb3J0IGNvbnN0IGxhbmdzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICB0ZjogJ2hjbCcsIC8vIHRlcnJhZm9ybSAtPiBoYXNoaWNvcnAgY29uZmlnIGxhbmdcbiAgcnM6ICdydXN0JyxcbiAgc2hlbGw6ICdzaCcsXG4gIGN1cmw6ICdiYXNoJyxcbiAgZ3FsOiAnZ3JhcGhxbCcsXG4gIHN2ZWx0ZTogJ2h0bWwnLFxuICBqYXZhc2NyaXB0OiAnanMnLFxuICB0eXBlc2NyaXB0OiAndHMnLFxuICBwbGFpbnRleHQ6ICd0eHQnLFxuICB0ZXh0OiAndHh0JyxcbiAgcHk6ICdweXRob24nLFxuICB2dWU6ICdodG1sJyxcbiAgcmI6ICdydWJ5Jyxcbn07XG5cbi8vIEN1c3RvbSB0b2tlbiB0cmFuc2Zvcm1zXG5jb25zdCB0cmFuc2Zvcm1hdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7XG4gIGpzOiB7XG4gICAgJ2tleXdvcmQnOiB7XG4gICAgICB0bzogJ2RlY2xhcmF0aW9uLWtleXdvcmQnLFxuICAgICAgZm9yOiBuZXcgU2V0KFsnY29uc3QnLCAnbGV0JywgJ3ZhcicsICdhc3luYycsICdhd2FpdCcsICdmdW5jdGlvbicsICdjbGFzcyddKSxcbiAgICB9LFxuICAgICdwdW5jdHVhdGlvbic6IHtcbiAgICAgIHRvOiAnb3BlcmF0b3InLFxuICAgICAgZm9yOiBuZXcgU2V0KFsnLiddKSxcbiAgICB9LFxuICAgICdjbGFzcy1uYW1lJzoge1xuICAgICAgdG86ICdhcGknLFxuICAgICAgZm9yOiBuZXcgU2V0KFsnSFRNTFJld3JpdGVyJywgJ1JlcXVlc3QnLCAnUmVzcG9uc2UnLCAnVVJMJywgJ0Vycm9yJ10pLFxuICAgIH0sXG4gICAgJ2Z1bmN0aW9uJzoge1xuICAgICAgdG86ICdidWlsdGluJyxcbiAgICAgIGZvcjogbmV3IFNldChbXG4gICAgICAgICdmZXRjaCcsXG4gICAgICAgICdjb25zb2xlJyxcbiAgICAgICAgJ2FkZEV2ZW50TGlzdGVuZXInLFxuICAgICAgICAnYXRvYicsXG4gICAgICAgICdidG9hJyxcbiAgICAgICAgJ3NldEludGVydmFsJyxcbiAgICAgICAgJ2NsZWFySW50ZXJ2YWwnLFxuICAgICAgICAnc2V0VGltZW91dCcsXG4gICAgICAgICdjbGVhclRpbWVvdXQnLFxuICAgICAgXSksXG4gICAgfSxcbiAgfSxcbn07XG5cbnRyYW5zZm9ybWF0aW9ucy50cyA9IHRyYW5zZm9ybWF0aW9ucy5qcztcblxudHJhbnNmb3JtYXRpb25zLmh0bWwgPSB7XG4gIGtleXdvcmQ6IHRyYW5zZm9ybWF0aW9ucy5qcy5rZXl3b3JkLFxufTtcblxuaW50ZXJmYWNlIE5vZGUge1xuICB0eXBlczogc3RyaW5nO1xuICBjb250ZW50OiBzdHJpbmc7XG59XG5cbnR5cGUgTGluZSA9IE5vZGVbXTtcblxuY29uc3QgRVNDQVBFID0gL1smXCI8Pl0vZztcbmNvbnN0IENIQVJTID0ge1xuICAnXCInOiAnJnF1b3Q7JyxcbiAgJyYnOiAnJmFtcDsnLFxuICAnPCc6ICcmbHQ7JyxcbiAgJz4nOiAnJmd0OycsXG59O1xuXG4vLyBAc2VlIGx1a2VlZC90ZW1wdXJhXG5mdW5jdGlvbiB0b0VzY2FwZSh2YWx1ZTogc3RyaW5nKSB7XG4gIGxldCB0bXAgPSAwO1xuICBsZXQgb3V0ID0gJyc7XG4gIGxldCBsYXN0ID0gKEVTQ0FQRS5sYXN0SW5kZXggPSAwKTtcbiAgd2hpbGUgKEVTQ0FQRS50ZXN0KHZhbHVlKSkge1xuICAgIHRtcCA9IEVTQ0FQRS5sYXN0SW5kZXggLSAxO1xuICAgIG91dCArPSB2YWx1ZS5zdWJzdHJpbmcobGFzdCwgdG1wKSArIENIQVJTW3ZhbHVlW3RtcF0gYXMga2V5b2YgdHlwZW9mIENIQVJTXTtcbiAgICBsYXN0ID0gdG1wICsgMTtcbiAgfVxuICByZXR1cm4gb3V0ICsgdmFsdWUuc3Vic3RyaW5nKGxhc3QpO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemUodG9rZW5zOiAoVG9rZW4gfCBzdHJpbmcpW10pIHtcbiAgbGV0IGxpbmU6IExpbmUgPSBbXTtcbiAgbGV0IGxpbmVzOiBMaW5lW10gPSBbXTtcblxuICBmdW5jdGlvbiBsb29wKHR5cGVzOiBzdHJpbmcsIGl0ZW06IFRva2VuU3RyZWFtKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICAgIGl0ZW0uZm9yRWFjaCh4ID0+IGxvb3AodHlwZXMsIHgpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xuICAgICAgdHlwZXMgPSB0eXBlcyB8fCAnQ29kZUJsb2NrLS10b2tlbi1wbGFpbic7XG5cbiAgICAgIGlmIChpdGVtID09PSAnJykge1xuICAgICAgICAvLyBpZ25vcmVcbiAgICAgIH0gZWxzZSBpZiAoaXRlbSA9PT0gJ1xcbicpIHtcbiAgICAgICAgbGluZS5wdXNoKHsgdHlwZXMsIGNvbnRlbnQ6IGl0ZW0gfSk7XG4gICAgICAgIGxpbmVzLnB1c2gobGluZSk7XG4gICAgICAgIGxpbmUgPSBbXTtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbSA9PT0gJ1xcblxcbicpIHtcbiAgICAgICAgbGluZS5wdXNoKHsgdHlwZXMsIGNvbnRlbnQ6ICdcXG4nIH0pO1xuICAgICAgICBsaW5lcy5wdXNoKGxpbmUpO1xuXG4gICAgICAgIGxpbmUgPSBbeyB0eXBlczogJ0NvZGVCbG9jay0tdG9rZW4tcGxhaW4nLCBjb250ZW50OiAnXFxuJyB9XTtcbiAgICAgICAgbGluZXMucHVzaChsaW5lKTtcblxuICAgICAgICBsaW5lID0gW107XG4gICAgICB9IGVsc2UgaWYgKGl0ZW0uaW5jbHVkZXMoJ1xcbicpKSB7XG4gICAgICAgIGl0ZW0uc3BsaXQoL1xccj9cXG4vZykuZm9yRWFjaCgodHh0LCBpZHgsIGFycikgPT4ge1xuICAgICAgICAgIGlmICghdHh0ICYmICFpZHggJiYgaWR4IDwgYXJyLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAgIGxldCBjb250ZW50ID0gdHh0ID8gdG9Fc2NhcGUodHh0KSA6ICdcXG4nO1xuXG4gICAgICAgICAgaWYgKGlkeCA+IDApIHtcbiAgICAgICAgICAgIGxpbmVzLnB1c2gobGluZSk7XG4gICAgICAgICAgICBsaW5lID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIGxpbmUucHVzaCh7IHR5cGVzLCBjb250ZW50IH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBjb250ZW50ID0gdG9Fc2NhcGUoaXRlbSk7XG4gICAgICAgIGxpbmUucHVzaCh7IHR5cGVzLCBjb250ZW50IH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXRlbSkge1xuICAgICAgaWYgKHR5cGVzKSB0eXBlcyArPSAnICc7XG4gICAgICB0eXBlcyArPSAnQ29kZUJsb2NrLS10b2tlbi0nICsgaXRlbS50eXBlO1xuXG4gICAgICBpZiAoaXRlbS5hbGlhcykge1xuICAgICAgICAoW10gYXMgc3RyaW5nW10pLmNvbmNhdChpdGVtLmFsaWFzKS5mb3JFYWNoKHR0ID0+IHtcbiAgICAgICAgICBpZiAoIXR5cGVzLmluY2x1ZGVzKHR0KSkge1xuICAgICAgICAgICAgaWYgKHR5cGVzKSB0eXBlcyArPSAnICc7XG4gICAgICAgICAgICB0eXBlcyArPSAnQ29kZUJsb2NrLS10b2tlbi0nICsgdHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGxvb3AodHlwZXMsIGl0ZW0uY29udGVudCk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICBsb29wKCcnLCB0b2tlbnNbaV0pO1xuICB9XG5cbiAgaWYgKGxpbmUubGVuZ3RoID4gMCkge1xuICAgIGxpbmVzLnB1c2gobGluZSk7XG4gIH1cblxuICBsZXQgYXJyOiBMaW5lW10gPSBbXTtcbiAgd2hpbGUgKChsaW5lID0gbGluZXMuc2hpZnQoKSkpIHtcbiAgICBpZiAobGluZS5sZW5ndGggPiAxICYmIGxpbmVbMF0uY29udGVudCA9PT0gJ1xcbicpIHtcbiAgICAgIC8vIHJlbW92ZSBleHRyYSBsZWFkaW5nIFwiXFxuXCIgaXRlbXMgZm9yIG5vbi13aGl0ZXNwYWNlIGxpbmVzXG4gICAgICBsaW5lWzBdLmNvbnRlbnQgPSBcIlwiXG4gICAgICBhcnIucHVzaChsaW5lKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcnIucHVzaChsaW5lKTtcbiAgICB9XG4gIH1cblxuICBsaW5lcyA9IGFycjtcblxuICAvLyBjaGVjayBmb3IgdXNlbGVzcyBuZXdsaW5lXG4gIC8vIH4+IGxhc3QgbGluZSB3aWxsIGJlIHNpbmdsZS1pdGVtIEFycmF5XG4gIGxldCBsYXN0ID0gbGluZXMucG9wKCk7XG4gIGlmIChsYXN0Lmxlbmd0aCAhPT0gMSB8fCBsYXN0WzBdLmNvbnRlbnQudHJpbSgpLmxlbmd0aCA+IDEpIHtcbiAgICBsaW5lcy5wdXNoKGxhc3QpOyAvLyBhZGQgaXQgYmFjaywgd2FzIHVzZWZ1bFxuICB9XG5cbiAgcmV0dXJuIGxpbmVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGlnaGxpZ2h0KGNvZGU6IHN0cmluZywgbGFuZzogc3RyaW5nLCBmaWxlOiBzdHJpbmcpOiBzdHJpbmcge1xuICBsYW5nID0gbGFuZ3NbbGFuZ10gfHwgbGFuZyB8fCAndHh0JztcbiAgbGV0IGdyYW1tYXIgPSBQcmlzbS5sYW5ndWFnZXNbbGFuZy50b0xvd2VyQ2FzZSgpXTtcblxuICBpZiAoIWdyYW1tYXIpIHtcbiAgICBjb25zb2xlLndhcm4oJ1twcmlzbV0gTWlzc2luZyBcIiVzXCIgZ3JhbW1hcjsgdXNpbmcgXCJ0eHRcIiBmYWxsYmFjaycsIGxhbmcpO1xuICAgIGdyYW1tYXIgPSBQcmlzbS5sYW5ndWFnZXMudHh0O1xuICB9XG5cbiAgbGV0IGZyb250bWF0dGVyOiB7XG4gICAgdGhlbWU/OiBzdHJpbmcgfCAnbGlnaHQnO1xuICAgIGhpZ2hsaWdodD86IGBbJHtzdHJpbmd9XWAgfCBzdHJpbmc7XG4gICAgZmlsZW5hbWU/OiBzdHJpbmc7XG4gICAgaGVhZGVyPzogc3RyaW5nO1xuICB9ID0ge307XG5cbiAgLy8gQ2hlY2sgZm9yIGEgWUFNTCBmcm9udG1hdHRlcixcbiAgLy8gYW5kIGVuc3VyZSBpdCdzIG5vdCBzb21ldGhpbmcgbGlrZSAtLS0tLUJFR0lOIENFUlRJRklDQVRFLS0tLS1cbiAgaWYgKGNvZGUuc3Vic3RyaW5nKDAsIDMpID09PSAnLS0tJyAmJiBjb2RlWzNdICE9ICctJykge1xuICAgIGxldCBpbmRleCA9IGNvZGUuaW5kZXhPZignLS0tJywgMyk7XG4gICAgaWYgKGluZGV4ID4gMykge1xuICAgICAgaW5kZXggKz0gMztcbiAgICAgIGxldCBjb250ZW50ID0gY29kZS5zdWJzdHJpbmcoMCwgaW5kZXgpO1xuICAgICAgY29kZSA9IGNvZGUuc3Vic3RyaW5nKGluZGV4KS5yZXBsYWNlKC9eKFxccj9cXG4pKy8sICcnKTtcblxuICAgICAgLy8gVE9ETzogcGFzcyBpbiBgdXRpbHMuZnJvbnRtYXR0ZXJgIGhlcmVcbiAgICAgIC8vIGZyb250bWF0dGVyID0gdXRpbHMuZnJvbnRtYXR0ZXIoY29udGVudCk7XG5cbiAgICAgIGxldCBtYXRjaCA9IC9eLS0tXFxyP1xcbihbXFxzXFxTXSs/KVxccj9cXG4tLS0vLmV4ZWMoY29udGVudCk7XG4gICAgICBpZiAobWF0Y2ggIT0gbnVsbClcbiAgICAgICAgbWF0Y2hbMV0uc3BsaXQoJ1xcbicpLmZvckVhY2gocGFpciA9PiB7XG4gICAgICAgICAgbGV0IFtrZXksIC4uLnZdID0gcGFpci5zcGxpdCgnOicpO1xuICAgICAgICAgIGZyb250bWF0dGVyW2tleS50cmltKCkgYXMgJ3RoZW1lJ10gPSB2LmpvaW4oJzonKS50cmltKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGxldCBoaWdobGlnaHRzOiBTZXQ8bnVtYmVyPjtcblxuICB0cnkge1xuICAgIGxldCBoaWdobGlnaHQgPSBmcm9udG1hdHRlci5oaWdobGlnaHQ7XG4gICAgLy8gbGV0IHJhbmdlLXBhcnNlciBkbyB0aGUgaGVhdnkgbGlmdGluZy4gSXQgaGFuZGxlcyBhbGwgc3VwcG9ydGVkIGNhc2VzXG4gICAgaWYgKGhpZ2hsaWdodD8uc3RhcnRzV2l0aCgnWycpKSB7XG4gICAgICBoaWdobGlnaHQgPSBoaWdobGlnaHQuc3Vic3RyaW5nKDEsIGhpZ2hsaWdodC5sZW5ndGggLSAxKTtcbiAgICB9XG4gICAgY29uc3QgcGFyc2VkUmFuZ2UgPSByYW5nZVBhcnNlcihoaWdobGlnaHQgfHwgJycpXG4gICAgaGlnaGxpZ2h0cyA9IG5ldyBTZXQocGFyc2VkUmFuZ2UubWFwKCh4OiBudW1iZXIpID0+IHggLSAxKSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHByb2Nlc3Muc3RkZXJyLndyaXRlKGBbRVJST1JdICR7ZmlsZX1cXG5TeW50YXggaGlnaGxpZ2h0aW5nIGVycm9yOiBZb3UgbXVzdCBzcGVjaWZ5IHRoZSBsaW5lcyB0byBoaWdobGlnaHQgYXMgYW4gYXJyYXkgKGUuZy4sICdbMl0nKS4gRm91bmQgJyR7ZnJvbnRtYXR0ZXIuaGlnaGxpZ2h0fScuXFxuYCk7XG4gICAgLy8gc3RpbGwgdGhyb3dpbmcgdGhlIG9yaWdpbmFsIGVycm9yIGJlY2F1c2UgaXQgY291bGQgYmUgc29tZXRoaW5nIGVsc2VcbiAgICB0aHJvdyBlcnI7XG4gIH1cblxuICAvLyB0b2tlbml6ZSAmIGJ1aWxkIGN1c3RvbSBzdHJpbmcgb3V0cHV0XG4gIGxldCB0b2tlbnMgPSBQcmlzbS50b2tlbml6ZShjb2RlLCBncmFtbWFyKTtcbiAgbGV0IG91dHB1dCA9ICcnO1xuXG4gIGxldCB0aGVtZSA9IGZyb250bWF0dGVyLnRoZW1lIHx8ICdsaWdodCc7XG4gIG91dHB1dCArPSAnPHByZSBjbGFzcz1cIkNvZGVCbG9jayBDb2RlQmxvY2std2l0aC1yb3dzIENvZGVCbG9jay1zY3JvbGxzLWhvcml6b250YWxseSc7XG5cbiAgaWYgKHRoZW1lID09PSAnbGlnaHQnKSBvdXRwdXQgKz0gJyBDb2RlQmxvY2staXMtbGlnaHQtaW4tbGlnaHQtdGhlbWUnO1xuICBvdXRwdXQgKz0gYCBDb2RlQmxvY2stLWxhbmd1YWdlLSR7bGFuZ31cIiBsYW5ndWFnZT1cIiR7bGFuZ31cIj5gO1xuXG4gIGlmIChmcm9udG1hdHRlci5oZWFkZXIpIG91dHB1dCArPSBgPHNwYW4gY2xhc3M9XCJDb2RlQmxvY2stLWhlYWRlclwiPiR7ZnJvbnRtYXR0ZXIuaGVhZGVyfTwvc3Bhbj5gO1xuICBlbHNlIGlmIChmcm9udG1hdHRlci5maWxlbmFtZSlcbiAgICBvdXRwdXQgKz0gYDxzcGFuIGNsYXNzPVwiQ29kZUJsb2NrLS1maWxlbmFtZVwiPiR7ZnJvbnRtYXR0ZXIuZmlsZW5hbWV9PC9zcGFuPmA7XG4gIGVsc2Ugb3V0cHV0ICs9IGA8c3BhbiBjbGFzcz1cIkNvZGVCbG9jay0taGVhZGVyXCI+PGJyLz48L3NwYW4+YDtcblxuICBvdXRwdXQgKz0gJzxjb2RlPic7XG4gIG91dHB1dCArPSAnPHNwYW4gY2xhc3M9XCJDb2RlQmxvY2stLXJvd3NcIj4nO1xuICBvdXRwdXQgKz0gJzxzcGFuIGNsYXNzPVwiQ29kZUJsb2NrLS1yb3dzLWNvbnRlbnRcIj4nO1xuXG4gIGxldCBpID0gMDtcbiAgbGV0IHJvdyA9ICcnO1xuICBsZXQgbGluZTogTGluZTtcbiAgbGV0IGxpbmVzID0gbm9ybWFsaXplKHRva2Vucyk7XG5cbiAgZm9yICg7IGkgPCBsaW5lcy5sZW5ndGg7IGkrKykge1xuICAgIGxpbmUgPSBsaW5lc1tpXTtcbiAgICByb3cgPSAnPHNwYW4gY2xhc3M9XCJDb2RlQmxvY2stLXJvdyc7XG4gICAgcm93ICs9IGhpZ2hsaWdodHMuaGFzKGkpID8gJyBDb2RlQmxvY2stLXJvdy1pcy1oaWdobGlnaHRlZFwiPicgOiAnXCI+JztcbiAgICByb3cgKz0gJzxzcGFuIGNsYXNzPVwiQ29kZUJsb2NrLS1yb3ctaW5kaWNhdG9yXCI+PC9zcGFuPic7XG4gICAgcm93ICs9ICc8ZGl2IGNsYXNzPVwiQ29kZUJsb2NrLS1yb3ctY29udGVudFwiPic7XG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBsaW5lLmxlbmd0aDsgaisrKSB7XG4gICAgICByb3cgKz0gJzxzcGFuIGNsYXNzPVwiJyArIGxpbmVbal0udHlwZXMgKyAnXCI+JyArIGxpbmVbal0uY29udGVudCArICc8L3NwYW4+JztcbiAgICB9XG4gICAgb3V0cHV0ICs9IHJvdyArICc8L2Rpdj48L3NwYW4+JztcbiAgfVxuXG4gIHJldHVybiBvdXRwdXQgKyAnPC9zcGFuPjwvc3Bhbj48L2NvZGU+PC9wcmU+Jztcbn1cbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBMlIsU0FBUyxlQUFlLFdBQVc7QUFDOVQsU0FBUyxvQkFBMEM7QUFDbkQsU0FBUyxvQkFBdUM7QUFDaEQsT0FBTyxVQUFVOzs7QUNId1IsT0FBTyxXQUFXO0FBQzNULE9BQU8saUJBQWlCO0FBS3hCLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1As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QSxZQUNFO0FBQUEsWUFDQTtBQUFBLGNBQ0UsU0FBUyxDQUFDLFlBQVk7QUFDcEIsc0JBQU0sTUFBTTtBQUNaLHNCQUFNLE9BQU8sUUFBUSxhQUFhLE1BQU07QUFDeEMsd0JBQVEsVUFBVTtBQUNsQix3QkFBUSxnQkFBZ0IsTUFBTTtBQUM5Qix3QkFBUSxhQUFhLE1BQU0sU0FBUyxLQUFLO0FBQ3pDLHdCQUFRO0FBQUEsa0JBQ047QUFBQTtBQUFBLDZDQUUyQjtBQUFBLGdFQUNtQjtBQUFBO0FBQUE7QUFBQSxrQkFHOUMsRUFBRSxNQUFNLEtBQUs7QUFBQSxnQkFDZjtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0YsQ0FBQztBQUFBLE1BQ0g7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTSxrQkFBa0IsTUFBb0I7QUFDMUMsU0FBTztBQUFBLElBQ0wsTUFBTTtBQUFBLElBQ04sTUFBTSxtQkFBbUIsTUFBYztBQUNyQyxhQUFPLE1BQU0sUUFBUSxNQUFNO0FBQUEsUUFDekI7QUFBQSxVQUNFO0FBQUEsVUFDQTtBQUFBLFlBQ0UsU0FBUyxDQUFDLFlBQVk7QUFDcEIsb0JBQU0sT0FBTyxRQUNWLGFBQWEsV0FBVyxFQUV4QixXQUFXLFNBQVMsR0FBRztBQUUxQixrQkFBSSxLQUFLLFNBQVMsSUFBSSxHQUFHO0FBQ3ZCLHNCQUFNLElBQUksTUFBTSw2QkFBNkIsSUFBSTtBQUFBLGNBQ25EO0FBQ0Esb0JBQU0sVUFBVSxtQkFBbUIsSUFBSTtBQUN2QyxvQkFBTSxPQUFPLFVBQVU7QUFDdkIsc0JBQVE7QUFBQSxnQkFDTixVQUFVLE1BQU0sUUFBUSxhQUFhLGVBQWUsR0FBSSxFQUFFO0FBQUEsZ0JBQzFEO0FBQUEsa0JBQ0UsTUFBTTtBQUFBLGdCQUNSO0FBQUEsY0FDRjtBQUFBLFlBQ0Y7QUFBQSxVQUNGO0FBQUEsUUFDRjtBQUFBLE1BQ0YsQ0FBQztBQUFBLElBQ0g7QUFBQSxFQUNGO0FBQ0Y7QUFFQSxJQUFPLHNCQUFRLGFBQWE7QUFBQSxFQUMxQixTQUFTLENBQUMsZ0JBQWdCLEdBQUcscUJBQXFCLEdBQUcsSUFBSSxDQUFDO0FBQUEsRUFDMUQsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSyxjQUFjLElBQUksSUFBSSxnQkFBZ0Isd0NBQWUsQ0FBQztBQUFBLE1BQzNELE1BQU0sY0FBYyxJQUFJLElBQUksVUFBVSx3Q0FBZSxDQUFDO0FBQUEsSUFDeEQ7QUFBQSxFQUNGO0FBQUEsRUFDQSxPQUFPO0FBQUEsSUFDTCxlQUFlO0FBQUEsTUFDYixPQUFPLEtBQUssS0FBSyxrQkFBa0I7QUFBQSxJQUNyQztBQUFBLEVBQ0Y7QUFDRixDQUFDOyIsCiAgIm5hbWVzIjogWyJhcnIiLCAiaGlnaGxpZ2h0Il0KfQo=
