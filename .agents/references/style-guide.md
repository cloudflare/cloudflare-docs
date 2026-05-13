# Cloudflare Docs Style Guide — Agent Reference

Prescriptive rules for writing and reviewing content in this repository. Distilled from the full style guide at `src/content/docs/style-guide/`. When in doubt, the source pages are the authority.

---

## MDX syntax gotchas

These characters have special meaning in MDX and **will break the build** if used unescaped in prose, tables, or headings:

| Character | Problem | Fix |
| --------- | ------- | --- |
| `{` `}` | Interpreted as JS expressions | Wrap in backticks or use `\{` `\}` |
| `<` `>` | Interpreted as JSX elements | Use `&lt;` `&gt;` or wrap in backticks |

Component imports must appear after the frontmatter block. A used-but-not-imported component is a silent build failure.

---

## Frontmatter

### Required fields

| Field | Rule |
| ----- | ---- |
| `title` | Required. Plain text. |
| `pcx_content_type` | Required. Must be one of the valid values below. |
| `description` | Required for all pages with `pcx_content_type`. 1–2 self-contained sentences, 50–160 characters. |

Valid `pcx_content_type` values: `changelog`, `concept`, `configuration`, `design-guide`, `example`, `faq`, `get-started`, `how-to`, `integration-guide`, `implementation-guide`, `learning-unit`, `navigation`, `overview`, `reference`, `reference-architecture`, `reference-architecture-diagram`, `release-notes`, `solution-guide`, `troubleshooting`, `tutorial`, `video`.

### Optional fields

| Field | Type | Description |
| ----- | ---- | ----------- |
| `sidebar.order` | number | Sort order in the left nav. Lower = higher. |
| `sidebar.label` | string | Override the nav label (defaults to `title`). |
| `sidebar.hidden` | boolean | Hide from nav but keep the page accessible. |
| `products` | array | Related directory entries by filename from `src/content/directory/`. |
| `tags` | array | Related keywords. Validated against allowlist in `src/schemas/tags.ts` — invalid tags fail the build. |
| `difficulty` | string | For tutorials: `Beginner`, `Intermediate`, or `Advanced`. Shown in tutorial listings. |
| `reviewed` | string | `YYYY-MM-DD` of last explicit end-to-end review. |
| `summary` | string | Short description rendered below the page title on the page itself. |
| `noindex` | boolean | Adds `noindex` to the page — use for deprecated/legacy content. |
| `chatbot_deprioritize` | boolean | De-prioritizes the page in Support AI responses. Companion to `noindex`. |
| `canonical` | string | Override the `<link rel="canonical">` URL. |
| `hideChildren` | boolean | Collapses this nav group to a single link to the index page. |
| `feedback` | boolean | Show/hide the feedback prompt. Defaults to `true`. |

Example:

```yaml
---
title: Create a Cloudflare Tunnel
pcx_content_type: how-to
description: Create a Cloudflare Tunnel to securely connect your private network to Cloudflare without exposing a public IP address.
products:
  - cloudflare-tunnel
sidebar:
  order: 2
difficulty: Beginner
reviewed: 2025-01-15
tags:
  - Tunnel
---
```

---

## Writing style

- **Active voice, present tense.** Passive voice obscures the actor and dates content quickly.
- **No contractions.** Write "do not", "cannot", "will not" — never "don't", "can't", "won't".
- **Sentence length: 8–12 words.** One sentence = one idea.
- **Imperative mood for procedures.** Start steps with a verb: "Select", "Run", "Go to".
- **Plain language.** Avoid obscure words and jargon. Define acronyms on first use.
- **Objective first, then action.** "To create a tunnel, run..." not "Run this command to create a tunnel."
- **Avoid LLM-filler phrases.** Do not use "It's important to note", "leverage", "seamless", "dive into", "straightforward", or similar.
- Replace `e.g.` with "for example" and `i.e.` with "that is". Never use `etc.` — rewrite or list items explicitly.
- Do not use "please" in instructions.
- Do not use directional language ("above", "below", "on the right") — reference elements by name instead.
- No emojis in page titles, headings, or sidebar labels.

