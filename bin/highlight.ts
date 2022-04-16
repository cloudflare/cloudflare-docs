/**
 * tsm bin/highlight.ts replace
 * tsm bin/highlight.ts restore
 */
import * as fs from 'fs/promises';
import { join, resolve } from 'path';
import { highlight } from './prism.config';

const ROOT = resolve('.');
const ROOTLEN = ROOT.length + 1;
const CONTENT = join(ROOT, 'content');

const REPLACE = process.argv.includes('replace');
const RESTORE = !REPLACE && process.argv.includes('restore');

const isMD = /\.md$/;
const isBACKUP = /\.md\.backup$/;
// const YAML = /^\s*(---[^]+(?:---\r?\n))/;

async function walk(dir: string): Promise<void> {
  let ignores = new Set(['static', 'media']);
  let files = await fs.readdir(dir, { withFileTypes: true });

  await Promise.all(
    files.map(dirent => {
      let fname = dirent.name;
      let absolute = join(dir, fname);

      if (isMD.test(fname)) {
        if (REPLACE) return markdown(absolute);
        else return;
      }

      if (isBACKUP.test(fname)) {
        if (RESTORE) return restore(absolute);
        else return;
      }

      if (dirent.isDirectory() && !ignores.has(fname)) {
        return walk(absolute);
      }
    })
  );
}

// mv foo.md.backup foo.md
async function restore(backup: string) {
  let original = backup.substring(0, backup.length - 7);
  await fs.copyFile(backup, original);
  await fs.unlink(backup);
}

// @modified `bin/format.ts` function
async function markdown(file: string): Promise<void> {
  let last = 0;
  let output = '';
  let match: RegExpExecArray | null;
  let input = await fs.readFile(file, 'utf8');
  let BACKTICKS = /^(\s+)?([`]{3})([A-Za-z]+?)\r?\n([^]+?)(\2)/gm;

  while ((match = BACKTICKS.exec(input))) {
    let current = match.index;
    let [full, ws, open, hint, inner, close] = match;
    output += input.substring(last, current);

    ws = ws || '';

    // codeblock => HTML markup
    let lang = (hint || 'txt').toLowerCase();

    // dedent codeblock, only if indented
    let [spaces] = ws.match(/[ ]+$/) || '';
    if (spaces && spaces.length > 0) {
      let rgx = new RegExp('^([ ]){' + spaces.length + '}', 'gm');
      inner = inner.replace(rgx, '');
    }

    let html = highlight(inner, lang);

    // prevent hugo from looking at "{{<" pattern
    output += '{{<raw>}}' + html.replace(/\{\{\</g, '{\\{<') + '{{</raw>}}';

    last = current + full.length;
  }

  if (last && last < input.length) {
    output += input.substring(last);
  } else if (last < 1) {
    output = input;
  }

  let label = 'SKIP';

  if (last > 0) {
    label = 'PASS';
    //~> cp foo.md foo.md.backup
    await fs.writeFile(file + '.backup', input);
    // overwrite with HTML replacements
    await fs.writeFile(file, output);
  }

  process.stdout.write(`[${label}] ` + file.substring(ROOTLEN) + '\n');
}

try {
  await walk(CONTENT);
  console.log('~> DONE~!');
} catch (err) {
  console.error(err.stack || err);
  process.exit(1);
}
