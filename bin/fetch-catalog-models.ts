/**
 * Imports model data from the Unified Catalog and saves as JSON files.
 *
 * Usage:
 *
 *   Option 1: Import from a local JSON file (exported from dashboard)
 *     npx tsx bin/fetch-catalog-models.ts --file catalog-export.json
 *
 *   Option 2: Fetch from API (when publicly available)
 *     CLOUDFLARE_API_TOKEN=xxx CLOUDFLARE_ACCOUNT_ID=yyy npx tsx bin/fetch-catalog-models.ts
 *
 * To export from the dashboard:
 *   1. Open browser devtools Network tab
 *   2. Go to Workers AI > Models in the dashboard
 *   3. Find the request to /ai/catalog/models
 *   4. Copy the response JSON and save to a file
 *   5. Run: npx tsx bin/fetch-catalog-models.ts --file your-export.json
 */

import fs from "node:fs";
import path from "node:path";

interface CatalogModel {
	model_id: string;
	provider_id: string | null;
	name: string;
	description: string;
	task: string;
	tags: string[];
	context_length: number | null;
	max_output_tokens: number | null;
	supports_async: boolean;
	pricing: Record<string, number>;
	examples: Array<{
		name: string;
		description?: string;
		input: Record<string, unknown>;
		output: Record<string, unknown>;
	}>;
	default_example?: {
		input?: Record<string, unknown>;
		output?: Record<string, unknown>;
	};
	code_snippets?: Array<{
		label: string;
		code: string;
	}>;
	schema?: {
		input?: Record<string, unknown>;
		output?: Record<string, unknown>;
	};
	metadata: Record<string, unknown>;
	external_info: string | null;
	terms: string | null;
	cover_image_url: string | null;
	schema_version: string | null;
	private?: boolean;
	created_at?: string;
	updated_at?: string;
}

interface CatalogListResponse {
	success: boolean;
	result: CatalogModel[];
	result_info?: {
		count: number;
		page: number;
		per_page: number;
		total_count: number;
	};
	errors?: Array<{ message: string }>;
}

const OUTPUT_DIR = path.join(process.cwd(), "src/content/catalog-models");
const PER_PAGE = 100;

function parseArgs(): { file?: string } {
	const args = process.argv.slice(2);
	const fileIndex = args.indexOf("--file");
	if (fileIndex !== -1 && args[fileIndex + 1]) {
		return { file: args[fileIndex + 1] };
	}
	return {};
}

async function loadFromFile(filePath: string): Promise<CatalogModel[]> {
	console.log(`Loading models from file: ${filePath}`);

	if (!fs.existsSync(filePath)) {
		console.error(`Error: File not found: ${filePath}`);
		process.exit(1);
	}

	const content = fs.readFileSync(filePath, "utf-8");
	const data = JSON.parse(content) as CatalogListResponse | CatalogModel[];

	// Handle both array format and API response format
	if (Array.isArray(data)) {
		console.log(`  Loaded ${data.length} models from array`);
		return data;
	}

	if (data.result) {
		console.log(`  Loaded ${data.result.length} models from API response`);
		return data.result;
	}

	console.error(
		"Error: Unrecognized file format. Expected array or API response with 'result' field.",
	);
	process.exit(1);
}

async function fetchFromApi(): Promise<CatalogModel[]> {
	const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
	const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;

	if (!API_TOKEN || !ACCOUNT_ID) {
		console.error(
			"Error: CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID environment variables are required",
		);
		console.error(
			"\nAlternatively, use --file to import from a local JSON export:",
		);
		console.error(
			"  npx tsx bin/fetch-catalog-models.ts --file catalog-export.json",
		);
		process.exit(1);
	}

	const allModels: CatalogModel[] = [];
	let page = 1;
	let hasMore = true;

	console.log("Fetching models from Unified Catalog API...");

	while (hasMore) {
		const url = `https://api.staging.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/ai/catalog/models?page=${page}&per_page=${PER_PAGE}`;

		const response = await fetch(url, {
			headers: {
				Authorization: `Bearer ${API_TOKEN}`,
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			console.error(
				`API request failed: ${response.status} ${response.statusText}`,
			);
			const text = await response.text();
			console.error(text);
			console.error("\nThe catalog API may not be publicly available yet.");
			console.error(
				"Try exporting from the dashboard and using --file instead.",
			);
			process.exit(1);
		}

		const data = (await response.json()) as CatalogListResponse;

		if (!data.success) {
			console.error("API returned error:", data.errors);
			process.exit(1);
		}

		allModels.push(...data.result);

		const { count, total_count } = data.result_info!;
		console.log(
			`  Page ${page}: fetched ${count} models (${allModels.length}/${total_count})`,
		);

		hasMore = allModels.length < total_count;
		page++;
	}

	return allModels;
}

function getModelFileName(modelId: string): string {
	// model_id format: "@cf/author/model-name"
	// Extract the model name (third segment)
	const parts = modelId.split("/");
	if (parts.length >= 3) {
		return parts[2];
	}
	// Fallback: sanitize the full ID
	return modelId.replace(/[@/]/g, "-").replace(/^-+/, "");
}

function writeModels(models: CatalogModel[]): void {
	// Ensure output directory exists
	if (!fs.existsSync(OUTPUT_DIR)) {
		fs.mkdirSync(OUTPUT_DIR, { recursive: true });
	}

	// Clear existing files (except .gitkeep)
	const existingFiles = fs.readdirSync(OUTPUT_DIR);
	for (const file of existingFiles) {
		if (file !== ".gitkeep") {
			fs.unlinkSync(path.join(OUTPUT_DIR, file));
		}
	}

	// Write each model to a JSON file
	let written = 0;
	const skipped: string[] = [];

	for (const model of models) {
		// Skip private models
		if (model.private) {
			skipped.push(model.model_id);
			continue;
		}

		// Trim string fields that may have leading/trailing whitespace
		model.name = model.name.trim();
		model.description = model.description.trim();

		const fileName = getModelFileName(model.model_id);
		const filePath = path.join(OUTPUT_DIR, `${fileName}.json`);

		fs.writeFileSync(
			filePath,
			JSON.stringify(model, null, "\t") + "\n",
			"utf-8",
		);
		written++;
	}

	console.log(`\nDone!`);
	console.log(`  Written: ${written} models`);
	if (skipped.length > 0) {
		console.log(`  Skipped (private): ${skipped.length}`);
	}
	console.log(`  Output: ${OUTPUT_DIR}`);
}

async function main() {
	const args = parseArgs();

	let models: CatalogModel[];

	if (args.file) {
		models = await loadFromFile(args.file);
	} else {
		models = await fetchFromApi();
	}

	writeModels(models);
}

main().catch((err) => {
	console.error("Unexpected error:", err);
	process.exit(1);
});
