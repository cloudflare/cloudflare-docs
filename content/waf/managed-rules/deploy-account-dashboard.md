---
title: Deploy in the dashboard for an account
pcx_content_type: how-to
weight: 2
meta:
  title: Deploy a managed ruleset in the dashboard for an account
---

# Deploy a managed ruleset in the dashboard for an account

You can deploy managed rulesets for an account in Account Home > **WAF** > **Managed rulesets**.

{{<Aside type="note">}}
Account-level WAF configuration requires an Enterprise plan with a paid add-on.
{{</Aside>}}

To deploy a managed ruleset for a single zone, refer to [Deploy a managed ruleset in the dashboard for a zone](/waf/managed-rules/deploy-zone-dashboard/).

![Example WAF Managed Rules configuration in the Managed rulesets tab under Application Security > WAF.](/images/waf/account/managed-rulesets-dashboard.png)

## Deploy a managed ruleset

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.

2. Go to Account Home > **WAF** > **Managed rulesets**.

3. Select **Deploy** > **Deploy managed ruleset**.

4. Next to the managed ruleset you want to deploy, select **Select ruleset**.

5. Give a name to the rule deploying the ruleset in **Execution name**.

6. (Optional) To execute the managed ruleset for a subset of incoming requests, select **Edit scope** and [configure the expression](/ruleset-engine/rules-language/expressions/edit-expressions/) that will determine the scope of the current rule deploying the managed ruleset.

    {{<Aside type="warning">}}
Deployed rulesets will only apply to incoming traffic of Enterprise domains on your account. The Expression Builder will automatically include this filter. If you define a custom expression using the Expression Editor, use parentheses to enclose any custom conditions and end your expression with `and cf.zone.plan eq "ENT"` so that the rule only applies to domains on an Enterprise plan.
    {{</Aside>}}

7. (Optional) You can customize the behavior of the managed ruleset in the following ways:
    - [Configure the entire ruleset](#configure-field-values-for-all-the-rules) (affects all the rules)
    - [Configure several rules or rules with specific tags](#configure-rules-in-bulk-in-a-managed-ruleset)
    - [Configure a single rule](#configure-a-single-rule-in-a-managed-ruleset)

8. To deploy the managed ruleset immediately, select **Deploy**. If you are not ready to deploy, select **Save as Draft**.

The **Deployed managed rulesets** list will show an _Execute_ rule for the managed ruleset you deployed.

## Turn on or off a managed ruleset

Select the **Enabled** toggle next to a deployed managed ruleset to turn it on or off.

## Configure a managed ruleset

Configure a managed ruleset to define specific field values for one or more rules (for example, configure a rule with an action different from the action configured by Cloudflare). You can also turn off specific rules.

To skip one or more rules — or even entire WAF managed rulesets — for specific incoming requests, [add an exception](/waf/managed-rules/waf-exceptions/). Exceptions, also called skip rules, are shown as _Skip_ rules in the **Deployed managed rulesets** list.

{{<Aside type="note">}}
Some managed rulesets may not allow custom configuration, depending on your Cloudflare plan.
{{</Aside>}}

### Configure field values for all the rules

To configure an entire managed ruleset:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.

2. Go to Account Home > **WAF** > **Managed rulesets**.

3. Select the rule description of the _Execute_ rule that deploys the managed ruleset you want to configure. Alternatively, select the three dots > **Edit**.

    If you have not deployed the managed ruleset yet, do the following:

    1. Select **Deploy** > **Deploy managed ruleset**.
    2. Next to the managed ruleset you want to deploy and configure, select **Select ruleset**.

4. In the ruleset configuration section, set one or more rule fields from the available values in the drop-down lists. The exact options vary according to the managed ruleset you are configuring.

    For example, select the action to perform for all the rules in the ruleset from the **Ruleset action** drop-down list.

    ![The Configure deployment page displaying the available options to override all the rules in the ruleset. In the displayed managed ruleset you can override the ruleset action.](/images/waf/account/waf-configure-ruleset-account.png)

5. If you are editing a deployed managed ruleset, select **Save**. If you have not deployed the managed ruleset yet, select **Deploy** to deploy the ruleset immediately, or **Save as Draft** to save your deployment settings for later.

### Configure rules in bulk in a managed ruleset

{{<render file="_managed-rules-browse-account.md">}}

{{<render file="_managed-ruleset-configure-rules-in-bulk.md">}}

### Configure a single rule in a managed ruleset

{{<render file="_managed-rules-browse-account.md">}}

{{<render file="_managed-ruleset-configure-single-rule.md">}}

### Browse the rules of a managed ruleset

You can browse the available rules in a managed ruleset and search for individual rules or tags.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.

2. Go to Account Home > **WAF** > **Managed rulesets**.

3. Select the rule description of the _Execute_ rule that deploys the managed ruleset you want to configure. Alternatively, select the three dots > **Edit**.

    If you have not deployed the managed ruleset yet, do the following:
    1. Select **Deploy** > **Deploy managed ruleset**.
    2. Next to the managed ruleset you want to browse, select **Select ruleset**.

4. Select **Browse rules**.

    ![The Browse rules page displaying the list of rules in the Cloudflare Managed Ruleset](/images/waf/waf-browse-rules.png)

### Delete a managed ruleset deployment rule or an exception

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to Account Home > **WAF** > **Managed rulesets**.
3. Under **Deployed managed rulesets** and next to the rule you want to delete, select the three dots > **Delete** and confirm the operation.
