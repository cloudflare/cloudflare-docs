import { existsSync } from "node:fs";
import { join } from "node:path";
import { fileURLToPath } from "node:url";

import { defineMdastPlugin } from "satteri";

export default function validateImages() {
	const rootDir = process.cwd();

	const assetsDir = join(rootDir, "src", "assets");
	const publicDir = join(rootDir, "public");

	return defineMdastPlugin({
		name: "validate-images",
		image(node, ctx) {
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

			if (existsSync(fullPath)) {
				return;
			}

			const where = node.position
				? ` at line ${node.position.start.line}, column ${node.position.start.column}`
				: "";
			const file = ctx.fileURL ? fileURLToPath(ctx.fileURL) : "<unknown>";

			const error = new Error(
				`Image not found: "${url}"${where} in ${file}\n` +
					`Expected to find at: ${fullPath}`,
			) as Error & { file?: string };

			error.file = file;
			throw error;
		},
	});
}
