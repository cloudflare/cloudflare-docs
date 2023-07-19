---
pcx_content_type: reference
title: Settings node
weight: 43
---

# Settings node

Cloudflare GraphQL API exposes more than 70 datasets to its customers. These
datasets represent different Cloudflare products with very different data
shapes; thus, each has its configuration of [limits][1].

Although we allow access to ALL plans for the essential datasets (like
`httpRequestsAdaptiveGroups`, `firewallEventsAdaptive`, etc), users on larger
plans benefit from an extended set of datasets and wider query limits.

In addition to [introspection][2], users can use the Settings node that is
available for both zones and accounts scopes.

## Format

`Settings` node has all datasets from `zones` and `accounts` as fields.

```graphql
---
header: Using a settings node on accounts nodes
---
{
  viewer {
    accounts(filter: { accountTag : $accountTag }) {
      settings {
        # any dataset(s) from accounts
      }
    }
    zones(filter: { zoneTag : $zoneTag }) {
      settings {
        # any dataset(s) from zones
      }
    }
  }
}
```

Every subnode of `settings` node could consist of these fields:

* `enabled` - shows whether the node is available for a requester or not;
* `availableFields` - shows the list of fields available for a requester. If
  it's a nested field, the path will be returned, like `sum_requests`;
* `maxPageSize` - retrieves the maximum number of records that can be returned
* `maxNumberOfFields` - answers on how many fields could be used in a single
  query for that node;
* `notOlderThan` - returns a number of seconds on how far back in time a query
  can read;
* `maxDuration` - shows how wide the requested time range could be.

## A sample query

```graphql
---
header: Get boundaries of firewallEventsAdaptive node
---
{
  viewer {
    zones(filter: { zoneTag: $zoneTag }) {
      settings {
        firewallEventsAdaptive {
          enabled
          maxDuration
          maxNumberOfFields
          maxPageSize
          notOlderThan
        }
      }
    }
  }
}
```

```json
---
header: firewallEventsAdaptive limits for a given user
---
{
  "data": {
    "viewer": {
      "zones": [
        {
          "settings": {
            "firewallEventsAdaptive": {
              "enabled": true,
              "maxDuration": 259200,
              "maxNumberOfFields": 30,
              "maxPageSize": 10000,
              "notOlderThan": 2678400
            }
          }
        }
      ]
    }
  },
  "errors": null
}
```

To get more details on how to execute queries, please refer to our how to get
started [guides][3].

[1]: </analytics/graphql-api/limits/>
[2]: </analytics/graphql-api/features/discovery/introspection/>
[3]: </analytics/graphql-api/getting-started/>
