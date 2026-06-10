---
title: Core Content Rules
description: Always load for any MDX file with added content lines.
---

## Writing Style

- If prose contains a contraction (`don't`, `can't`, `won't`, `isn't`, `aren't`, `doesn't`, `didn't`, `hasn't`, `haven't`, `couldn't`, `wouldn't`, `shouldn't`, `it's`, `we're`, `you're`, `they're`, `I'm`, `let's`, `there's`, `that's`, `what's`) → **warning**: remove the contraction. Exception: inside code blocks or backtick spans.
- If prose contains `please` → **warning**: remove it.
- If prose contains directional words (`above`, `below`, `as shown above`, `as noted below`) → **warning**: replace with a direct reference by name or link.
- If prose uses `click` → **suggestion**: replace with `select`.
- If prose uses `navigate to` → **suggestion**: replace with `go to`.
- If prose uses `see the [link]` or `see [link]` → **suggestion**: replace with `refer to [link]`.
- If prose uses `e.g.` → **suggestion**: replace with `for example` or restructure.
- If prose uses `i.e.` → **suggestion**: replace with `that is` or restructure.
- If prose uses `etc.` → **suggestion**: replace with a complete list or `and so on`.
- If prose uses LLM-filler phrases (`Note that`, `It is worth noting that`, `It is important to note that`, `Please note that`, `Keep in mind that`) → **suggestion**: remove the filler and state the fact directly.
- If prose uses passive voice where active voice would be clearer → **suggestion**: rewrite in active voice.
- If a list or sentence has three or more items without an Oxford comma before `and` or `or` → **suggestion**: add the serial comma.
- If prose uses a semicolon to join two independent clauses → **suggestion**: break into two sentences.

---

## Terminology and Product Names

**Warning** for any prose line using these terms incorrectly:

| Correct                   | Incorrect forms                                 |
| ------------------------- | ----------------------------------------------- |
| DDoS                      | DDOS, ddos, Ddos                                |
| Zero Trust                | zero trust, Zero trust                          |
| CAPTCHA                   | Captcha, captcha                                |
| Internet (as proper noun) | internet (when referring to the global network) |
| SSL                       | ssl                                             |
| TLS                       | tls                                             |
| WAF                       | waf                                             |
| Cloudflare Workers        | cloudflare workers, CF Workers                  |
| Workers AI                | workers ai                                      |

**Warning** for any prose line using deprecated jargon:

| Instead of                   | Use                   |
| ---------------------------- | --------------------- |
| whitelist                    | allowlist             |
| blacklist                    | blocklist             |
| master / slave               | primary / replica     |
| man-in-the-middle            | on-path attack        |
| sanity check                 | validate / smoke test |
| out-of-the-box               | default               |
| on-prem                      | on-premises           |
| enable/disable (for toggles) | turn on / turn off    |

- If prose uses `click` for a UI element → **suggestion**: use `select`.
- If an example domain is a real-looking but non-reserved domain (`yourdomain.com`, `mysite.com`) → **suggestion**: use `example.com`, `example.org`, or `myappexample.com` instead.

---

## File Locations

- If an image file is added to `src/content/` → **warning**: images must go in `src/assets/images/{product}/`, not in `src/content/`.

---

## Headings

- If a body heading is a bare `# ` heading (H1) in body content (not frontmatter) → **warning**: the page `title` frontmatter already renders the H1. Change to `##`.
- If a heading skips a level (e.g. H2 directly to H4) → **warning**: heading levels must be sequential.
- If a heading uses title case (multiple capitalized non-proper-noun words) → **suggestion**: use sentence case — capitalize only the first word and proper nouns.
- If a heading ends with `.`, `?`, `!`, or `:` → **warning**: remove trailing punctuation.
- If a heading begins with a verb ending in `-ing` (`Installing`, `Configuring`, `Setting up`) → **warning**: use imperative form instead (`Install`, `Configure`, `Set up`).
- If frontmatter `title:` or `sidebar.label:` contains an emoji → **warning**: remove it.

---

## Formatting

**Bold and Monospace**

- If prose bolds a program or tool name (`**wrangler**`, `**npm**`, `**bun**`) → **warning**: use monospace instead: `` `wrangler` ``, `` `npm` ``, `` `bun` ``.
- If a prose line italicizes `enabled` or `disabled` as toggle states → **warning**: do not italicize toggle states.
- Items that get monospace: IP addresses, port numbers, API commands (`GET`, `POST`), terminal commands, file paths, filenames, config keys, data types, env var names, HTTP headers, HTTP status codes, URLs as input/output, DNS record types.

**Lists**

- If a numbered list is used for non-sequential items → **warning**: use bullet points for unordered items.
- If a bulleted list is used for sequential steps → **warning**: use a numbered list for procedures.
- If a bullet list has fewer than three items → **suggestion**: consider writing as prose instead.

**Tables**

- If a table has no column headers → **warning**: all column headers must be labeled.
- If a table is introduced with a sentence fragment → **warning**: introduce tables with a complete sentence ending in a colon.

**Admonitions**

- Valid types: `:::note`, `:::caution`, `:::tip`.
- If a patch adds more than one admonition of the same type in the same section → **suggestion**: consolidate or integrate the content into prose.
- If an admonition content could be integrated into surrounding prose → **suggestion**: do so rather than using an admonition.

**Numbers**

- If prose uses a single digit (0–9) as a numeral in body text (not a measurement, metric, or UI value) → **suggestion**: spell out: `three options` not `3 options`.
- If prose has a number and unit without a space between them → **warning**: add a space: `128 GB` not `128GB`.
