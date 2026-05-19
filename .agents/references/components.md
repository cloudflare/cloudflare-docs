# Cloudflare Docs — Component Reference

Full usage details for MDX components available in this repository. All components are imported from `~/components`. Imports must appear after the frontmatter block.

---

## Render (partials)

Embeds a reusable MDX partial from `src/content/partials/{product}/{file}.mdx`. The primary content reuse mechanism — prefer this over copy-pasting content.

```mdx
import { Render } from "~/components";

<Render file="partial-name" product="workers" />

<!-- With parameters: -->

<Render file="partial-name" product="workers" params={{ key: "value" }} />
```

If the partial defines `params` in its frontmatter, all required params must be provided. Optional params are suffixed with `?` in the partial frontmatter.

```yaml
# partial frontmatter
params:
  - product
  - deprecated?
```

Inside the partial, params are referenced as JS expressions: `{props.product}`. For optional params with Markdown formatting, use `{props.deprecated && <Markdown text={props.deprecated} />}`.

---

## TypeScriptExample

Renders a TypeScript code block and auto-generates a JavaScript tab using `ts-blank-space`. **Required for all Workers JS/TS examples** — do not use bare `ts`/`js` fences.

````mdx
import { TypeScriptExample } from "~/components";

<TypeScriptExample filename="src/index.ts">
```ts
export default {
  async fetch(req, env): Promise<Response> {
    return new Response("Hello World");
  }
} satisfies ExportedHandler<Env>;
````

</TypeScriptExample>
```

Props:

- `filename` — optional, must end in `.ts`. The JS tab shows the `.js` equivalent.
- `playground` — boolean. Adds "Run Worker in Playground" button to the JS tab.
- `code` — object. Expressive Code options (e.g. `collapse: "1-2"`). Apply to both tabs.

Note: Expressive Code fence options (`collapse={1-2}`, etc.) cannot be set on the fence directly — pass them via the `code` prop instead.

---

## WranglerConfig

Renders Wrangler config with synced TOML and JSON tabs, auto-converting between formats. **Required for all Wrangler configuration examples** — do not use bare `toml`/`jsonc` fences.

````mdx
import { WranglerConfig } from "~/components";

<WranglerConfig>
```toml
name = "my-worker"
main = "src/index.ts"
compatibility_date = "$today"

[[d1_databases]]
binding = "DB"
database_name = "prod-d1-tutorial"
database_id = "<unique-ID-for-your-database>"
````

</WranglerConfig>
```

- Always provide TOML as input — JSON is auto-generated.
- Use `$today` for `compatibility_date`. It is replaced with the current date at build time and injects a comment telling readers to keep it current.
- Use `removeSchema` prop to omit the `$schema` line from JSON output (useful for config snippets rather than full files).
- If a feature requires a minimum `compatibility_date`, note it in a `:::note` admonition above or below the config block.

---

## PackageManagers

Shows a command across npm, yarn, and pnpm in synced tabs. **Required for package install/exec commands** — do not use bare `sh` fences for these.

```mdx
import { PackageManagers } from "~/components";

<!-- Install a package: -->

<PackageManagers pkg="wrangler" />

<!-- Execute a command: -->

<PackageManagers type="exec" pkg="wrangler" args="init my-project" />
```

---

## Tabs / TabItem

For showing different ways to accomplish the same thing. Use when there are mutually exclusive paths (Dashboard vs. API vs. Terraform, different languages, etc.).

```mdx
import { Tabs, TabItem } from "~/components";

<Tabs syncKey="dashPlusAPI">
	<TabItem label="Dashboard">Dashboard instructions</TabItem>
	<TabItem label="API">API instructions</TabItem>
	<TabItem label="Terraform">Terraform instructions</TabItem>
</Tabs>
```

Standard `syncKey` values (sync tab selection across the page):

- `dashPlusAPI` — Dashboard / API / Terraform
- `workersExamples` — JavaScript / TypeScript / Python / Rust

