import fs from "node:fs";
import path from "node:path";

const OUTPUT_DIR = path.join(process.cwd(), "src/content/workers-ai-models");

const response = await fetch("https://ai-cloudflare-com.pages.dev/api/models");
const data = await response.json();
const existingFiles = new Set(
	fs.readdirSync(OUTPUT_DIR).filter((file) => file.endsWith(".json")),
);

for (const model of data.models) {
	const fileName = `${model.name.split("/")[2]}.json`;
	existingFiles.delete(fileName);
	fs.writeFileSync(
		path.join(OUTPUT_DIR, fileName),
		JSON.stringify(model, null, 4),
		"utf-8",
	);
}

for (const fileName of existingFiles) {
	fs.unlinkSync(path.join(OUTPUT_DIR, fileName));
}
