---
pcx_content_type: configuration
title: Bindings
meta:
    description:
---

# Bindings

## Workers

[Workers](/workers/) provides a serverless execution environment that allows you to create new applications or augment existing ones.

To use Workers AI with Workers, you must create a [Workers AI binding](/workers/configuration/bindings/#workers-ai-bindings). Bindings allow your Workers to interact with resources, like Workers AI, on the Cloudflare Developer Platform. You create bindings on the Cloudflare dashboard or by updating your [`wrangler.toml` file](/workers/wrangler/configuration/).

To bind Workers AI to your Worker, add the following to the end of your `wrangler.toml` file:

```toml
---
filename: wrangler.toml
---

[ai]
binding = "AI" # i.e. available in your Worker on env.AI
```


## Pages Functions

[Pages Functions](/pages/functions/) allow you to build full-stack applications with Cloudflare Pages by executing code on the Cloudflare network. Functions are Workers under the hood.

To configure a Workers AI binding in your Pages Function, you must use the Cloudflare dashboard. Refer to [Workers AI bindings](/pages/functions/bindings/#workers-ai) for instructions.