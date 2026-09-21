/**
 * Synchronizes review-sensitive Workers AI model metadata from Config API.
 *
 * Existing model files are updated only for the properties in
 * TRACKED_PROPERTY_IDS. Models missing from the API response are never removed.
 * New models are hydrated from the full model-docs endpoint so their schemas and
 * examples are included in the generated pull request.
 */

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const OUTPUT_DIR =
	process.env.WORKERS_AI_MODELS_DIR ||
	path.join(process.cwd(), "src/content/workers-ai-models");
const API_BASE_URL =
	process.env.CF_API_BASE_URL || "https://api.cloudflare.com";
const MODEL_DOCS_URL =
	process.env.WORKERS_AI_MODEL_DOCS_URL ||
	"https://ai-cloudflare-com.pages.dev/api/models";
const PER_PAGE = 100;
const MAX_ATTEMPTS = 4;
const REQUEST_TIMEOUT_MS = 30_000;
const REASONING_EFFORT_ORDER = new Map(
	["none", "minimal", "low", "medium", "high", "xhigh", "max"].map(
		(effort, index) => [effort, index],
	),
);

export const TRACKED_PROPERTY_IDS = [
	"context_window",
	"max_output_tokens",
	"reasoning_effort",
] as const;

type TrackedPropertyId = (typeof TRACKED_PROPERTY_IDS)[number];

interface ModelProperty {
	property_id: string;
	value: unknown;
}

export interface ModelDocument extends Record<string, unknown> {
	name: string;
	properties?: ModelProperty[];
}

export interface SearchModel {
	name: string;
	properties: ModelProperty[];
}

export interface ExistingModel {
	fileName: string;
	model: ModelDocument;
}

export interface ModelChange {
	model: string;
	kind: "new" | "updated";
	propertyId?: TrackedPropertyId;
	before?: unknown;
	after?: unknown;
}

export interface SyncPlan {
	files: Map<string, ModelDocument>;
	changes: ModelChange[];
}

interface SearchPage {
	models: SearchModel[];
	page: number;
	perPage: number;
	totalCount?: number;
}

class NonRetryableRequestError extends Error {}

function isRecord(value: unknown): value is Record<string, unknown> {
	return typeof value === "object" && value !== null && !Array.isArray(value);
}

function parseProperties(value: unknown, modelName: string): ModelProperty[] {
	if (!Array.isArray(value)) {
		throw new Error(`Model ${modelName} does not contain a properties array`);
	}

	return value.map((property, index) => {
		if (!isRecord(property) || typeof property.property_id !== "string") {
			throw new Error(
				`Model ${modelName} has an invalid property at index ${index}`,
			);
		}
		return {
			property_id: property.property_id,
			value: property.value,
		};
	});
}

export function parseSearchPage(payload: unknown): SearchPage {
	if (!isRecord(payload) || payload.success === false) {
		throw new Error(
			"Workers AI models search returned an unsuccessful response",
		);
	}

	const result = payload.result;
	if (!Array.isArray(result)) {
		throw new Error("Workers AI models search did not return a result array");
	}

	const models = result.map((model, index) => {
		if (!isRecord(model) || typeof model.name !== "string") {
			throw new Error(
				`Workers AI models search returned an invalid model at index ${index}`,
			);
		}
		return {
			name: model.name,
			properties: parseProperties(model.properties, model.name),
		};
	});

	const resultInfo = isRecord(payload.result_info) ? payload.result_info : {};
	const page =
		typeof resultInfo.page === "number" && resultInfo.page > 0
			? resultInfo.page
			: 1;
	const perPage =
		typeof resultInfo.per_page === "number" && resultInfo.per_page > 0
			? resultInfo.per_page
			: PER_PAGE;
	const totalCount =
		typeof resultInfo.total_count === "number" && resultInfo.total_count >= 0
			? resultInfo.total_count
			: undefined;

	return { models, page, perPage, totalCount };
}

