---
pcx_content_type: concept
title: Pricing
weight: 10
meta:
  title: Cloudflare Queues - Pricing
---

# Pricing

{{<Aside type="note">}}

Cloudflare Queues requires the [Workers Paid plan](/workers/platform/pricing/) to use, but does not increase your monthly subscription cost.

{{</Aside>}}

Cloudflare Queues charges for the total number of operations against each of your queues during a given month.

* An operation is counted for each 64 KB of data that is written, read, or deleted.
* Messages larger than 64 KB are charged as if they were multiple messages: for example, a 65 KB message and a 127 KB message would both incur two operation charges when written, read, or deleted.
* A KB is defined as 1,000 bytes, and each message includes approximately 100 bytes of internal metadata.
* Operations are per message, not per batch. A batch of 10 messages (the default batch size), if processed, would incur 10x write, 10x read, and 10x delete operations: one for each message in the batch.
* There are no data transfer (egress) or throughput (bandwidth) charges.

{{<table-wrap>}}

|                     | Free Tier                    | Paid                       |
| ------------------- | ---------------------------- | -------------------------- |
| Standard operations | 1,000,000 operations / month | $0.40 / million operations |

{{</table-wrap>}}

In most cases, it takes 3 operations to deliver a message: 1 write, 1 read, and 1 delete. Therefore, you can use the following formula to estimate your monthly bill:

    ((Number of Messages * 3) - 1,000,000) / 1,000,000  * $0.40

Additionally:

* Each retry incurs a read operation. A batch of 10 messages that is retried would incur 10 operations for each retry.
* Messages that reach the maximum retries and that are written to a [Dead Letter Queue](/queues/learning/batching-retries) incur a write operation for each 64 KB chunk. A message that was retried 3 times (the default), fails delivery on the fourth time and is written to a Dead Letter Queue would incur five (5) read operations.
* Messages that are written to a queue, but that reach the maximum persistence duration (or "expire") before they are read, incur only a write and delete operation per 64 KB chunk.

## Examples

If an application writes, reads and deletes (consumes) one million messages a day (in a 30 day month), and each message is less than 64 KB in size, the estimated bill for the month would be:

{{<table-wrap>}}

|                     | Total Usage           | Free Usage | Billed Usage | Price      |
| ------------------- | --------------------- | ---------- | ------------ | ---------- |
| Standard operations | 3 \* 30 \* 1,000,000  | 1,000,000  | 89,000,000   | $35.60     |
|                     | (write, read, delete) |            |              |            |
| **TOTAL**           |                       |            |              | **$35.60** |

{{</table-wrap>}}

An application that writes, reads and deletes (consumes) 100 million ~127 KB messages (each message counts as two 64 KB chunks) per month would have an estimated bill resembling the following:

{{<table-wrap>}}

|                     | Total Usage                  | Free Usage | Billed Usage | Price       |
| ------------------- | ---------------------------- | ---------- | ------------ | ----------- |
| Standard operations | 2 \* 3 \* 100 \* 1,000,000   | 1,000,000  | 599,000,000  | $239.60     |
|                     | (2x ops for > 64KB messages) |            |              |             |
| **TOTAL**           |                              |            |              | **$239.60** |

{{</table-wrap>}}