Do not nest tabs inside tabs — restructure into separate headings instead. The "primary answer" should always be the first tab, visible without interaction.

---

## Steps

Wraps a numbered Markdown list to render as a visual step-by-step procedure. Use for all multi-step procedures in how-to and tutorial pages.

```mdx
import { Steps } from "~/components";

<Steps>
1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to **DNS** > **Records**.
3. Select **Add record**.
</Steps>
```

---

## Details

Collapsible section. Use for supplementary content that would clutter the main flow — advanced options, long code examples, background context.

```mdx
import { Details } from "~/components";

<Details header="Advanced configuration">Content shown when expanded.</Details>

<!-- Open by default: -->

<Details header="Required reading" open={true}>
	Content visible without interaction.
</Details>
```

Props: `header` (required, string), `open` (optional boolean, defaults to `false`), `id` (optional, adds HTML id to the element).

---

## Plan

Displays plan availability. Use at the top of overview pages or near features with plan restrictions.

```mdx
import { Plan } from "~/components";

<Plan type="all" />         <!-- Available on all plans -->
<Plan type="paid" />        <!-- Paid plans only -->
<Plan type="pro" />         <!-- Pro and above -->
<Plan type="business" />    <!-- Business and above -->
<Plan type="add-on" />      <!-- Available as add-on -->
<Plan type="ent-add-on" />  <!-- Enterprise add-on -->
<Plan type="workers-all" /> <!-- All Workers plans -->
<Plan type="workers-paid" /><!-- Workers paid plans -->

<!-- Pull availability from a product's index.json: -->

<Plan id="web3.ethereum.properties.availability.summary" />
```

---

## GlossaryTooltip

Renders a focusable hover tooltip with a glossary definition. Pulls from `src/content/glossary/`. Defaults to the short definition (text before the first line break in `general_definition`).

```mdx
import { GlossaryTooltip } from "~/components";

<GlossaryTooltip term="active-zone">active zone</GlossaryTooltip>

<!-- With prepended text: -->

<GlossaryTooltip term="active-zone" prepend="An ">
	active zone
</GlossaryTooltip>

<!-- With a link on the inner text: -->

<GlossaryTooltip term="active-zone" link="/dns/glossary/">
	active zone
</GlossaryTooltip>
```

Props: `term` (required, matches a YAML entry key), `prepend` (optional text prepended to the definition), `link` (optional, wraps the inner text in a link).

---

## GlossaryDefinition

Pulls a glossary definition inline into the page body.

```mdx
import { GlossaryDefinition } from "~/components";

<GlossaryDefinition term="active-zone" prepend="An active zone is " />
```

Props: `term` (required), `prepend` (optional).

---

## Glossary

Renders a full product-level glossary table. Used on dedicated `glossary.mdx` pages.

```mdx
---
title: Glossary
pcx_content_type: glossary
---

import { Glossary } from "~/components";

Review the definitions for terms used across Cloudflare's DNS documentation.

<Glossary product="dns" />
```

Glossary data lives in `src/content/glossary/{product}.yaml`. Schema:

```yaml
productName: DNS
entries:
  - term: active zone
    general_definition: |-
      a DNS zone that is active on Cloudflare requires changing its nameservers to Cloudflare's for management.
    associated_products:
      - Cloudflare One
```

Fields: `productName` (required), `entries[].term` (required), `entries[].general_definition` (required, start lowercase unless proper noun), `entries[].associated_products` (optional array).

---

## InlineBadge

Renders a small inline status badge. **Avoid inline badges** — prefer mentioning status (beta, alpha) in prose, or use the `Badge` component in the page heading.

```mdx
import { InlineBadge } from "~/components";

<InlineBadge preset="beta" />         <!-- Orange -->
<InlineBadge preset="alpha" />        <!-- Green -->
<InlineBadge preset="deprecated" />   <!-- Red -->
<InlineBadge preset="early-access" /> <!-- Blue -->
<InlineBadge preset="legacy" />       <!-- Red -->
<InlineBadge text="Custom text" />
```

