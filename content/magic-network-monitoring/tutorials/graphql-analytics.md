---
title: GraphQL Analytics
pcx_content_type: tutorial
weight: 1
meta:
  title: GraphQL Analytics
updated: 2023-01-04
languages: [GraphQL]
---

# GraphQL Analytics

Use the GraphQL Analytics API to retrieve Magic Network Monitoring {{<glossary-tooltip term_id="flow data">}}flow data{{</glossary-tooltip>}}.

Before you begin, you must have an [API token](/analytics/graphql-api/getting-started/authentication/). For additional help getting started with GraphQL Analytics, refer to [GraphQL Analytics API](/analytics/graphql-api/).

### Obtain your Cloudflare Account ID

To construct a Magic Network Monitoring GraphQL query for an object, you will need a Cloudflare Account ID.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account.
2. The URL in your browser's address bar should show `https://dash.cloudflare.com/` followed by a hex string. The hex string is your Cloudflare Account ID.

## Explore GraphQL schema with Magic Network Monitoring example

In this section, you will run a test query to retrieve a five minute sum of bits and packets for flows within five minute intervals. You can copy and paste the code below into GraphiQL.

For additional information about the Analytics schema, refer to [Explore the Analytics schema with GraphiQL](/analytics/graphql-api/getting-started/explore-graphql-schema/).

```graphql
  query {
    viewer {
      accounts(filter: { accountTag: "ACCOUNT_ID" }) {
          mnmFlowDataAdaptiveGroups(
          filter: {datetime_gt: "2022-12-01T00:00:00Z",
            datetime_leq: "2022-12-02T00:00:00Z"},
          limit: 10
          orderBy: [datetimeFiveMinutes_DESC]
        ) {
          sum {
            bits
            packets
          }
          dimensions {
            datetimeFiveMinutes
          }
        }
      }
    }
  }
```
