// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { HTMLRewriter } from "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/html-rewriter-wasm/dist/html_rewriter.js";
import { defineConfig } from "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/vite/dist/node/index.js";
import glob from "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/glob/glob.js";

// bin/prism.config.ts
import Prism from "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/prismjs/prism.js";
import rangeParser from "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/parse-numeric-range/index.js";
import "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/prismjs/components/prism-bash.min.js";
import "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/prismjs/components/prism-c.min.js";
import "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/prismjs/components/prism-csharp.min.js";
import "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/prismjs/components/prism-csv.min.js";
import "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/prismjs/components/prism-diff.min.js";
import "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/prismjs/components/prism-git.min.js";
import "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/prismjs/components/prism-go.min.js";
import "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/prismjs/components/prism-graphql.min.js";
import "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/prismjs/components/prism-hcl.min.js";
import "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/prismjs/components/prism-http.min.js";
import "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/prismjs/components/prism-ini.min.js";
import "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/prismjs/components/prism-java.min.js";
import "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/prismjs/components/prism-json.min.js";
import "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/prismjs/components/prism-jsx.min.js";
import "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/prismjs/components/prism-markdown.min.js";
import "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/prismjs/components/prism-perl.min.js";
import "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/prismjs/components/prism-php.min.js";
import "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/prismjs/components/prism-python.min.js";
import "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/prismjs/components/prism-ruby.min.js";
import "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/prismjs/components/prism-rust.min.js";
import "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/prismjs/components/prism-sql.min.js";
import "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/prismjs/components/prism-typescript.min.js";
import "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/prismjs/components/prism-toml.min.js";
import "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/prismjs/components/prism-yaml.min.js";
import "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/prismjs/components/prism-kotlin.min.js";
import "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/prismjs/components/prism-swift.min.js";
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
import vue from "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/node_modules/@vitejs/plugin-vue/dist/index.mjs";
var __vite_injected_original_import_meta_url = "file:///home/zeno/Desktop/my_gh_repos/cloudflare-docs/vite.config.ts";
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
    },
    reportCompressedSize: false
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYmluL3ByaXNtLmNvbmZpZy50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9ob21lL3plbm8vRGVza3RvcC9teV9naF9yZXBvcy9jbG91ZGZsYXJlLWRvY3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9ob21lL3plbm8vRGVza3RvcC9teV9naF9yZXBvcy9jbG91ZGZsYXJlLWRvY3Mvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL2hvbWUvemVuby9EZXNrdG9wL215X2doX3JlcG9zL2Nsb3VkZmxhcmUtZG9jcy92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gXCJub2RlOnVybFwiO1xuaW1wb3J0IHsgSFRNTFJld3JpdGVyLCB0eXBlIEVsZW1lbnRIYW5kbGVycyB9IGZyb20gXCJodG1sLXJld3JpdGVyLXdhc21cIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgdHlwZSBQbHVnaW5PcHRpb24gfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IGdsb2IgZnJvbSBcImdsb2JcIjtcbmltcG9ydCB7IGhpZ2hsaWdodCB9IGZyb20gXCIuL2Jpbi9wcmlzbS5jb25maWdcIjtcbmltcG9ydCB2dWUgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXZ1ZVwiO1xuY29uc3QgZW5jb2RlciA9IG5ldyBUZXh0RW5jb2RlcigpO1xuY29uc3QgZGVjb2RlciA9IG5ldyBUZXh0RGVjb2RlcigpO1xuXG5hc3luYyBmdW5jdGlvbiByZXdyaXRlKFxuICBkb2N1bWVudDogc3RyaW5nLFxuICBoYW5kbGVyczogW3N0cmluZywgRWxlbWVudEhhbmRsZXJzXVtdXG4pIHtcbiAgbGV0IG91dHB1dCA9IFwiXCI7XG4gIGNvbnN0IHJld3JpdGVyID0gbmV3IEhUTUxSZXdyaXRlcigob3V0cHV0Q2h1bmspID0+IHtcbiAgICBvdXRwdXQgKz0gZGVjb2Rlci5kZWNvZGUob3V0cHV0Q2h1bmspO1xuICB9KTtcbiAgaGFuZGxlcnMuZm9yRWFjaCgoW2VsLCBoYW5kbGVyXSkgPT4gcmV3cml0ZXIub24oZWwsIGhhbmRsZXIpKTtcbiAgdHJ5IHtcbiAgICBhd2FpdCByZXdyaXRlci53cml0ZShlbmNvZGVyLmVuY29kZShkb2N1bWVudCkpO1xuICAgIGF3YWl0IHJld3JpdGVyLmVuZCgpO1xuICAgIHJldHVybiBvdXRwdXQ7XG4gIH0gZmluYWxseSB7XG4gICAgcmV3cml0ZXIuZnJlZSgpO1xuICB9XG59XG5cbmNvbnN0IGh5ZHJhdGVWdWVDb21wb25lbnRzID0gKCk6IFBsdWdpbk9wdGlvbiA9PiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogXCJoeWRyYXRlLXZ1ZVwiLFxuICAgIHRyYW5zZm9ybUluZGV4SHRtbDoge1xuICAgICAgb3JkZXI6IFwicHJlXCIsXG4gICAgICBoYW5kbGVyOiBhc3luYyAoaHRtbDogc3RyaW5nKSA9PiB7XG4gICAgICAgIGxldCBjb21wb25lbnRJZCA9IDE7XG4gICAgICAgIGlmICghaHRtbC5pbmNsdWRlcyhcInZ1ZS1jb21wb25lbnRcIikpIHJldHVybiBodG1sO1xuICAgICAgICByZXR1cm4gYXdhaXQgcmV3cml0ZShodG1sLCBbXG4gICAgICAgICAgW1xuICAgICAgICAgICAgXCJ2dWUtY29tcG9uZW50XCIsXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGVsZW1lbnQ6IChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgICAgY29uc3QgbklkID0gY29tcG9uZW50SWQrKztcbiAgICAgICAgICAgICAgICBjb25zdCBuYW1lID0gZWxlbWVudC5nZXRBdHRyaWJ1dGUoXCJuYW1lXCIpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQudGFnTmFtZSA9IFwiZGl2XCI7XG4gICAgICAgICAgICAgICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoXCJuYW1lXCIpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuc2V0QXR0cmlidXRlKFwiaWRcIiwgYHZ1ZS1jLSR7bklkfWApO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuYWZ0ZXIoXG4gICAgICAgICAgICAgICAgICBgPHNjcmlwdCB0eXBlPVwibW9kdWxlXCI+XG4gICAgICAgICAgICAgICAgICBpbXBvcnQgeyBjcmVhdGVBcHAgfSBmcm9tICd2dWUnXG4gICAgICAgICAgICAgICAgICBpbXBvcnQgQ29tcG9uZW50IGZyb20gXCJALyR7bmFtZX0udnVlXCJcbiAgICAgICAgICAgICAgICAgIGNvbnN0IHJvb3QgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndnVlLWMtJHtuSWR9JylcbiAgICAgICAgICAgICAgICAgIGNyZWF0ZUFwcChDb21wb25lbnQsIHsuLi5yb290LmRhdGFzZXR9KS5tb3VudChyb290LCB0cnVlKVxuICAgICAgICAgICAgICA8L3NjcmlwdD5gLFxuICAgICAgICAgICAgICAgICAgeyBodG1sOiB0cnVlIH1cbiAgICAgICAgICAgICAgICApO1xuICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgfSxcbiAgICAgICAgICBdLFxuICAgICAgICBdKTtcbiAgICAgIH0sXG4gICAgfSxcbiAgfTtcbn07XG5cbmNvbnN0IHJlbmRlckNvZGVCbG9jayA9ICgpOiBQbHVnaW5PcHRpb24gPT4ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6IFwicmVuZGVyLWNvZGUtYmxvY2tcIixcbiAgICBhc3luYyB0cmFuc2Zvcm1JbmRleEh0bWwoaHRtbDogc3RyaW5nKSB7XG4gICAgICBpZiAoIWh0bWwuaW5jbHVkZXMoXCJ1bnBhcnNlZC1jb2RlYmxvY2tcIikpIHJldHVybiBodG1sO1xuXG4gICAgICByZXR1cm4gYXdhaXQgcmV3cml0ZShodG1sLCBbXG4gICAgICAgIFtcbiAgICAgICAgICBcInVucGFyc2VkLWNvZGVibG9ja1wiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IGRhdGEgPSBlbGVtZW50XG4gICAgICAgICAgICAgICAgLmdldEF0dHJpYnV0ZShcImRhdGEtY29kZVwiKSFcbiAgICAgICAgICAgICAgICAvLyBIdWdvJ3MgdXJsIGVuY29kaW5nIGlzIC4uLm9kZFxuICAgICAgICAgICAgICAgIC5yZXBsYWNlQWxsKFwiJiM0MztcIiwgXCIgXCIpO1xuXG4gICAgICAgICAgICAgIGlmIChkYXRhLmluY2x1ZGVzKFwiJiNcIikpIHtcbiAgICAgICAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXCJVbmV4cGVjdGVkIEhUTUwgZW50aXR5OiBcIiArIGRhdGEpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIGNvbnN0IGRlY29kZWQgPSBkZWNvZGVVUklDb21wb25lbnQoZGF0YSk7XG4gICAgICAgICAgICAgIGNvbnN0IGNvZGUgPSBkZWNvZGVkICsgXCJcXG5cIjtcbiAgICAgICAgICAgICAgZWxlbWVudC5yZXBsYWNlKFxuICAgICAgICAgICAgICAgIGhpZ2hsaWdodChjb2RlLCBlbGVtZW50LmdldEF0dHJpYnV0ZShcImRhdGEtbGFuZ3VhZ2VcIikhLCBcIlwiKSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBodG1sOiB0cnVlLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIF0pO1xuICAgIH0sXG4gIH07XG59O1xuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtyZW5kZXJDb2RlQmxvY2soKSwgaHlkcmF0ZVZ1ZUNvbXBvbmVudHMoKSwgdnVlKCldLFxuICByb290OiBcInB1YmxpY1wiLFxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgIFwiQFwiOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoXCIuL2NvbXBvbmVudHNcIiwgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgICBkYXRhOiBmaWxlVVJMVG9QYXRoKG5ldyBVUkwoXCIuL2RhdGFcIiwgaW1wb3J0Lm1ldGEudXJsKSksXG4gICAgfSxcbiAgfSxcbiAgYnVpbGQ6IHtcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBpbnB1dDogZ2xvYi5zeW5jKFwicHVibGljLyoqLyouaHRtbFwiKSxcbiAgICB9LFxuICAgIHJlcG9ydENvbXByZXNzZWRTaXplOiBmYWxzZSxcbiAgfSxcbn0pO1xuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvaG9tZS96ZW5vL0Rlc2t0b3AvbXlfZ2hfcmVwb3MvY2xvdWRmbGFyZS1kb2NzL2JpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL2hvbWUvemVuby9EZXNrdG9wL215X2doX3JlcG9zL2Nsb3VkZmxhcmUtZG9jcy9iaW4vcHJpc20uY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9ob21lL3plbm8vRGVza3RvcC9teV9naF9yZXBvcy9jbG91ZGZsYXJlLWRvY3MvYmluL3ByaXNtLmNvbmZpZy50c1wiO2ltcG9ydCBQcmlzbSBmcm9tICdwcmlzbWpzJztcbmltcG9ydCByYW5nZVBhcnNlciBmcm9tICdwYXJzZS1udW1lcmljLXJhbmdlJztcblxuaW1wb3J0IHR5cGUgeyBUb2tlbiwgVG9rZW5TdHJlYW0gfSBmcm9tICdwcmlzbWpzJztcblxuZ2xvYmFsVGhpcy5QcmlzbSA9IFByaXNtO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tYmFzaC5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tYy5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY3NoYXJwLm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1jc3YubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWRpZmYubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWdpdC5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tZ28ubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWdyYXBocWwubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWhjbC5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20taHR0cC5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20taW5pLm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1qYXZhLm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1qc29uLm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1qc3gubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLW1hcmtkb3duLm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1wZXJsLm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1waHAubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXB5dGhvbi5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcnVieS5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcnVzdC5taW4uanMnO1xuaW1wb3J0ICdwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tc3FsLm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS10eXBlc2NyaXB0Lm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS10b21sLm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS15YW1sLm1pbi5qcyc7XG5pbXBvcnQgJ3ByaXNtanMvY29tcG9uZW50cy9wcmlzbS1rb3RsaW4ubWluLmpzJztcbmltcG9ydCAncHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXN3aWZ0Lm1pbi5qcyc7XG5cbi8vIEN1c3RvbSBgc2hlbGxgIGdyYW1tYXJcblByaXNtLmxhbmd1YWdlcy5zaCA9IHtcbiAgY29tbWVudDoge1xuICAgIHBhdHRlcm46IC8oXnxbXid7XFxcXCRdKSMuKi8sXG4gICAgYWxpYXM6ICd1bnNlbGVjdGFibGUnLFxuICAgIGxvb2tiZWhpbmQ6IHRydWUsXG4gIH0sXG5cbiAgZGlyZWN0b3J5OiB7XG4gICAgcGF0dGVybjogL15bXlxcclxcbiQqIV0rKD89WyRdKS9tLFxuICAgIGFsaWFzOiAndW5zZWxlY3RhYmxlJyxcbiAgfSxcblxuICBjb21tYW5kOiB7XG4gICAgcGF0dGVybjogL1skXSg/OlteXFxyXFxuXSkrLyxcbiAgICBpbnNpZGU6IHtcbiAgICAgIHByb21wdDoge1xuICAgICAgICBwYXR0ZXJuOiAvXlskXSAvLFxuICAgICAgICBhbGlhczogJ3Vuc2VsZWN0YWJsZScsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG59O1xuXG4vLyBQcmlzbSBsYW5ndWFnZSBhbGlhc2VzXG5leHBvcnQgY29uc3QgbGFuZ3M6IFJlY29yZDxzdHJpbmcsIHN0cmluZz4gPSB7XG4gIHRmOiAnaGNsJywgLy8gdGVycmFmb3JtIC0+IGhhc2hpY29ycCBjb25maWcgbGFuZ1xuICByczogJ3J1c3QnLFxuICBzaGVsbDogJ3NoJyxcbiAgY3VybDogJ2Jhc2gnLFxuICBncWw6ICdncmFwaHFsJyxcbiAgc3ZlbHRlOiAnaHRtbCcsXG4gIGphdmFzY3JpcHQ6ICdqcycsXG4gIGpzb25jOiAnanNvbicsXG4gIHR5cGVzY3JpcHQ6ICd0cycsXG4gIHBsYWludGV4dDogJ3R4dCcsXG4gIHRleHQ6ICd0eHQnLFxuICBweTogJ3B5dGhvbicsXG4gIHZ1ZTogJ2h0bWwnLFxuICByYjogJ3J1YnknLFxufTtcblxuLy8gQ3VzdG9tIHRva2VuIHRyYW5zZm9ybXNcbmNvbnN0IHRyYW5zZm9ybWF0aW9uczogUmVjb3JkPHN0cmluZywgYW55PiA9IHtcbiAganM6IHtcbiAgICAna2V5d29yZCc6IHtcbiAgICAgIHRvOiAnZGVjbGFyYXRpb24ta2V5d29yZCcsXG4gICAgICBmb3I6IG5ldyBTZXQoWydjb25zdCcsICdsZXQnLCAndmFyJywgJ2FzeW5jJywgJ2F3YWl0JywgJ2Z1bmN0aW9uJywgJ2NsYXNzJ10pLFxuICAgIH0sXG4gICAgJ3B1bmN0dWF0aW9uJzoge1xuICAgICAgdG86ICdvcGVyYXRvcicsXG4gICAgICBmb3I6IG5ldyBTZXQoWycuJ10pLFxuICAgIH0sXG4gICAgJ2NsYXNzLW5hbWUnOiB7XG4gICAgICB0bzogJ2FwaScsXG4gICAgICBmb3I6IG5ldyBTZXQoWydIVE1MUmV3cml0ZXInLCAnUmVxdWVzdCcsICdSZXNwb25zZScsICdVUkwnLCAnRXJyb3InXSksXG4gICAgfSxcbiAgICAnZnVuY3Rpb24nOiB7XG4gICAgICB0bzogJ2J1aWx0aW4nLFxuICAgICAgZm9yOiBuZXcgU2V0KFtcbiAgICAgICAgJ2ZldGNoJyxcbiAgICAgICAgJ2NvbnNvbGUnLFxuICAgICAgICAnYWRkRXZlbnRMaXN0ZW5lcicsXG4gICAgICAgICdhdG9iJyxcbiAgICAgICAgJ2J0b2EnLFxuICAgICAgICAnc2V0SW50ZXJ2YWwnLFxuICAgICAgICAnY2xlYXJJbnRlcnZhbCcsXG4gICAgICAgICdzZXRUaW1lb3V0JyxcbiAgICAgICAgJ2NsZWFyVGltZW91dCcsXG4gICAgICBdKSxcbiAgICB9LFxuICB9LFxufTtcblxudHJhbnNmb3JtYXRpb25zLnRzID0gdHJhbnNmb3JtYXRpb25zLmpzO1xuXG50cmFuc2Zvcm1hdGlvbnMuaHRtbCA9IHtcbiAga2V5d29yZDogdHJhbnNmb3JtYXRpb25zLmpzLmtleXdvcmQsXG59O1xuXG5pbnRlcmZhY2UgTm9kZSB7XG4gIHR5cGVzOiBzdHJpbmc7XG4gIGNvbnRlbnQ6IHN0cmluZztcbn1cblxudHlwZSBMaW5lID0gTm9kZVtdO1xuXG5jb25zdCBFU0NBUEUgPSAvWyZcIjw+XS9nO1xuY29uc3QgQ0hBUlMgPSB7XG4gICdcIic6ICcmcXVvdDsnLFxuICAnJic6ICcmYW1wOycsXG4gICc8JzogJyZsdDsnLFxuICAnPic6ICcmZ3Q7Jyxcbn07XG5cbi8vIEBzZWUgbHVrZWVkL3RlbXB1cmFcbmZ1bmN0aW9uIHRvRXNjYXBlKHZhbHVlOiBzdHJpbmcpIHtcbiAgbGV0IHRtcCA9IDA7XG4gIGxldCBvdXQgPSAnJztcbiAgbGV0IGxhc3QgPSAoRVNDQVBFLmxhc3RJbmRleCA9IDApO1xuICB3aGlsZSAoRVNDQVBFLnRlc3QodmFsdWUpKSB7XG4gICAgdG1wID0gRVNDQVBFLmxhc3RJbmRleCAtIDE7XG4gICAgb3V0ICs9IHZhbHVlLnN1YnN0cmluZyhsYXN0LCB0bXApICsgQ0hBUlNbdmFsdWVbdG1wXSBhcyBrZXlvZiB0eXBlb2YgQ0hBUlNdO1xuICAgIGxhc3QgPSB0bXAgKyAxO1xuICB9XG4gIHJldHVybiBvdXQgKyB2YWx1ZS5zdWJzdHJpbmcobGFzdCk7XG59XG5cbmZ1bmN0aW9uIG5vcm1hbGl6ZSh0b2tlbnM6IChUb2tlbiB8IHN0cmluZylbXSkge1xuICBsZXQgbGluZTogTGluZSA9IFtdO1xuICBsZXQgbGluZXM6IExpbmVbXSA9IFtdO1xuXG4gIGZ1bmN0aW9uIGxvb3AodHlwZXM6IHN0cmluZywgaXRlbTogVG9rZW5TdHJlYW0pIHtcbiAgICBpZiAoQXJyYXkuaXNBcnJheShpdGVtKSkge1xuICAgICAgaXRlbS5mb3JFYWNoKHggPT4gbG9vcCh0eXBlcywgeCkpO1xuICAgIH0gZWxzZSBpZiAodHlwZW9mIGl0ZW0gPT09ICdzdHJpbmcnKSB7XG4gICAgICB0eXBlcyA9IHR5cGVzIHx8ICdDb2RlQmxvY2stLXRva2VuLXBsYWluJztcblxuICAgICAgaWYgKGl0ZW0gPT09ICcnKSB7XG4gICAgICAgIC8vIGlnbm9yZVxuICAgICAgfSBlbHNlIGlmIChpdGVtID09PSAnXFxuJykge1xuICAgICAgICBsaW5lLnB1c2goeyB0eXBlcywgY29udGVudDogaXRlbSB9KTtcbiAgICAgICAgbGluZXMucHVzaChsaW5lKTtcbiAgICAgICAgbGluZSA9IFtdO1xuICAgICAgfSBlbHNlIGlmIChpdGVtID09PSAnXFxuXFxuJykge1xuICAgICAgICBsaW5lLnB1c2goeyB0eXBlcywgY29udGVudDogJ1xcbicgfSk7XG4gICAgICAgIGxpbmVzLnB1c2gobGluZSk7XG5cbiAgICAgICAgbGluZSA9IFt7IHR5cGVzOiAnQ29kZUJsb2NrLS10b2tlbi1wbGFpbicsIGNvbnRlbnQ6ICdcXG4nIH1dO1xuICAgICAgICBsaW5lcy5wdXNoKGxpbmUpO1xuXG4gICAgICAgIGxpbmUgPSBbXTtcbiAgICAgIH0gZWxzZSBpZiAoaXRlbS5pbmNsdWRlcygnXFxuJykpIHtcbiAgICAgICAgaXRlbS5zcGxpdCgvXFxyP1xcbi9nKS5mb3JFYWNoKCh0eHQsIGlkeCwgYXJyKSA9PiB7XG4gICAgICAgICAgaWYgKCF0eHQgJiYgIWlkeCAmJiBpZHggPCBhcnIubGVuZ3RoKSByZXR1cm47XG4gICAgICAgICAgbGV0IGNvbnRlbnQgPSB0eHQgPyB0b0VzY2FwZSh0eHQpIDogJ1xcbic7XG5cbiAgICAgICAgICBpZiAoaWR4ID4gMCkge1xuICAgICAgICAgICAgbGluZXMucHVzaChsaW5lKTtcbiAgICAgICAgICAgIGxpbmUgPSBbXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGluZS5wdXNoKHsgdHlwZXMsIGNvbnRlbnQgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSB0b0VzY2FwZShpdGVtKTtcbiAgICAgICAgbGluZS5wdXNoKHsgdHlwZXMsIGNvbnRlbnQgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpdGVtKSB7XG4gICAgICBpZiAodHlwZXMpIHR5cGVzICs9ICcgJztcbiAgICAgIHR5cGVzICs9ICdDb2RlQmxvY2stLXRva2VuLScgKyBpdGVtLnR5cGU7XG5cbiAgICAgIGlmIChpdGVtLmFsaWFzKSB7XG4gICAgICAgIChbXSBhcyBzdHJpbmdbXSkuY29uY2F0KGl0ZW0uYWxpYXMpLmZvckVhY2godHQgPT4ge1xuICAgICAgICAgIGlmICghdHlwZXMuaW5jbHVkZXModHQpKSB7XG4gICAgICAgICAgICBpZiAodHlwZXMpIHR5cGVzICs9ICcgJztcbiAgICAgICAgICAgIHR5cGVzICs9ICdDb2RlQmxvY2stLXRva2VuLScgKyB0dDtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgICAgbG9vcCh0eXBlcywgaXRlbS5jb250ZW50KTtcbiAgICB9XG4gIH1cblxuICBmb3IgKGxldCBpID0gMDsgaSA8IHRva2Vucy5sZW5ndGg7IGkrKykge1xuICAgIGxvb3AoJycsIHRva2Vuc1tpXSk7XG4gIH1cblxuICBpZiAobGluZS5sZW5ndGggPiAwKSB7XG4gICAgbGluZXMucHVzaChsaW5lKTtcbiAgfVxuXG4gIGxldCBhcnI6IExpbmVbXSA9IFtdO1xuICB3aGlsZSAoKGxpbmUgPSBsaW5lcy5zaGlmdCgpKSkge1xuICAgIGlmIChsaW5lLmxlbmd0aCA+IDEgJiYgbGluZVswXS5jb250ZW50ID09PSAnXFxuJykge1xuICAgICAgLy8gcmVtb3ZlIGV4dHJhIGxlYWRpbmcgXCJcXG5cIiBpdGVtcyBmb3Igbm9uLXdoaXRlc3BhY2UgbGluZXNcbiAgICAgIGxpbmVbMF0uY29udGVudCA9IFwiXCJcbiAgICAgIGFyci5wdXNoKGxpbmUpXG4gICAgfSBlbHNlIHtcbiAgICAgIGFyci5wdXNoKGxpbmUpO1xuICAgIH1cbiAgfVxuXG4gIGxpbmVzID0gYXJyO1xuXG4gIC8vIGNoZWNrIGZvciB1c2VsZXNzIG5ld2xpbmVcbiAgLy8gfj4gbGFzdCBsaW5lIHdpbGwgYmUgc2luZ2xlLWl0ZW0gQXJyYXlcbiAgbGV0IGxhc3QgPSBsaW5lcy5wb3AoKTtcbiAgaWYgKGxhc3QubGVuZ3RoICE9PSAxIHx8IGxhc3RbMF0uY29udGVudC50cmltKCkubGVuZ3RoID4gMSkge1xuICAgIGxpbmVzLnB1c2gobGFzdCk7IC8vIGFkZCBpdCBiYWNrLCB3YXMgdXNlZnVsXG4gIH1cblxuICByZXR1cm4gbGluZXM7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBoaWdobGlnaHQoY29kZTogc3RyaW5nLCBsYW5nOiBzdHJpbmcsIGZpbGU6IHN0cmluZyk6IHN0cmluZyB7XG4gIGxhbmcgPSBsYW5nc1tsYW5nXSB8fCBsYW5nIHx8ICd0eHQnO1xuICBsZXQgZ3JhbW1hciA9IFByaXNtLmxhbmd1YWdlc1tsYW5nLnRvTG93ZXJDYXNlKCldO1xuXG4gIGlmICghZ3JhbW1hcikge1xuICAgIGNvbnNvbGUud2FybignW3ByaXNtXSBNaXNzaW5nIFwiJXNcIiBncmFtbWFyOyB1c2luZyBcInR4dFwiIGZhbGxiYWNrJywgbGFuZyk7XG4gICAgZ3JhbW1hciA9IFByaXNtLmxhbmd1YWdlcy50eHQ7XG4gIH1cblxuICBsZXQgZnJvbnRtYXR0ZXI6IHtcbiAgICB0aGVtZT86IHN0cmluZyB8ICdsaWdodCc7XG4gICAgaGlnaGxpZ2h0PzogYFske3N0cmluZ31dYCB8IHN0cmluZztcbiAgICBmaWxlbmFtZT86IHN0cmluZztcbiAgICBoZWFkZXI/OiBzdHJpbmc7XG4gIH0gPSB7fTtcblxuICAvLyBDaGVjayBmb3IgYSBZQU1MIGZyb250bWF0dGVyLFxuICAvLyBhbmQgZW5zdXJlIGl0J3Mgbm90IHNvbWV0aGluZyBsaWtlIC0tLS0tQkVHSU4gQ0VSVElGSUNBVEUtLS0tLVxuICBpZiAoY29kZS5zdWJzdHJpbmcoMCwgMykgPT09ICctLS0nICYmIGNvZGVbM10gIT0gJy0nKSB7XG4gICAgbGV0IGluZGV4ID0gY29kZS5pbmRleE9mKCctLS0nLCAzKTtcbiAgICBpZiAoaW5kZXggPiAzKSB7XG4gICAgICBpbmRleCArPSAzO1xuICAgICAgbGV0IGNvbnRlbnQgPSBjb2RlLnN1YnN0cmluZygwLCBpbmRleCk7XG4gICAgICBjb2RlID0gY29kZS5zdWJzdHJpbmcoaW5kZXgpLnJlcGxhY2UoL14oXFxyP1xcbikrLywgJycpO1xuXG4gICAgICAvLyBUT0RPOiBwYXNzIGluIGB1dGlscy5mcm9udG1hdHRlcmAgaGVyZVxuICAgICAgLy8gZnJvbnRtYXR0ZXIgPSB1dGlscy5mcm9udG1hdHRlcihjb250ZW50KTtcblxuICAgICAgbGV0IG1hdGNoID0gL14tLS1cXHI/XFxuKFtcXHNcXFNdKz8pXFxyP1xcbi0tLS8uZXhlYyhjb250ZW50KTtcbiAgICAgIGlmIChtYXRjaCAhPSBudWxsKVxuICAgICAgICBtYXRjaFsxXS5zcGxpdCgnXFxuJykuZm9yRWFjaChwYWlyID0+IHtcbiAgICAgICAgICBsZXQgW2tleSwgLi4udl0gPSBwYWlyLnNwbGl0KCc6Jyk7XG4gICAgICAgICAgZnJvbnRtYXR0ZXJba2V5LnRyaW0oKSBhcyAndGhlbWUnXSA9IHYuam9pbignOicpLnRyaW0oKTtcbiAgICAgICAgfSk7XG4gICAgfVxuICB9XG5cbiAgbGV0IGhpZ2hsaWdodHM6IFNldDxudW1iZXI+O1xuXG4gIHRyeSB7XG4gICAgbGV0IGhpZ2hsaWdodCA9IGZyb250bWF0dGVyLmhpZ2hsaWdodDtcbiAgICAvLyBsZXQgcmFuZ2UtcGFyc2VyIGRvIHRoZSBoZWF2eSBsaWZ0aW5nLiBJdCBoYW5kbGVzIGFsbCBzdXBwb3J0ZWQgY2FzZXNcbiAgICBpZiAoaGlnaGxpZ2h0Py5zdGFydHNXaXRoKCdbJykpIHtcbiAgICAgIGhpZ2hsaWdodCA9IGhpZ2hsaWdodC5zdWJzdHJpbmcoMSwgaGlnaGxpZ2h0Lmxlbmd0aCAtIDEpO1xuICAgIH1cbiAgICBjb25zdCBwYXJzZWRSYW5nZSA9IHJhbmdlUGFyc2VyKGhpZ2hsaWdodCB8fCAnJylcbiAgICBoaWdobGlnaHRzID0gbmV3IFNldChwYXJzZWRSYW5nZS5tYXAoKHg6IG51bWJlcikgPT4geCAtIDEpKTtcbiAgfSBjYXRjaCAoZXJyKSB7XG4gICAgcHJvY2Vzcy5zdGRlcnIud3JpdGUoYFtFUlJPUl0gJHtmaWxlfVxcblN5bnRheCBoaWdobGlnaHRpbmcgZXJyb3I6IFlvdSBtdXN0IHNwZWNpZnkgdGhlIGxpbmVzIHRvIGhpZ2hsaWdodCBhcyBhbiBhcnJheSAoZS5nLiwgJ1syXScpLiBGb3VuZCAnJHtmcm9udG1hdHRlci5oaWdobGlnaHR9Jy5cXG5gKTtcbiAgICAvLyBzdGlsbCB0aHJvd2luZyB0aGUgb3JpZ2luYWwgZXJyb3IgYmVjYXVzZSBpdCBjb3VsZCBiZSBzb21ldGhpbmcgZWxzZVxuICAgIHRocm93IGVycjtcbiAgfVxuXG4gIC8vIHRva2VuaXplICYgYnVpbGQgY3VzdG9tIHN0cmluZyBvdXRwdXRcbiAgbGV0IHRva2VucyA9IFByaXNtLnRva2VuaXplKGNvZGUsIGdyYW1tYXIpO1xuICBsZXQgb3V0cHV0ID0gJyc7XG5cbiAgbGV0IHRoZW1lID0gZnJvbnRtYXR0ZXIudGhlbWUgfHwgJ2xpZ2h0JztcbiAgb3V0cHV0ICs9ICc8cHJlIGNsYXNzPVwiQ29kZUJsb2NrIENvZGVCbG9jay13aXRoLXJvd3MgQ29kZUJsb2NrLXNjcm9sbHMtaG9yaXpvbnRhbGx5JztcblxuICBpZiAodGhlbWUgPT09ICdsaWdodCcpIG91dHB1dCArPSAnIENvZGVCbG9jay1pcy1saWdodC1pbi1saWdodC10aGVtZSc7XG4gIG91dHB1dCArPSBgIENvZGVCbG9jay0tbGFuZ3VhZ2UtJHtsYW5nfVwiIGxhbmd1YWdlPVwiJHtsYW5nfVwiPmA7XG5cbiAgaWYgKGZyb250bWF0dGVyLmhlYWRlcikgb3V0cHV0ICs9IGA8c3BhbiBjbGFzcz1cIkNvZGVCbG9jay0taGVhZGVyXCI+JHtmcm9udG1hdHRlci5oZWFkZXJ9PC9zcGFuPmA7XG4gIGVsc2UgaWYgKGZyb250bWF0dGVyLmZpbGVuYW1lKVxuICAgIG91dHB1dCArPSBgPHNwYW4gY2xhc3M9XCJDb2RlQmxvY2stLWZpbGVuYW1lXCI+JHtmcm9udG1hdHRlci5maWxlbmFtZX08L3NwYW4+YDtcbiAgZWxzZSBvdXRwdXQgKz0gYDxzcGFuIGNsYXNzPVwiQ29kZUJsb2NrLS1oZWFkZXJcIj48YnIvPjwvc3Bhbj5gO1xuXG4gIG91dHB1dCArPSAnPGNvZGU+JztcbiAgb3V0cHV0ICs9ICc8c3BhbiBjbGFzcz1cIkNvZGVCbG9jay0tcm93c1wiPic7XG4gIG91dHB1dCArPSAnPHNwYW4gY2xhc3M9XCJDb2RlQmxvY2stLXJvd3MtY29udGVudFwiPic7XG5cbiAgbGV0IGkgPSAwO1xuICBsZXQgcm93ID0gJyc7XG4gIGxldCBsaW5lOiBMaW5lO1xuICBsZXQgbGluZXMgPSBub3JtYWxpemUodG9rZW5zKTtcblxuICBmb3IgKDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGluZSA9IGxpbmVzW2ldO1xuICAgIHJvdyA9ICc8c3BhbiBjbGFzcz1cIkNvZGVCbG9jay0tcm93JztcbiAgICByb3cgKz0gaGlnaGxpZ2h0cy5oYXMoaSkgPyAnIENvZGVCbG9jay0tcm93LWlzLWhpZ2hsaWdodGVkXCI+JyA6ICdcIj4nO1xuICAgIHJvdyArPSAnPHNwYW4gY2xhc3M9XCJDb2RlQmxvY2stLXJvdy1pbmRpY2F0b3JcIj48L3NwYW4+JztcbiAgICByb3cgKz0gJzxkaXYgY2xhc3M9XCJDb2RlQmxvY2stLXJvdy1jb250ZW50XCI+JztcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxpbmUubGVuZ3RoOyBqKyspIHtcbiAgICAgIHJvdyArPSAnPHNwYW4gY2xhc3M9XCInICsgbGluZVtqXS50eXBlcyArICdcIj4nICsgbGluZVtqXS5jb250ZW50ICsgJzwvc3Bhbj4nO1xuICAgIH1cbiAgICBvdXRwdXQgKz0gcm93ICsgJzwvZGl2Pjwvc3Bhbj4nO1xuICB9XG5cbiAgcmV0dXJuIG91dHB1dCArICc8L3NwYW4+PC9zcGFuPjwvY29kZT48L3ByZT4nO1xufVxu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
