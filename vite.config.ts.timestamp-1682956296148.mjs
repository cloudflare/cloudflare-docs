// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { HTMLRewriter } from "file:///Users/kody/Desktop/cloudflare-docs/node_modules/html-rewriter-wasm/dist/html_rewriter.js";
import { defineConfig } from "file:///Users/kody/Desktop/cloudflare-docs/node_modules/vite/dist/node/index.js";
import glob from "file:///Users/kody/Desktop/cloudflare-docs/node_modules/glob/glob.js";

// bin/prism.config.ts
import Prism from "file:///Users/kody/Desktop/cloudflare-docs/node_modules/prismjs/prism.js";
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
    highlights = new Set(JSON.parse(frontmatter.highlight || "[]").map((x) => x - 1));
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYmluL3ByaXNtLmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9rb2R5L0Rlc2t0b3AvY2xvdWRmbGFyZS1kb2NzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMva29keS9EZXNrdG9wL2Nsb3VkZmxhcmUtZG9jcy92aXRlLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMva29keS9EZXNrdG9wL2Nsb3VkZmxhcmUtZG9jcy92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gXCJub2RlOnVybFwiO1xuaW1wb3J0IHsgSFRNTFJld3JpdGVyLCB0eXBlIEVsZW1lbnRIYW5kbGVycyB9IGZyb20gXCJodG1sLXJld3JpdGVyLXdhc21cIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgdHlwZSBQbHVnaW5PcHRpb24gfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IGdsb2IgZnJvbSBcImdsb2JcIjtcbmltcG9ydCB7IGhpZ2hsaWdodCB9IGZyb20gXCIuL2Jpbi9wcmlzbS5jb25maWdcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuY29uc3QgZW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcigpO1xuY29uc3QgZGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigpO1xuXG5hc3luYyBmdW5jdGlvbiByZXdyaXRlKFxuICBkb2N1bWVudDogc3RyaW5nLFxuICBoYW5kbGVyczogW3N0cmluZywgRWxlbWVudEhhbmRsZXJzXVtdXG4pIHtcbiAgbGV0IG91dHB1dCA9IFwiXCI7XG4gIGNvbnN0IHJld3JpdGVyID0gbmV3IEhUTUxSZXdyaXRlcigob3V0cHV0Q2h1bmspID0+IHtcbiAgICBvdXRwdXQgKz0gZGVjb2Rlci5kZWNvZGUob3V0cHV0Q2h1bmspO1xuICB9KTtcbiAgaGFuZGxlcnMuZm9yRWFjaCgoW2VsLCBoYW5kbGVyXSkgPT4gcmV3cml0ZXIub24oZWwsIGhhbmRsZXIpKTtcbiAgdHJ5IHtcbiAgICBhd2FpdCByZXdyaXRlci53cml0ZShlbmNvZGVyLmVuY29kZShkb2N1bWVudCkpO1xuICAgIGF3YWl0IHJld3JpdGVyLmVuZCgpO1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH0gZmluYWxseSB7XG4gICAgcmV3cml0ZXIuZnJlZSgpO1xuICB9XG59XG5cbmNvbnN0IGh5ZHJhdGVWdWVDb21wb25lbnRzID0gKCk6IFBsdWdpbk9wdGlvbiA9PiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogXCJoeWRyYXRlLXZ1ZVwiLFxuICAgIHRyYW5zZm9ybUluZGV4SHRtbDoge1xuICAgICAgb3JkZXI6IFwicHJlXCIsXG4gICAgICBoYW5kbGVyOiBhc3luYyAoaHRtbDogc3RyaW5nKSA9PiB7XG4gICAgICAgIGxldCBjb21wb25lbnRJZCA9IDE7XG4gICAgICAgIHJldHVybiBhd2FpdCByZXdyaXRlKGh0bWwsIFtcbiAgICAgICAgICBbXG4gICAgICAgICAgICBcInZ1ZS1jb21wb25lbnRcIixcbiAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgZWxlbWVudDogKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgICBjb25zdCBuSWQgPSBjb21wb25lbnRJZCsrO1xuICAgICAgICAgICAgICAgIGNvbnN0IG5hbWUgPSBlbGVtZW50LmdldEF0dHJpYnV0ZShcIm5hbWVcIik7XG4gICAgICAgICAgICAgICAgZWxlbWVudC50YWdOYW1lID0gXCJkaXZcIjtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZUF0dHJpYnV0ZShcIm5hbWVcIik7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoXCJpZFwiLCBgdnVlLWMtJHtuSWR9YCk7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5hZnRlcihcbiAgICAgICAgICAgICAgICAgIGA8c2NyaXB0IHR5cGU9XCJtb2R1bGVcIj5cbiAgICAgICAgICAgICAgICAgIGltcG9ydCB7IGNyZWF0ZUFwcCB9IGZyb20gJ3Z1ZSdcbiAgICAgICAgICAgICAgICAgIGltcG9ydCBDb21wb25lbnQgZnJvbSBcIkAvJHtuYW1lfS52dWVcIlxuICAgICAgICAgICAgICAgICAgY29uc3Qgcm9vdCA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd2dWUtYy0ke25JZH0nKVxuICAgICAgICAgICAgICAgICAgY3JlYXRlQXBwKENvbXBvbmVudCwgey4uLnJvb3QuZGF0YXNldH0pLm1vdW50KHJvb3QsIHRydWUpXG4gICAgICAgICAgICAgIDwvc2NyaXB0PmAsXG4gICAgICAgICAgICAgICAgICB7IGh0bWw6IHRydWUgfVxuICAgICAgICAgICAgICAgICk7XG4gICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF0sXG4gICAgICAgIF0pO1xuICAgICAgfSxcbiAgICB9LFxuICB9O1xufTtcblxuY29uc3QgcmVuZGVyQ29kZUJsb2NrID0gKCk6IFBsdWdpbk9wdGlvbiA9PiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogXCJyZW5kZXItY29kZS1ibG9ja1wiLFxuICAgIGFzeW5jIHRyYW5zZm9ybUluZGV4SHRtbChodG1sOiBzdHJpbmcpIHtcbiAgICAgIHJldHVybiBhd2FpdCByZXdyaXRlKGh0bWwsIFtcbiAgICAgICAgW1xuICAgICAgICAgIFwidW5wYXJzZWQtY29kZWJsb2NrXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgZWxlbWVudDogKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb2RlXCIpIVxuICAgICAgICAgICAgICAgIC8vIEh1Z28ncyB1cmwgZW5jb2RpbmcgaXMgLi4ub2RkXG4gICAgICAgICAgICAgICAgLnJlcGxhY2VBbGwoXCImIzQzO1wiLCBcIiBcIik7XG5cbiAgICAgICAgICAgICAgaWYgKGRhdGEuaW5jbHVkZXMoXCImI1wiKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgSFRNTCBlbnRpdHk6IFwiICsgZGF0YSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29uc3QgZGVjb2RlZCA9IGRlY29kZVVSSUNvbXBvbmVudChkYXRhKTtcbiAgICAgICAgICAgICAgY29uc3QgY29kZSA9IGRlY29kZWQgKyBcIlxcblwiO1xuICAgICAgICAgICAgICBlbGVtZW50LnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgaGlnaGxpZ2h0KGNvZGUsIGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1sYW5ndWFnZVwiKSEsIFwiXCIpLFxuICAgICAgICAgICAgICAgIHtcbiAgICAgICAgICAgICAgICAgIGh0bWw6IHRydWUsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgfSxcbiAgICAgICAgICB9LFxuICAgICAgICBdLFxuICAgICAgXSk7XG4gICAgfSxcbiAgfTtcbn07XG4vLyBodHRwczovL3ZpdGVqcy5kZXYvY29uZmlnL1xuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcbiAgcGx1Z2luczogW3JlbmRlckNvZGVCbG9jaygpLCBoeWRyYXRlVnVlQ29tcG9uZW50cygpLCB2dWUoKV0sXG4gIHJvb3Q6IFwicHVibGljXCIsXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vY29tcG9uZW50c1wiLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgIGRhdGE6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vZGF0YVwiLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiBnbG9iLnN5bmMoXCJwdWJsaWMvKiovKi5odG1sXCIpLFxuICAgIH0sXG4gIH0sXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2tvZHkvRGVza3RvcC9jbG91ZGZsYXJlLWRvY3MvYmluXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMva29keS9EZXNrdG9wL2Nsb3VkZmxhcmUtZG9jcy9iaW4vcHJpc20uY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9rb2R5L0Rlc2t0b3AvY2xvdWRmbGFyZS1kb2NzL2Jpbi9wcmlzbS5jb25maWcudHNcIjtpbXBvcnQgUHJpc20gZnJvbSAncHJpc21qcyc7XG5cbmltcG9ydCB0eXBlIHsgVG9rZW4sIFRva2VuU3RyZWFtIH0gZnJvbSAncHJpc21qcyc7XG5cbmdsb2JhbFRoaXMuUHJpc20gPSBQcmlzbTtcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWJhc2gubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWMubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNzaGFycC5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY3N2Lm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1kaWZmLm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1naXQubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWdvLm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1ncmFwaHFsLm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1oY2wubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWh0dHAubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWluaS5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tamF2YS5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tanNvbi5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tanN4Lm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1tYXJrZG93bi5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcGVybC5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcGhwLm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1weXRob24ubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXJ1YnkubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXJ1c3QubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXNxbC5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tdHlwZXNjcmlwdC5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tdG9tbC5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20teWFtbC5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20ta290bGluLm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1zd2lmdC5taW4uanMnO1xuXG4vLyBDdXN0b20gYHNoZWxsYCBncmFtbWFyXG5QcmlzbS5sYW5ndWFnZXMuc2ggPSB7XG4gIGNvbW1lbnQ6IHtcbiAgICBwYXR0ZXJuOiAvKF58W14ne1xcXFwkXSkjLiovLFxuICAgIGFsaWFzOiAndW5zZWxlY3RhYmxlJyxcbiAgICBsb29rYmVoaW5kOiB0cnVlLFxuICB9LFxuXG4gIGRpcmVjdG9yeToge1xuICAgIHBhdHRlcm46IC9eW15cXHJcXG4kKiFdKyg/PVskXSkvbSxcbiAgICBhbGlhczogJ3Vuc2VsZWN0YWJsZScsXG4gIH0sXG5cbiAgY29tbWFuZDoge1xuICAgIHBhdHRlcm46IC9bJF0oPzpbXlxcclxcbl0pKy8sXG4gICAgaW5zaWRlOiB7XG4gICAgICBwcm9tcHQ6IHtcbiAgICAgICAgcGF0dGVybjogL15bJF0gLyxcbiAgICAgICAgYWxpYXM6ICd1bnNlbGVjdGFibGUnLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxufTtcblxuLy8gUHJpc20gbGFuZ3VhZ2UgYWxpYXNlc1xuZXhwb3J0IGNvbnN0IGxhbmdzOiBSZWNvcmQ8c3RyaW5nLCBzdHJpbmc+ID0ge1xuICB0ZjogJ2hjbCcsIC8vIHRlcnJhZm9ybSAtPiBoYXNoaWNvcnAgY29uZmlnIGxhbmdcbiAgcnM6ICdydXN0JyxcbiAgc2hlbGw6ICdzaCcsXG4gIGN1cmw6ICdiYXNoJyxcbiAgZ3FsOiAnZ3JhcGhxbCcsXG4gIHN2ZWx0ZTogJ2h0bWwnLFxuICBqYXZhc2NyaXB0OiAnanMnLFxuICB0eXBlc2NyaXB0OiAndHMnLFxuICBwbGFpbnRleHQ6ICd0eHQnLFxuICB0ZXh0OiAndHh0JyxcbiAgcHk6ICdweXRob24nLFxuICB2dWU6ICdodG1sJyxcbiAgcmI6ICdydWJ5Jyxcbn07XG5cbi8vIEN1c3RvbSB0b2tlbiB0cmFuc2Zvcm1zXG5jb25zdCB0cmFuc2Zvcm1hdGlvbnM6IFJlY29yZDxzdHJpbmcsIGFueT4gPSB7XG4gIGpzOiB7XG4gICAgJ2tleXdvcmQnOiB7XG4gICAgICB0bzogJ2RlY2xhcmF0aW9uLWtleXdvcmQnLFxuICAgICAgZm9yOiBuZXcgU2V0KFsnY29uc3QnLCAnbGV0JywgJ3ZhcicsICdhc3luYycsICdhd2FpdCcsICdmdW5jdGlvbicsICdjbGFzcyddKSxcbiAgICB9LFxuICAgICdwdW5jdHVhdGlvbic6IHtcbiAgICAgIHRvOiAnb3BlcmF0b3InLFxuICAgICAgZm9yOiBuZXcgU2V0KFsnLiddKSxcbiAgICB9LFxuICAgICdjbGFzcy1uYW1lJzoge1xuICAgICAgdG86ICdhcGknLFxuICAgICAgZm9yOiBuZXcgU2V0KFsnSFRNTFJld3JpdGVyJywgJ1JlcXVlc3QnLCAnUmVzcG9uc2UnLCAnVVJMJywgJ0Vycm9yJ10pLFxuICAgIH0sXG4gICAgJ2Z1bmN0aW9uJzoge1xuICAgICAgdG86ICdidWlsdGluJyxcbiAgICAgIGZvcjogbmV3IFNldChbXG4gICAgICAgICdmZXRjaCcsXG4gICAgICAgICdjb25zb2xlJyxcbiAgICAgICAgJ2FkZEV2ZW50TGlzdGVuZXInLFxuICAgICAgICAnYXRvYicsXG4gICAgICAgICdidG9hJyxcbiAgICAgICAgJ3NldEludGVydmFsJyxcbiAgICAgICAgJ2NsZWFySW50ZXJ2YWwnLFxuICAgICAgICAnc2V0VGltZW91dCcsXG4gICAgICAgICdjbGVhclRpbWVvdXQnLFxuICAgICAgXSksXG4gICAgfSxcbiAgfSxcbn07XG5cbnRyYW5zZm9ybWF0aW9ucy50cyA9IHRyYW5zZm9ybWF0aW9ucy5qcztcblxudHJhbnNmb3JtYXRpb25zLmh0bWwgPSB7XG4gIGtleXdvcmQ6IHRyYW5zZm9ybWF0aW9ucy5qcy5rZXl3b3JkLFxufTtcblxuaW50ZXJmYWNlIE5vZGUge1xuICB0eXBlczogc3RyaW5nO1xuICBjb250ZW50OiBzdHJpbmc7XG59XG5cbnR5cGUgTGluZSA9IE5vZGVbXTtcblxuY29uc3QgRVNDQVBFID0gL1smXCI8Pl0vZztcbmNvbnN0IENIQVJTID0ge1xuICAnXCInOiAnJnF1b3Q7JyxcbiAgJyYnOiAnJmFtcDsnLFxuICAnPCc6ICcmbHQ7JyxcbiAgJz4nOiAnJmd0OycsXG59O1xuXG4vLyBAc2VlIGx1a2VlZC90ZW1wdXJhXG5mdW5jdGlvbiB0b0VzY2FwZSh2YWx1ZTogc3RyaW5nKSB7XG4gIGxldCB0bXAgPSAwO1xuICBsZXQgb3V0ID0gJyc7XG4gIGxldCBsYXN0ID0gKEVTQ0FQRS5sYXN0SW5kZXggPSAwKTtcbiAgd2hpbGUgKEVTQ0FQRS50ZXN0KHZhbHVlKSkge1xuICAgIHRtcCA9IEVTQ0FQRS5sYXN0SW5kZXggLSAxO1xuICAgIG91dCArPSB2YWx1ZS5zdWJzdHJpbmcobGFzdCwgdG1wKSArIENIQVJTW3ZhbHVlW3RtcF0gYXMga2V5b2YgdHlwZW9mIENIQVJTXTtcbiAgICBsYXN0ID0gdG1wICsgMTtcbiAgfVxuICByZXR1cm4gb3V0ICsgdmFsdWUuc3Vic3RyaW5nKGxhc3QpO1xufVxuXG5mdW5jdGlvbiBub3JtYWxpemUodG9rZW5zOiAoVG9rZW4gfCBzdHJpbmcpW10pIHtcbiAgbGV0IGxpbmU6IExpbmUgPSBbXTtcbiAgbGV0IGxpbmVzOiBMaW5lW10gPSBbXTtcblxuICBmdW5jdGlvbiBsb29wKHR5cGVzOiBzdHJpbmcsIGl0ZW06IFRva2VuU3RyZWFtKSB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaXRlbSkpIHtcbiAgICAgIGl0ZW0uZm9yRWFjaCh4ID0+IGxvb3AodHlwZXMsIHgpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtID09PSAnc3RyaW5nJykge1xuICAgICAgdHlwZXMgPSB0eXBlcyB8fCAnQ29kZUJsb2NrLS10b2tlbi1wbGFpbic7XG5cbiAgICAgIGlmIChpdGVtID09PSAnJykge1xuICAgICAgICAvLyBpZ25vcmVcbiAgICAgIH0gZWxzZSBpZiAoaXRlbSA9PT0gJ1xcbicpIHtcbiAgICAgICAgbGluZS5wdXNoKHsgdHlwZXMsIGNvbnRlbnQ6IGl0ZW0gfSk7XG4gICAgICAgIGxpbmVzLnB1c2gobGluZSk7XG4gICAgICAgIGxpbmUgPSBbXTtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbSA9PT0gJ1xcblxcbicpIHtcbiAgICAgICAgbGluZS5wdXNoKHsgdHlwZXMsIGNvbnRlbnQ6ICdcXG4nIH0pO1xuICAgICAgICBsaW5lcy5wdXNoKGxpbmUpO1xuXG4gICAgICAgIGxpbmUgPSBbeyB0eXBlczogJ0NvZGVCbG9jay0tdG9rZW4tcGxhaW4nLCBjb250ZW50OiAnXFxuJyB9XTtcbiAgICAgICAgbGluZXMucHVzaChsaW5lKTtcblxuICAgICAgICBsaW5lID0gW107XG4gICAgICB9IGVsc2UgaWYgKGl0ZW0uaW5jbHVkZXMoJ1xcbicpKSB7XG4gICAgICAgIGl0ZW0uc3BsaXQoL1xccj9cXG4vZykuZm9yRWFjaCgodHh0LCBpZHgsIGFycikgPT4ge1xuICAgICAgICAgIGlmICghdHh0ICYmICFpZHggJiYgaWR4IDwgYXJyLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAgIGxldCBjb250ZW50ID0gdHh0ID8gdG9Fc2NhcGUodHh0KSA6ICdcXG4nO1xuXG4gICAgICAgICAgaWYgKGlkeCA+IDApIHtcbiAgICAgICAgICAgIGxpbmVzLnB1c2gobGluZSk7XG4gICAgICAgICAgICBsaW5lID0gW107XG4gICAgICAgICAgfVxuICAgICAgICAgIGxpbmUucHVzaCh7IHR5cGVzLCBjb250ZW50IH0pO1xuICAgICAgICB9KTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGxldCBjb250ZW50ID0gdG9Fc2NhcGUoaXRlbSk7XG4gICAgICAgIGxpbmUucHVzaCh7IHR5cGVzLCBjb250ZW50IH0pO1xuICAgICAgfVxuICAgIH0gZWxzZSBpZiAoaXRlbSkge1xuICAgICAgaWYgKHR5cGVzKSB0eXBlcyArPSAnICc7XG4gICAgICB0eXBlcyArPSAnQ29kZUJsb2NrLS10b2tlbi0nICsgaXRlbS50eXBlO1xuXG4gICAgICBpZiAoaXRlbS5hbGlhcykge1xuICAgICAgICAoW10gYXMgc3RyaW5nW10pLmNvbmNhdChpdGVtLmFsaWFzKS5mb3JFYWNoKHR0ID0+IHtcbiAgICAgICAgICBpZiAoIXR5cGVzLmluY2x1ZGVzKHR0KSkge1xuICAgICAgICAgICAgaWYgKHR5cGVzKSB0eXBlcyArPSAnICc7XG4gICAgICAgICAgICB0eXBlcyArPSAnQ29kZUJsb2NrLS10b2tlbi0nICsgdHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGxvb3AodHlwZXMsIGl0ZW0uY29udGVudCk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICBsb29wKCcnLCB0b2tlbnNbaV0pO1xuICB9XG5cbiAgaWYgKGxpbmUubGVuZ3RoID4gMCkge1xuICAgIGxpbmVzLnB1c2gobGluZSk7XG4gIH1cblxuICBsZXQgYXJyOiBMaW5lW10gPSBbXTtcbiAgd2hpbGUgKChsaW5lID0gbGluZXMuc2hpZnQoKSkpIHtcbiAgICBpZiAobGluZS5sZW5ndGggPiAxICYmIGxpbmVbMF0uY29udGVudCA9PT0gJ1xcbicpIHtcbiAgICAgIC8vIHJlbW92ZSBleHRyYSBsZWFkaW5nIFwiXFxuXCIgaXRlbXMgZm9yIG5vbi13aGl0ZXNwYWNlIGxpbmVzXG4gICAgICBsaW5lWzBdLmNvbnRlbnQgPSBcIlwiXG4gICAgICBhcnIucHVzaChsaW5lKVxuICAgIH0gZWxzZSB7XG4gICAgICBhcnIucHVzaChsaW5lKTtcbiAgICB9XG4gIH1cblxuICBsaW5lcyA9IGFycjtcblxuICAvLyBjaGVjayBmb3IgdXNlbGVzcyBuZXdsaW5lXG4gIC8vIH4+IGxhc3QgbGluZSB3aWxsIGJlIHNpbmdsZS1pdGVtIEFycmF5XG4gIGxldCBsYXN0ID0gbGluZXMucG9wKCk7XG4gIGlmIChsYXN0Lmxlbmd0aCAhPT0gMSB8fCBsYXN0WzBdLmNvbnRlbnQudHJpbSgpLmxlbmd0aCA+IDEpIHtcbiAgICBsaW5lcy5wdXNoKGxhc3QpOyAvLyBhZGQgaXQgYmFjaywgd2FzIHVzZWZ1bFxuICB9XG5cbiAgcmV0dXJuIGxpbmVzO1xufVxuXG5leHBvcnQgZnVuY3Rpb24gaGlnaGxpZ2h0KGNvZGU6IHN0cmluZywgbGFuZzogc3RyaW5nLCBmaWxlOiBzdHJpbmcpOiBzdHJpbmcge1xuICBsYW5nID0gbGFuZ3NbbGFuZ10gfHwgbGFuZyB8fCAndHh0JztcbiAgbGV0IGdyYW1tYXIgPSBQcmlzbS5sYW5ndWFnZXNbbGFuZy50b0xvd2VyQ2FzZSgpXTtcblxuICBpZiAoIWdyYW1tYXIpIHtcbiAgICBjb25zb2xlLndhcm4oJ1twcmlzbV0gTWlzc2luZyBcIiVzXCIgZ3JhbW1hcjsgdXNpbmcgXCJ0eHRcIiBmYWxsYmFjaycsIGxhbmcpO1xuICAgIGdyYW1tYXIgPSBQcmlzbS5sYW5ndWFnZXMudHh0O1xuICB9XG5cbiAgbGV0IGZyb250bWF0dGVyOiB7XG4gICAgdGhlbWU/OiBzdHJpbmcgfCAnbGlnaHQnO1xuICAgIGhpZ2hsaWdodD86IGBbJHtzdHJpbmd9XWA7XG4gICAgZmlsZW5hbWU/OiBzdHJpbmc7XG4gICAgaGVhZGVyPzogc3RyaW5nO1xuICB9ID0ge307XG5cbiAgLy8gQ2hlY2sgZm9yIGEgWUFNTCBmcm9udG1hdHRlcixcbiAgLy8gYW5kIGVuc3VyZSBpdCdzIG5vdCBzb21ldGhpbmcgbGlrZSAtLS0tLUJFR0lOIENFUlRJRklDQVRFLS0tLS1cbiAgaWYgKGNvZGUuc3Vic3RyaW5nKDAsIDMpID09PSAnLS0tJyAmJiBjb2RlWzNdICE9ICctJykge1xuICAgIGxldCBpbmRleCA9IGNvZGUuaW5kZXhPZignLS0tJywgMyk7XG4gICAgaWYgKGluZGV4ID4gMykge1xuICAgICAgaW5kZXggKz0gMztcbiAgICAgIGxldCBjb250ZW50ID0gY29kZS5zdWJzdHJpbmcoMCwgaW5kZXgpO1xuICAgICAgY29kZSA9IGNvZGUuc3Vic3RyaW5nKGluZGV4KS5yZXBsYWNlKC9eKFxccj9cXG4pKy8sICcnKTtcblxuICAgICAgLy8gVE9ETzogcGFzcyBpbiBgdXRpbHMuZnJvbnRtYXR0ZXJgIGhlcmVcbiAgICAgIC8vIGZyb250bWF0dGVyID0gdXRpbHMuZnJvbnRtYXR0ZXIoY29udGVudCk7XG5cbiAgICAgIGxldCBtYXRjaCA9IC9eLS0tXFxyP1xcbihbXFxzXFxTXSs/KVxccj9cXG4tLS0vLmV4ZWMoY29udGVudCk7XG4gICAgICBpZiAobWF0Y2ggIT0gbnVsbClcbiAgICAgICAgbWF0Y2hbMV0uc3BsaXQoJ1xcbicpLmZvckVhY2gocGFpciA9PiB7XG4gICAgICAgICAgbGV0IFtrZXksIC4uLnZdID0gcGFpci5zcGxpdCgnOicpO1xuICAgICAgICAgIGZyb250bWF0dGVyW2tleS50cmltKCkgYXMgJ3RoZW1lJ10gPSB2LmpvaW4oJzonKS50cmltKCk7XG4gICAgICAgIH0pO1xuICAgIH1cbiAgfVxuXG4gIGxldCBoaWdobGlnaHRzOiBTZXQ8bnVtYmVyPjtcblxuICB0cnkge1xuICAgIGhpZ2hsaWdodHMgPSBuZXcgU2V0KEpTT04ucGFyc2UoZnJvbnRtYXR0ZXIuaGlnaGxpZ2h0IHx8ICdbXScpLm1hcCgoeDogbnVtYmVyKSA9PiB4IC0gMSkpO1xuICB9IGNhdGNoIChlcnIpIHtcbiAgICBwcm9jZXNzLnN0ZGVyci53cml0ZShgW0VSUk9SXSAke2ZpbGV9XFxuU3ludGF4IGhpZ2hsaWdodGluZyBlcnJvcjogWW91IG11c3Qgc3BlY2lmeSB0aGUgbGluZXMgdG8gaGlnaGxpZ2h0IGFzIGFuIGFycmF5IChlLmcuLCAnWzJdJykuIEZvdW5kICcke2Zyb250bWF0dGVyLmhpZ2hsaWdodH0nLlxcbmApO1xuICAgIC8vIHN0aWxsIHRocm93aW5nIHRoZSBvcmlnaW5hbCBlcnJvciBiZWNhdXNlIGl0IGNvdWxkIGJlIHNvbWV0aGluZyBlbHNlXG4gICAgdGhyb3cgZXJyO1xuICB9XG5cbiAgLy8gdG9rZW5pemUgJiBidWlsZCBjdXN0b20gc3RyaW5nIG91dHB1dFxuICBsZXQgdG9rZW5zID0gUHJpc20udG9rZW5pemUoY29kZSwgZ3JhbW1hcik7XG4gIGxldCBvdXRwdXQgPSAnJztcblxuICBsZXQgdGhlbWUgPSBmcm9udG1hdHRlci50aGVtZSB8fCAnbGlnaHQnO1xuICBvdXRwdXQgKz0gJzxwcmUgY2xhc3M9XCJDb2RlQmxvY2sgQ29kZUJsb2NrLXdpdGgtcm93cyBDb2RlQmxvY2stc2Nyb2xscy1ob3Jpem9udGFsbHknO1xuXG4gIGlmICh0aGVtZSA9PT0gJ2xpZ2h0Jykgb3V0cHV0ICs9ICcgQ29kZUJsb2NrLWlzLWxpZ2h0LWluLWxpZ2h0LXRoZW1lJztcbiAgb3V0cHV0ICs9IGAgQ29kZUJsb2NrLS1sYW5ndWFnZS0ke2xhbmd9XCIgbGFuZ3VhZ2U9XCIke2xhbmd9XCI+YDtcblxuICBpZiAoZnJvbnRtYXR0ZXIuaGVhZGVyKSBvdXRwdXQgKz0gYDxzcGFuIGNsYXNzPVwiQ29kZUJsb2NrLS1oZWFkZXJcIj4ke2Zyb250bWF0dGVyLmhlYWRlcn08L3NwYW4+YDtcbiAgZWxzZSBpZiAoZnJvbnRtYXR0ZXIuZmlsZW5hbWUpXG4gICAgb3V0cHV0ICs9IGA8c3BhbiBjbGFzcz1cIkNvZGVCbG9jay0tZmlsZW5hbWVcIj4ke2Zyb250bWF0dGVyLmZpbGVuYW1lfTwvc3Bhbj5gO1xuXG4gIG91dHB1dCArPSAnPGNvZGU+JztcbiAgb3V0cHV0ICs9ICc8c3BhbiBjbGFzcz1cIkNvZGVCbG9jay0tcm93c1wiPic7XG4gIG91dHB1dCArPSAnPHNwYW4gY2xhc3M9XCJDb2RlQmxvY2stLXJvd3MtY29udGVudFwiPic7XG5cbiAgbGV0IGkgPSAwO1xuICBsZXQgcm93ID0gJyc7XG4gIGxldCBsaW5lOiBMaW5lO1xuICBsZXQgbGluZXMgPSBub3JtYWxpemUodG9rZW5zKTtcblxuICBmb3IgKDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGluZSA9IGxpbmVzW2ldO1xuICAgIHJvdyA9ICc8c3BhbiBjbGFzcz1cIkNvZGVCbG9jay0tcm93JztcbiAgICByb3cgKz0gaGlnaGxpZ2h0cy5oYXMoaSkgPyAnIENvZGVCbG9jay0tcm93LWlzLWhpZ2hsaWdodGVkXCI+JyA6ICdcIj4nO1xuICAgIHJvdyArPSAnPHNwYW4gY2xhc3M9XCJDb2RlQmxvY2stLXJvdy1pbmRpY2F0b3JcIj48L3NwYW4+JztcbiAgICByb3cgKz0gJzxkaXYgY2xhc3M9XCJDb2RlQmxvY2stLXJvdy1jb250ZW50XCI+JztcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxpbmUubGVuZ3RoOyBqKyspIHtcbiAgICAgIHJvdyArPSAnPHNwYW4gY2xhc3M9XCInICsgbGluZVtqXS50eXBlcyArICdcIj4nICsgbGluZVtqXS5jb250ZW50ICsgJzwvc3Bhbj4nO1xuICAgIH1cbiAgICBvdXRwdXQgKz0gcm93ICsgJzwvZGl2Pjwvc3Bhbj4nO1xuICB9XG5cbiAgcmV0dXJuIG91dHB1dCArICc8L3NwYW4+PC9zcGFuPjwvY29kZT48L3ByZT4nO1xufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUEyUixTQUFTLGVBQWUsV0FBVztBQUM5VCxTQUFTLG9CQUEwQztBQUNuRCxTQUFTLG9CQUF1QztBQUNoRCxPQUFPLFVBQVU7OztBQ0h3UixPQUFPLFdBQVc7QUFLM1QsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUExQlAsV0FBVyxRQUFRO0FBNkJuQixNQUFNLFVBQVUsS0FBSztBQUFBLEVBQ25CLFNBQVM7QUFBQSxJQUNQLFNBQVM7QUFBQSxJQUNULE9BQU87QUFBQSxJQUNQLFlBQVk7QUFBQSxFQUNkO0FBQUEsRUFFQSxXQUFXO0FBQUEsSUFDVCxTQUFTO0FBQUEsSUFDVCxPQUFPO0FBQUEsRUFDVDtBQUFBLEVBRUEsU0FBUztBQUFBLElBQ1AsU0FBUztBQUFBLElBQ1QsUUFBUTtBQUFBLE1BQ04sUUFBUTtBQUFBLFFBQ04sU0FBUztBQUFBLFFBQ1QsT0FBTztB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
