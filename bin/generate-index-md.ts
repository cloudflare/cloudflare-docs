import {
	readFileSync,
	writeFileSync,
	mkdirSync,
	appendFileSync,
} from "node:fs";

import glob from "fast-glob";
import { parse } from "node-html-parser";
import { htmlToMarkdown } from "~/util/markdown";

import YAML from "yaml";

const files = await glob("dist/**/*.html");

for (const file of files) {
	if (file === "dist/index.html" || file === "dist/404.html") {
		continue;
	}

	const html = readFileSync(file, "utf-8");
	const dom = parse(html);

	const url = dom
		.querySelector("link[rel='alternate'][type='text/markdown']")
		?.getAttribute("href");

	if (!url) {
		continue;
	}

	const markdown = await htmlToMarkdown(html, url);

	if (!markdown) {
		continue;
	}

	const product = file.split("/")[1];
	const path = file.replace("dist/", "distmd/").replace(".html", ".md");

	mkdirSync(path.split("/").slice(0, -1).join("/"), { recursive: true });
	writeFileSync(path, markdown);

	const llmsFullContent = ["<page>", markdown, "</page>\n\n"].join("\n");

	mkdirSync(`distllms/${product}`, { recursive: true });
	appendFileSync("distllms/llms-full.txt", llmsFullContent);
	appendFileSync(`distllms/${product}/llms-full.txt`, llmsFullContent);

	try {
		const path = await glob(`src/content/products/${product}.*`).then((arr) =>
			arr.at(0),
		);

		if (!path) {
			continue;
		}

		const yaml = YAML.parse(readFileSync(path, "utf-8"));
		const group = yaml.product?.group?.replaceAll(" ", "-").toLowerCase();

		if (!group) {
			continue;
		}

		mkdirSync(`distllms/${group}`, { recursive: true });
		appendFileSync(`distllms/${group}/llms-full.txt`, llmsFullContent);
	} catch (error) {
		if (error instanceof Error) {
			console.error(
				`Failed to find a product group for ${product}:`,
				error.message,
			);
		}
	}
}
