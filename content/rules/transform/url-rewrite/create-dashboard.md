---
title: Create a rule in the dashboard
pcx_content_type: how-to
weight: 2
meta:
  title: Create a Rewrite URL Rule in the dashboard
---

# Create a Rewrite URL Rule in the dashboard

Create Rewrite URL Rules in the **Rewrite URL** tab of the **Transform Rules** page. Refer to [URL rewrite examples](/rules/transform/url-rewrite/examples/) for examples of rule definitions.

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.

2.  Go to **Rules** > **Transform Rules**.

    ![The Transform Rules page in the Cloudflare dashboard with a tab for each type of Transform Rule you can create.](/rules/static/transform/transform-rules-tab.png)

3.  In the **Rewrite URL** tab, select **Create rewrite URL rule**.

    ![The Rewrite URL Rule creation page in the Cloudflare dashboard.](/rules/static/transform/create-url-rewrite-rule.png)

4.  In the rule creation page, enter a descriptive name for the rule in **Rule name**.

5.  Under **If incoming requests match**, use the **Field** drop-down list to choose an HTTP property. For each request, the value of the property you choose for **Field** is compared to the value you specify for **Value** using the operator selected in **Operator**.

    The **Expression Preview** area displays a text-only version of your expression. For more information on entering a rule expression manually using the Expression Editor, refer to [Edit rule expressions](/firewall/cf-dashboard/edit-expressions/).

6.  Select a comparison operator in the **Operator** drop-down list.

7.  Specify the value to match. If the value is an enumeration, the **Value** control will be a drop-down list. Otherwise, it will be a text input.

8.  (Optional) To create a compound expression using logical operators, select **And** or **Or**.

9.  To define the action for your Rewrite URL Rule, select one of the available options displayed as radio buttons and then a value from the drop-down list, depending on the action.

    If you select **Rewrite to** > _Static_, enter the string that will replace the original URL path (or query string). For example, enter `welcome-gb.html` to rewrite the original URL path to `/welcome-gb.html`.

    If you select **Rewrite to** > _Dynamic_, enter a [rewrite expression](/rules/transform/url-rewrite/reference/fields-functions/#rewrite-expressions) that defines the dynamic URL rewrite to perform.

    If you do not want to change the value of a component of the original request (the URL path or the URL query string), choose the _Preserve_ action for that component.

    For more information, refer to [URL rewrite parameters](/rules/transform/url-rewrite/reference/parameters/).

10. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.

If you choose to deploy your Rewrite URL Rule, the new rule will be enabled. If you save the rule as a draft, the new rule will be disabled.
