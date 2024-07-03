---
pcx_content_type: how-to
type: overview
title: API Routing
weight: 2
---

# Route your API endpoints using API Routing

API Shield Routing enables customers to create a unified external-facing API that routes requests to different back-end services that may have different paths and hosts than the existing zone and DNS configuration.

{{<Aside type="note">}}
The term **Source Endpoint** refers to the endpoint managed by API Shield in Endpoint Management. The term **Target Endpoint** refers to the ultimate destination the request is sent to by the Routing feature.
{{</Aside>}}

## Process

{{<render file="_source-endpoints.md">}}

Once your Source Endpoints are added to Endpoint Management, use the following steps to create and verify routes on any given operation ID:

### Create a route

{{<render file="_routing.md" withParameters="Create;;route">}}

{{<render file="_routing-path-variables.md">}}

### Edit a route

{{<render file="_routing.md" withParameters="Edit;;routing">}}

### Remove a route

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Select **Security** > **API Shield**.
3. In **Endpoint Management**, select an existing endpoint and expand its details.
4. Under **Routing**, select **Edit routing**.
5. Select **Delete route**. 

### Test a route

After sending a request to your Source Endpoint, you should see the contents of the back-end service as if you called the Target Endpoint directly. 

If API Shield returns unexpected results, check your Source Endpoint host, method, and path and [verify the Route](/api-shield/management-and-monitoring/api-routing/#verify-a-route) to ensure the Target Endpoint value is correct. 

{{<Aside type="note">}}
You may need to wait up to five minutes for Route changes to synchronize across the Cloudflare network.
{{</Aside>}}

## Availability

API Shield Routing is currently in an open beta and is only available for Enterprise customers subscribed to API Shield. Enterprise customers who have not purchased API Shield can preview [API Shield as a non-contract service](https://dash.cloudflare.com/?to=/:account/:zone/security/api-shield) in the Cloudflare dashboard or by contacting your account team.

## Limitations

{{<render file="_routing-limitations.md">}}