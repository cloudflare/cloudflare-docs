---
pcx_content_type: reference
title: Best practices
meta:
    title: Redirects | Best practices
---

# Best practices

Beyond [how Cloudflare uses redirects](/docs-guide/manage-content/redirects/process/) and having a [maintenance plan](/docs-guide/manage-content/redirects/maintenance/), we follow these best practices.

## Know what you can redirect

At the server level, you can trigger a redirect on a URL path (`/page/`), but not a fragment (`/page/#fragment`).

You can redirect a page to a fragment, however (`/page1/` to `/page2/#fragment`).

## Use automation

Particularly in an open-source environment, use automation to identify changes that might require redirects. We built a [GitHub action](https://github.com/cloudflare/cloudflare-docs/blob/production/.github/workflows/comment-changed-filenames.yml) specifically for this use case.

You should apply a similar process to infinite redirects (where two redirect rules point to each other), if possible. We have a [dedicated script](https://github.com/cloudflare/cloudflare-docs/blob/production/bin/find-infinite-redirects.ts) to check for this situation in our Pages project.