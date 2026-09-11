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
| Product metadata   | `src/content/directory/{slug}.yaml`   |

Rules:

- Filenames are lowercase with dashes: `get-started.mdx`, `create-api-token.mdx`.
- Every folder must have an `index.mdx`.
- Only `.mdx`, `.json`, `.yml`, `.yaml`, `.txt` are allowed under `src/content/`. Images must not go there.

## Follow the canonical product structure

Use the [Information architecture](/style-guide/documentation-content-strategy/information-architecture/) page as the source of truth. Existing product structures do not override it.

Every product requires:

- An Overview at the product root `index.mdx`.
- A `get-started/` folder that takes a new user to a first working result.

Product-specific and category-shared sections are additive. Their names must be clear and distinct from the core section names. They must not replace, rename, or reshape a core section. If the canonical structure does not fit, raise the issue through docs governance instead of changing the core locally.

## Find the right spot

Before creating a file:

1. **Read the surrounding pages.** Open the product's `index.mdx` and 2–3 sibling pages. Match their voice, depth, and page-level conventions. Compare their folders and ordering against the canonical structure; do not copy outdated local information architecture.
2. **Check for existing coverage.** Search the docs (and use the `cloudflare-docs` search tool) for the topic. If a page already covers it, edit that page or link to it — do not create a near-duplicate.
3. **Place it in the navigation.** The left-nav order comes from `sidebar.order` in frontmatter (lower = higher). Slot the new page among its siblings by setting an order consistent with neighbors; use `sidebar.label` only when the title is too long for the nav. `hideChildren` collapses a page's children. `sidebar.group.hideIndex` hides the group's index page while retaining its children.

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

Adding redirects for renamed/moved files is also a documentation-checklist item on the pull request or merge request (see the `pr-mr` skill).

## Migrate an existing product

Audit the product against the canonical structure, then:

1. Confirm that the product has an Overview, Get started, and nonempty Platform section.
2. Rename nonstandard core folders to their standard names.
3. Convert loose core pages into folders with an `index.mdx`.
4. Move misplaced core content into the corresponding top-level core folder.
5. Add applicable missing core sections and order them canonically.
6. Keep product-specific sections only when they are uniquely named and additive.
7. Add redirects for every changed route and update affected internal links.
8. Update sidebar ordering and navigation metadata.
9. Run the standard content checks and redirect validation.

## New product

When documenting a product that does not exist in the repo yet:

1. Add a directory entry under `src/content/directory/{slug}.yaml`. Every directory file needs a unique 6-character `id` on the first line. **Never hand-write the `id`** — generate it:

   ```bash
   node tools/directory-entry-ids --fix
   ```

2. Create the docs folder with an `index.mdx` (`pcx_content_type: overview`).
3. Add a `get-started/` folder.
4. Add folders for the remaining applicable core sections in canonical order, including a nonempty `platform/` folder.
5. Add clearly named product-specific or category-shared sections only after the core sections.

Changelog entries require the changelog folder name to match a directory entry's collection ID: the filename stem under `src/content/directory/`, not the six-character `id` field inside the YAML file.

## Glossary terms

Add reusable term definitions to `src/content/glossary/{product}.yaml`, then surface them with `GlossaryTooltip` / `GlossaryDefinition` inline, or `Glossary` on a dedicated glossary page. Definitions start lowercase unless the term is a proper noun.

## Images

Place images in `src/assets/images/{product}/` and reference them with descriptive alt text. Use screenshots sparingly — they carry a high maintenance cost when the UI changes. See the screenshots and accessibility sections of `.agents/references/style-guide.md` for sizing and alt-text rules.
