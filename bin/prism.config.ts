import Prism from "prismjs";
import rangeParser from "parse-numeric-range";

import type { Token, TokenStream } from "prismjs";

globalThis.Prism = Prism;
import "prismjs/components/prism-bash.min.js";
import "prismjs/components/prism-c.min.js";
import "prismjs/components/prism-csharp.min.js";
import "prismjs/components/prism-csv.min.js";
import "prismjs/components/prism-diff.min.js";
import "prismjs/components/prism-git.min.js";
import "prismjs/components/prism-go.min.js";
import "prismjs/components/prism-graphql.min.js";
import "prismjs/components/prism-hcl.min.js";
import "prismjs/components/prism-http.min.js";
import "prismjs/components/prism-ini.min.js";
import "prismjs/components/prism-java.min.js";
import "prismjs/components/prism-json.min.js";
import "prismjs/components/prism-jsx.min.js";
import "prismjs/components/prism-markdown.min.js";
import "prismjs/components/prism-perl.min.js";
import "prismjs/components/prism-php.min.js";
import "prismjs/components/prism-powershell.min.js";
import "prismjs/components/prism-python.min.js";
import "prismjs/components/prism-ruby.min.js";
import "prismjs/components/prism-rust.min.js";
import "prismjs/components/prism-sql.min.js";
import "prismjs/components/prism-typescript.min.js";
import "prismjs/components/prism-toml.min.js";
import "prismjs/components/prism-yaml.min.js";
import "prismjs/components/prism-kotlin.min.js";
import "prismjs/components/prism-swift.min.js";
import { compressWorker, serialiseWorker } from "./playground";

