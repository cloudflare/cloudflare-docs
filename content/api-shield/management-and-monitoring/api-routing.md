---
pcx_content_type: how-to
type: overview
title: API Routing
weight: 2
---

# API Routing

API Shield Routing enables customers to create a unified external-facing API that routes requests to different back-end services that may have different paths and hosts than the existing zone and DNS configuration.

{{<Aside type="note">}}
The term **Source Endpoint** refers to the endpoint managed by API Shield in Endpoint Management. The term **Target Endpoint** refers to the ultimate destination the request is sent to by the Routing feature.
{{</Aside>}}

## Process

You must add Source Endpoints to Endpoint Management through established methods, by [uploading a schema](/api-shield/security/schema-validation/#add-validation-by-uploading-a-schema), via [API Discovery](/api-shield/security/api-discovery/), or by [adding manually](/api-shield/management-and-monitoring/#add-endpoints-manually), before creating a Route.

To create a Route, you will need the operation ID of the Source Endpoint. To find the operation ID in the dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Select **Security** > **API Shield**.
3. Filter the endpoints to find your **Source Endpoint**.
4. Expand the row for your Source Endpoint and note the **operation ID** field.
5. Select the copy icon to copy the operation ID to your clipboard.

Once your Source Endpoints are added to Endpoint Management, use the following API calls to create and verify routes on any given operation ID:

### Create a Route

```bash
---
header: cURL command
---
curl --request PUT "https://api.cloudflare.com/client/v4/zones/{zoneID}/api_gateway/operations/{operationID}/route" \
--header "Content-Type: application/json" \
--data '{"route": "https://api.example.com/api/service"}'
```

```json
---
header: Response
---
{
  "result": {
    "route": "https://api.example.com/api/service"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

You can reorder path variables if they are present. For example, you can route `/api/{var1}/users/{var2}` to `/{var2}/users/{var1}`. Segments of the path that are not variables may be added or omitted entirely.

### Verify a Route

```bash
---
header: cURL command
---
curl --request GET "https://api.cloudflare.com/client/v4/zones/{zoneID}/api_gateway/operations/{operationID}/route" \
--header "Content-Type: application/json"
```

```json
---
header: Response
---
{
  "result": {
    "route": "https://api.example.com/api/service"
  },
  "success": true,
  "errors": [],
  "messages": []
}
```

### Remove a Route

```bash
---
header: cURL command
---
curl --request DELETE "https://api.cloudflare.com/client/v4/zones/{zoneID}/api_gateway/operations/{operationID}/route" \
--header "Content-Type: application/json"
```

```json
---
header: Response
---
{
  "result":{},
  "success":true,
  "errors":[],
  "messages":[]
}
```

### Test a Route

After sending a request to your Source Endpoint, you should see the contents of the back-end service as if you called the Target Endpoint directly. 

If API Shield returns unexpected results, check your Source Endpoint host, method, and path and [verify the Route](/api-shield/management-and-monitoring/api-routing/#verify-a-route) to ensure the Target Endpoint value is correct. 

{{<Aside type="note">}}
You may need to wait up to five minutes for Route changes to synchronize across the Cloudflare network.
{{</Aside>}}

## Availability

API Shield Routing is currently in an open beta and is only available for Enterprise customers subscribed to API Shield. Enterprise customers who have not purchased API Shield can preview [API Shield as a non-contract service](https://dash.cloudflare.com/?to=/:account/:zone/security/api-shield) in the Cloudflare dashboard or by contacting your account team.

## Limitations

The Target Endpoint cannot be routed to a Worker if the Route is to the same zone.

You cannot change the method of a request. For example, a `GET` Source Endpoint will always send a `GET` request to the Target Endpoint.

You must use all of the variables in the Target Endpoint that appear in the Source Endpoint. For example, routing `/api/{var1}/users/{var2}` to `/api/users/{var2}` is not allowed and will result in an error since `{var1}` is present in the Source Endpoint but not in the Target Endpoint.