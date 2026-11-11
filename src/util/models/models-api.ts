export function hasMoreCatalogModels(
	modelsSeen: number,
	totalCount: number,
	pageSize: number,
): boolean {
	return pageSize > 0 && modelsSeen < totalCount;
}

export async function mapConcurrentOrdered<T, R>(
	values: readonly T[],
	concurrency: number,
	mapper: (value: T, index: number) => Promise<R>,
	onComplete?: (completed: number) => void,
): Promise<R[]> {
	if (!Number.isInteger(concurrency) || concurrency < 1)
		throw new RangeError("concurrency must be a positive integer");
	const results = new Array<R>(values.length);
	let nextIndex = 0;
	let completed = 0;
	let failed = false;
	let firstError: unknown;

	async function run(): Promise<void> {
		while (!failed && nextIndex < values.length) {
			const index = nextIndex++;
			try {
				results[index] = await mapper(values[index], index);
				onComplete?.(++completed);
			} catch (error) {
				if (!failed) firstError = error;
				failed = true;
			}
		}
	}

	await Promise.all(
		Array.from({ length: Math.min(concurrency, values.length) }, run),
	);
	if (failed) throw firstError;
	return results;
}

/**
 * Unified Catalog row as returned by `/accounts/{id}/ai/catalog/models[/{id}]`.
 * The endpoint is not in the public OpenAPI spec, so this is the contract we
 * rely on rather than a generated type.
 */
export type CatalogModel = {
	model_id: string;
	// Being removed from the API in favor of `model_providers`.
	provider_id?: string | null;
	name: string;
	description: string;
	task: string;
	tags: string[];
	context_length: number | null;
	max_output_tokens: number | null;
	supports_async: boolean;
	// Optional because older catalog API responses omit the field entirely.
	zdr?: boolean;
	zdr_comment?: string | null;
	// In-page notice surfaced on the model detail page.
	banner?: {
		title?: string;
		text: string;
		severity: string;
		dismissible?: boolean;
		link?: { url: string; label: string };
	} | null;
	// Editor-curated in the CMS: consumers list pinned models first.
	pinned?: boolean;
	// Request-format identifiers the model accepts at the API layer.
	request_formats?: string[] | null;
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
	pricing?: Record<string, unknown>;
	// Provider information with priority ordering. Optional because older
	// catalog API responses omit the field entirely.
	model_providers?: Array<{
		provider: string;
		ordinal: number;
		pricing: Record<string, unknown> | null;
	}> | null;
};

export function isDeprecatedCatalogModel(model: CatalogModel): boolean {
	const value = model.metadata?.planned_deprecation_date;
	if (typeof value !== "string") return false;
	const timestamp = new Date(value).getTime();
	return !Number.isNaN(timestamp) && Date.now() > timestamp;
}

/** Docs publish only public, non-deprecated catalog models. */
export function isPublishableCatalogModel(model: CatalogModel): boolean {
	return !model.private && !isDeprecatedCatalogModel(model);
}

/**
 * Pre-signed URL query parameters that carry credentials or signatures.
 * Catalog responses sometimes embed pre-signed delivery URLs (e.g. VolcEngine
 * TOS, AWS S3, GCS, Runway CloudFront with `_jwt`) in `raw_response` fields.
 * They must never be rendered into pages, so we strip the entire query string
 * when one of these parameters is present.
 */
const CREDENTIAL_QUERY_PARAMS = [
	"X-Tos-Credential",
	"X-Tos-Signature",
	"X-Amz-Credential",
	"X-Amz-Signature",
	"X-Amz-Security-Token",
	"X-Goog-Credential",
	"X-Goog-Signature",
	"Signature",
	"_jwt",
];

const CREDENTIAL_QUERY_PATTERN = new RegExp(
	`[?&](${CREDENTIAL_QUERY_PARAMS.join("|")})=`,
	"i",
);

export function redactCredentialUrls<T>(value: T): T {
	if (typeof value === "string") {
		if (value.startsWith("http") && CREDENTIAL_QUERY_PATTERN.test(value)) {
			const queryIndex = value.indexOf("?");
			return (queryIndex === -1 ? value : value.slice(0, queryIndex)) as T;
		}
		return value;
	}
	if (Array.isArray(value)) {
		return value.map((item) => redactCredentialUrls(item)) as T;
	}
	if (value !== null && typeof value === "object") {
		const out: Record<string, unknown> = {};
		for (const [k, v] of Object.entries(value as Record<string, unknown>)) {
			out[k] = redactCredentialUrls(v);
		}
		return out as T;
	}
	return value;
}

/** Trims display strings and strips credentials before a row is stored. */
export function sanitizeCatalogModel(model: CatalogModel): CatalogModel {
	return redactCredentialUrls({
		...model,
		name: model.name.trim(),
		description: model.description.trim(),
	});
}

