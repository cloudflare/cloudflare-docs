import { readFileSync, writeFileSync, mkdirSync } from "node:fs";

import glob from "fast-glob";
import { parse } from "node-html-parser";
import { htmlToMarkdown } from "~/util/markdown";

const files = await glob("dist/**/*.html");

for (const file of files) {
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

	const path = file.replace("dist/", "distmd/").replace(".html", ".md");

	mkdirSync(path.split("/").slice(0, -1).join("/"), { recursive: true });

	writeFileSync(path, markdown);
}