---

## DashButton

Renders a button linking to a validated Cloudflare dashboard deeplink. Preferred over bare links for in-procedure dashboard navigation steps.

```mdx
import { DashButton } from "~/components";

1. Go to the **WAF** page.

   <DashButton url="/?to=/:account/application-security/waf" />

<!-- Zero Trust dashboard: -->

<DashButton url="/?to=/:account/access/ai-controls" zeroTrust />
```

Props: `url` (required, must exist in `src/content/dash-routes/index.json` — build fails otherwise), `buttonName` (optional, overrides default label), `zeroTrust` (boolean, uses Zero Trust routes).

---

## GitHubCode

Fetches and displays a file from a Cloudflare GitHub repository. Use a full 40-character commit hash — never a branch name — so the content stays stable as the repo evolves.

```mdx
import { GitHubCode } from "~/components";

<GitHubCode
	repo="cloudflare/workers-rs"
	file="templates/hello-world/src/lib.rs"
	commit="ab3951b5c95329a600a7baa9f9bb1a7a95f1aeaa"
	lang="rs"
/>

<!-- TypeScript with auto-generated JS tab: -->

<GitHubCode
	repo="cloudflare/workflows-starter"
	file="src/index.ts"
	commit="a844e629ec80968118d4b116d4b26f5dcb107137"
	lang="ts"
	useTypeScriptExample={true}
/>

<!-- Filter by line range: -->

<GitHubCode repo="..." file="..." commit="..." lang="..." lines="1-3" />

<!-- Filter by tag (source must wrap content in <docs-tag name="..."> comments): -->

<GitHubCode repo="..." file="..." commit="..." lang="..." tag="no-logging" />
```

Props: `repo` (`cloudflare/<name>`), `file` (path within repo), `commit` (40-char hash), `lang`, `useTypeScriptExample` (boolean), `lines` (range string), `tag` (string), `code` (Expressive Code options).

---

## DirectoryListing

Auto-generates a listing of child pages. Used in `navigation` and `overview` pages.

```mdx
import { DirectoryListing } from "~/components";

<DirectoryListing />
```

---

## Badge

Starlight built-in. Displays a coloured status badge. Use in page headings to indicate beta, new, deprecated, etc. Prefer this over `InlineBadge` for heading-level status labels.

```mdx
import { Badge } from "~/components";

<Badge text="Beta" variant="caution" />
<Badge text="New" variant="tip" />
<Badge text="Deprecated" variant="danger" />
```

Variants: `note` (blue), `tip` (purple), `caution` (orange), `danger` (red), `success` (green).

Can also be added to the sidebar via frontmatter without importing:

```yaml
sidebar:
  badge:
    text: Beta
    variant: caution
```

---

## Card / LinkTitleCard / ListCard

Starlight built-ins for styled card containers. Used on overview and navigation pages.

```mdx
import { Card, LinkTitleCard, ListCard } from "~/components";

<!-- Informational card with icon -->

<Card title="Check this out" icon="puzzle">
	Interesting content you want to highlight.
</Card>

<!-- Card that links to another page -->

<LinkTitleCard title="Get started" icon="rocket" href="/workers/get-started/">
	Deploy your first Worker in minutes.
</LinkTitleCard>

<!-- Card with a list of links -->

<ListCard title="Resources" icon="open-book">
	- [Docs](/workers/) - [API reference](/api/)
</ListCard>
```

---

## YouTube

Embeds a YouTube video by ID.

```mdx
import { YouTube } from "~/components";

<YouTube id="XHvmX3FhTwU" />
```

---

## Stream

Embeds a Cloudflare Stream video. Use `id` + `title` for a specific video, or `file` to reference an entry in `src/content/stream/`.

