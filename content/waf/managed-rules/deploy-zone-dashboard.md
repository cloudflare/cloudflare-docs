---
title: Deploy in the dashboard for a zone
pcx_content_type: how-to
weight: 5
meta:
  title: Deploy a managed ruleset in the dashboard for a zone
---

# Deploy a managed ruleset in the dashboard for a zone

You can deploy and configure managed rulesets for a zone in **Security** > **WAF** > **Managed rules**.

To deploy a managed ruleset for several Enterprise domains in your account, refer to [Deploy a managed ruleset in the dashboard for an account](/waf/managed-rules/deploy-account-dashboard/).

![Example WAF Managed Rules configuration in the Managed rules tab under Security > WAF. There are two managed rulesets already deployed, and one managed ruleset available for deployment.](/images/waf/waf-managed-rules-tab.png)

## Deploy a managed ruleset

To deploy a managed ruleset with the default configuration, under **Managed Rulesets** select **Deploy** next to a managed ruleset. This operation will deploy the managed ruleset for the current zone.

When you deploy a managed ruleset, the WAF adds an _Execute_ rule, displayed in **Managed rules**, that deploys the managed ruleset.

## Enable or disable a managed ruleset

Select the **Enabled** toggle next to a managed ruleset to enable or disable it.

## Configure a managed ruleset

Configure a managed ruleset to:

- Define specific field values for one or more rules (for example, configure a rule with an action different from the action configured by Cloudflare).
- Disable one or more rules.
- Specify a custom filter expression to apply the rules in the ruleset to a subset of incoming requests.

To skip one or more rules, or entire WAF managed rulesets, [add a WAF exception](/waf/managed-rules/waf-exceptions/).

{{<Aside type="note">}}

Some managed rulesets may not allow custom configuration, depending on your Cloudflare plan.

{{</Aside>}}

### Configure field values for all the rules

To configure rule field values for all the rules in a managed ruleset:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.

2. Go to **Security** > **WAF** > **Managed rules**.

3. Next to the _Execute_ rule that deploys the managed ruleset you want to configure, select the managed ruleset name.

4. Under **Ruleset configuration**, set one or more rule fields from the available values in the drop-down lists.

    For example, select the action to perform for all the rules in the ruleset from the **Ruleset action** drop-down list.

    ![The Configure Managed Ruleset page displaying the available options to override all the rules in the ruleset. In the displayed managed ruleset you can override the ruleset action.](/images/waf/waf-configure-ruleset.png)

5. (Optional) To apply the rules in the ruleset to a subset of incoming requests instead of all requests, [set the scope using a custom filter expression](#specify-a-custom-expression-for-the-ruleset).

6. Select **Save**.

### View the rules of a managed ruleset

You can browse the available rules in a managed ruleset and search for individual rules or tags.

Use the available filters in the Browse Managed Ruleset interface.

To view the rules of a managed ruleset:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.

2. Go to **Security** > **WAF** > **Managed rules**.

3. Next to the _Execute_ rule that deploys the managed ruleset you want to browse, select the managed ruleset name.

4. Select **Browse rules**.

    ![The Browse rules page displaying the list of rules in the Cloudflare Managed Ruleset](/images/waf/waf-browse-rules.png)

### Configure a single rule in a managed ruleset

{{<render file="_managed-ruleset-configure-single-rule.md">}}

### Configure rules in bulk in a managed ruleset

{{<render file="_managed-ruleset-configure-rules-in-bulk.md">}}

### Specify a custom expression for the ruleset

To apply the rules in the ruleset to a subset of incoming requests, specify a custom filter expression for the rule that executes the managed ruleset.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.

2. Go to **Security** > **WAF** > **Managed rules**.

3. Next to the _Execute_ rule that deploys the managed ruleset, select the managed ruleset name.

4. Select **Edit scope**.

5. Under **Set Scope**, select **Custom filter expression**.

6. Under **When incoming requests match**, define the scope for all the rules in the ruleset using a custom filter expression. Use the Expression Builder or the Expression Editor for defining the expression. For more information, refer to [Edit expressions in the dashboard](/ruleset-engine/rules-language/expressions/edit-expressions/).

7. Select **Next**, and then select **Save**.