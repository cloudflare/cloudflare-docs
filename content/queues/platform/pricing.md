---
pcx_content_type: concept
title: Pricing
weight: 1
meta:
  title: Cloudflare Queues - Pricing
---

# Pricing

{{<render file="_queues_pricing.md" productFolder="workers">}}

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
