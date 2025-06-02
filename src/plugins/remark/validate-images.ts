import { existsSync } from "node:fs";
import { join } from "node:path";
import { visit } from "unist-util-visit";

import type { Node } from "unist";
import type { VFile } from "vfile";

interface ImageNode extends Node {
	type: "image";
	url: string;
	position?: {
		start: { line: number; column: number };
		end: { line: number; column: number };
	};
}

export default function validateImages() {
	const rootDir = process.cwd();

	const assetsDir = join(rootDir, "src", "assets");
	const publicDir = join(rootDir, "public");

	return (tree: Node, file: VFile) => {
		visit(tree, "image", (node: ImageNode) => {
			const { url } = node;
			let fullPath: string | null;

			// Skip remote images
			if (url.startsWith("http:") || url.startsWith("https:")) {
				return;
			}

			// Handle relative paths to assets
			if (url.startsWith("../") || url.startsWith("~/assets/")) {
				// Remove the ~/assets/ or ../ prefix and join with the assets directory
				const relativePath = url.startsWith("~/") ? url.slice(9) : url;
				fullPath = join(assetsDir, relativePath);
			} else if (url.startsWith("/")) {
				// Handle absolute paths (public directory)
				fullPath = join(publicDir, url);
			} else {
				// Skip if we don't know how to handle this URL
				return;
			}

			// Check if the file exists
			if (!existsSync(fullPath)) {
				const position = node.position
					? ` at line ${node.position.start.line}, column ${node.position.start.column}`
					: "";

				const error = new Error(
					`Image not found: "${url}"${position} in ${file.path}\n` +
						`Expected to find at: ${fullPath}`,
				) as Error & { file?: string };

				error.file = file.path;
				throw error;
			}
		});
	};
}
