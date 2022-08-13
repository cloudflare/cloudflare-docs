---
title: Configure
pcx_content_type: how-to
type: overview
layout: list
meta:
  title: Configure Schema Validation
---

# Configure Schema Validation

Use the **API Shield** interface to configure [API Schema Validation](/api-shield/security/schema-validation/), which validates requests according to the API Schema you provide.

Before you can configure Schema Validation for an API, you must obtain an API Schema file matching our [specifications](/api-shield/security/schema-validation/#specifications).

{{<Aside type="note">}}

This feature is only available for customers on an Enterprise plan. Contact your Cloudflare Customer Success Manager to get access.

{{</Aside>}}

## Create an API Shield with Schema Validation

To configure Schema Validation in the Cloudflare dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and application.

2.  Click **Security** > **API Shield**.

3.  In the **API Shield** card, click **Deploy API Shield**.

4.  For the **Shield properties**, enter a descriptive name and set up an expression to trigger your shield.

    For example, if your API is available at `http://api.example.com/v1`, include a check for the _Hostname_ field — equal to `api.example.com` — and a check for the _URI Path_ field using a regular expression — matching the regex `^/v1`.

    {{<Aside type="warning" note="Important">}}

To validate the hostname, you must include the _Hostname_ field explicitly in the rule, even if the hostname value is in the schema file. Any hostname value present in the schema file will be ignored.

     {{</Aside>}}

5.  Click **Next**.

6.  In the **Schema Validation** card, switch the toggle to **On**.

7.  For **Upload API Schema**, upload your schema file.

8.  Click **Save** to validate the content of the schema file and deploy the Schema Validation rule.

    If you get a validation error, make sure you are using one of the [supported file formats](/api-shield/security/schema-validation/#specifications) and that each endpoint and method pair has a [unique Operation ID](/api-shield/security/schema-validation/#operation-ids).

9.  After deploying your API Shield rule, Cloudflare displays a summary of all API endpoints organized by their protection level and actions that will occur for non-compliant and unprotected requests.

    <div class="large-img">
    	<img
    		alt="Review your endpoints and associated actions before deploying your schema validation"
    		src="/api-shield/static/api-shield-review-endpoints-step.png"
    	/>
    </div>

10. In the **Endpoint action** dropdown, select an action for every request that targets a protected endpoint and fails Schema Validation.

11. In the **Fallthrough action** dropdown, select an action for every request that targets an unprotected endpoint.

    {{<Aside type="warning">}}

Currently, request body validations are not supported.

     {{</Aside>}}

12. Click **Done**.
