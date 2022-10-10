---
title: Deploy in the dashboard for an account
pcx_content_type: how-to
weight: 5
meta:
  title: Deploy a Managed Ruleset in the dashboard for an account
---

# Deploy a Managed Ruleset in the dashboard for an account

You can enable and configure Managed Rulesets for an account in **Account Home** > **Application Security** > **WAF** > **Managed rulesets**.

{{<Aside type="note">}}
Account-level WAF configuration is only available for Enterprise customers with the WAF Advanced plan.
{{</Aside>}}

To deploy a Managed Ruleset for a single zone, refer to [Deploy a Managed Ruleset in the dashboard for a zone](/waf/managed-rulesets/deploy-zone-dashboard/).

![Example Managed Rulesets configuration in the Managed rulesets tab under Application Security > WAF.](/waf/static/account/managed-rulesets-dashboard.png)

## Deploy a Managed Ruleset

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.

2. Navigate to **Application Security** > **WAF** > **Managed rulesets**.

3. Next to **Deployed managed rulesets**, select **Deploy** > **Deploy managed ruleset**.

4. Select the Managed Ruleset you wish to deploy.

5. In the **Deploy managed ruleset** page, give a name to the rule deploying the ruleset in **Execution name**.

6. Under **Execution scope**, review the scope of the deployed Managed Ruleset. If necessary, select **Edit scope** and configure the expression that will determine the scope of the current rule.

    {{<Aside type="warning">}}
Deployed custom rulesets will only apply to incoming traffic of Enterprise domains. The Expression Builder will automatically include this filter. If you define a custom expression using the Expression Editor, you must use parentheses to enclose any custom conditions and end your expression with `and (cf.zone.plan eq "ENT")` so that the rule only applies to domains on an Enterprise plan.
    {{</Aside>}}

7. (Optional) Specify overrides for [all the rules in the Managed Ruleset](#configure-field-values-for-all-the-rules). You can also create overrides for [specific rules or tags](#configure-rules-in-bulk-in-a-managed-ruleset).

8. To deploy your rule immediately, select **Deploy**. If you are not ready to deploy your rule, select **Save as draft**.

The **Deployed managed rulesets** list will show an _Execute_ rule for each deployed Managed Ruleset.

## Enable or disable a Managed Ruleset

Select the **Enabled** toggle next to a deployed Managed Ruleset to enable or disable it.

## Configure a Managed Ruleset

Configure a Managed Ruleset to:

- Define specific field values for one or more rules (for example, configure a rule with an action different from the action configured by Cloudflare).
- Disable one or more rules.

To skip one or more rules or WAF Managed Rulesets, [add a WAF exception](/waf/managed-rulesets/waf-exceptions/). WAF exceptions are shown as _Skip_ rules in the **Deployed managed rulesets** list.

{{<Aside type="note">}}

Some Managed Rulesets may not allow custom configuration, depending on your Cloudflare plan.

{{</Aside>}}

### Configure field values for all the rules

To configure rule field values for all the rules in a Managed Ruleset:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.

2. Navigate to **Application Security** > **WAF** > **Managed rulesets**.

3. Under **Deployed managed rulesets**, next to the _Execute_ rule that deploys the Managed Ruleset you want to configure, select **Edit**.

4. In the ruleset configuration section, set one or more rule fields from the available values in the drop-down lists.

    For example, select the action to perform for all the rules in the ruleset from the **Ruleset action** drop-down list.

    ![The Deploy Managed Ruleset page displaying the available options to override all the rules in the ruleset. In the displayed Managed Ruleset you can override the ruleset action.](/waf/static/account/waf-configure-ruleset-account.png)

5. Select **Save**.

### View the rules of a Managed Ruleset

You can browse the available rules in a Managed Ruleset and search for individual rules or tags.

Use the available filters in the Browse Managed Ruleset interface.

To view the rules of a Managed Ruleset:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.

2. Navigate to **Application Security** > **WAF** > **Managed rulesets**.

3. Under **Deployed managed rulesets**, next to the _Execute_ rule that deploys the Managed Ruleset you want to browse, select **Edit**.

4. Select **Browse rules**.

    ![The Browse rules page displaying the list of rules in the Cloudflare Managed Ruleset](/waf/static/waf-browse-rules.png)

### Configure a single rule in a Managed Ruleset

{{<render file="_managed-ruleset-configure-single-rule.md">}}

### Configure rules in bulk in a Managed Ruleset

{{<render file="_managed-ruleset-configure-rules-in-bulk.md">}}

### Delete a Managed Ruleset deployment rule or a WAF exception

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Navigate to **Application Security** > **WAF** > **Managed rulesets**.
3. Under **Deployed managed rulesets** and next to the rule you want to delete, select **Edit**.
4. Select **Delete deployment** (or **Delete exception**) and confirm the operation.
