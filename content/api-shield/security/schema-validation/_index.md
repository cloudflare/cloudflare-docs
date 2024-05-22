---
pcx_content_type: concept
title: Schema Validation
weight: 8
---

# Schema Validation

{{<glossary-definition term_id="API schema">}}

Schema Validation allows you to check if incoming traffic complies with a previously supplied API schema. When you provide an API schema or select from a list of learned schema, API Shield creates rules for incoming traffic from the schema definitions. These rules define which traffic is allowed and which traffic gets logged or blocked.

Cloudflare has recently launched Schema Validation 2.0. For help configuring the previous version of Schema Validation for one or more hosts using the dashboard, refer to [Configure Classic Schema Validation](/api-shield/reference/classic-schema-validation/). You can make changes to your Classic Schema Validation settings but you cannot add any new schemas.

You can migrate to Schema Validation 2.0 manually by uploading your schemas to the new system, or you can wait for a future release where we will add an easy migrate option per-schema.

## Process

{{<glossary-tooltip term_id="API endpoint">}}Endpoints{{</glossary-tooltip>}} must be added to [Endpoint Management](/api-shield/management-and-monitoring/) for Schema Validation to protect them. Uploading a schema via the Cloudflare dashboard will automatically add endpoints, or you can manually add them from [API Discovery](/api-shield/security/api-discovery/). 

If you are uploading a schema via the API or Terraform, you must parse the schema and add your endpoints manually. 

{{<glossary-definition term_id="API endpoint">}}

