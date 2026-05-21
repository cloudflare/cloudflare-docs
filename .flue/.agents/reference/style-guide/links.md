# Links

## Root-relative paths

Always use root-relative paths for internal links. Never use the full `https://developers.cloudflare.com/...` URL.

| Correct | Incorrect |
| ------- | --------- |
| `/workers/get-started/` | `https://developers.cloudflare.com/workers/get-started/` |
| `/workers/get-started/` | `./get-started` or `../workers/get-started` |
| `/workers/get-started/` | `/workers/get-started` (missing trailing slash) |
| `/workers/get-started/` | `/workers/get-started.mdx` (no file extensions) |

**Warning:**
- Any `+` line with `href="https://developers.cloudflare.com/` or `](https://developers.cloudflare.com/`
- Any `+` line with a relative link: `href="./`, `](./`, `href="../`, `]( ../`
- Any `+` line with an internal link missing its trailing slash (e.g. `](/workers/get-started)`)

## Descriptive link text

Link text must describe the destination. Never use generic text.

**Warning:** link text that is "here", "this page", "read more", "click here", "learn more", or "more information".

## Standard phrasing

```
For more information, refer to [Page Title](/path/).
To <do something>, refer to [Section Title](/path/).
```

Do not use: "Learn more about...", "To read more...", "refer the [Page] page/documentation".

**Suggestion:** non-standard phrasing like "see the [Page]" → change to "refer to [Page]".
