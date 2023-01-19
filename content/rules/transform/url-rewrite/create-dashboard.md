---
title: Create a rule in the dashboard
pcx_content_type: how-to
weight: 2
meta:
  title: Create a URL Rewrite Rule in the dashboard
---

# Create a URL Rewrite Rule in the dashboard

Create URL Rewrite Rules in the **Transform Rules** tab under Rules. Refer to [URL rewrite examples](/rules/transform/url-rewrite/examples/) for examples of rule definitions.

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.

2.  Go to **Rules** > **Transform Rules**.

    ![The Transform Rules tab in the Cloudflare dashboard displaying the several types of Transform Rules you can configure.](/rules/static/transform/overview.png)

3.  Select **Create transform rule** > **Rewrite URL**.

    ![The URL Rewrite Rule creation page in the Cloudflare dashboard.](/rules/static/transform/create-url-rewrite-rule.png)

4.  In the page that displays, enter a descriptive name for the rule in **Rule name**.

5.  Under **When incoming requests match**, select if you wish to apply the rule to all incoming requests or only to requests that match a custom filter expression.

6. (Optional) To define a custom expression, use the Expression Builder (specifying one or more values for **Field**, **Operator**, and **Value**) or manually enter an expression using the Expression Editor. For more information, refer to [Edit rule expressions](/firewall/cf-dashboard/edit-expressions/).

    {{<Aside type="note">}}
Check the [available fields and functions](/rules/transform/url-rewrite/reference/fields-functions/).
    {{</Aside>}}

7.  Define the action for your URL Rewrite Rule by selecting one of the available options displayed as radio buttons, and then a value from the drop-down list, depending on the action:

    * If you select **Rewrite to** > _Static_, enter the string that will replace the original URL path (or query string). For example, enter `welcome-gb.html` to rewrite the original URL path to `/welcome-gb.html`.

    * If you select **Rewrite to** > _Dynamic_, enter a [rewrite expression](/rules/transform/url-rewrite/reference/fields-functions/#rewrite-expressions) that defines the dynamic URL rewrite to perform.

    * If you do not want to change the value of a component of the original request (the URL path or the URL query string), choose the _Preserve_ action for that component.

    For more information, refer to [URL rewrite parameters](/rules/transform/url-rewrite/reference/parameters/).

8. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.

After you choose an option, you return to the **Transform Rules** dashboard interface, which displays your new rule.

If you choose to deploy your URL Rewrite Rule, the new rule will be enabled. If you save the rule as a draft, the new rule will be disabled.
