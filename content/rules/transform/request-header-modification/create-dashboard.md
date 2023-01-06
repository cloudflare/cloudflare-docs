---
title: Create a rule in the dashboard
pcx_content_type: how-to
weight: 2
meta:
  title: Create an HTTP Request Header Modification Rule in the dashboard
---

# Create an HTTP Request Header Modification Rule in the dashboard

Create HTTP Request Header Modification Rules in the **Transform Rules** tab under Rules. Refer to [Request header modification examples](/rules/transform/request-header-modification/examples/) for examples of rule definitions.

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.

2.  Go to **Rules** > **Transform Rules**.

    ![The Transform Rules tab in the Cloudflare dashboard displaying the several types of Transform Rules you can configure.](/rules/static/transform/overview.png)

3.  Select **Create transform rule** > **Modify Request Header**.

    ![The HTTP Request Header Modification Rule creation page in the Cloudflare dashboard.](/rules/static/transform/create-request-header-modification-rule.png)

4.  Enter a descriptive name for the HTTP Request Header Modification Rule in **Rule name**.

5. Under **When incoming requests match**, select if you wish to apply the rule to all incoming requests or only to requests that match a custom filter expression.

6. (Optional) To define a custom expression, use the Expression Builder (specifying one or more values for **Field**, **Operator**, and **Value**) or manually enter an expression using the Expression Editor. For more information, refer to [Edit rule expressions](/firewall/cf-dashboard/edit-expressions/).

    {{<Aside type="note">}}
Check the [available fields and functions](/rules/transform/request-header-modification/reference/fields-functions/).
    {{</Aside>}}

7.  For **Modify request header**, select one of the following options:

    - _Set static_ — Sets the value of an HTTP request header to a static string value. Overrides the value of an existing header with the same name or adds a new header if it does not exist.
    - _Set dynamic_ — Sets the value of an HTTP request header according to the provided expression. Overrides the value of an existing header with the same name or adds a new header if it does not exist.
    - _Remove_ — Removes the HTTP request header with the provided name, if it exists.

8.  Enter the name of the HTTP request header to modify in **Header name** and the static value or expression in **Value**, if you are setting the header value.

9.  To modify another HTTP request header in the same rule, select **Set new header**. You can modify up to 30 HTTP request headers in a single rule.

    The following example includes the modification of three headers:

    ![Example configuration performing three request header modifications: set a dynamic header value, set a static header value, and remove an existing header.](/rules/static/transform/request-header-modification-example.png)

10.  To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.

After creating a rule, you return to the **Transform Rules** dashboard interface.

If you choose to deploy your HTTP Request Header Modification Rule, the new rule will be enabled. If you save the rule as a draft, the new rule will be disabled.
