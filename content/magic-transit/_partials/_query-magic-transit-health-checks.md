---
_build:
  publishResources: false
  render: never
  list: never
---

# Querying Magic Transit tunnel health check results with GraphQL

In this example, you are going to use the GraphQL Analytics API to query Magic Transit health check results which are aggregated from individual health checks carried out by Cloudflare servers to Generic Routing Encapsulation (GRE) tunnels you have set up to work with Magic Transit during the [onboarding process](/magic-transit/get-started/). You can query up to one week of data for dates up to three months ago.

The following API call will request a particular account's tunnel health checks over a one day period for a particular Cloudflare data center, and outputs the requested fields. Be sure to replace `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_EMAIL`, and `CLOUDFLARE_API_KEY` with your API credentials, and adjust the `datetimeStart`, `datetimeEnd` variables as needed.

It will return the tunnel health check results by Cloudflare data center. The result for each data center is aggregated from the healthchecks conducted on individual servers. The tunnel state field in the value represents the [state of the tunnel](/magic-transit/reference/probe-construction/). These states are used by Magic Transit for [routing](/magic-transit/reference/probe-construction/). The value `0` for the tunnel state represents it being down, the value `0.5` being degraded and the value `1` as healthy.

## API Call

```bash
echo '{ "query":
  "query GetTunnelHealthCheckResults($accountTag: string, $datetimeStart: string, $datetimeEnd: string) {
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
  }",
  "variables": {
    "accountTag": "CLOUDFLARE_ACCOUNT_ID",
    "datetimeStart": "2022-08-04T00:00:00.000Z",
    "datetimeEnd": "2022-08-04T01:00:00.000Z"
  }
}' | tr -d '\n' | curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H "X-Auth-Email: CLOUDFLARE_EMAIL" \
  -H "X-Auth-key: CLOUDFLARE_API_KEY" \
  -s \
  -d @- \
  https://api.cloudflare.com/client/v4/graphql/
```

The results returned will be in JSON (as requested), so piping the output to `jq` will make them easier to read, like in the following example:

```bash
... | curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H "X-Auth-Email: CLOUDFLARE_EMAIL" \
  -H "X-Auth-key: CLOUDFLARE_API_KEY" \
  -s \
  -d @- \
  https://api.cloudflare.com/client/v4/graphql/ | jq .
#=> {
#=>   "data": {
#=>     "viewer": {
#=>       "accounts": [
#=>         {
#=>           "conduitEdgeTunnelHealthChecks": [
#=>             {
#=>               {
#=>                 "avg": {
#=>                   "tunnelState": 1
#=>                 },
#=>                 "dimensions": {
#=>                   "edgeColoName": "mel01",
#=>                   "tunnelName": "tunnel_01",
#=>                   "tunnelState": 0.5
#=>                 }
#=>               },
#=>               {
#=>                 "avg": {
#=>                   "tunnelState": 0.5
#=>                 },
#=>                 "count": 310,
#=>                 "dimensions": {
#=>                   "edgeColoName": "mel01",
#=>                   "tunnelName": "tunnel_02",
#=>                   "tunnelState": 0.5
#=>                 }
#=>               }
#=>           ]
#=>         }
#=>       ]
#=>     }
#=>   },
#=>   "errors": null
#=> }
```