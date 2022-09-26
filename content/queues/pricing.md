---
pcx_content_type: concept
title: Pricing
weight: 10
meta:
  title: Cloudflare Queues - Pricing
---

# Pricing

{{<Aside type="note">}}

Usage is free during the private Beta.

{{</Aside>}}

Cloudflare Queues charges for the total number of operations per month. An operation is counted for each 64 KB of data that is written, read, or deleted. There are no bandwidth charges.

{{<table-wrap>}}

|                     | Free Tier                    | Paid                       |
| ------------------- | ---------------------------- | -------------------------- |
| Standard operations | 1,000,000 operations / month | $0.40 / million operations |

{{</table-wrap>}}

In most cases, it takes 3 operations to deliver a message: 1 write, 1 read, and 1 delete. Therefore, you can use the following formula to estimate your monthly bill:

    (Number of Messages - 1,000,000) * 3 * $0.40

### Example

If an application writes one million messages a day, and each message is less than 64 KB in size, the estimated bill for the month would be:

{{<table-wrap>}}

|                     | Total Usage     | Free Usage | Billed Usage | Price      |
| ------------------- | --------------- | ---------- | ------------ | ---------- |
| Standard operations | 30 \* 1,000,000 | 1,000,000  | 29,000,000   | $11.60     |
| **TOTAL**           |                 |            |              | **$11.60** |

{{</table-wrap>}}
