/**
 * Catalog facet construction — build-time, so the vanilla catalog can render
 * the `<details>` facet dropdowns and stamp each card's `data-facet-*`.
 */
import type { ModelCardData } from "./model-types";
import { getLabelsByCategory } from "./model-properties";

export interface FacetOption {
  /** Value written to the URL query string + the checkbox `value`. */
  value: string;
  /** Human-readable label shown in the dropdown. */
  label: string;
  /**
   * Value compared against a card's `data-facet-*` stamp. Equals `value`
   * everywhere except Authors, where the URL value is the author id but cards
   * are stamped with the display name (so one "Meta" option matches both
   * `meta` and `facebook` cards).
   */
  match: string;
}

export interface FacetGroup {
  /** Query-param key + card data-attribute suffix (`tasks`/`capabilities`/`authors`/`providers`). */
  key: string;
  label: string;
  options: FacetOption[];
}

/**
 * Model names pinned to the top of the catalog. Pinned models sort first (by
 * array index) in both directions; the rest sort by `created_at`. No-op if none
 * are present.
 */
export const pinnedModelNames = [
  "@cf/moonshotai/kimi-k2.7-code",
  "@cf/zai-org/glm-4.7-flash",
  "@cf/openai/gpt-oss-120b",
  "@cf/meta/llama-4-scout-17b-16e-instruct",
];

const providerSlug = (model: ModelCardData): string =>
  model.hosting === "proxied" ? "third-party" : "cloudflare-hosted";

/**
 * A model's value(s) for a facet key — used to stamp card `data-facet-*`.
 * Authors are stamped with the display name; providers with the slug.
 */
export function facetValues(model: ModelCardData, key: string): string[] {
  switch (key) {
    case "tasks":
      return [model.task];
    case "capabilities":
      return model.capabilities;
    case "authors":
      return [model.authorName];
    case "providers":
      return [providerSlug(model)];
    default:
      return [];
  }
}

// Fixed 2-item providers list (value = slug, label = badge text).
const PROVIDER_OPTIONS: FacetOption[] = [
  { value: "cloudflare-hosted", label: "Cloudflare-hosted", match: "cloudflare-hosted" },
  { value: "third-party", label: "Third-party", match: "third-party" },
];

export function getFacets(models: ModelCardData[]): FacetGroup[] {
  // Tasks — unique names, code-unit order (space sorts before hyphen).
  const taskOptions: FacetOption[] = [...new Set(models.map((m) => m.task))]
    .sort()
    .map((t) => ({ value: t, label: t, match: t }));

  // Capabilities — category-grouped (model then platform), first-seen order.
  const capOptions: FacetOption[] = [
    ...getLabelsByCategory(models, "model"),
    ...getLabelsByCategory(models, "platform"),
  ].map((c) => ({ value: c, label: c, match: c }));

  // Authors — value = id, label/match = display name; deduped + sorted by name.
  const idByName = new Map<string, string>();
  for (const m of models) idByName.set(m.authorName, m.author);
  const authorOptions: FacetOption[] = [...idByName.entries()]
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([name, id]) => ({ value: id, label: name, match: name }));

  // Providers facet only appears when the slice spans more than one hosting value.
  const showProviders = new Set(models.map((m) => m.hosting)).size > 1;

  return [
    { key: "tasks", label: "Task Types", options: taskOptions },
    { key: "capabilities", label: "Capabilities", options: capOptions },
    ...(showProviders
      ? [{ key: "providers", label: "Providers", options: PROVIDER_OPTIONS }]
      : []),
    { key: "authors", label: "Authors", options: authorOptions },
  ].filter((g) => g.options.length > 0);
}
