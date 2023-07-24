---
title: Create a rule in the dashboard
pcx_content_type: how-to
weight: 2
meta:
  title: Create an HTTP response header modification rule in the dashboard
---

# Create an HTTP response header modification rule in the dashboard

Refer to [Response header modification examples](/rules/transform/response-header-modification/examples/) for examples of rule definitions.

To create a rule:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.

2. Go to **Rules** > **Transform Rules**.

3. Go to the **Modify Response Header** tab.

4. Select **Create rule**.

    ![The HTTP response header modification rule creation page in the Cloudflare dashboard.](/images/rules/transform/create-response-header-modification-rule.png)

5. In the rule creation page, enter a descriptive name for the rule in **Rule name**.

6. Under **When incoming requests match**, select if you wish to apply the rule to all incoming requests or only to requests that match a custom filter expression.

7. (Optional) To define a custom expression, use the Expression Builder (specifying one or more values for **Field**, **Operator**, and **Value**) or manually enter an expression using the Expression Editor. For more information, refer to [Edit expressions in the dashboard](/ruleset-engine/rules-language/expressions/edit-expressions/).

    {{<Aside type="note">}}
Check the [available fields and functions](/rules/transform/response-header-modification/reference/fields-functions/).
    {{</Aside>}}

8. For **Modify response header**, select one of the following operations:

    - _Set static_ — Sets the value of an HTTP response header to a static string value. Overrides the value of any existing headers with the same name or adds a new header if it does not exist.
    - _Set dynamic_ — Sets the value of an HTTP response header according to the provided expression. Overrides the value of any existing headers with the same name or adds a new header if it does not exist.
    - _Add_ — Adds an HTTP response header with a static string value. This operation will not remove any existing response headers with the same name.
    - _Remove_ — Removes the HTTP response header with the provided name, if it exists.

9. Enter the name of the HTTP response header to modify in **Header name** and the static value or expression in **Value**, if you are setting the header value.

10. To modify another HTTP response header in the same rule, select **Set new header**. You can modify up to 30 HTTP response headers in a single rule.

    The following example includes the modification of three response headers:

    ![Example configuration performing three response header modifications: set a dynamic header value, set a static header value, and remove an existing header.](/images/rules/transform/response-header-modification-example.png)

11. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.

If you choose to deploy your HTTP response header modification rule, the new rule will be enabled. If you save the rule as a draft, the new rule will be disabled.
