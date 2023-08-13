---
pcx_content_type: concept
title: Limits
weight: 9
---

# Limits

{{<Aside type="note">}}

Many of these limits will increase during Queues' public beta period. [Follow our changelog](/queues/changelog/) or join the [`#queues-beta`](https://discord.gg/rrZXVVcKQF) channel in our Developer Discord to keep up-to-date with changes.

{{</Aside>}}

{{<table-wrap>}}

| Feature                                            | Limit                                   |
| -------------------------------------------------- | --------------------------------------- |
| Queues                                             | 100 per account <sup>1</sup>            |
| Maximum message size                               | 128 KB <sup>2</sup>                     |
| Maximum message retries                            | 100                                     |
| Maximum batch size                                 | 100 messages                            |
| Maximum batch wait time                            | 30 seconds                              |
| Maximum per-queue message throughput <sup>3</sup>  | 400 messages per second <sup>4</sup>    |
| Maximum message retention period <sup>5</sup>      | 4 days (96 hours)                       | 
| Maximum per-queue backlog size <sup>6</sup>        | 25GB                                    | 
| Maximum concurrent consumer invocations            | 10                                      | 
| Maximum consumer invocation duration               | 15 minutes <sup>7</sup>                 | 

{{</table-wrap>}}

<sup>1</sup> Request adjustments to limits that conflict with your project goals by contacting Cloudflare. To request an increase to a limit, complete the [Limit Increase Request Form](https://forms.gle/ukpeZVLWLnKeixDu7) and we will contact you with next steps.

<sup>2</sup> 1 KB is measured as 1000 bytes. Messages can include up to ~100 bytes of internal metadata that counts towards total message limits.

<sup>3</sup> The maximum message throughput per queue will continue to increase during the beta period.

<sup>4</sup> Exceeding the maximum message throughput will cause the `send()` and `sendBatch()` methods to throw an exception with a `Too Many Requests` error until your producer falls below the limit.

<sup>5</sup> Messages in a queue that reach the maximum message retention are deleted from the queue. Queues does not delete messages in the same queue that have not reached this limit.

<sup>6</sup> Individual queues that reach this limit will receive a `Storage Limit Exceeded` error when calling `send()` or `sendBatch()` on the queue.

<sup>7</sup> Refer to [Worker limits](/workers/platform/limits/#cpu-time).  
