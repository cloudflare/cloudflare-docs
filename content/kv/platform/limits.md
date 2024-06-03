---
pcx_content_type: concept
title: Limits
weight: 2
layout: wide
---

# Limits

{{<table-wrap>}}

| Feature                               | Free                  | Paid        |
| ------------------------------------- | --------------------- | ----------  |
| Reads                                 | 100,000 reads per day | Unlimited   |
| Writes to different keys              | 1,000 writes per day  | Unlimited   |
| Writes to same key                    | 1 per second          | 1 per second|
| Operations/worker invocation          | 1000                  | 1000        |
| Namespaces                            | 200                   | 200         |
| Storage/account                       | 1 GB                  | Unlimited   |
| Storage/namespace                     | 1 GB                  | Unlimited   |
| Keys/namespace                        | Unlimited             | Unlimited   |
| Key size                              | 512 bytes             | 512 bytes   |
| Key metadata                          | 1024 bytes            | 1024 bytes  |
| Value size                            | 25 MiB                | 25 MiB      |

{{</table-wrap>}}

{{<render file="_limits_increase.md" productFolder="workers">}}

{{<Aside type="note" header="Free versus Paid plan pricing">}}

Refer to [KV pricing](/kv/platform/pricing/) to review the specific KV operations you are allowed under each plan with their pricing.

{{</Aside>}}