```mdx
import { Stream } from "~/components";

<!-- By video ID: -->

<Stream
	id="86f22d1f760b77cdc349f89b25b63c3e"
	title="Video title"
	thumbnail="https://example.com/thumbnail.jpg"
/>

<!-- By stream collection file: -->

<Stream file="warp-1-basics" />
```

Props: `id` (required unless using `file`), `title` (required unless using `file`), `thumbnail` (timestamp or URL), `chapters` (record of label → timestamp), `expandChapters` (boolean), `showMoreVideos` (boolean, default `true`), `file` (collection entry name — mutually exclusive with `id`/`title`/`thumbnail`/`chapters`).

---

## APIRequest

Generates a formatted `curl` command from the Cloudflare OpenAPI schema. Use for Cloudflare API endpoints. Path variables not supplied via `parameters` default to shell variable format (e.g. `$ZONE_ID`).

```mdx
import { APIRequest } from "~/components";

<!-- GET with query parameters: -->

<APIRequest
	path="/zones/{zone_id}/page_shield/scripts"
	method="GET"
	parameters={{ direction: "asc" }}
/>

<!-- PUT with JSON body: -->

<APIRequest
	path="/zones/{zone_id}/api_gateway/settings/schema_validation"
	method="PUT"
	json={{ validation_default_mitigation_action: "block" }}
/>

<!-- POST with form data: -->

<APIRequest
	path="/accounts/{account_id}/images/v2/direct_upload"
	method="POST"
	form={{ requireSignedURLs: true }}
/>
```

Props: `path` (required), `method` (required), `parameters` (URL path + query substitutions), `json` (JSON body), `form` (FormData body), `roles` (API token roles filter — `true` shows all, `false` hides, string filters by substring), `code` (Expressive Code options).

---

## CURL

Generates a `curl` command for arbitrary (non-Cloudflare-API) URLs. Use when `APIRequest` is not appropriate.

```mdx
import { CURL } from "~/components";

<CURL
	url="https://api.example.com/endpoint"
	method="POST"
	json={{ key: "value" }}
	query={{ foo: "bar" }}
/>
```

Props: `url` (required), `method` (default `GET`), `headers`, `json`, `form`, `query`, `code` (Expressive Code options).

---

## WranglerCommand

Renders the full CLI reference for a Wrangler command, auto-generated from the installed Wrangler version. Used in Wrangler reference documentation.

```mdx
import { WranglerCommand } from "~/components";

<WranglerCommand command="deploy" />
<WranglerCommand command="d1 execute" />

<!-- With custom description: -->

<WranglerCommand
	command="deploy"
	description={"Deploy a [Worker](/workers/)"}
/>
```

Use `ExtraFlagDetails` as a child to add or replace help text for specific flags:

```mdx
import { WranglerCommand, ExtraFlagDetails } from "~/components";

<WranglerCommand command="deploy">
	<ExtraFlagDetails key="dry-run">
		Additional detail appended to the flag's help text.
	</ExtraFlagDetails>
	<ExtraFlagDetails key="compatibility-date" mode="replace">
		Custom text that replaces the flag's help text entirely.
	</ExtraFlagDetails>
</WranglerCommand>
```

Props: `command` (required), `headingLevel` (default `2`), `description` (overrides Wrangler default).

---

## Markdown

Renders a Markdown string inside a JSX context. Primarily useful for formatting variables passed into partials via `Render`.

```mdx
import { Markdown } from "~/components";

<Markdown text="**bold** and [a link](/path/)" />

<!-- In a partial, for a formatted variable: -->

<Markdown text={props.instructions} />
```

Limitations: no MDX features, no Astro image optimization, no syntax highlighting in code blocks, no heading IDs or table of contents entries. Use sparingly — prefer standard Markdown prose when not inside a JSX context.

---

## AnchorHeading

Creates a heading with a custom anchor ID — useful when writing headings inside components or non-Markdown files. In regular MDX, headings get anchors automatically via rehype plugins, so this is rarely needed. To override a heading ID in MDX, use an inline comment instead:

