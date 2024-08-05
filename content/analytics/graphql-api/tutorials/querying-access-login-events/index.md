---
pcx_content_type: example
title: Querying Access login events with GraphQL
---

# Querying Access login events with GraphQL

In this example, we are going to use the GraphQL Analytics API to retrieve logs for an Access login event. These logs are particularly useful for determining why a user received a `403` Forbidden error, since they surface additional data beyond what is shown in the dashboard Access logs.

The following API call will request logs for a single Access login event and output the requested fields. The authentication request is identified by its **Ray ID**, which you can obtain from the `403` Forbidden page shown to the user.

You will need to insert your API credentials in `<EMAIL>` and `<API_KEY>` and substitute your own values for the following variables:

- `accountTag`: Your Cloudflare account ID.
- `rayID`: A unique identifier assigned to the authentication request.
- `datetimeStart`: The earliest event time to query (no earlier than September 16, 2022).
- `datetimeEnd`: The latest event time to query. Be sure to specify a time range that includes the login event you are querying.

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
    "accountTag": "699d98642c564d2e855e9661899b7252",
    "rayId": "74e4ac510dfdc44f",
    "datetimeStart": "2022-09-20T14:36:38Z",
    "datetimeEnd": "2022-09-22T14:36:38Z"
}
}' | tr -d '\n' | curl --silent \
https://api.cloudflare.com/client/v4/graphql \
--header "Authorization: Bearer <API_TOKEN>" \
--header "Accept: application/json" \
--header "Content-Type: application/json" \
--data @- | jq .
```

{{<Aside type="note">}}
Rather than filter by `cfRayId`, you may also [filter](/analytics/graphql-api/features/filtering/) by any other field in the query such as `userUuid` or `deviceId`.
{{</Aside>}}

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

You can compare the query results to your Access policies to understand why a user was blocked. For example, if your application requires a valid mTLS certificate, Access blocked the request shown above because `mtlsStatus`, `mtlsCommonName`, and `mtlsCertSerialId` are empty.
