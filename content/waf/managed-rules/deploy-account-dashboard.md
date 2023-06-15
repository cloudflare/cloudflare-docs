---
title: Deploy in the dashboard for an account
pcx_content_type: how-to
weight: 5
meta:
  title: Deploy a managed ruleset in the dashboard for an account
---

# Deploy a managed ruleset in the dashboard for an account

You can enable and configure managed rulesets for an account in Account Home > **WAF** > **Managed rulesets**.

{{<Aside type="note">}}
Account-level WAF configuration requires an Enterprise plan with a paid add-on.
{{</Aside>}}

To deploy a managed ruleset for a single zone, refer to [Deploy a managed ruleset in the dashboard for a zone](/waf/managed-rules/deploy-zone-dashboard/).

![Example WAF Managed Rules configuration in the Managed rulesets tab under Application Security > WAF.](/images/waf/account/managed-rulesets-dashboard.png)

## Deploy a managed ruleset

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.

2. Go to Account Home > **WAF** > **Managed rulesets**.

3. Next to **Deployed managed rulesets**, select **Deploy** > **Deploy managed ruleset**.

4. Select the managed ruleset you wish to deploy.

5. In the **Deploy managed ruleset** page, give a name to the rule deploying the ruleset in **Execution name**.

6. Under **Execution scope**, review the scope of the deployed managed ruleset. If necessary, select **Edit scope** and configure the expression that will determine the scope of the current rule.

    {{<Aside type="warning">}}
Deployed rulesets will only apply to incoming traffic of Enterprise domains. The Expression Builder will automatically include this filter. If you define a custom expression using the Expression Editor, you must use parentheses to enclose any custom conditions and end your expression with `and cf.zone.plan eq "ENT"` so that the rule only applies to domains on an Enterprise plan.
    {{</Aside>}}

7. (Optional) Specify overrides for [all the rules in the managed ruleset](#configure-field-values-for-all-the-rules). You can also create overrides for [specific rules or tags](#configure-rules-in-bulk-in-a-managed-ruleset).

8. To deploy your rule immediately, select **Deploy**. If you are not ready to deploy your rule, select **Save as draft**.

The **Deployed managed rulesets** list will show an _Execute_ rule for each deployed managed ruleset.

## Enable or disable a managed ruleset

Select the **Enabled** toggle next to a deployed managed ruleset to enable or disable it.

## Configure a managed ruleset

Configure a managed ruleset to:

- Define specific field values for one or more rules (for example, configure a rule with an action different from the action configured by Cloudflare).
- Disable one or more rules.

To skip one or more rules, or entire WAF managed rulesets, [add a WAF exception](/waf/managed-rules/waf-exceptions/). WAF exceptions are shown as _Skip_ rules in the **Deployed managed rulesets** list.

{{<Aside type="note">}}

Some managed rulesets may not allow custom configuration, depending on your Cloudflare plan.

{{</Aside>}}

### Configure field values for all the rules

To configure rule field values for all the rules in a managed ruleset:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.

2. Go to Account Home > **WAF** > **Managed rulesets**.

3. Under **Deployed managed rulesets**, next to the _Execute_ rule that deploys the managed ruleset you want to configure, select **Edit**.

4. In the ruleset configuration section, set one or more rule fields from the available values in the drop-down lists.

    For example, select the action to perform for all the rules in the ruleset from the **Ruleset action** drop-down list.

    ![The Deploy Managed Ruleset page displaying the available options to override all the rules in the ruleset. In the displayed managed ruleset you can override the ruleset action.](/images/waf/account/waf-configure-ruleset-account.png)

5. Select **Save**.

### View the rules of a managed ruleset

You can browse the available rules in a managed ruleset and search for individual rules or tags.

Use the available filters in the Browse Managed Ruleset interface.

To view the rules of a managed ruleset:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.

2. Go to Account Home > **WAF** > **Managed rulesets**.

3. Under **Deployed managed rulesets**, next to the _Execute_ rule that deploys the managed ruleset you want to browse, select **Edit**.

4. Select **Browse rules**.

    ![The Browse rules page displaying the list of rules in the Cloudflare Managed Ruleset](/images/waf/waf-browse-rules.png)

### Configure a single rule in a managed ruleset

{{<render file="_managed-ruleset-configure-single-rule.md">}}

### Configure rules in bulk in a managed ruleset

{{<render file="_managed-ruleset-configure-rules-in-bulk.md">}}

### Delete a managed ruleset deployment rule or a WAF exception

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Go to Account Home > **WAF** > **Managed rulesets**.
3. Under **Deployed managed rulesets** and next to the rule you want to delete, select **Edit**.
4. Select **Delete deployment** (or **Delete exception**) and confirm the operation.
