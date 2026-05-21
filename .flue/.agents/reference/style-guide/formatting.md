# Formatting

## Bold and monospace

| Element | Convention |
| ------- | ---------- |
| Clickable UI elements, menu items, button labels | **Bold**: select **Save**, go to **DNS** > **Records** |
| Code, paths, IPs, ports, HTTP verbs, filenames, config keys | `monospace` |
| Dropdown options the user selects *from* | *Italics* |

Things that get monospace: IP addresses, port numbers, API commands (`GET`, `POST`), terminal commands (`wrangler login`), file paths, filenames and extensions (`wrangler.toml`), config keys, data types (`string`, `int64`), env var names, HTTP headers (`Content-Length`), HTTP status codes (`400`), URLs used as input/output, DNS record types (`AAAA`).

**Warning:**
- Program or tool names bolded instead of monospace: **wrangler**, **npm**, **bun** should be `wrangler`, `npm`, `bun`
- Toggle states italicized: "enabled" and "disabled" should not be italicized

## Lists

Use numbered lists for **procedures** (sequential steps). Use bullet points for **facts, options, or unordered items**.

**Warning:** a numbered list used for non-sequential items, or a bulleted list used for sequential steps.

**Suggestion:**
- Bullet list with fewer than three items (write a sentence instead)
- Bullets that are not grammatically parallel

## Tables

- All column headers must be labeled. Use sentence case. No punctuation at end of headers.
- Introduce tables with a full sentence ending in a colon.
- Do not embed a table mid-sentence.
- Use `—` (em dash) for empty cells.

**Warning:** a table with no column headers, or a table introduced with a fragment.

## Admonitions

```mdx
:::note[Optional header]
Supplementary context.
:::

:::caution[Optional header]
Actions that could cause issues or data loss.
:::

:::tip[Optional header]
Best practices and opinionated recommendations.
:::
```

Rules:
- Use `note` for supplementary info that cannot be integrated into prose.
- Use `caution` for actions that could break functionality or impact security.
- Use `tip` for best practices or opinionated recommendations.
- Keep admonitions short: no more than ~3 paragraphs or 3 bullet items.
- No more than one admonition of the same type per section.

**Suggestion:** an admonition that seems to be overused or whose content could be integrated into prose.

## Numbers

- Spell out whole numbers zero through nine in body text. Use digits for 10 and above.
- Use numerals for metrics, measurements, and UI values.
- Always include a space between a number and its unit: `128 GB`, `30 Tbps`.

**Suggestion:** a digit (0–9) written as a numeral in body prose where the style guide says to spell it out (e.g. "3 options" → "three options"), unless it is a measurement, metric, or UI value.

## Punctuation

- **Oxford comma:** Use in lists of three or more (see `writing.md`).
- **Em dash** ( — ) with spaces on both sides.
- **Semicolons:** Avoid — break into shorter sentences.
- **Dates:** Use ISO 8601 (`YYYY-MM-DD`). Avoid time-bound content (specific dates in general text become stale).

**Suggestion:** a semicolon used to join two independent clauses where a period would be cleaner.
