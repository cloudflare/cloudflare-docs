---
title: Use curl to query the Analytics API
order: 60
---

# Use curl to query the Analytics API

You can submit a [query built with the GraphiQL client](/graphql-api/getting-started/compose-graphql-query) as the payload in the `data` field of a POST request to the Analytics API.

The advantage of executing a request with [curl](https://curl.se/) is that you can redirect the response to a file and execute other post processing methods.

The GraphQL endpoint requires valid JSON, so you must pass the query as the _value_ part of a JSON _key:value_ pair with a key named `query`.

Pass the list of variables in another JSON _key:value_ pair with a key named `variables`.

The script below returns the firewall events in one zone over the last 24 hours:

```bash
---
header: Example bash script that uses curl to query Analytics API
---
#!/bin/bash
#
# This script fetches the last 24 hours of firewall events for the ZoneID passed
# in as the first parameter using the global key passed in as the second parameter.
######################################################################################
 
ZoneID="$1"
global_key="$2"
Email="user@domain.com"
#
# Calculate 24 hours back and produce the start and end times in the appropriate format.
back_seconds=60*60*24  # 24 hours
end_epoch=$(date +'%s')
let start_epoch=$end_epoch-$back_seconds
start_date=$(date --date="@$start_epoch" +'%Y-%m-%dT%H:%m:%SZ')
end_date=$(date --date="@$end_epoch" +'%Y-%m-%dT%H:%m:%SZ')
 
PAYLOAD='{ "query":
  "query {
    viewer {
      zones(filter: { zoneTag: $zoneTag }) {
      firewallEventsAdaptive(
        filter: $filter
        limit: 10000
        orderBy: [datetime_DESC, rayName_DESC]
      ) {
          action,
          datetime,
          rayName,
          clientRequestHTTPHost,
          userAgent
        }
      }
    }
  }",'
PAYLOAD="$PAYLOAD

  \"variables\": {
    \"zoneTag\": \"$ZoneID\",
    \"filter\": {
      \"datetime_gt\": \"$start_date\",
      \"datetime_leq\": \"$end_date\"
    }
  }
}"

# Run query to GraphQL API endpoint

curl -s -X POST -H "Content-Type: application/json" -H "X-Auth-Email: $Email" -H  "X-Auth-Key: $global_key" --data "$(echo $PAYLOAD)" https://api.cloudflare.com/client/v4/graphql/
```
