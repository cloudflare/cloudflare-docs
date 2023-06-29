---
pcx_content_type: concept
title: KV Namespaces
weight: 7
---

# KV Namespaces

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
