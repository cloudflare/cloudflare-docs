---
pcx_content_type: configuration
title: Bindings
weight: 6
---

# Bindings

**Workers**

You must create a binding for your Worker to connect to Workers AI. [Bindings](/workers/runtime-apis/bindings/) allow your Workers to access resources or services, like Workers AI, on the Cloudflare developer platform. You create bindings by updating your `wrangler.toml` file.

To bind Workers AI to your Worker, add the following to the end of your `wrangler.toml` file:

```toml
---
filename: wrangler.toml
---

[ai]
binding = "AI" # i.e. available in your Worker on env.AI
```


**Pages**

{{<Aside type="warning">}}
While pages currently supports Workers AI bindings, they do not work in local dev mode. We'll provide local dev support in the coming weeks, but recommend you use the [REST API](/workers-ai/get-started/rest-api/) with Pages in the meantime
{{</Aside>}}