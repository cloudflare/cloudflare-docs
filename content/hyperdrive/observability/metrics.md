---
pcx_content_type: concept
title: Metrics and analytics
weight: 20
---

# Metrics and analytics

Hyperdrive exposes analytics that allow you to inspect query volume, query latency and cache ratios size across all and/or each Hyperdrive configuration in your account.

## Metrics

Hyperdrive currently exports the below metrics as part of the `hyperdriveQueriesAdaptiveGroups` GraphQL dataset:

| Metric                  | GraphQL Field Name         | Description                                                   |
| ----------------------- | -------------------------- | ------------------------------------------------------------- |
| Queries                 | `count`                    | The number of queries issued against your Hyperdrive in the given time period.         |
| Cache Status            | `cacheStatus`              | Whether the query was cached or not. Can be one of `disabled`, `HIT`, `MISS`, `uncacheable`, `multiplestatements`, `notaquery`, `oversizedquery`, `oversizedresult`, `parseerror`, `transaction`, and `volatile`.
| Query Bytes             | `queryBytes`               | The size of your queries, in bytes. |
| Result Bytes            | `resultBytes`              | The size of your query _results_, in bytes. |
| Connection Latency      | `connectionLatency`        | The time (in milliseconds) required to establish new connections from Hyperdrive to your database. |
| Query Latency           | `queryLatency`             | The time (in milliseconds) required to query (and receive results) from your database. |
| Event Status            | `eventStatus`              | Whether a query responded successfully (`complete`) or failed (`error`). |

Metrics can be queried (and are retained) for the past 31 days.

## View metrics in the dashboard

Per-database analytics for Hyperdrive are available in the Cloudflare dashboard. To view current and historical metrics for a Hyperdrive configuration:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to [**Workers & Pages** > **Hyperdrive**](https://dash.cloudflare.com/?to=/:account/workers/hyperdrive).
3. Select an existing Hyperdrive configuration.
4. Select the **Metrics** tab.

You can optionally select a time window to query. This defaults to the last 24 hours.

## Query via the GraphQL API

You can programmatically query analytics for your Hyperdrive configurations via the [GraphQL Analytics API](/analytics/graphql-api/). This API queries the same datasets as the Cloudflare dashboard, and supports GraphQL [introspection](/analytics/graphql-api/features/discovery/introspection/).

Hyperdrives's GraphQL datasets require an `accountTag` filter with your Cloudflare account ID. Hyperdrive exposes the `hyperdriveQueriesAdaptiveGroups` dataset.

## Write GraphQL queries

Examples of how to explore your Hyperdrive metrics.

### Get the number of queries handled via your Hyperdrive config by cache status

```graphql
query HyperdriveQueries($accountTag: string!, $configId: string!, $datetimeStart: Time!, $datetimeEnd: Time!) {
  viewer {
    accounts(filter: {accountTag: $accountTag}) {
      hyperdriveQueriesAdaptiveGroups(
        limit: 10000
        filter: {
          configId: $configId
          datetime_geq: $datetimeStart
          datetime_leq: $datetimeEnd
        }
      ) {
        count
        dimensions {
          cacheStatus
        }
      }
    }
  }
}
```

### Get the average query and connection latency for queries handled via your Hyperdrive config within a range of time, excluding queries that failed due to an error

```graphql
query AverageHyperdriveLatencies($accountTag: string!, $configId: string!, $datetimeStart: Time!, $datetimeEnd: Time!) {
  viewer {
    accounts(filter: {accountTag: $accountTag}) {
      hyperdriveQueriesAdaptiveGroups(
        limit: 10000
        filter: {
          configId: $configId
          eventStatus: "complete"
          datetime_geq: $datetimeStart
          datetime_leq: $datetimeEnd
        }
      ) {
        avg {
          connectionLatency
          queryLatency
        }
      }
    }
  }
}
```

### Get the total amount of query and result bytes flowing through your Hyperdrive config

```graphql
query HyperdriveQueryAndResultBytesForSuccessfulQueries($accountTag: string!, $configId: string!, $datetimeStart: Date!, $datetimeEnd: Date!) {
  viewer {
    accounts(filter: {accountTag: $accountTag}) {
      hyperdriveQueriesAdaptiveGroups(
        limit: 10000
        filter: {
          configId: $configId
          datetime_geq: $datetimeStart
          datetime_leq: $datetimeEnd
        }
      ) {
        sum {
          queryBytes
          resultBytes
        }
      }
    }
  }
}
```
