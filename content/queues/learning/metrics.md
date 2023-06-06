---
pcx_content_type: concept
title: Metrics 
weight: 5
---

# Metrics

You can view the metrics for a Queue on your account via the [Cloudflare dashboard](https://dash.cloudflare.com). Navigate to **Workers** > **Queues** > **your Queue** and under the **Metrics** tab you'll be able to view line charts describing the number of messages processed by final outcome, the number of messages in the backlog, and other important indicators.

The metrics displayed in the Cloudflare dashboard charts are all pulled from Cloudflare's GraphQL Analytics API. You can access the metrics programmatically.

The Queues metrics are split across three different nodes under `viewer` > `accounts`. Refer to [Explore the GraphQL schema](/analytics/graphql-api/getting-started/explore-graphql-schema/) to learn how to navigate a GraphQL schema and discover which data are available.

To learn more about the GraphQL Analytics API, refer to [GraphQL Analytics API](/analytics/graphql-api/).

## Write GraphQL queries

Examples of how to explore your Queues metrics.

### Get average Queue backlog over time period

```graphql
query QueueBacklog($accountTag: string!, $queueId: string!, $datetimeStart: Time!, $datetimeEnd: Time!) {
  viewer {
    accounts(filter: {accountTag: $accountTag}) {
      queueBacklogAdaptiveGroups(
        limit: 10000
        filter: {
          queueId: $queueId
          datetime_geq: $datetimeStart
          datetime_leq: $datetimeEnd
        }
      ) {
        avg {
          messages
          bytes
        }
      }
    }
  }
}
```

### Get average consumer concurrency by hour

```graphql
query QueueConcurrencyByHour($accountTag: string!, $queueId: string!, $datetimeStart: Time!, $datetimeEnd: Time!) {
  viewer {
    accounts(filter: {accountTag: $accountTag}) {
      queueConsumerMetricsAdaptiveGroups(
        limit: 10000
        filter: {
          queueId: $queueId
          datetime_geq: $datetimeStart
          datetime_leq: $datetimeEnd
        }
        orderBy: [datetimeHour_DESC]
      ) {
        avg {
          concurrency
        }
        dimensions {
          datetimeHour
        }
      }
    }
  }
}
```

### Get message operations by minute

```graphql
query QueueMessageOperationsByMinute($accountTag: string!, $queueId: string!, $datetimeStart: Date!, $datetimeEnd: Date!) {
  viewer {
    accounts(filter: {accountTag: $accountTag}) {
      queueMessageOperationsAdaptiveGroups(
        limit: 10000
        filter: {
          queueId: $queueId
          datetime_geq: $datetimeStart
          datetime_leq: $datetimeEnd
        }
        orderBy: [datetimeMinute_DESC]
      ) {
        count
        sum {
          bytes
        }
        dimensions {
          datetimeMinute
        }
      }
    }
  }
}
```
