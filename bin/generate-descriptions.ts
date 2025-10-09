#!/usr/bin/env tsx

/**
 * This script generates descriptions for MDX files in the docs directory
 * that don't have a description field in their frontmatter.
 *
 * It uses the rendered markdown from the distmd directory to generate descriptions
 * by sending the content to a localhost:8788 application.
 *
 * Usage:
 * npm run generate-descriptions [-- --pcx-content-type <type>]
 *
 * Options:
 * --pcx-content-type <type>  Filter MDX files by pcx_content_type (e.g., overview, tutorial, navigation)
 */

import fs from "fs/promises";
import path from "path";
import globby from "fast-glob";
import matter from "gray-matter";

const DOCS_DIR = path.join(process.cwd(), "src/content/docs");
const DISTMD_DIR = path.join(process.cwd(), "distmd");

// Localhost application URL
const LOCALHOST_URL = "http://localhost:8787";

/**
 * Sends text content to localhost application and receives description back
 */
async function generateDescriptionFromAPI(
	content: string,
): Promise<string | undefined> {
	try {
		const response = await fetch(LOCALHOST_URL, {
			method: "POST",
			headers: {
				"Content-Type": "text/plain",
			},
			body: content,
		});

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}

		const description = await response.text();
		// Remove surrounding quotes if they exist
		const trimmed = description.trim();
		if ((trimmed.startsWith('"') && trimmed.endsWith('"')) || 
		    (trimmed.startsWith("'") && trimmed.endsWith("'"))) {
			return trimmed.slice(1, -1);
		}
		return trimmed;
	} catch (error) {
		console.error("Error calling localhost API:", error);
		return undefined;
	}
}

/**
 * Gets the rendered markdown path for a docs file
 */
function getRenderedPath(docPath: string): string {
	// Convert /src/content/docs/product/path/file.mdx to /distmd/product/path/file/index.md
	const relativePath = path.relative(DOCS_DIR, docPath);
	const pathWithoutExt = relativePath.replace(/\.mdx$/, "");
	const filename = path.basename(pathWithoutExt);
	const dirPath = path.dirname(pathWithoutExt);
	return path.join(DISTMD_DIR, dirPath, filename, "index.md");
}

/**
 * Updates the frontmatter of an MDX file with a description
 * Ensures that only the description field is modified and all other fields remain unchanged
 * @returns boolean indicating whether the file was updated (true) or skipped (false)
 */
async function updateFrontmatter(
	filePath: string,
	description: string,
): Promise<boolean> {
	// Read the original file content to preserve exact formatting
	const originalContent = await fs.readFile(filePath, "utf-8");

	// Parse the frontmatter
	const { data: frontmatter } = matter(originalContent);

	// Check if the description already exists and is the same
	if (frontmatter.description === description) {
		console.log(
			`⏭️ Skipped ${path.relative(process.cwd(), filePath)} (description unchanged)`,
		);
		return false;
	}

	// Instead of using matter.stringify which might change date formats,
	// we'll manually update just the description field in the original content

	// Extract the frontmatter section (between the first two --- markers)
	const frontmatterMatch = originalContent.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!frontmatterMatch) {
		console.error(`Could not extract frontmatter from ${filePath}`);
		return false;
	}

	const originalFrontmatter = frontmatterMatch[1];

	// Check if description already exists in the frontmatter
	const descriptionRegex = /^description:.*$(\r?\n(?: .*$)*)/m;
	let newFrontmatter: string;

	if (descriptionRegex.test(originalFrontmatter)) {
		// Replace existing description
		newFrontmatter = originalFrontmatter.replace(
			descriptionRegex,
			`description: >-\n  ${description.replace(/\n/g, "\n  ")}`,
		);
	} else {
		// Add description at the end of frontmatter
		newFrontmatter = `${originalFrontmatter.trim()}\ndescription: >-\n  ${description.replace(/\n/g, "\n  ")}`;
	}

	// Replace the frontmatter in the original content
	const updatedContent = originalContent.replace(
		/^---\r?\n[\s\S]*?\r?\n---/,
		`---\n${newFrontmatter}\n---`,
	);

	// Write updated content back to file
	await fs.writeFile(filePath, updatedContent, "utf-8");

	console.log(`✅ Updated ${path.relative(process.cwd(), filePath)}`);

	return true;
}

