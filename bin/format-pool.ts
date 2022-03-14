import * as fs from 'fs/promises';
import { join, resolve } from 'path';
import { Callback, Pool } from './pool';
import { options } from './prettier.config';

import type { Result } from './worker';

const ROOT = resolve('.');
const ROOTLEN = ROOT.length + 1;

const isSILENT = process.argv.includes('--quiet');
const isCHECK = process.argv.includes('--check');

const isFILE = /\.(mdx?|[mc]?[tj]sx?|json|ya?ml|s?css)$/;

// Unknown languages / missing parsers
const Missing = new Set<string>();

let warns = 0;
let errors = 0;

const task = new Pool({
  script: join(ROOT, 'bin/worker.ts'),
  spawn: {
    execArgv: ['--loader', 'tsm'],
    env: { NODE_NO_WARNINGS: '1' },
    workerData: { isCHECK, ROOTLEN, options },
  },
});

const handler: Callback<Result> = (err, result) => {
  if (err) return console.error(err);

  errors += result.error;
  warns += result.warn;

  if (result.warn && isCHECK) process.exitCode = 1;
  else if (result.error) process.exitCode = 1;

  result.missing.forEach(x => {
    Missing.add(x);
  });
};

async function walk(dir: string): Promise<void> {
  let files = await fs.readdir(dir);

  await Promise.all(
    files.map(fname => {
      let absolute = join(dir, fname);

      if (fname === '.github') return walk(absolute);
      if (fname === 'node_modules' || fname === 'public') return;
      if (/^[._]/.test(fname) || /\.hbs$/.test(fname)) return;
      // TODO: temporarily disable `*.hbs` formatting

      if (isFILE.test(fname)) {
        return task.run(absolute, handler);
      }

      return fs.stat(absolute).then(stats => {
        if (stats.isDirectory()) return walk(absolute);
      });
    })
  );
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
