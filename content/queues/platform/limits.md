---
pcx_content_type: concept
title: Limits
weight: 9
---

# Limits

{{<Aside type="note">}}

Many of these limits will increase during Queues' public beta period. If you have questions about a certain limit, [contact the Queues team](mailto:queues@cloudflare.com).

{{</Aside>}}

{{<table-wrap>}}

| Feature                                         | Limit                             |
| ----------------------------------------------- | --------------------------------- |
| Queues                                          | 100 per account <sup>1</sup>      |
| Maximum message size                            | 128 KB                            |
| Maximum message retries                         | 100                               |
| Maximum batch size                              | 100 messages                      |
| Maximum batch wait time                         | 30 seconds                        |
| Maximum message throughput <sup>2</sup>         | 100 messages per second           |
| Maximum message retention period <sup>3</sup>   | 4 days (96 hours)                 |

{{</table-wrap>}}

* <sup>1</sup> Request adjustments to limits that conflict with your project goals by contacting Cloudflare. To increase a limit, complete the [Limit Increase Request Form](https://docs.google.com/forms/d/e/1FAIpQLSd_fwAVOboH9SlutMonzbhCxuuuOmiU1L_I5O2CFbXf_XXMRg/viewform).
* <sup>2</sup> This is a limit that we will increase, and aspire to effectively eliminate in the future.
* <sup>3</sup> Messages in a queue that reach the maximum message retention are deleted from the queue. Queues does not delete messages in the same queue that have not reached this limit.

Notes:

* 1 KB is measured as 1000 bytes. Messages can include up to ~100 bytes of internal metadata that counts towards total message limits.
