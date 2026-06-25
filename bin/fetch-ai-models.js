import fs from "node:fs";
import path from "node:path";

const OUTPUT_DIR = path.join(process.cwd(), "src/content/workers-ai-models");
const API_URL = "https://ai-cloudflare-com.pages.dev/api/models";

// The upstream API fans out per-model schema fetches on cache miss and can
// return a transient 502 if any of those flake. Retry the whole request a
// handful of times before giving up so a momentary blip doesn't fail the
// whole sync.
const MAX_ATTEMPTS = 4;
const BASE_DELAY_MS = 500;
const REQUEST_TIMEOUT_MS = 30_000;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

// Marker so the loop can tell "upstream returned 4xx we can't recover from"
// apart from a transient network error.
class NonRetryableHttpError extends Error {
	constructor(message) {
		super(message);
		this.name = "NonRetryableHttpError";
	}
}

async function fetchModels() {
	let lastError;
	for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
		try {
			const response = await fetch(API_URL, {
				signal: AbortSignal.timeout(REQUEST_TIMEOUT_MS),
			});
			if (response.ok) return await response.json();
			const message = `API returned HTTP ${response.status} ${response.statusText}.`;
			// 429 + 5xx are worth retrying; other 4xx (auth, not found) won't get better.
			const retryable = response.status === 429 || response.status >= 500;
			if (!retryable) throw new NonRetryableHttpError(message);
			lastError = new Error(message);
		} catch (err) {
			if (err instanceof NonRetryableHttpError) throw err;
			lastError = err;
		}
		if (attempt === MAX_ATTEMPTS) throw lastError;
		// Exponential backoff with ±25% jitter so retries don't pile up.
		const base = BASE_DELAY_MS * 2 ** (attempt - 1);
		const jitter = base * (Math.random() * 0.5 - 0.25);
		const wait = Math.round(base + jitter);
		console.warn(
			`fetch-ai-models: attempt ${attempt} failed (${lastError.message}); retrying in ${wait}ms`,
		);
		await sleep(wait);
	}
}

let data;
try {
	data = await fetchModels();
} catch (err) {
	// Don't fail the build over a transient upstream blip. Leave existing
	// JSON files in place so docs continue to render the last known good
	// catalog; the next successful run will sync new/removed models.
	const message = err.message.endsWith(".") ? err.message : `${err.message}.`;
	console.error(`fetch-ai-models: ${message} Keeping existing model files.`);
	process.exit(0);
}

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
