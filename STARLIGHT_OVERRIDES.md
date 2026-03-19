# Starlight Component Overrides

Detailed analysis of every component registered via Starlight's standard `components:` override API in `astro.config.ts:120–130`.
All files live in `src/components/overrides/`.

## Pattern overview

| Override          | File                    | Wraps Default?           | Pattern                                                                 |
| ----------------- | ----------------------- | ------------------------ | ----------------------------------------------------------------------- |
| `Banner`          | `Banner.astro`          | No                       | Full replacement — dismissible, typed alert variants                    |
| `Footer`          | `Footer.astro`          | No (sub-components only) | Full replacement — Cloudflare corporate footer                          |
| `Head`            | `Head.astro`            | Yes                      | Pre-processes `head[]` array, then wraps Default                        |
| `Header`          | `Header.astro`          | No                       | Full replacement — composes Starlight sub-components manually           |
| `Hero`            | `Hero.astro`            | Conditional              | `HomepageHero` on `/`, Default everywhere else                          |
| `MarkdownContent` | `MarkdownContent.astro` | No                       | Full reimplementation — adds image zoom + anchor CSS                    |
| `Sidebar`         | `Sidebar.astro`         | Yes                      | Prepends product icon + live search, wraps Default                      |
| `PageTitle`       | `PageTitle.astro`       | Yes                      | Surrounds Default with breadcrumbs, copy button, reviewed date, summary |
| `TableOfContents` | `TableOfContents.astro` | Yes                      | Appends tags, feedback prompt, edit/issue buttons after Default         |


## `Banner` — `src/components/overrides/Banner.astro`

**Full replacement.** Does not import or wrap Starlight's Default Banner.

Starlight's built-in banner is a plain unstyled block. This replacement adds typed alert variants and a client-side dismissal system.

### Typed alert variants

`banner.type` (`note`, `tip`, `caution`, `danger`) is mapped to a Starlight `Icon` name:

| Type      | Icon          |
| --------- | ------------- |
| `note`    | `information` |
| `tip`     | `rocket`      |
| `caution` | `warning`     |
| `danger`  | `error`       |

Each type gets distinct background and border colors via scoped CSS, with explicit light/dark overrides for `note` and `caution` (lines 80–143).

### Dismissible banners (lines 29–65)

When `banner.dismissible` is set, the banner is wrapped in a React `<Dismissible>` island (`client:load`). A close button renders via `<Dismisser>`, which writes a timestamped key to `localStorage`. On subsequent page loads, `<Dismissible>` reads that key and suppresses rendering if the TTL (`banner.days`) has not expired.

Non-dismissible banners render as a plain `<div>` with icon and content (lines 67–77).


## `Footer` — `src/components/overrides/Footer.astro`

**Full replacement.** Does not import Starlight's Default Footer, but does manually re-compose three of its sub-components: `<EditLink>`, `<LastUpdated>`, and `<Pagination>`.

### Cloudflare corporate footer (lines 11–66)

A 5-column link grid (Resources, Support, Company, Tools, Community) and a legal bar (Privacy Policy, Terms of Use, Report Security Issues, Trademark).

### Production-only OneTrust (lines 129–134)

The OneTrust cookie consent script is only injected when running on a production branch, detected via the `CF_PAGES_BRANCH` or `GITHUB_REF_NAME` environment variables.

### Editorial sub-components (lines 139–149)

Starlight's `<Pagination>`, `<EditLink>`, and `<LastUpdated>` are re-inserted below the corporate footer, but only on non-splash pages.

### Feedback prompt (lines 151–157)

A `<FeedbackPrompt>` React island (`client:idle`) is shown on non-homepage pages when `feedback: true` is set in frontmatter. At `≥72rem` viewports it is hidden via CSS when a ToC is present (lines 196–201), because `TableOfContents.astro` renders its own copy in the right rail instead.

### Layout note (lines 160–163)

`flex-direction: column-reverse` is applied so the editorial section (pagination, edit link) appears visually above the corporate footer even though it's rendered below it in source order.


## `Head` — `src/components/overrides/Head.astro`

**Wraps Default** (`<Default>` called at line 237). Mutates the `head[]` array in `Astro.locals.starlightRoute` before delegating, then injects three `<script>` tags.

### Title format (lines 34–93)

Reformats the page title from Starlight's default `"Page Title | Cloudflare Docs"` to `"Page Title · Product Name"` by looking up the product entry from the `directory` collection. `og:title` is set to the same value. Changelog pages use the first entry from `frontmatter.products`.

