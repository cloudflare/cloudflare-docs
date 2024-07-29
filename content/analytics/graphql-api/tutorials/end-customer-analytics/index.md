---
pcx_content_type: tutorial
title: Querying HTTP events by hostname with GraphQL
---

# Querying HTTP events by hostname with GraphQL

## Aggregated HTTP metrics by hostname over time

In this example, we are going to use the GraphQL Analytics API to query aggregated metrics about HTTP events by hostname over a specific period of time.

The following API call will request the number of visits and edge response bytes for the custom hostname `hostname.example.com` over a four day period. Be sure to replace `CLOUDFLARE_ZONE_ID` AND `CLOUDFLARE_API_TOKEN` with your zone ID and API credentials, and adjust the `datetime_geq` and `datetime_leq` values as needed.

### API Call

```bash
echo '{ "query":
  "query RequestsAndDataTransferByHostname($zoneTag: string, $filter:filter) {
    viewer {
      zones(filter: {zoneTag: $zoneTag}) {
        httpRequestsAdaptiveGroups(limit: 10, filter: $filter) {
          sum {
            visits
            edgeResponseBytes
          }
          dimensions {
            datetimeHour
          }
        }
      }
    }
  }",
  "variables": {
    "zoneTag": "CLOUDFLARE_ZONE_ID",
    "filter": {
      "datetime_geq": "2022-07-20T11:00:00Z",
      "datetime_lt": "2022-07-24T12:00:00Z",
      "clientRequestHTTPHost": "hostname.example.com",
      "requestSource": "eyeball"
    }
  }
}' | tr -d '\n' | curl \
  --header "Authorization: Bearer <API_TOKEN>" \
  --header "Accept: application/json" \
  --silent \
  --data @- \
  https://api.cloudflare.com/client/v4/graphql | jq .
```

The returned results will be in JSON format (as requested), so piping the output to `jq` will make them easier to read, like in the following example:

```json
{
  "data": {
    "viewer": {
      "zones": [
        {
          "httpRequestsAdaptiveGroups": [
            {
              "dimensions": {
                "datetimeHour": "2022-07-21T10:00:00Z"
              },
              "sum": {
                "edgeResponseBytes": 19849385,
                "visits": 4383
              }
            },
            {
              "dimensions": {
                "datetimeHour": "2022-07-21T06:00:00Z"
              },
              "sum": {
                "edgeResponseBytes": 20607204,
                "visits": 4375
              }
            },
            {
              "dimensions": {
                "datetimeHour": "2022-07-26T05:00:00Z"
              },
              "sum": {
                "edgeResponseBytes": 20170839,
                "visits": 4519
              }
            },
            {
              "dimensions": {
                "datetimeHour": "2022-07-23T08:00:00Z"
              },
              "sum": {
                "edgeResponseBytes": 20141860,
                "visits": 4448
              }
            },
            {
              "dimensions": {
                "datetimeHour": "2022-07-25T15:00:00Z"
              },
              "sum": {
                "edgeResponseBytes": 21070367,
                "visits": 4469
              }
            },
            {
              "dimensions": {
                "datetimeHour": "2022-07-28T08:00:00Z"
              },
              "sum": {
                "edgeResponseBytes": 19200774,
                "visits": 4345
              }
            },
            {
              "dimensions": {
                "datetimeHour": "2022-07-26T02:00:00Z"
              },
              "sum": {
                "edgeResponseBytes": 20758067,
                "visits": 4502
              }
            },
            {
              "dimensions": {
                "datetimeHour": "2022-07-20T19:00:00Z"
              },
              "sum": {
                "edgeResponseBytes": 22127811,
                "visits": 4443
              }
            },
            {
              "dimensions": {
                "datetimeHour": "2022-07-27T15:00:00Z"
              },
              "sum": {
                "edgeResponseBytes": 20480644,
                "visits": 4268
              }
            },
            {
              "dimensions": {
                "datetimeHour": "2022-07-27T17:00:00Z"
              },
              "sum": {
                "edgeResponseBytes": 19885704,
                "visits": 4287
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

## Top 10 consuming URLs in a zone

We are going to use the GraphQL Analytics API to query the top 10 consuming URLs from a zone, helping you identify the URLs with the highest resource usage. Here are some configuration instructions:

- To filter on a specific hostname, add the line `"clientRequestHTTPHost": "'$2'"` below `"requestSource"`." 
- Replace `API_TOKEN` with your generated API token using the `Read all resources` permissions. The script will only access zones available to the token's creator. 
- Pass the zone ID as a parameter `ARG=$1`. 
- To calculate the current date and the date from 30 days ago, use `gdate` on Mac:
  - `CURRENTDATE=$(gdate -u +'%FT%TZ')` 
  - `OLDDATE=$(gdate -d '-30 days' -u +'%FT%TZ')`. 
- For specific dates within the last 30 days, set `CURRENTDATE` and `OLDDATE` variables in the format `"YYYY-MM-DDTHH:MM:SSZ"`.

### API call

```bash
curl --silent \
https://api.cloudflare.com/client/v4/graphql \
--header "Authorization: Bearer $API_TOKEN" \
--header "Content-Type: application/json" \
--data '{
  "query": "{viewer {zones(filter: {zoneTag: $zoneTag}) {topPaths: httpRequestsAdaptiveGroups(filter: $filter, limit: 10, orderBy: [sum_edgeResponseBytes_DESC]) {count sum {edgeResponseBytes} dimensions {metric: clientRequestPath}}}}}",
  "variables": {
    "zoneTag": "'$ARG'",
    "filter": {
      "AND": [
        {
          "datetime_geq": "'$OLDDATE'",
          "datetime_leq": "'$CURRENTDATE'"
        },
        {
          "requestSource": "eyeball"
        }
      ]
    }
  }
}' | jq -r 'try .data.viewer.zones[].topPaths[] | "\"\(.dimensions.metric)\": \(.sum.edgeResponseBytes)"' | sort
```
