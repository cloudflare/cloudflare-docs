---
title: Classic Schema Validation
pcx_content_type: how-to
type: overview
layout: list
meta:
  title: Configure Classic Schema Validation
---

# Configure Classic Schema Validation

Use the **API Shield** interface to configure [API Schema Validation](/api-shield/security/schema-validation/), which validates requests according to the API Schema you provide.

Before you can configure Schema Validation for an API, you must obtain an API Schema file matching our [specifications](/api-shield/security/schema-validation/#specifications).

{{<Aside type="note">}}
This feature is only available for customers on an Enterprise plan. Contact your Cloudflare Customer Success Manager to get access.
{{</Aside>}}

## Create an API Shield with Schema Validation

To configure Schema Validation in the Cloudflare dashboard:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account and domain.
2. Select **Security** > **API Shield**.
3. Go to **Schema Validation** and select **Add schema**.
4. Enter a descriptive name for your policy and optionally edit the expression to trigger Schema Validation.

    For example, if your API is available at `http://api.example.com/v1`, include a check for the _Hostname_ field — equal to `api.example.com` — and a check for the _URI Path_ field using a regular expression — matching the regex `^/v1`.

    {{<Aside type="warning" header="Important">}}
To validate the hostname, you must include the _Hostname_ field explicitly in the rule, even if the hostname value is in the schema file. Any hostname value present in the schema file will be ignored.
     {{</Aside>}}

5.  Select **Next**.
6.  Upload your schema file.
7.  Select **Save** to validate the content of the schema file and deploy the Schema Validation rule.

    If you get a validation error, ensure that you are using one of the [supported file formats](/api-shield/security/schema-validation/#specifications) and that each endpoint and method pair has a [unique Operation ID](/api-shield/security/schema-validation/#operation-ids).

After deploying your API Shield rule, Cloudflare displays a summary of all API endpoints organized by their protection level and actions that will occur for non-compliant and unprotected requests.

1. In the **Endpoint action** dropdown, select an action for every request that targets a protected endpoint and fails Schema Validation.
2. In the **Fallthrough action** dropdown, select an action for every request that targets an unprotected endpoint.
3. Optionally, you can save the endpoints to Endpoint Management at the same time the Schema is saved by selecting **Save new endpoints to [endpoint management](/api-shield/management-and-monitoring/)**. Endpoints will be saved regardless of whether the Schema is saved as a draft or published live.
4. Select **Done**.
