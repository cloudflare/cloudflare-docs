// vite.config.ts
import { fileURLToPath, URL } from "node:url";
import { HTMLRewriter } from "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/html-rewriter-wasm/dist/html_rewriter.js";
import { defineConfig } from "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/vite/dist/node/index.js";
import { globSync } from "file:///Users/kodyshermanjackson/Desktop/cloudflare-docs/node_modules/glob/dist/esm/index.js";

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
  },
  output: {
    pattern: /.(?:.*(?:[\r\n]|.$))*/,
    alias: "unselectable"
  }
};
var originalGrammar = Prism.languages.powershell;
Prism.languages.powershell = {
  comment: {
    pattern: /(^|[^'{\\$])#.*/,
    alias: "unselectable",
    lookbehind: true
  },
  directory: {
    pattern: /^PS (?=\w:[\w\\-]+> )/m,
    alias: "unselectable"
  },
  command: {
    pattern: /\w:[\w\\-]+> [^\r\n]+/,
    inside: {
      "prompt": {
        pattern: /^\w:[\w\\-]+> /,
        alias: "unselectable"
      },
      "comment": originalGrammar.comment,
      "string": originalGrammar.string,
      "boolean": originalGrammar.boolean,
      "variable": /\$\w+\b/,
      "function": originalGrammar.function,
      "keyword": originalGrammar.keyword,
      "operator": [
        {
          pattern: /(^|\W)(?:!|-(?:b?(?:and|x?or)|as|(?:Not)?(?:Contains|In|Like|Match)|eq|ge|gt|is(?:Not)?|Join|le|lt|ne|not|Replace|sh[lr])\b|[*%]=?)/i,
          lookbehind: true
        }
      ],
      "punctuation": originalGrammar.punctuation
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
          if (!txt && !idx && idx < arr2.length) return;
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
      if (types) types += " ";
      types += "CodeBlock--token-" + item.type;
      if (item.alias) {
        [].concat(item.alias).forEach((tt) => {
          if (!types.includes(tt)) {
            if (types) types += " ";
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
    if (highlight2?.startsWith("[")) {
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
  if (theme === "light") output += " CodeBlock-is-light-in-light-theme";
  output += ` CodeBlock--language-${lang}" language="${lang}"`;
  if (frontmatter.header) output += ` title="${frontmatter.header}">`;
  else output += ">";
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
      if (!html.includes("unparsed-codeblock")) return html;
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
      input: globSync("public/**/*.html")
    },
    reportCompressedSize: false
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAiYmluL3ByaXNtLmNvbmZpZy50cyIsICJiaW4vcGxheWdyb3VuZC50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiY29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2Rpcm5hbWUgPSBcIi9Vc2Vycy9rb2R5c2hlcm1hbmphY2tzb24vRGVza3RvcC9jbG91ZGZsYXJlLWRvY3NcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9rb2R5c2hlcm1hbmphY2tzb24vRGVza3RvcC9jbG91ZGZsYXJlLWRvY3Mvdml0ZS5jb25maWcudHNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL1VzZXJzL2tvZHlzaGVybWFuamFja3Nvbi9EZXNrdG9wL2Nsb3VkZmxhcmUtZG9jcy92aXRlLmNvbmZpZy50c1wiO2ltcG9ydCB7IGZpbGVVUkxUb1BhdGgsIFVSTCB9IGZyb20gXCJub2RlOnVybFwiO1xuaW1wb3J0IHsgSFRNTFJld3JpdGVyLCB0eXBlIEVsZW1lbnRIYW5kbGVycyB9IGZyb20gXCJodG1sLXJld3JpdGVyLXdhc21cIjtcbmltcG9ydCB7IGRlZmluZUNvbmZpZywgdHlwZSBQbHVnaW5PcHRpb24gfSBmcm9tIFwidml0ZVwiO1xuaW1wb3J0IHsgZ2xvYlN5bmMgfSBmcm9tIFwiZ2xvYlwiO1xuaW1wb3J0IHsgaGlnaGxpZ2h0IH0gZnJvbSBcIi4vYmluL3ByaXNtLmNvbmZpZ1wiO1xuaW1wb3J0IHZ1ZSBmcm9tIFwiQHZpdGVqcy9wbHVnaW4tdnVlXCI7XG5cbmNvbnN0IGVuY29kZXIgPSBuZXcgVGV4dEVuY29kZXIoKTtcbmNvbnN0IGRlY29kZXIgPSBuZXcgVGV4dERlY29kZXIoKTtcblxuYXN5bmMgZnVuY3Rpb24gcmV3cml0ZShcbiAgZG9jdW1lbnQ6IHN0cmluZyxcbiAgaGFuZGxlcnM6IFtzdHJpbmcsIEVsZW1lbnRIYW5kbGVyc11bXVxuKSB7XG4gIGxldCBvdXRwdXQgPSBcIlwiO1xuICBjb25zdCByZXdyaXRlciA9IG5ldyBIVE1MUmV3cml0ZXIoKG91dHB1dENodW5rKSA9PiB7XG4gICAgb3V0cHV0ICs9IGRlY29kZXIuZGVjb2RlKG91dHB1dENodW5rKTtcbiAgfSk7XG4gIGhhbmRsZXJzLmZvckVhY2goKFtlbCwgaGFuZGxlcl0pID0+IHJld3JpdGVyLm9uKGVsLCBoYW5kbGVyKSk7XG4gIHRyeSB7XG4gICAgYXdhaXQgcmV3cml0ZXIud3JpdGUoZW5jb2Rlci5lbmNvZGUoZG9jdW1lbnQpKTtcbiAgICBhd2FpdCByZXdyaXRlci5lbmQoKTtcbiAgICByZXR1cm4gb3V0cHV0O1xuICB9IGZpbmFsbHkge1xuICAgIHJld3JpdGVyLmZyZWUoKTtcbiAgfVxufVxuXG5jb25zdCBoeWRyYXRlVnVlQ29tcG9uZW50cyA9ICgpOiBQbHVnaW5PcHRpb24gPT4ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6IFwiaHlkcmF0ZS12dWVcIixcbiAgICB0cmFuc2Zvcm1JbmRleEh0bWw6IHtcbiAgICAgIG9yZGVyOiBcInByZVwiLFxuICAgICAgaGFuZGxlcjogYXN5bmMgKGh0bWw6IHN0cmluZykgPT4ge1xuICAgICAgICBsZXQgY29tcG9uZW50SWQgPSAxO1xuICAgICAgICBpZiAoIWh0bWwuaW5jbHVkZXMoXCJ2dWUtY29tcG9uZW50XCIpKSByZXR1cm4gaHRtbDtcbiAgICAgICAgcmV0dXJuIGF3YWl0IHJld3JpdGUoaHRtbCwgW1xuICAgICAgICAgIFtcbiAgICAgICAgICAgIFwidnVlLWNvbXBvbmVudFwiLFxuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBlbGVtZW50OiAoZWxlbWVudCkgPT4ge1xuICAgICAgICAgICAgICAgIGNvbnN0IG5JZCA9IGNvbXBvbmVudElkKys7XG4gICAgICAgICAgICAgICAgY29uc3QgbmFtZSA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwibmFtZVwiKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnRhZ05hbWUgPSBcImRpdlwiO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQucmVtb3ZlQXR0cmlidXRlKFwibmFtZVwiKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnNldEF0dHJpYnV0ZShcImlkXCIsIGB2dWUtYy0ke25JZH1gKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmFmdGVyKFxuICAgICAgICAgICAgICAgICAgYDxzY3JpcHQgdHlwZT1cIm1vZHVsZVwiPlxuICAgICAgICAgICAgICAgICAgaW1wb3J0IHsgY3JlYXRlQXBwIH0gZnJvbSAndnVlJ1xuICAgICAgICAgICAgICAgICAgaW1wb3J0IENvbXBvbmVudCBmcm9tIFwiQC8ke25hbWV9LnZ1ZVwiXG4gICAgICAgICAgICAgICAgICBjb25zdCByb290ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3Z1ZS1jLSR7bklkfScpXG4gICAgICAgICAgICAgICAgICBjcmVhdGVBcHAoQ29tcG9uZW50LCB7Li4ucm9vdC5kYXRhc2V0fSkubW91bnQocm9vdCwgdHJ1ZSlcbiAgICAgICAgICAgICAgPC9zY3JpcHQ+YCxcbiAgICAgICAgICAgICAgICAgIHsgaHRtbDogdHJ1ZSB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXSxcbiAgICAgICAgXSk7XG4gICAgICB9LFxuICAgIH0sXG4gIH07XG59O1xuXG5jb25zdCByZW5kZXJQbGF5Z3JvdW5kTGluayA9ICgpOiBQbHVnaW5PcHRpb24gPT4ge1xuICByZXR1cm4ge1xuICAgIG5hbWU6IFwicmVuZGVyLXBsYXlncm91bmQtbGlua1wiLFxuICAgIGFzeW5jIHRyYW5zZm9ybUluZGV4SHRtbChodG1sOiBzdHJpbmcpIHtcbiAgICAgIGxldCBwbGF5Z3JvdW5kVXJsOiBzdHJpbmcgfCB1bmRlZmluZWQ7XG4gICAgICBhd2FpdCByZXdyaXRlKGh0bWwsIFtcbiAgICAgICAgW1xuICAgICAgICAgIFwiYVwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChlbGVtZW50LmdldEF0dHJpYnV0ZShcImNsYXNzXCIpID09PSBcInBsYXlncm91bmQtbGlua1wiKSB7XG4gICAgICAgICAgICAgICAgcGxheWdyb3VuZFVybCA9IGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiaHJlZlwiKSE7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIF0pO1xuICAgICAgcmV0dXJuIGF3YWl0IHJld3JpdGUoaHRtbCwgW1xuICAgICAgICBbXG4gICAgICAgICAgXCJ3b3JrZXJzLXBsYXlncm91bmQtbGlua1wiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIGVsZW1lbnQ6IChlbGVtZW50KSA9PiB7XG4gICAgICAgICAgICAgIGlmIChwbGF5Z3JvdW5kVXJsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgICAvKmh0bWwqLyBgXG4gICAgICA8ZGl2IGNsYXNzPVwiRG9jc01hcmtkb3duLS1jb250ZW50LWNvbHVtblwiPlxuICAgICAgICA8YSBocmVmPVwiJHtwbGF5Z3JvdW5kVXJsfVwiIGNsYXNzPVwiRG9jc01hcmtkb3duLS1saW5rXCIgdGFyZ2V0PVwiX2JsYW5rXCIgcmVsPVwibm9vcGVuZXJcIj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIkRvY3NNYXJrZG93bi0tbGluay1jb250ZW50XCI+VHJ5IGluIFdvcmtlcnMgUGxheWdyb3VuZDwvc3Bhbj5cbiAgICAgICAgICA8c3BhbiBjbGFzcz1cIkRvY3NNYXJrZG93bi0tbGluay1leHRlcm5hbC1pY29uXCIgYXJpYS1oaWRkZW49XCJ0cnVlXCI+XG4gICAgICAgICAgICA8c3ZnIGZpbGw9XCJub25lXCIgc3Ryb2tlPVwiY3VycmVudENvbG9yXCIgc3Ryb2tlLXdpZHRoPVwiMS41XCIgd2lkdGg9XCIyM3B4XCIgaGVpZ2h0PVwiMTJweFwiIHN0cm9rZS1saW5lY2FwPVwicm91bmRcIiBzdHJva2UtbGluZWpvaW49XCJyb3VuZFwiIHZpZXdCb3g9XCIwIDAgMTYgMTZcIiByb2xlPVwiaW1nXCIgYXJpYS1sYWJlbGxlZGJ5PVwidGl0bGUtNDc0NDczODY3NDEwMjAyN1wiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIj5cbiAgICAgICAgICAgICAgPHRpdGxlIGlkPVwidGl0bGUtNDc0NDczODY3NDEwMjAyN1wiPkV4dGVybmFsIGxpbmsgaWNvbjwvdGl0bGU+XG4gICAgICAgICAgICAgIDxwYXRoIGQ9XCJNNi43NSwxLjc1aC01djEyLjVoMTIuNXYtNW0wLC00di0zLjVoLTMuNU04LDhsNS41LTUuNVwiPjwvcGF0aD5cbiAgICAgICAgICAgIDwvc3ZnPlxuICAgICAgICAgICAgPHNwYW4gaXMtdmlzdWFsbHktaGlkZGVuPk9wZW4gZXh0ZXJuYWwgbGluazwvc3Bhbj5cbiAgICAgICAgICA8L3NwYW4+XG4gICAgICAgIDwvYT5cbiAgICAgIDwvZGl2PmAsXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGh0bWw6IHRydWUsXG4gICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBlbGVtZW50LnJlbW92ZSgpO1xuICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9LFxuICAgICAgICAgIH0sXG4gICAgICAgIF0sXG4gICAgICBdKTtcbiAgICB9LFxuICB9O1xufTtcblxuY29uc3QgcmVuZGVyQ29kZUJsb2NrID0gKCk6IFBsdWdpbk9wdGlvbiA9PiB7XG4gIHJldHVybiB7XG4gICAgbmFtZTogXCJyZW5kZXItY29kZS1ibG9ja1wiLFxuICAgIGFzeW5jIHRyYW5zZm9ybUluZGV4SHRtbChodG1sOiBzdHJpbmcpIHtcbiAgICAgIGlmICghaHRtbC5pbmNsdWRlcyhcInVucGFyc2VkLWNvZGVibG9ja1wiKSkgcmV0dXJuIGh0bWw7XG5cbiAgICAgIHJldHVybiBhd2FpdCByZXdyaXRlKGh0bWwsIFtcbiAgICAgICAgW1xuICAgICAgICAgIFwidW5wYXJzZWQtY29kZWJsb2NrXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgZWxlbWVudDogYXN5bmMgKGVsZW1lbnQpID0+IHtcbiAgICAgICAgICAgICAgY29uc3QgZGF0YSA9IGVsZW1lbnRcbiAgICAgICAgICAgICAgICAuZ2V0QXR0cmlidXRlKFwiZGF0YS1jb2RlXCIpIVxuICAgICAgICAgICAgICAgIC8vIEh1Z28ncyB1cmwgZW5jb2RpbmcgaXMgLi4ub2RkXG4gICAgICAgICAgICAgICAgLnJlcGxhY2VBbGwoXCImIzQzO1wiLCBcIiBcIik7XG5cbiAgICAgICAgICAgICAgaWYgKGRhdGEuaW5jbHVkZXMoXCImI1wiKSkge1xuICAgICAgICAgICAgICAgIHRocm93IG5ldyBFcnJvcihcIlVuZXhwZWN0ZWQgSFRNTCBlbnRpdHk6IFwiICsgZGF0YSk7XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgY29uc3QgZGVjb2RlZCA9IGRlY29kZVVSSUNvbXBvbmVudChkYXRhKTtcbiAgICAgICAgICAgICAgY29uc3QgY29kZSA9IGRlY29kZWQgKyBcIlxcblwiO1xuICAgICAgICAgICAgICBlbGVtZW50LnJlcGxhY2UoXG4gICAgICAgICAgICAgICAgYXdhaXQgaGlnaGxpZ2h0KFxuICAgICAgICAgICAgICAgICAgY29kZSxcbiAgICAgICAgICAgICAgICAgIGVsZW1lbnQuZ2V0QXR0cmlidXRlKFwiZGF0YS1sYW5ndWFnZVwiKSEsXG4gICAgICAgICAgICAgICAgICBcIlwiXG4gICAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBodG1sOiB0cnVlLFxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgKTtcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgfSxcbiAgICAgICAgXSxcbiAgICAgIF0pO1xuICAgIH0sXG4gIH07XG59O1xuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG4gIHBsdWdpbnM6IFtcbiAgICByZW5kZXJDb2RlQmxvY2soKSxcbiAgICByZW5kZXJQbGF5Z3JvdW5kTGluaygpLFxuICAgIGh5ZHJhdGVWdWVDb21wb25lbnRzKCksXG4gICAgdnVlKCksXG4gIF0sXG4gIHJvb3Q6IFwicHVibGljXCIsXG4gIHJlc29sdmU6IHtcbiAgICBhbGlhczoge1xuICAgICAgXCJAXCI6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vY29tcG9uZW50c1wiLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICAgIGRhdGE6IGZpbGVVUkxUb1BhdGgobmV3IFVSTChcIi4vZGF0YVwiLCBpbXBvcnQubWV0YS51cmwpKSxcbiAgICB9LFxuICB9LFxuICBidWlsZDoge1xuICAgIHJvbGx1cE9wdGlvbnM6IHtcbiAgICAgIGlucHV0OiBnbG9iU3luYyhcInB1YmxpYy8qKi8qLmh0bWxcIiksXG4gICAgfSxcbiAgICByZXBvcnRDb21wcmVzc2VkU2l6ZTogZmFsc2UsXG4gIH0sXG59KTtcbiIsICJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL2tvZHlzaGVybWFuamFja3Nvbi9EZXNrdG9wL2Nsb3VkZmxhcmUtZG9jcy9iaW5cIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9rb2R5c2hlcm1hbmphY2tzb24vRGVza3RvcC9jbG91ZGZsYXJlLWRvY3MvYmluL3ByaXNtLmNvbmZpZy50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMva29keXNoZXJtYW5qYWNrc29uL0Rlc2t0b3AvY2xvdWRmbGFyZS1kb2NzL2Jpbi9wcmlzbS5jb25maWcudHNcIjtpbXBvcnQgUHJpc20gZnJvbSBcInByaXNtanNcIjtcbmltcG9ydCByYW5nZVBhcnNlciBmcm9tIFwicGFyc2UtbnVtZXJpYy1yYW5nZVwiO1xuXG5pbXBvcnQgdHlwZSB7IFRva2VuLCBUb2tlblN0cmVhbSB9IGZyb20gXCJwcmlzbWpzXCI7XG5cbmdsb2JhbFRoaXMuUHJpc20gPSBQcmlzbTtcbmltcG9ydCBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS1iYXNoLm1pbi5qc1wiO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWMubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tY3NoYXJwLm1pbi5qc1wiO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWNzdi5taW4uanNcIjtcbmltcG9ydCBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS1kaWZmLm1pbi5qc1wiO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWdpdC5taW4uanNcIjtcbmltcG9ydCBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS1nby5taW4uanNcIjtcbmltcG9ydCBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS1ncmFwaHFsLm1pbi5qc1wiO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWhjbC5taW4uanNcIjtcbmltcG9ydCBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS1odHRwLm1pbi5qc1wiO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWluaS5taW4uanNcIjtcbmltcG9ydCBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS1qYXZhLm1pbi5qc1wiO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLWpzb24ubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tanN4Lm1pbi5qc1wiO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLW1hcmtkb3duLm1pbi5qc1wiO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXBlcmwubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcGhwLm1pbi5qc1wiO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXBvd2Vyc2hlbGwubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcHl0aG9uLm1pbi5qc1wiO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXJ1YnkubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tcnVzdC5taW4uanNcIjtcbmltcG9ydCBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS1zcWwubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20tdHlwZXNjcmlwdC5taW4uanNcIjtcbmltcG9ydCBcInByaXNtanMvY29tcG9uZW50cy9wcmlzbS10b21sLm1pbi5qc1wiO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXlhbWwubWluLmpzXCI7XG5pbXBvcnQgXCJwcmlzbWpzL2NvbXBvbmVudHMvcHJpc20ta290bGluLm1pbi5qc1wiO1xuaW1wb3J0IFwicHJpc21qcy9jb21wb25lbnRzL3ByaXNtLXN3aWZ0Lm1pbi5qc1wiO1xuaW1wb3J0IHsgY29tcHJlc3NXb3JrZXIsIHNlcmlhbGlzZVdvcmtlciB9IGZyb20gXCIuL3BsYXlncm91bmRcIjtcblxuLy8gQ3VzdG9tIGBzaGVsbGAgZ3JhbW1hclxuUHJpc20ubGFuZ3VhZ2VzLnNoID0ge1xuICBjb21tZW50OiB7XG4gICAgcGF0dGVybjogLyhefFteJ3tcXFxcJF0pIy4qLyxcbiAgICBhbGlhczogXCJ1bnNlbGVjdGFibGVcIixcbiAgICBsb29rYmVoaW5kOiB0cnVlLFxuICB9LFxuXG4gIGRpcmVjdG9yeToge1xuICAgIHBhdHRlcm46IC9eW15cXHJcXG4kKiFdKyg/PVskXSkvbSxcbiAgICBhbGlhczogXCJ1bnNlbGVjdGFibGVcIixcbiAgfSxcblxuICBjb21tYW5kOiB7XG4gICAgcGF0dGVybjogL1skXSg/OlteXFxyXFxuXSkrLyxcbiAgICBpbnNpZGU6IHtcbiAgICAgIHByb21wdDoge1xuICAgICAgICBwYXR0ZXJuOiAvXlskXSAvLFxuICAgICAgICBhbGlhczogXCJ1bnNlbGVjdGFibGVcIixcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcblxuICBvdXRwdXQ6IHtcbiAgICBwYXR0ZXJuOiAvLig/Oi4qKD86W1xcclxcbl18LiQpKSovLFxuICAgIGFsaWFzOiBcInVuc2VsZWN0YWJsZVwiXG4gIH1cbn07XG5cbmNvbnN0IG9yaWdpbmFsR3JhbW1hciA9IFByaXNtLmxhbmd1YWdlcy5wb3dlcnNoZWxsO1xuXG4vLyBDdXN0b20gYHBvd2Vyc2hlbGxgIGdyYW1tYXJcblByaXNtLmxhbmd1YWdlcy5wb3dlcnNoZWxsID0ge1xuICBjb21tZW50OiB7XG4gICAgcGF0dGVybjogLyhefFteJ3tcXFxcJF0pIy4qLyxcbiAgICBhbGlhczogXCJ1bnNlbGVjdGFibGVcIixcbiAgICBsb29rYmVoaW5kOiB0cnVlLFxuICB9LFxuXG4gIGRpcmVjdG9yeToge1xuICAgIHBhdHRlcm46IC9eUFMgKD89XFx3OltcXHdcXFxcLV0rPiApL20sXG4gICAgYWxpYXM6IFwidW5zZWxlY3RhYmxlXCIsXG4gIH0sXG5cbiAgY29tbWFuZDoge1xuICAgIHBhdHRlcm46IC9cXHc6W1xcd1xcXFwtXSs+IFteXFxyXFxuXSsvLFxuICAgIGluc2lkZToge1xuICAgICAgJ3Byb21wdCc6IHtcbiAgICAgICAgcGF0dGVybjogL15cXHc6W1xcd1xcXFwtXSs+IC8sXG4gICAgICAgIGFsaWFzOiBcInVuc2VsZWN0YWJsZVwiLFxuICAgICAgfSxcbiAgICAgICdjb21tZW50Jzogb3JpZ2luYWxHcmFtbWFyLmNvbW1lbnQsXG4gICAgICAnc3RyaW5nJzogb3JpZ2luYWxHcmFtbWFyLnN0cmluZyxcbiAgICAgICdib29sZWFuJzogb3JpZ2luYWxHcmFtbWFyLmJvb2xlYW4sXG4gICAgICAndmFyaWFibGUnOiAvXFwkXFx3K1xcYi8sXG4gICAgICAnZnVuY3Rpb24nOiBvcmlnaW5hbEdyYW1tYXIuZnVuY3Rpb24sXG4gICAgICAna2V5d29yZCc6IG9yaWdpbmFsR3JhbW1hci5rZXl3b3JkLFxuICAgICAgJ29wZXJhdG9yJzogW1xuICAgICAgICB7XG4gICAgICAgICAgcGF0dGVybjogLyhefFxcVykoPzohfC0oPzpiPyg/OmFuZHx4P29yKXxhc3woPzpOb3QpPyg/OkNvbnRhaW5zfElufExpa2V8TWF0Y2gpfGVxfGdlfGd0fGlzKD86Tm90KT98Sm9pbnxsZXxsdHxuZXxub3R8UmVwbGFjZXxzaFtscl0pXFxifFsqJV09PykvaSxcbiAgICAgICAgICBsb29rYmVoaW5kOiB0cnVlXG4gICAgICAgIH1cbiAgICAgIF0sXG4gICAgICAncHVuY3R1YXRpb24nOiBvcmlnaW5hbEdyYW1tYXIucHVuY3R1YXRpb24sXG4gICAgfSxcbiAgfSxcbn07XG5cbi8vIFByaXNtIGxhbmd1YWdlIGFsaWFzZXNcbmV4cG9ydCBjb25zdCBsYW5nczogUmVjb3JkPHN0cmluZywgc3RyaW5nPiA9IHtcbiAgdGY6IFwiaGNsXCIsIC8vIHRlcnJhZm9ybSAtPiBoYXNoaWNvcnAgY29uZmlnIGxhbmdcbiAgcnM6IFwicnVzdFwiLFxuICBzaGVsbDogXCJzaFwiLFxuICBjdXJsOiBcImJhc2hcIixcbiAgZ3FsOiBcImdyYXBocWxcIixcbiAgc3ZlbHRlOiBcImh0bWxcIixcbiAgamF2YXNjcmlwdDogXCJqc1wiLFxuICBqc29uYzogXCJqc29uXCIsXG4gIHR5cGVzY3JpcHQ6IFwidHNcIixcbiAgcGxhaW50ZXh0OiBcInR4dFwiLFxuICB0ZXh0OiBcInR4dFwiLFxuICBweTogXCJweXRob25cIixcbiAgdnVlOiBcImh0bWxcIixcbiAgcmI6IFwicnVieVwiLFxufTtcblxuLy8gQ3VzdG9tIHRva2VuIHRyYW5zZm9ybXNcbmNvbnN0IHRyYW5zZm9ybWF0aW9uczogUmVjb3JkPHN0cmluZywgYW55PiA9IHtcbiAganM6IHtcbiAgICBrZXl3b3JkOiB7XG4gICAgICB0bzogXCJkZWNsYXJhdGlvbi1rZXl3b3JkXCIsXG4gICAgICBmb3I6IG5ldyBTZXQoW1xuICAgICAgICBcImNvbnN0XCIsXG4gICAgICAgIFwibGV0XCIsXG4gICAgICAgIFwidmFyXCIsXG4gICAgICAgIFwiYXN5bmNcIixcbiAgICAgICAgXCJhd2FpdFwiLFxuICAgICAgICBcImZ1bmN0aW9uXCIsXG4gICAgICAgIFwiY2xhc3NcIixcbiAgICAgIF0pLFxuICAgIH0sXG4gICAgcHVuY3R1YXRpb246IHtcbiAgICAgIHRvOiBcIm9wZXJhdG9yXCIsXG4gICAgICBmb3I6IG5ldyBTZXQoW1wiLlwiXSksXG4gICAgfSxcbiAgICBcImNsYXNzLW5hbWVcIjoge1xuICAgICAgdG86IFwiYXBpXCIsXG4gICAgICBmb3I6IG5ldyBTZXQoW1wiSFRNTFJld3JpdGVyXCIsIFwiUmVxdWVzdFwiLCBcIlJlc3BvbnNlXCIsIFwiVVJMXCIsIFwiRXJyb3JcIl0pLFxuICAgIH0sXG4gICAgZnVuY3Rpb246IHtcbiAgICAgIHRvOiBcImJ1aWx0aW5cIixcbiAgICAgIGZvcjogbmV3IFNldChbXG4gICAgICAgIFwiZmV0Y2hcIixcbiAgICAgICAgXCJjb25zb2xlXCIsXG4gICAgICAgIFwiYWRkRXZlbnRMaXN0ZW5lclwiLFxuICAgICAgICBcImF0b2JcIixcbiAgICAgICAgXCJidG9hXCIsXG4gICAgICAgIFwic2V0SW50ZXJ2YWxcIixcbiAgICAgICAgXCJjbGVhckludGVydmFsXCIsXG4gICAgICAgIFwic2V0VGltZW91dFwiLFxuICAgICAgICBcImNsZWFyVGltZW91dFwiLFxuICAgICAgXSksXG4gICAgfSxcbiAgfSxcbn07XG5cbnRyYW5zZm9ybWF0aW9ucy50cyA9IHRyYW5zZm9ybWF0aW9ucy5qcztcblxudHJhbnNmb3JtYXRpb25zLmh0bWwgPSB7XG4gIGtleXdvcmQ6IHRyYW5zZm9ybWF0aW9ucy5qcy5rZXl3b3JkLFxufTtcblxuaW50ZXJmYWNlIE5vZGUge1xuICB0eXBlczogc3RyaW5nO1xuICBjb250ZW50OiBzdHJpbmc7XG59XG5cbnR5cGUgTGluZSA9IE5vZGVbXTtcblxuY29uc3QgRVNDQVBFID0gL1smXCI8Pl0vZztcbmNvbnN0IENIQVJTID0ge1xuICAnXCInOiBcIiZxdW90O1wiLFxuICBcIiZcIjogXCImYW1wO1wiLFxuICBcIjxcIjogXCImbHQ7XCIsXG4gIFwiPlwiOiBcIiZndDtcIixcbn07XG5cbi8vIEBzZWUgbHVrZWVkL3RlbXB1cmFcbmZ1bmN0aW9uIHRvRXNjYXBlKHZhbHVlOiBzdHJpbmcpIHtcbiAgbGV0IHRtcCA9IDA7XG4gIGxldCBvdXQgPSBcIlwiO1xuICBsZXQgbGFzdCA9IChFU0NBUEUubGFzdEluZGV4ID0gMCk7XG4gIHdoaWxlIChFU0NBUEUudGVzdCh2YWx1ZSkpIHtcbiAgICB0bXAgPSBFU0NBUEUubGFzdEluZGV4IC0gMTtcbiAgICBvdXQgKz0gdmFsdWUuc3Vic3RyaW5nKGxhc3QsIHRtcCkgKyBDSEFSU1t2YWx1ZVt0bXBdIGFzIGtleW9mIHR5cGVvZiBDSEFSU107XG4gICAgbGFzdCA9IHRtcCArIDE7XG4gIH1cbiAgcmV0dXJuIG91dCArIHZhbHVlLnN1YnN0cmluZyhsYXN0KTtcbn1cblxuZnVuY3Rpb24gbm9ybWFsaXplKHRva2VuczogKFRva2VuIHwgc3RyaW5nKVtdKSB7XG4gIGxldCBsaW5lOiBMaW5lID0gW107XG4gIGxldCBsaW5lczogTGluZVtdID0gW107XG5cbiAgZnVuY3Rpb24gbG9vcCh0eXBlczogc3RyaW5nLCBpdGVtOiBUb2tlblN0cmVhbSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5KGl0ZW0pKSB7XG4gICAgICBpdGVtLmZvckVhY2goKHgpID0+IGxvb3AodHlwZXMsIHgpKTtcbiAgICB9IGVsc2UgaWYgKHR5cGVvZiBpdGVtID09PSBcInN0cmluZ1wiKSB7XG4gICAgICB0eXBlcyA9IHR5cGVzIHx8IFwiQ29kZUJsb2NrLS10b2tlbi1wbGFpblwiO1xuXG4gICAgICBpZiAoaXRlbSA9PT0gXCJcIikge1xuICAgICAgICAvLyBpZ25vcmVcbiAgICAgIH0gZWxzZSBpZiAoaXRlbSA9PT0gXCJcXG5cIikge1xuICAgICAgICBsaW5lLnB1c2goeyB0eXBlcywgY29udGVudDogaXRlbSB9KTtcbiAgICAgICAgbGluZXMucHVzaChsaW5lKTtcbiAgICAgICAgbGluZSA9IFtdO1xuICAgICAgfSBlbHNlIGlmIChpdGVtID09PSBcIlxcblxcblwiKSB7XG4gICAgICAgIGxpbmUucHVzaCh7IHR5cGVzLCBjb250ZW50OiBcIlxcblwiIH0pO1xuICAgICAgICBsaW5lcy5wdXNoKGxpbmUpO1xuXG4gICAgICAgIGxpbmUgPSBbeyB0eXBlczogXCJDb2RlQmxvY2stLXRva2VuLXBsYWluXCIsIGNvbnRlbnQ6IFwiXFxuXCIgfV07XG4gICAgICAgIGxpbmVzLnB1c2gobGluZSk7XG5cbiAgICAgICAgbGluZSA9IFtdO1xuICAgICAgfSBlbHNlIGlmIChpdGVtLmluY2x1ZGVzKFwiXFxuXCIpKSB7XG4gICAgICAgIGl0ZW0uc3BsaXQoL1xccj9cXG4vZykuZm9yRWFjaCgodHh0LCBpZHgsIGFycikgPT4ge1xuICAgICAgICAgIGlmICghdHh0ICYmICFpZHggJiYgaWR4IDwgYXJyLmxlbmd0aCkgcmV0dXJuO1xuICAgICAgICAgIGxldCBjb250ZW50ID0gdHh0ID8gdG9Fc2NhcGUodHh0KSA6IFwiXFxuXCI7XG5cbiAgICAgICAgICBpZiAoaWR4ID4gMCkge1xuICAgICAgICAgICAgbGluZXMucHVzaChsaW5lKTtcbiAgICAgICAgICAgIGxpbmUgPSBbXTtcbiAgICAgICAgICB9XG4gICAgICAgICAgbGluZS5wdXNoKHsgdHlwZXMsIGNvbnRlbnQgfSk7XG4gICAgICAgIH0pO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgbGV0IGNvbnRlbnQgPSB0b0VzY2FwZShpdGVtKTtcbiAgICAgICAgbGluZS5wdXNoKHsgdHlwZXMsIGNvbnRlbnQgfSk7XG4gICAgICB9XG4gICAgfSBlbHNlIGlmIChpdGVtKSB7XG4gICAgICBpZiAodHlwZXMpIHR5cGVzICs9IFwiIFwiO1xuICAgICAgdHlwZXMgKz0gXCJDb2RlQmxvY2stLXRva2VuLVwiICsgaXRlbS50eXBlO1xuXG4gICAgICBpZiAoaXRlbS5hbGlhcykge1xuICAgICAgICAoW10gYXMgc3RyaW5nW10pLmNvbmNhdChpdGVtLmFsaWFzKS5mb3JFYWNoKCh0dCkgPT4ge1xuICAgICAgICAgIGlmICghdHlwZXMuaW5jbHVkZXModHQpKSB7XG4gICAgICAgICAgICBpZiAodHlwZXMpIHR5cGVzICs9IFwiIFwiO1xuICAgICAgICAgICAgdHlwZXMgKz0gXCJDb2RlQmxvY2stLXRva2VuLVwiICsgdHQ7XG4gICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIGxvb3AodHlwZXMsIGl0ZW0uY29udGVudCk7XG4gICAgfVxuICB9XG5cbiAgZm9yIChsZXQgaSA9IDA7IGkgPCB0b2tlbnMubGVuZ3RoOyBpKyspIHtcbiAgICBsb29wKFwiXCIsIHRva2Vuc1tpXSk7XG4gIH1cblxuICBpZiAobGluZS5sZW5ndGggPiAwKSB7XG4gICAgbGluZXMucHVzaChsaW5lKTtcbiAgfVxuXG4gIGxldCBhcnI6IExpbmVbXSA9IFtdO1xuICB3aGlsZSAoKGxpbmUgPSBsaW5lcy5zaGlmdCgpKSkge1xuICAgIGlmIChsaW5lLmxlbmd0aCA+IDEgJiYgbGluZVswXS5jb250ZW50ID09PSBcIlxcblwiKSB7XG4gICAgICAvLyByZW1vdmUgZXh0cmEgbGVhZGluZyBcIlxcblwiIGl0ZW1zIGZvciBub24td2hpdGVzcGFjZSBsaW5lc1xuICAgICAgbGluZVswXS5jb250ZW50ID0gXCJcIjtcbiAgICAgIGFyci5wdXNoKGxpbmUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhcnIucHVzaChsaW5lKTtcbiAgICB9XG4gIH1cblxuICBsaW5lcyA9IGFycjtcblxuICAvLyBjaGVjayBmb3IgdXNlbGVzcyBuZXdsaW5lXG4gIC8vIH4+IGxhc3QgbGluZSB3aWxsIGJlIHNpbmdsZS1pdGVtIEFycmF5XG4gIGxldCBsYXN0ID0gbGluZXMucG9wKCk7XG4gIGlmIChsYXN0Lmxlbmd0aCAhPT0gMSB8fCBsYXN0WzBdLmNvbnRlbnQudHJpbSgpLmxlbmd0aCA+IDEpIHtcbiAgICBsaW5lcy5wdXNoKGxhc3QpOyAvLyBhZGQgaXQgYmFjaywgd2FzIHVzZWZ1bFxuICB9XG5cbiAgcmV0dXJuIGxpbmVzO1xufVxuXG5leHBvcnQgYXN5bmMgZnVuY3Rpb24gaGlnaGxpZ2h0KFxuICBjb2RlOiBzdHJpbmcsXG4gIGxhbmc6IHN0cmluZyxcbiAgZmlsZTogc3RyaW5nXG4pOiBQcm9taXNlPHN0cmluZz4ge1xuICBsYW5nID0gbGFuZ3NbbGFuZ10gfHwgbGFuZyB8fCBcInR4dFwiO1xuICBsZXQgZ3JhbW1hciA9IFByaXNtLmxhbmd1YWdlc1tsYW5nLnRvTG93ZXJDYXNlKCldO1xuXG4gIGlmICghZ3JhbW1hcikge1xuICAgIGNvbnNvbGUud2FybignW3ByaXNtXSBNaXNzaW5nIFwiJXNcIiBncmFtbWFyOyB1c2luZyBcInR4dFwiIGZhbGxiYWNrJywgbGFuZyk7XG4gICAgZ3JhbW1hciA9IFByaXNtLmxhbmd1YWdlcy50eHQ7XG4gIH1cblxuICBsZXQgZnJvbnRtYXR0ZXI6IHtcbiAgICB0aGVtZT86IHN0cmluZyB8IFwibGlnaHRcIjtcbiAgICBoaWdobGlnaHQ/OiBgWyR7c3RyaW5nfV1gIHwgc3RyaW5nO1xuICAgIGZpbGVuYW1lPzogc3RyaW5nO1xuICAgIGhlYWRlcj86IHN0cmluZztcbiAgICBwbGF5Z3JvdW5kPzogYm9vbGVhbjtcbiAgfSA9IHt9O1xuXG4gIC8vIENoZWNrIGZvciBhIFlBTUwgZnJvbnRtYXR0ZXIsXG4gIC8vIGFuZCBlbnN1cmUgaXQncyBub3Qgc29tZXRoaW5nIGxpa2UgLS0tLS1CRUdJTiBDRVJUSUZJQ0FURS0tLS0tXG4gIGlmIChjb2RlLnN1YnN0cmluZygwLCAzKSA9PT0gXCItLS1cIiAmJiBjb2RlWzNdICE9IFwiLVwiKSB7XG4gICAgbGV0IGluZGV4ID0gY29kZS5pbmRleE9mKFwiLS0tXCIsIDMpO1xuICAgIGlmIChpbmRleCA+IDMpIHtcbiAgICAgIGluZGV4ICs9IDM7XG4gICAgICBsZXQgY29udGVudCA9IGNvZGUuc3Vic3RyaW5nKDAsIGluZGV4KTtcbiAgICAgIGNvZGUgPSBjb2RlLnN1YnN0cmluZyhpbmRleCkucmVwbGFjZSgvXihcXHI/XFxuKSsvLCBcIlwiKTtcblxuICAgICAgLy8gVE9ETzogcGFzcyBpbiBgdXRpbHMuZnJvbnRtYXR0ZXJgIGhlcmVcbiAgICAgIC8vIGZyb250bWF0dGVyID0gdXRpbHMuZnJvbnRtYXR0ZXIoY29udGVudCk7XG5cbiAgICAgIGxldCBtYXRjaCA9IC9eLS0tXFxyP1xcbihbXFxzXFxTXSs/KVxccj9cXG4tLS0vLmV4ZWMoY29udGVudCk7XG4gICAgICBpZiAobWF0Y2ggIT0gbnVsbClcbiAgICAgICAgbWF0Y2hbMV0uc3BsaXQoXCJcXG5cIikuZm9yRWFjaCgocGFpcikgPT4ge1xuICAgICAgICAgIGxldCBba2V5LCAuLi52XSA9IHBhaXIuc3BsaXQoXCI6XCIpO1xuICAgICAgICAgIGZyb250bWF0dGVyW2tleS50cmltKCkgYXMgXCJ0aGVtZVwiXSA9IHYuam9pbihcIjpcIikudHJpbSgpO1xuICAgICAgICB9KTtcbiAgICB9XG4gIH1cblxuICBsZXQgaGlnaGxpZ2h0czogU2V0PG51bWJlcj47XG5cbiAgdHJ5IHtcbiAgICBsZXQgaGlnaGxpZ2h0ID0gZnJvbnRtYXR0ZXIuaGlnaGxpZ2h0O1xuICAgIC8vIGxldCByYW5nZS1wYXJzZXIgZG8gdGhlIGhlYXZ5IGxpZnRpbmcuIEl0IGhhbmRsZXMgYWxsIHN1cHBvcnRlZCBjYXNlc1xuICAgIGlmIChoaWdobGlnaHQ/LnN0YXJ0c1dpdGgoXCJbXCIpKSB7XG4gICAgICBoaWdobGlnaHQgPSBoaWdobGlnaHQuc3Vic3RyaW5nKDEsIGhpZ2hsaWdodC5sZW5ndGggLSAxKTtcbiAgICB9XG4gICAgY29uc3QgcGFyc2VkUmFuZ2UgPSByYW5nZVBhcnNlcihoaWdobGlnaHQgfHwgXCJcIik7XG4gICAgaGlnaGxpZ2h0cyA9IG5ldyBTZXQocGFyc2VkUmFuZ2UubWFwKCh4OiBudW1iZXIpID0+IHggLSAxKSk7XG4gIH0gY2F0Y2ggKGVycikge1xuICAgIHByb2Nlc3Muc3RkZXJyLndyaXRlKFxuICAgICAgYFtFUlJPUl0gJHtmaWxlfVxcblN5bnRheCBoaWdobGlnaHRpbmcgZXJyb3I6IFlvdSBtdXN0IHNwZWNpZnkgdGhlIGxpbmVzIHRvIGhpZ2hsaWdodCBhcyBhbiBhcnJheSAoZS5nLiwgJ1syXScpLiBGb3VuZCAnJHtmcm9udG1hdHRlci5oaWdobGlnaHR9Jy5cXG5gXG4gICAgKTtcbiAgICAvLyBzdGlsbCB0aHJvd2luZyB0aGUgb3JpZ2luYWwgZXJyb3IgYmVjYXVzZSBpdCBjb3VsZCBiZSBzb21ldGhpbmcgZWxzZVxuICAgIHRocm93IGVycjtcbiAgfVxuXG4gIC8vIHRva2VuaXplICYgYnVpbGQgY3VzdG9tIHN0cmluZyBvdXRwdXRcbiAgbGV0IHRva2VucyA9IFByaXNtLnRva2VuaXplKGNvZGUsIGdyYW1tYXIpO1xuICBsZXQgb3V0cHV0ID0gXCJcIjtcblxuICBsZXQgdGhlbWUgPSBmcm9udG1hdHRlci50aGVtZSB8fCBcImxpZ2h0XCI7XG4gIG91dHB1dCArPVxuICAgICc8cHJlIGNsYXNzPVwiQ29kZUJsb2NrIENvZGVCbG9jay13aXRoLXJvd3MgQ29kZUJsb2NrLXNjcm9sbHMtaG9yaXpvbnRhbGx5JztcblxuICBpZiAodGhlbWUgPT09IFwibGlnaHRcIikgb3V0cHV0ICs9IFwiIENvZGVCbG9jay1pcy1saWdodC1pbi1saWdodC10aGVtZVwiO1xuICBvdXRwdXQgKz0gYCBDb2RlQmxvY2stLWxhbmd1YWdlLSR7bGFuZ31cIiBsYW5ndWFnZT1cIiR7bGFuZ31cImA7XG4gIGlmIChmcm9udG1hdHRlci5oZWFkZXIpIG91dHB1dCArPSBgIHRpdGxlPVwiJHtmcm9udG1hdHRlci5oZWFkZXJ9XCI+YDtcbiAgZWxzZSBvdXRwdXQgKz0gXCI+XCJcblxuICBpZiAoZnJvbnRtYXR0ZXIuaGVhZGVyKVxuICAgIG91dHB1dCArPSBgPHNwYW4gY2xhc3M9XCJDb2RlQmxvY2stLWhlYWRlclwiPiR7ZnJvbnRtYXR0ZXIuaGVhZGVyfTwvc3Bhbj5gO1xuICBlbHNlIGlmIChmcm9udG1hdHRlci5maWxlbmFtZSlcbiAgICBvdXRwdXQgKz0gYDxzcGFuIGNsYXNzPVwiQ29kZUJsb2NrLS1maWxlbmFtZVwiPiR7ZnJvbnRtYXR0ZXIuZmlsZW5hbWV9PC9zcGFuPmA7XG5cbiAgaWYgKGZyb250bWF0dGVyLnBsYXlncm91bmQpIHtcbiAgICBjb25zdCBzZXJpYWxpc2VkID0gYXdhaXQgY29tcHJlc3NXb3JrZXIoc2VyaWFsaXNlV29ya2VyKGNvZGUpKTtcbiAgICBjb25zdCBwbGF5Z3JvdW5kVXJsID0gYGh0dHBzOi8vd29ya2Vycy5jbG91ZGZsYXJlLmNvbS9wbGF5Z3JvdW5kIyR7c2VyaWFsaXNlZH1gO1xuXG4gICAgb3V0cHV0ICs9IGA8YSB0YXJnZXQ9XCJfX2JsYW5rXCIgaHJlZj1cIiR7cGxheWdyb3VuZFVybH1cIiBjbGFzcz1cInBsYXlncm91bmQtbGlua1wiPjxzdmcgZmlsbD1cImN1cnJlbnRDb2xvclwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiB2aWV3Qm94PVwiMCAwIDE2IDE2XCI+PHBhdGggZD1cIk02LjIxIDEyLjI5M2wtMy4yMTUtNC4zIDMuMTk3LTQuMTc4LS42MTctLjg0Mi0zLjYwMyA0LjcxMi0uMDA1LjYwMyAzLjYyIDQuODQ3LjYyMy0uODQyelwiPjwvcGF0aD48cGF0aCBkPVwiTTcuMzMyIDEuOTg4SDYuMDk1bDQuNDYyIDYuMS00LjM1NyA1LjloMS4yNDVMMTEuOCA4LjA5IDcuMzMyIDEuOTg4elwiPjwvcGF0aD48cGF0aCBkPVwiTTkuNzI1IDEuOTg4SDguNDcybDQuNTMzIDYuMDI3LTQuNTMzIDUuOTczaDEuMjU1bDQuMzAzLTUuNjd2LS42MDNMOS43MjUgMS45ODh6XCI+PC9wYXRoPjwvc3ZnPjxzcGFuPiBSdW4gV29ya2VyPC9zcGFuPjwvYT5gO1xuICB9XG5cbiAgb3V0cHV0ICs9IFwiPGNvZGU+XCI7XG4gIG91dHB1dCArPSAnPHNwYW4gY2xhc3M9XCJDb2RlQmxvY2stLXJvd3NcIj4nO1xuICBvdXRwdXQgKz0gJzxzcGFuIGNsYXNzPVwiQ29kZUJsb2NrLS1yb3dzLWNvbnRlbnRcIj4nO1xuXG4gIGxldCBpID0gMDtcbiAgbGV0IHJvdyA9IFwiXCI7XG4gIGxldCBsaW5lOiBMaW5lO1xuICBsZXQgbGluZXMgPSBub3JtYWxpemUodG9rZW5zKTtcblxuICBmb3IgKDsgaSA8IGxpbmVzLmxlbmd0aDsgaSsrKSB7XG4gICAgbGluZSA9IGxpbmVzW2ldO1xuICAgIHJvdyA9ICc8c3BhbiBjbGFzcz1cIkNvZGVCbG9jay0tcm93JztcbiAgICByb3cgKz0gaGlnaGxpZ2h0cy5oYXMoaSkgPyAnIENvZGVCbG9jay0tcm93LWlzLWhpZ2hsaWdodGVkXCI+JyA6ICdcIj4nO1xuICAgIHJvdyArPSAnPHNwYW4gY2xhc3M9XCJDb2RlQmxvY2stLXJvdy1pbmRpY2F0b3JcIj48L3NwYW4+JztcbiAgICByb3cgKz0gJzxkaXYgY2xhc3M9XCJDb2RlQmxvY2stLXJvdy1jb250ZW50XCI+JztcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGxpbmUubGVuZ3RoOyBqKyspIHtcbiAgICAgIHJvdyArPVxuICAgICAgICAnPHNwYW4gY2xhc3M9XCInICsgbGluZVtqXS50eXBlcyArICdcIj4nICsgbGluZVtqXS5jb250ZW50ICsgXCI8L3NwYW4+XCI7XG4gICAgfVxuICAgIG91dHB1dCArPSByb3cgKyBcIjwvZGl2Pjwvc3Bhbj5cIjtcbiAgfVxuXG4gIHJldHVybiBvdXRwdXQgKyBcIjwvc3Bhbj48L3NwYW4+PC9jb2RlPjwvcHJlPlwiO1xufVxuIiwgImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMva29keXNoZXJtYW5qYWNrc29uL0Rlc2t0b3AvY2xvdWRmbGFyZS1kb2NzL2JpblwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiL1VzZXJzL2tvZHlzaGVybWFuamFja3Nvbi9EZXNrdG9wL2Nsb3VkZmxhcmUtZG9jcy9iaW4vcGxheWdyb3VuZC50c1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vVXNlcnMva29keXNoZXJtYW5qYWNrc29uL0Rlc2t0b3AvY2xvdWRmbGFyZS1kb2NzL2Jpbi9wbGF5Z3JvdW5kLnRzXCI7aW1wb3J0IGx6c3RyaW5nIGZyb20gXCJsei1zdHJpbmdcIjtcblxuZXhwb3J0IGZ1bmN0aW9uIHNlcmlhbGlzZVdvcmtlcihjb2RlOiBzdHJpbmcpOiBGb3JtRGF0YSB7XG4gIGNvbnN0IGZvcm1EYXRhID0gbmV3IEZvcm1EYXRhKCk7XG5cbiAgY29uc3QgbWV0YWRhdGEgPSB7XG4gICAgbWFpbl9tb2R1bGU6IFwiaW5kZXguanNcIixcbiAgfTtcblxuICBmb3JtRGF0YS5zZXQoXG4gICAgXCJpbmRleC5qc1wiLFxuICAgIG5ldyBCbG9iKFtjb2RlXSwge1xuICAgICAgdHlwZTogXCJhcHBsaWNhdGlvbi9qYXZhc2NyaXB0K21vZHVsZVwiLFxuICAgIH0pLFxuICAgIFwiaW5kZXguanNcIlxuICApO1xuXG4gIGZvcm1EYXRhLnNldChcbiAgICBcIm1ldGFkYXRhXCIsXG4gICAgbmV3IEJsb2IoW0pTT04uc3RyaW5naWZ5KG1ldGFkYXRhKV0sIHsgdHlwZTogXCJhcHBsaWNhdGlvbi9qc29uXCIgfSlcbiAgKTtcblxuICByZXR1cm4gZm9ybURhdGE7XG59XG5cbmV4cG9ydCBhc3luYyBmdW5jdGlvbiBjb21wcmVzc1dvcmtlcih3b3JrZXI6IEZvcm1EYXRhKSB7XG4gIGNvbnN0IHNlcmlhbGlzZWRXb3JrZXIgPSBuZXcgUmVzcG9uc2Uod29ya2VyKTtcbiAgcmV0dXJuIGx6c3RyaW5nLmNvbXByZXNzVG9FbmNvZGVkVVJJQ29tcG9uZW50KFxuICAgIGAke3NlcmlhbGlzZWRXb3JrZXIuaGVhZGVycy5nZXQoXG4gICAgICBcImNvbnRlbnQtdHlwZVwiXG4gICAgKX06JHthd2FpdCBzZXJpYWxpc2VkV29ya2VyLnRleHQoKX1gXG4gICk7XG59XG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQXFVLFNBQVMsZUFBZSxXQUFXO0FBQ3hXLFNBQVMsb0JBQTBDO0FBQ25ELFNBQVMsb0JBQXVDO0FBQ2hELFNBQVMsZ0JBQWdCOzs7QUNIMFQsT0FBTyxXQUFXO0FBQ3JXLE9BQU8saUJBQWlCO0FBS3hCLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTztBQUNQLE9BQU87QUFDUCxPQUFPO0FBQ1AsT0FBTzs7O0FDaEN3VSxPQUFPLGNBQWM7QUFFN1YsU0FBUyxnQkFBZ0IsTUFBd0I7QUFDdEQsUUFBTSxXQUFXLElBQUksU0FBUztBQUU5QixRQUFNLFdBQVc7QUFBQSxJQUNmLGFBQWE7QUFBQSxFQUNmO0FBRUEsV0FBUztBQUFBLElBQ1A7QUFBQSxJQUNBLElBQUksS0FBSyxDQUFDLElBQUksR0FBRztBQUFBLE1BQ2YsTUFBTTtBQUFBLElBQ1IsQ0FBQztBQUFBLElBQ0Q7QUFBQSxFQUNGO0FBRUEsV0FBUztBQUFBLElBQ1A7QUFBQSxJQUNBLElBQUksS0FBSyxDQUFDLEtBQUssVUFBVSxRQUFRLENBQUMsR0FBRyxFQUFFLE1BQU0s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QUFBQSxrQkFXZDtBQUFBLG9CQUNFLE1BQU07QUFBQSxrQkFDUjtBQUFBLGdCQUNGO0FBQUEsY0FDRixPQUFPO0FBQ0wsd0JBQVEsT0FBTztBQUFBLGNBQ2pCO0FBQUEsWUFDRjtBQUFBLFVBQ0Y7QUFBQSxRQUNGO0FBQUEsTUFDRixDQUFDO0FBQUEsSUFDSDtBQUFBLEVBQ0Y7QUFDRjtBQUVBLElBQU0sa0JBQWtCLE1BQW9CO0FBQzFDLFNBQU87QUFBQSxJQUNMLE1BQU07QUFBQSxJQUNOLE1BQU0sbUJBQW1CLE1BQWM7QUFDckMsVUFBSSxDQUFDLEtBQUssU0FBUyxvQkFBb0IsRUFBRyxRQUFPO0FBRWpELGFBQU8sTUFBTSxRQUFRLE1BQU07QUFBQSxRQUN6QjtBQUFBLFVBQ0U7QUFBQSxVQUNBO0FBQUEsWUFDRSxTQUFTLE9BQU8sWUFBWTtBQUMxQixvQkFBTSxPQUFPLFFBQ1YsYUFBYSxXQUFXLEVBRXhCLFdBQVcsU0FBUyxHQUFHO0FBRTFCLGtCQUFJLEtBQUssU0FBUyxJQUFJLEdBQUc7QUFDdkIsc0JBQU0sSUFBSSxNQUFNLDZCQUE2QixJQUFJO0FBQUEsY0FDbkQ7QUFDQSxvQkFBTSxVQUFVLG1CQUFtQixJQUFJO0FBQ3ZDLG9CQUFNLE9BQU8sVUFBVTtBQUN2QixzQkFBUTtBQUFBLGdCQUNOLE1BQU07QUFBQSxrQkFDSjtBQUFBLGtCQUNBLFFBQVEsYUFBYSxlQUFlO0FBQUEsa0JBQ3BDO0FBQUEsZ0JBQ0Y7QUFBQSxnQkFDQTtBQUFBLGtCQUNFLE1BQU07QUFBQSxnQkFDUjtBQUFBLGNBQ0Y7QUFBQSxZQUNGO0FBQUEsVUFDRjtBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUM7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUNGO0FBRUEsSUFBTyxzQkFBUSxhQUFhO0FBQUEsRUFDMUIsU0FBUztBQUFBLElBQ1AsZ0JBQWdCO0FBQUEsSUFDaEIscUJBQXFCO0FBQUEsSUFDckIscUJBQXFCO0FBQUEsSUFDckIsSUFBSTtBQUFBLEVBQ047QUFBQSxFQUNBLE1BQU07QUFBQSxFQUNOLFNBQVM7QUFBQSxJQUNQLE9BQU87QUFBQSxNQUNMLEtBQUssY0FBYyxJQUFJLElBQUksZ0JBQWdCLHdDQUFlLENBQUM7QUFBQSxNQUMzRCxNQUFNLGNBQWMsSUFBSSxJQUFJLFVBQVUsd0NBQWUsQ0FBQztBQUFBLElBQ3hEO0FBQUEsRUFDRjtBQUFBLEVBQ0EsT0FBTztBQUFBLElBQ0wsZUFBZTtBQUFBLE1BQ2IsT0FBTyxTQUFTLGtCQUFrQjtBQUFBLElBQ3BDO0FBQUEsSUFDQSxzQkFBc0I7QUFBQSxFQUN4QjtBQUNGLENBQUM7IiwKICAibmFtZXMiOiBbImFyciIsICJoaWdobGlnaHQiXQp9Cg==