### Noindex (lines 22–31, 96–101)

`<meta name="robots" content="noindex">` is injected for:

- Products in the `NOINDEX_PRODUCTS` blocklist (currently `email-security`)
- Pages with `noindex: true` in frontmatter
- Pages with `external_link` in frontmatter

### Client-side redirect (lines 184–189)

For `external_link` pages, `<meta http-equiv="refresh" content="0; url=...">` is injected to redirect the browser. This is the mechanism behind sidebar entries that point off-site without a full server-side redirect.

### Analytics and search meta tags (lines 34–172)

| Meta tag                                   | Source                                                                                           |
| ------------------------------------------ | ------------------------------------------------------------------------------------------------ |
| `pcx_product`, `algolia_product_filter`    | `directory` collection entry for the current section                                             |
| `pcx_content_group`                        | Product entry's `group` field                                                                    |
| `pcx_chatbot_deprioritize`                 | `firewall`/`style-guide` products, hidden sidebar entries, or `chatbot_deprioritize` frontmatter |
| `description` + `og:description`           | `frontmatter.description`                                                                        |
| `pcx_content_type`, `algolia_content_type` | `frontmatter.pcx_content_type`                                                                   |
| `pcx_additional_products`                  | Comma-joined names from `frontmatter.products` entries                                           |
| `pcx_tags`                                 | `frontmatter.tags`                                                                               |
| `pcx_last_modified`                        | Days since `lastUpdated` (integer)                                                               |
| `pcx_last_reviewed`                        | Days since `frontmatter.reviewed` (integer)                                                      |

### RSS link (lines 191–202)

For `pcx_content_type: changelog` pages, a `<link rel="alternate" type="application/rss+xml">` is injected pointing to the product's `index.xml` feed.

### OG image (lines 204–215)

`og:image`, `twitter:image`, and `image` meta tags are resolved via `getOgImage()`.

### Markdown alternate link (lines 217–224)

`<link rel="alternate" type="text/markdown">` pointing to the `.md` source is added to every page, enabling LLM-friendly content discovery.

### Scripts (lines 234–236)

Three scripts are injected: `footnotes.ts` (footnote popups), `mermaid.ts` (diagram rendering), `analytics.ts` (Zaraz setup).


## `Header` — `src/components/overrides/Header.astro`

**Full replacement.** Imports Starlight's `SiteTitle`, `ThemeSelect`, and `LanguageSelect` sub-components directly and composes them manually alongside custom elements.

### Layout (lines 10–29)

Two-column flex layout:

- **Left:** `<SiteTitle>` (Cloudflare logo)
- **Right** (`#right-group`, hidden below 800px): DocSearch (fixed `20rem` width) → `<HeaderDropdowns>` (React, `client:idle`) → Login button → `<ThemeSelect>` → `<LanguageSelect>`

### Login button (lines 18–24)

Styled with `bg-cl1-brand-orange` (Cloudflare brand orange), links to `dash.cloudflare.com`. Fires a Zaraz `track("clicked header login button")` event on click (lines 82–90).

### `<HeaderDropdowns>` (line 17)

A React island (`client:idle`) using floating-UI to render a "Help" dropdown menu. Loaded idle so it does not block initial render.


## `Hero` — `src/components/overrides/Hero.astro`

**Conditional wrapper.** A minimal one-liner delegates based on route:

```ts
const isHomepage = Astro.locals.starlightRoute.id === "";
```

- **Homepage (`/`):** renders `<HomepageHero>`
- **All other pages:** passes through to Starlight's `<Default />`

### `HomepageHero.astro`

- 2-column grid layout (text left, image right at `≥50rem`)
- Quick-nav links: Directory, Resources, API, Changelog (lines 48–52)
- `h1` from `data.hero.title` and a `tagline` div
- Dark/light image variants via Astro's `<Image>` component
- Starlight's default CTA action buttons are removed entirely


## `MarkdownContent` — `src/components/overrides/MarkdownContent.astro`

**Full reimplementation** of the same `<div class="sl-markdown-content">` wrapper. No Default import.

Imports Starlight's `markdown.css` directly (line 2) to preserve all default prose styles, then adds two things:

### Image zoom (line 30)

`<ImageZoom />` from `starlight-image-zoom` is rendered before the content div. This registers the plugin's click-to-zoom behavior globally for all content images on the page.

### Heading anchor link CSS (lines 36–113)

Extensive styles for the anchor links injected by `rehypeAutolinkHeadings`:

