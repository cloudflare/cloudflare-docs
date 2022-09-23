---
pcx_content_type: tutorial
title: Querying Access login events with GraphQL
---

# Querying Access login events with GraphQL

In this example, we are going to use the GraphQL Analytics API to query for Magic Firewall Samples over a specified time period.

The following API call will request Magic Firewall Samples over a one hour period, and output the requested fields. Be sure to replace `CLOUDFLARE_ACCOUNT_ID`, `CLOUDFLARE_EMAIL`, and `CLOUDFLARE_API_KEY` with your zone tag and API credentials, and adjust the `datetime_geg` and `datetime_leq` values to your liking.

NOTE: Rather than filter by Ray ID, you may also filter by any other fields listed above (e.g., userUuid or deviceId). Documentation for filtering can be found here: https://graphql-docs.cfdata.org/reference/filtering/.



## API Call

```bash
echo '{ "query":
  "query accessLoginRequestsAdaptiveGroups($accountTag: string, $rayId: string, $datetimeStart: string, $datetimeEnd: string) {
    viewer {
      accounts(filter: {accountTag: $accountTag}) {
        accessLoginRequestsAdaptiveGroups(limit: 100, filter: {datetime_geq: $datetimeStart, datetime_leq: $datetimeEnd, cfRayId: $rayId}, orderBy: [datetime_ASC]) {
          dimensions {
            datetime
            isSuccessfulLogin
            hasWarpEnabled
            hasGatewayEnabled
            hasExistingJWT
            approvingPolicyId
            cfRayId
            ipAddress
            userUuid
            identityProvider
            country
            deviceId
            mtlsStatus
            mtlsCertSerialId
            mtlsCommonName
            serviceTokenId
          }
        }
      }
    }
  }",
  "variables": {
    "accountTag": "1080348b2df3bd07d1fb5237cd5d593a",
    "rayId": "74e4ac510dfdc44f",
    "datetimeStart": "2022-09-20T14:36:38Z",
    "datetimeEnd": "2022-09-22T14:36:38Z"
}
}' | tr -d '\n' | curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H "X-Auth-Email: <EMAIL>" \
  -H "X-Auth-key: <API KEY>" \
  -s \
  -d @- \
  https://api.cloudflare.com/client/v4/graphql/
```

The returned values represent the total number of packets and bits received during the five minute interval for a particular rule. The result will be in JSON (as requested), so piping the output to `jq` will make it easier to read, like in the following example:

```bash
... | curl \
  -X POST \
  -H "Content-Type: application/json" \
  -H "X-Auth-Email: CLOUDFLARE_EMAIL" \
  -H "X-Auth-key: CLOUDFLARE_API_KEY" \
  -s \
  -d @- \
  https://api.cloudflare.com/client/v4/graphql/ | jq .
```

## Response

```json
{
  "data": {
    "viewer": {
      "accounts": [
        {
          "accessLoginRequestsAdaptiveGroups": [
            {
              "dimensions": {
                "approvingPolicyId": "",
                "cfRayId": "744927037ce06d68",
                "country": "US",
                "datetime": "2022-09-02T20:56:27Z",
                "deviceId": "",
                "hasExistingJWT": 0,
                "hasGatewayEnabled": 0,
                "hasWarpEnabled": 0,
                "identityProvider": "nonidentity",
                "ipAddress": "2a09:bac0:15::814:7b37",
                "isSuccessfulLogin": 0,
                "mtlsCertSerialId": "",
                "mtlsCommonName": "",
                "mtlsStatus": "NONE",
                "serviceTokenId": "",
                "userUuid": ""
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
