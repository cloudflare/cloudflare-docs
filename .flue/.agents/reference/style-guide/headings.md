# Headings and titles

## No H1 in body

The page `title` frontmatter field renders as the H1. Using `# Heading` in the page body creates a second H1.

**Warning:** any `+` line that is a bare `# ` heading (H1) in body content (i.e. not in frontmatter).

## Sequential levels

Heading levels must not skip: H2 → H3 → H4. Never jump from H2 directly to H4.

**Warning:** if the diff introduces a heading that skips a level relative to the preceding heading visible in the patch context.

## Sentence case

Capitalize only the first word and proper nouns. Do not capitalize every word.

**Suggestion:** any `+` heading that appears to use title case (multiple capitalized non-proper-noun words).

## No trailing punctuation

Headings must not end with `.`, `?`, `!`, or `:`.

**Warning:** any `+` heading that ends with punctuation.

## No gerund phrases

Use imperative ("Install Wrangler") not gerund ("Installing Wrangler").

**Warning:** any `+` heading that begins with a verb ending in `-ing` (e.g. "Installing", "Configuring", "Setting up").

## No questions or calls to action

Headings must be noun or verb phrases — never a question or call to action.

**Suggestion:** any `+` heading phrased as a question (ending with `?`) or that starts with "How to" or "How do".

## No emojis in title or sidebar.label

**Warning:** any `+` frontmatter `title:` or `sidebar.label:` value that contains an emoji.
