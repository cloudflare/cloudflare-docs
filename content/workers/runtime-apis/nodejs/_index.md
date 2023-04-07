---
pcx_content_type: navigation
title: Node.js compatibility
---

# Node.js compatibility

The following APIs from Node.js are available directly in the Workers runtime.

{{<directory-listing>}}

To enable these APIs in your Worker, add the [`nodejs_compat`](/workers/platform/compatibility-dates/#nodejs-compatibility-flag) compatibility flag to your `wrangler.toml`:

```toml
---
header: wrangler.toml
---
compatibility_flags = [ "nodejs_compat" ]
```

{{<render file="_nodejs-compat-local-dev.md">}}

## Pages Functions

If you are using [Pages Functions](/pages/platform/functions/), set compatibility flags using the [Pages-specific CLI commands](/workers/wrangler/commands/#dev-1). To set Pages compatibility flags in the Cloudflare dashboard:

1. Log into the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Select **Pages** and select your Pages project.
3. Select **Settings** > **Functions** > **Compatibility Flags**.
4. Configure your Production and Preview compatiblity flags as needed.
