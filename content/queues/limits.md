---
pcx_content_type: concept
title: Limits
weight: 9
meta:
  title: Cloudflare Queues - Limits
---

# Limits

{{<Aside type="note">}}

Limits are restrictive during the private Beta. We will increase them over time. If you have questions about a certain limit, please [reach out](mailto:queues@cloudflare.com).

{{</Aside>}}

{{<table-wrap>}}

| Feature                                 | Limit                   |
| --------------------------------------- | ----------------------- |
| Queues                                  | 10 per account          |
| Maximum message size                    | 128 KB                  |
| Maximum message retries                 | 100                     |
| Maximum batch size                      | 100 messages            |
| Maximum batch wait time                 | 30 seconds              |
| Maximum message throughput <sup>1</sup> | 100 messages per second |

{{</table-wrap>}}

<sup>1</sup> This is a limit that we will increase, and aspire to effectively eliminate in the future.
