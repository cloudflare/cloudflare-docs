import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';

// Set the source and destination directories
const sourceDir = '/content';
const destinationDir = '/content';

// Get a list of markdown files in the source directory
const markdownFiles = fs.readdirSync(sourceDir).filter((filename) => filename.endsWith('.md'));

// Transform each markdown file using mermaid-cli
markdownFiles.forEach((filename) => {
  const sourceFile = path.join(sourceDir, filename);
  const destinationFile = path.join(destinationDir, path.parse(filename).name + '.html');
  const command = `mmdc -i "${sourceFile}" -o "${destinationFile}"`;

  // Execute the command synchronously
  execSync(command);
});
