---
title: Pricing
pcx_content_type: reference
weight: 9
meta:
  title: Workers Analytics Engine — Pricing
  description: Workers Analytics Engine is priced based on two metrics — data points written, and read queries.
---

# Pricing

Workers Analytics Engine is priced based on two metrics — data points written, and read queries.

| Plan             | Data points written                                                   | Read queries                                                 |
|------------------|-----------------------------------------------------------------------|--------------------------------------------------------------|
| **Workers Paid** | 10 million included per month <br /> (+$0.25 per additional million)  | 1 million included per month (+$1.00 per additional million) |
| **Workers Free** | 100,000 included per day                                              | 10,000 included per day                                      |

{{<Aside type="note" header="Pricing availability">}}
Currently, you will not be billed for your use of Workers Analytics Engine. Pricing information here is shared in advance, so that you can estimate what your costs will be once Cloudflare starts billing for usage in the coming months.

If you are an Enterprise customer, contact your account team for information about Workers Analytics Engine pricing and billing.
{{</Aside>}}

### Data points written

Every time you call [`writeDataPoint()`](/analytics/analytics-engine/get-started/#3-write-data-from-your-worker) in a Worker, this counts as one data point written.

Each data point written costs the same amount. There is no extra cost to add dimensions or cardinality, and no additional cost for writing more data in a single data point.

### Read queries

Every time you post to Workers Analytics Engine's [SQL API](/analytics/analytics-engine/sql-api/), this counts as one read query.

Each read query costs the same amount. There is no extra cost for more or less complex queries, and no extra cost for reading only a few rows of data versus many rows of data.