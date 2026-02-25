# Content Reuse Rules

Check whether new or modified content duplicates existing pages, partials, or glossary entries. Flag overlap so authors reuse what exists instead of rewriting it.

## Where to Search

- `src/content/partials/{product}/` — product-specific partials
- `src/content/partials/` — all product partials (for cross-product reuse)
- `src/content/glossary/*.yaml` — canonical term definitions
- `src/content/docs/{product}/` — existing pages in the same product, then other products

## Search Methodology

1. **Start narrow.** Search the same product's docs and partials first.
2. **Go broad.** If nothing found, search across all products.
3. **Use term variations.** A concept may appear under different names ("rate limiting" vs "throttling", "DNS records" vs "resource records").
4. **Check common patterns first.** These are the most frequently duplicated:
   - Prerequisites / requirements — search partials for `prereq`, `requirements`, `before-you-begin`
   - Authentication / API setup — search for `auth`, `api-token`, `api-key`
   - Dashboard navigation steps — search for `dashboard`, `navigate`
   - Warnings / caveats — search for `limitations`, `beta`, `plan`
   - Configuration examples — search for the specific parameter names

## Reuse Decision Table

| What was found                              | Action                                                              |
| ------------------------------------------- | ------------------------------------------------------------------- |
| A partial covers the concept                | Use `<Render file="..." product="..." />` instead of rewriting      |
| A page covers the concept                   | Link to it — do not rewrite the explanation                         |
| A glossary entry defines the term           | Use `<GlossaryTooltip term="...">` instead of defining inline      |
| Another product has the same content        | Extract into a shared partial or cross-link                         |
| A similar but distinct topic exists         | Cross-link and note the difference — do not duplicate overlap       |

## Red Flags

| Pattern                                                    | What to do                                                  |
| ---------------------------------------------------------- | ----------------------------------------------------------- |
| New page title is very similar to an existing page         | Flag — the content likely already exists                    |
| Content configures a feature belonging to another product  | Link to the other product's docs instead of rewriting       |
| Content explains a concept that has its own dedicated page | Link to the existing page or use a partial                  |
| Prerequisite steps that feel generic                       | Search partials before writing                              |
| A term is defined in a paragraph                           | Check `src/content/glossary/` first                         |
| Text looks copied from another page                        | Search for the source, suggest a partial or link            |

## Severity Mapping

Use the same severity levels as `content-rules.md`:

- **HIGH** — New page duplicates an existing page (same topic, same product). This creates a second source of truth.
- **MEDIUM** — Content could use an existing partial or glossary term but rewrites it instead.
- **LOW** — Cross-product overlap or missed cross-linking opportunity.
