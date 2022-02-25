import * as fs from 'node:fs';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { dirname, join } from 'node:path';
import * as c from 'node:child_process';

const __filename = fileURLToPath(import.meta.url);
export const require = createRequire(__filename);
export const __dirname = dirname(__filename);

export const ROOT = join(__dirname, '..');

// directories :: gatsby
export const SITE = join(ROOT, 'developers.cloudflare.com');
export const PRODUCTICONS = join(ROOT, 'product-icons');
export const PRODUCTS = join(ROOT, 'products');

// directories :: hugo
export const ASSETS = join(ROOT, 'assets');
export const LAYOUTS = join(ROOT, 'layouts');
export const CONTENT = join(ROOT, 'content');
export const STATIC = join(ROOT, 'static');
export const DATA = join(ROOT, 'data');

// executables
export const run = promisify(c.exec);
export const git = (...args: string[]) => {
  return run(`git ${args.join(' ')}`, {
    cwd: ROOT
  });
}

// fs :: files
export const exists = fs.existsSync;
export const write = fs.promises.writeFile;
export const read = fs.promises.readFile;
export const cp = fs.promises.cp;

// fs :: dirs
export const rm = fs.promises.rm;
export const ls = fs.promises.readdir;
export async function mkdir(dir: string) {
  return exists(dir) || fs.promises.mkdir(dir, { recursive: true });
}

interface Options {
  ignore?(name: string, file: string, list: string[]): boolean;
  task(args: { name: string, file: string, list: string[], dir: string }): any;
}

export const Ignores = new Set(['node_modules', 'static']);
export async function walk(dir: string, options: Options) {
  let list = await ls(dir, { withFileTypes: true });
  let names = list.map(x => x.name);

  await Promise.all(
    list.map(async dirent => {
      let name = dirent.name;
      let file = join(dir, name);

      if (Ignores.has(name)) return;
      if (options.ignore && options.ignore(name, file, names)) return;

      if (dirent.isFile() && /\.md$/.test(name)) {
        await options.task({ name, file, list: names, dir });
      } else if (dirent.isDirectory()) {
        return walk(file, options);
      }
    })
  );
}

const isDEBUG = process.argv.includes('--debug');
export function log(...x: unknown[]) {
  if (isDEBUG) console.log(...x);
}