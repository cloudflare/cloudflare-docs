# Components

## Import rule

All components are imported from `~/components`. Imports must appear **after** the frontmatter block.

```mdx
import { TypeScriptExample, Steps, Details } from "~/components";
```

**Warning:** any `+` line that uses a component without a corresponding import in the patch.

## Mandatory components — do not use bare fences

| Use case | Component | Instead of |
| -------- | --------- | ---------- |
| Workers JS/TS code | `<TypeScriptExample>` | ` ```js ` or ` ```ts ` |
| Wrangler config | `<WranglerConfig>` | ` ```toml ` (for wrangler.toml content) |
| Package install/exec commands | `<PackageManagers>` | bare `npm install`, `yarn add` in code block |
| Multi-step procedures | `<Steps>` | numbered prose without wrapper |
| Dashboard navigation | `<DashButton>` | bare text link to dashboard |

**Warning:** for each of these that appears as a bare fence instead of the required component.

## Component catalog (reference)

| Component | Purpose |
| --------- | ------- |
| `TypeScriptExample` | Workers TS example with auto-generated JS tab |
| `WranglerConfig` | Wrangler config in synced TOML + JSON tabs. Use `$today` for `compatibility_date`. |
| `PackageManagers` | Package install/exec command across npm, yarn, pnpm |
| `Steps` | Visual numbered procedure wrapper |
| `Details` | Collapsible section |
| `FileTree` | File and directory tree display |
| `Tabs` / `TabItem` | Switchable tabs (`syncKey="dashPlusAPI"` or `"workersExamples"`) |
| `Render` | Embed a reusable partial from `src/content/partials/` |
| `Plan` | Plan availability badge |
| `Badge` | Coloured status badge (Beta, New, Deprecated) |
| `LinkButton` | Styled link button |
| `Card` / `LinkTitleCard` / `CardGrid` | Card containers for nav/overview pages |
| `DashButton` | Button linking to a validated dashboard deeplink |
| `GlossaryTooltip` | Hover tooltip from glossary |
| `YouTube` | Embed a YouTube video by ID |
| `Stream` | Embed a Cloudflare Stream video |
| `APIRequest` | Generate a curl command from the OpenAPI schema |

For full props and examples, see `.agents/references/components.md` in the main docs repo.

## `WranglerConfig` usage

Always use `$today` as a placeholder for `compatibility_date`:

```mdx
<WranglerConfig>
```toml
name = "my-worker"
main = "src/index.ts"
compatibility_date = "$today"
```
</WranglerConfig>
```

**Warning:** if a `WranglerConfig` uses a hardcoded date string instead of `$today`.
