import * as fs from 'fs';
import { join, resolve, parse, relative } from 'path';
import { execSync } from 'child_process';

// Set the source and destination directories
const root = resolve('.');
const contentDirectory = join(root, 'content/');
const sourceDir = contentDirectory;
const destinationDir = contentDirectory;

// Process Markdown files recursively
const processMarkdownFiles = (directory) => {
  const files = fs.readdirSync(directory);

  files.forEach((filename) => {
    const filePath = join(directory, filename);
    const stats = fs.statSync(filePath);

    if (stats.isDirectory()) {
      processMarkdownFiles(filePath); // Recursively process subdirectories
    } else if (stats.isFile() && filename.endsWith('.md')) {
      const fileContent = fs.readFileSync(filePath, 'utf8');

      // Check if the file contains a Mermaid snippet
      if (fileContent.includes('```mermaid')) {
        const sourceFile = filePath;
        const relativePath = relative(sourceDir, sourceFile);
        const destinationFile = join(destinationDir, relativePath);
        const command = `mmdc -i "${sourceFile}" -o "${destinationFile}"`;

        // Execute the command synchronously
        execSync(command);

        // Read the transformed content
        const transformedContent = fs.readFileSync(destinationFile, 'utf8');

        // Update SVG reference in the transformed Markdown file
        const updatedContent = transformedContent.replace(
          /!\[([^\]]+)\]\(.\//g,
          (_, altText) => `![${altText}](../`
        );

        // Write the updated content back to the file
        fs.writeFileSync(destinationFile, updatedContent);
      }
    }
  });
};

// Start processing from the root directory
processMarkdownFiles(sourceDir);
