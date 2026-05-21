# MDX syntax

## Build-breaking characters

These characters have special meaning in MDX and **will break the build** if used unescaped in prose, tables, or headings:

| Character | Problem                       | Fix                                    |
| --------- | ----------------------------- | -------------------------------------- |
| `{` `}`   | Interpreted as JS expressions | Wrap in backticks or use `\{` `\}`     |
| `<` `>`   | Interpreted as JSX elements   | Use `&lt;` `&gt;` or wrap in backticks |

**Warning:** any `+` line that contains `{`, `}`, `<`, or `>` in prose, table cells, or heading text that is not:
- Inside a code fence or backtick span
- A valid JSX/MDX component tag
- An escaped entity (`&lt;`, `&gt;`)

## Component imports

All components must be imported from `~/components`. Imports must appear **after** the frontmatter block, before any prose.

A used-but-not-imported component is a **silent build failure** — the component renders nothing.

**Warning:** any `+` line that uses a component (e.g. `<TypeScriptExample>`, `<Steps>`, `<Details>`) if the patch does not include a corresponding import.

Common import pattern:
```mdx
import { TypeScriptExample, Steps, Details } from "~/components";
```

## Allowed file types

Only `.mdx`, `.json`, `.yml`, `.yaml`, `.txt` files are allowed in `src/content/`. CI rejects everything else.
Images go in `src/assets/images/{product}/` — never in `src/content/`.