{{<Aside type="note">}}
To view the contents in your learned schema, refer to [Export a schema](/api-shield/management-and-monitoring/#export-a-schema) in Endpoint Management.
{{</Aside>}}

### Add validation by uploading a schema

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Select **Security** > **API Shield**.
3. Go to **Schema Validation** and select **Add validation**.
4. Select your schema file for upload.
5. Observe the listed endpoints, their host, method, and path. Any new endpoints will automatically be added to Endpoint Management.
6. Choose an action for the non-compliant requests to your endpoints.
7. Select **Add schema and endpoints**.

{{<Aside type="note">}}
Changes may take a few minutes to process depending on the number of added endpoints.
{{</Aside>}}

### Add validation by applying a learned schema to a single endpoint

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Select **Security** > **API Shield**.
3. Go to **Schema Validation** and filter by the learned schema available.
4. Select **Apply learned schema**.
5. Choose an action and select **Apply schema**.

### Add validation by applying a learned schema to an entire hostname

At this time, learned schemas will not overwrite customer-uploaded schemas. If an endpoint is covered by a customer-uploaded schema and also appears in a learned schema, the **Changes** field is set to `Unaffected`.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Select **Security** > **API Shield**.
3. Go to **Schema Validation** and select **Add Validation**.
4. Select **Apply learned schema**.
5. Choose a hostname and review the endpoints that will be protected by the learned schema. 
6. (Optional) Change the action if a request does not match the schema.
7. Select **Apply schema**.
   
{{<Aside type="note">}}
If an endpoint is currently protected by a learned schema, the date of the last applied learned schema will be shown in the current schema field.
{{</Aside>}}

### Change the action of an entire schema

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Select **Security** > **API Shield**.
3. Go to **Schema Validation** and select the schema in the Schema list.
4. Check the multi-select box to select the endpoints shown on the current page.
5. Choose **Select all endpoints**.
6. Select **Change Action**.
7. Choose an action from the dropdown menu.
8. Select **Set action**.

### Change the global default action of Schema Validation

Schema Validation’s default action is visible on the main Schema Validation page. This action applies to any endpoint with its action set to `Default`. 

- `Log` action: logs events to [Firewall Events](/firewall/).
- `Block` action: blocks requests that fail the schema for an endpoint and logs events to [Firewall Events](/firewall/).
- `None` action: non-compliant requests are neither logged nor blocked.

To change the default action:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Security** > **API Shield**.
3. Select **Schema Validation**.
4. Under the default `Log` action, select **Change**.
5. Choose a new action from the dropdown menu.
6. Observe the current action and accept the change by selecting **Change default action** in the popup window.

Alternatively, you can modify the global action via **Security** > **API Shield** > **Settings**.

### Change the action of a single endpoint

You can change individual endpoint actions separately from the default action in Schema Validation.

This allows you to be stricter on blocking non-compliant requests on certain endpoints when the default action is `Log`. It can also be used to relax constraints on non-compliant requests on certain endpoints when the default action is set to `Block`. You may want to silence known false positives on an endpoint by setting the action to `None`. 

To change the action on an individual endpoint:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Go to **Security** > **API Shield**.
3. Select **Schema Validation** and filter the selected endpoint.
4. Select the ellipses on the endpoint's row.
5. Select **Change Action**.
6. Choose a new action from the dropdown menu and select **Set action**.

### Disable Schema Validation without changing actions

You can disable Schema Validation entirely for temporary troubleshooting. You can override all actions at once, preventing Schema Validation from taking any action while you complete your troubleshooting.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Select **Security** > **API Shield**.
3. Go to the **Schema Validation** settings.
4. Select **Disable**.

Your per-endpoint configurations will be saved when modifying the setting, so that you do not lose your configuration. To re-enable your configurations after troubleshooting, navigate back to the settings and select **Enable**.

### View active schemas

To view currently uploaded or learned schemas:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Select **Security** > **API Shield**.
3. Go to your **Schema Validation** settings.
4. View your schemas under **Uploaded Schemas** and **Learned schemas**.
5. Select **Filter** on the endpoints in either schema.

### Delete active schemas

Deleting the schema will remove validation from the currently associated endpoints, but it will not delete the endpoints from Endpoint Management.

To delete currently uploaded or learned schemas:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Select **Security** > **API Shield**.
3. Go to your **Schema Validation** settings.
4. View your schemas under **Uploaded Schemas** and **Learned schemas**.
5. Select the ellipses to access the menu and download or delete the listed schema.

## Specifications

Cloudflare currently only accepts [OpenAPI v3 schemas](https://swagger.io/specification/). The accepted file formats are YAML (`.yml` or `.yaml` file extension) and JSON (`.json` file extension).

OpenAPI schemas generated by different tooling may not be specific enough to import to Schema Validation. We recommend using a third-party tool such as [Swagger Editor](https://swagger.io/tools/swagger-editor/) to ensure that schemas are compliant to the OpenAPI specification.

## Limitations

Currently, API Shield cannot validate some features of API schemas, including the following: all responses, external references, non-basic path templating, or unique items.

There is a limit of 1000 total operations for enabled schemas. We will raise this limit in the near future.

## Body inspection

API Shield has the ability to identify body specifications contained in uploaded schemas and validate that the data of incoming API requests adheres to them.

Schema Validation currently supports validating requests with content-type `application/json`.

Within the OpenAPI specification, request body schemas are associated to media-ranges (such as `application/*`, `application/xml` or `application/json`).

When Cloudflare validates incoming requests, Cloudflare checks that the request's `content-type` matches the OpenAPI-specified media-range. 

For example, when the OpenAPI file specifies `application/*` as part of the request body content map, Cloudflare will accept requests with the content-types `application/xml` and `application/json`. However, only `application/json` bodies will be validated with the supplied schema.

Cloudflare generally recommends keeping the media-ranges as tight as possible. We suggest setting them to an individual media-type. If you need to support multiple content-types on an API endpoint, you can utilize wildcard media-ranges.

Care should also be taken if the origin is configured to perform [MIME sniffing](https://mimesniff.spec.whatwg.org/). For example, when a request carrying a JSON body is deliberately carrying an `application/malicous` content-type and Cloudflare was configured to allow `application/*` media-ranges, the request would be passed along to the origin without validating the JSON body contents. However, an origin that ignores the content-type and either trial deserializes or sniffs the MIME type may deserialize the JSON body with a wrong assumption of having passed schema body validation.

As such, if you need to support `application/json` and `application/xml` on the same endpoint, you can use `application/*`. Cloudflare will validate the provided schema for request bodies where the content-type is set to `application/json`. Requests with content-type `application/xml` (and others matching `application/*`) will be let through. It is still strongly advised to disable content-type sniffing on your origin.

Cloudflare allows specifying the following media-ranges in the OpenAPI request body content map: 
- `*/*`
- `application/*`
- `application/json`. 

Media-ranges can also be configured to enforce a `charset` parameter. For this, Cloudflare only accepts the `charset` parameter with a static value of `utf-8` as part of the media-range specification and when configured, we will similarly require the request's content-type to carry this charset.

## Availability

Schema Validation is available for all API Shield customers. 

Enterprise customers who have not purchased API Shield can preview [API Shield as a non-contract service](https://dash.cloudflare.com/?to=/:account/:zone/security/api-shield) in the Cloudflare dashboard or by contacting your account team.