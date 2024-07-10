---
pcx_content_type: how-to
title: Execute a GraphQL query with curl
weight: 61
---

# Execute a GraphQL query with curl

Using a plain curl to send a query provides the ability to slice-n-dice with the
results and apply post-processing if needed. For example, [converting][1]
results received from GraphQL API into a CSV format.

For more functionality, like auto-completion, schema exploring, etc., you can
look at GraphQL [clients][2].

GraphQL API expects JSON with two essentials fields: "query" and "variables".

A query should be stripped from newline symbols and sent as a single-line string
when the variables is an object full of values for all placeholders used in the
query:

```json
---
header: A payload structure for GraphQL API
---
{
  "query": "{viewer { ... }}",
  "variables": {}
}
```

It is still possible to use a human-friendly query though. In the example below
you can see how `echo` piped together with `tr` to provide a proper payload with
`curl`:

```bash
---
header: Example bash script that uses curl to query Analytics API
---
echo '{ "query":
  "{
    viewer {
      zones(filter: { zoneTag: $zoneTag }) {
        firewallEventsAdaptive(
          filter: $filter
          limit: 10
          orderBy: [datetime_DESC]
        ) {
          action
          clientAsn
          clientCountryName
          clientIP
          clientRequestPath
          clientRequestQuery
          datetime
          source
          userAgent
        }
      }
    }
  }",
  "variables": {
    "zoneTag": "<zone-tag>",
    "filter": {
      "datetime_geq": "2022-07-24T11:00:00Z",
      "datetime_leq": "2022-07-24T12:00:00Z"
    }
  }
}' | tr -d '\n' | curl \
  https://api.cloudflare.com/client/v4/graphql/ \
  --header "X-Auth-Email: <EMAIL>" \
  --header "X-Auth-Key: <API_KEY>" \
  --header "Content-Type: application/json" \
  --silent \
  --data @-
```

[1]: </analytics/graphql-api/tutorials/export-graphql-to-csv/>
[2]: </analytics/graphql-api/getting-started/compose-graphql-query/>