/**
 * Parse command line arguments
 */
function parseArgs() {
	const args = process.argv.slice(2);
	let pcxContentType: string | undefined;
	let showHelp = false;

	for (let i = 0; i < args.length; i++) {
		if (args[i] === "--pcx-content-type" && i + 1 < args.length) {
			pcxContentType = args[i + 1];
			i++; // Skip the next argument as it's the value
		} else if (args[i] === "--help" || args[i] === "-h") {
			showHelp = true;
		}
	}

	return { pcxContentType, showHelp };
}

/**
 * Main function
 */
function showUsage() {
	console.log(`
Usage: npx tsx bin/generate-descriptions.ts [options]

Options:
  --pcx-content-type <type>  Filter MDX files by pcx_content_type (e.g., overview, tutorial, navigation)
  --help, -h                 Show this help message
`);
}

async function main() {
	// Parse command line arguments
	const { pcxContentType, showHelp } = parseArgs();

	if (showHelp) {
		showUsage();
		return;
	}

	if (pcxContentType) {
		console.log(`Filtering by pcx_content_type: ${pcxContentType}`);
	}
	try {
		// Find all MDX files in the docs directory
		const mdxFiles = await globby("**/*.mdx", {
			cwd: DOCS_DIR,
			absolute: true,
		});
		console.log(`Found ${mdxFiles.length} MDX files in the docs directory`);

		// Filter files by pcx_content_type if specified
		let filteredMdxFiles = mdxFiles;
		if (pcxContentType) {
			filteredMdxFiles = [];
			for (const mdxFile of mdxFiles) {
				try {
					const content = await fs.readFile(mdxFile, "utf-8");
					const { data: frontmatter } = matter(content);
					if (frontmatter.pcx_content_type === pcxContentType) {
						filteredMdxFiles.push(mdxFile);
					}
				} catch (error) {
					console.error(`Error reading ${mdxFile}:`, error);
				}
			}
			console.log(
				`Filtered to ${filteredMdxFiles.length} MDX files with pcx_content_type: ${pcxContentType}`,
			);
		}

		let updatedCount = 0;
		let skippedExistingCount = 0;
		let skippedUnchangedCount = 0;
		let errorCount = 0;

		for (const mdxFile of filteredMdxFiles) {
			try {
				// Parse frontmatter
				const content = await fs.readFile(mdxFile, "utf-8");
				const { data: frontmatter } = matter(content);

				// Skip if description already exists
				if (frontmatter.description) {
					skippedExistingCount++;
					continue;
				}

				// Get the rendered markdown path
				const renderedPath = getRenderedPath(mdxFile);

				// Check if rendered markdown exists
				try {
					await fs.access(renderedPath);
				} catch (error) {
					console.warn(
						`⚠️ Rendered markdown not found for ${path.relative(process.cwd(), mdxFile)}`,
					);
					errorCount++;
					continue;
				}

				// Read rendered markdown content
				const markdownContent = await fs.readFile(renderedPath, "utf-8");

				if (!markdownContent.trim()) {
					console.warn(
						`⚠️ Empty markdown content found for ${path.relative(process.cwd(), mdxFile)}`,
					);
					errorCount++;
					continue;
				}

				// Generate description using localhost API
				const description = await generateDescriptionFromAPI(markdownContent);

				// Skip if no description could be generated
				if (!description) {
					console.warn(
						`⚠️ Could not generate description for ${path.relative(process.cwd(), mdxFile)}`,
					);
					errorCount++;
					continue;
				}

				// Update frontmatter
				const wasUpdated = await updateFrontmatter(mdxFile, description);
				if (wasUpdated) {
					updatedCount++;
				} else {
					skippedUnchangedCount++;
				}
			} catch (error) {
				console.error(
					`❌ Error processing ${path.relative(process.cwd(), mdxFile)}:`,
					error,
				);
				errorCount++;
			}
		}

		console.log("\n--- Summary ---");
		console.log(`Total MDX files: ${mdxFiles.length}`);
		console.log(`Updated: ${updatedCount}`);
		console.log(`Skipped (already had description): ${skippedExistingCount}`);
		console.log(`Skipped (description unchanged): ${skippedUnchangedCount}`);
		console.log(`Errors: ${errorCount}`);
	} catch (error) {
		console.error("Error:", error);
		process.exit(1);
	}
}

main();
