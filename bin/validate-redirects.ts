import { readFile } from 'fs/promises';

async function main( ){
  const redirects = await readFile('content/_redirects', { encoding: 'utf-8' });

  let numInfiniteRedirects = 0;
  let numUrlsWithFragment = 0;
  for (const line of redirects.split('\n')) {
    if (line.startsWith('#') || line.trim() === '') continue;

    const [from, to] = line.split(' ');

    if (from === to) {
      console.log(`✘ Found infinite redirect:\n    ${from} -> ${to}`);
      numInfiniteRedirects++;
    }

    if (from.includes('#')) {
      console.log(`✘ Found source URL with fragment:\n    ${from}`);
      numUrlsWithFragment++;
    }
  }

  if (numInfiniteRedirects || numUrlsWithFragment) {
    console.log("\nDetected errors:");

    if (numInfiniteRedirects > 0) {
      console.log(`- ${numInfiniteRedirects} infinite redirect(s)`);
    }

    if (numUrlsWithFragment > 0) {
      console.log(`- ${numUrlsWithFragment} source URL(s) with a fragment`);
    }

    console.log("\nPlease fix the errors above before merging :)");
    process.exit(1);
  } else {
    console.log("\nDone!");
  }
}

main();
