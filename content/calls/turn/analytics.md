---
title: Analytics
weight: 20
---

#  TURN Analytics

Cloudflare Calls TURN service counts ingress and egress usage in bytes. You can access this real-time and historical data using the TURN analytics API. You can see TURN usage data in a time series or aggregate that shows traffic in bytes over time. 

Cloudflare TURN analytics is available over the GraphQL API only. 

{{<Aside type="note" header="API token permissions">}} 
You will need the "Account Analytics" permission on your API token to make queries to the Calls GraphQL API.
{{</Aside>}}

{{<Aside type="note">}} 
See [GraphQL API](/analytics/graphql-api/) for more information on how to set up your GraphQL client. The examples below use the same GraphQL endpoint at `https://api.cloudflare.com/client/v4/graphql`.
{{</Aside>}}

## TURN traffic data filters

You can filter the data in TURN analytics on:

- Datetime range
- TURN Key ID
- TURN Username
- Custom identifier


{{<Aside type="note">}} 

[Custom identifiers](/calls/turn/replacing-existing/#tag-users-with-custom-identifiers) are useful for accounting usage for different users in your system.

{{</Aside>}}

## Useful TURN analytics queries 

Below are some example queries for common usecases. You can modify them to adapt your use case and get different views to the analytics data.

### Top TURN keys by egress

```
---
header: Query
---
query{
  viewer {
    usage: accounts(filter: { accountTag: "8846293bd06d1af8c106d89ec1454fe6" }) {
        callsTurnUsageAdaptiveGroups(
          filter: {
          datetimeMinute_gt: "2024-07-15T02:07:07Z"
          datetimeMinute_lt: "2024-08-10T02:07:05Z"
        }
          limit: 2
          orderBy: [sum_egressBytes_DESC]
        ) {
          dimensions {
            keyId
          }
          sum {
            egressBytes
          }
        }
      }
    }
  }


```

```
---
header: Response
---
{
  "data": {
    "viewer": {
      "usage": [
        {
          "callsTurnUsageAdaptiveGroups": [
            {
              "dimensions": {
                "keyId": "74007022d80d7ebac4815fb776b9d3ed"
              },
              "sum": {
                "egressBytes": 502614982
              }
            },
            {
              "dimensions": {
                "keyId": "6b9e68b07dfee8cc2d116e4c51d6a957"
              },
              "sum": {
                "egressBytes": 4853235
              }
            }
          ]
        }
      ]
    }
  },
  "errors": null
}
```

### Top TURN custom identifiers

```
---
header: Query
---
query{
  viewer {
    usage: accounts(filter: { accountTag: "8846293bd06d1af8c106d89ec1454fe6" }) {
        callsTurnUsageAdaptiveGroups(
          filter: {
          datetimeMinute_gt: "2024-07-15T02:07:07Z"
          datetimeMinute_lt: "2024-08-10T02:07:05Z"
        }
          limit: 100
          orderBy: [sum_egressBytes_DESC]
        ) {
          dimensions {
            customIdentifier
          }
          sum {
            egressBytes
          }
        }
      }
    }
  }
```

```
---
header: Response
---
{
  "data": {
    "viewer": {
      "usage": [
        {
          "callsTurnUsageAdaptiveGroups": [
            {
              "dimensions": {
                "customIdentifier": "custom-id-333"
              },
              "sum": {
                "egressBytes": 269850354
              }
            },
            {
              "dimensions": {
                "customIdentifier": "custom-id-555"
              },
              "sum": {
                "egressBytes": 162641324
              }
            },
            {
              "dimensions": {
                "customIdentifier": "custom-id-112"
              },
              "sum": {
                "egressBytes": 70123304
              }
            }
          ]
        }
      ]
    }
  },
  "errors": null
}
```

### Usage for a specific custom identifier

```
---
header: Query
---
query{
  viewer {
    usage: accounts(filter: { accountTag: "8846293bd06d1af8c106d89ec1454fe6" }) {
        callsTurnUsageAdaptiveGroups(
          filter: {
          datetimeMinute_gt: "2024-07-15T02:07:07Z"
          datetimeMinute_lt: "2024-08-10T02:07:05Z"
          customIdentifier: "tango"
        }
          limit: 100
          orderBy: []
        ) {
          dimensions {
            keyId
            customIdentifier
          }
          sum {
            egressBytes
          }
        }
      }
    }
  }

```

```
---
header: Response
---
{
  "data": {
    "viewer": {
      "usage": [
        {
          "callsTurnUsageAdaptiveGroups": [
            {
              "dimensions": {
                "customIdentifier": "tango",
                "keyId": "74007022d80d7ebac4815fb776b9d3ed"
              },
              "sum": {
                "egressBytes": 162641324
              }
            }
          ]
        }
      ]
    }
  },
  "errors": null
}
```

### Usage as a timeseries (for graphs)
```
---
header: Query
---
query{
  viewer {
    usage: accounts(filter: { accountTag: "8846293bd06d1af8c106d89ec1454fe6" }) {
        callsTurnUsageAdaptiveGroups(
          filter: {
          datetimeMinute_gt: "2024-07-15T02:07:07Z"
          datetimeMinute_lt: "2024-08-10T02:07:05Z"
        }
          limit: 100
          orderBy: [datetimeMinute_ASC]
        ) {
          dimensions {
            datetimeMinute
          }
          sum {
            egressBytes
          }
        }
      }
    }
  }



```

```
---
header: Response
---
{
  "data": {
    "viewer": {
      "usage": [
        {
          "callsTurnUsageAdaptiveGroups": [
            {
              "dimensions": {
                "datetimeMinute": "2024-08-01T17:09:00Z"
              },
              "sum": {
                "egressBytes": 4570704
              }
            },
            {
              "dimensions": {
                "datetimeMinute": "2024-08-01T17:10:00Z"
              },
              "sum": {
                "egressBytes": 27203016
              }
            },
            {
              "dimensions": {
                "datetimeMinute": "2024-08-01T17:11:00Z"
              },
              "sum": {
                "egressBytes": 9067412
              }
            },
            {
              "dimensions": {
                "datetimeMinute": "2024-08-01T17:17:00Z"
              },
              "sum": {
                "egressBytes": 10059322
              }
            },
            ...
           ]
        }
      ]
    }
  },
  "errors": null
}
```