- Links are hidden by default (`opacity: 0`) and revealed on heading hover
- At `min-width: 95em`, anchors float to the left of the heading text via `flex-direction: row-reverse`, keeping them out of the content column
- Custom properties `--icon-size` and `--icon-spacing` control sizing per heading level
- Heading level font sizes are explicitly set here rather than inherited from Starlight


## `Sidebar` — `src/components/overrides/Sidebar.astro`

**Wraps Default** (`<Default><slot /></Default>` at line 38). Prepends a product header and a live search input above Starlight's sidebar tree.

### Product header (lines 10–17)

A linked `<a>` containing:

- The product's SVG icon via `astro-icon` (colored `cl1-brand-orange`, 32px)
- The product title via `lookupProductTitle(product, module)`

The product and module are extracted from the first two URL path segments (line 7).

### Sidebar search input (lines 20–28)

A styled `<input type="text" id="sidebar-search">` with a CSS mask-image search icon. Below it, a "No results" message with a "global search" button that calls `openGlobalSearch(query)` to hand off to Algolia DocSearch (lines 30–36).

### Client-side filtering script (lines 40–262)

A `<script>` block implements full sidebar filtering without a framework:

| Lines   | Behavior                                                                                                                                                            |
| ------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 55–60   | Stores the original open/closed state of all `<details>` elements on first interaction                                                                              |
| 66–69   | `matchesAllTerms()`: splits query on whitespace, requires every term to match (AND logic)                                                                           |
| 72–81   | `showDirectChildren()`: opens a folder and reveals only its immediate children                                                                                      |
| 84–95   | `showParentChain()`: walks up the DOM to make ancestor `<li>` and `<details>` visible                                                                               |
| 98–215  | `filterSidebarItems()`: three-pass filter — (1) folder/section name matches show direct children, (2) exact page link text matches, (3) partial fallback matches    |
| 218–238 | Event listeners: `input` triggers filter; `Escape` clears and restores state; `/` key focuses the input (captured at document level, before DocSearch can claim it) |

### CSS overrides (lines 276–339)

Global style overrides for sidebar items: tighter padding, custom active-item styling (accent color + bold instead of background highlight), normalized font sizes for top-level `.large` labels, and hairline separator colors for light/dark themes.


## `PageTitle` — `src/components/overrides/PageTitle.astro`

**Wraps Default** conditionally — `{!hideTitle && <Default />}` at line 105. Adds content above and below the `<h1>`.

### Breadcrumbs (lines 23–68)

Builds a `crumbs` array by resolving each URL path segment against the `directory` and `docs` content collections to get display titles. The first crumb is always "Directory → /directory/". Rendered in a flex row alongside `<CopyPageButton>` (lines 76–103).

`hideBreadcrumbs` (from `Astro.locals.starlightRoute`) suppresses the breadcrumb row. When both `hideTitle` and `hideBreadcrumbs` are true, a scoped `<style>` hides the entire first `.content-panel` (lines 145–152).

### `<CopyPageButton>` (lines 76–103)

A React island (`client:idle`) that copies the page URL to the clipboard. Hidden on splash template pages.

### `<LastReviewed>` (line 107)

Shown when `frontmatter.reviewed` is set. Displays the date of last human review alongside the page title.

### `<Description>` (line 109)

When `frontmatter.summary` is set, renders it as a lead paragraph below the title using `marked` for Markdown parsing.

### `<ComponentUsage>` (lines 111–117)

For style guide pages with a `frontmatter.styleGuide.component` key, renders a component usage reference block.


## `TableOfContents` — `src/components/overrides/TableOfContents.astro`

**Wraps Default** (`<Default />` at line 11). Appends three sections below Starlight's standard ToC.

### Tags (lines 12–31)

When `frontmatter.tags` is set, renders a `<h2>Tags</h2>` section with linked pill badges. Each tag links to `/search/?tags={tag}` with a `data-tag-serp-link` attribute for analytics tracking.

### Feedback prompt (lines 33–40)

When `frontmatter.feedback: true`, renders `<FeedbackPrompt client:idle />` below the ToC. This is only visible on wide viewports where the ToC column is present; the Footer override renders the same component in the footer on narrower screens.

### Edit and Issue buttons (lines 41–65)

Shown on all pages except `/support/*`:

- **Edit** — links to the GitHub edit URL from `starlightRoute.editUrl`, using Starlight's `pencil` icon
- **Issue** — links to `github.com/cloudflare/cloudflare-docs/issues/new/choose`, using Starlight's `github` icon