### Abbreviations and acronyms

Spell out on first use, then use the abbreviation consistently: "Transport Layer Security (TLS)".

Acronyms that rarely need spelling out: API, DVD, HTML, PDF, PC, RAM, REST, URL, USB, and units of measure (MB, GB).

Do not use periods in acronyms or initialisms: `TLS`, `VPN`, not `T.L.S.`, `V.P.N.`

Do not use Internet slang: no `tl;dr`, `IMO`, `FYI`.

### Jargon to avoid

| Instead of | Use |
| ---------- | --- |
| whitelist / blacklist | allowlist / blocklist |
| master / slave | primary / replica (or context-specific terms) |
| man-in-the-middle attack | on-path attack |
| sanity check | validate / smoke test |
| enable / disable (toggle) | turn on / turn off |
| out-of-the-box | default |
| on-prem | on-premises |

### Inclusive language

Do not use racist, gendered, or ableist terminology. Use gender-neutral pronouns (they/them) for hypothetical actors. Avoid metaphors referencing mental health ("crazy", "insane"). Avoid gendered terms for hardware or software ("she", "he").

---

## Terminology and UI interactions

| Use | Not |
| --- | --- |
| select | click |
| go to | navigate to |
| turn on / turn off | enable / disable |
| refer to | see |

---

## Text formatting

| Element | Convention |
| ------- | ---------- |
| Clickable UI elements, menu items, button labels | **Bold**: select **Save**, go to **DNS** > **Records** |
| Code, paths, IPs, ports, HTTP verbs, status codes, filenames, config keys | `monospace` |
| Dropdown options the user selects *from* | *Italics* |
| Nested menu separators | **Bold** the words, plain `>` symbol: **Options** > **Settings** |

Things that get monospace: IP addresses and ranges, port numbers, API commands (`GET`, `POST`), terminal commands (`wrangler login`), file paths, filenames and extensions (`wrangler.toml`), config keys, data types (`string`, `int64`), environment variable names, HTTP headers (`Content-Length`), HTTP status codes (`400`, `200`), URLs used as input/output, DNS record types (`AAAA`).

Do not bold program or tool names — `wrangler` and `npm` are monospace, not **bold**.

Do not use italics for toggle states — "enabled" and "disabled" should not be italicized.

---

## Capitalization

- Cloudflare product and feature names are capitalized: **Cloudflare Workers**, **Cloudflare WAF**, **Waiting Room**, **Zero Trust**.
- Generic technology concepts are lowercase: "load balancing", "web application firewall", "bot management".
- **Internet** is capitalized. **cloud** is lowercase.
- Headings use sentence case — capitalize only the first word and proper nouns.

Common terms:

| Correct | Incorrect |
| ------- | --------- |
| DDoS | DDOS, ddos |
| SSL | ssl |
| TLS | tls |
| WAF | waf |
| CAPTCHA | Captcha, captcha |
| Zero Trust | zero trust |
| Internet | internet |

---

## Links

- Use **root-relative paths**: `/workers/get-started/` — never `https://developers.cloudflare.com/workers/get-started/`
- No file extensions: `/workers/get-started/` — not `/workers/get-started.mdx`
- No relative links: `./page` is not supported
- Trailing slash required: `/workers/get-started/` — not `/workers/get-started`
- Descriptive link text — never "here", "this page", "read more", "click here"

Standard phrasing:
- `For more information, refer to [Page Title](/path/).`
- `To <do something>, refer to [Section Title](/path/).`

Do not use: "Learn more about...", "To read more...", "refer the [Page] page/documentation".

---

## Headings and titles

- Sentence case only — capitalize the first word and proper nouns, nothing else.
- Sequential levels — H2 → H3 → H4, never skip a level.
- No H1 in body content — the page `title` frontmatter renders as H1.
- Do not end headings with punctuation.
- Do not use gerund phrases for page titles or section headings: "Install Wrangler" not "Installing Wrangler".
- Subtitles/subheadings must be verb or noun phrases — never a question ("How do I install Wrangler?") or a call to action.
- Do not use emojis in `title` or `sidebar.label`.

