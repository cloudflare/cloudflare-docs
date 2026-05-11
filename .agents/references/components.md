# Cloudflare Docs — Component Reference

Full usage details for MDX components available in this repository. All components are imported from `~/components`. Imports must appear after the frontmatter block.

For the quick-reference table of components, see `.agents/references/style-guide.md`.

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

```mdx
import { TypeScriptExample } from "~/components";

<TypeScriptExample filename="src/index.ts">
```ts
export default {
  async fetch(req, env): Promise<Response> {
    return new Response("Hello World");
  }
} satisfies ExportedHandler<Env>;
```
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

```mdx
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
```
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

<Details header="Advanced configuration">
  Content shown when expanded.
</Details>

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
<GlossaryTooltip term="active-zone" prepend="An ">active zone</GlossaryTooltip>

<!-- With a link on the inner text: -->
<GlossaryTooltip term="active-zone" link="/dns/glossary/">active zone</GlossaryTooltip>
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

Auto-generates a listing of child pages. Standard in `navigation` and `overview` pages.

```mdx
import { DirectoryListing } from "~/components";

<DirectoryListing />
```
