---
pcx_content_type: concept
title: Limits
---

# Limits

## KV limits

{{<table-wrap>}}

| Feature                               | Free                  | Paid       |
| ------------------------------------- | --------------------- | ---------- |
| Reads/second                          | 100,000 reads per day | unlimited  |
| Writes/second (different keys)        | 1,000 writes per day  | unlimited  |
| Writes/second (same key)              | 1                     | 1          |
| Operations/worker invocation          | 1000                  | 1000       |
| Namespaces                            | 100                   | 100        |
| Storage/account                       | 1 GB                  | unlimited  |
| Storage/namespace                     |1 GB                   | unlimited  |
| Keys/namespace                        | unlimited             | unlimited  |
| Key size                              | 512 bytes             | 512 bytes  |
| Key metadata                          | 1024 bytes            | 1024 bytes |
| Value size                            | 25 MiB                | 25 MiB     |

{{</table-wrap>}}

{{<Aside type="note" header="Free versus Paid plan pricing">}}

Refer to [KV pricing](/workers/platform/pricing/#workers-kv) to review the specific KV operations you are allowed under each plan with their pricing.

{{</Aside>}}