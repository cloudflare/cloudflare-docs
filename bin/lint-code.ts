import { lstat, readFile, readdir } from 'node:fs/promises';
import { resolve } from 'node:path';

import { ESLint } from 'eslint';

// Match 3 backticks, then js/ts/javascript, then a newline, then any number of characters, then 3 backticks.
const regex = new RegExp('```(?:js|ts|javascript)\\n([^]*?)```', 'gm');

async function main() {
	let fix = false;
	if (process.argv.includes('--fix')) {
		fix = true;
	}

	let foundErrors = false;

	const lint = new ESLint({ fix });
	const formatter = await lint.loadFormatter('stylish');

	// Get all files
	for (const file of await readDir(resolve('content'))) {
		if (!file.endsWith('.md')) continue;

		// Read file content
		const content = await readFile(file, { encoding: 'utf-8' });

		// Perf: Quick bail if there's no code block.
		if (!content.includes('```')) continue;

		// console.log(`Linting ${file}...`);

		// Get all JS/TS code blocks
		let match;
		let codeBlockCount = 0;
		while ((match = regex.exec(content)) !== null) {
			codeBlockCount++;

			// Get the codeblock and remove the header from the start (if it exists)
			const codeBlock = match[1].replace(/^(?:---[\s\S]+?---[\s\S]+?)?/, '');

			// Lint the code block with eslint
			const results = await lint.lintText(codeBlock);
			results.map((result) => result.filePath = `${file} (code block ${codeBlockCount})`);

			// Go through the results
			for (const result of results) {
				if (result.errorCount > 0 || result.warningCount > 0) {
					// TODO: Our own less spammy output or standard eslint output?
					// console.log(`  Found ${result.errorCount} errors, ${result.warningCount} warnings. `
					// 	+ `${result.fixableErrorCount} errors are auto-fixable (npm run lint:fix).`,
					// );
					const resultText = formatter.format(results);
					console.log(resultText);

					// TODO: Implement --fix support
					// const fixed = await ESLint.outputFixes(results);
					// console.log(fixed);

					if (result.errorCount > 0) {
						foundErrors = true;
					}
				}
			}
		}
	}

	if (foundErrors) {
		console.error('\nFound errors in code blocks. Please fix them before committing.');
		process.exit(1);
	}
}

export async function readDir(dir: string): Promise<string[]> {
	const files: string[] = [];
	for (const file of await readdir(dir)) {
		const stat = await lstat(resolve(dir, file));
		if (stat.isDirectory()) {
			files.push(...(await readDir(resolve(dir, file))));
		}

		files.push(resolve(dir, file));
	}

	return files;
}

main();
