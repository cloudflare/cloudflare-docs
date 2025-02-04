import { readFile, writeFile } from "fs/promises";
import { optimize } from "svgo";
import glob from "fast-glob";
import { formatBytes } from "../src/util/helpers";

async function run() {
	const start = performance.now();
	const globs = ["src/**/*.svg"];

	const files = await glob(globs);

	if (files.length === 0) {
		console.log("No SVG files found");
		return;
	}

	console.log(`Optimizing ${files.length} SVG files`);

	// track some stats for logging
	let processed = 0;
	let originalSize = 0;
	let optimizedSize = 0;

	for (const [index, filePath] of Object.entries(files)) {
		console.log(
			`[${Number(index) + 1} / ${files.length}] Optimizing ${filePath}`,
		);
		const content = await readFile(filePath, "utf8");
		originalSize += content.length;
		try {
			const result = optimize(content, {
				multipass: true,
				// uses the default preset with the exception of disabling a few plugins that might introduce potential issues with specific CSS, JS targeting etc
				plugins: [
					{
						name: "preset-default",
						params: {
							overrides: {
								cleanupIds: false,
								removeTitle: false,
								removeViewBox: false,
								removeHiddenElems: false,
							},
						},
					},
				],
			});
			console.log(
				`\tOptimized ${filePath} from ${formatBytes(content.length)} to ${formatBytes(result.data.length)}`,
			);
			optimizedSize += result.data.length;
			await writeFile(filePath, result.data);
		} catch (err) {
			console.error(`Error optimizing ${filePath}: ${err}`);
		} finally {
			processed++;
		}
	}

	const end = performance.now();
	const duration = end - start;
	const seconds = Math.floor(duration / 1000);
	console.log(`Optimized ${processed} SVG files in ${seconds}s`);
	console.log(
		`Original size: ~${formatBytes(originalSize)}, optimized size: ~${formatBytes(optimizedSize)}. Saved ~${formatBytes(originalSize - optimizedSize)}`,
	);
}

run();
