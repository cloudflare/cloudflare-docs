# cloudflare-docs

| Package                      | Current version | Beta version                                         | Owner                    | v6 compatible?     | Notes                                  |
|------------------------------|-----------------|------------------------------------------------------|--------------------------|--------------------|----------------------------------------|
| @astrojs/starlight           | 0.36.0          | https://pkg.pr.new/@astrojs/starlight@3644           | @astrojs                 | Yes                |                                        |
| @astrojs/starlight-docsearch | 0.6.0           | https://pkg.pr.new/@astrojs/starlight-docsearch@3644 | @astrojs                 | Yes                |                                        |
| @astrojs/starlight-tailwind  | 4.0.1           | https://pkg.pr.new/@astrojs/starlight-tailwind@3644  | @astrojs                 | Yes                |                                        |
| @astrojs/check               | 0.9.4           | 0.9.7-beta.1                                         | @astrojs                 | Yes                |                                        |
| @astrojs/react               | 4.2.5           | 5.0.0-beta.3                                         | @astrojs                 | Yes                |                                        |
| @astrojs/sitemap             | 3.5.1           | 3.6.1-beta.3                                         | @astrojs                 | Yes                |                                        |
| @astrojs/rss                 | 4.0.12          | 4.0.15-beta.4                                        | @astrojs                 | Yes                |                                        |
| astro-skills                 | 0.0.5           | None                                                 | fredkschott (core team)  | Yes                |                                        |
| starlight-image-zoom         | 0.13.2          | None                                                 | HiDeoo (core team)       | Yes (eventually)   |                                        |
| starlight-links-validator    | 0.19.2          | None                                                 | HiDeoo (core team)       | Known Zod 4 issues |                                        |
| starlight-package-managers   | 0.12.0          | None                                                 | HiDeoo (core team)       | Yes (eventually)   |                                        |
| starlight-showcases          | 0.3.1           | None                                                 | HiDeoo (core team)       | Yes (eventually)   |                                        |
| astro-breadcrumbs            | 3.3.1           | Unrelated                                            | felix-berlin (community) | No                 |                                        |
| astro-icon                   | 1.1.5           | None                                                 | natemoo-re (community)   | Maybe              | No peers declared; devDeps us astro@4  |
| astro-live-code              | 0.0.6           | None                                                 | mattjennings (community) | Maybe              | No peers declared; devDeps use astro@5 |
| starlight-scroll-to-top      | 0.4.0           | None                                                 | frostybee (community)    | Likely yes         | peer: @astrojs/starlight@>=0.35        |

# astro-icon

| Package            | Current version | Beta version                               | Owner    | v6 compatible? | Notes                                    |
|--------------------|-----------------|--------------------------------------------|----------|----------------|------------------------------------------|
| astro              | ^4.0.0 (dev)    | 6.0.0-beta.15                              | @astrojs | Yes            | peerDeps cap at ^4; no v6 range declared |
| @astrojs/starlight | ^0.15.1 (www)   | https://pkg.pr.new/@astrojs/starlight@3644 | @astrojs | Yes            | A dep of the docs, not the plugin        |
| @astrojs/check     | ^0.3.4 (www)    | 0.9.7-beta.1                               | @astrojs | Yes            | A dep of the docs, not the plugin        |

# astro-breadcrumbs

| Package                   | Current version | Beta version                                        | Owner                    | v6 compatible?     | Notes                             |
|---------------------------|-----------------|-----------------------------------------------------|--------------------------|--------------------|-----------------------------------|
| @astrojs/starlight        | 0.37.6          | https://pkg.pr.new/@astrojs/starlight@3644          | @astrojs                 | Yes                | A dep of the docs, not the plugin |
| @astrojs/mdx              | 4.3.13          | 5.0.0-beta.8                                        | @astrojs                 | Yes                | A dep of the demo, not the plugin |
| starlight-links-validator | 0.19.2          | None                                                | HiDeoo ( core team)      | Known Zod 4 issues | A dep of the docs, not the plugin |
| astro-matomo              | 1.9.0           | https://pkg.pr.new/colbywhite/astro-matomo@12c1d60  | felix-berlin (community) | Yes                | A dep of the docs, not the plugin |

# astro-live-code

| Package            | Current version | Beta version                               | Owner    | v6 compatible? | Notes |
|--------------------|-----------------|--------------------------------------------|----------|----------------|-------|
| astro              | ^5.4.2 (dev)    | 6.0.0-beta.15                              | @astrojs | Yes            |       |
| @astrojs/starlight | ^0.32.2 (dev)   | https://pkg.pr.new/@astrojs/starlight@3644 | @astrojs | Yes            |       |
| @astrojs/preact    | ^4.0.1 (dev)    | 5.0.0-beta.4                               | @astrojs | Yes            |       |
| @astrojs/solid-js  | ^5.0.5 (dev)    | 6.0.0-beta.2                               | @astrojs | Yes            |       |
| @astrojs/svelte    | ^7.0.0 (dev)    | 8.0.0-beta.3                               | @astrojs | Yes            |       |
| @astrojs/vue       | ^5.0.0 (dev)    | 6.0.0-beta.1                               | @astrojs | Yes            |       |

No vitest.

# starlight-scroll-to-top

Monorepo with `packages/starlight-scroll-to-top` (plugin) and `docs/` (docs site). Plugin peerDeps:
`@astrojs/starlight: >=0.35` only — no direct `astro` version constraint.

| Package            | Current version      | Beta version                               | Owner    | v6 compatible? | Notes          |
|--------------------|----------------------|--------------------------------------------|----------|----------------|----------------|
| astro              | ^5.12.8 (dev + docs) | 6.0.0-beta.15                              | @astrojs | Yes            |                |
| @astrojs/starlight | ^0.35.2 (dev + docs) | https://pkg.pr.new/@astrojs/starlight@3644 | @astrojs | Yes            |                |
| @astrojs/check     | ^0.9.4 (docs)        | 0.9.7-beta.1                               | @astrojs | Yes            | docs site only |

No vitest.

# astro-matomo

| Package | Current version | Beta version  | Owner    | v6 compatible? | Notes |
|---------|-----------------|---------------|----------|----------------|-------|
| astro   | ^5.16.5 (dev)   | 6.0.0-beta.15 | @astrojs | Yes            |       |

No other deps
