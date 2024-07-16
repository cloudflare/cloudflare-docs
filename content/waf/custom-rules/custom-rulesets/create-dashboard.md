---
pcx_content_type: how-to
type: overview
title: Use the dashboard
weight: 2
meta:
  title: Work with custom rulesets in the dashboard
---

# Work with custom rulesets in the dashboard

Create and deploy custom rulesets in Account Home > **WAF** > **Custom rulesets**.

{{<Aside type="note">}}
Account-level WAF configuration requires an Enterprise plan with a paid add-on.
{{</Aside>}}

## Create and deploy a custom ruleset

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.

2. Go to Account Home > **WAF** > **Custom rulesets**.

    ![Custom rulesets page in the Cloudflare dashboard](/images/waf/account/custom-rulesets-dashboard.png)

3. To create a new empty ruleset, select **Create ruleset**. To duplicate an existing ruleset, select the three dots next to it > **Duplicate**.

4. In the page that displays, enter a name and (optionally) a description for the custom ruleset.

5. Under **Scope**, define when the custom ruleset should run.
    - Select **All incoming requests** to apply the custom ruleset to all incoming requests for all your zones on an Enterprise plan.
    - Select **Custom filter expression** to define a custom expression that defines when to execute the custom ruleset. Use the **Field** drop-down list to choose an HTTP property. For each request, the value of the property you choose for **Field** is compared to the value you specify for **Value** using the operator selected in **Operator**. Alternatively, select **Edit expression** to define your expression using the [Expression Editor](/ruleset-engine/rules-language/expressions/edit-expressions/#expression-editor).

    {{<Aside type="warning">}}
Deployed custom rulesets will only apply to incoming traffic of Enterprise domains. The Expression Builder will automatically include this filter. If you define a custom expression for the ruleset using the Expression Editor, you must use parentheses to enclose any custom conditions and end your expression with `and cf.zone.plan eq "ENT"` so that the rule only applies to domains on an Enterprise plan.
    {{</Aside>}}

6. To create a new rule, select **Add rule**.

7. Enter a descriptive name for the rule in **Rule name**.

8. Under **When incoming requests match**, use the **Field** drop-down list to choose an HTTP property. For each request, the value of the property you choose for **Field** is compared to the value you specify for **Value** using the operator selected in **Operator**. Alternatively, select **Edit expression** to define your expression using the [Expression Editor](/ruleset-engine/rules-language/expressions/edit-expressions/#expression-editor).

9. Select the rule action from the **Choose action** drop-down list. For example, selecting _Block_ tells Cloudflare to refuse requests that match the conditions you specified.

10. (Optional) If you selected the _Block_ action, you can [configure a custom response](#configure-a-custom-response-for-blocked-requests).

11. Select **Deploy**.

12. Add other rules to the custom ruleset, if needed. You can also duplicate an existing rule in the custom ruleset.

13. Select **Create**.

## Configure a custom response for blocked requests

{{<render file="_custom-response-blocked-requests.md" withParameters="WAF block;;403">}}
