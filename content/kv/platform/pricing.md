---
pcx_content_type: concept
title: Pricing
weight: 12
---

# Pricing

{{<render file="_kv_pricing.md" productFolder="workers">}}

## Frequently Asked Questions

Frequently asked questions related to KV pricing:

- When writing via KV's [REST API](/api/operations/workers-kv-namespace-write-multiple-key-value-pairs), how are writes charged?

Each key-value pair in the `PUT` request is counted as a single write, identical to how each call to `PUT` in the Workers API counts as a write. Writing 5,000 keys via the REST API incurs the same write costs as making 5,000 `PUT` calls in a Worker.

- Do queries I issue from the dashboard or wrangler (the CLI) count as billable usage?

Yes, any operations via the Cloudflare dashboard or wrangler, including updating (writing) keys, deleting keys, and listing the keys in a namespace count as billable KV usage.

- Does Workers KV charge for data transfer / egress?

No.