```mdx
## My heading {/* custom-anchor */}
```

When you do need the component:

```mdx
import { AnchorHeading } from "~/components";

<AnchorHeading
	title="How to use AnchorHeading"
	slug="use-anchorheading"
	depth={2}
/>
```

Props: `title` (required, heading text), `slug` (required, custom anchor ID), `depth` (heading level, e.g. `2` for H2).

---

## LinkButton

Renders a styled link button. Useful for primary CTAs on overview and get-started pages.

```mdx
import { LinkButton } from "~/components";

<LinkButton href="/workers/get-started/">Get started</LinkButton>
<LinkButton href="/workers/get-started/" variant="secondary" icon="external">
	More information
</LinkButton>
<LinkButton href="/workers/get-started/" variant="minimal">
	Other stuff
</LinkButton>
```

Variants: `primary` (default), `secondary`, `minimal`.

---

## LinkCard / CardGrid

Starlight built-in. Renders a card with a title, description, and link. Use `CardGrid` to display multiple cards in a grid layout.

```mdx
import { LinkCard, CardGrid } from "~/components";

<LinkCard
	title="Get started"
	description="Deploy your first Worker in minutes."
	href="/workers/get-started/"
/>

<CardGrid>
	<LinkCard title="Workers" description="..." href="/workers/" />
	<LinkCard title="Pages" description="..." href="/pages/" />
</CardGrid>
```

---

## FileTree

Starlight built-in. Displays a file and directory tree. Use bold to highlight the current file.

```mdx
import { FileTree } from "~/components";

<FileTree>- src/ - index.ts - **worker.ts** - wrangler.toml</FileTree>
```

---

## Description

Renders a short description block directly below the page title. Prefer the `summary` frontmatter field for most use cases — use this component only when you need the description to appear conditionally or within a component.

```mdx
import { Description } from "~/components";

<Description>A short description rendered below the page title.</Description>
```

---

## Feature

Renders a feature card with a name and link. Used on product overview pages to list available features.

```mdx
import { Feature } from "~/components";

<Feature header="Durable Objects" href="/durable-objects/">
	Coordinate state and logic across Workers with strongly consistent storage.
</Feature>
```

Props: `header` (required, feature name), `href` (required, link to feature docs). Body text is the feature description.

---

## RelatedProduct

Renders a related product card with an icon, name, and link. Used on overview pages to surface related Cloudflare products.

```mdx
import { RelatedProduct } from "~/components";

<RelatedProduct header="R2" href="/r2/" product="r2">
	Store large amounts of unstructured data without egress fees.
</RelatedProduct>
```

Props: `header` (required, product name), `href` (required), `product` (required, slugified product name for icon lookup). Body text is the product description.

---

## FeatureTable

Renders a feature availability table by plan, sourced from `src/content/plans/index.json`. Use `id` in dot notation: `<product>.<feature>`.

```mdx
import { FeatureTable } from "~/components";

<FeatureTable id="analytics.logpush" />
<FeatureTable id="analytics.logpush" skipAvailability="true" />
```

Props: `id` (required, dot-notation path into `src/content/plans/`), `skipAvailability` (boolean string `"true"`/`"false"`, default `"false"`).

---

## ProductFeatures

Renders a full feature list for a product grouping, sourced from `src/content/plans/index.json`.

```mdx
import { ProductFeatures } from "~/components";

<ProductFeatures id="dns" />
```

Props: `id` (required, product key in `src/content/plans/`).

---

## ProductChangelog

Embeds changelog entries for a product inline on a docs page.

```mdx
import { ProductChangelog } from "~/components";

<ProductChangelog product="workers" />
<ProductChangelog area="platform" />
```

Props: `product` and `area` are mutually exclusive. `hideEntry` (string, hides a specific entry by name). `scheduled` (boolean, default `false` — set `true` for WAF scheduled changelogs).

