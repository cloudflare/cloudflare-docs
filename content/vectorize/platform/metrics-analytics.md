---
pcx_content_type: concept
title: Metrics and analytics
weight: 8
---

# Metrics and analytics

D1 exposes database analytics that allow you to inspect query volume, response size, and query latency across all and/or each database in your account.

The metrics displayed in the [Cloudflare dashboard](https://dash.cloudflare.com/) charts are queried from Cloudflare’s [GraphQL Analytics API](/analytics/graphql-api/). You can access the metrics [programmatically](#query-via-the-graphql-api) via GraphQL or HTTP client.

## Metrics

D1 currently exports the below metrics:

| Metric                  | GraphQL Field Name         | Description                                                   |
| ----------------------- | -------------------------- | ------------------------------------------------------------- |
| Read Queries (qps)      | `readQueries`              | The number of read queries issued against a database. This is the raw number of read queries, and is not used for billing. |
| Write Queries (qps)     | `writeQueries`             | The number of write queries issued against a database. This is the raw number of write queries, and is not used for billing. |
| Query Response (bytes)  | `queryBatchResponseBytes`  | The total response size of the serialized query response, including any/all column names, rows and metadata. Reported in bytes. |
| Query Latency (ms)      | `queryBatchTimeMs`         | The total query response time, including response serialization, on the server-side. Reported in milliseconds. |

Metrics can be queried (and are retained) for the past 31 days.
