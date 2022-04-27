---
pcx-content-type: tutorial
title: Querying Magic Transit tunnel bandwidth analytics with GraphQL
---

# Querying Magic Transit tunnel bandwidth analytics with GraphQL

In this example, you are going to use the GraphQL Analytics API to query Magic Transit Ingress Tunnel Traffic over a specified time period.

The following API call will request Magic Transit Ingress Tunnel Traffic over a one-hour period and output the requested fields. Be sure to replace `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_EMAIL`, and `CLOUDFLARE_API_KEY` with your email and API credentials, and adjust the `datetime_geq` and `datetime_leq `values as needed. 

The following example queries for ingress traffic. To query for egress, change the value in the direction filter.

## API Call

```bash
CLOUDFLARE_EMAIL=<CLOUDFLARE_EMAIL>
CLOUDFLARE_API_KEY=<CLOUDFLARE_API_KEY>
PAYLOAD='{ "query":
  "query GetTunnelHealthCheckResults($accountTag: string, $datetimeStart: string, $datetimeEnd: string) {
    {
      viewer {
        accounts(filter: {accountTag: $accountTag}) {
          magicTransitTunnelTrafficAdaptiveGroups(
            limit: 100,
            filter: {
              datetime_geq: $datetimeStart,
              datetime_lt:  $datetimeEnd,
              direction: "ingress"             }
          ) {
            avg {
              bitRateFiveMinutes
            }
            dimensions {
              tunnelName
              datetimeFiveMinutes
            }
          }
        }
      }
    }
  }",
    "variables": {
      "accountTag": "90f518ca7113dc0a91513972ba243ba5",
      "datetimeStart": "2020-05-04T11:00:00.000Z",
      "datetimeEnd": "2020-05-04T12:00:00.000Z"
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

The returned values represent the total bandwidth in bits/second during the five minute interval for a particular tunnel. To use aggregations other than five minutes, make sure that you use the same window for both your metric and date time. For example, to see hourly groups, use `bitRateHour` and `datetimeHour`.

The result will be in JSON (as requested), so piping the output to `jq` will make it easier to read, like in the following example:

```bash
curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H "X-Auth-Email: <CLOUDFLARE_EMAIL>" \
  -H "X-Auth-key: <CLOUDFLARE_API_KEY>" \
  --data "$(echo $PAYLOAD)" \
  https://api.cloudflare.com/client/v4/graphql/ | jq .
#=> {
#=>   "data": {
#=>     "viewer": {
#=>       "accounts": [
#=>         {
#=>           "magicTransitTunnelTrafficAdaptiveGroups": [
#=>             {
#=>               avg: { bitRateFiveMinutes:  327680 },
#=>               dimensions: {
#=>                 datetimeFiveMinute: '2021-05-12T22:00-00:00',
#=>                 tunnelName: 'tunnel_name'
#=>               }
#=>             },
#=>             {
#=>               avg: { bitRateFiveMinutes:  627213680 },
#=>               dimensions: {
#=>                 datetimeFiveMinute: '2021-05-12T22:05-00:00',
#=>                 tunnelName: 'another_tunnel'
#=>              }
#=>             }
#=>           ]
#=>         }
#=>       ]
#=>     }
#=>   },
#=>   "errors": null
#=> }
```
