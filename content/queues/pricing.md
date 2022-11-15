---
pcx_content_type: concept
title: Pricing
weight: 10
meta:
  title: Cloudflare Queues - Pricing
---

# Pricing

{{<Aside type="note">}}

Cloudflare Queues requires the [Workers paid plan](https://developers.cloudflare.com/workers/platform/pricing/) to use, but does not increase your monthly subscription cost.

{{</Aside>}}

Cloudflare Queues charges for the total number of operations against each of your queues during a given month.

* An operation is counted for each 64 KB of data that is written, read, or deleted.
* Messages larger than 64KB are charged as if they were multiple messages: for exampele, a 65KB message and a 127KB message would both incur two read, write and delete operations.
* A KB is defined as 1,000 bytes, and each message includes approximately 100 bytes of internal metadata.
* Operations are per message, not per batch. A batch of 10 messages (the default batch size), if processed, would incur 10x write, 10x read, and 10x delete operations: one for each message in the batch.
* There are no data transfer ("egress") or throughput (bandwidth) charges.

{{<table-wrap>}}

|                     | Free Tier                    | Paid                       |
| ------------------- | ---------------------------- | -------------------------- |
| Standard operations | 1,000,000 operations / month | $0.40 / million operations |

{{</table-wrap>}}

In most cases, it takes 3 operations to deliver a message: 1 write, 1 read, and 1 delete. Therefore, you can use the following formula to estimate your monthly bill:

    ((Number of Messages * 3) - 1,000,000) / 1,000,000  * $0.40

Additionally:

* Each retry incurs a read operation. A batch of 10 messages that is retried would incur 10 operations for each retry.
* Messages that reach the maximum retries and that are written to a [Dead Letter Queue](https://developers.cloudflare.com/queues/batching-retries) incur a write operation for each 64KB chunk. A message that was retried 3 times (the default), fails delivery on the fourth time and is written to a Dead Letter Queue would incur five (5) read operations.
* Messages that are written to a queue, but that reach the maximum persistency duration (or "expire") before they are read, incur only a write and delete operation per 64KB chunk.

### Examples

If an application writes one million messages a day (in a 30 day month), and each message is less than 64 KB in size, the estimated bill for the month would be:

{{<table-wrap>}}

|                     | Total Usage     | Free Usage | Billed Usage | Price      |
| ------------------- | --------------- | ---------- | ------------ | ---------- |
| Standard operations | 30 \* 1,000,000 | 1,000,000  | 29,000,000   | $11.60     |
|                     |                 |            |              |            |
| **TOTAL**           |                 |            |              | **$11.60** |

{{</table-wrap>}}

An application that sends 100 million ~127KB messages (each message counts as two 64KB chunks) per month would have an estimated bill resembling the following:

{{<table-wrap>}}

|                     | Total Usage                  | Free Usage | Billed Usage | Price      |
| ------------------- | ---------------------------- | ---------- | ------------ | ---------- |
| Standard operations | 2 * 100 \* 99,000,000        | 1,000,000  | 199,000,000  | $79.60     |
|                     | (2x ops for > 64KB messages) |            |              |            |
| **TOTAL**           |                              |            |              | **$79.60** |

{{</table-wrap>}}
