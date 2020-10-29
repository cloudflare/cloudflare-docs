---
title: Querying Magic Transit Tunnel Health C3heck Results with GraphQL
order: 50
---

# Querying Magic Transit Tunnel Health C3heck Results with GraphQL

In this example, we're going to use the GraphQL Analytics API to query Magic Transit Healthcheck Results which are aggregated from individual health checks carried out by Cloudflare servers to GRE tunnels you've setup to work with Magic Transit during the [onboarding process](https://developers.cloudflare.com/magic-transit/set-up/onboarding). We can query up to one week of data for dates up to three months ago.

The following API call will request a particular account's tunnel health checks over a one day period for a particular Cloudflare colo, and outputs the requested fields. Be sure to replace `CLOUDFLARE_EMAIL` and `CLOUDFLARE_API_KEY` with your email and API credentials, and adjust the `datetimeStart`, `datetimeEnd` and `accountTag` variables as needed.

## API Call

```
CLOUDFLARE_EMAIL=<CLOUDFLARE_EMAIL>
CLOUDFLARE_API_KEY=<CLOUDFLARE_API_KEY>
PAYLOAD='{ "query":
  "query GetWorkersAnalytics($accountTag: string, $datetimeStart: string, $datetimeEnd: string, $scriptName: string) {
      viewer {
        accounts(filter: {accountTag: $accountTag}) {
          conduitEdgeTunnelHealthChecks(
            filter: {
              datetime_geq: "$datetimeStart",
              datetime_lt:  "$datetimeEnd",
              edgeColoName: "MEL"
            }
          ) {
              count
              dimensions{
                tunnelState
                tunnelName
                edgeColoName
              }
          }
        }
      }
    }",
    "variables": {
      "accountTag": "90f518ca7113dc0a91513972ba243ba5",
      "datetimeStart": "2020-05-04T00:00:00.000Z",
      "datetimeEnd": "2020-05-04T00:00:00.000Z",
    }
  }'

curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H "X-Auth-Email: CLOUDFLARE_EMAIL" \
  -H "X-Auth-key: CLOUDFLARE_API_KEY" \
  --data "$(echo $PAYLOAD)" \
  https://api.cloudflare.com/client/v4/graphql/
```

The results returned will be in JSON (as requested), so piping the output to `jq` will make them easier to read, e.g.,:

```
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H "X-Auth-Email: CLOUDFLARE_EMAIL" \
  -H "X-Auth-key: CLOUDFLARE_API_KEY" \
  --data "$(echo $PAYLOAD)" \
  https://api.cloudflare.com/client/v4/graphql/ | jq .
  {
    "data": {
      "viewer": {
        "accounts": [
          {
            "conduitEdgeTunnelHealthChecks": [
              {
                "count": 180,
                "dimensions": {
                  "edgeColoName": "MEL",
                  "tunnelName": "tunnel_01",
                  "tunnelState": 0.5
                }
              },
              {
                "count": 31900,
                "dimensions": {
                  "edgeColoName": "MEL",
                  "tunnelName": "tunnel_02",
                  "tunnelState": 1
                }
              },
              {
                "count": 31450,
                "dimensions": {
                  "edgeColoName": "MEL",
                  "tunnelName": "tunnel_01",
                  "tunnelState": 1
                }
              },
              {
                "count": 310,
                "dimensions": {
                  "edgeColoName": "MEL",
                  "tunnelName": "tunnel_02",
                  "tunnelState": 0.5
                }
              },
              {
                "count": 10,
                "dimensions": {
                  "edgeColoName": "MEL",
                  "tunnelName": "tunnel_01",
                  "tunnelState": 0
                }
              },
              {
                "count": 10,
                "dimensions": {
                  "edgeColoName": "MEL",
                  "tunnelName": "tunnel_02",
                  "tunnelState": 0
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
