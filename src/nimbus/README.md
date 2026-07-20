# `src/nimbus` — the Nimbus build target

This directory is the **Nimbus** documentation app. It is built only when
`BUILD_TARGET=nimbus` (Astro `srcDir: src/nimbus` → `dist-nimbus/`); the default
build is Starlight at `srcDir: src` → `dist/`. The two never share a `src/pages`
or component graph. See `astro.config.ts` and `src/nimbus/astro-config.ts`.

## What lives here vs. what is shared in place

**Only app code lives here** — components, layouts, routes, schemas, util, the
`components.ts` MDX barrel, and the rehype/Sätteri pipeline.

**Content and assets are NOT copied here — they are shared in place** from the
project root and read by both build targets:

| Shared resource | Root location | How Nimbus reads it |
| --- | --- | --- |
| Content (MDX, data collections) | `src/content` | collection `base` is project-root-relative; `~/content` alias for direct imports |
| Images / assets | `src/assets` | `~/assets` alias → root `src/assets` |
| Local icons | `src/icons` | `astro-icon` resolves `iconDir` against the project root for both targets |

**Do not add content, assets, or icons under `src/nimbus`.** If a component needs
shared content data, import it via `~/content/…` (not a copy).

## Why `components/cf/*` looks like `src/components/*`

The `cf/` components are **ports** of the root (Starlight) `src/components/*`,
not duplicates: same rendered output, different rendering stack (Nimbus
primitives + `nimbus-docs` instead of Starlight internals). Both component
graphs coexist **by design** during priming — that is the cost of a big-bang
cutover, and it collapses to one set at cleanup (Epic H1: delete the Starlight
`src/*` bits, promote `src/nimbus` → `src`).

## Drift to watch (Epic F3)

A few app files here are currently byte-identical to their root counterparts
because they needed no stack adaptation (the architecture diagrams, plus
`util/warp-platforms.json`, `util/content-type.ts`, `schemas/compatibility-flags.ts`).
They are separate files in separate graphs, so a root-side edit during priming
will **not** propagate automatically. The re-baseline/drift protocol (F3) tracks
these. Note `util/warp-platforms.json` and the `compatibility-flags` schema/route
are content-derived/generated — regenerate, don't hand-edit.
