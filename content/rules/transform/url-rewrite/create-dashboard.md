---
title: Create a rule in the dashboard
pcx-content-type: how-to
weight: 2
meta:
  title: Create a URL Rewrite Rule in the dashboard
---

# Create a URL Rewrite Rule in the dashboard

Create URL Rewrite Rules in the **Transform Rules** tab under Rules. Refer to [URL rewrite examples](/rules/transform/url-rewrite/examples/) for examples of rule definitions.

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and website.

2.  Go to **Rules** > **Transform Rules**.

    ![Transform Rules tab](/rules/static/transform/overview.png)

3.  Click **Create transform rule** > **Rewrite URL**.

    ![Create Transform Rule page](/rules/static/transform/create-url-rewrite-rule.png)

4.  In the page that displays, enter a descriptive name for the rule in **Rule name**.

5.  Under **If incoming requests match**, use the **Field** drop-down list to choose an HTTP property. For each request, the value of the property you choose for **Field** is compared to the value you specify for **Value** using the operator selected in **Operator**.

    The **Expression Preview** area displays a text-only version of your expression. For more information on entering a rule expression manually using the Expression Editor, refer to [Edit rule expressions](/firewall/cf-dashboard/expression-preview-editor) in the Firewall documentation.

6.  Select a comparison operator in the **Operator** drop-down list.

7.  Specify the value to match. If the value is an enumeration, the **Value** control will be a drop-down list. Otherwise, it will be a text input.

8.  (Optional) To create a compound expression using logical operators, click **And** or **Or**.

9.  To define the action for your URL Rewrite Rule, select one of the available options displayed as radio buttons and then a value from the drop-down list, depending on the action.

    If you select **Rewrite to** > *Static*, enter the string that will replace the original URL path (or query string). For example, enter `welcome-gb.html` to rewrite the original URL path to `/welcome-gb.html`.

    If you select **Rewrite to** > *Dynamic*, enter a [rewrite expression](/rules/transform/url-rewrite/reference/fields-functions/#rewrite-expressions) that defines the dynamic URL rewrite to perform.

    If you do not want to change the value of a component of the original request (the URL path or the URL query string), choose the *Preserve* action for that component.

10. To save and deploy your rule, click **Deploy**. If you are not ready to deploy your rule, click **Save as Draft**.

After you choose an option, you return to the **Transform Rules** dashboard interface, which displays your new rule.

If you choose to deploy your URL Rewrite Rule, the new rule will be enabled. If you save the rule as a draft, the new rule will be disabled.
