---
pcx_content_type: concept
title: Limits
weight: 9
meta:
  title: Cloudflare Queues - Limits
---

# Limits

{{<Aside type="note">}}

Many of these limits will increase during the Public Beta of Queues. If you have questions about a certain limit, please [reach out](mailto:queues@cloudflare.com).

{{</Aside>}}

{{<table-wrap>}}

| Feature                                 | Limit                             |
| --------------------------------------- | --------------------------------- |
| Queues                                  | 10 per account                    |
| Maximum message size                    | 128 KB                            |
| Maximum message retries                 | 100                               |
| Maximum batch size                      | 100 messages                      |
| Maximum batch wait time                 | 30 seconds                        |
| Maximum message throughput <sup>1</sup> | 100 messages per second           |
| Maximum batch wait time                 | 30 seconds                        |
| Maximum retention period                | 4 days (96 hours)                 |

{{</table-wrap>}}

<sup>1</sup> This is a limit that we will increase, and aspire to effectively eliminate in the future.

Notes:

* 1 KB is measured as 1000 bytes. Messages can include up to ~100 bytes of internal metadata that counts towards total message limits.
* Messages in a queue that have not been consumed after four (4) days are deleted from the queue. Queues does _not_ delete messages in the same queue that have not reached this limit.