// Custom `shell` grammar
Prism.languages.sh = {
  comment: {
    pattern: /(^|[^'{\\$])#.*/,
    alias: "unselectable",
    lookbehind: true,
  },

  directory: {
    pattern: /^[^\r\n$*!]+(?=[$])/m,
    alias: "unselectable",
  },

  command: {
    pattern: /[$](?:[^\r\n])+/,
    inside: {
      prompt: {
        pattern: /^[$] /,
        alias: "unselectable",
      },
    },
  },

  output: {
    pattern: /.(?:.*(?:[\r\n]|.$))*/,
    alias: "unselectable"
  }
};

const originalGrammar = Prism.languages.powershell;

// Custom `powershell` grammar
Prism.languages.powershell = {
  comment: {
    pattern: /(^|[^'{\\$])#.*/,
    alias: "unselectable",
    lookbehind: true,
  },

  directory: {
    pattern: /^PS (?=\w:[\w\\-]+> )/m,
    alias: "unselectable",
  },

  command: {
    pattern: /\w:[\w\\-]+> [^\r\n]+/,
    inside: {
      'prompt': {
        pattern: /^\w:[\w\\-]+> /,
        alias: "unselectable",
      },
      'comment': originalGrammar.comment,
      'string': originalGrammar.string,
      'boolean': originalGrammar.boolean,
      'variable': /\$\w+\b/,
      'function': originalGrammar.function,
      'keyword': originalGrammar.keyword,
      'operator': [
        {
          pattern: /(^|\W)(?:!|-(?:b?(?:and|x?or)|as|(?:Not)?(?:Contains|In|Like|Match)|eq|ge|gt|is(?:Not)?|Join|le|lt|ne|not|Replace|sh[lr])\b|[*%]=?)/i,
          lookbehind: true
        }
      ],
      'punctuation': originalGrammar.punctuation,
    },
  },
};

// Prism language aliases
export const langs: Record<string, string> = {
  tf: "hcl", // terraform -> hashicorp config lang
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
  rb: "ruby",
};

// Custom token transforms
const transformations: Record<string, any> = {
  js: {
    keyword: {
      to: "declaration-keyword",
      for: new Set([
        "const",
        "let",
        "var",
        "async",
        "await",
        "function",
        "class",
      ]),
    },
    punctuation: {
      to: "operator",
      for: new Set(["."]),
    },
    "class-name": {
      to: "api",
      for: new Set(["HTMLRewriter", "Request", "Response", "URL", "Error"]),
    },
    function: {
      to: "builtin",
      for: new Set([
        "fetch",
        "console",
        "addEventListener",
        "atob",
        "btoa",
        "setInterval",
        "clearInterval",
        "setTimeout",
        "clearTimeout",
      ]),
    },
  },
};

transformations.ts = transformations.js;

transformations.html = {
  keyword: transformations.js.keyword,
};

interface Node {
  types: string;
  content: string;
}

type Line = Node[];

const ESCAPE = /[&"<>]/g;
const CHARS = {
  '"': "&quot;",
  "&": "&amp;",
  "<": "&lt;",
  ">": "&gt;",
};

// @see lukeed/tempura
function toEscape(value: string) {
  let tmp = 0;
  let out = "";
  let last = (ESCAPE.lastIndex = 0);
  while (ESCAPE.test(value)) {
    tmp = ESCAPE.lastIndex - 1;
    out += value.substring(last, tmp) + CHARS[value[tmp] as keyof typeof CHARS];
    last = tmp + 1;
  }
  return out + value.substring(last);
}

function normalize(tokens: (Token | string)[]) {
  let line: Line = [];
  let lines: Line[] = [];

  function loop(types: string, item: TokenStream) {
    if (Array.isArray(item)) {
      item.forEach((x) => loop(types, x));
    } else if (typeof item === "string") {
      types = types || "CodeBlock--token-plain";

      if (item === "") {
        // ignore
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
        item.split(/\r?\n/g).forEach((txt, idx, arr) => {
          if (!txt && !idx && idx < arr.length) return;
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
        ([] as string[]).concat(item.alias).forEach((tt) => {
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

  let arr: Line[] = [];
  while ((line = lines.shift())) {
    if (line.length > 1 && line[0].content === "\n") {
      // remove extra leading "\n" items for non-whitespace lines
      line[0].content = "";
      arr.push(line);
    } else {
      arr.push(line);
    }
  }

  lines = arr;

  // check for useless newline
  // ~> last line will be single-item Array
  let last = lines.pop();
  if (last.length !== 1 || last[0].content.trim().length > 1) {
    lines.push(last); // add it back, was useful
  }

  return lines;
}

export async function highlight(
  code: string,
  lang: string,
  file: string
): Promise<string> {
  lang = langs[lang] || lang || "txt";
  let grammar = Prism.languages[lang.toLowerCase()];

  if (!grammar) {
    console.warn('[prism] Missing "%s" grammar; using "txt" fallback', lang);
    grammar = Prism.languages.txt;
  }

  let frontmatter: {
    theme?: string | "light";
    highlight?: `[${string}]` | string;
    filename?: string;
    header?: string;
    playground?: boolean;
  } = {};

  // Check for a YAML frontmatter,
  // and ensure it's not something like -----BEGIN CERTIFICATE-----
  if (code.substring(0, 3) === "---" && code[3] != "-") {
    let index = code.indexOf("---", 3);
    if (index > 3) {
      index += 3;
      let content = code.substring(0, index);
      code = code.substring(index).replace(/^(\r?\n)+/, "");

      // TODO: pass in `utils.frontmatter` here
      // frontmatter = utils.frontmatter(content);

      let match = /^---\r?\n([\s\S]+?)\r?\n---/.exec(content);
      if (match != null)
        match[1].split("\n").forEach((pair) => {
          let [key, ...v] = pair.split(":");
          frontmatter[key.trim() as "theme"] = v.join(":").trim();
        });
    }
  }

  let highlights: Set<number>;

  try {
    let highlight = frontmatter.highlight;
    // let range-parser do the heavy lifting. It handles all supported cases
    if (highlight?.startsWith("[")) {
      highlight = highlight.substring(1, highlight.length - 1);
    }
    const parsedRange = rangeParser(highlight || "");
    highlights = new Set(parsedRange.map((x: number) => x - 1));
  } catch (err) {
    process.stderr.write(
      `[ERROR] ${file}\nSyntax highlighting error: You must specify the lines to highlight as an array (e.g., '[2]'). Found '${frontmatter.highlight}'.\n`
    );
    // still throwing the original error because it could be something else
    throw err;
  }

  // tokenize & build custom string output
  let tokens = Prism.tokenize(code, grammar);
  let output = "";

  let theme = frontmatter.theme || "light";
  output +=
    '<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally';

  if (theme === "light") output += " CodeBlock-is-light-in-light-theme";
  output += ` CodeBlock--language-${lang}" language="${lang}"`;
  if (frontmatter.header) output += ` title="${frontmatter.header}">`;
  else output += ">"

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
  let line: Line;
  let lines = normalize(tokens);

  for (; i < lines.length; i++) {
    line = lines[i];
    row = '<span class="CodeBlock--row';
    row += highlights.has(i) ? ' CodeBlock--row-is-highlighted">' : '">';
    row += '<span class="CodeBlock--row-indicator"></span>';
    row += '<div class="CodeBlock--row-content">';
    for (let j = 0; j < line.length; j++) {
      row +=
        '<span class="' + line[j].types + '">' + line[j].content + "</span>";
    }
    output += row + "</div></span>";
  }

  return output + "</span></span></code></pre>";
}
