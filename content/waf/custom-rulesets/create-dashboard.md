---
pcx_content_type: how-to
type: overview
title: Use the dashboard
weight: 2
---

# Work with custom rulesets in the dashboard

Create custom rulesets in **Application Security** > **WAF** > **Custom rulesets**. After creating a custom ruleset, you must deploy it to your account to apply its rules.

{{<Aside type="note">}}
Account-level WAF configuration is only available for Enterprise customers in the WAF Advanced plan.
{{</Aside>}}

## Create a custom ruleset

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.

2. Navigate to **Application Security** > **WAF** > **Custom rulesets**.

    ![Custom rulesets page in the Cloudflare dashboard](/waf/static/account/custom-rulesets-dashboard.png)

3. Next to **Your custom rulesets**, select **Create new ruleset**.

4. In the page that displays, enter a name and (optionally) a description for the custom ruleset.

5. To create a new rule, select **Create rule**.

6. Enter a descriptive name for the rule.

7. Under **When incoming requests match**, use the **Field** drop-down list to choose an HTTP property. For each request, the value of the property you choose for **Field** is compared to the value you specify for **Value** using the operator selected in **Operator**. Alternatively, select **Edit expression** to define your expression using the [Expression Editor](/firewall/cf-dashboard/edit-expressions/#expression-editor).

8. Select the rule action from the **Choose action** drop-down list. For example, selecting _Block_ tells Cloudflare to refuse requests that match the conditions you specified.

9. (Optional) If you selected the _Block_ action, you can [configure a custom response](#configuring-a-custom-response-for-blocked-requests).

10. Select **Add rule**.

11. Add other rules to the custom ruleset, if needed.

12. Select **Create**.

To enable the custom ruleset you created, you must deploy it to your account.

## Deploy a custom ruleset

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.

2. Navigate to **Application Security** > **WAF** > **Custom rulesets**.

3. Next to **Deployed custom rulesets**, select **Deploy custom ruleset**.

4. Select the custom ruleset to deploy.

5. In the ruleset deployment page, give a name to the rule deploying the custom ruleset. This page also shows the rules in the custom ruleset that you will be deploying.

6. Under **Execution scope**, review the scope of the deployed custom ruleset. If necessary, select **Edit scope** and configure the expression that will determine the scope of the current rule.

    {{<Aside type="warning">}}
Deployed custom rulesets will only apply to incoming traffic of Enterprise domains. The Expression Builder will automatically include this filter. If you define a custom expression using the Expression Editor, you must include `AND zone.level eq "ENT"` in your expression so that the rule only applies to your domains on an Enterprise plan.
    {{</Aside>}}

7. To deploy your rule immediately, click **Deploy**. If you are not ready to deploy your rule, click **Save as draft**.

## Configuring a custom response for blocked requests

{{<render file="_custom-response-blocked-requests.md">}}
