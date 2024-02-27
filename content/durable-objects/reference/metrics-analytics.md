---
title: GraphQL analytics
pcx_content_type: concept
weight: 16
---

# Metrics and analytics

Durable Objects exposes metrics that allow you to inspect request volume, compute duration, latency and error rates at both a namespace level and an individual object level for

The metrics displayed in the [Cloudflare dashboard](https://dash.cloudflare.com/) charts are queried from Cloudflare’s [GraphQL Analytics API](/analytics/graphql-api/). You can access the metrics [programmatically](#query-via-the-graphql-api) via GraphQL or HTTP client.

## Datasets

Durable Objects exposes four datasets, each containing distinct metrics for calculating invocations, CPU usage and active duration, storage, and subrequests.

| Dataset                                      | Description               
| -------------------------------------------- | ------------------------- |
| durableObjectsInvocationsAdaptiveGroups      | The number of invocations against your Durable Objects, including requests, errors (failed requests), and response size. |
| durableObjectsPeriodicGroups                 | Metrics for active duration (in GB-s), wall-time, CPU time, inbound WebSocket messages, and storage operations. |
| durableObjectsStorageGroups                  | Storage usage (in bytes) by date and/or datetime. |
| durableObjectsSubrequestsAdaptiveGroups      | Metrics for sub-requests issued from your Durable Objects. |

Metrics can be queried (and are retained) for the past 31 days.

## Billing-related metrics

The following metrics are tied to Durable Objects [billing units](/durable-objects/platform/pricing/):

| Metric                  | Dataset                            | Description                                                           |
| ----------------------- | ---------------------------------- | --------------------------------------------------------------------- |
| `duration`              | `durableObjectsPeriodicGroups`  | The total time your Durable Objects are active, in GB-s.                 |
| `requests`              | `durableObjectsInvocationsAdaptiveGroups`  | The number of requests (invocations) made against your Durable Objects. |
| `storageReadUnits`      | `durableObjectsPeriodicGroups` | Reads against transactional storage in read units (4KB). |
| `storageWriteUnits`     | `durableObjectsPeriodicGroups` | Writes against transactional storage in writes units (4KB). |
| `storageDeletes`        | `durableObjectsPeriodicGroups` | Deletes against transactional storage. |
| `storedBytes`           | `durableObjectsStorageGroups`  | The maximum stored bytes for a given time/date period. | 

Review the [transactional storage pricing](/durable-objects/platform/pricing/#transactional-storage-api-billing) for further details on how read, writes and deletes are billed within Durable Objects.

## Query via the GraphQL API

You can programmatically query analytics for your D1 databases via the [GraphQL Analytics API](/analytics/graphql-api/). This API queries the same dataset as the Cloudflare dashboard, and supports GraphQL [introspection](/analytics/graphql-api/features/discovery/introspection/).

Durable Objects queries require an `accountTag` filter with your Cloudflare account ID.

### Examples

Query the total `requests` and `responseBodySize` (in bytes), the total `cpuTime` and the total `storedBytes` for all namespaces within your account:

```graphql
  viewer {
    /* 
    Replace with your account tag, the 32 hex character id visible at the beginning of any url
    when logged in to dash.cloudflare.com or under "Account ID" on the sidebar of the Workers & Pages Overview 
    */ 
    accounts(filter: {accountTag: "your account tag here"}) {
      // Replace dates with a recent date
      durableObjectsInvocationsAdaptiveGroups(filter: {date_gt: "2023-05-23"}, limit: 1000) {
        sum {
          // Any other fields found through introspection can be added here
          requests
          responseBodySize
        }
      }
      durableObjectsPeriodicGroups(filter: {date_gt: "2023-05-23"}, limit: 1000) {
        sum {
          cpuTime
        }
      }
      durableObjectsStorageGroups(filter: {date_gt: "2023-05-23"}, limit: 1000) {
        max {
          storedBytes
        }
      }
    }
  }
```
