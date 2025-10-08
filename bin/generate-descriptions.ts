#!/usr/bin/env tsx

/**
 * This script generates descriptions for MDX files in the docs directory
 * that don't have a description field in their frontmatter.
 *
 * It uses the rendered HTML from the dist directory to generate descriptions
 * using the generateDescription function from src/util/props.ts.
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
import { parse as parseHTML } from "node-html-parser";
import { generateDescription } from "../src/util/props";
import matter from "gray-matter";

const DOCS_DIR = path.join(process.cwd(), "src/content/docs");
const DIST_DIR = path.join(process.cwd(), "dist");

// Maximum length for descriptions
const MAX_DESCRIPTION_LENGTH = 160;

/**
 * Extracts the first paragraph from HTML content
 */
function extractFirstParagraph(html: string): string | undefined {
	const dom = parseHTML(html);
	const paragraph = dom.querySelector("p");

	if (paragraph) {
		return paragraph.textContent.trim();
	}

	return undefined;
}

/**
 * Truncates a description to a reasonable length
 */
function truncateDescription(description: string): string {
	if (description.length <= MAX_DESCRIPTION_LENGTH) {
		return description;
	}

	// Truncate at the last space before MAX_DESCRIPTION_LENGTH
	const truncated = description.substring(0, MAX_DESCRIPTION_LENGTH);
	const lastSpace = truncated.lastIndexOf(" ");

	if (lastSpace > 0) {
		return truncated.substring(0, lastSpace) + "...";
	}

	return truncated + "...";
}

/**
 * Gets the rendered HTML path for a docs file
 */
function getRenderedPath(docPath: string): string {
	// Convert /src/content/docs/product/path/file.mdx to /dist/product/path/file/index.html
	const relativePath = path.relative(DOCS_DIR, docPath);
	const pathWithoutExt = relativePath.replace(/\.mdx$/, "");
	return path.join(DIST_DIR, pathWithoutExt, "index.html");
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
	const { data: frontmatter, content: mdxContent } = matter(originalContent);

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

				// Get the rendered HTML path
				const renderedPath = getRenderedPath(mdxFile);

				// Check if rendered HTML exists
				try {
					await fs.access(renderedPath);
				} catch (error) {
					console.warn(
						`⚠️ Rendered HTML not found for ${path.relative(process.cwd(), mdxFile)}`,
					);
					errorCount++;
					continue;
				}

				// Read rendered HTML
				const html = await fs.readFile(renderedPath, "utf-8");

				// Extract main content from HTML
				const dom = parseHTML(html);
				const mainContent = dom.querySelector("main")?.innerHTML || "";

				if (!mainContent) {
					console.warn(
						`⚠️ No main content found in rendered HTML for ${path.relative(process.cwd(), mdxFile)}`,
					);
					errorCount++;
					continue;
				}

				// Generate description
				let description = await generateDescription({ html: mainContent });

				// If no description was generated, try extracting the first paragraph
				if (!description) {
					description = extractFirstParagraph(mainContent);
				}

				// Skip if no description could be generated
				if (!description) {
					console.warn(
						`⚠️ Could not generate description for ${path.relative(process.cwd(), mdxFile)}`,
					);
					errorCount++;
					continue;
				}

				// Truncate description if needed
				description = truncateDescription(description);

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
