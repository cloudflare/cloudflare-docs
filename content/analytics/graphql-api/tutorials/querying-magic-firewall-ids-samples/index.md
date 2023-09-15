---
pcx_content_type: tutorial
title: Querying Magic Firewall Intrusion Detection System (IDS) samples with GraphQL
---

# Querying Magic Firewall Intrusion Detection System (IDS) samples with GraphQL

In this example, we are going to use the GraphQL Analytics API to query for IDS samples over a specified time period.

The following API call will request IDS samples over a one hour period, and output the requested fields. Be sure to replace `<CLOUDFLARE_ACCOUNT_ID>`, `<CLOUDFLARE_EMAIL>`, and `<CLOUDFLARE_API_KEY>` with your account tag and API credentials, and adjust the `datetime_geg` and `datetime_leq` values to your liking.

## API Call

```bash
echo '{ "query":
  "query IDSActivity {
    viewer {
      accounts(filter: { accountTag: $accountTag }) {
        magicIDPSNetworkAnalyticsAdaptiveGroups(
          filter: $filter
          limit: 10
        ) {
          sum {
            bits
            packets
          }
          dimensions {
            datetimeFiveMinutes
          }
        }
      }
    }
  }",
  "variables": {
    "accountTag": "<CLOUDFLARE_ACCOUNT_ID>",
    "filter": {
      "datetime_geq": "2023-06-20T11:00:00.000Z",
      "datetime_leq": "2023-06-20T12:00:00.000Z",
      "verdict": "drop",
      "outcome": "pass"
    }
  }
}' | tr -d '\n' | curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H "X-Auth-Email: <CLOUDFLARE_EMAIL>" \
  -H "X-Auth-key: <CLOUDFLARE_API_KEY>" \
  -s \
  -d @- \
  https://api.cloudflare.com/client/v4/graphql/
```

The returned values represent the total number of packets and bits that matched IDS rules during the five minute interval. The result will be in JSON (as requested), so piping the output to `jq` will make it easier to read, like in the following example:

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
#=>           "magicIDPSNetworkAnalyticsAdaptiveGroups": [
#=>             {
#=>               sum: { bits:  327680, packets: 16384 },
#=>               dimensions: {
#=>                 datetimeFiveMinute: '2021-05-12T22:00-00:00'
#=>               }
#=>             },
#=>             {
#=>               sum: { bits:  360448, packets: 8192 },
#=>               dimensions: {
#=>                 datetimeFiveMinute: '2021-05-12T22:05-00:00'
#=>               }
#=>             },
#=>             {
#=>               sum: { bits:  327680, packets: 8192 },
#=>               dimensions: {
#=>                 datetimeFiveMinute: '2021-05-12T22:05-00:00'
#=>               }
#=>             },
#=>             {
#=>               sum: { bits:  360448, packets: 8192 },
#=>               dimensions: {
#=>                 datetimeFiveMinute: '2021-05-12T22:20-00:00'
#=>               }
#=>             },
#=>             {
#=>               sum: { bits:  327680, packets: 8192 },
#=>               dimensions: {
#=>                 datetimeFiveMinute: '2021-05-12T22:20-00:00'
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