---
pcx-content-type: how-to
order: 390
type: overview
---

# Configure Schema Validation

<Aside type='note'>

This feature is only available for customers on an Enterprise plan. Contact your Cloudflare Customer Success Manager to get access.

</Aside>

Use the **API Shield** interface to configure [API Schema Validation](/cf-firewall-rules/api-shield#schema-validation), which validates requests according to the API Schema you provide.

Before you can configure Schema Validation for an API, you must obtain its API Schema file. API Shield supports API Schemas using OpenAPI Specification v3. The accepted file formats are YAML (files with a `.yml` or `.yaml` file extension) and JSON (files with a `.json` file extension).

## Create an API Shield with Schema Validation

To configure Schema Validation in the Cloudflare dashboard, follow these steps:

1. Log in to your Cloudflare account Home page and click the zone containing the host for which you want to configure Schema Validation.

1. Click the **Firewall** app.

    The Firewall **Overview** displays.

    ![Firewall Overview tab](../images/firewall-app-overview.png)

1. Click the **API Shield** tab.

    The **API Shield** card displays.

    ![API Shield card](../images/api-shield-card.png)

1. Click **Deploy API Shield**.

    The API Shield creation wizard displays.

    ![API Shield Properties wizard step](../images/api-shield-properties-step.png)

1. Enter a descriptive name for the API Shield in the **Shield name** input. 

1. Configure the expression for the API Shield using the available request fields.

    For example, if your API is available at `http://api.example.com/v1`, the expression must include a check for the _Hostname_ field (which must be equal to `api.example.com`) and a check for the _URI Path_ field using a regular expression (which must match the regex `^/v1`).

    <Aside type='warning' header='Important'>

    To validate the hostname, you must include the _Hostname_ field explicitly in the rule, even if the hostname value is in the schema file. Any hostname value present in the schema file will be ignored.

    Regular expression support is a paid add-on in the Enterprise plan.

    </Aside>

1. Click **Next**.

    The **Security solution** step displays.

    ![API Shield Security solution wizard step](../images/api-shield-security-solution-step.png)

1. Enable the toggle in the **Schema Validation** card.

1. Upload the API Schema file in **Upload API Schema** by selecting a file or dragging a file to the file upload area (dashed rectangle).

1. Click **Deploy** to validate the content of the schema file and deploy the Schema Validation rule.

    <Aside type='warning'>

    If you get a validation error, make sure you are using one of the supported file formats. Also, each endpoint and method pair must have a [unique Operation ID](/cf-firewall-rules/api-shield#operation-ids).

    </Aside>

1. After deploying your API Shield rule, Cloudflare displays a summary of all API endpoints organized by their protection level and what will be the actions taken for non-compliant and unprotected requests.

    ![API Shield Review endpoints wizard step](../images/api-shield-review-endpoints-step.png)

    The API Shield rule will validate all incoming requests addressed at the endpoints listed in **API Schema endpoints**. The several columns in the table list the validations deployed for each endpoint, according to the information described in the API Schema file.

1. In the **Endpoint action** dropdown, select the action that API Shield will perform for every request targeting a protected endpoint that fails Schema Validation.

1. In the **Fallthrough action** dropdown, select the action to perform for incoming requests addressed at other (non-protected) API endpoints.

    <Aside type='warning'>

    Currently, request body validations are not supported.

    </Aside>

1. Click **Done**.

The API Shield wizard closes and the **API Shield** card displays with your new API Shield in the list.
