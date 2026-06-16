# Information Architecture — Where Content Belongs

Decide where a change lives before you write it. Putting content in the right place — and reusing what already exists — matters as much as the prose.

## File locations

| Content            | Location                              |
| ------------------ | ------------------------------------- |
| Documentation page | `src/content/docs/{product}/`         |
| Reusable partial   | `src/content/partials/{product}/`     |
| Image / asset      | `src/assets/images/{product}/`        |
| Changelog entry    | `src/content/changelog/{product}/`    |
| Glossary terms     | `src/content/glossary/{product}.yaml` |
| Product metadata   | `src/content/products/{product}.yaml` |
| Directory entry    | `src/content/directory/{slug}.yaml`   |

Rules:

- Filenames are lowercase with dashes: `get-started.mdx`, `create-api-token.mdx`.
- Every folder must have an `index.mdx`.
- Only `.mdx`, `.json`, `.yml`, `.yaml`, `.txt` are allowed under `src/content/`. Images must not go there.

## Find the right spot

Before creating a file:

1. **Read the surrounding pages.** Open the product's `index.mdx` and 2–3 sibling pages. Match their structure, depth, and content type.
2. **Check for existing coverage.** Search the docs (and use the `cloudflare-docs` search tool) for the topic. If a page already covers it, edit that page or link to it — do not create a near-duplicate.
3. **Place it in the navigation.** The left-nav order comes from `sidebar.order` in frontmatter (lower = higher). Slot the new page among its siblings by setting an order consistent with neighbors; use `sidebar.label` only when the title is too long for the nav. `hideChildren` collapses a group to its index page.

## Link to the source of truth

Do not re-explain a concept that already has its own page. Link to the canonical page with descriptive, root-relative link text (`/workers/runtime-apis/bindings/`). This keeps content accurate as products change and avoids drift between duplicate explanations.

## Partial vs new page

Extract a **partial** (`src/content/partials/{product}/`, embedded with `Render`) when the same content needs to appear on more than one page — prerequisites, shared setup steps, repeated warnings. Write a **new page** when the content is a standalone topic a reader would navigate to or link to directly. Do not extract a partial for content used in only one place.

## Redirects

If you **rename, move, or delete** a page, add a redirect so existing links keep working. Edit `public/__redirects`:

```
/old/path/ /new/path/ 301
```

Rules that the validator enforces:

- The source URL must end in `/` (or be a `*` wildcard, `.xml`, `.json`, or `.html`).
- No URL fragments (`#section`) in the source.
- No redirect loops, and no chains that could resolve in circles.

After editing, run:

```bash
pnpm exec tsm bin/validate-redirects.ts
```

Adding redirects for renamed/moved files is also a documentation-checklist item on the PR (see `pr.md`).

## New product

When documenting a product that does not exist in the repo yet:

1. Add product metadata to `src/content/products/{product}.yaml`.
2. Add a directory entry under `src/content/directory/`. Every directory file needs a unique 6-character `id` on the first line. **Never hand-write the `id`** — generate it:

   ```bash
   node tools/directory-entry-ids --fix
   ```

3. Create the docs folder with an `index.mdx` (`pcx_content_type: overview`).

Changelog entries also require the product folder to exist under `src/content/products/`.

## Glossary terms

Add reusable term definitions to `src/content/glossary/{product}.yaml`, then surface them with `GlossaryTooltip` / `GlossaryDefinition` inline, or `Glossary` on a dedicated glossary page. Definitions start lowercase unless the term is a proper noun.

## Images

Place images in `src/assets/images/{product}/` and reference them with descriptive alt text. Use screenshots sparingly — they carry a high maintenance cost when the UI changes. See the screenshots and accessibility sections of `.agents/references/style-guide.md` for sizing and alt-text rules.
