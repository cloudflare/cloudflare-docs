---
pcx_content_type: concept
title: Limits
weight: 2
---

# Limits

{{<Aside type="note">}}

Many of these limits will increase during Queues' public beta period. [Follow our changelog](/queues/platform/changelog/) or join the [`#queues-beta`](https://discord.cloudflare.com) channel in our Developer Discord to keep up-to-date with changes.

{{</Aside>}}

{{<table-wrap>}}

| Feature                                            | Limit                                   |
| -------------------------------------------------- | --------------------------------------- |
| Queues                                             | 10,000 per account <sup>beta</sup>      |
| Message size                                       | 128 KB <sup>1</sup>                     |
| Message retries                                    | 100                                     |
| Maximum consumer batch size                                         | 100 messages <sup>beta</sup>            |
| Maximum messages per `sendBatch` call | 100 (or 256KB in total) |
| Batch wait time                                    | 60 seconds                              |
| Per-queue message throughput <sup>2</sup>          | 400 messages per second <sup>3</sup>    |
| Message retention period <sup>4</sup>              | 4 days (96 hours)                       |
| Per-queue backlog size <sup>5</sup>                | 25GB                                    |
| Concurrent consumer invocations                    | 20 <sup>push-based only</sup>           |
| Consumer invocation duration                       | 15 minutes <sup>6</sup>                 |
| `visibilityTimeout` (pull-based queues)            | 12 hours                                |
| `delaySeconds` (when sending or retrying)          | 12 hours                                |
| Requests to the Queues API (incl. pulls/acks)      | [1200 requests / 5 mins](/fundamentals/api/reference/limits/) |

{{</table-wrap>}}

<sup>beta</sup> This limit is beta only and is expected to increase over time.

<sup>1</sup> 1 KB is measured as 1000 bytes. Messages can include up to ~100 bytes of internal metadata that counts towards total message limits.

<sup>2</sup> The maximum message throughput per queue will continue to increase during the beta period.

<sup>3</sup> Exceeding the maximum message throughput will cause the `send()` and `sendBatch()` methods to throw an exception with a `Too Many Requests` error until your producer falls below the limit.

<sup>4</sup> Messages in a queue that reach the maximum message retention are deleted from the queue. Queues does not delete messages in the same queue that have not reached this limit.

<sup>5</sup> Individual queues that reach this limit will receive a `Storage Limit Exceeded` error when calling `send()` or `sendBatch()` on the queue.

<sup>6</sup> Refer to [Workers limits](/workers/platform/limits/#cpu-time).

{{<render file="_limits_increase.md" productFolder="workers">}}
