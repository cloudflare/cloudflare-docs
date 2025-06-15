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
			let fullPath: string;

			if (url.startsWith("~/assets/")) {
				fullPath = join(assetsDir, url.slice(9));
			} else if (url.startsWith("/")) {
				fullPath = join(publicDir, url);
			} else {
				// Remote image or unrecognised URL
				return;
			}

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
