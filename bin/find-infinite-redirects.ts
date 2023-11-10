import { readFile } from 'fs/promises';

async function main( ){
  const redirects = await readFile('content/_redirects', { encoding: 'utf-8' });

  let found = 0;
  for (const line of redirects.split('\n')) {
    if (line.startsWith('#') || line.trim() === '') continue;

    const [from, to] = line.split(' ');

    if (from === to) {
      console.log(`Found infinite redirect: ${from} -> ${to}`);
      found++;
    }
  }

  if (found) {
    console.log(`\nFound ${found} infinite redirects, please fix them before merging :)`);
    process.exit(1);
  }
}

main();
