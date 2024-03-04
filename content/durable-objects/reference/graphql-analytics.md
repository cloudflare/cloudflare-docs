---
title: Metrics and analytics
pcx_content_type: concept
weight: 16
---

# Metrics and analytics

Durable Objects expose analytics for Durable Object namespace-level and request-level metrics. 

The metrics displayed in the [Cloudflare dashboard](https://dash.cloudflare.com/) charts are queried from Cloudflare’s [GraphQL Analytics API](/analytics/graphql-api/). You can access the metrics [programmatically via GraphQL](#query-via-the-graphql-api) or HTTP client.

{{<Aside type="note" header="Durable Object namespace">}}
A Durable Object namespace is a set of Durable Objects that can be addressed by name, backed by the same class. There is only one Durable Object namespace per class. A Durable Object namespace can contain any number of Durable Objects.
{{</Aside>}}

## View via the dashboard

Per-namespace analytics for Durable Objects are available in the Cloudflare dashboard. To view current and historical metrics for a namespace:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to [**Workers & Pages** > **Durable Objects**](https://dash.cloudflare.com/?to=/:account/workers/durable-objects).
3. View account-level Durable Objects usage. 
4. Select an existing namespace.
5. Select the **Metrics** tab.

You can optionally select a time window to query. This defaults to the last 24 hours.

## Query via the GraphQL API

Durable Object metrics are powered by GraphQL.

The datasets that include Durable Object metrics include:

- `durableObjectsInvocationsAdaptiveGroups`
- `durableObjectsPeriodicGroups`
- `durableObjectsStorageGroups`
- `durableObjectsSubrequestsAdaptiveGroups`

Use [GraphQL Introspection](/analytics/graphql-api/features/discovery/introspection/) to get information on the fields exposed by each datasets.

## Example GraphQL query for Durable Objects

```js
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

Refer to the [Querying Workers Metrics with GraphQL](/analytics/graphql-api/tutorials/querying-workers-metrics/) tutorial for authentication and to learn more about querying Workers datasets.