---
title: Querying Workers Metrics with GraphQL
pcx_content_type: tutorial
---

# Querying Workers Metrics with GraphQL

In this example, we are going to use the GraphQL Analytics API to query for Workers Metrics over a specified time period. We can query up to one week of data for dates up to three months ago.

The following API call will request a Worker script's metrics over a one day period, and output the requested fields. Be sure to replace `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_EMAIL`, and `CLOUDFLARE_API_KEY` with your API credentials, and adjust the `datetimeStart`, `datetimeEnd`, and `scriptName` variables as needed.

## API Call

```bash
echo '{ "query":
  "query GetWorkersAnalytics($accountTag: string, $datetimeStart: string, $datetimeEnd: string, $scriptName: string) {
    viewer {
      accounts(filter: {accountTag: $accountTag}) {
        workersInvocationsAdaptive(limit: 100, filter: {
          scriptName: $scriptName,
          datetime_geq: $datetimeStart,
          datetime_leq: $datetimeEnd
        }) {
          sum {
            subrequests
            requests
            errors
          }
          quantiles {
            cpuTimeP50
            cpuTimeP99
          }
          dimensions{
            datetime
            scriptName
            status
          }
        }
      }
    }
  }",
  "variables": {
    "accountTag": "CLOUDFLARE_ACCOUNT_ID",
    "datetimeStart": "2022-08-04T00:00:00.000Z",
    "datetimeEnd": "2022-08-04T01:00:00.000Z",
    "scriptName": "worker-subrequest-test-client"
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
#=>           "workersInvocationsAdaptive": [
#=>             {
#=>               "dimensions": {
#=>                 "datetime": "2020-05-04T18:10:35Z",
#=>                 "scriptName": "worker-subrequest-test-client",
#=>                 "status": "success"
#=>               },
#=>               "quantiles": {
#=>                 "cpuTimeP50": 206,
#=>                 "cpuTimeP99": 206
#=>               },
#=>               "sum": {
#=>                 "errors": 0,
#=>                 "requests": 1,
#=>                 "subrequests": 0
#=>               }
#=>             },
#=>             {
#=>               "dimensions": {
#=>                 "datetime": "2020-05-04T18:10:34Z",
#=>                 "scriptName": "worker-subrequest-test-client",
#=>                 "status": "success"
#=>               },
#=>               "quantiles": {
#=>                 "cpuTimeP50": 291,
#=>                 "cpuTimeP99": 291
#=>               },
#=>               "sum": {
#=>                 "errors": 0,
#=>                 "requests": 1,
#=>                 "subrequests": 0
#=>               }
#=>             },
#=>             {
#=>               "dimensions": {
#=>                 "datetime": "2020-05-04T18:10:49Z",
#=>                 "scriptName": "worker-subrequest-test-client",
#=>                 "status": "success"
#=>               },
#=>               "quantiles": {
#=>                 "cpuTimeP50": 212.5,
#=>                 "cpuTimeP99": 261.19
#=>               },
#=>               "sum": {
#=>                 "errors": 0,
#=>                 "requests": 4,
#=>                 "subrequests": 0
#=>               }
#=>             }
#=>           ]
#=>         }
#=>       ]
#=>     }
#=>   },
#=>   "errors": null
#=> }
```