---

## Lists

Use numbered lists for **procedures** (sequential steps). Use bullet points for **facts, data, or options** (unordered).

Do not use bullet points for:
- Processes or steps (use a numbered list)
- Fewer than three items (write a sentence instead)
- Items longer than three lines each (break into subsections)

Bullet point rules:
- All items in a list must be parallel (same grammatical form).
- Do not punctuate bullets unless each item is a full sentence.
- Aim for 3–6 items; the "six-pack rule" — no more than six bullets, each six words or fewer, is a good default.
- Start each bullet with the most important word.

---

## Tables

- Label all column headers. Use sentence case. No punctuation at end of headers.
- Avoid merged cells — they break screen reader navigation.
- Introduce with a full sentence ending in a colon, then the table. Do not embed a table mid-sentence.
- Do not use tables to format a page — tables are for relational data.
- Sort rows logically; use alphabetical order when no logical order exists.
- Use `—` (em dash) for empty cells.

## Punctuation

- **Oxford comma.** Use in lists of three or more: "Workers, KV, and R2" not "Workers, KV and R2".
- **Em dash** ( — ) with spaces on both sides, to break up thoughts: "Cloudflare protects your site — and your users."
- **Hyphen** (-) for compound modifiers before a noun: "enterprise-class WAF". No hyphen after the noun: "Our WAF is enterprise class."
- **Semicolons.** Avoid. Break into shorter sentences instead.
- **Quotation marks.** Use straight (`"`) not curly (`""`). Avoid possessives for inanimate objects ("the device address" not "the device's address").
- **Colons.** Use to introduce lists, tables, and images. Always precede with a full sentence.
- **Dates.** Use ISO 8601 (`YYYY-MM-DD`) in docs. Avoid time-bound content (specific dates, months, years in general text) — it becomes stale.

---

## Numbers

- Spell out whole numbers zero through nine in body text. Use digits for 10 and above.
- Use numerals for metrics, measurements, and UI values — always match what appears in the UI exactly.
- Use commas for numbers with more than three digits: `1,000`, `7,465`.
- Always include a space between a number and its unit: `128 GB`, `30 Tbps`, `4 KB`.
- Unit symbols do not change in the plural: `10 m`, not `10 ms`.

---

## Code blocks

Always specify a language after the opening fence. Language names must be **lowercase**.

Supported languages: `bash` (alias: `curl`), `c`, `css`, `dart`, `diff`, `go`, `graphql`, `hcl` (alias: `tf`), `html`, `ini`, `java`, `js` (alias: `javascript`), `json`, `jsonc`, `kotlin`, `mdx`, `php`, `powershell`, `python` (alias: `py`), `ruby` (alias: `rb`), `rust` (alias: `rs`), `sh` (alias: `shell`), `sql`, `swift`, `toml`, `ts` (alias: `typescript`), `txt` (aliases: `text`, `plaintext`), `xml`, `yaml` (alias: `yml`).

Use `txt` for unsupported languages (e.g., output blocks, Apache config fragments). Do not use `output`, `env`, `csharp`, or `promql` — they fall back to `txt` with a warning.

### Terminal commands

- Do not prefix commands with `$`, `%`, `PS>`, or similar — the copy button copies verbatim.
- Use `sh` or `bash` for Linux/macOS commands.
- Use `powershell` for Windows PowerShell.
- Use `txt` for Windows console commands.

### Showing command output

Place a second code block immediately after the command block and add the `output` suffix to its language:

````
```sh
npx wrangler vectorize create tutorial-index --dimensions=3 --metric=cosine
```

```txt output
✅ Successfully created index 'tutorial-index'
```
````

### Line breaks

Use `<br/>`, never two trailing spaces.

### Cloudflare-specific component conventions

Workers JS/TS examples must use `TypeScriptExample` — not bare `js`/`ts` fences.

Wrangler config must use `WranglerConfig` with TOML input. Use `$today` for `compatibility_date`.

Package install commands must use `PackageManagers`.

---

## Components

All components are imported from `~/components`. Imports must appear after the frontmatter block.

