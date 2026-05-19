import fs from "node:fs";
import path from "node:path";

const OUTPUT_DIR = path.join(process.cwd(), "src/content/workers-ai-models");
const API_URL = "https://ai-cloudflare-com.pages.dev/api/models";

const response = await fetch(API_URL);
if (!response.ok) {
	throw new Error(
		`fetch-ai-models: API returned HTTP ${response.status} ${response.statusText}.`,
	);
}

const data = await response.json();

const existingFiles = new Set(
	fs.readdirSync(OUTPUT_DIR).filter((file) => file.endsWith(".json")),
);

const now = Date.now();

for (const model of data.models) {
	const fileName = `${model.name.split("/")[2]}.json`;

	const deprecation = (model.properties ?? []).find(
		(p) => p.property_id === "planned_deprecation_date",
	);
	if (deprecation && new Date(deprecation.value).getTime() < now) {
		continue;
	}

	existingFiles.delete(fileName);
	fs.writeFileSync(
		path.join(OUTPUT_DIR, fileName),
		JSON.stringify(model, null, 4),
		"utf-8",
	);
}

for (const fileName of existingFiles) {
	const filePath = path.join(OUTPUT_DIR, fileName);
	const file = JSON.parse(fs.readFileSync(filePath, "utf-8"));
	const deprecation = (file.properties ?? []).find(
		(p) => p.property_id === "planned_deprecation_date",
	);
	if (deprecation && new Date(deprecation.value).getTime() >= now) {
		continue;
	}
	fs.unlinkSync(filePath);
}
