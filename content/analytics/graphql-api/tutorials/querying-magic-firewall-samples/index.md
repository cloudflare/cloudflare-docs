---
pcx_content_type: tutorial
title: Querying Magic Firewall Samples with GraphQL
---

# Querying Magic Firewall Samples with GraphQL

In this example, we are going to use the GraphQL Analytics API to query for Magic Firewall Samples over a specified time period.

The following API call will request Magic Firewall Samples over a one hour period, and output the requested fields. Be sure to replace `<CLOUDFLARE_ACCOUNT_ID>`, `<EMAIL>`, and `<API_KEY>` with your zone tag and API credentials, and adjust the `datetime_geg` and `datetime_leq` values to your liking.

## API Call

```bash
echo '{ "query":
  "query MFWActivity {
    viewer {
      accounts(filter: { accountTag: $accountTag }) {
        magicFirewallSamplesAdaptiveGroups(
          filter: $filter
          limit: 10
          orderBy: [datetimeFiveMinute_DESC]
        ) {
          sum {
            bits
            packets
          }
          dimensions {
            datetimeFiveMinute
            ruleId
          }
        }
      }
    }
  }",
  "variables": {
    "accountTag": "<CLOUDFLARE_ACCOUNT_ID>",
    "filter": {
      "datetime_geq": "2022-07-24T11:00:00Z",
      "datetime_leq": "2022-07-24T11:10:00Z"
    }
  }
}' | tr -d '\n' | curl \
  --header "X-Auth-Email: <EMAIL>" \
  --header "X-Auth-Key: <API_KEY>" \
  --header "Content-Type: application/json" \
  --silent \
  --data @- \
  https://api.cloudflare.com/client/v4/graphql/
```

The returned values represent the total number of packets and bits received during the five minute interval for a particular rule. The result will be in JSON (as requested), so piping the output to `jq` will make it easier to read, like in the following example:

```bash
... | curl \
  --header "X-Auth-Email: <EMAIL>" \
  --header "X-Auth-Key: <API_KEY>" \
  --header "Content-Type: application/json" \
  --silent \
  --data @- \
  https://api.cloudflare.com/client/v4/graphql/ | jq .

#=> {
#=>   "data": {
#=>     "viewer": {
#=>       "accounts": [
#=>         {
#=>           "magicFirewallSamplesAdaptiveGroups": [
#=>             {
#=>               sum: { bits:  327680, packets: 16384 },
#=>               dimensions: {
#=>                 datetimeFiveMinute: '2021-05-12T22:00-00:00',
#=>                 ruleId: 'bdfa8f8f0ae142b4a70ef15f6160e532'
#=>               }
#=>             },
#=>             {
#=>               sum: { bits:  360448, packets: 8192 },
#=>               dimensions: {
#=>                 datetimeFiveMinute: '2021-05-12T22:05-00:00',
#=>                 ruleId: 'bdfa8f8f0ae142b4a70ef15f6160e532'
#=>               }
#=>             },
#=>             {
#=>               sum: { bits:  327680, packets: 8192 },
#=>               dimensions: {
#=>                 datetimeFiveMinute: '2021-05-12T22:05-00:00',
#=>                 ruleId: 'bdfa8f8f0ae142b4a70ef15f6160e532'
#=>               }
#=>             },
#=>             {
#=>               sum: { bits:  360448, packets: 8192 },
#=>               dimensions: {
#=>                 datetimeFiveMinute: '2021-05-12T22:20-00:00',
#=>                 ruleId: 'bdfa8f8f0ae142b4a70ef15f6160e532'
#=>               }
#=>             },
#=>             {
#=>               sum: { bits:  327680, packets: 8192 },
#=>               dimensions: {
#=>                 datetimeFiveMinute: '2021-05-12T22:20-00:00',
#=>                 ruleId: 'bdfa8f8f0ae142b4a70ef15f6160e532'
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