**Mandatory component usage** — do not use bare fences for these:
- Workers JS/TS examples → `TypeScriptExample`
- Wrangler config → `WranglerConfig` (TOML input, use `$today` for `compatibility_date`)
- Package install/exec commands → `PackageManagers`
- Multi-step procedures → `Steps`
- Dashboard navigation steps → `DashButton` (not bare links)

| Component | Purpose |
| --------- | ------- |
| `Render` | Embed a reusable partial from `src/content/partials/{product}/{file}.mdx` |
| `TypeScriptExample` | Workers TS example with auto-generated JS tab |
| `WranglerConfig` | Wrangler config in synced TOML + JSON tabs |
| `PackageManagers` | Package install/exec command across npm, yarn, pnpm |
| `WranglerCLI` | Wrangler command invocation wrapped in `PackageManagers` |
| `WranglerCommand` | Auto-generated full Wrangler command reference |
| `WranglerNamespace` | Auto-generated Wrangler namespace command listing |
| `Tabs` / `TabItem` | Switchable tabs (`syncKey="dashPlusAPI"` or `"workersExamples"`) |
| `Steps` | Visual numbered procedure wrapper |
| `Details` | Collapsible section for supplementary content |
| `FileTree` | File and directory tree display |
| `Width` | Constrain content to `"large"` (75%), `"medium"` (50%), or `"small"` (25%) width |
| `Plan` | Plan availability badge (`type="all"`, `"paid"`, `"pro"`, `"business"`, `"add-on"`) |
| `FeatureTable` | Feature availability by plan from `src/content/plans/` (dot-notation `id`) |
| `ProductFeatures` | Full feature list for a product from `src/content/plans/` |
| `ProductChangelog` | Inline changelog entries for a product or area |
| `ProductAvailabilityText` | Inline lifecycle status (Beta, Alpha) — renders nothing for GA |
| `Feature` | Feature card for product overview pages |
| `RelatedProduct` | Related product card with icon for overview pages |
| `GlossaryTooltip` | Hover tooltip from `src/content/glossary/` |
| `GlossaryDefinition` | Inline glossary definition |
| `Glossary` | Full product glossary table |
| `InlineBadge` | Inline status badge — **avoid**, prefer `Badge` in headings or sidebar frontmatter |
| `Badge` | Coloured status badge (`Beta`, `New`, `Deprecated`) for headings and sidebar |
| `LinkButton` | Styled link button (`variant="primary"`, `"secondary"`, `"minimal"`) |
| `Card` / `LinkTitleCard` / `ListCard` | Styled card containers for overview and navigation pages |
| `LinkCard` / `CardGrid` | Starlight link cards, optionally in a grid |
| `DashButton` | Button linking to a validated dashboard deeplink |
| `GitHubCode` | Fetch and display a file from a Cloudflare GitHub repo (use full commit hash) |
| `DirectoryListing` | Auto-generated child page listing for nav/overview pages |
| `ListTutorials` | Auto-generated tutorial table for the current product |
| `ResourcesBySelector` | Filterable list of pages by `pcx_content_type`, tags, or products |
| `ExternalResources` | Demo apps or videos from central YAML collections, filtered by tags/products |
| `PublicStats` | Inline live statistic (data centers, bandwidth, etc.) |
| `YouTube` | Embed a YouTube video by ID |
| `YouTubeVideos` | Grid of YouTube videos for a product from `src/content/videos/` |
| `Stream` | Embed a Cloudflare Stream video by ID or collection file |
| `APIRequest` | Generate a `curl` command from the Cloudflare OpenAPI schema |
| `CURL` | Generate a `curl` command for arbitrary URLs |
| `PagesBuildPreset` | Pages framework build preset details |
| `RuleID` | Copyable rule ID (WAF / security rules) |
| `SubtractIPCalculator` | Interactive IP range subtraction calculator |
| `AvailableNotifications` | List available notification types for a product |
| `AnchorHeading` | Heading with custom anchor ID — for use inside components/non-MDX files |
| `Description` | Description block rendered below the page title |
| `Markdown` | Render a Markdown string inside JSX — primarily for formatted partial variables |

