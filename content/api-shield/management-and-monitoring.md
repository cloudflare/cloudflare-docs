---
pcx_content_type: concept
type: overview
title: Management and Monitoring
weight: 3
---

# Endpoint Management

Monitor the health of your API endpoints by saving, updating, and monitoring performance metrics using API Shield’s Endpoint Management.

**Add endpoints** allows customers to save endpoints directly from [API Discovery](/api-shield/security/api-discovery/) or manually by method, path, and host.

This will add the specified endpoints to your list of managed endpoints. You can view your list of saved endpoints in the **Endpoint Management** page.

Cloudflare will start collecting [performance data](/api-shield/management-and-monitoring/#endpoint-performance-analysis) on your endpoint when you save an endpoint.

## Access

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and domain.
2. Select **Security** > **API Shield**.
3. Add your endpoints [manually](#add-endpoints-manually) or from [API Discovery](#add-endpoints-from-api-discovery).

## Add endpoints from API Discovery

There are two ways to add API endpoints from Discovery. 

### Add from the Endpoint Management Tab

1. From Endpoint Management, select **Add endpoints** > **Select from Discovery** tab.
2. Select the discovered endpoints you would like to add.
3. Select **Add endpoints**.

### Add from the Discovery Tab
1. From Endpoint Management, select the **Discovery** tab.
2. Select the discovered endpoints you would like to add.
3. Select **Save selected endpoints**.

## Add endpoints manually

1. From Endpoint Management, select **Add endpoints** > **Manually add**.
2. Choose the method from the dropdown menu and add the path and hostname for the endpoint.
3. Select **Add endpoints**.

{{<Aside type="Note">}}

By selecting multiple checkboxes, you can add several endpoints from Discovery at once instead of individually.

{{</Aside>}}

When adding a path manually, you can specify variable fields by enclosing them in braces, `/api/user/{var1}/details`. 

For more information on how Cloudflare uses variables in API Shield, refer to the examples from [API Discovery](/api-shield/security/api-discovery/).

## Endpoint Performance Analysis

For each saved endpoint, customers can view:

* **Request count**: The total number of requests to the endpoint over time.
* **Rate limiting recommendation**: per 10 minutes. This is guided by the request count.
* **Latency**: The average origin response time in milliseconds (ms). This metric shows how long it takes from the moment a visitor makes a request to the moment the visitor gets a response back from the origin.
* **Error rate** vs. overall traffic: grouped by `4xx`, `5xx`, and their sum.
* **Response size**: The average size of the response (in bytes) returned to the request.

{{<Aside type="Note">}}

Customers viewing analytics have the ability to toggle detailed metrics view between the last 24 hours and 7 days.

{{</Aside>}}

## Using the Cloudflare API

You can interact with Endpoint Management through the Cloudflare API. Refer to [Endpoint Management’s API documentation](https://api.cloudflare.com/#api-shield-endpoint-management-properties) for more information.

