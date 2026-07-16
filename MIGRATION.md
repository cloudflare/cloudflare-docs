# Astro v6 + Starlight Beta — Migration POC

> **Reference links:**
>
> - Starlight beta: [withastro/starlight#3644]
> - Astro Docs example: [withastro/docs#13230]
> - [Astro migration guide]
> - [Zod 4 migration guide]
> - [Cloudflare adapter migration guide]

[withastro/starlight#3644]: https://github.com/withastro/starlight/pull/3644
[withastro/docs#13230]: https://github.com/withastro/docs/pull/13230
[Astro Migration guide]: https://v6.docs.astro.build/en/guides/upgrade-to/v6/
[Zod 4 migration guide]: https://zod.dev/v4/changelog
[Cloudflare adapter migration guide]: https://v6.docs.astro.build/en/guides/integrations-guide/cloudflare/#upgrading-to-v13-and-astro-6
[STARLIGHT_CUSTOMIZATIONS.md]: ./STARLIGHT_CUSTOMIZATIONS.md

## High-risk items and unknowns

| Item                                                  | Risk   | Status                                                        |
|-------------------------------------------------------|--------|---------------------------------------------------------------|
| **`Page.astro` Vite alias**                           | HIGH   | Unknown — We're coupled to low-level private implementation   |
| **`patch-package` hunks against Starlight internals** | HIGH   | Unknown — We're coupled to low-level private implementation   |
| **`starlight-links-validator` Zod 4 incompatibility** | HIGH   | Confirmed broken upstream                                     |
| **Community Starlight plugins vs. beta**              | MEDIUM | Unknown — must investigate each                               |
| **Vitest compatibility**                              | LOW    | Must stay on Vitest v3.2.x, but we don't have a lot of tests. |
| **Zod 4**                                             | LOW    | Will result in warnings, not errors                           |

## Background notes

- We do **not** use the `@astrojs/cloudflare` adapter.
  The site is compiled to static HTML and served by a custom Cloudflare Worker defined in `worker/index.ts`.
  The [Cloudflare adapter migration guide] does not apply here.
- We have **six layers of Starlight customization** documented in [STARLIGHT_CUSTOMIZATIONS.md].
  This should be read beforehand.
  The most invasive is `patch-package`, which directly modifies Starlight files in `node_modules` after every install.
- We use several **community Starlight plugins** alongside the official ones.

## Version targets

Targets are determined by [withastro/docs#13230].
That is the north star.

| Package                        | Current  | Target                                                 |
| ------------------------------ | -------- |--------------------------------------------------------|
| `astro`                        | `5.13.7` | `6.0.0-beta.8`                                         |
| `@astrojs/starlight`           | `0.36.0` | `https://pkg.pr.new/@astrojs/starlight@3644`           |
| `@astrojs/starlight-docsearch` | `0.6.0`  | `https://pkg.pr.new/@astrojs/starlight-docsearch@3644` |
| `@astrojs/starlight-tailwind`  | `4.0.1`  | `https://pkg.pr.new/@astrojs/starlight-tailwind@3644`  |
| `@astrojs/check`               | `0.9.4`  | `0.9.7-beta.1`                                         |
| `@astrojs/react`               | `4.2.5`  | ?                                                      |
| `@astrojs/sitemap`             | `3.5.1`  | `3.6.1-beta.3`                                         |
| `@astrojs/rss`                 | `4.0.12` | ?                                                      |

The Starlight packages use `pkg.pr.new` URLs.
These are preview builds cut directly from the PR branch, not published to npm.

## Can any of this be done in a separate PR first?

Must be done in the final big-bang PR:

- `astro/zod` (the Astro 6 replacement for `astro:schema`) does not exist in Astro 5. The
  18-file import rename must happen in the same commit as the version bump.
- `experimental.contentIntellisense` is still behind the experimental flag in Astro 5; it
  can only be removed once Astro 6 is installed.
- All `patch-package` patches are pinned to exact package version strings and must be
  regenerated against whatever versions the new packages install as.
- Zod 4 cannot be upgraded independently — it is bundled by Astro and upgrades with it.

## Things to ignore

Both of these are deprecated in Zod 4 but not removed. The old names still work at runtime; the only consequence is TypeScript deprecation warnings.

| Usage                        | Deprecated in favor of          |
| ---------------------------- | ------------------------------- |
| `.catch((ctx) => ctx.input)` | `ctx.value`                     |
| `.describe("...")`           | `.meta({ description: "..." })` |

---

## Migration steps

### Step 1 — Update versions

```shell
npx @astrojs/upgrade beta
```

This likely takes care of most Astro packages.
Starlight package must be manually set to the PR.

```shell
npm install \
  @astrojs/starlight@https://pkg.pr.new/@astrojs/starlight@3644 \
  @astrojs/starlight-docsearch@https://pkg.pr.new/@astrojs/starlight-docsearch@3644 \
  @astrojs/starlight-tailwind@https://pkg.pr.new/@astrojs/starlight-tailwind@3644
```

> **Note on Vitest:** `vitest` must stay at `3.2.x`. `vitest.workspace.ts` uses
> `getViteConfig()` from `astro/config`, which Astro 6 only supports with Vitest v3.2.
> Vitest v4 is not yet supported.

### Step 2 — Regenerate patch-package patches ⚠️ HIGH RISK

See `STARLIGHT_CUSTOMIZATIONS.md` for full context on what each patch does.
It's likely these patches don't work out the box for the new Starlight beta.

Open question: Why did we do this?
This makes _every_ upgrade nearly impossible.

### Step 3 — Update `astro:schema` imports to `astro/zod`

All 18 files in `src/schemas/` import `z` from `"astro:schema"`.
Astro 6 deprecates this virtual module in favor of `"astro/zod"`.

```diff
-import { z } from "astro:schema";
+import { z } from "astro/zod";
```

Note: The [zod code mod] is likely useful.

Open question: Is there an Astro-specific code mod? Should there be?

Without a code mod:

```shell
find src/schemas -name "*.ts" | xargs sed -i '' 's|from "astro:schema"|from "astro/zod"|g'
```

[zod code mod]: https://github.com/nicoespeon/zod-v3-to-v4

### Step 4 — Remove `experimental.contentIntellisense` from `astro.config.ts`

Content Intellisense was behind an experimental flag in Astro 5 and is stable by default in Astro 6.
The flag will either be silently ignored or cause a type error.

In `astro.config.ts`, remove:

```ts
experimental: {
  contentIntellisense: true,
},
```

### Step 5 — Investigate the `Page.astro` Vite alias ⚠️ HIGH RISK

**File:** `astro.config.ts`, `vite.resolve.alias` block

We shim Starlight's non-overridable `Page.astro` at the Vite bundler level:

```ts
vite: {
  resolve: {
    alias: {
      "./Page.astro": fileURLToPath(...),
      "../components/Page.astro": fileURLToPath(...),
    },
  },
},
```

Open question: Can we even keep doing such a low-level override?
This likely wasn't exposed for a reason.

### Step 6 — Check community Starlight plugins

| Plugin                       | Current version | Status                                       |
| ---------------------------- | --------------- | -------------------------------------------- |
| `starlight-links-validator`  | `0.17.2`        | **Confirmed broken** — Zod 4 incompatibility |
| `starlight-image-zoom`       | `0.13.0`        | ?                                            |
| `starlight-scroll-to-top`    | `0.4.0`         | ?                                            |
| `starlight-package-managers` | `0.11.0`        | ?                                            |
| `starlight-showcases`        | `0.3.0`         | ?                                            |
