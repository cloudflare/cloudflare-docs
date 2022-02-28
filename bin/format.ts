import prettier from 'prettier';
import * as fs from 'fs/promises';
import { join, resolve } from 'path';
import { langs } from './prism.config';
import { options } from './prettier.config';

const ROOT = resolve('.');
const ROOTLEN = ROOT.length + 1;

const isSILENT = process.argv.includes('--quiet');
const isCHECK = process.argv.includes('--check');
const isBAIL = process.argv.includes('--bail');

const isMD = /\.md$/;
const isFILE = /\.([mc]?[tj]sx?|json|ya?ml|s?css)$/;
const YAML = /^\s*(---[^]+(?:---\r?\n))/;

// Unknown languages / missing parsers
const Missing = new Set<string>();

// Prism languages to ignore
const Ignores = new Set(['txt', 'diff', 'bash', 'sh', 'toml']);

// Prism language -> prettier parser
export const Parsers: Record<string, prettier.BuiltInParserName> = {
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

interface Metadata {
  file: string;
  lang: string;
  content?: string;
}

let warns = 0;
let errors = 0;

function toError(msg: string, meta: Metadata): void {
  errors++;

  msg += '\n~> file: ' + meta.file.substring(ROOTLEN);
  msg += '\n~> language: ' + meta.lang;
  if (meta.content) {
    msg += '\n~> code: ';
    meta.content.split(/\r?\n/g).forEach(txt => {
      msg += '\n\t' + txt;
    });
  }
  console.error('\n\n' + msg);
}

function format(code: string, lang: string) {
  let parser = Parsers[lang];
  if (parser == null) {
    Missing.add(lang);
    return code;
  }
  return prettier.format(code, { ...options, parser });
}

async function write(file: string, output: string, isMatch: boolean) {
  let txt = isCHECK ? 'PASS' : 'OK';
  if (isCHECK && !isMatch) {
    process.exitCode = 1;
    txt = 'FAIL';
    warns++;
  }
  isCHECK || (await fs.writeFile(file, output));
  process.stdout.write(`[${txt}] ${file.substring(ROOTLEN)}\n`);
}

async function prettify(file: string, lang?: string) {
  let extn = file.substring(file.lastIndexOf('.') + 1);

  let input = await fs.readFile(file, 'utf8');
  let output = format(input, lang || langs[extn] || extn);
  await write(file, output, input === output);
}

async function walk(dir: string): Promise<void> {
  let files = await fs.readdir(dir);

  await Promise.all(
    files.map(fname => {
      let absolute = join(dir, fname);

      if (fname === '.github') return walk(absolute);
      if (fname === 'node_modules' || fname === 'public') return;
      if (/^[._]/.test(fname) || /\.hbs$/.test(fname)) return;
      // TODO: temporarily disable `*.hbs` formatting

      if (isMD.test(fname)) return markdown(absolute);
      if (isFILE.test(fname)) return prettify(absolute);

      return fs.stat(absolute).then(stats => {
        if (stats.isDirectory()) return walk(absolute);
      });
    })
  );
}

async function markdown(file: string): Promise<void> {
  let last = 0;
  let output = '';
  let match: RegExpExecArray | null;
  let input = await fs.readFile(file, 'utf8');
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
      toError('Error formatting code snippet!', { file, lang });
      if (isBAIL) throw err;
      return console.error(err.message || err);
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
    toError('Error w/ final MDX format!', { file, lang: 'mdx' });
    if (isBAIL) throw err;
    return console.error(err.stack || err);
  }

  await write(file, output, input === output);
}

try {
  await walk(ROOT);

  if (Missing.size > 0) {
    let langs = [...Missing].sort();
    console.warn('\n\nMissing parser for language(s):\n');
    console.warn(langs.map(x => '  - ' + x).join('\n'));
  }

  if (errors || warns) {
    console.error('\n');
    if (errors) {
      console.error('Finished with %d error(s)', errors);
    }
    if (isCHECK && warns) {
      console.error('Finished with %d warning(s)', warns);
    }
    console.error('\n');
    isSILENT || process.exit(1);
  }
} catch (err) {
  console.error(err.stack || err);
  process.exit(1);
}
