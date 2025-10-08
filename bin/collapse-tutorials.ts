#!/usr/bin/env tsx

/**
 * This script collapses the folder structure in src/content/docs/pages/tutorials
 * by moving index.mdx files to the parent directory with the folder name as the filename.
 *
 * Usage:
 * npx tsx bin/collapse-tutorials.ts
 */

import fs from "fs/promises";
import path from "path";
import globby from "fast-glob";

// Explicitly set the path to pages/tutorials
const TUTORIALS_DIR = path.join(
	process.cwd(),
	"src/content/docs/workers/tutorials",
);

/**
 * Main function
 */
async function main() {
	try {
		// Find all subdirectories in the tutorials directory
		const directories = await fs.readdir(TUTORIALS_DIR, {
			withFileTypes: true,
		});
		const subdirs = directories
			.filter((dirent) => dirent.isDirectory())
			.map((dirent) => dirent.name);

		console.log(`Found ${subdirs.length} subdirectories in ${TUTORIALS_DIR}`);

		let successCount = 0;
		let skipCount = 0;
		let errorCount = 0;

		// Process each subdirectory
		for (const subdir of subdirs) {
			const subdirPath = path.join(TUTORIALS_DIR, subdir);
			const indexPath = path.join(subdirPath, "index.mdx");
			const newPath = path.join(TUTORIALS_DIR, `${subdir}.mdx`);

			try {
				// Check if index.mdx exists
				try {
					await fs.access(indexPath);
				} catch (error) {
					console.warn(`⚠️ No index.mdx found in ${subdir}/`);
					skipCount++;
					continue;
				}

				// Check if target file already exists
				try {
					await fs.access(newPath);
					console.warn(`⚠️ Target file ${subdir}.mdx already exists, skipping`);
					skipCount++;
					continue;
				} catch (error) {
					// File doesn't exist, which is what we want
				}

				// Read the content of index.mdx
				const content = await fs.readFile(indexPath, "utf-8");

				// Write content to new file
				await fs.writeFile(newPath, content, "utf-8");

				// Remove the original index.mdx file
				await fs.unlink(indexPath);

				console.log(
					`✅ Moved ${subdir}/index.mdx to ${subdir}.mdx and removed original`,
				);
				successCount++;
			} catch (error) {
				console.error(`❌ Error processing ${subdir}:`, error);
				errorCount++;
			}
		}

		console.log("\n--- Summary ---");
		console.log(`Total subdirectories: ${subdirs.length}`);
		console.log(`Successfully moved: ${successCount}`);
		console.log(`Skipped: ${skipCount}`);
		console.log(`Errors: ${errorCount}`);
	} catch (error) {
		console.error("Error:", error);
		process.exit(1);
	}
}

main();
