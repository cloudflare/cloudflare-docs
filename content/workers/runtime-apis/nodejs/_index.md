---
pcx_content_type: navigation
title: Node.js Compatibility
---

# Node.js Compatibility

The following APIs from Node.js are available directly in the Workers runtime. To enable these APIs in your Worker, add the [`nodejs_compat`](/workers/platform/compatibility-dates/#nodejs-compatibility-flag) compatibility flag to your `wrangler.toml`:

```toml
---
header: wrangler.toml
---
compatibility_flags = [ "nodejs_compat" ]
```

If you are using [Pages Functions](/pages/platform/functions/), you can set compatibility flags using the [Pages specific CLI commands](/workers/wrangler/commands/#dev-1) or set them in the dashboard (**Project Settings > Functions > Compatibility Flags**)

{{<directory-listing>}}
