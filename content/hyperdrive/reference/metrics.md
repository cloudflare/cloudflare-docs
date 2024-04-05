---
pcx_content_type: concept
title: Metrics 
weight: 20
---

# Metrics

You can view the metrics for a Hyperdrive on your account via the [Cloudflare dashboard](https://dash.cloudflare.com). Go to **Workers** > **Hyperdrive** > **your Hyperdrive config** under the **Metrics** tab.

The metrics displayed in the Cloudflare dashboard charts are all pulled from Cloudflare's GraphQL Analytics API. You can access the metrics programmatically.

The Hyperdrive metrics are available in the `hyperdriveQueriesAdaptiveGroups` node under `viewer` > `accounts`. Refer to [Explore the GraphQL schema](/analytics/graphql-api/getting-started/explore-graphql-schema/) to learn how to navigate a GraphQL schema and discover which data are available.

To learn more about the GraphQL Analytics API, refer to [GraphQL Analytics API](/analytics/graphql-api/).

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
