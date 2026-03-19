# Starlight Patches

This file documents every `patch-package` patch applied to Starlight and explains
why each one exists, what it does, and where its effects are visible.

Patches live in `patches/` and are applied automatically via the `postinstall`
hook in `package.json` (`npx patch-package`).

---

## `patches/@astrojs+starlight+0.36.0.patch`

Three hunks against three different files in `node_modules/@astrojs/starlight`.

### Hunk 1 — `components/SidebarSublist.astro`: Sidebar entry icons

**Why it exists:** Starlight has no native API for attaching a per-item icon to a
sidebar entry. We need it for one entry in the Pages sidebar: "Migrate to Workers"
(`src/content/docs/pages/migrate-to-workers.mdx`), which displays an animated
Lottie sparkle icon (✨) tinted orange to draw attention to the migration path.

**What the patch does:**

```diff
-<span>{entry.label}</span>
+<span>{entry.icon && <SidebarIcon {...entry.icon} />}{entry.label}</span>
```

It imports `~/components/SidebarIcon.astro` at the top of `SidebarSublist.astro`
and renders it before the label text whenever `entry.icon` is set.

**`SidebarIcon.astro`** (`src/components/SidebarIcon.astro`) renders a
`DotLottieWorkerReact` component from `@lottiefiles/dotlottie-react`. It accepts
two props (defined in `SidebarIconSchema` at `src/schemas/types/sidebar.ts`):

| Prop         | Type                   | Description                                                               |
| ------------ | ---------------------- | ------------------------------------------------------------------------- |
| `lottieLink` | `string`               | URL of the `.lottie` or Lottie JSON animation                             |
| `color`      | `"primary"` (optional) | Tints the animation orange (`--orange-accent-200`) via a CSS filter chain |

The animation renders at 17×17 px, floated left with `marginRight: 0.5em`, inline
before the sidebar label. It loops and autoplays (`client:load`).

**Where `icon` comes from:** The sidebar generation logic in `src/util/sidebar.ts`
attaches an `icon` to a sidebar entry in two places:

- `handleGroup` (line 211): reads `sidebar.group.icon` from the index page
  frontmatter, falling back to the top-level `icon` field.
- `handleLink` (line 308): when a page has `external_link` set, the top-level
  `icon` frontmatter field is passed onto the resulting link entry.

**Current usage:** Only one page sets an icon:

```yaml
# src/content/docs/pages/migrate-to-workers.mdx
external_link: /workers/static-assets/migrate-from-pages/
icon:
  lottieLink: https://fonts.gstatic.com/s/e/notoemoji/latest/2728/lottie.json
  color: primary
```

This produces an animated sparkle icon next to "Migrate to Workers ↗" in the Pages
sidebar. You can see it at [/pages](https://developers.cloudflare.com/pages/) in the
left sidebar. No pages currently use `sidebar.group.icon`.

---

### Hunk 3 — `user-components/Tabs.astro`: Injectable icon component

**Why it exists:** Starlight's `Tabs.astro` hard-codes its `Icon` component with no
override point. This patch adds an escape hatch for callers that need to supply a
custom icon renderer. It is currently used by two Workers pages that pass
`IconComponent={Icon}` explicitly:

- `src/content/docs/workers/platform/infrastructure-as-code.mdx`
- `src/content/docs/workers/static-assets/direct-upload.mdx`

**What the patch does:**

```diff
+IconComponent?: typeof Icon;
-const { syncKey } = Astro.props;
+const { syncKey, IconComponent = Icon } = Astro.props;
 ...
-{icon && <Icon name={icon} />}
+{icon && <IconComponent name={icon} />}
```

It adds an optional `IconComponent` prop that defaults to the built-in `Icon`.
Callers that need a custom icon renderer can pass their own component.

---

## `patches/@astrojs+starlight-docsearch+0.6.0.patch`

Two hunks against two files in `node_modules/@astrojs/starlight-docsearch`.

### Hunk 1 — `DocSearch.astro`: Keyboard shortcut hint UI

**Why it exists:** We disable the `/` keyboard shortcut in DocSearch (routing it to
the sidebar search input instead). DocSearch's original button always rendered a `/`
slash SVG icon in its key hint area. After disabling `/`, the hint was blank.

**What the patch does:**

- Replaces the static CSS slash-icon rule with styled `<kbd>`-style key badges
  (`Ctrl K`) using Starlight CSS variables for consistent theming.
- Moves the original slash SVG CSS into a JS conditional: it only injects the slash
  icon styles at runtime if `/` is enabled **and** `Ctrl/Cmd+K` is disabled — i.e.
  exactly when the slash is the only shortcut shown.

### Hunk 2 — `index.ts`: Schema extension for `keyboardShortcuts`

**Why it exists:** The `keyboardShortcuts` option is passed to DocSearch at runtime
but was missing from the Zod config schema, causing a type error.

**What the patch does:** Adds `keyboardShortcuts` to the `DocSearchConfigSchema`:

```ts
keyboardShortcuts: z.object({
	"Ctrl/Cmd+K": z.boolean().optional(),
	"/": z.boolean().optional(),
}).optional();
```

This matches the [DocSearch API](https://docsearch.algolia.com/docs/api/#keyboardshortcuts)
and makes the option type-safe. Our configuration disables `/` and keeps
`Ctrl/Cmd+K` enabled (set in `src/plugins/docsearch/index.ts`).

---

## Upgrade notes

Both patch files are pinned to exact package versions
(`starlight@0.36.0`, `starlight-docsearch@0.6.0`). When upgrading either package:

1. Manually re-apply the changes described above to the new version.
2. Run `npx patch-package @astrojs/starlight` (or `@astrojs/starlight-docsearch`)
   to regenerate the patch file.
3. Update the version number in the patch filename to match the new version.
