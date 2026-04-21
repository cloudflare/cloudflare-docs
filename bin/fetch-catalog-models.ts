/**
 * Imports model data from the Unified Catalog and saves as JSON files.
 *
 * Usage:
 *
 *   Option 1: Import from a local JSON file (exported from dashboard)
 *     npx tsx bin/fetch-catalog-models.ts --file catalog-export.json
 *
 *   Option 2: Fetch from API
 *     CLOUDFLARE_API_TOKEN=xxx CLOUDFLARE_ACCOUNT_ID=yyy npx tsx bin/fetch-catalog-models.ts
 *
 *   The API fetch uses two passes:
 *     1. Paginated list endpoint to get all model IDs
 *     2. Individual detail endpoint for each model (has full examples, schemas, code snippets)
 *
 *   Set CF_API_BASE_URL to override the API base (defaults to https://api.cloudflare.com).
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

interface CatalogDetailResponse {
	success: boolean;
	result: CatalogModel;
	errors?: Array<{ message: string }>;
}

const OUTPUT_DIR = path.join(process.cwd(), "src/content/catalog-models");
const API_BASE_URL =
	process.env.CF_API_BASE_URL || "https://api.cloudflare.com";
const PER_PAGE = 100;
const CONCURRENCY = 5;

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
	let models: CatalogModel[];
	if (Array.isArray(data)) {
		models = data;
	} else if (data.result) {
		models = data.result;
	} else {
		console.error(
			"Error: Unrecognized file format. Expected array or API response with 'result' field.",
		);
		process.exit(1);
	}

	const publicModels = models.filter((m) => !m.private);
	const skipped = models.length - publicModels.length;
	console.log(
		`  Loaded ${models.length} models${skipped > 0 ? ` (${skipped} private skipped)` : ""}`,
	);
	return publicModels;
}

function getApiHeaders(token: string): Record<string, string> {
	return {
		Authorization: `Bearer ${token}`,
		"Content-Type": "application/json",
	};
}

async function fetchModelList(
	accountId: string,
	token: string,
): Promise<string[]> {
	const modelIds: string[] = [];
	let page = 1;
	let hasMore = true;

	console.log("Fetching model list from Unified Catalog API...");
	console.log(`  Base URL: ${API_BASE_URL}`);

	while (hasMore) {
		const url = `${API_BASE_URL}/client/v4/accounts/${accountId}/ai/catalog/models?page=${page}&per_page=${PER_PAGE}`;

		const response = await fetch(url, {
			headers: getApiHeaders(token),
		});

		if (!response.ok) {
			console.error(
				`API request failed: ${response.status} ${response.statusText}`,
			);
			const text = await response.text();
			console.error(text);
			process.exit(1);
		}

		const data = (await response.json()) as CatalogListResponse;

		if (!data.success) {
			console.error("API returned error:", data.errors);
			process.exit(1);
		}

		let skippedPrivate = 0;
		for (const model of data.result) {
			if (model.private) {
				skippedPrivate++;
				continue;
			}
			modelIds.push(model.model_id);
		}

		const { count, total_count } = data.result_info!;
		const privateNote =
			skippedPrivate > 0 ? ` (${skippedPrivate} private skipped)` : "";
		console.log(
			`  Page ${page}: ${count} models (${modelIds.length}/${total_count})${privateNote}`,
		);

		hasMore = modelIds.length < total_count;
		page++;
	}

	return modelIds;
}

async function fetchModelDetail(
	accountId: string,
	token: string,
	modelId: string,
): Promise<CatalogModel | null> {
	const encoded = encodeURIComponent(modelId);
	const url = `${API_BASE_URL}/client/v4/accounts/${accountId}/ai/catalog/models/${encoded}`;

	const response = await fetch(url, {
		headers: getApiHeaders(token),
	});

	if (!response.ok) {
		console.error(`  Failed to fetch ${modelId}: ${response.status}`);
		return null;
	}

	const data = (await response.json()) as CatalogDetailResponse;

	if (!data.success) {
		console.error(`  Error fetching ${modelId}:`, data.errors);
		return null;
	}

	return data.result;
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

	// Pass 1: get all model IDs from the list endpoint
	const modelIds = await fetchModelList(ACCOUNT_ID, API_TOKEN);
	console.log(
		`\nFetching ${modelIds.length} model details (concurrency: ${CONCURRENCY})...`,
	);

	// Pass 2: fetch full details for each model
	const models: CatalogModel[] = [];
	const failed: string[] = [];

	for (let i = 0; i < modelIds.length; i += CONCURRENCY) {
		const batch = modelIds.slice(i, i + CONCURRENCY);
		const results = await Promise.all(
			batch.map((id) => fetchModelDetail(ACCOUNT_ID, API_TOKEN, id)),
		);

		for (let j = 0; j < results.length; j++) {
			const result = results[j];
			if (result) {
				models.push(result);
			} else {
				failed.push(batch[j]);
			}
		}

		const fetched = Math.min(i + CONCURRENCY, modelIds.length);
		process.stdout.write(`\r  ${fetched}/${modelIds.length} models fetched`);
	}

	console.log();

	if (failed.length > 0) {
		console.log(`  Failed: ${failed.length} models`);
		for (const id of failed) {
			console.log(`    - ${id}`);
		}
	}

	return models;
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
