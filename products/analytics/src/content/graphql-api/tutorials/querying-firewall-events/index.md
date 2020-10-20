---
title: Querying Firewall Events with GraphQL
order: 50
---

# Querying Firewall Events with GraphQL

In this example, we're going to use the GraphQL Analytics API to query for Firewall Events over a specified time period.

The following API call will request Firewall Events over a one hour period, and output the requested fields. Be sure to replace CLOUDFLARE_ZONE_ID, CLOUDFLARE_EMAIL, and CLOUDFLARE_API_KEY with your zone tag and API credentials, and adjust the datetime_geg and datetime_leq values to your liking.

## API Call

```
PAYLOAD='{ "query":
  "query ListFirewallEvents($zoneTag: string, $filter: FirewallEventsAdaptiveFilter_InputObject) {
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
      "zoneTag": "CLOUDFLARE_ZONE_ID",
      "filter": {
        "datetime_geq": "2020-04-24T11:00:00Z",
        "datetime_leq": "2020-04-24T12:00:00Z"
      }
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
      "zones": [
        {
          "firewallEventsAdaptive": [
            {
              "action": "log",
              "clientAsn": "5089",
              "clientCountryName": "GB",
              "clientIP": "203.0.113.69",
              "clientRequestPath": "/%3Cscript%3Ealert()%3C/script%3E",
              "clientRequestQuery": "",
              "datetime": "2020-04-24T10:11:24Z",
              "source": "waf",
              "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
            },
            {
              "action": "log",
              "clientAsn": "5089",
              "clientCountryName": "GB",
              "clientIP": "203.0.113.69",
              "clientRequestPath": "/%3Cscript%3Ealert()%3C/script%3E",
              "clientRequestQuery": "",
              "datetime": "2020-04-24T10:11:24Z",
              "source": "waf",
              "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
            },
            {
              "action": "log",
              "clientAsn": "5089",
              "clientCountryName": "GB",
              "clientIP": "203.0.113.69",
              "clientRequestPath": "/%3Cscript%3Ealert()%3C/script%3E",
              "clientRequestQuery": "",
              "datetime": "2020-04-24T10:11:24Z",
              "source": "waf",
              "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
            },
            {
              "action": "log",
              "clientAsn": "5089",
              "clientCountryName": "GB",
              "clientIP": "203.0.113.69",
              "clientRequestPath": "/%3Cscript%3Ealert()%3C/script%3E",
              "clientRequestQuery": "",
              "datetime": "2020-04-24T10:11:24Z",
              "source": "waf",
              "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
            },
            {
              "action": "log",
              "clientAsn": "5089",
              "clientCountryName": "GB",
              "clientIP": "203.0.113.69",
              "clientRequestPath": "/%3Cscript%3Ealert()%3C/script%3E",
              "clientRequestQuery": "",
              "datetime": "2020-04-24T10:11:24Z",
              "source": "waf",
              "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
            },
            {
              "action": "log",
              "clientAsn": "5089",
              "clientCountryName": "GB",
              "clientIP": "203.0.113.69",
              "clientRequestPath": "/%3Cscript%3Ealert()%3C/script%3E",
              "clientRequestQuery": "",
              "datetime": "2020-04-24T10:11:24Z",
              "source": "waf",
              "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
            },
            {
              "action": "log",
              "clientAsn": "5089",
              "clientCountryName": "GB",
              "clientIP": "203.0.113.69",
              "clientRequestPath": "/%3Cscript%3Ealert()%3C/script%3E",
              "clientRequestQuery": "",
              "datetime": "2020-04-24T10:11:24Z",
              "source": "waf",
              "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
            },
            {
              "action": "drop",
              "clientAsn": "5089",
              "clientCountryName": "GB",
              "clientIP": "203.0.113.69",
              "clientRequestPath": "/%3Cscript%3Ealert()%3C/script%3E",
              "clientRequestQuery": "",
              "datetime": "2020-04-24T10:11:24Z",
              "source": "waf",
              "userAgent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/80.0.3987.163 Safari/537.36"
            },
            {
              "action": "log",
              "clientAsn": "58224",
              "clientCountryName": "IR",
              "clientIP": "2.183.175.37",
              "clientRequestPath": "/api/v2",
              "clientRequestQuery": "",
              "datetime": "2020-04-24T10:00:54Z",
              "source": "waf",
              "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"
            },
            {
              "action": "log",
              "clientAsn": "58224",
              "clientCountryName": "IR",
              "clientIP": "2.183.175.37",
              "clientRequestPath": "/api/v2",
              "clientRequestQuery": "",
              "datetime": "2020-04-24T10:00:54Z",
              "source": "waf",
              "userAgent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/74.0.3729.169 Safari/537.36"
            }
          ]
        }
      ]
    }
  },
  "errors": null
}
```
