import Prism from 'prismjs';

import type { Token, TokenStream } from 'prismjs';

globalThis.Prism = Prism;
import 'prismjs/components/prism-bash.min.js';
import 'prismjs/components/prism-c.min.js';
import 'prismjs/components/prism-diff.min.js';
import 'prismjs/components/prism-git.min.js';
import 'prismjs/components/prism-go.min.js';
import 'prismjs/components/prism-graphql.min.js';
import 'prismjs/components/prism-hcl.min.js';
import 'prismjs/components/prism-http.min.js';
import 'prismjs/components/prism-ini.min.js';
import 'prismjs/components/prism-java.min.js';
import 'prismjs/components/prism-json.min.js';
import 'prismjs/components/prism-markdown.min.js';
import 'prismjs/components/prism-python.min.js';
import 'prismjs/components/prism-ruby.min.js';
import 'prismjs/components/prism-rust.min.js';
import 'prismjs/components/prism-sql.min.js';
import 'prismjs/components/prism-typescript.min.js';
import 'prismjs/components/prism-toml.min.js';
import 'prismjs/components/prism-yaml.min.js';

// Custom `shell` grammar
Prism.languages.sh = {
  comment: {
    pattern: /(^|[^'{\\$])#.*/,
    alias: 'unselectable',
    lookbehind: true,
  },

  directory: {
    pattern: /^[^\r\n$*!]+(?=[$])/m,
    alias: 'unselectable',
  },

  command: {
    pattern: /[$](?:[^\r\n])+/,
    inside: {
      prompt: {
        pattern: /^[$] /,
        alias: 'unselectable',
      },
    },
  },
};

// Prism language aliases
export const langs: Record<string, string> = {
  tf: 'hcl', // terraform -> hashicorp config lang
  rs: 'rust',
  shell: 'sh',
  curl: 'bash',
  gql: 'graphql',
  svelte: 'html',
  javascript: 'js',
  typescript: 'ts',
  plaintext: 'txt',
  text: 'txt',
  py: 'python',
  vue: 'html',
  rb: 'ruby',
};

// Custom token transforms
const transformations: Record<string, any> = {
  js: {
    'keyword': {
      to: 'declaration-keyword',
      for: new Set(['const', 'let', 'var', 'async', 'await', 'function', 'class']),
    },
    'punctuation': {
      to: 'operator',
      for: new Set(['.']),
    },
    'class-name': {
      to: 'api',
      for: new Set(['HTMLRewriter', 'Request', 'Response', 'URL', 'Error']),
    },
    'function': {
      to: 'builtin',
      for: new Set([
        'fetch',
        'console',
        'addEventListener',
        'atob',
        'btoa',
        'setInterval',
        'clearInterval',
        'setTimeout',
        'clearTimeout',
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
  '"': '&quot;',
  '&': '&amp;',
  '<': '&lt',
  '>': '&gt',
};

// @see lukeed/tempura
function toEscape(value: string) {
  let tmp = 0;
  let out = '';
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
      item.forEach(x => loop(types, x));
    } else if (typeof item === 'string') {
      types = types || 'CodeBlock--token-plain';

      if (item === '') {
        // ignore
      } else if (item === '\n') {
        line.push({ types, content: item });
        lines.push(line);
        line = [];
      } else if (item === '\n\n') {
        line.push({ types, content: '\n' });
        lines.push(line);

        line = [{ types: 'CodeBlock--token-plain', content: '\n' }];
        lines.push(line);

        line = [];
      } else if (item.includes('\n')) {
        item.split(/\r?\n/g).forEach((txt, idx, arr) => {
          if (!txt && !idx && idx < arr.length) return;
          let content = txt ? toEscape(txt) : '\n';

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
      if (types) types += ' ';
      types += 'CodeBlock--token-' + item.type;

      if (item.alias) {
        ([] as string[]).concat(item.alias).forEach(tt => {
          if (!types.includes(tt)) {
            if (types) types += ' ';
            types += 'CodeBlock--token-' + tt;
          }
        });
      }
      loop(types, item.content);
    }
  }

  for (let i = 0; i < tokens.length; i++) {
    loop('', tokens[i]);
  }

  if (line.length > 0) {
    lines.push(line);
  }

  let arr: Line[] = [];
  while ((line = lines.shift())) {
    if (line.length > 1 && line[0].content === '\n') {
      // remove extra leading "\n" items for non-whitespace lines
      line[0].content = ""
      arr.push(line)
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

export function highlight(code: string, lang: string): string {
  lang = langs[lang] || lang || 'txt';
  let grammar = Prism.languages[lang.toLowerCase()];

  if (!grammar) {
    console.warn('[prism] Missing "%s" grammar; using "txt" fallback', lang);
    grammar = Prism.languages.txt;
  }

  let frontmatter: {
    theme?: string | 'light';
    highlight?: `[${string}]`;
    filename?: string;
    header?: string;
  } = {};

  if (code.substring(0, 3) === '---') {
    let index = code.indexOf('---', 3);
    if (index > 3) {
      index += 3;
      let content = code.substring(0, index);
      code = code.substring(index).replace(/^(\r?\n)+/, '');

      // TODO: pass in `utils.frontmatter` here
      // frontmatter = utils.frontmatter(content);

      let match = /^---\r?\n([\s\S]+?)\r?\n---/.exec(content);
      if (match != null)
        match[1].split('\n').forEach(pair => {
          let [key, ...v] = pair.split(':');
          frontmatter[key.trim() as 'theme'] = v.join(':').trim();
        });
    }
  }

  let highlights = new Set(JSON.parse(frontmatter.highlight || '[]').map((x: number) => x - 1));

  // tokenize & build custom string output
  let tokens = Prism.tokenize(code, grammar);
  let output = '';

  let theme = frontmatter.theme || 'light';
  output += '<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally';

  if (theme === 'light') output += ' CodeBlock-is-light-in-light-theme';
  output += ` CodeBlock--language-${lang}" language="${lang}">`;

  if (frontmatter.header) output += `<span class="CodeBlock--header">${frontmatter.header}</span>`;
  else if (frontmatter.filename)
    output += `<span class="CodeBlock--filename">${frontmatter.filename}</span>`;

  output += '<code>';
  output += '<span class="CodeBlock--rows">';
  output += '<span class="CodeBlock--rows-content">';

  let i = 0;
  let row = '';
  let line: Line;
  let lines = normalize(tokens);

  for (; i < lines.length; i++) {
    line = lines[i];
    row = '<span class="CodeBlock--row';
    row += highlights.has(i) ? ' CodeBlock--row-is-highlighted">' : '">';
    row += '<span class="CodeBlock--row-indicator"></span>';
    row += '<div class="CodeBlock--row-content">';
    for (let j = 0; j < line.length; j++) {
      row += '<span class="' + line[j].types + '">' + line[j].content + '</span>';
    }
    output += row + '</div></span>';
  }

  return output + '</span></span></code></pre>';
}
