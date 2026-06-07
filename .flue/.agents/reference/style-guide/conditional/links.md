---
title: Links
description: Rules for internal and external links.
---

## Rules

- If a link points to an internal page using the full `https://developers.cloudflare.com/...` URL → **warning**: use a root-relative path instead (e.g. `/workers/get-started/`).
- If a link uses a relative path (`./`, `../`) → **warning**: use root-relative paths only.
- If an internal link is missing its trailing slash (e.g. `](/workers/get-started)`) → **warning**: add trailing slash.
- If an internal link includes a file extension (e.g. `.mdx`, `.html`) → **warning**: remove the extension.
- If link text is `here`, `this page`, `read more`, `click here`, `learn more`, or `more information` → **warning**: use descriptive link text that describes the destination.
- If prose uses `Learn more about...` or `To read more...` before a link → **suggestion**: use `refer to [Page Title](/path/)` instead.
- If prose uses `refer the [Page] page` or `refer the [Page] documentation` → **suggestion**: use `refer to [Page]`.

## Standard Phrasing

- Preferred: `For more information, refer to [Page Title](/path/).`
- Preferred: `To <do something>, refer to [Section Title](/path/).`
- Avoid: `See the [Page]` → use `refer to [Page]`.
- Avoid: `Learn more about [Page]` → use `refer to [Page]`.
