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
3. Add your endpoints [manually](#add-endpoints-manually), from [Schema Validation](#add-endpoints-from-schema-validation), or from [API Discovery](#add-endpoints-from-api-discovery).

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

## Add endpoints from Schema Validation

1. Add a schema by [configuring Schema Validation](/api-shield/security/schema-validation/configure/).
2. On **Review schema endpoints**, save new endpoints to endpoint management by checking the box.
3. Select **Save as draft** or **Save and Deploy**. Endpoints will be saved regardless of whether the Schema is saved as a draft or published.

API Shield will look for duplicate endpoints that have the same host, method, and path. Duplicate endpoints will not be saved to endpoint management.

{{<Aside type="Note">}}

If you deselect the save new endpoints to endpoint management box, the endpoints will not be added.

{{</Aside>}}

## Add endpoints manually

1. From Endpoint Management, select **Add endpoints** > **Manually add**.
2. Choose the method from the dropdown menu and add the path and hostname for the endpoint.
3. Select **Add endpoints**.

{{<Aside type="Note">}}

By selecting multiple checkboxes, you can add several endpoints from Discovery at once instead of individually.

{{</Aside>}}

When adding a path manually, you can specify variable fields by enclosing them in braces, `/api/user/{var1}/details`. 

For more information on how Cloudflare uses variables in API Shield, refer to the examples from [API Discovery](/api-shield/security/api-discovery/).

## Endpoint schema learning

Cloudflare learns schema parameters via traffic inspection. For all endpoints saved to Endpoint Management, you can export OpenAPI schemas in `v3.0.0` format by hostname. You can also include learned schema parameters.

### Export a schema

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Select **Security** > **API Shield**.
3. Navigate to **Endpoint Management**.
4. Select **Export schema** and choose a hostname to export.
5. Select whether to include [learned parameters](/api-shield/management-and-monitoring/#learned-schemas-will-always-include) and [rate limit recommendations](/api-shield/security/volumetric-abuse-detection/)
6. Select **Export schema** and choose a location to save the file.

{{<Aside type="Note">}} 

The schema is saved as a JSON file in OpenAPI `v3.0.0` format.

{{</Aside>}}

#### Learned schemas will always include:

- The listed hostname in the servers section
- All endpoints by host, method, and path
- Detected path variables

#### Learned schemas can optionally include:

- Detected query parameters and its format
- API Shield’s rate limit threshold recommendations

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

You can interact with Endpoint Management through the Cloudflare API. Refer to [Endpoint Management’s API documentation](https://developers.cloudflare.com/api/operations/api-shield-endpoint-management-retrieve-api-discovery-results-for-a-zone) for more information.

