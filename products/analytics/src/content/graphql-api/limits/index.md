---
title: Limits
order: 30
---

# Limits


## Data accessibility

The GraphQL Analytics API is available to all Cloudflare users; however, users on larger plans have access to a greater selection of data sets and can query over broader historical intervals.

### Data node access (by customer plan)

Use the table below to identify which data nodes are included in your customer plan and the range of historical data you can query. For example, Free plans have access to the last 24 hours of `browserPerf1mGroups` data, while Enterprise plans have access to the last 30 days.

<Aside type="info" header="Info">

Access to Network Analytics <b>ipFlows</b> nodes is only available to Enterprise customers using Cloudflare <a href="https://www.cloudflare.com/magic-transit/">Magic Transit</a> or <a href="https://developers.cloudflare.com/spectrum/getting-started/byoip/">BYOIP for Spectrum</a>
</Aside>

<TableWrap>

| Data node                            |     Free |      Pro | Business | Enterprise |
| :----------------------------------- | -------: | -------: | -------: | ---------: |
| `browserPerf1mGroups`                | 24 hours |   7 days |  30 days |    30 days |
| `firewallEventsAdaptiveByTimeGroups` |  14 days |  14 days |  30 days |    30 days |
| `firewallEventsAdaptiveGroups`       |      n/a |   3 days |  30 days |    30 days |
| `firewallEventsAdaptive`             |  14 days |  14 days |  30 days |    30 days |
| `firewallRulePreviewGroups`          |      n/a |      n/a |      n/a |    30 days |
| `healthCheckEventsGroups`            |      n/a |   3 days |  30 days |    90 days |
| `healthCheckEvents`                  |      n/a |   3 days |  30 days |    90 days |
| `httpRequests1dByColoGroups`         |      n/a |      n/a |      n/a |   365 days |
| `httpRequests1dGroups`               | 365 days | 365 days | 365 days |   365 days |
| `httpRequests1hGroups`               |   3 days |   7 days |  30 days |    90 days |
| `httpRequests1mByColoGroups`         |      n/a |      n/a |      n/a |     7 days |
| `httpRequests1mGroups`               |      n/a | 24 hours |   3 days |     7 days |
| `ipFlows1mGroups`                    |      n/a |      n/a |      n/a |    30 days |
| `ipFlows1hGroups`                    |      n/a |      n/a |      n/a |   6 months |
| `ipFlows1dGroups`                    |      n/a |      n/a |      n/a |     1 year |
| `ipFlows1mAttackGroups`              |      n/a |      n/a |      n/a |     1 year |
| `loadBalancingRequestsGroups`        |      n/a |   3 days |  30 days |    30 days |
| `loadBalancingRequests`              |      n/a |   3 days |  30 days |    30 days |
| `synAvgPps1mGroups`                  |      n/a |      n/a |      n/a |     7 days |

</TableWrap>

### Query settings for account limits

To obtain specific information regarding account limits for a particular data node, use the `settings` node.

The example query below demonstrates how to retrieve account limits for the `browserPerf1mGroups` data node. The example queries the following fields:

<TableWrap>

| Field               | Description                                                                                            |
| :------------------ | :----------------------------------------------------------------------------------------------------- |
| `enabled`           | Returns `true` if the data set (node) is available for the current plan.                               |
| `maxDuration`       | Defines the maximum time period (in seconds) that can be requested in one query (varies by data node). |
| `maxNumberOfFields` | Defines the maximum number of fields that can be requested in one query (varies by data node).         |
| `maxPageSize`       | Defines the maximum number of records that can be returned in one query (varies by data node).         |
| `notOlderThan`      | Limits how far back in the record a query can search (in seconds, varies by data set and plan).        |

</TableWrap>

### Example query

```graphql
{
  viewer {
    zones(filter: { zoneTag: $zoneTag }) {
      settings {
        browserPerf1mGroups {
          maxDuration
          maxNumberOfFields
          maxPageSize
          enabled
          notOlderThan
        }
      }
    }
  }
}
```

### Response

```graphql
{
  "data": {
    "viewer": {
      "zones": [
        {
          "settings": {
            "browserPerf1mGroups": {
              "enabled": true,
              "maxDuration": 2592000,
              "maxNumberOfFields": 30,
              "maxPageSize": 10000,
              "notOlderThan": 2595600
            }
          }
        }
      ]
    }
  },
  "errors": null
}
```

## Query limits

In addition to access restrictions, there are limits on the volume of data that a query can return, and there are user limits on daily data volume. The following limits apply in addition to the general rate limits enforced by the Cloudflare API:

- **A zone-scoped query can include up to 10 zones.**
- **Account-scoped queries can aggregate data for up to 1,000 zones**—queries that involve aggregated data across more than 1,000 zones return with an error.
- **Queries can request up to 30 fields**—this limit is indicated by `maxNumberOfFields` in `settings`.
- **Responses can return up to 10,000 records**—this limit is indicated by `maxPageSize` in `settings`.

Queries must explicitly specify the upper bound of records to return, using the `limit` argument, as in the example below.

```graphql
{
  viewer {
    zones(filter: { zoneTag: $zoneTag }) {
      firewallEventsAdaptiveGroups(
        limit: 100
        filter: {
          datetime_geq: "2019-10-16T21:08:00Z"
          datetime_lt: "2019-10-16T21:12:00Z"
        }
        orderBy: [datetime_ASC]
      ) {
        count
        dimensions {
          datetime
        }
      }
    }
  }
}
```