export function parseHydratedModels(payload: unknown): ModelDocument[] {
	if (!isRecord(payload) || !Array.isArray(payload.models)) {
		throw new Error("Full model-docs endpoint did not return a models array");
	}
	if (payload.models.length === 0) {
		throw new Error("Full model-docs endpoint returned no models");
	}

	return payload.models.map((model, index) => {
		if (!isRecord(model) || typeof model.name !== "string") {
			throw new Error(
				`Full model-docs endpoint returned an invalid model at index ${index}`,
			);
		}
		return model as ModelDocument;
	});
}

function canonicalize(value: unknown): unknown {
	if (Array.isArray(value)) return value.map(canonicalize);
	if (!isRecord(value)) return value;

	return Object.fromEntries(
		Object.keys(value)
			.sort()
			.map((key) => [key, canonicalize(value[key])]),
	);
}

function valuesEqual(left: unknown, right: unknown): boolean {
	return (
		JSON.stringify(canonicalize(left)) === JSON.stringify(canonicalize(right))
	);
}

function isUsableTrackedValue(
	propertyId: TrackedPropertyId,
	value: unknown,
): boolean {
	if (propertyId === "reasoning_effort") {
		return isRecord(value) && Object.keys(value).length > 0;
	}

	const numericValue =
		typeof value === "number"
			? value
			: typeof value === "string" && value.trim() !== ""
				? Number(value)
				: Number.NaN;
	return Number.isFinite(numericValue) && numericValue > 0;
}

function normalizeTrackedValue(
	propertyId: TrackedPropertyId,
	value: unknown,
): unknown {
	const normalized = canonicalize(value);
	if (propertyId !== "reasoning_effort" || !isRecord(normalized)) {
		return normalized;
	}

	const supportedEfforts = normalized.supported_efforts;
	if (
		!Array.isArray(supportedEfforts) ||
		!supportedEfforts.every((effort) => typeof effort === "string")
	) {
		return normalized;
	}

	return {
		...normalized,
		supported_efforts: [...supportedEfforts].sort((left, right) => {
			const leftRank =
				REASONING_EFFORT_ORDER.get(left) ?? Number.MAX_SAFE_INTEGER;
			const rightRank =
				REASONING_EFFORT_ORDER.get(right) ?? Number.MAX_SAFE_INTEGER;
			return leftRank === rightRank
				? left.localeCompare(right)
				: leftRank - rightRank;
		}),
	};
}

function trackedProperties(model: { properties?: ModelProperty[] }) {
	const tracked = new Map<TrackedPropertyId, unknown>();
	for (const property of model.properties ?? []) {
		const propertyId = property.property_id as TrackedPropertyId;
		if (
			TRACKED_PROPERTY_IDS.includes(propertyId) &&
			isUsableTrackedValue(propertyId, property.value)
		) {
			tracked.set(
				propertyId,
				normalizeTrackedValue(propertyId, property.value),
			);
		}
	}
	return tracked;
}

function applyTrackedProperties(
	document: ModelDocument,
	searchModel: SearchModel,
): { model: ModelDocument; changes: ModelChange[] } {
	const source = trackedProperties(searchModel);
	const properties = (document.properties ?? []).map((property) => ({
		...property,
	}));
	const changes: ModelChange[] = [];

	for (const propertyId of TRACKED_PROPERTY_IDS) {
		if (!source.has(propertyId)) continue;

		const nextValue = source.get(propertyId);
		const existingIndex = properties.findIndex(
			(property) => property.property_id === propertyId,
		);
		const previousValue =
			existingIndex === -1 ? undefined : properties[existingIndex].value;
		if (existingIndex !== -1 && valuesEqual(previousValue, nextValue)) continue;

		const property = {
			property_id: propertyId,
			value: canonicalize(nextValue),
		};
		if (existingIndex === -1) properties.push(property);
		else properties[existingIndex] = property;

		changes.push({
			model: document.name,
			kind: "updated",
			propertyId,
			before: previousValue,
			after: nextValue,
		});
	}

	return {
		model: changes.length > 0 ? { ...document, properties } : document,
		changes,
	};
}

function uniqueByName<T extends { name: string }>(models: T[], source: string) {
	const result = new Map<string, T>();
	for (const model of models) {
		if (result.has(model.name)) {
			throw new Error(`${source} returned duplicate model ${model.name}`);
		}
		result.set(model.name, model);
	}
	return result;
}

