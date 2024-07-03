---
pcx_content_type: how-to
title: Configure
weight: 1
---

# Route your API endpoints using API Routing

API Shield Routing enables customers to create a unified external-facing API that routes requests to different back-end services that may have different paths and hosts than the existing zone and DNS configuration.

{{<Aside type="note">}}
The term **Source Endpoint** refers to the endpoint managed by API Shield in Endpoint Management. The term **Target Endpoint** refers to the ultimate destination the request is sent to by the Routing feature.
{{</Aside>}}

## Process

{{<render file="_source-endpoints.md">}}

Once your Source Endpoints are added to Endpoint Management, use the following API calls to create and verify routes on any given operation ID:

### Create a route

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

{{<render file="_routing-path-variables.md">}}

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

### Remove a route

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

### Test a route

After sending a request to your Source Endpoint, you should see the contents of the back-end service as if you called the Target Endpoint directly. 

If API Shield returns unexpected results, check your Source Endpoint host, method, and path and [verify the route](/api-shield/management-and-monitoring/api-routing/#verify-a-route) to ensure the Target Endpoint value is correct. 

{{<Aside type="note">}}
You may need to wait up to five minutes for route changes to synchronize across the Cloudflare network.
{{</Aside>}}

## Limitations

{{<render file="_routing-limitations.md">}}