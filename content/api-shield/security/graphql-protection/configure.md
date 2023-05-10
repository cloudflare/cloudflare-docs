---
title: Configure
pcx_content_type: how-to
type: overview
layout: list
meta:
  title: Configure GraphQL malicious query protection
---

# Configure GraphQL malicious query protection

Use the [Cloudflare GraphQL API](/analytics/graphql-api/getting-started/) to gather data about your GraphQL API’s current usage and configure Cloudflare’s GraphQL malicious query protection to log or block malicious queries.

## Introduction

Query size is defined as the number of terminal fields (leaves) in the query, whereas query depth is the deepest level at which a leaf is present. For example, the size of this query will be reported as `4 (terminalField[1-4] all contribute to this counter)`, and the depth will be reported as `3 (terminalField3 and terminalField4 are at depth level 3)`.

```graphql
---
header: GraphQL query
---
{
  terminalField1
  nonTerminalField1(filter: 123) {
    terminalField2
    nonTerminalField2 {
      terminalField3
      terminalField4
    }
  }
}
```

## Gather GraphQL statistics

Using the new `apiGatewayGraphqlQueryAnalyticsGroups` node in the Cloudflare GraphQL API, you can retrieve `apiGatewayGraphqlQuerySize` and `apiGatewayGraphqlQueryDepth` dimensions. 

```graphql
---
header: GraphQL query
---
query ApiGatewayGraphqlQueryAnalytics($zoneTag: string, $datetimeStart: Time, $datetimeEnd: Time) {
  viewer {
    zones(filter: {zoneTag: $zoneTag}) {
      apiGatewayGraphqlQueryAnalyticsGroups(limit: 100,  orderBy: [apiGatewayGraphqlQuerySize_DESC, apiGatewayGraphqlQueryDepth_DESC], filter: {datetime_geq:$datetimeStart, datetime_leq:$datetimeEnd}) {
        count
        dimensions {
          apiGatewayGraphqlQuerySize
          apiGatewayGraphqlQueryDepth
        }
      }
    }
  }
}
```

With the above query, you will get the following response:

```json
---
header: Response
---
{
  "data": {
    "viewer": {
      "zones": [
        {
          "apiGatewayGraphqlQueryAnalyticsGroups": [
            {
              "count": 10,
              "dimensions": {
                "apiGatewayGraphqlQueryDepth": 1,
                "apiGatewayGraphqlQuerySize": 11
              }
            },
            {
              "count": 10,
              "dimensions": {
                "apiGatewayGraphqlQueryDepth": 1,
                "apiGatewayGraphqlQuerySize": 2
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

In the response example, Cloudflare observed 10 requests with depth 1 and size 11, and 10 requests with depth 1 and size 2 in the selected timeframe.

## Analyze GraphQL statistics

You can use the response to compute percentiles across the attributes and set a threshold on what is allowed. For example, you can use a simple heuristic like `1.5 * p99` for query size or depth. 

Here is a simple Python script that will report query size and depth p-levels given the GraphQL API response output above (as a JSON file):

```python
---
header: Python script
---

#!/usr/bin/env python3
 
import json
import numpy as np
import argparse
 
parser = argparse.ArgumentParser()
parser.add_argument("--response", help="Path to the API JSON response file with the apiGatewayGraphqlQueryAnalyticsGroups node", required=True)
args = parser.parse_args()
with open(args.response) as f:
    query_sizes = np.array([], dtype=np.uint16)
    query_depths = np.array([], dtype=np.uint8)
    data = json.load(f)['data']['viewer']['zones'][0]['apiGatewayGraphqlQueryAnalyticsGroups']
    for datapoint in data:
        query_sizes = np.append(query_sizes, [datapoint['dimensions']['apiGatewayGraphqlQuerySize']] * datapoint['count'])
        query_depths = np.append(query_depths, [datapoint['dimensions']['apiGatewayGraphqlQueryDepth']] * datapoint['count'])
     
    quantiles = [0.99, 0.95, 0.75, 0.5]
    print('\n'.join([f"Query size {int(q * 100)}th percentile is {v}" for q, v in zip(quantiles, np.quantile(query_sizes, quantiles))]))
    print('\n'.join([f"Query depth {int(q * 100)}th percentile is {v}" for q, v in zip(quantiles, np.quantile(query_depths, quantiles))]))
```

With the above query, you will get the following output:

```json
---
header: Example output
---
./calculator.py --response=response.json
Query size 99th percentile is 11.0
Query size 95th percentile is 11.0
Query size 75th percentile is 11.0
Query size 50th percentile is 6.5
Query depth 99th percentile is 1.0
Query depth 95th percentile is 1.0
Query depth 75th percentile is 1.0
Query depth 50th percentile is 1.0
```

## Set limits on incoming GraphQL queries

API Shield customers now have three new fields available in custom rules:

- `cf.api_gateway.graphql.query_size` describes the size of a GraphQL query.
- `cf.api_gateway.graphql.query_depth` describes the depth of a GraphQL query.
- `cf.api_gateway.graphql.parsed_successfully` describes whether Cloudflare was able to parse the query. Presently, we run best-effort parsing, meaning we might not be able to parse some valid queries. This means that you must use a `and cf.api_gateway.graphql.parsed_successfully` filter in your custom rules when deploying GraphQL security rules. 
<br />
For example, you can deploy the following rule via the API or the dashboard to block queries that are deeply nested but ask for a few fields.

```
---
header: Custom rule example
---
(cf.api_gateway.graphql.query_size < 3 and cf.api_gateway.graphql.query_depth > 15 and cf.api_gateway.graphql.parsed_successfully)
```

{{<Aside type="note">}}

You are not able to configure which endpoints the GraphQL parsing runs on. Requests are parsed if they are targeting a path ending in `/graphql`.

{{</Aside>}}