function modelFileName(modelName: string): string {
	const slug = modelName.split("/").at(-1);
	if (!slug || slug === "." || slug === "..") {
		throw new Error(`Cannot derive a file name from model ID ${modelName}`);
	}
	return `${slug}.json`;
}

export function buildSyncPlan(
	existingModels: Map<string, ExistingModel>,
	searchModels: SearchModel[],
	hydratedModels: ModelDocument[],
): SyncPlan {
	if (searchModels.length === 0) {
		throw new Error("Workers AI models search returned no models");
	}

	const searchByName = uniqueByName(searchModels, "Workers AI models search");
	const hydratedByName = uniqueByName(
		hydratedModels,
		"Full model-docs endpoint",
	);
	const existingFileNames = new Map(
		[...existingModels.entries()].map(([name, entry]) => [
			entry.fileName,
			name,
		]),
	);
	const files = new Map<string, ModelDocument>();
	const changes: ModelChange[] = [];

	for (const [modelName, searchModel] of searchByName) {
		const existing = existingModels.get(modelName);
		if (existing) {
			const applied = applyTrackedProperties(existing.model, searchModel);
			if (applied.changes.length > 0) {
				files.set(existing.fileName, applied.model);
				changes.push(...applied.changes);
			}
			continue;
		}

		const hydrated = hydratedByName.get(modelName);
		if (!hydrated) {
			throw new Error(
				`New model ${modelName} is not yet available from the full model-docs endpoint`,
			);
		}

		const fileName = modelFileName(modelName);
		const conflictingModel = existingFileNames.get(fileName);
		if (conflictingModel && conflictingModel !== modelName) {
			throw new Error(
				`New model ${modelName} conflicts with ${conflictingModel} at ${fileName}`,
			);
		}

		const applied = applyTrackedProperties(hydrated, searchModel);
		files.set(fileName, applied.model);
		changes.push({ model: modelName, kind: "new" });
	}

	return { files, changes };
}

function displayValue(value: unknown): string {
	if (value === undefined) return "not set";
	const rendered = JSON.stringify(canonicalize(value));
	return rendered.length <= 500
		? `\`${rendered}\``
		: "a large structured value";
}

export function renderPullRequestBody(changes: ModelChange[]): string {
	const newModels = changes.filter((change) => change.kind === "new");
	const updates = changes.filter((change) => change.kind === "updated");
	const lines = [
		"This automated pull request synchronizes review-sensitive Workers AI model metadata from `/ai/models/search`.",
		"",
		"Models absent from the API response are preserved and must be removed manually.",
	];

	if (changes.length === 0) {
		return [...lines, "", "No model metadata changes were detected."].join(
			"\n",
		);
	}

	if (newModels.length > 0) {
		lines.push("", "## New models", "");
		for (const change of newModels) lines.push(`- \`${change.model}\``);
	}

	if (updates.length > 0) {
		lines.push("", "## Metadata changes", "");
		for (const change of updates) {
			lines.push(
				`- \`${change.model}\` — \`${change.propertyId}\`: ${displayValue(change.before)} → ${displayValue(change.after)}`,
			);
		}
	}

	lines.push(
		"",
		"## Validation",
		"",
		"- Generated from a non-empty, validated models-search response.",
		"- `pnpm run check` passed before this pull request was created.",
	);
	return lines.join("\n");
}

async function fetchJson(
	url: URL,
	headers: HeadersInit = {},
): Promise<unknown> {
	let lastError: unknown;
	for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
		try {
			const response = await fetch(url, {
				headers,
				signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
			});
			if (response.ok) return response.json();

			const message = `${response.status} ${response.statusText}`;
			if (response.status !== 429 && response.status < 500) {
				throw new NonRetryableRequestError(
					`Request to ${url.origin} failed: ${message}`,
				);
			}
			lastError = new Error(`Request to ${url.origin} failed: ${message}`);
		} catch (error) {
			if (error instanceof NonRetryableRequestError) throw error;
			lastError = error;
		}

		if (attempt < MAX_ATTEMPTS) {
			await new Promise((resolve) =>
				setTimeout(resolve, 500 * 2 ** (attempt - 1)),
			);
		}
	}

	throw lastError;
}

