#!/usr/bin/env tsx

/**
 * This script generates descriptions for MDX files in the docs directory
 * that don't have a description field in their frontmatter.
 *
 * It uses the rendered markdown from the distmd directory to generate descriptions
 * by sending the content to a localhost:8787 application.
 *
 * To run, you'll need to do the following:
 * 1. Get your local build setup:
 * 		1. Run `npm run build` to build the local docs.
 * 		2. Run `npx tsx bin/generate-index-md.ts` to generate the index.md files (saves on tokens) + avoids extra HTML.
 * 2. Have a local Worker running on `localhost:8787` with the following code (also requires adding a binding in the Wrangler config file):
 *
 * 		```
  		export interface Env {
				AI: Ai;
			}

			export default {
				async fetch(request, env): Promise<Response> {

					const input_text = await request.text()

					const messages = [
						{ role: "system", content: "You are an assistant who helps summarize long chunks of text." },
						{ role: "system", content: "You help generate optimized SEO descriptions that are - at most - 60 words. These also convey the most important points of the page and contain keywords." },
						{ role: "system", content: "In your response, provide no content other than the summary text."},
						{
							role: "user",
							content: input_text,
						},
					];
					const response = await env.AI.run("@cf/meta/llama-3.3-70b-instruct-fp8-fast", { messages });

					return Response.json(response.response);
				},
			} satisfies ExportedHandler<Env>;
 * 		```
 * 3. Run `npx tsx bin/generate-descriptions.ts [options]` to generate the descriptions.
 *
 * Available options:
 * - `--pcx-content-type $TYPE`: Filter by content type (e.g., tutorial, overview)
 * - `--product $PRODUCT`: Filter by product folder (e.g., workers, pages, r2)
 *
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
		// Remove surrounding quotes and all square brackets
		let trimmed = description.trim();

		// Remove surrounding quotes
		if (
			(trimmed.startsWith('"') && trimmed.endsWith('"')) ||
			(trimmed.startsWith("'") && trimmed.endsWith("'"))
		) {
			trimmed = trimmed.slice(1, -1);
		}

		// Remove all square brackets from the text
		trimmed = trimmed.replace(/\[|\]/g, "");

		return trimmed.trim();
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
	let product: string | undefined;
	let showHelp = false;

	for (let i = 0; i < args.length; i++) {
		if (args[i] === "--pcx-content-type" && i + 1 < args.length) {
			pcxContentType = args[i + 1];
			i++; // Skip the next argument as it's the value
		} else if (args[i] === "--product" && i + 1 < args.length) {
			product = args[i + 1];
			i++; // Skip the next argument as it's the value
		} else if (args[i] === "--help" || args[i] === "-h") {
			showHelp = true;
		}
	}

	return { pcxContentType, product, showHelp };
}

/**
 * Main function
 */
function showUsage() {
	console.log(`
Usage: npx tsx bin/generate-descriptions.ts [options]

Options:
  --pcx-content-type <type>  Filter MDX files by pcx_content_type (e.g., overview, tutorial, navigation)
  --product <product>        Filter MDX files by product folder (e.g., workers, pages, r2)
  --help, -h                 Show this help message
`);
}

async function main() {
	// Parse command line arguments
	const { pcxContentType, product, showHelp } = parseArgs();

	if (showHelp) {
		showUsage();
		return;
	}

	if (pcxContentType) {
		console.log(`Filtering by pcx_content_type: ${pcxContentType}`);
	}

	if (product) {
		console.log(`Filtering by product: ${product}`);
	}
	try {
		// Find all MDX files in the docs directory
		const mdxFiles = await globby("**/*.mdx", {
			cwd: DOCS_DIR,
			absolute: true,
		});
		console.log(`Found ${mdxFiles.length} MDX files in the docs directory`);

		// Filter files by product if specified
		let filteredMdxFiles = mdxFiles;
		if (product) {
			const productPath = path.join(DOCS_DIR, product);

			// Check if the product directory exists
			try {
				await fs.access(productPath);
			} catch (error) {
				console.error(
					`Product directory not found: ${productPath} -- ${error}`,
				);
				process.exit(1);
			}

			// Filter files by product
			filteredMdxFiles = mdxFiles.filter((file) => {
				return file.startsWith(productPath);
			});
			console.log(
				`Filtered to ${filteredMdxFiles.length} MDX files in product: ${product}`,
			);
		}

		// Further filter files by pcx_content_type if specified
		if (pcxContentType) {
			const contentTypeFiltered = [];
			for (const mdxFile of filteredMdxFiles) {
				try {
					const content = await fs.readFile(mdxFile, "utf-8");
					const { data: frontmatter } = matter(content);
					if (frontmatter.pcx_content_type === pcxContentType) {
						contentTypeFiltered.push(mdxFile);
					}
				} catch (error) {
					console.error(`Error reading ${mdxFile}:`, error);
				}
			}
			filteredMdxFiles = contentTypeFiltered;
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
					console.log(error);
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
		if (product) {
			console.log(`Files in product '${product}': ${filteredMdxFiles.length}`);
		}
		if (pcxContentType) {
			console.log(
				`Files with pcx_content_type '${pcxContentType}': ${filteredMdxFiles.length}`,
			);
		}
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