For full props, examples, and edge cases, see `.agents/references/components.md`.

---

## Admonitions

```mdx
:::note[Optional header]
For supplementary context that is not essential to the main flow. Defaults to "Note".
:::

:::caution[Optional header]
For actions that could cause issues or data loss. Defaults to "Warning".
:::

:::tip[Optional header]
For best practices or opinionated recommendations outside the main content. Defaults to "Tip".
:::
```

Usage rules:
- Use `note` for supplementary info that cannot be integrated into prose.
- Use `caution` for actions that could break functionality or impact security.
- Use `tip` for best practices and opinionated recommendations.
- Use a `note` (no header) at the top of a page to state restricted plan availability: "Only available on Enterprise plans."
- Keep admonitions short: no more than ~3 paragraphs or 3 bullet items. If you need more, create a dedicated section.
- No more than one admonition of the same type per section.
- Do not add a header to admonitions inside numbered step instructions — the background color is sufficient.
- Use admonitions sparingly overall. If most of a page is wrapped in them, restructure the content.

---

## Procedures

Wrap steps in `Steps`. State location before action, purpose before action. Consolidate login + navigation into step one. Write "log in to" not "log into". Prefix optional steps with "(Optional)". No directional language, no "please", no keyboard shortcuts.

For full rules see `.agents/references/procedures.md`.

---

## File conventions

- Filenames: lowercase, words separated by dashes: `get-started.mdx`, `api-shield-call-sequence.png`.
- Every folder must have an `index.mdx`.
- Docs pages: `src/content/docs/{product}/`
- Partials: `src/content/partials/{product}/`
- Images: `src/assets/images/{product}/` — images must not go in `src/content/`
- Changelogs: `src/content/changelog/{product}/`
- Allowed file types in `src/content/`: `.mdx`, `.json`, `.yml`, `.yaml`, `.txt` only. CI rejects everything else.

---

## Screenshots and images

Use screenshots sparingly — they have a high maintenance cost because UI changes require re-taking them. Use them when the task is simple but confusing to describe with words, especially for new users unfamiliar with dashboard navigation.

Exception: use screenshots freely in changelog entries (accepted as point-in-time references).

Guidelines:
- Maintain original aspect ratio.
- Width 500–600 px, resolution 72 dpi.
- Do not include sensitive information (redact if needed).
- Avoid including the sidebar navigation (it changes frequently).
- Always provide descriptive alt text.

```mdx
![Cloudflare dashboard showing the DNS records page with an A record highlighted](~/assets/images/dns/dns-records.png)
```

Alt text rules:
- Describe what the image shows and why it matters (under ~150 characters).
- Do not start with "Image of" or "Screenshot of".
- For purely decorative images, use empty alt text: `![]()`.
- For functional images (button icons), describe the action, not the appearance.
- Do not repeat adjacent caption text in alt text.
- Do not stuff with keywords.

In diagrams: do not use color as the only way to distinguish elements — also use labels, shapes, or patterns.

---

## Accessibility

- Do not use directional language ("see above", "on the right") — reference elements by name.
- Do not use color as the only way to distinguish elements in diagrams — add labels or shapes.
- Place prerequisite information before steps.
- Provide context before code examples explaining what the code does.

---

## Example values

Use these reserved values in examples — they are safe and will not resolve to live origins:

| Type | Values |
| ---- | ------ |
| Domains | `example.com`, `example.org`, `myappexample.com` |
| IPv4 ranges | `192.0.2.0/24`, `198.51.100.0/24`, `203.0.113.0/24` |
| URL placeholders | `<YOUR_DOMAIN>`, `<ZONE_ID>`, `<ACCOUNT_ID>` |
| API shell variables | `$ZONE_ID`, `$CLOUDFLARE_API_TOKEN` (in curl blocks) |

Use angle brackets with `ALL_CAPS_UNDERSCORES` for variable placeholders in non-API contexts. In API examples (curl blocks, `APIRequest` component), use `$VARIABLE_NAME` shell variable format.
