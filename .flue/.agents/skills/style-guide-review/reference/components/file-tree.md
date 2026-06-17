---
title: FileTree
description: Rules for the FileTree Starlight component.
---

## Rules

- If the current file being highlighted is not shown in bold → **suggestion**: use bold to highlight the current file in a `<FileTree>`.

## Example

```mdx
import { FileTree } from "~/components";

<FileTree>- src/ - index.ts - **worker.ts** - wrangler.toml</FileTree>
```
