import { writeFile, mkdir } from "node:fs/promises";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const URL_TO_PATH = [
	{
		name: "product-maturity-and-compliance",
		url: "https://middlecache.ced.cloudflare.com/v1/products/maturity_compliance.json",
		path: "src/content/product-maturity-and-compliance/index.json",
	},
];

async function fetchExternalSotDataLocally() {
	try {
		for (const { name, url, path } of URL_TO_PATH) {
			//console.log(`Fetching ${name} data...`);
			const response = await fetch(url);

			const data = await response.json();

			await mkdir(dirname(path), { recursive: true });
			await writeFile(path, JSON.stringify(data, null, 2), "utf-8");

			if (!response.ok) {
				throw new Error(
					`Failed to download ${name} external source-of-truth data locallly: ${response.status} ${response.statusText}`,
				);
			} else {
				console.log(`✓ ${name} data saved to ${path}`);
			}
		}
		process.exit(0);
	} catch (error) {
		console.error("Error downloading external source-of-truth data:", error);
		process.exit(1);
	}
}

fetchExternalSotDataLocally();
