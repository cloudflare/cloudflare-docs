import { defineCollection, reference, z } from "astro:content";
import { glob } from "astro/loaders";
import { docsCollection, partialsCollection } from "nimbus-docs/content";
import { warpReleasesSchema } from "~/schemas/warp-releases";
import { compatibilityFlagsSchema } from "~/schemas/compatibility-flags";
import { fieldsSchema } from "~/schemas/fields";
// Remote (middlecache) data collections — no local content files exist, so we
// reuse the shared collection configs in place (which carry the middlecache
// loader + schema) rather than duplicating the fetcher on the Nimbus side.
import { productAvailabilityCollectionConfig } from "~/content/collections/product-availability";
import { granularControlApplicationsCollectionConfig } from "~/content/collections/granular-control-applications";

// Extend the default docs schema with the CF-specific frontmatter keys the
// content uses. The schema is permissive — these fields just need to validate
// so content is ingested unmodified; add new keys here as the build surfaces
// them.
//
// CF frontmatter keys:
//   - pcx_content_type  string enum (CF taxonomy: concept/reference/tutorial/...)
//   - products          array of product slugs (sometimes empty list)
//   - reviewed          ISO date string (last human review)
//   - order             top-level sort key; Nimbus reads sidebar.order
//                       instead, so this is pass-through only
//   - results           tutorial result-list shape; permissive z.any() until
//                       there's a reason to validate it
//   - hideChildren      Starlight shorthand for `sidebar.hideChildren`.
//                       Passed through so content validates; Nimbus only
//                       reads the nested `sidebar.hideChildren` form.
export const collections = {
  docs: defineCollection(
    docsCollection({
      // CF content carries ~40+ framework-agnostic frontmatter keys (Starlight
      // + CF taxonomy). Accept them as-is; keys Nimbus acts on are typed below.
      strictFrontmatter: false,
      schemaFields: {
        // Nimbus docs are agent-friendly by default. Set `audience: human`
        // to flag a page that's written primarily for human readers.
        audience: z.literal("human").optional(),

        // Opt a page into the wide content column (forwarded to DocsLayout by
        // `[...slug].astro`). Used by the model catalog content pages.
        wide: z.boolean().optional(),

        // --- CF frontmatter passthrough ---------------------
        // Schema is intentionally permissive — the framework doesn't act
        // on these fields, it just needs them to validate so the content
        // can be ingested unmodified. Nav/sidebar semantics still come
        // from Nimbus's own keys (`sidebar.order`, `sidebar.hideChildren`).
        pcx_content_type: z.string().optional(),
        content_type: z.string().optional(),
        products: z.array(z.string()).optional(),
        reviewed: z.union([z.string(), z.date()]).optional(),
        order: z.number().optional(),
        results: z.any().optional(),
        difficulty: z.string().optional(),
        summary: z.string().optional(),
        tags: z.array(z.string()).nullable().optional(),
        release_notes_file_name: z.array(z.string()).nullable().optional(),
        hideChildren: z.boolean().optional(),
        // CF attaches a commit-feed `.atom` URL to some pages (e.g. the Pages
        // build-image + compatibility-flags pages). Pass-through only — Nimbus
        // doesn't act on it.
        rss: z.string().optional(),

        // --- D10 frontmatter shim (learning-paths Phase B) -------------------
        // Five upstream pages carry frontmatter the strict nimbus schema
        // rejects; rather than edit byte-identical content we re-declare the
        // keys here. `defineDocSchema` does `baseDocSchema().extend(fields)`
        // and Zod `.extend()` OVERWRITES same-named base keys, and
        // `withStrictKeys` reads `shape` AFTER the extend — so re-declaring
        // `prev`/`next` widens the accepted shape with no nimbus-docs change.
        //
        //   - `weight: null` on
        //     replace-vpn/connect-private-network/overlapping-ips.mdx — an
        //     unknown top-level key; `z.any().optional()` tolerates it
        //     (pass-through; nimbus reads `sidebar.order`, never `weight`).
        //   - `prev: true` / `next: true` on the 4
        //     sase-overview-course/series/*.mdx pages. nimbus's prevNextSchema
        //     accepts string | {link,label} | false but NOT `true`
        //     (Starlight treats `true` = "auto label"). A literal `true`
        //     routes into resolveOverride's object branch and THROWS for
        //     first/last-in-rail pages, so we map `true -> undefined`
        //     (== Starlight "auto", the safe no-op) instead of passing it
        //     through. (Upstream nimbus gap: prevNextSchema lacks `true`.)
        weight: z.any().optional(),
        prev: z
          .union([
            z.string(),
            z.object({ link: z.string().optional(), label: z.string().optional() }),
            z.literal(false),
            z.literal(true).transform(() => undefined),
          ])
          .optional(),
        next: z
          .union([
            z.string(),
            z.object({ link: z.string().optional(), label: z.string().optional() }),
            z.literal(false),
            z.literal(true).transform(() => undefined),
          ])
          .optional(),
      },
    }),
  ),
  // CF glossary data. Read by the Glossary table and GlossaryTooltip components.
  glossary: defineCollection({
    loader: glob({ pattern: "*.yaml", base: "./src/content/glossary" }),
    schema: z.object({
      productName: z.string(),
      entries: z.array(
        z.object({
          term: z.string(),
          general_definition: z.string(),
          associated_products: z.array(z.string()).optional(),
        }),
      ),
    }),
  }),
  // CF release-notes data. Read by ProductReleaseNotes on the changelog page.
  "release-notes": defineCollection({
    loader: glob({ pattern: "*.yaml", base: "./src/content/release-notes" }),
    schema: z.object({
      link: z.string(),
      productName: z.string(),
      productLink: z.string(),
      entries: z.array(
        z.object({
          publish_date: z.string(),
          title: z.string().optional(),
          description: z.string().optional(),
          individual_page: z.boolean().optional(),
          link: z.string().optional(),
          scheduled: z.boolean().optional(),
          scheduled_date: z.string().optional(),
        }),
      ),
    }),
  }),
  // CF unified changelog — one MD/MDX entry per post under
  // `src/content/changelog/<product>/<YYYY-MM-DD>-slug.mdx`. The parent
  // folder names the product (must match a `directory` id); `products` may
  // add more. Read by getChangelogs (`~/util/changelog`) and the
  // `/changelog/*` pages + RSS feeds.
  changelog: defineCollection({
    loader: glob({ pattern: "**/*.{md,mdx}", base: "./src/content/changelog" }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      date: z.coerce.date(),
      // If false (default), a future-dated entry stays hidden until its date.
      publish_future_dated_entry: z.boolean().default(false),
      // Directory entries this post is attributed to. The folder product is
      // auto-added by getChangelogs, so it may be omitted here.
      products: z.array(reference("directory")).default([]),
      // Hidden entries are excluded from /changelog/ and the RSS feeds.
      hidden: z.boolean().default(false),
    }),
  }),
  // CF product directory — product metadata + group membership. Id is the
  // filename (e.g. `queues`). Used by the changelog system to resolve
  // product names/links and to build the per-product / per-group views.
  // Schema is permissive (passthrough); only the fields below are read.
  directory: defineCollection({
    loader: glob({
      pattern: "**/*.{json,yml,yaml}",
      base: "./src/content/directory",
      generateId: ({ entry }) => entry.replace(/\.(json|ya?ml)$/, ""),
    }),
    schema: z
      .object({
        id: z.string().optional(),
        // CF's directory collection is schemaless; non-product entries (e.g.
        // home.yaml) omit `name`/`entry`. Keep these optional to match.
        name: z.string().optional(),
        entry: z
          .object({
            title: z.string().optional(),
            url: z.string().optional(),
            group: z.string().optional(),
            additional_groups: z.array(z.string()).optional(),
          })
          .passthrough()
          .optional(),
        // Product page metadata. Read by DirectoryCatalog (`/directory`)
        // for the per-card description blurb.
        meta: z
          .object({
            title: z.string().optional(),
            description: z.string().optional(),
          })
          .passthrough()
          .optional(),
      })
      .passthrough(),
  }),
  // CF learning-paths data — one JSON per path under
  // `src/content/learning-paths/<module>.json`. Id is the filename (e.g.
  // `workers`), which is also the path's `<module>` URL segment. Read by
  // ResourcesBySelector (aggregated into /resources) + the per-path sidebar
  // title lookup. `products` are `directory` references (resolved to names).
  "learning-paths": defineCollection({
    loader: glob({
      pattern: "**/*.{json,yml,yaml}",
      base: "./src/content/learning-paths",
    }),
    schema: z
      .object({
        title: z.string(),
        uid: z.string().optional(),
        path: z.string(),
        description: z.string(),
        pcx_content_type: z.string().default("learning-path"),
        products: z.array(reference("directory")).default([]),
        tags: z.string().array().optional(),
        reviewed: z.coerce.date().optional(),
      })
      .strict(),
  }),
  // CF plans data (single index.json). Read by FeatureTable + ProductFeatures
  // via getEntry("plans", "index"). Untyped — the shape is a deep nested
  // object addressed by dot-path id, so the schema is left permissive.
  plans: defineCollection({
    loader: glob({ pattern: "*.json", base: "./src/content/plans" }),
  }),
  // CF Pages framework presets (single index.yaml). Read by PagesBuildPreset.
  "pages-framework-presets": defineCollection({
    loader: glob({ pattern: "*.yaml", base: "./src/content/pages-framework-presets" }),
    schema: z.object({ build_configs: z.record(z.string(), z.any()) }),
  }),
  // CF product availability + granular control application data, fetched from
  // middlecache at build. Read by ProductAvailabilityText /
  // GranularControlApplicationsList.
  "product-availability": defineCollection(productAvailabilityCollectionConfig),
  "granular-control-applications": defineCollection(
    granularControlApplicationsCollectionConfig,
  ),
  // CF notification catalog (single index.yaml). Read by AvailableNotifications.
  notifications: defineCollection({
    loader: glob({ pattern: "*.yaml", base: "./src/content/notifications" }),
    schema: z.object({ entries: z.array(z.any()) }),
  }),
  // CF Pages build-image versions (v1/v2/v3.yaml). Read by the
  // PagesBuildEnvironment* components.
  "pages-build-environment": defineCollection({
    loader: glob({ pattern: "*.yaml", base: "./src/content/pages-build-environment" }),
    schema: z
      .object({
        build_environment: z
          .object({ operating_system: z.string(), architecture: z.string() })
          .optional(),
        languages: z.array(z.any()).default([]),
        tools: z.array(z.any()).default([]),
      })
      .passthrough(),
  }),
  // CF Stream video metadata (one <slug>/index.yaml per video). Read by the
  // Stream component's `file` variant. Id is the directory slug. `products`
  // (directory references) is left as passthrough — not resolved here.
  stream: defineCollection({
    loader: glob({
      pattern: "**/*.{yaml,yml}",
      base: "./src/content/stream",
      generateId: ({ entry }) => entry.replace(/\/index\.(ya?ml)$/, ""),
    }),
    schema: z
      .object({
        id: z.string(),
        title: z.string(),
        url: z.string().optional(),
        description: z.string().optional(),
        chapters: z.record(z.string(), z.string()).optional(),
        thumbnail: z
          .object({ url: z.string() })
          .or(z.object({ timestamp: z.string() }))
          .optional(),
      })
      .passthrough(),
  }),
  // CF WARP client releases — one YAML per release under
  // `src/content/warp-releases/<os>/<track>/<version>.yaml`. The glob id is the
  // path-minus-extension (e.g. `macos/ga/2026.1.150.0`), which WARPReleases
  // filters on via `id.startsWith("<os>/<track>")`. Read by the WARPReleases /
  // WARPRelease components on the WARP download page.
  "warp-releases": defineCollection({
    loader: glob({ pattern: "**/*.{json,yml,yaml}", base: "./src/content/warp-releases" }),
    schema: warpReleasesSchema,
  }),
  // CF Workers runtime compatibility flags — one markdown file per flag under
  // `src/content/compatibility-flags/<flag>.md` (frontmatter + a body note).
  // Not route-generating: the whole set renders as per-flag tables + notes on a
  // single page via the CompatibilityFlags component (the 3a data-feeds-a-
  // component pattern). The upstream `_build` frontmatter directives are
  // non-canonical here and stripped by the (non-strict) zod schema.
  "compatibility-flags": defineCollection({
    loader: glob({ pattern: "*.md", base: "./src/content/compatibility-flags" }),
    schema: compatibilityFlagsSchema,
  }),
  // CF rules-language field catalog (single index.yaml). Read by FieldCatalog
  // on /ruleset-engine/rules-language/fields/reference/ via getEntry.
  fields: defineCollection({
    loader: glob({
      pattern: "**/*.{json,yml,yaml}",
      base: "./src/content/fields",
    }),
    schema: fieldsSchema,
  }),
  partials: defineCollection(
    partialsCollection({
      // CF partials use `inputParameters` (semicolon-list of param tokens).
      // Permissive passthrough — Nimbus's Render reads `params` for
      // validation; this key is just carried through.
      schemaFields: {
        inputParameters: z.string().optional(),
      },
    }),
  ),
  // Workers AI model catalog — one JSON per model. Id is the filename
  // (e.g. `llama-3.1-8b-instruct-fast`), which is also the per-model URL slug.
  // Schema is permissive (passthrough) so the files validate as-is; only the
  // fields the catalog/per-model pages read are declared. The big
  // `schema.input`/`output` JSON-Schema blob is carried through untyped.
  "workers-ai-models": defineCollection({
    loader: glob({
      pattern: "*.json",
      base: "./src/content/workers-ai-models",
      generateId: ({ entry }) => entry.replace(/\.json$/, ""),
    }),
    schema: z
      .object({
        id: z.string(),
        name: z.string(),
        description: z.string(),
        source: z.number().optional(),
        task: z
          .object({
            id: z.string().optional(),
            name: z.string(),
            description: z.string().optional(),
          })
          .passthrough(),
        tags: z.array(z.string()).default([]),
        properties: z
          .array(
            z
              .object({
                property_id: z.string(),
                value: z.any(),
              })
              .passthrough(),
          )
          .default([]),
        schema: z.any().optional(),
      })
      .passthrough(),
  }),
  // Unified AI model catalog — one JSON per model. Id is the filename
  // (e.g. `openai-tts-1`); the per-model URL slug is the `model_id`
  // (e.g. `openai/tts-1`), NOT the filename. The resolver-read fields are
  // declared (so JSON validates and reads never go `undefined`) and the object
  // is `.passthrough()` so heavy/extra fields (full examples, code_snippets,
  // raw_response, etc.) carry through untyped.
  "catalog-models": defineCollection({
    loader: glob({
      pattern: "*.json",
      base: "./src/content/catalog-models",
      generateId: ({ entry }) => entry.replace(/\.json$/, ""),
    }),
    schema: z
      .object({
        // Identification
        model_id: z.string(),
        provider_id: z.string().nullable(),
        name: z.string(),

        // Content
        description: z.string(),
        task: z.string(),
        tags: z.string().array(),

        // Capabilities
        context_length: z.number().nullable(),
        max_output_tokens: z.number().nullable(),
        supports_async: z.boolean(),

        // Zero Data Retention (optional — older API rows omit it).
        zdr: z.boolean().optional(),
        zdr_comment: z.string().nullable().optional(),

        // In-page notice + request formats (optional/nullable).
        banner: z.any().nullable().optional(),
        request_formats: z.string().array().nullable().optional(),

        // Examples + snippets (required `examples`, optional rest).
        examples: z.array(z.any()),
        default_example: z.any().nullable().optional(),
        code_snippets: z.array(z.any()).optional(),

        // JSON-Schema blob (input/output), carried through untyped.
        schema: z
          .object({
            input: z.record(z.string(), z.unknown()).optional(),
            output: z.record(z.string(), z.unknown()).optional(),
          })
          .optional(),

        // Metadata & links
        metadata: z.record(z.string(), z.unknown()),
        external_info: z.string().nullable(),
        terms: z.string().nullable(),
        cover_image_url: z.string().nullable(),
        schema_version: z.string().nullable(),
        private: z.boolean().optional(),

        // Timestamps
        created_at: z.string().optional(),
        updated_at: z.string().optional(),
      })
      .passthrough(),
  }),
};
