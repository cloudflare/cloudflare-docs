/**
 * Compares models between the catalog and legacy data sources.
 * Outputs a report showing migration progress and field coverage.
 *
 * Usage:
 *   npx tsx bin/compare-model-sources.ts
 */

import fs from "node:fs";
import path from "node:path";

interface LegacyModel {
	name: string;
	description: string;
	task: { name: string };
	properties: Array<{ property_id: string; value: unknown }>;
}

interface CatalogModel {
	model_id: string;
	name: string;
	description: string;
	task: string;
	code_snippets?: Array<{ label: string; code: string }>;
	examples?: Array<{ name: string }>;
	context_length?: number;
	pricing?: Record<string, number>;
}

const LEGACY_DIR = path.join(process.cwd(), "src/content/workers-ai-models");
const CATALOG_DIR = path.join(process.cwd(), "src/content/catalog-models");

function loadJsonFiles<T>(dir: string): Map<string, T> {
	const result = new Map<string, T>();

	if (!fs.existsSync(dir)) {
		return result;
	}

	const files = fs.readdirSync(dir).filter((f) => f.endsWith(".json"));

	for (const file of files) {
		const content = fs.readFileSync(path.join(dir, file), "utf-8");
		const data = JSON.parse(content) as T;
		const slug = file.replace(".json", "");
		result.set(slug, data);
	}

	return result;
}

function main() {
	console.log("Model Sources Comparison Report");
	console.log("================================\n");

	const legacyModels = loadJsonFiles<LegacyModel>(LEGACY_DIR);
	const catalogModels = loadJsonFiles<CatalogModel>(CATALOG_DIR);

	// Convert catalog models to slug-keyed map
	const catalogBySlug = new Map<string, CatalogModel>();
	for (const [, model] of catalogModels) {
		catalogBySlug.set(model.model_id, model);
	}

	// Convert legacy models to slug-keyed map
	const legacyBySlug = new Map<string, LegacyModel>();
	for (const [, model] of legacyModels) {
		const slug = model.name;
		legacyBySlug.set(slug, model);
	}

	const catalogSlugs = new Set(catalogBySlug.keys());
	const legacySlugs = new Set(legacyBySlug.keys());

	// Calculate sets
	const onlyInCatalog = [...catalogSlugs].filter((s) => !legacySlugs.has(s));
	const onlyInLegacy = [...legacySlugs].filter((s) => !catalogSlugs.has(s));
	const inBoth = [...catalogSlugs].filter((s) => legacySlugs.has(s));

	console.log("Summary");
	console.log("-------");
	console.log(`Total legacy models:  ${legacySlugs.size}`);
	console.log(`Total catalog models: ${catalogSlugs.size}`);
	console.log(`Models in both:       ${inBoth.length} (catalog wins)`);
	console.log(`Only in catalog:      ${onlyInCatalog.length}`);
	console.log(`Only in legacy:       ${onlyInLegacy.length}`);
	console.log();

	// Field coverage for catalog models
	let withCodeSnippets = 0;
	let withExamples = 0;
	let withContextLength = 0;
	let withPricing = 0;

	for (const [, model] of catalogBySlug) {
		if (model.code_snippets && model.code_snippets.length > 0)
			withCodeSnippets++;
		if (model.examples && model.examples.length > 0) withExamples++;
		if (model.context_length != null) withContextLength++;
		if (model.pricing && Object.keys(model.pricing).length > 0) withPricing++;
	}

	const pct = (n: number, total: number) =>
		total > 0 ? Math.round((n / total) * 100) : 0;

	console.log("Catalog Field Coverage");
	console.log("----------------------");
	console.log(
		`With code snippets:   ${withCodeSnippets}/${catalogSlugs.size} (${pct(withCodeSnippets, catalogSlugs.size)}%)`,
	);
	console.log(
		`With examples:        ${withExamples}/${catalogSlugs.size} (${pct(withExamples, catalogSlugs.size)}%)`,
	);
	console.log(
		`With context length:  ${withContextLength}/${catalogSlugs.size} (${pct(withContextLength, catalogSlugs.size)}%)`,
	);
	console.log(
		`With pricing:         ${withPricing}/${catalogSlugs.size} (${pct(withPricing, catalogSlugs.size)}%)`,
	);
	console.log();

	if (onlyInCatalog.length > 0) {
		console.log("Models only in catalog (new):");
		onlyInCatalog.forEach((s) => console.log(`  - ${s}`));
		console.log();
	}

	if (onlyInLegacy.length > 0) {
		console.log("Models only in legacy (not yet in catalog):");
		onlyInLegacy.forEach((s) => console.log(`  - ${s}`));
		console.log();
	}

	// Migration progress
	const migrated = inBoth.length + onlyInCatalog.length;
	const total = legacySlugs.size + onlyInCatalog.length;
	const progress = pct(migrated, total);

	console.log("Migration Progress");
	console.log("------------------");
	console.log(
		`${migrated}/${total} models available via catalog (${progress}%)`,
	);
}

main();