/**
 * Collection entry id for a model (e.g. `openai/tts-1` → `openai-tts-1`).
 * Pages are routed by `model_id`, not this id; it only needs to be stable
 * and unique.
 */
export function getModelEntryId(modelId: string): string {
	// model_id format: "@cf/author/model-name"
	// Extract the model name (third segment)
	const parts = modelId.split("/");
	if (parts.length >= 3) {
		return parts[2];
	}
	// Fallback: sanitize the full ID
	return modelId.replace(/[@/]/g, "-").replace(/^-+/, "");
}

type ApiFailure = { modelId: string; reason: string };

type Envelope<T> = {
	success: boolean;
	result: T;
	result_info?: { total_count: number };
	errors?: Array<{ message: string }>;
};

/**
 * Reads every page of a paginated Cloudflare API list. Stops on an empty page
 * as well as on `total_count`, so an overstated `total_count` cannot cause
 * an endless loop of empty requests.
 */
async function fetchAllPages<T>(
	url: string,
	headers: Record<string, string>,
): Promise<T[]> {
	const rows: T[] = [];
	let hasMore = true;
	for (let page = 1; hasMore; page++) {
		const response = await fetch(`${url}?page=${page}&per_page=100`, {
			headers,
		});
		if (!response.ok) {
			throw new Error(
				`${url} page ${page} failed: ${response.status} ${await response.text()}`,
			);
		}
		const data = (await response.json()) as Envelope<T[]>;
		if (!data.success || !data.result_info) {
			throw new Error(
				`${url} page ${page} returned an error: ${JSON.stringify(data.errors)}`,
			);
		}
		rows.push(...data.result);
		hasMore = hasMoreCatalogModels(
			rows.length,
			data.result_info.total_count,
			data.result.length,
		);
	}
	return rows;
}

/**
 * Fetches one follow-up resource per model. Failures are collected rather
 * than thrown so one bad model does not hide the rest of the catalog.
 */
async function fetchPerModel<T>(
	modelIds: string[],
	concurrency: number,
	fetchOne: (modelId: string) => Promise<Response>,
): Promise<{ results: Map<string, T>; failed: ApiFailure[] }> {
	const results = new Map<string, T>();
	const failed: ApiFailure[] = [];
	await mapConcurrentOrdered(modelIds, concurrency, async (modelId) => {
		try {
			const response = await fetchOne(modelId);
			if (!response.ok) {
				failed.push({ modelId, reason: `HTTP ${response.status}` });
				return;
			}
			const data = (await response.json()) as Envelope<T>;
			if (!data.success) {
				failed.push({ modelId, reason: JSON.stringify(data.errors) });
				return;
			}
			results.set(modelId, data.result);
		} catch (error) {
			failed.push({ modelId, reason: String(error) });
		}
	});
	return { results, failed };
}

type ApiOptions = {
	accountId: string;
	token: string;
	baseUrl?: string;
	concurrency?: number;
};

const accountAiUrl = (options: ApiOptions): string =>
	`${options.baseUrl ?? "https://api.cloudflare.com"}/client/v4/accounts/${options.accountId}/ai`;

/** A model author or serving provider from `/ai/catalog/providers`. */
export type CatalogProvider = {
	id: string;
	name: string;
	aliases?: string[];
	website_url?: string | null;
	description?: string | null;
	icons?: Record<string, string | null>;
};

/** Every provider the catalog CMS knows, with display names and icons. */
export async function fetchCatalogProviders(
	options: ApiOptions,
): Promise<CatalogProvider[]> {
	return fetchAllPages<CatalogProvider>(
		`${accountAiUrl(options)}/catalog/providers`,
		{ Authorization: `Bearer ${options.token}` },
	);
}

/**
 * Fetches every public catalog (proxied) model with full details. The list
 * endpoint omits `schema`, so each model needs a second detail request.
 */
export async function fetchCatalogModels(
	options: ApiOptions,
): Promise<{ models: CatalogModel[]; failed: ApiFailure[] }> {
	const url = `${accountAiUrl(options)}/catalog/models`;
	const headers = { Authorization: `Bearer ${options.token}` };

	const listed = await fetchAllPages<CatalogModel>(url, headers);
	const modelIds = listed
		.filter((model) => !model.private)
		.map((model) => model.model_id);
	const { results, failed } = await fetchPerModel<CatalogModel>(
		modelIds,
		options.concurrency ?? 5,
		(modelId) => fetch(`${url}/${encodeURIComponent(modelId)}`, { headers }),
	);
	return {
		models: modelIds.flatMap((id) => results.get(id) ?? []),
		failed,
	};
}
