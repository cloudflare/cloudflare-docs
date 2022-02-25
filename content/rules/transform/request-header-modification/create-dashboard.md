---
title: Create a rule in the dashboard
pcx-content-type: how-to
weight: 2
meta:
  title: Create an HTTP Request Header Modification Rule in the dashboard
---

# Create an HTTP Request Header Modification Rule in the dashboard

Create HTTP Request Header Modification Rules in the **Transform Rules** tab under Rules. Refer to [Request header modification examples](/rules/transform/request-header-modification/examples/) for examples of rule definitions.

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.

2.  Go to **Rules** > **Transform Rules**.

    ![Transform Rules tab](/rules/static/transform/overview.png)

3.  Click **Create transform rule** > **Modify Request Header**.

    ![Create HTTP Request Header Modification rule page](/rules/static/transform/create-request-header-modification-rule.png)

4.  Enter a descriptive name for the HTTP Request Header Modification Rule in **Rule name**.

5.  Under **When incoming requests match**, define the [rule expression](/firewall/cf-dashboard/create-edit-delete-rules#expression-builder-and-editor).

     <Aside type='note'>

    Check the [available fields and functions](/rules/transform/request-header-modification/reference/fields-functions/).

     </Aside>

6.  For **Modify request header**, select one of the following options:

    *   *Set static* — Sets the value of an HTTP request header to a static string value. Overrides the value of an existing header with the same name or adds a new header if it does not exist.
    *   *Set dynamic* — Sets the value of an HTTP request header according to the provided expression. Overrides the value of an existing header with the same name or adds a new header if it does not exist.
    *   *Remove* — Removes the HTTP request header with the provided name, if it exists.

7.  Enter the name of the HTTP request header to modify in **Header name** and the static value or expression in **Value**, if you are setting the header value.

8.  To modify another HTTP request header in the same rule, click **+ Set new header**.

    The following example includes the modification of three headers using the available actions:

    ![HTTP request header modification examples](/rules/static/transform/request-header-modification-example.png)

     <Aside type='note'>

    You can modify up to 30 HTTP request headers in a single rule.

     </Aside>

9.  To save and deploy your rule, click **Deploy**. If you are not ready to deploy your rule, click **Save as Draft**.

After creating a rule, you return to the **Transform Rules** dashboard interface.

If you choose to deploy your HTTP Request Header Modification Rule, the new rule will be enabled. If you save the rule as a draft, the new rule will be disabled.
