/**
 * Crawl the `/public` directory and assert:
 * - all anchor tags (<a>) do not point to broken links
 * - all images (<img>) do not have broken sources
 * NOTE: Requires `npm run build` first!
 */
import * as http from 'http';
import * as https from 'https';
import { existsSync } from 'fs';
import * as fs from 'fs/promises';
import { join, resolve, extname } from 'path';
import { parse } from 'node-html-parser';

let WARNS = 0;
let ERRORS = 0;

const ROOT = resolve('.');
const PUBDIR = join(ROOT, 'public');
const VERBOSE = process.argv.includes('--verbose');
const EXTERNALS = process.argv.includes('--externals');

async function walk(dir: string) {
  let files = await fs.readdir(dir);
  await Promise.all(
    files.map(async name => {
      let abs = join(dir, name);
      if (name.endsWith('.html')) return task(abs);

      let stats = await fs.stat(abs);
      if (stats.isDirectory()) return walk(abs);
    })
  );
}

let CACHE = new Map<string, boolean>();

function HEAD(url: string): Promise<boolean> {
  let value = CACHE.has(url);
  if (value != null) return Promise.resolve(value);

  let options: https.RequestOptions = {
    method: 'HEAD',
    headers: {
      'user-agent': 'dev-docs'
    }
  };

  if (url.startsWith('http://')) {
    options.agent = http.globalAgent;
  }

  let req = https.request(url, options);

  return new Promise(r => {
    req.on('error', err => {
      console.log(url, err);
      CACHE.set(url, false);
      return r(false);
    });

    req.on('response', res => {
      let bool = (res.statusCode > 199 && res.statusCode < 400);
      console.log({ url, bool });
      CACHE.set(url, bool);
      return r(bool);
    });

    req.end();
  });
}

interface Message {
  type: 'error' | 'warn';
  html: string;
  value?: string;
  text?: string;
}

async function task(file: string) {
  let html = await fs.readFile(file, 'utf8');

  let document = parse(html, {
    comment: false,
    blockTextElements: {
      script: false,
      noscript: false,
      style: false,
      pre: false,
    }
  });

  let placeholder = 'http://foo.io';
  // build this file's URL; without "index.html" at end
  let self = file.substring(PUBDIR.length, file.length - 10).replace(/\\+/g, '/');
  let url = new URL(self, placeholder);

  let messages: Message[] = [];
  let items = document.querySelectorAll('a[href],img[src]');

  await Promise.all(
    items.map(async item => {
      let content = item.outerHTML;
      let target = item.getAttribute('src') || item.getAttribute('href');

      if (!target && item.rawTagName === 'a') {
        // parsing error; this is actually `<a ... href=/>
        if (/logo-link/.test(item.classNames)) return;
        return messages.push({
          type: 'warn',
          html: content,
          text: `Missing "href" value`,
        });
      }

      let exists: boolean;
      let external = false;
      let resolved = new URL(target, url);

      if (!/https?/.test(resolved.protocol)) return;

      if (resolved.hostname === 'developers.cloudflare.com') {
        messages.push({
          type: 'warn',
          html: content,
          text: `rewrite in "/absolute/" format: "${target}"`,
        });

        target = resolved.pathname;
      } else if (external = resolved.origin !== placeholder) {
        // only fetch external URLs with `--externals` flag
        exists = EXTERNALS ? await HEAD(target) : true;
      }

      if (!external) {
        let local = join(PUBDIR, resolved.pathname);

        // is this HTML page? eg; "/foo/"
        if (extname(local).length === 0) {
          // TODO? log warning about no trailing slash
          if (!local.endsWith('/')) local += '/';
          local += 'index.html';
        }

        exists = existsSync(local);
      }

      if (!exists) {
        messages.push({
          type: 'error',
          html: content,
          value: target,
        });
      }
    })
  );

  if (messages.length > 0) {
    let output = file.substring(PUBDIR.length);

    messages.forEach(msg => {
      if (msg.type === 'error') {
        output += '\n  ✘';
        ERRORS++;
      } else {
        output += '\n  ⚠';
        WARNS++;
      }
      output += '  ' + (msg.text || msg.value);
      if (VERBOSE) output += '\n    ' + msg.html;
    });

    console.log(output + '\n');
  }
}

try {
  await walk(PUBDIR);

  if (!ERRORS && !WARNS) {
    console.log('\n~> DONE~!\n\n');
  } else {
    let msg = '\n~> DONE with:';
    if (ERRORS > 0) {
      process.exitCode = 1;
      msg += '\n    - ' + ERRORS.toLocaleString() + ' error(s)';
    }
    if (WARNS > 0) {
      msg += '\n    - ' + WARNS.toLocaleString() + ' warning(s)';
    }
    console.log(msg + '\n\n');
  }
} catch (err) {
  console.error(err.stack || err);
  process.exit(1);
}