async function fetchSearchModels(): Promise<SearchModel[]> {
	const overrideUrl = process.env.WORKERS_AI_MODELS_SEARCH_URL;
	const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
	const apiToken = process.env.CLOUDFLARE_API_TOKEN;
	if (!overrideUrl && (!accountId || !apiToken)) {
		throw new Error(
			"CLOUDFLARE_ACCOUNT_ID and CLOUDFLARE_API_TOKEN are required",
		);
	}

	const baseUrl =
		overrideUrl ||
		`${API_BASE_URL}/client/v4/accounts/${encodeURIComponent(accountId!)}/ai/models/search`;
	const headers: Record<string, string> = apiToken
		? { Authorization: `Bearer ${apiToken}` }
		: {};
	const models: SearchModel[] = [];
	const seenModelNames = new Set<string>();
	let page = 1;

	while (true) {
		const url = new URL(baseUrl);
		url.searchParams.set("per_page", String(PER_PAGE));
		url.searchParams.set("page", String(page));
		const parsed = parseSearchPage(await fetchJson(url, headers));
		for (const model of parsed.models) {
			if (seenModelNames.has(model.name)) {
				throw new Error(
					`Workers AI models search repeated ${model.name} on page ${page}`,
				);
			}
			seenModelNames.add(model.name);
		}
		models.push(...parsed.models);

		if (
			parsed.models.length === 0 ||
			parsed.models.length < parsed.perPage ||
			(parsed.totalCount !== undefined && models.length >= parsed.totalCount)
		) {
			break;
		}
		page += 1;
	}

	uniqueByName(models, "Workers AI models search");
	if (models.length === 0) {
		throw new Error("Workers AI models search returned no models");
	}
	return models;
}

async function fetchHydratedModels(): Promise<ModelDocument[]> {
	return parseHydratedModels(await fetchJson(new URL(MODEL_DOCS_URL)));
}

function readExistingModels(outputDir: string): Map<string, ExistingModel> {
	const models = new Map<string, ExistingModel>();
	for (const fileName of fs
		.readdirSync(outputDir)
		.filter((file) => file.endsWith(".json"))) {
		const filePath = path.join(outputDir, fileName);
		const model = JSON.parse(
			fs.readFileSync(filePath, "utf8"),
		) as ModelDocument;
		if (typeof model.name !== "string") {
			throw new Error(`${fileName} does not contain a model name`);
		}
		if (models.has(model.name)) {
			throw new Error(
				`Existing model files contain duplicate model ${model.name}`,
			);
		}
		models.set(model.name, { fileName, model });
	}
	return models;
}

function parseSummaryFile(): string | undefined {
	const index = process.argv.indexOf("--summary-file");
	return index === -1 ? undefined : process.argv[index + 1];
}

async function main() {
	const existingModels = readExistingModels(OUTPUT_DIR);
	const searchModels = await fetchSearchModels();
	const hasNewModels = searchModels.some(
		(model) => !existingModels.has(model.name),
	);
	const hydratedModels = hasNewModels ? await fetchHydratedModels() : [];
	const plan = buildSyncPlan(existingModels, searchModels, hydratedModels);

	for (const [fileName, model] of plan.files) {
		fs.writeFileSync(
			path.join(OUTPUT_DIR, fileName),
			`${JSON.stringify(model, null, 4)}\n`,
			"utf8",
		);
	}

	const body = renderPullRequestBody(plan.changes);
	const summaryFile = parseSummaryFile();
	if (summaryFile) fs.writeFileSync(summaryFile, `${body}\n`, "utf8");
	if (process.env.GITHUB_STEP_SUMMARY) {
		fs.appendFileSync(process.env.GITHUB_STEP_SUMMARY, `${body}\n`, "utf8");
	}
	console.log(
		plan.changes.length === 0
			? "Workers AI model metadata is already current."
			: `Updated ${plan.files.size} model file(s) with ${plan.changes.length} reviewed change(s).`,
	);
}

const isMain =
	process.argv[1] !== undefined &&
	path.resolve(process.argv[1]) === fileURLToPath(import.meta.url);
if (isMain) {
	main().catch((error) => {
		console.error(error instanceof Error ? error.message : error);
		process.exitCode = 1;
	});
}
