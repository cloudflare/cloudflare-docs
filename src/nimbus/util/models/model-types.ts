/** Client-safe model type definitions. No runtime. */

/** A single labelled code sample carried by a model example. */
export interface CodeSnippet {
  label: string;
  language?: string;
  code: string;
}

/**
 * One `examples[]` entry. The first example powers the Usage section; the rest
 * render in the Examples disclosure list.
 */
export interface ModelExample {
  name: string;
  description?: string;
  input?: unknown;
  output?: Record<string, unknown>;
  raw_response?: unknown;
  code_snippets?: CodeSnippet[];
}

/** In-page notice rendered as an Aside on the detail page. */
export interface ModelBanner {
  severity: string;
  title?: string | null;
  text: string;
  link?: { url: string; label: string } | null;
}

/** A distinct API mode for a model (e.g. sync, streaming, batch). */
export interface ApiMode {
  id: string;
  name: string;
  description?: string;
  input: Record<string, unknown>;
  output: Record<string, unknown>;
}

/** Unified model shape, resolved from either the catalog or legacy collection. */
export interface ModelView {
  /** Collection entry id (filename), e.g. `openai-tts-1` / `aura-1`. */
  id: string;
  /** Full model id, e.g. `@cf/meta/...` (legacy) or `openai/tts-1` (catalog). */
  name: string;
  /** URL slug used by `/ai/models/[...name]`. */
  slug: string;
  /** Last path segment of `name` — card title + the `/workers-ai` slug. */
  shortName: string;
  /** Human-readable name. */
  displayName: string;
  /** Author org id, e.g. `meta` / `openai`. */
  author: string;
  /** Author display name, e.g. `Meta` / `OpenAI`. */
  authorName: string;
  /** "hosted" (Cloudflare) | "proxied" (third-party). */
  hosting: "hosted" | "proxied";
  dataSource: "catalog" | "legacy";
  source: number;
  task: string;
  description: string;
  /** Derived capability labels (filter facet + badges). */
  capabilities: string[];
  beta: boolean;
  createdAt?: string;
  /** Flat property_id → value map (per-model info table). */
  properties: Record<string, unknown>;
  /** Ordered property list — badges render in this order. */
  propertiesList: { property_id: string; value: unknown }[];
  /** `model_id` (`openai/tts-1`) — drives the dashboard pricing link. Catalog-only. */
  modelId?: string;
  /** Accepted request formats (e.g. `["responses","chat-completions"]`). Catalog-only. */
  requestFormats?: string[] | null;
  /** Usage (first) + Examples list (rest). Catalog-only. */
  examples?: ModelExample[];
  /** In-page notice. Catalog-only. */
  banner?: ModelBanner | null;
  /** Combined/raw JSON Schema. Heavy — stripped from `ModelCardData`. */
  schema: { input: Record<string, unknown>; output: Record<string, unknown> };
  /** Optional ZDR note, surfaced as the ZDR badge tooltip. */
  zdrComment?: string | null;
}

/** Slim projection for the catalog index pages — drops the heavy `schema` blob. */
export type ModelCardData = Omit<ModelView, "schema">;
