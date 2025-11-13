import fs from "fs";

const MAX_RETRIES = 3;
const RETRY_DELAY = 2000; // 2 seconds

/**
 * Check if a model has a valid schema
 */
function hasValidSchema(model) {
	return model.schema &&
		   typeof model.schema === 'object' &&
		   Object.keys(model.schema).length > 0 &&
		   model.schema.input;
}

/**
 * Deep merge two objects, combining all properties
 */
function deepMerge(target, source) {
	const result = { ...target };

	for (const key in source) {
		if (source[key] && typeof source[key] === 'object' && !Array.isArray(source[key])) {
			result[key] = deepMerge(result[key] || {}, source[key]);
		} else {
			result[key] = source[key];
		}
	}

	return result;
}

async function fetchModels(retryCount = 0, accumulatedModels = new Map()) {
	try {
		console.log(`Fetching models from API... (attempt ${retryCount + 1}/${MAX_RETRIES})`);

		const res = await fetch("https://ai-cloudflare-com.pages.dev/api/models");

		if (!res.ok) {
			throw new Error(`HTTP error! status: ${res.status}`);
		}

		const data = await res.json();

		if (!data || !data.models || !Array.isArray(data.models)) {
			throw new Error("Invalid response structure");
		}

		console.log(`Received ${data.models.length} models from API`);

		// Merge all properties from this API call with accumulated data
		for (const model of data.models) {
			if (accumulatedModels.has(model.name)) {
				// Merge with existing model data
				const existing = accumulatedModels.get(model.name);
				const merged = deepMerge(existing, model);
				accumulatedModels.set(model.name, merged);
				console.log(`  Merged properties for ${model.name}`);
			} else {
				// First time seeing this model
				accumulatedModels.set(model.name, model);
			}
		}

		// Check which models are still missing valid schemas
		const modelsWithoutSchema = Array.from(accumulatedModels.values()).filter(
			model => !hasValidSchema(model)
		);

		if (modelsWithoutSchema.length > 0) {
			console.warn(`\nModels still missing valid schemas (${modelsWithoutSchema.length}/${accumulatedModels.size}):`);
			modelsWithoutSchema.forEach(model => console.warn(`  - ${model.name}`));

			// Retry if we haven't exhausted attempts
			if (retryCount < MAX_RETRIES - 1) {
				console.log(`\nRetrying in ${RETRY_DELAY/1000} seconds...`);
				await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
				return fetchModels(retryCount + 1, accumulatedModels);
			} else {
				// After max retries, fail completely - don't write anything
				throw new Error(`Failed to get valid schemas for all models after ${MAX_RETRIES} attempts`);
			}
		}

		console.log(`\n✓ All ${accumulatedModels.size} models have valid schemas!`);

		// Write all accumulated model files
		let successCount = 0;
		let errorCount = 0;

		for (const model of accumulatedModels.values()) {
			try {
				const fileName = model.name.split("/")[2];
				if (!fileName) {
					console.error(`Invalid model name format: ${model.name}`);
					errorCount++;
					continue;
				}

				fs.writeFileSync(
					`./src/content/workers-ai-models/${fileName}.json`,
					JSON.stringify(model, null, 4),
					"utf-8",
				);
				successCount++;
			} catch (err) {
				console.error(`Error writing model ${model.name}:`, err.message);
				errorCount++;
			}
		}

		console.log(`\nSuccessfully wrote ${successCount} model files`);

		if (errorCount > 0) {
			console.error(`Failed to write ${errorCount} model files`);
		}

	} catch (error) {
		console.error(`Error fetching models: ${error.message}`);

		if (retryCount < MAX_RETRIES - 1) {
			console.log(`Retrying in ${RETRY_DELAY/1000} seconds...`);
			await new Promise(resolve => setTimeout(resolve, RETRY_DELAY));
			return fetchModels(retryCount + 1);
		} else {
			console.error(`Failed after ${MAX_RETRIES} attempts`);
			process.exit(1);
		}
	}
}

// Run the script
fetchModels()
	.then(() => {
		console.log("All models fetched successfully!");
		process.exit(0);
	})
	.catch((error) => {
		console.error("Fatal error:", error);
		process.exit(1);
	});
