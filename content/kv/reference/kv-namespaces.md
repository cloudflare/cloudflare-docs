---
pcx_content_type: concept
title: KV namespaces
weight: 7
---

# KV namespaces

A KV namespace is a key-value database replicated to Cloudflare’s global network.

Bind your KV namespaces through Wrangler or via the Cloudflare dashboard.

{{<Aside type="note">}}

KV namespace IDs are public and bound to your account.

{{</Aside>}}

## Bind your KV namespace through Wrangler

To bind KV namespaces to your Worker, assign an array of the below object to the `kv_namespaces` key.

{{<definitions>}}

- `binding` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The binding name used to refer to the KV namespace.

- `id` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The ID of the KV namespace.

- `preview_id` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - The ID of the KV namespace used during `wrangler dev`.

{{</definitions>}}

Example:

```toml
---
header: wrangler.toml
---
kv_namespaces = [
  { binding = "<TEST_NAMESPACE>", id = "<TEST_ID>" }
]
```
## Bind your KV namespace via the dashboard

To bind the namespace to your Worker in the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Go to **Workers & Pages**.
3. Select your **Worker**.
4. Select **Settings** > **Variables**.
5. Go to **KV Namespace Bindings**.
6. Select **Add binding**.