import { createHash } from "node:crypto";
import { readdir, readFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { join, relative } from "node:path";
import type { AstroIntegration } from "astro";

async function collectCssFiles(directory: string): Promise<string[]> {
	const files: string[] = [];

	for (const entry of await readdir(directory, { withFileTypes: true })) {
		const path = join(directory, entry.name);

		if (entry.isDirectory()) {
			files.push(...(await collectCssFiles(path)));
		} else if (entry.isFile() && entry.name.endsWith(".css")) {
			files.push(path);
		}
	}

	return files;
}

async function hashCssAssets(directory: URL): Promise<string> {
	const root = fileURLToPath(directory);
	const files = (await collectCssFiles(root)).sort();
	const hash = createHash("sha256");

	for (const file of files) {
		hash.update(relative(root, file));
		hash.update("\0");
		hash.update(await readFile(file));
		hash.update("\0");
	}

	return hash.digest("hex");
}

export function incrementalCssInvalidation(
	assetsDirectory: URL,
): AstroIntegration {
	return {
		name: "cf:incremental-css-invalidation",
		hooks: {
			"astro:build:start": ({ setPrerenderer }) => {
				setPrerenderer((prerenderer) => ({
					...prerenderer,
					name: `${prerenderer.name}:css-invalidation`,
					async getStaticPaths() {
						const [paths, cssHash] = await Promise.all([
							prerenderer.getStaticPaths(),
							hashCssAssets(assetsDirectory),
						]);

						return paths.map((path) =>
							path.cacheKey === undefined
								? path
								: {
										...path,
										cacheKey: `${path.cacheKey}:css:${cssHash}`,
									},
						);
					},
				}));
			},
		},
	};
}
