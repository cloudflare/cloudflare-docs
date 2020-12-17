---
title: Querying Magic Transit Tunnel Health Check Results with GraphQL
---

# Querying Magic Transit Tunnel Health Check Results with GraphQL

In this example, we're going to use the GraphQL Analytics API to query Magic Transit Health check results which are aggregated from individual health checks carried out by Cloudflare servers to GRE tunnels you've set up to work with Magic Transit during the [onboarding process](https://developers.cloudflare.com/magic-transit/set-up/onboarding). We can query up to one week of data for dates up to three months ago.

The following API call will request a particular account's tunnel health checks over a one day period for a particular Cloudflare colo, and outputs the requested fields. Be sure to replace `CLOUDFLARE_EMAIL` and `CLOUDFLARE_API_KEY` with your email and API credentials, and adjust the `datetimeStart`, `datetimeEnd` and `accountTag` variables as needed.

It will return the tunnel health check results by Cloudflare colo. The result for each colo is aggregated from the healthchecks conducted on individual servers. The tunnel state field in the value represents the [state of the tunnel](https://developers.cloudflare.com/magic-transit/about/health-checks/tunnel#health-state-and-prioritization). These states are used by Magic Transit for [routing](https://developers.cloudflare.com/magic-transit/about/health-checks/tunnel#failure). The value 0 for the tunnel state represents it being down, the value 0.5 being degraded and the value 1 as healthy.

## API Call

```
CLOUDFLARE_EMAIL=<CLOUDFLARE_EMAIL>
CLOUDFLARE_API_KEY=<CLOUDFLARE_API_KEY>
PAYLOAD='{ "query":
  "query GetTunnelHealthCheckResults($accountTag: string, $datetimeStart: string, $datetimeEnd: string) {
    {
      viewer {
        accounts(filter: {accountTag: $accountTag}) {
          magicTransitTunnelHealthChecksAdaptiveGroups(
            limit: 100,
            filter: {
              datetime_geq: $datetimeStart,
              datetime_lt:  $datetimeEnd,
            }
          ) {
            avg {
              tunnelState
            }
            dimensions {
              tunnelName
              edgeColoName
            }
          }
        }
      }
    }
  }",
    "variables": {
      "accountTag": "90f518ca7113dc0a91513972ba243ba5",
      "datetimeStart": "2020-05-04T00:00:00.000Z",
      "datetimeEnd": "2020-05-04T00:00:00.000Z"
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
                {
                  "avg": {
                    "tunnelState": 1
                  },
                  "dimensions": {
                    "edgeColoName": "mel01",
                    "tunnelName": "tunnel_01",
                    "tunnelState": 0.5
                  }
                },
                {
                  "avg": {
                    "tunnelState": 0.5
                  },
                  "count": 310,
                  "dimensions": {
                    "edgeColoName": "mel01",
                    "tunnelName": "tunnel_02",
                    "tunnelState": 0.5
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
