import type { Loader } from "astro/loaders";

import {
	fetchCatalogModels,
	fetchCatalogProviders,
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
 * unified models endpoint launches. Workers AI (`@cf/*`) models appear once
 * the catalog returns them.
 */
function apiOptions() {
	const token = process.env.CLOUDFLARE_API_TOKEN;
	const accountId = process.env.CLOUDFLARE_ACCOUNT_ID;
	if (!token || !accountId) {
		throw new Error(
			"The model collections require CLOUDFLARE_API_TOKEN and CLOUDFLARE_ACCOUNT_ID",
		);
	}
	return {
		token,
		accountId,
		baseUrl: process.env.CF_API_BASE_URL,
		concurrency: 10,
	};
}

/** Providers (authors and serving providers) managed in the catalog CMS. */
export function catalogProvidersLoader(): Loader {
	return {
		name: "catalog-providers-loader",
		load: async ({ store, parseData, generateDigest, logger }) => {
			const providers = await fetchCatalogProviders(apiOptions());
			store.clear();
			for (const provider of providers) {
				const data = await parseData({ id: provider.id, data: provider });
				store.set({ id: provider.id, data, digest: generateDigest(data) });
			}
			logger.info(`Loaded ${store.keys().length} providers`);
		},
	};
}

export function catalogModelsLoader(): Loader {
	return {
		name: "catalog-models-loader",
		load: async ({ store, parseData, generateDigest, logger }) => {
			const { models, failed } = await fetchCatalogModels(apiOptions());
			for (const { modelId, reason } of failed) {
				logger.warn(`Skipped ${modelId}: ${reason}`);
			}

			store.clear();
			for (const model of models
				.filter(isPublishableCatalogModel)
				.map(sanitizeCatalogModel)) {
				const id = getModelEntryId(model.model_id);
				const data = await parseData({ id, data: model });
				store.set({ id, data, digest: generateDigest(data) });
			}
			logger.info(
				`Loaded ${store.keys().length} models (${failed.length} failed)`,
			);
		},
	};
}
