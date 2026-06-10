---
title: GitHubCode
description: Rules for the GitHubCode component used to embed files from GitHub.
---

## Rules

- If `<GitHubCode>` uses a branch name instead of a full 40-character commit hash → **warning**: always use a full commit hash to keep the content stable.
- If `<GitHubCode>` has `lang="ts"` and the file contains Workers-style code (imports from `cloudflare:workers`, `hono`, `@cloudflare/`, or exports a `default` handler) → **suggestion**: add `useTypeScriptExample={true}` to get an auto-generated JavaScript tab.

## Example

```mdx
import { GitHubCode } from "~/components";

<GitHubCode
	repo="cloudflare/workers-rs"
	file="templates/hello-world/src/lib.rs"
	commit="ab3951b5c95329a600a7baa9f9bb1a7a95f1aeaa"
	lang="rs"
/>
```

Props: `repo` (`cloudflare/<name>`), `file` (path within repo), `commit` (40-char hash), `lang`, `useTypeScriptExample` (boolean), `lines` (range string e.g. `"1-3"`), `tag` (string), `code` (Expressive Code options).
