---
title: Create a rule in the dashboard
pcx_content_type: how-to
weight: 2
meta:
  title: Create an HTTP Response Header Modification Rule in the dashboard
---

# Create an HTTP Response Header Modification Rule in the dashboard

Create HTTP Response Header Modification Rules in the **Transform Rules** tab under Rules. Refer to [Response header modification examples](/rules/transform/response-header-modification/examples/) for examples of rule definitions.

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.

2.  Go to **Rules** > **Transform Rules**.

    ![The Transform Rules tab in the Cloudflare dashboard displaying the several types of Transform Rules you can configure.](/rules/static/transform/overview.png)

3.  Select **Create transform rule** > **Modify Response Header**.

    ![The HTTP Response Header Modification Rule creation page in the Cloudflare dashboard.](/rules/static/transform/create-response-header-modification-rule.png)

4.  Enter a descriptive name for the HTTP Response Header Modification Rule in **Rule name**.

5.  Under **When incoming requests match**, define the [rule expression](/firewall/cf-dashboard/edit-expressions/).

    {{<Aside type="note">}}
Check the [available fields and functions](/rules/transform/response-header-modification/reference/fields-functions/).
    {{</Aside>}}

6.  For **Modify response header**, select one of the following operations:

    - _Set static_ — Sets the value of an HTTP response header to a static string value. Overrides the value of any existing headers with the same name or adds a new header if it does not exist.
    - _Set dynamic_ — Sets the value of an HTTP response header according to the provided expression. Overrides the value of any existing headers with the same name or adds a new header if it does not exist.
    - _Add_ — Adds an HTTP response header with a static string value. This operation will not remove any existing response headers with the same name.
    - _Remove_ — Removes the HTTP response header with the provided name, if it exists.

7.  Enter the name of the HTTP response header to modify in **Header name** and the static value or expression in **Value**, if you are setting the header value.

8.  To modify another HTTP response header in the same rule, select **+ Set new header**.

    The following example includes the modification of three response headers using the available actions:

    ![Example configuration performing three response header modifications: set a dynamic header value, set a static header value, and remove an existing header.](/rules/static/transform/response-header-modification-example.png)

    {{<Aside type="note">}}
You can modify up to 30 HTTP response headers in a single rule.
    {{</Aside>}}

9.  To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.

After creating a rule, you return to the **Transform Rules** dashboard interface.

If you choose to deploy your HTTP Response Header Modification Rule, the new rule will be enabled. If you save the rule as a draft, the new rule will be disabled.
