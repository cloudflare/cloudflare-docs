/**
 * Resolves the two model collections into a single unified `ModelView`:
 *   - `workers-ai-models` (legacy) — Cloudflare-hosted. `task` is an object;
 *     numeric specs live in the `properties[]` array.
 *   - `catalog-models` (catalog) — third-party / proxied. `task` is a string;
 *     specs are top-level fields.
 *
 * Catalog rows are keyed by `model_id`, legacy rows by `name`; a catalog row
 * shadows a legacy row when `model_id === name`. Hosting is a function of the
 * data source (catalog ⇒ proxied, legacy ⇒ hosted).
 */
import { getCollection, type CollectionEntry } from "astro:content";
import { authorData } from "~/components/models/data";
import type {
  ModelBanner,
  ModelCardData,
  ModelExample,
  ModelView,
} from "./model-types";
import { getModelAuthor } from "./model-helpers";
import { CAPABILITY_PROPERTIES } from "./model-properties";

export type LegacyEntry = CollectionEntry<"workers-ai-models">;
export type CatalogEntry = CollectionEntry<"catalog-models">;

const isTrue = (v: unknown): boolean => v === true || v === "true";

/** Display name from the author table, falling back to the raw id. */
const authorDisplayName = (author: string): string =>
  authorData[author]?.name ?? author;

function buildView(args: {
  id: string;
  name: string;
  slug: string;
  displayName: string;
  dataSource: "catalog" | "legacy";
  source: number;
  hosting: "hosted" | "proxied";
  task: string;
  description: string;
  properties: Record<string, unknown>;
  propertiesList: { property_id: string; value: unknown }[];
  schema: { input: Record<string, unknown>; output: Record<string, unknown> };
  createdAt?: string;
  zdrComment?: string | null;
  modelId?: string;
  requestFormats?: string[] | null;
  examples?: ModelExample[];
  banner?: ModelBanner | null;
}): ModelView {
  const author = getModelAuthor(args.name);
  const capabilities = args.propertiesList
    .filter(
      (p) => p.property_id in CAPABILITY_PROPERTIES && p.value === "true",
    )
    .map((p) => CAPABILITY_PROPERTIES[p.property_id].label);

  return {
    id: args.id,
    name: args.name,
    slug: args.slug,
    shortName: args.name.split("/").at(-1) ?? args.name,
    displayName: args.displayName,
    author,
    authorName: authorDisplayName(author),
    hosting: args.hosting,
    dataSource: args.dataSource,
    source: args.source,
    task: args.task,
    description: args.description,
    capabilities,
    beta: isTrue(args.properties.beta),
    createdAt: args.createdAt,
    properties: args.properties,
    propertiesList: args.propertiesList,
    modelId: args.modelId,
    requestFormats: args.requestFormats ?? null,
    examples: args.examples,
    banner: args.banner ?? null,
    schema: args.schema,
    zdrComment: args.zdrComment ?? null,
  };
}

/**
 * Catalog row → `ModelView`. Expands the flat fields + metadata into the
 * `properties` map/list (context_window, max_output_tokens, terms, info,
 * async_queue, zdr, then metadata flags) in a fixed order so badges/facets
 * work uniformly across both sources.
 */
