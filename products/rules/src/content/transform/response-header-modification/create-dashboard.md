---
title: Create a rule in the dashboard
pcx-content-type: how-to
order: 1
---

# Create an HTTP Response Header Modification Rule in the dashboard

Create HTTP Response Header Modification Rules in the **Transform Rules** tab under Rules. Refer to [Response header modification examples](/transform/response-header-modification/examples) for examples of rule definitions.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.

1. Go to **Rules** > **Transform Rules**.

    ![Transform Rules tab](../../static/transform/overview.png)

1. Click **Create transform rule** > **Modify Response Header**.

    ![Create HTTP Response Header Modification rule page](../../static/transform/create-response-header-modification-rule.png)

1. Enter a descriptive name for the URL Rewrite Rule in **Rule name**.

1. Under **When incoming requests match**, define the [rule expression](https://developers.cloudflare.com/firewall/cf-dashboard/create-edit-delete-rules#expression-builder-and-editor).

    <Aside type='note'>

    Check the [available fields and functions](/transform/response-header-modification/reference/fields-functions).

    </Aside>

1. For **Modify response header**, select one of the following options:

    * _Set static_ — Sets the value of an HTTP response header to a static string value. Overrides the value of an existing header with the same name or adds a new header if it does not exist.
    * _Set dynamic_ — Sets the value of an HTTP response header according to the provided expression. Overrides the value of an existing header with the same name or adds a new header if it does not exist.
    * _Remove_ — Removes the HTTP response header with the provided name, if it exists.

1. Enter the name of the HTTP response header to modify in **Header name** and the static value or expression in **Value**, if you are setting the header value.

1. To modify another HTTP response header in the same rule, click **+ Set new header**.

    The following example includes the modification of three response headers using the available actions:

    ![HTTP response header modification examples](../../static/transform/response-header-modification-example.png)

    <Aside type='note'>

    You can modify up to 10 HTTP response headers in a single rule.

    </Aside>

1. To save and deploy your rule, click **Deploy**. If you are not ready to deploy your rule, click **Save as Draft**.

After creating a rule, you return to the **Transform Rules** dashboard interface.

If you choose to deploy your HTTP Response Header Modification Rule, the new rule will be enabled. If you save the rule as a draft, the new rule will be disabled.
