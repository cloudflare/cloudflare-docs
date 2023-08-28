---
pcx_content_type: concept
title: Schema Validation
weight: 5
---

# Schema Validation

An API schema defines which API requests are valid based on several request properties like target endpoint, path or query variable format, and HTTP method.

Schema Validation allows you to check if incoming traffic complies with a previously supplied API schema. When you provide an API schema, API Shield creates rules for incoming traffic from the schema definitions. These rules define which traffic is allowed and which traffic gets logged or blocked.

We are currently running a private beta for Schema Validation 2.0. For help configuring the previous version of Schema Validation for one or more hosts using the dashboard, refer to [Configure Classic Schema Validation](/api-shield/reference/classic-schema-validation/).

{{<Aside type="note">}}
If you are in the Schema Validation 2.0 beta, you can make changes to your settings but you cannot add any new Classic Schema Validation schemas. 

You can migrate to Schema Validation 2.0 manually by uploading your schemas to the new system, or you can wait for a future release where we will add an easy migrate option per-schema.
{{</Aside>}}

## Process

Endpoints must be added to [Endpoint Management](/api-shield/management-and-monitoring/) for Schema Validation to protect them. You can add endpoints while uploading a schema, or you can add them from [API Discovery](/api-shield/security/api-discovery/).

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

### Add validation by applying a learned schema

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account and domain.
2. Select **Security** > **API Shield**.
3. Go to **Schema Validation** and filter by the learned schema available.
4. Select **Apply learned schema**.
5. Choose an action and select **Apply schema**.

### Change the global default action of Schema Validation

Schema Validation’s default action is visible on the main Schema Validation page. This action applies to any endpoint with its action set to `Default`. 

- `Log` action: logs events to [Firewall Events](/firewall/).
- `Block` action: blocks requests that fail the schema for an endpoint and logs events to [Firewall Events](/firewall/).
- `None` action: non-compliant requests are neither logged nor blocked.

To change the default action:

1.  Select **Change** on the default action, or visit **Settings**. 
2. Choose a new action from the dropdown menu.
3. Observe the current action and accept the change by selecting **Change default action** in the popup window.

### Change the action of a single endpoint

You can change individual endpoint actions separately from the default action in Schema Validation.

This allows you to be stricter on blocking non-compliant requests on certain endpoints when the default action is `Log`. It can also be used to relax constraints on non-compliant requests on certain endpoints when the default action is set to `Block`. You may want to silence known false positives on an endpoint by setting the action to `None`. 

To change the action on an individual endpoint:

1. Filter to the selected endpoint.
2. Select the ellipses on the endpoint's row.
3. Select **Change Action**.
4. Choose a new action from the dropdown menu and select **Set action**.

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

We currently only accept [OpenAPI v3 schemas](https://swagger.io/specification/). The accepted file formats are YAML (`.yml` or `.yaml` file extension) and JSON (`.json` file extension).

## Limitations

Currently, API Shield cannot validate some features of API schemas, including the following: all responses, external references, non-basic path templating, or unique items.

There is a limit of 1000 total operations for enabled schemas. We will raise this limit in the near future.

Schema Validation 2.0 is available via the API for all customers. A private beta for the dashboard interface is now available. Contact your account team know if you would like to be added to the new beta.

## Body inspection

API Shield has the ability to identify body specifications in uploaded schemas and validate the data of incoming API requests.

The supported content-type format is `application/json`. The code must validate that no other content media ranges are uploaded. 

`*/*`, `application/*`, and `application/json` media-ranges are valid. We will also only accept the `charset` parameter with a static value of `utf-8`.

## Availability

Schema Validation is only available for Enterprise customers. If you are interested in using this feature, contact your account team.