export function catalogToResolved(entry: CatalogEntry): ModelView {
  const model = entry.data as Record<string, any>;
  const properties: Record<string, unknown> = {};
  const propertiesList: { property_id: string; value: unknown }[] = [];
  const push = (property_id: string, value: unknown): void => {
    properties[property_id] = value;
    propertiesList.push({ property_id, value });
  };

  if (model.context_length != null)
    push("context_window", String(model.context_length));
  if (model.max_output_tokens != null)
    push("max_output_tokens", String(model.max_output_tokens));
  if (model.terms) push("terms", model.terms);
  if (model.external_info) push("info", model.external_info);
  if (model.supports_async) push("async_queue", "true");
  if (model.zdr === true) push("zdr", "true");

  const metadata = (model.metadata || {}) as Record<string, unknown>;
  if (metadata.lora) push("lora", "true");
  if (metadata.function_calling) push("function_calling", "true");
  if (metadata.beta) push("beta", "true");
  if (metadata.partner) push("partner", "true");
  if (metadata.realtime) push("realtime", "true");
  if (metadata.planned_deprecation_date)
    push("planned_deprecation_date", String(metadata.planned_deprecation_date));

  const schema = {
    input: (model.schema?.input ?? {}) as Record<string, unknown>,
    output: (model.schema?.output ?? {}) as Record<string, unknown>,
  };

  return buildView({
    id: entry.id,
    name: model.model_id,
    slug: model.model_id,
    displayName: model.name,
    dataSource: "catalog",
    source: 2,
    hosting: "proxied",
    task: model.task,
    description: model.description,
    properties,
    propertiesList,
    schema,
    createdAt: typeof model.created_at === "string" ? model.created_at : undefined,
    zdrComment: model.zdr_comment ?? null,
    modelId: model.model_id,
    requestFormats: (model.request_formats as string[] | undefined) ?? null,
    examples: (model.examples as ModelExample[] | undefined) ?? [],
    banner: (model.banner as ModelBanner | null | undefined) ?? null,
  });
}

/** Legacy row → `ModelView`. Flattens the `properties[]` array into a map/list. */
export function legacyToResolved(entry: LegacyEntry): ModelView {
  const d = entry.data as Record<string, any>;

  const properties: Record<string, unknown> = {};
  const propertiesList: { property_id: string; value: unknown }[] = [];
  for (const p of d.properties ?? []) {
    properties[p.property_id] = p.value;
    propertiesList.push({ property_id: p.property_id, value: p.value });
  }

  const schema = (d.schema ?? {}) as { input?: unknown; output?: unknown };

  return buildView({
    id: entry.id,
    name: d.name,
    slug: d.name,
    displayName: d.name.split("/").at(-1) ?? d.name,
    dataSource: "legacy",
    source: typeof d.source === "number" ? d.source : 1,
    hosting: "hosted",
    task: d.task.name,
    description: d.description,
    properties,
    propertiesList,
    schema: {
      input: (schema.input ?? {}) as Record<string, unknown>,
      output: (schema.output ?? {}) as Record<string, unknown>,
    },
    createdAt: typeof d.created_at === "string" ? d.created_at : undefined,
  });
}

/**
 * All models, catalog preferred over legacy. Catalog rows first, then legacy
 * rows whose `name` is not shadowed by a catalog `model_id`. Feeds `/ai/models`.
 */
export async function getResolvedModels(): Promise<ModelView[]> {
  const [catalogModels, legacyModels] = await Promise.all([
    getCollection("catalog-models"),
    getCollection("workers-ai-models"),
  ]);

  const catalogBySlug = new Map<string, ModelView>();
  for (const entry of catalogModels) {
    const resolved = catalogToResolved(entry);
    catalogBySlug.set(resolved.slug, resolved);
  }

  const resolved: ModelView[] = [...catalogBySlug.values()];
  const catalogSlugs = new Set(catalogBySlug.keys());

  for (const entry of legacyModels) {
    if (!catalogSlugs.has(entry.data.name)) {
      resolved.push(legacyToResolved(entry));
    }
  }

  return resolved;
}

/**
 * Only legacy models (Cloudflare-hosted) not shadowed by a catalog `model_id`.
 * Feeds `/workers-ai/models`.
 */
export async function getLegacyModels(): Promise<ModelView[]> {
  const [catalogModels, legacyModels] = await Promise.all([
    getCollection("catalog-models"),
    getCollection("workers-ai-models"),
  ]);

  const catalogSlugs = new Set(catalogModels.map((entry) => entry.data.model_id));

  return legacyModels
    .filter((entry) => !catalogSlugs.has(entry.data.name))
    .map(legacyToResolved);
}

/** Strip the heavy `schema` blob for the catalog index pages. */
export function toModelCardData(model: ModelView): ModelCardData {
  const { schema: _schema, ...card } = model;
  return card;
}