---

## ProductAvailabilityText

Renders a product's lifecycle status (Beta, Alpha, etc.) inline. Renders nothing for GA products, so safe to leave in place as a product matures.

```mdx
import { ProductAvailabilityText } from "~/components";

Cloud Connector <ProductAvailabilityText product="cloud-connector" /> lets you route traffic to public cloud providers.
```

Props: `product` (required, slug matching a file in `src/content/directory/`), `parentheses` (string `"true"`/`"false"`, default `"true"` — wraps output in parentheses).

---

## PublicStats

Renders a live public statistic inline in prose. Available IDs are defined in `src/components/PublicStats.astro`.

```mdx
import { PublicStats } from "~/components";

Cloudflare has data centers in <PublicStats id="data_center_cities" />.
Our network handles <PublicStats id="total_bandwidth" />.
```

To add or update stats, edit `src/components/PublicStats.astro`.

---

## ResourcesBySelector

Displays a filterable list of docs pages pulled by `pcx_content_type`, `tags`, and/or `products` frontmatter. Used on example and tutorial index pages.

```mdx
import { ResourcesBySelector } from "~/components";

<ResourcesBySelector
	directory="workers/examples/"
	types={["example"]}
	filterables={["tags"]}
/>
```

Props: `directory` (required, relative to `src/content/docs/`), `types` (array of `pcx_content_type` values), `filterables` (frontmatter properties to show as filter dropdowns), `tags` (pre-filter by tag), `products` (pre-filter by product), `showDescriptions` (boolean, default `true`), `showLastUpdated` (boolean, default `false`).

---

## ListTutorials

Auto-generates a table of tutorial pages for the current product. Used on tutorial index pages.

```mdx
import { ListTutorials } from "~/components";

<ListTutorials />
```

---

## PagesBuildPreset

Displays build preset details for a Pages framework.

```mdx
import { PagesBuildPreset } from "~/components";

<PagesBuildPreset framework="next-js" />
<PagesBuildPreset framework="gatsby" />
```

Props: `framework` (required, framework slug).

---

## WranglerNamespace

Renders the full command listing for a Wrangler namespace (e.g. `d1`, `hyperdrive`). Used in Wrangler reference docs.

```mdx
import { WranglerNamespace } from "~/components";

<WranglerNamespace namespace="d1" />
```

Props: `namespace` (required), `headingLevel` (default `2`).

---

## RuleID

Renders a copyable rule ID. Used in WAF and security rules documentation.

```mdx
import { RuleID } from "~/components";

<RuleID id="abcdefghijklmnopqrstuvwxyz" />
```

---

## SubtractIPCalculator

Interactive calculator for subtracting IP ranges from a base CIDR block. Used in Magic Transit and networking docs.

```mdx
import SubtractIPCalculator from "~/components/SubtractIPCalculator.tsx";

<SubtractIPCalculator client:load />

<!-- With defaults: -->

<SubtractIPCalculator
	client:load
	defaults={{ base: "10.0.0.0/8", subtract: ["10.0.0.0/24"] }}
/>
```

Note: imports directly from the `.tsx` file path, not from `~/components`.

---

## Width

Constrains content width. Useful for images or text that should not span the full container.

```mdx
import { Width } from "~/components";

<Width size="large">75% of container width</Width>
<Width size="medium">50% of container width</Width>
<Width size="small" center>
	25%, centered
</Width>
```

Props: `size` (required, `"large"` | `"medium"` | `"small"`), `center` (boolean).

---

## AvailableNotifications

Lists available notification types for a product, sourced from `src/content/notifications/index.yaml`.

```mdx
import { AvailableNotifications } from "~/components";

<AvailableNotifications product="dns" />
<AvailableNotifications
	product="dns"
	notificationFilter="Secondary DNS all Primaries Failing"
/>
```

Props: `product` (required, product name or slug), `notificationFilter` (optional, filter to a specific notification type by name).
