import type { Loader } from "astro/loaders";

import { DUMMY_WORKERS_AI_MODELS } from "~/util/models/dummy-workers-ai-models";
import {
	fetchCatalogModels,
	getModelEntryId,
	isPublishableCatalogModel,
	sanitizeCatalogModel,
} from "~/util/models/models-api";

/**
 * Loads the `catalog-models` collection — every model, hosted (`@cf/*`) and
 * proxied — from the Cloudflare API at build/dev time:
 *
 *   CLOUDFLARE_API_TOKEN=... CLOUDFLARE_ACCOUNT_ID=... pnpm dev
 *
 * Uses the account-scoped `/ai/catalog/models` endpoint until the public
 * unified models endpoint launches. That endpoint does not return Workers AI
 * models yet, so dummy `@cf/*` rows are appended to prototype how they render.
 */
export function catalogModelsLoader(): Loader {
	return {
		name: "catalog-models-loader",
		load: async ({ store, parseData, generateDigest, logger }) => {
			const token = process.env.CLOUDFLARE_API_TOKEN;
			const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
			if (!token || !accountId) {
				throw new Error(
					"The catalog-models collection requires CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID",
				);
			}

			const { models, failed } = await fetchCatalogModels({
				token,
				accountId,
				baseUrl: process.env.CF_API_BASE_URL,
				concurrency: 10,
			});
			for (const { modelId, reason } of failed) {
				logger.warn(`Skipped ${modelId}: ${reason}`);
			}

			const realIds = new Set(models.map((model) => model.model_id));
			const dummies = DUMMY_WORKERS_AI_MODELS.filter(
				(model) => !realIds.has(model.model_id),
			);

			store.clear();
			for (const model of [...models, ...dummies]
				.filter(isPublishableCatalogModel)
				.map(sanitizeCatalogModel)) {
				const id = getModelEntryId(model.model_id);
				const data = await parseData({ id, data: model });
				store.set({ id, data, digest: generateDigest(data) });
			}
			logger.info(
				`Loaded ${store.keys().length} models (${dummies.length} dummy Workers AI, ${failed.length} failed)`,
			);
		},
	};
}
