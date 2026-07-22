# `src/nimbus` — the Nimbus app

This directory is the Nimbus documentation app (`nimbus-docs`). It is the sole
build target: `astro.config.ts` sets `srcDir: ./src/nimbus` → `outDir: ./dist`.

## What lives here vs. what is shared in place

**Only app code lives here** — components, layouts, routes, schemas, util, the
`components.ts` MDX barrel, and the rehype/Sätteri pipeline.

**Content and assets are NOT copied here — they are shared in place** from the
project root and read by the build via explicit Vite aliases:

| Shared resource            | Root location          | Alias                       |
| -------------------------- | ---------------------- | --------------------------- |
| Content (MDX, collections) | `src/content`          | `~/content/*`               |
| Images / assets            | `src/assets`           | `~/assets/*`                |
| Zaraz analytics util       | `src/util/zaraz.ts`    | `~/util/zaraz`              |
| Package-managers util      | `src/util/package-managers.ts` | `~/util/package-managers` |
| Warp platforms data        | `src/util/warp-platforms.json` | `~/util/warp-platforms.json` |
| OneTrust component         | `src/components/OneTrust.astro` | `~/components/OneTrust.astro` |

**Do not add content, assets, or icons under `src/nimbus`.** If a component needs
shared content data, import it via `~/content/…` (not a copy).

## Path aliases

Within this app:

- `~/*` → `src/nimbus/*` (this directory)
- `@/*` → `src/nimbus/*` (alias)
- `~/assets/*` → `src/assets/*` (shared)
- `~/content/*` → `src/content/*` (shared)
- Specific `~/util/*` and `~/components/*` paths listed above

The alias resolver lives in `src/nimbus/astro-config.ts`.
