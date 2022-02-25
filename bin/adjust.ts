/**
 * sweeping changes to "content/**" markdown
 * 1) ensure every frontmatter as a `title` value
 * 2) ensure index pages are "_index.md"
 * 3) ensure all same-origin links are absolute paths
 */

import * as fs from 'fs/promises';
import { join, resolve } from 'path';
import { toMarkdown } from 'mdast-util-to-markdown';
import { fromMarkdown } from 'mdast-util-from-markdown';
import { parse } from 'node-html-parser';
import * as astray from 'astray';
import yaml from 'yaml';

import type * as MDAST from 'mdast';

const isMD = /\.md$/;
const ROOT = resolve('.');
const CONTENT = join(ROOT, 'content');

const ORIGIN = 'https://developers.cloudflare.com';

function toHref(prefix: string, input: string): string {
  if (input.startsWith('#')) return input;

  if (/^(https?:)?\/\//.test(input)) {
    let tmp = new URL(input);
    if (tmp.origin !== ORIGIN) return input;
    return tmp.pathname + tmp.search + tmp.hash;
  }

  if (input.startsWith(prefix)) return input;

  let tmp = new URL(input, ORIGIN);

  let path = tmp.pathname;
  if (!path.endsWith('/')) {
    path += '/';
  }

  if (!path.startsWith(prefix)) {
    path = prefix + path.substring(1);
  }

  return path + tmp.search + tmp.hash;
}

async function task(file: string) {
  let fileArr = file.split('/');
  // The product name will be whatever comes after "content"
  // i.e. cloudflare-docs/content/workers/index.md
  let product = fileArr[fileArr.indexOf('content') + 1];
  let data = await fs.readFile(file, 'utf8');

  if (data.substring(0, 3) !== '---') {
    return console.log('Missing frontmatter!', file);
  }

  let index = data.indexOf('---', 3);
  let ftxt = data.substring(3, index);
  let fmatter = yaml.parse(ftxt);

  let content = data.substring(index + 3).trim();
  let tree = fromMarkdown(content);

  let title = '';
  let prefix = `/${product}/`;

  // look for title value from h1
  astray.walk<MDAST.Root, void, any>(tree, {
    heading(node: MDAST.Heading) {
      if (node.depth !== 1) return;

      astray.walk<MDAST.Heading, void, any>(node, {
        text(t: MDAST.Text) {
          title += t.value;
        },
      });

      return astray.SKIP;
    },

    link(node: MDAST.Link) {
      node.url = toHref(prefix, node.url);
    },

    html(node: MDAST.HTML) {
      if (node.value.startsWith('<button ') && node.value.includes(' href=')) {
        let html = parse(node.value);
        let button = html.querySelector('button[href]');

        if (button) {
          let href = button.getAttribute('href');

          if (href) {
            button.setAttribute('href', toHref(prefix, href));
            node.value = button.toString().slice(0, -9);
          } else {
            console.log('Missing "href" value!', node.value);
          }
        }
      }
    },
  });

  title = title.trim();
  fmatter.title = (fmatter.title || '').trim();

  if (!title) {
    return console.error('[ERROR] Missing title!', file);
  }

  if (fmatter.title === title) {
    // do nothing
  } else if (fmatter.title) {
    fmatter.meta = fmatter.meta || {};
    fmatter.meta.title = (fmatter.meta.title || title).trim();
    if (fmatter.meta.title !== title) {
      console.warn('[WARN] Mismatch `meta.title` value!', file);
    }
  } else {
    fmatter.title = title;
  }

  // regenerate new front matter
  ftxt = '---\n' + yaml.stringify(fmatter) + '---\n\n';

  content = toMarkdown(tree);

  // write the updated markdown file
  await fs.writeFile(file, ftxt + content);
}

async function walk(dir: string): Promise<void> {
  let files = await fs.readdir(dir);

  let count = 0;
  let ignores = new Set(['images', 'static']);

  for (let i=0; i < files.length; i++) {
    let tmp = files[i];
    // has many markdown OR directory siblings
    if (isMD.test(tmp)) count++;
    else if (ignores.has(tmp)) continue;
    else if (!~tmp.indexOf('.')) count++;

    if (count > 1) break;
  }

  await Promise.all(
    files.map(async fname => {
      let absolute = join(dir, fname);

      if (!isMD.test(fname)) {
        let stats = await fs.stat(absolute);
        return stats.isDirectory() && walk(absolute);
      }

      if (fname === 'index.md' && count > 1) {
        let nxt = join(dir, '_index.md');
        await fs.rename(absolute, nxt);
        absolute = nxt;
      }

      return task(absolute);
    })
  );
}

// --- init

try {
  await walk(CONTENT);
} catch (err) {
  console.error(err.stack || err);
  process.exit(1);
}
