import prettier from 'prettier';
import * as fs from 'fs/promises';
import * as thread from 'worker_threads';
import { langs } from './prism.config';

export interface Result {
  file: string;
  missing: string[];
  error: 1 | 0;
  warn: 1 | 0;
}

// Environment / inherited information
const { isCHECK, ROOTLEN, options } = thread.workerData;
const Parent = thread.parentPort!;

const YAML = /^\s*(---[^]+(?:---\r?\n))/;

// Unknown languages / missing parsers
const Missing = new Set<string>();

// Prism languages to ignore
const Ignores = new Set(['txt', 'diff', 'bash', 'sh', 'toml']);

// Prism language -> prettier parser
const Parsers: Record<string, prettier.BuiltInParserName> = {
  js: 'babel',
  javascript: 'babel',

  md: 'mdx',
  markdown: 'mdx',
  mdx: 'mdx',

  json: 'json',
  json5: 'json5',

  ts: 'typescript',
  typescript: 'typescript',

  gql: 'graphql',
  graphql: 'graphql',

  xml: 'html',
  html: 'html',
  svelte: 'html',
  hbs: 'html',
  vue: 'vue',

  yaml: 'yaml',
  yml: 'yaml',
};

function reply(
  label: 'ERRO' | 'OK' | 'PASS' | 'FAIL',
  data: Omit<Result, 'missing'>,
  extra?: string
) {
  let text = `[${label}] ${data.file.substring(ROOTLEN)}\n`;
  if (extra) text += '\n\t' + extra.replace(/(\n)/g, '$1\t') + '\n\n';
  process.stdout.write(text);

  let missing = [...Missing];
  let result: Result = { ...data, missing };
  Parent.postMessage(result);
}

function toError(msg: string, file: string, lang: string, extra?: Error | string): never {
  let error = msg;
  if (lang) error += '  (lang = ' + lang + ')';
  if (extra) error += '\n' + extra;

  reply('ERRO', { file, error: 1, warn: 0 }, error);
  throw 1;
}

function format(code: string, lang: string) {
  let parser = Parsers[lang];

  if (parser == null) {
    Missing.add(lang);
    return code;
  }

  return prettier.format(code, { ...options, parser });
}

async function markdown(file: string, input: string): Promise<string> {
  let last = 0;
  let output = '';
  let match: RegExpExecArray | null;

  let BACKTICKS = /^( +)?([`]{3})([A-Za-z]+?)\n([^]+?)(\2)/gm;

  while ((match = BACKTICKS.exec(input))) {
    let [full, lead, open, hint, inner, close] = match;

    let current = match.index;
    output += input.substring(last, current);

    lead = lead || '';
    hint = hint || 'txt';
    let lang = (langs[hint] || hint).toLowerCase();

    if (Ignores.has(lang) || Missing.has(lang)) {
      last = current + full.length;
      output += full;
      continue;
    }

    let isYAML = YAML.exec(inner);
    let frontmatter = (isYAML && isYAML[1]) || '';

    if (frontmatter.length > 0) {
      // TODO: parse for `format: false` value
      inner = inner.substring(frontmatter.length + lead.length);

      if (lead.length > 0) {
        frontmatter = frontmatter.replace(new RegExp('\n' + lead, 'g'), '\n');
      }
    }

    try {
      var pretty = format(inner, lang).trimEnd();
    } catch (err) {
      throw toError('Error formatting code snippet!', file, lang, err.message || err);
    }

    output += lead + '```' + lang + '\n';

    if (lead.length > 0) {
      (frontmatter + pretty).split(/\r?\n/g).forEach(line => {
        output += lead + line + '\n';
      });
    } else {
      output += frontmatter + pretty + '\n';
    }

    output += lead + '```';

    last = current + full.length;
  }

  if (last && last < input.length) {
    output += input.substring(last);
  } else if (last < 1) {
    output = input;
  }

  try {
    output = format(output, 'mdx');
  } catch (err) {
    throw toError('Error w/ final MDX format!', file, 'mdx', err.stack || err);
  }

  return output;
}

// Respond to `format.ts` task pool
Parent.on('message', async file => {
  let input = await fs.readFile(file, 'utf8');
  let output: string | void;

  try {
    if (/\.mdx?$/.test(file)) {
      output = await markdown(file, input);
    } else {
      let extn = file.substring(file.lastIndexOf('.') + 1);
      output = format(input, langs[extn] || extn);
    }

    if (!isCHECK && output) {
      await fs.writeFile(file, output);
    }

    const isMatch = input === output;
    const warn = +(isCHECK && !isMatch) as 1 | 0;
    const label = isCHECK ? (isMatch ? 'PASS' : 'FAIL') : 'OK';

    return reply(label, { file, warn, error: 0 });
  } catch (err) {
    if (err === 1) return; // already handled
    return reply('ERRO', { file, warn: 0, error: 1 });
  }
});
