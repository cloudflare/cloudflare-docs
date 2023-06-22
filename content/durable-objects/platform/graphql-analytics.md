---
title: GraphQL Analytics
pcx_content_type: concept
weight: 16
---

# GraphQL Analytics

Durable Object metrics are powered by GraphQL, like other Workers metrics. 

The data sets that include Durable Object metrics include `durableObjectsInvocationsAdaptiveGroups`, `durableObjectsPeriodicGroups`, `durableObjectsStorageGroups`, and `durableObjectsSubrequestsAdaptiveGroups`. 

You can use [GraphQL Introspection](/analytics/graphql-api/features/discovery/introspection/) to get information on the fields exposed by each.

## Example of GraphQL query for Durable Objects

Refer to [Querying Workers Metrics](/analytics/graphql-api/tutorials/querying-workers-metrics/) tutorial for authentication and to learn more about querying Workers data sets.

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

